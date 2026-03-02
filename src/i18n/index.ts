import { useLocaleStore } from "@/stores/locale-store";
import type { Locale, Translations } from "./types";
import { ja } from "./ja";
import { en } from "./en";
import { zh } from "./zh";
import { ko } from "./ko";
import { es } from "./es";
import { de } from "./de";

const translations: Record<Locale, Translations> = { ja, en, zh, ko, es, de };

export function useTranslation(): Translations {
  const locale = useLocaleStore((s) => s.locale);
  return translations[locale];
}

/** テンプレート文字列内の {key} を置換するヘルパー */
export function interpolate(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}

export type { Locale, Translations };
export { translations };
