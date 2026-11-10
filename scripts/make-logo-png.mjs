// Конвертирует логотип в PNG и убирает белый фон ТОЛЬКО снаружи логотипа
// (заливка от краёв изображения), белые элементы внутри логотипа сохраняются.
// Usage: node scripts/make-logo-png.mjs <input> <output.png>
import sharp from "sharp";

const [, , input, output] = process.argv;
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = (x, y) => (y * W + x) * 4;
const minc = (i) => Math.min(data[i], data[i + 1], data[i + 2]);

const THRESH = 228; // «почти белый»
const bg = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) stack.push([x, 0], [x, H - 1]);
for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y]);
while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= W || y >= H) continue;
  const k = y * W + x;
  if (bg[k] || minc(k * 4) < THRESH) continue;
  bg[k] = 1;
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

// Мягкий край: пиксели рядом с фоном получают частичную прозрачность
const near = (x, y, r) => {
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < W && ny < H && bg[ny * W + nx]) return true;
    }
  return false;
};
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const k = y * W + x, i = k * 4;
    if (bg[k]) { data[i + 3] = 0; continue; }
    if (!near(x, y, 2)) continue;
    const m = minc(i);
    const a = Math.max(0, Math.min(1, (255 - m) / (255 - 170)));
    if (a >= 1) continue;
    // убираем белую «кайму» из цвета
    for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - 255 * (1 - a)) / Math.max(a, 0.01))));
    data[i + 3] = Math.round(a * 255);
  }

await sharp(data, { raw: { width: W, height: H, channels: 4 } })
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log("saved", output);
