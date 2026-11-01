"use client";

import Image from "next/image";
import { useState } from "react";

type ArticleImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  introduction?: boolean;
  className?: string;
};

export function ArticleImage({ src, alt, priority = false, introduction = false, className = "" }: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`article-image${introduction ? " article-image--introduction" : ""} ${className}`}>
      {hasError ? (
        <div className="article-image-fallback" role="img" aria-label={alt}>
          <span>Image unavailable</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={introduction ? "(max-width: 768px) calc(100vw - 64px), 500px" : "(max-width: 768px) calc(100vw - 64px), 960px"}
          quality={85}
          onError={() => setHasError(true)}
        />
      )}
    </figure>
  );
}
