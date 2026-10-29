import { runtime } from '../../../lib/server-content';
export const dynamic='force-dynamic';
export async function GET(){try{await runtime().DB.prepare('SELECT 1').first();return Response.json({status:'ok'},{headers:{'Cache-Control':'no-store'}})}catch{return Response.json({status:'unavailable'},{status:503});}}
