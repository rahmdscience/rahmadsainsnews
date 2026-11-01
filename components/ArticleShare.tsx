"use client";

import { useEffect, useState } from "react";

type ArticleShareProps = { title: string };

export function ArticleShare({ title }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareUrl = () => currentUrl;
  const copyLink = async () => {
    const url = shareUrl();
    if (!url) return;
    try { await navigator.clipboard.writeText(url); } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const openNativeShare = async () => {
    if (navigator.share) await navigator.share({ title, url: shareUrl() });
  };
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <section className="article-share" aria-labelledby="article-share-heading">
      <div><h2 id="article-share-heading">Carry it forward</h2><p>Send this story to someone who needs the point.</p></div>
      <div className="article-share-actions">
        <a href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encodedUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href={"https://twitter.com/intent/tweet?url=" + encodedUrl + "&text=" + encodedTitle} target="_blank" rel="noopener noreferrer">X ↗</a>
        <a href={"https://wa.me/?text=" + encodedTitle + "%20" + encodedUrl} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
        <button type="button" onClick={copyLink}>{copied ? "Copied" : "Copy link"}</button>
        {currentUrl && typeof navigator !== "undefined" && navigator.share ? <button type="button" onClick={openNativeShare}>Share</button> : null}
      </div>
    </section>
  );
}
