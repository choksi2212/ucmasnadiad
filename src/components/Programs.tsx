"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { PROGRAMS } from "@/lib/constants";

export default function Programs() {
  const [active, setActive] = useState(0);
  const program = PROGRAMS[active];

  return (
    <section id="programs" className="py-20 sm:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#0B0F19] text-sm font-semibold rounded-full mb-4">
            Programs
          </span>
          <h2
            className=" font-heading"
          >
            Programs &amp; <span className="text-[#0B0F19]">Age Groups</span>
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto text-base">
            Structured programs designed for every stage of a child&apos;s development.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {PROGRAMS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === i
                  ? "text-white shadow-lg"
                  : "bg-white text-[#64748B] border border-gray-200 hover:border-gray-300"
              }`}
              style={active === i ? { backgroundColor: p.color } : {}}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              {/* Left: info */}
              <div className="p-8 sm:p-10">
                {/* Color accent top border */}
                <div
                  className="w-12 h-1.5 rounded-full mb-6"
                  style={{ backgroundColor: program.color }}
                />
                <h3
                  className=" font-heading"
                >
                  {program.label}
                </h3>
                <p className="text-[#64748B] text-sm mb-8 leading-relaxed">
                  {program.description}
                </p>

                {/* Meta info */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Age Range", value: program.ageRange },
                    { label: "Duration", value: program.duration },
                    { label: "Frequency", value: program.frequency },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#FAFAFA] rounded-2xl p-4 text-center"
                    >
                      <div className="text-sm font-bold text-[#0B0F19]">
                        {item.value}
                      </div>
                      <div className="text-xs text-[#64748B] mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                  style={{ backgroundColor: program.color }}
                >
                  Enroll in {program.label} →
                </button>
              </div>

              {/* Right: highlights */}
              <div
                className="p-8 sm:p-10 flex flex-col justify-center"
                style={{ backgroundColor: program.color + "08" }}
              >
                <h4 className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-6">
                  What Your Child Will Learn
                </h4>
                <div className="space-y-4">
                  {program.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: program.color }}
                      >
                        <Check size={13} className="text-white" />
                      </div>
                      <span className="text-[#0B0F19] text-sm font-medium">
                        {h}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
