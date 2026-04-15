/**
 * Bulk upload local assets to Cloudinary (same result as using the CLI against the Upload API).
 *
 * Prerequisites in .env.local (never commit this file):
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 *
 * Usage: npm run upload:media
 */

const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

const root = path.join(__dirname, "..");
// .env.local must win over a stale shell (e.g. NEXT_PUBLIC_* left from another session)
dotenv.config({ path: path.join(root, ".env") });
dotenv.config({ path: path.join(root, ".env.local"), override: true });

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME?.trim() ||
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

if (!cloudName || !apiKey || !apiSecret) {
  console.error(
    "Missing Cloudinary env vars. In .env.local set:\n" +
      "  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME\n" +
      "  CLOUDINARY_API_KEY\n" +
      "  CLOUDINARY_API_SECRET\n" +
      "See .env.example (do not commit secrets)."
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const PREFIX = "rd-abacus-nadiad";

/** Extensions Cloudinary accepts as images (incl. HEIC from iPhones). */
const IMAGE_EXTS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".heic",
  ".heif",
  ".ico",
]);

function imagePublicId(fileName) {
  const ext = path.extname(fileName);
  return ext ? fileName.slice(0, -ext.length) : fileName;
}

/** Large JPEG/HEIC uploads can exceed Cloudinary’s default client timeout. */
const UPLOAD_TIMEOUT_MS = 300000;

function isUploadTimeout(err) {
  const code = err?.error?.http_code;
  const msg = String(err?.error?.message ?? err?.message ?? "");
  return code === 499 || /timeout/i.test(msg);
}

async function withUploadRetries(label, fn) {
  const max = 3;
  let last;
  for (let attempt = 1; attempt <= max; attempt++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (attempt < max && isUploadTimeout(e)) {
        const wait = 3000 * attempt;
        console.warn(
          `Upload timeout (${label}), retry ${attempt}/${max - 1} in ${wait / 1000}s…`
        );
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw e;
    }
  }
  throw last;
}

function pickVideoPath() {
  const candidates = [
    path.join(root, "public", "vidd.webm"),
    path.join(root, "vidd.webm"),
    path.join(root, "public", "vidd.mov"),
    path.join(root, "vidd.mov"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

async function uploadImage(absPath, folder, publicId) {
  const res = await withUploadRetries(publicId, () =>
    cloudinary.uploader.upload(absPath, {
      folder,
      public_id: publicId,
      overwrite: true,
      unique_filename: false,
      resource_type: "image",
      timeout: UPLOAD_TIMEOUT_MS,
    })
  );
  console.log("image:", res.public_id);
}

async function uploadVideo(absPath, folder, publicId) {
  const res = await withUploadRetries(publicId, () =>
    cloudinary.uploader.upload(absPath, {
      folder,
      public_id: publicId,
      overwrite: true,
      unique_filename: false,
      resource_type: "video",
      timeout: UPLOAD_TIMEOUT_MS,
    })
  );
  console.log("video:", res.public_id);
}

async function main() {
  const photosDir = path.join(root, "public", "photos");
  if (fs.existsSync(photosDir)) {
    const files = fs.readdirSync(photosDir);
    for (const name of files) {
      const ext = path.extname(name).toLowerCase();
      if (!IMAGE_EXTS.has(ext)) continue;
      const abs = path.join(photosDir, name);
      if (!fs.statSync(abs).isFile()) continue;
      await uploadImage(abs, `${PREFIX}/photos`, imagePublicId(name));
    }
  } else {
    console.warn("Skip: no folder public/photos (add images there or upload via Media Library).");
  }

  const logoPng = path.join(root, "public", "ucmas-logo.png");
  if (fs.existsSync(logoPng)) {
    await uploadImage(logoPng, `${PREFIX}/brand`, "ucmas-logo");
  } else {
    console.warn("Skip: public/ucmas-logo.png not found.");
  }

  const videoPath = pickVideoPath();
  if (videoPath) {
    await uploadVideo(videoPath, `${PREFIX}/hero`, "vidd");
  } else {
    console.warn("Skip: no vidd.webm (or legacy vidd.mov) in public/ or project root.");
  }

  // Results — same layout as app: RESULTS/{state,national,...}/ (Cloudinary: rd-abacus-nadiad/results/...)
  const resultFolders = [
    "state",
    "national",
    "international",
    "graduation",
    "others",
  ];

  function resolveResultsRoot() {
    const candidates = [
      path.join(root, "public", "RESULTS"),
      path.join(root, "public", "results"),
      path.join(root, "RESULTS"),
    ];
    for (const p of candidates) {
      if (fs.existsSync(p) && fs.statSync(p).isDirectory()) return p;
    }
    return null;
  }

  /** Match subfolder case-insensitively (Windows often has "State" vs "state"). */
  function resolveSubdir(resultsRoot, wanted) {
    const w = wanted.toLowerCase();
    let entries;
    try {
      entries = fs.readdirSync(resultsRoot, { withFileTypes: true });
    } catch {
      return null;
    }
    for (const e of entries) {
      if (e.isDirectory() && e.name.toLowerCase() === w) {
        return path.join(resultsRoot, e.name);
      }
    }
    return null;
  }

  const resultsRoot = resolveResultsRoot();
  if (resultsRoot) {
    console.log("Results folder:", resultsRoot);
    let uploaded = 0;
    for (const sub of resultFolders) {
      const dir = resolveSubdir(resultsRoot, sub);
      if (!dir) continue;
      const files = fs.readdirSync(dir);
      for (const name of files) {
        const ext = path.extname(name).toLowerCase();
        if (!IMAGE_EXTS.has(ext)) continue;
        const abs = path.join(dir, name);
        if (!fs.statSync(abs).isFile()) continue;
        await uploadImage(abs, `${PREFIX}/results/${sub}`, imagePublicId(name));
        uploaded += 1;
      }
    }
    if (uploaded === 0) {
      console.warn(
        "No image files found under results subfolders. Expected: state, national, international, graduation, others (names can vary by case)."
      );
    }
  } else {
    console.warn(
      "Skip: no RESULTS folder found. Put albums in one of:\n" +
        "  public/RESULTS/   (recommended)\n" +
        "  public/results/\n" +
        "  RESULTS/          (project root)\n" +
        "Then add subfolders: state, national, international, graduation, others"
    );
  }

  // Staff headshots — STAFF/ at project root or public/STAFF/ → rd-abacus-nadiad/staff/<name>
  function resolveStaffDir() {
    const candidates = [
      path.join(root, "STAFF"),
      path.join(root, "public", "STAFF"),
    ];
    for (const p of candidates) {
      if (fs.existsSync(p) && fs.statSync(p).isDirectory()) return p;
    }
    return null;
  }

  const staffDir = resolveStaffDir();
  if (staffDir) {
    console.log("STAFF folder:", staffDir);
    for (const name of fs.readdirSync(staffDir)) {
      const ext = path.extname(name).toLowerCase();
      if (!IMAGE_EXTS.has(ext)) continue;
      const abs = path.join(staffDir, name);
      if (!fs.statSync(abs).isFile()) continue;
      await uploadImage(abs, `${PREFIX}/staff`, imagePublicId(name));
    }
  } else {
    console.warn(
      "Skip: no STAFF folder. Add STAFF/ at project root or public/STAFF/ with staff photos."
    );
  }

  const falguniCandidates = [
    path.join(root, "public", "falguni.png"),
    path.join(root, "public", "falguni.jpg"),
    path.join(root, "public", "falguni.jpeg"),
    path.join(root, "falguni.png"),
    path.join(root, "falguni.jpg"),
  ];
  for (const fp of falguniCandidates) {
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      await uploadImage(fp, `${PREFIX}/staff`, "falguni");
      break;
    }
  }

  // Life gallery — LIFE/ or public/LIFE/ → rd-abacus-nadiad/life/<name> + writes src/lib/life-gallery.generated.ts
  function resolveLifeDir() {
    const candidates = [
      path.join(root, "LIFE"),
      path.join(root, "public", "LIFE"),
    ];
    for (const p of candidates) {
      if (fs.existsSync(p) && fs.statSync(p).isDirectory()) return p;
    }
    return null;
  }

  const lifeDir = resolveLifeDir();
  const lifePublicIds = [];
  if (lifeDir) {
    console.log("LIFE folder:", lifeDir);
    const lifeNames = fs
      .readdirSync(lifeDir)
      .filter((name) => {
        const ext = path.extname(name).toLowerCase();
        if (!IMAGE_EXTS.has(ext)) return false;
        const abs = path.join(lifeDir, name);
        return fs.statSync(abs).isFile();
      })
      .sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );

    for (const name of lifeNames) {
      const abs = path.join(lifeDir, name);
      const id = imagePublicId(name);
      await uploadImage(abs, `${PREFIX}/life`, id);
      lifePublicIds.push(`${PREFIX}/life/${id}`);
    }

    const genPath = path.join(root, "src", "lib", "life-gallery.generated.ts");
    const genBody =
      `// AUTO-GENERATED by scripts/upload-to-cloudinary.cjs — do not edit by hand\n` +
      `export const LIFE_GALLERY_PUBLIC_IDS = [\n` +
      lifePublicIds.map((id) => `  "${id}",`).join("\n") +
      `\n] as const;\n`;
    fs.writeFileSync(genPath, genBody, "utf8");
    console.log("Wrote", genPath);
  } else {
    console.warn(
      "Skip: no LIFE folder. Add LIFE/ at project root or public/LIFE/ for gallery marquees."
    );
  }

  console.log("\nDone. Base URL: https://res.cloudinary.com/" + cloudName + "/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
