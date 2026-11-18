'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <div className="wrap py-44"><h1 className="text-5xl">Something went wrong</h1><p className="mt-4 text-charcoal/70">The page could not load. Try again.</p><button onClick={reset} className="btn mt-8">Reload page</button></div>;
}
