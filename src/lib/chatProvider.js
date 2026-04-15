// Chat provider seam.
//
// Today: a rule-based agent that answers questions from profile data.
// Future: swap the body of `askAgent` to call your own agent API. Example:
//
//   const res = await fetch('https://your-agent.example.com/chat', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ message, history }),
//   });
//   return (await res.json()).reply;
//
// UI never changes — only this file.

import {
  profile,
  services,
  techExpertise,
  experience,
  skills,
  capabilities,
  projects,
} from '../data/profile';

// ---- Suggested prompts (shown as chips in the UI) ----
export const SUGGESTED_PROMPTS = [
  'What do you do?',
  'Tell me about your AI work',
  'Which tech stack?',
  'Any AI projects?',
  'Where have you worked?',
  'How can I contact you?',
];

// ---- Intent detection ----
// Simple keyword groups. Ordered — first match wins.
const intents = [
  {
    name: 'greeting',
    keys: ['hello', 'hi ', 'hey', 'salam', 'assalam', 'good morning', 'good evening'],
    answer: () => `Hey! I'm a small agent trained on ${profile.name.split(' ')[0]}'s profile. Ask me about experience, projects, tech stack, or how to hire.`,
  },
  {
    name: 'identity',
    keys: ['who are you', 'who is he', 'who is faisal', 'name', 'about you', 'about him', 'tell me about'],
    answer: () => `${profile.name} — ${profile.title}. ${profile.summary}`,
  },
  {
    name: 'contact',
    keys: ['contact', 'email', 'reach', 'phone', 'number', 'hire', 'available'],
    answer: () => `Best way: ${profile.email} or ${profile.phone}. I'm based in ${profile.location}${profile.visaStatus ? ` on ${profile.visaStatus}` : ''}. LinkedIn: ${profile.linkedin}.`,
  },
  {
    name: 'location',
    keys: ['location', 'where are you', 'where based', 'city', 'country'],
    answer: () => `Based in ${profile.location}.`,
  },
  {
    name: 'ai-capabilities',
    keys: ['ai', 'llm', 'gpt', 'claude', 'openai', 'rag', 'vector', 'embedding', 'agent', 'prompt'],
    answer: () => {
      const lines = capabilities.map((c) => `• ${c.title}: ${c.description}`).join('\n');
      return `Here are the AI capabilities I work with:\n${lines}`;
    },
  },
  {
    name: 'services',
    keys: ['service', 'offer', 'help with', 'what do you do', 'can you do'],
    answer: () => `I ship: ${services.map((s) => s.title).join(', ')}. The common thread is production-grade .NET + cloud + LLM systems.`,
  },
  {
    name: 'projects',
    keys: ['project', 'case study', 'portfolio', 'built', 'work on', 'demo'],
    answer: () => {
      const lines = projects.map((p) => `• ${p.title} (${p.status}) — ${p.tagline}`).join('\n');
      return `Recent projects:\n${lines}\n\nOpen the Projects section for full case studies.`;
    },
  },
  {
    name: 'experience',
    keys: ['experience', 'worked at', 'worked with', 'company', 'companies', 'job', 'role', 'employer'],
    answer: () => {
      const lines = experience.slice(0, 4).map((e) => `• ${e.role} — ${e.company} (${e.period})`).join('\n');
      return `Some of my recent roles:\n${lines}`;
    },
  },
  {
    name: 'stack',
    keys: ['stack', 'technology', 'technologies', 'tech', 'framework', 'language', 'tool'],
    answer: () => {
      const top = Object.entries(techExpertise).slice(0, 5).map(([k, v]) => `• ${k}: ${v}`).join('\n');
      return `Core stack:\n${top}`;
    },
  },
  {
    name: 'skills',
    keys: ['skill', 'skilled', 'expertise', 'know', 'good at', 'strong in'],
    answer: () => {
      const top = skills.filter((s) => s.level >= 4).slice(0, 8).map((s) => `• ${s.name}`).join('\n');
      return `Strongest skills (4+/5):\n${top}`;
    },
  },
  {
    name: 'education',
    keys: ['education', 'degree', 'university', 'college', 'study'],
    answer: () => `${profile.education.degree} — ${profile.education.school}.`,
  },
  {
    name: 'certifications',
    keys: ['cert', 'certification', 'certified'],
    answer: () => profile.certifications.map((c) => `• ${c.name} — ${c.description}`).join('\n'),
  },
  {
    name: 'languages',
    keys: ['language spoken', 'speak', 'languages'],
    answer: () => `I speak ${profile.languages}.`,
  },
  {
    name: 'links',
    keys: ['linkedin', 'github', 'link', 'social'],
    answer: () => {
      const parts = [profile.linkedin && `LinkedIn: ${profile.linkedin}`, profile.github && `GitHub: ${profile.github}`].filter(Boolean);
      return parts.join('\n');
    },
  },
];

function matchIntent(message) {
  const q = (message ?? '').toLowerCase();
  for (const intent of intents) {
    if (intent.keys.some((k) => q.includes(k))) return intent;
  }
  return null;
}

// Look for a specific project name match
function matchProject(message) {
  const q = (message ?? '').toLowerCase();
  return projects.find((p) =>
    q.includes(p.title.toLowerCase()) ||
    q.includes(p.slug.replace(/-/g, ' ')) ||
    (p.slug.includes('uae') && (q.includes('uae pass') || q.includes('eseal')))
  );
}

function fallback() {
  return `I'm trained on ${profile.name.split(' ')[0]}'s profile. Try asking about:\n• AI capabilities\n• Recent projects\n• Experience / companies\n• Tech stack\n• How to contact`;
}

// simulate a small "thinking" delay so it feels like an agent
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Ask the chat agent a question.
 * @param {string} message
 * @param {Array<{role: 'user'|'bot', text: string}>} history
 * @returns {Promise<string>} reply
 */
export async function askAgent(message /*, history */) {
  await delay(300 + Math.random() * 400);

  const specificProject = matchProject(message);
  if (specificProject) {
    const p = specificProject;
    return [
      `**${p.title}** (${p.status})`,
      '',
      `Problem — ${p.problem}`,
      `Solution — ${p.solution}`,
      `Stack — ${p.stack.join(', ')}`,
    ].join('\n');
  }

  const intent = matchIntent(message);
  if (intent) return intent.answer();

  return fallback();
}
