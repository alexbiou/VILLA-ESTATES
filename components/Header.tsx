'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
const links = [['Villas', '/villas'], ['About', '/about'], ['FAQ', '/faq'], ['Contact', '/contact']];
export default function Header() {
  const [open, setOpen] = useState(false);
  const home = usePathname() === '/';
  return (
    <header className={`absolute inset-x-0 top-0 z-30 ${home || open ? 'text-ivory' : 'text-charcoal'}`}>
      <div className="wrap flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-[0.18em]" onClick={() => setOpen(false)}>VILLA ESTATES</Link>
        <nav aria-label="Main" className="hidden gap-10 text-sm md:flex">
          {links.map(([l, h]) => <Link key={h} href={h} className="opacity-90 hover:opacity-100 hover:underline hover:underline-offset-8">{l}</Link>)}
        </nav>
        <button className="md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="wrap flex flex-col gap-5 bg-charcoal py-8 font-serif text-3xl md:hidden">
          {links.map(([l, h]) => <Link key={h} href={h} onClick={() => setOpen(false)}>{l}</Link>)}
        </nav>
      )}
    </header>
  );
}
