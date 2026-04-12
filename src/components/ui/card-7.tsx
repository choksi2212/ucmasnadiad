"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface InteractiveInstructorCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  logoUrl: string;
  name: string;
  role: string;
  experience: string;
}

export function InteractiveInstructorCard({
  className,
  imageUrl,
  logoUrl,
  name,
  role,
  experience,
  ...props
}: InteractiveInstructorCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn(
        "relative w-full max-w-[340px] aspect-[9/12] rounded-3xl bg-card shadow-lg",
        "[transform-style:preserve-3d]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 340px"
          className="object-cover transition-transform duration-300"
          style={{ transform: "translateZ(-20px) scale(1.1)" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent rounded-3xl pointer-events-none" />

      <div
        className="absolute inset-0 z-[1] flex flex-col justify-end p-5"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex items-end justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex min-w-0 flex-col">
            <h3 className="text-xl font-bold text-white font-heading leading-tight">
              {name}
            </h3>
            <p className="mt-1 text-xs text-white/75 leading-snug">{role}</p>
          </div>
          <div className="relative h-9 w-[72px] shrink-0">
            <Image
              src={logoUrl}
              alt="UCMAS"
              fill
              sizes="72px"
              className="object-contain object-right"
            />
          </div>
        </div>

        <div className="mt-3">
          <div className="inline-flex rounded-full bg-black/45 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/10">
            {experience}
          </div>
        </div>

        <div className="mt-3 border-t border-white/10 pt-3">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/50">
            UCMAS certified
          </p>
        </div>
      </div>
    </div>
  );
}
