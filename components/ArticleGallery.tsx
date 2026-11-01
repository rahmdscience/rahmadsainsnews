import { ArticleImage } from "./ArticleImage";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
};

type ArticleGalleryProps = {
  items: GalleryItem[];
};

export function ArticleGallery({ items }: ArticleGalleryProps) {
  if (!items.length) return null;

  return (
    <section className="article-gallery" aria-labelledby="gallery-heading">
      <div className="article-gallery-heading">
        <h2 id="gallery-heading">More from the story</h2>
        <span>{items.length} frame{items.length === 1 ? "" : "s"}</span>
      </div>
      <div className="article-gallery-grid">
        {items.map((item) => (
          <figure className="article-gallery-item" key={item.src}>
            <ArticleImage src={item.src} alt={item.alt} />
            {item.caption || item.credit ? (
              <figcaption>
                {item.caption ? <span>{item.caption}</span> : null}
                {item.credit ? <small>{item.credit}</small> : null}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
