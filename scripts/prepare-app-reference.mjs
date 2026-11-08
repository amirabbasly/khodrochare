import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Crop only the supplied application's actual screens; never regenerate or alter its UI.
const input = process.argv[2];
if (!input) throw new Error("Pass the 960×960 supplied application reference JPEG.");
await mkdir("public/images/app-screens", { recursive: true });
const crops = [
  ["home", 598, 8, 232, 453],
  ["services", 195, 448, 254, 501],
  ["benefits", 458, 458, 252, 502],
];
for (const [name, left, top, width, height] of crops) {
  const { data, info } = await sharp(input).extract({left,top,width,height}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const seen = new Uint8Array(info.width * info.height);
  const queue = [];
  const enqueue = (x,y) => {
    if (x<0 || y<0 || x>=info.width || y>=info.height) return;
    const pixel=y*info.width+x;
    if (seen[pixel]) return;
    seen[pixel]=1;
    const i=pixel*4;
    // Edge-connected near-white background only, preserving white pixels inside screens.
    if (Math.min(data[i],data[i+1],data[i+2])<216 || Math.max(data[i],data[i+1],data[i+2])-Math.min(data[i],data[i+1],data[i+2])>24) return;
    data[i+3]=0;
    queue.push(pixel);
  };
  for(let x=0;x<info.width;x++) {enqueue(x,0);enqueue(x,info.height-1);}
  for(let y=0;y<info.height;y++) {enqueue(0,y);enqueue(info.width-1,y);}
  for(let n=0;n<queue.length;n++) {const pixel=queue[n];const x=pixel%info.width,y=Math.floor(pixel/info.width);enqueue(x-1,y);enqueue(x+1,y);enqueue(x,y-1);enqueue(x,y+1);}
  await sharp(data,{raw:info}).webp({quality:90,alphaQuality:100}).toFile(`public/images/app-screens/${name}.webp`);
}

// Use the existing brand artwork, crop only its lettering and soften the black matte.
const logo = await sharp("public/images/khodrochare-logo-compact.webp")
  .extract({left:149,top:21,width:252,height:96}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
for(let i=0;i<logo.data.length;i+=4) {
  const brightness=Math.max(logo.data[i],logo.data[i+1],logo.data[i+2]);
  if(brightness<45) logo.data[i+3]=Math.round(logo.data[i+3]*Math.max(0,(brightness-18)/27));
}
await sharp(logo.data,{raw:logo.info}).webp({quality:95,alphaQuality:100}).toFile("public/images/khodrochare-wordmark.webp");
