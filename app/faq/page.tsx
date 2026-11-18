import type { Metadata } from 'next';
import Accordion from '@/components/Accordion';
export const metadata: Metadata = { title: 'FAQ' };
const items = [
  { q: 'Are these villas real?', a: 'No. Every property, price and description is invented for this portfolio concept.' },
  { q: 'What happens when I send a booking request?', a: 'The request is validated and saved with a pending status. Nothing is charged and no confirmation is sent.' },
  { q: 'How is the total calculated?', a: 'Nightly rate × nights, plus a cleaning fee and an 8% service fee. The figures are illustrative.' },
  { q: 'Where are my favorites stored?', a: 'In your browser only. Clearing site data removes them.' },
  { q: 'Can I use this code?', a: 'Yes, as a starting point. Replace the demo data and images with your own before any real use.' },
];
export default function FAQ() {
  return <div className="wrap max-w-4xl pb-10 pt-36"><h1 className="text-6xl md:text-7xl">Questions</h1><p className="mb-12 mt-4 max-w-xl text-charcoal/70">Short answers about how this portfolio concept works.</p><Accordion items={items} /></div>;
}
