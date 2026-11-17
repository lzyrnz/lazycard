/* LazyCard setup wizard (this is the page your Lazy cards open first) */
let S=mk(["name","role","co","tag","phone","email","av"],true),step=0,LINK="",fromSetup=false;const INFO={},OPEN={};
try{const x=localStorage.getItem("lc8");if(x){const p=JSON.parse(x);S={...S,...p,v:{...S.v,...p.v},on:{...S.on,...p.on},x:{...S.x,...(p.x||{})},img:{...S.img,...(p.img||{})},lbl:{...(p.lbl||{})},dirty:{...(p.dirty||{})}}}}catch(e){}
const sv=()=>{const c={...S};delete c.pin;try{localStorage.setItem("lc8",JSON.stringify(c))}catch(e){try{c.img={av:"",cv:"",gal:[]};localStorage.setItem("lc8",JSON.stringify(c))}catch(e2){}}};
let pq=0;const paintSoon=()=>{cancelAnimationFrame(pq);pq=requestAnimationFrame(()=>paint($("#card"),demo(S),S.t))};
const ST=["Style","Details","Links","Extras","Publish"];
const TT=[["Pick your style","Choose the kind of page, the design, and your color."],["Your details","The basics people see first."],["Contact and links","Add only what you want people to use."],["Extras","Optional sections to tell your story. Add as few or as many as you like."],["Publish your page","Choose your link, then save it on your Lazy card."]];
const SHORT={phone:"Phone",email:"Email",wa:"WhatsApp",web:"Website",loc:"Location",book:"Booking",ig:"Instagram",fb:"Facebook",li:"LinkedIn",tt:"TikTok",x:"X",yt:"YouTube",gh:"GitHub"};
const CONTACT=["phone","email","wa","web","loc","book"],SOCIAL=["ig","fb","li","tt","x","yt","gh"];
const REC={call:["about","exp","skills","edu"],biz:["svc","hrs","tst","gal","links"]};
const LBLPH={wa:"e.g. Message me",web:"e.g. My portfolio",loc:"e.g. Lipa City, Batangas",book:"e.g. Book a call",ig:"e.g. Mika Designs",fb:"e.g. Alex Morgan",li:"e.g. Alex Morgan",tt:"e.g. Mika Designs",x:"e.g. Mika Designs",yt:"e.g. My channel",gh:"e.g. My code"};
const LB=()=>S.k==="biz"?{name:"Business or person name",role:"What you do",co:"Business name"}:{};
const dom=()=>{try{return new URL(baseUrl()).host}catch(e){return"lazycard.netlify.app"}};
function qrSvg(url,cell=3){try{const q=qrcode(0,"L");q.addData(url);q.make();return q.createSvgTag({cellSize:cell,margin:2,scalable:true})}catch(e){return""}}
function setPath(o,path,val){const p=path.split("."),n=k=>/^\d+$/.test(k)?+k:k;let c=o;for(let i=0;i<p.length-1;i++)c=c[n(p[i])];c[n(p[p.length-1])]=val}
const LOGO=`<span class="lm"><svg viewBox="0 0 40 28" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M18 10.5a5 5 0 0 1 0 7"/><path d="M23 7a10 10 0 0 1 0 14"/><path d="M28 3.5a15 15 0 0 1 0 21"/></g><circle cx="11" cy="14" r="2.6" fill="#fff"/></svg></span>`;
const introHTML=()=>`<section class="intro2"><div class="i2t"><div class="i2h">${LOGO}<b>LazyCard</b></div><h3>Your Lazy card, your page.</h3><p>Tap once on any phone and a page that is entirely yours opens: your photo, your links, your story. Build it here in about five minutes.</p></div><div class="i2s" aria-hidden="true"><div class="i2c"></div><div class="i2p"><span class="i2a"></span><span class="i2l a"></span><span class="i2l b"></span><span class="i2l c"></span></div><span class="i2r"></span><span class="i2r r2"></span></div><ol class="i2k"><li><b>Pick a style</b><span>Calling or business card, nine designs</span></li><li><b>Add your details</b><span>Photo, links and extras</span></li><li><b>Publish and tap</b><span>Save the link on your card</span></li></ol><div class="i2n"><span>Have ready</span><i>A photo or logo</i><i>Your links</i><i>About five minutes</i></div></section>`;
function openPV(){$("#pv").classList.add("open");document.documentElement.style.overflow="hidden";document.body.style.overflow="hidden"}
function closePV(){const p=$("#pv");if(p)p.classList.remove("open");document.documentElement.style.overflow="";document.body.style.overflow=""}
const POSL=[["t","Top"],["c","Center"],["b","Bottom"]];
const seg=(key,label)=>`<div class="seg"><span>${label}</span>${POSL.map(([v,l])=>`<button data-pos="${key}.${v}" aria-pressed="${(S[key]||(key==="avp"?"t":"c"))===v}">${l}</button>`).join("")}</div>`;
function field(k){const f=F.find(x=>x[0]===k),lb=LB()[k]||f[1];return `<label class="f">${esc(lb)}<input data-v="${k}" value="${esc(S.v[k])}" placeholder="${esc(f[2])}" autocomplete="off"></label>`}
function imgBlock(key){const im=S.img[key],biz=S.k==="biz",isAv=key==="av";
 const title=isAv?(biz?"Logo":"Photo"):"Cover image",hint=isAv?(biz?"Your logo. A square picture works best.":"A clear photo of your face."):"A wide picture across the top. Optional.";
 return `<div class="img ${im?"has":""}"><label class="imgp" ${im?`style="background-image:url('${blobUrl(im)}')"`:""}><span>${im?"":"+"}</span><input type="file" accept="image/*" data-up="${key}" aria-label="Choose ${title}"></label><div class="imgi"><b>${title}</b><span class="fh">${hint}</span>${INFO[key]?`<span class="okt">Optimized to ${INFO[key]}</span>`:""}${im?`<div class="imgb"><label class="btn g sm">Change<input type="file" accept="image/*" data-up="${key}" hidden></label><button class="btn g sm" data-rm="${key}">Remove</button></div>`:""}</div></div>${im&&(key==="cv"||(isAv&&!biz))?seg(isAv?"avp":"cvp","Focus on"):""}`}
function lrow(k){const f=F.find(x=>x[0]===k),lb=LB()[k]||f[1],can=LBL.has(k),open=can&&(OPEN[k]||String((S.lbl||{})[k]||"").trim());
 return `<div class="lr"><div class="lri">${ib(LK[k][0])}</div><div class="fld"><label>${esc(lb)}<input data-v="${k}" value="${esc(S.v[k])}" placeholder="${esc(k==="loc"?"Address or map link":f[2])}" autocomplete="off"></label>${can?(open?`<label class="l2">Show this name instead<input data-lbl="${k}" value="${esc((S.lbl||{})[k]||"")}" placeholder="${esc(LBLPH[k]||"")}"></label>`:`<button class="lnk" data-rn="${k}">Show a name instead of the link</button>`):""}</div><button class="rm2" data-off="${k}" aria-label="Remove ${esc(lb)}">✕</button></div>`}
function group(title,keys){const on=keys.filter(k=>S.on[k]),off=keys.filter(k=>!S.on[k]);return `<h4 class="gh">${title}</h4>${on.map(lrow).join("")}${off.length?`<div class="addrow">${off.map(k=>`<button data-addf="${k}">+ ${SHORT[k]}</button>`).join("")}</div>`:""}`}
function secBody(key,tp){
 const x=S.x;
 if(tp==="text")return key==="note"?`<input data-x="${key}" value="${esc(x[key]||"")}" placeholder="${esc(XS.note)}">`:`<textarea data-x="${key}" rows="4" placeholder="${esc(XS.about)}">${esc(x[key]||"")}</textarea>`;
 if(tp==="chips")return `<input data-x="${key}" value="${esc(x[key]||"")}" placeholder="${esc(XS[key]||"One, Two, Three")}"><small class="fh">Separate with commas</small>`;
 if(tp==="badge")return `<div class="pills mini">${BADGES.map(b=>`<button data-badge="${b}" aria-pressed="${x.badge===b}">${b}</button>`).join("")}</div><input data-x="badge" value="${esc(x.badge||"")}" placeholder="Or write your own">`;
 if(tp==="gal"){const g=S.img.gal;return `<div class="gth">${g.map((u,i)=>`<div class="gi2" style="background-image:url('${blobUrl(u)}')"><button class="rm" data-delg="${i}" aria-label="Remove photo">✕</button></div>`).join("")}${g.length<6?`<label class="gadd">+<input type="file" accept="image/*" multiple data-up="gal"></label>`:""}</div><small class="fh">Up to 6 photos. They are resized and compressed for you.${INFO.gal?" "+INFO.gal+".":""}</small>`}
 const items=x[key]||[];
 return items.map((it,i)=>`<div class="li2"><div class="lh"><b>#${i+1}</b><button class="rm" data-del="${key}.${i}" aria-label="Remove item">✕</button></div>${LS[key].map(([f,l,ty])=>ty==="area"?`<label>${l}<textarea data-x="${key}.${i}.${f}" rows="2" placeholder="${esc(((XS[key]||[])[0]||{})[f]||"")}">${esc(it[f]||"")}</textarea></label>`:`<label>${l}<input data-x="${key}.${i}.${f}" value="${esc(it[f]||"")}" placeholder="${esc(((XS[key]||[])[0]||{})[f]||"")}"></label>`).join("")}</div>`).join("")+`<button class="btn g sm" data-add="${key}">+ Add</button>`}
function extrasHTML(){const rec=REC[S.k]||[],order=[...SECS].sort((a,b)=>(rec.includes(b[0])?1:0)-(rec.includes(a[0])?1:0)),off=order.filter(d=>!S.on[d[0]]);
 const eds=SECS.filter(d=>S.on[d[0]]).map(d=>`<div class="ed" id="ed-${d[0]}"><div class="edh"><div><b>${d[1]}</b><small>${d[2]}</small></div><button class="rm2 txt" data-sec="${d[0]}">Remove</button></div>${secBody(d[0],d[3])}</div>`).join("");
 return `${eds}${off.length?`<h4 class="gh">${eds?"ADD MORE":"ADD A SECTION"}</h4><div class="addrow">${off.map(d=>`<button class="${rec.includes(d[0])?"sug":""}" data-sec="${d[0]}">+ ${d[1]}</button>`).join("")}</div>${rec.length?`<p class="fh">Highlighted ones are suggested for a ${S.k==="biz"?"business":"calling"} card.</p>`:""}`:""}`}
function fbHTML(){return `<div class="note2"><b>Preview mode.</b> Short links like ${esc(dom())}/yourname and photos switch on once the site runs on Netlify. Until then your page is saved inside a long link (text only).</div><p class="sum" id="sum"></p><label>Your card link<input id="lnk" readonly value="Preparing your link..." onclick="this.select()"></label><div class="btns" style="margin-top:12px"><button class="btn" id="nfc">Write to my Lazy card</button><button class="btn g" id="cp">Copy link</button><button class="btn g" id="op">Open my card</button></div><div class="act" style="margin-top:22px"><div class="qr" id="qr"></div><div>${stepsHTML()}</div></div>`}
const stepsHTML=()=>`<h4 class="gh" style="margin:0 0 8px">SAVE IT ON YOUR LAZY CARD</h4><ol class="ck" style="margin:0"><li>Tap <b>Write to my Lazy card</b>, then hold your card to the back of your phone.</li><li>On an iPhone? Open the free NFC Tools app, choose Write, Add a record, URL, and paste your link.</li><li>Tap your card on any phone to test it.</li></ol>`;
function resHTML(){const url=baseUrl()+"/"+S.slug;return `<div class="res"><div class="okb">Your page is live</div><div class="url" id="purl">${esc(dom())}/${esc(S.slug)}</div><div class="btns"><button class="btn" id="nfc">Write to my Lazy card</button><button class="btn g" id="cp">Copy link</button><a class="btn g" href="${esc(url)}" target="_blank" rel="noopener">Open my page</a></div><div class="act" style="margin-top:22px"><div class="qr" id="qr"></div><div>${stepsHTML()}</div></div></div>`}
function pubHTML(){if(!API.ok)return fbHTML();const done=S.published&&S.slug;return `<div class="pub"><label>Your link name<div class="pfx"><span>${esc(dom())}/</span><input id="sl" value="${esc(S.slug)}" placeholder="yourname" maxlength="24" autocapitalize="off" autocomplete="off" spellcheck="false"></div></label><p class="avl" id="avl">Use 3 to 24 letters, numbers, or dashes.</p><label>Edit PIN<input id="pn" type="password" inputmode="numeric" maxlength="8" placeholder="4 to 8 digits" autocomplete="new-password"></label><p class="avl">You will need this PIN to change your page later. Keep it safe.</p><button class="btn" id="pb">${done?"Update my page":"Publish my page"}</button></div><div id="res">${done?resHTML():""}</div>`}
function editBox(){return `<details class="ex"><summary>Already set up? Edit your page</summary>${API.ok?`<p class="fh">Enter your link name and PIN.</p><div class="g2"><label>Link name<input id="el" placeholder="yourname" autocapitalize="off"></label><label>PIN<input id="ep" type="password" inputmode="numeric" placeholder="PIN"></label></div><button class="btn g sm" id="eb">Open my page</button>`:`<label>Paste your card link<input id="ld" placeholder="Paste your card link here"></label>`}</details>`}
function panel(){
 const T=TT[step];
 $("#steps").innerHTML=ST.map((n,i)=>`<button data-i="${i}" class="${i<step?"done":""}" ${i===step?'aria-current="step"':""}><span class="n">${i<step?"✓":i+1}</span><span class="tx">${n}</span></button>`).join("");
 let h=step===0?introHTML()+editBox():"";
 h+=`<span class="stp">Step ${step+1} of ${ST.length}</span><h2>${T[0]}</h2><p class="sub">${T[1]}</p>`;
 if(step===0)h+=`<h4 class="gh" style="margin-top:0">WHAT ARE YOU MAKING?</h4><div class="kinds"><button data-k="call" aria-pressed="${S.k==="call"}"><i class="kd k1"></i><b>Calling card</b><span>Your photo, story, and skills. Made for people.</span></button><button data-k="biz" aria-pressed="${S.k==="biz"}"><i class="kd k2"></i><b>Business card</b><span>Your logo, services, and hours. Made for brands.</span></button></div><h4 class="gh">DESIGN</h4><div class="tp">${TP.map(([k,n])=>`<button data-t="${k}" aria-pressed="${S.t===k}">${thumb(k,.4)}<div style="margin-top:8px">${n}</div></button>`).join("")}</div><h4 class="gh">COLOR</h4><div class="sw">${CO.map(c=>`<button data-c="${c}" style="background:${c}" aria-label="Color ${c}" aria-pressed="${S.c===c}"></button>`).join("")}</div>`;
 if(step===1)h+=`${["name","role","co","tag"].map(field).join("")}<h4 class="gh">${S.k==="biz"?"YOUR LOGO":"YOUR PHOTO"}</h4>${imgBlock("av")}<h4 class="gh">COVER IMAGE (OPTIONAL)</h4>${imgBlock("cv")}${API.ok?"":`<p class="fh" style="margin-top:12px">Images show in this preview. They are saved with your page once the site runs on Netlify.</p>`}`;
 if(step===2)h+=`<p class="tip">Tap a button to add it. Use <b>Show a name instead of the link</b> to display a name like "Alex Morgan" rather than the web address.</p>${group("CONTACT",CONTACT)}${group("SOCIAL MEDIA",SOCIAL)}`;
 if(step===3)h+=extrasHTML();
 if(step===4)h+=pubHTML();
 h+=`<div class="nav2"><button class="btn g" id="bk" ${step?"":"disabled"}>Back</button><button class="btn g pvb" id="pvb">Preview</button><button class="btn" id="nx">${step===4?"Done":"Next"}</button></div>`;
 $("#panel").innerHTML=h;
 $("#bk").onclick=()=>{step--;panel();updPV();scrollTop()};
 $("#pvb").onclick=openPV;
 $("#nx").onclick=()=>{if(step===4){if(API.ok&&!S.published){toast("Publish your page first");return}burst();toast("All set. Tap your Lazy card to test it");setTimeout(()=>{location.hash="#home"},1200);return}step++;panel();updPV();scrollTop()};
 if(step===4){if(!API.ok)fillLink();else{if(S.published){const q=$("#qr");if(q)q.innerHTML=qrSvg(baseUrl()+"/"+S.slug)}if(S.slug)chk()}}
 updPV();
}
const scrollTop=()=>{const p=$("#panel");if(p)window.scrollTo({top:Math.max(0,p.getBoundingClientRect().top+scrollY-80),behavior:"smooth"})};
function updPV(){paint($("#card"),demo(S),S.t);$("#tn").textContent=TP.find(t=>t[0]===S.t)[1];$("#prog").style.width=(step+1)/ST.length*100+"%"}
async function fillLink(){LINK=baseUrl()+"/#k"+await enc(pack(S,false));const el=$("#lnk");if(el)el.value=LINK;const n=Object.keys(pack(S,false).o).length,m=$("#sum");if(m)m.textContent="Your card shows "+n+" contact item"+(n===1?"":"s")+".";const q=$("#qr");if(q)q.innerHTML=qrSvg(LINK)}
const liveUrl=()=>API.ok&&S.published?baseUrl()+"/"+S.slug:LINK;
async function nfcWrite(){const url=liveUrl();if(!url)return;if(!("NDEFReader" in window)){toast("This browser can't write NFC. Use the steps beside the button");return}try{const n=new NDEFReader();toast("Hold your Lazy card to the back of your phone");await n.write({records:[{recordType:"url",data:url}]});toast("Done! Your Lazy card is ready");burst()}catch(e){toast(e&&e.name==="NotAllowedError"?"NFC permission was blocked":"Could not write. Try again")}}
function openCard(){if(!LINK)return;fromSetup=true;location.hash=LINK.slice(LINK.indexOf("#"))}
let ct;function chk(){clearTimeout(ct);const el=$("#sl"),m=$("#avl");if(!el||!m)return;const v=el.value.toLowerCase().trim();S.slug=v;if(!/^[a-z0-9-]{3,24}$/.test(v)){m.textContent="Use 3 to 24 letters, numbers, or dashes.";m.className="avl";return}m.textContent="Checking...";if(S.published&&v===S.pubSlug){m.textContent="This is your live page. Enter your PIN to update it.";m.className="avl good";return}ct=setTimeout(async()=>{const f=await API.free(v),e=$("#sl");if(e&&e.value.toLowerCase().trim()===v){m.textContent=f?"That name is available":"That name is taken. If it is yours, enter your PIN to update it.";m.className="avl "+(f?"good":"warn")}},400)}
async function publish(){const slug=($("#sl").value||"").toLowerCase().trim(),pin=$("#pn").value.trim();
 if(!/^[a-z0-9-]{3,24}$/.test(slug)){toast("Link name: 3 to 24 letters, numbers, or dashes");return}
 if(!/^\d{4,8}$/.test(pin)){toast("PIN must be 4 to 8 digits");return}
 const data=pack(S,true);if(JSON.stringify(data).length>1400000){toast("Your photos are too large. Remove one and try again");return}
 const b=$("#pb");b.disabled=true;b.textContent="Publishing...";
 const r=await API.save(slug,pin,data);b.disabled=false;
 if(r.status===200&&r.j&&r.j.ok){S.slug=slug;S.pubSlug=slug;S.published=true;S.pin=pin;sv();burst();toast("Your page is live");panel();return}
 b.textContent=S.published?"Update my page":"Publish my page";
 toast(r.status===403?"That name is taken, or the PIN does not match":r.status===413?"Your page is too large. Remove a photo":"Could not publish. Check your connection and try again")}
async function openExisting(){const sl=($("#el").value||"").toLowerCase().trim(),pn=$("#ep").value.trim();if(!sl||!pn){toast("Enter your link name and PIN");return}
 const r=await API.login(sl,pn);if(!(r.status===200&&r.j&&r.j.ok)){toast(r.status===404?"We could not find that page":"That PIN does not match");return}
 const d=await API.get(sl);if(!d){toast("Could not load your page");return}
 S=unpack(d);S.slug=sl;S.pubSlug=sl;S.published=true;S.pin=pn;Object.keys(S.on).forEach(k=>{if(S.on[k])S.dirty[k]=true});sv();toast("Welcome back"+(r.j.views?". Your page was opened "+r.j.views+" times":""));panel()}
async function loadCard(v){const m=String(v).match(/#?k([0-9A-Za-z-]{16,})/);if(!m){toast("That does not look like a card link");return}try{const st=unpack(await dec(m[1]));S=st;Object.keys(S.on).forEach(k=>{if(S.on[k])S.dirty[k]=true});sv();toast("Card loaded");panel()}catch(e){toast("That link could not be read")}}
async function upload(key,files){if(!files||!files.length)return;toast("Optimizing your picture...");try{
 if(key==="gal"){let tot=0;for(const f of [...files].slice(0,6-S.img.gal.length)){const r=await shrink(f,{max:1000,kb:120});S.img.gal.push(r.url);tot+=r.kb}S.on.gal=true;INFO.gal="Added about "+tot+" KB"}
 else if(key==="av"){const biz=S.k==="biz",alpha=biz&&/png|webp|gif|svg/.test(files[0].type),r=await shrink(files[0],{max:400,kb:biz?70:60,sq:!biz,alpha});S.img.av=r.url;S.on.av=true;INFO.av=r.kb+" KB"}
 else{const r=await shrink(files[0],{max:1200,kb:150});S.img.cv=r.url;S.on.cv=true;INFO.cv=r.kb+" KB"}
 sv();panel();updPV();toast(key==="gal"?"Photos optimized":"Picture optimized to "+INFO[key])}catch(e){toast("That image could not be used. Try another")}}
const blankItem=k=>Object.fromEntries(LS[k].map(([f])=>[f,""]));
function ensureItems(){Object.keys(LS).forEach(k=>{if(S.on[k]&&!S.x[k].length)S.x[k].push(blankItem(k))})}
function kindPreset(k){S.k=k;const on=(ks,v)=>ks.forEach(x=>S.on[x]=v);if(k==="biz"){on(["svc","hrs","tst","links","badge"],true);on(["exp","edu","about","skills"],false)}else{on(["about","exp","skills"],true);on(["svc","hrs","tst","links","pay","badge"],false)}ensureItems()}
const P=$("#panel");
P.addEventListener("input",e=>{const t=e.target;
 if(t.dataset.v){const k=t.dataset.v;S.v[k]=t.value;S.dirty[k]=true;if(t.value.trim())S.on[k]=true}
 else if(t.dataset.lbl){S.lbl=S.lbl||{};S.lbl[t.dataset.lbl]=t.value}
 else if(t.dataset.x){setPath(S.x,t.dataset.x,t.value);S.dirty[t.dataset.x.split(".")[0]]=true}
 else if(t.id==="sl"){chk();sv();return}else return;
 sv();paintSoon()});
P.addEventListener("change",async e=>{const t=e.target;
 if(t.id==="ld"){loadCard(t.value);return}
 if(t.dataset.up){await upload(t.dataset.up,t.files);t.value=""}});
P.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const d=b.dataset;let focus="";
 if(d.t){S.t=d.t;S.c=accent(d.t)}else if(d.c){S.c=d.c}
 else if(d.k){kindPreset(d.k);toast(d.k==="biz"?"Business card selected":"Calling card selected")}
 else if(d.addf){S.on[d.addf]=true;OPEN[d.addf]=false;focus=`[data-v="${d.addf}"]`}
 else if(d.off){S.on[d.off]=false}
 else if(d.rn){OPEN[d.rn]=true;focus=`[data-lbl="${d.rn}"]`}
 else if(d.sec){S.on[d.sec]=!S.on[d.sec];if(S.on[d.sec]){ensureItems();focus=`#ed-${d.sec} input,#ed-${d.sec} textarea`}}
 else if(d.add){S.x[d.add].push(blankItem(d.add));S.on[d.add]=true}
 else if(d.del){const[k,i]=d.del.split(".");S.x[k].splice(+i,1)}
 else if(d.delg){S.img.gal.splice(+d.delg,1);if(!S.img.gal.length)S.on.gal=false}
 else if(d.rm){S.img[d.rm]="";INFO[d.rm]="";if(d.rm!=="av")S.on[d.rm]=false}
 else if(d.badge){S.x.badge=d.badge;S.on.badge=true;S.dirty.badge=true}
 else if(d.pos){const[k,v]=d.pos.split(".");S[k]=v}
 else if(b.id==="cp"){copyText(liveUrl(),"Link copied");return}
 else if(b.id==="nfc"){nfcWrite();return}
 else if(b.id==="pb"){publish();return}
 else if(b.id==="eb"){openExisting();return}
 else if(b.id==="op"){openCard();return}
 else return;
 sv();panel();updPV();if(focus){const el=$(focus);if(el){el.focus({preventScroll:true});el.scrollIntoView({block:"center",behavior:"smooth"})}}});
$("#steps").onclick=e=>{const b=e.target.closest("button");if(b){step=+b.dataset.i;panel();scrollTop()}};
function cyc(d){const i=(TP.findIndex(t=>t[0]===S.t)+d+TP.length)%TP.length;S.t=TP[i][0];S.c=accent(S.t);sv();if(step===0)panel();updPV()}
$("#pvx").onclick=closePV;
$("#tp").onclick=()=>cyc(-1);$("#tx").onclick=()=>cyc(1);
$("#shuf").onclick=()=>{S.t=TP[Math.floor(Math.random()*TP.length)][0];S.c=CO[Math.floor(Math.random()*CO.length)];sv();panel()};
function openSetup(){panel();updPV()}
