'use client';
import { useState } from 'react';
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-charcoal/15 border-y border-charcoal/15">
      {items.map((it, i) => (
        <div key={it.q}>
          <h3><button id={`q${i}`} aria-expanded={open === i} aria-controls={`a${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-2xl">
            {it.q}<span aria-hidden className={`text-xl transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span></button></h3>
          <div id={`a${i}`} role="region" aria-labelledby={`q${i}`} className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
            <p className="overflow-hidden leading-relaxed text-charcoal/70">{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
