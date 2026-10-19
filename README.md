# Sprouts & Shoots by Thanal

Responsive Next.js, TypeScript and Tailwind website with a sample catalogue, basket and WhatsApp enquiry flow.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` exports the website to `out/` for static hosting.

## Before launch

- In `lib/catalogue.ts`, set `business.whatsapp` to the real business number in international digits-only format (for example, country code followed by the number). The current display number is deliberately invalid; the WhatsApp action is disabled until configured.
- Confirm varieties, prices, pack sizes and subscription terms. Current values are illustrative, as requested.
- Prices are in `app/page.tsx`; the product definitions are in `lib/catalogue.ts`.
- The logo is the supplied `public/brand.png`. The hero uses an illustrative Unsplash gardening image; product visuals are stylized illustrations.
- Confirm delivery localities within Trivandrum and any charges before accepting orders.

There is no payment processing or order database. Customers review their basket and send an enquiry; the business confirms terms on WhatsApp. Basket state lasts for the current page session.
