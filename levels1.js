'use strict';
/* ===== ด่าน 1-4 ===== */
const mk=(p,cls,html,css,fn)=>{const e=E('div',cls,html);if(css)e.style.cssText=css;if(fn)e.onclick=ev=>{Snd.click();fn(e,ev)};p.append(e);return e};
const WB='background:linear-gradient(#4d2a14,#2a1409);border:calc(var(--u)*3) solid #a8731d;border-radius:calc(var(--u)*5);';
const PB='background:#e6cd9d;color:#3b2412;border:calc(var(--u)*3) solid #8a5a22;border-radius:calc(var(--u)*5);';

/* ---------- ด่าน 1 : ร่องรอยแห่งวัดมหาธาตุ ---------- */
reg(1,{img:'l1.webp',dlg:[14,764,690,172],
 intro:'ยินดีต้อนรับสู่วัดมหาธาตุ ข้าคือขุนอักษร ในบันทึกของนักโบราณคดี มีหลักฐานปีที่สร้างของโบราณสถานสามแห่ง จงจับคู่แต่ละแห่งให้ตรงกับยุคสมัยของอยุธยา',
 hints:['ดูปีที่สร้างของแต่ละแห่ง แล้วเทียบกับช่วงเวลาของแต่ละยุคจากบทเรียน','ยุคกลางคือช่วงกลางของอยุธยา ราวปี พ.ศ. 1991–2231','ใช้รูปทรงเจดีย์ช่วยยืนยัน ยอดเรียวแหลมกับยอดทรงระฆังอยู่คนละปลายของเวลา'],
 letter:{x:405,y:392,w:78,h:78,h1:'มองหาแสงระยิบระยับตรงรากไม้ข้างพระพักตร์',h2:'แตะที่แสงใกล้รากไม้ด้านซ้ายของพระพักตร์'},
 init(c){
  const SP=[{k:'mid',img:'l1_hint2',yr:'ราว พ.ศ. 2173'},{k:'late',img:'l1_hint3',yr:'ราว พ.ศ. 2275'},{k:'early',img:'l1_hint1',yr:'ราว พ.ศ. 1917'}];
  const ERA=[['early','ยุคต้น'],['mid','ยุคกลาง'],['late','ยุคปลาย']];
  const NM=Object.fromEntries(ERA);
  let as=[null,null,null],ok=[0,0,0],sel=null,tries=0,wrong=0,mode='play',bad=[0,0,0];
  const panel=c.cover(930,470,688,304,'#3b2110');panel.style.padding='calc(var(--u)*10) calc(var(--u)*14)';
  const att=c.cover(924,824,224,98,'#4a2810');att.className+=' c t';att.style.cssText+=`;${fz(21)};line-height:1.15;color:#f1e2c0;text-align:center`;
  c.hot(1168,818,235,108,()=>c.lesson(),'ความรู้เพิ่มเติม');
  c.hot(1425,818,225,115,()=>check(),'ตกลง');
  const settle=()=>{att.innerHTML=`ความพยายาม<br><b style="${fz(34)};color:${tries>=3?'#ff9a86':'#ffd34d'}">${tries} / 3</b>`};
  function pair(kind,i){ // เลือกคู่
    if(sel&&sel.t!==kind){const e=kind==='e'?i:sel.i,s=kind==='s'?i:sel.i;as[s]=e;bad[s]=0;sel=null;if(!ok[s])Snd.tick()}else sel={t:kind,i};draw()}
  function draw(){
    panel.innerHTML='';
    if(mode==='quiz')return quiz();
    const row=mk(panel,'',``,'display:flex;gap:calc(var(--u)*14);justify-content:center');
    SP.forEach((s,i)=>{
      const st=ok[i]?'#7cc65a':bad[i]?'#d9624a':sel&&sel.t==='s'&&sel.i===i?'#fff0b0':'#8a5a22';
      const d=mk(row,'',`<div class="t" style="${fz(21)};font-weight:600">โบราณสถาน ${'ABC'[i]}</div>
        <img class="px" src="./img/s/${s.img}.png" style="height:calc(var(--u)*74);margin:0"><div style="${fz(21)};font-weight:700">${s.yr}</div>
        <div class="t" style="${fz(23)};margin-top:calc(var(--u)*2);padding:calc(var(--u)*1) calc(var(--u)*10);border-radius:6px;background:${as[i]?'#3b2110':'transparent'};color:${as[i]?'#ffd34d':'#8a6a4a'}">${as[i]?NM[as[i]]:'ยังไม่เลือก'}</div>`,
        `${PB}border-color:${st};width:calc(var(--u)*204);padding:calc(var(--u)*4);text-align:center;cursor:pointer;${ok[i]?'opacity:.9':''}`,()=>{if(!ok[i])pair('s',i)});
    });
    mk(panel,'t c',`เลือกโบราณสถานและยุค แล้วกด ตกลง`,`${fz(20)};color:#d9b878;margin:calc(var(--u)*5) 0`);
    const er=mk(panel,'',``,'display:flex;gap:calc(var(--u)*14);justify-content:center');
    ERA.forEach(([k,n])=>mk(er,'dbtn'+(sel&&sel.t==='e'&&sel.i===k?' sel':''),n,`${fz(26)};width:calc(var(--u)*204);height:calc(var(--u)*44)`,()=>pair('e',k)));
  }
  function check(){
    if(mode!=='play')return;
    if(as.some(a=>!a))return c.toast('ยังเลือกยุคไม่ครบทุกแห่ง','bad');
    let n=0;SP.forEach((s,i)=>{if(as[i]===s.k){ok[i]=1;bad[i]=0;n++}else{bad[i]=1;as[i]=null}});
    if(n===3){draw();c.say('ถูกต้องทั้งหมด! เจ้าอ่านปีและรูปทรงเจดีย์ได้แล้ว ลองสังเกตฉากให้ดี','great');c.toast('จับคู่ถูกต้องทั้งหมด','good');
      c.win(3-wrong,'เจ้าแบ่งยุคอยุธยาได้ถูกต้อง');
      return}
    tries++;wrong++;c.miss();Snd.bad();c.stars=Math.max(1,3-wrong);
    c.say(`ถูก ${n} จาก 3 แห่ง ที่ผิดคือแห่งที่ปีที่สร้างยังไม่ตรงกับช่วงเวลาของยุคที่เลือก ลองเทียบกับช่วงปีในบทเรียน`,'bad');
    settle();draw();
    if(tries>=3){mode='quiz';c.say('ชิ้นส่วนเริ่มผุกร่อน! ตอบเกร็ดความรู้สั้นๆ เพื่อฟื้นฟู','think');settle();draw()}
  }
  function quiz(){
    mk(panel,'t c',`ชิ้นส่วนผุกร่อน : ตอบคำถามเพื่อฟื้นฟู`,`${fz(26)};color:#ffd34d;margin-bottom:calc(var(--u)*8)`);
    mk(panel,'t c',`ปี พ.ศ. 2173 ที่สมเด็จพระเจ้าปราสาททองสร้างวัดไชยวัฒนาราม ตรงกับอยุธยาตอนใด ?`,`${fz(26)};margin-bottom:calc(var(--u)*12)`);
    const o=mk(panel,'',``,'display:flex;flex-direction:column;gap:calc(var(--u)*8)');
    [['ตอนต้น (1893–1991)',0],['ตอนกลาง (1991–2231)',1],['ตอนปลาย (2231–2310)',0]].forEach(([t,r])=>mk(o,'dbtn',t,`${fz(25)};height:calc(var(--u)*50)`,e=>{
      if(r){Snd.ok();mode='play';tries=0;settle();c.say('ถูกต้อง! ชิ้นส่วนฟื้นฟูแล้ว ลองจับคู่ใหม่อีกครั้ง','good');draw()}
      else{e.classList.add('bad');Snd.bad();c.say('ยังไม่ใช่ ลองอ่านแผ่นสรุปเปรียบเทียบก่อน แล้วลองใหม่ได้ไม่จำกัด','think');
        const p=popup(`<div class="mh" style="text-align:center">แผ่นสรุปเปรียบเทียบ</div><div class="mb" style="line-height:1.7;margin:calc(var(--u)*14) 0">
        <b style="color:#ffd34d">ยุคต้น</b> พ.ศ. 1893–1991 · ฐานสูงแคบ ยอดเรียวแหลม<br><b style="color:#ffd34d">ยุคกลาง</b> พ.ศ. 1991–2231 · ผสมผสาน ยอดอวบขึ้น<br><b style="color:#ffd34d">ยุคปลาย</b> พ.ศ. 2231–2310 · ฐานกว้าง ยอดทรงระฆัง/ผลมะม่วง</div>`);
        p.append(mkBtn('อ่านแล้ว ลองใหม่',()=>{closePop();mode='play';tries=0;settle();draw()},1))}}));
  }
  settle();draw();
 }});

/* ---------- ด่าน 2 : รหัสสมุดบันทึก วัดไชยวัฒนาราม ---------- */
reg(2,{img:'l2.webp',W:1536,H:1024,dlg:[14,828,732,190],titleEnd:775,mapIcon:[10,10,112,92],en:[1217,26,198,33],
 intro:'สมุดบันทึกเล่มนี้ถูกผนึกด้วยรหัสสองชั้น ชั้นแรกแปลงสัญลักษณ์ 4 ตัวเป็นเลขไทยตามตารางในสมุด ชั้นที่สองคำนวณตามสูตร ข้อมูลของวัดให้ย้อนนึกถึงสิ่งที่เจ้าเพิ่งศึกษามา',
 hints:['ชั้นแรก : อ่านสัญลักษณ์จากซ้ายไปขวา แล้วเทียบตารางในสมุด','ชั้นสอง : ปีที่สร้างวัดอยู่ในบทเรียนหน้าแรก จำนวนเจดีย์รายอยู่หน้าที่สอง','ทำในวงเล็บก่อน (ปี + เจดีย์ราย) แล้วค่อยลบ 100'],
 letter:{x:745,y:278,w:70,h:70,h1:'ถอดรหัสผ่านแล้ว สังเกตมุมสมุดบันทึกที่พับอยู่ มีประกายอะไรไหม',h2:'แตะที่มุมกระดาษด้านขวาบนของสมุดบันทึก'},
 init(c){
  let phase=1,buf='',wrong=0,tries=0;const ANS1='1234',ANS2=String(2173+2-100);
  const patch=c.cover(335,690,455,72,'linear-gradient(#f6bd72,#f1b15f)');patch.className+=' c';
  patch.innerHTML=`<div style="${fz(21)};line-height:1.35;color:#4a2510;font-weight:700;text-align:center">ข้อมูลอ้างอิง : ปีที่สร้างวัด และจำนวนเจดีย์ราย<br>ให้ตรวจจากบทเรียนที่ศึกษาก่อนเล่น</div>`;
  const lab=c.cover(900,596,125,48,'#4c2a1b');lab.className+=' c t';lab.style.cssText+=`;${fz(24)};color:#f1e2c0;font-weight:600`;
  const fld=c.box(1042,586,255,56,'c t');fld.style.cssText+=`;${fz(38)};color:#3b2412;font-weight:700;letter-spacing:.12em`;
  const att=c.cover(842,897,222,92,'#4e2c1c');att.className+=' c t';att.style.cssText+=`;${fz(22)};line-height:1.2;text-align:center`;
  const paint=()=>{lab.textContent=phase===1?'ถอดรหัส':'ผลลัพธ์';fld.textContent=buf;att.innerHTML=`ความพยายาม<br><b style="${fz(32)};color:${tries>=3?'#ff9a86':'#ffd34d'}">${tries} / 3</b>`};
  const dg=(d,x,y)=>c.hot(x,y,66,58,()=>{if(buf.length<4){buf+=d;paint();Snd.tick()}},String(d));
  [0,1,2,3,4].forEach((d,i)=>dg(d,[878,957,1035,1113,1192][i],672));[5,6,7,8,9].forEach((d,i)=>dg(d,[878,957,1035,1113,1192][i],745));
  const del=c.box(1306,580,110,64,'dbtn c',' ⌫ ลบ');del.style.cssText+=`;${fz(24)};cursor:pointer`;del.onclick=()=>{Snd.click();buf=buf.slice(0,-1);paint()};
  c.hot(842,897,222,92,()=>{},'');
  c.hot(1078,895,235,95,()=>c.lesson(),'ความรู้เพิ่มเติม');
  c.hot(1325,880,205,115,()=>confirmBox('ข้ามด่านนี้ ?','ข้ามได้เลยโดยได้ 1 ดาว และยังกลับมาเล่นซ้ำเพื่อดาวที่มากขึ้นได้ ต้องการข้ามไหม','ข้ามด่าน',()=>{c.stars=1;c.say('ข้ามมาแล้ว ลองกลับมาถอดรหัสเองทีหลังนะ','n');c.win(1,'ข้ามด่านนี้ ลองกลับมาเล่นซ้ำเพื่อดาวที่มากขึ้น')},'ลองต่อ'),'ข้ามด่าน');
  c.hot(1298,668,182,138,()=>submit(),'ยืนยัน');
  function submit(){
    if(c.done)return;
    if(phase===1){
      if(buf.length<4)return c.toast('กรอกให้ครบ 4 หลัก','bad');
      if(buf===ANS1){Snd.ok();c.toast('ตราผนึกชั้นแรกเปิดแล้ว','good');phase=2;buf='';tries=0;paint();c.say('เยี่ยม! ชั้นแรกเปิดแล้ว ต่อไปคือชั้นที่สอง คำนวณตามสูตรในสมุด ข้อมูลของวัดต้องย้อนนึกถึงบทเรียน','great');return}
      wrong++;tries++;c.miss();paint();
      c.say(buf==='4321'?'เลขถูกแต่เรียงสลับกัน ต้องอ่านสัญลักษณ์จากซ้ายไปขวา':'ตัวเลขยังไม่ตรง สัญลักษณ์แต่ละตัวแทนเลขตามตารางในสมุด ลองตรวจอีกครั้ง','bad');Snd.bad();buf='';paint();return}
    if(buf.length<3)return c.toast('ผลลัพธ์ควรมีหลายหลัก ตรวจอีกครั้ง','bad');
    const v=+buf;
    if(buf===ANS2){paint();c.say('ถูกต้อง! (2173 + 2) − 100 = 2075 ตราผนึกเปิดแล้ว ลองสังเกตสมุดบันทึกให้ดี','great');c.toast('ปลดรหัสสำเร็จ','good');
      c.win(wrong===0?3:wrong<=2?2:1,'ถอดรหัสสำเร็จ ได้ตัวเลข '+ANS2);return}
    wrong++;tries++;c.miss();Snd.bad();let m;
    if(v===2175)m='ลืมลบ 100 ตามสูตร ตัวเลขนี้คือผลบวกก่อนลบ';
    else if(v===2073)m='ยังไม่ได้บวกจำนวนเจดีย์ราย ตรวจหน้าที่สองของบทเรียน';
    else if(v>+ANS2)m='ผลลัพธ์มากเกินไป ตรวจสอบการลบด้วยจำนวนที่ถูกต้อง';
    else m='ผลลัพธ์น้อยเกินไป ตรวจปี พ.ศ. ที่สร้างวัด และจำนวนเจดีย์รายอีกครั้ง';
    c.say(m+(tries>=3?' (ปุ่มข้ามด่านใช้ได้แล้ว หรือเปิดความรู้เพิ่มเติมอ่านทวน)':''),'bad');buf='';paint();
  }
  paint();
 }});

/* ---------- ด่าน 3 : แผนที่ที่หายไป ---------- */
reg(3,{img:'l3.webp',dlg:[14,758,675,178],
 intro:'แผนที่ผืนนี้ขาดไปสามจุดและทิศทางของแม่น้ำก็คลาดเคลื่อน อ่านคำบรรยายในกรอบ แล้ววางสถานที่ จากนั้นหมุนลูกศรของแม่น้ำให้ถูกทิศ ตรวจเป็นส่วนๆ ได้เลย',
 hints:['ทิศเหนืออยู่ด้านบนของแผนที่ ตะวันออกอยู่ด้านขวา ตะวันตกอยู่ด้านซ้าย','มองหาชื่อเมืองที่คำบรรยายอ้างถึง แล้ววางสถานที่ให้อยู่ใกล้ชื่อนั้น','แม่น้ำภาคกลางไหลจากเหนือลงใต้ ลูกศรควรชี้ลง'],
 letter:{x:432,y:402,w:76,h:62,h1:'มองหาแสงระยิบระยับที่ผืนน้ำทางซ้ายของภาพ',h2:'แตะที่แสงบนเงาสะท้อนในผืนน้ำด้านซ้าย'},
 init(c){
  const CARD=[['t','l3_c1','วัดสำคัญ'],['f','l3_c2','ป้อมปราการ'],['m','l3_c3','ตลาดริมน้ำ']];
  const SLOT=[{k:'w',x:672,y:440,ans:'t'},{k:'n',x:1040,y:332,ans:'f'},{k:'e',x:1156,y:486,ans:'m'}]; // w=ตะวันตก n=เหนือ e=ตะวันออก
  const RIV=[{n:'เจ้าพระยา',x:1190,y:652,ok:[4]},{n:'ลพบุรี',x:905,y:266,ok:[4,5]},{n:'ป่าสัก',x:1300,y:440,ok:[4,5]}];
  const AR=['↑','↗','→','↘','↓','↙','←','↖'];
  let pl=[null,null,null],pok=[0,0,0],pbad=[0,0,0],dir=[0,0,0],rok=[0,0,0],rbad=[0,0,0],sel=null,checks=0;
  const clue=c.cover(104,234,388,130,'#f9e9c6');clue.style.padding='calc(var(--u)*6) calc(var(--u)*12)';
  clue.innerHTML=`<div class="t" style="${fz(17.5)};line-height:1.25;color:#4a2510;font-weight:600"><b>คำบรรยายภูมิศาสตร์</b><br>• ป้อมปราการ : ทางเหนือ ใกล้เมืองลพบุรี<br>• ตลาดริมน้ำ : ริมน้ำทางตะวันออก ใกล้ป่าสัก<br>• วัดสำคัญ : ทางตะวันตก บนทางไปสุพรรณบุรี</div>`;
  const prog=c.cover(750,812,318,104,'#6b3a1c');prog.className+=' c t';prog.style.cssText+=`;${fz(26)};text-align:center;line-height:1.3`;
  const cards=CARD.map((cd,i)=>{const [y]=[[296,466,620][i]];const h=c.hot(1480,y,162,i===1?146:i===0?156:132,()=>{if(pl.includes(cd[0]))return;sel=sel===cd[0]?null:cd[0];draw()},cd[2]);return h});
  const mask=CARD.map((cd,i)=>{const e=c.cover(1480,[296,466,620][i],162,i===1?146:i===0?156:132,'rgba(20,8,3,.72)');e.style.pointerEvents='none';e.style.display='none';return e});
  const slots=SLOT.map((s,i)=>{const e=c.box(s.x,s.y,108,108,'wood c');e.style.cssText+=';cursor:pointer;border-style:dashed;overflow:hidden';e.onclick=()=>{Snd.click();if(pok[i])return;if(sel&&!pl.includes(sel)){pl[i]=sel;pbad[i]=0;sel=null}else if(pl[i]){pl[i]=null}draw()};return e});
  const rv=RIV.map((r,i)=>{const e=c.box(r.x,r.y,150,52,'dbtn');e.style.cssText+=`;${fz(22)};gap:calc(var(--u)*6)`;e.onclick=()=>{Snd.click();if(rok[i])return;dir[i]=(dir[i]+1)%8;rbad[i]=0;draw()};return e});
  c.hot(1215,800,435,125,()=>check(),'ตรวจสอบคำตอบ');
  function draw(){
    CARD.forEach((cd,i)=>{mask[i].style.display=pl.includes(cd[0])?'block':'none';cards[i].style.boxShadow=sel===cd[0]?'inset 0 0 0 calc(var(--u)*5) #fff0b0':''});
    slots.forEach((e,i)=>{const cd=CARD.find(x=>x[0]===pl[i]);e.style.borderColor=pok[i]?'#7cc65a':pbad[i]?'#d9624a':sel&&!pl[i]?'#fff0b0':'#a8731d';
      e.innerHTML=cd?`<img class="px" src="./img/s/${cd[1]}.png" style="height:100%;max-width:100%;object-fit:cover">`:`<span class="t" style="${fz(52)};color:#d9b878">?</span>`});
    rv.forEach((e,i)=>{e.innerHTML=`<span style="${fz(34)};color:${rok[i]?'#9be87a':rbad[i]?'#ff9a86':'#ffd34d'}">${AR[dir[i]]}</span>${RIV[i].n}`;e.classList.toggle('ok',!!rok[i]);e.classList.toggle('bad',!!rbad[i])});
    const n=pok.concat(rok).filter(Boolean).length;prog.innerHTML=`ความคืบหน้า<br><b style="${fz(34)};color:#ffd34d">${n} / 6</b>`;return n}
  function check(){
    if(c.done)return;checks++;let wrongMsg=[];
    SLOT.forEach((s,i)=>{if(!pl[i])return;if(pl[i]===s.ans){pok[i]=1}else{pbad[i]=1;pl[i]=null;wrongMsg.push('ตำแหน่งสถานที่บางแห่งยังไม่ตรงคำบรรยาย ตรวจทิศ (เหนือบน ตะวันออกขวา)')}});
    RIV.forEach((r,i)=>{if(r.ok.includes(dir[i]))rok[i]=1;else{rbad[i]=1;wrongMsg.push('ทิศการไหลของแม่น้ำ'+r.n+'ยังไม่ตรง แม่น้ำภาคกลางไหลจากเหนือลงใต้')}});
    const n=draw();
    if(n===6){c.say('แผนที่สมบูรณ์! เจ้าอ่านภูมิศาสตร์ของอยุธยาได้แล้ว','great');c.toast('แผนที่ครบถ้วน','good');c.win(checks<=2?3:checks<=4?2:1,'วางสถานที่และปรับทิศแม่น้ำได้ถูกต้อง');return}
    if(wrongMsg.length){c.miss();Snd.bad();c.say(`ถูกแล้ว ${n} จาก 6 ส่วน (ส่วนที่ถูกจะคงอยู่ ไม่ต้องทำใหม่) ${[...new Set(wrongMsg)][0]}`,'bad');setTimeout(()=>{pbad=[0,0,0];rbad=[0,0,0];draw()},1200)}
    else c.toast('ยังวางไม่ครบ วางสถานที่และปรับแม่น้ำให้ครบก่อน','bad');
  }
  draw();
 }});


/* ---------- ด่าน 4 : วิกฤตตลาดริมน้ำ (ซื้อถูก ขายแพง อ่านข่าวเหตุและผล) ---------- */
reg(4,{img:'l4.webp',dlg:[14,758,700,178],mapIcon:[15,10,125,105],dfs:22,
 intro:'เจ้าเป็นพ่อค้าริมน้ำ มีทุน 520 เหรียญ ทำให้ทรัพย์สินรวมถึง 800 เหรียญภายใน 8 รอบ ซื้อของตอนราคาถูกแล้วขายตอนแพง ข่าวจะเตือนล่วงหน้า 2 รอบ ลองคิดจากเหตุและผล',
 hints:['ข่าวบอกว่าเหตุการณ์กระทบสินค้าอะไร แต่ไม่บอกว่าราคาขึ้นหรือลง ให้ถามตัวเองว่าสินค้านั้นจะ "ขาด" หรือ "ล้น" ตลาด','ของขาดตลาดราคาสูงขึ้น ของล้นตลาดราคาตกลง ควรซื้อก่อนเหตุการณ์เกิด และขายเมื่อเหตุการณ์เกิดขึ้นแล้ว','ผ้าเสียจังกอบทุกครั้งที่ซื้อขาย กำไรบางกว่าข้าว และอย่าลืมเก็บเงินสดไว้ซื้อของรอบถัดไป'],
 letter:{x:540,y:438,w:84,h:74,h1:'มองหาแสงระยิบระยับตรงเรือที่จอดริมน้ำ',h2:'แตะที่แสงบนเรือลำกลางภาพ'},
 init(c){
  const CAP=10,FEE=4,FINE=60,GOAL=800,RMAX=8;
  const RICE=[50,50,72,68,44,46,62,60],CLOTH=[80,80,82,68,68,74,78,82];
  const NEWS=[
   {show:0,eff:2,g:'ข้าว',t:'น้ำเหนือหลากเร็วกว่าปกติ ท่วมนาข้าวทางเหนือ',why:'น้ำท่วมนา ข้าวเสียหาย → ข้าวขาดตลาด → ราคาข้าวสูงขึ้น'},
   {show:1,eff:3,g:'ผ้า',t:'ราชสำนักเพิ่มจังกอบผ้านำเข้า (ภาษีพิเศษ)',why:'จังกอบสูงขึ้น → ต้นทุนพ่อค้าเพิ่ม → ราคารับซื้อผ้าลดลง'},
   {show:2,eff:4,g:'ข้าว',t:'น้ำเริ่มลด ชาวนาเก็บเกี่ยวข้าวใหม่พร้อมกัน',why:'เก็บเกี่ยวข้าวใหม่ → ข้าวล้นตลาด → ราคาข้าวตกลง'},
   {show:4,eff:6,g:'ข้าว',t:'เรือสำเภาจีนจะเข้าท่ามารับซื้อข้าวขนกลับไป',why:'พ่อค้าจีนรับซื้อข้าว → ความต้องการเพิ่ม → ราคาข้าวสูงขึ้น'}];
  const G=[{k:'rice',n:'ข้าว',p:RICE,x:815},{k:'cloth',n:'ผ้า',p:CLOTH,x:1070},{k:'ban',n:'เครื่องถ้วยต้องห้าม',p:null,x:1325}];
  let r,cash,hold,fined,over,tutOn=false;
  const reset=()=>{r=0;cash=520;hold={rice:0,cloth:0};fined=0;over=false};reset();
  const price=(k,i=r)=>k==='rice'?RICE[i]:CLOTH[i];
  const worth=()=>cash+hold.rice*RICE[r]+hold.cloth*CLOTH[r];
  const fmt=n=>n.toLocaleString('en');
  /* ----- แผงสินค้า ----- */
  const tag={},qty={};
  G.forEach((g,gi)=>{
    const pt=c.cover(g.x+22,352,196,40,'rgba(28,12,5,.86)');pt.className+=' c t';pt.style.cssText+=`;${fz(24)};font-weight:600;border-radius:calc(var(--u)*8);border:calc(var(--u)*2) solid #a8731d`;tag[g.k]=pt;
    const st=c.cover(g.x+6,472,228,46,'#2c160a');st.style.display='flex';st.style.alignItems='center';st.style.justifyContent='space-between';st.style.padding='0 calc(var(--u)*4)';
    const bm=mk(st,'dbtn','−',`${fz(34)};width:calc(var(--u)*64);height:calc(var(--u)*38);padding:0`,()=>trade(g,-1));
    const q=mk(st,'t c','',`${fz(21)};flex:1;font-weight:600;color:#ffe9b0;line-height:1.1`);qty[g.k]=q;
    const bp=mk(st,'gbtn','+',`${fz(34)};width:calc(var(--u)*64);height:calc(var(--u)*38);padding:0`,()=>trade(g,1));
  });
  /* ----- ข่าว / เป้าหมาย / เงิน ----- */
  const ev=c.cover(795,547,368,190,'#ecd9a8');ev.style.padding='calc(var(--u)*6) calc(var(--u)*10)';ev.style.alignItems='stretch';ev.style.justifyContent='flex-start';
  const goal=c.cover(1203,548,360,88,'#42211a');goal.className+=' c t';goal.style.cssText+=`;${fz(21)};line-height:1.25;text-align:center`;
  const bank=c.cover(1203,657,360,80,'#42211a');bank.className+=' c t';bank.style.cssText+=`;${fz(21)};line-height:1.25;text-align:center`;
  const cl=c.cover(1450,832,196,58,'linear-gradient(#f0a02a,#d98420)');cl.className+=' c t';cl.style.cssText+=`;${fz(28)};font-weight:700;color:#3a1d08;text-align:center`;
  c.hot(1300,800,350,125,()=>endRound(),'จบรอบนี้');
  c.hot(815,810,295,100,()=>c.lesson(3),'คำใบ้เพิ่มเติม');
  mk(c.ov,'a gbtn','? วิธีเล่น','',()=>tutorial(0));
  const hb=c.ov.lastChild;c.pos(hb,640,108,200,54);hb.style.cssText+=`;${fz(26)};z-index:3`;
  function news(){
    const L=NEWS.filter(n=>n.show<=r&&n.eff>=r-0).map(n=>{const d=n.eff-r;
      return `<div style="margin-bottom:calc(var(--u)*5)"><b style="color:${d?'#8a2a10':'#2a6a18'}">${d?`อีก ${d} รอบ (รอบ ${n.eff+1})`:'เกิดขึ้นรอบนี้'}</b> <span style="background:#7a4a1a;color:#ffe9b0;border-radius:4px;padding:0 calc(var(--u)*6)">${n.g}</span><br>${n.t}</div>`}).join('');
    ev.innerHTML=`<div class="t" style="${fz(22)};line-height:1.25;color:#3b2412;width:100%"><b style="${fz(26)}">ข่าว · รอบ ${r+1} / ${RMAX}</b><br>${L||'ตอนนี้ยังไม่มีข่าวใหม่ ลองดูราคาให้ดี'}</div>`;
  }
  function paint(){
    G.forEach(g=>{
      const t=tag[g.k],q=qty[g.k];
      if(g.p){const d=r?g.p[r]-g.p[r-1]:0;
        t.innerHTML=`<div style="white-space:nowrap">ราคา ${g.p[r]}${r?`<span style="${fz(19)};margin-left:calc(var(--u)*8);color:${d>0?'#9be87a':d<0?'#ff9a86':'#d9b878'}">${d>0?'▲'+d:d<0?'▼'+(-d):'—'}</span>`:''}</div>`;
        q.innerHTML=`ถือ ${hold[g.k]}`}
      else{t.innerHTML=`<div style="color:#ff9a86;white-space:nowrap">ห้ามซื้อขาย</div>`;q.innerHTML=`ปรับ ${FINE}`}
    });
    const sv=hold.rice*RICE[r]+hold.cloth*CLOTH[r];
    goal.innerHTML=`<div style="${fz(20)}">เป้าหมาย : ทรัพย์สินรวม</div><div style="${fz(30)};font-weight:700;color:#ffd34d">≥ ${GOAL} เหรียญ</div>`;
    bank.innerHTML=`<div style="${fz(21)};white-space:nowrap">เงินสด <b style="color:#ffd34d">${fmt(cash)}</b> · ของในมือ <b>${fmt(sv)}</b></div><div style="${fz(30)};font-weight:700;color:${worth()>=GOAL?'#9be87a':'#fff'}">รวม ${fmt(worth())}</div>`;
    cl.textContent=r===RMAX-1?'ปิดบัญชี':'จบรอบ ▶';
    news();
  }
  function trade(g,d){
    if(c.done||over||tutOn)return;
    if(!g.p){if(d>0){fined++;cash=Math.max(0,cash-FINE);c.miss();Snd.bad();c.toast(`ถูกยึดและปรับ ${FINE} เหรียญ`,'bad');c.say('นั่นคือสินค้าต้องห้าม ซื้อขายเสรีไม่ได้ ผู้ฝ่าฝืนถูกยึดสินค้าและถูกปรับ ตามที่เรียนมา','bad');paint()}else c.toast('ไม่มีสินค้านี้ในมือ','bad');return}
    const p=price(g.k);
    if(d>0){
      if(hold[g.k]>=CAP){c.toast(`สต็อกเต็ม ${CAP} ชิ้น`,'bad');return}
      if(cash<p+(g.k==='cloth'?FEE:0)){c.toast('เงินสดไม่พอ','bad');c.say(`เงินสดมี ${cash} ต้องใช้ ${p+(g.k==='cloth'?FEE:0)} ต่อ 1 ชิ้น${g.k==='cloth'?` (ราคา ${p} + จังกอบ ${FEE})`:''} ลองขายของเก่าก่อน`,'think');return}
      cash-=p+(g.k==='cloth'?FEE:0);hold[g.k]++;Snd.coin();
    }else{
      if(!hold[g.k]){c.toast('ไม่มีสินค้านี้ในมือ','bad');return}
      cash+=p-(g.k==='cloth'?FEE:0);hold[g.k]--;Snd.coin();
    }
    paint();
  }
  function endRound(){
    if(c.done||over||tutOn)return;
    if(r<RMAX-1){
      const b=worth(),pr=r;r++;const a=worth();
      const rows=[['ข้าว',RICE],['ผ้า',CLOTH]].map(([n,P])=>{const d=P[r]-P[pr],ne=NEWS.find(x=>x.eff===r&&x.g===n);
        return `<div style="display:flex;gap:calc(var(--u)*14);align-items:baseline;margin:calc(var(--u)*4) 0"><b style="width:calc(var(--u)*70)">${n}</b><span style="width:calc(var(--u)*170)">${P[pr]} → <b>${P[r]}</b> <span style="color:${d>0?'#9be87a':d<0?'#ff9a86':'#d9b878'}">${d>0?'▲'+d:d<0?'▼'+(-d):'—'}</span></span><span style="flex:1;color:${ne?'#ffd34d':'#d9b878'}">${ne?'เหตุการณ์เกิดขึ้น : '+ne.why:d?'ตลาดขยับตามปกติ':'ราคาทรงตัว'}</span></div>`}).join('');
      const p=popup(`<div style="max-width:calc(var(--u)*1100);${fz(28)};line-height:1.35"><div class="mh" style="margin-bottom:calc(var(--u)*8)">สรุปรอบที่ ${pr+1}</div>${rows}<div style="margin-top:calc(var(--u)*10)">ทรัพย์สินรวม ${fmt(b)} → <b style="color:${a>=b?'#9be87a':'#ff9a86'}">${fmt(a)}</b> เหรียญ</div><div class="row" id="rn" style="margin-top:calc(var(--u)*16)"></div></div>`);
      $('#rn',p).append(mkBtn(`ไปรอบที่ ${r+1} ▶`,()=>{closePop();paint();const ns=NEWS.filter(n=>n.show===r);c.say(ns.length?`ข่าวใหม่! ${ns[0].t} กระทบ${ns[0].g} อีก ${ns[0].eff-r} รอบ ลองคิดว่าจะขาดหรือล้นตลาด`:'รอบใหม่ ดูราคาและข่าวที่กำลังจะมา แล้วตัดสินใจ','think')},1));
      Snd.tick();return}
    // ปิดบัญชี : ขายของที่เหลือทั้งหมดตามราคารอบสุดท้าย
    over=true;
    const sold=hold.rice*(RICE[r])+hold.cloth*(CLOTH[r]-FEE);hold.rice=hold.cloth=0;cash+=sold;paint();
    const total=cash,stars=total>=920?3:total>=880?2:total>=GOAL?1:0;
    if(stars){c.say(`ปิดบัญชีได้ ${fmt(total)} เหรียญ ถึงเป้าแล้ว เจ้าอ่านข่าวเป็นเหตุเป็นผล พ่อค้าตัวจริง`,'great');c.toast(`ทรัพย์สิน ${fmt(total)} เหรียญ`,'good');
      c.win(stars,`ปิดบัญชีได้ ${fmt(total)} เหรียญ ${fined?`(ถูกปรับ ${fined} ครั้ง)`:'ไม่ถูกปรับเลย'}`);return}
    c.miss();
    const rv=NEWS.map(n=>`<div style="margin:calc(var(--u)*5) 0"><b style="color:#ffd34d">รอบ ${n.eff+1} · ${n.g}</b> ${n.t}<br><span style="color:#d9b878">${n.why}</span></div>`).join('');
    const p=popup(`<div style="max-width:calc(var(--u)*1100);${fz(24)};line-height:1.35"><div class="mh">ยังไม่ถึงเป้า</div><div style="margin:calc(var(--u)*8) 0">ปิดบัญชีได้ ${fmt(total)} เหรียญ จากเป้า ${GOAL} ลองดูว่าเหตุการณ์แต่ละข่าวส่งผลอย่างไร แล้วลองวางแผนใหม่ ซื้อก่อนเหตุการณ์ ขายเมื่อเหตุการณ์เกิด ด่านไม่ถูกล็อก เล่นซ้ำได้ทันที</div>${rv}<div class="row" id="rt" style="margin-top:calc(var(--u)*14)"></div></div>`);
    const rt=$('#rt',p);rt.append(mkBtn('ทบทวนบทเรียน',()=>{closePop();c.lesson(3)}),mkBtn('เริ่มใหม่ ▶',()=>{closePop();reset();paint();c.say('เริ่มใหม่ ทุนเดิม 520 เหรียญ ดูข่าวรอบแรกให้ดี','think')},1));
  }
  /* ----- วิธีเล่น (ไฟส่องทีละขั้น) ----- */
  const STEPS=[
   {box:[810,268,760,258],txt:'สินค้า 3 ประเภท · ข้าว (สามัญ) ค้าได้ปกติ · ผ้า (ภาษีพิเศษ) เสียจังกอบ 4 เหรียญทุกครั้งที่ซื้อหรือขาย กำไรบาง · เครื่องถ้วย (ต้องห้าม) ห้ามซื้อ ถูกยึดและปรับ',at:[40,170,700,250]},
   {box:[810,345,760,176],txt:'ตัวเลขบนสินค้าคือราคาต่อ 1 ชิ้นในรอบนี้ กด + เพื่อซื้อเข้าคลัง กด − เพื่อขายออก ถือได้ไม่เกิน 10 ชิ้น หลักคือ ซื้อตอนถูก ขายตอนแพง',at:[40,170,700,250]},
   {box:[790,542,378,200],txt:'ข่าวเตือนล่วงหน้า 2 รอบ บอกว่ากระทบสินค้าอะไร แต่ไม่บอกว่าราคาขึ้นหรือลง ต้องคิดจากเหตุและผลว่าสินค้าจะขาดหรือล้นตลาด',at:[40,170,700,250]},
   {box:[1198,542,372,200],txt:'เป้าหมายคือทรัพย์สินรวม (เงินสด + ของในมือ) ให้ถึง 800 เหรียญ เมื่อครบ 8 รอบ',at:[40,170,700,250]},
   {box:[1295,795,360,135],txt:'วางแผนเสร็จแล้วกด จบรอบ ราคารอบใหม่จะออก และมีสรุปบอกว่าราคาเปลี่ยนเพราะอะไร รอบที่ 8 คือปิดบัญชี ของที่เหลือจะถูกขายให้',at:[40,170,700,250]}];
  function tutorial(i){
    c.ov.querySelectorAll('.tut').forEach(e=>e.remove());
    if(i>=STEPS.length){tutOn=false;S.tut4=1;save();paint();return}
    tutOn=true;const s=STEPS[i];
    const blk=c.box(0,0,c.W,c.H,'tut');blk.style.cssText+=';z-index:40';
    const h=c.box(...s.box,'tut');h.style.cssText+=';z-index:41;pointer-events:none;border:calc(var(--u)*4) solid #ffd34d;border-radius:calc(var(--u)*8);box-shadow:0 0 0 4000px rgba(12,5,2,.72)';
    const t=c.box(...s.at,'tut wood');t.style.cssText+=`;z-index:42;padding:calc(var(--u)*14) calc(var(--u)*18);display:flex;flex-direction:column;gap:calc(var(--u)*10)`;
    t.innerHTML=`<div class="t" style="color:#ffd34d;${fz(22)};font-weight:600">วิธีเล่น ${i+1} / ${STEPS.length}</div><div class="t" style="${fz(24)};line-height:1.35;flex:1;overflow:hidden">${s.txt}</div>`;
    const row=mk(t,'',``,'display:flex;gap:calc(var(--u)*12);justify-content:flex-end');
    mk(row,'dbtn','ข้าม',`${fz(22)};padding:calc(var(--u)*6) calc(var(--u)*22)`,()=>tutorial(99));
    mk(row,'gbtn',i===STEPS.length-1?'เริ่มเล่น':'ต่อไป ▶',`${fz(24)};padding:calc(var(--u)*6) calc(var(--u)*26)`,()=>tutorial(i+1));
    shrink(t.children[1]);
  }
  paint();
  if(!S.tut4)c.later(()=>tutorial(0),700);
 }});
