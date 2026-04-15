// Generates public/Faisal-Aman-AI-Developer-Resume.pdf from src/data/profile.js.
// Run:  npm run gen:resume
//
// Tweaking: edit profile.js (source of truth) or the layout below.

import { writeFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';
import PDFDocument from 'pdfkit';
import {
  profile,
  capabilities,
  projects,
  experience,
  skills,
  techExpertise,
} from '../src/data/profile.js';

const OUT = 'public/Faisal-Aman-AI-Developer-Resume.pdf';

// ---- palette (paper-friendly) ----
const C = {
  text: '#0f172a',
  muted: '#64748b',
  primary: '#4f46e5',
  accent: '#0ea5e9',
  rule: '#e2e8f0',
};

const doc = new PDFDocument({ size: 'A4', margin: 44 });
const chunks = [];
doc.on('data', (c) => chunks.push(c));
doc.on('end', () => {
  writeFileSync(OUT, Buffer.concat(chunks));
  console.log('✔ wrote', OUT);
});

// --- helpers ---
const W = doc.page.width - doc.page.margins.left - doc.page.margins.right;

function h1(text) {
  doc.fillColor(C.text).font('Helvetica-Bold').fontSize(22).text(text);
}
function role(text) {
  doc.fillColor(C.primary).font('Helvetica-Bold').fontSize(11).text(text);
}
function hr() {
  const y = doc.y + 4;
  doc.moveTo(doc.page.margins.left, y).lineTo(doc.page.margins.left + W, y).strokeColor(C.rule).lineWidth(0.7).stroke();
  doc.moveDown(0.6);
}
function sectionHeading(text) {
  doc.moveDown(0.6);
  doc.fillColor(C.primary).font('Helvetica-Bold').fontSize(10).text(text.toUpperCase(), { characterSpacing: 1.2 });
  hr();
}
function muted(text, opts = {}) {
  doc.fillColor(C.muted).font('Helvetica').fontSize(9.5).text(text, opts);
}
function body(text, opts = {}) {
  doc.fillColor(C.text).font('Helvetica').fontSize(10).text(text, opts);
}
function bullet(text) {
  doc.fillColor(C.text).font('Helvetica').fontSize(10).list([text], { bulletRadius: 1.6, textIndent: 10, bulletIndent: 4 });
}

// ---- HEADER ----
h1(profile.name);
role(profile.title);
doc.moveDown(0.3);
muted([
  profile.email,
  profile.phone,
  profile.location,
  profile.linkedin,
  profile.github,
].filter(Boolean).join('  ·  '));
hr();

// ---- SUMMARY ----
sectionHeading('Summary');
body(profile.summary);

// ---- AI CAPABILITIES ----
sectionHeading('AI Capabilities');
capabilities.forEach((c) => {
  doc.fillColor(C.text).font('Helvetica-Bold').fontSize(10).text(c.title, { continued: true });
  doc.font('Helvetica').fillColor(C.muted).text('  —  ' + c.description);
});

// ---- CORE SKILLS ----
sectionHeading('Core Skills');
const groups = skills.reduce((acc, s) => {
  const key = s.group || 'Other';
  (acc[key] = acc[key] || []).push(s);
  return acc;
}, {});
['AI', 'Backend', 'Cloud', 'Frontend', 'Other'].forEach((g) => {
  if (!groups[g]) return;
  const line = groups[g].map((s) => `${s.name}`).join(', ');
  doc.fillColor(C.primary).font('Helvetica-Bold').fontSize(10).text(`${g}: `, { continued: true });
  doc.fillColor(C.text).font('Helvetica').text(line);
});

// ---- TECH STACK ----
sectionHeading('Tech Stack');
Object.entries(techExpertise).forEach(([k, v]) => {
  doc.fillColor(C.primary).font('Helvetica-Bold').fontSize(10).text(`${k}: `, { continued: true });
  doc.fillColor(C.text).font('Helvetica').text(v);
});

// ---- PROJECTS (case-study digest) ----
sectionHeading('Selected Projects');
projects.forEach((p) => {
  doc.fillColor(C.text).font('Helvetica-Bold').fontSize(11).text(p.title, { continued: true });
  doc.fillColor(C.muted).font('Helvetica').fontSize(9).text('  ·  ' + p.status);
  muted(p.tagline);
  body(`Problem — ${p.problem}`);
  body(`Solution — ${p.solution}`);
  muted(`Stack: ${p.stack.join(', ')}`);
  doc.moveDown(0.4);
});

// ---- EXPERIENCE ----
sectionHeading('Experience');
experience.forEach((j) => {
  doc.fillColor(C.text).font('Helvetica-Bold').fontSize(11).text(j.role, { continued: true });
  doc.fillColor(C.muted).font('Helvetica').fontSize(9.5).text('  ·  ' + j.period);
  doc.fillColor(C.primary).font('Helvetica').fontSize(10).text(j.company);
  if (j.description) muted(j.description);
  if (Array.isArray(j.highlights)) {
    j.highlights.forEach((h) => bullet(h));
  }
  if (Array.isArray(j.tech) && j.tech.length) {
    muted(`Tech: ${j.tech.join(', ')}`);
  }
  doc.moveDown(0.4);
});

// ---- EDUCATION + CERTS ----
sectionHeading('Education & Certifications');
doc.fillColor(C.text).font('Helvetica-Bold').fontSize(10).text(profile.education.degree, { continued: true });
doc.fillColor(C.muted).font('Helvetica').text('  —  ' + profile.education.school);
(profile.certifications || []).forEach((c) => {
  doc.fillColor(C.text).font('Helvetica-Bold').fontSize(10).text(c.name, { continued: true });
  doc.fillColor(C.muted).font('Helvetica').text('  —  ' + c.description);
});

// ---- FOOTER ----
doc.moveDown(0.8);
muted(`Languages: ${profile.languages}  ·  ${profile.nationality ?? ''}  ·  ${profile.visaStatus ?? ''}`.replace(/ +· +$/, ''));

doc.end();
