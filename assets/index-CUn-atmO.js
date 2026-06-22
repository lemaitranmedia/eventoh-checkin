(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const lt="OH2026",gt="oh_ci_v5",j="https://kpzwmancieemefcvgtkm.supabase.co",pt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwendtYW5jaWVlbWVmY3ZndGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODQyMTksImV4cCI6MjA5NTk2MDIxOX0.WviBlyBg9Ji9kARXUyP_87muq8oGLVX6_0T0FNtKqTI",J={"Content-Type":"application/json",apikey:pt,Authorization:`Bearer ${pt}`,Prefer:"return=minimal"},mt=typeof supabase<"u"&&supabase.createClient?supabase.createClient(j,pt):null,at="https://lemaitranmedia.github.io/eventoh-checkin";function It(t){return{id:t.id,name:t.name,date:t.date_str,team:t.team,venue:t.venue,eventPw:t.event_pw,btcMembers:t.btc_members||[],createdAt:t.created_at}}function ut(t){return{id:t.id,eventId:t.event_id,guestCode:t.guest_code,systemCode:t.system_code,name:t.name,phone:t.phone,prmName:t.prm_name,tcbRegion:t.tcb_region,unit:t.unit,sihName:t.sih_name,note:t.note,companions:t.companions||[],checkedIn:!!t.checked_in,checkinTime:t.checkin_time,checkinBy:t.checkin_by,cancelled:!!t.cancelled,cancelNote:t.cancel_note,walkin:!!t.walkin,createdAt:t.created_at}}function Tt(t){return{id:t.id,name:t.name,date_str:t.date||null,team:t.team||null,venue:t.venue||null,event_pw:t.eventPw||null,btc_members:t.btcMembers||[],created_at:t.createdAt||Date.now()}}function ft(t){return{id:t.id,event_id:t.eventId,guest_code:t.guestCode,system_code:t.systemCode||null,name:t.name,phone:t.phone||null,prm_name:t.prmName||null,tcb_region:t.tcbRegion||null,unit:t.unit||null,sih_name:t.sihName||null,note:t.note||null,companions:t.companions||[],checked_in:!!t.checkedIn,checkin_time:t.checkinTime||null,checkin_by:t.checkinBy||null,cancelled:!!t.cancelled,cancel_note:t.cancelNote||null,walkin:!!t.walkin,created_at:t.createdAt||Date.now()}}function Bt(){try{const t=localStorage.getItem(gt);return t?JSON.parse(t):{events:[],guests:[]}}catch{return{events:[],guests:[]}}}async function Mt(){try{const[t,e]=await Promise.all([fetch(`${j}/rest/v1/oh_events?select=*&order=created_at.desc`,{headers:J}),fetch(`${j}/rest/v1/oh_guests?select=*`,{headers:J})]),n=await t.json(),c=await e.json();if(Array.isArray(n)&&Array.isArray(c))return d.events=n.map(It),d.guests=c.map(ut),localStorage.setItem(gt,JSON.stringify(d)),!0}catch(t){console.warn("Supabase load lỗi, dùng localStorage:",t)}return!1}function C(){try{localStorage.setItem(gt,JSON.stringify(d))}catch{}}async function _t(t,e){try{await fetch(`${j}/rest/v1/${t}?id=eq.${e}`,{method:"DELETE",headers:J})}catch(n){console.warn("Supabase delete lỗi:",n)}}async function D(t,e,n=3){for(let c=1;c<=n;c++){try{const o=await fetch(`${j}/rest/v1/oh_guests?id=eq.${t}`,{method:"PATCH",headers:{...J,Prefer:"return=minimal"},body:JSON.stringify(e)});if(o.ok)return!0;console.warn("sbPatchGuest lỗi HTTP",o.status)}catch(o){console.warn("sbPatchGuest lỗi mạng:",o)}c<n&&await new Promise(o=>setTimeout(o,c*500))}return!1}async function zt(t,e,n=3){for(let c=1;c<=n;c++){try{const o=await fetch(`${j}/rest/v1/oh_events?id=eq.${t}`,{method:"PATCH",headers:{...J,Prefer:"return=minimal"},body:JSON.stringify(e)});if(o.ok)return!0;console.warn("sbPatchEvent lỗi HTTP",o.status)}catch(o){console.warn("sbPatchEvent lỗi mạng:",o)}c<n&&await new Promise(o=>setTimeout(o,c*500))}return!1}async function vt(t,e,n=3){for(let c=1;c<=n;c++){try{const o=await fetch(`${j}/rest/v1/${t}`,{method:"POST",headers:{...J,Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify([e])});if(o.ok)return!0;console.warn("sbUpsertOne lỗi HTTP",o.status)}catch(o){console.warn("sbUpsertOne lỗi mạng:",o)}c<n&&await new Promise(o=>setTimeout(o,c*500))}return!1}async function St(t,e,n=3){if(!e.length)return!0;for(let c=1;c<=n;c++){try{const o=await fetch(`${j}/rest/v1/${t}`,{method:"POST",headers:{...J,Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(e)});if(o.ok)return!0;console.warn("sbUpsertMany lỗi HTTP",o.status)}catch(o){console.warn("sbUpsertMany lỗi mạng:",o)}c<n&&await new Promise(o=>setTimeout(o,c*500))}return!1}let d={events:[],guests:[]};function ct(t){return at+"/?code="+encodeURIComponent(t)}async function bt(){if(!await Mt()){const e=Bt();d.events=e.events,d.guests=e.guests}}function W(t){return t!=null&&t.date?new Date().toISOString().slice(0,10)>t.date:!1}function xt(t){return t!=null&&t.date?new Date().toISOString().slice(0,10)===t.date:!1}function Z(t){return d.events.find(e=>e.id===t)}function Nt(){var n;if(i.modal||((n=i.ciState)==null?void 0:n.step)==="verify"||i.urlCIBusy)return!0;const t=document.activeElement;if(!t)return!1;const e=t.tagName;return e==="INPUT"||e==="TEXTAREA"||e==="SELECT"}async function Ht(){const t=document.getElementById("refresh_btn");t&&(t.textContent="⏳ Đang làm mới...",t.disabled=!0),await bt(),p()}let it=null,ot=0,rt=null;function Et(){if(!mt){console.warn("⚠️ Không khởi tạo được Realtime — thiếu supabaseClient (kiểm tra lại thẻ <script> supabase-js trong HTML).");return}console.log("Bắt đầu kết nối Realtime từ Supabase..."),it=mt.channel("public:oh_guests").on("postgres_changes",{event:"UPDATE",schema:"public",table:"oh_guests"},t=>{const e=ut(t.new),n=d.guests.findIndex(c=>c.id===e.id);n!==-1&&(d.guests[n]=e,C(),typeof p=="function"&&p(),console.log(`📡 Realtime cập nhật trạng thái khách: ${e.name}`))}).on("postgres_changes",{event:"INSERT",schema:"public",table:"oh_guests"},t=>{const e=ut(t.new);d.guests.some(n=>n.id===e.id)||(d.guests.push(e),C(),typeof p=="function"&&p(),console.log(`📡 Realtime: khách mới từ thiết bị khác — ${e.name}`))}).on("postgres_changes",{event:"DELETE",schema:"public",table:"oh_guests"},t=>{var n;const e=(n=t.old)==null?void 0:n.id;e&&(d.guests=d.guests.filter(c=>c.id!==e),C(),typeof p=="function"&&p(),console.log(`📡 Realtime: khách đã bị xoá từ thiết bị khác — ${e}`))}).subscribe(t=>{t==="SUBSCRIBED"?(console.log("✅ Kết nối Realtime thành công! Đang lắng nghe thay đổi..."),ot=0):(t==="CHANNEL_ERROR"||t==="TIMED_OUT"||t==="CLOSED")&&(console.warn(`⚠️ Realtime mất kết nối (${t}). Sẽ thử kết nối lại...`),At())})}function At(){if(rt)return;ot++;const t=Math.min(3e4,2e3*ot);rt=setTimeout(async()=>{if(rt=null,console.log(`🔄 Đang thử kết nối lại Realtime (lần ${ot})...`),it){try{await mt.removeChannel(it)}catch{}it=null}Nt()||(await bt(),p()),Et()},t)}async function Rt(){const t=new URLSearchParams(window.location.search).get("code"),e=document.getElementById("root");if(e.innerHTML=`<div style="max-width:360px;margin:80px auto;text-align:center;font-family:'Be Vietnam Pro',sans-serif"><div style="font-size:40px;margin-bottom:12px">⏳</div><div style="font-size:14px;color:#aaa;margin-top:8px">Đang tải...</div></div>`,await bt(),Et(),t){i.urlCode=decodeURIComponent(t),i.view="url_ci",p();return}p()}Rt();let i={adminOk:!1,view:"admin",urlCode:null,urlCIStep:null,urlCIBusy:!1,urlCISyncWarn:!1,tab:"events",selEv:null,modal:null,editGid:null,delGid:null,ticketGid:null,editEvId:null,cpTicket:null,cpEdit:null,cpDel:null,cpAdd:null,adminCI:null,cancelTarget:null,unlockedEvs:{},evUnlockTarget:null,rptEv:null,rptExp:{},search:"",filter:"all",ciOk:!1,ciEv:null,ciOp:null,ciState:null,ciSyncWarn:!1,pwVal:"",pwErr:"",newEvBtcRows:1,newGCompRows:1,importData:null};function F(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function N(t){return t?new Date(t).toLocaleDateString("vi-VN"):"—"}function tt(t){return t?new Date(t).toLocaleString("vi-VN"):"—"}function st(t){return t?new Date(t).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}):""}function Q(t){return d.guests.filter(e=>e.eventId===t)}function dt(t){let e=0,n=0,c=0;return Q(t).forEach(o=>{e++,o.checkedIn&&n++,o.cancelled&&c++,(o.companions||[]).forEach(s=>{e++,s.checkedIn&&n++,s.cancelled&&c++})}),{t:e,c:n,x:c,p:e-n-c}}function G(t){const e=d.events.find(l=>l.id===t),n=e?e.name.replace(/[^A-Z0-9]/gi,"").toUpperCase().slice(0,3):"OH",c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",o=new Set;d.guests.forEach(l=>{o.add(l.guestCode),(l.companions||[]).forEach(r=>o.add(r.code))});let s,a=0;do{s=n+"-";for(let l=0;l<4;l++)s+=c[Math.floor(Math.random()*c.length)];a++}while(o.has(s)&&a<200);return s}function Dt(t,e){for(const n of d.guests.filter(c=>c.eventId===t)){if(n.guestCode===e)return{type:"guest",guest:n,person:n};for(const c of n.companions||[])if(c.code===e)return{type:"comp",guest:n,person:c}}return null}function p(){const t=document.getElementById("root");if(i.view==="url_ci"){t.innerHTML=re(),pe();return}if(!i.adminOk){t.innerHTML=Vt();return}if(i.view==="checkin"){t.innerHTML=ue(),he();return}t.innerHTML=Pt(),Ft()}function Vt(){return`<div class="login-box">
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
  </div>`}function Lt(){var e;(((e=document.getElementById("login_pw"))==null?void 0:e.value)||"")===lt?(i.adminOk=!0,p()):document.getElementById("login_err").textContent="⚠️ Mật khẩu không đúng."}function Pt(){return`
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
    ${i.tab==="events"?Ot():""}
    ${i.tab==="guests"?Gt():""}
    ${i.tab==="report"?Kt():""}
    ${i.modal?Wt():""}`}function Ft(){i.modal==="tickets"&&i.ticketGid&&(setTimeout(ht,120),setTimeout(ht,400)),i.modal==="cp_ticket"&&i.cpTicket&&(setTimeout(nt,120),setTimeout(nt,400))}function Ot(){const t=[...d.events].sort((e,n)=>new Date(n.date||0)-new Date(e.date||0));return`<div class="topbar"><div style="font-weight:700">Danh sách sự kiện</div>
    <button class="btn blue sm" onclick="openM('add_ev')">+ Tạo sự kiện</button></div>
    ${t.length===0?'<div class="empty">📭 Chưa có sự kiện nào.<br>Nhấn "Tạo sự kiện" để bắt đầu.</div>':""}
    ${t.map(e=>{const n=dt(e.id),c=(e.btcMembers||[]).length,o=W(e);return`<div class="ev-item" onclick="openGM('${e.id}')">
        <div style="font-size:28px;flex-shrink:0">${o?"🔐":"📌"}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:15px">${e.name} ${e.eventPw?i.unlockedEvs[e.id]?"🔓":"🔒":""} ${o?'<span style="font-size:10px;font-weight:600;background:#FEF2F2;color:#B91C1C;padding:2px 7px;border-radius:10px;vertical-align:middle">Đã kết thúc</span>':""}</div>
          <div class="ev-meta">
            <span>📅 ${N(e.date)}</span>
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
      </div>`}).join("")}`}function Gt(){const t=`<select class="selx" onchange="pickEv(this.value)">
    <option value="">-- Chọn sự kiện --</option>
    ${d.events.map(l=>`<option value="${l.id}" ${i.selEv===l.id?"selected":""}>${l.name}</option>`).join("")}
  </select>`;if(!i.selEv)return`<div class="topbar">${t}</div><div class="empty">👆 Chọn sự kiện để quản lý khách mời</div>`;const e=d.events.find(l=>l.id===i.selEv);let n=Q(i.selEv);const c=dt(i.selEv);if(i.search){const l=i.search.toLowerCase();n=n.filter(r=>{var h,f,g,v,m,b,y;return((h=r.name)==null?void 0:h.toLowerCase().includes(l))||((f=r.phone)==null?void 0:f.includes(l))||((g=r.prmName)==null?void 0:g.toLowerCase().includes(l))||((v=r.sihName)==null?void 0:v.toLowerCase().includes(l))||((m=r.unit)==null?void 0:m.toLowerCase().includes(l))||((b=r.guestCode)==null?void 0:b.toLowerCase().includes(l))||((y=r.systemCode)==null?void 0:y.toLowerCase().includes(l))||(r.companions||[]).some(_=>{var I,w;return((I=_.name)==null?void 0:I.toLowerCase().includes(l))||((w=_.code)==null?void 0:w.toLowerCase().includes(l))})})}i.filter==="checked"&&(n=n.filter(l=>l.checkedIn)),i.filter==="pending"&&(n=n.filter(l=>!l.checkedIn&&!l.cancelled)),i.filter==="cancelled"&&(n=n.filter(l=>l.cancelled)),i.filter==="walkin"&&(n=n.filter(l=>!!l.walkin));const o=(e.btcMembers||[]).map(l=>`<span class="badge b-purple" style="margin:2px">🔑 ${l.name} (${l.code})</span>`).join(""),s=W(e),a=xt(e);return`
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
          <option value="walkin" ${i.filter==="walkin"?"selected":""}>🚶 Walk-in (${Q(i.selEv).filter(l=>l.walkin).length})</option>
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
        <div style="font-size:11px;color:#aaa">Check-in, Cancel, Thêm/Xoá khách đã bị khoá từ ngày ${N(e.date)}. Vẫn có thể <b>sửa thông tin</b> (PRM, vùng, đơn vị, SIH, ghi chú, systemCode, tên, SĐT).</div>
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
                 ${l.checkedIn?`<div style="font-size:10px;color:#bbb;margin-top:2px">${st(l.checkinTime)}</div>`:""}`}
              </td>
              <td>
                <div style="display:flex;gap:2px;flex-wrap:wrap">
                  <button class="btn xs" onclick="openTickets('${l.id}')" title="Vé">🎫</button>
                  ${s?"":f?`<button class="btn xs" onclick="undoCancel('${l.id}','g')" style="color:#185FA5;border-color:#185FA5" title="Recall — KH quay lại tham dự">↩</button>`:`<button class="btn xs" onclick="openCancel('${l.id}','g')" title="Cancel KH" style="color:#B91C1C;border-color:#FECACA">🚫</button>`}
                  <button class="btn xs" onclick="openEdit('${l.id}')" title="Sửa thông tin">✏️</button>
                  ${s?"":`<button class="btn xs red" onclick="openDel('${l.id}')" title="Xoá">🗑️</button>`}
                </div>
              </td>
            </tr>`;return h.forEach(m=>{const b=!!m.cancelled;v+=`<tr ${b?'class="cancelled"':""} style="background:${b?"#FFF8F8":"#fafbfc"}">
                <td></td>
                <td style="padding-left:22px">
                  <span style="font-size:12px;color:${b?"#ccc":"#555"};font-weight:500${b?";text-decoration:line-through":""}">↳ ${m.name}</span>
                  ${b?`<span class="cancelled-badge" style="margin-left:4px">🚫</span>${m.cancelNote?`<div class="cancel-note" style="padding-left:14px">${m.cancelNote}</div>`:""}`:'<span class="badge b-purple" style="font-size:9px;margin-left:4px">đi kèm</span>'}
                </td>
                <td><span class="mono">${m.code}</span></td>
                <td style="font-size:12px;color:#aaa">${m.phone||"—"}</td>
                <td colspan="2"></td><td></td>
                <td>${b||s?'<span style="font-size:11px;color:#ccc">—</span>':`<button class="ci ${m.checkedIn?"on":"off"}" onclick="togCI('${l.id}','c','${m.id}')">${m.checkedIn?"✅ Vào":"⏳"}</button>
                   ${m.checkedIn?`<div style="font-size:10px;color:#bbb;margin-top:2px">${st(m.checkinTime)}</div>`:""}`}
                </td>
                <td>
                  <div style="display:flex;gap:2px;flex-wrap:wrap">
                    <button class="btn xs" onclick="openCpTicket('${l.id}','${m.id}')" title="Vé">🎫</button>
                    ${s?"":b?`<button class="btn xs" onclick="undoCancel('${l.id}','c','${m.id}')" style="color:#185FA5;border-color:#185FA5" title="Recall — người đi kèm quay lại">↩</button>`:`<button class="btn xs" onclick="openCancel('${l.id}','c','${m.id}')" style="color:#B91C1C;border-color:#FECACA" title="Cancel">🚫</button>`}
                    <button class="btn xs" onclick="openCpEdit('${l.id}','${m.id}')" title="Sửa thông tin">✏️</button>
                    ${s?"":`<button class="btn xs red" onclick="openCpDel('${l.id}','${m.id}')" title="Xoá">🗑️</button>`}
                  </div>
                </td>
              </tr>`}),v}).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${c.t>0?'<div style="text-align:right;margin-top:6px"><button class="btn sm" onclick="expCSV()">⬇️ Xuất CSV</button></div>':""}`}function Kt(){if(!d.events.length)return'<div class="empty">Chưa có dữ liệu.</div>';const n=`
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><div style="font-weight:700">📊 Tổng quan sự kiện</div><button id="refresh_btn" class="btn sm" onclick="doRefresh()">🔄 Làm mới</button></div>${`<select class="selx" style="min-width:220px" onchange="setRptEv(this.value)">
    <option value="">-- Tất cả sự kiện --</option>
    ${d.events.map(u=>`<option value="${u.id}" ${i.rptEv===u.id?"selected":""}>${u.name}${u.eventPw&&!i.unlockedEvs[u.id]?" 🔒":""}${W(u)?" 🔐":""}</option>`).join("")}
  </select>`}
      </div>
      ${d.events.map(u=>{const $=dt(u.id),E=$.t?Math.round($.c/$.t*100):0,P=u.eventPw&&!i.unlockedEvs[u.id];return`<div style="padding:10px 0;border-bottom:1px solid #f0f0f0">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
            <div><div style="font-weight:600;font-size:13px">${u.name}${P?" 🔒":""}</div>
              <div style="font-size:11px;color:#aaa">${N(u.date)}${u.team?" · "+u.team:""}</div></div>
            <div style="display:flex;gap:10px;align-items:center">
              <div style="text-align:center"><div style="font-size:15px;font-weight:700">${$.t}</div><div style="font-size:10px;color:#aaa">Tổng</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#3B6D11">${$.c}</div><div style="font-size:10px;color:#aaa">✅ Đã vào</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#aaa">${$.p}</div><div style="font-size:10px;color:#aaa">⏳ Chưa</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#B91C1C">${$.x}</div><div style="font-size:10px;color:#aaa">🚫 Cancel</div></div>
              <div style="width:60px">
                <div class="pb"><div class="pb-fill" style="width:${E}%;background:#3B6D11"></div></div>
                <div style="font-size:10px;text-align:center;color:#aaa;margin-top:2px">${E}%</div>
              </div>
            </div>
          </div>
        </div>`}).join("")}
    </div>`;if(!i.rptEv)return n+'<div class="empty" style="padding:24px">☝️ Chọn sự kiện ở trên để xem báo cáo chi tiết</div>';const c=d.events.find(u=>u.id===i.rptEv);if(c!=null&&c.eventPw&&!i.unlockedEvs[i.rptEv])return n+`<div class="card" style="text-align:center;padding:24px">
      <div style="font-size:24px;margin-bottom:8px">🔒</div>
      <div style="font-weight:700;margin-bottom:4px">Sự kiện được bảo vệ</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:14px">Nhập mật khẩu để xem báo cáo chi tiết</div>
      <button class="btn blue" onclick="S.evUnlockTarget='${i.rptEv}';S.modal='ev_unlock';R()">🔓 Nhập mật khẩu</button>
    </div>`;const o=Q(i.rptEv).map(u=>({name:u.name,code:u.guestCode,phone:u.phone,prmName:u.prmName,tcbRegion:u.tcbRegion,unit:u.unit,sihName:u.sihName,note:u.note,checkedIn:u.checkedIn,cancelled:u.cancelled,checkinTime:u.checkinTime,companions:u.companions||[]})),s=[];o.forEach(u=>{s.push({checkedIn:u.checkedIn,cancelled:u.cancelled,isMain:!0}),u.companions.forEach($=>s.push({checkedIn:$.checkedIn,cancelled:$.cancelled,isMain:!1}))});const a=o.length,l=o.filter(u=>u.checkedIn).length,r=o.filter(u=>u.cancelled).length,h=a-l-r,f=a>0?Math.round(l/a*100):0,g=s.length,v=o.length,m=g-v,b=s.filter(u=>u.checkedIn).length,y=l,_=b-y,I=y>0?Math.round(_/y*100)/100:0,w=o.filter(u=>u.walkin).length,H=`<div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">Tổng quan (Khách hàng - Main)</div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    ${U("Tổng KH mời (Main)","#185FA5",a,"")}
    ${U("✅ KH đã tới","#3B6D11",l,f+"% turnout")}
    ${U("⏳ KH chưa tới","#888",h,"")}
    ${U("🚫 KH cancel","#B91C1C",r,"")}
    ${w>0?U("🚶 Walk-in","#7C3AED",w,"trong tổng số Main"):""}
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
  <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">Tổng lượt tham dự thực tế (Main + Companion)</div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    ${U("Tổng lượt đăng ký","#185FA5",g,v+" Main + "+m+" Companion")}
    ${U("✅ Tổng đã vào sảnh","#3B6D11",b,y+" Main + "+_+" Companion")}
    ${U("Avg companion / Main đã vào","#888",I,"")}
  </div>`;function M(u){const $=u.companions||[];if(!$.length)return"";const E=$.map(T=>T.checkedIn?"-1":"+1");return`<span style="font-size:12px;font-weight:600;color:${E.every(T=>T==="-1")?"#e24b4a":E.every(T=>T==="+1")?"#3B6D11":"#aaa"};white-space:nowrap;margin-left:8px">${E.join(" ")}</span>`}function z(u,$,E,P){const T={};o.forEach(B=>{const k=P(B)||"Không xác định";T[k]||(T[k]=[]),T[k].push(B)});const K=Object.entries(T).sort((B,k)=>k[1].length-B[1].length);return K.length?`<div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin:16px 0 8px;text-transform:uppercase">${$} Theo ${u} (Main)</div>
      ${K.map(([B,k])=>{const S=k.filter(x=>x.checkedIn).length,L=k.filter(x=>x.cancelled).length,R=k.length-S-L,Y=k.length>0?Math.round(S/k.length*100):0,O=`${E}_${B}`,yt=!!i.rptExp[O+"_ci"],kt=!!i.rptExp[O+"_ab"],wt=!!i.rptExp[O+"_cn"];return`<div style="background:#fff;border-radius:12px;border:1px solid #eaecf0;padding:14px 16px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
            <div style="font-weight:700;font-size:13px">${B} <span style="font-weight:400;color:#aaa;font-size:11px">(${k.length} Main)</span></div>
            <div style="display:flex;gap:6px;font-size:12px;flex-wrap:wrap">
              <span onclick="togRpt('${O}_ci')" style="background:${S>0?"#eaf3de":"#f5f5f5"};color:${S>0?"#3B6D11":"#aaa"};border-radius:20px;padding:2px 10px;font-weight:600;cursor:${S>0?"pointer":"default"};user-select:none">
                Đã vào: ${S}${S>0?yt?" ▲":" ▼":""}
              </span>
              <span onclick="togRpt('${O}_ab')" style="background:${R>0?"#fdecea":"#f5f5f5"};color:${R>0?"#e24b4a":"#aaa"};border-radius:20px;padding:2px 10px;font-weight:600;cursor:${R>0?"pointer":"default"};user-select:none">
                Chưa: ${R}${R>0?kt?" ▲":" ▼":""}
              </span>
              ${L>0?`<span onclick="togRpt('${O}_cn')" style="background:#FEF2F2;color:#B91C1C;border-radius:20px;padding:2px 10px;font-weight:600;cursor:pointer;user-select:none">
                Cancel: ${L}${wt?" ▲":" ▼"}
              </span>`:""}
            </div>
          </div>
          <div style="background:#f0f0f0;border-radius:99px;height:8px;overflow:hidden">
            <div style="width:${Y}%;background:${Y===100?"#3B6D11":"linear-gradient(90deg,#185FA5,#3B6D11)"};height:100%;border-radius:99px"></div>
          </div>
          <div style="font-size:10px;color:#aaa;margin-top:4px;text-align:right">${Y}% Main đã check-in</div>
          ${yt&&S>0?`<div style="background:#f0faf0;border:1px solid #97C459;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#3B6D11;margin-bottom:6px">Đã check-in (${S} Main)</div>
            ${k.filter(x=>x.checkedIn).map(x=>`<div style="padding:5px 0;border-bottom:.5px solid #c8e6c9;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px">${x.name}${x.walkin?'<span style="font-size:9px;background:#EDE9FE;color:#7C3AED;padding:1px 5px;border-radius:6px;margin-left:4px">Walk-in</span>':""}</div>
                <div style="font-size:11px;color:#888">${x.code}${x.phone?" · "+x.phone:""}</div>
                <div style="font-size:10px;color:#3B6D11">✅ ${st(x.checkinTime)}</div>
              </div>
              ${M(x)}
            </div>`).join("")}
          </div>`:""}
          ${kt&&R>0?`<div style="background:#fff8f8;border:1px solid #fdd;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#e24b4a;margin-bottom:6px">Chưa check-in (${R} Main)</div>
            ${k.filter(x=>!x.checkedIn&&!x.cancelled).map(x=>`<div style="padding:5px 0;border-bottom:.5px solid #fdd;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px">${x.name}</div>
                <div style="font-size:11px;color:#888">${x.code}${x.phone?" · "+x.phone:""}</div>
              </div>
              ${M(x)}
            </div>`).join("")}
          </div>`:""}
          ${wt&&L>0?`<div style="background:#FFF8F8;border:1px solid #FECACA;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#B91C1C;margin-bottom:6px">Đã cancel (${L} Main)</div>
            ${k.filter(x=>x.cancelled).map(x=>`<div style="padding:5px 0;border-bottom:.5px solid #FECACA;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px;text-decoration:line-through;color:#bbb">${x.name}</div>
                <div style="font-size:11px;color:#aaa">${x.code}${x.phone?" · "+x.phone:""}</div>
                ${x.note?`<div style="font-size:10px;color:#B91C1C;font-style:italic">${x.note}</div>`:""}
              </div>
              ${M(x)}
            </div>`).join("")}
          </div>`:""}
        </div>`}).join("")}`:""}const V=z("Vùng TCB","🏦","vung",u=>u.tcbRegion),A=z("Chi nhánh","🏢","unit",u=>u.unit),q=z("SIH","👤","sih",u=>u.sihName),X=z("PRM","🤝","prm",u=>u.prmName);return n+H+V+A+q+X}function U(t,e,n,c){return`<div style="flex:1;min-width:120px;background:#fff;border-radius:12px;padding:14px 16px;border-left:4px solid ${e};border:1px solid #eaecf0;border-left-width:4px">
    <div style="font-size:11px;color:#888;margin-bottom:4px">${t}</div>
    <div style="font-size:28px;font-weight:800;color:${e};line-height:1">${n}</div>
    ${c?`<div style="font-size:11px;color:#aaa;margin-top:4px">${c}</div>`:""}
  </div>`}function Ut(t){i.rptExp[t]=!i.rptExp[t],p()}function jt(t){if(t){const e=d.events.find(n=>n.id===t);if(e!=null&&e.eventPw&&!i.unlockedEvs[t]){i.evUnlockTarget=t,i.rptEv=t,i.modal="ev_unlock",p();return}}i.rptEv=t||null,i.rptExp={},p()}function Wt(){const t=(e,n)=>`<div class="ov" onclick="closeM()"><div class="modal ${n||""}" onclick="event.stopPropagation()">${e}</div></div>`;return i.modal==="add_ev"||i.modal==="edit_ev"?t(qt(),"lg"):i.modal==="add_g"||i.modal==="edit_g"?t(Xt(),"lg"):i.modal==="tickets"?t(Qt(),"lg"):i.modal==="edit_pw"?t(Zt(),"sm"):i.modal==="edit_form"?t(Yt(),"lg"):i.modal==="del_pw"?t(te(),"sm"):i.modal==="cp_ticket"?t(ee(),"sm"):i.modal==="cp_edit"?t(ne(),"sm"):i.modal==="cp_del"?t(ie(),"sm"):i.modal==="cp_add"?t(oe()):i.modal==="admin_ci"?t(ce(),"sm"):i.modal==="cancel"?t(se(),"sm"):i.modal==="ev_unlock"?t(le(),"sm"):i.modal==="import_preview"?t(de(),"lg"):i.modal==="walkin"?t(un(),"lg"):""}function qt(){const t=i.modal==="edit_ev",e=t?d.events.find(c=>c.id===i.editEvId):{},n=(e==null?void 0:e.btcMembers)||[{code:"",name:""}];return`<div class="mh">${t?"✏️ Chỉnh sửa sự kiện":"📅 Tạo sự kiện mới"}</div>
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
    </div>`}function Xt(){var n;const t=i.modal==="edit_g"&&i.editGid?d.guests.find(c=>c.id===i.editGid):{},e=(n=t==null?void 0:t.companions)!=null&&n.length?t.companions:[{name:"",phone:""}];return`<div class="mh">${i.modal==="edit_g"?"✏️ Chỉnh sửa khách mời":"👤 Thêm khách mời mới"}</div>
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
      ${e.map((c,o)=>{var s,a;return Jt(c,o,(a=(s=t==null?void 0:t.companions)==null?void 0:s[o])==null?void 0:a.code)}).join("")}
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
    </div>`}function Jt(t,e,n){return`<div class="cp-r" id="cr_${e}">
    <div class="g2" style="margin-bottom:0">
      <div class="fg" style="margin-bottom:0"><label>Họ tên người đi kèm ${e+1}</label>
        <input placeholder="Họ và tên" id="cn_${e}" value="${t.name||""}"/></div>
      <div class="fg" style="margin-bottom:0"><label>Số điện thoại</label>
        <input placeholder="09xxxxxxxx" type="tel" id="cp_${e}" value="${t.phone||""}"/></div>
    </div>
    ${n?`<div style="margin-top:6px;font-size:11px;color:#aaa">Mã: <span class="mono">${n}</span> (cố định)</div>`:""}
    ${e>0?`<button class="btn xs red" onclick="rmCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`:""}
  </div>`}function Qt(){var c;const t=d.guests.find(o=>o.id===i.ticketGid);if(!t)return"";const e=d.events.find(o=>o.id===t.eventId),n=[{type:"main",name:t.name,code:t.guestCode,phone:t.phone},...(t.companions||[]).map(o=>({type:"comp",name:o.name,code:o.code,phone:o.phone,parentName:t.name}))];return`<div class="mh">🎫 Vé tham dự sự kiện</div>
    <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(e==null?void 0:e.name)||""} · ${N(e==null?void 0:e.date)}</div>
    <div style="font-size:12px;color:#bbb;margin-bottom:16px">${n.length} vé · 1 KH chính${(c=t.companions)!=null&&c.length?" + "+t.companions.length+" đi kèm":""}</div>
    <div class="tgrid">
      ${n.map((o,s)=>`
        <div class="ticket">
          <div class="tk-header">VÉ THAM DỰ SỰ KIỆN</div>
          <div style="font-size:11px;color:#bbb;margin-bottom:6px">${(e==null?void 0:e.name)||""}</div>
          <div style="font-size:11px;color:#bbb;margin-bottom:12px">${N(e==null?void 0:e.date)}${e!=null&&e.venue?" · "+e.venue:""}</div>
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
    </div>`}function Zt(){return`<div class="mh">✏️ Xác nhận chỉnh sửa</div>
    <div style="font-size:13px;color:#888;margin-bottom:12px">Nhập mật khẩu Admin để chỉnh sửa thông tin khách.</div>
    <div class="fg"><label>Mật khẩu Admin</label>
      <input type="password" id="epw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')chkEditPw()"/></div>
    <div id="epw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="chkEditPw()">Tiếp tục →</button>
    </div>`}function Yt(){var n;const t=d.guests.find(c=>c.id===i.editGid);if(!t)return"";const e=(n=t.companions)!=null&&n.length?t.companions:[{name:"",phone:"",code:""}];return`<div class="mh">✏️ Chỉnh sửa — ${t.name}</div>
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
    </div>`}function te(){const t=d.guests.find(e=>e.id===i.delGid);return`<div class="mh">🗑️ Xoá khách hàng</div>
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
    </div>`}function ee(){const{gid:t,cpId:e}=i.cpTicket||{},n=d.guests.find(s=>s.id===t),c=((n==null?void 0:n.companions)||[]).find(s=>s.id===e);if(!n||!c)return"";const o=d.events.find(s=>s.id===n.eventId);return`<div class="mh">🎫 Vé người đi kèm</div>
    <div class="ticket" style="margin:8px 0">
      <div class="tk-header">VÉ THAM DỰ SỰ KIỆN</div>
      <div style="font-size:11px;color:#bbb;margin-bottom:6px">${(o==null?void 0:o.name)||""}</div>
      <div style="font-size:11px;color:#bbb;margin-bottom:12px">${N(o==null?void 0:o.date)}${o!=null&&o.venue?" · "+o.venue:""}</div>
      <div class="tk-name">${c.name}</div>
      <span class="tk-role b-purple">Đi kèm: ${n.name}</span>
      <div class="tk-qr" id="cp_tqr"></div>
      <div class="tk-code">${c.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <div class="mf" style="justify-content:center">
      <button class="btn sm" onclick="dlCpTicket()">⬇️ Tải vé này</button>
      <button class="btn" onclick="closeM()">Đóng</button>
    </div>`}function ne(){const{gid:t,cpId:e}=i.cpEdit||{},n=d.guests.find(o=>o.id===t),c=((n==null?void 0:n.companions)||[]).find(o=>o.id===e);return!n||!c?"":`<div class="mh">✏️ Sửa người đi kèm</div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Mã: <span class="mono">${c.code}</span> (cố định)</div>
    <div class="fg"><label>Họ và tên</label>
      <input id="cpe_n" value="${c.name}" autofocus/></div>
    <div class="fg"><label>Số điện thoại</label>
      <input id="cpe_ph" type="tel" value="${c.phone||""}"/></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn green" onclick="doCpEdit()">💾 Lưu</button>
    </div>`}function ie(){const{gid:t,cpId:e}=i.cpDel||{},n=d.guests.find(o=>o.id===t),c=((n==null?void 0:n.companions)||[]).find(o=>o.id===e);return!n||!c?"":`<div class="mh">🗑️ Xoá người đi kèm</div>
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
    </div>`}function oe(){const t=d.guests.find(e=>e.id===i.cpAdd);return t?`<div class="mh">👤 Thêm người đi kèm</div>
    <div style="font-size:13px;color:#888;margin-bottom:14px">Thêm cho: <b>${t.name}</b> <span class="mono">${t.guestCode}</span></div>
    <div class="fg"><label>Họ và tên *</label>
      <input id="cpa_n" placeholder="Họ và tên người đi kèm" autofocus/></div>
    <div class="fg"><label>Số điện thoại</label>
      <input id="cpa_ph" type="tel" placeholder="09xxxxxxxx"/></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="doCpAdd()">✅ Thêm & Tạo vé</button>
    </div>`:""}function ce(){var a;const{gid:t,type:e,cpId:n}=i.adminCI||{},c=d.guests.find(l=>l.id===t);if(!c)return"";const o=e==="c"?(c.companions||[]).find(l=>l.id===n):c;if(!o)return"";d.events.find(l=>l.id===c.eventId);const s=!!o.phone;return`<div class="mh">✅ Xác nhận Check-in</div>
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
      </div>`}`}function se(){const{gid:t,type:e,cpId:n}=i.cancelTarget||{},c=d.guests.find(s=>s.id===t);if(!c)return"";const o=e==="c"?(c.companions||[]).find(s=>s.id===n):c;return o?`<div class="mh">🚫 Đánh dấu Cancel</div>
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
    </div>`:""}function le(){const t=d.events.find(e=>e.id===i.evUnlockTarget);return t?`<div class="mh">🔒 Nhập mật khẩu sự kiện</div>
    <div style="background:#f4f7fb;border-radius:10px;padding:14px;margin-bottom:16px">
      <div style="font-size:15px;font-weight:700">${t.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:3px">${N(t.date)}${t.team?" · "+t.team:""}</div>
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
    </div>`:""}function ae(){var c;const t=d.events.find(o=>o.id===i.evUnlockTarget);if(!t)return;if((((c=document.getElementById("ev_unlock_pw"))==null?void 0:c.value)||"")!==t.eventPw){const o=document.getElementById("ev_unlock_err");o&&(o.textContent="⚠️ Mật khẩu không đúng.");const s=document.getElementById("ev_unlock_pw");s&&(s.value="",s.focus());return}i.unlockedEvs[i.evUnlockTarget]=!0;const n=i.evUnlockTarget;if(i.evUnlockTarget=null,i.modal=null,i.rptEv===n){p();return}i.selEv=n,i.tab="guests",i.search="",i.filter="all",p()}function de(){const t=i.importData||[];return`
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
  `}function re(){const t=i.urlCode;let e=null;for(const a of d.guests){if(a.guestCode===t){e={type:"guest",guest:a,person:a};break}for(const l of a.companions||[])if(l.code===t){e={type:"comp",guest:a,person:l};break}if(e)break}const n=e?d.events.find(a=>{var l;return a.id===((l=e==null?void 0:e.guest)==null?void 0:l.eventId)}):null;if(!e)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
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
      <div style="font-size:12px;color:#bbb;margin-top:12px">Ghi nhận lúc: ${tt(c.checkinTime)}</div>
      ${i.urlCISyncWarn?`<div style="margin-top:14px;background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:10px;text-align:left">
        ⚠️ Đã ghi nhận check-in trên thiết bị này, nhưng <b>chưa đồng bộ được lên hệ thống trung tâm</b> (có thể do mất mạng).
        Vui lòng báo BTC kỹ thuật kiểm tra lại để đảm bảo dữ liệu được cập nhật đầy đủ.
      </div>`:""}
      <div style="margin-top:24px"><button onclick="window.close()" style="padding:10px 24px;background:#185FA5;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-family:'Be Vietnam Pro',sans-serif">Đóng</button></div>
    </div>`;if(c.checkedIn)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">⚠️</div>
      <div style="font-size:18px;font-weight:700;color:#BA7517;margin-bottom:8px">Vé đã được sử dụng</div>
      <div style="font-size:15px;font-weight:600">${c.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:6px">Check-in lúc: ${tt(c.checkinTime)}</div>
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
      <div style="font-size:13px;color:#aaa">${N(n==null?void 0:n.date)}${n!=null&&n.venue?" · "+n.venue:""}</div>
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
  </div>`}function pe(){setTimeout(()=>{const t=document.getElementById("uci_phone")||document.getElementById("uci_btc");t&&t.focus()},80)}async function me(){var g,v;const t=i.urlCode;let e=null;for(const m of d.guests){if(m.guestCode===t){e={type:"guest",guest:m,person:m};break}for(const b of m.companions||[])if(b.code===t){e={type:"comp",guest:m,person:b};break}if(e)break}if(!e)return;const n=e.person,c=e.guest,o=d.events.find(m=>m.id===c.eventId);if(W(o)){const m=document.getElementById("uci_err");m&&(m.textContent="⚠️ Sự kiện đã kết thúc. Không thể check-in.");return}const s=(((g=document.getElementById("uci_btc"))==null?void 0:g.value)||"").toUpperCase().trim();if(!((o==null?void 0:o.btcMembers)||[]).find(m=>m.code===s)){const m=document.getElementById("uci_err");m&&(m.textContent="⚠️ Mã BTC không đúng hoặc không thuộc sự kiện này.");return}const l=n.phone?n.phone.replace(/\D/g,"").slice(-4):"";if(l&&(((v=document.getElementById("uci_phone"))==null?void 0:v.value)||"").trim()!==l){const b=document.getElementById("uci_err");b&&(b.textContent="⚠️ 4 số cuối SĐT không khớp.");const y=document.getElementById("uci_phone");y&&(y.value="",y.focus());return}if(i.urlCIBusy)return;i.urlCIBusy=!0,p();const r=new Date().toISOString();e.type==="guest"?(c.checkedIn=!0,c.checkinTime=r,c.checkinBy=s):(n.checkedIn=!0,n.checkinTime=r,n.checkinBy=s),C();const h=e.type==="guest"?{checked_in:!0,checkin_time:r,checkin_by:s}:{companions:c.companions||[]},f=await D(c.id,h);i.urlCIBusy=!1,i.urlCISyncWarn=!f,i.urlCIStep="done",p()}function ue(){if(!i.ciOk)return ge();if(!i.ciState)return $t();const t=i.ciState;return t.step==="verify"?fe():t.step==="done"?ve():t.step==="err"?be():$t()}function he(){setTimeout(()=>{const t=document.getElementById("ci_in")||document.getElementById("ci_ph")||document.getElementById("lock_c");t&&t.focus()},80)}function ge(){return`<div class="lock">
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:40px">🔐</div>
      <div style="font-size:17px;font-weight:800;margin-top:8px">Đăng nhập Check-in</div>
      <div style="font-size:13px;color:#aaa;margin-top:4px">Chọn sự kiện và nhập mã nhân viên BTC</div>
    </div>
    <div class="fg"><label>Sự kiện</label><select id="lock_ev" style="width:100%" onchange="S.ciEv=this.value">
      <option value="">-- Chọn sự kiện --</option>
      ${d.events.map(t=>`<option value="${t.id}" ${i.ciEv===t.id?"selected":""}>${t.name} (${N(t.date)})</option>`).join("")}
    </select></div>
    <div class="fg"><label>Mã nhân viên BTC</label>
      <input id="lock_c" placeholder="VD: NV001" style="text-transform:uppercase;font-family:'JetBrains Mono',monospace;letter-spacing:2px;font-size:16px;text-align:center;padding:12px"
        onkeydown="if(event.key==='Enter')tryUnlock()"/></div>
    <button class="btn blue full" onclick="tryUnlock()">Vào hệ thống →</button>
    <div id="lock_err" class="err" style="text-align:center;margin-top:8px"></div>
    <div style="text-align:center;margin-top:166px"><button class="btn ghost" onclick="backAdmin()">← Về trang quản trị</button></div>
  </div>`}function $t(){var o;const t=d.events.find(s=>s.id===i.ciEv),e=dt(i.ciEv),n=Q(i.ciEv),c=[];return n.forEach(s=>{s.checkedIn&&c.push({name:s.name,code:s.guestCode,time:s.checkinTime,tag:"KH"}),(s.companions||[]).forEach(a=>{a.checkedIn&&c.push({name:a.name,code:a.code,time:a.checkinTime,tag:"ĐK"})})}),c.sort((s,a)=>new Date(a.time)-new Date(s.time)),`<div class="ci-screen">
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
        <div style="font-size:11px;color:#3B6D11;font-weight:600">${st(s.time)}</div>
      </div>`).join("")}
    </div>`:""}
  </div>`}function fe(){const t=i.ciState,e=t.person,n=t.guest;return`<div class="ci-screen">
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
  </div>`}function ve(){const t=i.ciState,e=t.person,n=t.guest,c=d.events.find(o=>o.id===n.eventId);return`<div class="ci-screen"><div class="big-result">
    <div class="icon">🎉</div>
    <div style="font-size:22px;font-weight:800;color:#0C447C;margin-bottom:10px">Check-in thành công!</div>
    <div style="font-size:17px;font-weight:600;color:#185FA5;margin-bottom:4px">${e.name}</div>
    ${t.type==="comp"?`<div style="margin-bottom:4px"><span class="badge b-purple">Đi kèm: ${n.name}</span></div>`:""}
    <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(c==null?void 0:c.name)||""}</div>
    ${t.type==="guest"&&(n.companions||[]).length?`<div style="font-size:12px;color:#BA7517;margin-top:10px;padding:8px 16px;background:#FFFBEB;border-radius:8px;display:inline-block">⚠️ ${n.companions.length} người đi kèm cần check-in riêng</div>`:""}
    ${n.note?`<div style="margin-top:10px;display:inline-block"><span class="badge b-amber">${n.note}</span></div>`:""}
    <div style="font-size:12px;color:#bbb;margin-top:12px">Ghi nhận lúc: ${tt(e.checkinTime)} · BTC: ${e.checkinBy||"—"}</div>
    ${i.ciSyncWarn?`<div style="margin-top:14px;background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:10px;text-align:left;max-width:360px;margin-left:auto;margin-right:auto">
      ⚠️ Đã ghi nhận check-in trên thiết bị này, nhưng <b>chưa đồng bộ được lên hệ thống trung tâm</b> (có thể do mất mạng).
      Vui lòng kiểm tra lại kết nối và báo kỹ thuật nếu tình trạng tiếp diễn.
    </div>`:""}
    <div style="margin-top:24px">
      <button class="btn blue" onclick="nextCI()" style="padding:12px 32px;font-size:15px">📷 Scan vé tiếp theo</button>
    </div>
  </div></div>`}function be(){return`<div class="ci-screen"><div class="big-result">
    <div class="icon">❌</div>
    <div style="font-size:18px;font-weight:700;color:#a32d2d;margin-bottom:8px">Xác minh thất bại</div>
    <div style="font-size:13px;color:#888;max-width:280px;margin:0 auto">${i.ciState.msg||"Thông tin không khớp"}</div>
    <div style="margin-top:20px"><button class="btn" onclick="cancelCI()" style="padding:10px 24px">← Thử lại</button></div>
  </div></div>`}function xe(t){i.tab=t,p()}function ye(t){const e=d.events.find(n=>n.id===t);if(e){if(e.eventPw&&!i.unlockedEvs[t]){i.evUnlockTarget=t,i.modal="ev_unlock",p();return}i.selEv=t,i.tab="guests",i.search="",i.filter="all",p()}}function ke(t){if(!t){i.selEv=null,i.search="",i.filter="all",p();return}const e=d.events.find(n=>n.id===t);if(e){if(e.eventPw&&!i.unlockedEvs[t]){i.evUnlockTarget=t,i.modal="ev_unlock",p();return}i.selEv=t,i.search="",i.filter="all",p()}}function we(t){i.search=t,p()}function $e(t){i.filter=t,p()}function Ce(t){i.modal=t,p()}function _e(t){i.editGid=t,i.modal="edit_pw",p()}function Ee(t){i.delGid=t,i.modal="del_pw",p()}function Ie(t){i.ticketGid=t,i.modal="tickets",p()}function et(){i.modal=null,i.editGid=null,i.delGid=null,i.cpTicket=null,i.cpEdit=null,i.cpDel=null,i.cpAdd=null,i.adminCI=null,i.cancelTarget=null,i.evUnlockTarget=null,i.editEvId=null,i.importData=null,p()}function Te(){const t=Z(i.selEv);if(!xt(t)){alert("Walk-in chỉ khả dụng đúng ngày tổ chức sự kiện ("+N(t==null?void 0:t.date)+").");return}i.modal="walkin",p()}function Be(t){const e=d.events.find(n=>n.id===t);if(e){if(e.eventPw&&!i.unlockedEvs[t]){i.evUnlockTarget=t,i.modal="ev_unlock",p();return}i.editEvId=t,i.modal="edit_ev",p()}}function Me(t,e){i.cpTicket={gid:t,cpId:e},i.modal="cp_ticket",p(),setTimeout(()=>nt(),120)}function ze(t,e){i.cpEdit={gid:t,cpId:e},i.modal="cp_edit",p()}function Se(t,e){i.cpDel={gid:t,cpId:e},i.modal="cp_del",p()}function Ne(t){i.cpAdd=t,i.modal="cp_add",p()}function He(t,e,n){i.cancelTarget={gid:t,type:e,cpId:n||null},i.modal="cancel",p()}async function Ae(){var l;const{gid:t,type:e,cpId:n}=i.cancelTarget||{},c=d.guests.find(r=>r.id===t);if(!c)return;if(W(Z(c.eventId))){alert("Sự kiện đã kết thúc. Không thể thay đổi."),et();return}const o=(((l=document.getElementById("cancel_note"))==null?void 0:l.value)||"").trim();let s;if(e==="c"){const r=(c.companions||[]).find(h=>h.id===n);r&&(r.cancelled=!0,r.cancelNote=o,r.checkedIn=!1,r.checkinTime=null),s={companions:c.companions}}else c.cancelled=!0,c.cancelNote=o,c.checkedIn=!1,c.checkinTime=null,(c.companions||[]).forEach(r=>{r.cancelled=!0,r.cancelNote=o?`[Theo KH chính] ${o}`:"Theo KH chính",r.checkedIn=!1,r.checkinTime=null}),s={cancelled:!0,cancel_note:o,checked_in:!1,checkin_time:null,companions:c.companions};C(),i.modal=null,i.cancelTarget=null,p(),await D(c.id,s)||alert('⚠️ Đã ghi nhận Cancel trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function Re(t,e,n){const c=d.guests.find(a=>a.id===t);if(!c)return;let o;if(e==="c"){const a=(c.companions||[]).find(l=>l.id===n);a&&(a.cancelled=!1,a.cancelNote=""),o={companions:c.companions}}else c.cancelled=!1,c.cancelNote="",(c.companions||[]).forEach(a=>{a.cancelled=!1,a.cancelNote=""}),o={cancelled:!1,cancel_note:"",companions:c.companions};C(),p(),await D(c.id,o)||alert('⚠️ Đã khôi phục (Huỷ Cancel) trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function De(){i.view="checkin",i.ciOk=!1,i.ciEv=null,i.ciOp=null,i.ciState=null,p()}function Ve(){i.view="admin",i.ciOk=!1,i.ciState=null,p()}function Le(){i.ciOk=!1,i.ciOp=null,i.ciState=null,p()}function Pe(){i.ciState=null,i.ciSyncWarn=!1,p()}function Fe(){i.ciState=null,i.ciSyncWarn=!1,p()}function Oe(){const t=document.getElementById("btc_w");if(!t)return;const e=t.querySelectorAll(".btc-r").length,n=document.createElement("div");n.className="btc-r",n.id="br_"+e,n.innerHTML=`<input placeholder="Mã NV" id="bc_${e}" style="max-width:110px;font-family:'JetBrains Mono',monospace;text-transform:uppercase"/>
    <input placeholder="Họ tên BTC" id="bn_${e}"/>
    <button class="btn xs red" onclick="rmBR(${e})" style="flex-shrink:0">✕</button>`,t.appendChild(n)}function Ge(t){const e=document.getElementById("br_"+t);e&&e.remove()}function Ke(){const t=document.getElementById("btc_w");if(!t)return[];const e=[];return t.querySelectorAll(".btc-r").forEach(n=>{var s,a;const c=(((s=n.querySelector("input:first-child"))==null?void 0:s.value)||"").toUpperCase().trim(),o=(((a=n.querySelector("input:nth-child(2)"))==null?void 0:a.value)||"").trim();c&&o&&e.push({code:c,name:o})}),e}function Ue(){const t=document.getElementById("cp_w");if(!t)return;const e=t.querySelectorAll(".cp-r").length,n=document.createElement("div");n.id="cr_"+e,n.className="cp-r",n.innerHTML=`<div class="g2" style="margin-bottom:0">
    <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${e+1}</label><input id="cn_${e}" placeholder="Họ và tên"/></div>
    <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="cp_${e}" type="tel" placeholder="09xxxxxxxx"/></div>
  </div><button class="btn xs red" onclick="rmCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`,document.getElementById("cp_w").appendChild(n)}function je(t){const e=document.getElementById("cr_"+t);e&&e.remove()}function We(t){const e=document.getElementById("cp_w");if(!e)return[];const n=[];return e.querySelectorAll(".cp-r").forEach(c=>{var r,h;const o=c.id.replace(/[^0-9]/g,""),s="c",a=(((r=document.getElementById(s+"n_"+o))==null?void 0:r.value)||"").trim(),l=(((h=document.getElementById(s+"p_"+o))==null?void 0:h.value)||"").trim();a&&n.push({name:a,phone:l})}),n}async function qe(){var h,f,g,v,m,b,y,_,I;const t=i.modal==="edit_ev",e=(f=(h=document.getElementById("ev_n"))==null?void 0:h.value)==null?void 0:f.trim(),n=(g=document.getElementById("ev_d"))==null?void 0:g.value,c=(m=(v=document.getElementById("ev_t"))==null?void 0:v.value)==null?void 0:m.trim(),o=(y=(b=document.getElementById("ev_v"))==null?void 0:b.value)==null?void 0:y.trim(),s=(((_=document.getElementById("ev_pw"))==null?void 0:_.value)||"").trim(),a=(((I=document.getElementById("ev_pw2"))==null?void 0:I.value)||"").trim(),l=Ke();if(!e){alert("Vui lòng nhập tên sự kiện");return}if(!l.length){alert("Cần ít nhất 1 thành viên BTC");return}const r=document.getElementById("ev_pw_err");if(t){if(s&&s!==a){r&&(r.textContent="⚠️ Mật khẩu nhập lại không khớp");return}const w=d.events.findIndex(A=>A.id===i.editEvId);if(w<0)return;const H=d.events[w],M=s||H.eventPw;d.events[w]={...H,name:e,date:n,team:c,venue:o,eventPw:M,btcMembers:l},s&&(i.unlockedEvs[i.editEvId]=!0);const z=i.editEvId;C(),i.modal=null,i.editEvId=null,p(),await zt(z,{name:e,date_str:n||null,team:c||null,venue:o||null,event_pw:M,btc_members:l})||alert('⚠️ Đã lưu sự kiện trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}else{if(!s){r&&(r.textContent="⚠️ Vui lòng đặt mật khẩu cho sự kiện");return}if(s!==a){r&&(r.textContent="⚠️ Mật khẩu nhập lại không khớp");return}const w={id:F(),name:e,date:n,team:c,venue:o,eventPw:s,btcMembers:l,createdAt:Date.now()};d.events.push(w),i.unlockedEvs[w.id]=!0,i.selEv=w.id,C(),i.modal=null,i.tab="guests",p(),await vt("oh_events",Tt(w))||alert('⚠️ Đã tạo sự kiện trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi gửi link cho người khác.')}}function Xe(t){confirm("Xoá sự kiện này? Toàn bộ khách cũng bị xoá.")&&(d.events=d.events.filter(e=>e.id!==t),d.guests=d.guests.filter(e=>e.eventId!==t),i.selEv===t&&(i.selEv=null),C(),_t("oh_events",t),p())}async function Je(){var y,_,I,w,H,M,z,V,A,q,X,u,$,E,P,T,K;const t=(y=document.getElementById("g_ev"))==null?void 0:y.value,e=(I=(_=document.getElementById("g_n"))==null?void 0:_.value)==null?void 0:I.trim(),n=(H=(w=document.getElementById("g_ph"))==null?void 0:w.value)==null?void 0:H.trim(),c=(z=(M=document.getElementById("g_syscode"))==null?void 0:M.value)==null?void 0:z.trim(),o=(A=(V=document.getElementById("g_prm"))==null?void 0:V.value)==null?void 0:A.trim(),s=(X=(q=document.getElementById("g_reg"))==null?void 0:q.value)==null?void 0:X.trim(),a=($=(u=document.getElementById("g_unit"))==null?void 0:u.value)==null?void 0:$.trim(),l=(P=(E=document.getElementById("g_sih"))==null?void 0:E.value)==null?void 0:P.trim(),r=(K=(T=document.getElementById("g_note"))==null?void 0:T.value)==null?void 0:K.trim();if(!e){alert("Vui lòng nhập họ tên KH");return}if(!t){alert("Vui lòng chọn sự kiện");return}if(W(Z(t))&&i.modal!=="edit_g"){alert("Sự kiện đã kết thúc. Không thể thêm khách mới."),et();return}const h=We();let f=!1,g=null,v=null;if(i.modal==="edit_g"&&i.editGid){const B=d.guests.findIndex(k=>k.id===i.editGid);if(B>-1){const k=d.guests[B],S=k.companions||[],L=h.map(R=>{const Y=S.find(O=>O.name===R.name&&O.code);return Y?{...Y,phone:R.phone}:{id:F(),name:R.name,phone:R.phone,code:G(t),checkedIn:!1,checkinTime:null,checkinBy:null}});d.guests[B]={...k,eventId:t,name:e,phone:n,systemCode:c,prmName:o,tcbRegion:s,unit:a,sihName:l,note:r,companions:L},i.ticketGid=i.editGid,f=!0,g={name:e,phone:n,system_code:c,prm_name:o,tcb_region:s,unit:a,sih_name:l,note:r,companions:L}}}else{const B=G(t),k=h.map(L=>({id:F(),name:L.name,phone:L.phone,code:G(t),checkedIn:!1,checkinTime:null,checkinBy:null})),S={id:F(),eventId:t,guestCode:B,systemCode:c,name:e,phone:n,prmName:o,tcbRegion:s,unit:a,sihName:l,note:r,companions:k,checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()};d.guests.push(S),i.ticketGid=S.id,v=S}i.selEv=t,C(),i.editGid=null,i.modal="tickets",p();const m=i.ticketGid;(f?await D(m,g):await vt("oh_guests",ft(v)))||alert('⚠️ Đã lưu khách trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi phát vé.')}function Qe(){var e;if((((e=document.getElementById("epw"))==null?void 0:e.value)||"")===lt)i.modal="edit_form",p();else{const n=document.getElementById("epw_err");n&&(n.textContent="⚠️ Mật khẩu không đúng.")}}async function Ze(){var v,m,b,y,_,I,w,H,M,z,V,A,q,X,u,$;const t=d.guests.find(E=>E.id===i.editGid);if(!t)return;const e=d.guests.indexOf(t),n=((m=(v=document.getElementById("eg_n"))==null?void 0:v.value)==null?void 0:m.trim())||t.name,c=((y=(b=document.getElementById("eg_ph"))==null?void 0:b.value)==null?void 0:y.trim())||t.phone,o=(I=(_=document.getElementById("eg_syscode"))==null?void 0:_.value)==null?void 0:I.trim(),s=(H=(w=document.getElementById("eg_prm"))==null?void 0:w.value)==null?void 0:H.trim(),a=(z=(M=document.getElementById("eg_reg"))==null?void 0:M.value)==null?void 0:z.trim(),l=(A=(V=document.getElementById("eg_unit"))==null?void 0:V.value)==null?void 0:A.trim(),r=(X=(q=document.getElementById("eg_sih"))==null?void 0:q.value)==null?void 0:X.trim(),h=($=(u=document.getElementById("eg_note"))==null?void 0:u.value)==null?void 0:$.trim(),f=(t.companions||[]).map((E,P)=>{var T,K,B,k;return{...E,name:((K=(T=document.getElementById("ecn_"+P))==null?void 0:T.value)==null?void 0:K.trim())||E.name,phone:((k=(B=document.getElementById("ecp_"+P))==null?void 0:B.value)==null?void 0:k.trim())||E.phone}});d.guests[e]={...t,name:n,phone:c,systemCode:o,prmName:s,tcbRegion:a,unit:l,sihName:r,note:h,companions:f},C(),i.modal=null,i.editGid=null,p(),await D(t.id,{name:n,phone:c,system_code:o,prm_name:s,tcb_region:a,unit:l,sih_name:r,note:h,companions:f})||alert('⚠️ Đã lưu thay đổi trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function Ye(){var n;if((((n=document.getElementById("dpw"))==null?void 0:n.value)||"")!==lt){const c=document.getElementById("dpw_err");c&&(c.textContent="⚠️ Mật khẩu không đúng.");return}const e=i.delGid;d.guests=d.guests.filter(c=>c.id!==e),C(),_t("oh_guests",e),i.modal=null,i.delGid=null,p()}async function tn(){var r,h,f,g;const{gid:t,cpId:e}=i.cpEdit||{},n=d.guests.find(v=>v.id===t);if(!n)return;const c=d.guests.indexOf(n),o=(n.companions||[]).findIndex(v=>v.id===e);if(o<0)return;const s=(h=(r=document.getElementById("cpe_n"))==null?void 0:r.value)==null?void 0:h.trim(),a=(g=(f=document.getElementById("cpe_ph"))==null?void 0:f.value)==null?void 0:g.trim();if(!s){alert("Vui lòng nhập họ tên");return}d.guests[c].companions[o]={...d.guests[c].companions[o],name:s,phone:a},C(),i.modal=null,i.cpEdit=null,p(),await D(n.id,{companions:d.guests[c].companions})||alert('⚠️ Đã sửa người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function en(){var s;if((((s=document.getElementById("cpdpw"))==null?void 0:s.value)||"")!==lt){const a=document.getElementById("cpdpw_err");a&&(a.textContent="⚠️ Mật khẩu không đúng.");return}const{gid:e,cpId:n}=i.cpDel||{},c=d.guests.findIndex(a=>a.id===e);if(c<0)return;d.guests[c].companions=(d.guests[c].companions||[]).filter(a=>a.id!==n),C(),i.modal=null,i.cpDel=null,p(),await D(d.guests[c].id,{companions:d.guests[c].companions})||alert('⚠️ Đã xoá người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}async function nn(){var a,l,r,h;const t=i.cpAdd,e=d.guests.findIndex(f=>f.id===t);if(e<0)return;const n=(l=(a=document.getElementById("cpa_n"))==null?void 0:a.value)==null?void 0:l.trim(),c=(h=(r=document.getElementById("cpa_ph"))==null?void 0:r.value)==null?void 0:h.trim();if(!n){alert("Vui lòng nhập họ tên");return}const o={id:F(),name:n,phone:c,code:G(d.guests[e].eventId),checkedIn:!1,checkinTime:null,checkinBy:null};d.guests[e].companions||(d.guests[e].companions=[]),d.guests[e].companions.push(o),C(),i.cpTicket={gid:t,cpId:o.id},i.cpAdd=null,i.modal="cp_ticket",p(),setTimeout(()=>nt(),120),await D(d.guests[e].id,{companions:d.guests[e].companions})||alert('⚠️ Đã thêm người đi kèm trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.')}function nt(){const{gid:t,cpId:e}=i.cpTicket||{},n=d.guests.find(s=>s.id===t),c=((n==null?void 0:n.companions)||[]).find(s=>s.id===e);if(!c)return;const o=document.getElementById("cp_tqr");if(o){o.innerHTML="";try{new QRCode(o,{text:ct(c.code),width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}catch{o.innerHTML='<div style="font-size:11px;color:#aaa">QR error</div>'}}}function on(){const{gid:t,cpId:e}=i.cpTicket||{},n=d.guests.find(a=>a.id===t),c=((n==null?void 0:n.companions)||[]).find(a=>a.id===e);if(!n||!c)return;const o=d.events.find(a=>a.id===n.eventId);window.open("","_blank","width=440,height=560").document.write(`<!DOCTYPE html><html><head>
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
      <div class="ev" style="margin-bottom:12px">${N(o==null?void 0:o.date)}${o!=null&&o.venue?" · "+o.venue:""}</div>
      <div class="name">${c.name}</div>
      <div class="role">Đi kèm: ${n.name}</div>
      <div id="qr"></div>
      <div class="code">${c.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <button class="btn" onclick="window.print()">🖨️ Lưu / In vé này</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>setTimeout(()=>new QRCode(document.getElementById('qr'),{text:'${at}/?code='+encodeURIComponent('${c.code}'),width:160,height:160,correctLevel:QRCode.CorrectLevel.M}),100)<\/script>
  </body></html>`)}async function cn(t,e,n){const c=d.guests.find(a=>a.id===t);if(!c)return;const o=Z(c.eventId);if(W(o)){alert("Sự kiện đã kết thúc. Không thể thay đổi trạng thái check-in.");return}const s=e==="c"?(c.companions||[]).find(a=>a.id===n):c;if(s){if(s.cancelled){alert('Khách đã cancel. Vui lòng nhấn " Huỷ Cancel" trước khi check-in.');return}if(s.checkedIn){if(!confirm(`Huỷ check-in của ${s.name}?`))return;const a=s.name;s.checkedIn=!1,s.checkinTime=null,s.checkinBy=null,C(),p();const l=e==="g"?{checked_in:!1,checkin_time:null,checkin_by:null}:{companions:c.companions||[]};await D(c.id,l)||alert(`⚠️ Đã huỷ check-in của "${a}" trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại.`);return}i.adminCI={gid:t,type:e,cpId:n||null},i.modal="admin_ci",p(),setTimeout(()=>{const a=document.getElementById("aci_ph");a&&a.focus()},80)}}async function sn(){var f;const{gid:t,type:e,cpId:n}=i.adminCI||{},c=d.guests.find(g=>g.id===t);if(!c)return;if(W(Z(c.eventId))){alert("Sự kiện đã kết thúc. Không thể check-in."),et();return}const o=e==="c"?(c.companions||[]).find(g=>g.id===n):c;if(!o)return;const s=o.phone?o.phone.replace(/\D/g,"").slice(-4):"";if(s&&(((f=document.getElementById("aci_ph"))==null?void 0:f.value)||"").trim()!==s){const v=document.getElementById("aci_err");v&&(v.textContent="⚠️ 4 số cuối không khớp. Vui lòng thử lại.");const m=document.getElementById("aci_ph");m&&(m.value="",m.focus());return}const a=new Date().toISOString(),l=o.name;o.checkedIn=!0,o.checkinTime=a,o.checkinBy="admin",C(),i.modal=null,i.adminCI=null,p();const r=e==="g"?{checked_in:!0,checkin_time:a,checkin_by:"admin"}:{companions:c.companions||[]};await D(c.id,r)||alert(`⚠️ Đã ghi nhận check-in cho "${l}" trên thiết bị này, nhưng CHƯA đồng bộ được lên hệ thống trung tâm (có thể do mất mạng hoặc lỗi Supabase).

Vui lòng bấm "Làm mới" ngay để kiểm tra lại — nếu không, trạng thái check-in này có thể bị mất khi làm mới dữ liệu.`)}function ht(){const t=d.guests.find(n=>n.id===i.ticketGid);if(!t)return;[t.guestCode,...(t.companions||[]).map(n=>n.code)].forEach((n,c)=>{const o=document.getElementById("tqr_"+c);if(o){o.innerHTML="";try{new QRCode(o,{text:ct(n),width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}catch{o.innerHTML='<div style="font-size:11px;color:#aaa">QR error</div>'}}})}function ln(t,e,n,c){const o=d.guests.find(l=>l.id===i.ticketGid);if(!o)return;const s=d.events.find(l=>l.id===o.eventId);window.open("","_blank","width=440,height=580").document.write(`<!DOCTYPE html><html><head><style>
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
      <div class="ev" style="margin-bottom:12px">${N(s==null?void 0:s.date)}${s!=null&&s.venue?" · "+s.venue:""}</div>
      <div class="name">${e}</div>
      <div class="role">${c}</div>
      <div class="qr-box" id="qr_s"></div>
      <div class="code">${n}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <button class="dl-btn" onclick="window.print()">🖨️ Lưu / In vé này</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>setTimeout(()=>{new QRCode(document.getElementById('qr_s'),{text:'${at}/?code='+encodeURIComponent('${n}'),width:160,height:160,correctLevel:QRCode.CorrectLevel.M})},100)<\/script>
  </body></html>`)}function an(){const t=d.guests.find(o=>o.id===i.ticketGid);if(!t)return;const e=d.events.find(o=>o.id===t.eventId),n=[{name:t.name,code:t.guestCode,role:"Khách mời chính"},...(t.companions||[]).map(o=>({name:o.name,code:o.code,role:"Đi kèm: "+t.name}))];window.open("","_blank","width=560,height:700").document.write(`<!DOCTYPE html><html><head><style>
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
      <div class="ev" style="margin-bottom:12px">${N(e==null?void 0:e.date)}${e!=null&&e.venue?" · "+e.venue:""}</div>
      <div class="name">${o.name}</div>
      <div class="role">${o.role}</div>
      <div id="pqr_${o.code}" style="display:inline-block;padding:8px;border:1px solid #eee;border-radius:8px"></div>
      <div class="code">${o.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>`).join("")}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>
      const _base='${at}';
      ${JSON.stringify(n.map(o=>o.code))}.forEach(code=>{
        const el=document.getElementById('pqr_'+code);
        if(el)new QRCode(el,{text:_base+'?code='+encodeURIComponent(code),width:160,height:160,correctLevel:QRCode.CorrectLevel.M});
      });
      setTimeout(()=>window.print(),700);
    <\/script>
  </body></html>`)}function dn(){var o;const t=document.getElementById("lock_ev");if(i.ciEv=(t==null?void 0:t.value)||i.ciEv,!i.ciEv){document.getElementById("lock_err").textContent="⚠️ Vui lòng chọn sự kiện";return}const e=d.events.find(s=>s.id===i.ciEv);if(!e){document.getElementById("lock_err").textContent="Sự kiện không tồn tại";return}const n=(((o=document.getElementById("lock_c"))==null?void 0:o.value)||"").toUpperCase().trim();if(!n){document.getElementById("lock_err").textContent="⚠️ Vui lòng nhập mã nhân viên";return}const c=(e.btcMembers||[]).find(s=>s.code===n);if(!c){document.getElementById("lock_err").textContent="⚠️ Mã không nằm trong danh sách BTC của sự kiện này";return}i.ciOk=!0,i.ciOp=c,i.ciState=null,p()}async function rn(){var c,o;const t=(((c=document.getElementById("ci_in"))==null?void 0:c.value)||"").toUpperCase().trim();if(!t){document.getElementById("ci_err").textContent="⚠️ Vui lòng nhập mã";return}const e=Dt(i.ciEv,t);if(!e){document.getElementById("ci_err").textContent="⚠️ Không tìm thấy mã trong sự kiện này";return}const n=e.person;if(n.checkedIn){document.getElementById("ci_err").textContent="⚠️ Đã check-in lúc "+tt(n.checkinTime);return}if(!n.phone){const s=new Date().toISOString();n.checkedIn=!0,n.checkinTime=s,n.checkinBy=((o=i.ciOp)==null?void 0:o.code)||"btc",C();const a=e.type==="guest"?{checked_in:!0,checkin_time:s,checkin_by:n.checkinBy}:{companions:e.guest.companions||[]},l=await D(e.guest.id,a);i.ciSyncWarn=!l,i.ciState={step:"done",type:e.type,guest:e.guest,person:n,code:t},p();return}i.ciState={step:"verify",type:e.type,guest:e.guest,person:n,code:t},p()}function pn(){var o;const t=(((o=document.getElementById("ci_ph"))==null?void 0:o.value)||"").trim(),n=i.ciState.person,c=n.phone?n.phone.replace(/\D/g,"").slice(-4):"";if(!c){Ct();return}if(t===c)Ct();else{const s=document.getElementById("ph_err");s&&(s.textContent="⚠️ 4 số cuối không khớp. Vui lòng thử lại.");const a=document.getElementById("ci_ph");a&&(a.value="",a.focus())}}async function Ct(){var a;const t=i.ciState,e=d.guests.find(l=>l.id===t.guest.id);if(!e){i.ciState={step:"err",msg:"Lỗi hệ thống"},p();return}const n=new Date().toISOString(),c=((a=i.ciOp)==null?void 0:a.code)||"btc";if(t.type==="guest")e.checkedIn=!0,e.checkinTime=n,e.checkinBy=c;else{const l=(e.companions||[]).find(r=>r.id===t.person.id);l&&(l.checkedIn=!0,l.checkinTime=n,l.checkinBy=c)}C();const o=t.type==="guest"?{checked_in:!0,checkin_time:n,checkin_by:c}:{companions:e.companions||[]},s=await D(e.id,o);i.ciSyncWarn=!s,i.ciState={step:"done",type:t.type,guest:e,person:t.type==="guest"?e:(e.companions||[]).find(l=>l.id===t.person.id),code:t.code},p()}function mn(){const t=d.events.find(s=>s.id===i.selEv),e=[["STT","Loại","Mã","Mã Hệ thống","Họ tên","SĐT","KH gốc (nếu đi kèm)","PRM","Vùng TCB","Đơn vị","SIH","Note","Walk-in","Trạng thái","Giờ check-in","BTC","Lý do cancel"]];let n=0;Q(i.selEv).forEach(s=>{n++;const a=s.cancelled?"Cancel":s.checkedIn?"Đã vào":"Chưa";e.push([n,"KH chính",s.guestCode,s.systemCode||"",s.name,s.phone||"","",s.prmName||"",s.tcbRegion||"",s.unit||"",s.sihName||"",s.note||"",s.walkin?"Walk-in":"",a,s.checkinTime?tt(s.checkinTime):"",s.checkinBy||"",s.cancelNote||""]),(s.companions||[]).forEach(l=>{n++;const r=l.cancelled?"Cancel":l.checkedIn?"Đã vào":"Chưa";e.push([n,"Đi kèm",l.code,"",l.name,l.phone||"",s.name,s.prmName||"",s.tcbRegion||"","","","",s.walkin?"(Walk-in Main)":"",r,l.checkinTime?tt(l.checkinTime):"",l.checkinBy||"",l.cancelNote||""])})});const c=e.map(s=>s.map(a=>`"${String(a).replace(/"/g,'""')}"`).join(",")).join(`
`),o=document.createElement("a");o.href=URL.createObjectURL(new Blob(["\uFEFF"+c],{type:"text/csv;charset=utf-8"})),o.download=`checkin_${((t==null?void 0:t.name)||"").replace(/[^a-zA-Z0-9]/g,"_")}_${new Date().toISOString().slice(0,10)}.csv`,o.click()}function un(){const t=Z(i.selEv);return`<div class="mh">🚶 Tạo khách Walk-in</div>
    <div style="background:#EDE9FE;border:1px solid #DDD6FE;border-radius:10px;padding:10px 14px;margin-bottom:14px;display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">🚶</span>
      <div>
        <div style="font-weight:700;font-size:13px;color:#5B21B6">Khách Walk-in — đăng ký tại chỗ ngày ${N(t==null?void 0:t.date)}</div>
        <div style="font-size:11px;color:#7C3AED">Hệ thống sẽ gắn nhãn Walk-in và tạo mã vào ngay. Không thể thêm Walk-in sau khi sự kiện kết thúc.</div>
      </div>
    </div>
    <div class="fg"><label>Sự kiện</label>
      <div style="padding:9px 12px;background:#f4f7fb;border-radius:8px;font-size:13px;color:#555">${(t==null?void 0:t.name)||"—"} · ${N(t==null?void 0:t.date)}</div>
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
    </div>`}function hn(){const t=document.getElementById("wi_cp_w");if(!t)return;const e=t.querySelectorAll(".wi-cp-r").length,n=document.createElement("div");n.className="wi-cp-r cp-r",n.id="wicr_"+e,n.innerHTML=`<div class="g2" style="margin-bottom:0">
    <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${e+1}</label><input id="wicn_${e}" placeholder="Họ và tên"/></div>
    <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="wicp_${e}" type="tel" placeholder="09xxxxxxxx"/></div>
  </div>
  ${e>0?`<button class="btn xs red" onclick="rmWiCR(${e})" style="margin-top:6px">Xoá đi kèm này</button>`:""}`,t.appendChild(n)}function gn(t){const e=document.getElementById("wicr_"+t);e&&e.remove()}function fn(){const t=document.getElementById("wi_cp_w");if(!t)return[];const e=[];return t.querySelectorAll(".wi-cp-r").forEach(n=>{var a,l;const c=n.id.replace(/[^0-9]/g,""),o=(((a=document.getElementById("wicn_"+c))==null?void 0:a.value)||"").trim(),s=(((l=document.getElementById("wicp_"+c))==null?void 0:l.value)||"").trim();o&&e.push({name:o,phone:s})}),e}async function vn(){var y,_,I,w,H,M,z,V;const t=i.selEv,e=Z(t);if(!xt(e)){alert("Walk-in chỉ khả dụng đúng ngày tổ chức sự kiện."),et();return}const n=(((y=document.getElementById("wi_n"))==null?void 0:y.value)||"").trim();if(!n){alert("Vui lòng nhập họ tên khách Walk-in");return}const c=(((_=document.getElementById("wi_ph"))==null?void 0:_.value)||"").trim(),o=(((I=document.getElementById("wi_syscode"))==null?void 0:I.value)||"").trim(),s=(((w=document.getElementById("wi_prm"))==null?void 0:w.value)||"").trim(),a=(((H=document.getElementById("wi_reg"))==null?void 0:H.value)||"").trim(),l=(((M=document.getElementById("wi_unit"))==null?void 0:M.value)||"").trim(),r=(((z=document.getElementById("wi_sih"))==null?void 0:z.value)||"").trim(),h=(((V=document.getElementById("wi_note"))==null?void 0:V.value)||"").trim(),f=fn(),g=G(t),v=f.map(A=>({id:F(),name:A.name,phone:A.phone,code:G(t),checkedIn:!1,checkinTime:null,checkinBy:null})),m={id:F(),eventId:t,guestCode:g,systemCode:o,name:n,phone:c,prmName:s,tcbRegion:a,unit:l,sihName:r,note:h||"[Walk-in]",walkin:!0,companions:v,checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()};d.guests.push(m),i.ticketGid=m.id,C(),i.modal="tickets",p(),await vt("oh_guests",ft(m))||alert('⚠️ Đã tạo Walk-in trên thiết bị này nhưng CHƯA đồng bộ lên hệ thống trung tâm. Vui lòng bấm "Làm mới" để kiểm tra lại trước khi phát vé.')}function bn(){const t=[["Loại Khách (Gõ 'Main' hoặc 'Companion')","Họ và Tên (*)","Số Điện Thoại","Tên PRM (Sales TCB)","Vùng TCB","Đơn vị (CN/PGD)","Tên SIH (Sales OH)","Note / Lưu ý","Mã Hệ thống (OneHousing - chỉ áp dụng cho Main)"]],e=[["Main","Nguyễn Văn A","0901234567","Lê PRM","Vùng 1","CN Sài Gòn","Trần SIH","Khách VIP bàn đầu","OH-00123"],["Companion","Nguyễn Văn B (Đi kèm A)","0907654321","","","","","Đi cùng xe ông A",""],["Main","Phạm Thị C","0911223344","Nguyễn PRM","Vùng 2","CN Hà Nội","Vũ SIH","","OH-00456"]],n=XLSX.utils.aoa_to_sheet(t.concat(e)),c=XLSX.utils.book_new();XLSX.utils.book_append_sheet(c,n,"Template"),XLSX.writeFile(c,"OneHousing_Template_ImportKhach.xlsx")}function xn(){document.getElementById("excel_file_input").click()}function yn(t){const e=t.target.files[0];if(!e)return;const n=new FileReader;n.onload=function(c){try{const o=new Uint8Array(c.target.result),s=XLSX.read(o,{type:"array"}),a=s.SheetNames[0],l=s.Sheets[a],r=XLSX.utils.sheet_to_json(l,{header:1});if(r.length<=1){alert("File Excel trống hoặc thiếu dữ liệu!");return}const h=[];for(let f=1;f<r.length;f++){const g=r[f];!g[1]||String(g[1]).trim()===""||h.push({type:String(g[0]).trim().toLowerCase()==="companion"?"Companion":"Main",name:String(g[1]).trim(),phone:g[2]?String(g[2]).trim():"",prmName:g[3]?String(g[3]).trim():"",tcbRegion:g[4]?String(g[4]).trim():"",unit:g[5]?String(g[5]).trim():"",sihName:g[6]?String(g[6]).trim():"",note:g[7]?String(g[7]).trim():"",systemCode:g[8]?String(g[8]).trim():""})}if(h.length===0){alert("Không tìm thấy dữ liệu khách hàng hợp lệ trong file Excel!");return}i.importData=h,i.modal="import_preview",p()}catch(o){alert("Đã xảy ra lỗi khi đọc file Excel! Chi tiết: "+o.message)}t.target.value=""},n.readAsArrayBuffer(e)}async function kn(){if(!i.selEv)return;const t=i.selEv,e=i.importData||[];let n=null;const c=[];e.forEach(s=>{if(s.type==="Main"){const a=G(t);n={id:F(),eventId:t,guestCode:a,systemCode:s.systemCode,name:s.name,phone:s.phone,prmName:s.prmName,tcbRegion:s.tcbRegion,unit:s.unit,sihName:s.sihName,note:s.note,companions:[],checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()},d.guests.push(n),c.push(n)}else{const a={id:F(),name:s.name,phone:s.phone,code:G(t),checkedIn:!1,checkinTime:null,checkinBy:null};if(n)n.companions.push(a);else{const l=G(t);n={id:F(),eventId:t,guestCode:l,systemCode:s.systemCode,name:s.name+" (Chính)",phone:s.phone,prmName:s.prmName,tcbRegion:s.tcbRegion,unit:s.unit,sihName:s.sihName,note:"[Hệ thống tự dịch chuyển từ Companion độc lập] "+s.note,companions:[],checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()},d.guests.push(n),c.push(n)}}}),C(),et();const o=await St("oh_guests",c.map(ft));alert(o?`🎉 Đã import thành công ${c.length} khách mời từ Excel vào hệ thống!`:`⚠️ Đã lưu ${c.length} khách trên thiết bị này nhưng CHƯA đồng bộ đầy đủ lên hệ thống trung tâm Supabase (có thể do lỗi mạng). Vui lòng bấm "Làm mới" để kiểm tra và đồng bộ lại trước khi rời sự kiện.`)}async function wn(){const t=d.events.find(h=>h.id===i.selEv),e=Q(i.selEv);if(!e.length){alert("Sự kiện này chưa có khách mời nào để xuất QR!");return}const n=document.getElementById("zip_btn"),c=n.textContent;n.textContent="⏳ Đang khởi tạo bộ QR...",n.disabled=!0;const o=document.createElement("div");o.style.display="none",document.body.appendChild(o);const s=new JSZip,a=h=>new Promise(f=>{o.innerHTML="",new QRCode(o,{text:h,width:250,height:250,correctLevel:QRCode.CorrectLevel.M}),setTimeout(()=>{const g=o.querySelector("img");if(g&&g.src)f(g.src.split(",")[1]);else{const v=o.querySelector("canvas");f(v?v.toDataURL().split(",")[1]:null)}},50)}),l=new Map,r=(h,f,g)=>{let v=f.replace(/[/\\?%*:|"<>]/g,"-").trim(),m=`${h}_${v}_(${g})`;if(l.has(m)){let b=l.get(m)+1;return l.set(m,b),`${m}_${b}.png`}else return l.set(m,1),`${m}.png`};for(let h of e){const f=ct(h.guestCode),g=await a(f);if(g){const v=r(h.guestCode,h.name,"Chinh");s.file(v,g,{base64:!0})}if(h.companions&&h.companions.length)for(let v of h.companions){const m=ct(v.code),b=await a(m);if(b){const y=r(v.code,v.name,`DiKem_cua_${h.name}`);s.file(y,b,{base64:!0})}}}document.body.removeChild(o);try{const h=await s.generateAsync({type:"blob"}),f=document.createElement("a");f.href=URL.createObjectURL(h),f.download=`QR_SựKiện_${((t==null?void 0:t.name)||"Event").replace(/[^a-zA-Z0-9]/g,"_")}.zip`,f.click()}catch(h){alert("Có lỗi xảy ra trong quá trình nén file ZIP: "+h.message)}n.textContent=c,n.disabled=!1}window.R=p;window.doLogin=Lt;window.doRefresh=Ht;window.doUrlCI=me;window.setTab=xe;window.openGM=ye;window.pickEv=ke;window.setSrch=we;window.setFil=$e;window.openM=Ce;window.openEdit=_e;window.openDel=Ee;window.openTickets=Ie;window.closeM=et;window.openEditEv=Be;window.openCpTicket=Me;window.openCpEdit=ze;window.openCpDel=Se;window.openAddComp=Ne;window.openCancel=He;window.doCancel=Ae;window.undoCancel=Re;window.goCI=De;window.backAdmin=Ve;window.lockOut=Le;window.cancelCI=Pe;window.nextCI=Fe;window.addBR=Oe;window.rmBR=Ge;window.addCR=Ue;window.rmCR=je;window.saveEv=qe;window.delEv=Xe;window.saveG=Je;window.chkEditPw=Qe;window.doEdit=Ze;window.doDel=Ye;window.doCpEdit=tn;window.doCpDel=en;window.doCpAdd=nn;window.mkQRs=ht;window.mkCpQR=nt;window.dlTicket=ln;window.dlCpTicket=on;window.printAll=an;window.tryUnlock=dn;window.startCI=rn;window.confirmPhone=pn;window.doAdminCI=sn;window.doEvUnlock=ae;window.expCSV=mn;window.togCI=cn;window.togRpt=Ut;window.setRptEv=jt;window.triggerExcelImport=xn;window.handleExcelImport=yn;window.downloadExcelTemplate=bn;window.commitExcelImport=kn;window.downloadAllQRsZip=wn;window.openWalkin=Te;window.saveWalkin=vn;window.addWiCR=hn;window.rmWiCR=gn;
