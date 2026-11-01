export default function ArticleLoading() {
  return (
    <main className="article-detail-page article-detail-loading" aria-busy="true" aria-label="Loading article">
      <div className="article-detail-shell">
        <div className="article-detail-header" aria-hidden="true">
          <span className="article-loading-line article-loading-line--brand" />
          <span className="article-loading-line article-loading-line--link" />
        </div>
        <div className="article-detail-loading-content">
          <span className="article-loading-line article-loading-line--kicker" />
          <span className="article-loading-block article-loading-block--title" />
          <span className="article-loading-block article-loading-block--excerpt" />
          <span className="article-loading-block article-loading-block--image" />
        </div>
      </div>
    </main>
  );
}
