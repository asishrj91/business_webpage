# Test-mode setup and launch

External accounts and runtime configuration are required before accepting orders. Keep test/live databases, keys and webhooks separate. The current Site audience remains private.

## Business configuration
In /admin replace sample products/prices/photos and the placeholder WhatsApp number. Disable the sample-menu flag only after review. In /admin/operations set available (unreserved) stock, exact supported Trivandrum 695xxx postcodes, fee, minimum order, delivery weekdays, lead time and IST cutoff. Supply your support email, business address, shipping/refund/privacy/terms policies and a policy version. Checkout requires this configuration and customer acceptance. Verify applicable business, food labelling, tax and invoicing obligations separately; an order receipt is not a tax invoice.

## Razorpay test mode
Create a merchant account and test-mode keys. Set these server-side runtime secrets through Sites environment settings; never commit secrets or embed them in frontend code:

| Secret | Purpose |
| --- | --- |
| RAZORPAY_KEY_ID | Test key starting rzp_test_; only this public identifier reaches checkout |
| RAZORPAY_KEY_SECRET | Server API and checkout signature verification |
| RAZORPAY_WEBHOOK_SECRET | Separate webhook signing secret |
| ORDER_TOKEN_SECRET | Independent random secret, at least 32 characters, for private status links |
| MAINTENANCE_SECRET | Independent random secret, at least 32 characters, for scheduler authorization |
| SITE_URL | Canonical HTTPS origin without trailing slash |
| ALLOW_LIVE_PAYMENTS | Keep false throughout testing |

Generate secrets with a password manager. Configure automatic capture in Razorpay. Register https://YOUR_DOMAIN/api/payments/webhook for payment.captured, refund.processed and refund.failed with the matching secret. Razorpay must reach this endpoint: owner-private hosting blocks external webhooks. Use a separate publicly reachable staging deployment with test keys for end-to-end testing; never disable signature verification to work around private hosting.

Official references: [Standard Checkout](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/) and [webhooks](https://razorpay.com/docs/webhooks/).

## Email
Create a Resend account, verify your sending domain and DNS, then set RESEND_API_KEY and EMAIL_FROM (e.g. Sprouts & Shoots <orders@YOUR_DOMAIN>). Keep test environments from emailing real customers. Missing credentials leave notifications pending. See [domain setup](https://resend.com/docs/dashboard/domains/introduction).

## Deployment and scheduling
Deploy source and migrations through Sites. Pushing GitHub alone does not deploy the Site. Verify /api/health and owner login.

The maintenance workflow is opt-in: set GitHub Actions variables MAINTENANCE_ENABLED=true and SITE_URL, plus Actions secret MAINTENANCE_SECRET matching the runtime secret. It checks health and POSTs /api/maintenance every 10 minutes. Enable only when the origin is reachable by GitHub. For private hosting use the dashboard manual maintenance button until an authenticated scheduler is configured. GitHub schedules can be delayed; use a monitored scheduler for dependable timing. Configure failed-run notifications and uptime alerts. Neither provider accounts nor backup schedules are provisioned by this code.

## Acceptance before launch
- Complete test payments and dismiss checkout; replay captured webhooks and verify one payment/stock deduction.
- Abandon checkout, run maintenance after 15 minutes and confirm stock release; late captures must enter payment review.
- Test unsupported postcode, minimum basket, unavailable item, last pack and cutoff dates.
- Verify email/status links, owner-only access, fulfilment, refund reconciliation and provider-dashboard agreement.
- Test the real hosted Razorpay modal on mobile. Automated tests mock the provider and cannot replace this check.
- Complete the backup/restore drill in OPERATIONS.md.

For live launch, complete merchant activation, set live keys and a separate live webhook, enable ALLOW_LIVE_PAYMENTS=true, confirm policies and stock, enable checkout and deliberately change Site audience. This update does not activate real payments, public access, DNS or provider accounts.
