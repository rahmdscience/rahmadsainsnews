"use client";

import { useEffect, useState } from "react";

export function ArticleShare() {
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
  return (
    <section className="article-share" aria-labelledby="article-share-heading">
      <div><h2 id="article-share-heading">Carry it forward</h2><p>Send this story to someone who needs the point.</p></div>
      <div className="article-share-actions">
        <button type="button" onClick={copyLink} disabled={!currentUrl}>{copied ? "Copied" : "Copy link"}</button>
      </div>
    </section>
  );
}
