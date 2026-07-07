// One-off generator: rasterizes app/icon.svg (the Crusit logo) into a
// multi-size favicon.ico and a PNG icon, so crawlers/Google and legacy
// browsers get a reliable raster favicon. Run: node scripts/gen-favicons.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = await readFile(join(root, "app", "icon.svg"));

const sizes = [16, 32, 48, 256];

const pngs = await Promise.all(
  sizes.map((size) =>
    sharp(svg, { density: 384 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
  ),
);

// Build a minimal ICO container embedding each PNG entry.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4); // image count

const entries = [];
let offset = 6 + sizes.length * 16;
for (let i = 0; i < sizes.length; i += 1) {
  const size = sizes[i];
  const png = pngs[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 => 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 => 256)
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // data size
  entry.writeUInt32LE(offset, 12); // data offset
  entries.push(entry);
  offset += png.length;
}

const ico = Buffer.concat([header, ...entries, ...pngs]);
await writeFile(join(root, "app", "favicon.ico"), ico);

// A standalone 512px PNG for platforms that prefer a raster icon.
const png512 = await sharp(svg, { density: 512 })
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
await writeFile(join(root, "app", "icon.png"), png512);

console.log("Generated app/favicon.ico and app/icon.png");
