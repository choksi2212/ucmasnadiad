"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  // Duplicate array for seamless infinite scroll
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-50 text-[#D4AF37] text-sm font-semibold rounded-full mb-4 border border-yellow-200">
            Testimonials
          </span>
          <h2
            className=" font-heading"
          >
            What Parents <span className="text-[#C8102E]">Say</span>
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto text-base">
            Real words from real parents whose children study at R D Abacus Nadiad.
          </p>
        </motion.div>
      </div>

      {/* Scrolling carousel — full bleed */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 auto-scroll" style={{ width: "max-content" }}>
          {items.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] sm:w-[360px] bg-[#FAFAFA] border border-gray-100 rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={24} className="text-[#C8102E]/30 mb-3" />

              {/* Quote text */}
              <p className="text-[#0B0F19] text-sm leading-relaxed mb-5 font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8102E] to-[#0B0F19] flex items-center justify-center text-white font-bold text-sm">
                  {t.parentName[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B0F19]">
                    {t.parentName}
                  </div>
                  <div className="text-xs text-[#64748B]">
                    Parent of {t.childName}, age {t.childAge} · {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
