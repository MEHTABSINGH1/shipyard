import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found">
      <div className="big" aria-hidden="true">
        🌊
      </div>
      <h1>Lost at sea</h1>
      <p>We couldn&apos;t find the page or product you were looking for.</p>
      <Link href="/" className="button">
        Back to the harbor
      </Link>
    </main>
  );
}
