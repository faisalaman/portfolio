import { useState, useEffect } from 'react';

export function useTypingEffect(strings, typeSpeed = 80, deleteSpeed = 40, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [stringIndex, setStringIndex] = useState(0);

  useEffect(() => {
    const current = strings[stringIndex];
    let timeout;
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, stringIndex, strings, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}
