"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { HOW_IT_WORKS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1B3A6B] text-sm font-semibold rounded-full mb-4">
            The Process
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            How It <span className="text-[#1B3A6B]">Works</span>
          </h2>
          <p className="mt-4 text-[#6B7280] max-w-xl mx-auto text-base">
            Four progressive stages take a child from abacus beginner to mental
            math champion.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#FFB800] via-[#E31837] to-[#1B3A6B] rounded-full" />

          {HOW_IT_WORKS.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              className="relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Step number bubble */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E31837] to-[#1B3A6B] flex items-center justify-center mb-5">
                <span className="text-white font-bold text-lg">{step.step}</span>
              </div>

              <h3
                className="text-lg font-bold text-[#1A1A2E] mb-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Step connector arrow (desktop) */}
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-6 z-20">
                  <div className="w-full h-full bg-white rounded-full border-2 border-[#E31837] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#E31837] rounded-full" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
