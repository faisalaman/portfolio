// Generates public/Faisal_Aman_CV_UAE.pdf from src/data/profile.js.
// Two-column layout: dark navy sidebar + main content column.
// Run:  npm run gen:resume

import { writeFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';
import PDFDocument from 'pdfkit';
import {
  profile,
  projects,
  experience,
  skills,
  techExpertise,
} from '../src/data/profile.js';

const OUT = 'public/Faisal_Aman_CV_UAE.pdf';

// ---- palette ----
const C = {
  sidebar: '#0f2847',
  sidebarText: '#ffffff',
  sidebarMuted: '#b8c5d6',
  accent: '#e0b84a',
  text: '#1a2332',
  muted: '#5a6b82',
  primary: '#0f2847',
  rule: '#d8dee8',
  barOn: '#e0b84a',
  barOff: '#3a5270',
};

// ---- layout ----
const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const SIDEBAR_W = 200;
const MAIN_X = SIDEBAR_W + 28;
const MAIN_W = PAGE_W - MAIN_X - 36;
const SIDEBAR_PAD_X = 22;
const SIDEBAR_INNER_W = SIDEBAR_W - SIDEBAR_PAD_X * 2;

const doc = new PDFDocument({ size: 'A4', margin: 0, bufferPages: true });
const chunks = [];
doc.on('data', (c) => chunks.push(c));
doc.on('end', () => {
  writeFileSync(OUT, Buffer.concat(chunks));
  console.log('✔ wrote', OUT);
});

// Paint sidebar background on every page
function paintSidebar() {
  doc.save();
  doc.rect(0, 0, SIDEBAR_W, PAGE_H).fill(C.sidebar);
  doc.restore();
}
doc.on('pageAdded', paintSidebar);
paintSidebar();

// ---- main column cursor ----
let mainY = 44;
const MAIN_TOP = 44;
const MAIN_BOTTOM = PAGE_H - 44;

function ensureMainSpace(h) {
  if (mainY + h > MAIN_BOTTOM) {
    doc.addPage();
    mainY = MAIN_TOP;
  }
}

function mainText(text, opts = {}) {
  const {
    font = 'Helvetica',
    size = 10,
    color = C.text,
    gap = 2,
    indent = 0,
  } = opts;
  doc.font(font).fontSize(size).fillColor(color);
  const width = MAIN_W - indent;
  const h = doc.heightOfString(text, { width });
  ensureMainSpace(h + gap);
  doc.text(text, MAIN_X + indent, mainY, { width });
  mainY += h + gap;
}

function mainHeading(label) {
  ensureMainSpace(24);
  mainY += 3;
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(C.primary);
  const labelText = label.toUpperCase();
  doc.text(labelText, MAIN_X, mainY, { characterSpacing: 1.3, width: MAIN_W });
  mainY += doc.heightOfString(labelText, { width: MAIN_W, characterSpacing: 1.3 }) + 2;
  doc.moveTo(MAIN_X, mainY).lineTo(MAIN_X + 60, mainY).lineWidth(1).strokeColor(C.accent).stroke();
  mainY += 5;
}

function sanitize(s) {
  if (!s) return s;
  return String(s)
    .replace(/[→➜➔]/g, '->')
    .replace(/[•●]/g, '-')
    .replace(/[…]/g, '...')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'");
}

function mainBullet(text) {
  doc.font('Helvetica').fontSize(8.8).fillColor(C.text);
  const indent = 9;
  const width = MAIN_W - indent;
  const t = sanitize(text);
  const h = doc.heightOfString(t, { width });
  ensureMainSpace(h + 1.5);
  doc.fillColor(C.accent).text('-', MAIN_X, mainY, { width: 8 });
  doc.fillColor(C.text).text(t, MAIN_X + indent, mainY, { width });
  mainY += h + 1.5;
}

// ---- sidebar cursor ----
let sideY = 40;

function sideBlock(fn, extraGap = 10) {
  fn();
  sideY += extraGap;
}

function sideText(text, opts = {}) {
  const {
    font = 'Helvetica',
    size = 9,
    color = C.sidebarText,
    gap = 2,
    align = 'left',
  } = opts;
  doc.font(font).fontSize(size).fillColor(color);
  const h = doc.heightOfString(text, { width: SIDEBAR_INNER_W, align });
  doc.text(text, SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W, align });
  sideY += h + gap;
}

function sideHeading(label) {
  sideY += 6;
  doc.font('Helvetica-Bold').fontSize(10).fillColor(C.accent);
  const labelText = label.toUpperCase();
  doc.text(labelText, SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W, characterSpacing: 1.2 });
  sideY += doc.heightOfString(labelText, { width: SIDEBAR_INNER_W, characterSpacing: 1.2 }) + 4;
  doc.moveTo(SIDEBAR_PAD_X, sideY).lineTo(SIDEBAR_PAD_X + 60, sideY).lineWidth(1).strokeColor(C.accent).stroke();
  sideY += 8;
}

function sideSkillBar(name, level) {
  doc.font('Helvetica').fontSize(8.5).fillColor(C.sidebarText);
  doc.text(name, SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W });
  sideY += doc.heightOfString(name, { width: SIDEBAR_INNER_W }) + 3;
  // 5 blocks
  const blockW = (SIDEBAR_INNER_W - 4 * 2) / 5;
  for (let i = 0; i < 5; i++) {
    const x = SIDEBAR_PAD_X + i * (blockW + 2);
    doc.rect(x, sideY, blockW, 5).fill(i < level ? C.barOn : C.barOff);
  }
  sideY += 11;
}

// ================== SIDEBAR CONTENT ==================
sideY = 38;

// Name
const [firstName, ...rest] = profile.name.split(' ');
doc.font('Helvetica-Bold').fontSize(22).fillColor(C.sidebarText);
doc.text(firstName.toUpperCase(), SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W, align: 'center' });
sideY += 24;
doc.font('Helvetica-Bold').fontSize(22).fillColor(C.accent);
doc.text(rest.join(' ').toUpperCase(), SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W, align: 'center' });
sideY += 26;
doc.font('Helvetica').fontSize(9.5).fillColor(C.sidebarMuted);
doc.text(profile.title, SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W, align: 'center' });
sideY += 22;

// Divider
doc.moveTo(SIDEBAR_PAD_X, sideY).lineTo(SIDEBAR_PAD_X + SIDEBAR_INNER_W, sideY).lineWidth(0.8).strokeColor(C.accent).stroke();
sideY += 10;

// Contact
sideHeading('Contact');
sideText(`Tel:  ${profile.phone}`, { size: 8.5, gap: 5 });
sideText(`Email:  ${profile.email}`, { size: 8.5, gap: 5 });
sideText(`Loc:  ${profile.location}`, { size: 8.5, gap: 5 });
sideText(`in:  ${profile.linkedin.replace(/^https?:\/\//, '')}`, { size: 8, gap: 5 });

// Personal info
sideHeading('Personal Info');
doc.font('Helvetica-Bold').fontSize(9).fillColor(C.sidebarText).text('Nationality:', SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W });
sideY += 12;
sideText(profile.nationality, { size: 8.5, color: C.sidebarMuted, gap: 6 });
doc.font('Helvetica-Bold').fontSize(9).fillColor(C.sidebarText).text('Visa Status:', SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W });
sideY += 12;
sideText(profile.visaStatus, { size: 8.5, color: C.sidebarMuted, gap: 6 });
doc.font('Helvetica-Bold').fontSize(9).fillColor(C.sidebarText).text('Languages:', SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W });
sideY += 12;
sideText(profile.languages, { size: 8.5, color: C.sidebarMuted, gap: 6 });

// Core Skills (top-ranked)
sideHeading('Core Skills');
const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 10);
topSkills.forEach((s) => sideSkillBar(s.name, s.level));

// Education
sideHeading('Education');
doc.font('Helvetica-Bold').fontSize(9.5).fillColor(C.sidebarText);
doc.text(profile.education.degree, SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W });
sideY += doc.heightOfString(profile.education.degree, { width: SIDEBAR_INNER_W }) + 3;
sideText(profile.education.school, { size: 8.5, color: C.sidebarMuted, gap: 10 });

// Certifications
sideHeading('Certification');
(profile.certifications || []).forEach((c) => {
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(C.sidebarText);
  doc.text(c.name, SIDEBAR_PAD_X, sideY, { width: SIDEBAR_INNER_W });
  sideY += 12;
  sideText(c.description, { size: 8.5, color: C.sidebarMuted, gap: 6 });
});

// ================== MAIN CONTENT ==================
mainY = MAIN_TOP;

// Summary
mainHeading('Professional Summary');
mainText(profile.summary, { size: 9.3, color: C.text, gap: 3 });

// Tech expertise
mainHeading('Technical Expertise');
Object.entries(techExpertise).forEach(([k, v]) => {
  const combined = `${k}: ${v}`;
  doc.font('Helvetica').fontSize(8.8).fillColor(C.text);
  const h = doc.heightOfString(combined, { width: MAIN_W });
  ensureMainSpace(h + 1.5);
  doc.font('Helvetica-Bold').fillColor(C.primary).text(`${k}: `, MAIN_X, mainY, { width: MAIN_W, continued: true });
  doc.font('Helvetica').fillColor(C.text).text(v);
  mainY += h + 1.5;
});

// Selected projects (compact — tagline + stack only)
mainHeading('Selected Projects');
projects.forEach((p) => {
  ensureMainSpace(28);
  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(C.primary);
  doc.text(p.title, MAIN_X, mainY, { width: MAIN_W, continued: true });
  doc.font('Helvetica').fontSize(8.3).fillColor(C.muted).text(`  ·  ${p.status}`);
  mainY += doc.heightOfString(p.title, { width: MAIN_W }) + 0.5;
  mainText(sanitize(p.tagline), { font: 'Helvetica-Oblique', size: 8.8, color: C.muted, gap: 1 });
  mainText(`Stack: ${p.stack.join(', ')}`, { size: 8.3, color: C.muted, gap: 3 });
});

// Experience
mainHeading('Professional Experience');
experience.forEach((j) => {
  ensureMainSpace(32);
  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(C.primary);
  doc.text(j.role, MAIN_X, mainY, { width: MAIN_W, continued: true });
  doc.font('Helvetica').fontSize(8.3).fillColor(C.muted).text(`  ·  ${j.period}`);
  mainY += doc.heightOfString(j.role, { width: MAIN_W }) + 0.5;
  mainText(j.company, { font: 'Helvetica-Oblique', size: 8.8, color: C.muted, gap: 1 });
  (j.highlights || []).forEach((h) => mainBullet(h));
  if (j.tech && j.tech.length) mainText(`Tech: ${j.tech.join(', ')}`, { size: 8.3, color: C.muted, gap: 3.5 });
});

// Page numbers
const range = doc.bufferedPageRange();
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(i);
  doc.font('Helvetica').fontSize(8).fillColor(C.muted);
  doc.text(
    `Faisal Aman  |  ${profile.title}  |  Page ${i + 1}`,
    MAIN_X,
    PAGE_H - 24,
    { width: MAIN_W, align: 'center' }
  );
}

doc.end();
