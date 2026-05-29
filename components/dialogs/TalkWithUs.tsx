"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import { SendMessageForm } from "./SendMessageForm";

type Step = "choose" | "message";

export function TalkWithUs({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("choose");

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // reset when closing so next open starts at choice screen
      setTimeout(() => setStep("choose"), 200);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dlg__overlay" />
        <Dialog.Content className="dlg__content" aria-describedby={undefined}>
          <Dialog.Close className="dlg__close" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Dialog.Close>

          {step === "choose" ? (
            <>
              <div className="dlg__eyebrow">Talk with us</div>
              <Dialog.Title className="dlg__title">
                How would you like to connect?
              </Dialog.Title>
              <Dialog.Description className="dlg__sub">
                Book time with our team, or send us a note and we&apos;ll get back to you.
              </Dialog.Description>

              <div className="dlg__choices">
                <a
                  className="dlg__choice"
                  href={EXTERNAL_LINKS.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <span className="dlg__choice-title">Book a demo</span>
                  <span className="dlg__choice-sub">
                    Schedule 30 minutes with our team via Calendly.
                  </span>
                  <span className="dlg__choice-arrow">Open Calendly →</span>
                </a>
                <button
                  type="button"
                  className="dlg__choice"
                  onClick={() => setStep("message")}
                >
                  <span className="dlg__choice-title">Send a message</span>
                  <span className="dlg__choice-sub">
                    Tell us about your use case. We&apos;ll reply by email.
                  </span>
                  <span className="dlg__choice-arrow">Open form →</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="dlg__back"
                onClick={() => setStep("choose")}
              >
                ← Back
              </button>
              <div className="dlg__eyebrow">Send a message</div>
              <Dialog.Title className="dlg__title">
                Tell us about your use case.
              </Dialog.Title>
              <Dialog.Description className="dlg__sub">
                Someone from the Humanos team will follow up by email.
              </Dialog.Description>
              <SendMessageForm onSuccess={() => setOpen(false)} />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
