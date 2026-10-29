import { runtime } from '../../../lib/server-content';
import { digest,maintenance } from '../../../lib/commerce';
export const dynamic='force-dynamic';
export async function POST(request:Request){const secret=runtime().MAINTENANCE_SECRET;const supplied=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!secret||secret.length<32||!supplied||await digest(secret)!==await digest(supplied))return new Response('Unauthorized',{status:401});return Response.json(await maintenance());}
