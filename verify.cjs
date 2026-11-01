const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
for(const [,s] of scripts) new vm.Script(s);
function fn(name){
  const start=html.indexOf('function '+name+'('); assert(start>=0,name);
  let i=html.indexOf('{',start), depth=1, end=i+1;
  for(;depth;end++){ if(html[end]==='{')depth++; if(html[end]==='}')depth--; }
  return html.slice(start,end);
}
class Vec{
  constructor(x=0,y=0,z=0){this.set(x,y,z);}
  set(x,y,z){Object.assign(this,{x,y,z});return this;}
  copy(v){return this.set(v.x,v.y,v.z);}
  sub(v){this.x-=v.x;this.y-=v.y;this.z-=v.z;return this;}
  multiplyScalar(s){this.x*=s;this.y*=s;this.z*=s;return this;}
  divideScalar(s){return this.multiplyScalar(1/s);}
  addScaledVector(v,s){this.x+=v.x*s;this.y+=v.y*s;this.z+=v.z*s;return this;}
  length(){return Math.hypot(this.x,this.y,this.z);}
  normalize(){return this.divideScalar(this.length()||1);}
  cross(v){return this.set(this.y*v.z-this.z*v.y,this.z*v.x-this.x*v.z,this.x*v.y-this.y*v.x);}
}
const ctx=vm.createContext({assert,Math,Float32Array,console,Vec});
const elem=html.slice(html.indexOf('const ELEM ='),html.indexOf('function orbitFrame'));
vm.runInContext(`const DEG=Math.PI/180,AU=1.495978707e11;
const V=(...a)=>new Vec(...a),clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
${elem}\n${fn('orbitFrame')}\n${fn('orbitXYZ')}\n${fn('keplerE')}\n${fn('planetPos')}`,ctx);
vm.runInContext(`
for(const T of [-30,-2,0,0.2683,0.5,30,1e12,-1e8]){
  for(const key of Object.keys(ELEM)){
    const o=orbitFrame(ELEM[key],T),E=keplerE(o.M,o.e),p=planetPos(key,T,V());
    assert(Math.abs(E-o.e*Math.sin(E)-o.M)<1e-10,'Kepler residual '+key);
    const r=p.length()/AU; assert(Number.isFinite(r)&&r>=o.a*(1-o.e)-1e-8&&r<=o.a*(1+o.e)+1e-8,'orbital radius '+key);
    const peri=orbitXYZ(o,0,V()).length(),aphe=orbitXYZ(o,Math.PI,V()).length();
    assert(Math.abs(peri-o.a*(1-o.e))<1e-9); assert(Math.abs(aphe-o.a*(1+o.e))<1e-9);
  }
}
// Independent rounded J2000 Earth-Moon barycenter reference, AU.
const earth0=planetPos('emb',0,V()).divideScalar(AU);
assert(Math.abs(earth0.x-(-0.17717125))<1e-7); assert(Math.abs(earth0.y-0.96721448)<1e-7);
// NASA JPL Table 1: Neptune node rate, degrees per Julian century.
assert.equal(ELEM.neptune[11],-0.00508664);
const orbits=Object.keys(ELEM).map(key=>({userData:{key},geometry:{attributes:{position:{count:361,array:new Float32Array(1083),setXYZ(i,x,y,z){this.array.set([x,y,z],i*3);}}},computeBoundingSphere(){}}}));
let orbitEpoch=null;
${fn('refreshPlanetOrbits')}
for(const T of [-2,0,0.5,30]){
  refreshPlanetOrbits(T);
  for(const line of orbits){const expected=orbitXYZ(orbitFrame(ELEM[line.userData.key],T),0,V()),a=line.geometry.attributes.position.array;
    assert(Math.hypot(a[0]-expected.x,a[1]-expected.y,a[2]-expected.z)<1e-5,'date-matched orbit');
    assert(Math.hypot(a[0]-a[1080],a[1]-a[1081],a[2]-a[1082])<1e-5,'closed path');
  }
}
`,ctx);
vm.runInContext(`
const Z=V(0,0,1),X=V(1,0,0),F=V(4e17,1e17,-2e17);let lastD=1e10,reduceMotion=false;
const SHOW={stringColors:'bodies'},STR_ASPECT={},STR_COL={},beat=()=>0;
const _sa=V(),_sb=V(),_sd=V(),_sp1=V(),_sp2=V(),_sv=V();
const geometry=()=>({attributes:{position:{},color:{}},setDrawRange(s,n){this.count=n;}});
const QS={built:true,relinkT:100,seg:44,links:[{kind:'exo',a:{key:'a',pos:()=>V(F.x,F.y,F.z),col:[1,0,0]},b:{key:'b',pos:()=>V(F.x+1e9,F.y+2e9,F.z),col:[0,0,1]},m:2,ph:0.4}],pos:new Float32Array(264),col:new Float32Array(264),pp:new Float32Array(135),pc:new Float32Array(135),lines:{geometry:geometry(),material:{}},beads:{geometry:geometry(),material:{}}};
${fn('updateStrings')}
updateStrings(100,0.55,12);
assert.equal(QS.lines.geometry.count,88);assert.equal(QS.beads.geometry.count,45);
assert(Math.abs(QS.pp[132]-0.1)<1e-7 && Math.abs(QS.pp[133]-0.2)<1e-7,'distant endpoint precision');
assert(Math.abs(QS.pp[0])<1e-8&&Math.abs(QS.pp[1])<1e-8,'host attachment');
const before=QS.pp.slice(); updateStrings(100.1,0.55,12);
assert(before.some((v,i)=>Math.abs(v-QS.pp[i])>1e-5),'animated strings');
reduceMotion=true;updateStrings(100.1,0.55,12);const still=QS.pp.slice();updateStrings(100.2,0.55,12);
assert(still.every((v,i)=>v===QS.pp[i]),'reduced motion');
assert([...QS.pp,...QS.pos,...QS.col,...QS.pc].every(Number.isFinite),'finite geometry');
`,ctx);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const staticIds=html.slice(0,html.indexOf('<script')).matchAll(/\bid="([^"]+)"/g);
const unique=new Set();for(const [,id] of staticIds){assert(!unique.has(id),'duplicate ID '+id);unique.add(id);}
vm.runInContext(`
const qEl={value:'',setAttribute(){},removeAttribute(){}},resultsEl={innerHTML:'',hidden:true};
const SEARCH=[{name:'Pluto',hay:'pluto dwarf planet charon',grp:'sol',tag:'Dwarf planet'},{name:'Charon',hay:'charon pluto moon',grp:'moons',tag:'Moon'},{name:'Davida',hay:'davida asteroid',grp:'ast',tag:'Asteroid'},{name:'Ida',hay:'ida asteroid',grp:'ast',tag:'Asteroid'}];
const GRP_NAME={sol:'Planets',moons:'Moons',ast:'Asteroids'};let shown=[],active=0,catSel='all';const CATS=[['all','All']];
${fn('bodyDisplayName')}
${fn('renderResults')}
for(const query of ['Charon','Ida','Pluto','Davida']){qEl.value=query;renderResults();assert.equal(shown[0].name,query,'exact-name priority');}
qEl.value='not-an-object';renderResults();assert.equal(shown.length,0);
catSel='ast';SEARCH.forEach(it=>it.cat=it.grp);qEl.value='';renderResults();assert.deepEqual(shown.map(it=>it.name),['Davida','Ida'],'category filter');
`,ctx);
console.log('PASS: inline JavaScript syntax; 72 orbital solutions; J2000 reference; 36 date-matched closed orbit paths; quantum endpoints, animation, reduced motion, finite geometry; unique static IDs.');
console.log('PASS: exact-name search priority and empty search results.');
