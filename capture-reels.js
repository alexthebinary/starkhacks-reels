// Playwright MCP frame capture script — run via browser_run_code
// Captures frames for one card at a time, saves to Reels/frames/<card-id>/

async (page) => {
  const CARD_INDEX = parseInt(page.url().hash.replace('#card-', '') || '0');
  const FPS = 30;
  const DURATION_SECS = 8;
  const TOTAL_FRAMES = FPS * DURATION_SECS;

  const cards = [
    'intro', 'tagline', 'event', 'urgency', 'vision', 'prize',
    'spec-hw', 'spec-sw', 'spec-ges', 'spec-dance', 'spec-r3'
  ];
  const cardId = cards[CARD_INDEX] || 'intro';
  const frameDir = `animated-posts/Reels/frames/${cardId}`;

  // Scroll to the target card
  await page.evaluate((idx) => {
    const section = document.querySelector(`[data-reel="${idx}"]`);
    if (section) section.scrollIntoView({ behavior: 'instant' });
  }, CARD_INDEX);

  // Wait for animations to start
  await page.waitForTimeout(1500);

  // Capture frames
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameNum = String(i).padStart(4, '0');
    await page.screenshot({
      path: `${frameDir}/frame-${frameNum}.png`,
      type: 'png',
      scale: 'css'
    });
    await page.waitForTimeout(Math.round(1000 / FPS));
  }

  return `Captured ${TOTAL_FRAMES} frames for card "${cardId}" at ${FPS}fps`;
}
