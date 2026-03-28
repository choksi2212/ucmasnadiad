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
        {/* Elegant deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/95 via-[#0B0F19]/70 to-[#0B0F19]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Subtle abstract blurs instead of garish circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />

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
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/90 text-xs tracking-[0.15em] uppercase font-medium shadow-2xl">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
              World's #1 Mental Arithmetic Program
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6 font-heading"
          >
            Unlock Your Child's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FDE047]">Hidden Potential</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-xl"
          >
            UCMAS is a globally proven abacus-based mental arithmetic program
            for children aged 4–13 that builds speed, memory, and confidence.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-5 mb-12">
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 bg-[#C8102E] text-white text-sm tracking-wide uppercase font-semibold rounded-full hover:bg-[#9B0C23] transition-all duration-300 shadow-[0_4px_14px_0_rgba(200,16,46,0.25)] hover:shadow-[0_6px_20px_rgba(200,16,46,0.4)] hover:-translate-y-0.5"
            >
              Book a Free Demo
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-8 py-4 bg-transparent text-white text-sm tracking-wide uppercase font-semibold rounded-full border border-white/20 hover:bg-white/5 transition-all duration-300"
            >
              See How It Works
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
                className="flex items-center gap-2 text-white/60 text-xs tracking-wider uppercase font-medium"
              >
                <span className="w-1.5 h-1.5 bg-[#D4AF37]/70 rounded-full" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>



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
