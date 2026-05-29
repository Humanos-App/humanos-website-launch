import { TalkWithUs } from "@/components/dialogs/TalkWithUs";

export function FloatingApiBar() {
  return (
    <aside className="rtbar" aria-label="Humanos developer entry">
      <span className="rtbar__pitch">
        Portable Authorization &amp; Runtime Verification for AI
      </span>
      <span className="rtbar__sep" aria-hidden="true" />
      <span className="rtbar__stack">
        <span className="tk-fn">verify()</span>
      </span>
      <TalkWithUs>
        <button className="rtbar__cta rtbar__cta--ghost" type="button">
          Talk with us
        </button>
      </TalkWithUs>
      <a className="rtbar__cta rtbar__cta--primary" href="#get-api-key">
        Get API key
      </a>
    </aside>
  );
}
