'use strict';
/* ===== เมนูหลัก, แผนที่เลือกด่าน, บทเรียนก่อนเล่น, ตั้งค่า, ปริศนาอักษรโบราณ ===== */
function mkBtn(t,f,g,fs=28){const b=E('div',g?'gbtn':'dbtn',t);b.style.cssText=`${fz(fs)};padding:calc(var(--u)*12) calc(var(--u)*30)`;b.onclick=()=>{Snd.click();f()};return b}

/* ---------- เมนูหลัก ---------- */
function openMenu(){
  CUR=null;show('s-menu');
  const {st,ov}=makeStage($('#s-menu'),'menu.webp',1672,941);
  const h=(x,y,w,hh,f,t)=>{const e=E('div','hot');e.style.cssText=`left:${x/16.72}%;top:${y/9.41}%;width:${w/16.72}%;height:${hh/9.41}%`;e.title=t||'';e.onclick=()=>{Snd.init();Snd.click();f()};ov.append(e)};
  h(625,380,420,92,()=>openLesson('P',()=>{S.seenP=1;save();openMap()}),'เริ่มเกม');
  h(655,487,360,76,settings,'ตั้งค่า');
  h(655,573,360,76,howTo,'วิธีเล่น');
  h(655,658,360,76,credits,'เครดิต');
  h(655,745,360,76,()=>popup(`<div class="c mb" style="flex-direction:column;gap:20px;text-align:center"><div class="mh">ขอบคุณที่เล่น</div><div>ปิดแท็บนี้เพื่อออกจากเกม ความคืบหน้าถูกบันทึกอัตโนมัติ</div></div>`).append(mkBtn('กลับไปเล่นต่อ',closePop,1)),'ออกเกม');
  h(1383,845,75,75,collection,'อักษรโบราณ');
  h(1475,845,75,75,knowledge,'คลังความรู้');
  h(1568,845,75,75,goFull,'เต็มจอ');
}
function settings(){
  const c=popup(`<div class="mh" style="text-align:center;margin-bottom:calc(var(--u)*20)">ตั้งค่า</div><div id="st" style="display:flex;flex-direction:column;gap:calc(var(--u)*14)"></div>`);
  const box=$('#st',c);
  const tg=(label,key,cb)=>{const b=mkBtn('',()=>{S[key]=!S[key];save();r();cb&&cb()});const r=()=>b.textContent=`${label} : ${S[key]?'เปิด':'ปิด'}`;r();box.append(b)};
  tg('เสียงเอฟเฟกต์','sfx');tg('เพลงประกอบ','music',()=>Snd.music(S.music));
  box.append(mkBtn('เต็มจอ',goFull));
  box.append(mkBtn('ล้างข้อมูลการเล่นทั้งหมด',()=>{S.done={};S.letters={};S.special=false;save();closePop();openMenu()}));
  box.append(mkBtn('ปิด',closePop,1));
}
function pauseMenu(){
  const c=popup(`<div class="mh" style="text-align:center;margin-bottom:calc(var(--u)*20)">พักเกม</div><div id="st" style="display:flex;flex-direction:column;gap:calc(var(--u)*14)"></div>`);
  const box=$('#st',c);
  box.append(mkBtn('เล่นต่อ',closePop,1));
  if(CUR)box.append(mkBtn('อ่านบทเรียนอีกครั้ง',()=>{closePop();CUR.lesson()}));
  box.append(mkBtn('เสียง/เพลง/เต็มจอ',()=>{closePop();settings()}));
  box.append(mkBtn('กลับแผนที่ด่าน',()=>{closePop();openMap()}));
  box.append(mkBtn('กลับเมนูหลัก',()=>{closePop();openMenu()}));
}
function howTo(){
  popup(`<div class="mh" style="text-align:center">วิธีเล่น</div><div class="mb" style="line-height:1.55;max-width:calc(var(--u)*880);margin:calc(var(--u)*16) 0">
  1. เลือกด่านจากแผนที่ ก่อนเล่นทุกด่านขุนอักษรจะสอนความรู้ประวัติศาสตร์สมัยอยุธยาที่ใช้แก้ปริศนาในด่านนั้น<br>
  2. ในด่านไม่มีเฉลยตรงๆ ต้องใช้ความรู้ที่ได้เรียนมาคิดเอง ปุ่มความรู้เพิ่มเติมเปิดบทเรียนอ่านซ้ำได้ตลอด<br>
  3. ตอบผิดไม่ถูกล็อกถาวร ระบบบอกสาเหตุที่ผิด และปุ่มคำใบ้ช่วยได้ทีละขั้น<br>
  4. ทุกด่านหลัก 1 ถึง 8 มีอักษรโบราณซ่อนอยู่ ต้องทำตามเงื่อนไขของฉากจึงจะปรากฏ<br>
  5. สะสมครบ 8 ตัวแล้วเรียงเป็นคำศัพท์ให้ถูก เพื่อปลดล็อกด่านพิเศษ 9 และ 10</div>`).append(mkBtn('เข้าใจแล้ว',closePop,1));
}
function credits(){popup(`<div class="mh" style="text-align:center">เครดิต</div><div class="mb" style="text-align:center;line-height:1.6;margin:calc(var(--u)*14) 0">เกมการเรียนรู้ประวัติศาสตร์สมัยอยุธยา<br>ภาพฉากพิกเซลอาร์ตและตัวละครขุนอักษรตามที่ผู้จัดทำจัดเตรียมไว้</div>`).append(mkBtn('ปิด',closePop,1))}
function collection(){
  const c=popup(`<div class="mh" style="text-align:center">อักษรโบราณที่สะสม ${nLetters()}/8</div><div class="row" style="justify-content:center;margin:calc(var(--u)*20) 0">${LETTERS.map((ch,i)=>glyph(ch,92,!S.letters[i+1])).join('')}</div>
  <div class="mb" style="text-align:center">${S.special?'ปลดล็อกด่านพิเศษแล้ว : '+WORD:'สะสมครบ 8 ตัวแล้วนำมาเรียงเป็นคำศัพท์เพื่อปลดล็อกด่านพิเศษ'}</div>`);
  if(nLetters()>=8&&!S.special)c.append(mkBtn('เรียงอักษร',()=>{closePop();letterPuzzle()},1));
  c.append(mkBtn('ปิด',closePop));c.querySelectorAll('.gbtn,.dbtn').forEach(b=>b.style.margin='calc(var(--u)*14) calc(var(--u)*6) 0')
}
function knowledge(){
  const c=popup(`<div class="mh" style="text-align:center">คลังความรู้ของขุนอักษร</div><div id="kl" style="display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*10);margin-top:calc(var(--u)*18)"></div>`);
  const g=$('#kl',c);
  {const b0=mkBtn('บทนำ Prologue : เรื่องราวและแผนการเรียนรู้',()=>{closePop();openLesson('P',null,true)});b0.style.fontSize='calc(var(--u)*24)';b0.style.gridColumn='1 / span 2';g.append(b0)}
  for(let n=1;n<=10;n++){const b=mkBtn(`ด่านที่ ${n} ${META[n].n}`,()=>{closePop();openLesson(n,null,true)});b.style.fontSize='calc(var(--u)*24)';if(!isUnlocked(n))b.classList.add('dim');g.append(b)}
  c.append(mkBtn('ปิด',closePop,1));c.lastChild.style.marginTop='calc(var(--u)*16)';
}

/* ---------- แผนที่เลือกด่าน ---------- */
let SEL=1;
const NODE={1:[88,280,170,88],2:[358,318,150,76],3:[595,295,150,76],4:[853,342,144,74],5:[1088,345,150,78],6:[190,495,152,76],7:[428,545,148,76],8:[668,548,148,82],9:[893,565,146,82],10:[1102,568,150,82]};
function openMap(){
  CUR=null;show('s-map');closePop();$('#m-lesson').classList.remove('on');
  const {st,ov}=makeStage($('#s-map'),'map.webp',1672,941);
  const P=(e,x,y,w,h)=>{e.style.cssText+=`;left:${x/16.72}%;top:${y/9.41}%;width:${w/16.72}%;height:${h/9.41}%`;ov.append(e);return e};
  const A=(cls,x,y,w,h,html,css)=>{const e=E('div','a '+cls,html);if(css)e.style.cssText=css;return P(e,x,y,w,h)};
  for(let n=1;n<=10;n++){
    const [x,y,w,h]=NODE[n],lock=!isUnlocked(n),st_=S.done[n]||0;
    if(n>=9){ // แทนที่ไอคอนกุญแจที่วาดติดมาในภาพ
      const ic=A('cv c',x+22,y-72,w-44,70,'', 'background:radial-gradient(circle,#5a3a1a,#2a1409);border-radius:50% 50% 8px 8px;border:3px solid #a8731d');
      ic.innerHTML=lock?'':`<img class="px" src="./img/s/${n===9?'l9_i1':'l10_s4'}.png" style="height:100%">`;if(lock)ic.innerHTML='<div class="t" style="font-size:calc(var(--u)*20);color:#a89070">ล็อก</div>';
    }
    A('cv c wood',x,y,w,h,`<div class="t" style="line-height:1.1">${n>=9?'ด่านพิเศษ '+n:'ด่านที่ '+n}<br>${lock?`<span style="color:#8a7a68">${n>DEMO_MAX?'เร็วๆ นี้':'ล็อก'}</span>`:stars(st_,22)}</div>`,
      `${fz(22)};font-weight:600;color:${lock?'#a89070':'#fff3c8'};${n===SEL?'box-shadow:0 0 0 calc(var(--u)*4) #fff0b0,0 0 calc(var(--u)*28) #ffd34d;':''}${lock?'filter:grayscale(.7)':''}`);
    const hz=E('div','hot');hz.onclick=()=>{Snd.click();SEL=n;openMap()};P(hz,x-6,y-(n>=9?80:100),w+12,h+(n>=9?80:100));
  }
  // แผงรายละเอียดด่านด้านขวา
  const n=SEL,lock=!isUnlocked(n),m=META[n];
  A('cv c',1290,160,365,92,`<div class="t" style="color:#ffe9a8;line-height:1.2"><div style="${fz(34)};font-weight:700">${n>=9?'ด่านพิเศษ '+n:'ด่านที่ '+n}</div><div style="${fz(26)}">${m.n}</div></div>`,'background:#672305');
  A('cv wood',1310,268,322,186,lock?`<div class="c t" style="height:100%;${fz(34)};color:#a89070">ล็อกอยู่</div>`:'',`background:url(./img/l${n}.webp) center/cover;image-rendering:pixelated;${lock?'filter:grayscale(1) brightness(.35)':''}`);
  A('cv c',1305,462,340,102,`<div style="${fz(22)};line-height:1.35;color:#4a2510;font-weight:600;padding:0 6px">${lock?(n>DEMO_MAX?'ด่านนี้จะเปิดในเวอร์ชันเต็ม (เดโมเล่นได้ด่าน 1 ถึง 4)':'ผ่านด่านก่อนหน้าเพื่อปลดล็อก'):m.d}</div>`,'background:#fcca87');
  A('cv c',1304,574,338,116,`<div class="t" style="line-height:1.35;text-align:center"><div style="${fz(24)};color:#ffe9a8">ผลงานของคุณ</div>${stars(S.done[n]||0,36)}<div style="${fz(22)}">${n<=8?'อักษรโบราณ : '+(S.letters[n]?'ได้แล้ว  '+LETTERS[n-1]:'ยังไม่พบ'):'ด่านพิเศษ'}</div></div>`,'background:#773211');
  const go=E('div','hot');go.onclick=()=>{if(lock){Snd.bad();return}Snd.click();playLevel(n)};P(go,1320,705,305,95);
  // แถบล่าง
  const bk=E('div','hot');bk.onclick=()=>{Snd.click();openMenu()};P(bk,30,830,325,95);
  const f=nLetters()/8*100;
  const ct=A('cv c',552,832,462,92,`<div style="width:100%;padding:0 calc(var(--u)*18)"><div class="t" style="${fz(26)};color:#ffe9a8;text-align:left">สะสมอักษรโบราณ ${nLetters()} / 8 ${nLetters()>=8&&!S.special?' (แตะเพื่อเรียงอักษร)':''}</div><div style="height:calc(var(--u)*22);border:3px solid #d9a441;border-radius:12px;margin-top:4px;background:#3a1a08;overflow:hidden"><div style="width:${f}%;height:100%;background:linear-gradient(#ffe08a,#d9a441)"></div></div></div>`,'background:#6c2505');
  ct.style.cursor='pointer';ct.onclick=()=>{Snd.click();nLetters()>=8&&!S.special?letterPuzzle():collection()};
  const gear=E('div','hot');gear.onclick=()=>{Snd.click();settings()};P(gear,1575,12,85,85);
}
function playLevel(n,skip){
  if(!isUnlocked(n))return;
  const go=()=>{show('s-level');const L=LV[n];if(!L){popup(`<div class="mb">ด่านนี้กำลังเตรียมอยู่</div>`).append(mkBtn('ปิด',closePop,1));return}
    const {st,ov}=makeStage($('#s-level'),L.img,L.W,L.H);CUR=new Ctx(L,st,ov);CUR.boot()};
  if(skip||!LESSONS[n])go();else openLesson(n,go);
}

/* ---------- บทเรียนก่อนเล่น (ขุนอักษร) ---------- */
function openLesson(n,onStart,reread,page){
  const Ls=LESSONS[n];if(!Ls){onStart&&onStart();return}
  const m=$('#m-lesson');m.innerHTML='';m.classList.add('on');
  let i=Math.min(page||0,Ls.pages.length-1),maxp=reread?Ls.pages.length-1:i;
  const card=E('div','card wood');card.style.cssText='width:calc(var(--u)*1580);height:calc(var(--u)*880);display:flex;padding:calc(var(--u)*18);gap:calc(var(--u)*18)';
  card.innerHTML=`<div style="width:calc(var(--u)*330);flex:none;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;background:radial-gradient(ellipse at 50% 60%,#5a3516,#1b0d05 72%);border-radius:calc(var(--u)*8);border:3px solid #6b3d1b;overflow:hidden;position:relative">
     <img id="kp" class="px" style="height:88%;-webkit-mask-image:radial-gradient(ellipse 62% 58% at 50% 52%,#000 62%,transparent 100%);mask-image:radial-gradient(ellipse 62% 58% at 50% 52%,#000 62%,transparent 100%)">
     <div class="t c" style="position:absolute;bottom:calc(var(--u)*14);left:0;right:0;color:var(--gold2);${fz(30)};font-weight:600">ขุนอักษร</div></div>
   <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:calc(var(--u)*12)">
     <div class="t" style="color:var(--gold2);${fz(24)}">${n==='P'?'Prologue · ก่อนเริ่มการผจญภัย':`บทเรียนก่อนเล่น · ด่านที่ ${n} ${META[n].n}`}</div>
     <div id="lp" class="parch" style="flex:1;padding:calc(var(--u)*26) calc(var(--u)*34);overflow:auto"></div>
     <div class="row" id="ln" style="justify-content:space-between"></div></div>`;
  m.append(card);
  function render(){
    const p=Ls.pages[i];$('#kp',card).src=`./img/ks/pose${(i%5)+1}.png`;
    $('#lp',card).innerHTML=`<div style="animation:fadein .25s"><div class="t" style="${fz(40)};font-weight:700;color:#5a2d0c;margin-bottom:calc(var(--u)*12)">${p.h}</div>
      ${p.html?`<div style="${fz(27)};line-height:1.5;font-family:var(--f-body);font-weight:600">${p.html}</div>`:''}
      ${(p.img||[]).length?`<div class="row" style="margin-bottom:12px">${p.img.map(s=>`<img class="px" src="./img/s/${s}.png" style="height:calc(var(--u)*${p.ih||120});border:3px solid #8a5a22;border-radius:6px">`).join('')}</div>`:''}
      ${(p.p||[]).map(t=>`<p style="${fz(29)};line-height:1.5;margin:0 0 calc(var(--u)*10);font-family:var(--f-body);font-weight:600">${t}</p>`).join('')}
      ${p.key?`<div style="margin-top:calc(var(--u)*12);padding:calc(var(--u)*12) calc(var(--u)*18);background:#f6e2b0;border:3px solid #c98f35;border-radius:8px;${fz(28)};font-weight:700;color:#6a2d0a"><span style="color:#b3392b">จำไว้ : </span>${p.key}</div>`:''}</div>`;
    $('#lp',card).scrollTop=0;
    const nav=$('#ln',card);nav.innerHTML='';
    const L=i>0?mkBtn('◀ ก่อนหน้า',()=>{i--;render()}):E('div');
    const dots=E('div','row','');dots.style.gap='calc(var(--u)*8)';
    Ls.pages.forEach((_,k)=>dots.innerHTML+=`<span style="width:calc(var(--u)*16);height:calc(var(--u)*16);border-radius:50%;background:${k===i?'#ffd34d':k<=maxp?'#a8731d':'#4a2a14'}"></span>`);
    const last=i===Ls.pages.length-1;
    const R=last?mkBtn(onStart?(n==='P'?'เริ่มการผจญภัย ▶':'เริ่มด่าน ▶'):'ปิดบทเรียน',()=>{m.classList.remove('on');onStart&&onStart()},1):mkBtn('ถัดไป ▶',()=>{i++;maxp=Math.max(maxp,i);render()},1);
    nav.append(L,dots,R);
    if(onStart&&(n==='P'?S.seenP:S.done[n])&&!last){const sk=mkBtn(n==='P'?'ข้าม Prologue':'ข้ามบทเรียน',()=>{m.classList.remove('on');onStart()});sk.style.fontSize='calc(var(--u)*22)';nav.insertBefore(sk,dots)}
  }
  render();
}

/* ---------- ปริศนาอักษรโบราณ ---------- */
function letterPuzzle(){
  const order=[5,0,7,2,6,1,4,3];let pick=[];
  const c=popup(`<div class="mh" style="text-align:center">ปริศนาอักษรโบราณ</div>
   <div class="mb" style="text-align:center;max-width:calc(var(--u)*900);margin:calc(var(--u)*12) auto;line-height:1.5">เรียงอักษรทั้ง 8 ตัวเป็นชื่อวัดโบราณแห่งหนึ่งในอยุธยา : วัดที่เจ้าสามพระยาสร้างขึ้น ณ สถานที่ถวายพระเพลิงพระเชษฐาทั้งสอง และเป็นวัดที่มีกรุสมบัติลึกลับ (คำว่า วัด ไม่ต้องใส่)</div>
   <div id="pw" class="row" style="justify-content:center;min-height:calc(var(--u)*100);margin:calc(var(--u)*10) 0"></div>
   <div id="pt" class="row" style="justify-content:center;flex-wrap:wrap;margin:calc(var(--u)*10) 0"></div><div id="pb" class="row" style="justify-content:center;margin-top:calc(var(--u)*16)"></div>`);
  const draw=()=>{
    $('#pw',c).innerHTML=Array.from({length:8},(_,k)=>pick[k]!=null?glyph(LETTERS[pick[k]],86):`<div style="width:calc(var(--u)*86);height:calc(var(--u)*86);border:3px dashed #a8731d;border-radius:50%"></div>`).join('');
    const t=$('#pt',c);t.innerHTML='';
    order.forEach(ix=>{const e=E('div','',glyph(LETTERS[ix],92,false));e.style.cursor='pointer';e.style.opacity=pick.includes(ix)?.25:1;
      e.onclick=()=>{if(pick.includes(ix))return;Snd.click();pick.push(ix);draw()};t.append(e)});
  };draw();
  const pb=$('#pb',c);
  pb.append(mkBtn('ลบตัวล่าสุด',()=>{pick.pop();draw()}),mkBtn('ล้าง',()=>{pick=[];draw()}),mkBtn('ตรวจคำตอบ',()=>{
    const w=pick.map(k=>LETTERS[k]).join('');
    if(w===WORD){S.special=true;save();Snd.win();c.innerHTML=`<div class="c" style="flex-direction:column;gap:18px;text-align:center"><img class="px" src="./img/ks/face5.png" style="height:calc(var(--u)*140)"><div class="mh">ถูกต้อง : ${WORD}</div><div class="mb" style="max-width:calc(var(--u)*760)">กรุสมบัติเปิดแล้ว! ด่านพิเศษ 9 กรุสมบัติวัดราชบูรณะ และด่านพิเศษ 10 พระราชวังหลวง ปลดล็อกแล้ว</div></div>`;
      c.append(mkBtn('ไปที่แผนที่ด่าน',()=>{closePop();SEL=9;openMap()},1));c.lastChild.style.margin='20px auto 0'}
    else{Snd.bad();$('#pw',c).style.animation='shake .35s';setTimeout(()=>$('#pw',c).style.animation='',400);if(pick.length<8)return;pick=[];draw()}
  },1));
}

/* ---------- เริ่มระบบ ---------- */
layout();openMenu();
