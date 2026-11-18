import type { Villa } from '@/lib/villas';
// Honest stand-in used until licensed photography is added to the photo manifest in lib/villas.ts.
export default function Placeholder({ villa }: { villa: Villa }) {
  return (
    <div role="img" aria-label={`${villa.name}: ${villa.style}. Photograph not yet added.`} className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
      style={{ background: `linear-gradient(165deg, ${villa.palette[0]}, ${villa.palette[1]})`, color: villa.palette[2] }}>
      <p className="max-w-[16ch] font-serif text-3xl leading-tight md:text-4xl">{villa.style}</p>
      <p className="mt-2 text-xs opacity-75">Photograph not yet added</p>
    </div>
  );
}
