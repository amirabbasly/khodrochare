// Originals stay untouched. Remove only edge-connected neutral backdrop pixels.
import sharp from 'sharp';
async function outline(input, width) {
 const png=await sharp(input).resize({width}).ensureAlpha().toBuffer();
 const {width:w,height:h}=await sharp(png).metadata();
 const mask=await sharp(png).extractChannel('alpha').dilate(1).toBuffer();
 const edge=await sharp({create:{width:w,height:h,channels:3,background:'#b7c8e8'}}).joinChannel(mask).png().toBuffer();
 return sharp(edge).composite([{input:png}]).png().toBuffer();
}
(async()=>{
 const word=await sharp('public/brand/wordmark-original.png').trim().png().toBuffer();
 await sharp(await outline(word,920)).webp({quality:94}).toFile('public/images/khodrochare-brand-wordmark-dark.webp');
 const {data,info}=await sharp('public/brand/symbol-original.png').ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const {width:w,height:h}=info,seen=new Uint8Array(w*h),queue=[];
 function add(i){if(seen[i])return;seen[i]=1;const p=i*4,r=data[p],g=data[p+1],b=data[p+2];if(Math.min(r,g,b)>195&&Math.max(r,g,b)-Math.min(r,g,b)<40){queue.push(i);data[p+3]=0;}}
 for(let x=0;x<w;x++){add(x);add((h-1)*w+x)}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1)}
 for(let k=0;k<queue.length;k++){const i=queue[k],x=i%w,y=Math.floor(i/w);if(x)add(i-1);if(x<w-1)add(i+1);if(y)add(i-w);if(y<h-1)add(i+w)}
 const symbol=await sharp(data,{raw:info}).trim().png().toBuffer();
 await sharp(await outline(symbol,480)).webp({quality:94}).toFile('public/images/khodrochare-brand-symbol-dark.webp');
})();
