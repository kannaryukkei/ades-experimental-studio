import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { buildSite } from "../../../engine/src/build.mjs";
import { createPreviewServer } from "../../../engine/src/preview.mjs";
import { siteConfig as corporateConfig, pages as corporatePages } from "../../business-04/sites/corporate/site.mjs";
import { siteConfig as advisoryConfig, pages as advisoryPages } from "../../business-04/sites/professional-services/site.mjs";
import { siteConfig as catalogConfig, pages as catalogPages } from "../../business-04/sites/product-catalog/site.mjs";

const here=path.dirname(fileURLToPath(import.meta.url));
const evidenceDir=path.resolve(here,"..",".qa-baseline");
await fs.rm(evidenceDir,{recursive:true,force:true});
await fs.mkdir(evidenceDir,{recursive:true});
const sites=[
 {id:"corporate",root:new URL("../../business-04/sites/corporate/",import.meta.url),config:corporateConfig,pages:corporatePages},
 {id:"professional-services",root:new URL("../../business-04/sites/professional-services/",import.meta.url),config:advisoryConfig,pages:advisoryPages},
 {id:"product-catalog",root:new URL("../../business-04/sites/product-catalog/",import.meta.url),config:catalogConfig,pages:catalogPages}
];
const buildOnly=process.argv.includes("--build-only");
for(const site of sites){
 const root=fileURLToPath(site.root);
 const result=await buildSite({rootDir:root,config:site.config,pageList:site.pages});
 console.log("[baseline:"+site.id+"] built "+result.routes.length+" routes");
}
if(buildOnly) process.exit(0);

const browser=await chromium.launch({headless:true});
let routes=0, responsive=0;
try{
 for(const site of sites){
  const root=path.join(fileURLToPath(site.root),"dist");
  const server=createPreviewServer({rootDir:root});
  await new Promise((resolve,reject)=>{server.once("error",reject);server.listen(0,"127.0.0.1",resolve);});
  try{
   const base="http://127.0.0.1:"+server.address().port;
   const page=await browser.newPage({viewport:{width:1440,height:900}});
   const errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   const representative=site.pages.filter(p=>p.path==="/"||p.template==="listing"||p.template==="detail"||p.template==="contact");
   for(const item of site.pages){
    const response=await page.goto(base+item.path,{waitUntil:"networkidle"});
    assert.equal(response?.status(),200,site.id+" "+item.path);
    assert.equal(await page.locator("h1").count(),1,site.id+" "+item.path+" H1 count");
    const width=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
    assert.ok(width.scroll<=width.client+1&&width.body<=width.client+1,site.id+" desktop overflow "+item.path);
    routes++;
   }
   await page.goto(base+"/",{waitUntil:"networkidle"});
   await page.screenshot({path:path.join(evidenceDir,site.id+"-home-1440.png"),fullPage:true});
   for(const width of [768,390]){
    await page.setViewportSize({width,height:width===768?1024:844});
    for(const item of representative){
     const response=await page.goto(base+item.path,{waitUntil:"networkidle"});
     assert.equal(response?.status(),200,site.id+" "+item.path+" "+width);
     const dimension=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
     assert.ok(dimension.scroll<=dimension.client+1&&dimension.body<=dimension.client+1,site.id+" overflow "+item.path+" "+width);
     responsive++;
     if(width===390&&item.path==="/") await page.screenshot({path:path.join(evidenceDir,site.id+"-home-390.png"),fullPage:true});
    }
   }
   assert.deepEqual(errors,[],site.id+" console page errors");
   console.log("PASS baseline "+site.id);
   await page.close();
  }finally{
   await new Promise((resolve,reject)=>server.close(e=>e?reject(e):resolve()));
  }
 }
 console.log("BUSINESS-04 baseline captured: "+routes+" desktop routes and "+responsive+" representative tablet/mobile checks.");
}finally{await browser.close();}
