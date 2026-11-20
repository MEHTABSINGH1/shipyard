// Shown instantly (via a Suspense boundary) while a route segment loads.
export default function Loading() {
  return (
    <main className="container" aria-busy="true" aria-label="Loading">
      <div className="hero skeleton-hero">
        <div className="skeleton-line wide" />
        <div className="skeleton-line" />
      </div>
      <div className="grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="card skeleton-card">
            <div className="card-image skeleton-block" />
            <div className="card-body">
              <div className="skeleton-line" />
              <div className="skeleton-line" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
