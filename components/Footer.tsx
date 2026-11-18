import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="mt-24 bg-charcoal text-ivory md:mt-36">
      <div className="wrap grid12 gap-y-12 py-20">
        <div className="col-span-4 md:col-span-6"><p className="font-serif text-3xl tracking-[0.18em]">VILLA ESTATES</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">A fictional portfolio concept. Properties, prices and photographs are illustrative and are not verified rental listings.</p></div>
        <nav aria-label="Footer" className="col-span-2 flex flex-col gap-3 text-sm text-ivory/80 md:col-span-3"><Link href="/villas">Villas</Link><Link href="/about">About</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></nav>
        <p className="col-span-2 text-sm leading-relaxed text-ivory/70 md:col-span-3">Booking requests are saved as pending for demonstration. Nothing is charged or confirmed.</p>
      </div>
      <p className="wrap border-t border-ivory/10 py-6 text-xs text-ivory/50">© 2026 VILLA ESTATES concept</p>
    </footer>
  );
}
