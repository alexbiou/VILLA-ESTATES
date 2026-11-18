import type { Metadata } from 'next';
import CatalogClient from '@/components/CatalogClient';
import { villas } from '@/lib/villas';
export const metadata: Metadata = { title: 'Villas', description: 'Browse thirteen fictional demo villas by category, tier, region and price.' };
export default async function Catalog({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return (
    <div className="wrap pb-10 pt-28">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-2"><h1 className="text-5xl md:text-6xl">The villas</h1><p className="max-w-md text-sm leading-relaxed text-charcoal/70">Thirteen illustrative properties across coast, lake, mountain, forest and countryside, in three price tiers.</p></div>
      <CatalogClient villas={villas} initial={{ region: sp.region, guests: sp.guests, in: sp.in, out: sp.out, category: sp.category }} />
    </div>
  );
}
