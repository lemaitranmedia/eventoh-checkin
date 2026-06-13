(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const ne="OH2026",ae="oh_ci_v5",j="https://kpzwmancieemefcvgtkm.supabase.co",ve="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwendtYW5jaWVlbWVmY3ZndGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODQyMTksImV4cCI6MjA5NTk2MDIxOX0.WviBlyBg9Ji9kARXUyP_87muq8oGLVX6_0T0FNtKqTI",U={"Content-Type":"application/json",apikey:ve,Authorization:`Bearer ${ve}`,Prefer:"return=minimal"},ie="https://lemaitranmedia.github.io/eventoh-checkin";function xe(e){return{id:e.id,name:e.name,date:e.date_str,team:e.team,venue:e.venue,eventPw:e.event_pw,btcMembers:e.btc_members||[],createdAt:e.created_at}}function ye(e){return{id:e.id,eventId:e.event_id,guestCode:e.guest_code,name:e.name,phone:e.phone,prmName:e.prm_name,tcbRegion:e.tcb_region,unit:e.unit,sihName:e.sih_name,note:e.note,companions:e.companions||[],checkedIn:!!e.checked_in,checkinTime:e.checkin_time,checkinBy:e.checkin_by,cancelled:!!e.cancelled,cancelNote:e.cancel_note,createdAt:e.created_at}}function ke(e){return{id:e.id,name:e.name,date_str:e.date||null,team:e.team||null,venue:e.venue||null,event_pw:e.eventPw||null,btc_members:e.btcMembers||[],created_at:e.createdAt||Date.now()}}function we(e){return{id:e.id,event_id:e.eventId,guest_code:e.guestCode,name:e.name,phone:e.phone||null,prm_name:e.prmName||null,tcb_region:e.tcbRegion||null,unit:e.unit||null,sih_name:e.sihName||null,note:e.note||null,companions:e.companions||[],checked_in:!!e.checkedIn,checkin_time:e.checkinTime||null,checkin_by:e.checkinBy||null,cancelled:!!e.cancelled,cancel_note:e.cancelNote||null,created_at:e.createdAt||Date.now()}}function $e(){try{const e=localStorage.getItem(ae);return e?JSON.parse(e):{events:[],guests:[]}}catch{return{events:[],guests:[]}}}async function Ce(){try{const[e,t]=await Promise.all([fetch(`${j}/rest/v1/oh_events?select=*&order=created_at.desc`,{headers:U}),fetch(`${j}/rest/v1/oh_guests?select=*`,{headers:U})]),i=await e.json(),c=await t.json();if(Array.isArray(i)&&Array.isArray(c))return l.events=i.map(xe),l.guests=c.map(ye),localStorage.setItem(ae,JSON.stringify(l)),!0}catch(e){console.warn("Supabase load lỗi, dùng localStorage:",e)}return!1}let Y=null;function w(){try{localStorage.setItem(ae,JSON.stringify(l))}catch{}Y&&clearTimeout(Y),Y=setTimeout(Ie,600)}async function Ie(){Y=null;try{l.events.length&&await fetch(`${j}/rest/v1/oh_events`,{method:"POST",headers:{...U,Prefer:"resolution=merge-duplicates"},body:JSON.stringify(l.events.map(ke))}),l.guests.length&&await fetch(`${j}/rest/v1/oh_guests`,{method:"POST",headers:{...U,Prefer:"resolution=merge-duplicates"},body:JSON.stringify(l.guests.map(we))})}catch(e){console.warn("Supabase sync lỗi:",e)}}async function be(e,t){try{await fetch(`${j}/rest/v1/${e}?id=eq.${t}`,{method:"DELETE",headers:U})}catch(i){console.warn("Supabase delete lỗi:",i)}}async function re(e,t,i=3){for(let c=1;c<=i;c++){try{const o=await fetch(`${j}/rest/v1/oh_guests?id=eq.${e}`,{method:"PATCH",headers:{...U,Prefer:"return=minimal"},body:JSON.stringify(t)});if(o.ok)return!0;console.warn("sbPatchGuest lỗi HTTP",o.status)}catch(o){console.warn("sbPatchGuest lỗi mạng:",o)}c<i&&await new Promise(o=>setTimeout(o,c*500))}return!1}let l={events:[],guests:[]};function ee(e){return ie+"/?code="+encodeURIComponent(e)}async function pe(){if(!await Ce()){const t=$e();l.events=t.events,l.guests=t.guests}}function R(e){return e!=null&&e.date?new Date().toISOString().slice(0,10)>e.date:!1}function oe(e){return l.events.find(t=>t.id===e)}let de=null;function Ee(){de&&clearInterval(de),de=setInterval(async()=>{_e()||(await pe(),u())},15e3)}function _e(){var i;if(n.modal||((i=n.ciState)==null?void 0:i.step)==="verify"||n.urlCIBusy)return!0;const e=document.activeElement;if(!e)return!1;const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"}async function Te(){const e=document.getElementById("refresh_btn");e&&(e.textContent="⏳ Đang làm mới...",e.disabled=!0),await pe(),u()}async function Be(){const e=new URLSearchParams(window.location.search).get("code"),t=document.getElementById("root");if(t.innerHTML=`<div style="max-width:360px;margin:80px auto;text-align:center;font-family:'Be Vietnam Pro',sans-serif"><div style="font-size:40px;margin-bottom:12px">⏳</div><div style="font-size:14px;color:#aaa;margin-top:8px">Đang tải...</div></div>`,await pe(),e){n.urlCode=decodeURIComponent(e),n.view="url_ci",u();return}u(),e||Ee()}Be();let n={adminOk:!1,view:"admin",urlCode:null,urlCIStep:null,urlCIBusy:!1,urlCISyncWarn:!1,tab:"events",selEv:null,modal:null,editGid:null,delGid:null,ticketGid:null,editEvId:null,cpTicket:null,cpEdit:null,cpDel:null,cpAdd:null,adminCI:null,cancelTarget:null,unlockedEvs:{},evUnlockTarget:null,rptEv:null,rptExp:{},search:"",filter:"all",ciOk:!1,ciEv:null,ciOp:null,ciState:null,ciSyncWarn:!1,pwVal:"",pwErr:"",newEvBtcRows:1,newGCompRows:1,importData:null};function H(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function S(e){return e?new Date(e).toLocaleDateString("vi-VN"):"—"}function X(e){return e?new Date(e).toLocaleString("vi-VN"):"—"}function te(e){return e?new Date(e).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}):""}function q(e){return l.guests.filter(t=>t.eventId===e)}function ce(e){let t=0,i=0,c=0;return q(e).forEach(o=>{t++,o.checkedIn&&i++,o.cancelled&&c++,(o.companions||[]).forEach(s=>{t++,s.checkedIn&&i++,s.cancelled&&c++})}),{t,c:i,x:c,p:t-i-c}}function K(e){const t=l.events.find(a=>a.id===e),i=t?t.name.replace(/[^A-Z0-9]/gi,"").toUpperCase().slice(0,3):"OH",c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",o=new Set;l.guests.forEach(a=>{o.add(a.guestCode),(a.companions||[]).forEach(h=>o.add(h.code))});let s,d=0;do{s=i+"-";for(let a=0;a<4;a++)s+=c[Math.floor(Math.random()*c.length)];d++}while(o.has(s)&&d<200);return s}function ze(e,t){for(const i of l.guests.filter(c=>c.eventId===e)){if(i.guestCode===t)return{type:"guest",guest:i,person:i};for(const c of i.companions||[])if(c.code===t)return{type:"comp",guest:i,person:c}}return null}function u(){const e=document.getElementById("root");if(n.view==="url_ci"){e.innerHTML=it(),ot();return}if(!n.adminOk){e.innerHTML=Me();return}if(n.view==="checkin"){e.innerHTML=st(),dt();return}e.innerHTML=Ne(),Ae()}function Me(){return`<div class="login-box">
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
  </div>`}function Se(){var t;(((t=document.getElementById("login_pw"))==null?void 0:t.value)||"")===ne?(n.adminOk=!0,u()):document.getElementById("login_err").textContent="⚠️ Mật khẩu không đúng."}function Ne(){return`
    <div class="topbar no-print" style="margin-bottom:16px">
      <div>
        <div style="font-size:17px;font-weight:800">🎪 Hệ thống Check-in Sự kiện</div>
        <div style="font-size:12px;color:#aaa">OneHousing · ${l.events.length} sự kiện · ${l.guests.length} nhóm khách</div>
      </div>
      <button class="btn" onclick="goCI()">📷 Màn hình Check-in BTC</button>
    </div>
    <div class="tabs no-print">
      <button class="tab ${n.tab==="events"?"on":""}" onclick="setTab('events')">📅 Sự kiện</button>
      <button class="tab ${n.tab==="guests"?"on":""}" onclick="setTab('guests')">👥 Khách mời</button>
      <button class="tab ${n.tab==="report"?"on":""}" onclick="setTab('report')">📊 Báo cáo</button>
    </div>
    ${n.tab==="events"?De():""}
    ${n.tab==="guests"?Re():""}
    ${n.tab==="report"?He():""}
    ${n.modal?Fe():""}`}function Ae(){n.modal==="tickets"&&n.ticketGid&&(setTimeout(le,120),setTimeout(le,400)),n.modal==="cp_ticket"&&n.cpTicket&&(setTimeout(W,120),setTimeout(W,400))}function De(){const e=[...l.events].sort((t,i)=>new Date(i.date||0)-new Date(t.date||0));return`<div class="topbar"><div style="font-weight:700">Danh sách sự kiện</div>
    <button class="btn blue sm" onclick="openM('add_ev')">+ Tạo sự kiện</button></div>
    ${e.length===0?'<div class="empty">📭 Chưa có sự kiện nào.<br>Nhấn "Tạo sự kiện" để bắt đầu.</div>':""}
    ${e.map(t=>{const i=ce(t.id),c=(t.btcMembers||[]).length,o=R(t);return`<div class="ev-item" onclick="openGM('${t.id}')">
        <div style="font-size:28px;flex-shrink:0">${o?"🔐":"📌"}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:15px">${t.name} ${t.eventPw?n.unlockedEvs[t.id]?"🔓":"🔒":""} ${o?'<span style="font-size:10px;font-weight:600;background:#FEF2F2;color:#B91C1C;padding:2px 7px;border-radius:10px;vertical-align:middle">Đã kết thúc</span>':""}</div>
          <div class="ev-meta">
            <span>📅 ${S(t.date)}</span>
            <span>🏢 ${t.team||"—"}</span>
            ${t.venue?`<span>📍 ${t.venue}</span>`:""}
            <span>👥 ${i.t} người</span>
            <span>✅ ${i.c}/${i.t}</span>
            <span>🔑 ${c} BTC</span>
          </div>
          <div class="pb"><div class="pb-fill" style="width:${i.t>0?Math.round(i.c/i.t*100):0}%;background:${o?"#aaa":"#3B6D11"}"></div></div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap" onclick="event.stopPropagation()">
          <span class="badge ${o?"b-gray":i.c===i.t&&i.t>0?"b-green":i.c>0?"b-blue":"b-gray"}">${o?"Đã đóng":i.c===i.t&&i.t>0?"Hoàn tất":i.c>0?i.c+" đã vào":"Chờ"}</span>
          ${t.eventPw&&n.unlockedEvs[t.id]?`<button class="btn sm" onclick="alert('Mật khẩu: '+db.events.find(e=>e.id==='${t.id}')?.eventPw)" title="Xem mật khẩu" style="font-size:11px">🔓 MK</button>`:""}
          <button class="btn sm" onclick="openGM('${t.id}')">📋 Khách</button>
          ${o?'<span class="btn sm" style="opacity:.35;cursor:not-allowed">✏️ Sửa</span>':`<button class="btn sm" onclick="openEditEv('${t.id}')">✏️ Sửa</button>`}
          <button class="btn sm red" onclick="delEv('${t.id}')">🗑️</button>
        </div>
      </div>`}).join("")}`}function Re(){const e=`<select class="selx" onchange="pickEv(this.value)">
    <option value="">-- Chọn sự kiện --</option>
    ${l.events.map(d=>`<option value="${d.id}" ${n.selEv===d.id?"selected":""}>${d.name}</option>`).join("")}
  </select>`;if(!n.selEv)return`<div class="topbar">${e}</div><div class="empty">👆 Chọn sự kiện để quản lý khách mời</div>`;const t=l.events.find(d=>d.id===n.selEv);let i=q(n.selEv);const c=ce(n.selEv);if(n.search){const d=n.search.toLowerCase();i=i.filter(a=>{var h,m,v,r,g,f;return((h=a.name)==null?void 0:h.toLowerCase().includes(d))||((m=a.phone)==null?void 0:m.includes(d))||((v=a.prmName)==null?void 0:v.toLowerCase().includes(d))||((r=a.sihName)==null?void 0:r.toLowerCase().includes(d))||((g=a.unit)==null?void 0:g.toLowerCase().includes(d))||((f=a.guestCode)==null?void 0:f.toLowerCase().includes(d))||(a.companions||[]).some(x=>{var k,_;return((k=x.name)==null?void 0:k.toLowerCase().includes(d))||((_=x.code)==null?void 0:_.toLowerCase().includes(d))})})}n.filter==="checked"&&(i=i.filter(d=>d.checkedIn)),n.filter==="pending"&&(i=i.filter(d=>!d.checkedIn&&!d.cancelled)),n.filter==="cancelled"&&(i=i.filter(d=>d.cancelled));const o=(t.btcMembers||[]).map(d=>`<span class="badge b-purple" style="margin:2px">🔑 ${d.name} (${d.code})</span>`).join(""),s=R(t);return`
    <div class="topbar">
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">${e}${o?`<div style="display:flex;flex-wrap:wrap;gap:2px">${o}</div>`:""}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button id="refresh_btn" class="btn sm" onclick="doRefresh()" title="Làm mới dữ liệu">🔄 Làm mới</button>
        <input class="sinput" placeholder="🔍 Tìm tên, mã, SĐT..." oninput="setSrch(this.value)" value="${n.search}">
        <select class="selx" onchange="setFil(this.value)">
          <option value="all" ${n.filter==="all"?"selected":""}>Tất cả (${c.t})</option>
          <option value="checked" ${n.filter==="checked"?"selected":""}>✅ Đã vào (${c.c})</option>
          <option value="pending" ${n.filter==="pending"?"selected":""}>⏳ Chưa xác nhận (${c.p})</option>
          <option value="cancelled" ${n.filter==="cancelled"?"selected":""}>🚫 Cancel (${c.x})</option>
        </select>
        
        ${s?"":`
          <button class="btn green sm" onclick="triggerExcelImport()">📥 Import Excel</button>
          <button class="btn sm" onclick="downloadExcelTemplate()">📄 Mẫu Excel</button>
        `}
        ${c.t>0?'<button class="btn blue sm" onclick="downloadAllQRsZip()" id="zip_btn">🗂️ Tải QR hàng loạt (.ZIP)</button>':""}
        ${s?"":`<button class="btn blue sm" onclick="openM('add_g')">+ Thêm khách</button>`}
      </div>
    </div>
    
    ${s?`<div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">🔐</span>
      <div><div style="font-weight:600;font-size:13px;color:#B91C1C">Sự kiện đã kết thúc — Chỉ xem, không thể thao tác</div>
        <div style="font-size:11px;color:#aaa">Tất cả chức năng check-in, thêm/sửa/xoá khách đã bị khoá kể từ ngày ${S(t.date)}</div>
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
          ${i.length===0?'<tr><td colspan="9" style="text-align:center;padding:24px;color:#bbb">Không có dữ liệu</td></tr>':""}
          ${i.map((d,a)=>{const h=d.companions||[],m=!!d.cancelled;let v=`<tr ${m?'class="cancelled"':""} style="${m?"background:#FFF8F8":""}">
              <td style="color:#ccc">${a+1}</td>
              <td>
                <div style="font-weight:600${m?";text-decoration:line-through;color:#bbb":""}">${d.name}</div>
                ${m?`<span class="cancelled-badge">🚫 Cancel</span>${d.cancelNote?`<div class="cancel-note">${d.cancelNote}</div>`:""}`:`${h.length?`<div class="sub">+${h.length} đi kèm</div>`:""}
                   ${d.note?`<div class="sub" style="font-style:italic">${d.note}</div>`:""}
                   ${s?"":`<button class="btn xs" onclick="openAddComp('${d.id}')" style="margin-top:5px;font-size:10px;color:#185FA5;border-color:#b3d4f5">+ thêm đi kèm</button>`}`}
              </td>
              <td><span class="mono">${d.guestCode}</span></td>
              <td style="color:#888;font-size:12px">${d.phone||"—"}</td>
              <td><div style="font-size:12px">${d.prmName||"—"}</div><div class="sub">${d.tcbRegion||""}</div></td>
              <td style="font-size:12px;color:#888">${d.unit||"—"}</td>
              <td style="font-size:12px;color:#888">${d.sihName||"—"}</td>
              <td>${m||s?'<span style="font-size:11px;color:#ccc">—</span>':`<button class="ci ${d.checkedIn?"on":"off"}" onclick="togCI('${d.id}','g')">${d.checkedIn?"✅ Vào":"⏳"}</button>
                 ${d.checkedIn?`<div style="font-size:10px;color:#bbb;margin-top:2px">${te(d.checkinTime)}</div>`:""}`}
              </td>
              <td>
                <div style="display:flex;gap:2px;flex-wrap:wrap">
                  ${s?`<button class="btn xs" onclick="openTickets('${d.id}')" title="Vé">🎫</button>`:m?`<button class="btn xs" onclick="undoCancel('${d.id}','g')" style="color:#185FA5;border-color:#185FA5" title="Recall — KH quay lại tham dự">↩</button>`:`<button class="btn xs" onclick="openTickets('${d.id}')" title="Vé">🎫</button>
                     <button class="btn xs" onclick="openCancel('${d.id}','g')" title="Cancel KH" style="color:#B91C1C;border-color:#FECACA">🚫</button>`}
                  ${s?"":`<button class="btn xs" onclick="openEdit('${d.id}')" title="Sửa">✏️</button>
                  <button class="btn xs red" onclick="openDel('${d.id}')" title="Xoá">🗑️</button>`}
                </div>
              </td>
            </tr>`;return h.forEach(r=>{const g=!!r.cancelled;v+=`<tr ${g?'class="cancelled"':""} style="background:${g?"#FFF8F8":"#fafbfc"}">
                <td></td>
                <td style="padding-left:22px">
                  <span style="font-size:12px;color:${g?"#ccc":"#555"};font-weight:500${g?";text-decoration:line-through":""}">↳ ${r.name}</span>
                  ${g?`<span class="cancelled-badge" style="margin-left:4px">🚫</span>${r.cancelNote?`<div class="cancel-note" style="padding-left:14px">${r.cancelNote}</div>`:""}`:'<span class="badge b-purple" style="font-size:9px;margin-left:4px">đi kèm</span>'}
                </td>
                <td><span class="mono">${r.code}</span></td>
                <td style="font-size:12px;color:#aaa">${r.phone||"—"}</td>
                <td colspan="2"></td><td></td>
                <td>${g||s?'<span style="font-size:11px;color:#ccc">—</span>':`<button class="ci ${r.checkedIn?"on":"off"}" onclick="togCI('${d.id}','c','${r.id}')">${r.checkedIn?"✅ Vào":"⏳"}</button>
                   ${r.checkedIn?`<div style="font-size:10px;color:#bbb;margin-top:2px">${te(r.checkinTime)}</div>`:""}`}
                </td>
                <td>
                  <div style="display:flex;gap:2px;flex-wrap:wrap">
                    ${s?`<button class="btn xs" onclick="openCpTicket('${d.id}','${r.id}')" title="Vé">🎫</button>`:g?`<button class="btn xs" onclick="undoCancel('${d.id}','c','${r.id}')" style="color:#185FA5;border-color:#185FA5" title="Recall — người đi kèm quay lại">↩</button>`:`<button class="btn xs" onclick="openCpTicket('${d.id}','${r.id}')" title="Vé">🎫</button>
                       <button class="btn xs" onclick="openCancel('${d.id}','c','${r.id}')" style="color:#B91C1C;border-color:#FECACA" title="Cancel">🚫</button>`}
                    ${s?"":`<button class="btn xs" onclick="openCpEdit('${d.id}','${r.id}')" title="Sửa">✏️</button>
                    <button class="btn xs red" onclick="openCpDel('${d.id}','${r.id}')" title="Xoá">🗑️</button>`}
                  </div>
                </td>
              </tr>`}),v}).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${c.t>0?'<div style="text-align:right;margin-top:6px"><button class="btn sm" onclick="expCSV()">⬇️ Xuất CSV</button></div>':""}`}function He(){if(!l.events.length)return'<div class="empty">Chưa có dữ liệu.</div>';const i=`
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><div style="font-weight:700">📊 Tổng quan sự kiện</div><button id="refresh_btn" class="btn sm" onclick="doRefresh()">🔄 Làm mới</button></div>${`<select class="selx" style="min-width:220px" onchange="setRptEv(this.value)">
    <option value="">-- Tất cả sự kiện --</option>
    ${l.events.map(p=>`<option value="${p.id}" ${n.rptEv===p.id?"selected":""}>${p.name}${p.eventPw&&!n.unlockedEvs[p.id]?" 🔒":""}${R(p)?" 🔐":""}</option>`).join("")}
  </select>`}
      </div>
      ${l.events.map(p=>{const y=ce(p.id),$=y.t?Math.round(y.c/y.t*100):0,M=p.eventPw&&!n.unlockedEvs[p.id];return`<div style="padding:10px 0;border-bottom:1px solid #f0f0f0">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
            <div><div style="font-weight:600;font-size:13px">${p.name}${M?" 🔒":""}</div>
              <div style="font-size:11px;color:#aaa">${S(p.date)}${p.team?" · "+p.team:""}</div></div>
            <div style="display:flex;gap:10px;align-items:center">
              <div style="text-align:center"><div style="font-size:15px;font-weight:700">${y.t}</div><div style="font-size:10px;color:#aaa">Tổng</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#3B6D11">${y.c}</div><div style="font-size:10px;color:#aaa">✅ Đã vào</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#aaa">${y.p}</div><div style="font-size:10px;color:#aaa">⏳ Chưa</div></div>
              <div style="text-align:center"><div style="font-size:15px;font-weight:700;color:#B91C1C">${y.x}</div><div style="font-size:10px;color:#aaa">🚫 Cancel</div></div>
              <div style="width:60px">
                <div class="pb"><div class="pb-fill" style="width:${$}%;background:#3B6D11"></div></div>
                <div style="font-size:10px;text-align:center;color:#aaa;margin-top:2px">${$}%</div>
              </div>
            </div>
          </div>
        </div>`}).join("")}
    </div>`;if(!n.rptEv)return i+'<div class="empty" style="padding:24px">☝️ Chọn sự kiện ở trên để xem báo cáo chi tiết</div>';const c=l.events.find(p=>p.id===n.rptEv);if(c!=null&&c.eventPw&&!n.unlockedEvs[n.rptEv])return i+`<div class="card" style="text-align:center;padding:24px">
      <div style="font-size:24px;margin-bottom:8px">🔒</div>
      <div style="font-weight:700;margin-bottom:4px">Sự kiện được bảo vệ</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:14px">Nhập mật khẩu để xem báo cáo chi tiết</div>
      <button class="btn blue" onclick="S.evUnlockTarget='${n.rptEv}';S.modal='ev_unlock';R()">🔓 Nhập mật khẩu</button>
    </div>`;const o=q(n.rptEv).map(p=>({name:p.name,code:p.guestCode,phone:p.phone,prmName:p.prmName,tcbRegion:p.tcbRegion,unit:p.unit,sihName:p.sihName,note:p.note,checkedIn:p.checkedIn,cancelled:p.cancelled,checkinTime:p.checkinTime,companions:p.companions||[]})),s=[];o.forEach(p=>{s.push({checkedIn:p.checkedIn,cancelled:p.cancelled,isMain:!0}),p.companions.forEach(y=>s.push({checkedIn:y.checkedIn,cancelled:y.cancelled,isMain:!1}))});const d=o.length,a=o.filter(p=>p.checkedIn).length,h=o.filter(p=>p.cancelled).length,m=d-a-h,v=d>0?Math.round(a/d*100):0,r=s.length,g=o.length,f=r-g,x=s.filter(p=>p.checkedIn).length,k=a,_=x-k,N=k>0?Math.round(_/k*100)/100:0,I=`<div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">Tổng quan (Khách hàng - Main)</div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    ${O("Tổng KH mời (Main)","#185FA5",d,"")}
    ${O("✅ KH đã tới","#3B6D11",a,v+"% turnout")}
    ${O("⏳ KH chưa tới","#888",m,"")}
    ${O("🚫 KH cancel","#B91C1C",h,"")}
  </div>
  <div style="background:#fff;border-radius:12px;padding:14px 18px;margin-bottom:14px;border:1px solid #eaecf0">
    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px">
      <span style="font-weight:700">${c.name}</span>
      <span style="color:#3B6D11;font-weight:700">${v}%</span>
    </div>
    <div style="background:#f0f0f0;border-radius:99px;height:12px;overflow:hidden">
      <div style="width:${v}%;background:linear-gradient(90deg,#185FA5,#3B6D11);height:100%;border-radius:99px;transition:width .4s"></div>
    </div>
  </div>
  <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase">Tổng lượt tham dự thực tế (Main + Companion)</div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    ${O("Tổng lượt đăng ký","#185FA5",r,g+" Main + "+f+" Companion")}
    ${O("✅ Tổng đã vào sảnh","#3B6D11",x,k+" Main + "+_+" Companion")}
    ${O("Avg companion / Main đã vào","#888",N,"")}
  </div>`;function B(p){const y=p.companions||[];if(!y.length)return"";const $=y.map(C=>C.checkedIn?"-1":"+1");return`<span style="font-size:12px;font-weight:600;color:${$.every(C=>C==="-1")?"#e24b4a":$.every(C=>C==="+1")?"#3B6D11":"#aaa"};white-space:nowrap;margin-left:8px">${$.join(" ")}</span>`}function z(p,y,$,M){const C={};o.forEach(F=>{const E=M(F)||"Không xác định";C[E]||(C[E]=[]),C[E].push(F)});const J=Object.entries(C).sort((F,E)=>E[1].length-F[1].length);return J.length?`<div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;margin:16px 0 8px;text-transform:uppercase">${y} Theo ${p} (Main)</div>
      ${J.map(([F,E])=>{const D=E.filter(b=>b.checkedIn).length,Q=E.filter(b=>b.cancelled).length,P=E.length-D-Q,se=E.length>0?Math.round(D/E.length*100):0,G=`${$}_${F}`,ue=!!n.rptExp[G+"_ci"],me=!!n.rptExp[G+"_ab"],he=!!n.rptExp[G+"_cn"];return`<div style="background:#fff;border-radius:12px;border:1px solid #eaecf0;padding:14px 16px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
            <div style="font-weight:700;font-size:13px">${F} <span style="font-weight:400;color:#aaa;font-size:11px">(${E.length} Main)</span></div>
            <div style="display:flex;gap:6px;font-size:12px;flex-wrap:wrap">
              <span onclick="togRpt('${G}_ci')" style="background:${D>0?"#eaf3de":"#f5f5f5"};color:${D>0?"#3B6D11":"#aaa"};border-radius:20px;padding:2px 10px;font-weight:600;cursor:${D>0?"pointer":"default"};user-select:none">
                Đã vào: ${D}${D>0?ue?" ▲":" ▼":""}
              </span>
              <span onclick="togRpt('${G}_ab')" style="background:${P>0?"#fdecea":"#f5f5f5"};color:${P>0?"#e24b4a":"#aaa"};border-radius:20px;padding:2px 10px;font-weight:600;cursor:${P>0?"pointer":"default"};user-select:none">
                Chưa: ${P}${P>0?me?" ▲":" ▼":""}
              </span>
              ${Q>0?`<span onclick="togRpt('${G}_cn')" style="background:#FEF2F2;color:#B91C1C;border-radius:20px;padding:2px 10px;font-weight:600;cursor:pointer;user-select:none">
                Cancel: ${Q}${he?" ▲":" ▼"}
              </span>`:""}
            </div>
          </div>
          <div style="background:#f0f0f0;border-radius:99px;height:8px;overflow:hidden">
            <div style="width:${se}%;background:${se===100?"#3B6D11":"linear-gradient(90deg,#185FA5,#3B6D11)"};height:100%;border-radius:99px"></div>
          </div>
          <div style="font-size:10px;color:#aaa;margin-top:4px;text-align:right">${se}% Main đã check-in</div>
          ${ue&&D>0?`<div style="background:#f0faf0;border:1px solid #97C459;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#3B6D11;margin-bottom:6px">Đã check-in (${D} Main)</div>
            ${E.filter(b=>b.checkedIn).map(b=>`<div style="padding:5px 0;border-bottom:.5px solid #c8e6c9;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px">${b.name}</div>
                <div style="font-size:11px;color:#888">${b.code}${b.phone?" · "+b.phone:""}</div>
                <div style="font-size:10px;color:#3B6D11">✅ ${te(b.checkinTime)}</div>
              </div>
              ${B(b)}
            </div>`).join("")}
          </div>`:""}
          ${me&&P>0?`<div style="background:#fff8f8;border:1px solid #fdd;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#e24b4a;margin-bottom:6px">Chưa check-in (${P} Main)</div>
            ${E.filter(b=>!b.checkedIn&&!b.cancelled).map(b=>`<div style="padding:5px 0;border-bottom:.5px solid #fdd;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px">${b.name}</div>
                <div style="font-size:11px;color:#888">${b.code}${b.phone?" · "+b.phone:""}</div>
              </div>
              ${B(b)}
            </div>`).join("")}
          </div>`:""}
          ${he&&Q>0?`<div style="background:#FFF8F8;border:1px solid #FECACA;border-radius:8px;padding:10px 12px;margin-top:8px">
            <div style="font-size:11px;font-weight:700;color:#B91C1C;margin-bottom:6px">Đã cancel (${Q} Main)</div>
            ${E.filter(b=>b.cancelled).map(b=>`<div style="padding:5px 0;border-bottom:.5px solid #FECACA;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-weight:600;font-size:13px;text-decoration:line-through;color:#bbb">${b.name}</div>
                <div style="font-size:11px;color:#aaa">${b.code}${b.phone?" · "+b.phone:""}</div>
                ${b.note?`<div style="font-size:10px;color:#B91C1C;font-style:italic">${b.note}</div>`:""}
              </div>
              ${B(b)}
            </div>`).join("")}
          </div>`:""}
        </div>`}).join("")}`:""}const A=z("Vùng TCB","🏦","vung",p=>p.tcbRegion),V=z("Chi nhánh","🏢","unit",p=>p.unit),L=z("SIH","👤","sih",p=>p.sihName),T=z("PRM","🤝","prm",p=>p.prmName);return i+I+A+V+L+T}function O(e,t,i,c){return`<div style="flex:1;min-width:120px;background:#fff;border-radius:12px;padding:14px 16px;border-left:4px solid ${t};border:1px solid #eaecf0;border-left-width:4px">
    <div style="font-size:11px;color:#888;margin-bottom:4px">${e}</div>
    <div style="font-size:28px;font-weight:800;color:${t};line-height:1">${i}</div>
    ${c?`<div style="font-size:11px;color:#aaa;margin-top:4px">${c}</div>`:""}
  </div>`}function Ve(e){n.rptExp[e]=!n.rptExp[e],u()}function Le(e){if(e){const t=l.events.find(i=>i.id===e);if(t!=null&&t.eventPw&&!n.unlockedEvs[e]){n.evUnlockTarget=e,n.rptEv=e,n.modal="ev_unlock",u();return}}n.rptEv=e||null,n.rptExp={},u()}function Fe(){const e=(t,i)=>`<div class="ov" onclick="closeM()"><div class="modal ${i||""}" onclick="event.stopPropagation()">${t}</div></div>`;return n.modal==="add_ev"||n.modal==="edit_ev"?e(Pe(),"lg"):n.modal==="add_g"||n.modal==="edit_g"?e(Oe(),"lg"):n.modal==="tickets"?e(Ge(),"lg"):n.modal==="edit_pw"?e(je(),"sm"):n.modal==="edit_form"?e(Ue(),"lg"):n.modal==="del_pw"?e(Xe(),"sm"):n.modal==="cp_ticket"?e(qe(),"sm"):n.modal==="cp_edit"?e(Je(),"sm"):n.modal==="cp_del"?e(Qe(),"sm"):n.modal==="cp_add"?e(We()):n.modal==="admin_ci"?e(Ze(),"sm"):n.modal==="cancel"?e(Ye(),"sm"):n.modal==="ev_unlock"?e(et(),"sm"):n.modal==="import_preview"?e(nt(),"lg"):""}function Pe(){const e=n.modal==="edit_ev",t=e?l.events.find(c=>c.id===n.editEvId):{},i=(t==null?void 0:t.btcMembers)||[{code:"",name:""}];return`<div class="mh">${e?"✏️ Chỉnh sửa sự kiện":"📅 Tạo sự kiện mới"}</div>
    <div class="g2">
      <div class="fg sp"><label>Tên sự kiện *</label><input id="ev_n" placeholder="VD: OneHousing Elite Night — The Global City" value="${(t==null?void 0:t.name)||""}"/></div>
      <div class="fg"><label>Thời gian tổ chức</label><input id="ev_d" type="date" value="${(t==null?void 0:t.date)||""}"/></div>
      <div class="fg"><label>Team tổ chức</label><input id="ev_t" placeholder="VD: Marketing Miền Nam" value="${(t==null?void 0:t.team)||""}"/></div>
      <div class="fg sp"><label>Địa điểm</label><input id="ev_v" placeholder="VD: The Global City Ballroom" value="${(t==null?void 0:t.venue)||""}"/></div>
    </div>
    <div class="sec">🔐 Mật khẩu bảo vệ danh sách khách</div>
    ${e?`
      <div style="font-size:12px;color:#aaa;margin-bottom:8px">Đổi mật khẩu mới — để trống nếu muốn giữ nguyên mật khẩu cũ.</div>
      <div style="background:#f4f7fb;border-radius:8px;padding:10px 12px;margin-bottom:10px;font-size:13px;color:#555">
        Mật khẩu hiện tại: <span style="font-family:'JetBrains Mono',monospace;font-weight:600;color:#185FA5">${(t==null?void 0:t.eventPw)||"(chưa có)"}</span>
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
      ${i.map((c,o)=>`<div class="btc-r" id="br_${o}">
        <input placeholder="Mã NV" id="bc_${o}" value="${c.code||""}" style="max-width:110px;font-family:'JetBrains Mono',monospace;text-transform:uppercase"/>
        <input placeholder="Họ tên BTC" id="bn_${o}" value="${c.name||""}"/>
        ${o>0?`<button class="btn xs red" onclick="rmBR(${o})">✕</button>`:'<span style="width:22px"></span>'}
      </div>`).join("")}
    </div>
    <button class="btn sm" onclick="addBR()" style="margin-bottom:4px">+ Thêm BTC</button>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn ${e?"green":"blue"}" onclick="saveEv()">✅ ${e?"Lưu thay đổi":"Tạo sự kiện"}</button>
    </div>`}function Oe(){var i;const e=n.modal==="edit_g"&&n.editGid?l.guests.find(c=>c.id===n.editGid):{},t=(i=e==null?void 0:e.companions)!=null&&i.length?e.companions:[{name:"",phone:""}];return`<div class="mh">${n.modal==="edit_g"?"✏️ Chỉnh sửa khách mời":"👤 Thêm khách mời mới"}</div>
    <div class="fg"><label>Sự kiện *</label><select id="g_ev">${l.events.map(c=>`<option value="${c.id}" ${n.selEv===c.id||(e==null?void 0:e.eventId)===c.id?"selected":""}>${c.name}</option>`).join("")}</select></div>
    ${n.modal==="edit_g"?`<div style="margin-bottom:10px"><span style="font-size:12px;color:#aaa">Mã KH:</span> <span class="mono">${(e==null?void 0:e.guestCode)||""}</span> <span style="font-size:11px;color:#ccc">(cố định, không thay đổi)</span></div>`:""}
    <div class="sec">Thông tin khách hàng chính</div>
    <div class="g2">
      <div class="fg"><label>Họ và tên KH *</label><input id="g_n" placeholder="Nguyễn Văn A" value="${(e==null?void 0:e.name)||""}"/></div>
      <div class="fg"><label>Số điện thoại *</label><input id="g_ph" type="tel" placeholder="09xxxxxxxx" value="${(e==null?void 0:e.phone)||""}"/></div>
    </div>
    <div class="sec">👥 Người đi kèm <span style="text-transform:none;letter-spacing:0;font-weight:400">(mỗi người có QR & check-in riêng)</span></div>
    <div id="cp_w">
      ${t.map((c,o)=>{var s,d;return Ke(c,o,(d=(s=e==null?void 0:e.companions)==null?void 0:s[o])==null?void 0:d.code)}).join("")}
    </div>
    <button class="btn sm" onclick="addCR()" style="margin-bottom:4px">+ Thêm đi kèm</button>
    <div class="sec">Thông tin chăm sóc</div>
    <div class="g3">
      <div class="fg"><label>Tên PRM (Sales TCB)</label><input id="g_prm" placeholder="Tên PRM" value="${(e==null?void 0:e.prmName)||""}"/></div>
      <div class="fg"><label>Vùng TCB</label><input id="g_reg" placeholder="Vùng 1 HCM" value="${(e==null?void 0:e.tcbRegion)||""}"/></div>
      <div class="fg"><label>Đơn vị (CN/PGD)</label><input id="g_unit" placeholder="CN Thủ Đức" value="${(e==null?void 0:e.unit)||""}"/></div>
    </div>
    <div class="g2">
      <div class="fg"><label>Tên SIH (Sales OneHousing)</label><input id="g_sih" placeholder="Tên SIH" value="${(e==null?void 0:e.sihName)||""}"/></div>
      <div class="fg"><label>Note / Lưu ý</label><input id="g_note" placeholder="VVIP, ưu tiên bàn đầu..." value="${(e==null?void 0:e.note)||""}"/></div>
    </div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn ${n.modal==="edit_g"?"green":"blue"}" onclick="saveG()">✅ ${n.modal==="edit_g"?"Lưu thay đổi":"Thêm khách & Tạo vé"}</button>
    </div>`}function Ke(e,t,i){return`<div class="cp-r" id="cr_${t}">
    <div class="g2" style="margin-bottom:0">
      <div class="fg" style="margin-bottom:0"><label>Họ tên người đi kèm ${t+1}</label>
        <input placeholder="Họ và tên" id="cn_${t}" value="${e.name||""}"/></div>
      <div class="fg" style="margin-bottom:0"><label>Số điện thoại</label>
        <input placeholder="09xxxxxxxx" type="tel" id="cp_${t}" value="${e.phone||""}"/></div>
    </div>
    ${i?`<div style="margin-top:6px;font-size:11px;color:#aaa">Mã: <span class="mono">${i}</span> (cố định)</div>`:""}
    ${t>0?`<button class="btn xs red" onclick="rmCR(${t})" style="margin-top:6px">Xoá đi kèm này</button>`:""}
  </div>`}function Ge(){var c;const e=l.guests.find(o=>o.id===n.ticketGid);if(!e)return"";const t=l.events.find(o=>o.id===e.eventId),i=[{type:"main",name:e.name,code:e.guestCode,phone:e.phone},...(e.companions||[]).map(o=>({type:"comp",name:o.name,code:o.code,phone:o.phone,parentName:e.name}))];return`<div class="mh">🎫 Vé tham dự sự kiện</div>
    <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(t==null?void 0:t.name)||""} · ${S(t==null?void 0:t.date)}</div>
    <div style="font-size:12px;color:#bbb;margin-bottom:16px">${i.length} vé · 1 KH chính${(c=e.companions)!=null&&c.length?" + "+e.companions.length+" đi kèm":""}</div>
    <div class="tgrid">
      ${i.map((o,s)=>`
        <div class="ticket">
          <div class="tk-header">VÉ THAM DỰ SỰ KIỆN</div>
          <div style="font-size:11px;color:#bbb;margin-bottom:6px">${(t==null?void 0:t.name)||""}</div>
          <div style="font-size:11px;color:#bbb;margin-bottom:12px">${S(t==null?void 0:t.date)}${t!=null&&t.venue?" · "+t.venue:""}</div>
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
    </div>`}function je(){return`<div class="mh">✏️ Xác nhận chỉnh sửa</div>
    <div style="font-size:13px;color:#888;margin-bottom:12px">Nhập mật khẩu Admin để chỉnh sửa thông tin khách.</div>
    <div class="fg"><label>Mật khẩu Admin</label>
      <input type="password" id="epw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')chkEditPw()"/></div>
    <div id="epw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="chkEditPw()">Tiếp tục →</button>
    </div>`}function Ue(){var i;const e=l.guests.find(c=>c.id===n.editGid);if(!e)return"";const t=(i=e.companions)!=null&&i.length?e.companions:[{name:"",phone:"",code:""}];return`<div class="mh">✏️ Chỉnh sửa — ${e.name}</div>
    <div style="margin-bottom:12px"><span class="mono">${e.guestCode}</span> <span style="font-size:11px;color:#ccc">(mã cố định)</span></div>
    <div class="sec">Thông tin khách hàng chính</div>
    <div class="g2">
      <div class="fg"><label>Họ và tên KH</label><input id="eg_n" value="${e.name||""}"/></div>
      <div class="fg"><label>Số điện thoại</label><input id="eg_ph" type="tel" value="${e.phone||""}"/></div>
    </div>
    <div class="sec">Người đi kèm</div>
    <div id="ecp_w">
      ${t.map((c,o)=>`<div class="cp-r" id="ecr_${o}">
        <div class="g2" style="margin-bottom:0">
          <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${o+1}</label><input id="ecn_${o}" value="${c.name||""}"/></div>
          <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="ecp_${o}" type="tel" value="${c.phone||""}"/></div>
        </div>
        <div style="margin-top:5px;font-size:11px;color:#aaa">Mã: <span class="mono">${c.code||"—"}</span> (cố định)</div>
      </div>`).join("")}
    </div>
    <div class="sec">Thông tin chăm sóc</div>
    <div class="g3">
      <div class="fg"><label>PRM</label><input id="eg_prm" value="${e.prmName||""}"/></div>
      <div class="fg"><label>Vùng TCB</label><input id="eg_reg" value="${e.tcbRegion||""}"/></div>
      <div class="fg"><label>Đơn vị</label><input id="eg_unit" value="${e.unit||""}"/></div>
    </div>
    <div class="g2">
      <div class="fg"><label>SIH</label><input id="eg_sih" value="${e.sihName||""}"/></div>
      <div class="fg"><label>Note</label><input id="eg_note" value="${e.note||""}"/></div>
    </div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn green" onclick="doEdit()">💾 Lưu</button>
    </div>`}function Xe(){const e=l.guests.find(t=>t.id===n.delGid);return`<div class="mh">🗑️ Xoá khách hàng</div>
    <div style="text-align:center;padding:8px 0">
      <div style="font-size:13px;color:#555;margin-bottom:4px">Xoá <b>${(e==null?void 0:e.name)||""}</b> — <span class="mono">${(e==null?void 0:e.guestCode)||""}</span></div>
      <div style="font-size:12px;color:#bbb;margin-bottom:16px">Hành động này không thể hoàn tác. Người đi kèm cũng bị xoá.</div>
    </div>
    <div class="fg"><label>Mật khẩu Admin để xác nhận</label>
      <input type="password" id="dpw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')doDel()"/></div>
    <div id="dpw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn red" onclick="doDel()">🗑️ Xoá</button>
    </div>`}function qe(){const{gid:e,cpId:t}=n.cpTicket||{},i=l.guests.find(s=>s.id===e),c=((i==null?void 0:i.companions)||[]).find(s=>s.id===t);if(!i||!c)return"";const o=l.events.find(s=>s.id===i.eventId);return`<div class="mh">🎫 Vé người đi kèm</div>
    <div class="ticket" style="margin:8px 0">
      <div class="tk-header">VÉ THAM DỰ SỰ KIỆN</div>
      <div style="font-size:11px;color:#bbb;margin-bottom:6px">${(o==null?void 0:o.name)||""}</div>
      <div style="font-size:11px;color:#bbb;margin-bottom:12px">${S(o==null?void 0:o.date)}${o!=null&&o.venue?" · "+o.venue:""}</div>
      <div class="tk-name">${c.name}</div>
      <span class="tk-role b-purple">Đi kèm: ${i.name}</span>
      <div class="tk-qr" id="cp_tqr"></div>
      <div class="tk-code">${c.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <div class="mf" style="justify-content:center">
      <button class="btn sm" onclick="dlCpTicket()">⬇️ Tải vé này</button>
      <button class="btn" onclick="closeM()">Đóng</button>
    </div>`}function Je(){const{gid:e,cpId:t}=n.cpEdit||{},i=l.guests.find(o=>o.id===e),c=((i==null?void 0:i.companions)||[]).find(o=>o.id===t);return!i||!c?"":`<div class="mh">✏️ Sửa người đi kèm</div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Mã: <span class="mono">${c.code}</span> (cố định)</div>
    <div class="fg"><label>Họ và tên</label>
      <input id="cpe_n" value="${c.name}" autofocus/></div>
    <div class="fg"><label>Số điện thoại</label>
      <input id="cpe_ph" type="tel" value="${c.phone||""}"/></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn green" onclick="doCpEdit()">💾 Lưu</button>
    </div>`}function Qe(){const{gid:e,cpId:t}=n.cpDel||{},i=l.guests.find(o=>o.id===e),c=((i==null?void 0:i.companions)||[]).find(o=>o.id===t);return!i||!c?"":`<div class="mh">🗑️ Xoá người đi kèm</div>
    <div style="text-align:center;padding:8px 0">
      <div style="font-size:13px;color:#555;margin-bottom:4px">Xoá <b>${c.name}</b> <span class="mono">${c.code}</span></div>
      <div style="font-size:12px;color:#aaa;margin-bottom:4px">Đi kèm: ${i.name}</div>
      <div style="font-size:12px;color:#bbb;margin-bottom:14px">Hành động này không thể hoàn tác.</div>
    </div>
    <div class="fg"><label>Mật khẩu Admin để xác nhận</label>
      <input type="password" id="cpdpw" placeholder="Nhập mật khẩu..." autofocus onkeydown="if(event.key==='Enter')doCpDel()"/></div>
    <div id="cpdpw_err" class="err"></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn red" onclick="doCpDel()">🗑️ Xoá</button>
    </div>`}function We(){const e=l.guests.find(t=>t.id===n.cpAdd);return e?`<div class="mh">👤 Thêm người đi kèm</div>
    <div style="font-size:13px;color:#888;margin-bottom:14px">Thêm cho: <b>${e.name}</b> <span class="mono">${e.guestCode}</span></div>
    <div class="fg"><label>Họ và tên *</label>
      <input id="cpa_n" placeholder="Họ và tên người đi kèm" autofocus/></div>
    <div class="fg"><label>Số điện thoại</label>
      <input id="cpa_ph" type="tel" placeholder="09xxxxxxxx"/></div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn blue" onclick="doCpAdd()">✅ Thêm & Tạo vé</button>
    </div>`:""}function Ze(){var d;const{gid:e,type:t,cpId:i}=n.adminCI||{},c=l.guests.find(a=>a.id===e);if(!c)return"";const o=t==="c"?(c.companions||[]).find(a=>a.id===i):c;if(!o)return"";l.events.find(a=>a.id===c.eventId);const s=!!o.phone;return`<div class="mh">✅ Xác nhận Check-in</div>
    <div style="background:#f4f7fb;border-radius:12px;padding:16px;margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#aaa;margin-bottom:6px">THÔNG TIN KHÁCH</div>
      <div style="font-size:18px;font-weight:800;margin-bottom:4px">${o.name}</div>
      <div style="font-size:13px;color:#185FA5;margin-bottom:4px">Mã: <span style="font-family:'JetBrains Mono',monospace">${t==="c"?((d=(c.companions||[]).find(a=>a.id===i))==null?void 0:d.code)||"—":c.guestCode}</span></div>
      ${t==="c"?`<div style="margin-top:4px"><span class="badge b-purple">Đi kèm: ${c.name}</span></div>`:""}
      ${c.note&&t==="g"?`<div style="margin-top:6px"><span class="badge b-amber">${c.note}</span></div>`:""}
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
      </div>`}`}function Ye(){const{gid:e,type:t,cpId:i}=n.cancelTarget||{},c=l.guests.find(s=>s.id===e);if(!c)return"";const o=t==="c"?(c.companions||[]).find(s=>s.id===i):c;return o?`<div class="mh">🚫 Đánh dấu Cancel</div>
    <div style="background:#FFF8F8;border-radius:10px;padding:14px;margin-bottom:14px;border:1px solid #FECACA">
      <div style="font-size:15px;font-weight:700">${o.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:3px">Mã: <span class="mono">${t==="c"?o.code:c.guestCode}</span>${t==="c"?` · Đi kèm: ${c.name}`:""}</div>
    </div>
    <div class="fg">
      <label>Lý do cancel / Ghi chú (tuỳ chọn)</label>
      <textarea id="cancel_note" placeholder="VD: KH có việc đột xuất, chưa xác nhận lại..." style="resize:vertical;min-height:70px;padding:9px 12px;border:1.5px solid #dde4f0;border-radius:8px;font-size:13px;width:100%"></textarea>
    </div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Khách sẽ được giữ trong hệ thống và hiện trong báo cáo với trạng thái Cancel. Có thể khôi phục bất kỳ lúc nào.</div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ</button>
      <button class="btn red" onclick="doCancel()">🚫 Xác nhận Cancel</button>
    </div>`:""}function et(){const e=l.events.find(t=>t.id===n.evUnlockTarget);return e?`<div class="mh">🔒 Nhập mật khẩu sự kiện</div>
    <div style="background:#f4f7fb;border-radius:10px;padding:14px;margin-bottom:16px">
      <div style="font-size:15px;font-weight:700">${e.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:3px">${S(e.date)}${e.team?" · "+e.team:""}</div>
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
    </div>`:""}function tt(){var c;const e=l.events.find(o=>o.id===n.evUnlockTarget);if(!e)return;if((((c=document.getElementById("ev_unlock_pw"))==null?void 0:c.value)||"")!==e.eventPw){const o=document.getElementById("ev_unlock_err");o&&(o.textContent="⚠️ Mật khẩu không đúng.");const s=document.getElementById("ev_unlock_pw");s&&(s.value="",s.focus());return}n.unlockedEvs[n.evUnlockTarget]=!0;const i=n.evUnlockTarget;if(n.evUnlockTarget=null,n.modal=null,n.rptEv===i){u();return}n.selEv=i,n.tab="guests",n.search="",n.filter="all",u()}function nt(){const e=n.importData||[];return`
    <div class="mh">📊 Xác nhận Import danh sách từ Excel</div>
    <div style="font-size:12px;color:#aaa;margin-bottom:12px">Hệ thống tìm thấy <b>${e.length} dòng dữ liệu</b>. Vui lòng kiểm tra kỹ trước khi lưu.</div>
    <div style="max-height:300px;overflow-y:auto;border:1.5px solid #dde4f0;border-radius:10px;margin-bottom:12px">
      <table class="tbl">
        <thead>
          <tr>
            <th>Loại</th><th>Họ và tên</th><th>Số điện thoại</th><th>Tên PRM</th><th>Vùng TCB</th><th>Đơn vị</th><th>Tên SIH</th><th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(t=>`
            <tr>
              <td><span class="badge ${t.type==="Main"?"b-blue":"b-purple"}">${t.type==="Main"?"KH Chính":"Đi kèm"}</span></td>
              <td style="font-weight:600">${t.name||"—"}</td>
              <td>${t.phone||"—"}</td>
              <td>${t.prmName||"—"}</td>
              <td>${t.tcbRegion||"—"}</td>
              <td>${t.unit||"—"}</td>
              <td>${t.sihName||"—"}</td>
              <td style="color:#aaa;font-style:italic">${t.note||"—"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    <div class="mf">
      <button class="btn" onclick="closeM()">Huỷ bỏ</button>
      <button class="btn green" onclick="commitExcelImport()">💾 Xác nhận Lưu vào hệ thống</button>
    </div>
  `}function it(){const e=n.urlCode;let t=null;for(const d of l.guests){if(d.guestCode===e){t={type:"guest",guest:d,person:d};break}for(const a of d.companions||[])if(a.code===e){t={type:"comp",guest:d,person:a};break}if(t)break}const i=t?l.events.find(d=>{var a;return d.id===((a=t==null?void 0:t.guest)==null?void 0:a.eventId)}):null;if(!t)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">❌</div>
      <div style="font-size:18px;font-weight:700;color:#a32d2d;margin-bottom:8px">Không tìm thấy vé</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:20px">Mã <b>${e}</b> không tồn tại trong hệ thống.</div>
    </div>`;const c=t.person,o=t.guest;if(n.urlCIStep==="done")return`<div style="max-width:400px;margin:40px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:64px;margin-bottom:12px">🎉</div>
      <div style="font-size:22px;font-weight:800;color:#0C447C;margin-bottom:10px">Check-in thành công!</div>
      <div style="font-size:17px;font-weight:600;color:#185FA5;margin-bottom:4px">${c.name}</div>
      ${t.type==="comp"?`<div style="font-size:13px;color:#6D28D9;margin-bottom:4px">Đi kèm: ${o.name}</div>`:""}
      <div style="font-size:13px;color:#aaa">${(i==null?void 0:i.name)||""}</div>
      ${o.note?`<div style="display:inline-block;margin-top:8px;background:#FFFBEB;color:#92400E;font-size:12px;padding:4px 12px;border-radius:20px">${o.note}</div>`:""}
      <div style="font-size:12px;color:#bbb;margin-top:12px">Ghi nhận lúc: ${X(c.checkinTime)}</div>
      ${n.urlCISyncWarn?`<div style="margin-top:14px;background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:10px;text-align:left">
        ⚠️ Đã ghi nhận check-in trên thiết bị này, nhưng <b>chưa đồng bộ được lên hệ thống trung tâm</b> (có thể do mất mạng).
        Vui lòng báo BTC kỹ thuật kiểm tra lại để đảm bảo dữ liệu được cập nhật đầy đủ.
      </div>`:""}
      <div style="margin-top:24px"><button onclick="window.close()" style="padding:10px 24px;background:#185FA5;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-family:'Be Vietnam Pro',sans-serif">Đóng</button></div>
    </div>`;if(c.checkedIn)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">⚠️</div>
      <div style="font-size:18px;font-weight:700;color:#BA7517;margin-bottom:8px">Vé đã được sử dụng</div>
      <div style="font-size:15px;font-weight:600">${c.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:6px">Check-in lúc: ${X(c.checkinTime)}</div>
      <div style="font-size:12px;color:#aaa">Xác nhận bởi: ${c.checkinBy||"—"}</div>
    </div>`;if(c.cancelled)return`<div style="max-width:400px;margin:60px auto;padding:24px;text-align:center;font-family:'Be Vietnam Pro',sans-serif">
      <div style="font-size:52px;margin-bottom:12px">🚫</div>
      <div style="font-size:18px;font-weight:700;color:#B91C1C;margin-bottom:8px">Vé đã bị huỷ</div>
      <div style="font-size:15px;font-weight:600">${c.name}</div>
      <div style="font-size:12px;color:#aaa;margin-top:6px">${c.cancelNote||""}</div>
    </div>`;const s=!!c.phone;return`<div style="max-width:420px;margin:0 auto;padding:20px 16px;font-family:'Be Vietnam Pro',sans-serif">
    <div style="text-align:center;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #eaecf0">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#bbb;margin-bottom:8px">VÉ THAM DỰ SỰ KIỆN</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(i==null?void 0:i.name)||"—"}</div>
      <div style="font-size:13px;color:#aaa">${S(i==null?void 0:i.date)}${i!=null&&i.venue?" · "+i.venue:""}</div>
    </div>
    <div style="background:#f4f7fb;border-radius:12px;padding:16px;margin-bottom:20px;text-align:center">
      <div style="font-size:20px;font-weight:800;color:#1a1a2e">${c.name}</div>
      ${t.type==="comp"?`<div style="font-size:12px;color:#6D28D9;margin-top:4px;font-weight:500">Đi kèm: ${o.name}</div>`:""}
      <div style="font-family:'JetBrains Mono',monospace;font-size:14px;color:#aaa;margin-top:6px;letter-spacing:1px">${e}</div>
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
    <button onclick="doUrlCI()" ${n.urlCIBusy?"disabled":""} style="width:100%;padding:14px;background:${n.urlCIBusy?"#aaa":"#3B6D11"};color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:${n.urlCIBusy?"default":"pointer"};font-family:'Be Vietnam Pro',sans-serif">${n.urlCIBusy?"⏳ Đang xác nhận...":"✅ Xác nhận Check-in"}</button>
  </div>`}function ot(){setTimeout(()=>{const e=document.getElementById("uci_phone")||document.getElementById("uci_btc");e&&e.focus()},80)}async function ct(){var r,g;const e=n.urlCode;let t=null;for(const f of l.guests){if(f.guestCode===e){t={type:"guest",guest:f,person:f};break}for(const x of f.companions||[])if(x.code===e){t={type:"comp",guest:f,person:x};break}if(t)break}if(!t)return;const i=t.person,c=t.guest,o=l.events.find(f=>f.id===c.eventId);if(R(o)){const f=document.getElementById("uci_err");f&&(f.textContent="⚠️ Sự kiện đã kết thúc. Không thể check-in.");return}const s=(((r=document.getElementById("uci_btc"))==null?void 0:r.value)||"").toUpperCase().trim();if(!((o==null?void 0:o.btcMembers)||[]).find(f=>f.code===s)){const f=document.getElementById("uci_err");f&&(f.textContent="⚠️ Mã BTC không đúng hoặc không thuộc sự kiện này.");return}const a=i.phone?i.phone.replace(/\D/g,"").slice(-4):"";if(a&&(((g=document.getElementById("uci_phone"))==null?void 0:g.value)||"").trim()!==a){const x=document.getElementById("uci_err");x&&(x.textContent="⚠️ 4 số cuối SĐT không khớp.");const k=document.getElementById("uci_phone");k&&(k.value="",k.focus());return}if(n.urlCIBusy)return;n.urlCIBusy=!0,u();const h=new Date().toISOString();t.type==="guest"?(c.checkedIn=!0,c.checkinTime=h,c.checkinBy=s):(i.checkedIn=!0,i.checkinTime=h,i.checkinBy=s),w();const m=t.type==="guest"?{checked_in:!0,checkin_time:h,checkin_by:s}:{companions:c.companions||[]},v=await re(c.id,m);n.urlCIBusy=!1,n.urlCISyncWarn=!v,n.urlCIStep="done",u()}function st(){if(!n.ciOk)return lt();if(!n.ciState)return fe();const e=n.ciState;return e.step==="verify"?at():e.step==="done"?rt():e.step==="err"?pt():fe()}function dt(){setTimeout(()=>{const e=document.getElementById("ci_in")||document.getElementById("ci_ph")||document.getElementById("lock_c");e&&e.focus()},80)}function lt(){return`<div class="lock">
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:40px">🔐</div>
      <div style="font-size:17px;font-weight:800;margin-top:8px">Đăng nhập Check-in</div>
      <div style="font-size:13px;color:#aaa;margin-top:4px">Chọn sự kiện và nhập mã nhân viên BTC</div>
    </div>
    <div class="fg"><label>Sự kiện</label><select id="lock_ev" style="width:100%" onchange="S.ciEv=this.value">
      <option value="">-- Chọn sự kiện --</option>
      ${l.events.map(e=>`<option value="${e.id}" ${n.ciEv===e.id?"selected":""}>${e.name} (${S(e.date)})</option>`).join("")}
    </select></div>
    <div class="fg"><label>Mã nhân viên BTC</label>
      <input id="lock_c" placeholder="VD: NV001" style="text-transform:uppercase;font-family:'JetBrains Mono',monospace;letter-spacing:2px;font-size:16px;text-align:center;padding:12px"
        onkeydown="if(event.key==='Enter')tryUnlock()"/></div>
    <button class="btn blue full" onclick="tryUnlock()">Vào hệ thống →</button>
    <div id="lock_err" class="err" style="text-align:center;margin-top:8px"></div>
    <div style="text-align:center;margin-top:166px"><button class="btn ghost" onclick="backAdmin()">← Về trang quản trị</button></div>
  </div>`}function fe(){var o;const e=l.events.find(s=>s.id===n.ciEv),t=ce(n.ciEv),i=q(n.ciEv),c=[];return i.forEach(s=>{s.checkedIn&&c.push({name:s.name,code:s.guestCode,time:s.checkinTime,tag:"KH"}),(s.companions||[]).forEach(d=>{d.checkedIn&&c.push({name:d.name,code:d.code,time:d.checkinTime,tag:"ĐK"})})}),c.sort((s,d)=>new Date(d.time)-new Date(s.time)),`<div class="ci-screen">
    <div class="ci-head">
      <button class="btn ghost sm" onclick="backAdmin()">←</button>
      <div style="flex:1"><div style="font-weight:700;font-size:14px">${(e==null?void 0:e.name)||"Sự kiện"}</div>
        <div style="font-size:12px;color:#aaa">${t.c}/${t.t} đã check-in · BTC: ${((o=n.ciOp)==null?void 0:o.name)||"—"}</div></div>
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
        <div style="font-size:11px;color:#3B6D11;font-weight:600">${te(s.time)}</div>
      </div>`).join("")}
    </div>`:""}
  </div>`}function at(){const e=n.ciState,t=e.person,i=e.guest;return`<div class="ci-screen">
    <div class="ci-head"><button class="btn ghost sm" onclick="cancelCI()">←</button>
      <div style="font-size:14px;font-weight:600">Xác minh danh tính</div></div>
    <div style="text-align:center;padding:20px 16px">
      <div style="background:#f4f7fb;border-radius:12px;padding:16px;display:inline-block;min-width:250px;margin-bottom:20px;text-align:left">
        <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#aaa;margin-bottom:6px">XÁC NHẬN CHECK-IN</div>
        <div style="font-size:18px;font-weight:800">${t.name}</div>
        <div style="font-size:13px;color:#185FA5;margin-top:4px">Mã: <span style="font-family:'JetBrains Mono',monospace">${e.code}</span></div>
        ${e.type==="comp"?`<div style="margin-top:6px"><span class="badge b-purple">Đi kèm: ${i.name}</span></div>`:""}
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
  </div>`}function rt(){const e=n.ciState,t=e.person,i=e.guest,c=l.events.find(o=>o.id===i.eventId);return`<div class="ci-screen"><div class="big-result">
    <div class="icon">🎉</div>
    <div style="font-size:22px;font-weight:800;color:#0C447C;margin-bottom:10px">Check-in thành công!</div>
    <div style="font-size:17px;font-weight:600;color:#185FA5;margin-bottom:4px">${t.name}</div>
    ${e.type==="comp"?`<div style="margin-bottom:4px"><span class="badge b-purple">Đi kèm: ${i.name}</span></div>`:""}
    <div style="font-size:13px;color:#aaa;margin-bottom:4px">${(c==null?void 0:c.name)||""}</div>
    ${e.type==="guest"&&(i.companions||[]).length?`<div style="font-size:12px;color:#BA7517;margin-top:10px;padding:8px 16px;background:#FFFBEB;border-radius:8px;display:inline-block">⚠️ ${i.companions.length} người đi kèm cần check-in riêng</div>`:""}
    ${i.note?`<div style="margin-top:10px;display:inline-block"><span class="badge b-amber">${i.note}</span></div>`:""}
    <div style="font-size:12px;color:#bbb;margin-top:12px">Ghi nhận lúc: ${X(t.checkinTime)} · BTC: ${t.checkinBy||"—"}</div>
    ${n.ciSyncWarn?`<div style="margin-top:14px;background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:10px;text-align:left;max-width:360px;margin-left:auto;margin-right:auto">
      ⚠️ Đã ghi nhận check-in trên thiết bị này, nhưng <b>chưa đồng bộ được lên hệ thống trung tâm</b> (có thể do mất mạng).
      Vui lòng kiểm tra lại kết nối và báo kỹ thuật nếu tình trạng tiếp diễn.
    </div>`:""}
    <div style="margin-top:24px">
      <button class="btn blue" onclick="nextCI()" style="padding:12px 32px;font-size:15px">📷 Scan vé tiếp theo</button>
    </div>
  </div></div>`}function pt(){return`<div class="ci-screen"><div class="big-result">
    <div class="icon">❌</div>
    <div style="font-size:18px;font-weight:700;color:#a32d2d;margin-bottom:8px">Xác minh thất bại</div>
    <div style="font-size:13px;color:#888;max-width:280px;margin:0 auto">${n.ciState.msg||"Thông tin không khớp"}</div>
    <div style="margin-top:20px"><button class="btn" onclick="cancelCI()" style="padding:10px 24px">← Thử lại</button></div>
  </div></div>`}function ut(e){n.tab=e,u()}function mt(e){const t=l.events.find(i=>i.id===e);if(t){if(t.eventPw&&!n.unlockedEvs[e]){n.evUnlockTarget=e,n.modal="ev_unlock",u();return}n.selEv=e,n.tab="guests",n.search="",n.filter="all",u()}}function ht(e){if(!e){n.selEv=null,n.search="",n.filter="all",u();return}const t=l.events.find(i=>i.id===e);if(t){if(t.eventPw&&!n.unlockedEvs[e]){n.evUnlockTarget=e,n.modal="ev_unlock",u();return}n.selEv=e,n.search="",n.filter="all",u()}}function vt(e){n.search=e,u()}function ft(e){n.filter=e,u()}function gt(e){n.modal=e,u()}function bt(e){n.editGid=e,n.modal="edit_pw",u()}function xt(e){n.delGid=e,n.modal="del_pw",u()}function yt(e){n.ticketGid=e,n.modal="tickets",u()}function Z(){n.modal=null,n.editGid=null,n.delGid=null,n.cpTicket=null,n.cpEdit=null,n.cpDel=null,n.cpAdd=null,n.adminCI=null,n.cancelTarget=null,n.evUnlockTarget=null,n.editEvId=null,n.importData=null,u()}function kt(e){const t=l.events.find(i=>i.id===e);if(t){if(R(t)){alert("Sự kiện đã kết thúc. Không thể chỉnh sửa thông tin sự kiện.");return}if(t.eventPw&&!n.unlockedEvs[e]){n.evUnlockTarget=e,n.modal="ev_unlock",u();return}n.editEvId=e,n.modal="edit_ev",u()}}function wt(e,t){n.cpTicket={gid:e,cpId:t},n.modal="cp_ticket",u(),setTimeout(()=>W(),120)}function $t(e,t){n.cpEdit={gid:e,cpId:t},n.modal="cp_edit",u()}function Ct(e,t){n.cpDel={gid:e,cpId:t},n.modal="cp_del",u()}function It(e){n.cpAdd=e,n.modal="cp_add",u()}function Et(e,t,i){n.cancelTarget={gid:e,type:t,cpId:i||null},n.modal="cancel",u()}function _t(){var s;const{gid:e,type:t,cpId:i}=n.cancelTarget||{},c=l.guests.find(d=>d.id===e);if(!c)return;if(R(oe(c.eventId))){alert("Sự kiện đã kết thúc. Không thể thay đổi."),Z();return}const o=(((s=document.getElementById("cancel_note"))==null?void 0:s.value)||"").trim();if(t==="c"){const d=(c.companions||[]).find(a=>a.id===i);d&&(d.cancelled=!0,d.cancelNote=o,d.checkedIn=!1,d.checkinTime=null)}else c.cancelled=!0,c.cancelNote=o,c.checkedIn=!1,c.checkinTime=null,(c.companions||[]).forEach(d=>{d.cancelled=!0,d.cancelNote=o?`[Theo KH chính] ${o}`:"Theo KH chính",d.checkedIn=!1,d.checkinTime=null});w(),n.modal=null,n.cancelTarget=null,u()}function Tt(e,t,i){const c=l.guests.find(o=>o.id===e);if(c){if(t==="c"){const o=(c.companions||[]).find(s=>s.id===i);o&&(o.cancelled=!1,o.cancelNote="")}else c.cancelled=!1,c.cancelNote="",(c.companions||[]).forEach(o=>{o.cancelled=!1,o.cancelNote=""});w(),u()}}function Bt(){n.view="checkin",n.ciOk=!1,n.ciEv=null,n.ciOp=null,n.ciState=null,u()}function zt(){n.view="admin",n.ciOk=!1,n.ciState=null,u()}function Mt(){n.ciOk=!1,n.ciOp=null,n.ciState=null,u()}function St(){n.ciState=null,n.ciSyncWarn=!1,u()}function Nt(){n.ciState=null,n.ciSyncWarn=!1,u()}function At(){const e=document.getElementById("btc_w");if(!e)return;const t=e.querySelectorAll(".btc-r").length,i=document.createElement("div");i.className="btc-r",i.id="br_"+t,i.innerHTML=`<input placeholder="Mã NV" id="bc_${t}" style="max-width:110px;font-family:'JetBrains Mono',monospace;text-transform:uppercase"/>
    <input placeholder="Họ tên BTC" id="bn_${t}"/>
    <button class="btn xs red" onclick="rmBR(${t})" style="flex-shrink:0">✕</button>`,e.appendChild(i)}function Dt(e){const t=document.getElementById("br_"+e);t&&t.remove()}function Rt(){const e=document.getElementById("btc_w");if(!e)return[];const t=[];return e.querySelectorAll(".btc-r").forEach(i=>{var s,d;const c=(((s=i.querySelector("input:first-child"))==null?void 0:s.value)||"").toUpperCase().trim(),o=(((d=i.querySelector("input:nth-child(2)"))==null?void 0:d.value)||"").trim();c&&o&&t.push({code:c,name:o})}),t}function Ht(){const e=document.getElementById("cp_w");if(!e)return;const t=e.querySelectorAll(".cp-r").length,i=document.createElement("div");i.id="cr_"+t,i.className="cp-r",i.innerHTML=`<div class="g2" style="margin-bottom:0">
    <div class="fg" style="margin-bottom:0"><label>Tên đi kèm ${t+1}</label><input id="cn_${t}" placeholder="Họ và tên"/></div>
    <div class="fg" style="margin-bottom:0"><label>SĐT</label><input id="cp_${t}" type="tel" placeholder="09xxxxxxxx"/></div>
  </div><button class="btn xs red" onclick="rmCR(${t})" style="margin-top:6px">Xoá đi kèm này</button>`,document.getElementById("cp_w").appendChild(i)}function Vt(e){const t=document.getElementById("cr_"+e);t&&t.remove()}function Lt(e){const t=document.getElementById("cp_w");if(!t)return[];const i=[];return t.querySelectorAll(".cp-r").forEach(c=>{var h,m;const o=c.id.replace(/[^0-9]/g,""),s="c",d=(((h=document.getElementById(s+"n_"+o))==null?void 0:h.value)||"").trim(),a=(((m=document.getElementById(s+"p_"+o))==null?void 0:m.value)||"").trim();d&&i.push({name:d,phone:a})}),i}function Ft(){var m,v,r,g,f,x,k,_,N;const e=n.modal==="edit_ev",t=(v=(m=document.getElementById("ev_n"))==null?void 0:m.value)==null?void 0:v.trim(),i=(r=document.getElementById("ev_d"))==null?void 0:r.value,c=(f=(g=document.getElementById("ev_t"))==null?void 0:g.value)==null?void 0:f.trim(),o=(k=(x=document.getElementById("ev_v"))==null?void 0:x.value)==null?void 0:k.trim(),s=(((_=document.getElementById("ev_pw"))==null?void 0:_.value)||"").trim(),d=(((N=document.getElementById("ev_pw2"))==null?void 0:N.value)||"").trim(),a=Rt();if(!t){alert("Vui lòng nhập tên sự kiện");return}if(!a.length){alert("Cần ít nhất 1 thành viên BTC");return}const h=document.getElementById("ev_pw_err");if(e){if(s&&s!==d){h&&(h.textContent="⚠️ Mật khẩu nhập lại không khớp");return}const I=l.events.findIndex(A=>A.id===n.editEvId);if(I<0)return;const B=l.events[I],z=s||B.eventPw;l.events[I]={...B,name:t,date:i,team:c,venue:o,eventPw:z,btcMembers:a},s&&(n.unlockedEvs[n.editEvId]=!0),w(),n.modal=null,n.editEvId=null,u()}else{if(!s){h&&(h.textContent="⚠️ Vui lòng đặt mật khẩu cho sự kiện");return}if(s!==d){h&&(h.textContent="⚠️ Mật khẩu nhập lại không khớp");return}const I={id:H(),name:t,date:i,team:c,venue:o,eventPw:s,btcMembers:a,createdAt:Date.now()};l.events.push(I),n.unlockedEvs[I.id]=!0,n.selEv=I.id,w(),n.modal=null,n.tab="guests",u()}}function Pt(e){confirm("Xoá sự kiện này? Toàn bộ khách cũng bị xoá.")&&(l.events=l.events.filter(t=>t.id!==e),l.guests=l.guests.filter(t=>t.eventId!==e),n.selEv===e&&(n.selEv=null),w(),be("oh_events",e),u())}function Ot(){var m,v,r,g,f,x,k,_,N,I,B,z,A,V,L;const e=(m=document.getElementById("g_ev"))==null?void 0:m.value,t=(r=(v=document.getElementById("g_n"))==null?void 0:v.value)==null?void 0:r.trim(),i=(f=(g=document.getElementById("g_ph"))==null?void 0:g.value)==null?void 0:f.trim(),c=(k=(x=document.getElementById("g_prm"))==null?void 0:x.value)==null?void 0:k.trim(),o=(N=(_=document.getElementById("g_reg"))==null?void 0:_.value)==null?void 0:N.trim(),s=(B=(I=document.getElementById("g_unit"))==null?void 0:I.value)==null?void 0:B.trim(),d=(A=(z=document.getElementById("g_sih"))==null?void 0:z.value)==null?void 0:A.trim(),a=(L=(V=document.getElementById("g_note"))==null?void 0:V.value)==null?void 0:L.trim();if(!t){alert("Vui lòng nhập họ tên KH");return}if(!e){alert("Vui lòng chọn sự kiện");return}if(R(oe(e))){alert("Sự kiện đã kết thúc. Không thể thêm/sửa khách."),Z();return}const h=Lt();if(n.modal==="edit_g"&&n.editGid){const T=l.guests.findIndex(p=>p.id===n.editGid);if(T>-1){const p=l.guests[T],y=p.companions||[],$=h.map(M=>{const C=y.find(J=>J.name===M.name&&J.code);return C?{...C,phone:M.phone}:{id:H(),name:M.name,phone:M.phone,code:K(e),checkedIn:!1,checkinTime:null,checkinBy:null}});l.guests[T]={...p,eventId:e,name:t,phone:i,prmName:c,tcbRegion:o,unit:s,sihName:d,note:a,companions:$},n.ticketGid=n.editGid}}else{const T=K(e),p=h.map($=>({id:H(),name:$.name,phone:$.phone,code:K(e),checkedIn:!1,checkinTime:null,checkinBy:null})),y={id:H(),eventId:e,guestCode:T,name:t,phone:i,prmName:c,tcbRegion:o,unit:s,sihName:d,note:a,companions:p,checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()};l.guests.push(y),n.ticketGid=y.id}n.selEv=e,w(),n.editGid=null,n.modal="tickets",u()}function Kt(){var t;if((((t=document.getElementById("epw"))==null?void 0:t.value)||"")===ne)n.modal="edit_form",u();else{const i=document.getElementById("epw_err");i&&(i.textContent="⚠️ Mật khẩu không đúng.")}}function Gt(){var v,r,g,f,x,k,_,N,I,B,z,A,V,L;const e=l.guests.find(T=>T.id===n.editGid);if(!e)return;const t=l.guests.indexOf(e),i=((r=(v=document.getElementById("eg_n"))==null?void 0:v.value)==null?void 0:r.trim())||e.name,c=((f=(g=document.getElementById("eg_ph"))==null?void 0:g.value)==null?void 0:f.trim())||e.phone,o=(k=(x=document.getElementById("eg_prm"))==null?void 0:x.value)==null?void 0:k.trim(),s=(N=(_=document.getElementById("eg_reg"))==null?void 0:_.value)==null?void 0:N.trim(),d=(B=(I=document.getElementById("eg_unit"))==null?void 0:I.value)==null?void 0:B.trim(),a=(A=(z=document.getElementById("eg_sih"))==null?void 0:z.value)==null?void 0:A.trim(),h=(L=(V=document.getElementById("eg_note"))==null?void 0:V.value)==null?void 0:L.trim(),m=(e.companions||[]).map((T,p)=>{var y,$,M,C;return{...T,name:(($=(y=document.getElementById("ecn_"+p))==null?void 0:y.value)==null?void 0:$.trim())||T.name,phone:((C=(M=document.getElementById("ecp_"+p))==null?void 0:M.value)==null?void 0:C.trim())||T.phone}});l.guests[t]={...e,name:i,phone:c,prmName:o,tcbRegion:s,unit:d,sihName:a,note:h,companions:m},w(),n.modal=null,n.editGid=null,u()}function jt(){var i;if((((i=document.getElementById("dpw"))==null?void 0:i.value)||"")!==ne){const c=document.getElementById("dpw_err");c&&(c.textContent="⚠️ Mật khẩu không đúng.");return}const t=n.delGid;l.guests=l.guests.filter(c=>c.id!==t),w(),be("oh_guests",t),n.modal=null,n.delGid=null,u()}function Ut(){var a,h,m,v;const{gid:e,cpId:t}=n.cpEdit||{},i=l.guests.find(r=>r.id===e);if(!i)return;const c=l.guests.indexOf(i),o=(i.companions||[]).findIndex(r=>r.id===t);if(o<0)return;const s=(h=(a=document.getElementById("cpe_n"))==null?void 0:a.value)==null?void 0:h.trim(),d=(v=(m=document.getElementById("cpe_ph"))==null?void 0:m.value)==null?void 0:v.trim();if(!s){alert("Vui lòng nhập họ tên");return}l.guests[c].companions[o]={...l.guests[c].companions[o],name:s,phone:d},w(),n.modal=null,n.cpEdit=null,u()}function Xt(){var o;if((((o=document.getElementById("cpdpw"))==null?void 0:o.value)||"")!==ne){const s=document.getElementById("cpdpw_err");s&&(s.textContent="⚠️ Mật khẩu không đúng.");return}const{gid:t,cpId:i}=n.cpDel||{},c=l.guests.findIndex(s=>s.id===t);c<0||(l.guests[c].companions=(l.guests[c].companions||[]).filter(s=>s.id!==i),w(),n.modal=null,n.cpDel=null,u())}function qt(){var s,d,a,h;const e=n.cpAdd,t=l.guests.findIndex(m=>m.id===e);if(t<0)return;const i=(d=(s=document.getElementById("cpa_n"))==null?void 0:s.value)==null?void 0:d.trim(),c=(h=(a=document.getElementById("cpa_ph"))==null?void 0:a.value)==null?void 0:h.trim();if(!i){alert("Vui lòng nhập họ tên");return}const o={id:H(),name:i,phone:c,code:K(l.guests[t].eventId),checkedIn:!1,checkinTime:null,checkinBy:null};l.guests[t].companions||(l.guests[t].companions=[]),l.guests[t].companions.push(o),w(),n.cpTicket={gid:e,cpId:o.id},n.cpAdd=null,n.modal="cp_ticket",u(),setTimeout(()=>W(),120)}function W(){const{gid:e,cpId:t}=n.cpTicket||{},i=l.guests.find(s=>s.id===e),c=((i==null?void 0:i.companions)||[]).find(s=>s.id===t);if(!c)return;const o=document.getElementById("cp_tqr");if(o){o.innerHTML="";try{new QRCode(o,{text:ee(c.code),width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}catch{o.innerHTML='<div style="font-size:11px;color:#aaa">QR error</div>'}}}function Jt(){const{gid:e,cpId:t}=n.cpTicket||{},i=l.guests.find(d=>d.id===e),c=((i==null?void 0:i.companions)||[]).find(d=>d.id===t);if(!i||!c)return;const o=l.events.find(d=>d.id===i.eventId);window.open("","_blank","width=440,height=560").document.write(`<!DOCTYPE html><html><head>
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
      <div class="ev" style="margin-bottom:12px">${S(o==null?void 0:o.date)}${o!=null&&o.venue?" · "+o.venue:""}</div>
      <div class="name">${c.name}</div>
      <div class="role">Đi kèm: ${i.name}</div>
      <div id="qr"></div>
      <div class="code">${c.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <button class="btn" onclick="window.print()">🖨️ Lưu / In vé này</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>setTimeout(()=>new QRCode(document.getElementById('qr'),{text:'${ie}/?code='+encodeURIComponent('${c.code}'),width:160,height:160,correctLevel:QRCode.CorrectLevel.M}),100)<\/script>
  </body></html>`)}function Qt(e,t,i){const c=l.guests.find(d=>d.id===e);if(!c)return;const o=oe(c.eventId);if(R(o)){alert("Sự kiện đã kết thúc. Không thể thay đổi trạng thái check-in.");return}const s=t==="c"?(c.companions||[]).find(d=>d.id===i):c;if(s){if(s.cancelled){alert('Khách đã cancel. Vui lòng nhấn " Huỷ Cancel" trước khi check-in.');return}if(s.checkedIn){if(!confirm(`Huỷ check-in của ${s.name}?`))return;s.checkedIn=!1,s.checkinTime=null,s.checkinBy=null,w(),u();return}n.adminCI={gid:e,type:t,cpId:i||null},n.modal="admin_ci",u(),setTimeout(()=>{const d=document.getElementById("aci_ph");d&&d.focus()},80)}}function Wt(){var d;const{gid:e,type:t,cpId:i}=n.adminCI||{},c=l.guests.find(a=>a.id===e);if(!c)return;if(R(oe(c.eventId))){alert("Sự kiện đã kết thúc. Không thể check-in."),Z();return}const o=t==="c"?(c.companions||[]).find(a=>a.id===i):c;if(!o)return;const s=o.phone?o.phone.replace(/\D/g,"").slice(-4):"";if(s&&(((d=document.getElementById("aci_ph"))==null?void 0:d.value)||"").trim()!==s){const h=document.getElementById("aci_err");h&&(h.textContent="⚠️ 4 số cuối không khớp. Vui lòng thử lại.");const m=document.getElementById("aci_ph");m&&(m.value="",m.focus());return}o.checkedIn=!0,o.checkinTime=new Date().toISOString(),o.checkinBy="admin",w(),n.modal=null,n.adminCI=null,u()}function le(){const e=l.guests.find(i=>i.id===n.ticketGid);if(!e)return;[e.guestCode,...(e.companions||[]).map(i=>i.code)].forEach((i,c)=>{const o=document.getElementById("tqr_"+c);if(o){o.innerHTML="";try{new QRCode(o,{text:ee(i),width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}catch{o.innerHTML='<div style="font-size:11px;color:#aaa">QR error</div>'}}})}function Zt(e,t,i,c){const o=l.guests.find(a=>a.id===n.ticketGid);if(!o)return;const s=l.events.find(a=>a.id===o.eventId);window.open("","_blank","width=440,height=580").document.write(`<!DOCTYPE html><html><head><style>
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
      <div class="ev" style="margin-bottom:12px">${S(s==null?void 0:s.date)}${s!=null&&s.venue?" · "+s.venue:""}</div>
      <div class="name">${t}</div>
      <div class="role">${c}</div>
      <div class="qr-box" id="qr_s"></div>
      <div class="code">${i}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>
    <button class="dl-btn" onclick="window.print()">🖨️ Lưu / In vé này</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>setTimeout(()=>{new QRCode(document.getElementById('qr_s'),{text:'${ie}/?code='+encodeURIComponent('${i}'),width:160,height:160,correctLevel:QRCode.CorrectLevel.M})},100)<\/script>
  </body></html>`)}function Yt(){const e=l.guests.find(o=>o.id===n.ticketGid);if(!e)return;const t=l.events.find(o=>o.id===e.eventId),i=[{name:e.name,code:e.guestCode,role:"Khách mời chính"},...(e.companions||[]).map(o=>({name:o.name,code:o.code,role:"Đi kèm: "+e.name}))];window.open("","_blank","width=560,height:700").document.write(`<!DOCTYPE html><html><head><style>
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
    ${i.map(o=>`<div class="ticket">
      <div class="hd">VÉ THAM DỰ SỰ KIỆN</div>
      <div class="ev">${(t==null?void 0:t.name)||""}</div>
      <div class="ev" style="margin-bottom:12px">${S(t==null?void 0:t.date)}${t!=null&&t.venue?" · "+t.venue:""}</div>
      <div class="name">${o.name}</div>
      <div class="role">${o.role}</div>
      <div id="pqr_${o.code}" style="display:inline-block;padding:8px;border:1px solid #eee;border-radius:8px"></div>
      <div class="code">${o.code}</div>
      <div class="foot">Vui lòng xuất trình vé tại cổng check-in<br>Vé chỉ có giá trị cho 01 người</div>
    </div>`).join("")}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>
      const _base='${ie}';
      ${JSON.stringify(i.map(o=>o.code))}.forEach(code=>{
        const el=document.getElementById('pqr_'+code);
        if(el)new QRCode(el,{text:_base+'?code='+encodeURIComponent(code),width:160,height:160,correctLevel:QRCode.CorrectLevel.M});
      });
      setTimeout(()=>window.print(),700);
    <\/script>
  </body></html>`)}function en(){var o;const e=document.getElementById("lock_ev");if(n.ciEv=(e==null?void 0:e.value)||n.ciEv,!n.ciEv){document.getElementById("lock_err").textContent="⚠️ Vui lòng chọn sự kiện";return}const t=l.events.find(s=>s.id===n.ciEv);if(!t){document.getElementById("lock_err").textContent="Sự kiện không tồn tại";return}const i=(((o=document.getElementById("lock_c"))==null?void 0:o.value)||"").toUpperCase().trim();if(!i){document.getElementById("lock_err").textContent="⚠️ Vui lòng nhập mã nhân viên";return}const c=(t.btcMembers||[]).find(s=>s.code===i);if(!c){document.getElementById("lock_err").textContent="⚠️ Mã không nằm trong danh sách BTC của sự kiện này";return}n.ciOk=!0,n.ciOp=c,n.ciState=null,u()}async function tn(){var c,o;const e=(((c=document.getElementById("ci_in"))==null?void 0:c.value)||"").toUpperCase().trim();if(!e){document.getElementById("ci_err").textContent="⚠️ Vui lòng nhập mã";return}const t=ze(n.ciEv,e);if(!t){document.getElementById("ci_err").textContent="⚠️ Không tìm thấy mã trong sự kiện này";return}const i=t.person;if(i.checkedIn){document.getElementById("ci_err").textContent="⚠️ Đã check-in lúc "+X(i.checkinTime);return}if(!i.phone){const s=new Date().toISOString();i.checkedIn=!0,i.checkinTime=s,i.checkinBy=((o=n.ciOp)==null?void 0:o.code)||"btc",w();const d=t.type==="guest"?{checked_in:!0,checkin_time:s,checkin_by:i.checkinBy}:{companions:t.guest.companions||[]},a=await re(t.guest.id,d);n.ciSyncWarn=!a,n.ciState={step:"done",type:t.type,guest:t.guest,person:i,code:e},u();return}n.ciState={step:"verify",type:t.type,guest:t.guest,person:i,code:e},u()}function nn(){var o;const e=(((o=document.getElementById("ci_ph"))==null?void 0:o.value)||"").trim(),i=n.ciState.person,c=i.phone?i.phone.replace(/\D/g,"").slice(-4):"";if(!c){ge();return}if(e===c)ge();else{const s=document.getElementById("ph_err");s&&(s.textContent="⚠️ 4 số cuối không khớp. Vui lòng thử lại.");const d=document.getElementById("ci_ph");d&&(d.value="",d.focus())}}async function ge(){var d;const e=n.ciState,t=l.guests.find(a=>a.id===e.guest.id);if(!t){n.ciState={step:"err",msg:"Lỗi hệ thống"},u();return}const i=new Date().toISOString(),c=((d=n.ciOp)==null?void 0:d.code)||"btc";if(e.type==="guest")t.checkedIn=!0,t.checkinTime=i,t.checkinBy=c;else{const a=(t.companions||[]).find(h=>h.id===e.person.id);a&&(a.checkedIn=!0,a.checkinTime=i,a.checkinBy=c)}w();const o=e.type==="guest"?{checked_in:!0,checkin_time:i,checkin_by:c}:{companions:t.companions||[]},s=await re(t.id,o);n.ciSyncWarn=!s,n.ciState={step:"done",type:e.type,guest:t,person:e.type==="guest"?t:(t.companions||[]).find(a=>a.id===e.person.id),code:e.code},u()}function on(){const e=l.events.find(s=>s.id===n.selEv),t=[["STT","Loại","Mã","Họ tên","SĐT","KH gốc (nếu đi kèm)","PRM","Vùng TCB","Đơn vị","SIH","Note","Trạng thái","Giờ check-in","BTC","Lý do cancel"]];let i=0;q(n.selEv).forEach(s=>{i++;const d=s.cancelled?"Cancel":s.checkedIn?"Đã vào":"Chưa";t.push([i,"KH chính",s.guestCode,s.name,s.phone||"","",s.prmName||"",s.tcbRegion||"",s.unit||"",s.sihName||"",s.note||"",d,s.checkinTime?X(s.checkinTime):"",s.checkinBy||"",s.cancelNote||""]),(s.companions||[]).forEach(a=>{i++;const h=a.cancelled?"Cancel":a.checkedIn?"Đã vào":"Chưa";t.push([i,"Đi kèm",a.code,a.name,a.phone||"",s.name,s.prmName||"",s.tcbRegion||"","","","",h,a.checkinTime?X(a.checkinTime):"",a.checkinBy||"",a.cancelNote||""])})});const c=t.map(s=>s.map(d=>`"${String(d).replace(/"/g,'""')}"`).join(",")).join(`
`),o=document.createElement("a");o.href=URL.createObjectURL(new Blob(["\uFEFF"+c],{type:"text/csv;charset=utf-8"})),o.download=`checkin_${((e==null?void 0:e.name)||"").replace(/[^a-zA-Z0-9]/g,"_")}_${new Date().toISOString().slice(0,10)}.csv`,o.click()}function cn(){const e=[["Loại Khách (Gõ 'Main' hoặc 'Companion')","Họ và Tên (*)","Số Điện Thoại","Tên PRM (Sales TCB)","Vùng TCB","Đơn vị (CN/PGD)","Tên SIH (Sales OH)","Note / Lưu ý"]],t=[["Main","Nguyễn Văn A","0901234567","Lê PRM","Vùng 1","CN Sài Gòn","Trần SIH","Khách VIP bàn đầu"],["Companion","Nguyễn Văn B (Đi kèm A)","0907654321","","","","","Đi cùng xe ông A"],["Main","Phạm Thị C","0911223344","Nguyễn PRM","Vùng 2","CN Hà Nội","Vũ SIH",""]],i=XLSX.utils.aoa_to_sheet(e.concat(t)),c=XLSX.utils.book_new();XLSX.utils.book_append_sheet(c,i,"Template"),XLSX.writeFile(c,"OneHousing_Template_ImportKhach.xlsx")}function sn(){document.getElementById("excel_file_input").click()}function dn(e){const t=e.target.files[0];if(!t)return;const i=new FileReader;i.onload=function(c){try{const o=new Uint8Array(c.target.result),s=XLSX.read(o,{type:"array"}),d=s.SheetNames[0],a=s.Sheets[d],h=XLSX.utils.sheet_to_json(a,{header:1});if(h.length<=1){alert("File Excel trống hoặc thiếu dữ liệu!");return}const m=[];for(let v=1;v<h.length;v++){const r=h[v];!r[1]||String(r[1]).trim()===""||m.push({type:String(r[0]).trim().toLowerCase()==="companion"?"Companion":"Main",name:String(r[1]).trim(),phone:r[2]?String(r[2]).trim():"",prmName:r[3]?String(r[3]).trim():"",tcbRegion:r[4]?String(r[4]).trim():"",unit:r[5]?String(r[5]).trim():"",sihName:r[6]?String(r[6]).trim():"",note:r[7]?String(r[7]).trim():""})}if(m.length===0){alert("Không tìm thấy dữ liệu khách hàng hợp lệ trong file Excel!");return}n.importData=m,n.modal="import_preview",u()}catch(o){alert("Đã xảy ra lỗi khi đọc file Excel! Chi tiết: "+o.message)}e.target.value=""},i.readAsArrayBuffer(t)}function ln(){if(!n.selEv)return;const e=n.selEv,t=n.importData||[];let i=null;t.forEach(c=>{if(c.type==="Main"){const o=K(e);i={id:H(),eventId:e,guestCode:o,name:c.name,phone:c.phone,prmName:c.prmName,tcbRegion:c.tcbRegion,unit:c.unit,sihName:c.sihName,note:c.note,companions:[],checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()},l.guests.push(i)}else{const o={id:H(),name:c.name,phone:c.phone,code:K(e),checkedIn:!1,checkinTime:null,checkinBy:null};if(i)i.companions.push(o);else{const s=K(e);i={id:H(),eventId:e,guestCode:s,name:c.name+" (Chính)",phone:c.phone,prmName:c.prmName,tcbRegion:c.tcbRegion,unit:c.unit,sihName:c.sihName,note:"[Hệ thống tự dịch chuyển từ Companion độc lập] "+c.note,companions:[],checkedIn:!1,checkinTime:null,checkinBy:null,createdAt:Date.now()},l.guests.push(i)}}}),w(),alert("🎉 Đã import thành công danh sách khách mời từ Excel vào hệ thống!"),Z()}async function an(){const e=l.events.find(m=>m.id===n.selEv),t=q(n.selEv);if(!t.length){alert("Sự kiện này chưa có khách mời nào để xuất QR!");return}const i=document.getElementById("zip_btn"),c=i.textContent;i.textContent="⏳ Đang khởi tạo bộ QR...",i.disabled=!0;const o=document.createElement("div");o.style.display="none",document.body.appendChild(o);const s=new JSZip,d=m=>new Promise(v=>{o.innerHTML="",new QRCode(o,{text:m,width:250,height:250,correctLevel:QRCode.CorrectLevel.M}),setTimeout(()=>{const r=o.querySelector("img");if(r&&r.src)v(r.src.split(",")[1]);else{const g=o.querySelector("canvas");v(g?g.toDataURL().split(",")[1]:null)}},50)}),a=new Map,h=(m,v,r)=>{let g=v.replace(/[/\\?%*:|"<>]/g,"-").trim(),f=`${m}_${g}_(${r})`;if(a.has(f)){let x=a.get(f)+1;return a.set(f,x),`${f}_${x}.png`}else return a.set(f,1),`${f}.png`};for(let m of t){const v=ee(m.guestCode),r=await d(v);if(r){const g=h(m.guestCode,m.name,"Chinh");s.file(g,r,{base64:!0})}if(m.companions&&m.companions.length)for(let g of m.companions){const f=ee(g.code),x=await d(f);if(x){const k=h(g.code,g.name,`DiKem_cua_${m.name}`);s.file(k,x,{base64:!0})}}}document.body.removeChild(o);try{const m=await s.generateAsync({type:"blob"}),v=document.createElement("a");v.href=URL.createObjectURL(m),v.download=`QR_SựKiện_${((e==null?void 0:e.name)||"Event").replace(/[^a-zA-Z0-9]/g,"_")}.zip`,v.click()}catch(m){alert("Có lỗi xảy ra trong quá trình nén file ZIP: "+m.message)}i.textContent=c,i.disabled=!1}window.R=u;window.doLogin=Se;window.doRefresh=Te;window.doUrlCI=ct;window.setTab=ut;window.openGM=mt;window.pickEv=ht;window.setSrch=vt;window.setFil=ft;window.openM=gt;window.openEdit=bt;window.openDel=xt;window.openTickets=yt;window.closeM=Z;window.openEditEv=kt;window.openCpTicket=wt;window.openCpEdit=$t;window.openCpDel=Ct;window.openAddComp=It;window.openCancel=Et;window.doCancel=_t;window.undoCancel=Tt;window.goCI=Bt;window.backAdmin=zt;window.lockOut=Mt;window.cancelCI=St;window.nextCI=Nt;window.addBR=At;window.rmBR=Dt;window.addCR=Ht;window.rmCR=Vt;window.saveEv=Ft;window.delEv=Pt;window.saveG=Ot;window.chkEditPw=Kt;window.doEdit=Gt;window.doDel=jt;window.doCpEdit=Ut;window.doCpDel=Xt;window.doCpAdd=qt;window.mkQRs=le;window.mkCpQR=W;window.dlTicket=Zt;window.dlCpTicket=Jt;window.printAll=Yt;window.tryUnlock=en;window.startCI=tn;window.confirmPhone=nn;window.doAdminCI=Wt;window.doEvUnlock=tt;window.expCSV=on;window.togCI=Qt;window.togRpt=Ve;window.setRptEv=Le;window.triggerExcelImport=sn;window.handleExcelImport=dn;window.downloadExcelTemplate=cn;window.commitExcelImport=ln;window.downloadAllQRsZip=an;
