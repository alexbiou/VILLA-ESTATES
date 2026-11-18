'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { eur, nightsBetween, quote, today } from '@/lib/utils';
import type { Villa } from '@/lib/villas';
export default function BookingWidget({ villa, defaults }: { villa: Villa; defaults?: { in?: string; out?: string; guests?: string } }) {
  const router = useRouter();
  const [inD, setIn] = useState(defaults?.in ?? ''); const [outD, setOut] = useState(defaults?.out ?? ''); const [guests, setGuests] = useState(Math.min(Number(defaults?.guests) || 2, villa.guests));
  const n = nightsBetween(inD, outD); const q = quote(villa.price, villa.cleaning, n);
  const ok = n > 0 && guests <= villa.guests;
  return (
    <aside className="panel p-7 lg:sticky lg:top-8" aria-label="Booking">
      <p className="font-serif text-3xl">{eur(villa.price)} <span className="font-sans text-sm text-charcoal/60">/ night</span></p>
      <div className="mt-5 grid grid-cols-2 gap-x-5">
        <label className="text-xs text-charcoal/60">Arrive<input type="date" min={today()} value={inD} onChange={(e) => { setIn(e.target.value); if (outD && e.target.value >= outD) setOut(''); }} className="field" /></label>
        <label className="text-xs text-charcoal/60">Depart<input type="date" min={inD || today()} value={outD} onChange={(e) => setOut(e.target.value)} className="field" /></label>
      </div>
      <label className="mt-4 block text-xs text-charcoal/60">Guests (max {villa.guests})<input type="number" min={1} max={villa.guests} value={guests} onChange={(e) => setGuests(Number(e.target.value) || 1)} className="field" /></label>
      {n > 0 && (
        <dl className="mt-6 space-y-2 border-t border-charcoal/15 pt-5 text-sm">
          <div className="flex justify-between"><dt>{eur(villa.price)} × {n} nights</dt><dd>{eur(q.stay)}</dd></div>
          <div className="flex justify-between"><dt>Cleaning</dt><dd>{eur(q.cleaning)}</dd></div>
          <div className="flex justify-between"><dt>Service (8%)</dt><dd>{eur(q.service)}</dd></div>
          <div className="flex justify-between border-t border-charcoal/15 pt-3 text-base font-medium"><dt>Estimated total</dt><dd>{eur(q.total)}</dd></div>
        </dl>
      )}
      {guests > villa.guests && <p className="err">This villa sleeps up to {villa.guests}.</p>}
      <button disabled={!ok} onClick={() => router.push(`/booking?villa=${villa.slug}&in=${inD}&out=${outD}&guests=${guests}`)} className="btn mt-6 w-full">{ok ? 'Request to book' : 'Select your dates'}</button>
      <p className="mt-4 text-xs leading-relaxed text-charcoal/55">Fictional concept. This sends a pending request only. Nothing is charged or confirmed.</p>
    </aside>
  );
}
