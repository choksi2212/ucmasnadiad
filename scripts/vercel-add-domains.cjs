/**
 * Register ucmasnadiad.in (+ www) on your Vercel team via CLI.
 *
 * Vercel CLI v50+ uses:  vercel domains add <domain>   (one argument only).
 * Project binding uses the linked repo (.vercel/project.json from `npm run vercel:link`).
 *
 * Prerequisites:
 *   npm run vercel:login
 *   npm run vercel:link
 *
 * Then add DNS at GoDaddy. Inspect expected records:
 *   npm run vercel:domains:inspect
 *   npm run vercel:domains:inspect:www */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const projectFile = path.join(root, ".vercel", "project.json");

if (!fs.existsSync(projectFile)) {
  console.error("Missing .vercel/project.json — run first: npm run vercel:link");
  process.exit(1);
}

const domains = ["ucmasnadiad.in", "www.ucmasnadiad.in"];

console.log("Registering domains on your Vercel team (from linked project cwd)...\n");

for (const d of domains) {
  console.log("Adding:", d);
  try {
    execSync(`npx vercel@latest domains add ${d}`, {
      stdio: "inherit",
      cwd: root,
      shell: true,
    });
  } catch {
    console.error("(If this domain is already on your team, Vercel may error — that is OK.)\n");
  }
}

console.log("\n--- DNS at GoDaddy ---");
console.log("Apex:   npx vercel@latest domains inspect ucmasnadiad.in");
console.log("www:    npx vercel@latest domains inspect www.ucmasnadiad.in\n");

try {
  execSync(`npx vercel@latest domains inspect ucmasnadiad.in`, {
    stdio: "inherit",
    cwd: root,
    shell: true,
  });
} catch {
  // ignore
}
