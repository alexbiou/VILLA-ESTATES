import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';
import { getAdminClient } from '@/lib/supabase';
export async function POST(req: Request) {
  const p = contactSchema.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: p.error.issues[0].message }, { status: 400 });
  const db = getAdminClient(); if (!db) return NextResponse.json({ error: 'Database is not configured yet.' }, { status: 503 });
  const { error } = await db.from('contact_messages').insert(p.data);
  return error ? NextResponse.json({ error: 'Could not save your message.' }, { status: 500 }) : NextResponse.json({ ok: true }, { status: 201 });
}
