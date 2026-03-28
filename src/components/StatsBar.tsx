"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { STATS } from "@/lib/constants";
import { fadeUp, viewportOnce } from "@/lib/animations";

function AnimatedCounter({
  value,
  suffix,
  compact,
}: {
  value: number;
  suffix: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsubscribe = motionVal.on("change", (v) => {
      const rounded = Math.round(v);
      if (compact && rounded >= 1000000) {
        setDisplay((rounded / 1000000).toFixed(1).replace(".0", "") + "M");
      } else if (compact && rounded >= 1000) {
        setDisplay((rounded / 1000).toFixed(0) + "K");
      } else {
        setDisplay(rounded.toLocaleString("en-IN"));
      }
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, value, motionVal, compact]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsBar() {
  return (
    <section className="bg-[#0B0F19] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  compact={stat.compact}
                />
                <span className="text-[#D4AF37]">{stat.suffix}</span>
              </div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
