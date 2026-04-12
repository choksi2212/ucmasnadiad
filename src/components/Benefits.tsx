"use client";

import { useId } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Focus,
  Lightbulb,
  BookOpen,
  Wand2,
  Eye,
  LayoutGrid,
  BrainCircuit,
  BadgeCheck,
  Shield,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { scaleIn, staggerContainer, viewportRepeat } from "@/lib/animations";
import { BENEFITS } from "@/lib/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, React.ComponentType<any>> = {
  Focus,
  Lightbulb,
  BookOpen,
  Wand2,
  Eye,
  LayoutGrid,
  BrainCircuit,
  BadgeCheck,
};

function IconRing({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex aspect-square size-12 rounded-full border border-[#E2E8F0] before:absolute before:-inset-2 before:rounded-full before:border before:border-[#E2E8F0]/80">
      {children}
    </div>
  );
}

/** Decorative arc from features-8 (trimmed for mask) */
function ArcDecoration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 254 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MiniChart({ uid }: { uid: string }) {
  const g = `paint-${uid}`;
  return (
    <svg
      className="h-auto w-full max-h-24 text-[#C8102E]/80 lg:max-h-16"
      viewBox="0 0 386 120"
      fill="none"
      aria-hidden
    >
      <rect width="386" height="120" rx="10" className="fill-[#FAFAFA]" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 118L3 90C40 72 80 88 120 56C160 80 200 48 240 76C280 52 320 68 360 40C375 48 383 52 383 58V118H3Z"
        fill={`url(#${g})`}
      />
      <path
        d="M1 88L40 72L80 88L120 56L160 80L200 48L240 76L280 52L320 68L360 40L383 56"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id={g} x1="3" y1="60" x2="3" y2="118" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Benefits() {
  const uid = useId().replace(/:/g, "");
  const [b0, b1, b2, b3, b4, b5, b6, b7] = BENEFITS;
  const I0 = ICONS[b0.icon];
  const I1 = ICONS[b1.icon];
  const I2 = ICONS[b2.icon];
  const I3 = ICONS[b3.icon];
  const I4 = ICONS[b4.icon];
  const I5 = ICONS[b5.icon];
  const I6 = ICONS[b6.icon];
  const I7 = ICONS[b7.icon];

  return (
    <section id="benefits" className="bg-[#F8FAFA] py-16 md:py-24 lg:py-20">
      <div className="mx-auto w-full max-w-[min(100%,88rem)] px-4 text-center sm:px-5 lg:px-8 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportRepeat}
          className="mb-8 md:mb-10 lg:mb-8"
        >
          <span className="mb-4 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-[#C8102E]">
            UCMAS 2.0 skills
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0B0F19] sm:text-4xl lg:text-5xl">
            8 Skills Your Child Will <span className="text-[#C8102E]">Develop</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#64748B]">
            Mental arithmetic strengthens the whole mind — focus, imagination, memory, and confidence.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="relative text-left"
        >
          {/* Mobile/tablet: 6-col bento · xl+: 5 equal columns → 2 short rows (no tall stack) */}
          <div className="relative z-10 grid grid-cols-6 gap-2.5 sm:gap-3 lg:grid-cols-5">
            {/* Stat hero — features-8 style */}
            <motion.div variants={scaleIn} className="relative col-span-full lg:col-span-1">
              <Card className="relative flex h-full overflow-hidden">
                <CardContent className="relative m-auto size-fit pt-4 xl:pt-4 xl:pb-4">
                  <div className="relative flex h-20 w-48 items-center text-[#C8102E]/25 xl:h-16 xl:w-40">
                    <ArcDecoration className="absolute inset-0 size-full text-[#C8102E]/20" />
                    <span className="relative z-[1] mx-auto block w-fit text-4xl font-semibold text-[#0B0F19] xl:text-3xl">
                      8
                    </span>
                  </div>
                  <h2 className="mt-4 text-center font-heading text-xl font-semibold text-[#0B0F19] sm:text-2xl xl:text-lg xl:leading-snug">
                    Whole-brain growth
                  </h2>
                  <p className="mt-1.5 text-center text-xs text-[#64748B] xl:text-[11px] xl:leading-relaxed">
                    Every level of UCMAS 2.0 reinforces these abilities together.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} className="col-span-full sm:col-span-3 lg:col-span-1">
              <Card className="relative h-full overflow-hidden">
                <CardContent className="pt-4 xl:pt-4">
                  <div className="relative mx-auto flex size-28 aspect-square items-center justify-center rounded-full border border-[#E2E8F0] before:absolute before:-inset-2 before:rounded-full before:border before:border-[#E2E8F0]/90 xl:size-24">
                    <I0 className="size-9 text-[#C8102E] xl:size-8" strokeWidth={1.25} />
                  </div>
                  <div className="relative z-10 mt-4 space-y-1.5 text-center xl:mt-3">
                    <h3 className="font-heading text-base font-semibold text-[#0B0F19] xl:text-[15px]">{b0.title}</h3>
                    <p className="text-xs leading-relaxed text-[#64748B] xl:text-[11px] xl:leading-snug">{b0.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} className="col-span-full sm:col-span-3 lg:col-span-1">
              <Card className="relative h-full overflow-hidden">
                <CardContent className="pt-4 xl:pt-4">
                  <div className="relative mx-auto flex size-28 aspect-square items-center justify-center rounded-full border border-[#E2E8F0] before:absolute before:-inset-2 before:rounded-full before:border before:border-[#E2E8F0]/90 xl:size-24">
                    <I1 className="size-9 text-[#1B3A6B] xl:size-8" strokeWidth={1.25} />
                  </div>
                  <div className="relative z-10 mt-4 space-y-1.5 text-center xl:mt-3">
                    <h3 className="font-heading text-base font-semibold text-[#0B0F19] xl:text-[15px]">{b1.title}</h3>
                    <p className="text-xs leading-relaxed text-[#64748B] xl:text-[11px] xl:leading-snug">{b1.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} className="col-span-full sm:col-span-3 lg:col-span-1">
              <Card className="h-full">
                <CardContent className="pt-4 xl:pt-4">
                  <div className="pt-0 lg:px-0 xl:max-h-20 xl:overflow-hidden">
                    <MiniChart uid={`c-${uid}`} />
                  </div>
                  <div className="relative z-10 mt-4 space-y-1.5 text-center xl:mt-2">
                    <h3 className="font-heading text-base font-semibold text-[#0B0F19] xl:text-[15px]">{b2.title}</h3>
                    <p className="text-xs leading-relaxed text-[#64748B] xl:text-[11px] xl:leading-snug">{b2.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} className="col-span-full sm:col-span-3 lg:col-span-1">
              <Card className="h-full">
                <CardContent className="pt-4 xl:pt-4">
                  <div className="relative mx-auto flex size-28 aspect-square items-center justify-center rounded-full border border-[#E2E8F0] before:absolute before:-inset-2 before:rounded-full before:border before:border-[#E2E8F0]/90 xl:size-24">
                    <I3 className="size-9 text-[#B8860B] xl:size-8" strokeWidth={1.25} />
                  </div>
                  <div className="relative z-10 mt-4 space-y-1.5 text-center xl:mt-3">
                    <h3 className="font-heading text-base font-semibold text-[#0B0F19] xl:text-[15px]">{b3.title}</h3>
                    <p className="text-xs leading-relaxed text-[#64748B] xl:text-[11px] xl:leading-snug">{b3.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} className="col-span-full sm:col-span-3 lg:col-span-1">
              <Card className="h-full overflow-hidden">
                <CardContent className="grid pt-4 sm:grid-cols-2 sm:gap-3 xl:grid-cols-1 xl:gap-2 xl:pt-4">
                  <div className="relative z-10 flex flex-col justify-between space-y-4 xl:space-y-2">
                    <IconRing>
                      <Shield className="m-auto size-5 text-[#C8102E]" strokeWidth={1.25} />
                    </IconRing>
                    <div className="space-y-1.5 xl:space-y-1">
                      <h3 className="font-heading text-base font-semibold text-[#0B0F19] xl:text-[15px]">{b4.title}</h3>
                      <p className="text-xs leading-relaxed text-[#64748B] xl:text-[11px] xl:leading-snug">{b4.description}</p>
                    </div>
                  </div>
                  <div className="relative mt-4 rounded-tl-xl border border-b-0 border-r-0 border-[#E2E8F0] bg-[#FAFAFA] p-4 sm:-mr-2 sm:mt-2 xl:mt-0 xl:max-h-24 xl:overflow-hidden xl:p-3">
                    <div className="absolute left-3 top-2 flex gap-1">
                      <span className="block size-2 rounded-full border border-[#CBD5E1] bg-white" />
                      <span className="block size-2 rounded-full border border-[#CBD5E1] bg-white" />
                      <span className="block size-2 rounded-full border border-[#CBD5E1] bg-white" />
                    </div>
                    <p className="mt-5 font-mono text-[9px] leading-relaxed text-[#64748B] xl:mt-4 xl:line-clamp-3">
                      UCMAS · mental math · abacus visualization · step-by-step reasoning
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} className="col-span-full sm:col-span-3 lg:col-span-1">
              <Card className="h-full overflow-hidden">
                <CardContent className="grid h-full pt-4 sm:grid-cols-2 sm:gap-3 xl:grid-cols-1 xl:gap-2 xl:pt-4">
                  <div className="relative z-10 flex flex-col justify-between space-y-4 xl:space-y-2">
                    <IconRing>
                      <I5 className="m-auto size-6 text-[#1B3A6B] xl:size-5" strokeWidth={1.25} />
                    </IconRing>
                    <div className="space-y-1.5 xl:space-y-1">
                      <h3 className="font-heading text-base font-semibold text-[#0B0F19] xl:text-[15px]">{b5.title}</h3>
                      <p className="text-xs leading-relaxed text-[#64748B] xl:text-[11px] xl:leading-snug">{b5.description}</p>
                    </div>
                  </div>
                  <div className="relative mt-4 flex min-h-[100px] items-center justify-center rounded-lg border border-dashed border-[#E2E8F0] bg-white/60 sm:-my-2 xl:min-h-0 xl:max-h-20 xl:py-1">
                    <MiniChart uid={`c2-${uid}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} className="col-span-full sm:col-span-3 lg:col-span-1">
              <Card className="h-full">
                <CardContent className="grid h-full pt-4 sm:grid-cols-2 xl:grid-cols-1 xl:pt-4">
                  <div className="relative z-10 flex flex-col justify-between space-y-4 xl:space-y-2">
                    <IconRing>
                      <I6 className="m-auto size-6 text-[#1F6F54] xl:size-5" strokeWidth={1.25} />
                    </IconRing>
                    <div className="space-y-1.5 xl:space-y-1">
                      <h3 className="font-heading text-base font-semibold text-[#0B0F19] xl:text-[15px]">{b6.title}</h3>
                      <p className="text-xs leading-relaxed text-[#64748B] xl:text-[11px] xl:leading-snug">{b6.description}</p>
                    </div>
                  </div>
                  <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-[#E2E8F0] sm:-my-6 sm:mr-0 sm:mt-0 xl:mt-2 xl:max-h-28 xl:before:hidden">
                    <div className="relative flex h-full flex-col justify-center space-y-3 py-3 sm:space-y-5 sm:py-6 xl:space-y-2 xl:py-2">
                      <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                        <span className="block h-fit rounded border border-[#E2E8F0] bg-white px-2 py-1 text-xs shadow-sm">
                          Parent
                        </span>
                        <div className="size-7 shrink-0 overflow-hidden rounded-full ring-4 ring-white">
                          <Image
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop"
                            alt=""
                            width={28}
                            height={28}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                        <div className="size-8 shrink-0 overflow-hidden rounded-full ring-4 ring-white">
                          <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop"
                            alt=""
                            width={32}
                            height={32}
                            className="size-full object-cover"
                          />
                        </div>
                        <span className="block h-fit rounded border border-[#E2E8F0] bg-white px-2 py-1 text-xs shadow-sm">
                          Instructor
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} className="col-span-full sm:col-span-3 lg:col-span-1">
              <Card className="h-full overflow-hidden">
                <CardContent className="grid h-full pt-4 sm:grid-cols-2 xl:grid-cols-1 xl:pt-4">
                  <div className="relative z-10 flex flex-col justify-between space-y-4 xl:space-y-2">
                    <IconRing>
                      <Users className="m-auto size-6 text-[#C8102E] xl:size-5" strokeWidth={1.25} />
                    </IconRing>
                    <div className="space-y-1.5 xl:space-y-1">
                      <h3 className="font-heading text-base font-semibold text-[#0B0F19] xl:text-[15px]">{b7.title}</h3>
                      <p className="text-xs leading-relaxed text-[#64748B] xl:text-[11px] xl:leading-snug">{b7.description}</p>
                    </div>
                  </div>
                  <div className="relative mt-4 flex flex-col justify-center gap-2 sm:pl-4 xl:mt-2 xl:max-h-32 xl:flex-row xl:flex-wrap xl:gap-2 xl:pl-0">
                    <div className="flex items-center gap-2">
                      <div className="size-8 overflow-hidden rounded-full ring-2 ring-[#E2E8F0]">
                        <Image
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop"
                          alt=""
                          width={32}
                          height={32}
                          className="size-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-[#64748B]">Nadiad families</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-8 overflow-hidden rounded-full ring-2 ring-[#E2E8F0]">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop"
                          alt=""
                          width={32}
                          height={32}
                          className="size-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-[#64748B]">Competition wins</span>
                    </div>
                    <I7 className="mt-1 text-[#D4AF37]/90 xl:mt-0" size={40} strokeWidth={1} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
