"use server";

/**
 * SendMessageForm Server Action.
 *
 * Sends the contact-form payload via MailerSend's transactional API
 * (https://developers.mailersend.com/api/v1/email.html). The email
 * comes from a verified sender domain (configured via env), and the
 * submitter's own address goes in Reply-To so replies thread back to
 * them naturally.
 *
 * Required env vars:
 *   MAILERSEND_API_KEY        — API token from the MailerSend dashboard
 *                               (Settings → Tokens → "Add token", with
 *                               at least the "Email" sending permission).
 *   MAILERSEND_FROM_EMAIL     — A verified sender address on a domain
 *                               you've added in MailerSend (e.g.
 *                               noreply@humanos.tech). Required by
 *                               MailerSend's sender-domain policy.
 *   MAILERSEND_FROM_NAME      — Optional. Display name shown in the
 *                               "From" line. Defaults to
 *                               "Humanos Website".
 *
 * Add the same vars in Vercel → Settings → Environment Variables so
 * production has them too.
 */

export type SendMessageState =
  | { ok: true }
  | { ok?: false; error: string }
  | null;

const TO = { email: "pedro@humanos.tech", name: "Pedro" };
const CC = [
  { email: "wgomes@humanos.tech", name: "Wilson" },
  { email: "rodrigo@humanos.tech", name: "Rodrigo" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendMessage(
  _prev: SendMessageState,
  formData: FormData,
): Promise<SendMessageState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  /* ---------- Validation ---------- */
  if (!name) return { error: "Please add your name." };
  if (!EMAIL_RE.test(email)) return { error: "Please add a valid email." };
  if (message.length < 5) return { error: "Your message is too short." };
  if (message.length > 5000) return { error: "Your message is too long." };

  const apiKey = process.env.MAILERSEND_API_KEY;
  const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
  const fromName = process.env.MAILERSEND_FROM_NAME || "Humanos Website";

  if (!apiKey || !fromEmail) {
    console.error(
      "[send-message] MAILERSEND_API_KEY or MAILERSEND_FROM_EMAIL not set",
    );
    return {
      error:
        "Email service is not configured yet. Please email us directly at pedro@humanos.tech.",
    };
  }

  /* ---------- Build the payload ---------- */
  const subject = `Humanos · message from ${name}`;
  const text = `${message}\n\n—\n${name}\n${email}`;
  const html = [
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.55;color:#111">`,
    `<p style="white-space:pre-wrap;margin:0 0 20px">${escapeHtml(message)}</p>`,
    `<hr style="border:0;border-top:1px solid #e5e3dd;margin:24px 0" />`,
    `<p style="margin:0;color:#5a5957;font-size:13px">`,
    `<strong style="color:#111">${escapeHtml(name)}</strong><br>`,
    `<a href="mailto:${escapeHtml(email)}" style="color:#4b49ca;text-decoration:none">${escapeHtml(email)}</a>`,
    `</p>`,
    `</div>`,
  ].join("");

  const payload = {
    from: { email: fromEmail, name: fromName },
    to: [TO],
    cc: CC,
    reply_to: { email, name },
    subject,
    text,
    html,
  };

  /* ---------- Send ---------- */
  try {
    const res = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    /* MailerSend returns 202 Accepted on success. Any non-2xx is a
       failure — log the body for debugging but only surface a generic
       message to the user. */
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `[send-message] MailerSend ${res.status}: ${body.slice(0, 800)}`,
      );
      return {
        error:
          "Couldn't send right now. Please try again, or email us directly at pedro@humanos.tech.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[send-message] Network error:", err);
    return {
      error:
        "Couldn't reach the email service. Please try again, or email us directly at pedro@humanos.tech.",
    };
  }
}
