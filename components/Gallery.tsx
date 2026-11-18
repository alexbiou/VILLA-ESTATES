'use client';
import { useState } from 'react';
import Photo from './Photo';
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden bg-sand md:aspect-[16/9]">
        <Photo key={i} src={images[i]} alt={`${name}, photo ${i + 1} of ${images.length}`} priority sizes="100vw" className="animate-rise" />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="bg-ivory/90 px-4 py-2 text-sm" onClick={() => setI((i - 1 + images.length) % images.length)} aria-label="Previous photo">Prev</button>
          <button className="bg-ivory/90 px-4 py-2 text-sm" onClick={() => setI((i + 1) % images.length)} aria-label="Next photo">Next</button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((s, n) => (
          <button key={s} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-current={n === i} className={`relative aspect-[4/3] overflow-hidden transition-opacity ${n === i ? 'opacity-100 ring-1 ring-charcoal' : 'opacity-60 hover:opacity-100'}`}>
            <Photo src={s} alt="" sizes="20vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
