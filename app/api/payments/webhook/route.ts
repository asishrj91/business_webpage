import { processWebhook } from '../../../../lib/commerce';
export const dynamic='force-dynamic';
export async function POST(request:Request){try{return await processWebhook(request)}catch{console.error('Payment webhook processing failed; provider retry required.');return Response.json({error:'Retry webhook delivery.'},{status:503});}}
