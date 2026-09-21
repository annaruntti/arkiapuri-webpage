"use client";

import { useState, type CSSProperties } from "react";

interface YouTubeFacadeEmbedProps {
  videoId: string;
  title?: string;
}

const mobileIframeStyle: CSSProperties = {
  width: "250%",
  height: "745px",
  position: "absolute",
  top: "-42px",
  left: "-75%",
  border: "none",
};

const embedSrc = (videoId: string, autoplay: boolean) =>
  `https://www.youtube-nocookie.com/embed/${videoId}?${autoplay ? "autoplay=1&" : ""}controls=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&fs=1`;

export function YouTubeFacadeEmbed({
  videoId,
  title = "Arkiapuri esittelyvideo",
}: YouTubeFacadeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="mx-auto overflow-hidden rounded-lg relative w-full max-w-[21rem] md:w-80 youtube-container bg-black"
      style={{ height: "700px" }}
    >
      {/* Mobile: original iframe (thumbnail + play share the same crop) */}
      <iframe
        src={embedSrc(videoId, false)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-lg youtube-embed md:hidden"
        role="application"
        aria-label={title}
        loading="lazy"
        style={mobileIframeStyle}
      />

      {/* Desktop: facade thumbnail, then cropped iframe on play */}
      {isPlaying ? (
        <iframe
          src={embedSrc(videoId, true)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-lg youtube-embed hidden md:block"
          role="application"
          aria-label={title}
          style={mobileIframeStyle}
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full group cursor-pointer border-0 p-0 bg-black hidden md:block"
          aria-label={`Toista video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-white shadow-lg group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 ml-1"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 769px) {
            .youtube-embed {
              width: 340px !important;
              height: 812px !important;
              left: -40px !important;
              top: -116px !important;
            }
            .youtube-container {
              width: 260px !important;
              height: 563px !important;
            }
          }
        `,
        }}
      />
    </div>
  );
}
