import { useEffect, useState } from 'react';

function read() {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#/, '');
}

export function useHashRoute() {
  const [hash, setHash] = useState(read);

  useEffect(() => {
    const onChange = () => setHash(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return hash; // e.g. "/blog", "/blog/slug", "about", ""
}
