import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "RSAH is a sharp, young journal about independent thought, sport, and the work of choosing a direction.",
  alternates: { canonical: "/about" },
};

const principles = [
  ["01", "Question the obvious", "A loud opinion is not automatically a good one. We make room to look again."],
  ["02", "Respect the repetition", "The work nobody sees still changes you. Sport keeps that truth honest."],
  ["03", "Choose a direction", "There is no perfect map. Build skills, make a move, and adjust without pretending."],
];

export default function AboutPage() {
  return (
    <main className="about-page" id="top">
      <a className="skip-link" href="#about-content">Skip to about</a>
      <div className="about-shell">
        <header className="about-header">
          <Link href="/" className="article-detail-brand">RSAH <span>#tangguh</span></Link>
          <Link href="/" className="about-back-link">Back to chapters ↑</Link>
        </header>
        <section className="about-hero" id="about-content" aria-labelledby="about-title">
          <p className="article-detail-kicker">RSAH / About</p>
          <h1 id="about-title">Stay soft enough to think. Tough enough to act.</h1>
          <p>RSAH is a journal for people building a point of view before the world hands them one.</p>
        </section>
        <section className="about-principles" aria-labelledby="principles-title">
          <div className="about-section-heading"><p className="article-detail-kicker">What we keep close</p><h2 id="principles-title">Three ways to stay #tangguh.</h2></div>
          <div className="about-principles-grid">
            {principles.map(([number, title, copy]) => <article className="about-principle" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>
        <section className="about-chapters" aria-labelledby="chapters-title">
          <p className="article-detail-kicker">The chapters</p>
          <h2 id="chapters-title">Thoughts. Sports. Vocation Life.</h2>
          <p>Different subjects, same question: what are you doing with the person you are becoming?</p>
          <Link href="/" className="about-cta">Read the journal →</Link>
        </section>
        <footer className="article-detail-footer"><span>RSAH · #tangguh</span><Link href="#top">Back to top ↑</Link></footer>
      </div>
    </main>
  );
}
