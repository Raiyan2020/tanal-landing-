import { cookies } from "next/headers";
import { LANG_STORAGE_KEY, resolveLang, type Lang } from "./dictionaries";

export interface LangSearchParams {
  searchParams: Promise<{ lang?: string }>;
}

export async function requestLang(searchParams: LangSearchParams["searchParams"]): Promise<Lang> {
  const resolvedParams = await searchParams;
  const cookieStore = await cookies();
  return resolveLang(resolvedParams.lang, cookieStore.get(LANG_STORAGE_KEY)?.value);
}
