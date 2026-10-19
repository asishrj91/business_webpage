# Sprouts & Shoots by Thanal

Visit /admin and sign in with the ChatGPT account that owns this Site.

## Managing content
- Select a product to edit its name, photo, price, pack size, flavour and description.
- Add products; new products start Hidden / draft. Available products can be ordered; Sold out products remain visible but cannot be added to the basket.
- Upload JPG, PNG or WebP photos up to 5 MB.
- Business settings controls the display name, announcement, WhatsApp number, delivery area and sample-menu label.
- Click Save changes to publish. Unsaved changes remain only in the current editor. Stale saves are rejected to avoid overwriting newer edits.
- Subscription-plan editing is outside this first admin release. The existing sample plan remains unchanged.

## Architecture
Next-compatible UI on Vinext / Cloudflare Workers through Sites. D1 stores products, settings and owner identity; R2 stores uploaded photos. No Supabase account is needed. Site access stays private. Every admin endpoint also authorizes on the server.

ADMIN_EMAIL is a hosted server-side secret used only to enroll the configured owner using verified Sites identity headers. Subsequent checks use the durable site-scoped user ID in admin_owner. Never expose it in client code or allow arbitrary first-visitor enrollment.

The initial catalogue is sample data until first saved. Local preview data is separate from production.

## Development
Run npm ci, npm run build, then apply generated SQL migrations locally and npm run dev. Local mock sign-in uses an ignored .dev.vars with ADMIN_EMAIL set to seedy@sites.test; production uses Sites authentication.

Checks: node --test tests/content.test.mjs and npx tsc --noEmit.

Preserve the Site ID in .openai/hosting.json. Commit generated drizzle migrations and do not edit applied migrations. Never upload .dev.vars, .wrangler or local database state.
