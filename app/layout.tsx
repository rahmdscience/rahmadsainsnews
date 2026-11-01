
import type { Metadata } from "next";
import "./globals.css";
import { articles } from "../content/article-data";
import { siteConfig, siteUrl } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | RSAH Journal",
  },
  description: siteConfig.description,
  keywords: [
    "editorial journal",
    "industrial innovation",
    "technology",
    "design",
    "energy",
    "engineering",
    "future",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/images/Rahmad%20Sains_Arc.png",
        width: 600,
        height: 900,
        alt: "Abstract architectural form by Rahmad Sains",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/Rahmad%20Sains_Arc.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteUrl,
  inLanguage: "en-US",
  author: { "@type": "Person", name: siteConfig.author },
  publisher: { "@type": "Person", name: siteConfig.author },
  blogPost: articles.map((article, index) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription,
    articleSection: article.chapter,
    url: `${siteUrl}/#article-${index + 1}`,
    image: article.socialImage.startsWith("http") ? article.socialImage : `${siteUrl}${article.socialImage}`,
    author: { "@type": "Person", name: article.author },
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
  })),
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
