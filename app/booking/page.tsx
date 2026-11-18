import type { Metadata } from 'next';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';
import { getVilla } from '@/lib/villas';
export const metadata: Metadata = { title: 'Request a booking', robots: { index: false } };
export default async function Booking({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams; const v = sp.villa ? getVilla(sp.villa) : undefined;
  if (!v) return <div className="wrap py-44"><h1 className="text-5xl">Choose a villa first</h1><p className="mt-4 text-charcoal/70">Open a villa and pick your dates to start a request.</p><Link href="/villas" className="btn mt-8">Browse villas</Link></div>;
  return <div className="wrap pb-10 pt-36"><h1 className="mb-12 text-6xl">Request to book</h1><BookingForm villa={v} defaults={{ in: sp.in, out: sp.out, guests: sp.guests }} /></div>;
}
