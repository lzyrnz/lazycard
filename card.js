/* LazyCard: data, card rendering, images, API (shared by every page) */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const TP=[["exec","Executive","Navy and gold. Quiet authority.","#E8C27A"],["corp","Corporate","Brand banner and logo mark.","#3D5AFE"],["aura","Aura","Glowing glass for tech teams.","#7C4DFF"],["mono","Mono Grid","Bold outlines, quick-tap tiles.","#FF5C3A"],["studio","Studio","Oversized name for creatives.","#3D5AFE"],["bento","Bento","Tidy tiles in one glance.","#6C47FF"],["ticket","Boarding Pass","Your name, ready for departure.","#FF5C3A"],["term","Terminal","For people who live in a shell.","#7DD3FC"],["sun","Sunset","Warm gradient poster.","#6A3DF0"]];
const CO=["#5A4BFF","#FF5C3A","#12A594","#E0357A","#3D5AFE","#F2A900","#1F2A44","#8E4EC6"];
const u=b=>v=>/^https?:\/\//.test(v)?v:b?b+v.replace(/^@/,""):"https://"+v;
const F=[["name","Full name","Alex Morgan","id"],["role","Job title","Operations Director","id"],["co","Company","Northwind Group","id"],["tag","Tagline","Making complex work feel simple.","id"],
["phone","Phone","+00 000 000 0000","c"],["email","Email","alex@northwind.com","c"],["wa","WhatsApp","+00 000 000 0000","c"],["web","Website","northwind.com","c"],["loc","Location","Your City","c"],["book","Booking link","cal.com/alex","c"],
["ig","Instagram","@alexmorgan","s"],["fb","Facebook","alex.morgan","s"],["li","LinkedIn","alex-morgan","s"],["tt","TikTok","@alexmorgan","s"],["x","X","@alexmorgan","s"],["yt","YouTube","@alexmorgan","s"],["gh","GitHub","alexmorgan","s"]];
const LK={phone:["p",v=>"tel:"+v.replace(/[^\d+]/g,"")],email:["e",v=>"mailto:"+v],wa:["WA",v=>"https://wa.me/"+v.replace(/\D/g,"")],web:["w",u("")],loc:["l",v=>/^https?:\/\//i.test(v)?v:"https://maps.google.com/?q="+encodeURIComponent(v)],book:["c",u("")],ig:["ig",u("https://instagram.com/")],fb:["f",u("https://facebook.com/")],li:["in",u("https://linkedin.com/in/")],tt:["TT",u("https://tiktok.com/@")],x:["X",u("https://x.com/")],yt:["yt",u("https://youtube.com/")],gh:["GH",u("https://github.com/")]};
const IC={p:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',e:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',w:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',l:'<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',c:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',ig:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7"/>',yt:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>'};
const ib=k=>IC[k]?`<em class="ib"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg></em>`:`<em class="ib">${k}</em>`;

const SECS=[["about","About me","A short intro in your own words","text"],["exp","Experience","A timeline of where you have worked","list"],["edu","Education","Schools, courses, and training","list"],["skills","Skills","Shown as tags","chips"],["svc","Services","What you offer, with optional prices","list"],["gal","Gallery","Photos of your work, products, or place","gal"],["tst","Reviews","Kind words from clients or customers","list"],["hrs","Opening hours","When people can reach or visit you","list"],["links","Custom buttons","Menu, portfolio, order page, anything","list"],["pay","Payment details","GCash, bank, PayPal. People can copy them","list"],["lang","Languages","Shown as tags","chips"],["cert","Certifications","Shown as tags","chips"],["badge","Status badge","Open to work, Now hiring, Open today","badge"],["note","Announcement","A short banner at the top of your page","text"]];
const LS={exp:[["t","Job title"],["o","Company"],["p","Period"],["d","What you did","area"]],edu:[["t","Course or degree"],["o","School"],["p","Years"],["d","Notes","area"]],svc:[["t","Service"],["d","Short description"],["p","Price (optional)"]],tst:[["q","What they said","area"],["n","Their name"]],hrs:[["d","Days"],["h","Hours"]],links:[["l","Button label"],["u","Link"]],pay:[["l","Label"],["v","Number or link"]]};
const BADGES=["Open to work","Accepting clients","Open now","Now hiring","Available weekends"];
const XS={about:"I help teams turn complicated projects into simple, finished work. Ten years in operations, always up for a good coffee and a better process.",skills:"Project management, Operations, Training, Budgeting",lang:"English, Filipino",cert:"PMP Certified, Lean Six Sigma Green Belt",note:"Now booking for December",badge:"Open to work",
exp:[{t:"Operations Director",o:"Northwind Group",p:"2021 - Present",d:"Lead a team of 24 across three regions."},{t:"Operations Manager",o:"Brightline Co.",p:"2017 - 2021",d:"Cut delivery times by 30 percent."},{t:"Analyst",o:"Harbor & Co.",p:"2014 - 2017",d:"Built the reporting the whole team still uses."}],
edu:[{t:"BS Business Administration",o:"State University",p:"2010 - 2014",d:""}],
svc:[{t:"Consultation",d:"A focused 30 minute call",p:"Free"},{t:"Process review",d:"We map and fix your workflow",p:"From 1,500"},{t:"Team training",d:"Half day workshop",p:"From 5,000"}],
tst:[{q:"Alex made our whole process feel effortless.",n:"Jamie, client"}],
hrs:[{d:"Mon - Fri",h:"9:00 AM - 6:00 PM"},{d:"Saturday",h:"10:00 AM - 2:00 PM"},{d:"Sunday",h:"Closed"}],
links:[{l:"Book a call",u:"cal.com/alex"},{l:"View my portfolio",u:"northwind.com/work"}],
pay:[{l:"GCash",v:"0900 000 0000"}]};
const ALLK=[...F.map(f=>f[0]),...SECS.map(x=>x[0]),"av","cv"];
const emptyX=()=>({about:"",skills:"",lang:"",cert:"",note:"",badge:"",exp:[],edu:[],svc:[],tst:[],hrs:[],links:[],pay:[]});
const mk=(on=[],blank)=>({t:"exec",c:CO[0],k:"call",v:Object.fromEntries(F.map(f=>[f[0],blank?"":f[2]])),on:Object.fromEntries(ALLK.map(k=>[k,on.includes(k)])),img:{av:"",cv:"",gal:[]},x:blank?emptyX():JSON.parse(JSON.stringify(XS)),slug:"",published:false,pubSlug:"",lbl:{},cvp:"c",avp:"t"});
/* preview only: empty switched-on items show sample text until the customer types their own */
function demo(s){const c={...s,v:{...s.v},x:{...s.x}};F.forEach(f=>{if(c.on[f[0]]&&!String(c.v[f[0]]||"").trim())c.v[f[0]]=f[2]});SECS.forEach(([k,,,tp])=>{if(!c.on[k]||k==="gal")return;const v=c.x[k];if(tp==="list"){if(!T(v).length)c.x[k]=JSON.parse(JSON.stringify(XS[k]))}else if(!v||!String(v).trim())c.x[k]=XS[k]});return c}
const ON0=["name","role","co","tag","phone","email","ig","li","loc","web","av"];
const DS=mk(ON0);
const accent=k=>TP.find(x=>x[0]===k)[3];
const safeImg=v=>/^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+\/=]+$/.test(v||"")?v:"";
const T=a=>(Array.isArray(a)?a:[]).filter(i=>i&&Object.values(i).some(v=>String(v).trim()));
const chipsOf=v=>String(v||"").split(",").map(z=>z.trim()).filter(Boolean);
const nl2=v=>esc(v).replace(/\n/g,"<br>");
const LBL=new Set(["wa","web","loc","book","ig","fb","li","tt","x","yt","gh"]);
const POS={t:"12%",c:"50%",b:"88%"};
function pretty(k,v){if(!/^https?:\/\//i.test(v)&&!/\.[a-z]{2,}\//i.test(v))return v;let t=v.replace(/^https?:\/\/(www\.)?/i,"").replace(/[?#].*$/,"").replace(/\/+$/,"");const seg=t.split("/").filter(Boolean);if(["ig","tt","x","yt","gh","fb","li"].includes(k)&&seg.length>1){const h=seg[seg.length-1].replace(/^@/,"");return(["ig","tt","x","yt","gh"].includes(k)?"@":"")+h}return t}
function card(s,t){
 const g=k=>s.on[k]&&String(s.v[k]||"").trim()?String(s.v[k]).trim():"";
 const x=s.x||{},on=k=>s.on[k],im=s.img||{};
 const co=g("co"),nm=g("name"),av=on("av")?safeImg(im.av):"",cv=on("cv")?safeImg(im.cv):"";
 const ban=co?`<div class="ban"><span class="lg">${esc(co[0].toUpperCase())}</span>${esc(co)}</div>`:"";
 const ph=on("av")?`<div class="ph${av?" im":""}" ${av?`style="background-image:url('${av}');background-position:center ${POS[s.avp||"t"]}"`:""}>${av?"":esc((nm||co||"A")[0].toUpperCase())}</div>`:"";
 const cover=cv&&t!=="corp"?`<div class="cover" style="background-image:url('${cv}');background-position:center ${POS[s.cvp||"c"]}"></div>`:"";
 const note=on("note")&&x.note&&x.note.trim()?`<div class="nt">${esc(x.note.trim())}</div>`:"";
 const badge=on("badge")&&x.badge&&x.badge.trim()?`<div class="bd2">${esc(x.badge.trim())}</div>`:"";
 let n=0,sn=0;const lab=k=>{const l=String((s.lbl&&s.lbl[k])||"").trim();return l||(LBL.has(k)?pretty(k,g(k)):g(k))};
 const li=F.filter(f=>f[3]!=="id"&&g(f[0])).map(f=>{const[i,fn]=LK[f[0]];return `<li style="--i:${n++}"><a href="${esc(fn(g(f[0])))}" target="_blank" rel="noopener">${ib(i)}<span>${esc(lab(f[0]))}</span></a></li>`}).join("")
  +(on("links")?T(x.links).filter(i=>i.l&&i.u).map(i=>`<li style="--i:${n++}"><a href="${esc(u("")(String(i.u).trim()))}" target="_blank" rel="noopener">${ib("↗")}<span>${esc(i.l)}</span></a></li>`).join(""):"");
 const SX=(h,b)=>`<section class="sx" style="--i:${sn++}"><h4>${h}</h4>${b}</section>`;
 const tl=a=>`<ol class="tl">${a.map((i,k)=>`<li style="--j:${k}"><b>${esc(i.t)}</b>${i.o?`<span class="o">${esc(i.o)}</span>`:""}${i.p?`<em>${esc(i.p)}</em>`:""}${i.d?`<p>${esc(i.d)}</p>`:""}</li>`).join("")}</ol>`;
 const chips=v=>`<div class="chips2">${chipsOf(v).map(c=>`<span>${esc(c)}</span>`).join("")}</div>`;
 let sx="";
 if(on("about")&&x.about&&x.about.trim())sx+=SX("About",`<p>${nl2(x.about.trim())}</p>`);
 if(on("exp")&&T(x.exp).length)sx+=SX("Experience",tl(T(x.exp)));
 if(on("edu")&&T(x.edu).length)sx+=SX("Education",tl(T(x.edu)));
 if(on("skills")&&chipsOf(x.skills).length)sx+=SX("Skills",chips(x.skills));
 if(on("svc")&&T(x.svc).length)sx+=SX("Services",T(x.svc).map(i=>`<div class="sv"><div><b>${esc(i.t)}</b>${i.d?`<small>${esc(i.d)}</small>`:""}</div>${i.p?`<span>${esc(i.p)}</span>`:""}</div>`).join(""));
 const gal=on("gal")?(im.gal||[]).map(safeImg).filter(Boolean):[];
 if(gal.length)sx+=SX("Gallery",`<div class="gl">${gal.map(v=>`<img src="${v}" alt="" loading="lazy" data-lb>`).join("")}</div>`);
 if(on("tst")&&T(x.tst).length)sx+=SX("Reviews",T(x.tst).map(i=>`<blockquote><p>${esc(i.q)}</p>${i.n?`<cite>${esc(i.n)}</cite>`:""}</blockquote>`).join(""));
 if(on("hrs")&&T(x.hrs).length)sx+=SX("Opening hours",T(x.hrs).map(i=>`<div class="hr"><span>${esc(i.d)}</span><b>${esc(i.h)}</b></div>`).join(""));
 if(on("pay")&&T(x.pay).length)sx+=SX("Payment",T(x.pay).map(i=>`<div class="hr"><span>${esc(i.l)}</span><b>${esc(i.v)}</b><button class="cpy" type="button" data-copy="${esc(i.v)}">Copy</button></div>`).join(""));
 if(on("lang")&&chipsOf(x.lang).length)sx+=SX("Languages",chips(x.lang));
 if(on("cert")&&chipsOf(x.cert).length)sx+=SX("Certifications",chips(x.cert));
 const id=`${nm?`<h3 style="--n:${[...nm].length}">${esc(nm)}</h3>`:""}${g("role")?`<p class="role">${esc(g("role"))}</p>`:""}${badge}${g("tag")?`<p class="tg">${esc(g("tag"))}</p>`:""}<ul>${li}</ul><div class="ctas"><span class="cta" data-act="save">Save contact</span><span class="cta gh" data-act="share">Share</span></div>${sx}<p class="pw">Powered by LazyCard</p>`;
 if(t==="corp")return `<div class="hd" ${cv?`style="background-image:linear-gradient(120deg,rgba(10,8,30,.55),rgba(10,8,30,.15)),url('${cv}');background-size:cover;background-position:center ${POS[s.cvp||"c"]}"`:""}>${ban}${note}</div><div class="bd">${ph}${id}</div>`;
 return cover+note+ban+ph+id;
}
const onColor=c=>{const v=parseInt(String(c).slice(1),16),r=v>>16&255,g=v>>8&255,b=v&255;return(.299*r+.587*g+.114*b)>165?"#14121f":"#ffffff"};
function paint(el,s,t){el.dataset.t=t;el.dataset.k=s.k||"call";el.style.setProperty("--a",s.c);el.style.setProperty("--on",onColor(s.c));el.innerHTML=card(s,t)}
const thumb=(k,sc)=>`<div class="sc" style="--s:${sc}"><div class="card" data-t="${k}" data-k="call" style="--a:${accent(k)};--on:${onColor(accent(k))}">${card(DS,k)}</div></div>`;
let tmr;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tmr);tmr=setTimeout(()=>t.classList.remove("on"),2400)}
function burst(){if(reduce)return;const c=[...CO,"#E8C27A","#fff"];for(let i=0;i<36;i++){const e=document.createElement("span");e.className="cf";e.style.left=Math.random()*100+"vw";e.style.background=c[i%c.length];e.style.animationDelay=Math.random()*.4+"s";e.style.animationDuration=1.5+Math.random()*1.2+"s";document.body.appendChild(e);setTimeout(()=>e.remove(),3200)}}
function copyText(t,ok="Copied"){try{navigator.clipboard.writeText(t).then(()=>toast(ok),()=>toast("Select the text and copy it"))}catch(e){toast("Select the text and copy it")}}
function shrink(file,max,q,sq,type){return new Promise((res,rej)=>{const r=new FileReader();r.onerror=rej;r.onload=()=>{const im=new Image();im.onerror=rej;im.onload=()=>{let sw=im.width,sh=im.height,sx=0,sy=0;if(sq){const m=Math.min(sw,sh);sx=(sw-m)/2;sy=(sh-m)/2;sw=sh=m}const k=Math.min(1,max/Math.max(sw,sh)),w=Math.round(sw*k),h=Math.round(sh*k),c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(im,sx,sy,sw,sh,0,0,w,h);let d=c.toDataURL(type||"image/jpeg",q);if(!/^data:image\/(png|jpeg|webp)/.test(d))d=c.toDataURL("image/jpeg",q);res(d)};im.src=r.result};r.readAsDataURL(file)})}
const API={ok:false,
 async req(method,qs,body){const c=new AbortController(),t=setTimeout(()=>c.abort(),6000);try{const r=await fetch("/api/card"+(qs||""),{method,signal:c.signal,cache:"no-store",headers:body?{"content-type":"application/json"}:undefined,body:body?JSON.stringify(body):undefined});let j=null;try{j=await r.json()}catch(e){}return{status:r.status,j}}catch(e){return{status:0,j:null}}finally{clearTimeout(t)}},
 async ping(){const r=await this.req("GET","?ping=1");this.ok=!!(r.j&&r.j.ok);return this.ok},
 async free(slug){const r=await this.req("GET","?check=1&slug="+encodeURIComponent(slug));return !!(r.j&&r.j.free)},
 async get(slug){const r=await this.req("GET","?slug="+encodeURIComponent(slug));return r.status===200&&r.j?r.j.data:null},
 save(slug,pin,data){return this.req("POST","",{slug,pin,data})},
 login(slug,pin){return this.req("POST","",{action:"login",slug,pin})},
 hit(slug){return this.req("POST","",{action:"hit",slug})}};
const AL="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-";
function pack(S,withImg){
 const o={};F.forEach(f=>{const k=f[0],v=String(S.v[k]||"").trim();if(S.on[k]&&v)o[k]=v});
 const x={};SECS.forEach(([k,,,tp])=>{if(!S.on[k]||k==="gal")return;const v=S.x[k];if(tp==="list"){const a=T(v);if(a.length)x[k]=a}else if(v&&String(v).trim())x[k]=String(v).trim()});
 const lb={};LBL.forEach(k=>{const l=String((S.lbl||{})[k]||"").trim();if(S.on[k]&&o[k]&&l)lb[k]=l});
 const j={v:2,t:Math.max(0,TP.findIndex(z=>z[0]===S.t)),c:S.c,k:S.k,a:S.on.av?1:0,o,x};if(Object.keys(lb).length)j.l=lb;if(S.cvp&&S.cvp!=="c")j.cp=S.cvp;if(S.avp&&S.avp!=="t")j.ap=S.avp;
 if(withImg){const i={};if(S.on.av&&S.img.av)i.av=S.img.av;if(S.on.cv&&S.img.cv)i.cv=S.img.cv;if(S.on.gal&&S.img.gal.length)i.gal=S.img.gal;if(Object.keys(i).length)j.i=i}
 return j}
function unpack(j){
 const st=mk([],true);st.t=(TP[j.t]||TP[0])[0];st.c=/^#[0-9a-f]{6}$/i.test(j.c)?j.c:CO[0];st.k=j.k==="biz"?"biz":"call";
 const im=j.i||{};st.on.av=!!(j.a||j.p||im.av);if(im.av)st.img.av=safeImg(im.av);
 if(im.cv){st.img.cv=safeImg(im.cv);st.on.cv=!!st.img.cv}
 if(Array.isArray(im.gal)){st.img.gal=im.gal.map(safeImg).filter(Boolean).slice(0,6);st.on.gal=st.img.gal.length>0}
 for(const k in (j.o||{})){if(F.some(f=>f[0]===k)){st.v[k]=String(j.o[k]).slice(0,300);st.on[k]=true}}
 for(const k in (j.l||{})){if(LBL.has(k))st.lbl[k]=String(j.l[k]).slice(0,80)}
 if(["t","c","b"].includes(j.cp))st.cvp=j.cp;if(["t","c","b"].includes(j.ap))st.avp=j.ap;
 for(const [k,,,tp] of SECS){const v=(j.x||{})[k];if(v==null||k==="gal")continue;if(tp==="list"&&LS[k]){st.x[k]=T(v).slice(0,20).map(i=>Object.fromEntries(LS[k].map(([f])=>[f,String(i[f]||"").slice(0,600)])));st.on[k]=true}else if(tp!=="list"){st.x[k]=String(v).slice(0,2000);st.on[k]=true}}
 return st}
async function enc(obj){const raw=new TextEncoder().encode(JSON.stringify(obj));let f=0,b=raw;if(window.CompressionStream){try{b=new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer());f=1}catch(e){b=raw;f=0}}let n=1n;for(const x of [f,...b])n=n*256n+BigInt(x);let r="";while(n>0n){r=AL[Number(n%63n)]+r;n/=63n}return r}
async function dec(t){let n=0n;for(const ch of t){const i=AL.indexOf(ch);if(i<0)throw 0;n=n*63n+BigInt(i)}const a=[];while(n>1n){a.push(Number(n%256n));n/=256n}a.reverse();let b=new Uint8Array(a.slice(1));if(a[0]===1)b=new Uint8Array(await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer());return JSON.parse(new TextDecoder().decode(b))}
const baseUrl=()=>API.ok?location.origin:CFG.site;
function saveVcf(S){const g=k=>S.on[k]&&String(S.v[k]||"").trim()?String(S.v[k]).trim():"";const c=t=>String(t).replace(/[\r\n;,]/g," ");
 const L=["BEGIN:VCARD","VERSION:3.0","FN:"+c(g("name")||g("co")||"Contact")];if(g("co"))L.push("ORG:"+c(g("co")));if(g("role"))L.push("TITLE:"+c(g("role")));if(g("phone"))L.push("TEL;TYPE=CELL:"+c(g("phone")));if(g("email"))L.push("EMAIL:"+c(g("email")));if(g("web"))L.push("URL:"+LK.web[1](g("web")));if(g("loc"))L.push("ADR;TYPE=WORK:;;"+c(g("loc"))+";;;;");if(g("tag"))L.push("NOTE:"+c(g("tag")));L.push("END:VCARD");
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([L.join("\r\n")],{type:"text/vcard"}));a.download=(g("name")||"contact").replace(/[^\w-]+/g,"-")+".vcf";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);toast("Contact file ready")}
