"use client";

import { useEffect, useMemo, useState } from "react";
import type { Review } from "../../data/reviews";

type ReviewsProps = {
  productId: string;
  initialReviews: Review[];
};

type SortOrder = "newest" | "highest" | "lowest";

const STARS = [5, 4, 3, 2, 1] as const;

function storageKey(productId: string) {
  return `shipyard:reviews:${productId}`;
}

// Reads reviews the visitor wrote earlier. localStorage is browser-only,
// which is why this component is loaded with { ssr: false }.
function loadSavedReviews(productId: string): Review[] {
  try {
    const raw = window.localStorage.getItem(storageKey(productId));
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function saveReviews(productId: string, saved: Review[]) {
  try {
    window.localStorage.setItem(storageKey(productId), JSON.stringify(saved));
  } catch {
    // Storage can be unavailable (private mode); the review still shows this session.
  }
}

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(value)}
      <span className="stars-empty">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export default function Reviews({ productId, initialReviews }: ReviewsProps) {
  const [saved, setSaved] = useState<Review[]>(() => loadSavedReviews(productId));
  const [sort, setSort] = useState<SortOrder>("newest");
  const [filter, setFilter] = useState<number | null>(null);
  const [form, setForm] = useState({ author: "", title: "", body: "", rating: 5 });

  useEffect(() => {
    saveReviews(productId, saved);
  }, [productId, saved]);

  const all = useMemo(() => [...saved, ...initialReviews], [saved, initialReviews]);

  const average = all.length
    ? all.reduce((sum, review) => sum + review.rating, 0) / all.length
    : 0;

  const counts = STARS.map((star) => ({
    star,
    count: all.filter((review) => review.rating === star).length,
  }));

  const visible = useMemo(() => {
    const filtered = filter ? all.filter((r) => r.rating === filter) : all;
    return [...filtered].sort((a, b) => {
      if (sort === "highest") return b.rating - a.rating;
      if (sort === "lowest") return a.rating - b.rating;
      return b.date.localeCompare(a.date);
    });
  }, [all, filter, sort]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.author.trim() || !form.body.trim()) return;
    const review: Review = {
      id: `local-${Date.now()}`,
      productId,
      author: form.author.trim(),
      rating: form.rating as Review["rating"],
      title: form.title.trim() || "Review",
      body: form.body.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    setSaved((prev) => [review, ...prev]);
    setForm({ author: "", title: "", body: "", rating: 5 });
  }

  return (
    <section className="reviews" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading">Customer reviews</h2>

      <div className="reviews-summary">
        <div className="reviews-average">
          <span className="reviews-score">{average.toFixed(1)}</span>
          <Stars value={Math.round(average)} />
          <span className="reviews-count">
            {all.length} review{all.length === 1 ? "" : "s"}
          </span>
        </div>

        <ul className="reviews-bars">
          {counts.map(({ star, count }) => (
            <li key={star}>
              <button
                type="button"
                className={filter === star ? "bar-row active" : "bar-row"}
                onClick={() => setFilter(filter === star ? null : star)}
                aria-pressed={filter === star}
              >
                <span>{star}★</span>
                <span className="bar">
                  <span
                    className="bar-fill"
                    style={{ width: all.length ? `${(count / all.length) * 100}%` : 0 }}
                  />
                </span>
                <span>{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="reviews-toolbar">
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOrder)}>
            <option value="newest">Newest</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </label>
        {filter && (
          <button type="button" className="link-button" onClick={() => setFilter(null)}>
            Clear {filter}★ filter
          </button>
        )}
      </div>

      <ul className="reviews-list">
        {visible.map((review) => (
          <li key={review.id} className="review">
            <div className="review-head">
              <Stars value={review.rating} />
              <strong>{review.title}</strong>
            </div>
            <p>{review.body}</p>
            <span className="review-meta">
              {review.author} ·{" "}
              {new Date(review.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
            </span>
          </li>
        ))}
        {visible.length === 0 && <li className="review">No reviews match this filter.</li>}
      </ul>

      <form className="review-form" onSubmit={handleSubmit}>
        <h3>Write a review</h3>
        <div className="form-row">
          <input
            placeholder="Your name"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            aria-label="Rating"
          >
            {STARS.map((star) => (
              <option key={star} value={star}>
                {star} star{star === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="What did you think?"
          rows={3}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          required
        />
        <button className="button" type="submit">
          Post review
        </button>
      </form>
    </section>
  );
}
