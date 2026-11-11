import sharp from "sharp";
import {mkdir} from "node:fs/promises";
const folder=process.argv[2];
if(!folder)throw new Error('Pass the folder containing supplied 1233.webp and 1234.webp.');
await mkdir('public/images/app-screens',{recursive:true});
for(const [input,output] of [['1233.webp','home-exact'],['1234.webp','services-exact']]){
 const {data,info}=await sharp(`${folder}/${input}`).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 // Remove ONLY edge-connected white/black surround. Never touch enclosed screen pixels.
 const seen=new Uint8Array(info.width*info.height),queue=[];
 const visit=(x,y)=>{
  if(x<0||y<0||x>=info.width||y>=info.height)return;
  const pixel=y*info.width+x;if(seen[pixel])return;seen[pixel]=1;
  const i=pixel*4,lo=Math.min(data[i],data[i+1],data[i+2]),hi=Math.max(data[i],data[i+1],data[i+2]);
  if(data[i+3]>0 && !(lo>235 && hi-lo<14) && !(hi<22))return;
  data[i+3]=0;queue.push(pixel);
 };
 for(let x=0;x<info.width;x++){visit(x,0);visit(x,info.height-1);}
 for(let y=0;y<info.height;y++){visit(0,y);visit(info.width-1,y);}
 for(let n=0;n<queue.length;n++){const p=queue[n],x=p%info.width,y=Math.floor(p/info.width);visit(x-1,y);visit(x+1,y);visit(x,y-1);visit(x,y+1);}
 await sharp(data,{raw:info}).trim({threshold:2}).resize({height:1200,kernel:'lanczos3'}).sharpen({sigma:.6,m1:.35,m2:.6}).webp({lossless:true}).toFile(`public/images/app-screens/${output}.webp`);
}
