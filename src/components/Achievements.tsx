"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, animate } from "framer-motion";
import { Award, Users, Globe, Trophy, X, Images } from "lucide-react";
import { fadeUp, staggerContainer, viewportRepeat } from "@/lib/animations";
import { ACHIEVEMENTS } from "@/lib/constants";
import type { ResultsFolderKey, ResultsGalleryData } from "@/lib/get-results-showcase";
import { cldImage } from "@/lib/media";

const ICONS = [Users, Trophy, Globe, Award];

const MODAL_TITLE: Record<ResultsFolderKey, string> = {
  state: "State level",
  national: "National level",
  international: "International",
  graduation: "Graduation ceremony",
  others: "Other competitions",
};

function StatCard({
  achievement,
  index,
  hasPhotos,
  onOpen,
}: {
  achievement: (typeof ACHIEVEMENTS)[0];
  index: number;
  hasPhotos: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const Icon = ICONS[index % ICONS.length];

  useEffect(() => {
    if (!isInView) {
      motionVal.set(0);
      setDisplay("0");
      return;
    }
    motionVal.set(0);
    const controls = animate(motionVal, achievement.value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = motionVal.on("change", (v) =>
      setDisplay(String(Math.round(v)))
    );
    return () => {
      controls.stop();
      unsub();
    };
  }, [isInView, achievement.value, motionVal]);

  return (
    <motion.button
      type="button"
      ref={ref}
      variants={fadeUp}
      onClick={() => hasPhotos && onOpen()}
      disabled={!hasPhotos}
      className={`bg-white rounded-3xl p-7 border text-center transition-all duration-300 w-full ${
        hasPhotos
          ? "border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer hover:border-[#C8102E]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]/40"
          : "border-gray-100/80 opacity-75 cursor-not-allowed"
      }`}
    >
      <div className="w-14 h-14 bg-gradient-to-br from-[#C8102E]/10 to-[#0B0F19]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-[#C8102E]" />
      </div>
      <div className="text-4xl font-bold text-[#0B0F19] mb-1">
        {display}
        <span className="text-[#C8102E]">{achievement.suffix}</span>
      </div>
      <div className="text-sm text-[#64748B] font-medium">{achievement.label}</div>
      {hasPhotos ? (
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C8102E]">
          <Images size={14} aria-hidden />
          View photos
        </div>
      ) : (
        <p className="mt-3 text-[11px] text-[#94a3b8]">Photos coming soon</p>
      )}
    </motion.button>
  );
}

export default function Achievements({ galleryData }: { galleryData: ResultsGalleryData }) {
  const { preview, galleries } = galleryData;
  const [openCategory, setOpenCategory] = useState<ResultsFolderKey | null>(null);

  const openModal = (key: ResultsFolderKey) => {
    const ids = galleries[key];
    if (ids?.length) setOpenCategory(key);
  };

  const activeIds = openCategory ? galleries[openCategory] ?? [] : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCategory(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="results" className="py-20 sm:py-28 section-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportRepeat}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 border border-white/20">
            Results & Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0F19] font-heading tracking-tight mb-4">
            Our Students <span className="text-[#D4AF37]">Compete & Win</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-base">
            Tap a category to see the full gallery. Highlights below are a quick preview.
          </p>
        </motion.div>

        {/* Preview strip — 3–4 photos */}
        {preview.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportRepeat}
            className="mb-10"
          >
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Preview
            </p>
            <div
              className={`grid mx-auto ${
                preview.length <= 2
                  ? "max-w-2xl grid-cols-2 gap-4 sm:gap-5"
                  : preview.length === 3
                    ? "max-w-5xl grid-cols-3 gap-4 sm:gap-5"
                    : "max-w-7xl grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
              }`}
            >
              {preview.map((item) => (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => openModal(item.category)}
                  className="relative aspect-[3/2] sm:aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-lg group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <Image
                    src={cldImage(item.publicId)}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <span className="text-white text-xs sm:text-sm font-semibold drop-shadow-md">
                      {item.caption}
                    </span>
                    <span className="block text-[11px] sm:text-xs text-white/80 mt-1">Tap to open album</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stat cards — open full album per category */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6"
        >
          {ACHIEVEMENTS.map((a, i) => (
            <StatCard
              key={a.label}
              achievement={a}
              index={i}
              hasPhotos={(galleries[a.galleryKey]?.length ?? 0) > 0}
              onOpen={() => openModal(a.galleryKey)}
            />
          ))}
        </motion.div>

        {/* Album modal */}
        <AnimatePresence>
          {openCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="results-modal-title"
              onClick={() => setOpenCategory(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0B0F19] border border-white/10 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5 border-b border-white/10 shrink-0">
                  <h3 id="results-modal-title" className="text-lg font-bold text-white font-heading">
                    {MODAL_TITLE[openCategory]}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setOpenCategory(null)}
                    className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close"
                  >
                    <X size={22} />
                  </button>
                </div>
                <div className="overflow-y-auto p-4 sm:p-5">
                  {activeIds.length === 0 ? (
                    <p className="text-white/60 text-sm text-center py-12">No photos in this album yet.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {activeIds.map((pid) => (
                        <div
                          key={pid}
                          className="relative aspect-square rounded-xl overflow-hidden bg-black/40 ring-1 ring-white/10"
                        >
                          <Image
                            src={cldImage(pid)}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
