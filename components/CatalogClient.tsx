'use client';
import { useMemo, useState } from 'react';
import VillaCard from './VillaCard';
import { categories, collections, regions, tierOf, tiers, type Category, type Tier, type Villa } from '@/lib/villas';
const features: [string, RegExp][] = [['Pool', /pool/i], ['Fireplace or stove', /fireplace|stove/i], ['Sauna or hot tub', /sauna|hot tub/i], ['Water access', /sea access|jetty|dock|boathouse/i]];
const COL: Record<number, string> = { 4: 'md:col-span-4', 5: 'md:col-span-5', 6: 'md:col-span-6', 7: 'md:col-span-7' };
const pattern = [7, 5, 4, 4, 4];
const spans = (n: number) => (n === 1 ? [6] : n === 2 ? [7, 5] : n === 3 ? [4, 4, 4] : n === 4 ? [7, 5, 6, 6] : Array.from({ length: n }, (_, i) => pattern[i % 5]));
type Init = { region?: string; guests?: string; in?: string; out?: string; category?: string };
const chip = (on: boolean) => `border px-4 py-2 text-sm transition-colors ${on ? 'border-charcoal bg-charcoal text-ivory' : 'border-charcoal/25 hover:border-charcoal'}`;
export default function CatalogClient({ villas, initial }: { villas: Villa[]; initial: Init }) {
  const [q, setQ] = useState(''); const [region, setRegion] = useState(initial.region ?? '');
  const [guests, setGuests] = useState(Number(initial.guests) || 1); const [maxPrice, setMax] = useState(2000);
  const [cat, setCat] = useState<Category | ''>(categories.includes(initial.category as Category) ? (initial.category as Category) : '');
  const [tier, setTier] = useState<Tier | ''>(''); const [feats, setFeats] = useState<string[]>([]); const [sort, setSort] = useState('featured');
  const active = !!(q || region || guests > 1 || maxPrice < 2000 || cat || tier || feats.length);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const r = villas.filter((v) => (!s || `${v.name} ${v.location} ${v.region} ${v.category} ${v.style}`.toLowerCase().includes(s)) && (!region || v.region === region)
      && v.guests >= guests && v.price <= maxPrice && (!cat || v.category === cat) && (!tier || tierOf(v.price) === tier)
      && feats.every((f) => v.amenities.some((a) => features.find(([n]) => n === f)![1].test(a))));
    if (sort === 'low') r.sort((a, b) => a.price - b.price); if (sort === 'high') r.sort((a, b) => b.price - a.price);
    if (sort === 'guests') r.sort((a, b) => b.guests - a.guests); if (sort === 'size') r.sort((a, b) => b.size - a.size);
    return r;
  }, [villas, q, region, guests, maxPrice, cat, tier, feats, sort]);
  const reset = () => { setQ(''); setRegion(''); setGuests(1); setMax(2000); setCat(''); setTier(''); setFeats([]); setSort('featured'); };
  const qs = initial.in && initial.out ? `?in=${initial.in}&out=${initial.out}&guests=${guests}` : '';
  const grouped = !active && sort === 'featured';
  return (
    <>
      <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
        {[['', 'All'] as const, ...categories.map((c) => [c, c] as const)].map(([v, l]) => (
          <button key={l} aria-pressed={cat === v} onClick={() => setCat(v as Category | '')} className={chip(cat === v)}>{l} <span className="opacity-60">{v ? villas.filter((x) => x.category === v).length : villas.length}</span></button>
        ))}
      </div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="panel mt-6 grid gap-x-8 gap-y-5 p-6 sm:grid-cols-2 lg:grid-cols-6 lg:p-8">
        <label className="text-xs text-charcoal/60 lg:col-span-2">Search<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, place or style" className="field" /></label>
        <label className="text-xs text-charcoal/60">Region<select value={region} onChange={(e) => setRegion(e.target.value)} className="field"><option value="">All regions</option>{regions.map((r) => <option key={r}>{r}</option>)}</select></label>
        <label className="text-xs text-charcoal/60">Guests<input type="number" min={1} max={12} value={guests} onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))} className="field" /></label>
        <label className="text-xs text-charcoal/60">Up to €{maxPrice} / night<input type="range" min={400} max={2000} step={50} value={maxPrice} onChange={(e) => setMax(Number(e.target.value))} className="mt-3 w-full accent-olive-deep" /></label>
        <label className="text-xs text-charcoal/60">Sort<select value={sort} onChange={(e) => setSort(e.target.value)} className="field"><option value="featured">Curated</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option><option value="guests">Most guests</option><option value="size">Largest first</option></select></label>
        <div className="sm:col-span-2 lg:col-span-6" role="group" aria-label="Price tier"><p className="mb-2 text-xs text-charcoal/60">Quality tier</p>
          <div className="flex flex-wrap gap-2"><button type="button" aria-pressed={!tier} onClick={() => setTier('')} className={chip(!tier)}>Any</button>
            {tiers.map((t) => <button type="button" key={t.name} aria-pressed={tier === t.name} onClick={() => setTier(t.name)} className={chip(tier === t.name)}>{t.name} <span className="opacity-60">{t.hint}</span></button>)}</div></div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:col-span-2 lg:col-span-6" role="group" aria-label="Features">
          {features.map(([n]) => <label key={n} className="flex items-center gap-2"><input type="checkbox" checked={feats.includes(n)} onChange={() => setFeats(feats.includes(n) ? feats.filter((f) => f !== n) : [...feats, n])} className="accent-olive-deep" />{n}</label>)}
        </div>
      </form>
      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-charcoal/60"><p aria-live="polite">{list.length} of {villas.length} villas</p>{active && <button onClick={reset} className="underline underline-offset-4">Clear filters</button>}</div>
      {list.length === 0 ? (
        <div className="py-24 text-center"><p className="font-serif text-3xl">No villa matches these filters</p><p className="mt-3 text-charcoal/65">Raise the price limit, lower the guest count or remove a feature.</p><button onClick={reset} className="btn-ghost mt-8">Clear filters</button></div>
      ) : grouped ? (
        collections.map((c) => { const items = list.filter((v) => c.cats.includes(v.category)); const sp = spans(items.length); return items.length ? (
          <section key={c.title} className="mt-16" aria-labelledby={`c-${c.title}`}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-2 border-b border-charcoal/15 pb-4"><h2 id={`c-${c.title}`} className="text-4xl">{c.title}</h2><p className="text-sm text-charcoal/65">{c.note}</p></div>
            <div className="grid12 items-start gap-y-16">{items.map((v, i) => <div key={v.slug} className={`col-span-4 ${COL[sp[i]]}`}><VillaCard villa={v} qs={qs} ratio={sp[i] >= 6 ? 'aspect-[4/3]' : 'aspect-[4/5]'} /></div>)}</div>
          </section>) : null; })
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{list.map((v) => <VillaCard key={v.slug} villa={v} qs={qs} ratio="aspect-[4/3]" />)}</div>
      )}
    </>
  );
}
