import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Leaf & Larder | A little green, every day', description: 'Discover microgreens and subscriptions from Leaf & Larder. Find your favourite greens and enquire on WhatsApp.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
