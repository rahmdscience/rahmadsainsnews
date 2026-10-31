
"use client";

import { useEffect, useRef } from "react";

const articles = [
  {
    title: "The New Industrials",
    category: "INDUSTRY / INNOVATION",
    color: "#FF8126",
    content:
      "For 50-odd years, American innovation has felt dominated by the creative output of Silicon Valley. But times are changing. A new generation of industrial pioneers is beginning to reshape the physical world.",
    quote: "Innovation was them. Now innovation is everywhere.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646e04db8?w=1800&q=85",
  },
  {
    title: "A Different Kind of Future",
    category: "TECHNOLOGY / DESIGN",
    color: "#FF8126",
    content:
      "They're not waiting to get established to worry about Design. They are using Design to help them get established. A new way of thinking is changing how industries are built.",
    quote: "The future belongs to those who build it.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=85",
  },
  {
    title: "Beyond the Digital World",
    category: "ENERGY / TECHNOLOGY",
    color: "#48B8F5",
    content:
      "The next industrial revolution is not confined to computer screens. It is happening in laboratories, power plants, factories and infrastructure across the world.",
    quote: "The next big thing is going to be BIG.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1800&q=85",
  },
  {
    title: "Rebuilding Everything",
    category: "ENGINEERING / FUTURE",
    color: "#48B8F5",
    content:
      "Manufacturing, infrastructure and logistics are entering a new era. Engineering is becoming the foundation of a different kind of progress.",
    quote: "Progress is not an idea. It is something we construct.",
    image:
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1800&q=85",
  },
  {
    title: "The Energy Transition",
    category: "ENERGY / SUSTAINABILITY",
    color: "#39C879",
    content:
      "Energy is at the heart of every modern society. From renewable resources to advanced nuclear technology, the way we produce and distribute energy is changing.",
    quote: "Powering tomorrow starts today.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1800&q=85",
  },
  {
    title: "A World Reimagined",
    category: "SOCIETY / INNOVATION",
    color: "#39C879",
    content:
      "The industries being built today will define how future generations live, work and move. This is more than technological progress. It is a transformation of society.",
    quote: "We are not just imagining the future. We are building it.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1800&q=85",
  },
];

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.substring(0, 2), 16),
    g: parseInt(value.substring(2, 4), 16),
    b: parseInt(value.substring(4, 6), 16),
  };
};

const interpolateColor = (
  color1: string,
  color2: string,
  progress: number
) => {
  const a = hexToRgb(color1);
  const b = hexToRgb(color2);

  const mix = (x: number, y: number) =>
    Math.round(x + (y - x) * progress);

  return `rgb(${mix(a.r, b.r)}, ${mix(a.g, b.g)}, ${mix(a.b, b.b)})`;
};

const clamp = (value: number) =>
  Math.max(0, Math.min(1, value));

export default function Home() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBackground = () => {
      const viewportCenter =
        window.scrollY + window.innerHeight * 0.5;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(".article-section")
      );

      if (!sections.length || !backgroundRef.current) return;

      let activeColor = articles[0].color;
      let nextColor = activeColor;
      let progress = 0;
      let transitioning = false;

      for (let i = 0; i < sections.length - 1; i += 2) {
        const secondArticle = sections[i + 1];
        const nextArticle = sections[i + 2];

        if (!secondArticle || !nextArticle) continue;

        const start =
          secondArticle.offsetTop +
          secondArticle.offsetHeight * 0.85;

        const end =
          nextArticle.offsetTop +
          nextArticle.offsetHeight * 0.15;

        if (viewportCenter >= start && viewportCenter <= end) {
          activeColor = articles[i].color;
          nextColor = articles[i + 2].color;

          progress = clamp(
            (viewportCenter - start) / (end - start)
          );

          transitioning = true;
          break;
        }

        if (viewportCenter > end) {
          activeColor = articles[i + 2].color;
          nextColor = activeColor;
        }
      }

      if (!transitioning) {
        const activeSection = sections.find((section) => {
          return (
            viewportCenter >= section.offsetTop &&
            viewportCenter <
              section.offsetTop + section.offsetHeight
          );
        });

        if (activeSection) {
          const index = Number(activeSection.dataset.index);
          const pairIndex = Math.floor(index / 2) * 2;

          activeColor =
            articles[pairIndex]?.color ?? articles[0].color;
          nextColor = activeColor;
        } else if (viewportCenter >= sections[sections.length - 1].offsetTop) {
          const lastPair =
            Math.floor((articles.length - 1) / 2) * 2;

          activeColor = articles[lastPair].color;
          nextColor = activeColor;
        }
      }

      const interpolated = interpolateColor(
        activeColor,
        nextColor,
        progress
      );

      const gradientOpacity = transitioning
        ? Math.sin(progress * Math.PI) * 0.55
        : 0;

      backgroundRef.current.style.setProperty(
        "--current-bg",
        interpolated
      );

      backgroundRef.current.style.setProperty(
        "--from-bg",
        activeColor
      );

      backgroundRef.current.style.setProperty(
        "--to-bg",
        nextColor
      );

      backgroundRef.current.style.setProperty(
        "--gradient-opacity",
        String(gradientOpacity)
      );
    };

    let frame = 0;

    const onScroll = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        updateBackground();
        frame = 0;
      });
    };

    updateBackground();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateBackground);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateBackground);

      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="editorial-page">
      {/* DYNAMIC BACKGROUND */}
      <div className="dynamic-background" ref={backgroundRef}>
        <div className="background-gradient" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="site-container">
        <header className="topbar">
          <a href="#" className="logo">PNN</a>

          <a href="#" className="topbar-pill">
            THE NEW INDUSTRIALS
          </a>

          <span className="year-box">2026</span>
        </header>

        <div className="grid-navigation">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} />
          ))}
        </div>

        {/* ARTICLES */}
        {articles.map((article, index) => (
          <article
            key={article.title}
            className="article-section"
            data-index={index}
            id={`article-${index + 1}`}
          >
            <div className="article-index">
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* ARTICLE HERO */}
            <section className="article-hero">
              <div className="article-meta reveal">
                <span>{article.category}</span>
                <span>ARTICLE / {String(index + 1).padStart(2, "0")}</span>
              </div>

              <h1 className="article-title reveal">
                {article.title}
              </h1>

              <p className="article-intro reveal">
                {article.quote}
              </p>

              <div className="article-scroll">
                <span>SCROLL TO EXPLORE ↓</span>
              </div>
            </section>

            {/* ARTICLE BODY */}
            <section className="article-body">
              <div className="body-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="body-content">
                <p className="body-lead reveal">
                  {article.content}
                </p>

                <figure className="article-image reveal">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                  <figcaption>
                    <span>FIG {String(index + 1).padStart(2, "0")}</span>
                    <span>{article.category}</span>
                  </figcaption>
                </figure>

                <blockquote className="article-quote reveal">
                  “{article.quote}”
                </blockquote>

                <div className="body-description reveal">
                  <p>
                    Every generation inherits a world.
                    But the next generation has the
                    opportunity to reshape it.
                  </p>

                  <p>
                    New ideas, new technology and a
                    different approach to innovation
                    are creating possibilities that
                    were once considered impossible.
                  </p>
                </div>
              </div>

              <div className="body-side">
                <span>2026</span>
                <span>PNN JOURNAL</span>
              </div>
            </section>
          </article>
        ))}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-logo">PNN</div>

          <div className="footer-details">
            <span>INDEPENDENT EDITORIAL JOURNAL</span>
            <span>© 2026 ALL RIGHTS RESERVED</span>
            <a href="#">BACK TO TOP ↑</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
