import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
export const metadata: Metadata = { title: 'Contact' };
export default function Contact() {
  return (
    <div className="wrap pb-10 pt-36">
      <h1 className="text-6xl md:text-7xl">Contact</h1>
      <div className="grid12 mt-12 gap-y-10">
        <div className="col-span-4 space-y-6 md:col-span-4">
          <div className="panel p-6"><h2 className="text-2xl">About this demo</h2><p className="mt-2 text-sm leading-relaxed text-charcoal/70">VILLA ESTATES is fictional, so there is no office, phone line or staffed inbox. Messages are stored in the demo database.</p></div>
          <div className="panel p-6"><h2 className="text-2xl">Looking for answers?</h2><p className="mt-2 text-sm leading-relaxed text-charcoal/70">The <Link href="/faq" className="underline underline-offset-4">FAQ</Link> covers pricing, requests and favorites.</p></div>
        </div>
        <div className="panel col-span-4 p-8 md:col-span-7 md:col-start-6 md:p-12"><ContactForm /></div>
      </div>
    </div>
  );
}
