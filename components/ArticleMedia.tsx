"use client";

import { useState } from "react";
import { ArticleImage } from "./ArticleImage";

type ArticleVideo = { src: string; poster: string; alt: string };

type ArticleMediaProps = {
  src: string;
  alt: string;
  video: ArticleVideo | null;
  mediaType: "image" | "video" | "mixed";
  priority?: boolean;
  className?: string;
};

export function ArticleMedia({
  src,
  alt,
  video,
  mediaType,
  priority = false,
  className = "",
}: ArticleMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = video && mediaType !== "image" && !videoFailed;

  if (showVideo) {
    return (
      <figure className={"article-media article-media--video " + className}>
        <video
          className="article-media-video"
          controls
          muted
          playsInline
          preload="metadata"
          poster={video.poster || undefined}
          aria-label={video.alt}
          onError={() => setVideoFailed(true)}
        >
          <source src={video.src} />
          Your browser does not support embedded video.
        </video>
      </figure>
    );
  }

  return <ArticleImage src={src} alt={alt} priority={priority} className={"article-media " + className} />;
}
