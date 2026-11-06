'use strict';
/* ===== ด่าน 5-8 ===== */

/* ---------- ด่าน 5 : ประตูพระคลังหลวง ---------- */
reg(5,{img:'l5.webp',dlg:[14,752,690,182],
 intro:'ประตูพระคลังหลวงถูกปิด ต้องรู้ว่าเกิดเพราะอะไร แตะการ์ดสาเหตุด้านบน แล้วแตะการ์ดผลที่เกิดตามมา เพื่อเชื่อมเหตุกับผล ลิงก์ที่ถูกจะคงอยู่ ที่ผิดจะบอกเหตุผล',
 hints:['ลองถามตัวเองว่า เหตุการณ์นี้ทำให้ข้าวขาด หรือทำให้คนเดือดร้อน','น้ำท่วมหนักทำให้เกิดผลได้มากกว่าหนึ่งอย่าง','การค้าต่างประเทศเพิ่มขึ้น หมายถึงมีคนมาซื้อข้าวมากขึ้น'],
 letter:{x:445,y:595,w:84,h:70,h1:'ประตูพระคลังปิดแล้ว แต่ในฉากมีหีบสมบัติตั้งอยู่หน้าประตู ลองสำรวจดู',h2:'แตะที่หีบสมบัติด้านซ้ายหน้าประตู'},
 init(c){
  const CA=[['a','l5_a',800,278,242,167],['b','l5_b',1066,278,248,167],['c','l5_c',1338,278,242,167]];
  const EF=[['d','l5_d',878,500,282,128],['e','l5_e_in',1222,500,283,128]];
  const OK={a:['d'],b:['e'],c:['d','e']};
  const WHY={'a>e':'การค้ากับต่างประเทศเพิ่มขึ้นทำให้มีผู้ซื้อข้าวมากขึ้น กระทบราคาข้าวก่อน ยังไม่ได้ทำให้ราษฎรเดือดร้อนโดยตรง','b>d':'โรคระบาดกระทบสุขภาพและแรงงานผู้คน ไม่ได้ทำให้ข้าวขาดโดยตรง'};
  let sel=null,links=[],wrong=0,fin=false;
  const bg=c.cover(766,266,852,498,'#3a1f10');
  const svg=c.box(0,0,c.W,c.H,'');svg.style.pointerEvents='none';svg.innerHTML=`<svg viewBox="0 0 ${c.W} ${c.H}" style="width:100%;height:100%"></svg>`;
  const S_=svg.firstChild;
  const el={};
  [...CA,...EF].forEach(([k,im,x,y,w,h])=>{
    const e=c.box(x,y,w,h,'c');e.style.cssText+=`;background:#e9c991 url(./img/s/${im}.png) center/100% 100% no-repeat;image-rendering:pixelated;border:calc(var(--u)*4) solid #8a5a22;border-radius:calc(var(--u)*6);cursor:pointer;box-shadow:0 calc(var(--u)*4) 0 #140803`;
    e.onclick=()=>{Snd.click();if(fin)return;if(CA.some(a=>a[0]===k)){sel=sel===k?null:k;paint()}else if(sel)link(sel,k);else c.toast('แตะการ์ดสาเหตุก่อน','bad')};el[k]=e});
  const fe=c.box(930,662,510,90,'wood c');fe.style.cssText+=`;gap:calc(var(--u)*14);${fz(28)};font-weight:600;color:#ffe9a8;opacity:.5`;
  fe.innerHTML=`<img class="px" src="./img/s/l5_temple.png" style="height:100%"><span class="t">จึงมีการปิดประตูพระคลังหลวง</span>`;
  const att=c.cover(766,812,242,100,'#3d2011');att.className+=' c t';att.style.cssText+=`;${fz(22)};text-align:center;line-height:1.2`;
  c.hot(1025,808,285,105,()=>c.lesson(1),'ดูสรุปเหตุการณ์');
  c.hot(1340,800,310,122,()=>confirm_(),'ยืนยันคำตอบ');
  const ctr=k=>{const r=el[k].getBoundingClientRect();return null};
  const C={};[...CA,...EF].forEach(([k,,x,y,w,h])=>C[k]=[x+w/2,y+h/2,x,y,w,h]);
  function line(a,b,col,dash){const A=C[a],B=C[b];const x1=A[0],y1=A[3]+A[5],x2=B[0],y2=B[3];return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="8" stroke-linecap="round" ${dash?'stroke-dasharray="14 12"':''}/><circle cx="${x2}" cy="${y2}" r="11" fill="${col}"/>`}
  function paint(){
    let h=links.map(([a,b])=>line(a,b,'#7cc65a')).join('');
    if(fin)h+=['d','e'].map(k=>`<line x1="${C[k][0]}" y1="${C[k][3]+C[k][5]}" x2="1185" y2="662" stroke="#ffd34d" stroke-width="8" stroke-linecap="round"/>`).join('');
    S_.innerHTML=h;
    Object.entries(el).forEach(([k,e])=>e.style.outline=sel===k?'calc(var(--u)*6) solid #fff0b0':'none');
    att.innerHTML=`ความผิดพลาด<br><b style="${fz(32)};color:${wrong>=3?'#ff9a86':'#ffd34d'}">${wrong}</b> ครั้ง`;
    fe.style.opacity=fin?1:.5}
  function link(a,b){
    sel=null;
    if(links.some(l=>l[0]===a&&l[1]===b)){paint();return}
    if(OK[a].includes(b)){links.push([a,b]);Snd.ok();c.say('เชื่อมถูกต้อง! เหตุนี้นำไปสู่ผลนี้จริงๆ','good');
      if(CA.every(([k])=>links.some(l=>l[0]===k))&&EF.every(([k])=>links.some(l=>l[1]===k))){fin=true;paint();done()}paint();return}
    wrong++;Snd.bad();const why=WHY[a+'>'+b]||'เหตุการณ์นี้ไม่ได้นำไปสู่ผลนี้โดยตรง';
    S_.innerHTML+=line(a,b,'#ff6a50',1);el[b].classList.add('bad');setTimeout(()=>{el[b].classList.remove('bad');paint()},1100);
    c.say(`คู่นี้ยังไม่ถูก : ${why}`+(wrong>=3?' (กดดูสรุปเหตุการณ์ได้เลย ไม่ต้องย้อนอ่านทั้งหมด)':''),'bad');paint()}
  function confirm_(){if(c.done)return;if(fin)done();else c.toast('ยังเชื่อมเหตุและผลไม่ครบ','bad')}
  function done(){if(c.done)return;c.say('ต้นไม้เหตุและผลสมบูรณ์! ข้าวแพงและราษฎรเดือดร้อน นำไปสู่การปิดประตูพระคลังหลวง','great');c.toast('ปิดประตูพระคลังหลวงเพราะเหตุการณ์ทั้งหมด','good');
    c.win(wrong===0?3:wrong<=2?2:1,'เจ้าเชื่อมเหตุและผลของเหตุการณ์ได้ถูกต้อง');c.later(()=>c.armLetter(),1800)}
  paint();
 }});

/* ---------- ด่าน 6 : หมู่บ้านนานาชาติ ---------- */
reg(6,{img:'l6.webp',dlg:[14,704,486,196],dfs:21,
 intro:'พ่อค้าต่างชาติสี่กลุ่มมารอนำทาง แตะที่แต่ละคนเพื่อดูสิ่งที่สังเกตได้ แล้วเลือกสัญชาติจากรายการด้านซ้าย เลือกคำเรียกและจุดหมายที่เหมาะสม',
 hints:['ดูสามอย่างพร้อมกัน : สินค้า เครื่องแต่งกาย และคำทักทาย','เปิดความรู้เพิ่มเติมเพื่ออ่านตารางสังเกตและคำเรียกที่เหมาะสม','คู่ที่แย่งตลาดสินค้าเหมือนกัน อย่าส่งไปจุดเดียวกัน'],
 letter:{x:880,y:215,w:90,h:80,h1:'พ่อค้าทุกคนไปถึงจุดหมายแล้ว ลองมองหาที่ใบเรือสำเภา',h2:'แตะที่ใบเรือสำเภาลำใหญ่กลางภาพ'},
 init(c){
  const V=[
   {k:'pe',nm:'เปอร์เซีย',x:318,y:372,w:98,h:178,img:'l6_persian',look:'ผ้าโพกศีรษะสีขาว เสื้อคลุมสีเขียว',goods:'เครื่องเทศ ผ้า',greet:'สลาม อะลัยกุม',title:'ท่านพ่อค้า',dest:['คลังสินค้า','ท่าเรือ']},
   {k:'cn',nm:'จีน',x:548,y:365,w:98,h:185,img:'l6_chinese',look:'หมวกทรงจีน เสื้อคลุมยาวสีน้ำเงิน',goods:'เครื่องกระเบื้อง ไหม',greet:'หนีห่าว',title:'เถ้าแก่',dest:['ศาลเจ้า','คลังสินค้า']},
   {k:'jp',nm:'ญี่ปุ่น',x:740,y:380,w:98,h:170,img:'l6_jp',look:'กิโมโน ผมมวย พกดาบ',goods:'ทองแดง เครื่องเหล็ก',greet:'คอนนิจิวะ',title:'ท่านนายกอง',dest:['วัด','ท่าเรือ']},
   {k:'pt',nm:'โปรตุเกส',x:940,y:378,w:110,h:172,img:'l6_pt',look:'หมวกปีกกว้าง เสื้อคลุมยุโรป',goods:'ปืน เครื่องแก้ว',greet:'โอลา',title:'ท่านกัปตัน',dest:['ท่าเรือ','คลังสินค้า']}];
  const NATS=[['pe','เปอร์เซีย',145],['cn','จีน',220],['jp','ญี่ปุ่น',295],['pt','โปรตุเกส',370]];
  const TT=['ท่านพ่อค้า','เถ้าแก่','ท่านนายกอง','ท่านกัปตัน'],DS=['ท่าเรือ','คลังสินค้า','ศาลเจ้า','วัด'];
  const RIV=[['pe','pt'],['cn','jp']];
  let cur=null,st=V.map(()=>({nat:null,tt:null,ds:null,ok:false})),conf=0,med=2,loss=0,wrong=0,phase=1,pend=null;
  const info=c.cover(1240,152,400,300,'#e8c58f');info.style.padding='calc(var(--u)*10) calc(var(--u)*18)';info.style.color='#3b2412';
  const rt=c.cover(1092,474,552,284,'#3a1f10');rt.style.padding='calc(var(--u)*10) calc(var(--u)*14)';
  const cfl=c.cover(1090,772,552,58,'#3a1f10');cfl.style.cssText+=`;display:flex;align-items:center;gap:calc(var(--u)*14);padding:0 calc(var(--u)*14)`;
  const md=c.cover(972,852,196,84,'#472612');md.className+=' c t';md.style.cssText+=`;${fz(22)};text-align:center;line-height:1.2`;
  const nl=NATS.map(([k,n,y])=>c.box(20,y,190,60,'hot'));
  nl.forEach((h,i)=>{h.onclick=()=>{Snd.click();pickNat(NATS[i][0])}});
  c.hot(20,445,190,70,()=>c.toast('อาณาจักรอยุธยาคือเจ้าบ้าน ไม่ต้องเลือก','gold'),'');
  V.forEach((v,i)=>c.hot(v.x,v.y,v.w,v.h,()=>{cur=i;phase=1;paint()},v.nm?'ผู้มาเยือน':''));
  c.hot(1182,858,0,0,()=>{});c.hot(1215,855,190,80,()=>c.lesson(1),'ความรู้เพิ่มเติม');
  c.hot(1420,838,230,98,()=>finish(),'ยืนยันเส้นทาง');
  const badge=V.map(v=>{const b=c.box(v.x+v.w/2-20,v.y-70,40,40,'c');b.style.cssText+=`;${fz(34)};color:#7cc65a;text-shadow:0 2px 0 #000`;return b});
  function pickNat(k){if(cur==null)return c.toast('แตะเลือกผู้มาเยือนก่อน','bad');const s=st[cur];if(s.ok)return;s.nat=k;
    if(k!==V[cur].k){wrong++;Snd.bad();c.say('ลองดูสินค้า เครื่องแต่งกาย และคำทักทายพร้อมกันอีกครั้ง สัญชาติที่เลือกยังไม่ตรง','bad');s.nat=null}else{Snd.ok();c.say(`ถูกต้อง เขาคือชาว${V[cur].nm} ต่อไปเลือกคำเรียกและจุดหมาย`,'good');phase=2}
    paint()}
  function paint(){
    nl.forEach((h,i)=>h.style.boxShadow=cur!=null&&st[cur].nat===NATS[i][0]?'inset 0 0 0 calc(var(--u)*4) #7cc65a':'');
    badge.forEach((b,i)=>b.textContent=st[i].ok?'✓':cur===i?'▼':'');badge.forEach((b,i)=>{if(cur===i&&!st[i].ok)b.style.color='#ffd34d';else b.style.color='#7cc65a'});
    if(cur==null){info.innerHTML=`<div class="t" style="${fz(28)};font-weight:700;color:#6a2d0a;text-align:center;margin-top:calc(var(--u)*80)">แตะที่ผู้มาเยือนเพื่อดูบันทึกการสังเกต</div>`;rt.innerHTML='';}
    else{const v=V[cur],s=st[cur];
      info.innerHTML=`<div class="t" style="${fz(28)};font-weight:700;color:#6a2d0a;text-align:center">บันทึกการสังเกต ${cur+1}/4</div><div class="row" style="align-items:flex-start;margin-top:calc(var(--u)*8)"><img class="px" src="./img/s/${v.img}.png" style="height:calc(var(--u)*170);border:3px solid #8a5a22;border-radius:6px"><div style="${fz(22)};line-height:1.45;font-weight:700"><span style="color:#8a2a10">เครื่องแต่งกาย</span> : ${v.look}<br><span style="color:#8a2a10">สินค้า</span> : ${v.goods}<br><span style="color:#8a2a10">คำทักทาย</span> : "${v.greet}"<br><span style="color:#8a2a10">สัญชาติ</span> : ${s.ok||s.nat?V[cur].nm:'ยังไม่ระบุ'}<br><span style="color:#8a2a10">สถานะ</span> : ${s.ok?'นำทางแล้ว':'รอการนำทาง'}</div></div>`;
      rt.innerHTML='';
      if(s.ok)mk(rt,'t c',`นำทาง${v.nm}ไปที่ ${s.ds} แล้ว`,`${fz(26)};height:100%;color:#9be87a`);
      else if(s.nat!==v.k)mk(rt,'t c',`เลือกสัญชาติจากรายการทางซ้ายก่อน`,`${fz(26)};height:100%;color:#d9b878`);
      else{mk(rt,'t',`เลือกคำเรียกที่เหมาะสม`,`${fz(24)};color:#ffd34d;margin-bottom:calc(var(--u)*6)`);
        const r1=mk(rt,'',``,'display:flex;gap:calc(var(--u)*8);flex-wrap:wrap');TT.forEach(t=>mk(r1,'dbtn'+(s.tt===t?' sel':''),t,`${fz(23)};padding:calc(var(--u)*6) calc(var(--u)*14)`,()=>{s.tt=t;paint()}));
        mk(rt,'t',`เลือกจุดหมาย`,`${fz(24)};color:#ffd34d;margin:calc(var(--u)*10) 0 calc(var(--u)*6)`);
        const r2=mk(rt,'',``,'display:flex;gap:calc(var(--u)*8);flex-wrap:wrap');DS.forEach(t=>mk(r2,'dbtn'+(s.ds===t?' sel':''),t,`${fz(23)};padding:calc(var(--u)*6) calc(var(--u)*14)`,()=>{s.ds=t;paint()}));
        mk(rt,'gbtn','ส่งไปเส้นทางนี้',`${fz(25)};margin-top:calc(var(--u)*12);padding:calc(var(--u)*8) calc(var(--u)*20);width:max-content`,()=>send(cur))}}
    const lv=conf===0?'ต่ำมาก':conf===1?'ปานกลาง':'สูง';const f=Math.min(100,conf*45+(conf?10:4));
    cfl.innerHTML=`<span class="t" style="${fz(24)};color:#ffe9a8">ระดับความขัดแย้ง</span><div style="flex:1;height:calc(var(--u)*20);background:#2a1409;border:3px solid #a8731d;border-radius:10px;overflow:hidden"><div style="width:${f}%;height:100%;background:${conf?'#c8442f':'#5aa63f'}"></div></div><span class="t" style="${fz(24)};color:${conf?'#ff9a86':'#9be87a'}">${lv}</span>`;
    md.innerHTML=`ไกล่เกลี่ย<br><b style="${fz(30)};color:#ffd34d">${med} / 2</b>`}
  function send(i){
    const v=V[i],s=st[i];if(!s.tt||!s.ds)return c.toast('เลือกคำเรียกและจุดหมายให้ครบ','bad');
    if(s.tt!==v.title){wrong++;Snd.bad();c.say(`คำเรียกนี้ยังไม่เหมาะกับชาว${v.nm} ดูตารางคำเรียกในบทเรียน`,'bad');s.tt=null;paint();return}
    if(!v.dest.includes(s.ds)){wrong++;Snd.bad();c.say(`จุดหมายนี้ยังไม่เหมาะกับชาว${v.nm} พิจารณาสินค้าและความเชื่อของพวกเขา`,'bad');s.ds=null;paint();return}
    s.ok=true;Snd.ok();const rv=RIV.find(p=>p.includes(v.k));
    const o=rv&&V.findIndex(x=>x.k===rv.find(y=>y!==v.k));
    if(rv&&st[o].ok&&st[o].ds===s.ds){conf++;paint();return mediate(v,V[o],s.ds)}
    c.say(`นำ${v.nm}ไป${s.ds}เรียบร้อย`,'good');paint();
    if(st.every(x=>x.ok))c.toast('นำทางครบทุกคนแล้ว กด ยืนยันเส้นทาง','gold')}
  function mediate(a,b,d){
    c.say(`เกิดความขัดแย้ง! ชาว${a.nm}กับชาว${b.nm}แย่งตลาดและมาถึง${d}พร้อมกัน เลือกวิธีไกล่เกลี่ย`,'bad');Snd.bad();
    const p=popup(`<div class="mh" style="text-align:center">ไกล่เกลี่ยความขัดแย้ง</div><div class="mb" style="margin:calc(var(--u)*12) 0;text-align:center">${a.nm} และ ${b.nm} ต้องการใช้${d}พร้อมกัน เหลือโอกาสไกล่เกลี่ย ${med} ครั้ง</div><div id="mo" style="display:flex;flex-direction:column;gap:calc(var(--u)*10)"></div>`);
    [['แยกเวลาเข้า และให้ขุนนางกรมท่าเป็นคนกลาง',1],['ปล่อยให้ตกลงกันเอง',0],['ใช้ทหารบังคับให้ฝ่ายหนึ่งถอย',0]].forEach(([t,r])=>$('#mo',p).append(mkBtn(t,()=>{
      if(r){closePop();conf--;Snd.ok();c.say('ไกล่เกลี่ยสำเร็จ ทั้งสองฝ่ายยอมแยกเวลากัน','great');paint();if(st.every(x=>x.ok))c.toast('นำทางครบทุกคนแล้ว กด ยืนยันเส้นทาง','gold')}
      else{med--;Snd.bad();c.say('วิธีนี้ยังไม่ได้ผล'+(med>0?' ลองวิธีอื่น':' หมดโอกาสไกล่เกลี่ย เสียคะแนนบางส่วน แต่ยังผ่านด่านได้'),'bad');
        if(med<=0){closePop();loss=1;conf=0;paint()}else{closePop();mediate(a,b,d)}paint()}})))}
  function finish(){if(c.done)return;if(!st.every(x=>x.ok))return c.toast('ยังนำทางไม่ครบทุกคน','bad');
    c.say('นำทางทุกคนถึงจุดหมายอย่างเรียบร้อย พวกเขาขอบคุณเจ้ามาก','great');c.win(Math.max(1,3-loss-(wrong>3?1:0)),loss?'ไกล่เกลี่ยไม่สำเร็จ เสียคะแนนบางส่วน':'นำทางชาวต่างชาติได้อย่างราบรื่น');c.later(()=>c.armLetter(),1800)}
  paint();
 }});
