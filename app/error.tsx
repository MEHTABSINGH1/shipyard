"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  /** Clears the error state and re-renders the segment. */
  reset: () => void;
  /** Next.js 16.2+: re-fetches and re-renders the segment (preferred when present). */
  retry?: () => void;
};

export default function ErrorPage({ error, reset, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container not-found" role="alert">
      <div className="big" aria-hidden="true">
        ⛈️
      </div>
      <h1>Rough seas ahead</h1>
      <p>Something went wrong while loading this page. Give it another try.</p>
      <div className="error-actions">
        <button type="button" className="button" onClick={() => (retry ?? reset)()}>
          Try again
        </button>
        <Link href="/" className="link-button">
          Back to the harbor
        </Link>
      </div>
    </main>
  );
}
