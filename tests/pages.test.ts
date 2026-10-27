/**
 * Characterization tests for the landing pages and sections (Phase 5E).
 *
 * Written and passing against the pre-Phase-5E code first. Pages and sections
 * are rendered to static markup with React's server renderer in the Node
 * environment (no DOM library). Only `fetch` (synthetic envelopes, every
 * request recorded), `next/headers` (an in-memory cookie), `next/navigation`,
 * `next/link`, `next/image`, `next/font/google` and `next/dynamic` are
 * replaced; the API client, `lib/api-config.ts`, the components and motion are
 * real. See docs/refactor-discovery/BASELINE_VERIFICATION.md §28.
 */
import { createElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.hoisted(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://api.test/api/v1";
});

const jar = vi.hoisted(() => ({ lang: undefined as string | undefined }));
const dynamicLoaders = vi.hoisted(() => [] as { loader: () => Promise<unknown>; ssr: unknown }[]);

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (name === "tanal_lang" && jar.lang !== undefined ? { name, value: jar.lang } : undefined),
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: () => {}, replace: () => {}, prefetch: () => {} }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/link", async () => {
  const { createElement } = await import("react");
  return {
    default: ({ href, children, ...rest }: { href: string; children?: ReactNode }) =>
      createElement("a", { "data-link": "", href, ...rest }, children),
  };
});

vi.mock("next/image", async () => {
  const { createElement } = await import("react");
  return {
    default: (props: Record<string, unknown>) => {
      const { src, fill, priority, fetchPriority, onError, ...rest } = props;
      const url = typeof src === "string" ? src : (src as { src?: string } | undefined)?.src ?? String(src);
      return createElement("img", {
        "data-image": "",
        src: url,
        "data-fill": fill ? "" : undefined,
        "data-priority": priority ? "" : undefined,
        "data-fetch-priority": fetchPriority as string | undefined,
        "data-on-error": onError ? "" : undefined,
        ...rest,
      });
    },
  };
});

vi.mock("next/font/google", () => {
  const font = (name: string) => () => ({ variable: `font-${name}`, className: `font-${name}-class` });
  return { Inter: font("inter"), Playfair_Display: font("playfair"), Tajawal: font("tajawal") };
});

vi.mock("next/dynamic", async () => {
  const { createElement } = await import("react");
  return {
    default: (loader: () => Promise<unknown>, options?: { ssr?: boolean }) => {
      const index = dynamicLoaders.length;
      dynamicLoaders.push({ loader, ssr: options?.ssr });
      const Lazy = (props: Record<string, unknown>) =>
        createElement("x-dynamic", { "data-index": index, "data-props": JSON.stringify(props) });
      return Lazy;
    },
  };
});

import RootLayout, { metadata } from "@/app/layout";
import HomePage from "@/app/page";
import HomeClient from "@/app/HomeClient";
import AboutUsPage from "@/app/about-us/page";
import PrivacyPolicyPage from "@/app/privacy-policy/page";
import TermsAndConditionsPage from "@/app/terms-and-conditions/page";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import SplashScreen from "@/components/SplashScreen";
import type { SiteData } from "@/lib/types";

/* ── Network stub ─────────────────────────────────────────────────────── */

interface Sent {
  url: string;
  method: string;
  acceptLanguage?: string;
  lang?: string;
  revalidate?: number;
}
type Reply = { status: number; body: string };
let sent: Sent[];
let routes: Record<string, (lang: string) => Reply | Promise<Reply>>;

const ok = (data: unknown): Reply => ({
  status: 200,
  body: JSON.stringify({ key: "success", msg: "", code: 200, response_status: { error: false, validation_errors: [] }, data }),
});

function installFetch() {
  sent = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init: RequestInit & { next?: { revalidate?: number } }) => {
      const headers = init.headers as Record<string, string>;
      sent.push({
        url: input,
        method: init.method ?? "GET",
        acceptLanguage: headers["Accept-Language"],
        lang: headers.lang,
        revalidate: init.next?.revalidate,
      });
      const path = input.replace("http://api.test/api/v1", "");
      const route = routes[path];
      if (!route) throw new Error(`unstubbed ${path}`);
      const reply = await route(headers.lang);
      return new Response(reply.body, { status: reply.status });
    }),
  );
}

/* ── Fixtures (synthetic) ─────────────────────────────────────────────── */

function site(lang: string): SiteData {
  const ar = lang === "ar";
  return {
    hero: {
      title: ar ? "عنوان الواجهة" : "Hero title",
      subtitle: ar ? "نص فرعي" : "Hero subtitle",
      primary_cta: { label: ar ? "احجز" : "Book", url: "https://site.test/book" },
      secondary_cta: { label: ar ? "تواصل" : "Contact", url: "https://site.test/contact" },
      image_url: ar ? "http://api.test/storage/images/hero.webp" : null,
    },
    how_it_works: {
      heading: { title: ar ? "كيف يعمل" : "How it works", subtitle: ar ? "" : "Three steps" },
      steps: [
        { id: 1, title: "S1", description: "D1", icon_url: "http://api.test/storage/images/s1.webp", sort: 0 },
        { id: 2, title: "S2", description: "D2", icon_url: "", sort: 1 },
      ],
    },
    features: {
      heading: { title: "F", subtitle: "FS" },
      items: [
        { id: 11, title: "F1", description: "FD1", icon_url: "http://api.test/storage/images/f1.webp", sort: 0 },
        { id: 12, title: "F2", description: "FD2", icon_url: "", sort: 1 },
      ],
    },
    portfolio: {
      heading: { title: "P", subtitle: "PS" },
      items: [
        { id: 21, name: "Clean", image_url: "http://api.test/storage/images/landing/portfolio/a.webp", sort: 0 },
        {
          id: 22,
          name: "Doubled",
          image_url:
            "http://api.test/storage/images/landing/portfolio/http://api.test/storage/images/landing/portfolio/b.webp",
          sort: 1,
        },
        { id: 23, name: "Filename", image_url: "c.webp", sort: 2 },
        { id: 24, name: "Null", image_url: null, sort: 3 },
        { id: 25, name: "Blank", image_url: "   ", sort: 4 },
        { id: 26, name: "Unrecoverable", image_url: "http://api.test/x/http", sort: 5 },
        { id: 27, name: "Fourth", image_url: " http://api.test/d.webp ", sort: 6 },
      ],
    },
    contact: {
      heading: { title: "C", subtitle: "CS" },
      settings: {
        whatsapp_full_number: "+965 5000 0000",
        whatsapp_url: "https://wa.me/96550000000",
        office_address: ar ? "الكويت" : "Kuwait",
        google_maps_url: "https://maps.google.com/?q=Kuwait",
      },
      social_links: [
        { platform: "tiktok", label: null, url: "https://t.test", sort: 5 },
        { platform: "Instagram", label: "Insta", url: "https://i.test", sort: 1 },
        { platform: "x", label: null, url: "https://x.test", sort: 3 },
        { platform: "mastodon", label: "Masto", url: "https://m.test", sort: 2 },
        { platform: "whatsapp", label: null, url: "https://w.test", sort: 4 },
        { platform: "facebook", label: null, url: "https://f.test", sort: 0 },
        { platform: "linkedin", label: null, url: "https://l.test", sort: 6 },
        { platform: "youtube", label: null, url: "https://y.test", sort: 7 },
        { platform: "snapchat", label: null, url: "https://s.test", sort: 8 },
        { platform: "twitter", label: null, url: "https://tw.test", sort: 9 },
      ],
    },
    footer: {
      brand_name: ar ? "تنال" : "Tanal",
      tagline: "",
      description: ar ? "وصف" : "",
      logo_url: ar ? "http://api.test/storage/images/logo.webp" : "",
      about_url: "",
      privacy_url: "",
      terms_url: "",
      copyright: "© Tanal",
    },
  };
}

const LEGAL = {
  "/site/about": (lang: string) => ok({ about: `<h2>About ${lang}</h2><p>Body &amp; <a href="/x">link</a></p>` }),
  "/site/privacy": (lang: string) => ok({ privacy: `<p>Privacy ${lang}</p><ul><li>one</li></ul>` }),
  "/site/terms": (lang: string) => ok({ terms: `<p>Terms ${lang}</p>` }),
};

const html = (node: ReactNode) => renderToStaticMarkup(node as ReactElement);
const params = (lang?: string) => ({ searchParams: Promise.resolve(lang === undefined ? {} : { lang }) });

let errors: unknown[][];
beforeEach(() => {
  jar.lang = undefined;
  routes = { "/site": (lang) => ok(site(lang)), ...LEGAL };
  installFetch();
  errors = [];
  vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    errors.push(args);
  });
});
afterEach(() => {
  vi.restoreAllMocks();
});

/* ── Root layout ─────────────────────────────────────────────────────── */

describe("root layout", () => {
  it("keeps the metadata", () => {
    expect(metadata).toEqual({
      title: "Tanal - Luxury Digital Wedding Invitations",
      description:
        "Design, customize, and share elegant invitations that capture the magic of your special day with our premium luxury platform.",
    });
  });

  it.each([
    [undefined, "ar", "rtl"],
    ["en", "en", "ltr"],
    ["ar", "ar", "rtl"],
    ["fr", "fr", "ltr"],
  ])("cookie %s → <html lang=%s dir=%s> (cookie only, no ?lang=)", async (cookie, lang, dir) => {
    jar.lang = cookie;
    const tree = (await RootLayout({ children: createElement("p", null, "child") })) as ReactElement<{ lang: string; dir: string; className: string }>;
    expect(tree.props.lang).toBe(lang);
    expect(tree.props.dir).toBe(dir);
    expect(tree.props.className).toBe("scroll-smooth font-inter font-playfair font-tajawal");
    expect(html(tree)).toBe(
      `<html lang="${lang}" dir="${dir}" class="scroll-smooth font-inter font-playfair font-tajawal"><head></head><body class="antialiased font-sans"><main><p>child</p></main></body></html>`,
    );
  });

  it("the splash screen renders nothing on the server", () => {
    expect(html(createElement(SplashScreen))).toBe("");
  });
});

/* ── Home page ───────────────────────────────────────────────────────── */

describe("home page", () => {
  it.each([
    [{ lang: "en" }, "ar", "en"],
    [{}, "en", "en"],
    [{ lang: "xx" }, undefined, "ar"],
  ] as const)("resolves the language from %o and cookie %s → %s and prefetches /site once", async (search, cookie, expected) => {
    jar.lang = cookie;
    const tree = (await HomePage({ searchParams: Promise.resolve(search) })) as ReactElement<{ initialLang: string; initialSiteData: SiteData }>;
    expect(tree.type).toBe(HomeClient);
    expect(tree.props.initialLang).toBe(expected);
    expect(tree.props.initialSiteData).toEqual(site(expected));
    expect(sent).toEqual([
      { url: "http://api.test/api/v1/site", method: "GET", acceptLanguage: expected, lang: expected, revalidate: 60 },
    ]);
    expect(errors).toEqual([]);
  });

  it("logs and passes null when /site fails", async () => {
    routes["/site"] = () => ({ status: 500, body: "boom" });
    const tree = (await HomePage(params("en"))) as ReactElement<{ initialSiteData: unknown }>;
    expect(tree.props.initialSiteData).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0][0]).toBe("Failed to prefetch site data server-side:");
    expect(String(errors[0][1])).toBe("Error: API error 500 on /site: boom");
  });

  it("lazy-loads the five below-fold sections in order, all without SSR", async () => {
    const modules = await Promise.all(dynamicLoaders.map((d) => d.loader()));
    expect(modules.map((m) => (m as { default: unknown }).default)).toEqual([
      HowItWorksSection,
      FeaturesSection,
      PortfolioSection,
      ContactSection,
      Footer,
    ]);
    expect(dynamicLoaders.map((d) => d.ssr)).toEqual([false, false, false, false, false]);
  });

  it.each(["ar", "en"] as const)("HomeClient markup (%s)", (lang) => {
    expect(html(createElement(HomeClient, { initialSiteData: site(lang), initialLang: lang }))).toMatchSnapshot();
  });

  it.each(["ar", "en"] as const)("HomeClient failure markup (%s)", (lang) => {
    expect(html(createElement(HomeClient, { initialSiteData: null, initialLang: lang }))).toMatchSnapshot();
  });
});

/* ── Legal / content pages ───────────────────────────────────────────── */

const PAGES = [
  ["about-us", AboutUsPage, "/site/about", "about"],
  ["privacy-policy", PrivacyPolicyPage, "/site/privacy", "privacy policy"],
  ["terms-and-conditions", TermsAndConditionsPage, "/site/terms", "terms"],
] as const;

describe.each(PAGES)("/%s", (_route, Page, endpoint, label) => {
  it.each(["ar", "en"] as const)("markup (%s)", async (lang) => {
    expect(html(await Page(params(lang)))).toMatchSnapshot();
  });

  it("requests its content and /site together, both with the language headers", async () => {
    let releaseContent!: () => void;
    routes[endpoint] = (lang) =>
      new Promise<Reply>((resolve) => {
        releaseContent = () => resolve(LEGAL[endpoint](lang));
      });
    const pending = Page(params("en"));
    await vi.waitFor(() => expect(sent).toHaveLength(2));
    expect(sent).toEqual([
      { url: `http://api.test/api/v1${endpoint}`, method: "GET", acceptLanguage: "en", lang: "en", revalidate: 3600 },
      { url: "http://api.test/api/v1/site", method: "GET", acceptLanguage: "en", lang: "en", revalidate: 60 },
    ]);
    releaseContent();
    expect(html(await pending)).toContain(`${label === "privacy policy" ? "Privacy" : label === "terms" ? "Terms" : "About"} en`);
  });

  it("resolves the language from ?lang= over the cookie, then the cookie, then Arabic", async () => {
    const dir = async (lang?: string) => html(await Page(params(lang))).match(/<div dir="(rtl|ltr)"/)?.[1];
    jar.lang = "en";
    expect(await dir("ar")).toBe("rtl");
    expect(sent.map((s) => s.lang)).toEqual(["ar", "ar"]);
    expect(await dir()).toBe("ltr");
    jar.lang = undefined;
    expect(await dir("de")).toBe("rtl");
  });

  it("renders an empty body and logs when the content request fails, keeping the API footer", async () => {
    routes[endpoint] = () => ({ status: 404, body: "missing" });
    const out = html(await Page(params("en")));
    expect(out).toMatchSnapshot();
    expect(errors.map((e) => [e[0], String(e[1])])).toEqual([
      [`Failed to fetch ${label} data on server:`, `Error: API error 404 on ${endpoint}: missing`],
    ]);
  });

  it("falls back to the static footer and logs when /site fails", async () => {
    routes["/site"] = () => ({ status: 503, body: "down" });
    const out = html(await Page(params("ar")));
    expect(out).toMatchSnapshot();
    expect(errors.map((e) => [e[0], String(e[1])])).toEqual([
      ["Failed to fetch site data on server:", "Error: API error 503 on /site: down"],
    ]);
  });

  it("logs both failures, content first", async () => {
    routes[endpoint] = () => ({ status: 500, body: "a" });
    routes["/site"] = () => ({ status: 500, body: "b" });
    const out = html(await Page(params("en")));
    expect(out).toContain('<div class="font-serif text-lg text-[#362d23]/80 leading-relaxed font-light space-y-6"></div>');
    expect(out).toContain("© 2026 Tanal");
    expect(errors.map((e) => e[0])).toEqual([`Failed to fetch ${label} data on server:`, "Failed to fetch site data on server:"]);
  });

  it("injects the CMS HTML unchanged", async () => {
    const raw = `<p onclick="x()">raw <b>html</b></p><script>var a=1</script>`;
    routes[endpoint] = () => ok({ about: raw, privacy: raw, terms: raw });
    expect(html(await Page(params("en")))).toContain(raw);
  });
});

/* ── Header / Footer ─────────────────────────────────────────────────── */

describe("header", () => {
  it.each(["ar", "en"] as const)("markup (%s)", (lang) => {
    const isRtl = lang === "ar";
    expect(
      html(createElement(Header, { lang, isRtl, headingFontClass: isRtl ? "font-arabic font-bold" : "font-serif" })),
    ).toMatchSnapshot();
  });
});

describe("footer", () => {
  it.each(["ar", "en"] as const)("markup with API data (%s)", (lang) => {
    expect(
      html(createElement(Footer, { lang, isRtl: lang === "ar", data: site(lang).footer, whatsappUrl: "https://wa.me/1" })),
    ).toMatchSnapshot();
  });

  it("falls back to the static logo, brand alt and wa.me when the API gives nothing", () => {
    const out = html(createElement(Footer, { lang: "en", isRtl: false, data: { ...site("en").footer, brand_name: "" }, whatsappUrl: null }));
    expect(out).toContain('src="https://raiyansoft.com/wp-content/uploads/2026/05/Tanal-noshadow-scaled.png" alt="Tanal Logo"');
    expect(out).toContain('href="https://wa.me/"');
    expect(out).not.toContain("max-w-lg mb-10");
  });
});

/* ── Sections ────────────────────────────────────────────────────────── */

describe("sections", () => {
  it.each(["ar", "en"] as const)("hero (%s)", (lang) => {
    expect(
      html(createElement(HeroSection, { data: site(lang).hero, isRtl: lang === "ar", headingFontClass: "h" })),
    ).toMatchSnapshot();
  });

  it.each(["ar", "en"] as const)("how it works (%s)", (lang) => {
    expect(
      html(createElement(HowItWorksSection, { data: site(lang).how_it_works, isRtl: lang === "ar", headingFontClass: "h" })),
    ).toMatchSnapshot();
  });

  it("features", () => {
    expect(html(createElement(FeaturesSection, { data: site("en").features, headingFontClass: "h" }))).toMatchSnapshot();
  });

  it("portfolio keeps only recoverable images and repairs doubled URLs", () => {
    const out = html(createElement(PortfolioSection, { data: site("en").portfolio, headingFontClass: "h" }));
    expect([...out.matchAll(/<img data-image="" src="([^"]*)"[^>]*? alt="([^"]*)"/g)].map((m) => [m[2], m[1]])).toEqual([
      ["Clean", "http://api.test/storage/images/landing/portfolio/a.webp"],
      ["Doubled", "http://api.test/storage/images/landing/portfolio/b.webp"],
      ["Filename", "http://api.test/storage/images/landing/portfolio/c.webp"],
      ["Fourth", "http://api.test/d.webp"],
    ]);
    expect(out).toMatchSnapshot();
  });

  it("contact sorts social links, maps platforms to icons and labels", () => {
    expect(html(createElement(ContactSection, { data: site("en").contact, headingFontClass: "h" }))).toMatchSnapshot();
  });

  it("contact without social links has no divider", () => {
    const data = { ...site("ar").contact, social_links: [] };
    expect(html(createElement(ContactSection, { data, headingFontClass: "h" }))).not.toContain("bg-[#bbb2aa]/30 mb-8");
  });
});

describe("header language switch", () => {
  type Node = { type?: unknown; props?: { onClick?: () => void; children?: unknown } };
  const findButton = (node: unknown): Node | undefined => {
    if (!node || typeof node !== "object") return undefined;
    if (Array.isArray(node)) {
      for (const child of node) {
        const found = findButton(child);
        if (found) return found;
      }
      return undefined;
    }
    const el = node as Node;
    if (el.type === "button") return el;
    return findButton(el.props?.children);
  };

  it.each([
    ["en", "/about-us", "?lang=en&utm=1", "ar", "/about-us?lang=ar&utm=1"],
    ["ar", "/", "", "en", "/?lang=en"],
  ] as const)("from %s on %s%s: stores %s and reloads %s without touching the cookie", (lang, pathname, search, next, href) => {
    const stored: [string, string][] = [];
    const location = { pathname, search, href: "unchanged" };
    vi.stubGlobal("window", { location });
    vi.stubGlobal("localStorage", { setItem: (k: string, v: string) => stored.push([k, v]) });
    const tree = Header({ lang, isRtl: lang === "ar", headingFontClass: "h" });
    findButton(tree)!.props!.onClick!();
    expect(stored).toEqual([["tanal_lang", next]]);
    expect(location.href).toBe(href);
    expect("document" in globalThis).toBe(false);
  });
});

describe("content envelopes", () => {
  it.each(PAGES)("/%s: a `data: null` content envelope fails the page (current behaviour)", async (_route, Page, endpoint) => {
    routes[endpoint] = () => ok(null);
    await expect(Page(params("en"))).rejects.toThrow(TypeError);
  });
});
