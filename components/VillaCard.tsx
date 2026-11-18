import Link from 'next/link';
import Photo from './Photo';
import Placeholder from './Placeholder';
import FavoriteButton from './FavoriteButton';
import { eur } from '@/lib/utils';
import { tierOf, type Villa } from '@/lib/villas';
export default function VillaCard({ villa, ratio = 'aspect-[4/5]', qs = '' }: { villa: Villa; ratio?: string; qs?: string }) {
  const href = `/villas/${villa.slug}${qs}`; const tier = tierOf(villa.price);
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative overflow-hidden bg-sand ${ratio}`}>
        <Link href={href} aria-label={`View ${villa.name}`} className="absolute inset-0">
          {villa.images[0]
            ? <Photo src={villa.images[0]} alt={`${villa.name}, ${villa.style} in ${villa.location}`} sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]" />
            : <div className="absolute inset-0 transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"><Placeholder villa={villa} /></div>}
        </Link>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2 text-xs">
          <span className="bg-ivory/90 px-3 py-1.5 backdrop-blur">{villa.location}</span>
          <span className={`px-3 py-1.5 ${tier === 'Signature' ? 'bg-charcoal text-ivory' : 'bg-olive-deep/90 text-ivory'}`}>{tier}</span>
        </div>
        <div className="absolute right-4 top-4"><FavoriteButton slug={villa.slug} name={villa.name} /></div>
      </div>
      <div className="panel relative z-10 -mt-16 mx-4 flex flex-1 flex-col p-6 transition-transform duration-500 group-hover:-translate-y-1.5 md:mx-6">
        <p className="label">{villa.category} · {villa.style}</p>
        <h3 className="mt-1 text-[1.75rem] leading-tight"><Link href={href}>{villa.name}</Link></h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal/70">{villa.blurb}</p>
        <ul className="mt-4 flex gap-5 border-y border-charcoal/10 py-3 text-xs text-charcoal/70">
          <li>{villa.guests} guests</li><li>{villa.bedrooms} bedrooms</li><li>{villa.bathrooms} baths</li>
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p><span className="font-serif text-2xl">{eur(villa.price)}</span> <span className="text-xs text-charcoal/60">/ night</span></p>
          <Link href={href} className="border-b border-charcoal pb-0.5 text-sm transition-colors hover:border-olive hover:text-olive-deep">View villa</Link>
        </div>
      </div>
    </article>
  );
}
