import Link from 'next/link';
export default function NotFound() { return <div className="wrap py-44"><h1 className="text-5xl">Page not found</h1><p className="mt-4 text-charcoal/70">This address does not lead anywhere.</p><Link href="/villas" className="btn mt-8">Browse villas</Link></div>; }
