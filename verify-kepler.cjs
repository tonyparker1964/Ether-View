const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
function fn(name){const start=html.indexOf('function '+name+'(');assert(start>=0,name);let p=html.indexOf('{',start),depth=1,end=p+1;for(;depth;end++){if(html[end]==='{')depth++;if(html[end]==='}')depth--;}return html.slice(start,end);}
const start=html.indexOf('const EXO = [');
const systems=vm.runInNewContext(html.slice(start,html.indexOf('EXO.forEach',start))+';EXO');
const k=systems.find(s=>s.key==='kepler16');assert.equal(k.stars.length,2);assert.equal(k.binary.e,.15944);
class V{constructor(x=0,y=0,z=0){Object.assign(this,{x,y,z});}copy(v){Object.assign(this,{x:v.x,y:v.y,z:v.z});return this;}addScaledVector(v,s){this.x+=v.x*s;this.y+=v.y*s;this.z+=v.z*s;return this;}}
const ctx=vm.createContext({Math});vm.runInContext(fn('keplerE')+'\n'+fn('binaryEllipse')+'\n'+fn('binaryPhase'),ctx);
const phase=(b,d)=>ctx.binaryPhase(b,d),ellipse=(b,e)=>ctx.binaryEllipse(b,e);
for(const b of [k.binary,{P:41.08,a:.22431}]){
 for(const days of [-1e8,-1e4,-1,0,1,10,20,41.08,1e4,1e8]){
  const p=phase(b,days),q=phase(b,days+b.P);assert(Math.hypot(p.x-q.x,p.y-q.y)<1e-8,'periodic motion');
  const e=b.e||0,r=Math.hypot(p.x,p.y);assert(r>=1-e-1e-10&&r<=1+e+1e-10,'ellipse radius');
 }
}
const peri=ellipse(k.binary,0),apo=ellipse(k.binary,Math.PI);assert(Math.abs(Math.hypot(peri.x,peri.y)-(1-k.binary.e))<1e-12);assert(Math.abs(Math.hypot(apo.x,apo.y)-(1+k.binary.e))<1e-12);
// Exercise the actual application update at both origin and Kepler-16's large distance.
const AU=1.495978707e11,M=k.stars.reduce((n,s)=>n+s.M,0);
for(const origin of [new V(),new V(1.5e18,-1.8e18,7e17)]){
 const sys={binary:k.binary,P:origin,e1:new V(1,0,0),e2:new V(0,1,0),planets:[],stars:k.stars.map(s=>({...s,r:k.binary.a*AU*(M-s.M)/M,P:new V()}))};
 const run=vm.createContext({Math,MOONS:[],EXO:[sys],orbitDemoDays:0,binaryPhase:phase});vm.runInContext(fn('updateMoonsExo'),run);
 for(let i=0;i<100;i++){
  const days=i*k.binary.P/100;run.updateMoonsExo(days*86400000);
  const offsets=sys.stars.map(s=>({x:s.P.x-origin.x,y:s.P.y-origin.y}));
  const cx=offsets.reduce((n,p,i)=>n+p.x*sys.stars[i].M,0)/M,cy=offsets.reduce((n,p,i)=>n+p.y*sys.stars[i].M,0)/M;
  assert(Math.hypot(cx,cy)<1024,'shared barycenter');
  const sep=Math.hypot(offsets[1].x-offsets[0].x,offsets[1].y-offsets[0].y),expected=k.binary.a*AU*Math.hypot(...Object.values(phase(k.binary,days)));
  assert(Math.abs(sep-expected)<1024,'star separation matches ellipse');
 }
}
const lum=k.stars.map(s=>s.R*s.R*Math.pow(s.T/5772,4));assert(lum[0]/lum[1]>25&&lum[0]/lum[1]<28,'primary dominates bolometric light');
assert(Math.abs(k.stars[0].R/k.stars[1].R-2.868)<.002);
const images=JSON.parse(fs.readFileSync(__dirname+'/stellar-image-manifest.json'));
assert.equal(images.length,2);assert.notEqual(images[0].sha256,images[1].sha256);
for(const image of images)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(__dirname+'/'+image.file)).digest('hex'),image.sha256);
console.log('PASS: Kepler-16 parameters, 200 barycentric states at near/far coordinates, elliptical separation, periodic motion, radius/luminosity ratios, and distinct stellar texture checksums.');
