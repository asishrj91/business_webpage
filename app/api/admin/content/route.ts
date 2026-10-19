import { isAdmin, readContent, runtime, sameOrigin } from '../../../../lib/server-content';
import { validateContent } from '../../../../lib/content';
export const dynamic='force-dynamic';
export async function GET(){if(!await isAdmin())return Response.json({error:'Admin access required.'},{status:403});return Response.json(await readContent(),{headers:{'Cache-Control':'no-store'}});}
export async function PUT(request:Request){
 if(!sameOrigin(request)||!await isAdmin())return Response.json({error:'Admin access required.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>200000)return Response.json({error:'Catalogue is too large.'},{status:413});
 let content,revision;
 try{const raw=await request.text();if(raw.length>200000)throw new Error('Catalogue is too large.');const body=JSON.parse(raw);content=validateContent(body.content);revision=body.revision;if(!Number.isSafeInteger(revision)||revision<0)throw new Error('Invalid revision. Reload this page.');}catch(e){return Response.json({error:e instanceof Error?e.message:'Invalid data.'},{status:400});}
 const db=runtime().DB;const data=JSON.stringify(content);
 const result=revision===0?await db.prepare('INSERT OR IGNORE INTO site_content (id,data,revision) VALUES (?,?,1)').bind('catalogue',data).run():await db.prepare('UPDATE site_content SET data = ?, revision = revision + 1 WHERE id = ? AND revision = ?').bind(data,'catalogue',revision).run();
 if(!result.meta.changes)return Response.json({error:'Someone saved a newer version. Reload the dashboard before editing again.'},{status:409});
 return Response.json({revision:revision+1});
}
