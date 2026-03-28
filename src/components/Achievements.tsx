"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Award, Users, Globe, Trophy } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { ACHIEVEMENTS } from "@/lib/constants";

const ICONS = [Trophy, Users, Globe, Award];

function StatCard({
  achievement,
  index,
}: {
  achievement: (typeof ACHIEVEMENTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const Icon = ICONS[index % ICONS.length];

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, achievement.value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = motionVal.on("change", (v) =>
      setDisplay(String(Math.round(v)))
    );
    return () => { controls.stop(); unsub(); };
  }, [isInView, achievement.value, motionVal]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-[#E31837]/10 to-[#1B3A6B]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-[#E31837]" />
      </div>
      <div className="text-4xl font-bold text-[#1A1A2E] mb-1">
        {display}
        <span className="text-[#E31837]">{achievement.suffix}</span>
      </div>
      <div className="text-sm text-[#6B7280] font-medium">{achievement.label}</div>
    </motion.div>
  );
}

const ACHIEVEMENT_PHOTOS = [
  { src: "/photos/competition-1.jpg", caption: "District Competition" },
  { src: "/photos/trophy-1.jpg", caption: "National Winners" },
  { src: "/photos/kids-award.jpg", caption: "Award Ceremony" },
  { src: "/photos/classroom-2.jpg", caption: "Daily Training" },
];

export default function Achievements() {
  return (
    <section id="results" className="py-20 sm:py-28 section-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 border border-white/20">
            Results & Achievements
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Our Students{" "}
            <span className="text-[#FFB800]">Compete & Win</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-base">
            R D Abacus Nadiad has produced winners at district, state, and
            national UCMAS competitions.
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
        >
          {ACHIEVEMENTS.map((a, i) => (
            <StatCard key={a.label} achievement={a} index={i} />
          ))}
        </motion.div>

        {/* Photo grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {ACHIEVEMENT_PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative rounded-2xl overflow-hidden group aspect-square"
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-white text-xs font-medium">{photo.caption}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
