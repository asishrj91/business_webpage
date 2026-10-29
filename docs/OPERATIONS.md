# Operations and recovery

## Orders and stock
Use /admin for catalogue and /admin/operations for orders, stock, delivery and policies. Stock means available to sell, excluding reservations. Updates set an absolute count and reject stale revisions. Existing orders retain their item/price snapshots.

Pending orders reserve stock for 15 minutes. Maintenance releases expired reservations; late captured payments enter payment_review and need manual review before fulfilment. Paid orders advance to preparing, out_for_delivery and delivered. Reconcile uncertain payments against Razorpay. Full refunds are supported before dispatch; partial refunds and manual provider changes need review.

A refund timeout may mean the provider accepted it. The app records refund_review and prevents an automatic second request. Check Razorpay and reconcile; never blindly retry. Refunded perishables are not automatically restocked.

## Monitoring
Run maintenance every 10 minutes. It expires reservations, checks recent unsettled payments/refunds, clears old rate counters and dispatches email. Batches are bounded: monitor backlog and increase frequency with volume. The dashboard has a manual run. Monitor health, scheduler failures, review orders, pending mail and webhook failures.

Email uses a durable outbox and provider idempotency keys. Automatic retries stop before the provider's 24-hour deduplication window; investigate old unsent email manually instead of blindly replaying it. Delivery may wait for maintenance.

## Backup and restoration
Git is not a database backup. Configure D1 backups/exports and R2 object backups in the hosting account, or request them from the hosting operator when direct access is unavailable. Retain encrypted daily database exports and uploaded objects under a documented retention policy; include catalogue, settings, inventory, orders/items, events, outbox, owner identity and audit records. Restrict backup access and monitor failures. Never commit customer exports.

Before launch and periodically, restore to an isolated staging database/bucket with payment/email secrets absent and checkout disabled. Verify migrations, catalogue, owner authorization, order/item counts and photo references. Record recovery time and newest recovered order. Reconcile newer orders against Razorpay before resuming sales. Never replay payment/email side effects from a restored outbox without reconciliation.

Backup schedules and a verified restore are not provisioned by this application. Agree retention/recovery targets with the hosting operator.

## Incidents
Disable checkout to stop new orders, while continuing to review existing payments. Rotate compromised secrets in runtime settings and redeploy; rotating ORDER_TOKEN_SECRET invalidates existing tracking links. Avoid logging secrets, full webhooks or customer addresses. Treat status links as bearer credentials. Test migrations against staging backups; frontend rollback does not reverse database changes or provider transactions.
