#!/usr/bin/env node
/**
 * Lint baseline check.
 *
 *   node scripts/lint-baseline.mjs           check: fail on any finding not in the baseline
 *   node scripts/lint-baseline.mjs --update  rewrite eslint-baseline.json (explicit, reviewed action)
 *
 * `npm run lint` stays the honest, full report. This check only answers "did
 * this change add a finding?", so existing findings can be paid down over time
 * without letting new ones in.
 *
 * A finding is identified by file (relative, POSIX), rule, severity and
 * message, and counted per identity. Line and column are deliberately left out
 * so unrelated edits that shift lines don't register as new findings. Because
 * counts are compared per identity, fixing one finding never makes room for a
 * different new one.
 *
 * Exit codes: 0 = no new findings, 1 = new findings, 2 = ESLint could not run,
 * a file could not be parsed, or the baseline file is missing or malformed.
 */
import { ESLint } from "eslint";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const BASELINE_FILE = "eslint-baseline.json";
const BASELINE_VERSION = 1;
const root = process.cwd();
const update = process.argv.includes("--update");

function fail(message) {
  console.error(`lint-baseline: ${message}`);
  process.exit(2);
}

function identity(filePath, message) {
  const file = path.relative(root, filePath).split(path.sep).join("/");
  const severity = message.severity === 2 ? "error" : "warning";
  const text = message.message.replace(/\s+/g, " ").trim();
  return `${file} | ${message.ruleId} | ${severity} | ${text}`;
}

async function collect() {
  let results;
  try {
    const eslint = new ESLint({ cwd: root });
    results = await eslint.lintFiles(["."]);
  } catch (error) {
    fail(`ESLint failed to run: ${error?.stack ?? error}`);
  }
  if (!Array.isArray(results)) fail("ESLint returned no results.");

  const counts = new Map();
  const fatal = [];
  for (const result of results) {
    for (const message of result.messages ?? []) {
      // Parse errors and other fatal problems have no rule id; they mean the
      // file was not actually linted, so they can never be baselined.
      if (message.fatal || !message.ruleId) {
        fatal.push(`${path.relative(root, result.filePath)}:${message.line ?? "?"} ${message.message}`);
        continue;
      }
      const key = identity(result.filePath, message);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  if (fatal.length > 0) fail(`ESLint reported fatal problems:\n  ${fatal.join("\n  ")}`);
  return counts;
}

async function readBaseline() {
  let raw;
  try {
    raw = await readFile(path.join(root, BASELINE_FILE), "utf8");
  } catch {
    fail(`${BASELINE_FILE} not found. Create it deliberately with: npm run lint:baseline:update`);
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    fail(`${BASELINE_FILE} is not valid JSON: ${error.message}`);
  }
  const valid =
    data?.version === BASELINE_VERSION &&
    data.findings && typeof data.findings === "object" &&
    Object.values(data.findings).every((n) => Number.isInteger(n) && n > 0);
  if (!valid) fail(`${BASELINE_FILE} has an unexpected shape (expected version ${BASELINE_VERSION}).`);
  return new Map(Object.entries(data.findings));
}

const current = await collect();

if (update) {
  const findings = Object.fromEntries([...current.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
  const total = [...current.values()].reduce((sum, n) => sum + n, 0);
  const body = { version: BASELINE_VERSION, eslint: ESLint.version, total, findings };
  await writeFile(path.join(root, BASELINE_FILE), `${JSON.stringify(body, null, 2)}\n`);
  console.log(`lint-baseline: wrote ${BASELINE_FILE} with ${total} finding(s). Review the diff before committing.`);
  process.exit(0);
}

const baseline = await readBaseline();
const added = [];
const reduced = [];
for (const [key, count] of current) {
  const allowed = baseline.get(key) ?? 0;
  if (count > allowed) added.push(`+${count - allowed}  ${key}`);
}
for (const [key, allowed] of baseline) {
  const count = current.get(key) ?? 0;
  if (count < allowed) reduced.push(`-${allowed - count}  ${key}`);
}

if (reduced.length > 0) {
  console.log(`lint-baseline: ${reduced.length} baselined finding(s) no longer occur:`);
  for (const line of reduced) console.log(`  ${line}`);
  console.log("  Run `npm run lint:baseline:update` deliberately to lock in the improvement.");
}
if (added.length > 0) {
  console.error(`lint-baseline: ${added.length} new finding(s) not in ${BASELINE_FILE}:`);
  for (const line of added) console.error(`  ${line}`);
  console.error("  Fix them (run `npm run lint` for locations). Do not add them to the baseline unless that is a reviewed decision.");
  process.exit(1);
}
console.log(`lint-baseline: no new findings (${[...current.values()].reduce((s, n) => s + n, 0)} current, baseline ${[...baseline.values()].reduce((s, n) => s + n, 0)}).`);
