import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * GDPR / §25 TDDDG consent management.
 *
 * The decision (categories + timestamp + policy version) is stored in a
 * first-party, strictly necessary cookie. Nothing optional is loaded, executed
 * or contacted before an explicit affirmative action by the visitor.
 */

export const CONSENT_VERSION = 1;
export const CONSENT_COOKIE = "mc_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 6 months

export const OPTIONAL_CATEGORIES = ["preferences", "statistics", "marketing", "externalMedia"] as const;
export type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number];
export type Category = "necessary" | OptionalCategory;

export type Categories = Record<OptionalCategory, boolean>;

export type ConsentRecord = {
  version: number;
  timestamp: string;
  categories: Categories;
};

export const NONE: Categories = {
  preferences: false,
  statistics: false,
  marketing: false,
  externalMedia: false,
};

export const ALL: Categories = {
  preferences: true,
  statistics: true,
  marketing: true,
  externalMedia: true,
};

/** Optional first-party cookies/storage keys removed when consent is withdrawn. */
const OPTIONAL_STORAGE_KEYS: Record<OptionalCategory, string[]> = {
  preferences: [],
  statistics: ["_ga", "_gid", "_gat"],
  marketing: ["_fbp", "_fbc", "_gcl_au"],
  externalMedia: [],
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const domains = [undefined, host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const domain of domains) {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax${domain ? `; domain=${domain}` : ""}`;
  }
}

function parseStored(): ConsentRecord | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== CONSENT_VERSION) return null; // policy changed → ask again
    return {
      version: parsed.version,
      timestamp: String(parsed.timestamp ?? ""),
      categories: { ...NONE, ...(parsed.categories ?? {}) },
    };
  } catch {
    return null;
  }
}

type ConsentContextValue = {
  /** null until hydrated or when no valid decision has been recorded. */
  consent: ConsentRecord | null;
  /** true once the client has read stored consent (avoids hydration mismatches). */
  ready: boolean;
  bannerOpen: boolean;
  settingsOpen: boolean;
  allows: (category: Category) => boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (categories: Categories) => void;
  revoke: () => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(parseStored());
    setReady(true);
  }, []);

  const purge = useCallback((next: Categories, previous: Categories | null) => {
    for (const category of OPTIONAL_CATEGORIES) {
      const wasAllowed = previous?.[category] ?? false;
      if (wasAllowed && !next[category]) {
        for (const key of OPTIONAL_STORAGE_KEYS[category]) deleteCookie(key);
      }
    }
  }, []);

  const commit = useCallback(
    (categories: Categories) => {
      const record: ConsentRecord = {
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        categories,
      };
      setConsent((previous) => {
        purge(categories, previous?.categories ?? null);
        return record;
      });
      writeCookie(CONSENT_COOKIE, JSON.stringify(record));
      setSettingsOpen(false);
    },
    [purge],
  );

  const revoke = useCallback(() => {
    setConsent((previous) => {
      purge(NONE, previous?.categories ?? null);
      return null;
    });
    deleteCookie(CONSENT_COOKIE);
    setSettingsOpen(false);
  }, [purge]);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      bannerOpen: ready && consent === null && !settingsOpen,
      settingsOpen,
      allows: (category) =>
        category === "necessary" ? true : Boolean(consent?.categories[category as OptionalCategory]),
      acceptAll: () => commit({ ...ALL }),
      rejectAll: () => commit({ ...NONE }),
      save: (categories) => commit({ ...NONE, ...categories }),
      revoke,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [consent, ready, settingsOpen, commit, revoke],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside ConsentProvider");
  return ctx;
}

/** Convenience check for gating optional scripts, iframes and requests. */
export function useConsentFor(category: Category) {
  const { allows, ready } = useConsent();
  return ready && allows(category);
}

/**
 * Conditional loader for optional third-party scripts. The script is only
 * injected once the given category has been consented to.
 */
export function loadScriptWithConsent(
  allowed: boolean,
  src: string,
  attributes: Record<string, string> = {},
) {
  if (!allowed || typeof document === "undefined") return;
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  for (const [key, val] of Object.entries(attributes)) script.setAttribute(key, val);
  document.head.appendChild(script);
}
