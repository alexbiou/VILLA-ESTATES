import Link from 'next/link';
import Photo from '@/components/Photo';
import SearchForm from '@/components/SearchForm';
import VillaCard from '@/components/VillaCard';
import { villas, photos } from '@/lib/villas';
const experiences = [
  { t: 'Private chef', d: 'A seasonal menu cooked in your own kitchen, with the market shop done for you.', img: photos[3] },
  { t: 'Vineyard mornings', d: 'Tastings with small growers, planned around the drive from your villa.', img: photos[7] },
  { t: 'Days on the water', d: 'Half-day boat charters from the coastal houses, skipper included.', img: photos[0] },
];
const facts = [
  ['Prices up front', 'Nightly rate, cleaning and service fee are shown before you send a request.'],
  ['Request, not commitment', 'A request is saved as pending. Nothing is charged at this stage.'],
  ['Honest descriptions', 'Each page lists size, beds, baths and house rules in plain terms.'],
  ['Curated collection', 'Thirteen houses in seven categories and three price tiers, each with a distinct setting.'],
];
export default function Home() {
  const [a, b, c, d] = villas;
  return (
    <>
      <section className="relative min-h-[88svh] bg-charcoal text-ivory">
        <Photo src={villas[1].images[0]} alt="Cliffside villa with a pool above the sea" priority sizes="100vw" className="opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-charcoal/35" />
        <div className="wrap relative flex min-h-[88svh] flex-col justify-end pb-28 pt-40">
          <h1 className="max-w-4xl animate-rise text-6xl leading-[0.95] md:text-8xl">Houses worth arriving at</h1>
          <p className="mt-6 max-w-lg animate-rise text-lg text-ivory/85 [animation-delay:200ms]">Thirteen villas in five countries, from sea and lake to mountain, forest and countryside. A fictional portfolio concept.</p>
        </div>
      </section>
      <div className="wrap relative z-10 -mt-14"><SearchForm /></div>

      <section className="wrap section">
        <div className="grid12 items-end gap-y-4"><h2 className="col-span-4 text-5xl md:col-span-8 md:text-6xl">Featured villas</h2>
          <Link href="/villas" className="col-span-4 text-sm underline underline-offset-8 md:col-span-4 md:justify-self-end">See all thirteen villas</Link></div>
        <div className="grid12 mt-14 gap-y-16">
          <div className="col-span-4 md:col-span-7"><VillaCard villa={a} ratio="aspect-[4/3]" /></div>
          <div className="col-span-4 md:col-span-5 md:mt-28"><VillaCard villa={b} /></div>
          <div className="col-span-4 md:col-span-5"><VillaCard villa={c} /></div>
          <div className="col-span-4 md:col-span-7 md:mt-28"><VillaCard villa={d} ratio="aspect-[4/3]" /></div>
        </div>
      </section>

      <section className="wrap section">
        <div className="grid12 items-center gap-y-10">
          <div className="relative col-span-4 aspect-[4/3] md:col-span-7"><Photo src={photos[6]} alt="Architectural villa facade at dusk" /></div>
          <div className="panel relative z-10 col-span-4 p-8 md:-ml-24 md:col-span-6 md:col-start-7 md:p-12">
            <h2 className="text-4xl md:text-5xl">Architecture first, then everything else</h2>
            <p className="mt-5 leading-relaxed text-charcoal/75">Each house was chosen for how it sits in its landscape: stone against olive terraces, concrete against a cove, lime wash against the sea. Interiors stay spare so the view carries the room.</p>
            <Link href="/about" className="btn-ghost mt-8">Read the concept</Link>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="text-5xl md:text-6xl">Beyond the house</h2>
        <p className="mt-4 max-w-xl text-charcoal/70">Optional experiences, described here as part of the concept.</p>
        <div className="grid12 mt-12 gap-y-14">
          {experiences.map((e, i) => (
            <div key={e.t} className={`col-span-4 md:col-span-4 ${i === 1 ? 'md:mt-14' : ''}`}>
              <div className="relative aspect-[3/4] overflow-hidden bg-sand"><Photo src={e.img} alt={e.t} sizes="(min-width:768px) 33vw, 100vw" /></div>
              <div className="panel relative z-10 -mt-12 mx-4 p-6"><h3 className="text-2xl">{e.t}</h3><p className="mt-2 text-sm leading-relaxed text-charcoal/70">{e.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-sand py-20 md:py-28">
        <div className="wrap grid12 gap-y-12">
          <h2 className="col-span-4 text-5xl md:col-span-4 md:text-6xl">How it works here</h2>
          <dl className="col-span-4 grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-8">
            {facts.map(([t, x]) => <div key={t} className="border-t border-charcoal/20 pt-5"><dt className="font-serif text-2xl">{t}</dt><dd className="mt-2 text-sm leading-relaxed text-charcoal/70">{x}</dd></div>)}
          </dl>
        </div>
      </section>
    </>
  );
}
