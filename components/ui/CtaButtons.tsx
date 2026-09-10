import { EXTERNAL_LINKS } from "@/lib/external-links";
import { TalkWithUs } from "@/components/dialogs/TalkWithUs";

/**
 * The site's two standard calls to action, in the shared .btn design
 * (app/styles/buttons.css). Use these instead of hand-rolling the pair:
 * Read Docs is always the primary, Talk to us always the outlined secondary
 * opening the book-a-call / send-a-message dialog.
 *
 * Design fragments (public/designs) can't mount React components; there the
 * same pair is plain markup with the same .btn classes, and Talk to us
 * carries data-talk-to-us — TalkToUsBridge turns that into the same dialog.
 */
export function ReadDocsButton() {
  return (
    <a
      className="btn btn--primary"
      href={EXTERNAL_LINKS.docs}
      target="_blank"
      rel="noopener noreferrer"
    >
      Read Docs <span className="arrow">→</span>
    </a>
  );
}

export function TalkToUsButton() {
  return (
    <TalkWithUs>
      <button className="btn btn--secondary" type="button">
        Talk to us <span className="arrow">→</span>
      </button>
    </TalkWithUs>
  );
}
