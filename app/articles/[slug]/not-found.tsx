import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <main className="article-detail-page article-not-found">
      <div className="article-detail-shell">
        <div className="article-detail-header">
          <Link href="/" className="article-detail-brand">RSAH <span>#tangguh</span></Link>
        </div>
        <section className="article-not-found-content" aria-labelledby="article-not-found-title">
          <p className="article-detail-kicker">404 / Story unavailable</p>
          <h1 id="article-not-found-title">That story is not here.</h1>
          <p>The link may be old, or the story has not been published yet.</p>
          <Link href="/" className="article-not-found-link">Back to chapters →</Link>
        </section>
      </div>
    </main>
  );
}
