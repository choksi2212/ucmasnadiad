"use client";

import React, {
  ElementType,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface VideoTextProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  children?: ReactNode;
  /** Stacked lines (e.g. ["R D", "ABACUS"]). When set, overrides single-line `children`. */
  lines?: string[];
  /** Width × (value / 100) — used as a scale hint; two lines share one font size. */
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
  /** Opens letters: spacing between glyphs (em), not whole-block stretch */
  letterSpacingEm?: number;
  /** Widen glyph outlines in the mask (fraction of computed font size). Increases visible video area. */
  strokeWidthRatio?: number;
  as?: ElementType;
}

function buildMaskDataUrl(
  w: number,
  h: number,
  lines: string[],
  fontSize: string | number,
  fontWeight: string | number,
  textAnchor: string,
  dominantBaseline: string,
  fontFamily: string,
  letterSpacingEm: number,
  strokeWidthRatio: number
): string {
  const safeFamily = String(fontFamily).replace(/"/g, "").replace(/'/g, "");
  const fw = String(fontWeight);
  const ls = Math.max(0, letterSpacingEm);
  const n = Math.max(1, lines.length);

  const fromW =
    typeof fontSize === "number"
      ? (w * fontSize) / 100
      : parseFloat(String(fontSize)) || (w * 11) / 100;

  const longest = lines.reduce((a, b) => (a.length >= b.length ? a : b), lines[0] ?? "");
  const maxChars = Math.max(longest.length, 1);

  let fontPx: number;
  if (n >= 2) {
    const half = (h * 0.92) / 2;
    const byHeight = half * 0.78;
    const byWidth = (w * 0.94) / (maxChars * 0.58 + ls * maxChars * 0.45);
    fontPx = Math.max(72, Math.round(Math.min(fromW * 0.52, byHeight, byWidth)));
  } else {
    const fromH = h * 0.58;
    fontPx = Math.max(64, Math.round(Math.min(fromW, fromH)));
  }

  const spread = 1 + Math.min(letterSpacingEm, 0.95) * 0.98;
  const vw = Math.max(w, Math.round(w * spread));
  const cx = vw / 2;
  const sw = Math.max(0, strokeWidthRatio) * fontPx;
  const strokeAttrs =
    sw > 0
      ? ` stroke="white" stroke-width="${sw.toFixed(2)}" stroke-linejoin="round" paint-order="stroke fill"`
      : "";

  const textNodes = lines.map((raw, i) => {
    const escaped = escapeXml(raw);
    if (n === 1) {
      const cy = h / 2 + fontPx * 0.06;
      return `<text fill="white"${strokeAttrs} x="${cx}" y="${cy}" font-size="${fontPx}" font-weight="${fw}" letter-spacing="${ls}em" text-anchor="${textAnchor}" dominant-baseline="${dominantBaseline}" font-family="${safeFamily}">${escaped}</text>`;
    }
    const mid = h / 2;
    const rowGap = fontPx * 0.12;
    const yTop = mid - fontPx * 0.52 - rowGap * 0.5;
    const yBot = mid + fontPx * 0.52 + rowGap * 0.5;
    const y = i === 0 ? yTop : yBot;
    return `<text fill="white"${strokeAttrs} x="${cx}" y="${y}" font-size="${fontPx}" font-weight="${fw}" letter-spacing="${ls}em" text-anchor="${textAnchor}" dominant-baseline="${dominantBaseline}" font-family="${safeFamily}">${escaped}</text>`;
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${h}" preserveAspectRatio="xMidYMid meet">${textNodes.join("")}</svg>`;

  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  lines: linesProp,
  fontSize = 11,
  fontWeight = 800,
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "Outfit, system-ui, sans-serif",
  letterSpacingEm = 0,
  strokeWidthRatio = 0,
  as: Component = "div",
}: VideoTextProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const single = React.Children.toArray(children).join("");
  const lines =
    linesProp && linesProp.length > 0 ? linesProp : single ? [single] : [""];
  const ariaLabel = lines.join(" ");

  const linesKey = lines.join("|");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || videoFailed) return;
    const tryPlay = () => {
      void v.play().catch(() => {});
    };
    v.addEventListener("canplay", tryPlay);
    tryPlay();
    return () => v.removeEventListener("canplay", tryPlay);
  }, [src, videoFailed]);

  const [maskUrl, setMaskUrl] = useState<string>(() =>
    buildMaskDataUrl(
      1400,
      640,
      lines,
      fontSize,
      fontWeight,
      textAnchor,
      dominantBaseline,
      fontFamily,
      letterSpacingEm,
      strokeWidthRatio
    )
  );

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const updateMask = () => {
      const { width, height } = el.getBoundingClientRect();
      const w = Math.max(80, Math.round(width));
      const h = Math.max(80, Math.round(height));
      setMaskUrl(
        buildMaskDataUrl(
          w,
          h,
          lines,
          fontSize,
          fontWeight,
          textAnchor,
          dominantBaseline,
          fontFamily,
          letterSpacingEm,
          strokeWidthRatio
        )
      );
    };

    updateMask();
    const ro = new ResizeObserver(updateMask);
    ro.observe(el);
    window.addEventListener("resize", updateMask);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateMask);
    };
  }, [
    linesKey,
    fontSize,
    fontWeight,
    textAnchor,
    dominantBaseline,
    fontFamily,
    letterSpacingEm,
    strokeWidthRatio,
  ]);

  return (
    <Component className={cn("relative size-full min-h-[120px]", className)}>
      <div ref={measureRef} className="absolute inset-0">
        <div
          className="absolute inset-0 overflow-hidden isolate"
          style={{
            maskImage: maskUrl,
            WebkitMaskImage: maskUrl,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        >
          {videoFailed ? (
            <div
              className="absolute inset-0 min-h-full min-w-full bg-gradient-to-br from-[#D4AF37] via-[#F59E0B] to-[#C8102E]"
              aria-hidden
            />
          ) : (
            <video
              ref={videoRef}
              key={src}
              src={src}
              className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover [transform:translateZ(0)]"
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              preload={preload}
              playsInline
              onError={() => setVideoFailed(true)}
            />
          )}
        </div>
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </Component>
  );
}
