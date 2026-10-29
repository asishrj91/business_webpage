import { requireChatGPTUser } from '../../chatgpt-auth';
import { isAdmin } from '../../../lib/server-content';
import Operations from './operations';
export const dynamic='force-dynamic';
export const metadata={title:'Orders & delivery | Sprouts & Shoots',robots:{index:false,follow:false}};
export default async function Page(){await requireChatGPTUser('/admin/operations');if(!await isAdmin())return <main className="commerce-page"><h1>Owner access required</h1><a href="/">Return to storefront</a></main>;return <Operations/>;}
