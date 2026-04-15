// Chat provider seam.
//
// Today: returns a keyword-matched canned answer from profile data.
// Future: swap the body of `askAgent` to call your own agent API.
//   Example (uncomment when your endpoint exists):
//
//     const res = await fetch('https://your-agent.example.com/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message, history }),
//     });
//     const { reply } = await res.json();
//     return reply;
//
// The signature stays stable so the UI does not change when you migrate.

import { profile, services, techExpertise } from '../data/profile';

const responses = [
  { keys: ['who', 'name', 'about you'], answer: () => `I'm ${profile.name} — ${profile.title}. ${profile.summary}` },
  { keys: ['contact', 'email', 'reach', 'phone'], answer: () => `Email: ${profile.email} · Phone: ${profile.phone}` },
  { keys: ['location', 'where', 'based'], answer: () => `Based in ${profile.location}.` },
  { keys: ['service', 'do', 'offer', 'help'], answer: () => `I offer: ${services.map((s) => s.title).join(', ')}.` },
  { keys: ['tech', 'stack', 'skills', 'language', 'framework'], answer: () => `Core stack: ${Object.values(techExpertise).slice(0, 3).join(' · ')}.` },
  { keys: ['linkedin'], answer: () => `LinkedIn: ${profile.linkedin}` },
  { keys: ['github'], answer: () => profile.github ? `GitHub: ${profile.github}` : "GitHub coming soon." },
];

function keywordFallback(input) {
  const q = (input ?? '').toLowerCase();
  for (const r of responses) {
    if (r.keys.some((k) => q.includes(k))) return r.answer();
  }
  return "I can answer questions about my background, services, tech stack, location, or how to get in touch. Try asking about one of those!";
}

/**
 * Ask the chat agent a question.
 * @param {string} message - user message
 * @param {Array<{role: 'user'|'bot', text: string}>} history - prior turns (unused by keyword fallback)
 * @returns {Promise<string>} reply text
 */
export async function askAgent(message /*, history */) {
  return keywordFallback(message);
}
