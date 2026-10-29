import OrderStatus from './status';
export const metadata={title:'Your order | Leaf & Larder',robots:{index:false,follow:false},referrer:'no-referrer'};
export default async function Page({params}:{params:Promise<{id:string}>}){return <OrderStatus id={(await params).id}/>;}
