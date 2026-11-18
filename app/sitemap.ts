import type { MetadataRoute } from 'next';
import { villas } from '@/lib/villas';
export default function sitemap(): MetadataRoute.Sitemap {
  const b = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return ['', '/villas', '/about', '/contact', '/faq', ...villas.map((v) => `/villas/${v.slug}`)].map((p) => ({ url: b + p }));
}
