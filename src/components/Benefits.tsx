"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  BookOpen,
  Star,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { BENEFITS } from "@/lib/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, React.ComponentType<any>> = {
  Brain,
  Zap,
  BookOpen,
  Star,
  Lightbulb,
  TrendingUp,
};

const CARD_COLORS = [
  { bg: "#FFF5F5", icon: "#C8102E", border: "#FECACA" },
  { bg: "#EFF6FF", icon: "#0B0F19", border: "#BFDBFE" },
  { bg: "#FFFBEB", icon: "#D4AF37", border: "#FDE68A" },
  { bg: "#F0FDF4", icon: "#22C55E", border: "#BBF7D0" },
  { bg: "#FAF5FF", icon: "#9333EA", border: "#E9D5FF" },
  { bg: "#EFF6FF", icon: "#0B0F19", border: "#BFDBFE" },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#C8102E] text-sm font-semibold rounded-full mb-4">
            Why UCMAS?
          </span>
          <h2
            className=" font-heading"
          >
            6 Skills Your Child Will{" "}
            <span className="text-[#C8102E]">Master</span>
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto text-base">
            UCMAS doesn&apos;t just teach math. It rewires the brain for lifelong
            excellence.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {BENEFITS.map((benefit, i) => {
            const Icon = ICONS[benefit.icon];
            const color = CARD_COLORS[i];
            return (
              <motion.div
                key={benefit.title}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative rounded-3xl p-7 border transition-shadow duration-300 hover:shadow-xl cursor-default ${
                  benefit.large ? "lg:col-span-1" : ""
                }`}
                style={{
                  backgroundColor: color.bg,
                  borderColor: color.border,
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: color.icon + "20" }}
                >
                  <span style={{ color: color.icon }}>
                    <Icon size={22} />
                  </span>
                </div>

                {/* Content */}
                <h3
                  className=" font-heading"
                >
                  {benefit.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
