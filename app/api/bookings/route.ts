import { NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/schemas';
import { getVilla } from '@/lib/villas';
import { getAdminClient } from '@/lib/supabase';
import { nightsBetween, quote } from '@/lib/utils';
export async function POST(req: Request) {
  const parsed = bookingSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const d = parsed.data; const villa = getVilla(d.villaSlug);
  if (!villa) return NextResponse.json({ error: 'Unknown villa' }, { status: 404 });
  if (d.guests > villa.guests) return NextResponse.json({ error: `Maximum ${villa.guests} guests` }, { status: 400 });
  const nights = nightsBetween(d.checkIn, d.checkOut); const q = quote(villa.price, villa.cleaning, nights);
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: 'Database is not configured yet.' }, { status: 503 });
  const { error } = await db.from('booking_requests').insert({
    villa_slug: d.villaSlug, check_in: d.checkIn, check_out: d.checkOut, guests: d.guests, guest_name: d.name, guest_email: d.email,
    guest_phone: d.phone || null, message: d.message || null, nights, estimated_total: q.total, status: 'pending' });
  if (error) return NextResponse.json({ error: 'Could not save your request.' }, { status: 500 });
  return NextResponse.json({ status: 'pending' }, { status: 201 });
}
