'use client';
import { useRouter } from 'next/navigation';
import { regions } from '@/lib/villas';
import { today } from '@/lib/utils';
export default function SearchForm() {
  const router = useRouter();
  return (
    <form className="panel grid gap-x-8 gap-y-4 p-6 text-charcoal md:grid-cols-[1.3fr_1fr_1fr_.7fr_auto] md:items-end md:p-8"
      onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); const p = new URLSearchParams();
        for (const k of ['region', 'in', 'out', 'guests']) { const v = String(f.get(k) || ''); if (v) p.set(k, v); }
        router.push(`/villas?${p}`); }}>
      <label className="text-xs text-charcoal/60">Destination
        <select name="region" className="field"><option value="">Anywhere</option>{regions.map((r) => <option key={r}>{r}</option>)}</select></label>
      <label className="text-xs text-charcoal/60">Arrive<input type="date" name="in" min={today()} className="field" /></label>
      <label className="text-xs text-charcoal/60">Depart<input type="date" name="out" min={today()} className="field" /></label>
      <label className="text-xs text-charcoal/60">Guests<input type="number" name="guests" min={1} max={12} defaultValue={2} className="field" /></label>
      <button className="btn">Find villas</button>
    </form>
  );
}
