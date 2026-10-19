import { isAdmin,runtime,sameOrigin } from '../../../../lib/server-content';
export const dynamic='force-dynamic';
export async function POST(request:Request){
 if(!sameOrigin(request)||!await isAdmin())return Response.json({error:'Admin access required.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>6*1024*1024)return Response.json({error:'Photo must be under 5 MB.'},{status:413});
 try{const form=await request.formData();const file=form.get('photo');if(!(file instanceof File)||file.size===0||file.size>5*1024*1024)throw new Error('Choose a JPG, PNG or WebP photo under 5 MB.');
 const bytes=new Uint8Array(await file.arrayBuffer());const png=bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71;const jpg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;const webp=new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP';
 const ext=png?'png':jpg?'jpg':webp?'webp':null;if(!ext)throw new Error('Only JPG, PNG and WebP photos are supported.');const type=ext==='jpg'?'image/jpeg':`image/${ext}`;
 if(file.type!==type)throw new Error('The photo content does not match its file type.');
 const key=`${crypto.randomUUID()}.${ext}`;await runtime().BUCKET.put(key,bytes,{httpMetadata:{contentType:type}});return Response.json({url:`/api/photos/${key}`});
 }catch(e){return Response.json({error:e instanceof Error?e.message:'Unable to upload photo.'},{status:400});}
}
