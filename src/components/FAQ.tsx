"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { FAQS } from "@/lib/constants";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#C8102E] text-sm font-semibold rounded-full mb-4">
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0F19] font-heading tracking-tight mb-4"
          >
            Common <span className="text-[#C8102E]">Questions</span>
          </h2>
          <p className="mt-4 text-[#64748B] text-base">
            Everything parents want to know before enrolling their child.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: i * 0.04 }}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-[#C8102E]/40 transition-colors duration-200"
            >
              {/* Question */}
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-[#FAFAFA] transition-colors duration-200"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className=" font-heading"
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 w-7 h-7 bg-[#FAFAFA] border border-gray-200 rounded-full flex items-center justify-center"
                >
                  <ChevronDown size={14} className="text-[#64748B]" />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-[#64748B] text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mt-10 text-center"
        >
          <p className="text-[#64748B] text-sm mb-4">
            Still have questions? We&apos;re happy to help.
          </p>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 py-3.5 bg-[#C8102E] text-white font-semibold rounded-full hover:bg-[#9B0C23] transition-all duration-200 shadow-lg shadow-red-500/25 hover:-translate-y-0.5"
          >
            Get in Touch →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
