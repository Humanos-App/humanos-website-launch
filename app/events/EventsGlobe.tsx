"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type GlobeHandle = { destroy: () => void };

declare global {
  interface Window {
    HumanosGlobe?: { mount: (el: HTMLCanvasElement) => GlobeHandle };
  }
}

/* The dot globe from the design system (public/designs/_shared/globe.js).
   It's a plain browser script that owns its own frame loop and observers,
   so mounting is just handing it the canvas — but it can become ready in
   either order: script after canvas (onReady) or canvas after script
   (effect, when the script is already cached from a previous visit). */
export function EventsGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handleRef = useRef<GlobeHandle | null>(null);

  const mount = useCallback(() => {
    if (handleRef.current || !canvasRef.current || !window.HumanosGlobe) return;
    handleRef.current = window.HumanosGlobe.mount(canvasRef.current);
  }, []);

  useEffect(() => {
    mount();
    return () => {
      handleRef.current?.destroy();
      handleRef.current = null;
    };
  }, [mount]);

  return (
    <div className="events__globe" aria-hidden="true">
      <Script
        src="/designs/_shared/globe.js"
        strategy="afterInteractive"
        onReady={mount}
      />
      <canvas ref={canvasRef} className="events__globe-canvas" />
    </div>
  );
}
