/* LazyCard home page, routing and polish */
/* hero */
const hs={...DS,t:"aura",c:accent("aura")};paint($("#hcard"),hs,"aura");
document.querySelectorAll("[data-fb]").forEach(a=>{a.href=CFG.fb;a.target="_blank";a.rel="noopener"});
document.querySelectorAll("[data-price]").forEach(e=>{e.textContent=CFG.price||"Message us for the price";e.classList.toggle("np",!CFG.price)});
$("#soc").innerHTML=[["Facebook",CFG.fb],["Instagram",CFG.ig],["TikTok",CFG.tt]].filter(x=>x[1]).map(x=>`<a href="${x[1]}" target="_blank" rel="noopener">${x[0]}</a>`).join("");
document.querySelectorAll("[data-site]").forEach(a=>{a.href=CFG.site;a.target="_blank";a.rel="noopener"});
function replay(){const s=$("#st");s.classList.remove("run");void s.offsetWidth;s.classList.add("run")}
const tl=$("#tilt");
if(!matchMedia("(prefers-reduced-motion:reduce)").matches){tl.addEventListener("pointermove",e=>{const r=tl.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tl.style.setProperty("--ry",x*10+"deg");tl.style.setProperty("--rx",-y*8+"deg")});tl.addEventListener("pointerleave",()=>{tl.style.setProperty("--ry","0deg");tl.style.setProperty("--rx","0deg")})}
/* mix */
const M=mk(["name","role","co","phone","email","ig","li","loc","web"]);M.t="bento";M.c="#6C47FF";
const MP=[["phone","Phone"],["email","Email"],["wa","WhatsApp"],["web","Website"],["loc","Location"],["book","Booking"],["ig","Instagram"],["fb","Facebook"],["li","LinkedIn"],["tt","TikTok"],["x","X"],["yt","YouTube"],["gh","GitHub"],["tag","Tagline"],["av","Photo badge"],["badge","Status"],["note","Announcement"],["about","About"],["exp","Timeline"],["skills","Skills"],["svc","Services"],["hrs","Hours"],["tst","Reviews"],["links","Buttons"]];
function mixRender(){$("#pills").innerHTML=MP.map(([k,n])=>`<button data-k="${k}" aria-pressed="${!!M.on[k]}">${n}</button>`).join("");paint($("#mcard"),M,M.t)}
$("#pills").onclick=e=>{const b=e.target.closest("button");if(b){M.on[b.dataset.k]=!M.on[b.dataset.k];mixRender()}};
/* extras */
const root=document.documentElement;
const isDark=()=>root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
try{const t=localStorage.getItem("lc-theme");if(t)root.dataset.theme=t}catch(e){}
document.querySelectorAll(".tth").forEach(b=>b.onclick=()=>{const n=isDark()?"light":"dark";root.dataset.theme=n;try{localStorage.setItem("lc-theme",n)}catch(e){}});
function countUp(el){el.querySelectorAll("[data-n]").forEach(b=>{const n=+b.dataset.n,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1200);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)})}
function fit(){const st=$("#st"),w=document.querySelector(".hg").clientWidth,k=innerWidth>1000?1:Math.min(1,w/500);if(!w)return;st.style.transform=`scale(${k})`;st.style.transformOrigin="top left";tl.style.width=500*k+"px";tl.style.height=620*k+"px"}
addEventListener("resize",fit);fit();
addEventListener("scroll",()=>{const h=document.documentElement;$("#sp").style.width=(scrollY/Math.max(1,h.scrollHeight-innerHeight)*100)+"%"},{passive:true});
(function(){
 const st=$("#st"),n=$(".nfc"),pr=$(".prof");let ox,oy,tx,ty,sx,sy,k=1,down=false,moved=false,tm;
 const dist=()=>Math.hypot(tx,ty);
 function frame(snap){const d=dist();n.style.transform=`translate(${tx}px,${ty}px) rotate(${snap?-3:-3-Math.min(d,420)/420*19}deg) scale(${snap?.96:.9+Math.max(0,1-d/420)*.14})`;pr.style.setProperty("--r",Math.max(0,Math.min(165,(1-d/300)*200))+"%")}
 function resume(){clearTimeout(tm);n.style.cssText="";pr.style.removeProperty("--r");st.classList.remove("drag","ping");replay()}
 n.addEventListener("pointerdown",e=>{e.preventDefault();clearTimeout(tm);const m=new DOMMatrix(getComputedStyle(n).transform);ox=m.m41;oy=m.m42;tx=ox;ty=oy;st.classList.remove("run","ping");st.classList.add("drag");n.style.transition="none";sx=e.clientX;sy=e.clientY;k=st.getBoundingClientRect().width/500||1;down=true;moved=false;n.setPointerCapture(e.pointerId);frame()});
 n.addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;tx=ox+dx/k;ty=oy+dy/k;frame()});
 n.addEventListener("pointerup",()=>{if(!down)return;down=false;n.style.transition="transform .45s cubic-bezier(.2,.8,.2,1)";
  if(!moved){resume();return}
  if(dist()<85){tx=0;ty=0;frame(true);pr.style.setProperty("--r","165%");st.classList.add("ping");tm=setTimeout(resume,3800)}
  else{n.style.transform="translate(-275px,420px) rotate(-22deg) scale(.9)";pr.style.setProperty("--r","0%");tm=setTimeout(resume,700)}});
 n.addEventListener("pointercancel",()=>{if(down){down=false;resume()}});
 st.addEventListener("click",e=>{if(!e.target.closest(".nfc")&&!e.target.closest(".phone"))replay()});
 ["#hcard","#mcard","#card"].forEach(q=>{const el=$(q);if(el)el.addEventListener("click",e=>{if(e.target.closest("a"))e.preventDefault()})});
 const w=$("#c3dw"),c=$("#c3d");if(c){c.onclick=()=>c.classList.toggle("flip");c.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();c.classList.toggle("flip")}};
  if(!matchMedia("(prefers-reduced-motion:reduce)").matches){w.addEventListener("pointermove",e=>{const r=w.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;w.style.setProperty("--ry",x*22+"deg");w.style.setProperty("--rx",-y*18+"deg")});w.addEventListener("pointerleave",()=>{w.style.setProperty("--ry","0deg");w.style.setProperty("--rx","0deg")})}}
})();
/* routing: home, setup, and customer pages */
const RES=["setup","admin","index","api","home","favicon"];
let SLUGV="",VS=null,was=null;
const pathSlug=()=>{const m=location.pathname.match(/^\/([A-Za-z0-9-]{3,24})\/?$/);return m&&!RES.includes(m[1].toLowerCase())?m[1].toLowerCase():""};
function cur(){const h=location.hash;if(/^#k[0-9A-Za-z-]{16,}$/.test(h))return"vh";if(h==="#setup")return"setup";if(!h&&/^\/setup\/?$/.test(location.pathname))return"setup";if(!h&&SLUGV)return"vs";return"home"}
const PG={exec:"#0a152b",corp:"#eef0f6",aura:"#0a0820",mono:"#eceef3",term:"#080d1a",ticket:"#ffffff",bento:"#e9e5ff",sun:"#25134f"};
function pageColor(c){const h=document.documentElement;h.style.backgroundColor=c||"";document.body.style.backgroundColor=c||"";let m=document.querySelector("meta[name=theme-color]");if(!m){m=document.createElement("meta");m.name="theme-color";document.head.appendChild(m)}m.content=c||"#17132E"}
function paintView(st){VS=st;paint($("#vcard"),st,st.t);$("#view").style.setProperty("--a",st.c);const pg=st.t==="studio"?st.c:PG[st.t]||"#0b0a1a";$("#view").style.setProperty("--pg",pg);pageColor(pg);const nm=st.on.name&&st.v.name;document.title=(nm?nm+" | ":"")+"LazyCard";$("#vb").hidden=!fromSetup;revealView()}
function revealView(){const els=[...$("#vcard").querySelectorAll(".sx")];if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("on"));return}const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("on");io.unobserve(x.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}
let LBI=0,LBL2=[];
function lbShow(i){LBL2=[...$("#vcard").querySelectorAll(".gl img")];if(!LBL2.length)return;LBI=(i+LBL2.length)%LBL2.length;$("#lbi").src=LBL2[LBI].src;$("#lbc").textContent=(LBI+1)+" / "+LBL2.length;$("#lb").hidden=false;$("#lb").classList.toggle("one",LBL2.length<2)}
document.addEventListener("click",e=>{const i=e.target.closest("#vcard [data-lb]");if(i){lbShow(+i.dataset.i||0);return}if(e.target.closest("#lbp")){lbShow(LBI-1);return}if(e.target.closest("#lbn")){lbShow(LBI+1);return}if(e.target.closest("#lbx")||e.target.id==="lb"||e.target.id==="lbi")$("#lb").hidden=true});
document.addEventListener("keydown",e=>{if($("#lb").hidden)return;if(e.key==="Escape")$("#lb").hidden=true;if(e.key==="ArrowLeft")lbShow(LBI-1);if(e.key==="ArrowRight")lbShow(LBI+1)});
let lx=0;$("#lb").addEventListener("touchstart",e=>{lx=e.touches[0].clientX},{passive:true});$("#lb").addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-lx;if(Math.abs(d)>50)lbShow(LBI+(d<0?1:-1))},{passive:true});
function badCard(){$("#vcard").dataset.t="clean";$("#vcard").innerHTML='<h3 style="margin:auto 0 6px;text-align:center">This page was not found</h3><p class="role" style="text-align:center">Check the link, or make your own LazyCard.</p><a class="cta" style="margin:20px 0 auto;text-decoration:none" href="/#get">Get your LazyCard</a>'}
async function showHash(code){try{paintView(unpack(await dec(code)))}catch(e){badCard()}}
function pageUrl(){return SLUGV&&API.ok?location.origin+"/"+SLUGV:baseUrl()+"/"+location.hash}
function openShare(){const u=pageUrl();$("#qrbox").innerHTML=qrSvg(u,4);$("#qurl").textContent=u.replace(/^https?:\/\//,"").slice(0,60)+(u.length>60?"...":"");$("#qrm").hidden=false;$("#qrm").dataset.u=u}
$("#qx").onclick=()=>$("#qrm").hidden=true;$("#qrm").addEventListener("click",e=>{if(e.target.id==="qrm")e.target.hidden=true});
$("#qcp").onclick=()=>copyText($("#qrm").dataset.u,"Link copied");
$("#qsh").onclick=()=>{const u=$("#qrm").dataset.u;if(navigator.share)navigator.share({title:"My LazyCard",url:u}).catch(()=>{});else copyText(u,"Link copied")};
document.addEventListener("click",e=>{const a=e.target.closest("#vcard [data-act]");if(a){if(a.dataset.act==="save"&&VS)saveVcf(VS);if(a.dataset.act==="share")openShare();return}const w=e.target.closest("#vcard .pw");if(w){window.open(baseUrl()+"/#get","_blank");return}const c=e.target.closest("[data-copy]");if(c)copyText(c.dataset.copy,"Copied")});
function route(){const c=cur(),v=c==="vh"||c==="vs";document.body.classList.toggle("vm",v);document.body.classList.toggle("sv",c==="setup");if(!v)pageColor("");$("#view").hidden=!v;$("#home").hidden=c!=="home";$("#setup").hidden=c!=="setup";$("#pv").classList.remove("open");
 if(c==="vh"){showHash(location.hash.slice(2));scrollTo(0,0);was=null;return}
 if(c==="vs")return;
 document.title="LazyCard - Your business card, minus the paper";fromSetup=false;
 if(c==="home")fit();if(c==="setup")openSetup();
 if(was!==c&&(c==="setup"||location.hash==="#home"||!location.hash))scrollTo(0,0);was=c}
async function boot(){const sl=pathSlug();
 if(sl){document.body.classList.add("vm");$("#view").hidden=false;$("#home").hidden=true;$("#vcard").dataset.t="clean";$("#vcard").innerHTML='<p class="role" style="margin:auto;text-align:center">Loading...</p>';
  await API.ping();
  if(API.ok){SLUGV=sl;const d=await API.get(sl);if(d){paintView(unpack(d));try{if(!sessionStorage.getItem("h-"+sl)){sessionStorage.setItem("h-"+sl,1);API.hit(sl)}}catch(e){}}else badCard();route();return}
  document.body.classList.remove("vm");$("#view").hidden=true}
 else API.ping().then(()=>{if(cur()==="setup")openSetup()});
 route()}
mixRender();addEventListener("hashchange",route);boot();
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("on");if(x.target.classList.contains("dash"))countUp(x.target);io.unobserve(x.target)}}),{threshold:.12});document.querySelectorAll(".sec>h2,.sec>.sub,.how div,.mix>div,.meet>*,.opt,.faq details,.cta h2").forEach((e,i)=>{e.classList.add("rv");e.style.transitionDelay=(i%4)*.1+"s";io.observe(e)})}
/* polish */
function onScroll(){const y=scrollY,h=!$("#home").hidden;$("#snav").classList.toggle("on",h&&y>520);$("#mcta").classList.toggle("on",h&&y>620);$(".hero").style.setProperty("--py",Math.min(y,1400))}
addEventListener("scroll",onScroll,{passive:true});addEventListener("hashchange",()=>setTimeout(onScroll,30));onScroll();
const mm=$("#mm");function closeMM(){mm.hidden=true;document.body.style.overflow=""}
document.querySelectorAll(".bg").forEach(b=>b.onclick=()=>{mm.hidden=false;document.body.style.overflow="hidden"});
$("#mx").onclick=closeMM;mm.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMM));addEventListener("keydown",e=>{if(e.key==="Escape")closeMM()});
document.querySelectorAll(".opt,.how div").forEach(e=>e.addEventListener("pointermove",ev=>{const r=e.getBoundingClientRect();e.style.setProperty("--mx",ev.clientX-r.left+"px");e.style.setProperty("--my",ev.clientY-r.top+"px")}));
function cardImages(f,b){const set=(q,u)=>document.querySelectorAll(q).forEach(e=>{e.style.backgroundImage=u?`url("${u}")`:"";e.style.backgroundSize=u?"cover":"";e.style.backgroundPosition=u?"center":"";e.classList.toggle("img",!!u)});set(".nfc, .cfc.f",f);set(".cfc.bk",b)}
cardImages(CFG.cardFront,CFG.cardBack);
let AF="",AB="";const rd=(i,fn)=>i.onchange=()=>{const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>fn(r.result);r.readAsDataURL(f)};
rd($("#af"),u=>{AF=u;cardImages(AF||CFG.cardFront,AB||CFG.cardBack)});rd($("#ab"),u=>{AB=u;cardImages(AF||CFG.cardFront,AB||CFG.cardBack)});
$("#ax").onclick=()=>{AF=AB="";cardImages(CFG.cardFront,CFG.cardBack)};
function adm(){const on=location.hash==="#admin";$("#adm").hidden=!on;if(on)$("#c3dw").scrollIntoView({block:"center"})}adm();addEventListener("hashchange",adm);

