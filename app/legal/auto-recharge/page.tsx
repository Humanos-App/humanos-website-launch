import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto-recharge agreement",
  description:
    "The agreement a Humanos customer accepts when turning on auto-recharge, which tops up their credit balance automatically from a saved card.",
  alternates: { canonical: "/legal/auto-recharge" },
};

// The auto-recharge agreement, word for word as the Humanos app renders it
// (packages/lib/src/utils/auto-recharge-agreement.ts in agent-mandate-protocol),
// with each customer's own choices in [brackets]. The wording changes there
// first, with a version bump, and is then copied here unchanged. The sentences
// are plain strings so their straight apostrophes match the app's text exactly.
const VERSION = 3;
const ADDRESS = "131 Continental Dr, Suite 305, Newark, Delaware 19713, USA";
const BILLING_EMAIL = "billing@humanos.tech";

const INTRO = [
  `Version ${VERSION}.`,
  "This is the agreement a Humanos customer accepts when turning on auto-recharge in the Humanos dashboard.",
  "The items in brackets are the choices each customer makes there.",
  "The customer's own copy, with those values, is emailed to them when they agree, together with a separate line naming the saved card, and is shown under Billing in the dashboard.",
].join(" ");

const AUTHORITY =
  "I'm authorised to agree to this for [the customer organization], a business.";

const CHARGES = [
  `I authorise Humanos Labs, Inc. (${ADDRESS}) to charge [the card saved in that checkout, or the card already saved for auto-recharge] without asking me each time whenever [the organization]'s credit balance falls below [the threshold the customer sets, at least USD 5].`,
  "Each charge is the amount needed to bring the balance back to [the target the customer sets, at most USD 1,000], plus applicable taxes, and never more than that target plus those taxes.",
  "There will be at most 10 charges in any 24 hours, and [at most the monthly limit the customer sets per calendar month, taxes included, or no monthly limit].",
  "While the account is new, each charge is at most USD 200 plus applicable taxes and there are at most 3 charges in any 24 hours; these limits lift 30 days after the first charge, once USD 500 has been charged without disputes.",
  "If the balance is below the threshold when the customer agrees, the first charge happens at once.",
].join(" ");

const CONDITIONS = [
  "Charges are in US dollars; we add no surcharge or fee; if your card uses another currency, your bank converts the amount and may add a fee.",
  "Automatic charges appear on statements as HUMANOS* AUTO TOPUP, a payment made on Stripe's page as HUMANOS LABS, INC.",
  "This agreement has no end date; it lasts until you turn off auto-recharge or remove this card.",
  "You can turn auto-recharge off at any time in Billing settings; no charge is made after that, although a charge already in progress may complete.",
  "If your bank declines a charge, we may try once more; if the card is refused, expired or removed, auto-recharge pauses until a card is saved again.",
  "If a payment on your account is refunded, disputed or flagged by your bank, we pause auto-recharge until our support team has reviewed it.",
  "If no automatic charge has been made for 6 months, we'll email you at least 2 business days before the next one.",
  "Unused credits are not refundable, except for billing errors or where the law requires a refund.",
  "We'll email [the billing email, or the organization's owners] at least 2 business days before these terms change and ask you to agree again.",
  "We'll email you a copy of this agreement when you accept it.",
  `Questions: ${BILLING_EMAIL}.`,
].join(" ");

export default function AutoRechargeAgreementPage() {
  return (
    <main className="legal">
      <div className="wrap">
        <div className="legal__inner">
          <p className="legal__eyebrow">
            Auto-recharge agreement · Version {VERSION}
          </p>
          <h1 className="legal__title">Auto-recharge agreement</h1>

          <p className="legal__lede">{INTRO}</p>

          <p>{AUTHORITY}</p>
          <p>{CHARGES}</p>
          <p>{CONDITIONS}</p>

          <p className="legal__note">
            Humanos Labs, Inc. · {ADDRESS} ·{" "}
            <a className="legal__link" href={`mailto:${BILLING_EMAIL}`}>
              {BILLING_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
