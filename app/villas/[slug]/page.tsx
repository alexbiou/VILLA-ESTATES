import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import BookingWidget from '@/components/BookingWidget';
import FavoriteButton from '@/components/FavoriteButton';
import VillaCard from '@/components/VillaCard';
import Placeholder from '@/components/Placeholder';
import { getVilla, tierOf, villas } from '@/lib/villas';
export const generateStaticParams = () => villas.map((v) => ({ slug: v.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const v = getVilla((await params).slug); if (!v) return {};
  return { title: v.name, description: v.tagline, openGraph: v.images[0] ? { images: [v.images[0]] } : undefined };
}
export default async function VillaPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const v = getVilla((await params).slug); if (!v) notFound();
  const sp = await searchParams; const others = villas.filter((x) => x.slug !== v.slug).slice(0, 3);
  return (
    <div className="wrap pb-10 pt-28">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div><h1 className="text-5xl md:text-7xl">{v.name}</h1><p className="mt-2 text-charcoal/65">{v.location}</p><p className="mt-1 text-sm text-olive-deep">{v.category}, {tierOf(v.price)} tier, {v.style}</p></div>
        <FavoriteButton slug={v.slug} name={v.name} />
      </div>
      {v.images.length ? <Gallery images={v.images} name={v.name} /> : <div className="relative aspect-[16/10] overflow-hidden bg-sand md:aspect-[16/9]"><Placeholder villa={v} /></div>}
      <dl className="panel relative z-10 -mt-8 mx-3 grid grid-cols-2 gap-6 p-6 sm:grid-cols-4 md:mx-12 md:p-8">
        {[['Guests', v.guests], ['Bedrooms', v.bedrooms], ['Bathrooms', v.bathrooms], ['Size', `${v.size} m²`]].map(([k, val]) => <div key={k}><dt className="text-xs text-charcoal/60">{k}</dt><dd className="font-serif text-3xl">{val}</dd></div>)}
      </dl>
      <div className="mt-16 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-14">
          <section><h2 className="text-3xl">{v.tagline}</h2><p className="mt-5 max-w-2xl leading-relaxed text-charcoal/75">{v.description}</p>
            </section>
          <section><h2 className="text-3xl">Amenities</h2><ul className="mt-5 grid gap-3 text-charcoal/75 sm:grid-cols-2">{v.amenities.map((a) => <li key={a}>{a}</li>)}</ul></section>
          <section><h2 className="text-3xl">Location</h2><p className="mt-4 max-w-2xl text-charcoal/75">{v.location}. The exact address would be shared after a confirmed stay. This is a fictional property, so there is no map pin.</p></section>
          <section><h2 className="text-3xl">House rules</h2><ul className="mt-5 space-y-2 text-charcoal/75">{v.rules.map((r) => <li key={r}>{r}</li>)}</ul></section>
        </div>
        <BookingWidget villa={v} defaults={{ in: sp.in, out: sp.out, guests: sp.guests }} />
      </div>
      <section className="mt-28"><h2 className="text-4xl md:text-5xl">Other villas</h2>
        <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">{others.map((o) => <VillaCard key={o.slug} villa={o} ratio="aspect-[4/3]" />)}</div></section>
    </div>
  );
}
