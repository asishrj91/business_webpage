import { env } from 'cloudflare:workers';
import { headers } from 'next/headers';
import { defaults, type Content } from './content';
export const runtime = () => env as unknown as { DB:D1Database; BUCKET:R2Bucket; ADMIN_EMAIL?:string; RAZORPAY_KEY_ID?:string; RAZORPAY_KEY_SECRET?:string; RAZORPAY_WEBHOOK_SECRET?:string; ORDER_TOKEN_SECRET?:string; RESEND_API_KEY?:string; EMAIL_FROM?:string; SITE_URL?:string; MAINTENANCE_SECRET?:string; ALLOW_LIVE_PAYMENTS?:string };
export async function readContent():Promise<{content:Content;revision:number}> {
 const row=await runtime().DB.prepare('SELECT data, revision FROM site_content WHERE id = ?').bind('catalogue').first<{data:string;revision:number}>();
 return row?{content:JSON.parse(row.data),revision:row.revision}:{content:defaults,revision:0};
}
// Dispatch supplies verified identity headers. Only the configured site owner
// may enroll; future authorization uses the durable, site-scoped user ID.
export async function isAdmin():Promise<boolean> {
 const h=await headers();const id=h.get('oai-authenticated-user-id');if(!id)return false;
 const e=runtime();let owner=await e.DB.prepare('SELECT user_id FROM admin_owner WHERE id = ?').bind('owner').first<{user_id:string}>();
 if(!owner){
  if(!e.ADMIN_EMAIL || h.get('oai-authenticated-user-email')?.toLowerCase()!==e.ADMIN_EMAIL.toLowerCase())return false;
  await e.DB.prepare('INSERT OR IGNORE INTO admin_owner (id, user_id) VALUES (?, ?)').bind('owner',id).run();
  owner=await e.DB.prepare('SELECT user_id FROM admin_owner WHERE id = ?').bind('owner').first<{user_id:string}>();
 }
 return owner?.user_id===id;
}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin;}
