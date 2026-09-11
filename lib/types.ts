// ─── Shared wrapper ──────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  key: string;
  msg: string;
  code: number;
  response_status: { error: boolean; validation_errors: string[] };
  data: T;
}

// ─── /site ───────────────────────────────────────────────────────────────────

export interface SiteHero {
  title: string;
  subtitle: string;
  primary_cta: { label: string; url: string };
  secondary_cta: { label: string; url: string };
  image_url: string | null;
}

export interface SiteStep {
  id: number;
  title: string;
  description: string;
  icon_url: string;
  sort: number;
}

export interface SiteHowItWorks {
  heading: { title: string; subtitle: string };
  steps: SiteStep[];
}

export interface SiteFeatureItem {
  id: number;
  title: string;
  description: string;
  icon_url: string;
  sort: number;
}

export interface SiteFeatures {
  heading: { title: string; subtitle: string };
  items: SiteFeatureItem[];
}

export interface SitePortfolioItem {
  id: number;
  name: string;
  image_url: string | null;
  sort: number;
}

export interface SitePortfolio {
  heading: { title: string; subtitle: string };
  items: SitePortfolioItem[];
}

export interface SiteSocialLink {
  platform: string;
  label: string | null;
  url: string;
  sort: number;
}

export interface SiteContact {
  heading: { title: string; subtitle: string };
  settings: {
    whatsapp_full_number: string;
    whatsapp_url: string;
    office_address: string;
    google_maps_url: string;
  };
  social_links: SiteSocialLink[];
}

export interface SiteFooter {
  brand_name: string;
  tagline: string;
  description: string;
  logo_url: string;
  about_url: string;
  privacy_url: string;
  terms_url: string;
  copyright: string;
}

export interface SiteData {
  hero: SiteHero;
  how_it_works: SiteHowItWorks;
  features: SiteFeatures;
  portfolio: SitePortfolio;
  contact: SiteContact;
  footer: SiteFooter;
}

// ─── /site/event-types ───────────────────────────────────────────────────────

export interface EventType {
  id: number;
  name: string;
  sort: number;
}

// ─── /site/about · /site/privacy · /site/terms ───────────────────────────────

export interface AboutData {
  about: string;
}

export interface PrivacyData {
  privacy: string;
}

export interface TermsData {
  terms: string;
}
