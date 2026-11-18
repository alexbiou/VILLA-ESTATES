'use client';
import Image from 'next/image';
import { useState } from 'react';
export default function Photo({ src, alt, priority, sizes = '(min-width:1024px) 50vw, 100vw', className = '' }: { src: string; alt: string; priority?: boolean; sizes?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className={`bg-sand ${className}`} />;
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
