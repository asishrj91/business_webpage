import { settings,paymentReady } from '../../../../lib/commerce';
import { readContent,runtime } from '../../../../lib/server-content';
import { datesForDelivery } from '../../../../lib/commerce-model';
export const dynamic='force-dynamic';
export async function GET(){const {delivery}=await settings();const {content}=await readContent();return Response.json({delivery,dates:datesForDelivery(delivery),ready:paymentReady()&&delivery.enabled&&!content.settings.sampleMenu,testMode:!runtime().RAZORPAY_KEY_ID?.startsWith('rzp_live_')},{headers:{'Cache-Control':'no-store'}});}
