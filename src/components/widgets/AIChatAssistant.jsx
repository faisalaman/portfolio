import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useState } from 'react';
import { profile, services, techExpertise } from '../../data/profile';

const responses = [
  { keys: ['who', 'name', 'about you'], answer: () => `I'm ${profile.name} — ${profile.title}. ${profile.summary}` },
  { keys: ['contact', 'email', 'reach', 'phone'], answer: () => `Email: ${profile.email} · Phone: ${profile.phone}` },
  { keys: ['location', 'where', 'based'], answer: () => `Based in ${profile.location}.` },
  { keys: ['service', 'do', 'offer', 'help'], answer: () => `I offer: ${services.map((s) => s.title).join(', ')}.` },
  { keys: ['tech', 'stack', 'skills', 'language', 'framework'], answer: () => `Core stack: ${Object.values(techExpertise).slice(0, 3).join(' · ')}.` },
  { keys: ['linkedin'], answer: () => `LinkedIn: ${profile.linkedin}` },
];

function reply(input) {
  const q = input.toLowerCase();
  for (const r of responses) {
    if (r.keys.some((k) => q.includes(k))) return r.answer();
  }
  return "I can answer questions about my background, services, tech stack, location, or how to get in touch. Try asking about one of those!";
}

export function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi! I'm a small assistant. Ask me about ${profile.name.split(' ')[0]}'s work, stack, or how to get in touch.` },
  ]);
  const [input, setInput] = useState('');

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }, { role: 'bot', text: reply(text) }]);
    setInput('');
  };

  return (
    <>
      <Motion.button
        aria-label="Open chat"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-lg"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </Motion.button>

      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-40 flex h-[70vh] max-h-[520px] w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl glass shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold">Ask about {profile.name.split(' ')[0]}</span>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-text-muted hover:text-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </header>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.role === 'user' ? 'bg-primary text-white' : 'bg-surface border border-border text-text'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-xl border border-border bg-bg-alt px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button type="submit" className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white">Send</button>
            </form>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatAssistant;
