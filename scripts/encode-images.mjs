// Generate AVIF + WebP siblings for every gallery JPG in public/images (both the
// full-size and the "-sm" phone variant). The <Pic> component serves these to
// browsers that support them, falling back to the original JPG everywhere else,
// so quality is preserved while transfer size drops ~40-45%.
//
//   node scripts/encode-images.mjs
//
// Re-run after adding/replacing any g-*.jpg. Uses sharp (already present via Next).
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public/images");
const files = readdirSync(dir).filter((f) => /^g-.*\.jpg$/i.test(f));

let jpg = 0,
  webp = 0,
  avif = 0;

for (const f of files) {
  const src = join(dir, f);
  const base = f.replace(/\.jpg$/i, "");
  jpg += statSync(src).size;
  // q82 WebP / q62 AVIF — visually lossless for these photos at these sizes.
  await sharp(src).webp({ quality: 82, effort: 5 }).toFile(join(dir, base + ".webp"));
  await sharp(src).avif({ quality: 62, effort: 4 }).toFile(join(dir, base + ".avif"));
  webp += statSync(join(dir, base + ".webp")).size;
  avif += statSync(join(dir, base + ".avif")).size;
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log(`encoded ${files.length} files`);
console.log(`JPG  ${mb(jpg)} MB`);
console.log(`WebP ${mb(webp)} MB (${Math.round((1 - webp / jpg) * 100)}% smaller)`);
console.log(`AVIF ${mb(avif)} MB (${Math.round((1 - avif / jpg) * 100)}% smaller)`);
