export const eur = (n: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
export function nightsBetween(a?: string, b?: string) {
  if (!a || !b) return 0;
  const d = (new Date(b).getTime() - new Date(a).getTime()) / 86400000;
  return Number.isFinite(d) && d > 0 ? Math.round(d) : 0;
}
export function quote(pricePerNight: number, cleaning: number, nights: number) {
  const stay = pricePerNight * nights;
  const service = Math.round(stay * 0.08);
  return { nights, stay, cleaning: nights ? cleaning : 0, service: nights ? service : 0, total: nights ? stay + cleaning + service : 0 };
}
export const today = () => new Date().toISOString().slice(0, 10);
