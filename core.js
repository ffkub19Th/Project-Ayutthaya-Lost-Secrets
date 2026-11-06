'use strict';
/* ===== แกนเกม: เลย์เอาต์แนวนอนเต็มจอ, เซฟ, เสียง, เวที, ตัวช่วยสร้างด่าน ===== */
const $=(s,r=document)=>r.querySelector(s);
const E=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const WORD='ราชบูรณะ', LETTERS=[...WORD];
const META={
 1:{n:'ร่องรอยแห่งวัดมหาธาตุ',d:'สังเกตลักษณะทางสถาปัตยกรรม แยกแยะและจับคู่รูปแบบโบราณสถานกับยุคสมัยอยุธยาตอนต้น กลาง และปลาย'},
 2:{n:'รหัสสมุดบันทึก วัดไชยวัฒนาราม',d:'ถอดรหัส 2 ชั้น แปลงสัญลักษณ์เป็นเลขไทยโบราณ แล้วคำนวณตามสูตรจากความรู้ที่ศึกษามา'},
 3:{n:'แผนที่ที่หายไป',d:'วางตำแหน่งสถานที่สำคัญและปรับทิศทางการไหลของแม่น้ำให้ตรงกับภูมิศาสตร์ของกรุงศรีอยุธยา'},
 4:{n:'วิกฤตตลาดริมน้ำ',d:'เป็นพ่อค้า บริหารการซื้อขายสินค้า และรับมือเหตุการณ์ที่แจ้งเตือนล่วงหน้า'},
 5:{n:'ประตูพระคลังหลวง',d:'เชื่อมโยงเหตุและผลของเหตุการณ์ในต้นไม้แห่งเหตุและผล'},
 6:{n:'หมู่บ้านนานาชาติ',d:'สังเกตสินค้า เครื่องแต่งกาย และคำทักทาย เพื่อนำทางชาวต่างชาติไปยังจุดหมายที่เหมาะสม'},
 7:{n:'ค่ายคูประตูหอรบ',d:'จัดวางกำลังพลและปืนใหญ่ตามจุดยุทธศาสตร์ ภูมิประเทศ ฤดูกาล และงบประมาณ'},
 8:{n:'ตำราจินดามณี',d:'เติมคำให้ถูกทั้งความหมายและฉันทลักษณ์ของโคลงสี่สุภาพ'},
 9:{n:'กรุสมบัติวัดราชบูรณะ',d:'สำรวจกรุใต้ดินภายใต้แสงที่ค่อยๆ ลดลง และเก็บเฉพาะสมบัติที่ตรงกับบันทึกประวัติศาสตร์'},
 10:{n:'พระราชวังหลวง',d:'ประกอบพระที่นั่งสรรเพชญปราสาทด้วยความรู้จากทุกด่าน'}
};

/* ---------- เซฟ ---------- */
const SAVE_KEY='ayutthaya_secrets_v1';
let S={done:{},letters:{},special:false,sfx:true,music:true};
try{Object.assign(S,JSON.parse(localStorage.getItem(SAVE_KEY)||'{}'))}catch(e){}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(S))}catch(e){}}
const nLetters=()=>Object.keys(S.letters).length;
const DEMO_MAX=4; // เดโม : เปิดให้เล่นด่าน 1-4
function isUnlocked(n){return n<=DEMO_MAX&&(n===1||!!S.done[n-1])}

/* ---------- เลย์เอาต์: บังคับแนวนอนเสมอ (หมุนเองเมื่อถือจอแนวตั้ง) ---------- */
let EW=innerWidth,EH=innerHeight;
const STAGES=new Set();
function layout(){
  const w=innerWidth,h=innerHeight,por=h>w;
  EW=por?h:w;EH=por?w:h;
  const a=$('#app');a.style.setProperty('--ew',EW+'px');a.style.setProperty('--eh',EH+'px');
  a.style.transform=por?`translate(${w}px,0) rotate(90deg)`:'none';
  STAGES.forEach(fit);
}
function fit(st){
  if(!st.isConnected){STAGES.delete(st);return}
  const s=Math.min(EW/st._W,EH/st._H);
  st.style.width=st._W*s+'px';st.style.height=st._H*s+'px';st.style.setProperty('--u',s+'px');
  st.querySelectorAll('.cv,.say').forEach(shrink);
}
/* ย่อตัวอักษรอัตโนมัติเมื่อข้อความล้นกรอบ (ทุกอุปกรณ์/ฟอนต์) โดยลดค่า --u เฉพาะกรอบนั้น */
function shrink(e){
  const st=e.closest('.stage');if(!st||!e.clientWidth)return;
  const base=parseFloat(st.style.getPropertyValue('--u'))||1;
  e.style.setProperty('--u',base+'px');let f=1;
  while(f>.5&&(e.scrollHeight>e.clientHeight+1||e.scrollWidth>e.clientWidth+1)){f-=.06;e.style.setProperty('--u',(base*f).toFixed(3)+'px')}
}
addEventListener('resize',layout);addEventListener('orientationchange',()=>setTimeout(layout,150));
function goFull(){
  const d=document.documentElement;
  try{ if(!document.fullscreenElement&&d.requestFullscreen){
    d.requestFullscreen({navigationUI:'hide'}).then(()=>{try{screen.orientation.lock('landscape').catch(()=>{})}catch(e){}}).catch(()=>{});
  } else if(document.fullscreenElement&&document.exitFullscreen){document.exitFullscreen()} }catch(e){}
}
document.addEventListener('fullscreenchange',()=>setTimeout(layout,120));
let autoFull=false;
addEventListener('pointerdown',()=>{ // บนมือถือ: แตะครั้งแรกให้เต็มจอ
  if(!autoFull&&matchMedia('(pointer:coarse)').matches){autoFull=true;goFull()}
  Snd.init();
},{passive:true});

function makeStage(host,img,W,H){
  host.innerHTML='';
  const fill=E('div','fill');fill.style.backgroundImage=`url(./img/${img})`;
  const st=E('div','stage');st._W=W;st._H=H;
  const bg=E('img','bg px');bg.src='./img/'+img;bg.draggable=false;
  bg.onerror=()=>{
    const err=E('div','c');
    err.style.cssText='position:absolute;inset:0;z-index:20;flex-direction:column;gap:12px;padding:24px;background:#160904;color:#ffe9a8;font:600 22px sans-serif;text-align:center';
    err.innerHTML=`<div>โหลดภาพฉากไม่สำเร็จ</div><div style="font-size:15px;color:#f6d98a">ไฟล์ที่หาไม่พบ: ./img/${img}<br>ตรวจสอบว่าโฟลเดอร์ img ถูกอัปโหลดไว้ระดับเดียวกับ index.html และชื่อไฟล์ตรงกันทุกตัวอักษร</div>`;
    st.append(err);
  };
  const ov=E('div','ov');st.append(bg,ov);host.append(fill,st);
  STAGES.add(st);fit(st);
  new MutationObserver(ms=>{const set=new Set();ms.forEach(m=>{const t=m.target.nodeType===1?m.target:m.target.parentElement;const c=t&&t.closest&&t.closest('.cv');if(c)set.add(c)});
    if(set.size)requestAnimationFrame(()=>set.forEach(shrink))}).observe(ov,{childList:true,subtree:true,characterData:true});
  return{st,ov};
}
function show(id){document.querySelectorAll('.scr').forEach(s=>s.classList.toggle('on',s.id===id))}

/* ---------- เสียง (สังเคราะห์ ไม่ใช้ไฟล์) ---------- */
const Snd=(()=>{
  let ac,mg,sg,mt=null,step=0;
  const sc=[262,294,330,392,440,523,588,659];
  function init(){if(ac){if(ac.state==='suspended')ac.resume();return}
    try{ac=new(window.AudioContext||window.webkitAudioContext)();sg=ac.createGain();sg.gain.value=.5;sg.connect(ac.destination);
      mg=ac.createGain();mg.gain.value=.5;mg.connect(ac.destination);if(S.music)music(true)}catch(e){}}
  function tone(f,t0,d,type='square',v=.12,dest){if(!ac)return;const o=ac.createOscillator(),g=ac.createGain();
    o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,ac.currentTime+t0);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+t0+d);
    o.connect(g);g.connect(dest||sg);o.start(ac.currentTime+t0);o.stop(ac.currentTime+t0+d+.02)}
  const seq=(fs,d=.09,type,v)=>{if(S.sfx)fs.forEach((f,i)=>tone(f,i*d,d*1.6,type,v))};
  function music(on){clearInterval(mt);mt=null;if(!on||!ac)return;
    mt=setInterval(()=>{if(!S.music)return;step++;
      const n=sc[(step*3+(step>>2)*2)%sc.length];tone(n,0,.5,'triangle',.07,mg);
      if(step%4===0)tone(n/2,0,1,'sine',.09,mg);if(step%8===5)tone(sc[(step+3)%8]*2,0,.3,'triangle',.04,mg)},380)}
  return{init,music,
    click:()=>seq([660],.05,'square',.07),ok:()=>seq([523,659,784],.08),bad:()=>seq([200,150],.12,'sawtooth',.1),
    win:()=>seq([523,659,784,1047,784,1047,1319],.11),letter:()=>seq([988,1319,1568,1976],.09,'triangle',.14),
    coin:()=>seq([1319,1760],.06,'square',.06),tick:()=>seq([880],.04,'square',.04)};
})();

/* ---------- ตัวช่วย UI ---------- */
const fz=n=>`font-size:calc(var(--u)*${n})`;
const glyph=(ch,s=90,dim)=>`<div class="c" style="width:calc(var(--u)*${s});height:calc(var(--u)*${s});border-radius:50%;background:${dim?'#2a1409':'radial-gradient(circle at 35% 30%,#fff1b0,#d9a441 60%,#8a5a12)'};border:calc(var(--u)*3) solid ${dim?'#5a3a1a':'#fff0b0'};color:${dim?'#6b4a2a':'#4a2a08'};font-family:var(--f-disp);font-weight:700;${fz(s*.6)};box-shadow:0 0 calc(var(--u)*${dim?0:18}) rgba(255,210,90,.7)">${dim?'?':ch}</div>`;
const stars=(n,s=40)=>[1,2,3].map(i=>`<span style="${fz(s)};color:${i<=n?'#ffd34d':'#5a3a1a'};text-shadow:0 calc(var(--u)*2) 0 #140803">★</span>`).join('');
function popup(html,o={}){const m=$('#m-pop');m.innerHTML='';const c=E('div','card wood',html);c.style.padding='calc(var(--u)*34)';
  c.style.width=o.w?`calc(var(--u)*${o.w})`:'auto';c.style.minWidth='calc(var(--u)*560)';m.append(c);m.classList.add('on');return c}
function closePop(){$('#m-pop').classList.remove('on')}

/* ---------- บริบทของด่าน ---------- */
const LV={};function reg(n,o){LV[n]=Object.assign({n,W:1672,H:941,hints:[],dfs:23},o)}
let CUR=null;
const FACE={n:1,good:5,great:3,bad:2,think:4};
class Ctx{
  constructor(L,st,ov){this.L=L;this.st=st;this.ov=ov;this.W=L.W;this.H=L.H;this.hi=0;this.timers=[];this.done=false;this.stars=3;this.tw=0;this.energy=10;this.missN=0}
  pos(e,x,y,w,h){e.style.left=x/this.W*100+'%';e.style.top=y/this.H*100+'%';if(w!=null){e.style.width=w/this.W*100+'%';e.style.height=h/this.H*100+'%'}return e}
  box(x,y,w,h,cls='',html=''){const e=E('div','a '+cls,html);this.pos(e,x,y,w,h);this.ov.append(e);return e}
  hot(x,y,w,h,fn,title=''){const e=this.box(x,y,w,h,'hot');e.title=title;e.onclick=ev=>{Snd.click();fn(ev)};return e}
  cover(x,y,w,h,bg,html=''){const e=this.box(x,y,w,h,'cv',html);e.style.background=bg;return e}
  later(fn,ms){const t=setTimeout(fn,ms);this.timers.push(t);return t}
  boot(){
    const L=this.L,k=this.W/1672;
    // ไอคอนแผนที่มุมซ้ายบน : กลับหน้าเลือกด่าน (มีให้ยืนยัน)
    const mi=L.mapIcon||[8*k,6*k,96*k,90*k];
    this.hot(mi[0],mi[1],mi[2],mi[3],()=>confirmBox('กลับไปหน้าเลือกด่าน ?','ความคืบหน้าของด่านนี้ที่ยังไม่จบจะไม่ถูกบันทึก','กลับไปเลือกด่าน',()=>{this.dispose();openMap()},'เล่นต่อ'),'กลับหน้าเลือกด่าน');
    this.hot(this.W-110,5,100,95,()=>pauseMenu(),'ตั้งค่า');
    this.hot(this.W-170,95,165,55,()=>this.hint(),'คำใบ้');
    // แถบพลังปัญญา (แทน 10/10 ที่วาดติดมาในภาพ)
    const en=L.en||[1337*k,30*k,208*k,32*k];
    this.enEl=this.cover(en[0],en[1],en[2],en[3],'#35190d');this.enEl.style.borderRadius='calc(var(--u)*6)';
    this.enEl.innerHTML=`<div style="position:relative;width:100%;height:100%"><div class="enf" style="position:absolute;left:0;top:0;bottom:0;width:100%;background:linear-gradient(#ff7a5c,#d23a2a 55%,#a82418);transition:width .4s"></div><div class="ent t" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:flex-end;padding-right:calc(var(--u)*14);color:#fff;font-weight:700;${fz(26)};text-shadow:0 calc(var(--u)*2) 0 #000">10/10</div></div>`;
    const eh=this.box(en[0]-40*k,en[1]-6,en[2]+40*k,en[3]+12,'hot');eh.title='พลังปัญญา';eh.onclick=()=>{Snd.click();this.say('พลังปัญญาลดลงเมื่อตอบผิด ไม่ทำให้แพ้หรือล็อกด่าน ถ้าหมดข้าจะช่วยเติมให้ แล้วทบทวนบทเรียนอีกรอบ','think')};
    const [x,y,w,h]=L.dlg;const p=this.box(x,y,w,h,'wood');
    p.style.cssText+=';display:flex;gap:calc(var(--u)*14);padding:calc(var(--u)*10);align-items:center';
    p.innerHTML=`<img class="px kface" src="./img/ks/face1.png" style="height:100%;aspect-ratio:1;object-fit:contain"><div style="flex:1;min-width:0;height:100%;display:flex;flex-direction:column;overflow:hidden"><div class="t" style="color:var(--gold2);${fz(26)};font-weight:600">ขุนอักษร</div><div class="say" style="${fz(L.dfs)};flex:1"></div></div>`;
    this.dlgEl=p;L.init(this);if(L.intro)this.say(L.intro,'n');
  }
  dispose(){this.timers.forEach(clearTimeout);this.timers=[];this.tw++;CUR=null}
  drawEnergy(){const f=this.enEl&&this.enEl.querySelector('.enf'),t=this.enEl&&this.enEl.querySelector('.ent');if(!f)return;f.style.width=Math.max(0,this.energy)*10+'%';t.textContent=this.energy+'/10'}
  miss(){this.missN++;this.energy=Math.max(0,this.energy-1);this.drawEnergy();if(this.energy===0&&!this.done)this.energyOut()}
  energyOut(){
    const c=popup(`<div class="c" style="flex-direction:column;gap:calc(var(--u)*12);text-align:center;max-width:calc(var(--u)*760)"><div class="mh">พลังปัญญาหมดแล้ว</div><div class="mb" style="line-height:1.5">ไม่ต้องกังวล ด่านไม่ถูกล็อก ข้าเติมพลังให้ครึ่งหนึ่ง ลองทบทวนบทเรียนอีกรอบก่อนลองต่อ</div><div class="row" id="eo" style="margin-top:calc(var(--u)*8)"></div></div>`);
    const eo=$('#eo',c),refill=()=>{this.energy=5;this.drawEnergy()};
    eo.append(mkBtn('ทบทวนบทเรียน',()=>{closePop();refill();this.lesson()}),mkBtn('เติมพลังแล้วเล่นต่อ',()=>{closePop();refill()},1));
  }
  say(txt,mood='n'){
    if(!this.dlgEl)return;const k=this.dlgEl.querySelector('.kface'),s=this.dlgEl.querySelector('.say');
    k.src=`./img/ks/face${FACE[mood]||1}.png`;const id=++this.tw;let i=0;
    s.textContent=txt;shrink(s);s.textContent='';
    const step=()=>{if(id!==this.tw)return;i+=2;s.textContent=txt.slice(0,i);if(i<txt.length)setTimeout(step,16)};step();
  }
  toast(msg,kind='gold'){const t=E('div','toast wood '+kind,msg);this.ov.append(t);setTimeout(()=>t.remove(),2400);
    kind==='good'?Snd.ok():kind==='bad'?Snd.bad():Snd.coin()}
  hint(){const H=this.L.hints;if(!H.length)return this.say('ลองทบทวนบทเรียนจากปุ่มความรู้เพิ่มเติมดูนะ','think');
    const i=Math.min(this.hi,H.length-1);this.say(`คำใบ้ ${i+1}/${H.length} : ${H[i]}`,'think');this.hi++}
  lesson(pg){openLesson(this.L.n,null,true,pg)}
  /* อักษรโบราณ : ปรากฏเป็นแสงในฉากทันทีที่ผ่านด่าน */
  armLetter(){
    const n=this.L.n,l=this.L.letter;if(!l||S.letters[n]||this.letterArmed)return;this.letterArmed=true;
    const g=this.box(l.x,l.y,l.w,l.h,'glim');g.title='แสงประหลาด';
    g.onclick=()=>{S.letters[n]=1;save();g.remove();Snd.letter();this.toast(`ได้อักษรโบราณตัวที่ ${n} : ${LETTERS[n-1]}`,'gold');
      const m=this.box(0,0,this.W,this.H,'c pop');m.style.pointerEvents='none';m.innerHTML=glyph(LETTERS[n-1],200);setTimeout(()=>m.remove(),1500);
      this.say(`เจ้าพบอักษรโบราณแล้ว! สะสมได้ ${nLetters()}/8 ตัว`,'great');
      if(this.done)this.later(()=>this.result(this.lastRes.stars,this.lastRes.extra),1700)};
    this.later(()=>{if(!S.letters[n])this.say(l.h1,'think')},14000);
    this.later(()=>{if(!S.letters[n])this.say(l.h2,'think')},30000);
  }
  /* ผ่านด่าน */
  win(stars,extra=''){
    if(this.done)return;this.done=true;const n=this.L.n;stars=Math.max(1,stars);
    S.done[n]=Math.max(S.done[n]||0,stars);save();Snd.win();this.lastRes={stars,extra};
    // ปุ่มดูผลคะแนน/ไปต่อ ค้างอยู่ตลอด ไม่ติดหน้าด่าน
    const k=this.W/1672,px=(this.L.titleEnd||700*k)+15;
    const pw=Math.min(430*k,Math.max(300*k,1300*k-px));
    const pill=this.box(px,12,pw,60,'gbtn');
    pill.style.cssText+=`;${fz(24)};cursor:pointer;z-index:5`;pill.textContent='ผ่านด่านแล้ว ดูผลคะแนน ▶';pill.onclick=()=>{Snd.click();this.result(stars,extra)};
    const need=n<=8&&this.L.letter&&!S.letters[n];
    if(need)this.later(()=>{this.armLetter();this.say('ผ่านด่านแล้ว! มีแสงของอักษรโบราณซ่อนอยู่ในฉากนี้ ลองมองหาแสงระยิบระยับแล้วแตะดู (หรือกดปุ่มด้านบนเพื่อดูผลคะแนนก่อนก็ได้)','great')},900);
    else this.later(()=>this.result(stars,extra),1300);
  }
  result(stars,extra){
    const n=this.L.n,got=!!S.letters[n]||n>8||!this.L.letter;
    const c=popup(`<div class="c" style="flex-direction:column;gap:calc(var(--u)*14);text-align:center">
      <div class="mh">ผ่านด่านที่ ${n} !</div><div class="t" style="${fz(32)}">${META[n].n}</div>
      <div>${stars_(stars)}</div>${extra?`<div class="mb" style="max-width:calc(var(--u)*760)">${extra}</div>`:''}
      ${n<=8&&this.L.letter?`<div class="row" style="${fz(26)}">${glyph(LETTERS[n-1],70,!S.letters[n])}<span>${S.letters[n]?'ได้อักษรโบราณแล้ว':'ยังมีแสงอักษรโบราณรออยู่ในฉากนี้'}</span></div>`:''}
      <div class="row" id="rb" style="margin-top:calc(var(--u)*10)"></div></div>`);
    const rb=$('#rb',c),mk=(t,f,g)=>{const b=E('div',(g?'gbtn':'dbtn'),t);b.style.cssText=`${fz(28)};padding:calc(var(--u)*12) calc(var(--u)*30)`;b.onclick=()=>{Snd.click();f()};rb.append(b)};
    if(!got)mk('กลับไปหาแสง',()=>{closePop();this.armLetter();this.say('มองหาแสงระยิบระยับในฉาก แล้วแตะดูนะ','think')});
    mk('แผนที่ด่าน',()=>{closePop();this.dispose();openMap()});
    mk('เล่นซ้ำ',()=>{closePop();this.dispose();playLevel(n,true)});
    const nx=n+1;
    if(n===8&&nLetters()>=8&&!S.special)mk('ไขปริศนาอักษรโบราณ',()=>{closePop();this.dispose();letterPuzzle()},1);
    else if(nx<=10&&isUnlocked(nx))mk('ด่านถัดไป ▶',()=>{closePop();this.dispose();playLevel(nx)},1);
    else if(n===DEMO_MAX)mk('กลับแผนที่ (จบเดโม)',()=>{closePop();this.dispose();openMap()},1);
  }
}
/* กล่องยืนยันทั่วไป */
function confirmBox(title,msg,okText,okFn,cancelText='ยกเลิก'){
  const c=popup(`<div class="c" style="flex-direction:column;gap:calc(var(--u)*14);text-align:center;max-width:calc(var(--u)*760)"><div class="mh">${title}</div><div class="mb" style="line-height:1.5">${msg}</div><div class="row" id="cb" style="margin-top:calc(var(--u)*8)"></div></div>`);
  const cb=$('#cb',c);cb.append(mkBtn(cancelText,closePop),mkBtn(okText,()=>{closePop();okFn()},1));
}
const stars_=n=>stars(n,60);
