(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const l of c)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerPolicy&&(l.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?l.credentials="include":c.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(c){if(c.ep)return;c.ep=!0;const l=i(c);fetch(c.href,l)}})();const ut="OH2026",Tt="oh_ci_v5",W="https://kpzwmancieemefcvgtkm.supabase.co",Ct="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwendtYW5jaWVlbWVmY3ZndGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODQyMTksImV4cCI6MjA5NTk2MDIxOX0.WviBlyBg9Ji9kARXUyP_87muq8oGLVX6_0T0FNtKqTI",it={"Content-Type":"application/json",apikey:Ct,Authorization:`Bearer ${Ct}`,Prefer:"return=minimal"},Et=typeof supabase<"u"&&supabase.createClient?supabase.createClient(W,Ct):null,yt="https://lemaitranmedia.github.io/eventoh-checkin";function Pt(t){return{id:t.id,name:t.name,date:t.date_str,team:t.team,venue:t.venue,eventPw:t.event_pw,btcMembers:t.btc_members||[],createdAt:t.created_at}}function _t(t){return{id:t.id,eventId:t.event_id,guestCode:t.guest_code,systemCode:t.system_code,name:t.name,phone:t.phone,prmName:t.prm_name,tcbRegion:t.tcb_region,unit:t.unit,sihName:t.sih_name,note:t.note,companions:t.companions||[],checkedIn:!!t.checked_in,checkinTime:t.checkin_time,checkinBy:t.checkin_by,cancelled:!!t.cancelled,cancelNote:t.cancel_note,walkin:!!t.walkin,createdAt:t.created_at}}function Ut(t){return{id:t.id,name:t.name,date_str:t.date||null,team:t.team||null,venue:t.venue||null,event_pw:t.eventPw||null,btc_members:t.btcMembers||[],created_at:t.createdAt||Date.now()}}function Bt(t){return{id:t.id,event_id:t.eventId,guest_code:t.guestCode,system_code:t.systemCode||null,name:t.name,phone:t.phone||null,prm_name:t.prmName||null,tcb_region:t.tcbRegion||null,unit:t.unit||null,sih_name:t.sihName||null,note:t.note||null,companions:t.companions||[],checked_in:!!t.checkedIn,checkin_time:t.checkinTime||null,checkin_by:t.checkinBy||null,cancelled:!!t.cancelled,cancel_note:t.cancelNote||null,walkin:!!t.walkin,created_at:t.createdAt||Date.now()}}function Ot(){try{const t=localStorage.getItem(Tt);return t?JSON.parse(t):{events:[],guests:[]}}catch{return{events:[],guests:[]}}}async function Kt(){try{const[t,e]=await Promise.all([fetch(`${W}/rest/v1/oh_events?select=*&order=created_at.desc`,{headers:it}),fetch(`${W}/rest/v1/oh_guests?select=*`,{headers:it})]),i=await t.json(),o=await e.json();if(Array.isArray(i)&&Array.isArray(o))return d.events=i.map(Pt),d.guests=o.map(_t),localStorage.setItem(Tt,JSON.stringify(d)),!0}catch(t){console.warn("Supabase load lỗi, dùng localStorage:",t)}return!1}function w(){try{localStorage.setItem(Tt,JSON.stringify(d))}catch{}}async function Vt(t,e){try{await fetch(`${W}/rest/v1/${t}?id=eq.${e}`,{method:"DELETE",headers:it})}catch(i){console.warn("Supabase delete lỗi:",i)}}async function F(t,e,i=3){for(let o=1;o<=i;o++){try{const c=await fetch(`${W}/rest/v1/oh_guests?id=eq.${t}`,{method:"PATCH",headers:{...it,Prefer:"return=minimal"},body:JSON.stringify(e)});if(c.ok)return!0;console.warn("sbPatchGuest lỗi HTTP",c.status)}catch(c){console.warn("sbPatchGuest lỗi mạng:",c)}o<i&&await new Promise(c=>setTimeout(c,o*500))}return!1}async function Gt(t,e,i=3){for(let o=1;o<=i;o++){try{const c=await fetch(`${W}/rest/v1/oh_events?id=eq.${t}`,{method:"PATCH",headers:{...it,Prefer:"return=minimal"},body:JSON.stringify(e)});if(c.ok)return!0;console.warn("sbPatchEvent lỗi HTTP",c.status)}catch(c){console.warn("sbPatchEvent lỗi mạng:",c)}o<i&&await new Promise(c=>setTimeout(c,o*500))}return!1}async function zt(t,e,i=3){for(let o=1;o<=i;o++){try{const c=await fetch(`${W}/rest/v1/${t}`,{method:"POST",headers:{...it,Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify([e])});if(c.ok)return!0;console.warn("sbUpsertOne lỗi HTTP",c.status)}catch(c){console.warn("sbUpsertOne lỗi mạng:",c)}o<i&&await new Promise(c=>setTimeout(c,o*500))}return!1}async function jt(t,e,i=3){if(!e.length)return!0;for(let o=1;o<=i;o++){try{const c=await fetch(`${W}/rest/v1/${t}`,{method:"POST",headers:{...it,Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(e)});if(c.ok)return!0;console.warn("sbUpsertMany lỗi HTTP",c.status)}catch(c){console.warn("sbUpsertMany lỗi mạng:",c)}o<i&&await new Promise(c=>setTimeout(c,o*500))}return!1}let d={events:[],guests:[]};function bt(t){return yt+"/?code="+encodeURIComponent(t)}async function Mt(){if(!await Kt()){const e=Ot();d.events=e.events,d.guests=e.guests}}function X(t){return t!=null&&t.date?new Date().toISOString().slice(0,10)>t.date:!1}function St(t){return t!=null&&t.date?new Date().toISOString().slice(0,10)>=t.date:!1}function Wt(t){return St(t)}function ct(t){return d.events.find(e=>e.id===t)}function Xt(){var i;if(n.modal||((i=n.ciState)==null?void 0:i.step)==="verify"||n.urlCIBusy)return!0;const t=document.activeElement;if(!t)return!1;const e=t.tagName;return e==="INPUT"||e==="TEXTAREA"||e==="SELECT"}async function qt(){const t=document.getElementById("refresh_btn");t&&(t.textContent="⏳ Đang làm mới...",t.disabled=!0),await Mt(),u()}let ft=null,vt=0,$t=null;function Lt(){if(!Et){console.warn("⚠️ Không khởi tạo được Realtime — thiếu supabaseClient (kiểm tra lại thẻ <script> supabase-js trong HTML).");return}console.log("Bắt đầu kết nối Realtime từ Supabase..."),ft=Et.channel("public:oh_guests").on("postgres_changes",{event:"UPDATE",schema:"public",table:"oh_guests"},t=>{const e=_t(t.new),i=d.guests.findIndex(o=>o.id===e.id);i!==-1&&(d.guests[i]=e,w(),typeof u=="function"&&u(),console.log(`📡 Realtime cập nhật trạng thái khách: ${e.name}`))}).on("postgres_changes",{event:"INSERT",schema:"public",table:"oh_guests"},t=>{const e=_t(t.new);d.guests.some(i=>i.id===e.id)||(d.guests.push(e),w(),typeof u=="function"&&u(),console.log(`📡 Realtime: khách mới từ thiết bị khác — ${e.name}`))}).on("postgres_changes",{event:"DELETE",schema:"public",table:"oh_guests"},t=>{var i;const e=(i=t.old)==null?void 0:i.id;e&&(d.guests=d.guests.filter(o=>o.id!==e),w(),typeof u=="function"&&u(),console.log(`📡 Realtime: khách đã bị xoá từ thiết bị khác — ${e}`))}).subscribe(t=>{t==="SUBSCRIBED"?(console.log("✅ Kết nối Realtime thành công! Đang lắng nghe thay đổi..."),vt=0):(t==="CHANNEL_ERROR"||t==="TIMED_OUT"||t==="CLOSED")&&(console.warn(`⚠️ Realtime mất kết nối (${t}). Sẽ thử kết nối lại...`),Jt())})}function Jt(){if($t)return;vt++;const t=Math.min(3e4,2e3*vt);$t=setTimeout(async()=>{if($t=null,console.log(`🔄 Đang thử kết nối lại Realtime (lần ${vt})...`),ft){try{await Et.removeChannel(ft)}catch{}ft=null}Xt()||(await Mt(),u()),Lt()},t)}async function Qt(){const t=new URLSearchParams(window.location.search).get("code"),e=document.getElementById("root");if(e.innerHTML=`<div style="max-width:360px;margin:80px auto;text-align:center;font-family:'Be Vietnam Pro',sans-serif"><div style="font-size:40px;margin-bottom:12px">⏳</div><div style="font-size:14px;color:#aaa;margin-top:8px">Đang tải...</div></div>`,await Mt(),Lt(),t){n.urlCode=decodeURIComponent(t),n.view="url_ci",u();return}u()}Qt();let n={adminOk:!1,view:"admin",urlCode:null,urlCIStep:null,urlCIBusy:!1,urlCISyncWarn:!1,tab:"events",selEv:null,modal:null,editGid:null,delGid:null,ticketGid:null,editEvId:null,cpTicket:null,cpEdit:null,cpDel:null,cpAdd:null,adminCI:null,cancelTarget:null,unlockedEvs:{},unlockedCIEvs:{},evUnlockTarget:null,ciUnlockTarget:null,rptEv:null,rptExp:{},search:"",filter:"all",ciOk:!1,ciEv:null,ciOp:null,ciState:null,ciSyncWarn:!1,pwVal:"",pwErr:"",newEvBtcRows:1,newGCompRows:1,importData:null};function O(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function B(t){return t?new Date(t).toLocaleDateString("vi-VN"):"—"}function at(t){return t?new Date(t).toLocaleString("vi-VN"):"—"}function xt(t){return t?new Date(t).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}):""}function ot(t){return d.guests.filter(e=>e.eventId===t)}function kt(t){let e=0,i=0,o=0;return ot(t).forEach(c=>{e++,c.checkedIn&&i++,c.cancelled&&o++,(c.companions||[]).forEach(l=>{e++,l.checkedIn&&i++,l.cancelled&&o++})}),{t:e,c:i,x:o,p:e-i-o}}function j(t){const e=d.events.find(r=>r.id===t),i=e?e.name.replace(/[^A-Z0-9]/gi,"").toUpperCase().slice(0,3):"OH",o="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",c=new Set;d.guests.forEach(r=>{c.add(r.guestCode),(r.companions||[]).forEach(s=>c.add(s.code))});let l,a=0;do{l=i+"-";for(let r=0;r<4;r++)l+=o[Math.floor(Math.random()*o.length)];a++}while(c.has(l)&&a<200);return l}function Zt(t,e){for(const i of d.guests.filter(o=>o.eventId===t)){if(i.guestCode===e)return{type:"guest",guest:i,person:i};for(const o of i.companions||[])if(o.code===e)return{type:"comp",guest:i,person:o}}return null}function u(){const t=document.getElementById("root");if(n.view==="url_ci"){t.innerHTML=Ie(),Te();return}if(!n.adminOk){t.innerHTML=Yt();return}if(n.view==="checkin"){t.innerHTML=ze(),Me();return}t.innerHTML=ee(),ne()}function Yt(){return`<div class="login-box">
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
  </div>`}function te(){var e;(((e=document.getElementById("login_pw"))==null?void 0:e.value)||"")===ut?(n.adminOk=!0,u()):document.getElementById("login_err").textContent="⚠️ Mật khẩu không đúng."}function ee(){return`
    <div class="topbar no-print" style="margin-bottom:16px">
      <div>
        <div style="font-size:17px;font-weight:800">🎪 Hệ thống Check-in Sự kiện</div>
        <div style="font-size:12px;color:#aaa">OneHousing · ${d.events.length} sự kiện · ${d.guests.length} nhóm khách</div>
      </div>
      <button class="btn" onclick="goCI()">📷 Màn hình Check-in BTC</button>
    </div>
    <div class="tabs no-print">
      <button class="tab ${n.tab==="events"?"on":""}" onclick="setTab('events')">📅 Sự kiện</button>
      <button class="tab ${n.tab==="guests"?"on":""}" onclick="setTab('guests')">👥 Khách mời</button>
      <button class="tab ${n.tab==="report"?"on":""}" onclick="setTab('report')">📊 Báo cáo</button>
    </div>
    ${n.tab==="events"?ie():""}
    ${n.tab==="guests"?oe():""}
    ${n.tab==="report"?ce():""}
    ${n.modal?ae():""}`}function ne(){n.modal==="tickets"&&n.ticketGid&&(setTimeout(It,120),setTimeout(It,400)),n.modal==="cp_ticket"&&n.cpTicket&&(setTimeout(pt,120),setTimeout(pt,400))}function ie(){const t=[...d.events].sort((e,i)=>new Date(i.date||0)-new Date(e.date||0));return`<div class="topbar"><div style="font-weight:700">Danh sách sự kiện</div>
    <button class="btn blue sm" onclick="openM('add_ev')">+ Tạo sự kiện</button></div>
    ${t.length===0?'<div class="empty">📭 Chưa có sự kiện nào.<br>Nhấn "Tạo sự kiện" để bắt đầu.</div>':""}
    ${t.map(e=>{const i=kt(e.id),o=(e.btcMembers||[]).length,c=X(e);return`<div class="ev-item" onclick="openGM('${e.id}')">
        <div style="font-size:28px;flex-shrink:0">${c?"🔐":"📌"}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:15px">${e.name} ${e.eventPw?n.unlockedEvs[e.id]?"🔓":"🔒":""} ${c?'<span style="font-size:10px;font-weight:600;background:#FEF2F2;color:#B91C1C;padding:2px 7px;border-radius:10px;vertical-align:middle">Đã kết thúc</span>':""}</div>
          <div class="ev-meta">
            <span>📅 ${B(e.date)}</span>
            <span>🏢 ${e.team||"—"}</span>
            ${e.venue?`<span>📍 ${e.venue}</span>`:""}
            <span>👥 ${i.t} người</span>
            <span>✅ ${i.c}/${i.t}</span>
            <span>🔑 ${o} BTC</span>
          </div>
          <div class="pb"><div class="pb-fill" style="width:${i.t>0?Math.round(i.c/i.t*100):0}%;background:${c?"#aaa":"#3B6D11"}"></div></div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap" onclick="event.stopPropagation()">
          <span class="badge ${c?"b-gray":i.c===i.t&&i.t>0?"b-green":i.c>0?"b-blue":"b-gray"}">${c?"Đã đóng":i.c===i.t&&i.t>0?"Hoàn tất":i.c>0?i.c+" đã vào":"Chờ"}</span>
          ${e.eventPw&&n.unlockedEvs[e.id]?`<button class="btn sm" onclick="alert('Mật khẩu: '+db.events.find(e=>e.id==='${e.id}')?.eventPw)" title="Xem mật khẩu" style="font-size:11px">🔓 MK</button>`:""}
          <button class="btn sm" onclick="openGM('${e.id}')">📋 Khách</button>
          <button class="btn sm" onclick="openEditEv('${e.id}')">✏️ Sửa</button>
          <button class="btn sm red" onclick="delEv('${e.id}')">🗑️</button>
        </div>
      </div>`}).join("")}`}function oe(){const t=`<select class="selx" onchange="pickEv(this.value)">
    <option value="">-- Chọn sự kiện --</option>
    ${d.events.map(s=>`<option value="${s.id}" ${n.selEv===s.id?"selected":""}>${s.name}</option>`).join("")}
  </select>`;if(!n.selEv)return`<div class="topbar">${t}</div><div class="empty">👆 Chọn sự kiện để quản lý khách mời</div>`;const e=d.events.find(s=>s.id===n.selEv);let i=ot(n.selEv);const o=kt(n.selEv);if(n.search){const s=n.search.toLowerCase();i=i.filter(h=>{var f,m,b,g,v,x,E;return((f=h.name)==null?void 0:f.toLowerCase().includes(s))||((m=h.phone)==null?void 0:m.includes(s))||((b=h.prmName)==null?void 0:b.toLowerCase().includes(s))||((g=h.sihName)==null?void 0:g.toLowerCase().includes(s))||((v=h.unit)==null?void 0:v.toLowerCase().includes(s))||((x=h.guestCode)==null?void 0:x.toLowerCase().includes(s))||((E=h.systemCode)==null?void 0:E.toLowerCase().includes(s))||(h.companions||[]).some(_=>{var k,$;return((k=_.name)==null?void 0:k.toLowerCase().includes(s))||(($=_.code)==null?void 0:$.toLowerCase().includes(s))})})}n.filter==="checked"&&(i=i.filter(s=>s.checkedIn)),n.filter==="pending"&&(i=i.filter(s=>!s.checkedIn&&!s.cancelled)),n.filter==="cancelled"&&(i=i.filter(s=>s.cancelled)),n.filter==="walkin"&&(i=i.filter(s=>!!s.walkin));const c=(e.btcMembers||[]).map(s=>`<span class="badge b-purple" style="margin:2px">🔑 ${s.name} (${s.code})</span>`).join(""),l=X(e),a=Wt(e),r=!!n.unlockedCIEvs[e.id];return`
    <div class="topbar">
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">${t}${c?`<div style="display:flex;flex-wrap:wrap;gap:2px">${c}</div>`:""}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button id="refresh_btn" class="btn sm" onclick="doRefresh()" title="Làm mới dữ liệu">🔄 Làm mới</button>
        <input class="sinput" placeholder="🔍 Tìm tên, mã, SĐT..." oninput="setSrch(this.value)" value="${n.search}">
        <select class="selx" onchange="setFil(this.value)">
          <option value="all" ${n.filter==="all"?"selected":""}>Tất cả (${o.t})</option>
          <option value="checked" ${n.filter==="checked"?"selected":""}>✅ Đã vào (${o.c})</option>
          <option value="pending" ${n.filter==="pending"?"selected":""}>⏳ Chưa xác nhận (${o.p})</option>
          <option value="cancelled" ${n.filter==="cancelled"?"selected":""}>🚫 Cancel (${o.x})</option>
          <option value="walkin" ${n.filter==="walkin"?"selected":""}>🚶 Walk-in (${ot(n.selEv).filter(s=>s.walkin).length})</option>
        </select>
        
        ${l?"":`
          <button class="btn green sm" onclick="triggerExcelImport()">📥 Import Excel</button>
          <button class="btn sm" onclick="downloadExcelTemplate()">📄 Mẫu Excel</button>
        `}
        ${o.t>0?'<button class="btn blue sm" onclick="downloadAllQRsZip()" id="zip_btn">🗂️ Tải QR hàng loạt (.ZIP)</button>':""}
        ${l?"":`<button class="btn blue sm" onclick="openM('add_g')">+ Thêm KH đăng ký</button>`}
        ${a?'<button class="btn sm" style="background:#7C3AED;color:#fff;border-color:#7C3AED" onclick="openWalkin()">🚶 + Walk-in</button>':""}
      </div>
    </div>
    
    ${l?`<div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <span style="font-size:20px">📋</span>
      <div style="flex:1">
        <div style="font-weight:600;font-size:13px;color:#92400E">Sự kiện đã kết thúc — Chế độ chỉnh sửa hậu sự kiện</div>
        <div style="font-size:11px;color:#aaa">Check-in, Cancel, Thêm/Xoá khách đã bị khoá từ ngày ${B(e.date)}. Vẫn có thể <b>sửa thông tin</b> (PRM, vùng, đơn vị, SIH, ghi chú, systemCode, tên, SĐT).</div>
      </div>
      ${r?`<div style="display:flex;align-items:center;gap:6px;background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;padding:6px 12px">
            <span style="font-size:14px">✅</span>
            <div style="font-size:12px;font-weight:700;color:#92400E">Đang mở check-in bù</div>
            <button class="btn xs" onclick="closeCIUnlock('${e.id}')" style="background:#fff;color:#B45309;border-color:#FCD34D;font-size:11px">Khoá lại</button>
          </div>`:`<button class="btn sm" onclick="openCIUnlock('${e.id}')" style="background:#D97706;color:#fff;border-color:#D97706;white-space:nowrap">🔓 Mở check-in bù</button>`}
    </div>`:""}
    <div class="stats" style="grid-template-columns:repeat(5,1fr)">
      <div class="stat"><div class="n">${o.t}</div><div class="l">Tổng</div></div>
      <div class="stat"><div class="n" style="color:#3B6D11">${o.c}</div><div class="l">✅ Đã vào</div></div>
      <div class="stat"><div class="n" style="color:#aaa">${o.p}</div><div class="l">⏳ Chưa</div></div>
      <div class="stat"><div class="n" style="color:#B91C1C">${o.x}</div><div class="l">🚫 Cancel</div></div>
      <div class="stat"><div class="n">${o.t>0?Math.round(o.c/o.t*100):0}%</div><div class="l">Tỷ lệ vào</div></div>
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
          ${i.length===0?'<tr><td colspan="9" style="text-align:center;padding:24px;color:#bbb">Không có dữ liệu</td></tr>':""}
          ${i.map((s,h)=>{const f=s.companions||[],m=!!s.cancelled,b=!!s.walkin;let g=`<tr ${m?'class="cancelled"':""} style="${m?"background:#FFF8F8":""}">
              <td style="color:#ccc">${h+1}</td>
              <td>
                <div style="font-weight:600${m?";text-decoration:line-through;color:#bbb":""}">
                  ${s.name}
                  ${b?'<span style="font-size:9px;font-weight:700;background:#EDE9FE;color:#7C3AED;padding:1px 6px;border-radius:8px;margin-left:4px;vertical-align:middle">Walk-in</span>':""}
                </div>
                ${m?`<span class="cancelled-badge">🚫 Cancel</span>${s.cancelNote?`<div class="cancel-note">${s.cancelNote}</div>`:""}`:`${f.length?`<div class="sub">+${f.length} đi kèm</div>`:""}
                   ${s.note?`<div class="sub" style="font-style:italic">${s.note}</div>`:""}
                   ${l?"":`<button class="btn xs" onclick="openAddComp('${s.id}')" style="margin-top:5px;font-size:10px;color:#185FA5;border-color:#b3d4f5">+ thêm đi kèm</button>`}`}
              </td>
              <td><span class="mono">${s.guestCode}</span>${s.systemCode?`<div style="font-size:10px;color:#aaa;margin-top:2px">Mã HT: ${s.systemCode}</div>`:""}</td>
              <td style="color:#888;font-size:12px">${s.phone||"—"}</td>
              <td><div style="font-size:12px">${s.prmName||"—"}</div><div class="sub">${s.tcbRegion||""}</div></td>
              <td style="font-size:12px;color:#888">${s.unit||"—"}</td>
              <td style="font-size:12px;color:#888">${s.sihName||"—"}</td>
              <td>${m||l&&!r?'<span style="font-size:11px;color:#ccc">—</span>':`<button class="ci ${s.checkedIn?"on":"off"}" onclick="togCI('${s.id}','g')">${s.checkedIn?"✅ Vào":"⏳"}</button>
                 ${s.checkedIn?`<div style="font-size:10px;color:#bbb;margin-top:2px">${xt(s.checkinTime)}</div>`:""}`}
              </td>
              <td>
                <div style="display:flex;gap:2px;flex-wrap:wrap">
                  <button class="btn xs" onclick="openTickets('${s.id}')" title="Vé">🎫</button>
                  ${l?"":m?`<button class="btn xs" onclick="undoCancel('${s.id}','g')" style="color:#185FA5;border-color:#185FA5" title="Recall — KH quay lại tham dự">↩</button>`:`<button class="btn xs" onclick="openCancel('${s.id}','g')" title="Cancel KH" style="color:#B91C1C;border-color:#FECACA">🚫</button>`}
                  <button class="btn xs" onclick="openEdit('${s.id}')" title="Sửa thông tin">✏️</button>
                  ${l?"":`<button class="btn xs red" onclick="openDel('${s.id}')" title="Xoá">🗑️</button>`}
                </div>
              </td>
            </tr>`;return f.forEach(v=>{const x=!!v.cancelled;g+=`<tr ${x?'class="cancelled"':""} style="background:${x?"#FFF8F8":"#fafbfc"}">
                <td></td>
                <td style="padding-left:22px">
                  <span style="font-size:12px;color:${x?"#ccc":"#555"};font-weight:500${x?";text-decoration:line-through":""}">↳ ${v.name}</span>
                  ${x?`<span class="cancelled-badge" style="margin-left:4px">🚫</span>${v.cancelNote?`<div class="cancel-note" style="padding-left:14px">${v.cancelNote}</div>`:""}`:'<span class="badge b-purple" style="font-size:9px;margin-left:4px">đi kèm</span>'}
                </td>
                <td><span class="mono">${v.code}</span></td>
                <td style="font-size:12px;color:#aaa">${v.phone||"—"}</td>
                <td colspan="2"></td><td></td>
                <td>${x||l&&!r?'<span style="font-size:11px;color:#ccc">—</span>':`<button class="ci ${v.checkedIn?"on":"off"}" onclick="togCI('${s.id}','c','${v.id}')">${v.checkedIn?"✅ Vào":"⏳"}</button>
                   ${v.checkedIn?`<div style="font-size:10px;color:#bbb;margin-top:2px">${xt(v.checkinTime)}</div>`:""}`}
                </td>
                <td>
                  <div style="display:flex;gap:2px;flex-wrap:wrap">
                    <button class="btn xs" onclick="openCpTicket('${s.id}','${v.id}')" title="Vé">🎫</button>
                    ${l?"":x?`<button class="btn xs" onclick="undoCancel('${s.id}','c','${v.id}')" style="color:#185FA5;border-color:#185FA5" title="Recall — người đi kèm quay lại">↩</button>`:`<button class="btn xs" onclick="openCancel('${s.id}','c','${v.id}')" style="color:#B91C1C;border-color:#FECACA" title="Cancel">🚫</button>`}
                    <button class="btn xs" onclick="openCpEdit('${s.id}','${v.id}')" title="Sửa thông tin">✏️</button>
                    ${l?"":`<button class="btn xs red" onclick="openCpDel('${s.id}','${v.id}')" title="Xoá">🗑️</button>`}
                  </div>
                </td>
              </tr>`}),g}).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${o.t>0?'<div style="text-align:right;margin-top:6px"><button class="btn sm" onclick="expCSV()">⬇️ Xuất CSV</button></div>':""}`}function ce(){if(!d.events.length)return'<div class="empty">Chưa có dữ liệu.</div>';const i=`
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><div style="font-weight:700">📊 Tổng quan sự kiện</div><button id="refresh_btn" class="btn sm" onclick="doRefresh()">🔄 Làm mới</button></div>${`<select class="selx" style="min-width:220px" onchange="setRptEv(this.value)">
    <option value="">-- Tất cả sự kiện --</option>
    ${d.events.map(p=>`<option value="${p.id}" ${n.rptEv===p.id?"selected":""}>${p.name}${p.eventPw&&!n.unlockedEvs[p.id]?" 🔒":""}${X(p)?" 🔐":""}</option>`).join("")}
  </select>`}
      </div>
      ${d.events.map(p=>{const C=kt(p.id),A=C.t?Math.round(C.c/C.t*100):0,gt=p.eventPw&&!n.unlockedEvs[p.id];return`<div style="padding:10px 0;border-bottom:1px solid #f0f0f0">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
            <div><div style="font-weight:600;font-size:13px">${p.name}${gt?" 🔒":""}</div>
              <div style="font-size:11px;color:#aaa">${B(p.date)}${p.team?" · "+p.team:""}</div></div>
            <div style="display:flex;gap:10px;align-items:center">
              <div style="text-align:center"><div style="font-size:15px;font-weight:700">${C.t}</div><div style="font-size:10px;color:#aaa">Tổng</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#3B6D11">${C.c}</div><div style="font-size:10px;color:#aaa">✅ Đã vào</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#aaa">${C.p}</div><div style="font-size:10px;color:#aaa">⏳ Chưa</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#B91C1C">${C.x}</div><div style="font-size:10px;color:#aaa">🚫 Cancel</div></div>
              <div style="width:60px">
                <div class="pb"><div class="pb-fill" style="width:${A}%;background:#3B6D11"></div></div>
                <div style="font-size:10px;text-align:center;color:#aaa;margin-top:2px">${A}%</div>
              </div>
            </div>
          </div>
        </div>`}).join("")}
    </div>`;if(!n.rptEv)return i+'<div class="empty" style="padding:24px">☝️ Chọn sự kiện ở trên để xem báo cáo chi tiết</div>';const o=d.events.find(p=>p.id===n.rptEv);if(o!=null&&o.eventPw&&!n.unlockedEvs[n.rptEv])return i+`<div class="card" style="text-align:center;padding:24px">
      <div style="font-size:24px;margin-bottom:8px">🔒</div>
      <div style="font-weight:700;margin-bottom:4px">Sự kiện được bảo vệ</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:14px">Nhập mật khẩu để xem báo cáo chi tiết</div>
      <button class="btn blue" onclick="S.evUnlockTarget='${n.rptEv}';S.modal='ev_unlock';R()">🔓 Nhập mật khẩu</button>
    </div>`;const c=ot(n.rptEv).map(p=>({name:p.name,code:p.guestCode,phone:p.phone,prmName:p.prmName,tcbRegion:p.tcbRegion,unit:p.unit,sihName:p.sihName,note:p.note,checkedIn:p.checkedIn,cancelled:p.cancelled,checkinTime:p.checkinTime,companions:p.companions||[],walkin:!!p.walkin})),l=[];c.forEach(p=>{l.push({checkedIn:p.checkedIn,cancelled:p.cancelled,isMain:!0}),p.companions.forEach(C=>l.push({checkedIn:C.checkedIn,cancelled:C.cancelled,isMain:!1}))});const a=c.length,r=c.filter(p=>p.checkedIn).length,s=c.filter(p=>p.cancelled).length,h=a-r-s,f=a>0?Math.round(r/a*100):0,m=l.length,b=c.length,g=m-b,v=l.filter(p=>p.checkedIn).length,x=r,E=v-x,_=x>0?Math.round(E/x*100)/100:0,k=c.filter(p=>!p.walkin),$=c.filter(p=>!!p.walkin),I=k.length,M=k.filter(p=>p.checkedIn).length,S=k.filter(p=>p.cancelled).length,R=I-M-S,q=I>0?Math.round(M/I*100):0,D=$.length,K=$.filter(p=>p.checkedIn).length,V=$.filter(p=>p.cancelled).length,J=D-K-V,Q=D>0?Math.round(K/D*100):0;function H(p,C,A){return D===0?'<td style="padding:8px 12px;text-align:center;color:#ccc;font-size:12px">—</td>':'<td style="padding:8px 12px;text-align:center;background:#FAFAFF"><div style="font-size:18px;font-weight:800;color:'+C+'">'+p+"</div>"+(A?'<div style="font-size:10px;color:#aaa;margin-top:1px">'+A+"</div>":"")+"</td>"}function L(p,C,A){return'<td style="padding:8px 12px;text-align:center"><div style="font-size:18px;font-weight:800;color:'+C+'">'+p+"</div>"+(A?'<div style="font-size:10px;color:#aaa;margin-top:1px">'+A+"</div>":"")+"</td>"}const Z=`
  <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin:0 0 8px;text-transform:uppercase">📊 Pre-registered vs Walk-in (Main)</div>
  <div style="background:#fff;border-radius:12px;border:1px solid #eaecf0;margin-bottom:14px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead><tr style="background:#f8fafc">
        <th style="padding:10px 12px;text-align:left;font-size:11px;color:#aaa;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #eaecf0"></th>
        <th style="padding:10px 12px;text-align:center;font-size:12px;font-weight:700;color:#185FA5;border-bottom:1px solid #eaecf0">📋 Pre-registered</th>
        <th style="padding:10px 12px;text-align:center;font-size:12px;font-weight:700;color:#7C3AED;border-bottom:1px solid #eaecf0;background:${D>0?"#F5F3FF":"#f8fafc"}">🚶 Walk-in</th>
      </tr></thead>
      <tbody>
        <tr style="border-bottom:1px solid #f0f0f0">
          <td style="padding:8px 12px;font-size:12px;color:#555;font-weight:600">Tổng KH</td>
          ${L(I,"#185FA5","")}
          ${H(D,"#7C3AED","")}
        </tr>
        <tr style="border-bottom:1px solid #f0f0f0">
          <td style="padding:8px 12px;font-size:12px;color:#3B6D11;font-weight:600">✅ Đã vào</td>
          ${L(M,"#3B6D11",q+"% turnout")}
          ${H(K,"#3B6D11",Q+"% turnout")}
        </tr>
        <tr style="border-bottom:1px solid #f0f0f0">
          <td style="padding:8px 12px;font-size:12px;color:#888;font-weight:600">⏳ Chưa tới</td>
          ${L(R,"#aaa","")}
          ${H(J,"#aaa","")}
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:12px;color:#B91C1C;font-weight:600">🚫 Cancel</td>
          ${L(S>0?S:"—",S>0?"#B91C1C":"#ccc","")}
          ${H(V>0?V:"—",V>0?"#B91C1C":"#ccc","")}
        </tr>
      </tbody>
    </table>
    ${D===0?'<div style="padding:8px 14px;font-size:11px;color:#bbb;text-align:center;border-top:1px solid #f0f0f0">Sự kiện này chưa có khách Walk-in</div>':""}
  </div>`,P=`<div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">Tổng quan (Khách hàng - Main)</div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    ${nt("Tổng KH mời (Main)","#185FA5",a,"")}
    ${nt("✅ KH đã tới","#3B6D11",r,f+"% turnout")}
    ${nt("⏳ KH chưa tới","#888",h,"")}
    ${nt("🚫 KH cancel","#B91C1C",s,"")}
  </div>
  <div style="background:#fff;border-radius:12px;padding:14px 18px;margin-bottom:14px;border:1px solid #eaecf0">
    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px">
      <span style="font-weight:700">${o.name}</span>
      <span style="color:#3B6D11;font-weight:700">${f}%</span>
    </div>
    <div style="background:#f0f0f0;border-radius:99px;height:12px;overflow:hidden">
      <div style="width:${f}%;background:linear-gradient(90deg,#185FA5,#3B6D11);height:100%;border-radius:99px;transition:width .4s"></div>
    </div>
  </div>
  ${Z}
  <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">Tổng lượt tham dự thực tế (Main + Companion)</div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    ${nt("Tổng lượt đăng ký","#185FA5",m,b+" Main + "+g+" Companion")}
    ${nt("✅ Tổng đã vào sảnh","#3B6D11",v,x+" Main + "+E+" Companion")}
    ${nt("Avg companion / Main đã vào","#888",_,"")}
  </div>`;function T(p){const C=p.companions||[];if(!C.length)return"";const A=C.map(U=>U.checkedIn?"-1":"+1");return`<span style="font-size:12px;font-weight:600;color:${A.every(U=>U==="-1")?"#e24b4a":A.every(U=>U==="+1")?"#3B6D11":"#aaa"};white-space:nowrap;margin-left:8px">${A.join(" ")}</span>`}function N(p,C,A,gt){const U={};c.forEach(tt=>{const z=gt(tt)||"Không xác định";U[z]||(U[z]=[]),U[z].push(tt)});const At=Object.entries(U).sort((tt,z)=>z[1].length-tt[1].length);return At.length?`<div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin:16px 0 8px;text-transform:uppercase">${C} Theo ${p} (Main)</div>
      ${At.map(([tt,z])=>{const G=z.filter(y=>y.checkedIn).length,rt=z.filter(y=>y.cancelled).length,et=z.length-G-rt,wt=z.length>0?Math.round(G/z.length*100):0,st=`${A}_${tt}`,Dt=!!n.rptExp[st+"_ci"],Ht=!!n.rptExp[st+"_ab"],Nt=!!n.rptExp[st+"_cn"];return`<div style="background:#fff;border-radius:12px;border:1px solid #eaecf0;padding:14px 16px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
            <div style="font-weight:700;font-size:13px">${tt} <span style="font-weight:400;color:#aaa;font-size:11px">(${z.length} Main)</span></div>
            <div style="display:flex;gap:6px;font-size:12px;flex-wrap:wrap">
              <span onclick="togRpt('${st}_ci')" style="background:${G>0?"#eaf3de":"#f5f5f5"};color:${G>0?"#3B6D11":"#aaa"};border-radius:20px;padding:2px 10px;font-weight:600;cursor:${G>0?"pointer":"default"};user-select:none">
                Đã vào: ${G}${G>0?Dt?" ▲":" ▼":""}
              </span>
              <span onclick="togRpt('${st}_ab')" style="background:${et>0?"#fdecea":"#f5f5f5"};color:${et>0?"#e24b4a":"#aaa"};border-radius:20px;padding:2px 10px;font-weight:600;cursor:${et>0?"pointer":"default"};user-select:none">
                Chưa: ${et}${et>0?Ht?" ▲":" ▼":""}
              </span>
              ${rt>0?`<span onclick="togRpt('${st}_cn')" style="background:#FEF2F2;color:#B91C1C;border-radius:20px;padding:2px 10px;font-weight:600;cursor:pointer;user-select:none">
                Cancel: ${rt}${Nt?" ▲":" ▼"}
              </span>`:""}
            </div>
          </div>
          <div style="background:#f0f0f0;border-radius:99px;height:8px;overflow:hidden">
            <div style="width:${wt}%;background:${wt===100?"#3B6D11":"linear-gradient(90deg,#185FA5,#3B6D11)"};height:100%;border-radius:99px"></div>
          </div>
          <div style="font-size:10px;color:#aaa;margin-top:4px;text-align:right">${wt}% Main đã check-in</div>
          ${Dt&&G>0?`<div style="background:#f0faf0;border:1px solid #97C459;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#3B6D11;margin-bottom:6px">Đã check-in (${G} Main)</div>
            ${z.filter(y=>y.checkedIn).map(y=>`<div style="padding:5px 0;border-bottom:.5px solid #c8e6c9;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px">${y.name}${y.walkin?'<span style="font-size:9px;background:#EDE9FE;color:#7C3AED;padding:1px 5px;border-radius:6px;margin-left:4px">Walk-in</span>':""}</div>
                <div style="font-size:11px;color:#888">${y.code}${y.phone?" · "+y.phone:""}</div>
                <div style="font-size:10px;color:#3B6D11">✅ ${xt(y.checkinTime)}</div>
              </div>
              ${T(y)}
            </div>`).join("")}
          </div>`:""}
          ${Ht&&et>0?`<div style="background:#fff8f8;border:1px solid #fdd;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#e24b4a;margin-bottom:6px">Chưa check-in (${et} Main)</div>
            ${z.filter(y=>!y.checkedIn&&!y.cancelled).map(y=>`<div style="padding:5px 0;border-bottom:.5px solid #fdd;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px">${y.name}</div>
                <div style="font-size:11px;color:#888">${y.code}${y.phone?" · "+y.phone:""}</div>
              </div>
              ${T(y)}
            </div>`).join("")}
          </div>`:""}
          ${Nt&&rt>0?`<div style="background:#FFF8F8;border:1px solid #FECACA;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#B91C1C;margin-bottom:6px">Đã cancel (${rt} Main)</div>
            ${z.filter(y=>y.cancelled).map(y=>`<div style="padding:5px 0;border-bottom:.5px solid #FECACA;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px;text-decoration:line-through;color:#bbb">${y.name}</div>
                <div style="font-size:11px;color:#aaa">${y.code}${y.phone?" · "+y.phone:""}</div>
                ${y.note?`<div style="font-size:10px;color:#B91C1C;font-style:italic">${y.note}</div>`:""}
              </div>
              ${T(y)}
            </div>`).join("")}
          </div>`:""}
        </div>`}).join("")}`:""}const Y=N("Vùng TCB","🏦","vung",p=>p.tcbRegion),mt=N("Chi nhánh","🏢","unit",p=>p.unit),lt=N("SIH","👤","sih",p=>p.sihName),ht=N("PRM","🤝","prm",p=>p.prmName);return i+P+Y+mt+lt+ht}function nt(t,e,i,o){return`<div style="flex:1;min-width:120px;background:#fff;border-radius:12px;padding:14px 16px;border-left:4px solid ${e};border:1px solid #eaecf0;border-left-width:4px">
    <div style="font-size:11px;color:#888;margin-bottom:4px">${t}</div>
    <div style="font-size:28px;font-weight:800;color:${e};line-height:1">${i}</div>
    ${o?`<div style="font-size:11px;color:#aaa;margin-top:4px">${o}</div>`:""}
  </div>`}function le(t){n.rptExp[t]=!n.rptExp[t],u()}function se(t){if(t){const e=d.events.find(i=>i.id===t);if(e!=null&&e.eventPw&&!n.unlockedEvs[t]){n.evUnlockTarget=t,n.rptEv=t,n.modal="ev_unlock",u();return}}n.rptEv=t||null,n.rptExp={},u()}function ae(){const t=(e,i)=>`<div class="ov" onclick="closeM()"><div class="modal ${i||""}" onclick="event.stopPropagation()">${e}</div></div>`;return n.modal==="add_ev"||n.modal==="edit_ev"?t(de(),"lg"):n.modal==="add_g"||n.modal==="edit_g"?t(re(),"lg"):n.modal==="tickets"?t(ue(),"lg"):n.modal==="edit_pw"?t(me(),"sm"):n.modal==="edit_form"?t(he(),"lg"):n.modal==="del_pw"?t(ge(),"sm"):n.modal==="cp_ticket"?t(fe(),"sm"):n.modal==="cp_edit"?t(ve(),"sm"):n.modal==="cp_del"?t(be(),"sm"):n.modal==="cp_add"?t(xe()):n.modal==="admin_ci"?t(ye(),"sm"):n.modal==="cancel"?t(ke(),"sm"):n.modal==="ev_unlock"?t(we(),"sm"):n.modal==="import_preview"?t(Ce(),"lg"):n.modal==="walkin"?t(zn(),"lg"):n.modal==="ci_unlock"?t(Ee(),"sm"):""}function de(){const t=n.modal==="edit_ev",e=t?d.events.find(o=>o.id===n.editEvId):{},i=(e==null?void 0:e.btcMembers)||[{code:"",name:""}];return`<div class="mh">${t?"✏️ Chỉnh sửa sự kiện":"📅 Tạo sự kiện mới"}</div>
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
      ${i.map((o,c)=>`<div class="btc-r" id="br_${c}">
        <input placeholder="Mã NV" id="bc_${c}" value="${o.code||""}" style="max-width:110px;font-family:'JetBrains Mono',monospace;text-transform:uppercase"/>
        <input placeholder="Họ tên BTC" id="bn_${c}" value="${o.name||""}"/>
        ${c>0?`<button class="btn xs red" onclick="rmBR(${c})">✕</button>`:'<span style="width:22px"></span>'}
      </div>`).join("")}
    </div>
    <button class="btn sm" onclick="addBR()" style="margin-bottom:4px">+ Thêm BTC</button>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn ${t?"green":"blue"}" onclick="saveEv()">✅ ${t?"Lưu thay đổi":"Tạo sự kiện"}</button>
    </div>`}function re(){var i;const t=n.modal==="edit_g"&&n.editGid?d.guests.find(o=>o.id===n.editGid):{},e=(i=t==null?void 0:t.companions)!=null&&i.length?t.companions:[{name:"",phone:""}];return`<div class="mh">${n.modal==="edit_g"?"✏️ Chỉnh sửa khách mời":"👤 Thêm khách mời mới"}</div>
    <div class="fg"><label>Sự kiện *</label><select id="g_ev">${d.events.map(o=>`<option value="${o.id}" ${n.selEv===o.id||(t==null?void 0:t.eventId)===o.id?"selected":""}>${o.name}</option>`).join("")}</select></div>
    ${n.modal==="edit_g"?`<div style="margin-bottom:10px"><span style="font-size:12px;color:#aaa">Mã KH:</span> <span class="mono">${(t==null?void 0:t.guestCode)||""}</span> <span style="font-size:11px;color:#ccc">(cố định, không thay đổi)</span></div>`:""}
    <div class="sec">Thông tin khách hàng chính</div>
    <div class="g3">
      <div class="fg"><label>Họ và tên KH *</label><input id="g_n" placeholder="Nguyễn Văn A" value="${(t==null?void 0:t.name)||""}"/></div>
      <div class="fg"><label>Số điện thoại *</label><input id="g_ph" type="tel" placeholder="09xxxxxxxx" value="${(t==null?void 0:t.phone)||""}"/></div>
      <div class="fg"><label>Mã Hệ thống <span style="font-weight:400;color:#aaa">(OneHousing)</span></label><input id="g_syscode" placeholder="VD: OH-00123" value="${(t==null?void 0:t.systemCode)||""}"/></div>
    </div>
    <div class="sec">👥 Người đi kèm <span style="text-transform:none;letter-spacing:0;font-weight:400">(mỗi người có QR & check-in riêng)</span></div>
    <div id="cp_w">
      ${e.map((o,c)=>{var l,a;return pe(o,c,(a=(l=t==null?void 0:t.companions)==null?void 0:l[c])==null?void 0:a.code)}).join("")}
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
    ${n.modal==="edit_g"?`
    <div style="margin:10px 0 4px">
      <label id="g_walkin_lbl" style="display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;padding:10px 14px;background:${t!=null&&t.walkin?"#EDE9FE":"#f8fafc"};border:1.5px solid ${t!=null&&t.walkin?"#7C3AED":"#e0e4ef"};border-radius:10px">
        <input type="checkbox" id="g_walkin" ${t!=null&&t.walkin?"checked":""} style="width:16px;height:16px;accent-color:#7C3AED;cursor:pointer"
          onchange="document.getElementById('g_walkin_lbl').style.background=this.checked?'#EDE9FE':'#f8fafc';document.getElementById('g_walkin_lbl').style.borderColor=this.checked?'#7C3AED':'#e0e4ef'"/>
        <div>
          <span style="font-size:13px;font-weight:600;color:#5B21B6">🚶 Khách Walk-in</span>
          <div style="font-size:11px;color:#aaa;margin-top:2px">Tích nếu KH đến trực tiếp tại sự kiện, không đăng ký trước</div>
        </div>
      </label>
    </div>`:""}
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn ${n.modal==="edit_g"?"green":"blue"}" onclick="saveG()">✅ ${n.modal==="edit_g"?"Lưu thay đổi":"Thêm khách & Tạo vé"}</button>
    </div>`}function pe(t,e,i){return`<div class="cp-r" id="cr_${e}">
    <div class="g2" style="margin-bottom:0">
      <div class="fg" style="margin-bottom:0"><label>Họ tên người đi kèm ${e+1}</label>
        <input placeholder="Họ và tên" id="cn_${e}" value="${t.name||""}"/></div>
      <div class="fg" style="margin-bottom:0"><label>Số điện thoại</label>
        <input placeholder="09xxxxxxxx" type="tel" id="cp_${e}" value="${t.phone||""}"/></div>
    </div>
    ${i?`<div style="margin-top:6px;font-size:11px;color:#aaa">Mã: <span class="mono">${i}</span> (cố định)</div>`:""}
    ${e>0?`<button class="btn xs red" onclick="rmCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`:""}
  </div>`}function ue(){var o;const t=d.guests.find(c=>c.id===n.ticketGid);if(!t)return"";const e=d.events.find(c=>c.id===t.eventId),i=[{type:"main",name:t.name,code:t.guestCode,phone:t.phone},...(t.companions||[]).map(c=>({type:"comp",name:c.name,code:c.code,phone:c.phone,parentName:t.name}))];return`<div class="mh">🎫 Vé tham dự sự kiện</div>
    <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(e==null?void 0:e.name)||""} · ${B(e==null?void 0:e.date)}</div>
    <div style="font-size:12px;color:#bbb;margin-bottom:16px">${i.length} vé · 1 KH chính${(o=t.companions)!=null&&o.length?" + "+t.companions.length+" đi kèm":""}</div>
    <div class="tgrid">
      ${i.map((c,l)=>`
        <div class="ticket">
          <div class="tk-header">VÉ THAM DỰ SỰ KIỆN</div>
          <div style="font-size:11px;color:#bbb;margin-bottom:6px">${(e==null?void 0:e.name)||""}</div>
          <div style="font-size:11px;color:#bbb;margin-bottom:12px">${B(e==null?void 0:e.date)}${e!=null&&e.venue?" · "+e.venue:""}</div>
          <div class="tk-name">${c.name}</div>
          <span class="tk-role ${c.type==="main"?"b-blue":"b-purple"}">${c.type==="main"?"Khách mời chính":"Đi kèm: "+c.parentName}</span>
          <div class="tk-qr" id="tqr_${l}"></div>
          <div class="tk-code">${c.code}</div>
          <div class="tk-foot">
            Vui lòng xuất trình vé tại cổng check-in<br>
            Vé chỉ có giá trị cho 01 người
          </div>
          <button class="btn sm" onclick="dlTicket(${l},'${c.name.replace(/'/g,"\\'")}','${c.code}','${c.type==="main"?"Khách mời chính":"Đi kèm: "+(c.parentName||"").replace(/'/g,"\\'")}')" style="margin-top:10px;font-size:12px">⬇️ Tải vé này</button>
        </div>
      `).join("")}
    </div>
    <div class="mf" style="justify-content:center">
      <button class="btn" onclick="printAll()">🖨️ In tất cả vé</button>
      <button class="btn" onclick="closeM()">Đóng</button>
    </div>`}function me(){return`<div class="mh">✏️ Xác nhận chỉnh sửa</div>
    <div style="font-size:13px;color:#888;margin-bottom:12px">Nhập mật khẩu Admin để chỉnh sửa thông tin khách.</div>
    <div class="fg"><label>Mật khẩu Admin</label>
      <input type="password" id="epw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')chkEditPw()"/></div>
    <div id="epw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="chkEditPw()">Tiếp tục →</button>
    </div>`}function he(){var i;const t=d.guests.find(o=>o.id===n.editGid);if(!t)return"";const e=(i=t.companions)!=null&&i.length?t.companions:[{name:"",phone:"",code:""}];return`<div class="mh">✏️ Chỉnh sửa — ${t.name}</div>
    <div style="margin-bottom:12px"><span class="mono">${t.guestCode}</span> <span style="font-size:11px;color:#ccc">(mã cố định)</span></div>
    <div class="sec">Thông tin khách hàng chính</div>
    <div class="g3">
      <div class="fg"><label>Họ và tên KH</label><input id="eg_n" value="${t.name||""}"/></div>
      <div class="fg"><label>Số điện thoại</label><input id="eg_ph" type="tel" value="${t.phone||""}"/></div>
      <div class="fg"><label>Mã Hệ thống <span style="font-weight:400;color:#aaa">(OneHousing)</span></label><input id="eg_syscode" value="${t.systemCode||""}"/></div>
    </div>
    <div class="sec">Người đi kèm</div>
    <div id="ecp_w">
      ${e.map((o,c)=>`<div class="cp-r" id="ecr_${c}">
        <div class="g2" style="margin-bottom:0">
          <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${c+1}</label><input id="ecn_${c}" value="${o.name||""}"/></div>
          <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="ecp_${c}" type="tel" value="${o.phone||""}"/></div>
        </div>
        <div style="margin-top:5px;font-size:11px;color:#aaa">Mã: <span class="mono">${o.code||"—"}</span> (cố định)</div>
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
    <div style="margin:10px 0 4px">
      <label id="eg_walkin_lbl" style="display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;padding:10px 14px;background:${t.walkin?"#EDE9FE":"#f8fafc"};border:1.5px solid ${t.walkin?"#7C3AED":"#e0e4ef"};border-radius:10px">
        <input type="checkbox" id="eg_walkin" ${t.walkin?"checked":""} style="width:16px;height:16px;accent-color:#7C3AED;cursor:pointer"
          onchange="document.getElementById('eg_walkin_lbl').style.background=this.checked?'#EDE9FE':'#f8fafc';document.getElementById('eg_walkin_lbl').style.borderColor=this.checked?'#7C3AED':'#e0e4ef'"/>
        <div>
          <span style="font-size:13px;font-weight:600;color:#5B21B6">🚶 Khách Walk-in</span>
          <div style="font-size:11px;color:#aaa;margin-top:2px">Tích nếu KH đến trực tiếp tại sự kiện, không đăng ký trước</div>
        </div>
      </label>
    </div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn green" onclick="doEdit()">💾 Lưu</button>
    </div>`}function ge(){const t=d.guests.find(e=>e.id===n.delGid);return`<div class="mh">🗑️ Xoá khách hàng</div>
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
    </div>`}function fe(){const{gid:t,cpId:e}=n.cpTicket||{},i=d.guests.find(l=>l.id===t),o=((i==null?void 0:i.companions)||[]).find(l=>l.id===e);if(!i||!o)return"";const c=d.events.find(l=>l.id===i.eventId);return`<div class="mh">🎫 Vé người đi kèm</div>
    <div class="ticket" style="margin:8px 0">
      <div class="tk-header">VÉ THAM DỰ SỰ KIỆN</div>
      <div style="font-size:11px;color:#bbb;margin-bottom:6px">${(c==null?void 0:c.name)||""}</div>
      <div style="font-size:11px;color:#bbb;margin-bottom:12px">${B(c==null?void 0:c.date)}${c!=null&&c.venue?" · "+c.venue:""}</div>
      <div class="tk-name">${o.name}</div>
      <span class="tk-role b-purple">Đi kèm: ${i.name}</span>
      <div class="tk-qr" id="cp_tqr"></div>
      <div class="tk-code">${o.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <div class="mf" style="justify-content:center">
      <button class="btn sm" onclick="dlCpTicket()">⬇️ Tải vé này</button>
      <button class="btn" onclick="closeM()">Đóng</button>
    </div>`}function ve(){const{gid:t,cpId:e}=n.cpEdit||{},i=d.guests.find(c=>c.id===t),o=((i==null?void 0:i.companions)||[]).find(c=>c.id===e);return!i||!o?"":`<div class="mh">✏️ Sửa người đi kèm</div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Mã: <span class="mono">${o.code}</span> (cố định)</div>
    <div class="fg"><label>Họ và tên</label>
      <input id="cpe_n" value="${o.name}" autofocus/></div>
    <div class="fg"><label>Số điện thoại</label>
      <input id="cpe_ph" type="tel" value="${o.phone||""}"/></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn green" onclick="doCpEdit()">💾 Lưu</button>
    </div>`}function be(){const{gid:t,cpId:e}=n.cpDel||{},i=d.guests.find(c=>c.id===t),o=((i==null?void 0:i.companions)||[]).find(c=>c.id===e);return!i||!o?"":`<div class="mh">🗑️ Xoá người đi kèm</div>
    <div style="text-align:center;padding:8px 0">
      <div style="font-size:13px;color:#555;margin-bottom:4px">Xoá <b>${o.name}</b> <span class="mono">${o.code}</span></div>
      <div style="font-size:12px;color:#aaa;margin-bottom:4px">Đi kèm: ${i.name}</div>
      <div style="font-size:12px;color:#bbb;margin-bottom:14px">Hành động này không thể hoàn tác.</div>
    </div>
    <div class="fg"><label>Mật khẩu Admin để xác nhận</label>
      <input type="password" id="cpdpw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')doCpDel()"/></div>
    <div id="cpdpw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn red" onclick="doCpDel()">🗑️ Xoá</button>
    </div>`}function xe(){const t=d.guests.find(e=>e.id===n.cpAdd);return t?`<div class="mh">👤 Thêm người đi kèm</div>
    <div style="font-size:13px;color:#888;margin-bottom:14px">Thêm cho: <b>${t.name}</b> <span class="mono">${t.guestCode}</span></div>
    <div class="fg"><label>Họ và tên *</label>
      <input id="cpa_n" placeholder="Họ và tên người đi kèm" autofocus/></div>
    <div class="fg"><label>Số điện thoại</label>
      <input id="cpa_ph" type="tel" placeholder="09xxxxxxxx"/></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="doCpAdd()">✅ Thêm & Tạo vé</button>
    </div>`:""}function ye(){var a;const{gid:t,type:e,cpId:i}=n.adminCI||{},o=d.guests.find(r=>r.id===t);if(!o)return"";const c=e==="c"?(o.companions||[]).find(r=>r.id===i):o;if(!c)return"";d.events.find(r=>r.id===o.eventId);const l=!!c.phone;return`<div class="mh">✅ Xác nhận Check-in</div>
    <div style="background:#f4f7fb;border-radius:12px;padding:16px;margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#aaa;margin-bottom:6px">THÔNG TIN KHÁCH</div>
      <div style="font-size:18px;font-weight:800;margin-bottom:4px">${c.name}</div>
      <div style="font-size:13px;color:#185FA5;margin-bottom:4px">Mã: <span style="font-family:'JetBrains Mono',monospace">${e==="c"?((a=(o.companions||[]).find(r=>r.id===i))==null?void 0:a.code)||"—":o.guestCode}</span></div>
      ${e==="c"?`<div style="margin-top:4px"><span class="badge b-purple">Đi kèm: ${o.name}</span></div>`:""}
      ${o.note&&e==="g"?`<div style="margin-top:6px"><span class="badge b-amber">${o.note}</span></div>`:""}
    </div>
    ${l?`
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
      </div>`}`}function ke(){const{gid:t,type:e,cpId:i}=n.cancelTarget||{},o=d.guests.find(l=>l.id===t);if(!o)return"";const c=e==="c"?(o.companions||[]).find(l=>l.id===i):o;return c?`<div class="mh">🚫 Đánh dấu Cancel</div>
    <div style="background:#FFF8F8;border-radius:10px;padding:14px;margin-bottom:14px;border:1px solid #FECACA">
      <div style="font-size:15px;font-weight:700">${c.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:3px">Mã: <span class="mono">${e==="c"?c.code:o.guestCode}</span>${e==="c"?` · Đi kèm: ${o.name}`:""}</div>
    </div>
    <div class="fg">
      <label>Lý do cancel / Ghi chú (tuỳ chọn)</label>
      <textarea id="cancel_note" placeholder="VD: KH có việc đột xuất, chưa xác nhận lại..." style="resize:vertical;min-height:70px;padding:9px 12px;border:1.5px solid #dde4f0;border-radius:8px;font-size:13px;width:100%"></textarea>
    </div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Khách sẽ được giữ trong hệ thống và hiện trong báo cáo với trạng thái Cancel. Có thể khôi phục bất kỳ lúc nào.</div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn red" onclick="doCancel()">🚫 Xác nhận Cancel</button>
    </div>`:""}function we(){const t=d.events.find(e=>e.id===n.evUnlockTarget);return t?`<div class="mh">🔒 Nhập mật khẩu sự kiện</div>
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
    </div>`:""}function $e(){var o;const t=d.events.find(c=>c.id===n.evUnlockTarget);if(!t)return;if((((o=document.getElementById("ev_unlock_pw"))==null?void 0:o.value)||"")!==t.eventPw){const c=document.getElementById("ev_unlock_err");c&&(c.textContent="⚠️ Mật khẩu không đúng.");const l=document.getElementById("ev_unlock_pw");l&&(l.value="",l.focus());return}n.unlockedEvs[n.evUnlockTarget]=!0;const i=n.evUnlockTarget;if(n.evUnlockTarget=null,n.modal=null,n.rptEv===i){u();return}n.selEv=i,n.tab="guests",n.search="",n.filter="all",u()}function Ce(){const t=n.importData||[];return`
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
  `}function Ee(){const t=d.events.find(e=>e.id===n.ciUnlockTarget);return t?`<div class="mh">🔓 Mở check-in bù</div>
    <div style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:10px;padding:14px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:700;color:#92400E;margin-bottom:4px">⚠️ Mở check-in sau sự kiện</div>
      <div style="font-size:12px;color:#B45309">Sự kiện <b>${t.name}</b> đã kết thúc (${B(t.date)}). Chức năng này chỉ dùng để check-in bù cho KH đã tới nhưng chưa được ghi nhận. Nhập mật khẩu Admin để xác nhận.</div>
    </div>
    <div class="fg"><label>Mật khẩu Admin</label>
      <input type="password" id="ci_unlock_pw" placeholder="Nhập mật khẩu Admin..."
        style="font-size:15px;padding:11px 14px"
        autofocus onkeydown="if(event.key==='Enter')doCIUnlock()"/></div>
    <div id="ci_unlock_err" style="color:#B91C1C;font-size:12px;margin-bottom:8px"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn" style="background:#D97706;color:#fff;border-color:#D97706" onclick="doCIUnlock()">🔓 Xác nhận mở</button>
    </div>`:""}function _e(){var e;if((((e=document.getElementById("ci_unlock_pw"))==null?void 0:e.value)||"")!==ut){const i=document.getElementById("ci_unlock_err");i&&(i.textContent="⚠️ Mật khẩu Admin không đúng.");const o=document.getElementById("ci_unlock_pw");o&&(o.value="",o.focus());return}n.unlockedCIEvs[n.ciUnlockTarget]=!0,n.ciUnlockTarget=null,n.modal=null,u()}function Ie(){const t=n.urlCode;let e=null;for(const a of d.guests){if(a.guestCode===t){e={type:"guest",guest:a,person:a};break}for(const r of a.companions||[])if(r.code===t){e={type:"comp",guest:a,person:r};break}if(e)break}const i=e?d.events.find(a=>{var r;return a.id===((r=e==null?void 0:e.guest)==null?void 0:r.eventId)}):null;if(!e)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">❌</div>
      <div style="font-size:18px;font-weight:700;color:#a32d2d;margin-bottom:8px">Không tìm thấy vé</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:20px">Mã <b>${t}</b> không tồn tại trong hệ thống.</div>
    </div>`;const o=e.person,c=e.guest;if(n.urlCIStep==="done")return`<div style="max-width:400px;margin:40px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:64px;margin-bottom:12px">🎉</div>
      <div style="font-size:22px;font-weight:800;color:#0C447C;margin-bottom:10px">Check-in thành công!</div>
      <div style="font-size:17px;font-weight:600;color:#185FA5;margin-bottom:4px">${o.name}</div>
      ${e.type==="comp"?`<div style="font-size:13px;color:#6D28D9;margin-bottom:4px">Đi kèm: ${c.name}</div>`:""}
      <div style="font-size:13px;color:#aaa">${(i==null?void 0:i.name)||""}</div>
      ${c.note?`<div style="display:inline-block;margin-top:8px;background:#FFFBEB;color:#92400E;font-size:12px;padding:4px 12px;border-radius:20px">${c.note}</div>`:""}
      <div style="font-size:12px;color:#bbb;margin-top:12px">Ghi nhận lúc: ${at(o.checkinTime)}</div>
      ${n.urlCISyncWarn?`<div style="margin-top:14px;background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:10px;text-align:left">
        ⚠️ Đã ghi nhận check-in trên thiết bị này, nhưng <b>chưa đồng bộ được lên hệ thống trung tâm</b> (có thể do mất mạng).
        Vui lòng báo BTC kỹ thuật kiểm tra lại để đảm bảo dữ liệu được cập nhật đầy đủ.
      </div>`:""}
      <div style="margin-top:24px"><button onclick="window.close()" style="padding:10px 24px;background:#185FA5;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-family:'Be Vietnam Pro',sans-serif">Đóng</button></div>
    </div>`;if(o.checkedIn)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">⚠️</div>
      <div style="font-size:18px;font-weight:700;color:#BA7517;margin-bottom:8px">Vé đã được sử dụng</div>
      <div style="font-size:15px;font-weight:600">${o.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:6px">Check-in lúc: ${at(o.checkinTime)}</div>
      <div style="font-size:12px;color:#aaa">Xác nhận bởi: ${o.checkinBy||"—"}</div>
    </div>`;if(o.cancelled)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">🚫</div>
      <div style="font-size:18px;font-weight:700;color:#B91C1C;margin-bottom:8px">Vé đã bị huỷ</div>
      <div style="font-size:15px;font-weight:600">${o.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:6px">${o.cancelNote||""}</div>
    </div>`;const l=!!o.phone;return`<div style="max-width:420px;margin:0 auto;padding:20px 16px;font-family:'Be Vietnam Pro',sans-serif">
    <div style="text-align:center;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #eaecf0">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#bbb;margin-bottom:8px">VÉ THAM DỰ SỰ KIỆN</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(i==null?void 0:i.name)||"—"}</div>
      <div style="font-size:13px;color:#aaa">${B(i==null?void 0:i.date)}${i!=null&&i.venue?" · "+i.venue:""}</div>
    </div>
    <div style="background:#f4f7fb;border-radius:12px;padding:16px;margin-bottom:20px;text-align:center">
      <div style="font-size:20px;font-weight:800;color:#1a1a2e">${o.name}</div>
      ${e.type==="comp"?`<div style="font-size:12px;color:#6D28D9;margin-top:4px;font-weight:500">Đi kèm: ${c.name}</div>`:""}
      <div style="font-family:'JetBrains Mono',monospace;font-size:14px;color:#aaa;margin-top:6px;letter-spacing:1px">${t}</div>
      ${c.note?`<div style="margin-top:6px;display:inline-block;background:#FFFBEB;color:#92400E;font-size:11px;padding:2px 10px;border-radius:20px;font-weight:600">${c.note}</div>`:""}
    </div>
    ${l?`
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
    <button onclick="doUrlCI()" ${n.urlCIBusy?"disabled":""} style="width:100%;padding:14px;background:${n.urlCIBusy?"#aaa":"#3B6D11"};color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:${n.urlCIBusy?"default":"pointer"};font-family:'Be Vietnam Pro',sans-serif">${n.urlCIBusy?"⏳ Đang xác nhận...":"✅ Xác nhận Check-in"}</button>
  </div>`}function Te(){setTimeout(()=>{const t=document.getElementById("uci_phone")||document.getElementById("uci_btc");t&&t.focus()},80)}async function Be(){var m,b;const t=n.urlCode;let e=null;for(const g of d.guests){if(g.guestCode===t){e={type:"guest",guest:g,person:g};break}for(const v of g.companions||[])if(v.code===t){e={type:"comp",guest:g,person:v};break}if(e)break}if(!e)return;const i=e.person,o=e.guest,c=d.events.find(g=>g.id===o.eventId);if(X(c)){const g=document.getElementById("uci_err");g&&(g.textContent="⚠️ Sự kiện đã kết thúc. Không thể check-in.");return}const l=(((m=document.getElementById("uci_btc"))==null?void 0:m.value)||"").toUpperCase().trim();if(!((c==null?void 0:c.btcMembers)||[]).find(g=>g.code===l)){const g=document.getElementById("uci_err");g&&(g.textContent="⚠️ Mã BTC không đúng hoặc không thuộc sự kiện này.");return}const r=i.phone?i.phone.replace(/\D/g,"").slice(-4):"";if(r&&(((b=document.getElementById("uci_phone"))==null?void 0:b.value)||"").trim()!==r){const v=document.getElementById("uci_err");v&&(v.textContent="⚠️ 4 số cuối SĐT không khớp.");const x=document.getElementById("uci_phone");x&&(x.value="",x.focus());return}if(n.urlCIBusy)return;n.urlCIBusy=!0,u();const s=new Date().toISOString();e.type==="guest"?(o.checkedIn=!0,o.checkinTime=s,o.checkinBy=l):(i.checkedIn=!0,i.checkinTime=s,i.checkinBy=l),w();const h=e.type==="guest"?{checked_in:!0,checkin_time:s,checkin_by:l}:{companions:o.companions||[]},f=await F(o.id,h);n.urlCIBusy=!1,n.urlCISyncWarn=!f,n.urlCIStep="done",u()}function ze(){if(!n.ciOk)return Se();if(!n.ciState)return Rt();const t=n.ciState;return t.step==="verify"?Ae():t.step==="done"?De():t.step==="err"?He():Rt()}function Me(){setTimeout(()=>{const t=document.getElementById("ci_in")||document.getElementById("ci_ph")||document.getElementById("lock_c");t&&t.focus()},80)}function Se(){return`<div class="lock">
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:40px">🔐</div>
      <div style="font-size:17px;font-weight:800;margin-top:8px">Đăng nhập Check-in</div>
      <div style="font-size:13px;color:#aaa;margin-top:4px">Chọn sự kiện và nhập mã nhân viên BTC</div>
    </div>
    <div class="fg"><label>Sự kiện</label><select id="lock_ev" style="width:100%" onchange="S.ciEv=this.value">
      <option value="">-- Chọn sự kiện --</option>
      ${d.events.map(t=>`<option value="${t.id}" ${n.ciEv===t.id?"selected":""}>${t.name} (${B(t.date)})</option>`).join("")}
    </select></div>
    <div class="fg"><label>Mã nhân viên BTC</label>
      <input id="lock_c" placeholder="VD: NV001" style="text-transform:uppercase;font-family:'JetBrains Mono',monospace;letter-spacing:2px;font-size:16px;text-align:center;padding:12px"
        onkeydown="if(event.key==='Enter')tryUnlock()"/></div>
    <button class="btn blue full" onclick="tryUnlock()">Vào hệ thống →</button>
    <div id="lock_err" class="err" style="text-align:center;margin-top:8px"></div>
    <div style="text-align:center;margin-top:166px"><button class="btn ghost" onclick="backAdmin()">← Về trang quản trị</button></div>
  </div>`}function Rt(){var c;const t=d.events.find(l=>l.id===n.ciEv),e=kt(n.ciEv),i=ot(n.ciEv),o=[];return i.forEach(l=>{l.checkedIn&&o.push({name:l.name,code:l.guestCode,time:l.checkinTime,tag:"KH"}),(l.companions||[]).forEach(a=>{a.checkedIn&&o.push({name:a.name,code:a.code,time:a.checkinTime,tag:"ĐK"})})}),o.sort((l,a)=>new Date(a.time)-new Date(l.time)),`<div class="ci-screen">
    <div class="ci-head">
      <button class="btn ghost sm" onclick="backAdmin()">←</button>
      <div style="flex:1"><div style="font-weight:700;font-size:14px">${(t==null?void 0:t.name)||"Sự kiện"}</div>
        <div style="font-size:12px;color:#aaa">${e.c}/${e.t} đã check-in · BTC: ${((c=n.ciOp)==null?void 0:c.name)||"—"}</div></div>
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
    ${o.length?`<div style="max-width:360px;margin:0 auto">
      <div style="font-size:12px;font-weight:600;color:#aaa;margin-bottom:8px">Vừa check-in</div>
      ${o.slice(0,8).map(l=>`<div class="recent-item">
        <div><div style="font-weight:600;font-size:13px">${l.name} <span class="badge ${l.tag==="KH"?"b-blue":"b-purple"}" style="font-size:9px">${l.tag}</span></div>
          <div style="font-size:11px;color:#aaa">${l.code}</div></div>
        <div style="font-size:11px;color:#3B6D11;font-weight:600">${xt(l.time)}</div>
      </div>`).join("")}
    </div>`:""}
  </div>`}function Ae(){const t=n.ciState,e=t.person,i=t.guest;return`<div class="ci-screen">
    <div class="ci-head"><button class="btn ghost sm" onclick="cancelCI()">←</button>
      <div style="font-size:14px;font-weight:600">Xác minh danh tính</div></div>
    <div style="text-align:center;padding:20px 16px">
      <div style="background:#f4f7fb;border-radius:12px;padding:16px;display:inline-block;min-width:250px;margin-bottom:20px;text-align:left">
        <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#aaa;margin-bottom:6px">XÁC NHẬN CHECK-IN</div>
        <div style="font-size:18px;font-weight:800">${e.name}</div>
        <div style="font-size:13px;color:#185FA5;margin-top:4px">Mã: <span style="font-family:'JetBrains Mono',monospace">${t.code}</span></div>
        ${t.type==="comp"?`<div style="margin-top:6px"><span class="badge b-purple">Đi kèm: ${i.name}</span></div>`:""}
        ${i.note?`<div style="margin-top:6px"><span class="badge b-amber">${i.note}</span></div>`:""}
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
  </div>`}function De(){const t=n.ciState,e=t.person,i=t.guest,o=d.events.find(c=>c.id===i.eventId);return`<div class="ci-screen"><div class="big-result">
    <div class="icon">🎉</div>
    <div style="font-size:22px;font-weight:800;color:#0C447C;margin-bottom:10px">Check-in thành công!</div>
    <div style="font-size:17px;font-weight:600;color:#185FA5;margin-bottom:4px">${e.name}</div>
    ${t.type==="comp"?`<div style="margin-bottom:4px"><span class="badge b-purple">Đi kèm: ${i.name}</span></div>`:""}
    <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(o==null?void 0:o.name)||""}</div>
    ${t.type==="guest"&&(i.companions||[]).length?`<div style="font-size:12px;color:#BA7517;margin-top:10px;padding:8px 16px;background:#FFFBEB;border-radius:8px;display:inline-block">⚠️ ${i.companions.length} người đi kèm cần check-in riêng</div>`:""}
    ${i.note?`<div style="margin-top:10px;display:inline-block"><span class="badge b-amber">${i.note}</span></div>`:""}
    <div style="font-size:12px;color:#bbb;margin-top:12px">Ghi nhận lúc: ${at(e.checkinTime)} · BTC: ${e.checkinBy||"—"}</div>
    ${n.ciSyncWarn?`<div style="margin-top:14px;background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:10px;text-align:left;max-width:360px;margin-left:auto;margin-right:auto">
      ⚠️ Đã ghi nhận check-in trên thiết bị này, nhưng <b>chưa đồng bộ được lên hệ thống trung tâm</b> (có thể do mất mạng hoặc lỗi Supabase).
      Vui lòng kiểm tra lại kết nối và báo kỹ thuật nếu tình trạng tiếp diễn.
    </div>`:""}
    <div style="margin-top:24px">
      <button class="btn blue" onclick="nextCI()" style="padding:12px 32px;font-size:15px">📷 Scan vé tiếp theo</button>
    </div>
  </div></div>`}function He(){return`<div class="ci-screen"><div class="big-result">
    <div class="icon">❌</div>
    <div style="font-size:18px;font-weight:700;color:#a32d2d;margin-bottom:8px">Xác minh thất bại</div>
    <div style="font-size:13px;color:#888;max-width:280px;margin:0 auto">${n.ciState.msg||"Thông tin không khớp"}</div>
    <div style="margin-top:20px"><button class="btn" onclick="cancelCI()" style="padding:10px 24px">← Thử lại</button></div>
  </div></div>`}function Ne(t){n.tab=t,u()}function Re(t){const e=d.events.find(i=>i.id===t);if(e){if(e.eventPw&&!n.unlockedEvs[t]){n.evUnlockTarget=t,n.modal="ev_unlock",u();return}n.selEv=t,n.tab="guests",n.search="",n.filter="all",u()}}function Fe(t){if(!t){n.selEv=null,n.search="",n.filter="all",u();return}const e=d.events.find(i=>i.id===t);if(e){if(e.eventPw&&!n.unlockedEvs[t]){n.evUnlockTarget=t,n.modal="ev_unlock",u();return}n.selEv=t,n.search="",n.filter="all",u()}}function Ve(t){n.search=t,u()}function Le(t){n.filter=t,u()}function Pe(t){n.modal=t,u()}function Ue(t){n.editGid=t,n.modal="edit_pw",u()}function Oe(t){n.delGid=t,n.modal="del_pw",u()}function Ke(t){n.ticketGid=t,n.modal="tickets",u()}function dt(){n.modal=null,n.editGid=null,n.delGid=null,n.cpTicket=null,n.cpEdit=null,n.cpDel=null,n.cpAdd=null,n.adminCI=null,n.cancelTarget=null,n.evUnlockTarget=null,n.editEvId=null,n.importData=null,n.ciUnlockTarget=null,u()}function Ge(){const t=ct(n.selEv);if(!St(t)){alert("Walk-in chỉ khả dụng từ ngày tổ chức sự kiện ("+B(t==null?void 0:t.date)+") trở đi.");return}n.modal="walkin",u()}function je(t){const e=d.events.find(i=>i.id===t);if(e){if(e.eventPw&&!n.unlockedEvs[t]){n.evUnlockTarget=t,n.modal="ev_unlock",u();return}n.editEvId=t,n.modal="edit_ev",u()}}function We(t,e){n.cpTicket={gid:t,cpId:e},n.modal="cp_ticket",u(),setTimeout(()=>pt(),120)}function Xe(t,e){n.cpEdit={gid:t,cpId:e},n.modal="cp_edit",u()}function qe(t,e){n.cpDel={gid:t,cpId:e},n.modal="cp_del",u()}function Je(t){n.cpAdd=t,n.modal="cp_add",u()}function Qe(t,e,i){n.cancelTarget={gid:t,type:e,cpId:i||null},n.modal="cancel",u()}async function Ze(){var r;const{gid:t,type:e,cpId:i}=n.cancelTarget||{},o=d.guests.find(s=>s.id===t);if(!o)return;if(X(ct(o.eventId))){alert("Sự kiện đã kết thúc. Không thể thay đổi."),dt();return}const c=(((r=document.getElementById("cancel_note"))==null?void 0:r.value)||"").trim();let l;if(e==="c"){const s=(o.companions||[]).find(h=>h.id===i);s&&(s.cancelled=!0,s.cancelNote=c,s.checkedIn=!1,s.checkinTime=null),l={companions:o.companions}}else o.cancelled=!0,o.cancelNote=c,o.checkedIn=!1,o.checkinTime=null,(o.companions||[]).forEach(s=>{s.cancelled=!0,s.cancelNote=c?`[Theo KH chính] ${c}`:"Theo KH chính",s.checkedIn=!1,s.checkinTime=null}),l={cancelled:!0,cancel_note:c,checked_in:!1,checkin_time:null,companions:o.companions};w(),n.modal=null,n.cancelTarget=null,u(),await F(o.id,l)||alert('⚠️ Đã ghi nhận Cancel trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function Ye(t,e,i){const o=d.guests.find(a=>a.id===t);if(!o)return;let c;if(e==="c"){const a=(o.companions||[]).find(r=>r.id===i);a&&(a.cancelled=!1,a.cancelNote=""),c={companions:o.companions}}else o.cancelled=!1,o.cancelNote="",(o.companions||[]).forEach(a=>{a.cancelled=!1,a.cancelNote=""}),c={cancelled:!1,cancel_note:"",companions:o.companions};w(),u(),await F(o.id,c)||alert('⚠️ Đã khôi phục (Huỷ Cancel) trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function tn(){n.view="checkin",n.ciOk=!1,n.ciEv=null,n.ciOp=null,n.ciState=null,u()}function en(){n.view="admin",n.ciOk=!1,n.ciState=null,u()}function nn(){n.ciOk=!1,n.ciOp=null,n.ciState=null,u()}function on(){n.ciState=null,n.ciSyncWarn=!1,u()}function cn(){n.ciState=null,n.ciSyncWarn=!1,u()}function ln(){const t=document.getElementById("btc_w");if(!t)return;const e=t.querySelectorAll(".btc-r").length,i=document.createElement("div");i.className="btc-r",i.id="br_"+e,i.innerHTML=`<input placeholder="Mã NV" id="bc_${e}" style="max-width:110px;font-family:'JetBrains Mono',monospace;text-transform:uppercase"/>
    <input placeholder="Họ tên BTC" id="bn_${e}"/>
    <button class="btn xs red" onclick="rmBR(${e})" style="flex-shrink:0">✕</button>`,t.appendChild(i)}function sn(t){const e=document.getElementById("br_"+t);e&&e.remove()}function an(){const t=document.getElementById("btc_w");if(!t)return[];const e=[];return t.querySelectorAll(".btc-r").forEach(i=>{var l,a;const o=(((l=i.querySelector("input:first-child"))==null?void 0:l.value)||"").toUpperCase().trim(),c=(((a=i.querySelector("input:nth-child(2)"))==null?void 0:a.value)||"").trim();o&&c&&e.push({code:o,name:c})}),e}function dn(){const t=document.getElementById("cp_w");if(!t)return;const e=t.querySelectorAll(".cp-r").length,i=document.createElement("div");i.id="cr_"+e,i.className="cp-r",i.innerHTML=`<div class="g2" style="margin-bottom:0">
    <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${e+1}</label><input id="cn_${e}" placeholder="Họ và tên"/></div>
    <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="cp_${e}" type="tel" placeholder="09xxxxxxxx"/></div>
  </div><button class="btn xs red" onclick="rmCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`,document.getElementById("cp_w").appendChild(i)}function rn(t){const e=document.getElementById("cr_"+t);e&&e.remove()}function pn(t){const e=document.getElementById("cp_w");if(!e)return[];const i=[];return e.querySelectorAll(".cp-r").forEach(o=>{var s,h;const c=o.id.replace(/[^0-9]/g,""),l="c",a=(((s=document.getElementById(l+"n_"+c))==null?void 0:s.value)||"").trim(),r=(((h=document.getElementById(l+"p_"+c))==null?void 0:h.value)||"").trim();a&&i.push({name:a,phone:r})}),i}async function un(){var h,f,m,b,g,v,x,E,_;const t=n.modal==="edit_ev",e=(f=(h=document.getElementById("ev_n"))==null?void 0:h.value)==null?void 0:f.trim(),i=(m=document.getElementById("ev_d"))==null?void 0:m.value,o=(g=(b=document.getElementById("ev_t"))==null?void 0:b.value)==null?void 0:g.trim(),c=(x=(v=document.getElementById("ev_v"))==null?void 0:v.value)==null?void 0:x.trim(),l=(((E=document.getElementById("ev_pw"))==null?void 0:E.value)||"").trim(),a=(((_=document.getElementById("ev_pw2"))==null?void 0:_.value)||"").trim(),r=an();if(!e){alert("Vui lòng nhập tên sự kiện");return}if(!r.length){alert("Cần ít nhất 1 thành viên BTC");return}const s=document.getElementById("ev_pw_err");if(t){if(l&&l!==a){s&&(s.textContent="⚠️ Mật khẩu nhập lại không khớp");return}const k=d.events.findIndex(R=>R.id===n.editEvId);if(k<0)return;const $=d.events[k],I=l||$.eventPw;d.events[k]={...$,name:e,date:i,team:o,venue:c,eventPw:I,btcMembers:r},l&&(n.unlockedEvs[n.editEvId]=!0);const M=n.editEvId;w(),n.modal=null,n.editEvId=null,u(),await Gt(M,{name:e,date_str:i||null,team:o||null,venue:c||null,event_pw:I,btc_members:r})||alert('⚠️ Đã lưu sự kiện trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}else{if(!l){s&&(s.textContent="⚠️ Vui lòng đặt mật khẩu cho sự kiện");return}if(l!==a){s&&(s.textContent="⚠️ Mật khẩu nhập lại không khớp");return}const k={id:O(),name:e,date:i,team:o,venue:c,eventPw:l,btcMembers:r,createdAt:Date.now()};d.events.push(k),n.unlockedEvs[k.id]=!0,n.selEv=k.id,w(),n.modal=null,n.tab="guests",u(),await zt("oh_events",Ut(k))||alert('⚠️ Đã tạo sự kiện trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi gửi link cho người khác.')}}function mn(t){confirm("Xoá sự kiện này? Toàn bộ khách cũng bị xoá.")&&(d.events=d.events.filter(e=>e.id!==t),d.guests=d.guests.filter(e=>e.eventId!==t),n.selEv===t&&(n.selEv=null),w(),Vt("oh_events",t),u())}async function hn(){var x,E,_,k,$,I,M,S,R,q,D,K,V,J,Q,H,L,Z;const t=(x=document.getElementById("g_ev"))==null?void 0:x.value,e=(_=(E=document.getElementById("g_n"))==null?void 0:E.value)==null?void 0:_.trim(),i=($=(k=document.getElementById("g_ph"))==null?void 0:k.value)==null?void 0:$.trim(),o=(M=(I=document.getElementById("g_syscode"))==null?void 0:I.value)==null?void 0:M.trim(),c=(R=(S=document.getElementById("g_prm"))==null?void 0:S.value)==null?void 0:R.trim(),l=(D=(q=document.getElementById("g_reg"))==null?void 0:q.value)==null?void 0:D.trim(),a=(V=(K=document.getElementById("g_unit"))==null?void 0:K.value)==null?void 0:V.trim(),r=(Q=(J=document.getElementById("g_sih"))==null?void 0:J.value)==null?void 0:Q.trim(),s=(L=(H=document.getElementById("g_note"))==null?void 0:H.value)==null?void 0:L.trim();if(!e){alert("Vui lòng nhập họ tên KH");return}if(!t){alert("Vui lòng chọn sự kiện");return}if(X(ct(t))&&n.modal!=="edit_g"){alert("Sự kiện đã kết thúc. Không thể thêm khách mới."),dt();return}const h=pn();let f=!1,m=null,b=null;if(n.modal==="edit_g"&&n.editGid){const P=d.guests.findIndex(T=>T.id===n.editGid);if(P>-1){const T=d.guests[P],N=T.companions||[],Y=h.map(lt=>{const ht=N.find(p=>p.name===lt.name&&p.code);return ht?{...ht,phone:lt.phone}:{id:O(),name:lt.name,phone:lt.phone,code:j(t),checkedIn:!1,checkinTime:null,checkinBy:null}}),mt=!!(((Z=document.getElementById("g_walkin"))==null?void 0:Z.checked)??(T==null?void 0:T.walkin));d.guests[P]={...T,eventId:t,name:e,phone:i,systemCode:o,prmName:c,tcbRegion:l,unit:a,sihName:r,note:s,walkin:mt,companions:Y},n.ticketGid=n.editGid,f=!0,m={name:e,phone:i,system_code:o,prm_name:c,tcb_region:l,unit:a,sih_name:r,note:s,walkin:mt,companions:Y}}}else{const P=j(t),T=h.map(Y=>({id:O(),name:Y.name,phone:Y.phone,code:j(t),checkedIn:!1,checkinTime:null,checkinBy:null})),N={id:O(),eventId:t,guestCode:P,systemCode:o,name:e,phone:i,prmName:c,tcbRegion:l,unit:a,sihName:r,note:s,companions:T,checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()};d.guests.push(N),n.ticketGid=N.id,b=N}n.selEv=t,w(),n.editGid=null,n.modal="tickets",u();const g=n.ticketGid;(f?await F(g,m):await zt("oh_guests",Bt(b)))||alert('⚠️ Đã lưu khách trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi phát vé.')}function gn(){var e;if((((e=document.getElementById("epw"))==null?void 0:e.value)||"")===ut)n.modal="edit_form",u();else{const i=document.getElementById("epw_err");i&&(i.textContent="⚠️ Mật khẩu không đúng.")}}async function fn(){var g,v,x,E,_,k,$,I,M,S,R,q,D,K,V,J,Q;const t=d.guests.find(H=>H.id===n.editGid);if(!t)return;const e=d.guests.indexOf(t),i=((v=(g=document.getElementById("eg_n"))==null?void 0:g.value)==null?void 0:v.trim())||t.name,o=((E=(x=document.getElementById("eg_ph"))==null?void 0:x.value)==null?void 0:E.trim())||t.phone,c=(k=(_=document.getElementById("eg_syscode"))==null?void 0:_.value)==null?void 0:k.trim(),l=(I=($=document.getElementById("eg_prm"))==null?void 0:$.value)==null?void 0:I.trim(),a=(S=(M=document.getElementById("eg_reg"))==null?void 0:M.value)==null?void 0:S.trim(),r=(q=(R=document.getElementById("eg_unit"))==null?void 0:R.value)==null?void 0:q.trim(),s=(K=(D=document.getElementById("eg_sih"))==null?void 0:D.value)==null?void 0:K.trim(),h=(J=(V=document.getElementById("eg_note"))==null?void 0:V.value)==null?void 0:J.trim(),f=(t.companions||[]).map((H,L)=>{var Z,P,T,N;return{...H,name:((P=(Z=document.getElementById("ecn_"+L))==null?void 0:Z.value)==null?void 0:P.trim())||H.name,phone:((N=(T=document.getElementById("ecp_"+L))==null?void 0:T.value)==null?void 0:N.trim())||H.phone}}),m=!!((Q=document.getElementById("eg_walkin"))!=null&&Q.checked);d.guests[e]={...t,name:i,phone:o,systemCode:c,prmName:l,tcbRegion:a,unit:r,sihName:s,note:h,walkin:m,companions:f},w(),n.modal=null,n.editGid=null,u(),await F(t.id,{name:i,phone:o,system_code:c,prm_name:l,tcb_region:a,unit:r,sih_name:s,note:h,walkin:m,companions:f})||alert('⚠️ Đã lưu thay đổi trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function vn(){var i;if((((i=document.getElementById("dpw"))==null?void 0:i.value)||"")!==ut){const o=document.getElementById("dpw_err");o&&(o.textContent="⚠️ Mật khẩu không đúng.");return}const e=n.delGid;d.guests=d.guests.filter(o=>o.id!==e),w(),Vt("oh_guests",e),n.modal=null,n.delGid=null,u()}async function bn(){var s,h,f,m;const{gid:t,cpId:e}=n.cpEdit||{},i=d.guests.find(b=>b.id===t);if(!i)return;const o=d.guests.indexOf(i),c=(i.companions||[]).findIndex(b=>b.id===e);if(c<0)return;const l=(h=(s=document.getElementById("cpe_n"))==null?void 0:s.value)==null?void 0:h.trim(),a=(m=(f=document.getElementById("cpe_ph"))==null?void 0:f.value)==null?void 0:m.trim();if(!l){alert("Vui lòng nhập họ tên");return}d.guests[o].companions[c]={...d.guests[o].companions[c],name:l,phone:a},w(),n.modal=null,n.cpEdit=null,u(),await F(i.id,{companions:d.guests[o].companions})||alert('⚠️ Đã sửa người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function xn(){var l;if((((l=document.getElementById("cpdpw"))==null?void 0:l.value)||"")!==ut){const a=document.getElementById("cpdpw_err");a&&(a.textContent="⚠️ Mật khẩu không đúng.");return}const{gid:e,cpId:i}=n.cpDel||{},o=d.guests.findIndex(a=>a.id===e);if(o<0)return;d.guests[o].companions=(d.guests[o].companions||[]).filter(a=>a.id!==i),w(),n.modal=null,n.cpDel=null,u(),await F(d.guests[o].id,{companions:d.guests[o].companions})||alert('⚠️ Đã xoá người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function yn(){var a,r,s,h;const t=n.cpAdd,e=d.guests.findIndex(f=>f.id===t);if(e<0)return;const i=(r=(a=document.getElementById("cpa_n"))==null?void 0:a.value)==null?void 0:r.trim(),o=(h=(s=document.getElementById("cpa_ph"))==null?void 0:s.value)==null?void 0:h.trim();if(!i){alert("Vui lòng nhập họ tên");return}const c={id:O(),name:i,phone:o,code:j(d.guests[e].eventId),checkedIn:!1,checkinTime:null,checkinBy:null};d.guests[e].companions||(d.guests[e].companions=[]),d.guests[e].companions.push(c),w(),n.cpTicket={gid:t,cpId:c.id},n.cpAdd=null,n.modal="cp_ticket",u(),setTimeout(()=>pt(),120),await F(d.guests[e].id,{companions:d.guests[e].companions})||alert('⚠️ Đã thêm người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function pt(){const{gid:t,cpId:e}=n.cpTicket||{},i=d.guests.find(l=>l.id===t),o=((i==null?void 0:i.companions)||[]).find(l=>l.id===e);if(!o)return;const c=document.getElementById("cp_tqr");if(c){c.innerHTML="";try{new QRCode(c,{text:bt(o.code),width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}catch{c.innerHTML='<div style="font-size:11px;color:#aaa">QR error</div>'}}}function kn(){const{gid:t,cpId:e}=n.cpTicket||{},i=d.guests.find(a=>a.id===t),o=((i==null?void 0:i.companions)||[]).find(a=>a.id===e);if(!i||!o)return;const c=d.events.find(a=>a.id===i.eventId);window.open("","_blank","width=440,height=560").document.write(`<!DOCTYPE html><html><head>
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
      <div class="ev">${(c==null?void 0:c.name)||""}</div>
      <div class="ev" style="margin-bottom:12px">${B(c==null?void 0:c.date)}${c!=null&&c.venue?" · "+c.venue:""}</div>
      <div class="name">${o.name}</div>
      <div class="role">Đi kèm: ${i.name}</div>
      <div id="qr"></div>
      <div class="code">${o.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <button class="btn" onclick="window.print()">🖨️ Lưu / In vé này</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>setTimeout(()=>new QRCode(document.getElementById('qr'),{text:'${yt}/?code='+encodeURIComponent('${o.code}'),width:160,height:160,correctLevel:QRCode.CorrectLevel.M}),100)<\/script>
  </body></html>`)}async function wn(t,e,i){const o=d.guests.find(a=>a.id===t);if(!o)return;const c=ct(o.eventId);if(X(c)&&!n.unlockedCIEvs[o.eventId]){alert('Sự kiện đã kết thúc. Dùng nút "🔓 Mở check-in bù" trong tab Khách mời để check-in bổ sung.');return}const l=e==="c"?(o.companions||[]).find(a=>a.id===i):o;if(l){if(l.cancelled){alert('Khách đã cancel. Vui lòng nhấn " Huỷ Cancel" trước khi check-in.');return}if(l.checkedIn){if(!confirm(`Huỷ check-in của ${l.name}?`))return;const a=l.name;l.checkedIn=!1,l.checkinTime=null,l.checkinBy=null,w(),u();const r=e==="g"?{checked_in:!1,checkin_time:null,checkin_by:null}:{companions:o.companions||[]};await F(o.id,r)||alert(`⚠️ Đã huỷ check-in của "${a}" trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.`);return}n.adminCI={gid:t,type:e,cpId:i||null},n.modal="admin_ci",u(),setTimeout(()=>{const a=document.getElementById("aci_ph");a&&a.focus()},80)}}async function $n(){var f;const{gid:t,type:e,cpId:i}=n.adminCI||{},o=d.guests.find(m=>m.id===t);if(!o)return;if(X(ct(o.eventId))&&!n.unlockedCIEvs[o.eventId]){alert("Sự kiện đã kết thúc. Không thể check-in."),dt();return}const c=e==="c"?(o.companions||[]).find(m=>m.id===i):o;if(!c)return;const l=c.phone?c.phone.replace(/\D/g,"").slice(-4):"";if(l&&(((f=document.getElementById("aci_ph"))==null?void 0:f.value)||"").trim()!==l){const b=document.getElementById("aci_err");b&&(b.textContent="⚠️ 4 số cuối không khớp. Vui lòng thử lại.");const g=document.getElementById("aci_ph");g&&(g.value="",g.focus());return}const a=new Date().toISOString(),r=c.name;c.checkedIn=!0,c.checkinTime=a,c.checkinBy="admin",w(),n.modal=null,n.adminCI=null,u();const s=e==="g"?{checked_in:!0,checkin_time:a,checkin_by:"admin"}:{companions:o.companions||[]};await F(o.id,s)||alert(`⚠️ Đã ghi nhận check-in cho "${r}" trên thiết bị này, nhưng CHƯA đồng bộ được lên hệ thống trung tâm (có thể do mất mạng hoặc lỗi Supabase).

Vui lòng bấm "Làm mới" ngay để kiểm tra lại — nếu không, trạng thái check-in này có thể bị mất khi làm mới dữ liệu.`)}function It(){const t=d.guests.find(i=>i.id===n.ticketGid);if(!t)return;[t.guestCode,...(t.companions||[]).map(i=>i.code)].forEach((i,o)=>{const c=document.getElementById("tqr_"+o);if(c){c.innerHTML="";try{new QRCode(c,{text:bt(i),width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}catch{c.innerHTML='<div style="font-size:11px;color:#aaa">QR error</div>'}}})}function Cn(t,e,i,o){const c=d.guests.find(r=>r.id===n.ticketGid);if(!c)return;const l=d.events.find(r=>r.id===c.eventId);window.open("","_blank","width=440,height=580").document.write(`<!DOCTYPE html><html><head><style>
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
      <div class="ev">${(l==null?void 0:l.name)||""}</div>
      <div class="ev" style="margin-bottom:12px">${B(l==null?void 0:l.date)}${l!=null&&l.venue?" · "+l.venue:""}</div>
      <div class="name">${e}</div>
      <div class="role">${o}</div>
      <div class="qr-box" id="qr_s"></div>
      <div class="code">${i}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <button class="dl-btn" onclick="window.print()">🖨️ Lưu / In vé này</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>setTimeout(()=>{new QRCode(document.getElementById('qr_s'),{text:'${yt}/?code='+encodeURIComponent('${i}'),width:160,height:160,correctLevel:QRCode.CorrectLevel.M})},100)<\/script>
  </body></html>`)}function En(){const t=d.guests.find(c=>c.id===n.ticketGid);if(!t)return;const e=d.events.find(c=>c.id===t.eventId),i=[{name:t.name,code:t.guestCode,role:"Khách mời chính"},...(t.companions||[]).map(c=>({name:c.name,code:c.code,role:"Đi kèm: "+t.name}))];window.open("","_blank","width=560,height:700").document.write(`<!DOCTYPE html><html><head><style>
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
    ${i.map(c=>`<div class="ticket">
      <div class="hd">VÉ THAM DỰ SỰ KIỆN</div>
      <div class="ev">${(e==null?void 0:e.name)||""}</div>
      <div class="ev" style="margin-bottom:12px">${B(e==null?void 0:e.date)}${e!=null&&e.venue?" · "+e.venue:""}</div>
      <div class="name">${c.name}</div>
      <div class="role">${c.role}</div>
      <div id="pqr_${c.code}" style="display:inline-block;padding:8px;border:1px solid #eee;border-radius:8px"></div>
      <div class="code">${c.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>`).join("")}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>
      const _base='${yt}';
      ${JSON.stringify(i.map(c=>c.code))}.forEach(code=>{
        const el=document.getElementById('pqr_'+code);
        if(el)new QRCode(el,{text:_base+'?code='+encodeURIComponent(code),width:160,height:160,correctLevel:QRCode.CorrectLevel.M});
      });
      setTimeout(()=>window.print(),700);
    <\/script>
  </body></html>`)}function _n(){var c;const t=document.getElementById("lock_ev");if(n.ciEv=(t==null?void 0:t.value)||n.ciEv,!n.ciEv){document.getElementById("lock_err").textContent="⚠️ Vui lòng chọn sự kiện";return}const e=d.events.find(l=>l.id===n.ciEv);if(!e){document.getElementById("lock_err").textContent="Sự kiện không tồn tại";return}const i=(((c=document.getElementById("lock_c"))==null?void 0:c.value)||"").toUpperCase().trim();if(!i){document.getElementById("lock_err").textContent="⚠️ Vui lòng nhập mã nhân viên";return}const o=(e.btcMembers||[]).find(l=>l.code===i);if(!o){document.getElementById("lock_err").textContent="⚠️ Mã không nằm trong danh sách BTC của sự kiện này";return}n.ciOk=!0,n.ciOp=o,n.ciState=null,u()}async function In(){var o,c;const t=(((o=document.getElementById("ci_in"))==null?void 0:o.value)||"").toUpperCase().trim();if(!t){document.getElementById("ci_err").textContent="⚠️ Vui lòng nhập mã";return}const e=Zt(n.ciEv,t);if(!e){document.getElementById("ci_err").textContent="⚠️ Không tìm thấy mã trong sự kiện này";return}const i=e.person;if(i.checkedIn){document.getElementById("ci_err").textContent="⚠️ Đã check-in lúc "+at(i.checkinTime);return}if(!i.phone){const l=new Date().toISOString();i.checkedIn=!0,i.checkinTime=l,i.checkinBy=((c=n.ciOp)==null?void 0:c.code)||"btc",w();const a=e.type==="guest"?{checked_in:!0,checkin_time:l,checkin_by:i.checkinBy}:{companions:e.guest.companions||[]},r=await F(e.guest.id,a);n.ciSyncWarn=!r,n.ciState={step:"done",type:e.type,guest:e.guest,person:i,code:t},u();return}n.ciState={step:"verify",type:e.type,guest:e.guest,person:i,code:t},u()}function Tn(){var c;const t=(((c=document.getElementById("ci_ph"))==null?void 0:c.value)||"").trim(),i=n.ciState.person,o=i.phone?i.phone.replace(/\D/g,"").slice(-4):"";if(!o){Ft();return}if(t===o)Ft();else{const l=document.getElementById("ph_err");l&&(l.textContent="⚠️ 4 số cuối không khớp. Vui lòng thử lại.");const a=document.getElementById("ci_ph");a&&(a.value="",a.focus())}}async function Ft(){var a;const t=n.ciState,e=d.guests.find(r=>r.id===t.guest.id);if(!e){n.ciState={step:"err",msg:"Lỗi hệ thống"},u();return}const i=new Date().toISOString(),o=((a=n.ciOp)==null?void 0:a.code)||"btc";if(t.type==="guest")e.checkedIn=!0,e.checkinTime=i,e.checkinBy=o;else{const r=(e.companions||[]).find(s=>s.id===t.person.id);r&&(r.checkedIn=!0,r.checkinTime=i,r.checkinBy=o)}w();const c=t.type==="guest"?{checked_in:!0,checkin_time:i,checkin_by:o}:{companions:e.companions||[]},l=await F(e.id,c);n.ciSyncWarn=!l,n.ciState={step:"done",type:t.type,guest:e,person:t.type==="guest"?e:(e.companions||[]).find(r=>r.id===t.person.id),code:t.code},u()}function Bn(){const t=d.events.find(l=>l.id===n.selEv),e=[["STT","Loại","Mã","Mã Hệ thống","Họ tên","SĐT","KH gốc (nếu đi kèm)","PRM","Vùng TCB","Đơn vị","SIH","Note","Walk-in","Trạng thái","Giờ check-in","BTC","Lý do cancel"]];let i=0;ot(n.selEv).forEach(l=>{i++;const a=l.cancelled?"Cancel":l.checkedIn?"Đã vào":"Chưa";e.push([i,"KH chính",l.guestCode,l.systemCode||"",l.name,l.phone||"","",l.prmName||"",l.tcbRegion||"",l.unit||"",l.sihName||"",l.note||"",l.walkin?"Walk-in":"",a,l.checkinTime?at(l.checkinTime):"",l.checkinBy||"",l.cancelNote||""]),(l.companions||[]).forEach(r=>{i++;const s=r.cancelled?"Cancel":r.checkedIn?"Đã vào":"Chưa";e.push([i,"Đi kèm",r.code,"",r.name,r.phone||"",l.name,l.prmName||"",l.tcbRegion||"","","","",l.walkin?"(Walk-in Main)":"",s,r.checkinTime?at(r.checkinTime):"",r.checkinBy||"",r.cancelNote||""])})});const o=e.map(l=>l.map(a=>`"${String(a).replace(/"/g,'""')}"`).join(",")).join(`
`),c=document.createElement("a");c.href=URL.createObjectURL(new Blob(["\uFEFF"+o],{type:"text/csv;charset=utf-8"})),c.download=`checkin_${((t==null?void 0:t.name)||"").replace(/[^a-zA-Z0-9]/g,"_")}_${new Date().toISOString().slice(0,10)}.csv`,c.click()}function zn(){const t=ct(n.selEv);return`<div class="mh">🚶 Tạo khách Walk-in</div>
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
    </div>`}function Mn(){const t=document.getElementById("wi_cp_w");if(!t)return;const e=t.querySelectorAll(".wi-cp-r").length,i=document.createElement("div");i.className="wi-cp-r cp-r",i.id="wicr_"+e,i.innerHTML=`<div class="g2" style="margin-bottom:0">
    <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${e+1}</label><input id="wicn_${e}" placeholder="Họ và tên"/></div>
    <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="wicp_${e}" type="tel" placeholder="09xxxxxxxx"/></div>
  </div>
  ${e>0?`<button class="btn xs red" onclick="rmWiCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`:""}`,t.appendChild(i)}function Sn(t){const e=document.getElementById("wicr_"+t);e&&e.remove()}function An(){const t=document.getElementById("wi_cp_w");if(!t)return[];const e=[];return t.querySelectorAll(".wi-cp-r").forEach(i=>{var a,r;const o=i.id.replace(/[^0-9]/g,""),c=(((a=document.getElementById("wicn_"+o))==null?void 0:a.value)||"").trim(),l=(((r=document.getElementById("wicp_"+o))==null?void 0:r.value)||"").trim();c&&e.push({name:c,phone:l})}),e}async function Dn(){var x,E,_,k,$,I,M,S;const t=n.selEv,e=ct(t);if(!St(e)){alert("Walk-in chỉ khả dụng từ ngày tổ chức sự kiện trở đi."),dt();return}const i=(((x=document.getElementById("wi_n"))==null?void 0:x.value)||"").trim();if(!i){alert("Vui lòng nhập họ tên khách Walk-in");return}const o=(((E=document.getElementById("wi_ph"))==null?void 0:E.value)||"").trim(),c=(((_=document.getElementById("wi_syscode"))==null?void 0:_.value)||"").trim(),l=(((k=document.getElementById("wi_prm"))==null?void 0:k.value)||"").trim(),a=((($=document.getElementById("wi_reg"))==null?void 0:$.value)||"").trim(),r=(((I=document.getElementById("wi_unit"))==null?void 0:I.value)||"").trim(),s=(((M=document.getElementById("wi_sih"))==null?void 0:M.value)||"").trim(),h=(((S=document.getElementById("wi_note"))==null?void 0:S.value)||"").trim(),f=An(),m=j(t),b=f.map(R=>({id:O(),name:R.name,phone:R.phone,code:j(t),checkedIn:!1,checkinTime:null,checkinBy:null})),g={id:O(),eventId:t,guestCode:m,systemCode:c,name:i,phone:o,prmName:l,tcbRegion:a,unit:r,sihName:s,note:h||"[Walk-in]",walkin:!0,companions:b,checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()};d.guests.push(g),n.ticketGid=g.id,w(),n.modal="tickets",u(),await zt("oh_guests",Bt(g))||alert('⚠️ Đã tạo Walk-in trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi phát vé.')}function Hn(){const t=[["Loại Khách (Gõ 'Main' hoặc 'Companion')","Họ và Tên (*)","Số Điện Thoại","Tên PRM (Sales TCB)","Vùng TCB","Đơn vị (CN/PGD)","Tên SIH (Sales OH)","Note / Lưu ý","Mã Hệ thống (OneHousing - chỉ áp dụng cho Main)"]],e=[["Main","Nguyễn Văn A","0901234567","Lê PRM","Vùng 1","CN Sài Gòn","Trần SIH","Khách VIP bàn đầu","OH-00123"],["Companion","Nguyễn Văn B (Đi kèm A)","0907654321","","","","","Đi cùng xe ông A",""],["Main","Phạm Thị C","0911223344","Nguyễn PRM","Vùng 2","CN Hà Nội","Vũ SIH","","OH-00456"]],i=XLSX.utils.aoa_to_sheet(t.concat(e)),o=XLSX.utils.book_new();XLSX.utils.book_append_sheet(o,i,"Template"),XLSX.writeFile(o,"OneHousing_Template_ImportKhach.xlsx")}function Nn(){document.getElementById("excel_file_input").click()}function Rn(t){const e=t.target.files[0];if(!e)return;const i=new FileReader;i.onload=function(o){try{const c=new Uint8Array(o.target.result),l=XLSX.read(c,{type:"array"}),a=l.SheetNames[0],r=l.Sheets[a],s=XLSX.utils.sheet_to_json(r,{header:1});if(s.length<=1){alert("File Excel trống hoặc thiếu dữ liệu!");return}const h=[];for(let f=1;f<s.length;f++){const m=s[f];!m[1]||String(m[1]).trim()===""||h.push({type:String(m[0]).trim().toLowerCase()==="companion"?"Companion":"Main",name:String(m[1]).trim(),phone:m[2]?String(m[2]).trim():"",prmName:m[3]?String(m[3]).trim():"",tcbRegion:m[4]?String(m[4]).trim():"",unit:m[5]?String(m[5]).trim():"",sihName:m[6]?String(m[6]).trim():"",note:m[7]?String(m[7]).trim():"",systemCode:m[8]?String(m[8]).trim():""})}if(h.length===0){alert("Không tìm thấy dữ liệu khách hàng hợp lệ trong file Excel!");return}n.importData=h,n.modal="import_preview",u()}catch(c){alert("Đã xảy ra lỗi khi đọc file Excel! Chi tiết: "+c.message)}t.target.value=""},i.readAsArrayBuffer(e)}async function Fn(){if(!n.selEv)return;const t=n.selEv,e=n.importData||[];let i=null;const o=[];e.forEach(l=>{if(l.type==="Main"){const a=j(t);i={id:O(),eventId:t,guestCode:a,systemCode:l.systemCode,name:l.name,phone:l.phone,prmName:l.prmName,tcbRegion:l.tcbRegion,unit:l.unit,sihName:l.sihName,note:l.note,companions:[],checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()},d.guests.push(i),o.push(i)}else{const a={id:O(),name:l.name,phone:l.phone,code:j(t),checkedIn:!1,checkinTime:null,checkinBy:null};if(i)i.companions.push(a);else{const r=j(t);i={id:O(),eventId:t,guestCode:r,systemCode:l.systemCode,name:l.name+" (Chính)",phone:l.phone,prmName:l.prmName,tcbRegion:l.tcbRegion,unit:l.unit,sihName:l.sihName,note:"[Hệ thống tự dịch chuyển từ Companion độc lập] "+l.note,companions:[],checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()},d.guests.push(i),o.push(i)}}}),w(),dt();const c=await jt("oh_guests",o.map(Bt));alert(c?`🎉 Đã import thành công ${o.length} khách mời từ Excel vào hệ thống!`:`⚠️ Đã lưu ${o.length} khách trên thiết bị này nhưng CHƯA đồng bộ đầy đủ lên hệ thống trung tâm Supabase (có thể do lỗi mạng). Vui lòng bấm "Làm mới" để kiểm tra và đồng bộ lại trước khi rời sự kiện.`)}async function Vn(){const t=d.events.find(h=>h.id===n.selEv),e=ot(n.selEv);if(!e.length){alert("Sự kiện này chưa có khách mời nào để xuất QR!");return}const i=document.getElementById("zip_btn"),o=i.textContent;i.textContent="⏳ Đang khởi tạo bộ QR...",i.disabled=!0;const c=document.createElement("div");c.style.display="none",document.body.appendChild(c);const l=new JSZip,a=h=>new Promise(f=>{c.innerHTML="",new QRCode(c,{text:h,width:250,height:250,correctLevel:QRCode.CorrectLevel.M}),setTimeout(()=>{const m=c.querySelector("img");if(m&&m.src)f(m.src.split(",")[1]);else{const b=c.querySelector("canvas");f(b?b.toDataURL().split(",")[1]:null)}},50)}),r=new Map,s=(h,f,m)=>{let b=f.replace(/[/\\?%*:|"<>]/g,"-").trim(),g=`${h}_${b}_(${m})`;if(r.has(g)){let v=r.get(g)+1;return r.set(g,v),`${g}_${v}.png`}else return r.set(g,1),`${g}.png`};for(let h of e){const f=bt(h.guestCode),m=await a(f);if(m){const b=s(h.guestCode,h.name,"Chinh");l.file(b,m,{base64:!0})}if(h.companions&&h.companions.length)for(let b of h.companions){const g=bt(b.code),v=await a(g);if(v){const x=s(b.code,b.name,`DiKem_cua_${h.name}`);l.file(x,v,{base64:!0})}}}document.body.removeChild(c);try{const h=await l.generateAsync({type:"blob"}),f=document.createElement("a");f.href=URL.createObjectURL(h),f.download=`QR_SựKiện_${((t==null?void 0:t.name)||"Event").replace(/[^a-zA-Z0-9]/g,"_")}.zip`,f.click()}catch(h){alert("Có lỗi xảy ra trong quá trình nén file ZIP: "+h.message)}i.textContent=o,i.disabled=!1}function Ln(t){n.ciUnlockTarget=t,n.modal="ci_unlock",u()}function Pn(t){n.unlockedCIEvs[t]=!1,u()}window.R=u;window.doLogin=te;window.doRefresh=qt;window.doUrlCI=Be;window.setTab=Ne;window.openGM=Re;window.pickEv=Fe;window.setSrch=Ve;window.setFil=Le;window.openM=Pe;window.openEdit=Ue;window.openDel=Oe;window.openTickets=Ke;window.closeM=dt;window.openEditEv=je;window.openCpTicket=We;window.openCpEdit=Xe;window.openCpDel=qe;window.openAddComp=Je;window.openCancel=Qe;window.doCancel=Ze;window.undoCancel=Ye;window.goCI=tn;window.backAdmin=en;window.lockOut=nn;window.cancelCI=on;window.nextCI=cn;window.addBR=ln;window.rmBR=sn;window.addCR=dn;window.rmCR=rn;window.saveEv=un;window.delEv=mn;window.saveG=hn;window.chkEditPw=gn;window.doEdit=fn;window.doDel=vn;window.doCpEdit=bn;window.doCpDel=xn;window.doCpAdd=yn;window.mkQRs=It;window.mkCpQR=pt;window.dlTicket=Cn;window.dlCpTicket=kn;window.printAll=En;window.tryUnlock=_n;window.startCI=In;window.confirmPhone=Tn;window.doAdminCI=$n;window.doEvUnlock=$e;window.expCSV=Bn;window.togCI=wn;window.togRpt=le;window.setRptEv=se;window.triggerExcelImport=Nn;window.handleExcelImport=Rn;window.downloadExcelTemplate=Hn;window.commitExcelImport=Fn;window.downloadAllQRsZip=Vn;window.doCIUnlock=_e;window.openCIUnlock=Ln;window.closeCIUnlock=Pn;window.openWalkin=Ge;window.saveWalkin=Dn;window.addWiCR=Mn;window.rmWiCR=Sn;
