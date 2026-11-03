const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=__dirname,html=fs.readFileSync(root+'/index.html','utf8');
function array(name,end){const start=html.indexOf('const '+name+' = [');assert(start>=0,name);return vm.runInNewContext(html.slice(start,html.indexOf(end,start))+`;${name}`,{}, {timeout:1000});}
const dwarfs=array('DWARFS','function dwarfOrbit');
const moons=array('MOONS','const PNAME');
const exo=array('EXO','EXO.forEach');
const keys=[...dwarfs.map(d=>d.k),...moons.map(m=>m[1]),...exo.flatMap(s=>s.planets.map(p=>p[0]))];
assert.equal(keys.length,46);assert.equal(new Set(keys).size,46);
const manifest=JSON.parse(fs.readFileSync(root+'/body-image-manifest.json'));
assert.equal(manifest.length,46);
const hashes=new Set();
for(const key of keys){
 const a=manifest.find(m=>m.key===key);assert(a,'Missing image '+key);
 assert.equal(a.file,'img/body-'+key+'.jpg');
 const bytes=fs.readFileSync(root+'/'+a.file),hash=crypto.createHash('sha256').update(bytes).digest('hex');
 assert.equal(hash,a.sha256);assert(!hashes.has(hash),'Duplicate '+key);hashes.add(hash);
 assert.equal(a.portraitWidth,3840);assert.equal(a.portraitHeight,2160);
}
assert(!/map:craterTex[, }]/.test(html),'Shared lunar map is assigned to other worlds');
assert(!html.includes('hotJupiterTex'),'Shared exoplanet map remains');
assert(html.includes("registerBodyArt('moon',moonMesh)"));
const portraits=h=>h.match(/<script>window.PLANET_IMG=.*?<\/script>/)[0];
assert.equal(crypto.createHash('sha256').update(portraits(html)).digest('hex'),'f4e4969807c637c670b64e6820fb384568cb9f54fa7cf34c90f792d304961f54','Original major-planet images changed');
console.log('PASS: all 46 replacement bodies covered; independent filenames and SHA-256 hashes; 4K output; original 10 major portraits preserved; lunar map preserved; no shared moon/exoplanet assignments.');
