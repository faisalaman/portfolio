// One-shot generator for public/og-image.png (1200x630).
// Run:  node scripts/gen-og.js
// Edit the SVG string below to tweak the social card design.

import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"  stop-color="#0a0a18"/>
      <stop offset="100%" stop-color="#14142b"/>
    </linearGradient>
    <radialGradient id="glowA" cx="25%" cy="35%" r="55%">
      <stop offset="0%"  stop-color="#a78bfa" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="80%" cy="70%" r="55%">
      <stop offset="0%"  stop-color="#22d3ee" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowC" cx="60%" cy="20%" r="40%">
      <stop offset="0%"  stop-color="#f472b6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="grad-text" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#a78bfa"/>
      <stop offset="50%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#ffffff" opacity="0.06"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <rect width="1200" height="630" fill="url(#glowC)"/>

  <!-- Badge -->
  <g transform="translate(80, 90)">
    <rect x="0" y="0" width="440" height="46" rx="23"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <circle cx="22" cy="23" r="5" fill="#22d3ee"/>
    <text x="40" y="29"
          font-family="Inter, system-ui, sans-serif"
          font-size="15" font-weight="600" fill="#f5f5fa">
      AI Engineer · LLM Systems · Backend Architect
    </text>
  </g>

  <!-- Headline -->
  <text x="80" y="240"
        font-family="Inter, system-ui, sans-serif"
        font-size="76" font-weight="800" fill="#f5f5fa"
        letter-spacing="-1.5">
    Building
  </text>
  <text x="80" y="330"
        font-family="Inter, system-ui, sans-serif"
        font-size="76" font-weight="800" fill="url(#grad-text)"
        letter-spacing="-1.5">
    Intelligent AI Systems
  </text>
  <text x="80" y="420"
        font-family="Inter, system-ui, sans-serif"
        font-size="76" font-weight="800" fill="#f5f5fa"
        letter-spacing="-1.5">
    That Solve Real Problems
  </text>

  <!-- Subline -->
  <text x="80" y="490"
        font-family="Inter, system-ui, sans-serif"
        font-size="24" font-weight="500" fill="#8a8aa3">
    LLMs · Vector DBs · Secure APIs · Enterprise .NET · Azure
  </text>

  <!-- Signature -->
  <text x="80" y="560"
        font-family="Inter, system-ui, sans-serif"
        font-size="18" font-weight="700" fill="#f5f5fa"
        letter-spacing="2">
    FAISAL AMAN
  </text>
  <text x="80" y="585"
        font-family="Inter, system-ui, sans-serif"
        font-size="15" font-weight="500" fill="#8a8aa3">
    profile-faisal.vercel.app
  </text>

  <!-- Decorative rings (right side) -->
  <g transform="translate(950, 315)" opacity="0.7">
    <circle cx="0" cy="0" r="140" fill="none" stroke="url(#grad-text)" stroke-width="1.2" stroke-dasharray="4 6"/>
    <circle cx="0" cy="0" r="110" fill="none" stroke="url(#grad-text)" stroke-width="1" stroke-dasharray="2 8" opacity="0.7"/>
    <circle cx="0" cy="0" r="78"  fill="none" stroke="url(#grad-text)" stroke-width="1.4" stroke-dasharray="8 4" opacity="0.6"/>
    <circle cx="0" cy="0" r="34"  fill="#a78bfa" opacity="0.35"/>
    <circle cx="0" cy="0" r="14"  fill="#22d3ee" opacity="0.9"/>
  </g>
</svg>`.trim();

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile('public/og-image.png', png);
console.log('✔ wrote public/og-image.png', png.length, 'bytes');
