import { readContent } from '../lib/server-content';
import Storefront from './storefront';
export const dynamic='force-dynamic';
export default async function Home(){const {content}=await readContent();return <Storefront content={{...content,products:content.products.filter(p=>p.status!=='hidden')}}/>;}
