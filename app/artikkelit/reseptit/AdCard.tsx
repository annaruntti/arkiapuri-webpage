"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdCard() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center min-h-[400px]">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-6n+e4+33-69+4g"
        data-ad-client="ca-pub-6513624758655536"
        data-ad-slot="1877892753"
      />
    </div>
  );
}
