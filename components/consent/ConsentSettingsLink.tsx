"use client";

import { useConsent } from "./ConsentProvider";

/**
 * Footer-style anchor that opens the consent settings dialog. Used to
 * give users a way to withdraw or re-grant consent any time after the
 * initial banner.
 */
export function ConsentSettingsLink({
  className,
  children = "Cookie settings",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openSettings } = useConsent();
  return (
    <button
      type="button"
      className={className}
      onClick={openSettings}
    >
      {children}
    </button>
  );
}
