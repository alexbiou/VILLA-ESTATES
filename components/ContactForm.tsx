'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { contactSchema, type ContactInput } from '@/lib/schemas';
export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });
  const [s, setS] = useState<{ ok: boolean; msg: string } | null>(null);
  const onSubmit = async (d: ContactInput) => {
    try { const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
      const j = await r.json(); if (r.ok) reset(); setS({ ok: r.ok, msg: r.ok ? 'Message sent. This is a demo form, so no reply will follow.' : j.error ?? 'Could not send your message.' });
    } catch { setS({ ok: false, msg: 'Network error. Try again.' }); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <label className="text-xs text-charcoal/60">Name<input {...register('name')} autoComplete="name" className="field" />{errors.name && <p className="err" role="alert">{errors.name.message}</p>}</label>
      <label className="text-xs text-charcoal/60">Email<input type="email" {...register('email')} autoComplete="email" className="field" />{errors.email && <p className="err" role="alert">{errors.email.message}</p>}</label>
      <label className="text-xs text-charcoal/60">Message<textarea rows={5} {...register('message')} className="field resize-none" />{errors.message && <p className="err" role="alert">{errors.message.message}</p>}</label>
      <button className="btn justify-self-start" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send message'}</button>
      {s && <p role="status" className={s.ok ? 'text-sm text-olive-deep' : 'err'}>{s.msg}</p>}
    </form>
  );
}
