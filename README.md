# Sprouts & Shoots by Thanal

React/TypeScript storefront and owner dashboard, built with Vinext on Cloudflare Workers, D1 (SQL) and R2 (photos), hosted through Sites.

## Features
- Product, photo, availability and business management at /admin.
- Persistent basket, guest checkout, server-calculated prices and Trivandrum delivery postcode/date checks.
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

Read [launch setup](docs/LAUNCH.md) and [operations](docs/OPERATIONS.md). Preserve .openai/hosting.json identity/storage bindings. Commit generated migrations; never edit applied migrations or commit secrets/local database files.

Owner authorization depends on trusted Sites identity headers. ADMIN_EMAIL enrolls the verified owner once; subsequent checks use the stored site user ID. Moving to generic hosting requires a replacement identity provider and a trusted header boundary.
