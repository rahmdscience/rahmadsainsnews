import type { Metadata } from "next";
import Link from "next/link";
import { ArticleGallery } from "../../../components/ArticleGallery";
import { ArticleMedia } from "../../../components/ArticleMedia";
import { ArticleShare } from "../../../components/ArticleShare";
import { articles } from "../../../content/article-data";
import { siteConfig, siteUrl } from "../../../lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const findArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) return { title: "Story not found | RSAH" };

  const image = article.socialImage.startsWith("http")
    ? article.socialImage
    : `${siteUrl}${article.socialImage}`;

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    authors: [{ name: article.author }],
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      url: `/articles/${article.slug}`,
      siteName: siteConfig.name,
      title: article.seoTitle,
      description: article.seoDescription,
      images: [{ url: image, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    return (
      <main className="article-detail-page article-not-found" id="top">
        <a className="skip-link" href="#article-not-found-title">Skip to message</a>
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

  const relatedArticles = article.relatedArticles
    .map((relatedSlug) => findArticle(relatedSlug))
    .filter((relatedArticle) => relatedArticle && relatedArticle.slug !== article.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription,
    articleSection: article.chapter,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    image: article.socialImage.startsWith("http")
      ? article.socialImage
      : `${siteUrl}${article.socialImage}`,
    mainEntityOfPage: `${siteUrl}/articles/${article.slug}`,
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
  };

  return (
    <main className="article-detail-page" id="top">
      <a className="skip-link" href="#article-story">Skip to story</a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\u003c"),
        }}
      />

      <div className="article-detail-shell">
        <header className="article-detail-header">
          <Link href="/about" className="article-about-link">About</Link>
          <Link href="/" className="article-detail-brand">
            RSAH <span>#tangguh</span>
          </Link>
          <Link href={`/#article-${articles.indexOf(article) + 1}`} className="article-back-link">
            Back to chapters ↑
          </Link>
        </header>

        <article id="article-story" className={"article-detail-content article-detail-content--" + article.alignment}>
          <div className="article-detail-kicker">
            <span>{article.eyebrow}</span>
            <span>{article.readingTime} min read</span>
          </div>

          <h1 className="article-detail-title">{article.title}</h1>
          <p className="article-detail-excerpt">{article.excerpt}</p>

          <ArticleMedia
            src={article.image}
            alt={article.imageAlt}
            video={article.video}
            mediaType={article.mediaType}
            priority
            className="article-detail-image"
          />

          {article.mediaCaption || article.mediaCredit ? (
            <div className="article-media-caption">
              {article.mediaCaption ? <span>{article.mediaCaption}</span> : null}
              {article.mediaCredit ? <small>{article.mediaCredit}</small> : null}
            </div>
          ) : null}

          <div className="article-detail-meta">
            <span>By {article.author}</span>
            <span>{article.category}</span>
          </div>

          <div className="article-detail-body">
            <p>{article.body}</p>
          </div>

          {article.pullQuote ? (
            <blockquote className="article-detail-quote">
              “{article.pullQuote}”
            </blockquote>
          ) : null}

          <ArticleGallery items={article.gallery} />

          <ArticleShare title={article.title} />

          {article.externalLinks.length ? (
            <div className="article-detail-links">
              <span>Explore further</span>
              {article.externalLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.href}
                  target={link.newTab ? "_blank" : undefined}
                  rel={link.newTab ? "noopener noreferrer" : undefined}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </article>

        {relatedArticles.length ? (
          <section className="related-articles" aria-labelledby="related-heading">
            <h2 id="related-heading">Keep going</h2>
            <div className="related-articles-grid">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  href={`/articles/${relatedArticle!.slug}`}
                  className="related-article-card"
                  key={relatedArticle!.slug}
                >
                  <span>{relatedArticle!.chapter}</span>
                  <strong>{relatedArticle!.title}</strong>
                  <small>Read story →</small>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="article-detail-footer">
          <span>RSAH · #tangguh</span>
          <Link href="/">Return home ↑</Link>
        </footer>
      </div>
    </main>
  );
}
