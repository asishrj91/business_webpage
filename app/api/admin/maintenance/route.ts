import { isAdmin,sameOrigin } from '../../../../lib/server-content';
import { maintenance } from '../../../../lib/commerce';
export const dynamic='force-dynamic';
export async function POST(request:Request){if(!sameOrigin(request)||!await isAdmin())return Response.json({error:'Admin required.'},{status:403});return Response.json(await maintenance());}
