import { useEffect, useState } from 'react';

export function TypingTitle({ words, typeSpeed = 80, deleteSpeed = 40, pause = 1400, className = '' }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 0);
      return () => clearTimeout(t);
    }
    const next = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1);
    const t = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] -mb-[2px] bg-primary animate-pulse align-middle" />
    </span>
  );
}

export default TypingTitle;
