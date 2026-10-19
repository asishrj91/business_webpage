import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defaults, validateContent } from '../lib/content.ts';
test('normalizes an international WhatsApp number and accepts decimal prices',()=>{const data=structuredClone(defaults);data.settings.whatsapp='+91 98765 43210';data.products[0].price=19.99;assert.equal(validateContent(data).settings.whatsapp,'919876543210');});
test('rejects invalid prices, duplicate IDs and injected photo URLs',()=>{for(const mutate of [d=>d.products[0].price=-1,d=>d.products[0].price=1.234,d=>d.products[1].id=d.products[0].id,d=>d.products[0].image='javascript:alert(1)',d=>d.settings.whatsapp='0000000000']){const data=structuredClone(defaults);mutate(data);assert.throws(()=>validateContent(data));}});
test('supports an empty catalogue and validates uploaded-photo paths',()=>{const data=structuredClone(defaults);data.products=[];assert.deepEqual(validateContent(data).products,[]);const photo=structuredClone(defaults);photo.products[0].image='/api/photos/01234567-abcd-4321-abcd-0123456789ab.jpg';assert.equal(validateContent(photo).products[0].image,photo.products[0].image);});
