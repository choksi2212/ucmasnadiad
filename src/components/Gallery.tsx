"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const CATEGORIES = ["All", "Classroom", "Competitions", "Events", "Awards"];

const GALLERY_ITEMS = [
  { src: "/photos/classroom-1.jpg", alt: "UCMAS classroom session at R D Abacus Nadiad", category: "Classroom" },
  { src: "/photos/classroom-2.jpg", alt: "Students learning mental arithmetic", category: "Classroom" },
  { src: "/photos/classroom-3.jpg", alt: "Group learning session", category: "Classroom" },
  { src: "/photos/kids-math-1.jpg", alt: "Children practicing mental math", category: "Classroom" },
  { src: "/photos/teacher-student.jpg", alt: "Teacher and student one-on-one session", category: "Classroom" },
  { src: "/photos/competition-1.jpg", alt: "UCMAS district competition", category: "Competitions" },
  { src: "/photos/trophy-1.jpg", alt: "National competition trophies", category: "Competitions" },
  { src: "/photos/kids-studying.jpg", alt: "Students preparing for competition", category: "Competitions" },
  { src: "/photos/kids-award.jpg", alt: "Award ceremony for UCMAS winners", category: "Awards" },
  { src: "/photos/abacus-1.jpg", alt: "Students with abacus at event", category: "Events" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31837] text-sm font-semibold rounded-full mb-4">
            Gallery
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Life at <span className="text-[#E31837]">R D Abacus</span>
          </h2>
          <p className="mt-4 text-[#6B7280] max-w-xl mx-auto text-base">
            A glimpse into our classrooms, competitions, and celebrations.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#E31837] text-white shadow-lg shadow-red-500/25"
                  : "bg-white text-[#6B7280] border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setLightbox(item.src)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    🔍
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[80vh] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Gallery image"
                fill
                className="object-contain rounded-2xl"
              />
            </motion.div>
            <button
              className="absolute top-4 right-4 text-white text-3xl font-light"
              onClick={() => setLightbox(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
