#!/usr/bin/env node
/**
 * Capture all 11 card animations as MP4 videos using Playwright.
 *
 * Usage:
 *   node capture-cards.mjs              # capture all cards
 *   node capture-cards.mjs intro prize  # capture specific cards
 *
 * Requires: playwright (npx playwright install chromium), ffmpeg
 * Output:   public/videos/card-<id>.mp4 (1080x1920, H.264, 5s)
 *
 * Captures at 540x960 with JPEG frames for speed, then upscales
 * to 1080x1920 with ffmpeg using lanczos for sharp output.
 */

import { chromium } from 'playwright';
import { execSync } from 'child_process';
import { mkdirSync, rmSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const FPS = 30;
const DURATION = 5;
const TOTAL_FRAMES = FPS * DURATION;
const CAPTURE_W = 540;
const CAPTURE_H = 960;
const OUTPUT_W = 1080;
const OUTPUT_H = 1920;
const FRAME_DIR = join(__dirname, '.capture-frames');
const OUTPUT_DIR = join(__dirname, 'public', 'videos');
const DEV_URL = 'http://localhost:5173';

const CARDS = [
  { id: 'intro',      index: 0,  file: 'card-one' },
  { id: 'tagline',    index: 1,  file: 'card-two' },
  { id: 'event',      index: 2,  file: 'card-three' },
  { id: 'urgency',    index: 3,  file: 'card-four' },
  { id: 'vision',     index: 4,  file: 'card-five' },
  { id: 'prize',      index: 5,  file: 'card-six' },
  { id: 'spec-hw',    index: 6,  file: 'card-spec-hardware' },
  { id: 'spec-sw',    index: 7,  file: 'card-spec-software' },
  { id: 'spec-ges',   index: 8,  file: 'card-spec-gestures' },
  { id: 'spec-dance', index: 9,  file: 'card-spec-dances' },
  { id: 'spec-r3',    index: 10, file: 'card-spec-controller' },
];

const args = process.argv.slice(2);
const targets = args.length
  ? CARDS.filter(c => args.includes(c.id) || args.includes(c.file))
  : CARDS;

if (targets.length === 0) {
  console.error('No matching cards found. Available:', CARDS.map(c => c.id).join(', '));
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

console.log(`\nCapturing ${targets.length} card(s) at ${CAPTURE_W}x${CAPTURE_H} → ${OUTPUT_W}x${OUTPUT_H} @ ${FPS}fps, ${DURATION}s each\n`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: CAPTURE_W, height: CAPTURE_H },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

// Hide download button and disable scroll snapping during capture
await page.addStyleTag({
  content: `
    [data-no-capture], [data-no-capture] * { display: none !important; }
    .snap-y { scroll-snap-type: none !important; }
  `
});

await page.goto(DEV_URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

for (const card of targets) {
  const frameDir = join(FRAME_DIR, card.file);
  const outFile = join(OUTPUT_DIR, `${card.file}.mp4`);

  if (existsSync(frameDir)) rmSync(frameDir, { recursive: true });
  mkdirSync(frameDir, { recursive: true });

  // Scroll to target card
  await page.evaluate((idx) => {
    const section = document.querySelector(`[data-reel="${idx}"]`);
    if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
  }, card.index);

  await page.waitForTimeout(1000);

  // Get the card's bounding box
  const cardBox = await page.evaluate((idx) => {
    const section = document.querySelector(`[data-reel="${idx}"]`);
    if (!section) return null;
    const frame = section.querySelector('.relative');
    if (!frame) return null;
    const rect = frame.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  }, card.index);

  if (!cardBox) {
    console.error(`  Could not find card element for ${card.id}, skipping`);
    continue;
  }

  const t0 = Date.now();
  process.stdout.write(`  ${card.id} (${card.file}): `);

  // Capture frames as JPEG for speed
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameNum = String(i).padStart(4, '0');
    await page.screenshot({
      path: join(frameDir, `frame-${frameNum}.jpg`),
      type: 'jpeg',
      quality: 95,
      clip: {
        x: Math.round(cardBox.x),
        y: Math.round(cardBox.y),
        width: Math.round(cardBox.width),
        height: Math.round(cardBox.height),
      },
    });
    // Minimal wait — screenshot time acts as the frame interval
    await page.waitForTimeout(1);
  }

  const captureTime = ((Date.now() - t0) / 1000).toFixed(1);
  process.stdout.write(`${TOTAL_FRAMES} frames in ${captureTime}s → `);

  // Encode with ffmpeg — upscale from capture res to output res
  try {
    execSync(
      `ffmpeg -y -framerate ${FPS} -i "${join(frameDir, 'frame-%04d.jpg')}" ` +
      `-vf "scale=${OUTPUT_W}:${OUTPUT_H}:flags=lanczos" ` +
      `-c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p ` +
      `-crf 18 -preset medium -movflags +faststart ` +
      `"${outFile}"`,
      { stdio: 'pipe' }
    );
    const size = statSync(outFile).size;
    const sizeMB = (size / 1024 / 1024).toFixed(1);
    console.log(`${sizeMB} MB ✓`);
  } catch (err) {
    console.log(`FAILED: ${err.stderr?.toString().split('\n').pop() || err.message}`);
  }

  // Clean up frames
  rmSync(frameDir, { recursive: true });
}

if (existsSync(FRAME_DIR)) rmSync(FRAME_DIR, { recursive: true, force: true });

await browser.close();
console.log('\nDone!\n');
