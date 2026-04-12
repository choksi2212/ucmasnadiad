"use client";

import {
  createContext,
  useContext,
  useRef,
  type RefObject,
  type ReactNode,
} from "react";
import { useScroll, type MotionValue } from "framer-motion";

type HeroScrollContextValue = {
  heroScrollRef: RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
};

const HeroScrollContext = createContext<HeroScrollContextValue | null>(null);

export function HeroScrollProvider({ children }: { children: ReactNode }) {
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroScrollRef,
    offset: ["start start", "end start"],
  });

  return (
    <HeroScrollContext.Provider value={{ heroScrollRef, scrollYProgress }}>
      {children}
    </HeroScrollContext.Provider>
  );
}

export function useHeroScroll() {
  const ctx = useContext(HeroScrollContext);
  if (!ctx) {
    throw new Error("useHeroScroll must be used within HeroScrollProvider");
  }
  return ctx;
}

export function useHeroScrollOptional() {
  return useContext(HeroScrollContext);
}
