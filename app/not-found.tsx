import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="legal">
      <div className="wrap">
        <div className="legal__inner">
          <p className="legal__eyebrow">Error · 404</p>
          <h1 className="legal__title">Page not found</h1>
          <p className="legal__lede">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          </p>
          <p>
            <Link className="legal__link" href="/">
              Return to the homepage
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
