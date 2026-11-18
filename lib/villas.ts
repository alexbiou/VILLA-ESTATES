import manifest from './photo-manifest.json';
export type Category = 'Coastal' | 'Lakefront' | 'Mountain' | 'Forest' | 'Countryside' | 'Historic' | 'Minimalist';
export type Tier = 'Select' | 'Premium' | 'Signature';
export type Villa = {
  slug: string; blurb: string; name: string; location: string; region: string; category: Category; style: string; type: string;
  tagline: string; description: string; price: number; cleaning: number; guests: number; bedrooms: number; bathrooms: number; size: number;
  images: string[]; palette: [string, string, string]; amenities: string[]; rules: string[]; tags: string[];
};
// Pricing tiers are derived from the nightly rate so labels can never disagree with prices.
export const tiers: { name: Tier; hint: string }[] = [{ name: 'Select', hint: 'under €700' }, { name: 'Premium', hint: '€700 to €1,299' }, { name: 'Signature', hint: '€1,300 and up' }];
export const tierOf = (price: number): Tier => (price >= 1300 ? 'Signature' : price >= 700 ? 'Premium' : 'Select');
export const categories: Category[] = ['Coastal', 'Lakefront', 'Mountain', 'Forest', 'Countryside', 'Historic', 'Minimalist'];
export const collections: { title: string; note: string; cats: Category[] }[] = [
  { title: 'Sea and lake', note: 'Houses with their own stretch of water.', cats: ['Coastal', 'Lakefront'] },
  { title: 'Mountain and forest', note: 'Timber, stone and cold clear air.', cats: ['Mountain', 'Forest'] },
  { title: 'Countryside and history', note: 'Old walls, long lunches and slow mornings.', cats: ['Countryside', 'Historic'] },
  { title: 'Minimalist', note: 'Few materials, large rooms, quiet light.', cats: ['Minimalist'] },
];
const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
// PHOTO MANIFEST: the only place image IDs live. Add real, licensed photos per villa here.
// Villas with an empty list show a tonal placeholder instead of an unrelated stock photo.
const P = ['1613490493576-7fde63acd811','1512917774080-9991f1c4c750','1600596542815-ffad4c1539a9','1600585154340-be6161a56a0c','1600607687939-ce8a6c25118c','1564013799919-ab600027ffc6','1600566753190-17f0baa2a6c3','1602343168117-bb8ffe3e2e9f'].map(img);
export const photos = P;
const pick = (...i: number[]) => i.map((n) => P[n]);
const base = ['Check-in from 16:00, check-out by 11:00', 'No parties or events', 'Quiet hours 22:00 to 08:00'];
const rules = [...base, 'Pets by prior arrangement only'];

const raw: Villa[] = [
  { slug: 'casa-oliveto', blurb: 'Olive terraces, a wood-fired kitchen and a pool that follows the hill.', name: 'Casa Oliveto', location: 'Val d’Orcia, Tuscany', region: 'Tuscany', category: 'Countryside', style: 'Restored stone farmhouse', type: 'Stone farmhouse', tagline: 'Terraced olive groves and a long pool at the edge of the hill.',
    description: 'A restored stone farmhouse set between olive terraces. Rooms open onto shaded loggias, the kitchen is built around a wood-fired oven, and the pool follows the slope of the valley. An illustrative concept property.',
    price: 920, cleaning: 180, guests: 8, bedrooms: 4, bathrooms: 4, size: 340, images: pick(0,2,3,4), palette: ['#8a8d6f', '#5f6250', '#F5F3EE'], amenities: ['Private pool','Wood-fired oven','Garden terrace','Air conditioning','Wi-Fi','Parking'], rules, tags: ['pool'] },
  { slug: 'villa-marea', blurb: 'Three whitewashed terraces above a private swimming platform.', name: 'Villa Marea', location: 'Amalfi Coast, Campania', region: 'Amalfi Coast', category: 'Coastal', style: 'Whitewashed cliff terraces', type: 'Cliffside villa', tagline: 'Whitewashed terraces stepping down to the water.',
    description: 'Three terraces descend from a quiet lane to a private swimming platform. Interiors are lime-washed and sparsely furnished so the sea does the decorating. An illustrative concept property.',
    price: 1480, cleaning: 220, guests: 6, bedrooms: 3, bathrooms: 3, size: 260, images: pick(1,0,5,6), palette: ['#9fb0b4', '#5d7478', '#F5F3EE'], amenities: ['Infinity pool','Sea access','Outdoor dining','Air conditioning','Wi-Fi','Sea view'], rules, tags: ['pool'] },
  { slug: 'maison-lavande', blurb: 'A shuttered stone manor around a plane-tree courtyard.', name: 'Maison Lavande', location: 'Luberon, Provence', region: 'Provence', category: 'Historic', style: 'Provençal stone manor', type: 'Country manor', tagline: 'Shuttered stone, lavender rows and a plane-tree courtyard.',
    description: 'A low manor house around a gravel courtyard, with a mineral pool hidden behind a cypress hedge. Slow mornings, long lunches, bicycles in the barn. An illustrative concept property.',
    price: 780, cleaning: 150, guests: 10, bedrooms: 5, bathrooms: 4, size: 380, images: pick(2,4,7,3), palette: ['#a79bb4', '#6f6482', '#F5F3EE'], amenities: ['Mineral pool','Courtyard','Bicycles','Fireplace','Wi-Fi','Parking'], rules, tags: ['pool'] },
  { slug: 'casa-tramontana', blurb: 'Concrete, oak and almond trees above a quiet cove.', name: 'Casa Tramontana', location: 'Mallorca, Balearic Islands', region: 'Mallorca', category: 'Minimalist', style: 'Board-formed concrete finca', type: 'Modern finca', tagline: 'Concrete, timber and almond trees above a quiet cove.',
    description: 'A single-storey finca of board-formed concrete and oak, arranged around an almond grove. Sliding walls dissolve the line between living room and terrace. An illustrative concept property.',
    price: 1120, cleaning: 200, guests: 8, bedrooms: 4, bathrooms: 4, size: 300, images: pick(5,1,6,0), palette: ['#a39e94', '#6b675e', '#F5F3EE'], amenities: ['Private pool','Outdoor shower','Sea view','Air conditioning','Wi-Fi','Parking'], rules, tags: ['pool'] },
  { slug: 'villa-cipresso', blurb: 'A cypress-lined drive, a vaulted library and a heated pool.', name: 'Villa Cipresso', location: 'Chianti, Tuscany', region: 'Tuscany', category: 'Countryside', style: 'Hilltop villa with library', type: 'Hilltop villa', tagline: 'A cypress-lined drive and a library worth staying in for.',
    description: 'A hilltop villa reached by a long cypress drive, with a vaulted library, a cool stone cellar and a heated pool open through October. An illustrative concept property.',
    price: 1350, cleaning: 210, guests: 12, bedrooms: 6, bathrooms: 6, size: 460, images: pick(3,7,2,5), palette: ['#b59c7c', '#7d6a4c', '#F5F3EE'], amenities: ['Heated pool','Library','Wine cellar','Air conditioning','Wi-Fi','Parking'], rules, tags: ['pool'] },
  { slug: 'chalet-alba', blurb: 'A larch chalet facing the Dolomite peaks, with a wood-fired sauna.', name: 'Chalet Alba', location: 'Alpe di Siusi, South Tyrol', region: 'Dolomites', category: 'Mountain', style: 'Larch timber chalet', type: 'Mountain chalet', tagline: 'Larch walls, deep eaves and the Dolomites in every window.',
    description: 'A timber chalet on an open alpine meadow. Larch-panelled rooms, a tiled stove in the living room and a sauna with a view of the peaks. Ski routes start near the door in winter. An illustrative concept property.',
    price: 640, cleaning: 130, guests: 8, bedrooms: 4, bathrooms: 3, size: 240, images: ['1612828898783-cbd4b81bd150', '1604766664165-668315c14b76'].map(img), palette: ['#b8a58b', '#6e5d46', '#F5F3EE'], amenities: ['Sauna','Tiled stove','Ski storage','Mountain view','Wi-Fi','Parking'], rules: [...base, 'Ski boots off at the entrance'], tags: [] },
  { slug: 'refuge-aiguille', blurb: 'Stone, glass and larch above the Chamonix valley, with a hot tub on the deck.', name: 'Refuge Aiguille', location: 'Chamonix, Haute-Savoie', region: 'Mont Blanc', category: 'Mountain', style: 'Alpine stone and glass lodge', type: 'Alpine lodge', tagline: 'A glass-fronted lodge facing Mont Blanc.',
    description: 'A low lodge of local stone and larch with a full glass front toward the Mont Blanc massif. Heated floors, a double-sided fireplace and a hot tub on the deck. An illustrative concept property.',
    price: 1580, cleaning: 240, guests: 10, bedrooms: 5, bathrooms: 5, size: 420, images: ['1610803523148-a0052fa341bb', '1780391592801-5e8867523492', '1781458378182-0d946f4988cb'].map(img), palette: ['#9aa7b3', '#56626e', '#F5F3EE'], amenities: ['Hot tub','Fireplace','Heated floors','Ski storage','Mountain view','Wi-Fi'], rules: [...base, 'Ski boots off at the entrance'], tags: [] },
  { slug: 'waldhaus-tanne', blurb: 'A compact timber house among fir trees, built around a wood stove.', name: 'Waldhaus Tanne', location: 'Black Forest, Baden-Württemberg', region: 'Black Forest', category: 'Forest', style: 'Dark-timber forest house', type: 'Forest house', tagline: 'Blackened timber, fir trees and a stove that heats the whole house.',
    description: 'A compact house clad in charred timber, set in a clearing between fir trees. One long living room, a wood stove, a covered terrace and a short path to the nearest walking trail. An illustrative concept property.',
    price: 520, cleaning: 110, guests: 4, bedrooms: 2, bathrooms: 2, size: 140, images: ['1575403071235-5dcd06cbf169', '1595877244574-e90ce41ce089', '1787126582040-b5639e21ca9c'].map(img), palette: ['#6f7d6a', '#38463a', '#F5F3EE'], amenities: ['Wood stove','Covered terrace','Walking trails','Wi-Fi','Parking'], rules, tags: [] },
  { slug: 'villa-lago-verde', blurb: 'A lakefront residence with its own jetty, boathouse and terraced garden.', name: 'Villa Lago Verde', location: 'Lake Como, Lombardy', region: 'Lake Como', category: 'Lakefront', style: 'Lakefront residence with jetty', type: 'Lakefront residence', tagline: 'A private jetty, a boathouse and a garden stepping down to the lake.',
    description: 'A nineteenth-century-style residence rebuilt around a terraced garden that runs to the water. A private jetty, a boathouse and a long dining terrace make the lake part of daily life. An illustrative concept property.',
    price: 1720, cleaning: 260, guests: 8, bedrooms: 4, bathrooms: 5, size: 410, images: ['1664433451451-11337deef597', '1586974726316-c6302de6a160', '1642494510670-08a2e9c0bc13'].map(img), palette: ['#7e9a94', '#46615b', '#F5F3EE'], amenities: ['Private jetty','Boathouse','Lake view','Garden terrace','Air conditioning','Wi-Fi'], rules, tags: [] },
  { slug: 'lakeside-pavilion', blurb: 'A glass pavilion on the Annecy shoreline, with a sauna at the water’s edge.', name: 'Lakeside Pavilion', location: 'Lake Annecy, Haute-Savoie', region: 'Lake Annecy', category: 'Lakefront', style: 'Glass and oak pavilion', type: 'Lake pavilion', tagline: 'Oak, glass and a sauna you can walk into the lake from.',
    description: 'A single-level pavilion of oak and glass a few steps from the shoreline. A lakeside sauna, a small dock and rowing boats make it a base for swimming and early mornings. An illustrative concept property.',
    price: 960, cleaning: 170, guests: 6, bedrooms: 3, bathrooms: 2, size: 190, images: ['1754962850942-5700d2939917', '1551291420-91160f3d4961'].map(img), palette: ['#8fa8b3', '#4f6b77', '#F5F3EE'], amenities: ['Lakeside sauna','Private dock','Rowing boats','Lake view','Wi-Fi'], rules, tags: [] },
  { slug: 'casa-cubo', blurb: 'Whitewashed volumes, one tree and a pool set in sand.', name: 'Casa Cubo', location: 'Comporta, Alentejo', region: 'Comporta', category: 'Minimalist', style: 'Whitewashed cubist volumes', type: 'Minimalist house', tagline: 'Three white volumes, a courtyard pine and almost no ornament.',
    description: 'Three whitewashed volumes around a pine courtyard, a few minutes from empty beach. Raw plaster, pale oak and linen keep the rooms calm; the pool sits flush with a sand-coloured deck. An illustrative concept property.',
    price: 890, cleaning: 160, guests: 6, bedrooms: 3, bathrooms: 3, size: 220, images: ['1660361338517-8c8fbb3ac264', '1660361339436-ddd4b85372da', '1564703048291-bcf7f001d83d'].map(img), palette: ['#d6cfc0', '#9a927f', '#242721'], amenities: ['Private pool','Courtyard','Outdoor shower','Bicycles','Wi-Fi','Parking'], rules, tags: ['pool'] },
  { slug: 'masseria-tufo', blurb: 'A whitewashed farm compound of vaulted rooms and an olive-shaded pool.', name: 'Masseria Tufo', location: 'Ostuni, Puglia', region: 'Puglia', category: 'Historic', style: 'Vaulted tufa masseria', type: 'Masseria', tagline: 'Vaulted stone rooms around a whitewashed courtyard.',
    description: 'A fortified farm compound of local tufa stone with vaulted ceilings, a cool courtyard and a pool under old olive trees. The kitchen opens onto a long table beneath a pergola. An illustrative concept property.',
    price: 680, cleaning: 150, guests: 9, bedrooms: 4, bathrooms: 4, size: 330, images: ['1609948368716-254e2501d243', '1779816568475-a83ee6cbd673', '1571403712587-f99cedc8cf99'].map(img), palette: ['#d9c9ac', '#a38c66', '#242721'], amenities: ['Private pool','Courtyard','Outdoor kitchen','Air conditioning','Wi-Fi','Parking'], rules, tags: ['pool'] },
  { slug: 'palazzo-sereno', blurb: 'A frescoed townhouse in Ortigia with a rooftop terrace over the harbour.', name: 'Palazzo Sereno', location: 'Ortigia, Sicily', region: 'Sicily', category: 'Historic', style: 'Baroque townhouse with roof terrace', type: 'Palazzo', tagline: 'Frescoed ceilings, stone staircases and a roof terrace over the harbour.',
    description: 'A restored baroque townhouse on three floors, with frescoed ceilings, a stone staircase and a private courtyard. The roof terrace looks across the harbour and is set for dinner at dusk. An illustrative concept property.',
    price: 1890, cleaning: 280, guests: 12, bedrooms: 6, bathrooms: 6, size: 520, images: ['1598977070355-05fc43ff3e7c', '1598976895865-af3631a92a2e', '1598976895839-9cb03d135e4d'].map(img), palette: ['#c4a88e', '#8a6b52', '#F5F3EE'], amenities: ['Roof terrace','Courtyard','Harbour view','Air conditioning','Wi-Fi','Concierge'], rules, tags: [] },
];
// Photos dropped into public/villas/<slug>/ and indexed with `npm run photos` take priority.
const local = manifest as Record<string, string[]>;
export const villas: Villa[] = raw.map((v) => ({ ...v, images: local[v.slug]?.length ? local[v.slug] : v.images }));
export const getVilla = (slug: string) => villas.find((v) => v.slug === slug);
export const regions = Array.from(new Set(villas.map((v) => v.region))).sort();
