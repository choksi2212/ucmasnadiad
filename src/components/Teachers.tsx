"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Clock, Users } from "lucide-react";
import { fadeLeft, fadeRight, staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";
import { TEACHERS, SITE } from "@/lib/constants";

export default function Teachers() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1B3A6B] text-sm font-semibold rounded-full mb-4">
            Our Team
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Meet Your{" "}
            <span className="text-[#1B3A6B]">Instructors</span>
          </h2>
          <p className="mt-4 text-[#6B7280] max-w-xl mx-auto text-base">
            Certified UCMAS instructors with years of experience nurturing
            young minds in Nadiad.
          </p>
        </motion.div>

        {/* Teacher cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {TEACHERS.map((teacher, i) => (
            <motion.div
              key={teacher.name}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={teacher.photo}
                  alt={`${teacher.name} — UCMAS instructor at R D Abacus Nadiad`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/60 to-transparent" />
                {/* Experience badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <Clock size={12} className="text-[#E31837]" />
                  <span className="text-xs font-semibold text-[#1A1A2E]">
                    {teacher.experience}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold text-[#1A1A2E] mb-1"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {teacher.name}
                </h3>
                <p className="text-[#E31837] text-sm font-semibold mb-3">
                  {teacher.role}
                </p>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {teacher.bio}
                </p>

                {/* Credentials */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#1B3A6B] text-xs font-medium rounded-full">
                    <Award size={10} />
                    UCMAS Certified
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-[#E31837] text-xs font-medium rounded-full">
                    <Users size={10} />
                    100+ Students
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Center info note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mt-12 bg-gradient-to-r from-[#1B3A6B] to-[#E31837] rounded-3xl p-8 text-center text-white"
        >
          <p className="text-lg font-semibold mb-2">
            Founded by Sharad Patel · Established {SITE.founded}
          </p>
          <p className="text-white/80 text-sm max-w-2xl mx-auto">
            R D Abacus Nadiad has been developing young minds through the UCMAS
            program for over {new Date().getFullYear() - SITE.founded} years. Our team of certified
            instructors bring passion, patience, and proven methodology to every
            class.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
