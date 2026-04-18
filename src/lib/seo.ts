import { MEDIA_PREFIX } from "./media";
import { SITE } from "./constants";

/**
 * Open Graph / Twitter image (1200×630). Uses Cloudinary when configured; otherwise falls back to a local path.
 */
export function defaultOgImageUrl(): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  if (cloud) {
    const id = `${MEDIA_PREFIX}/photos/classroom-1`;
    return `https://res.cloudinary.com/${cloud}/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/${id}`;
  }
  return `${SITE.origin}/ucmas-logo.svg`;
}
