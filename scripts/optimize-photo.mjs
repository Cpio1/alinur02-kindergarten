// Usage: node scripts/optimize-photo.mjs <input> <output.webp> [maxSize]
import sharp from "sharp";
const [, , input, output, max = "1600"] = process.argv;
if (!input || !output) {
  console.error("Usage: node scripts/optimize-photo.mjs <input> <output.webp> [maxSize]");
  process.exit(1);
}
await sharp(input)
  .rotate()
  .resize({ width: Number(max), height: Number(max), fit: "inside", withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(output);
console.log("saved", output);
