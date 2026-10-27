import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// eslint-config-next 15.x ships an eslintrc-style config, so it is loaded
// through FlatCompat. `extends: "next"` is the same preset the old
// `.eslintrc.json` named; keep this package on the installed Next.js version.
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  // Same global ignores eslint-config-next 16 applied (node_modules/ and .git/
  // are ignored by ESLint itself).
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
  ...compat.extends("next"),
];

export default eslintConfig;
