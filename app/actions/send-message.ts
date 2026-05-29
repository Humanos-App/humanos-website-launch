"use server";

import { INDUSTRIES, VERIFICATION_VOLUMES } from "@/lib/form-options";

export type SendMessageState = {
  ok: boolean;
  error?: string;
};

export type SendMessagePayload = {
  name: string;
  company: string;
  email: string;
  industry: string;
  volume: string;
  message: string;
};

export async function sendMessage(
  _prev: SendMessageState | null,
  formData: FormData,
): Promise<SendMessageState> {
  const payload: SendMessagePayload = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    industry: String(formData.get("industry") ?? "").trim(),
    volume: String(formData.get("volume") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.name) return { ok: false, error: "Name is required." };
  if (!payload.company) return { ok: false, error: "Company is required." };
  if (!payload.email || !/.+@.+\..+/.test(payload.email)) {
    return { ok: false, error: "A valid work email is required." };
  }
  if (!INDUSTRIES.includes(payload.industry as (typeof INDUSTRIES)[number])) {
    return { ok: false, error: "Choose an industry." };
  }
  if (
    !VERIFICATION_VOLUMES.includes(
      payload.volume as (typeof VERIFICATION_VOLUMES)[number],
    )
  ) {
    return { ok: false, error: "Choose a verification volume." };
  }
  if (!payload.message) return { ok: false, error: "Message is required." };

  // TODO: wire the actual destination (Resend / Slack webhook / HubSpot).
  // For now: log on the server and succeed.
  // eslint-disable-next-line no-console
  console.log("[contact-form] submission", payload);

  return { ok: true };
}
