
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArticleImage } from "../components/ArticleImage";
import { articles } from "../content/article-data";


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

const chapters = ["Thoughts", "Sports", "Vocation Life"] as const;
const chapterStarts = chapters.map((chapter) =>
  articles.findIndex((article) => article.chapter === chapter)
);

export default function Home() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const geometryRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const chapterNavigationRef = useRef<HTMLElement>(null);
  const readingTrackRef = useRef<HTMLDivElement>(null);
  const readingProgressRef = useRef<HTMLDivElement>(null);
  const readingPercentageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".article-section")
    );
    const titles = sections.map((section) =>
      section.querySelector<HTMLElement>(".article-title")
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateBackground = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const readingProgress =
        maxScroll > 0 ? clamp(window.scrollY / maxScroll) : 0;
      const readingPercentage = Math.round(readingProgress * 100);

      if (!reducedMotionQuery.matches) {
        const geometryScroll = `${(readingProgress - 0.5) * 90}px`;
        geometryRef.current?.style.setProperty("--geometry-scroll", geometryScroll);
        sphereRef.current?.style.setProperty("--geometry-scroll", geometryScroll);
      }

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

      if (!sections.length) return;

      const viewportCenterY = window.innerHeight * 0.5;
      const sectionBounds = sections.map((section) =>
        section.getBoundingClientRect()
      );
      const colorSectionIndex = sectionBounds.findIndex((bounds) => {
        return viewportCenterY >= bounds.top && viewportCenterY < bounds.bottom;
      });

      let activeColor = articles[0].color;
      let nextColor = activeColor;
      let progress = 0;
      let transitioning = false;

      const transitionDistance = window.innerHeight * 0.2;

      for (let index = 0; index < sections.length - 1; index += 1) {
        const boundary = sectionBounds[index + 1].top;
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
            ? viewportCenterY < sectionBounds[0].top
              ? 0
              : sections.length - 1
            : colorSectionIndex;
        activeColor = articles[settledIndex]?.color ?? articles[0].color;
        nextColor = activeColor;
      }

      titles.forEach((title) => {
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
      sphereRef.current?.style.setProperty("--geometry-color", interpolated);
      chapterNavigationRef.current?.style.setProperty(
        "--chapter-active-color",
        interpolated
      );
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
    const scheduleUpdate = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        updateBackground();
        frame = 0;
      });
    };

    const onScroll = () => {
      scheduleUpdate();
    };

    updateBackground();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
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

      [geometryRef, sphereRef].forEach((stageRef) => {
        stageRef.current?.style.setProperty(
          "--geometry-rotate-x",
          `${vertical * -14}deg`
        );
        stageRef.current?.style.setProperty(
          "--geometry-rotate-y",
          `${horizontal * 18}deg`
        );
      });
    };
    const resetPointer = () => {
      [geometryRef, sphereRef].forEach((stageRef) => {
        stageRef.current?.style.setProperty("--geometry-rotate-x", "0deg");
        stageRef.current?.style.setProperty("--geometry-rotate-y", "0deg");
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", resetPointer);

      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".article-section")
    );
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".chapter-link")
    );

    const setCurrentChapter = (chapterIndex: number, activeSectionIndex: number) => {
      sections.forEach((section, sectionIndex) => {
        section.classList.toggle("is-current", sectionIndex === activeSectionIndex);
      });
      links.forEach((link, linkIndex) => {
        if (linkIndex === chapterIndex) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "location");
        } else {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        }
      });
    };

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.5) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.5)
          );
        const current = visibleEntries[0];
        if (!current) return;

        const articleIndex = sections.indexOf(current.target as HTMLElement);
        if (articleIndex !== -1) {
          const chapterIndex = chapters.indexOf(articles[articleIndex].chapter);
          setCurrentChapter(chapterIndex, articleIndex);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    setCurrentChapter(0, 0);

    return () => observer.disconnect();
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
    <main className="editorial-page" id="top">
      <a className="skip-link" href="#article-1">Skip to stories</a>
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
        {chapters.map((chapter, chapterIndex) => (
          <a
            className="chapter-link"
            href={"#article-" + (chapterStarts[chapterIndex] + 1)}
            key={chapter}
          >
            <span className="chapter-number">
              {String(chapterIndex + 1).padStart(2, "0")}
            </span>
            <span className="chapter-rule" aria-hidden="true" />
            <span className="chapter-label">{chapter}</span>
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

      <div
        className="geometry-stage geometry-sphere-stage"
        ref={sphereRef}
        aria-hidden="true"
      >
        <div className="geometry-drift">
          <div className="geometry-cluster">
            <div className="geometry-orbit geometry-orbit--outer" />
            <div className="geometry-orbit geometry-orbit--inner" />
            <div className="geometry-sphere">
              <span className="geometry-sphere-latitude" />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="site-container">
        <header className="topbar">
          <a href="#top" className="logo">RSAH</a>
          <div className="topbar-actions">
            <Link href="/about" className="topbar-about-link">About</Link>
            <a href="#top" className="topbar-pill" aria-label="RSAH tagline">#tangguh</a>
          </div>
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
            data-chapter={article.chapter}
            id={`article-${index + 1}`}
            aria-labelledby={`article-title-${index + 1}`}
          >
            <div className="article-index">
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* ARTICLE HERO */}
            <section className="article-hero">
              <p className="article-eyebrow reveal">{article.eyebrow}</p>
              {index === 0 ? (
                <h1 id={`article-title-${index + 1}`} className="article-title reveal">
                  {article.title}
                </h1>
              ) : (
                <h2 id={`article-title-${index + 1}`} className="article-title reveal">
                  {article.title}
                </h2>
              )}

              <p className="article-excerpt reveal">{article.excerpt}</p>

              <ArticleImage
                src={article.image}
                alt={article.imageAlt}
                priority={index === 0}
                introduction={index === 0}
                className="reveal"
              />

            </section>

            {/* ARTICLE BODY */}
            <section className="article-body">
              <div className="body-content">
                <p className="body-lead reveal">{article.body}</p>
              </div>
            </section>
          </article>
        ))}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-logo">RSAH</div>

          <div className="footer-details">
            <span>PEMIKIRAN SENDIRI · SPORT · #tangguh</span>
            <span>© 2026 ALL RIGHTS RESERVED</span>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
