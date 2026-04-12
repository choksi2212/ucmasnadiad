"use client";

import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useHeroScroll } from "@/contexts/HeroScrollContext";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SITE } from "@/lib/constants";
import { VideoText } from "@/components/ui/video-text";
import { cldImage, cldVideo, MEDIA } from "@/lib/media";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const { heroScrollRef, scrollYProgress } = useHeroScroll();

  /* Letters “open” = spacing between glyphs only (no block stretch) */
  const letterSpacingMotion = useTransform(scrollYProgress, [0, 0.38], [0, 0.72]);
  const [letterSpacingEm, setLetterSpacingEm] = useState(0);
  useMotionValueEvent(letterSpacingMotion, "change", setLetterSpacingEm);
  useLayoutEffect(() => {
    setLetterSpacingEm(letterSpacingMotion.get());
  }, [letterSpacingMotion]);

  /* Phase 2 — dissolve title, bring in site */
  const videoTextOpacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);

  const contentOpacity = useTransform(scrollYProgress, [0.26, 0.55], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.26, 0.55], [48, 0]);

  const bgImageOpacity = useTransform(scrollYProgress, [0, 0.42], [0, 1]);
  const overlayStrength = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const decorOpacity = useTransform(scrollYProgress, [0, 0.28], [0, 1]);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="home" className="relative">
      <div ref={heroScrollRef} className="relative h-[280vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0B0F19]">
          {/* Photo — hidden until scroll */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{ opacity: bgImageOpacity }}
            aria-hidden
          >
            <Image
              src={cldImage(MEDIA.photos.classroom1)}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/95 via-[#0B0F19]/70 to-[#0B0F19]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-[1] bg-[#0B0F19] pointer-events-none"
            style={{ opacity: overlayStrength }}
            aria-hidden
          />

          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-[100px] z-[2] pointer-events-none"
            style={{ opacity: decorOpacity }}
            aria-hidden
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] z-[2] pointer-events-none"
            style={{ opacity: decorOpacity }}
            aria-hidden
          />

          {/* Two-line title: “R D” / “ABACUS” — letter-spacing opens on scroll, then fades */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{ opacity: videoTextOpacity }}
          >
            <div className="relative w-screen max-w-[100vw] px-1 sm:px-2 h-[min(74vh,920px)] min-h-[340px] sm:min-h-[460px] md:min-h-[520px]">
              <VideoText
                src={cldVideo(MEDIA.heroVideo)}
                lines={["R D", "ABACUS"]}
                fontSize={46}
                fontWeight={1000}
                fontFamily="Outfit, system-ui, sans-serif"
                letterSpacingEm={letterSpacingEm}
                strokeWidthRatio={0.03}
                className="h-full w-full"
              />
            </div>
          </motion.div>

          {/* Rest of hero — appears as title opens / after */}
          <motion.div
            className="relative z-10 flex h-full max-w-7xl mx-auto px-4 sm:px-6 w-full items-center pt-20 pb-24"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/90 text-xs tracking-[0.15em] uppercase font-medium shadow-2xl">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                  UCMAS 2.0 · Vedic Maths & more
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6 font-heading"
              >
                Unlock Your Child&apos;s{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FDE047]">
                  Hidden Potential
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-xl"
              >
                Abacus-based mental math for ages 4–13 — structured as Foundation, Refine, Ascend,
                Masters.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-5 mb-12">
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="px-8 py-4 bg-[#C8102E] text-white text-sm tracking-wide uppercase font-semibold rounded-full hover:bg-[#9B0C23] transition-all duration-300 shadow-[0_4px_14px_0_rgba(200,16,46,0.25)] hover:shadow-[0_6px_20px_rgba(200,16,46,0.4)] hover:-translate-y-0.5"
                >
                  Book a Free Demo
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("about")}
                  className="px-8 py-4 bg-transparent text-white text-sm tracking-wide uppercase font-semibold rounded-full border border-white/20 hover:bg-white/5 transition-all duration-300"
                >
                  See How It Works
                </button>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "80+ Countries",
                  "6M+ Students Globally",
                  "Since 1993",
                  "Nadiad's Top Center",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-2 text-white/60 text-xs tracking-wider uppercase font-medium"
                  >
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]/70 rounded-full" />
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[15] bg-gradient-to-t from-black/40 to-transparent py-3"
            style={{ opacity: chromeOpacity }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
              <span className="text-white/60 text-xs">{SITE.address}</span>
              <a
                href={`tel:${SITE.phone}`}
                className="text-white/60 text-xs hover:text-white transition-colors"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
