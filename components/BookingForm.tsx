'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { bookingSchema, type BookingInput } from '@/lib/schemas';
import { eur, nightsBetween, quote, today } from '@/lib/utils';
import type { Villa } from '@/lib/villas';
export default function BookingForm({ villa, defaults }: { villa: Villa; defaults: { in?: string; out?: string; guests?: string } }) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema) as never,
    defaultValues: { villaSlug: villa.slug, checkIn: defaults.in ?? '', checkOut: defaults.out ?? '', guests: Number(defaults.guests) || 2, name: '', email: '', phone: '', message: '' } });
  const [state, setState] = useState<{ ok?: boolean; msg?: string }>({});
  const n = nightsBetween(watch('checkIn'), watch('checkOut')); const q = quote(villa.price, villa.cleaning, n);
  const onSubmit = async (data: BookingInput) => {
    if (data.guests > villa.guests) return setState({ ok: false, msg: `This villa sleeps up to ${villa.guests} guests.` });
    try {
      const r = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const j = await r.json(); setState(r.ok ? { ok: true, msg: 'Request received with pending status. This is a portfolio demo, so no confirmation will follow.' } : { ok: false, msg: j.error ?? 'Something went wrong. Try again.' });
    } catch { setState({ ok: false, msg: 'Network error. Check your connection and try again.' }); }
  };
  if (state.ok) return <div role="status" className="py-16"><h2 className="text-4xl">Request sent</h2><p className="mt-4 max-w-md text-charcoal/70">{state.msg}</p></div>;
  const E = ({ k }: { k: keyof BookingInput }) => errors[k] ? <p className="err" role="alert">{String(errors[k]?.message)}</p> : null;
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <label className="text-xs text-charcoal/60">Arrive<input type="date" min={today()} {...register('checkIn')} className="field" /><E k="checkIn" /></label>
        <label className="text-xs text-charcoal/60">Depart<input type="date" min={today()} {...register('checkOut')} className="field" /><E k="checkOut" /></label>
        <label className="text-xs text-charcoal/60">Guests<input type="number" min={1} max={villa.guests} {...register('guests')} className="field" /><E k="guests" /></label>
        <label className="text-xs text-charcoal/60">Full name<input autoComplete="name" {...register('name')} className="field" /><E k="name" /></label>
        <label className="text-xs text-charcoal/60">Email<input type="email" autoComplete="email" {...register('email')} className="field" /><E k="email" /></label>
        <label className="text-xs text-charcoal/60">Phone (optional)<input type="tel" autoComplete="tel" {...register('phone')} className="field" /></label>
        <label className="text-xs text-charcoal/60 sm:col-span-2">Notes<textarea rows={4} {...register('message')} className="field resize-none" /></label>
        {state.ok === false && <p className="err sm:col-span-2" role="alert">{state.msg}</p>}
        <button className="btn sm:col-span-2 sm:justify-self-start" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send booking request'}</button>
      </div>
      <div className="h-fit border border-charcoal/20 p-7">
        <p className="font-serif text-2xl">{villa.name}</p><p className="text-sm text-charcoal/60">{villa.location}</p>
        {n > 0 ? (<dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between"><dt>{n} nights</dt><dd>{eur(q.stay)}</dd></div>
          <div className="flex justify-between"><dt>Cleaning</dt><dd>{eur(q.cleaning)}</dd></div>
          <div className="flex justify-between"><dt>Service (8%)</dt><dd>{eur(q.service)}</dd></div>
          <div className="flex justify-between border-t border-charcoal/15 pt-3 text-base font-medium"><dt>Estimated total</dt><dd>{eur(q.total)}</dd></div></dl>)
          : <p className="mt-6 text-sm text-charcoal/60">Choose dates to see the estimate.</p>}
      </div>
    </form>
  );
}
