'use client';
import { useEffect, useState } from 'react';
const KEY = 'villa-estates:favorites';
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
export default function FavoriteButton({ slug, name }: { slug: string; name: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(read().includes(slug)), [slug]);
  const toggle = () => {
    const cur = read(); const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    setOn(next.includes(slug));
  };
  return (
    <button type="button" onClick={toggle} aria-pressed={on} aria-label={on ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
      className="grid h-10 w-10 place-items-center bg-ivory/90 backdrop-blur transition-colors hover:bg-ivory">
      <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? '#5F6250' : 'none'} stroke="#242721" strokeWidth="1.5"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9z" /></svg>
    </button>
  );
}
