export type Product = { id: string; name: string; kind: string; category: 'Mild' | 'Peppery'; description: string; price: number; packSize: string; image: string; status: 'available' | 'sold_out' | 'hidden' };
export type Settings = { name: string; whatsapp: string; deliveryArea: string; tagline: string; sampleMenu: boolean };
export type Content = { products: Product[]; settings: Settings };
export const defaults: Content = {
 settings: { name: 'Sprouts & Shoots by Thanal', whatsapp: '', deliveryArea: 'Trivandrum', tagline: 'A little green. A little goodness. Every day.', sampleMenu: true },
 products: [
  { id:'sunflower', name:'Sunflower shoots', kind:'Mild & crunchy', category:'Mild', description:'A little crunch for sandwiches, salads and your everyday bowl.', price:120, packSize:'50 g', image:'', status:'available' },
  { id:'radish', name:'Radish microgreens', kind:'Peppery & bright', category:'Peppery', description:'A peppery finishing touch for toast, chaat and fresh salads.', price:100, packSize:'50 g', image:'', status:'available' },
  { id:'pea', name:'Pea shoots', kind:'Sweet & tender', category:'Mild', description:'Tender greens to toss into a salad or add just before serving.', price:110, packSize:'50 g', image:'', status:'available' }
 ]
};
function str(v:unknown,max:number,required=true):string { if(typeof v!=='string'||v.trim().length>max||(required&&!v.trim()))throw new Error('Please complete all required fields within their character limits.');return v.trim(); }
export function validateContent(value:unknown):Content {
 const c=value as Content;if(!c||!c.settings||!Array.isArray(c.products)||c.products.length>100)throw new Error('Invalid catalogue (maximum 100 products).');
 const s=c.settings;const whatsapp=str(s.whatsapp,20,false).replace(/[\s+()-]/g,'');
 if(whatsapp&&!/^[1-9]\d{9,14}$/.test(whatsapp))throw new Error('Enter a valid WhatsApp number with country code, or leave it blank.');
 if(typeof s.sampleMenu!=='boolean')throw new Error('Invalid sample menu setting.');
 const ids=new Set<string>();const products=c.products.map(p=>{const id=str(p.id,80);if(!/^[a-zA-Z0-9-]+$/.test(id)||ids.has(id))throw new Error('Invalid or duplicate product identifier.');ids.add(id);
 if(!['Mild','Peppery'].includes(p.category)||!['available','sold_out','hidden'].includes(p.status))throw new Error('Invalid category or availability.');
 if(typeof p.price!=='number'||!Number.isFinite(p.price)||p.price<0||p.price>100000||Math.abs(Math.round(p.price*100)-p.price*100)>0.000001)throw new Error('Price must be between ₹0 and ₹100,000, with up to two decimal places.');
 const image=str(p.image,120,false);if(image&&!/^\/api\/photos\/[a-f0-9-]+\.(jpg|png|webp)$/.test(image))throw new Error('Please upload a product image using the photo picker.');
 return {id,name:str(p.name,80),kind:str(p.kind,60),category:p.category,description:str(p.description,500),price:p.price,packSize:str(p.packSize,40),image,status:p.status};});
 return {products,settings:{name:str(s.name,100),whatsapp,deliveryArea:str(s.deliveryArea,200),tagline:str(s.tagline,160),sampleMenu:s.sampleMenu}};
}
