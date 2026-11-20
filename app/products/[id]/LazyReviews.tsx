"use client";

import dynamic from "next/dynamic";

// The reviews panel sits below the fold and uses localStorage (browser-only),
// so it is split into its own chunk and loaded on the client only.
// `ssr: false` must live in a Client Component, which is why this wrapper exists.
const Reviews = dynamic(() => import("./Reviews"), {
  ssr: false,
  loading: () => (
    <section className="reviews reviews-skeleton" aria-busy="true" aria-label="Loading reviews">
      <div className="skeleton-line wide" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
    </section>
  ),
});

export default Reviews;
