import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/profile';
import { askAgent, SUGGESTED_PROMPTS } from '../../lib/chatProvider';

export function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi! I'm a small agent trained on ${profile.name.split(' ')[0]}'s profile. Ask me anything — or pick a suggestion below.` },
  ]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const ask = async (text) => {
    if (!text || pending) return;
    const history = messages;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setPending(true);
    try {
      const reply = await askAgent(text, history);
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'bot', text: `Something went wrong: ${err.message ?? 'unknown error'}` }]);
    } finally {
      setPending(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    ask(input.trim());
  };

  const hasOnlyGreeting = messages.length === 1;

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
            className="fixed bottom-24 left-6 z-40 flex h-[70vh] max-h-[560px] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl glass shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-sm font-semibold">Ask about {profile.name.split(' ')[0]}</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-text-muted hover:text-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 ${
                      m.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-surface border border-border text-text'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {pending && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-surface px-3 py-2 text-text-muted">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                  </div>
                </div>
              )}
            </div>

            {hasOnlyGreeting && (
              <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pb-1 pt-3">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => ask(p)}
                    className="rounded-full border border-border bg-bg-alt px-3 py-1 text-xs text-text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={submit} className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={pending ? 'Thinking…' : 'Ask a question…'}
                disabled={pending}
                className="flex-1 rounded-xl border border-border bg-bg-alt px-3 py-2 text-sm outline-none focus:border-primary disabled:opacity-60"
              />
              <button type="submit" disabled={pending} className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">
                {pending ? '…' : 'Send'}
              </button>
            </form>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatAssistant;
