/**
 * Cloudinary public IDs — must match folder layout from `npm run upload:media`.
 * Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local (see .env.example).
 */

/** Must match `PREFIX` in `scripts/upload-to-cloudinary.cjs` and `get-results-showcase.ts`. */
export const MEDIA_PREFIX = "rd-abacus-nadiad";

const PREFIX = MEDIA_PREFIX;

export const MEDIA = {
  heroVideo: `${PREFIX}/hero/vidd`,
  logo: `${PREFIX}/brand/ucmas-logo`,
  /** Instructor headshots from `STAFF/` → `npm run upload:media` */
  staff: {
    sharad: `${PREFIX}/staff/sharad`,
    pinal: `${PREFIX}/staff/pinal`,
    falguni: `${PREFIX}/staff/falguni`,
  },
  photos: {
    classroom1: `${PREFIX}/photos/classroom-1`,
    classroom2: `${PREFIX}/photos/classroom-2`,
    classroom3: `${PREFIX}/photos/classroom-3`,
    kidsMath1: `${PREFIX}/photos/kids-math-1`,
    teacherStudent: `${PREFIX}/photos/teacher-student`,
    competition1: `${PREFIX}/photos/competition-1`,
    trophy1: `${PREFIX}/photos/trophy-1`,
    kidsStudying: `${PREFIX}/photos/kids-studying`,
    kidsAward: `${PREFIX}/photos/kids-award`,
    abacus1: `${PREFIX}/photos/abacus-1`,
    teacher1: `${PREFIX}/photos/teacher-1`,
    teacher2: `${PREFIX}/photos/teacher-2`,
    teacher3: `${PREFIX}/photos/teacher-3`,
    whatIsUcmasConference: `${PREFIX}/photos/what-is-ucmas-conference`,
  },
} as const;

function cloudName(): string {
  const c = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  if (!c) {
    throw new Error(
      "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME. Add it to .env.local — see .env.example."
    );
  }
  return c;
}

/**
 * Delivery URL with automatic format & quality.
 * Commas in transform chains must be encoded (%2C): unencoded commas break Next.js
 * `/_next/image` when it forwards the URL upstream (Cloudinary then 404s).
 */
export function cldImage(publicId: string): string {
  const id = publicId.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${cloudName()}/image/upload/f_auto%2Cq_auto/${id}`;
}

/**
 * Video delivery with auto format + quality (WebM where supported, else e.g. MP4 for Safari).
 * Commas encoded as %2C (same rationale as `cldImage`).
 */
export function cldVideo(publicId: string): string {
  const id = publicId.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${cloudName()}/video/upload/f_auto%2Cq_auto/${id}`;
}

