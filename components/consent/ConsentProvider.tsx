"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Cookie / tracking consent state for the whole site.
 *
 * Two categories today: `necessary` (always on, can't be disabled) and
 * `analytics` (Google Analytics, opt-in). Add more by extending the
 * Categories type — every consumer that reads `state.categories.X`
 * keeps working.
 *
 * The choice is persisted to localStorage under a versioned key so we
 * can re-prompt everyone if the policy materially changes (just bump
 * `:v1` → `:v2`).
 */

export type ConsentCategories = {
  /** Cannot be toggled. Site essentials only (no analytics, no ads). */
  necessary: true;
  /** Google Analytics. Defaults OFF until user opts in. */
  analytics: boolean;
};

export type ConsentState = {
  /** True once the user has chosen Accept / Decline / Save preferences. */
  decided: boolean;
  categories: ConsentCategories;
};

type ConsentApi = {
  state: ConsentState;
  /** True after the first client-side mount; safe to render UI that
   *  depends on the persisted choice. Before this is true, render
   *  nothing (avoids SSR ↔ CSR hydration mismatch). */
  hydrated: boolean;

  acceptAll: () => void;
  declineAll: () => void;
  save: (cats: Partial<Pick<ConsentCategories, "analytics">>) => void;

  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const STORAGE_KEY = "humanos:consent:v1";

const DEFAULT_STATE: ConsentState = {
  decided: false,
  categories: { necessary: true, analytics: false },
};

const Ctx = createContext<ConsentApi | null>(null);

export function useConsent(): ConsentApi {
  const v = useContext(Ctx);
  if (!v) {
    throw new Error("useConsent must be used inside <ConsentProvider>");
  }
  return v;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConsentState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  /* Read persisted choice on mount. */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ConsentState>;
        setState({
          decided: !!parsed.decided,
          categories: {
            necessary: true,
            analytics: !!parsed.categories?.analytics,
          },
        });
      }
    } catch {
      /* corrupt JSON / no storage — fall through to defaults */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    setState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* private mode / quota — choice stays in memory only */
    }
  }, []);

  const acceptAll = useCallback(() => {
    persist({
      decided: true,
      categories: { necessary: true, analytics: true },
    });
    setSettingsOpen(false);
  }, [persist]);

  const declineAll = useCallback(() => {
    persist({
      decided: true,
      categories: { necessary: true, analytics: false },
    });
    setSettingsOpen(false);
  }, [persist]);

  const save = useCallback(
    (cats: Partial<Pick<ConsentCategories, "analytics">>) => {
      persist({
        decided: true,
        categories: {
          necessary: true,
          analytics: !!cats.analytics,
        },
      });
      setSettingsOpen(false);
    },
    [persist],
  );

  return (
    <Ctx.Provider
      value={{
        state,
        hydrated,
        acceptAll,
        declineAll,
        save,
        settingsOpen,
        openSettings: () => setSettingsOpen(true),
        closeSettings: () => setSettingsOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
