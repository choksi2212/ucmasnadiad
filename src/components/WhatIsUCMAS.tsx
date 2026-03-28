"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Brain } from "lucide-react";
import { fadeLeft, fadeRight, staggerContainer, viewportOnce } from "@/lib/animations";

const KEY_POINTS = [
  "Founded in 1993 in Malaysia — now in 80+ countries",
  "Develops both left and right brain hemispheres",
  "Children calculate faster than a calculator — mentally",
  "Builds concentration, memory, and confidence simultaneously",
  "6 million+ students trained worldwide",
];

export default function WhatIsUCMAS() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#C8102E] text-sm font-semibold rounded-full mb-4">
            About the Program
          </span>
          <h2
            className=" font-heading"
          >
            What is <span className="text-[#C8102E]">UCMAS</span>?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Left */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="space-y-5 text-[#0B0F19]/80 text-base leading-relaxed mb-8">
              <p>
                UCMAS stands for{" "}
                <strong className="text-[#0B0F19]">
                  Universal Concept of Mental Arithmetic System
                </strong>{" "}
                — a globally proven brain development program built on
                abacus-based mental arithmetic training.
              </p>
              <p>
                Children begin by learning to use a physical abacus, mastering
                the movement of beads to solve calculations. Then, through
                structured training, they develop the extraordinary ability to
                visualize an abacus in their mind — performing complex
                calculations without any physical tool.
              </p>
              <p>
                The result is not just exceptional math ability — it&apos;s a
                fundamentally sharper brain. UCMAS develops concentration,
                working memory, visualization skills, and academic confidence
                that benefit children across every subject and stage of life.
              </p>
            </div>

            <div className="space-y-3">
              {KEY_POINTS.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 20 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={18} className="text-[#C8102E] mt-0.5 flex-shrink-0" />
                  <span className="text-[#0B0F19]/80 text-sm">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Media Right */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/photos/kids-math-1.jpg"
                alt="Children learning UCMAS mental arithmetic at R D Abacus Nadiad"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/40 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[220px]"
            >
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="text-[#C8102E]" size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0B0F19]">Brain Power</div>
                <div className="text-xs text-[#64748B]">Proven since 1993</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              className="absolute -top-6 -right-6 bg-[#C8102E] rounded-2xl shadow-xl p-4 text-center"
            >
              <div className="text-2xl font-bold text-white">80+</div>
              <div className="text-xs text-white/80">Countries</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
