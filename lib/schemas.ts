import { z } from 'zod';
export const bookingSchema = z.object({
  villaSlug: z.string().min(1),
  checkIn: z.string().min(1, 'Choose an arrival date'),
  checkOut: z.string().min(1, 'Choose a departure date'),
  guests: z.coerce.number().int().min(1, 'At least 1 guest'),
  name: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
}).refine((d) => new Date(d.checkOut) > new Date(d.checkIn), { path: ['checkOut'], message: 'Departure must be after arrival' });
export type BookingInput = z.infer<typeof bookingSchema>;
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  email: z.string().trim().email('Enter a valid email address'),
  message: z.string().trim().min(10, 'Write at least 10 characters').max(2000),
});
export type ContactInput = z.infer<typeof contactSchema>;
