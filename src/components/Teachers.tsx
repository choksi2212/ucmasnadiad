"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportRepeat } from "@/lib/animations";
import { TEACHERS, SITE } from "@/lib/constants";
import { cldImage, MEDIA } from "@/lib/media";
import { InteractiveInstructorCard } from "@/components/ui/card-7";

export default function Teachers() {
  const logoUrl = cldImage(MEDIA.logo);

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportRepeat}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#0B0F19] text-sm font-semibold rounded-full mb-4">
            Our Team
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0F19] font-heading tracking-tight mb-4"
          >
            Meet Your{" "}
            <span className="text-[#0B0F19]">Instructors</span>
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto text-base">
            Certified UCMAS instructors with years of experience nurturing
            young minds in Nadiad.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10 justify-items-center"
        >
          {TEACHERS.map((teacher) => (
            <motion.div
              key={teacher.name}
              variants={fadeUp}
              className="flex w-full max-w-[340px] flex-col items-center"
            >
              <InteractiveInstructorCard
                imageUrl={cldImage(teacher.photo)}
                logoUrl={logoUrl}
                name={teacher.name}
                role={teacher.role}
                experience={teacher.experience}
              />
              <p className="mt-5 text-sm text-[#64748B] text-center leading-relaxed">
                {teacher.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportRepeat}
          className="mt-14 bg-gradient-to-r from-[#0B0F19] to-[#C8102E] rounded-3xl p-8 text-center text-white"
        >
          <p className="text-lg font-semibold mb-2">
            Founded by {SITE.founders} · Established {SITE.founded}
          </p>
          <p className="text-white/80 text-sm max-w-2xl mx-auto">
            R D Abacus Nadiad has been developing young minds through the UCMAS
            program for {new Date().getFullYear() - SITE.founded} years. Our team of certified
            instructors bring passion, patience, and proven methodology to every
            class.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
