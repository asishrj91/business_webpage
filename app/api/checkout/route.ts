import { checkout,jsonBody,rateLimit } from '../../../lib/commerce';
import { sameOrigin } from '../../../lib/server-content';
export const dynamic='force-dynamic';
export async function POST(request:Request){if(!sameOrigin(request))return Response.json({error:'Invalid origin.'},{status:403});try{await rateLimit(request,'checkout',15);return Response.json(await checkout(await jsonBody(request)),{headers:{'Cache-Control':'no-store'}});}catch(e){return Response.json({error:e instanceof Error?e.message:'Checkout failed.'},{status:400});}}
