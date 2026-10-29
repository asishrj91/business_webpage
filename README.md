# Leaf & Larder

React/TypeScript storefront and owner dashboard, built with Vinext on Cloudflare Workers, D1 (SQL) and R2 (photos), hosted through Sites.

## Features
- Product, photo, availability and business management at /admin.
- Persistent basket, guest checkout, server-calculated prices and configurable delivery postcode/date checks.
- Razorpay checkout, signature verification, webhooks, stock reservations and reconciliation.
- Private order tracking and owner operations at /admin/operations: orders, stock, delivery, policies, fulfilment and full refunds.
- Resend transactional email outbox, audit log, migrations, tests, CI and opt-in maintenance scheduler.

Payments start disabled; no merchant credentials are included. Subscription plans remain WhatsApp enquiries. Recurring billing, partial refunds and tax invoices are not implemented.

## Local development
Use Node 24 (tests use built-in SQLite). Run npm ci, copy .dev.vars.example to .dev.vars, then npm run build. Apply local migrations:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 migrations apply DB --local --config dist/server/wrangler.json --persist-to .wrangler/state
npm run dev
```

Local data is separate from hosted data. Run npm test, npm run build and npm run typecheck for validation.

Read [launch setup](docs/LAUNCH.md) and [operations](docs/OPERATIONS.md). The public template deliberately has no Site project ID. Register a new Site for your own deployment and set its returned project_id in .openai/hosting.json; retain the DB and BUCKET bindings. Commit generated migrations; never edit applied migrations or commit secrets/local database files.

Owner authorization depends on trusted Sites identity headers. ADMIN_EMAIL enrolls the verified owner once; subsequent checks use the stored site user ID. Moving to generic hosting requires a replacement identity provider and a trusted header boundary.

## Demo identity
Leaf & Larder is placeholder branding with an original SVG logo in public/brand.svg. Set your own business name, delivery area, contact details and exact delivery PIN-code allowlist in the admin dashboard. No city prefix is hard-coded. INR, Indian mobile numbers and IST scheduling remain the defaults. Existing database settings are not overwritten by source edits.
