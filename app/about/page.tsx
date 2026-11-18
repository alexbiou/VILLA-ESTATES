import type { Metadata } from 'next';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { photos } from '@/lib/villas';
export const metadata: Metadata = { title: 'About', description: 'The idea behind VILLA ESTATES, a fictional portfolio concept.' };
const principles = [['Few houses', 'A short list, each with its own setting and character.'], ['Plain facts', 'Size, beds, baths, rules and fees are always stated.'], ['Quiet design', 'Photography leads. Interface chrome stays out of the way.']];
export default function About() {
  return (
    <div className="wrap pb-10 pt-28">
      <div className="grid12 gap-y-8">
        <div className="col-span-4 md:col-span-8"><h1 className="text-5xl md:text-7xl">A small collection, described honestly</h1><p className="mt-4 max-w-xl text-lg text-charcoal/70">A fictional portfolio concept for a premium villa rental brand: few houses, shown plainly.</p></div>
        <div className="relative col-span-4 aspect-[4/3] md:col-span-7"><Photo src={photos[4]} alt="Villa courtyard with stone walls" priority /></div>
        <div className="panel relative z-10 col-span-4 space-y-5 p-8 leading-relaxed text-charcoal/75 md:-ml-20 md:mt-12 md:col-span-6 md:col-start-7 md:p-10">
          <p>VILLA ESTATES is a design and engineering exercise: a concept for a villa rental brand that shows a few houses, shows them well, and says plainly what each one is.</p>
          <p>Nothing here is real. The villas, locations, prices, descriptions and photographs are illustrative portfolio content, not verified rental listings. There are no reviews and no confirmed stays.</p>
          <p>The booking flow is working code: it validates a request, estimates a price and stores the request as pending.</p>
        </div>
      </div>
      <ul className="grid12 mt-16 gap-y-8">
        {principles.map(([t, d]) => <li key={t} className="col-span-4 border-t border-charcoal/20 pt-5"><h2 className="text-3xl">{t}</h2><p className="mt-2 text-charcoal/70">{d}</p></li>)}
      </ul>
      <div className="mt-20 flex flex-wrap items-center justify-between gap-6 bg-sand p-8 md:p-12"><p className="font-serif text-3xl">See the collection</p><Link href="/villas" className="btn">Browse villas</Link></div>
    </div>
  );
}
