/* LazyCard setup wizard (this is the page your Lazy cards open first) */
let S=mk(ON0,true),step=0,LINK="",fromSetup=false;
try{const x=localStorage.getItem("lc7");if(x){const p=JSON.parse(x);S={...S,...p,v:{...S.v,...p.v},on:{...S.on,...p.on},x:{...S.x,...(p.x||{})},img:{...S.img,...(p.img||{})},lbl:{...(p.lbl||{})}}}}catch(e){}
const sv=()=>{try{const c={...S};delete c.pin;localStorage.setItem("lc7",JSON.stringify(c))}catch(e){}};
let pq=0;const paintSoon=()=>{cancelAnimationFrame(pq);pq=requestAnimationFrame(()=>paint($("#card"),demo(S),S.t))};
const ST=["Style","About you","Links","Sections","Publish"];
const TT=[["Choose your style","Pick the kind of page, the design, and your color."],["Tell us about you","Add your basics and images. Switch off anything you do not need."],["Add your links","Contact details and social media. Only add what you want people to use."],["Make it yours","Switch on the sections you want. Every one is optional."],["Publish your page","Choose your link, then save it on your Lazy card."]];
const TI={name:"Aa",role:"Jt",co:"Co",tag:"Tg"};
const PRE={Corporate:["name","role","co","phone","email","web","loc","li"],Creator:["name","role","tag","ig","tt","yt","book"],Freelancer:["name","role","tag","email","wa","web","ig","book"],"IT pro":["name","role","co","email","gh","li","web"],Minimal:["name","email"]};
const LBLPH={wa:"e.g. Message me",web:"e.g. My portfolio",loc:"e.g. Lipa City, Batangas",book:"e.g. Book a call",ig:"e.g. Mika Designs",fb:"e.g. Renze Alano",li:"e.g. Renze Alano",tt:"e.g. Mika Designs",x:"e.g. Mika Designs",yt:"e.g. My channel",gh:"e.g. My code"};
const LB=()=>S.k==="biz"?{name:"Business or person name",role:"What you do",co:"Business name"}:{};
const dom=()=>{try{return new URL(baseUrl()).host}catch(e){return"lazycard.netlify.app"}};
function qrSvg(url,cell=3){try{const q=qrcode(0,"L");q.addData(url);q.make();return q.createSvgTag({cellSize:cell,margin:2,scalable:true})}catch(e){return""}}
function setPath(o,path,val){const p=path.split("."),n=k=>/^\d+$/.test(k)?+k:k;let c=o;for(let i=0;i<p.length-1;i++)c=c[n(p[i])];c[n(p[p.length-1])]=val}
function row(k){const f=F.find(x=>x[0]===k),on=S.on[k],lb=LB()[k]||f[1];return `<div class="blk ${on?"":"off"}">${ib(TI[k]||LK[k][0])}<div class="fld"><label>${esc(lb)}<input data-v="${k}" value="${esc(S.v[k])}" placeholder="${esc(k==="loc"?"Address or map link":f[2])}"></label>${LBL.has(k)?`<label class="l2">Show as (optional)<input data-lbl="${k}" value="${esc((S.lbl||{})[k]||"")}" placeholder="${esc(LBLPH[k]||"")}"></label>`:""}${LK[k]?`<a class="tlk" data-tl="${k}" href="${esc(LK[k][1](String(S.v[k]||"")))}" target="_blank" rel="noopener">Test link</a>`:""}</div><label class="tg2"><input type="checkbox" data-on="${k}" ${on?"checked":""} aria-label="Show ${esc(lb)}"><span></span></label></div>`}
function upl(key,label,hint){const im=S.img[key],on=S.on[key];return `<div class="blk upl ${on?"":"off"}"><div class="th ${key==="av"&&S.k==="biz"?"lg2":""}" ${im?`style="background-image:url('${im}')"`:""}>${im?"":"+"}</div><label>${label}<span class="fh">${hint}</span><input type="file" accept="image/*" data-up="${key}"></label><label class="tg2"><input type="checkbox" data-on="${key}" ${on?"checked":""} aria-label="Show ${label}"><span></span></label>${im?`<button class="rm" data-rm="${key}" aria-label="Remove image">✕</button>`:""}</div>`}
const POSL=[["t","Top"],["c","Center"],["b","Bottom"]];
const seg=(key,label)=>`<div class="seg"><span>${label}</span>${POSL.map(([v,l])=>`<button data-pos="${key}.${v}" aria-pressed="${(S[key]||(key==="avp"?"t":"c"))===v}">${l}</button>`).join("")}</div>`;
function secBody(key,tp){
 const x=S.x;
 if(tp==="text")return key==="note"?`<input data-x="${key}" value="${esc(x[key]||"")}" placeholder="${esc(XS.note)}">`:`<textarea data-x="${key}" rows="4" placeholder="${esc(XS.about)}">${esc(x[key]||"")}</textarea>`;
 if(tp==="chips")return `<input data-x="${key}" value="${esc(x[key]||"")}" placeholder="${esc(XS[key]||"One, Two, Three")}"><small class="fh">Separate with commas</small>`;
 if(tp==="badge")return `<div class="pills mini">${BADGES.map(b=>`<button data-badge="${b}" aria-pressed="${x.badge===b}">${b}</button>`).join("")}</div><input data-x="badge" value="${esc(x.badge||"")}" placeholder="Or write your own">`;
 if(tp==="gal"){const g=S.img.gal;return `<div class="gth">${g.map((u,i)=>`<div class="gi2" style="background-image:url('${u}')"><button class="rm" data-delg="${i}" aria-label="Remove photo">✕</button></div>`).join("")}${g.length<6?`<label class="gadd">+<input type="file" accept="image/*" multiple data-up="gal"></label>`:""}</div><small class="fh">Up to 6 photos</small>`}
 const items=x[key]||[];
 return items.map((it,i)=>`<div class="li2"><div class="lh"><b>#${i+1}</b><button class="rm" data-del="${key}.${i}" aria-label="Remove item">✕</button></div>${LS[key].map(([f,l,ty])=>ty==="area"?`<label>${l}<textarea data-x="${key}.${i}.${f}" rows="2" placeholder="${esc(((XS[key]||[])[0]||{})[f]||"")}">${esc(it[f]||"")}</textarea></label>`:`<label>${l}<input data-x="${key}.${i}.${f}" value="${esc(it[f]||"")}" placeholder="${esc(((XS[key]||[])[0]||{})[f]||"")}"></label>`).join("")}</div>`).join("")+`<button class="btn g sm" data-add="${key}">+ Add</button>`}
function acc(d){const[key,title,desc,tp]=d,on=S.on[key];return `<div class="acc ${on?"":"off"}"><div class="ah"><div><b>${title}</b><small>${desc}</small></div><label class="tg2"><input type="checkbox" data-on="${key}" ${on?"checked":""} aria-label="Show ${title}"><span></span></label></div><div class="ab">${secBody(key,tp)}</div></div>`}
function fbHTML(){return `<div class="note2"><b>Preview mode.</b> Short links like ${esc(dom())}/yourname and photos switch on once the site runs on Netlify. Until then your page is saved inside a long link (text only).</div><p class="sum" id="sum"></p><label>Your card link<input id="lnk" readonly value="Preparing your link..." onclick="this.select()"></label><div class="btns" style="margin-top:12px"><button class="btn" id="nfc">Write to my Lazy card</button><button class="btn g" id="cp">Copy link</button><button class="btn g" id="op">Open my card</button></div><div class="act" style="margin-top:22px"><div class="qr" id="qr"></div><div>${stepsHTML()}</div></div>`}
const stepsHTML=()=>`<h4 class="gh" style="margin:0 0 8px">SAVE IT ON YOUR LAZY CARD</h4><ol class="ck" style="margin:0"><li>Tap <b>Write to my Lazy card</b>, then hold your card to the back of your phone.</li><li>On an iPhone? Open the free NFC Tools app, choose Write, Add a record, URL, and paste your link.</li><li>Tap your card on any phone to test it.</li></ol>`;
function resHTML(){const url=baseUrl()+"/"+S.slug;return `<div class="res"><div class="okb">Your page is live</div><div class="url" id="purl">${esc(dom())}/${esc(S.slug)}</div><div class="btns"><button class="btn" id="nfc">Write to my Lazy card</button><button class="btn g" id="cp">Copy link</button><a class="btn g" href="${esc(url)}" target="_blank" rel="noopener">Open my page</a></div><div class="act" style="margin-top:22px"><div class="qr" id="qr"></div><div>${stepsHTML()}</div></div></div>`}
function pubHTML(){if(!API.ok)return fbHTML();const done=S.published&&S.slug;return `<div class="pub"><label>Your link name<div class="pfx"><span>${esc(dom())}/</span><input id="sl" value="${esc(S.slug)}" placeholder="yourname" maxlength="24" autocapitalize="off" autocomplete="off" spellcheck="false"></div></label><p class="avl" id="avl">Use 3 to 24 letters, numbers, or dashes.</p><label>Edit PIN<input id="pn" type="password" inputmode="numeric" maxlength="8" placeholder="4 to 8 digits" autocomplete="new-password"></label><p class="avl">You will need this PIN to change your page later. Keep it safe.</p><button class="btn" id="pb">${done?"Update my page":"Publish my page"}</button></div><div id="res">${done?resHTML():""}</div>`}
function editBox(){return API.ok?`<div class="load"><b>Already have a page?</b><p class="fh">Enter your link name and PIN to edit it.</p><div class="g2"><label>Link name<input id="el" placeholder="yourname" autocapitalize="off"></label><label>PIN<input id="ep" type="password" inputmode="numeric" placeholder="PIN"></label></div><button class="btn g sm" id="eb">Open my page</button></div>`:`<div class="load"><label>Already set up? Paste your card link to edit it<input id="ld" placeholder="Paste your card link here"></label></div>`}
function panel(){
 const T=TT[step];
 $("#steps").innerHTML=ST.map((n,i)=>`<button data-i="${i}" class="${i<step?"done":""}" ${i===step?'aria-current="step"':""}><span class="n">${i<step?"✓":i+1}</span><span class="tx">${n}</span></button>`).join("");
 let h=`<span class="stp">Step ${step+1} of ${ST.length}</span><h2>${T[0]}</h2><p class="sub">${T[1]}</p>`;
 if(step===0)h+=`${editBox()}<h4 class="gh">WHAT ARE YOU MAKING?</h4><div class="kinds"><button data-k="call" aria-pressed="${S.k==="call"}"><i class="kd k1"></i><b>Calling card</b><span>Your photo, story, and skills. Made for people.</span></button><button data-k="biz" aria-pressed="${S.k==="biz"}"><i class="kd k2"></i><b>Business card</b><span>Your logo, services, and hours. Made for brands.</span></button></div><h4 class="gh">DESIGN</h4><div class="tp">${TP.map(([k,n])=>`<button data-t="${k}" aria-pressed="${S.t===k}">${thumb(k,.4)}<div style="margin-top:8px">${n}</div></button>`).join("")}</div><h4 class="gh">COLOR</h4><div class="sw">${CO.map(c=>`<button data-c="${c}" style="background:${c}" aria-label="Color ${c}" aria-pressed="${S.c===c}"></button>`).join("")}</div>`;
 if(step===1)h+=`${["name","role","co","tag"].map(row).join("")}<h4 class="gh">${S.k==="biz"?"YOUR LOGO":"YOUR PHOTO"}</h4>${upl("av",S.k==="biz"?"Logo":"Photo",S.k==="biz"?"Tap to choose your logo":"Tap to choose your photo")}${S.k!=="biz"&&S.img.av?seg("avp","Focus on"):""}<h4 class="gh">COVER IMAGE</h4>${upl("cv","Cover image","A wide picture across the top")}${S.img.cv?seg("cvp","Focus on"):""}${API.ok?"":`<p class="fh" style="margin-top:12px">Images show in this preview. They are saved with your page once the site runs on Netlify.</p>`}`;
 if(step===2)h+=`<h4 class="gh" style="margin-top:0">QUICK START</h4><div class="pre">${Object.keys(PRE).map(k=>`<button data-pre="${k}">${k}</button>`).join("")}</div><p class="tip"><b>Tip:</b> use <b>Show as</b> to display a name instead of a link. For example, paste your Facebook link, then type "Renze Alano" in Show as. People see your name and tap to open the link.</p><h4 class="gh">CONTACT</h4>${["phone","email","wa","web","loc","book"].map(row).join("")}<h4 class="gh">SOCIAL</h4>${["ig","fb","li","tt","x","yt","gh"].map(row).join("")}`;
 if(step===3)h+=SECS.map(acc).join("");
 if(step===4)h+=pubHTML();
 h+=`<div class="nav2"><button class="btn g" id="bk" ${step?"":"disabled"}>Back</button><button class="btn g pvb" id="pvb">Preview</button><button class="btn" id="nx">${step===4?"Done":"Next"}</button></div>`;
 $("#panel").innerHTML=h;
 $("#bk").onclick=()=>{step--;panel();updPV();scrollTop()};
 $("#pvb").onclick=()=>$("#pv").classList.add("open");
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
 S=unpack(d);S.slug=sl;S.pubSlug=sl;S.published=true;S.pin=pn;sv();toast("Welcome back"+(r.j.views?". Your page was opened "+r.j.views+" times":""));panel()}
async function loadCard(v){const m=String(v).match(/#?k([0-9A-Za-z-]{16,})/);if(!m){toast("That does not look like a card link");return}try{const st=unpack(await dec(m[1]));S=st;sv();toast("Card loaded");panel()}catch(e){toast("That link could not be read")}}
async function upload(key,files){if(!files||!files.length)return;try{
 if(key==="gal"){for(const f of [...files].slice(0,6-S.img.gal.length))S.img.gal.push(await shrink(f,900,.78,false));S.on.gal=true}
 else if(key==="av"){S.img.av=await shrink(files[0],S.k==="biz"?420:360,.88,S.k!=="biz",S.k==="biz"?"image/webp":"image/jpeg");S.on.av=true}
 else{S.img.cv=await shrink(files[0],1000,.8,false);S.on.cv=true}
 sv();panel();updPV()}catch(e){toast("That image could not be used. Try another")}}
function kindPreset(k){S.k=k;const on=(ks,v)=>ks.forEach(x=>S.on[x]=v);if(k==="biz"){on(["svc","hrs","tst","links","badge"],true);on(["exp","edu","about"],false);S.on.cv=!!S.img.cv||S.on.cv}else{on(["about","exp","skills"],true);on(["svc","hrs","tst","links","pay"],false)}ensureItems()}
const blankItem=k=>Object.fromEntries(LS[k].map(([f])=>[f,""]));
function ensureItems(){Object.keys(LS).forEach(k=>{if(S.on[k]&&!S.x[k].length)S.x[k].push(blankItem(k))})}
const P=$("#panel");
P.addEventListener("input",e=>{const t=e.target;
 if(t.dataset.v){const k=t.dataset.v;S.v[k]=t.value;const a=P.querySelector(`[data-tl="${k}"]`);if(a&&LK[k])a.href=LK[k][1](t.value||"");if(t.value.trim()&&!S.on[k]){S.on[k]=true;const c=P.querySelector(`[data-on="${k}"]`);if(c){c.checked=true;c.closest(".blk").classList.remove("off")}}}
 else if(t.dataset.lbl){S.lbl=S.lbl||{};S.lbl[t.dataset.lbl]=t.value}
 else if(t.dataset.x){setPath(S.x,t.dataset.x,t.value)}
 else if(t.id==="sl"){chk();sv();return}else return;
 sv();paintSoon()});
P.addEventListener("change",async e=>{const t=e.target;
 if(t.dataset.on){const k=t.dataset.on;S.on[k]=t.checked;const b=t.closest(".blk,.acc");if(b)b.classList.toggle("off",!t.checked);if(t.checked&&LS[k]&&!S.x[k].length){ensureItems();sv();panel();updPV();return}sv();paintSoon();return}
 if(t.id==="ld"){loadCard(t.value);return}
 if(t.dataset.up){await upload(t.dataset.up,t.files);t.value=""}});
P.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const d=b.dataset;
 if(d.t){S.t=d.t;S.c=accent(d.t)}else if(d.c){S.c=d.c}
 else if(d.k){kindPreset(d.k);toast(d.k==="biz"?"Business card preset applied":"Calling card preset applied")}
 else if(d.pre){const p=PRE[d.pre];F.forEach(f=>S.on[f[0]]=p.includes(f[0]));toast(d.pre+" preset applied")}
 else if(d.add){S.x[d.add].push(Object.fromEntries(LS[d.add].map(([f])=>[f,""])));S.on[d.add]=true}
 else if(d.del){const[k,i]=d.del.split(".");S.x[k].splice(+i,1)}
 else if(d.delg){S.img.gal.splice(+d.delg,1);if(!S.img.gal.length)S.on.gal=false}
 else if(d.rm){S.img[d.rm]="";S.on[d.rm]=false}
 else if(d.badge){S.x.badge=d.badge;S.on.badge=true}
 else if(d.pos){const[k,v]=d.pos.split(".");S[k]=v}
 else if(b.id==="cp"){copyText(liveUrl(),"Link copied");return}
 else if(b.id==="nfc"){nfcWrite();return}
 else if(b.id==="pb"){publish();return}
 else if(b.id==="eb"){openExisting();return}
 else if(b.id==="op"){openCard();return}
 else return;
 sv();panel();updPV()});
$("#steps").onclick=e=>{const b=e.target.closest("button");if(b){step=+b.dataset.i;panel();scrollTop()}};
function cyc(d){const i=(TP.findIndex(t=>t[0]===S.t)+d+TP.length)%TP.length;S.t=TP[i][0];S.c=accent(S.t);sv();if(step===0)panel();updPV()}
$("#pvx").onclick=()=>$("#pv").classList.remove("open");
$("#tp").onclick=()=>cyc(-1);$("#tx").onclick=()=>cyc(1);
$("#shuf").onclick=()=>{S.t=TP[Math.floor(Math.random()*TP.length)][0];S.c=CO[Math.floor(Math.random()*CO.length)];sv();panel()};
function openSetup(){panel();updPV()}
