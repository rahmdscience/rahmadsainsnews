
"use client";

import { useEffect, useRef } from "react";

const articles = [
  {
    chapter: "INTRODUCTION",
    title: "The New Industrials",
    color: "#FF8126",
    content:
      "For 50-odd years, American innovation has felt dominated by the creative output of Silicon Valley. But times are changing. A new generation of industrial pioneers is beginning to reshape the physical world.",
    image: "/images/Rahmad%20Sains_Arc.png",
  },
  {
    chapter: "DESIGN",
    title: "A Different Kind of Future",
    color: "#F5A04C",
    content:
      "They're not waiting to get established to worry about Design. They are using Design to help them get established. A new way of thinking is changing how industries are built.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=85",
  },
  {
    chapter: "TECHNOLOGY",
    title: "Beyond the Digital World",
    color: "#48B8F5",
    content:
      "The next industrial revolution is not confined to computer screens. It is happening in laboratories, power plants, factories and infrastructure across the world.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1800&q=85",
  },
  {
    chapter: "ENGINEERING",
    title: "Rebuilding Everything",
    color: "#4588D2",
    content:
      "Manufacturing, infrastructure and logistics are entering a new era. Engineering is becoming the foundation of a different kind of progress.",
    image:
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1800&q=85",
  },
  {
    chapter: "ENERGY",
    title: "The Energy Transition",
    color: "#39C879",
    content:
      "Energy is at the heart of every modern society. From renewable resources to advanced nuclear technology, the way we produce and distribute energy is changing.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1800&q=85",
  },
  {
    chapter: "FUTURE",
    title: "A World Reimagined",
    color: "#59A67D",
    content:
      "The industries being built today will define how future generations live, work and move. This is more than technological progress. It is a transformation of society.",
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
  const geometryRef = useRef<HTMLDivElement>(null);
  const chapterNavigationRef = useRef<HTMLElement>(null);
  const readingTrackRef = useRef<HTMLDivElement>(null);
  const readingProgressRef = useRef<HTMLDivElement>(null);
  const readingPercentageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateBackground = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const readingProgress =
        maxScroll > 0 ? clamp(window.scrollY / maxScroll) : 0;
      const readingPercentage = Math.round(readingProgress * 100);

      geometryRef.current?.style.setProperty(
        "--geometry-scroll",
        `${(readingProgress - 0.5) * 90}px`
      );

      readingProgressRef.current?.style.setProperty(
        "width",
        `${readingPercentage}%`
      );
      readingTrackRef.current?.setAttribute(
        "aria-valuenow",
        String(readingPercentage)
      );
      readingPercentageRef.current?.replaceChildren(
        `${readingPercentage}%`
      );

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(".article-section")
      );

      if (!sections.length) return;

      const viewportCenterY = window.innerHeight * 0.5;
      const chapterThreshold = window.innerHeight * 0.8;
      const nextChapterIndex = sections.findIndex(
        (section) => section.getBoundingClientRect().top > chapterThreshold
      );
      const chapterIndex =
        nextChapterIndex === -1
          ? sections.length - 1
          : Math.max(0, nextChapterIndex - 1);
      const colorSectionIndex = sections.findIndex((section) => {
        const bounds = section.getBoundingClientRect();
        return viewportCenterY >= bounds.top && viewportCenterY < bounds.bottom;
      });

      let activeColor = articles[0].color;
      let nextColor = activeColor;
      let progress = 0;
      let transitioning = false;

      const transitionDistance = window.innerHeight * 0.2;

      for (let index = 0; index < sections.length - 1; index += 1) {
        const boundary = sections[index + 1].getBoundingClientRect().top;
        const transitionStart = boundary - transitionDistance;
        const transitionEnd = boundary + transitionDistance;

        if (
          viewportCenterY >= transitionStart &&
          viewportCenterY <= transitionEnd
        ) {
          activeColor = articles[index].color;
          nextColor = articles[index + 1].color;
          progress = clamp(
            (viewportCenterY - transitionStart) /
              (transitionEnd - transitionStart)
          );
          transitioning = true;
          break;
        }
      }

      if (!transitioning) {
        const settledIndex =
          colorSectionIndex === -1
            ? viewportCenterY < sections[0].getBoundingClientRect().top
              ? 0
              : sections.length - 1
            : colorSectionIndex;
        activeColor = articles[settledIndex]?.color ?? articles[0].color;
        nextColor = activeColor;
      }

      sections.forEach((section, index) => {
        section.classList.toggle("is-current", index === chapterIndex);

        const title = section.querySelector<HTMLElement>(".article-title");
        if (!title?.classList.contains("visible")) return;

        const titleTop = title.getBoundingClientRect().top;
        title.classList.toggle(
          "is-leaving",
          titleTop < window.innerHeight * 0.12
        );
      });

      const interpolated = interpolateColor(
        activeColor,
        nextColor,
        progress
      );

      readingProgressRef.current?.style.setProperty(
        "background-color",
        interpolated
      );
      geometryRef.current?.style.setProperty(
        "--geometry-color",
        interpolated
      );
      chapterNavigationRef.current?.style.setProperty(
        "--chapter-active-color",
        interpolated
      );
      chapterNavigationRef.current
        ?.querySelectorAll<HTMLAnchorElement>(".chapter-link")
        .forEach((link, index) => {
          if (index === chapterIndex) {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "location");
          } else {
            link.classList.remove("is-active");
            link.removeAttribute("aria-current");
          }
        });

      const gradientOpacity = transitioning
        ? Math.sin(progress * Math.PI) * 0.55
        : 0;

      if (!backgroundRef.current) return;

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

    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const onPointerMove = (event: PointerEvent) => {
      if (
        !pointerQuery.matches ||
        reducedMotionQuery.matches ||
        !geometryRef.current
      ) {
        return;
      }

      const horizontal = event.clientX / window.innerWidth - 0.5;
      const vertical = event.clientY / window.innerHeight - 0.5;

      geometryRef.current.style.setProperty(
        "--geometry-rotate-x",
        `${vertical * -14}deg`
      );
      geometryRef.current.style.setProperty(
        "--geometry-rotate-y",
        `${horizontal * 18}deg`
      );
    };
    const resetPointer = () => {
      geometryRef.current?.style.setProperty("--geometry-rotate-x", "0deg");
      geometryRef.current?.style.setProperty("--geometry-rotate-y", "0deg");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateBackground);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", resetPointer);

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
      { rootMargin: "0px 0px -30% 0px", threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="editorial-page">
      <div
        className="reading-progress-track"
        ref={readingTrackRef}
        role="progressbar"
        aria-label="Article reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <div className="reading-progress-fill" ref={readingProgressRef} />
        <span
          className="reading-progress-percentage"
          aria-hidden="true"
          ref={readingPercentageRef}
        >
          0%
        </span>
      </div>

      <nav
        className="chapter-navigation"
        ref={chapterNavigationRef}
        aria-label="Article chapters"
      >
        {articles.map((article, index) => (
          <a
            className="chapter-link"
            href={`#article-${index + 1}`}
            key={article.chapter}
          >
            <span className="chapter-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="chapter-rule" aria-hidden="true" />
            <span className="chapter-label">{article.chapter}</span>
          </a>
        ))}
      </nav>

      {/* DYNAMIC BACKGROUND */}
      <div className="dynamic-background" ref={backgroundRef}>
        <div className="background-gradient" />
      </div>

      <div className="geometry-stage" ref={geometryRef} aria-hidden="true">
        <div className="geometry-drift">
          <div className="geometry-cluster">
            <div className="geometry-orbit geometry-orbit--outer" />
            <div className="geometry-orbit geometry-orbit--inner" />
            <div className="geometry-cube">
              <span className="geometry-face geometry-face--front" />
              <span className="geometry-face geometry-face--back" />
              <span className="geometry-face geometry-face--right" />
              <span className="geometry-face geometry-face--left" />
              <span className="geometry-face geometry-face--top" />
              <span className="geometry-face geometry-face--bottom" />
            </div>
          </div>
        </div>
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
              <h1 className="article-title reveal">
                {article.title}
              </h1>

              <figure
                className={`article-image${index === 0 ? " article-image--introduction" : ""} reveal`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </figure>
            </section>

            {/* ARTICLE BODY */}
            <section className="article-body">
              <div className="body-content">
                <p className="body-lead reveal">{article.content}</p>
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
