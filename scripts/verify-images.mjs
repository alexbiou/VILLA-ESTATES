// Usage: node scripts/verify-images.mjs  (needs network). Checks every image URL loads and flags duplicates.
import { readFileSync } from 'node:fs';
const src = readFileSync(new URL('../lib/villas.ts', import.meta.url), 'utf8');
const ids = [...src.matchAll(/'(\d{10,}-[0-9a-f]{12})'/g)].map((m) => m[1]);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log(`${new Set(ids).size} unique photo IDs${dupes.length ? `, duplicates: ${dupes.join(', ')}` : ''}`);
let bad = 0;
for (const id of new Set(ids)) {
  const r = await fetch(`https://images.unsplash.com/photo-${id}?w=200`, { method: 'HEAD' }).catch(() => null);
  if (!r || !r.ok) { bad++; console.log('BROKEN', id, r?.status ?? 'network'); }
}
console.log(bad ? `${bad} broken` : 'All images load');
process.exit(bad ? 1 : 0);
