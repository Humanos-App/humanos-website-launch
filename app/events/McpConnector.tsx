"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Try our MCP on Claude" — a disclosure rather than a link. The other
 * event buttons go somewhere; this one has nowhere to send a booth visitor
 * on their phone, so it expands in place with the steps to add the connector
 * and hands them the two things that are genuinely awkward to retype from a
 * phone at a conference — the URL and the opening prompt — via the clipboard.
 */

const MCP_URL = "https://demo.humanos.tech/mcp";

const PROMPT =
  "Hi! I want to connect to the Humanos MCP and start the onboarding process.";

/* The click path through Claude, rendered as a breadcrumb rather than one
   step per click — it's three taps in the same menu, not three tasks. */
const PATH = ["Claude", "Profile", "Connectors"];

export function McpConnector() {
  const [open, setOpen] = useState(false);
  /* which box was last copied — the two share the confirmation timer but
     only the one that was tapped should say so */
  const [copied, setCopied] = useState<"url" | "prompt" | null>(null);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const copy = async (key: "url" | "prompt", text: string) => {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(text);
      else {
        // Safari without a secure context / older mobile browsers.
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
    } catch {}
    setCopied(key);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(null), 1700);
  };

  return (
    <div className="events__disclosure">
      <button
        type="button"
        className="events__btn"
        aria-expanded={open}
        aria-controls="events-mcp-steps"
        onClick={() => setOpen((o) => !o)}
      >
        <span>Try our MCP on Claude</span>
        <span
          className="events__btn-glyph events__btn-glyph--toggle"
          data-open={open || undefined}
          aria-hidden="true"
        >
          ↓
        </span>
      </button>

      {open && (
        <div className="events__steps" id="events-mcp-steps">
          <ol className="events__steps-list">
            <li className="events__step">
              <span className="events__step-num" aria-hidden="true">
                1
              </span>
              <span className="events__step-body">
                Open{" "}
                <span className="events__path">
                  {PATH.map((crumb, i) => (
                    <span key={crumb}>
                      {i > 0 && (
                        <span className="events__path-sep" aria-hidden="true">
                          {" > "}
                        </span>
                      )}
                      <strong>{crumb}</strong>
                    </span>
                  ))}
                </span>
              </span>
            </li>
            <li className="events__step">
              <span className="events__step-num" aria-hidden="true">
                2
              </span>
              <span className="events__step-body">
                Add custom connector
                <button
                  type="button"
                  className="events__copy"
                  onClick={() => copy("url", MCP_URL)}
                >
                  <code className="events__url">{MCP_URL}</code>
                  <span className="events__copy-label">
                    {copied === "url" ? "Copied ✓" : "Copy"}
                  </span>
                </button>
              </span>
            </li>
            <li className="events__step">
              <span className="events__step-num" aria-hidden="true">
                3
              </span>
              <span className="events__step-body">
                Send Claude this prompt
                <button
                  type="button"
                  className="events__copy events__copy--prompt"
                  onClick={() => copy("prompt", PROMPT)}
                >
                  <span className="events__prompt">{PROMPT}</span>
                  <span className="events__copy-label">
                    {copied === "prompt" ? "Copied ✓" : "Copy"}
                  </span>
                </button>
              </span>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
