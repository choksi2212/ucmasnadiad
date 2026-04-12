import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { MEDIA_PREFIX } from "@/lib/media";

/** All RESULTS subfolders (must match `scripts/upload-to-cloudinary.cjs`). */
const ORDER = ["state", "national", "international", "graduation", "others"] as const;

export type ResultsFolderKey = (typeof ORDER)[number];

const CAPTIONS: Record<ResultsFolderKey, string> = {
  state: "State Level",
  national: "National Level",
  international: "International",
  graduation: "Graduation Ceremony",
  others: "Other Competitions",
};

export type ResultsPreviewItem = {
  publicId: string;
  caption: string;
  category: ResultsFolderKey;
};

export type ResultsGalleryData = {
  preview: ResultsPreviewItem[];
  galleries: Partial<Record<ResultsFolderKey, string[]>>;
};

function publicIdForFile(folder: ResultsFolderKey, file: string): string {
  const ext = path.extname(file);
  const baseName = ext ? file.slice(0, -ext.length) : file;
  return `${MEDIA_PREFIX}/results/${folder}/${baseName}`;
}

function hasCloudinaryCreds(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim()
  );
}

const RESULTS_FILENAME_EXT = /\.(jpe?g|png|webp|gif|heic|heif)$/i;

/**
 * Same logical photo can exist twice in Cloudinary after re-uploads
 * (e.g. `…/uuid` vs `…/uuid.JPG`). Collapse to one public_id per asset.
 */
function dedupeResultsPublicIds(ids: string[]): string[] {
  const byKey = new Map<string, string[]>();
  for (const id of ids) {
    const i = id.lastIndexOf("/");
    const dir = i >= 0 ? id.slice(0, i + 1) : "";
    const last = i >= 0 ? id.slice(i + 1) : id;
    const base = RESULTS_FILENAME_EXT.test(last)
      ? last.replace(RESULTS_FILENAME_EXT, "")
      : last;
    const key = `${dir}${base.toLowerCase()}`;
    const list = byKey.get(key) ?? [];
    list.push(id);
    byKey.set(key, list);
  }

  const picked: string[] = [];
  for (const group of byKey.values()) {
    const sorted = [...group].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    const noTrailExt = sorted.filter((id) => {
      const last = id.slice(id.lastIndexOf("/") + 1);
      return !RESULTS_FILENAME_EXT.test(last);
    });
    picked.push((noTrailExt[0] ?? sorted[0])!);
  }

  return picked.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

/**
 * List all image public_ids under `rd-abacus-nadiad/results/<folder>/` via Admin API.
 */
async function listResultsFromCloudinary(
  folder: ResultsFolderKey
): Promise<string[]> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY!.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET!.trim();

  cloudinary.config({
    cloud_name: cloud,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const prefix = `${MEDIA_PREFIX}/results/${folder}`;
  const ids: string[] = [];
  let nextCursor: string | undefined;

  do {
    const res = (await cloudinary.api.resources({
      type: "upload",
      prefix,
      max_results: 500,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    })) as {
      resources?: { public_id: string }[];
      next_cursor?: string;
    };

    for (const r of res.resources ?? []) {
      ids.push(r.public_id);
    }
    nextCursor = res.next_cursor;
  } while (nextCursor);

  return dedupeResultsPublicIds(ids);
}

/** Fallback when Cloudinary env is missing (dev) or API fails. */
function listResultsFromDisk(): Partial<Record<ResultsFolderKey, string[]>> {
  const base = path.join(process.cwd(), "public", "RESULTS");
  const galleries: Partial<Record<ResultsFolderKey, string[]>> = {};

  for (const folder of ORDER) {
    const dir = path.join(base, folder);
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;

    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

    if (files.length === 0) continue;

    galleries[folder] = files.map((f) => publicIdForFile(folder, f));
  }

  return galleries;
}

/**
 * **Primary source: Cloudinary** (same assets as `npm run upload:media`).
 * Requires `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
 * on the host (including Vercel build).
 * Falls back to scanning `public/RESULTS` only if credentials are missing or the API errors.
 */
export async function getResultsGalleryData(): Promise<ResultsGalleryData> {
  const disk = listResultsFromDisk();
  let galleries: Partial<Record<ResultsFolderKey, string[]>> = {};

  if (hasCloudinaryCreds()) {
    try {
      for (const folder of ORDER) {
        const ids = await listResultsFromCloudinary(folder);
        if (ids.length > 0) galleries[folder] = ids;
      }
    } catch (e) {
      console.warn("[getResultsGalleryData] Cloudinary list failed, using disk fallback:", e);
      galleries = { ...disk };
    }
  } else {
    galleries = { ...disk };
  }

  for (const folder of ORDER) {
    if (!galleries[folder]?.length && disk[folder]?.length) {
      galleries[folder] = disk[folder]!;
    }
  }

  const previewOrder: ResultsFolderKey[] = [
    "state",
    "national",
    "international",
    "graduation",
  ];
  const preview: ResultsPreviewItem[] = [];
  for (const folder of previewOrder) {
    const ids = galleries[folder];
    if (ids?.[0]) {
      preview.push({
        publicId: ids[0],
        caption: CAPTIONS[folder],
        category: folder,
      });
    }
  }

  return { preview, galleries };
}
