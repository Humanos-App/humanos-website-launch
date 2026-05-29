"use client";

import { useActionState } from "react";
import { sendMessage, type SendMessageState } from "@/app/actions/send-message";
import { INDUSTRIES, VERIFICATION_VOLUMES } from "@/lib/form-options";

const initialState: SendMessageState | null = null;

export function SendMessageForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState(sendMessage, initialState);

  if (state?.ok) {
    return (
      <div className="dlg__success">
        <div className="dlg__success-icon" aria-hidden="true">✓</div>
        <h2 className="dlg__title">Message sent.</h2>
        <p className="dlg__sub">
          Thanks — someone from Humanos will be in touch shortly.
        </p>
        {onSuccess && (
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={onSuccess}
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="dlg__form" noValidate>
      <div className="dlg__row">
        <div className="dlg__field">
          <label className="dlg__label" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="dlg__input"
          />
        </div>
        <div className="dlg__field">
          <label className="dlg__label" htmlFor="contact-company">
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className="dlg__input"
          />
        </div>
      </div>

      <div className="dlg__field">
        <label className="dlg__label" htmlFor="contact-email">
          Work email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="dlg__input"
        />
      </div>

      <div className="dlg__row">
        <div className="dlg__field">
          <label className="dlg__label" htmlFor="contact-industry">
            Industry
          </label>
          <select
            id="contact-industry"
            name="industry"
            required
            defaultValue=""
            className="dlg__select"
          >
            <option value="" disabled>
              Select…
            </option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className="dlg__field">
          <label className="dlg__label" htmlFor="contact-volume">
            Verification volume
          </label>
          <select
            id="contact-volume"
            name="volume"
            required
            defaultValue=""
            className="dlg__select"
          >
            <option value="" disabled>
              Select…
            </option>
            {VERIFICATION_VOLUMES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="dlg__field">
        <label className="dlg__label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="dlg__textarea"
        />
      </div>

      {state?.error && <p className="dlg__error">{state.error}</p>}

      <div className="dlg__actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={isPending}
        >
          {isPending ? (
            "Sending…"
          ) : (
            <>
              Send message
              <span className="arrow">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
