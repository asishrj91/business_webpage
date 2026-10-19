import { isAdmin,readContent } from '../../lib/server-content';
import { requireChatGPTUser } from '../chatgpt-auth';
import Dashboard from './dashboard';
export const dynamic='force-dynamic';
export const metadata={title:'Admin | Sprouts & Shoots',robots:{index:false,follow:false}};
export default async function Admin(){await requireChatGPTUser('/admin');if(!await isAdmin())return <main className="admin-denied"><h1>Owner access only</h1><p>Sign in with the account that owns this site to manage its catalogue.</p><a href="/signout-with-chatgpt?return_to=/admin" target="_top">Switch account</a><a href="/">Return to storefront</a></main>;const data=await readContent();return <Dashboard initial={data.content} initialRevision={data.revision}/>;}
