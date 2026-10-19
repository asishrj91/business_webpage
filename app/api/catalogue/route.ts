import { readContent } from '../../../lib/server-content';
export const dynamic='force-dynamic';
export async function GET(){const {content}=await readContent();return Response.json({...content,products:content.products.filter(p=>p.status!=='hidden')},{headers:{'Cache-Control':'no-store'}});}
