const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
function fn(name){const start=html.indexOf('function '+name+'(');assert(start>=0,name);let p=html.indexOf('{',start),depth=1,end=p+1;for(;depth;end++){if(html[end]==='{')depth++;if(html[end]==='}')depth--;}return html.slice(start,end);}
const scr={x:0,y:0},positions={system:{x:0,y:0},star:{x:4,y:0}};
const c=vm.createContext({Math,scr,BODY_ORDER:['system','star'],BODY:{system:{R:100,sys:{}},star:{R:2}},patch:{visible:false},camWorld:{distanceTo:()=>1},pixPerRad:1,DPR:1,bodyPos:k=>positions[k],screenOf:p=>(Object.assign(scr,p),true),occluded:()=>false,labelVisible:()=>true});
vm.runInContext(fn('pickAt'),c);
assert.equal(c.pickAt(12,0),'star','A nearby stellar disc must win over the enclosing system');
assert.equal(c.pickAt(90,0),'system','The system remains selectable outside its stars');
assert.equal(c.pickAt(200,0),null,'Empty sky remains empty');
vm.runInContext(fn('bodyDisplayName'),c);
assert.equal(c.bodyDisplayName('x:kepler16b','Kepler-16 B'),'Kepler-16 B (star)');
assert.equal(c.bodyDisplayName('x:k16b','Kepler-16b'),'Kepler-16b (planet)');
console.log('PASS: stellar disc selection takes priority over system; system fallback and empty sky; explicit star/planet names.');
