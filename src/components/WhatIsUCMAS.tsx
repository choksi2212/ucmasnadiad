"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe2, Sparkles } from "lucide-react";
import { fadeLeft, fadeRight, viewportRepeat } from "@/lib/animations";
import { cldImage, MEDIA } from "@/lib/media";

const FRAM_STAGES = [
  { name: "Foundation", abbr: "F" },
  { name: "Refine", abbr: "R" },
  { name: "Ascend", abbr: "A" },
  { name: "Masters", abbr: "M" },
] as const;

export default function WhatIsUCMAS() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportRepeat}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#C8102E] text-sm font-semibold rounded-full mb-4">
            About the Program
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0F19] font-heading tracking-tight">
            UCMAS <span className="text-[#C8102E]">2.0</span>
          </h2>
          <p className="mt-3 text-[#64748B] text-sm sm:text-base max-w-lg mx-auto">
            Same proven abacus method — clearer journey for your child.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Copy + FRAM rail */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportRepeat}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="relative rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C8102E]/40 to-transparent" />
              <p className="text-lg sm:text-xl font-semibold text-[#0B0F19] font-heading leading-snug">
                Mental math that trains the whole brain — not just numbers.
              </p>
              <p className="mt-4 text-[#64748B] text-sm sm:text-base leading-relaxed">
                Kids learn the abacus, then visualize it in their mind for fast, accurate calculation.
                <span className="text-[#0B0F19] font-medium"> UCMAS&nbsp;2.0</span> organizes this path as{" "}
                <span className="text-[#0B0F19] font-medium">FRAM</span>, replacing the older FCAM blocks
                with four smooth stages.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0B0F19] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden />
                  FRAM pathway
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-[#FAFAFA] px-4 py-2 text-xs font-medium text-[#64748B]">
                  <Globe2 className="w-3.5 h-3.5 text-[#1B3A6B]" aria-hidden />
                  80+ countries · Since 1993
                </span>
              </div>
            </div>

            {/* Horizontal FRAM stepper — compact, visual */}
            <div className="rounded-3xl border border-gray-100 bg-[#0B0F19] p-6 sm:p-7 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4">
                FRAM — four stages
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {FRAM_STAGES.map((stage) => (
                  <div
                    key={stage.name}
                    className="rounded-2xl bg-white/5 py-3 px-2 text-center ring-1 ring-white/10"
                  >
                    <div className="text-lg font-bold text-[#D4AF37] font-heading">{stage.abbr}</div>
                    <div className="mt-1 text-[11px] sm:text-xs font-medium text-white/85 leading-snug">
                      {stage.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image + floating caption */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportRepeat}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={cldImage(MEDIA.photos.whatIsUcmasConference)}
                alt="UCMAS students in official program attire with instructors at an international UCMAS event"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0F19]/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="max-w-md text-sm sm:text-base text-white/95 font-medium leading-relaxed drop-shadow-md">
                  A global program with local heart — from classroom practice to international stages.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
