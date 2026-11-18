// Usage: put 4+ landscape photos (jpg/png/webp, ~2000px wide) in public/villas/<slug>/ then run: npm run photos
// Files are sorted by name (1.jpg, 2.jpg, ...). The first file is the card cover. Also flags byte-identical duplicates.
import { readdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root = new URL('../public/villas/', import.meta.url);
const hints = {
  'chalet-alba': 'timber alpine chalet, meadow, Dolomites, wood-panelled interior, sauna', 'refuge-aiguille': 'stone and glass alpine lodge, Mont Blanc view, fireplace, deck',
  'waldhaus-tanne': 'dark timber forest house, fir trees, wood stove', 'villa-lago-verde': 'lakefront villa, jetty, boathouse, terraced garden, Lake Como',
  'lakeside-pavilion': 'glass and oak lake house, dock, lakeside sauna', 'casa-cubo': 'whitewashed minimalist house, courtyard pine, pool on sand deck',
  'masseria-tufo': 'whitewashed Puglia masseria, vaulted stone rooms, olive trees', 'palazzo-sereno': 'baroque Sicilian townhouse, frescoed ceiling, rooftop terrace',
};
const manifest = {}; const seen = new Map(); let missing = 0;
for (const slug of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const files = readdirSync(new URL(`${slug}/`, root)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  for (const f of files) { const h = createHash('md5').update(readFileSync(new URL(`${slug}/${f}`, root))).digest('hex'); if (seen.has(h)) console.log(`DUPLICATE: ${slug}/${f} = ${seen.get(h)}`); else seen.set(h, `${slug}/${f}`); }
  if (files.length) manifest[slug] = files.map((f) => `/villas/${slug}/${f}`);
  if (files.length < 4) { missing++; console.log(`${slug}: ${files.length}/4 photos${hints[slug] ? ` (look for: ${hints[slug]})` : ''}`); }
}
writeFileSync(new URL('../lib/photo-manifest.json', import.meta.url), JSON.stringify(manifest, null, 2));
console.log(missing ? `${missing} villa folders still need photos` : 'All villas have 4+ photos');
