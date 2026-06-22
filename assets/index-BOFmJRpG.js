(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const bt="OH2026",It="oh_ci_v5",X="https://kpzwmancieemefcvgtkm.supabase.co",$t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwendtYW5jaWVlbWVmY3ZndGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODQyMTksImV4cCI6MjA5NTk2MDIxOX0.WviBlyBg9Ji9kARXUyP_87muq8oGLVX6_0T0FNtKqTI",nt={"Content-Type":"application/json",apikey:$t,Authorization:`Bearer ${$t}`,Prefer:"return=minimal"},Ct=typeof supabase<"u"&&supabase.createClient?supabase.createClient(X,$t):null,xt="https://lemaitranmedia.github.io/eventoh-checkin";function Ft(t){return{id:t.id,name:t.name,date:t.date_str,team:t.team,venue:t.venue,eventPw:t.event_pw,btcMembers:t.btc_members||[],createdAt:t.created_at}}function _t(t){return{id:t.id,eventId:t.event_id,guestCode:t.guest_code,systemCode:t.system_code,name:t.name,phone:t.phone,prmName:t.prm_name,tcbRegion:t.tcb_region,unit:t.unit,sihName:t.sih_name,note:t.note,companions:t.companions||[],checkedIn:!!t.checked_in,checkinTime:t.checkin_time,checkinBy:t.checkin_by,cancelled:!!t.cancelled,cancelNote:t.cancel_note,walkin:!!t.walkin,createdAt:t.created_at}}function Ot(t){return{id:t.id,name:t.name,date_str:t.date||null,team:t.team||null,venue:t.venue||null,event_pw:t.eventPw||null,btc_members:t.btcMembers||[],created_at:t.createdAt||Date.now()}}function Tt(t){return{id:t.id,event_id:t.eventId,guest_code:t.guestCode,system_code:t.systemCode||null,name:t.name,phone:t.phone||null,prm_name:t.prmName||null,tcb_region:t.tcbRegion||null,unit:t.unit||null,sih_name:t.sihName||null,note:t.note||null,companions:t.companions||[],checked_in:!!t.checkedIn,checkin_time:t.checkinTime||null,checkin_by:t.checkinBy||null,cancelled:!!t.cancelled,cancel_note:t.cancelNote||null,walkin:!!t.walkin,created_at:t.createdAt||Date.now()}}function Gt(){try{const t=localStorage.getItem(It);return t?JSON.parse(t):{events:[],guests:[]}}catch{return{events:[],guests:[]}}}async function Kt(){try{const[t,e]=await Promise.all([fetch(`${X}/rest/v1/oh_events?select=*&order=created_at.desc`,{headers:nt}),fetch(`${X}/rest/v1/oh_guests?select=*`,{headers:nt})]),n=await t.json(),c=await e.json();if(Array.isArray(n)&&Array.isArray(c))return d.events=n.map(Ft),d.guests=c.map(_t),localStorage.setItem(It,JSON.stringify(d)),!0}catch(t){console.warn("Supabase load lỗi, dùng localStorage:",t)}return!1}function w(){try{localStorage.setItem(It,JSON.stringify(d))}catch{}}async function Vt(t,e){try{await fetch(`${X}/rest/v1/${t}?id=eq.${e}`,{method:"DELETE",headers:nt})}catch(n){console.warn("Supabase delete lỗi:",n)}}async function N(t,e,n=3){for(let c=1;c<=n;c++){try{const o=await fetch(`${X}/rest/v1/oh_guests?id=eq.${t}`,{method:"PATCH",headers:{...nt,Prefer:"return=minimal"},body:JSON.stringify(e)});if(o.ok)return!0;console.warn("sbPatchGuest lỗi HTTP",o.status)}catch(o){console.warn("sbPatchGuest lỗi mạng:",o)}c<n&&await new Promise(o=>setTimeout(o,c*500))}return!1}async function Ut(t,e,n=3){for(let c=1;c<=n;c++){try{const o=await fetch(`${X}/rest/v1/oh_events?id=eq.${t}`,{method:"PATCH",headers:{...nt,Prefer:"return=minimal"},body:JSON.stringify(e)});if(o.ok)return!0;console.warn("sbPatchEvent lỗi HTTP",o.status)}catch(o){console.warn("sbPatchEvent lỗi mạng:",o)}c<n&&await new Promise(o=>setTimeout(o,c*500))}return!1}async function Bt(t,e,n=3){for(let c=1;c<=n;c++){try{const o=await fetch(`${X}/rest/v1/${t}`,{method:"POST",headers:{...nt,Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify([e])});if(o.ok)return!0;console.warn("sbUpsertOne lỗi HTTP",o.status)}catch(o){console.warn("sbUpsertOne lỗi mạng:",o)}c<n&&await new Promise(o=>setTimeout(o,c*500))}return!1}async function jt(t,e,n=3){if(!e.length)return!0;for(let c=1;c<=n;c++){try{const o=await fetch(`${X}/rest/v1/${t}`,{method:"POST",headers:{...nt,Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(e)});if(o.ok)return!0;console.warn("sbUpsertMany lỗi HTTP",o.status)}catch(o){console.warn("sbUpsertMany lỗi mạng:",o)}c<n&&await new Promise(o=>setTimeout(o,c*500))}return!1}let d={events:[],guests:[]};function ft(t){return xt+"/?code="+encodeURIComponent(t)}async function zt(){if(!await Kt()){const e=Gt();d.events=e.events,d.guests=e.guests}}function J(t){return t!=null&&t.date?new Date().toISOString().slice(0,10)>t.date:!1}function Mt(t){return t!=null&&t.date?new Date().toISOString().slice(0,10)>=t.date:!1}function Wt(t){return Mt(t)}function ot(t){return d.events.find(e=>e.id===t)}function qt(){var n;if(i.modal||((n=i.ciState)==null?void 0:n.step)==="verify"||i.urlCIBusy)return!0;const t=document.activeElement;if(!t)return!1;const e=t.tagName;return e==="INPUT"||e==="TEXTAREA"||e==="SELECT"}async function Xt(){const t=document.getElementById("refresh_btn");t&&(t.textContent="⏳ Đang làm mới...",t.disabled=!0),await zt(),m()}let ht=null,gt=0,wt=null;function Lt(){if(!Ct){console.warn("⚠️ Không khởi tạo được Realtime — thiếu supabaseClient (kiểm tra lại thẻ <script> supabase-js trong HTML).");return}console.log("Bắt đầu kết nối Realtime từ Supabase..."),ht=Ct.channel("public:oh_guests").on("postgres_changes",{event:"UPDATE",schema:"public",table:"oh_guests"},t=>{const e=_t(t.new),n=d.guests.findIndex(c=>c.id===e.id);n!==-1&&(d.guests[n]=e,w(),typeof m=="function"&&m(),console.log(`📡 Realtime cập nhật trạng thái khách: ${e.name}`))}).on("postgres_changes",{event:"INSERT",schema:"public",table:"oh_guests"},t=>{const e=_t(t.new);d.guests.some(n=>n.id===e.id)||(d.guests.push(e),w(),typeof m=="function"&&m(),console.log(`📡 Realtime: khách mới từ thiết bị khác — ${e.name}`))}).on("postgres_changes",{event:"DELETE",schema:"public",table:"oh_guests"},t=>{var n;const e=(n=t.old)==null?void 0:n.id;e&&(d.guests=d.guests.filter(c=>c.id!==e),w(),typeof m=="function"&&m(),console.log(`📡 Realtime: khách đã bị xoá từ thiết bị khác — ${e}`))}).subscribe(t=>{t==="SUBSCRIBED"?(console.log("✅ Kết nối Realtime thành công! Đang lắng nghe thay đổi..."),gt=0):(t==="CHANNEL_ERROR"||t==="TIMED_OUT"||t==="CLOSED")&&(console.warn(`⚠️ Realtime mất kết nối (${t}). Sẽ thử kết nối lại...`),Jt())})}function Jt(){if(wt)return;gt++;const t=Math.min(3e4,2e3*gt);wt=setTimeout(async()=>{if(wt=null,console.log(`🔄 Đang thử kết nối lại Realtime (lần ${gt})...`),ht){try{await Ct.removeChannel(ht)}catch{}ht=null}qt()||(await zt(),m()),Lt()},t)}async function Qt(){const t=new URLSearchParams(window.location.search).get("code"),e=document.getElementById("root");if(e.innerHTML=`<div style="max-width:360px;margin:80px auto;text-align:center;font-family:'Be Vietnam Pro',sans-serif"><div style="font-size:40px;margin-bottom:12px">⏳</div><div style="font-size:14px;color:#aaa;margin-top:8px">Đang tải...</div></div>`,await zt(),Lt(),t){i.urlCode=decodeURIComponent(t),i.view="url_ci",m();return}m()}Qt();let i={adminOk:!1,view:"admin",urlCode:null,urlCIStep:null,urlCIBusy:!1,urlCISyncWarn:!1,tab:"events",selEv:null,modal:null,editGid:null,delGid:null,ticketGid:null,editEvId:null,cpTicket:null,cpEdit:null,cpDel:null,cpAdd:null,adminCI:null,cancelTarget:null,unlockedEvs:{},evUnlockTarget:null,rptEv:null,rptExp:{},search:"",filter:"all",ciOk:!1,ciEv:null,ciOp:null,ciState:null,ciSyncWarn:!1,pwVal:"",pwErr:"",newEvBtcRows:1,newGCompRows:1,importData:null};function K(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function B(t){return t?new Date(t).toLocaleDateString("vi-VN"):"—"}function lt(t){return t?new Date(t).toLocaleString("vi-VN"):"—"}function vt(t){return t?new Date(t).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}):""}function it(t){return d.guests.filter(e=>e.eventId===t)}function yt(t){let e=0,n=0,c=0;return it(t).forEach(o=>{e++,o.checkedIn&&n++,o.cancelled&&c++,(o.companions||[]).forEach(s=>{e++,s.checkedIn&&n++,s.cancelled&&c++})}),{t:e,c:n,x:c,p:e-n-c}}function q(t){const e=d.events.find(l=>l.id===t),n=e?e.name.replace(/[^A-Z0-9]/gi,"").toUpperCase().slice(0,3):"OH",c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",o=new Set;d.guests.forEach(l=>{o.add(l.guestCode),(l.companions||[]).forEach(r=>o.add(r.code))});let s,a=0;do{s=n+"-";for(let l=0;l<4;l++)s+=c[Math.floor(Math.random()*c.length)];a++}while(o.has(s)&&a<200);return s}function Zt(t,e){for(const n of d.guests.filter(c=>c.eventId===t)){if(n.guestCode===e)return{type:"guest",guest:n,person:n};for(const c of n.companions||[])if(c.code===e)return{type:"comp",guest:n,person:c}}return null}function m(){const t=document.getElementById("root");if(i.view==="url_ci"){t.innerHTML=_e(),Ee();return}if(!i.adminOk){t.innerHTML=Yt();return}if(i.view==="checkin"){t.innerHTML=Te(),Be();return}t.innerHTML=ee(),ne()}function Yt(){return`<div class="login-box">
    <div style="text-align:center;margin-bottom:24px">
      <div style="font-size:36px;margin-bottom:10px">🏢</div>
      <div style="font-size:20px;font-weight:800">Hệ thống Check-in Sự kiện</div>
      <div style="font-size:13px;color:#999;margin-top:4px">OneHousing — Nhập mật khẩu để tiếp tục</div>
    </div>
    <div class="fg"><label>Mật khẩu Admin</label>
      <input type="password" id="login_pw" placeholder="Nhập mật khẩu..." autofocus
        onkeydown="if(event.key==='Enter')doLogin()" style="font-size:16px;padding:12px 14px"/></div>
    <div id="login_err" style="color:#a32d2d;font-size:12px;margin-bottom:8px"></div>
    <button class="btn blue full" onclick="doLogin()">Đăng nhập →</button>
  </div>`}function te(){var e;(((e=document.getElementById("login_pw"))==null?void 0:e.value)||"")===bt?(i.adminOk=!0,m()):document.getElementById("login_err").textContent="⚠️ Mật khẩu không đúng."}function ee(){return`
    <div class="topbar no-print" style="margin-bottom:16px">
      <div>
        <div style="font-size:17px;font-weight:800">🎪 Hệ thống Check-in Sự kiện</div>
        <div style="font-size:12px;color:#aaa">OneHousing · ${d.events.length} sự kiện · ${d.guests.length} nhóm khách</div>
      </div>
      <button class="btn" onclick="goCI()">📷 Màn hình Check-in BTC</button>
    </div>
    <div class="tabs no-print">
      <button class="tab ${i.tab==="events"?"on":""}" onclick="setTab('events')">📅 Sự kiện</button>
      <button class="tab ${i.tab==="guests"?"on":""}" onclick="setTab('guests')">👥 Khách mời</button>
      <button class="tab ${i.tab==="report"?"on":""}" onclick="setTab('report')">📊 Báo cáo</button>
    </div>
    ${i.tab==="events"?ie():""}
    ${i.tab==="guests"?oe():""}
    ${i.tab==="report"?ce():""}
    ${i.modal?ae():""}`}function ne(){i.modal==="tickets"&&i.ticketGid&&(setTimeout(Et,120),setTimeout(Et,400)),i.modal==="cp_ticket"&&i.cpTicket&&(setTimeout(rt,120),setTimeout(rt,400))}function ie(){const t=[...d.events].sort((e,n)=>new Date(n.date||0)-new Date(e.date||0));return`<div class="topbar"><div style="font-weight:700">Danh sách sự kiện</div>
    <button class="btn blue sm" onclick="openM('add_ev')">+ Tạo sự kiện</button></div>
    ${t.length===0?'<div class="empty">📭 Chưa có sự kiện nào.<br>Nhấn "Tạo sự kiện" để bắt đầu.</div>':""}
    ${t.map(e=>{const n=yt(e.id),c=(e.btcMembers||[]).length,o=J(e);return`<div class="ev-item" onclick="openGM('${e.id}')">
        <div style="font-size:28px;flex-shrink:0">${o?"🔐":"📌"}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:15px">${e.name} ${e.eventPw?i.unlockedEvs[e.id]?"🔓":"🔒":""} ${o?'<span style="font-size:10px;font-weight:600;background:#FEF2F2;color:#B91C1C;padding:2px 7px;border-radius:10px;vertical-align:middle">Đã kết thúc</span>':""}</div>
          <div class="ev-meta">
            <span>📅 ${B(e.date)}</span>
            <span>🏢 ${e.team||"—"}</span>
            ${e.venue?`<span>📍 ${e.venue}</span>`:""}
            <span>👥 ${n.t} người</span>
            <span>✅ ${n.c}/${n.t}</span>
            <span>🔑 ${c} BTC</span>
          </div>
          <div class="pb"><div class="pb-fill" style="width:${n.t>0?Math.round(n.c/n.t*100):0}%;background:${o?"#aaa":"#3B6D11"}"></div></div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap" onclick="event.stopPropagation()">
          <span class="badge ${o?"b-gray":n.c===n.t&&n.t>0?"b-green":n.c>0?"b-blue":"b-gray"}">${o?"Đã đóng":n.c===n.t&&n.t>0?"Hoàn tất":n.c>0?n.c+" đã vào":"Chờ"}</span>
          ${e.eventPw&&i.unlockedEvs[e.id]?`<button class="btn sm" onclick="alert('Mật khẩu: '+db.events.find(e=>e.id==='${e.id}')?.eventPw)" title="Xem mật khẩu" style="font-size:11px">🔓 MK</button>`:""}
          <button class="btn sm" onclick="openGM('${e.id}')">📋 Khách</button>
          <button class="btn sm" onclick="openEditEv('${e.id}')">✏️ Sửa</button>
          <button class="btn sm red" onclick="delEv('${e.id}')">🗑️</button>
        </div>
      </div>`}).join("")}`}function oe(){const t=`<select class="selx" onchange="pickEv(this.value)">
    <option value="">-- Chọn sự kiện --</option>
    ${d.events.map(l=>`<option value="${l.id}" ${i.selEv===l.id?"selected":""}>${l.name}</option>`).join("")}
  </select>`;if(!i.selEv)return`<div class="topbar">${t}</div><div class="empty">👆 Chọn sự kiện để quản lý khách mời</div>`;const e=d.events.find(l=>l.id===i.selEv);let n=it(i.selEv);const c=yt(i.selEv);if(i.search){const l=i.search.toLowerCase();n=n.filter(r=>{var h,f,g,v,u,b,y;return((h=r.name)==null?void 0:h.toLowerCase().includes(l))||((f=r.phone)==null?void 0:f.includes(l))||((g=r.prmName)==null?void 0:g.toLowerCase().includes(l))||((v=r.sihName)==null?void 0:v.toLowerCase().includes(l))||((u=r.unit)==null?void 0:u.toLowerCase().includes(l))||((b=r.guestCode)==null?void 0:b.toLowerCase().includes(l))||((y=r.systemCode)==null?void 0:y.toLowerCase().includes(l))||(r.companions||[]).some(C=>{var _,k;return((_=C.name)==null?void 0:_.toLowerCase().includes(l))||((k=C.code)==null?void 0:k.toLowerCase().includes(l))})})}i.filter==="checked"&&(n=n.filter(l=>l.checkedIn)),i.filter==="pending"&&(n=n.filter(l=>!l.checkedIn&&!l.cancelled)),i.filter==="cancelled"&&(n=n.filter(l=>l.cancelled)),i.filter==="walkin"&&(n=n.filter(l=>!!l.walkin));const o=(e.btcMembers||[]).map(l=>`<span class="badge b-purple" style="margin:2px">🔑 ${l.name} (${l.code})</span>`).join(""),s=J(e),a=Wt(e);return`
    <div class="topbar">
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">${t}${o?`<div style="display:flex;flex-wrap:wrap;gap:2px">${o}</div>`:""}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button id="refresh_btn" class="btn sm" onclick="doRefresh()" title="Làm mới dữ liệu">🔄 Làm mới</button>
        <input class="sinput" placeholder="🔍 Tìm tên, mã, SĐT..." oninput="setSrch(this.value)" value="${i.search}">
        <select class="selx" onchange="setFil(this.value)">
          <option value="all" ${i.filter==="all"?"selected":""}>Tất cả (${c.t})</option>
          <option value="checked" ${i.filter==="checked"?"selected":""}>✅ Đã vào (${c.c})</option>
          <option value="pending" ${i.filter==="pending"?"selected":""}>⏳ Chưa xác nhận (${c.p})</option>
          <option value="cancelled" ${i.filter==="cancelled"?"selected":""}>🚫 Cancel (${c.x})</option>
          <option value="walkin" ${i.filter==="walkin"?"selected":""}>🚶 Walk-in (${it(i.selEv).filter(l=>l.walkin).length})</option>
        </select>
        
        ${s?"":`
          <button class="btn green sm" onclick="triggerExcelImport()">📥 Import Excel</button>
          <button class="btn sm" onclick="downloadExcelTemplate()">📄 Mẫu Excel</button>
        `}
        ${c.t>0?'<button class="btn blue sm" onclick="downloadAllQRsZip()" id="zip_btn">🗂️ Tải QR hàng loạt (.ZIP)</button>':""}
        ${s?"":`<button class="btn blue sm" onclick="openM('add_g')">+ Thêm KH đăng ký</button>`}
        ${a?'<button class="btn sm" style="background:#7C3AED;color:#fff;border-color:#7C3AED" onclick="openWalkin()">🚶 + Walk-in</button>':""}
      </div>
    </div>
    
    ${s?`<div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">📋</span>
      <div>
        <div style="font-weight:600;font-size:13px;color:#92400E">Sự kiện đã kết thúc — Chế độ chỉnh sửa hậu sự kiện</div>
        <div style="font-size:11px;color:#aaa">Check-in, Cancel, Thêm/Xoá khách đã bị khoá từ ngày ${B(e.date)}. Vẫn có thể <b>sửa thông tin</b> (PRM, vùng, đơn vị, SIH, ghi chú, systemCode, tên, SĐT).</div>
      </div>
    </div>`:""}
    <div class="stats" style="grid-template-columns:repeat(5,1fr)">
      <div class="stat"><div class="n">${c.t}</div><div class="l">Tổng</div></div>
      <div class="stat"><div class="n" style="color:#3B6D11">${c.c}</div><div class="l">✅ Đã vào</div></div>
      <div class="stat"><div class="n" style="color:#aaa">${c.p}</div><div class="l">⏳ Chưa</div></div>
      <div class="stat"><div class="n" style="color:#B91C1C">${c.x}</div><div class="l">🚫 Cancel</div></div>
      <div class="stat"><div class="n">${c.t>0?Math.round(c.c/c.t*100):0}%</div><div class="l">Tỷ lệ vào</div></div>
    </div>
    <div class="card-tight">
      <div style="overflow-x:auto">
        <table class="tbl">
          <thead><tr>
            <th style="width:26px">#</th><th>Khách / Đi kèm</th><th style="width:76px">Mã</th>
            <th style="width:95px">SĐT</th><th style="width:120px">PRM / Vùng</th>
            <th style="width:95px">Đơn vị</th><th style="width:85px">SIH</th>
            <th style="width:72px">Check-in</th><th style="width:90px">TT</th>
          </tr></thead>
          <tbody>
          ${n.length===0?'<tr><td colspan="9" style="text-align:center;padding:24px;color:#bbb">Không có dữ liệu</td></tr>':""}
          ${n.map((l,r)=>{const h=l.companions||[],f=!!l.cancelled,g=!!l.walkin;let v=`<tr ${f?'class="cancelled"':""} style="${f?"background:#FFF8F8":""}">
              <td style="color:#ccc">${r+1}</td>
              <td>
                <div style="font-weight:600${f?";text-decoration:line-through;color:#bbb":""}">
                  ${l.name}
                  ${g?'<span style="font-size:9px;font-weight:700;background:#EDE9FE;color:#7C3AED;padding:1px 6px;border-radius:8px;margin-left:4px;vertical-align:middle">Walk-in</span>':""}
                </div>
                ${f?`<span class="cancelled-badge">🚫 Cancel</span>${l.cancelNote?`<div class="cancel-note">${l.cancelNote}</div>`:""}`:`${h.length?`<div class="sub">+${h.length} đi kèm</div>`:""}
                   ${l.note?`<div class="sub" style="font-style:italic">${l.note}</div>`:""}
                   ${s?"":`<button class="btn xs" onclick="openAddComp('${l.id}')" style="margin-top:5px;font-size:10px;color:#185FA5;border-color:#b3d4f5">+ thêm đi kèm</button>`}`}
              </td>
              <td><span class="mono">${l.guestCode}</span>${l.systemCode?`<div style="font-size:10px;color:#aaa;margin-top:2px">Mã HT: ${l.systemCode}</div>`:""}</td>
              <td style="color:#888;font-size:12px">${l.phone||"—"}</td>
              <td><div style="font-size:12px">${l.prmName||"—"}</div><div class="sub">${l.tcbRegion||""}</div></td>
              <td style="font-size:12px;color:#888">${l.unit||"—"}</td>
              <td style="font-size:12px;color:#888">${l.sihName||"—"}</td>
              <td>${f||s?'<span style="font-size:11px;color:#ccc">—</span>':`<button class="ci ${l.checkedIn?"on":"off"}" onclick="togCI('${l.id}','g')">${l.checkedIn?"✅ Vào":"⏳"}</button>
                 ${l.checkedIn?`<div style="font-size:10px;color:#bbb;margin-top:2px">${vt(l.checkinTime)}</div>`:""}`}
              </td>
              <td>
                <div style="display:flex;gap:2px;flex-wrap:wrap">
                  <button class="btn xs" onclick="openTickets('${l.id}')" title="Vé">🎫</button>
                  ${s?"":f?`<button class="btn xs" onclick="undoCancel('${l.id}','g')" style="color:#185FA5;border-color:#185FA5" title="Recall — KH quay lại tham dự">↩</button>`:`<button class="btn xs" onclick="openCancel('${l.id}','g')" title="Cancel KH" style="color:#B91C1C;border-color:#FECACA">🚫</button>`}
                  <button class="btn xs" onclick="openEdit('${l.id}')" title="Sửa thông tin">✏️</button>
                  ${s?"":`<button class="btn xs red" onclick="openDel('${l.id}')" title="Xoá">🗑️</button>`}
                </div>
              </td>
            </tr>`;return h.forEach(u=>{const b=!!u.cancelled;v+=`<tr ${b?'class="cancelled"':""} style="background:${b?"#FFF8F8":"#fafbfc"}">
                <td></td>
                <td style="padding-left:22px">
                  <span style="font-size:12px;color:${b?"#ccc":"#555"};font-weight:500${b?";text-decoration:line-through":""}">↳ ${u.name}</span>
                  ${b?`<span class="cancelled-badge" style="margin-left:4px">🚫</span>${u.cancelNote?`<div class="cancel-note" style="padding-left:14px">${u.cancelNote}</div>`:""}`:'<span class="badge b-purple" style="font-size:9px;margin-left:4px">đi kèm</span>'}
                </td>
                <td><span class="mono">${u.code}</span></td>
                <td style="font-size:12px;color:#aaa">${u.phone||"—"}</td>
                <td colspan="2"></td><td></td>
                <td>${b||s?'<span style="font-size:11px;color:#ccc">—</span>':`<button class="ci ${u.checkedIn?"on":"off"}" onclick="togCI('${l.id}','c','${u.id}')">${u.checkedIn?"✅ Vào":"⏳"}</button>
                   ${u.checkedIn?`<div style="font-size:10px;color:#bbb;margin-top:2px">${vt(u.checkinTime)}</div>`:""}`}
                </td>
                <td>
                  <div style="display:flex;gap:2px;flex-wrap:wrap">
                    <button class="btn xs" onclick="openCpTicket('${l.id}','${u.id}')" title="Vé">🎫</button>
                    ${s?"":b?`<button class="btn xs" onclick="undoCancel('${l.id}','c','${u.id}')" style="color:#185FA5;border-color:#185FA5" title="Recall — người đi kèm quay lại">↩</button>`:`<button class="btn xs" onclick="openCancel('${l.id}','c','${u.id}')" style="color:#B91C1C;border-color:#FECACA" title="Cancel">🚫</button>`}
                    <button class="btn xs" onclick="openCpEdit('${l.id}','${u.id}')" title="Sửa thông tin">✏️</button>
                    ${s?"":`<button class="btn xs red" onclick="openCpDel('${l.id}','${u.id}')" title="Xoá">🗑️</button>`}
                  </div>
                </td>
              </tr>`}),v}).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${c.t>0?'<div style="text-align:right;margin-top:6px"><button class="btn sm" onclick="expCSV()">⬇️ Xuất CSV</button></div>':""}`}function ce(){if(!d.events.length)return'<div class="empty">Chưa có dữ liệu.</div>';const n=`
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><div style="font-weight:700">📊 Tổng quan sự kiện</div><button id="refresh_btn" class="btn sm" onclick="doRefresh()">🔄 Làm mới</button></div>${`<select class="selx" style="min-width:220px" onchange="setRptEv(this.value)">
    <option value="">-- Tất cả sự kiện --</option>
    ${d.events.map(p=>`<option value="${p.id}" ${i.rptEv===p.id?"selected":""}>${p.name}${p.eventPw&&!i.unlockedEvs[p.id]?" 🔒":""}${J(p)?" 🔐":""}</option>`).join("")}
  </select>`}
      </div>
      ${d.events.map(p=>{const $=yt(p.id),S=$.t?Math.round($.c/$.t*100):0,ut=p.eventPw&&!i.unlockedEvs[p.id];return`<div style="padding:10px 0;border-bottom:1px solid #f0f0f0">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
            <div><div style="font-weight:600;font-size:13px">${p.name}${ut?" 🔒":""}</div>
              <div style="font-size:11px;color:#aaa">${B(p.date)}${p.team?" · "+p.team:""}</div></div>
            <div style="display:flex;gap:10px;align-items:center">
              <div style="text-align:center"><div style="font-size:15px;font-weight:700">${$.t}</div><div style="font-size:10px;color:#aaa">Tổng</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#3B6D11">${$.c}</div><div style="font-size:10px;color:#aaa">✅ Đã vào</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#aaa">${$.p}</div><div style="font-size:10px;color:#aaa">⏳ Chưa</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#B91C1C">${$.x}</div><div style="font-size:10px;color:#aaa">🚫 Cancel</div></div>
              <div style="width:60px">
                <div class="pb"><div class="pb-fill" style="width:${S}%;background:#3B6D11"></div></div>
                <div style="font-size:10px;text-align:center;color:#aaa;margin-top:2px">${S}%</div>
              </div>
            </div>
          </div>
        </div>`}).join("")}
    </div>`;if(!i.rptEv)return n+'<div class="empty" style="padding:24px">☝️ Chọn sự kiện ở trên để xem báo cáo chi tiết</div>';const c=d.events.find(p=>p.id===i.rptEv);if(c!=null&&c.eventPw&&!i.unlockedEvs[i.rptEv])return n+`<div class="card" style="text-align:center;padding:24px">
      <div style="font-size:24px;margin-bottom:8px">🔒</div>
      <div style="font-weight:700;margin-bottom:4px">Sự kiện được bảo vệ</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:14px">Nhập mật khẩu để xem báo cáo chi tiết</div>
      <button class="btn blue" onclick="S.evUnlockTarget='${i.rptEv}';S.modal='ev_unlock';R()">🔓 Nhập mật khẩu</button>
    </div>`;const o=it(i.rptEv).map(p=>({name:p.name,code:p.guestCode,phone:p.phone,prmName:p.prmName,tcbRegion:p.tcbRegion,unit:p.unit,sihName:p.sihName,note:p.note,checkedIn:p.checkedIn,cancelled:p.cancelled,checkinTime:p.checkinTime,companions:p.companions||[]})),s=[];o.forEach(p=>{s.push({checkedIn:p.checkedIn,cancelled:p.cancelled,isMain:!0}),p.companions.forEach($=>s.push({checkedIn:$.checkedIn,cancelled:$.cancelled,isMain:!1}))});const a=o.length,l=o.filter(p=>p.checkedIn).length,r=o.filter(p=>p.cancelled).length,h=a-l-r,f=a>0?Math.round(l/a*100):0,g=s.length,v=o.length,u=g-v,b=s.filter(p=>p.checkedIn).length,y=l,C=b-y,_=y>0?Math.round(C/y*100)/100:0,k=o.filter(p=>!p.walkin),E=o.filter(p=>!!p.walkin),I=k.length,z=k.filter(p=>p.checkedIn).length,M=k.filter(p=>p.cancelled).length,H=I-z-M,Q=I>0?Math.round(z/I*100):0,A=E.length,U=E.filter(p=>p.checkedIn).length,R=E.filter(p=>p.cancelled).length,V=A-U-R,Z=A>0?Math.round(U/A*100):0;function L(p,$,S){return A===0?'<td style="padding:8px 12px;text-align:center;color:#ccc;font-size:12px">—</td>':'<td style="padding:8px 12px;text-align:center;background:#FAFAFF"><div style="font-size:18px;font-weight:800;color:'+$+'">'+p+"</div>"+(S?'<div style="font-size:10px;color:#aaa;margin-top:1px">'+S+"</div>":"")+"</td>"}function P(p,$,S){return'<td style="padding:8px 12px;text-align:center"><div style="font-size:18px;font-weight:800;color:'+$+'">'+p+"</div>"+(S?'<div style="font-size:10px;color:#aaa;margin-top:1px">'+S+"</div>":"")+"</td>"}const F=`
  <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin:0 0 8px;text-transform:uppercase">📊 Pre-registered vs Walk-in (Main)</div>
  <div style="background:#fff;border-radius:12px;border:1px solid #eaecf0;margin-bottom:14px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead><tr style="background:#f8fafc">
        <th style="padding:10px 12px;text-align:left;font-size:11px;color:#aaa;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #eaecf0"></th>
        <th style="padding:10px 12px;text-align:center;font-size:12px;font-weight:700;color:#185FA5;border-bottom:1px solid #eaecf0">📋 Pre-registered</th>
        <th style="padding:10px 12px;text-align:center;font-size:12px;font-weight:700;color:#7C3AED;border-bottom:1px solid #eaecf0;background:${A>0?"#F5F3FF":"#f8fafc"}">🚶 Walk-in</th>
      </tr></thead>
      <tbody>
        <tr style="border-bottom:1px solid #f0f0f0">
          <td style="padding:8px 12px;font-size:12px;color:#555;font-weight:600">Tổng KH</td>
          ${P(I,"#185FA5","")}
          ${L(A,"#7C3AED","")}
        </tr>
        <tr style="border-bottom:1px solid #f0f0f0">
          <td style="padding:8px 12px;font-size:12px;color:#3B6D11;font-weight:600">✅ Đã vào</td>
          ${P(z,"#3B6D11",Q+"% turnout")}
          ${L(U,"#3B6D11",Z+"% turnout")}
        </tr>
        <tr style="border-bottom:1px solid #f0f0f0">
          <td style="padding:8px 12px;font-size:12px;color:#888;font-weight:600">⏳ Chưa tới</td>
          ${P(H,"#aaa","")}
          ${L(V,"#aaa","")}
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:12px;color:#B91C1C;font-weight:600">🚫 Cancel</td>
          ${P(M>0?M:"—",M>0?"#B91C1C":"#ccc","")}
          ${L(R>0?R:"—",R>0?"#B91C1C":"#ccc","")}
        </tr>
      </tbody>
    </table>
    ${A===0?'<div style="padding:8px 14px;font-size:11px;color:#bbb;text-align:center;border-top:1px solid #f0f0f0">Sự kiện này chưa có khách Walk-in</div>':""}
  </div>`,D=`<div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">Tổng quan (Khách hàng - Main)</div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    ${et("Tổng KH mời (Main)","#185FA5",a,"")}
    ${et("✅ KH đã tới","#3B6D11",l,f+"% turnout")}
    ${et("⏳ KH chưa tới","#888",h,"")}
    ${et("🚫 KH cancel","#B91C1C",r,"")}
  </div>
  <div style="background:#fff;border-radius:12px;padding:14px 18px;margin-bottom:14px;border:1px solid #eaecf0">
    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px">
      <span style="font-weight:700">${c.name}</span>
      <span style="color:#3B6D11;font-weight:700">${f}%</span>
    </div>
    <div style="background:#f0f0f0;border-radius:99px;height:12px;overflow:hidden">
      <div style="width:${f}%;background:linear-gradient(90deg,#185FA5,#3B6D11);height:100%;border-radius:99px;transition:width .4s"></div>
    </div>
  </div>
  ${F}
  <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">Tổng lượt tham dự thực tế (Main + Companion)</div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    ${et("Tổng lượt đăng ký","#185FA5",g,v+" Main + "+u+" Companion")}
    ${et("✅ Tổng đã vào sảnh","#3B6D11",b,y+" Main + "+C+" Companion")}
    ${et("Avg companion / Main đã vào","#888",_,"")}
  </div>`;function j(p){const $=p.companions||[];if(!$.length)return"";const S=$.map(G=>G.checkedIn?"-1":"+1");return`<span style="font-size:12px;font-weight:600;color:${S.every(G=>G==="-1")?"#e24b4a":S.every(G=>G==="+1")?"#3B6D11":"#aaa"};white-space:nowrap;margin-left:8px">${S.join(" ")}</span>`}function O(p,$,S,ut){const G={};o.forEach(Y=>{const T=ut(Y)||"Không xác định";G[T]||(G[T]=[]),G[T].push(Y)});const St=Object.entries(G).sort((Y,T)=>T[1].length-Y[1].length);return St.length?`<div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin:16px 0 8px;text-transform:uppercase">${$} Theo ${p} (Main)</div>
      ${St.map(([Y,T])=>{const W=T.filter(x=>x.checkedIn).length,dt=T.filter(x=>x.cancelled).length,tt=T.length-W-dt,kt=T.length>0?Math.round(W/T.length*100):0,st=`${S}_${Y}`,At=!!i.rptExp[st+"_ci"],Ht=!!i.rptExp[st+"_ab"],Nt=!!i.rptExp[st+"_cn"];return`<div style="background:#fff;border-radius:12px;border:1px solid #eaecf0;padding:14px 16px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
            <div style="font-weight:700;font-size:13px">${Y} <span style="font-weight:400;color:#aaa;font-size:11px">(${T.length} Main)</span></div>
            <div style="display:flex;gap:6px;font-size:12px;flex-wrap:wrap">
              <span onclick="togRpt('${st}_ci')" style="background:${W>0?"#eaf3de":"#f5f5f5"};color:${W>0?"#3B6D11":"#aaa"};border-radius:20px;padding:2px 10px;font-weight:600;cursor:${W>0?"pointer":"default"};user-select:none">
                Đã vào: ${W}${W>0?At?" ▲":" ▼":""}
              </span>
              <span onclick="togRpt('${st}_ab')" style="background:${tt>0?"#fdecea":"#f5f5f5"};color:${tt>0?"#e24b4a":"#aaa"};border-radius:20px;padding:2px 10px;font-weight:600;cursor:${tt>0?"pointer":"default"};user-select:none">
                Chưa: ${tt}${tt>0?Ht?" ▲":" ▼":""}
              </span>
              ${dt>0?`<span onclick="togRpt('${st}_cn')" style="background:#FEF2F2;color:#B91C1C;border-radius:20px;padding:2px 10px;font-weight:600;cursor:pointer;user-select:none">
                Cancel: ${dt}${Nt?" ▲":" ▼"}
              </span>`:""}
            </div>
          </div>
          <div style="background:#f0f0f0;border-radius:99px;height:8px;overflow:hidden">
            <div style="width:${kt}%;background:${kt===100?"#3B6D11":"linear-gradient(90deg,#185FA5,#3B6D11)"};height:100%;border-radius:99px"></div>
          </div>
          <div style="font-size:10px;color:#aaa;margin-top:4px;text-align:right">${kt}% Main đã check-in</div>
          ${At&&W>0?`<div style="background:#f0faf0;border:1px solid #97C459;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#3B6D11;margin-bottom:6px">Đã check-in (${W} Main)</div>
            ${T.filter(x=>x.checkedIn).map(x=>`<div style="padding:5px 0;border-bottom:.5px solid #c8e6c9;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px">${x.name}${x.walkin?'<span style="font-size:9px;background:#EDE9FE;color:#7C3AED;padding:1px 5px;border-radius:6px;margin-left:4px">Walk-in</span>':""}</div>
                <div style="font-size:11px;color:#888">${x.code}${x.phone?" · "+x.phone:""}</div>
                <div style="font-size:10px;color:#3B6D11">✅ ${vt(x.checkinTime)}</div>
              </div>
              ${j(x)}
            </div>`).join("")}
          </div>`:""}
          ${Ht&&tt>0?`<div style="background:#fff8f8;border:1px solid #fdd;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#e24b4a;margin-bottom:6px">Chưa check-in (${tt} Main)</div>
            ${T.filter(x=>!x.checkedIn&&!x.cancelled).map(x=>`<div style="padding:5px 0;border-bottom:.5px solid #fdd;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px">${x.name}</div>
                <div style="font-size:11px;color:#888">${x.code}${x.phone?" · "+x.phone:""}</div>
              </div>
              ${j(x)}
            </div>`).join("")}
          </div>`:""}
          ${Nt&&dt>0?`<div style="background:#FFF8F8;border:1px solid #FECACA;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#B91C1C;margin-bottom:6px">Đã cancel (${dt} Main)</div>
            ${T.filter(x=>x.cancelled).map(x=>`<div style="padding:5px 0;border-bottom:.5px solid #FECACA;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px;text-decoration:line-through;color:#bbb">${x.name}</div>
                <div style="font-size:11px;color:#aaa">${x.code}${x.phone?" · "+x.phone:""}</div>
                ${x.note?`<div style="font-size:10px;color:#B91C1C;font-style:italic">${x.note}</div>`:""}
              </div>
              ${j(x)}
            </div>`).join("")}
          </div>`:""}
        </div>`}).join("")}`:""}const ct=O("Vùng TCB","🏦","vung",p=>p.tcbRegion),pt=O("Chi nhánh","🏢","unit",p=>p.unit),mt=O("SIH","👤","sih",p=>p.sihName),Pt=O("PRM","🤝","prm",p=>p.prmName);return n+D+ct+pt+mt+Pt}function et(t,e,n,c){return`<div style="flex:1;min-width:120px;background:#fff;border-radius:12px;padding:14px 16px;border-left:4px solid ${e};border:1px solid #eaecf0;border-left-width:4px">
    <div style="font-size:11px;color:#888;margin-bottom:4px">${t}</div>
    <div style="font-size:28px;font-weight:800;color:${e};line-height:1">${n}</div>
    ${c?`<div style="font-size:11px;color:#aaa;margin-top:4px">${c}</div>`:""}
  </div>`}function se(t){i.rptExp[t]=!i.rptExp[t],m()}function le(t){if(t){const e=d.events.find(n=>n.id===t);if(e!=null&&e.eventPw&&!i.unlockedEvs[t]){i.evUnlockTarget=t,i.rptEv=t,i.modal="ev_unlock",m();return}}i.rptEv=t||null,i.rptExp={},m()}function ae(){const t=(e,n)=>`<div class="ov" onclick="closeM()"><div class="modal ${n||""}" onclick="event.stopPropagation()">${e}</div></div>`;return i.modal==="add_ev"||i.modal==="edit_ev"?t(de(),"lg"):i.modal==="add_g"||i.modal==="edit_g"?t(re(),"lg"):i.modal==="tickets"?t(me(),"lg"):i.modal==="edit_pw"?t(ue(),"sm"):i.modal==="edit_form"?t(he(),"lg"):i.modal==="del_pw"?t(ge(),"sm"):i.modal==="cp_ticket"?t(fe(),"sm"):i.modal==="cp_edit"?t(ve(),"sm"):i.modal==="cp_del"?t(be(),"sm"):i.modal==="cp_add"?t(xe()):i.modal==="admin_ci"?t(ye(),"sm"):i.modal==="cancel"?t(ke(),"sm"):i.modal==="ev_unlock"?t(we(),"sm"):i.modal==="import_preview"?t(Ce(),"lg"):i.modal==="walkin"?t(Tn(),"lg"):""}function de(){const t=i.modal==="edit_ev",e=t?d.events.find(c=>c.id===i.editEvId):{},n=(e==null?void 0:e.btcMembers)||[{code:"",name:""}];return`<div class="mh">${t?"✏️ Chỉnh sửa sự kiện":"📅 Tạo sự kiện mới"}</div>
    <div class="g2">
      <div class="fg sp"><label>Tên sự kiện *</label><input id="ev_n" placeholder="VD: OneHousing Elite Night — The Global City" value="${(e==null?void 0:e.name)||""}"/></div>
      <div class="fg"><label>Thời gian tổ chức</label><input id="ev_d" type="date" value="${(e==null?void 0:e.date)||""}"/></div>
      <div class="fg"><label>Team tổ chức</label><input id="ev_t" placeholder="VD: Marketing Miền Nam" value="${(e==null?void 0:e.team)||""}"/></div>
      <div class="fg sp"><label>Địa điểm</label><input id="ev_v" placeholder="VD: The Global City Ballroom" value="${(e==null?void 0:e.venue)||""}"/></div>
    </div>
    <div class="sec">🔐 Mật khẩu bảo vệ danh sách khách</div>
    ${t?`
      <div style="font-size:12px;color:#aaa;margin-bottom:8px">Đổi mật khẩu mới — để trống nếu muốn giữ nguyên mật khẩu cũ.</div>
      <div style="background:#f4f7fb;border-radius:8px;padding:10px 12px;margin-bottom:10px;font-size:13px;color:#555">
        Mật khẩu hiện tại: <span style="font-family:'JetBrains Mono',monospace;font-weight:600;color:#185FA5">${(e==null?void 0:e.eventPw)||"(chưa có)"}</span>
      </div>
      <div class="g2">
        <div class="fg"><label>Mật khẩu mới (tuỳ chọn)</label><input id="ev_pw" type="text" placeholder="Để trống = giữ nguyên" style="font-family:'JetBrains Mono',monospace" autocomplete="off"/></div>
        <div class="fg"><label>Nhập lại mật khẩu mới</label><input id="ev_pw2" type="text" placeholder="Nhập lại để xác nhận" style="font-family:'JetBrains Mono',monospace" autocomplete="off"/></div>
      </div>`:`
      <div style="font-size:12px;color:#aaa;margin-bottom:8px">Ai muốn xem/quản lý khách phải nhập đúng mật khẩu này.</div>
      <div class="g2">
        <div class="fg"><label>Mật khẩu sự kiện *</label><input id="ev_pw" type="text" placeholder="VD: OH_Elite_0626" style="font-family:'JetBrains Mono',monospace;letter-spacing:1px" autocomplete="off"/></div>
        <div class="fg"><label>Nhập lại để xác nhận *</label><input id="ev_pw2" type="text" placeholder="Nhập lại mật khẩu" style="font-family:'JetBrains Mono',monospace;letter-spacing:1px" autocomplete="off"/></div>
      </div>`}
    <div id="ev_pw_err" style="color:#B91C1C;font-size:12px;margin-bottom:8px"></div>
    <div class="sec">🔑 Danh sách BTC — Mã nhân viên có quyền check-in</div>
    <div style="font-size:12px;color:#aaa;margin-bottom:8px">Thêm, sửa hoặc xoá thành viên BTC. Cùng mã có thể dùng ở nhiều sự kiện.</div>
    <div id="btc_w">
      ${n.map((c,o)=>`<div class="btc-r" id="br_${o}">
        <input placeholder="Mã NV" id="bc_${o}" value="${c.code||""}" style="max-width:110px;font-family:'JetBrains Mono',monospace;text-transform:uppercase"/>
        <input placeholder="Họ tên BTC" id="bn_${o}" value="${c.name||""}"/>
        ${o>0?`<button class="btn xs red" onclick="rmBR(${o})">✕</button>`:'<span style="width:22px"></span>'}
      </div>`).join("")}
    </div>
    <button class="btn sm" onclick="addBR()" style="margin-bottom:4px">+ Thêm BTC</button>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn ${t?"green":"blue"}" onclick="saveEv()">✅ ${t?"Lưu thay đổi":"Tạo sự kiện"}</button>
    </div>`}function re(){var n;const t=i.modal==="edit_g"&&i.editGid?d.guests.find(c=>c.id===i.editGid):{},e=(n=t==null?void 0:t.companions)!=null&&n.length?t.companions:[{name:"",phone:""}];return`<div class="mh">${i.modal==="edit_g"?"✏️ Chỉnh sửa khách mời":"👤 Thêm khách mời mới"}</div>
    <div class="fg"><label>Sự kiện *</label><select id="g_ev">${d.events.map(c=>`<option value="${c.id}" ${i.selEv===c.id||(t==null?void 0:t.eventId)===c.id?"selected":""}>${c.name}</option>`).join("")}</select></div>
    ${i.modal==="edit_g"?`<div style="margin-bottom:10px"><span style="font-size:12px;color:#aaa">Mã KH:</span> <span class="mono">${(t==null?void 0:t.guestCode)||""}</span> <span style="font-size:11px;color:#ccc">(cố định, không thay đổi)</span></div>`:""}
    <div class="sec">Thông tin khách hàng chính</div>
    <div class="g3">
      <div class="fg"><label>Họ và tên KH *</label><input id="g_n" placeholder="Nguyễn Văn A" value="${(t==null?void 0:t.name)||""}"/></div>
      <div class="fg"><label>Số điện thoại *</label><input id="g_ph" type="tel" placeholder="09xxxxxxxx" value="${(t==null?void 0:t.phone)||""}"/></div>
      <div class="fg"><label>Mã Hệ thống <span style="font-weight:400;color:#aaa">(OneHousing)</span></label><input id="g_syscode" placeholder="VD: OH-00123" value="${(t==null?void 0:t.systemCode)||""}"/></div>
    </div>
    <div class="sec">👥 Người đi kèm <span style="text-transform:none;letter-spacing:0;font-weight:400">(mỗi người có QR & check-in riêng)</span></div>
    <div id="cp_w">
      ${e.map((c,o)=>{var s,a;return pe(c,o,(a=(s=t==null?void 0:t.companions)==null?void 0:s[o])==null?void 0:a.code)}).join("")}
    </div>
    <button class="btn sm" onclick="addCR()" style="margin-bottom:4px">+ Thêm đi kèm</button>
    <div class="sec">Thông tin chăm sóc</div>
    <div class="g3">
      <div class="fg"><label>Tên PRM (Sales TCB)</label><input id="g_prm" placeholder="Tên PRM" value="${(t==null?void 0:t.prmName)||""}"/></div>
      <div class="fg"><label>Vùng TCB</label><input id="g_reg" placeholder="Vùng 1 HCM" value="${(t==null?void 0:t.tcbRegion)||""}"/></div>
      <div class="fg"><label>Đơn vị (CN/PGD)</label><input id="g_unit" placeholder="CN Thủ Đức" value="${(t==null?void 0:t.unit)||""}"/></div>
    </div>
    <div class="g2">
      <div class="fg"><label>Tên SIH (Sales OneHousing)</label><input id="g_sih" placeholder="Tên SIH" value="${(t==null?void 0:t.sihName)||""}"/></div>
      <div class="fg"><label>Note / Lưu ý</label><input id="g_note" placeholder="VVIP, ưu tiên bàn đầu..." value="${(t==null?void 0:t.note)||""}"/></div>
    </div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn ${i.modal==="edit_g"?"green":"blue"}" onclick="saveG()">✅ ${i.modal==="edit_g"?"Lưu thay đổi":"Thêm khách & Tạo vé"}</button>
    </div>`}function pe(t,e,n){return`<div class="cp-r" id="cr_${e}">
    <div class="g2" style="margin-bottom:0">
      <div class="fg" style="margin-bottom:0"><label>Họ tên người đi kèm ${e+1}</label>
        <input placeholder="Họ và tên" id="cn_${e}" value="${t.name||""}"/></div>
      <div class="fg" style="margin-bottom:0"><label>Số điện thoại</label>
        <input placeholder="09xxxxxxxx" type="tel" id="cp_${e}" value="${t.phone||""}"/></div>
    </div>
    ${n?`<div style="margin-top:6px;font-size:11px;color:#aaa">Mã: <span class="mono">${n}</span> (cố định)</div>`:""}
    ${e>0?`<button class="btn xs red" onclick="rmCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`:""}
  </div>`}function me(){var c;const t=d.guests.find(o=>o.id===i.ticketGid);if(!t)return"";const e=d.events.find(o=>o.id===t.eventId),n=[{type:"main",name:t.name,code:t.guestCode,phone:t.phone},...(t.companions||[]).map(o=>({type:"comp",name:o.name,code:o.code,phone:o.phone,parentName:t.name}))];return`<div class="mh">🎫 Vé tham dự sự kiện</div>
    <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(e==null?void 0:e.name)||""} · ${B(e==null?void 0:e.date)}</div>
    <div style="font-size:12px;color:#bbb;margin-bottom:16px">${n.length} vé · 1 KH chính${(c=t.companions)!=null&&c.length?" + "+t.companions.length+" đi kèm":""}</div>
    <div class="tgrid">
      ${n.map((o,s)=>`
        <div class="ticket">
          <div class="tk-header">VÉ THAM DỰ SỰ KIỆN</div>
          <div style="font-size:11px;color:#bbb;margin-bottom:6px">${(e==null?void 0:e.name)||""}</div>
          <div style="font-size:11px;color:#bbb;margin-bottom:12px">${B(e==null?void 0:e.date)}${e!=null&&e.venue?" · "+e.venue:""}</div>
          <div class="tk-name">${o.name}</div>
          <span class="tk-role ${o.type==="main"?"b-blue":"b-purple"}">${o.type==="main"?"Khách mời chính":"Đi kèm: "+o.parentName}</span>
          <div class="tk-qr" id="tqr_${s}"></div>
          <div class="tk-code">${o.code}</div>
          <div class="tk-foot">
            Vui lòng xuất trình vé tại cổng check-in<br>
            Vé chỉ có giá trị cho 01 người
          </div>
          <button class="btn sm" onclick="dlTicket(${s},'${o.name.replace(/'/g,"\\'")}','${o.code}','${o.type==="main"?"Khách mời chính":"Đi kèm: "+(o.parentName||"").replace(/'/g,"\\'")}')" style="margin-top:10px;font-size:12px">⬇️ Tải vé này</button>
        </div>
      `).join("")}
    </div>
    <div class="mf" style="justify-content:center">
      <button class="btn" onclick="printAll()">🖨️ In tất cả vé</button>
      <button class="btn" onclick="closeM()">Đóng</button>
    </div>`}function ue(){return`<div class="mh">✏️ Xác nhận chỉnh sửa</div>
    <div style="font-size:13px;color:#888;margin-bottom:12px">Nhập mật khẩu Admin để chỉnh sửa thông tin khách.</div>
    <div class="fg"><label>Mật khẩu Admin</label>
      <input type="password" id="epw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')chkEditPw()"/></div>
    <div id="epw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="chkEditPw()">Tiếp tục →</button>
    </div>`}function he(){var n;const t=d.guests.find(c=>c.id===i.editGid);if(!t)return"";const e=(n=t.companions)!=null&&n.length?t.companions:[{name:"",phone:"",code:""}];return`<div class="mh">✏️ Chỉnh sửa — ${t.name}</div>
    <div style="margin-bottom:12px"><span class="mono">${t.guestCode}</span> <span style="font-size:11px;color:#ccc">(mã cố định)</span></div>
    <div class="sec">Thông tin khách hàng chính</div>
    <div class="g3">
      <div class="fg"><label>Họ và tên KH</label><input id="eg_n" value="${t.name||""}"/></div>
      <div class="fg"><label>Số điện thoại</label><input id="eg_ph" type="tel" value="${t.phone||""}"/></div>
      <div class="fg"><label>Mã Hệ thống <span style="font-weight:400;color:#aaa">(OneHousing)</span></label><input id="eg_syscode" value="${t.systemCode||""}"/></div>
    </div>
    <div class="sec">Người đi kèm</div>
    <div id="ecp_w">
      ${e.map((c,o)=>`<div class="cp-r" id="ecr_${o}">
        <div class="g2" style="margin-bottom:0">
          <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${o+1}</label><input id="ecn_${o}" value="${c.name||""}"/></div>
          <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="ecp_${o}" type="tel" value="${c.phone||""}"/></div>
        </div>
        <div style="margin-top:5px;font-size:11px;color:#aaa">Mã: <span class="mono">${c.code||"—"}</span> (cố định)</div>
      </div>`).join("")}
    </div>
    <div class="sec">Thông tin chăm sóc</div>
    <div class="g3">
      <div class="fg"><label>PRM</label><input id="eg_prm" value="${t.prmName||""}"/></div>
      <div class="fg"><label>Vùng TCB</label><input id="eg_reg" value="${t.tcbRegion||""}"/></div>
      <div class="fg"><label>Đơn vị</label><input id="eg_unit" value="${t.unit||""}"/></div>
    </div>
    <div class="g2">
      <div class="fg"><label>SIH</label><input id="eg_sih" value="${t.sihName||""}"/></div>
      <div class="fg"><label>Note</label><input id="eg_note" value="${t.note||""}"/></div>
    </div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn green" onclick="doEdit()">💾 Lưu</button>
    </div>`}function ge(){const t=d.guests.find(e=>e.id===i.delGid);return`<div class="mh">🗑️ Xoá khách hàng</div>
    <div style="text-align:center;padding:8px 0">
      <div style="font-size:13px;color:#555;margin-bottom:4px">Xoá <b>${(t==null?void 0:t.name)||""}</b> — <span class="mono">${(t==null?void 0:t.guestCode)||""}</span></div>
      <div style="font-size:12px;color:#bbb;margin-bottom:16px">Hành động này không thể hoàn tác. Người đi kèm cũng bị xoá.</div>
    </div>
    <div class="fg"><label>Mật khẩu Admin để xác nhận</label>
      <input type="password" id="dpw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')doDel()"/></div>
    <div id="dpw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn red" onclick="doDel()">🗑️ Xoá</button>
    </div>`}function fe(){const{gid:t,cpId:e}=i.cpTicket||{},n=d.guests.find(s=>s.id===t),c=((n==null?void 0:n.companions)||[]).find(s=>s.id===e);if(!n||!c)return"";const o=d.events.find(s=>s.id===n.eventId);return`<div class="mh">🎫 Vé người đi kèm</div>
    <div class="ticket" style="margin:8px 0">
      <div class="tk-header">VÉ THAM DỰ SỰ KIỆN</div>
      <div style="font-size:11px;color:#bbb;margin-bottom:6px">${(o==null?void 0:o.name)||""}</div>
      <div style="font-size:11px;color:#bbb;margin-bottom:12px">${B(o==null?void 0:o.date)}${o!=null&&o.venue?" · "+o.venue:""}</div>
      <div class="tk-name">${c.name}</div>
      <span class="tk-role b-purple">Đi kèm: ${n.name}</span>
      <div class="tk-qr" id="cp_tqr"></div>
      <div class="tk-code">${c.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <div class="mf" style="justify-content:center">
      <button class="btn sm" onclick="dlCpTicket()">⬇️ Tải vé này</button>
      <button class="btn" onclick="closeM()">Đóng</button>
    </div>`}function ve(){const{gid:t,cpId:e}=i.cpEdit||{},n=d.guests.find(o=>o.id===t),c=((n==null?void 0:n.companions)||[]).find(o=>o.id===e);return!n||!c?"":`<div class="mh">✏️ Sửa người đi kèm</div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Mã: <span class="mono">${c.code}</span> (cố định)</div>
    <div class="fg"><label>Họ và tên</label>
      <input id="cpe_n" value="${c.name}" autofocus/></div>
    <div class="fg"><label>Số điện thoại</label>
      <input id="cpe_ph" type="tel" value="${c.phone||""}"/></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn green" onclick="doCpEdit()">💾 Lưu</button>
    </div>`}function be(){const{gid:t,cpId:e}=i.cpDel||{},n=d.guests.find(o=>o.id===t),c=((n==null?void 0:n.companions)||[]).find(o=>o.id===e);return!n||!c?"":`<div class="mh">🗑️ Xoá người đi kèm</div>
    <div style="text-align:center;padding:8px 0">
      <div style="font-size:13px;color:#555;margin-bottom:4px">Xoá <b>${c.name}</b> <span class="mono">${c.code}</span></div>
      <div style="font-size:12px;color:#aaa;margin-bottom:4px">Đi kèm: ${n.name}</div>
      <div style="font-size:12px;color:#bbb;margin-bottom:14px">Hành động này không thể hoàn tác.</div>
    </div>
    <div class="fg"><label>Mật khẩu Admin để xác nhận</label>
      <input type="password" id="cpdpw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')doCpDel()"/></div>
    <div id="cpdpw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn red" onclick="doCpDel()">🗑️ Xoá</button>
    </div>`}function xe(){const t=d.guests.find(e=>e.id===i.cpAdd);return t?`<div class="mh">👤 Thêm người đi kèm</div>
    <div style="font-size:13px;color:#888;margin-bottom:14px">Thêm cho: <b>${t.name}</b> <span class="mono">${t.guestCode}</span></div>
    <div class="fg"><label>Họ và tên *</label>
      <input id="cpa_n" placeholder="Họ và tên người đi kèm" autofocus/></div>
    <div class="fg"><label>Số điện thoại</label>
      <input id="cpa_ph" type="tel" placeholder="09xxxxxxxx"/></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="doCpAdd()">✅ Thêm & Tạo vé</button>
    </div>`:""}function ye(){var a;const{gid:t,type:e,cpId:n}=i.adminCI||{},c=d.guests.find(l=>l.id===t);if(!c)return"";const o=e==="c"?(c.companions||[]).find(l=>l.id===n):c;if(!o)return"";d.events.find(l=>l.id===c.eventId);const s=!!o.phone;return`<div class="mh">✅ Xác nhận Check-in</div>
    <div style="background:#f4f7fb;border-radius:12px;padding:16px;margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#aaa;margin-bottom:6px">THÔNG TIN KHÁCH</div>
      <div style="font-size:18px;font-weight:800;margin-bottom:4px">${o.name}</div>
      <div style="font-size:13px;color:#185FA5;margin-bottom:4px">Mã: <span style="font-family:'JetBrains Mono',monospace">${e==="c"?((a=(c.companions||[]).find(l=>l.id===n))==null?void 0:a.code)||"—":c.guestCode}</span></div>
      ${e==="c"?`<div style="margin-top:4px"><span class="badge b-purple">Đi kèm: ${c.name}</span></div>`:""}
      ${c.note&&e==="g"?`<div style="margin-top:6px"><span class="badge b-amber">${c.note}</span></div>`:""}
    </div>
    ${s?`
      <div style="font-size:13px;color:#555;text-align:center;margin-bottom:12px">🔢 Nhập 4 số cuối số điện thoại để xác nhận</div>
      <input id="aci_ph" type="tel" maxlength="4" placeholder="— — — —"
        style="width:100%;padding:14px;text-align:center;letter-spacing:10px;font-size:26px;font-family:'JetBrains Mono',monospace;border:2px solid #dde4f0;border-radius:12px"
        onkeydown="if(event.key==='Enter')doAdminCI()"/>
      <div id="aci_err" class="err" style="text-align:center;margin-top:8px"></div>
      <div class="mf">
        <button class="btn" onclick="closeM()">Huỷ</button>
        <button class="btn green" onclick="doAdminCI()" style="padding:10px 28px">✅ Xác nhận Check-in</button>
      </div>`:`<div style="font-size:13px;color:#888;text-align:center;margin-bottom:16px">Khách không có SĐT — check-in trực tiếp không cần xác minh.</div>
      <div class="mf" style="justify-content:center">
        <button class="btn" onclick="closeM()">Huỷ</button>
        <button class="btn green" onclick="doAdminCI()" style="padding:10px 28px">✅ Check-in</button>
      </div>`}`}function ke(){const{gid:t,type:e,cpId:n}=i.cancelTarget||{},c=d.guests.find(s=>s.id===t);if(!c)return"";const o=e==="c"?(c.companions||[]).find(s=>s.id===n):c;return o?`<div class="mh">🚫 Đánh dấu Cancel</div>
    <div style="background:#FFF8F8;border-radius:10px;padding:14px;margin-bottom:14px;border:1px solid #FECACA">
      <div style="font-size:15px;font-weight:700">${o.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:3px">Mã: <span class="mono">${e==="c"?o.code:c.guestCode}</span>${e==="c"?` · Đi kèm: ${c.name}`:""}</div>
    </div>
    <div class="fg">
      <label>Lý do cancel / Ghi chú (tuỳ chọn)</label>
      <textarea id="cancel_note" placeholder="VD: KH có việc đột xuất, chưa xác nhận lại..." style="resize:vertical;min-height:70px;padding:9px 12px;border:1.5px solid #dde4f0;border-radius:8px;font-size:13px;width:100%"></textarea>
    </div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Khách sẽ được giữ trong hệ thống và hiện trong báo cáo với trạng thái Cancel. Có thể khôi phục bất kỳ lúc nào.</div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn red" onclick="doCancel()">🚫 Xác nhận Cancel</button>
    </div>`:""}function we(){const t=d.events.find(e=>e.id===i.evUnlockTarget);return t?`<div class="mh">🔒 Nhập mật khẩu sự kiện</div>
    <div style="background:#f4f7fb;border-radius:10px;padding:14px;margin-bottom:16px">
      <div style="font-size:15px;font-weight:700">${t.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:3px">${B(t.date)}${t.team?" · "+t.team:""}</div>
    </div>
    <div style="font-size:13px;color:#666;margin-bottom:12px">Danh sách khách của sự kiện này được bảo vệ. Nhập mật khẩu để tiếp tục.</div>
    <div class="fg"><label>Mật khẩu sự kiện</label>
      <input type="password" id="ev_unlock_pw" placeholder="Nhập mật khẩu..."
        style="font-size:15px;padding:11px 14px;text-align:center;letter-spacing:2px"
        autofocus onkeydown="if(event.key==='Enter')doEvUnlock()"/></div>
    <div id="ev_unlock_err" style="color:#B91C1C;font-size:12px;margin-bottom:8px"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="doEvUnlock()">Mở khoá →</button>
    </div>`:""}function $e(){var c;const t=d.events.find(o=>o.id===i.evUnlockTarget);if(!t)return;if((((c=document.getElementById("ev_unlock_pw"))==null?void 0:c.value)||"")!==t.eventPw){const o=document.getElementById("ev_unlock_err");o&&(o.textContent="⚠️ Mật khẩu không đúng.");const s=document.getElementById("ev_unlock_pw");s&&(s.value="",s.focus());return}i.unlockedEvs[i.evUnlockTarget]=!0;const n=i.evUnlockTarget;if(i.evUnlockTarget=null,i.modal=null,i.rptEv===n){m();return}i.selEv=n,i.tab="guests",i.search="",i.filter="all",m()}function Ce(){const t=i.importData||[];return`
    <div class="mh">📊 Xác nhận Import danh sách từ Excel</div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Hệ thống tìm thấy <b>${t.length} dòng dữ liệu</b>. Vui lòng kiểm tra kỹ trước khi lưu.</div>
    <div style="max-height:300px;overflow-y:auto;border:1.5px solid #dde4f0;border-radius:10px;margin-bottom:12px">
      <table class="tbl">
        <thead>
          <tr>
            <th>Loại</th><th>Họ và tên</th><th>Số điện thoại</th><th>Tên PRM</th><th>Vùng TCB</th><th>Đơn vị</th><th>Tên SIH</th><th>Ghi chú</th><th>Mã Hệ thống</th>
          </tr>
        </thead>
        <tbody>
          ${t.map(e=>`
            <tr>
              <td><span class="badge ${e.type==="Main"?"b-blue":"b-purple"}">${e.type==="Main"?"KH Chính":"Đi kèm"}</span></td>
              <td style="font-weight:600">${e.name||"—"}</td>
              <td>${e.phone||"—"}</td>
              <td>${e.prmName||"—"}</td>
              <td>${e.tcbRegion||"—"}</td>
              <td>${e.unit||"—"}</td>
              <td>${e.sihName||"—"}</td>
              <td style="color:#aaa;font-style:italic">${e.note||"—"}</td>
              <td style="font-family:'JetBrains Mono',monospace;font-size:11px">${e.type==="Main"&&e.systemCode||"—"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ bỏ</button>
      <button class="btn green" onclick="commitExcelImport()">💾 Xác nhận Lưu vào hệ thống</button>
    </div>
  `}function _e(){const t=i.urlCode;let e=null;for(const a of d.guests){if(a.guestCode===t){e={type:"guest",guest:a,person:a};break}for(const l of a.companions||[])if(l.code===t){e={type:"comp",guest:a,person:l};break}if(e)break}const n=e?d.events.find(a=>{var l;return a.id===((l=e==null?void 0:e.guest)==null?void 0:l.eventId)}):null;if(!e)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">❌</div>
      <div style="font-size:18px;font-weight:700;color:#a32d2d;margin-bottom:8px">Không tìm thấy vé</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:20px">Mã <b>${t}</b> không tồn tại trong hệ thống.</div>
    </div>`;const c=e.person,o=e.guest;if(i.urlCIStep==="done")return`<div style="max-width:400px;margin:40px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:64px;margin-bottom:12px">🎉</div>
      <div style="font-size:22px;font-weight:800;color:#0C447C;margin-bottom:10px">Check-in thành công!</div>
      <div style="font-size:17px;font-weight:600;color:#185FA5;margin-bottom:4px">${c.name}</div>
      ${e.type==="comp"?`<div style="font-size:13px;color:#6D28D9;margin-bottom:4px">Đi kèm: ${o.name}</div>`:""}
      <div style="font-size:13px;color:#aaa">${(n==null?void 0:n.name)||""}</div>
      ${o.note?`<div style="display:inline-block;margin-top:8px;background:#FFFBEB;color:#92400E;font-size:12px;padding:4px 12px;border-radius:20px">${o.note}</div>`:""}
      <div style="font-size:12px;color:#bbb;margin-top:12px">Ghi nhận lúc: ${lt(c.checkinTime)}</div>
      ${i.urlCISyncWarn?`<div style="margin-top:14px;background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:10px;text-align:left">
        ⚠️ Đã ghi nhận check-in trên thiết bị này, nhưng <b>chưa đồng bộ được lên hệ thống trung tâm</b> (có thể do mất mạng).
        Vui lòng báo BTC kỹ thuật kiểm tra lại để đảm bảo dữ liệu được cập nhật đầy đủ.
      </div>`:""}
      <div style="margin-top:24px"><button onclick="window.close()" style="padding:10px 24px;background:#185FA5;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-family:'Be Vietnam Pro',sans-serif">Đóng</button></div>
    </div>`;if(c.checkedIn)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">⚠️</div>
      <div style="font-size:18px;font-weight:700;color:#BA7517;margin-bottom:8px">Vé đã được sử dụng</div>
      <div style="font-size:15px;font-weight:600">${c.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:6px">Check-in lúc: ${lt(c.checkinTime)}</div>
      <div style="font-size:12px;color:#aaa">Xác nhận bởi: ${c.checkinBy||"—"}</div>
    </div>`;if(c.cancelled)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">🚫</div>
      <div style="font-size:18px;font-weight:700;color:#B91C1C;margin-bottom:8px">Vé đã bị huỷ</div>
      <div style="font-size:15px;font-weight:600">${c.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:6px">${c.cancelNote||""}</div>
    </div>`;const s=!!c.phone;return`<div style="max-width:420px;margin:0 auto;padding:20px 16px;font-family:'Be Vietnam Pro',sans-serif">
    <div style="text-align:center;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #eaecf0">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#bbb;margin-bottom:8px">VÉ THAM DỰ SỰ KIỆN</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(n==null?void 0:n.name)||"—"}</div>
      <div style="font-size:13px;color:#aaa">${B(n==null?void 0:n.date)}${n!=null&&n.venue?" · "+n.venue:""}</div>
    </div>
    <div style="background:#f4f7fb;border-radius:12px;padding:16px;margin-bottom:20px;text-align:center">
      <div style="font-size:20px;font-weight:800;color:#1a1a2e">${c.name}</div>
      ${e.type==="comp"?`<div style="font-size:12px;color:#6D28D9;margin-top:4px;font-weight:500">Đi kèm: ${o.name}</div>`:""}
      <div style="font-family:'JetBrains Mono',monospace;font-size:14px;color:#aaa;margin-top:6px;letter-spacing:1px">${t}</div>
      ${o.note?`<div style="margin-top:6px;display:inline-block;background:#FFFBEB;color:#92400E;font-size:11px;padding:2px 10px;border-radius:20px;font-weight:600">${o.note}</div>`:""}
    </div>
    ${s?`
    <div style="margin-bottom:16px">
      <div style="font-size:13px;color:#555;text-align:center;margin-bottom:10px">🔢 Nhập 4 số cuối số điện thoại</div>
      <input id="uci_phone" type="tel" maxlength="4" placeholder="— — — —"
        style="width:100%;padding:14px;text-align:center;letter-spacing:10px;font-size:26px;font-family:'JetBrains Mono',monospace;border:2px solid #dde4f0;border-radius:12px;font-family:'JetBrains Mono',monospace"
        onkeydown="if(event.key==='Enter')doUrlCI()"/>
    </div>`:'<div style="font-size:13px;color:#aaa;text-align:center;margin-bottom:16px">Khách không có SĐT — xác nhận trực tiếp.</div>'}
    <div style="margin-bottom:12px">
      <div style="font-size:13px;color:#555;text-align:center;margin-bottom:10px">🔑 Nhập mã nhân viên BTC để xác nhận</div>
      <input id="uci_btc" type="text" placeholder="Mã BTC (VD: NV001)"
        style="width:100%;padding:11px 14px;text-align:center;font-family:'JetBrains Mono',monospace;letter-spacing:2px;font-size:16px;text-transform:uppercase;border:2px solid #dde4f0;border-radius:10px"
        oninput="this.value=this.value.toUpperCase()" onkeydown="if(event.key==='Enter')doUrlCI()"/>
    </div>
    <div id="uci_err" style="color:#a32d2d;font-size:12px;text-align:center;margin-bottom:10px"></div>
    <button onclick="doUrlCI()" ${i.urlCIBusy?"disabled":""} style="width:100%;padding:14px;background:${i.urlCIBusy?"#aaa":"#3B6D11"};color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:${i.urlCIBusy?"default":"pointer"};font-family:'Be Vietnam Pro',sans-serif">${i.urlCIBusy?"⏳ Đang xác nhận...":"✅ Xác nhận Check-in"}</button>
  </div>`}function Ee(){setTimeout(()=>{const t=document.getElementById("uci_phone")||document.getElementById("uci_btc");t&&t.focus()},80)}async function Ie(){var g,v;const t=i.urlCode;let e=null;for(const u of d.guests){if(u.guestCode===t){e={type:"guest",guest:u,person:u};break}for(const b of u.companions||[])if(b.code===t){e={type:"comp",guest:u,person:b};break}if(e)break}if(!e)return;const n=e.person,c=e.guest,o=d.events.find(u=>u.id===c.eventId);if(J(o)){const u=document.getElementById("uci_err");u&&(u.textContent="⚠️ Sự kiện đã kết thúc. Không thể check-in.");return}const s=(((g=document.getElementById("uci_btc"))==null?void 0:g.value)||"").toUpperCase().trim();if(!((o==null?void 0:o.btcMembers)||[]).find(u=>u.code===s)){const u=document.getElementById("uci_err");u&&(u.textContent="⚠️ Mã BTC không đúng hoặc không thuộc sự kiện này.");return}const l=n.phone?n.phone.replace(/\D/g,"").slice(-4):"";if(l&&(((v=document.getElementById("uci_phone"))==null?void 0:v.value)||"").trim()!==l){const b=document.getElementById("uci_err");b&&(b.textContent="⚠️ 4 số cuối SĐT không khớp.");const y=document.getElementById("uci_phone");y&&(y.value="",y.focus());return}if(i.urlCIBusy)return;i.urlCIBusy=!0,m();const r=new Date().toISOString();e.type==="guest"?(c.checkedIn=!0,c.checkinTime=r,c.checkinBy=s):(n.checkedIn=!0,n.checkinTime=r,n.checkinBy=s),w();const h=e.type==="guest"?{checked_in:!0,checkin_time:r,checkin_by:s}:{companions:c.companions||[]},f=await N(c.id,h);i.urlCIBusy=!1,i.urlCISyncWarn=!f,i.urlCIStep="done",m()}function Te(){if(!i.ciOk)return ze();if(!i.ciState)return Dt();const t=i.ciState;return t.step==="verify"?Me():t.step==="done"?Se():t.step==="err"?Ae():Dt()}function Be(){setTimeout(()=>{const t=document.getElementById("ci_in")||document.getElementById("ci_ph")||document.getElementById("lock_c");t&&t.focus()},80)}function ze(){return`<div class="lock">
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:40px">🔐</div>
      <div style="font-size:17px;font-weight:800;margin-top:8px">Đăng nhập Check-in</div>
      <div style="font-size:13px;color:#aaa;margin-top:4px">Chọn sự kiện và nhập mã nhân viên BTC</div>
    </div>
    <div class="fg"><label>Sự kiện</label><select id="lock_ev" style="width:100%" onchange="S.ciEv=this.value">
      <option value="">-- Chọn sự kiện --</option>
      ${d.events.map(t=>`<option value="${t.id}" ${i.ciEv===t.id?"selected":""}>${t.name} (${B(t.date)})</option>`).join("")}
    </select></div>
    <div class="fg"><label>Mã nhân viên BTC</label>
      <input id="lock_c" placeholder="VD: NV001" style="text-transform:uppercase;font-family:'JetBrains Mono',monospace;letter-spacing:2px;font-size:16px;text-align:center;padding:12px"
        onkeydown="if(event.key==='Enter')tryUnlock()"/></div>
    <button class="btn blue full" onclick="tryUnlock()">Vào hệ thống →</button>
    <div id="lock_err" class="err" style="text-align:center;margin-top:8px"></div>
    <div style="text-align:center;margin-top:166px"><button class="btn ghost" onclick="backAdmin()">← Về trang quản trị</button></div>
  </div>`}function Dt(){var o;const t=d.events.find(s=>s.id===i.ciEv),e=yt(i.ciEv),n=it(i.ciEv),c=[];return n.forEach(s=>{s.checkedIn&&c.push({name:s.name,code:s.guestCode,time:s.checkinTime,tag:"KH"}),(s.companions||[]).forEach(a=>{a.checkedIn&&c.push({name:a.name,code:a.code,time:a.checkinTime,tag:"ĐK"})})}),c.sort((s,a)=>new Date(a.time)-new Date(s.time)),`<div class="ci-screen">
    <div class="ci-head">
      <button class="btn ghost sm" onclick="backAdmin()">←</button>
      <div style="flex:1"><div style="font-weight:700;font-size:14px">${(t==null?void 0:t.name)||"Sự kiện"}</div>
        <div style="font-size:12px;color:#aaa">${e.c}/${e.t} đã check-in · BTC: ${((o=i.ciOp)==null?void 0:o.name)||"—"}</div></div>
      <button class="btn sm red" onclick="lockOut()">🔒 Khoá</button>
    </div>
    <div style="text-align:center;padding:24px 16px">
      <div style="font-size:48px;margin-bottom:12px">📷</div>
      <div style="font-size:15px;font-weight:700;margin-bottom:4px">Sẵn sàng nhận khách</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:20px">Nhập mã từ vé (KH chính hoặc người đi kèm)</div>
      <div style="display:flex;gap:8px;max-width:320px;margin:0 auto">
        <input id="ci_in" placeholder="Nhập mã KH..." style="flex:1;padding:12px;border:2px solid #dde4f0;border-radius:10px;font-size:14px;font-family:'JetBrains Mono',monospace;letter-spacing:2px;text-transform:uppercase" oninput="this.value=this.value.toUpperCase()" onkeydown="if(event.key==='Enter')startCI()"/>
        <button class="btn blue" onclick="startCI()" style="padding:12px 16px">→</button>
      </div>
      <div id="ci_err" class="err" style="text-align:center;margin-top:8px"></div>
    </div>
    ${c.length?`<div style="max-width:360px;margin:0 auto">
      <div style="font-size:12px;font-weight:600;color:#aaa;margin-bottom:8px">Vừa check-in</div>
      ${c.slice(0,8).map(s=>`<div class="recent-item">
        <div><div style="font-weight:600;font-size:13px">${s.name} <span class="badge ${s.tag==="KH"?"b-blue":"b-purple"}" style="font-size:9px">${s.tag}</span></div>
          <div style="font-size:11px;color:#aaa">${s.code}</div></div>
        <div style="font-size:11px;color:#3B6D11;font-weight:600">${vt(s.time)}</div>
      </div>`).join("")}
    </div>`:""}
  </div>`}function Me(){const t=i.ciState,e=t.person,n=t.guest;return`<div class="ci-screen">
    <div class="ci-head"><button class="btn ghost sm" onclick="cancelCI()">←</button>
      <div style="font-size:14px;font-weight:600">Xác minh danh tính</div></div>
    <div style="text-align:center;padding:20px 16px">
      <div style="background:#f4f7fb;border-radius:12px;padding:16px;display:inline-block;min-width:250px;margin-bottom:20px;text-align:left">
        <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#aaa;margin-bottom:6px">XÁC NHẬN CHECK-IN</div>
        <div style="font-size:18px;font-weight:800">${e.name}</div>
        <div style="font-size:13px;color:#185FA5;margin-top:4px">Mã: <span style="font-family:'JetBrains Mono',monospace">${t.code}</span></div>
        ${t.type==="comp"?`<div style="margin-top:6px"><span class="badge b-purple">Đi kèm: ${n.name}</span></div>`:""}
        ${n.note?`<div style="margin-top:6px"><span class="badge b-amber">${n.note}</span></div>`:""}
      </div>
      <div style="font-size:13px;color:#888;margin-bottom:14px">🔢 Nhập 4 số cuối số điện thoại để xác nhận</div>
      <input id="ci_ph" type="tel" maxlength="4" placeholder="— — — —"
        style="width:180px;padding:16px;text-align:center;letter-spacing:10px;font-size:26px;font-family:'JetBrains Mono',monospace;border:2px solid #dde4f0;border-radius:12px;display:block;margin:0 auto"
        onkeydown="if(event.key==='Enter')confirmPhone()"/>
      <div id="ph_err" class="err" style="text-align:center;margin-top:8px"></div>
      <div style="margin-top:16px;display:flex;gap:8px;justify-content:center">
        <button class="btn" onclick="cancelCI()">← Quay lại</button>
        <button class="btn green" onclick="confirmPhone()" style="padding:10px 28px">✅ Xác nhận</button>
      </div>
    </div>
  </div>`}function Se(){const t=i.ciState,e=t.person,n=t.guest,c=d.events.find(o=>o.id===n.eventId);return`<div class="ci-screen"><div class="big-result">
    <div class="icon">🎉</div>
    <div style="font-size:22px;font-weight:800;color:#0C447C;margin-bottom:10px">Check-in thành công!</div>
    <div style="font-size:17px;font-weight:600;color:#185FA5;margin-bottom:4px">${e.name}</div>
    ${t.type==="comp"?`<div style="margin-bottom:4px"><span class="badge b-purple">Đi kèm: ${n.name}</span></div>`:""}
    <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(c==null?void 0:c.name)||""}</div>
    ${t.type==="guest"&&(n.companions||[]).length?`<div style="font-size:12px;color:#BA7517;margin-top:10px;padding:8px 16px;background:#FFFBEB;border-radius:8px;display:inline-block">⚠️ ${n.companions.length} người đi kèm cần check-in riêng</div>`:""}
    ${n.note?`<div style="margin-top:10px;display:inline-block"><span class="badge b-amber">${n.note}</span></div>`:""}
    <div style="font-size:12px;color:#bbb;margin-top:12px">Ghi nhận lúc: ${lt(e.checkinTime)} · BTC: ${e.checkinBy||"—"}</div>
    ${i.ciSyncWarn?`<div style="margin-top:14px;background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:10px;text-align:left;max-width:360px;margin-left:auto;margin-right:auto">
      ⚠️ Đã ghi nhận check-in trên thiết bị này, nhưng <b>chưa đồng bộ được lên hệ thống trung tâm</b> (có thể do mất mạng).
      Vui lòng kiểm tra lại kết nối và báo kỹ thuật nếu tình trạng tiếp diễn.
    </div>`:""}
    <div style="margin-top:24px">
      <button class="btn blue" onclick="nextCI()" style="padding:12px 32px;font-size:15px">📷 Scan vé tiếp theo</button>
    </div>
  </div></div>`}function Ae(){return`<div class="ci-screen"><div class="big-result">
    <div class="icon">❌</div>
    <div style="font-size:18px;font-weight:700;color:#a32d2d;margin-bottom:8px">Xác minh thất bại</div>
    <div style="font-size:13px;color:#888;max-width:280px;margin:0 auto">${i.ciState.msg||"Thông tin không khớp"}</div>
    <div style="margin-top:20px"><button class="btn" onclick="cancelCI()" style="padding:10px 24px">← Thử lại</button></div>
  </div></div>`}function He(t){i.tab=t,m()}function Ne(t){const e=d.events.find(n=>n.id===t);if(e){if(e.eventPw&&!i.unlockedEvs[t]){i.evUnlockTarget=t,i.modal="ev_unlock",m();return}i.selEv=t,i.tab="guests",i.search="",i.filter="all",m()}}function De(t){if(!t){i.selEv=null,i.search="",i.filter="all",m();return}const e=d.events.find(n=>n.id===t);if(e){if(e.eventPw&&!i.unlockedEvs[t]){i.evUnlockTarget=t,i.modal="ev_unlock",m();return}i.selEv=t,i.search="",i.filter="all",m()}}function Re(t){i.search=t,m()}function Ve(t){i.filter=t,m()}function Le(t){i.modal=t,m()}function Pe(t){i.editGid=t,i.modal="edit_pw",m()}function Fe(t){i.delGid=t,i.modal="del_pw",m()}function Oe(t){i.ticketGid=t,i.modal="tickets",m()}function at(){i.modal=null,i.editGid=null,i.delGid=null,i.cpTicket=null,i.cpEdit=null,i.cpDel=null,i.cpAdd=null,i.adminCI=null,i.cancelTarget=null,i.evUnlockTarget=null,i.editEvId=null,i.importData=null,m()}function Ge(){const t=ot(i.selEv);if(!Mt(t)){alert("Walk-in chỉ khả dụng từ ngày tổ chức sự kiện ("+B(t==null?void 0:t.date)+") trở đi.");return}i.modal="walkin",m()}function Ke(t){const e=d.events.find(n=>n.id===t);if(e){if(e.eventPw&&!i.unlockedEvs[t]){i.evUnlockTarget=t,i.modal="ev_unlock",m();return}i.editEvId=t,i.modal="edit_ev",m()}}function Ue(t,e){i.cpTicket={gid:t,cpId:e},i.modal="cp_ticket",m(),setTimeout(()=>rt(),120)}function je(t,e){i.cpEdit={gid:t,cpId:e},i.modal="cp_edit",m()}function We(t,e){i.cpDel={gid:t,cpId:e},i.modal="cp_del",m()}function qe(t){i.cpAdd=t,i.modal="cp_add",m()}function Xe(t,e,n){i.cancelTarget={gid:t,type:e,cpId:n||null},i.modal="cancel",m()}async function Je(){var l;const{gid:t,type:e,cpId:n}=i.cancelTarget||{},c=d.guests.find(r=>r.id===t);if(!c)return;if(J(ot(c.eventId))){alert("Sự kiện đã kết thúc. Không thể thay đổi."),at();return}const o=(((l=document.getElementById("cancel_note"))==null?void 0:l.value)||"").trim();let s;if(e==="c"){const r=(c.companions||[]).find(h=>h.id===n);r&&(r.cancelled=!0,r.cancelNote=o,r.checkedIn=!1,r.checkinTime=null),s={companions:c.companions}}else c.cancelled=!0,c.cancelNote=o,c.checkedIn=!1,c.checkinTime=null,(c.companions||[]).forEach(r=>{r.cancelled=!0,r.cancelNote=o?`[Theo KH chính] ${o}`:"Theo KH chính",r.checkedIn=!1,r.checkinTime=null}),s={cancelled:!0,cancel_note:o,checked_in:!1,checkin_time:null,companions:c.companions};w(),i.modal=null,i.cancelTarget=null,m(),await N(c.id,s)||alert('⚠️ Đã ghi nhận Cancel trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function Qe(t,e,n){const c=d.guests.find(a=>a.id===t);if(!c)return;let o;if(e==="c"){const a=(c.companions||[]).find(l=>l.id===n);a&&(a.cancelled=!1,a.cancelNote=""),o={companions:c.companions}}else c.cancelled=!1,c.cancelNote="",(c.companions||[]).forEach(a=>{a.cancelled=!1,a.cancelNote=""}),o={cancelled:!1,cancel_note:"",companions:c.companions};w(),m(),await N(c.id,o)||alert('⚠️ Đã khôi phục (Huỷ Cancel) trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function Ze(){i.view="checkin",i.ciOk=!1,i.ciEv=null,i.ciOp=null,i.ciState=null,m()}function Ye(){i.view="admin",i.ciOk=!1,i.ciState=null,m()}function tn(){i.ciOk=!1,i.ciOp=null,i.ciState=null,m()}function en(){i.ciState=null,i.ciSyncWarn=!1,m()}function nn(){i.ciState=null,i.ciSyncWarn=!1,m()}function on(){const t=document.getElementById("btc_w");if(!t)return;const e=t.querySelectorAll(".btc-r").length,n=document.createElement("div");n.className="btc-r",n.id="br_"+e,n.innerHTML=`<input placeholder="Mã NV" id="bc_${e}" style="max-width:110px;font-family:'JetBrains Mono',monospace;text-transform:uppercase"/>
    <input placeholder="Họ tên BTC" id="bn_${e}"/>
    <button class="btn xs red" onclick="rmBR(${e})" style="flex-shrink:0">✕</button>`,t.appendChild(n)}function cn(t){const e=document.getElementById("br_"+t);e&&e.remove()}function sn(){const t=document.getElementById("btc_w");if(!t)return[];const e=[];return t.querySelectorAll(".btc-r").forEach(n=>{var s,a;const c=(((s=n.querySelector("input:first-child"))==null?void 0:s.value)||"").toUpperCase().trim(),o=(((a=n.querySelector("input:nth-child(2)"))==null?void 0:a.value)||"").trim();c&&o&&e.push({code:c,name:o})}),e}function ln(){const t=document.getElementById("cp_w");if(!t)return;const e=t.querySelectorAll(".cp-r").length,n=document.createElement("div");n.id="cr_"+e,n.className="cp-r",n.innerHTML=`<div class="g2" style="margin-bottom:0">
    <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${e+1}</label><input id="cn_${e}" placeholder="Họ và tên"/></div>
    <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="cp_${e}" type="tel" placeholder="09xxxxxxxx"/></div>
  </div><button class="btn xs red" onclick="rmCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`,document.getElementById("cp_w").appendChild(n)}function an(t){const e=document.getElementById("cr_"+t);e&&e.remove()}function dn(t){const e=document.getElementById("cp_w");if(!e)return[];const n=[];return e.querySelectorAll(".cp-r").forEach(c=>{var r,h;const o=c.id.replace(/[^0-9]/g,""),s="c",a=(((r=document.getElementById(s+"n_"+o))==null?void 0:r.value)||"").trim(),l=(((h=document.getElementById(s+"p_"+o))==null?void 0:h.value)||"").trim();a&&n.push({name:a,phone:l})}),n}async function rn(){var h,f,g,v,u,b,y,C,_;const t=i.modal==="edit_ev",e=(f=(h=document.getElementById("ev_n"))==null?void 0:h.value)==null?void 0:f.trim(),n=(g=document.getElementById("ev_d"))==null?void 0:g.value,c=(u=(v=document.getElementById("ev_t"))==null?void 0:v.value)==null?void 0:u.trim(),o=(y=(b=document.getElementById("ev_v"))==null?void 0:b.value)==null?void 0:y.trim(),s=(((C=document.getElementById("ev_pw"))==null?void 0:C.value)||"").trim(),a=(((_=document.getElementById("ev_pw2"))==null?void 0:_.value)||"").trim(),l=sn();if(!e){alert("Vui lòng nhập tên sự kiện");return}if(!l.length){alert("Cần ít nhất 1 thành viên BTC");return}const r=document.getElementById("ev_pw_err");if(t){if(s&&s!==a){r&&(r.textContent="⚠️ Mật khẩu nhập lại không khớp");return}const k=d.events.findIndex(H=>H.id===i.editEvId);if(k<0)return;const E=d.events[k],I=s||E.eventPw;d.events[k]={...E,name:e,date:n,team:c,venue:o,eventPw:I,btcMembers:l},s&&(i.unlockedEvs[i.editEvId]=!0);const z=i.editEvId;w(),i.modal=null,i.editEvId=null,m(),await Ut(z,{name:e,date_str:n||null,team:c||null,venue:o||null,event_pw:I,btc_members:l})||alert('⚠️ Đã lưu sự kiện trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}else{if(!s){r&&(r.textContent="⚠️ Vui lòng đặt mật khẩu cho sự kiện");return}if(s!==a){r&&(r.textContent="⚠️ Mật khẩu nhập lại không khớp");return}const k={id:K(),name:e,date:n,team:c,venue:o,eventPw:s,btcMembers:l,createdAt:Date.now()};d.events.push(k),i.unlockedEvs[k.id]=!0,i.selEv=k.id,w(),i.modal=null,i.tab="guests",m(),await Bt("oh_events",Ot(k))||alert('⚠️ Đã tạo sự kiện trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi gửi link cho người khác.')}}function pn(t){confirm("Xoá sự kiện này? Toàn bộ khách cũng bị xoá.")&&(d.events=d.events.filter(e=>e.id!==t),d.guests=d.guests.filter(e=>e.eventId!==t),i.selEv===t&&(i.selEv=null),w(),Vt("oh_events",t),m())}async function mn(){var y,C,_,k,E,I,z,M,H,Q,A,U,R,V,Z,L,P;const t=(y=document.getElementById("g_ev"))==null?void 0:y.value,e=(_=(C=document.getElementById("g_n"))==null?void 0:C.value)==null?void 0:_.trim(),n=(E=(k=document.getElementById("g_ph"))==null?void 0:k.value)==null?void 0:E.trim(),c=(z=(I=document.getElementById("g_syscode"))==null?void 0:I.value)==null?void 0:z.trim(),o=(H=(M=document.getElementById("g_prm"))==null?void 0:M.value)==null?void 0:H.trim(),s=(A=(Q=document.getElementById("g_reg"))==null?void 0:Q.value)==null?void 0:A.trim(),a=(R=(U=document.getElementById("g_unit"))==null?void 0:U.value)==null?void 0:R.trim(),l=(Z=(V=document.getElementById("g_sih"))==null?void 0:V.value)==null?void 0:Z.trim(),r=(P=(L=document.getElementById("g_note"))==null?void 0:L.value)==null?void 0:P.trim();if(!e){alert("Vui lòng nhập họ tên KH");return}if(!t){alert("Vui lòng chọn sự kiện");return}if(J(ot(t))&&i.modal!=="edit_g"){alert("Sự kiện đã kết thúc. Không thể thêm khách mới."),at();return}const h=dn();let f=!1,g=null,v=null;if(i.modal==="edit_g"&&i.editGid){const F=d.guests.findIndex(D=>D.id===i.editGid);if(F>-1){const D=d.guests[F],j=D.companions||[],O=h.map(ct=>{const pt=j.find(mt=>mt.name===ct.name&&mt.code);return pt?{...pt,phone:ct.phone}:{id:K(),name:ct.name,phone:ct.phone,code:q(t),checkedIn:!1,checkinTime:null,checkinBy:null}});d.guests[F]={...D,eventId:t,name:e,phone:n,systemCode:c,prmName:o,tcbRegion:s,unit:a,sihName:l,note:r,companions:O},i.ticketGid=i.editGid,f=!0,g={name:e,phone:n,system_code:c,prm_name:o,tcb_region:s,unit:a,sih_name:l,note:r,companions:O}}}else{const F=q(t),D=h.map(O=>({id:K(),name:O.name,phone:O.phone,code:q(t),checkedIn:!1,checkinTime:null,checkinBy:null})),j={id:K(),eventId:t,guestCode:F,systemCode:c,name:e,phone:n,prmName:o,tcbRegion:s,unit:a,sihName:l,note:r,companions:D,checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()};d.guests.push(j),i.ticketGid=j.id,v=j}i.selEv=t,w(),i.editGid=null,i.modal="tickets",m();const u=i.ticketGid;(f?await N(u,g):await Bt("oh_guests",Tt(v)))||alert('⚠️ Đã lưu khách trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi phát vé.')}function un(){var e;if((((e=document.getElementById("epw"))==null?void 0:e.value)||"")===bt)i.modal="edit_form",m();else{const n=document.getElementById("epw_err");n&&(n.textContent="⚠️ Mật khẩu không đúng.")}}async function hn(){var v,u,b,y,C,_,k,E,I,z,M,H,Q,A,U,R;const t=d.guests.find(V=>V.id===i.editGid);if(!t)return;const e=d.guests.indexOf(t),n=((u=(v=document.getElementById("eg_n"))==null?void 0:v.value)==null?void 0:u.trim())||t.name,c=((y=(b=document.getElementById("eg_ph"))==null?void 0:b.value)==null?void 0:y.trim())||t.phone,o=(_=(C=document.getElementById("eg_syscode"))==null?void 0:C.value)==null?void 0:_.trim(),s=(E=(k=document.getElementById("eg_prm"))==null?void 0:k.value)==null?void 0:E.trim(),a=(z=(I=document.getElementById("eg_reg"))==null?void 0:I.value)==null?void 0:z.trim(),l=(H=(M=document.getElementById("eg_unit"))==null?void 0:M.value)==null?void 0:H.trim(),r=(A=(Q=document.getElementById("eg_sih"))==null?void 0:Q.value)==null?void 0:A.trim(),h=(R=(U=document.getElementById("eg_note"))==null?void 0:U.value)==null?void 0:R.trim(),f=(t.companions||[]).map((V,Z)=>{var L,P,F,D;return{...V,name:((P=(L=document.getElementById("ecn_"+Z))==null?void 0:L.value)==null?void 0:P.trim())||V.name,phone:((D=(F=document.getElementById("ecp_"+Z))==null?void 0:F.value)==null?void 0:D.trim())||V.phone}});d.guests[e]={...t,name:n,phone:c,systemCode:o,prmName:s,tcbRegion:a,unit:l,sihName:r,note:h,companions:f},w(),i.modal=null,i.editGid=null,m(),await N(t.id,{name:n,phone:c,system_code:o,prm_name:s,tcb_region:a,unit:l,sih_name:r,note:h,companions:f})||alert('⚠️ Đã lưu thay đổi trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function gn(){var n;if((((n=document.getElementById("dpw"))==null?void 0:n.value)||"")!==bt){const c=document.getElementById("dpw_err");c&&(c.textContent="⚠️ Mật khẩu không đúng.");return}const e=i.delGid;d.guests=d.guests.filter(c=>c.id!==e),w(),Vt("oh_guests",e),i.modal=null,i.delGid=null,m()}async function fn(){var r,h,f,g;const{gid:t,cpId:e}=i.cpEdit||{},n=d.guests.find(v=>v.id===t);if(!n)return;const c=d.guests.indexOf(n),o=(n.companions||[]).findIndex(v=>v.id===e);if(o<0)return;const s=(h=(r=document.getElementById("cpe_n"))==null?void 0:r.value)==null?void 0:h.trim(),a=(g=(f=document.getElementById("cpe_ph"))==null?void 0:f.value)==null?void 0:g.trim();if(!s){alert("Vui lòng nhập họ tên");return}d.guests[c].companions[o]={...d.guests[c].companions[o],name:s,phone:a},w(),i.modal=null,i.cpEdit=null,m(),await N(n.id,{companions:d.guests[c].companions})||alert('⚠️ Đã sửa người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function vn(){var s;if((((s=document.getElementById("cpdpw"))==null?void 0:s.value)||"")!==bt){const a=document.getElementById("cpdpw_err");a&&(a.textContent="⚠️ Mật khẩu không đúng.");return}const{gid:e,cpId:n}=i.cpDel||{},c=d.guests.findIndex(a=>a.id===e);if(c<0)return;d.guests[c].companions=(d.guests[c].companions||[]).filter(a=>a.id!==n),w(),i.modal=null,i.cpDel=null,m(),await N(d.guests[c].id,{companions:d.guests[c].companions})||alert('⚠️ Đã xoá người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function bn(){var a,l,r,h;const t=i.cpAdd,e=d.guests.findIndex(f=>f.id===t);if(e<0)return;const n=(l=(a=document.getElementById("cpa_n"))==null?void 0:a.value)==null?void 0:l.trim(),c=(h=(r=document.getElementById("cpa_ph"))==null?void 0:r.value)==null?void 0:h.trim();if(!n){alert("Vui lòng nhập họ tên");return}const o={id:K(),name:n,phone:c,code:q(d.guests[e].eventId),checkedIn:!1,checkinTime:null,checkinBy:null};d.guests[e].companions||(d.guests[e].companions=[]),d.guests[e].companions.push(o),w(),i.cpTicket={gid:t,cpId:o.id},i.cpAdd=null,i.modal="cp_ticket",m(),setTimeout(()=>rt(),120),await N(d.guests[e].id,{companions:d.guests[e].companions})||alert('⚠️ Đã thêm người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function rt(){const{gid:t,cpId:e}=i.cpTicket||{},n=d.guests.find(s=>s.id===t),c=((n==null?void 0:n.companions)||[]).find(s=>s.id===e);if(!c)return;const o=document.getElementById("cp_tqr");if(o){o.innerHTML="";try{new QRCode(o,{text:ft(c.code),width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}catch{o.innerHTML='<div style="font-size:11px;color:#aaa">QR error</div>'}}}function xn(){const{gid:t,cpId:e}=i.cpTicket||{},n=d.guests.find(a=>a.id===t),c=((n==null?void 0:n.companions)||[]).find(a=>a.id===e);if(!n||!c)return;const o=d.events.find(a=>a.id===n.eventId);window.open("","_blank","width=440,height=560").document.write(`<!DOCTYPE html><html><head>
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:sans-serif;background:#f5f7fb;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px}
    .tk{background:#fff;border:2px solid #e8eaf0;border-radius:16px;padding:28px 24px 20px;width:320px;text-align:center}
    .hd{font-size:10px;font-weight:700;letter-spacing:2px;color:#bbb;margin-bottom:10px}
    .ev{font-size:11px;color:#bbb;margin-bottom:3px}.name{font-size:20px;font-weight:800;margin-bottom:4px}
    .role{font-size:11px;font-weight:600;background:#F5F3FF;color:#6D28D9;padding:3px 10px;border-radius:10px;display:inline-block;margin-bottom:14px}
    .code{font-family:monospace;font-size:18px;font-weight:700;letter-spacing:3px;margin:4px 0 12px}
    .foot{font-size:10px;color:#ccc;border-top:1px dashed #eee;padding-top:8px;line-height:1.7}
    canvas,img{display:block;margin:0 auto;padding:10px;border:1px solid #eee;border-radius:8px}
    .btn{margin-top:16px;padding:9px 24px;border:1.5px solid #dde4f0;border-radius:8px;background:#fff;font-size:13px;cursor:pointer}
    @media print{.btn{display:none}body{background:#fff}}</style></head><body>
    <div class="tk"><div class="hd">VÉ THAM DỰ SỰ KIỆN</div>
      <div class="ev">${(o==null?void 0:o.name)||""}</div>
      <div class="ev" style="margin-bottom:12px">${B(o==null?void 0:o.date)}${o!=null&&o.venue?" · "+o.venue:""}</div>
      <div class="name">${c.name}</div>
      <div class="role">Đi kèm: ${n.name}</div>
      <div id="qr"></div>
      <div class="code">${c.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <button class="btn" onclick="window.print()">🖨️ Lưu / In vé này</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>setTimeout(()=>new QRCode(document.getElementById('qr'),{text:'${xt}/?code='+encodeURIComponent('${c.code}'),width:160,height:160,correctLevel:QRCode.CorrectLevel.M}),100)<\/script>
  </body></html>`)}async function yn(t,e,n){const c=d.guests.find(a=>a.id===t);if(!c)return;const o=ot(c.eventId);if(J(o)){alert("Sự kiện đã kết thúc. Không thể thay đổi trạng thái check-in.");return}const s=e==="c"?(c.companions||[]).find(a=>a.id===n):c;if(s){if(s.cancelled){alert('Khách đã cancel. Vui lòng nhấn " Huỷ Cancel" trước khi check-in.');return}if(s.checkedIn){if(!confirm(`Huỷ check-in của ${s.name}?`))return;const a=s.name;s.checkedIn=!1,s.checkinTime=null,s.checkinBy=null,w(),m();const l=e==="g"?{checked_in:!1,checkin_time:null,checkin_by:null}:{companions:c.companions||[]};await N(c.id,l)||alert(`⚠️ Đã huỷ check-in của "${a}" trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.`);return}i.adminCI={gid:t,type:e,cpId:n||null},i.modal="admin_ci",m(),setTimeout(()=>{const a=document.getElementById("aci_ph");a&&a.focus()},80)}}async function kn(){var f;const{gid:t,type:e,cpId:n}=i.adminCI||{},c=d.guests.find(g=>g.id===t);if(!c)return;if(J(ot(c.eventId))){alert("Sự kiện đã kết thúc. Không thể check-in."),at();return}const o=e==="c"?(c.companions||[]).find(g=>g.id===n):c;if(!o)return;const s=o.phone?o.phone.replace(/\D/g,"").slice(-4):"";if(s&&(((f=document.getElementById("aci_ph"))==null?void 0:f.value)||"").trim()!==s){const v=document.getElementById("aci_err");v&&(v.textContent="⚠️ 4 số cuối không khớp. Vui lòng thử lại.");const u=document.getElementById("aci_ph");u&&(u.value="",u.focus());return}const a=new Date().toISOString(),l=o.name;o.checkedIn=!0,o.checkinTime=a,o.checkinBy="admin",w(),i.modal=null,i.adminCI=null,m();const r=e==="g"?{checked_in:!0,checkin_time:a,checkin_by:"admin"}:{companions:c.companions||[]};await N(c.id,r)||alert(`⚠️ Đã ghi nhận check-in cho "${l}" trên thiết bị này, nhưng CHƯA đồng bộ được lên hệ thống trung tâm (có thể do mất mạng hoặc lỗi Supabase).

Vui lòng bấm "Làm mới" ngay để kiểm tra lại — nếu không, trạng thái check-in này có thể bị mất khi làm mới dữ liệu.`)}function Et(){const t=d.guests.find(n=>n.id===i.ticketGid);if(!t)return;[t.guestCode,...(t.companions||[]).map(n=>n.code)].forEach((n,c)=>{const o=document.getElementById("tqr_"+c);if(o){o.innerHTML="";try{new QRCode(o,{text:ft(n),width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}catch{o.innerHTML='<div style="font-size:11px;color:#aaa">QR error</div>'}}})}function wn(t,e,n,c){const o=d.guests.find(l=>l.id===i.ticketGid);if(!o)return;const s=d.events.find(l=>l.id===o.eventId);window.open("","_blank","width=440,height=580").document.write(`<!DOCTYPE html><html><head><style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Be Vietnam Pro',sans-serif;background:#f5f7fb;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px}
    @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&family=JetBrains+Mono:wght@600&display=swap');
    .ticket{background:#fff;border:2px solid #e8eaf0;border-radius:16px;padding:28px 24px 20px;width:320px;text-align:center}
    .hd{font-size:10px;font-weight:700;letter-spacing:2px;color:#bbb;margin-bottom:10px}
    .ev{font-size:11px;color:#bbb;margin-bottom:3px}
    .name{font-size:20px;font-weight:800;color:#1a1a2e;margin-bottom:4px}
    .role{font-size:11px;font-weight:600;margin-bottom:14px;display:inline-block;padding:3px 10px;border-radius:10px;background:#EFF6FF;color:#185FA5}
    .qr-box{display:inline-block;padding:10px;border:1px solid #eee;border-radius:10px;margin-bottom:8px}
    .code{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;letter-spacing:3px;margin:4px 0 12px}
    .foot{font-size:10px;color:#ccc;border-top:1px dashed #eee;padding-top:8px;line-height:1.7}
    .dl-btn{margin-top:16px;padding:9px 24px;border:1.5px solid #dde4f0;border-radius:8px;background:#fff;font-size:13px;cursor:pointer;font-family:sans-serif;font-weight:500}
    .dl-btn:hover{background:#f4f7fb}
    @media print{.dl-btn{display:none}body{background:#fff}}
  </style></head><body>
    <div class="ticket" id="tk">
      <div class="hd">VÉ THAM DỰ SỰ KIỆN</div>
      <div class="ev">${(s==null?void 0:s.name)||""}</div>
      <div class="ev" style="margin-bottom:12px">${B(s==null?void 0:s.date)}${s!=null&&s.venue?" · "+s.venue:""}</div>
      <div class="name">${e}</div>
      <div class="role">${c}</div>
      <div class="qr-box" id="qr_s"></div>
      <div class="code">${n}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <button class="dl-btn" onclick="window.print()">🖨️ Lưu / In vé này</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>setTimeout(()=>{new QRCode(document.getElementById('qr_s'),{text:'${xt}/?code='+encodeURIComponent('${n}'),width:160,height:160,correctLevel:QRCode.CorrectLevel.M})},100)<\/script>
  </body></html>`)}function $n(){const t=d.guests.find(o=>o.id===i.ticketGid);if(!t)return;const e=d.events.find(o=>o.id===t.eventId),n=[{name:t.name,code:t.guestCode,role:"Khách mời chính"},...(t.companions||[]).map(o=>({name:o.name,code:o.code,role:"Đi kèm: "+t.name}))];window.open("","_blank","width=560,height:700").document.write(`<!DOCTYPE html><html><head><style>
    @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&family=JetBrains+Mono:wght@600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}body{font-family:'Be Vietnam Pro',sans-serif;padding:20px;background:#f5f7fb}
    .ticket{background:#fff;border:2px solid #e8eaf0;border-radius:14px;padding:24px 20px 16px;text-align:center;margin-bottom:16px;page-break-inside:avoid}
    .hd{font-size:10px;font-weight:700;letter-spacing:2px;color:#bbb;margin-bottom:8px}
    .ev{font-size:11px;color:#bbb;margin-bottom:3px}
    .name{font-size:20px;font-weight:800;color:#1a1a2e;margin-bottom:4px}
    .role{font-size:11px;font-weight:600;margin-bottom:14px;display:inline-block;padding:3px 10px;border-radius:10px;background:#EFF6FF;color:#185FA5}
    .code{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;letter-spacing:3px;margin:4px 0 12px}
    .foot{font-size:10px;color:#ccc;border-top:1px dashed #eee;padding-top:8px;line-height:1.7}
    canvas,img{display:block;margin:8px auto;width:160px;height:160px}
    @media print{body{background:#fff}}
  </style></head><body>
    ${n.map(o=>`<div class="ticket">
      <div class="hd">VÉ THAM DỰ SỰ KIỆN</div>
      <div class="ev">${(e==null?void 0:e.name)||""}</div>
      <div class="ev" style="margin-bottom:12px">${B(e==null?void 0:e.date)}${e!=null&&e.venue?" · "+e.venue:""}</div>
      <div class="name">${o.name}</div>
      <div class="role">${o.role}</div>
      <div id="pqr_${o.code}" style="display:inline-block;padding:8px;border:1px solid #eee;border-radius:8px"></div>
      <div class="code">${o.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>`).join("")}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>
      const _base='${xt}';
      ${JSON.stringify(n.map(o=>o.code))}.forEach(code=>{
        const el=document.getElementById('pqr_'+code);
        if(el)new QRCode(el,{text:_base+'?code='+encodeURIComponent(code),width:160,height:160,correctLevel:QRCode.CorrectLevel.M});
      });
      setTimeout(()=>window.print(),700);
    <\/script>
  </body></html>`)}function Cn(){var o;const t=document.getElementById("lock_ev");if(i.ciEv=(t==null?void 0:t.value)||i.ciEv,!i.ciEv){document.getElementById("lock_err").textContent="⚠️ Vui lòng chọn sự kiện";return}const e=d.events.find(s=>s.id===i.ciEv);if(!e){document.getElementById("lock_err").textContent="Sự kiện không tồn tại";return}const n=(((o=document.getElementById("lock_c"))==null?void 0:o.value)||"").toUpperCase().trim();if(!n){document.getElementById("lock_err").textContent="⚠️ Vui lòng nhập mã nhân viên";return}const c=(e.btcMembers||[]).find(s=>s.code===n);if(!c){document.getElementById("lock_err").textContent="⚠️ Mã không nằm trong danh sách BTC của sự kiện này";return}i.ciOk=!0,i.ciOp=c,i.ciState=null,m()}async function _n(){var c,o;const t=(((c=document.getElementById("ci_in"))==null?void 0:c.value)||"").toUpperCase().trim();if(!t){document.getElementById("ci_err").textContent="⚠️ Vui lòng nhập mã";return}const e=Zt(i.ciEv,t);if(!e){document.getElementById("ci_err").textContent="⚠️ Không tìm thấy mã trong sự kiện này";return}const n=e.person;if(n.checkedIn){document.getElementById("ci_err").textContent="⚠️ Đã check-in lúc "+lt(n.checkinTime);return}if(!n.phone){const s=new Date().toISOString();n.checkedIn=!0,n.checkinTime=s,n.checkinBy=((o=i.ciOp)==null?void 0:o.code)||"btc",w();const a=e.type==="guest"?{checked_in:!0,checkin_time:s,checkin_by:n.checkinBy}:{companions:e.guest.companions||[]},l=await N(e.guest.id,a);i.ciSyncWarn=!l,i.ciState={step:"done",type:e.type,guest:e.guest,person:n,code:t},m();return}i.ciState={step:"verify",type:e.type,guest:e.guest,person:n,code:t},m()}function En(){var o;const t=(((o=document.getElementById("ci_ph"))==null?void 0:o.value)||"").trim(),n=i.ciState.person,c=n.phone?n.phone.replace(/\D/g,"").slice(-4):"";if(!c){Rt();return}if(t===c)Rt();else{const s=document.getElementById("ph_err");s&&(s.textContent="⚠️ 4 số cuối không khớp. Vui lòng thử lại.");const a=document.getElementById("ci_ph");a&&(a.value="",a.focus())}}async function Rt(){var a;const t=i.ciState,e=d.guests.find(l=>l.id===t.guest.id);if(!e){i.ciState={step:"err",msg:"Lỗi hệ thống"},m();return}const n=new Date().toISOString(),c=((a=i.ciOp)==null?void 0:a.code)||"btc";if(t.type==="guest")e.checkedIn=!0,e.checkinTime=n,e.checkinBy=c;else{const l=(e.companions||[]).find(r=>r.id===t.person.id);l&&(l.checkedIn=!0,l.checkinTime=n,l.checkinBy=c)}w();const o=t.type==="guest"?{checked_in:!0,checkin_time:n,checkin_by:c}:{companions:e.companions||[]},s=await N(e.id,o);i.ciSyncWarn=!s,i.ciState={step:"done",type:t.type,guest:e,person:t.type==="guest"?e:(e.companions||[]).find(l=>l.id===t.person.id),code:t.code},m()}function In(){const t=d.events.find(s=>s.id===i.selEv),e=[["STT","Loại","Mã","Mã Hệ thống","Họ tên","SĐT","KH gốc (nếu đi kèm)","PRM","Vùng TCB","Đơn vị","SIH","Note","Walk-in","Trạng thái","Giờ check-in","BTC","Lý do cancel"]];let n=0;it(i.selEv).forEach(s=>{n++;const a=s.cancelled?"Cancel":s.checkedIn?"Đã vào":"Chưa";e.push([n,"KH chính",s.guestCode,s.systemCode||"",s.name,s.phone||"","",s.prmName||"",s.tcbRegion||"",s.unit||"",s.sihName||"",s.note||"",s.walkin?"Walk-in":"",a,s.checkinTime?lt(s.checkinTime):"",s.checkinBy||"",s.cancelNote||""]),(s.companions||[]).forEach(l=>{n++;const r=l.cancelled?"Cancel":l.checkedIn?"Đã vào":"Chưa";e.push([n,"Đi kèm",l.code,"",l.name,l.phone||"",s.name,s.prmName||"",s.tcbRegion||"","","","",s.walkin?"(Walk-in Main)":"",r,l.checkinTime?lt(l.checkinTime):"",l.checkinBy||"",l.cancelNote||""])})});const c=e.map(s=>s.map(a=>`"${String(a).replace(/"/g,'""')}"`).join(",")).join(`
`),o=document.createElement("a");o.href=URL.createObjectURL(new Blob(["\uFEFF"+c],{type:"text/csv;charset=utf-8"})),o.download=`checkin_${((t==null?void 0:t.name)||"").replace(/[^a-zA-Z0-9]/g,"_")}_${new Date().toISOString().slice(0,10)}.csv`,o.click()}function Tn(){const t=ot(i.selEv);return`<div class="mh">🚶 Tạo khách Walk-in</div>
    <div style="background:#EDE9FE;border:1px solid #DDD6FE;border-radius:10px;padding:10px 14px;margin-bottom:14px;display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">🚶</span>
      <div>
        <div style="font-weight:700;font-size:13px;color:#5B21B6">Khách Walk-in — đăng ký tại chỗ ngày ${B(t==null?void 0:t.date)}</div>
        <div style="font-size:11px;color:#7C3AED">Hệ thống sẽ gắn nhãn Walk-in và tạo mã vào ngay. Không thể thêm Walk-in sau khi sự kiện kết thúc.</div>
      </div>
    </div>
    <div class="fg"><label>Sự kiện</label>
      <div style="padding:9px 12px;background:#f4f7fb;border-radius:8px;font-size:13px;color:#555">${(t==null?void 0:t.name)||"—"} · ${B(t==null?void 0:t.date)}</div>
    </div>
    <div class="sec">Thông tin khách Walk-in</div>
    <div class="g3">
      <div class="fg"><label>Họ và tên *</label><input id="wi_n" placeholder="Nguyễn Văn A" autofocus/></div>
      <div class="fg"><label>Số điện thoại</label><input id="wi_ph" type="tel" placeholder="09xxxxxxxx"/></div>
      <div class="fg"><label>Mã Hệ thống <span style="font-weight:400;color:#aaa">(nếu có)</span></label><input id="wi_syscode" placeholder="OH-xxxxx"/></div>
    </div>
    <div class="sec">Người đi kèm <span style="text-transform:none;letter-spacing:0;font-weight:400">(tuỳ chọn)</span></div>
    <div id="wi_cp_w"></div>
    <button class="btn sm" onclick="addWiCR()" style="margin-bottom:4px">+ Thêm đi kèm</button>
    <div class="sec">Thông tin chăm sóc</div>
    <div class="g3">
      <div class="fg"><label>Tên PRM</label><input id="wi_prm" placeholder="Tên PRM"/></div>
      <div class="fg"><label>Vùng TCB</label><input id="wi_reg" placeholder="Vùng 1 HCM"/></div>
      <div class="fg"><label>Đơn vị</label><input id="wi_unit" placeholder="CN Thủ Đức"/></div>
    </div>
    <div class="g2">
      <div class="fg"><label>Tên SIH</label><input id="wi_sih" placeholder="Tên SIH"/></div>
      <div class="fg"><label>Note / Lưu ý</label><input id="wi_note" placeholder="Ghi chú..."/></div>
    </div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn" style="background:#7C3AED;color:#fff;border-color:#7C3AED" onclick="saveWalkin()">🚶 Tạo Walk-in & Tạo vé</button>
    </div>`}function Bn(){const t=document.getElementById("wi_cp_w");if(!t)return;const e=t.querySelectorAll(".wi-cp-r").length,n=document.createElement("div");n.className="wi-cp-r cp-r",n.id="wicr_"+e,n.innerHTML=`<div class="g2" style="margin-bottom:0">
    <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${e+1}</label><input id="wicn_${e}" placeholder="Họ và tên"/></div>
    <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="wicp_${e}" type="tel" placeholder="09xxxxxxxx"/></div>
  </div>
  ${e>0?`<button class="btn xs red" onclick="rmWiCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`:""}`,t.appendChild(n)}function zn(t){const e=document.getElementById("wicr_"+t);e&&e.remove()}function Mn(){const t=document.getElementById("wi_cp_w");if(!t)return[];const e=[];return t.querySelectorAll(".wi-cp-r").forEach(n=>{var a,l;const c=n.id.replace(/[^0-9]/g,""),o=(((a=document.getElementById("wicn_"+c))==null?void 0:a.value)||"").trim(),s=(((l=document.getElementById("wicp_"+c))==null?void 0:l.value)||"").trim();o&&e.push({name:o,phone:s})}),e}async function Sn(){var y,C,_,k,E,I,z,M;const t=i.selEv,e=ot(t);if(!Mt(e)){alert("Walk-in chỉ khả dụng từ ngày tổ chức sự kiện trở đi."),at();return}const n=(((y=document.getElementById("wi_n"))==null?void 0:y.value)||"").trim();if(!n){alert("Vui lòng nhập họ tên khách Walk-in");return}const c=(((C=document.getElementById("wi_ph"))==null?void 0:C.value)||"").trim(),o=(((_=document.getElementById("wi_syscode"))==null?void 0:_.value)||"").trim(),s=(((k=document.getElementById("wi_prm"))==null?void 0:k.value)||"").trim(),a=(((E=document.getElementById("wi_reg"))==null?void 0:E.value)||"").trim(),l=(((I=document.getElementById("wi_unit"))==null?void 0:I.value)||"").trim(),r=(((z=document.getElementById("wi_sih"))==null?void 0:z.value)||"").trim(),h=(((M=document.getElementById("wi_note"))==null?void 0:M.value)||"").trim(),f=Mn(),g=q(t),v=f.map(H=>({id:K(),name:H.name,phone:H.phone,code:q(t),checkedIn:!1,checkinTime:null,checkinBy:null})),u={id:K(),eventId:t,guestCode:g,systemCode:o,name:n,phone:c,prmName:s,tcbRegion:a,unit:l,sihName:r,note:h||"[Walk-in]",walkin:!0,companions:v,checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()};d.guests.push(u),i.ticketGid=u.id,w(),i.modal="tickets",m(),await Bt("oh_guests",Tt(u))||alert('⚠️ Đã tạo Walk-in trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi phát vé.')}function An(){const t=[["Loại Khách (Gõ 'Main' hoặc 'Companion')","Họ và Tên (*)","Số Điện Thoại","Tên PRM (Sales TCB)","Vùng TCB","Đơn vị (CN/PGD)","Tên SIH (Sales OH)","Note / Lưu ý","Mã Hệ thống (OneHousing - chỉ áp dụng cho Main)"]],e=[["Main","Nguyễn Văn A","0901234567","Lê PRM","Vùng 1","CN Sài Gòn","Trần SIH","Khách VIP bàn đầu","OH-00123"],["Companion","Nguyễn Văn B (Đi kèm A)","0907654321","","","","","Đi cùng xe ông A",""],["Main","Phạm Thị C","0911223344","Nguyễn PRM","Vùng 2","CN Hà Nội","Vũ SIH","","OH-00456"]],n=XLSX.utils.aoa_to_sheet(t.concat(e)),c=XLSX.utils.book_new();XLSX.utils.book_append_sheet(c,n,"Template"),XLSX.writeFile(c,"OneHousing_Template_ImportKhach.xlsx")}function Hn(){document.getElementById("excel_file_input").click()}function Nn(t){const e=t.target.files[0];if(!e)return;const n=new FileReader;n.onload=function(c){try{const o=new Uint8Array(c.target.result),s=XLSX.read(o,{type:"array"}),a=s.SheetNames[0],l=s.Sheets[a],r=XLSX.utils.sheet_to_json(l,{header:1});if(r.length<=1){alert("File Excel trống hoặc thiếu dữ liệu!");return}const h=[];for(let f=1;f<r.length;f++){const g=r[f];!g[1]||String(g[1]).trim()===""||h.push({type:String(g[0]).trim().toLowerCase()==="companion"?"Companion":"Main",name:String(g[1]).trim(),phone:g[2]?String(g[2]).trim():"",prmName:g[3]?String(g[3]).trim():"",tcbRegion:g[4]?String(g[4]).trim():"",unit:g[5]?String(g[5]).trim():"",sihName:g[6]?String(g[6]).trim():"",note:g[7]?String(g[7]).trim():"",systemCode:g[8]?String(g[8]).trim():""})}if(h.length===0){alert("Không tìm thấy dữ liệu khách hàng hợp lệ trong file Excel!");return}i.importData=h,i.modal="import_preview",m()}catch(o){alert("Đã xảy ra lỗi khi đọc file Excel! Chi tiết: "+o.message)}t.target.value=""},n.readAsArrayBuffer(e)}async function Dn(){if(!i.selEv)return;const t=i.selEv,e=i.importData||[];let n=null;const c=[];e.forEach(s=>{if(s.type==="Main"){const a=q(t);n={id:K(),eventId:t,guestCode:a,systemCode:s.systemCode,name:s.name,phone:s.phone,prmName:s.prmName,tcbRegion:s.tcbRegion,unit:s.unit,sihName:s.sihName,note:s.note,companions:[],checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()},d.guests.push(n),c.push(n)}else{const a={id:K(),name:s.name,phone:s.phone,code:q(t),checkedIn:!1,checkinTime:null,checkinBy:null};if(n)n.companions.push(a);else{const l=q(t);n={id:K(),eventId:t,guestCode:l,systemCode:s.systemCode,name:s.name+" (Chính)",phone:s.phone,prmName:s.prmName,tcbRegion:s.tcbRegion,unit:s.unit,sihName:s.sihName,note:"[Hệ thống tự dịch chuyển từ Companion độc lập] "+s.note,companions:[],checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()},d.guests.push(n),c.push(n)}}}),w(),at();const o=await jt("oh_guests",c.map(Tt));alert(o?`🎉 Đã import thành công ${c.length} khách mời từ Excel vào hệ thống!`:`⚠️ Đã lưu ${c.length} khách trên thiết bị này nhưng CHƯA đồng bộ đầy đủ lên hệ thống trung tâm Supabase (có thể do lỗi mạng). Vui lòng bấm "Làm mới" để kiểm tra và đồng bộ lại trước khi rời sự kiện.`)}async function Rn(){const t=d.events.find(h=>h.id===i.selEv),e=it(i.selEv);if(!e.length){alert("Sự kiện này chưa có khách mời nào để xuất QR!");return}const n=document.getElementById("zip_btn"),c=n.textContent;n.textContent="⏳ Đang khởi tạo bộ QR...",n.disabled=!0;const o=document.createElement("div");o.style.display="none",document.body.appendChild(o);const s=new JSZip,a=h=>new Promise(f=>{o.innerHTML="",new QRCode(o,{text:h,width:250,height:250,correctLevel:QRCode.CorrectLevel.M}),setTimeout(()=>{const g=o.querySelector("img");if(g&&g.src)f(g.src.split(",")[1]);else{const v=o.querySelector("canvas");f(v?v.toDataURL().split(",")[1]:null)}},50)}),l=new Map,r=(h,f,g)=>{let v=f.replace(/[/\\?%*:|"<>]/g,"-").trim(),u=`${h}_${v}_(${g})`;if(l.has(u)){let b=l.get(u)+1;return l.set(u,b),`${u}_${b}.png`}else return l.set(u,1),`${u}.png`};for(let h of e){const f=ft(h.guestCode),g=await a(f);if(g){const v=r(h.guestCode,h.name,"Chinh");s.file(v,g,{base64:!0})}if(h.companions&&h.companions.length)for(let v of h.companions){const u=ft(v.code),b=await a(u);if(b){const y=r(v.code,v.name,`DiKem_cua_${h.name}`);s.file(y,b,{base64:!0})}}}document.body.removeChild(o);try{const h=await s.generateAsync({type:"blob"}),f=document.createElement("a");f.href=URL.createObjectURL(h),f.download=`QR_SựKiện_${((t==null?void 0:t.name)||"Event").replace(/[^a-zA-Z0-9]/g,"_")}.zip`,f.click()}catch(h){alert("Có lỗi xảy ra trong quá trình nén file ZIP: "+h.message)}n.textContent=c,n.disabled=!1}window.R=m;window.doLogin=te;window.doRefresh=Xt;window.doUrlCI=Ie;window.setTab=He;window.openGM=Ne;window.pickEv=De;window.setSrch=Re;window.setFil=Ve;window.openM=Le;window.openEdit=Pe;window.openDel=Fe;window.openTickets=Oe;window.closeM=at;window.openEditEv=Ke;window.openCpTicket=Ue;window.openCpEdit=je;window.openCpDel=We;window.openAddComp=qe;window.openCancel=Xe;window.doCancel=Je;window.undoCancel=Qe;window.goCI=Ze;window.backAdmin=Ye;window.lockOut=tn;window.cancelCI=en;window.nextCI=nn;window.addBR=on;window.rmBR=cn;window.addCR=ln;window.rmCR=an;window.saveEv=rn;window.delEv=pn;window.saveG=mn;window.chkEditPw=un;window.doEdit=hn;window.doDel=gn;window.doCpEdit=fn;window.doCpDel=vn;window.doCpAdd=bn;window.mkQRs=Et;window.mkCpQR=rt;window.dlTicket=wn;window.dlCpTicket=xn;window.printAll=$n;window.tryUnlock=Cn;window.startCI=_n;window.confirmPhone=En;window.doAdminCI=kn;window.doEvUnlock=$e;window.expCSV=In;window.togCI=yn;window.togRpt=se;window.setRptEv=le;window.triggerExcelImport=Hn;window.handleExcelImport=Nn;window.downloadExcelTemplate=An;window.commitExcelImport=Dn;window.downloadAllQRsZip=Rn;window.openWalkin=Ge;window.saveWalkin=Sn;window.addWiCR=Bn;window.rmWiCR=zn;
