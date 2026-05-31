"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useConsent } from "./ConsentProvider";

/**
 * Re-prompt dialog. Opened from the footer "Cookie settings" link and
 * from inline links inside /legal/cookies. Mirrors the banner — two
 * choices, no per-category toggles, so the UX stays uniform.
 */
export function ConsentSettingsDialog() {
  const { settingsOpen, closeSettings, state, acceptAll, declineAll } =
    useConsent();

  return (
    <Dialog.Root
      open={settingsOpen}
      onOpenChange={(o) => !o && closeSettings()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="consent-dlg__overlay" />
        <Dialog.Content
          className="consent-dlg__content"
          aria-describedby={undefined}
        >
          <div className="consent-dlg__head">
            <Dialog.Title className="consent-dlg__title">
              Cookie settings
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="consent-dlg__close"
                aria-label="Close"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          <p className="consent-dlg__lede">
            We use cookies essential to running this site and, with your
            permission, cookies that help us understand how it&rsquo;s used. You
            can change your choice any time.
          </p>

          <p className="consent-dlg__state">
            <strong>
              {state.decided
                ? state.categories.analytics
                  ? "Accepted"
                  : "Rejected"
                : "Not set"}
            </strong>
            .{" "}
            <Link href="/legal/cookies" className="consent-dlg__link">
              Read the policy
            </Link>
            .
          </p>

          <div className="consent-dlg__actions">
            <button
              type="button"
              className="consent__btn consent__btn--secondary"
              onClick={declineAll}
            >
              Reject
            </button>
            <button
              type="button"
              className="consent__btn consent__btn--primary"
              onClick={acceptAll}
            >
              Accept
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
