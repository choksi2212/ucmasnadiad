"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { viewportRepeat } from "@/lib/animations";
import { cldImage } from "@/lib/media";
import { LIFE_GALLERY_PUBLIC_IDS } from "@/lib/life-gallery.generated";

function splitForRows(ids: readonly string[]): [string[], string[]] {
  if (ids.length === 0) return [[], []];
  const mid = Math.ceil(ids.length / 2);
  return [ids.slice(0, mid), ids.slice(mid)];
}

function MarqueeRow({
  ids,
  direction,
  onPick,
}: {
  ids: string[];
  direction: "left" | "right";
  onPick: (id: string) => void;
}) {
  const loop = [...ids, ...ids];
  if (ids.length === 0) return null;

  return (
    <div className="overflow-hidden py-2">
      <div
        className={`flex w-max gap-4 md:gap-5 ${
          direction === "left" ? "marquee-life-left" : "marquee-life-right"
        }`}
      >
        {loop.map((id, i) => (
          <button
            key={`${id}-${i}`}
            type="button"
            onClick={() => onPick(id)}
            aria-label="View photo full size"
            className="relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-md transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] sm:h-52 sm:w-72"
          >
            <Image
              src={cldImage(id)}
              alt=""
              fill
              sizes="(max-width: 640px) 256px, 288px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [row1, row2] = useMemo(
    () => splitForRows([...LIFE_GALLERY_PUBLIC_IDS]),
    []
  );
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const hasPhotos = row1.length > 0 || row2.length > 0;

  return (
    <section id="gallery" className="overflow-hidden bg-[#FAFAFA] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportRepeat}
          className="mb-10 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-semibold text-[#C8102E]">
            Gallery
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-[#0B0F19] sm:text-4xl lg:text-5xl">
            Life at <span className="text-[#C8102E]">R D Abacus</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-[#64748B]">
            Moments from our center — classes, events, and celebrations.
          </p>
        </motion.div>
      </div>

      {!hasPhotos ? (
        <p className="px-4 text-center text-sm text-[#64748B]">
          Gallery photos coming soon. Add images to the <code className="rounded bg-black/5 px-1.5 py-0.5 text-xs">LIFE</code>{" "}
          folder and run <code className="rounded bg-black/5 px-1.5 py-0.5 text-xs">npm run upload:media</code>.
        </p>
      ) : (
        <div className="relative space-y-6">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent sm:w-24" />
          <MarqueeRow ids={row1} direction="left" onPick={setLightboxId} />
          <MarqueeRow ids={row2} direction="right" onPick={setLightboxId} />
        </div>
      )}

      <AnimatePresence>
        {lightboxId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxId(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative aspect-video w-full max-w-4xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={cldImage(lightboxId)}
                alt="Gallery"
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="rounded-2xl object-contain"
              />
            </motion.div>
            <button
              type="button"
              className="absolute right-4 top-4 text-3xl font-light text-white"
              onClick={() => setLightboxId(null)}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
