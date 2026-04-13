"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { fadeLeft, fadeRight, fadeUp, viewportRepeat } from "@/lib/animations";
import { SITE } from "@/lib/constants";

type FormState = "idle" | "loading" | "success" | "error";

function validateMobile(val: string) {
  return /^[6-9]\d{9}$/.test(val.trim());
}

export default function Footer() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; email?: string }>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const mobile = formData.get("mobile") as string;
    const email = formData.get("email") as string;
    const message = (formData.get("message") as string) ?? "";
    const botcheck = (formData.get("botcheck") as string) ?? "";

    // Validate
    const newErrors: typeof errors = {};
    if (!name || name.trim().length < 2) newErrors.name = "Please enter your full name.";
    if (!validateMobile(mobile)) newErrors.mobile = "Enter a valid 10-digit Indian mobile number.";
    if (!email || !email.includes("@")) newErrors.email = "Enter a valid email address.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    if (botcheck) {
      setFormState("success");
      form.reset();
      return;
    }

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
    if (!accessKey) {
      console.error(
        "Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY — add your Web3Forms access key to .env.local"
      );
      setFormState("error");
      return;
    }

    setErrors({});
    setFormState("loading");

    try {
      // Web3Forms free tier expects browser submissions; server-side fetch is blocked unless Pro + IP whitelist.
      const fd = new FormData();
      fd.append("access_key", accessKey);
      fd.append("name", name.trim());
      fd.append("email", email.trim());
      fd.append("phone", mobile.trim());
      const msg = message.trim().slice(0, 200);
      if (msg) fd.append("message", msg);
      fd.append("from_name", "R D Abacus Nadiad Website");
      fd.append("subject", "New demo enquiry — website");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });

      const raw = await res.text();
      let result: { success?: boolean; message?: string };
      try {
        result = JSON.parse(raw) as { success?: boolean; message?: string };
      } catch {
        console.error("Web3Forms returned non-JSON:", raw.slice(0, 300));
        setFormState("error");
        return;
      }

      if (res.ok && result.success) {
        setFormState("success");
        form.reset();
      } else {
        console.error("Web3Forms error:", result.message ?? res.status);
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <footer id="contact" className="bg-[#0B0F19]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT: Contact Form */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportRepeat}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-5 border border-white/20">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Book a{" "}
              <span className="text-[#D4AF37]">Free Demo Class</span>
            </h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Fill in your details and we&apos;ll call you within 24 hours to
              schedule your child&apos;s free demo session.
            </p>

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
              >
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Thank You
                </h3>
                <p className="text-white/70 text-sm">
                  We&apos;ve received your enquiry. Sharad Patel will call you
                  within 24 hours to schedule your free demo class.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-5 text-sm text-green-400 underline"
                >
                  Submit another enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1.5 ml-1">
                    Parent&apos;s Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ramesh Patel"
                    className={`w-full px-4 py-3 bg-white/8 border rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500/30"
                        : "border-white/15 focus:border-white/40 focus:ring-white/10"
                    }`}
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    onChange={() => setErrors((p) => ({ ...p, name: undefined }))}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1.5 ml-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full px-4 py-3 bg-white/8 border rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.mobile
                        ? "border-red-500 focus:ring-red-500/30"
                        : "border-white/15 focus:border-white/40 focus:ring-white/10"
                    }`}
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    onChange={() => setErrors((p) => ({ ...p, mobile: undefined }))}
                  />
                  {errors.mobile && (
                    <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.mobile}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1.5 ml-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="ramesh@example.com"
                    className={`w-full px-4 py-3 bg-white/8 border rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500/30"
                        : "border-white/15 focus:border-white/40 focus:ring-white/10"
                    }`}
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    onChange={() => setErrors((p) => ({ ...p, email: undefined }))}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1.5 ml-1">
                    Message <span className="opacity-50">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    maxLength={200}
                    placeholder="My child is 7 years old and interested in the regular program..."
                    className="w-full px-4 py-3 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all resize-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  />
                </div>

                {formState === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or call us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#C8102E] hover:bg-[#9B0C23] disabled:opacity-70 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 disabled:translate-y-0"
                >
                  {formState === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* RIGHT: Center Info + Map */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportRepeat}
            className="space-y-7"
          >
            {/* Title + Tagline */}
            <div>
              <h3 className="text-2xl font-bold text-white font-heading tracking-tight mb-2">
                R D Abacus Nadiad
              </h3>
              <p className="text-white/60 text-sm mt-1">
                UCMAS Mental Arithmetic Center, Nadiad, Gujarat
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm group"
              >
                <div className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center group-hover:bg-[#C8102E]/20 transition-colors flex-shrink-0">
                  <Phone size={15} className="text-[#C8102E]" />
                </div>
                {SITE.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm group"
              >
                <div className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center group-hover:bg-[#C8102E]/20 transition-colors flex-shrink-0">
                  <Mail size={15} className="text-[#C8102E]" />
                </div>
                {SITE.email}
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <div className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={15} className="text-[#C8102E]" />
                </div>
                {SITE.address}
              </div>
            </div>

            {/* Operating hours */}
            <div>
              <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider mb-3">
                <Clock size={12} />
                Class Timings
              </div>
              <div className="space-y-2">
                {SITE.operatingHours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{h.day}</span>
                    <span className={`font-medium ${h.time === "Closed" ? "text-red-400" : "text-white"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map embed */}
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src={SITE.mapEmbedUrl}
                width="100%"
                height="180"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                title="R D Abacus Nadiad location on Google Maps"
              />
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/8 hover:bg-[#C8102E]/20 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/8 hover:bg-[#0B0F19]/40 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl text-[#25D366] text-sm font-medium transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.127 1.533 5.854L0 24l6.336-1.516A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.947 0-3.763-.536-5.314-1.466l-.38-.226-3.786.904.964-3.693-.249-.396A9.931 9.931 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-4">
          <p className="text-center sm:text-left text-xs sm:text-sm text-white/45 leading-relaxed">
            Developed and maintained by{" "}
            <span className="font-medium text-white/70">Manas Choksi</span>
            <span className="mx-1.5 text-white/25 sm:mx-2" aria-hidden>
              ·
            </span>
            <a
              href="tel:+919586673394"
              className="text-white/55 hover:text-white/85 transition-colors underline-offset-2 hover:underline whitespace-nowrap"
            >
              +91 95866 73394
            </a>
            <span className="mx-1.5 text-white/25 sm:mx-2" aria-hidden>
              ·
            </span>
            <a
              href="https://www.linkedin.com/in/manas-choksi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white/55 hover:text-white/85 transition-colors underline-offset-2 hover:underline"
            >
              <svg
                className="w-3.5 h-3.5 shrink-0 opacity-80"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
            <span>
              © {new Date().getFullYear()} R D Abacus Nadiad. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white/70 transition-colors">
                Terms of Use
              </Link>
              <a
                href="https://www.ucmas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                Powered by UCMAS
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
