"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SITE } from "@/lib/constants";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/classroom-1.jpg"
          alt="UCMAS classroom in Nadiad"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A6B]/90 via-[#1B3A6B]/70 to-[#1B3A6B]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#E31837]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-[#FFB800]/10 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium">
              <span className="w-2 h-2 bg-[#FFB800] rounded-full animate-pulse" />
              World&apos;s #1 Mental Arithmetic Program
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Unlock Your Child&apos;s{" "}
            <span className="text-[#FFB800]">Hidden Potential</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-xl"
          >
            UCMAS is a globally proven abacus-based mental arithmetic program
            for children aged 4–13 that builds speed, memory, and confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3.5 bg-[#E31837] text-white font-semibold rounded-full hover:bg-[#b8102b] transition-all duration-200 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 text-base"
            >
              Book a Free Demo Class
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-200 text-base"
            >
              See How It Works →
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {[
              "80+ Countries",
              "6M+ Students Globally",
              "Since 1993",
              "Nadiad's Top Center",
            ].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-white/70 text-sm"
              >
                <span className="w-1 h-1 bg-[#FFB800] rounded-full" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full"
        />
      </motion.div>

      {/* Bottom address strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/40 to-transparent py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <span className="text-white/60 text-xs">{SITE.address}</span>
          <a
            href={`tel:${SITE.phone}`}
            className="text-white/60 text-xs hover:text-white transition-colors"
          >
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
