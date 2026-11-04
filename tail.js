// v1063 teamPanel 前置（iOS Safari 大文件偶发后面函数 undefined，挪到块首确保可用）
window.teamPanel = async function(){
  openSheet('<h2>👥 组队</h2><div class="hint">5人小队（人和宠物共用位置），队长带移动，组队战斗。</div>'
    + '<div id="mhxyTeamInfo"><div class="hint">加载中…</div></div>'
    + '<div id="mhxyTeamInvites"></div>'
    + '<div id="mhxyTeamOnline"><div class="hint">加载在线道友…</div></div>'
    + '<div class="row"><button class="btn full" data-mhxyteamrefresh>刷新</button></div>'
    + '<div class="row"><button class="btn full" data-close>关闭</button></div>');
  var _tryTeam = function(n){ // v1188 模块晚到就重试几次，别一打开就卡死在「组队模块加载中」
    if (typeof window.teamRefresh === 'function') { try { window.teamRefresh(); } catch(_){} return; }
    if (n >= 25) { var b = document.getElementById('mhxyTeamInfo'); if (b) b.innerHTML = '<div class="hint">组队模块加载中，请稍后重试</div>'; return; }
    setTimeout(function(){ _tryTeam(n + 1); }, n < 5 ? 800 : 2000); // v1191 延长等待（约44秒）：慢加载/中段异常时别4秒就放弃（muse1dev 问题四）
  };
  _tryTeam(0);
};
// v1191 关键导出提前：teamRefresh/teamInvite/pkChallenge 是函数声明（文件加载即提升），原导出在文件尾，中段运行错误会让导出永远执行不到、组队面板卡死；提前到文件头紧跟 teamPanel，声明一就绪即可用
try { window.teamRefresh = teamRefresh; window.teamInvite = teamInvite; window.pkChallenge = pkChallenge; } catch (_) {}
// v1069 神识单按钮（Ye 定整合）：练气点=10秒探查，化神点=探查+开外放面板
window.shenshiGo = function(){
  try {
    var _realm = (typeof window._myRealm !== 'undefined') ? (window._myRealm|0) : 0;
    if (!_realm) {
      try {
        if (typeof S !== 'undefined' && S && typeof S.realm !== 'undefined') _realm = (S.realm|0) || 0;
        else { var _sk = (window.M && M.saveKey) || 'mhxy_save'; var _raw = localStorage.getItem(_sk); if (_raw) _realm = (JSON.parse(_raw).realm|0) || 0; }
      } catch(_) {}
    }
    if (_realm < 1) { var _m1 = '需练气境界才能使用神识（当前凡人）'; if (typeof toastLog === 'function') toastLog('bad', _m1); else if (typeof log === 'function') log('bad', _m1); else alert(_m1); return; }
    window._ssRevealUntil = Date.now() + 10000;
    var _msg = '🔍 神识探查中（10秒）：相邻格气息低于神识的玩家可见';
    if (typeof toastLog === 'function') toastLog('good', _msg);
    else if (typeof log === 'function') log('good', _msg);
    else alert(_msg);
    if (_realm >= 5 && typeof window.shenshiPanel === 'function') { window.shenshiPanel(); return; }
    if (typeof renderWorldMap === 'function') { try { renderWorldMap(); } catch(_) {} } // v1074 探查后立即重绘地图，不用移动才显示
    else if (typeof render === 'function') { try { render(); } catch(_) {} }
  } catch(e) { try { alert('神识探查出错：' + e.message); } catch(_) {} }
};
// v1072 点击地图玩家标记查看详细资料（Ye：看到5个人但看不到资料）
// v1161 PK 模式标识（mode 来自 /api/world/state 的 D1 权威值）：人物卡/同格名单/约战列表共用
window.pkModeTag = function(mode){
  if (mode === 'mieko') return '<span style="color:#ff7e7e;font-size:12px">💀灭口</span>';
  return '<span style="color:#ffe27e;font-size:12px">⚔️夺宝</span>';
};
// v1164 头像解析（同格名单/人物卡共用）：图库→默认库→字母兜底；图库懒加载，好了自动重渲染
window._avGalCbs = [];
window.ensureAvGallery = function(cb){
  if (Array.isArray(window._avGallery)) { if (cb) cb(); return; }
  if (cb) window._avGalCbs.push(cb);
  if (window._avGalFetching) return;
  window._avGalFetching = true;
  // v1167 修：本段位于 tail 的 IIFE 之外，裸 api 不在作用域（ReferenceError 被 showPlayersAt 的 try 吞掉，
  // 表现为同格名单第一次点不开、图库头像加载不出来）——改走 window.MHXY.api，并加失败兜底防 fetching 卡死
  var _done = function(list){
    window._avGalFetching = false;
    window._avGallery = Array.isArray(list) ? list : [];
    var cbs = window._avGalCbs.splice(0);
    for (var i = 0; i < cbs.length; i++) { try { cbs[i](); } catch(_) {} }
  };
  var _apiFn = (window.MHXY && window.MHXY.api) || null;
  if (!_apiFn) { _done([]); return; }
  _apiFn('/api/avatar/gallery').then(function(r){
    _done((r && r.ok && r.json && Array.isArray(r.json.list)) ? r.json.list : []);
  }).catch(function(){ _done([]); });
};
window.playerAvatarHtml = function(p, size, rc){
  size = size || 32;
  var img = '';
  try {
    if (p && p.avatar_set) {
      var gal = window._avGallery || [];
      for (var gi = 0; gi < gal.length; gi++) { if (String(gal[gi].id) === String(p.avatar_set) && gal[gi].data) { img = gal[gi].data; break; } }
    }
    if (!img && p && p.avatar_idx != null && window.AVATARS) {
      var arr = window.AVATARS[p.gender === 'f' ? 'f' : 'm'];
      if (arr && arr[p.avatar_idx|0]) img = arr[p.avatar_idx|0];
    }
  } catch(_) {}
  if (img) return '<img src="' + img + '" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover;border:2px solid ' + rc + '" onerror="this.remove()">';
  var nm = (p && (p.username || p.rname || p.roleName)) || '道友';
  var ini = String(nm).slice(0, 1).replace(/</g, '&lt;');
  return '<span style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + rc + '33;border:2px solid ' + rc + ';display:inline-flex;align-items:center;justify-content:center;font-size:' + Math.round(size / 2) + 'px;font-weight:bold;color:' + rc + '">' + ini + '</span>';
};
window.showPlayersAt = function(x, y){
  try {
    window._lastPlayerPos = { x: x, y: y };
    var ps = window._worldPlayers || [];
    var list = ps.filter(function(p){ return p && (p.x|0) === (x|0) && (p.y|0) === (y|0) && p.online; });
    if (!list.length) return;
    if (!Array.isArray(window._avGallery)) window.ensureAvGallery(function(){ if (window._lastPlayerPos) window.showPlayersAt(window._lastPlayerPos.x, window._lastPlayerPos.y); });
    var html = '<h2>🧑 同格道友（' + list.length + '人）</h2>';
    var _realmName = function(r){ var _n = ['凡人','练气','筑基','金丹','元婴','化神','大乘','渡劫','仙人','金仙','合体','尊者','主宰']; return _n[r|0] || ('境'+r); };
    var _realmColor = ['#999','#7ec8ff','#7eff9e','#ffe27e','#ff9e7e','#d27eff','#7effff','#ff7e7e','#fff27e','#e6e6e6','#a0e7ff','#ffd700','#ff6b9d'];
    list.forEach(function(p, i){
      var nm = p.username || p.rname || p.roleName || '道友';
      var no = (p.player_no != null ? p.player_no : p.playerNo) || '?';
      var lv = (p.level != null ? p.level : '?');
      var rl = (p.realm != null ? _realmName(p.realm) : '');
      var rc = _realmColor[p.realm|0] || '#999';
      var _avHtml = window.playerAvatarHtml(p, 32, rc);
      var _aid = String(p.accountId || '').replace(/'/g, '');
      html += '<div class="row" style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #333;cursor:pointer" onclick="window.showPlayerDetail(\'' + _aid + '\')">'
        + _avHtml
        + '<span style="flex:1"><b style="color:#7ec8ff">' + String(nm).replace(/</g, '&lt;') + '</b>'
        + '<span style="color:#666">[' + no + ']</span>'
        + '<span style="color:#999;font-size:12px"> ' + rl + ' Lv.' + lv + '</span> ' + window.pkModeTag(p.mode) + '</span>'
        + '<span style="color:#7ec8ff;font-size:12px">›</span></div>';
    });
    html += '<div class="row"><button class="btn full" data-close>关闭</button></div>';
    if (typeof openSheet === 'function') openSheet(html);
    else alert(list.map(function(p){ return (p.username||'?') + '[' + (p.player_no||p.playerNo||'?') + '] Lv.' + (p.level||'?'); }).join('\n'));
  } catch(e) {}
};
// v1076 玩家详情+组队邀请（Ye：点进去看简单信息可以组队）
window.showPlayerDetail = function(accountId){
  try {
    var ps = window._worldPlayers || [];
    var p = null;
    for (var i = 0; i < ps.length; i++) { if (ps[i] && String(ps[i].accountId) === String(accountId)) { p = ps[i]; break; } }
    if (!p) return;
    if (!Array.isArray(window._avGallery)) window.ensureAvGallery(function(){ window.showPlayerDetail(accountId); });
    var nm = p.username || p.rname || p.roleName || '道友';
    var no = (p.player_no != null ? p.player_no : p.playerNo) || '?';
    var lv = (p.level != null ? p.level : '?');
    var _rn = ['凡人','练气','筑基','金丹','元婴','化神','大乘','渡劫','仙人','金仙','合体','尊者','主宰'];
    var rl = (p.realm != null ? (_rn[p.realm|0] || ('境'+p.realm)) : '?');
    var _tt = p.title ? ' 🏷️' + String(p.title).replace(/</g, '&lt;') : '';
    var _aid = String(p.accountId || '').replace(/'/g, '');
    var html = '<div style="display:flex;align-items:center;gap:10px">' + window.playerAvatarHtml(p, 40, '#7ec8ff') + '<h2 style="margin:0">🧑 ' + String(nm).replace(/</g, '&lt;') + '</h2></div>'
      + '<div class="hint">编号 [' + no + ']' + _tt + '</div>'
      + '<div class="row" style="display:flex;gap:12px;padding:8px 0">'
      + '<span>境界 <b class="y">' + rl + '</b></span>'
      + '<span>等级 <b class="y">Lv.' + lv + '</b></span>'
      + '<span>' + window.pkModeTag(p.mode) + '</span></div>'
      + '<div class="row" style="display:flex;gap:8px;margin-top:8px">'
      + '<button class="btn gold" style="flex:1" onclick="window.teamInvitePlayer(\'' + _aid + '\')">👥 组队</button>'
      + '<button class="btn" style="flex:1" onclick="window.pkPlayer(\'' + _aid + '\')">🤝 切磋</button></div>'
      + '<div class="row" style="display:flex;gap:8px;margin-top:8px">'
      + '<button class="btn" style="flex:1" onclick="window.pkAttackPlayer(\'' + _aid + '\')">⚔️ 攻击（按我的模式）</button></div>'
      + '<div class="row" style="display:flex;gap:8px;margin-top:8px">'
      + '<button class="btn" style="flex:1" onclick="window.xyRequestPlayer(\'' + _aid + '\')">💞 仙缘</button></div>'
      + '<div class="row" style="display:flex;gap:8px;margin-top:8px">'
      + '<button class="btn" style="flex:1" onclick="(function(){var _lp=window._lastPlayerPos||{x:0,y:0};window.showPlayersAt(_lp.x,_lp.y);})()">‹ 返回</button></div>'
      + '<div class="row"><button class="btn full" data-close>关闭</button></div>';
    if (typeof openSheet === 'function') openSheet(html);
    try { // v1171 神识扫描：看资料即给对方留提示（Ye 定，服务端同对 60 秒去重）
      var _ns = Date.now(); window._scanSent = window._scanSent || {};
      if (typeof MHXY !== 'undefined' && MHXY.api && (!window._scanSent[_aid] || _ns - window._scanSent[_aid] > 60000)) { window._scanSent[_aid] = _ns; MHXY.api('/api/world/scan', { method: 'POST', body: { targetId: _aid } }); }
    } catch(e) {}
  } catch(e) {}
};
// v1076 从玩家详情发起组队邀请
// v1187 人物卡没有建队入口：没队伍时先自动建队再邀请（旧版直接邀请被后端以 not in team 拒掉，只报数字 404）
window.teamInvitePlayer = async function(accountId){
  try {
    if (typeof window.teamInvite !== 'function') { if (typeof window.toastLog === 'function') window.toastLog('bad', '组队模块未加载'); return; }
    if (typeof window.teamRefresh === 'function') { try { await window.teamRefresh(); } catch(_){} }
    if (!window._myTeam && typeof MHXY !== 'undefined' && MHXY.api) {
      await MHXY.api('/api/world/team/create', { method:'POST', body:{} }).catch(function(){ return null; });
      if (typeof window.teamRefresh === 'function') { try { await window.teamRefresh(); } catch(_){} }
    }
    window.teamInvite(accountId);
  } catch(e) {}
};
// v1077 从玩家详情发起 PK
window.pkPlayer = function(accountId){
  try {
    if (typeof window.pkChallenge === 'function') window.pkChallenge(accountId);
    else if (typeof window.toastLog === 'function') window.toastLog('bad', 'PK模块未加载');
  } catch(e) {}
};
// v1081 从玩家详情发起仙缘绑定请求
window.xyRequestPlayer = function(accountId){
  try {
    if (typeof MHXY !== 'undefined' && MHXY.api) {
      MHXY.api('/api/xianyuan/request', { method: 'POST', body: { targetId: accountId } }).then(function(r){
        if (r.ok) { if (typeof toastLog === 'function') toastLog('good', '💞 仙缘请求已发出，等对方确认'); else if (typeof log === 'function') log('good', '💞 仙缘请求已发出'); }
        else { var _m = '仙缘请求失败'; if (r.json && r.json.error === 'already_bound') _m = '已经绑定了'; else if (r.json && r.json.error === 'already_pending') _m = '已有待确认的请求'; else if (r.json && r.json.error === 'bad_target') _m = '不能和自己绑定'; else if (r.json && r.json.error === 'daily_bind_limit') _m = '今天已发起过绑定了（每天只能发起1个）'; if (typeof toastLog === 'function') toastLog('bad', _m); else if (typeof log === 'function') log('bad', _m); }
      });
    }
  } catch(e) {}
};
// v902 关键函数兜底（iOS Safari大文件偶发undefined）
if (typeof window.doTogglePetLock !== 'function') {
  window.doTogglePetLock = function(id) {
    try {
      const _pt = S.pets.find(p => p.id === id);
      if (!_pt) return;
      _pt.locked = !_pt.locked;
      log('good', `${_pt.locked ? '🔒' : '🔓'} ${PETS[_pt.k].name}#${_pt.id}${_pt.locked ? '已锁定（不可放生/吞噬）' : '已解锁'}`);
      try { if (typeof commit === 'function') commit(); } catch(_) {}
      if (typeof sheetChar === 'function') sheetChar();
    } catch(e) {}
  };
}
if (typeof window.doReleasePet !== 'function') {
  window.doReleasePet = function(id) {
    try {
      const _i = S.pets.findIndex(p => p.id === id);
      if (_i < 0) return;
      const _pt = S.pets[_i];
      if (_pt.locked) { log('bad', '🔒 该灵宠已锁定，先解锁才能放生'); return; }
      if (!confirm(`放生 ${PETS[_pt.k].name}#${_pt.id}？放生后灵宠回归山林。`)) return;
      S.pets.splice(_i, 1);
      if (Array.isArray(S.pet)) S.pet = S.pet.filter(x => x !== id); else if (S.pet === id) S.pet = null;
      try { if (typeof addMerit === 'function') addMerit(10, '放生灵宠'); } catch(_) {}
      log('good', `🕊️ 放生了 ${PETS[_pt.k].icon}${PETS[_pt.k].name}，它回归山林自由生活！`);
      try { if (typeof commit === 'function') commit(); } catch(_) {}
      if (typeof sheetChar === 'function') sheetChar();
    } catch(e) {}
  };
}

if (typeof window.shenshiPanel !== 'function') {
  // v1016 兜底：blk1 v887 的同名函数偶发被吞，在此补一份
  window.shenshiPanel = function() { // v887 化神神识；v1057 外放激活10秒玩家探查；v1125 主城资源点删除，远程收取下线，只保留探查
  try {
    if ((S.realm|0) < 5) { log('bad', '需化神境界才能神识外放'); return; }
    try { window._ssRevealUntil = Date.now() + 10000; } catch(_) {} // v1057 神识外放10秒探查
    const wm = S.worldMap || { px: 2, py: 3 };
    const _spots = [
      { x: 3, y: 2, name: '🌱田药园', fn: 'openHerbSheet' },
      { x: 2, y: 0, name: '🥚养殖园', fn: 'openRanchSheet' }
    ].filter(s => {
      const _d = Math.max(Math.abs(s.x - wm.px), Math.abs(s.y - wm.py));
      return _d >= 1 && _d <= 3;
    });
    if (!_spots.length) { log('good', '👁️ 神识外放：10 秒内，相邻格气息低于你的道友可见'); try { renderWorldMap(); } catch(_) {} return; }
    openSheet(`<h2>👁️ 神识外放</h2><div class="hint">化神神识覆盖3格，远程收取资源；外放同时激活10秒探查</div>` +
      _spots.map(s => `<div class="row"><div class="lab">${s.name} <small>(${s.x},${s.y})</small></div><button class="btn gold" onclick="window.${s.fn}()">收取</button></div>`).join('') +
      `<div class="row"><button class="btn full" onclick="closeSheet()">关闭</button></div>`);
  } catch(e) {}
}
}

/* ================= 联机模块 v959 =================
 * 账号/云存档/真人聊天/服务端权威PK。独立模块，不改原有逻辑。
 * 后端：https://mhxy-game-api.yexiong262310.workers.dev
 * 降级：网络/后端不可用时全部静默失败，单机照常可玩。
 */
(function(){
'use strict';
var API = 'https://mhxy-game-api.yexiong262310.workers.dev';
var LK = { tok:'mhxy_token', rev:'mhxy_rev', name:'mhxy_name', pno:'mhxy_pno', guest:'mhxy_guest', aid:'mhxy_aid' };
function ls(k, v){
  try{
    if (v === undefined) return localStorage.getItem(k);
    if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
  }catch(_){ return null; }
}
function escH(s){ try{ if (typeof esc === 'function') return esc(s); }catch(_){} return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function glog(cls, html){ try{ if (typeof log === 'function') log(cls, html); }catch(_){} }

/* ---------- 网络 ---------- */
async function api(path, opt){
  opt = opt || {};
  var ctrl = null, timer = null;
  try { ctrl = new AbortController(); timer = setTimeout(function(){ try{ctrl.abort();}catch(_){} }, 12000); } catch(_){}
  try{
    var headers = { 'content-type':'application/json' };
    var tok = ls(LK.tok);
    if (tok && !opt.noAuth) headers['Authorization'] = 'Bearer ' + tok;
    var r = await fetch(API + path, {
      method: opt.method || 'GET',
      headers: headers,
      body: opt.body ? JSON.stringify(opt.body) : undefined,
      signal: ctrl ? ctrl.signal : undefined
    });
    var j = null; try { j = await r.json(); } catch(_){}
    if (r.status === 401 && j && j.error === 'session_replaced') onReplaced();
    return { status: r.status, ok: r.ok, json: j };
  }catch(e){
    return { status: 0, ok: false, json: null, netErr: true };
  }finally{
    if (timer) clearTimeout(timer);
  }
}
function loggedIn(){ return !!ls(LK.tok); }
function myName(){ return ls(LK.name) || '未登录'; }
function myPno(){ return ls(LK.pno) || ''; }
function myAid(){ return ls(LK.aid) || ''; }
function isGuest(){ return ls(LK.guest) === '1'; }

function onReplaced(){
  clearAuth(false);
  glog('bad', '🌐 你已在另一台设备登录，本机已下线。');
  try{ if (typeof closeSheet === 'function') closeSheet(); }catch(_){}
  showLoginGate(); // v970 掉线后弹门禁
}
function clearAuth(clearRev){
  [LK.tok, LK.name, LK.pno, LK.guest, LK.aid].forEach(function(k){ ls(k, null); });
  if (clearRev !== false) ls(LK.rev, null); // v1193 只清历史全局 rev；各账号自己的 rev 键保留，方便重登对齐
  M.baseRev = 0; M.dirty = false;
  stopPresence(); closeChatWs(); closePkWs();
}
// v1193 号分离：云同步版本号按账号存（mhxy_rev_<account_id>），不再全号共用一个
function revKey(){ var a = ls(LK.aid) || ''; return a ? LK.rev + '_' + a : LK.rev; }
function loadBaseRev(){
  var a = ls(LK.aid) || '';
  if (!a) return parseInt(ls(LK.rev) || '0', 10) || 0;
  return parseInt(ls(LK.rev + '_' + a) || '0', 10) || 0; // 只读本账号的键；历史共用 rev 不认领，登录后由 checkCloud 按云端对齐
}
// v1193 号分离：本地存档槽按账号隔离。切到别的账号时，现档寄存到主人名下，新账号载入自己的档（没有就清空等云档/新建）。返回 true 表示已换档、调用方应重载页面
function separateOnLogin(newAid, newName){
  if (!newAid) return false;
  var slot = null; try { slot = localStorage.getItem(M.saveKey); } catch(_){}
  var owA = ''; try { owA = localStorage.getItem('mhxy_sowner_aid') || ''; } catch(_){}
  var owN = ''; try { owN = localStorage.getItem('mhxy_sowner') || ''; } catch(_){}
  // v1194：历史共用 rev 不再猜归属（猜错会让无云档的号顶着别人的 rev 永远建不了档）。各账号 rev 一律从 0 起，登录时由 checkCloud 按云端对齐——云端为准（Ye 2026-11-03 令：大号保留云端那份）
  if (!slot){
    try { localStorage.setItem('mhxy_sowner', newName || ''); localStorage.setItem('mhxy_sowner_aid', newAid); } catch(_){}
    return false;
  }
  if (!owA && !owN){
    try { localStorage.setItem('mhxy_sowner', newName || ''); localStorage.setItem('mhxy_sowner_aid', newAid); } catch(_){}
    return false;
  }
  var belongsOther = owA ? (owA !== newAid) : (owN !== newName);
  if (!belongsOther && !owA && owN === newName){ try { localStorage.setItem('mhxy_sowner_aid', newAid); } catch(_){} }
  if (!belongsOther) return false;
  try { localStorage.setItem('mhxy_save_acct_' + (owA || ('name_' + owN)), slot); } catch(_){}
  var mine = null; try { mine = localStorage.getItem('mhxy_save_acct_' + newAid); } catch(_){}
  var fromLegacyName = false;
  if (!mine && newName){ try { mine = localStorage.getItem('mhxy_save_acct_name_' + newName); if (mine) fromLegacyName = true; } catch(_){} }
  try {
    if (mine){
      localStorage.setItem(M.saveKey, mine);
      if (fromLegacyName){
        localStorage.removeItem('mhxy_save_acct_name_' + newName); // v1195 捞回：旧版按用户名寄存的档被认领后注销，并立标记让 checkCloud 以这份为准
        try { localStorage.setItem('mhxy_rescued_aid', newAid); } catch(_){}
      }
    }
    else localStorage.removeItem(M.saveKey);
    localStorage.setItem('mhxy_sowner', newName || '');
    localStorage.setItem('mhxy_sowner_aid', newAid);
  } catch(_){}
  return true;
}
function saveAuth(d){
  var swapped = false;
  try { swapped = separateOnLogin(d.account_id || '', d.username || ''); } catch(_){}
  ls(LK.tok, d.token); ls(LK.aid, d.account_id || '');
  ls(LK.name, d.username || ''); ls(LK.pno, String(d.player_no || ''));
  ls(LK.guest, d.guest ? '1' : '0');
  M.baseRev = loadBaseRev();
  if (swapped){
    glog('sys', '🌐 已按账号分开存档：这个账号将使用它自己的存档，正在重载…');
    setTimeout(function(){ try { location.reload(); } catch(_){} }, 400);
  }
}

var M = {
  baseRev: parseInt((function(){ try{return localStorage.getItem(LK.rev)||'0';}catch(_){return '0';} })(), 10) || 0,
  dirty: false, syncTimer: null, syncing: false,
  chatWs: null, chatOpen: false,
  pkWs: null, hbTimer: null, challenging: null,
  saveKey: 'fushengwendao_save_v1' // 游戏侧 save() 钩子会传入真实 SAVE_KEY 校准
};

/* ---------- 主面板 ---------- */
function xRowInputHtml(){ return '<input id="mhxyXSet" maxlength="16" placeholder="X 用户名（如 @feyelo）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><button class="btn" data-mhxyxset>绑定</button>'; }
function xRowHtml(){ var h = ''; try { h = localStorage.getItem('mhxy_xh') || ''; } catch(_) {}
  if (h) return '<span style="flex:1">𝕏 已绑定 <span style="color:#1d9bf0">@' + escH(String(h).replace(/^@/, '')) + '</span> <span style="color:#7ee787">✓</span></span>';
  return xRowInputHtml(); }
function xHideRowHtml(){ var hid = ''; try { hid = localStorage.getItem('mhxy_xhide') || ''; } catch(_) {} var on = hid === '1'; return '<span style="flex:1">👁 X 账号在聊天中：' + (on ? '<b class="y">已隐藏</b>（只显示 ✓）' : '<b>公开显示</b>') + '</span><button class="btn" data-mhxyxhide>' + (on ? '改为显示' : '隐藏') + '</button>'; } // v1010 X 隐藏开关
function refreshXRow(){ var row = document.getElementById('mhxyXRow'); if (!row) return; row.innerHTML = xRowHtml();
  api('/api/profile/me').then(function(r){ if (r.ok && r.json && r.json.ok){ var h = r.json.x_handle || r.json.xHandle || ''; try { if (h) localStorage.setItem('mhxy_xh', h); else localStorage.removeItem('mhxy_xh'); if (r.json.x_verified != null) localStorage.setItem('mhxy_xv', r.json.x_verified ? '1' : '0'); } catch(_) {} var row2 = document.getElementById('mhxyXRow'); if (row2) row2.innerHTML = xRowHtml(); try { if (r.json.x_hide != null) localStorage.setItem('mhxy_xhide', r.json.x_hide ? '1' : '0'); } catch(_) {} var _hr2 = document.getElementById('mhxyXHideRow'); if (_hr2) _hr2.innerHTML = xHideRowHtml(); } });
}
function panel(){
  var html;
  if (!loggedIn()){
    html = '<h2>🌐 真人联机</h2><div class="hint">已登录：云存档跨设备同步、与真人道友聊天、真人PK（服务端结算）。</div>'
      + '<div class="row"><button class="btn gold full" data-mhxyguest>一键游客登录</button></div>'
      + '<div class="row" style="display:flex;gap:6px"><input id="mhxyU" maxlength="16" placeholder="用户名(3-16位)" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
      + '<input id="mhxyP" type="password" maxlength="128" placeholder="密码(≥6位)" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>'
      + '<div class="row"><input id="mhxyX" maxlength="16" placeholder="X 用户名（注册必填，如 @feyelo）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>'
      + '<div class="row"><input id="mhxySqQ" maxlength="60" placeholder="密保问题（注册可选，如：我第一只灵宠的名字？）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>'
      + '<div class="row"><input id="mhxySqA" maxlength="100" placeholder="密保答案（忘记密码时用）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>'
      + '<div class="row" style="display:flex;align-items:center;gap:8px"><span style="color:#999;font-size:13px">生日</span><input id="mhxyBday" type="date" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>'
      + '<div class="grid2"><button class="btn full" data-mhxylogin>登录</button><button class="btn full" data-mhxyreg>注册</button></div>'
      + '<div class="row"><button class="btn full" data-mhxyrecover>忘记密码？用密保找回</button></div>'
      + '<div class="row"><button class="btn full" data-close>关闭</button></div>';
  } else {
    var nm = escH(myName()), pno = escH(myPno());
    html = '<h2>🌐 真人联机</h2>'
      + '<div class="hint">已登录：<b class="y">' + nm + '</b> #' + pno + (isGuest() ? '（游客）' : '') + '　云存档 rev ' + M.baseRev + '</div>'
      + '<div class="row"><button class="btn red full" data-mhxylogout>🚪 退出当前账号 · 切换账号（回登录界面输密码）</button></div>'
      + '<div class="grid2">'
      + '<button class="btn full" data-mhxychat>💬 真人聊天</button>'
      + '<button class="btn full" data-mhxypk>⚔️ 在线约战</button>'
      + '<button class="btn full" data-mhxyteam>👥 组队</button>'
      + '</div>'
      + '<div class="grid2">'
      + '<button class="btn full" data-mhxydungeon>🏰 玩家秘境</button>'
      + '<button class="btn full" data-mhxyencsub>🌀 奇遇投稿</button>'
      + '</div>'
      + '<div class="grid2">'
      + '<button class="btn full" data-mhxywenxin>❓ 问心投稿</button>'
      + '<span></span>'
      + '</div>'
      + '<div class="grid2">'
      + '<button class="btn full" data-mhxysync>☁️ 同步存档</button>'
      + '<button class="btn full" data-mhxydown>⬇️ 下载云档</button>'
      + '</div>'
      + '<div class="row" id="mhxyGmRow" style="display:none"><button class="btn gold full" data-mhxygm>🛠️ GM 管理</button></div>'
      + '<div class="row" id="mhxyXRow" style="display:flex;gap:6px;align-items:center">' + xRowHtml() + '</div>'
      + '<div class="row" id="mhxyXHideRow" style="display:flex;gap:6px;align-items:center">' + xHideRowHtml() + '</div>'
      + '<div class="row" id="mhxyXVerifyRow" style="display:none;flex-direction:column;gap:6px"><span class="hint" id="mhxyXCode"></span><div style="display:flex;gap:6px"><input id="mhxyTweetUrl" placeholder="推文链接（x.com/你的号/status/…）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><button class="btn gold" data-mhxyxverify>验证</button></div></div>'
      + (isGuest()
        ? '<div class="row" style="display:flex;gap:6px"><input id="mhxyU" maxlength="16" placeholder="新用户名" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><input id="mhxyP" type="password" maxlength="128" placeholder="设密码" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div><div class="row" style="display:flex;gap:6px"><input id="mhxySqQ" maxlength="60" placeholder="密保问题（可选）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><input id="mhxySqA" maxlength="100" placeholder="密保答案" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div><div class="row"><button class="btn gold full" data-mhxyupgrade>转为正式账号</button></div>'
        : '')
      + '<div class="row"><button class="btn red full" data-mhxylogout>🚪 退出当前账号 · 切换账号（回登录界面输密码）</button></div>'
      + '<div class="row"><button class="btn full" data-close>关闭</button></div>';
  }
  try{ openSheet(html); }catch(_){}
  // v974 GM 按钮：仅服主显示
  try {
    gmCheck().then(function(isGm){
      var row = document.getElementById('mhxyGmRow');
      if (row) row.style.display = isGm ? 'block' : 'none';
    });
  } catch(_) {}
  try { refreshXRow(); } catch(_) {}
}
function val(id){ var el = null; try{ el = document.getElementById(id); }catch(_){} return el ? (el.value || '').trim() : ''; }

// v1198 游客设备锚：本机持久随机串，登出不清；一键游客登录永远回到本机这个游客号
function guestDid(){
  var d = null;
  try { d = localStorage.getItem('mhxy_guest_did'); } catch(_){}
  if (!d){
    try { d = (crypto.randomUUID ? crypto.randomUUID() : 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 14)); }
    catch(_){ d = 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 14) + Math.random().toString(36).slice(2, 8); }
    try { localStorage.setItem('mhxy_guest_did', d); } catch(_){}
  }
  return d;
}
async function doGuest(){
  var r = await api('/api/guest', { method:'POST', noAuth:true, body:{ did: guestDid() } });
  if (r.ok && r.json && r.json.ok){
    saveAuth(r.json);
    glog('good', '🌐 游客登录成功：<b class="y">' + escH(r.json.username) + '</b> #' + r.json.player_no);
    afterLogin();
  } else {
    glog('bad', '🌐 游客登录失败' + (r.netErr ? '（网络不通）' : '：' + escH((r.json||{}).error || r.status)));
  }
}
async function doLogin(){
  var u = val('mhxyU'), p = val('mhxyP');
  if (!u || !p){ glog('bad', '🌐 请填写用户名和密码'); return; }
  var r = await api('/api/login', { method:'POST', noAuth:true, body:{ username:u, password:p } });
  if (r.ok && r.json && r.json.ok){
    saveAuth(r.json);
    glog('good', '🌐 登录成功：<b class="y">' + escH(r.json.username) + '</b> #' + r.json.player_no + '，正在对齐云存档…');
    await afterLogin(); // v1061 等云档对齐完成再放行，防止新设备本地档先同步覆盖云端
  } else {
    glog('bad', '🌐 登录失败' + (r.netErr ? '（网络不通）' : r.status === 401 ? '（用户名或密码不对）' : '：' + escH((r.json||{}).error || r.status)));
  }
}
async function doRegister(){
  var u = val('mhxyU'), p = val('mhxyP'), x = val('mhxyX');
  if (!u || !p){ glog('bad', '🌐 请填写用户名和密码'); return; }
  if (!x){ glog('bad', '🌐 注册必须填写 X 用户名'); return; }
  var sqQ = val('mhxySqQ'), sqA = val('mhxySqA');
  var body = { username:u, password:p, x_handle:x };
  if (sqQ && sqA) { body.sq_q = sqQ; body.sq_a = sqA; }
  var bd2 = val('mhxyBday');
  if (bd2) body.birthday = bd2;
  var r = await api('/api/register', { method:'POST', noAuth:true, body:body });
  if ((r.status === 201 || r.ok) && r.json && r.json.ok){
    glog('good', '🌐 注册成功：<b class="y">' + escH(u) + '</b> #' + r.json.player_no + '，请登录');
  } else {
    var err = (r.json||{}).error || r.status;
    glog('bad', '🌐 注册失败' + (r.netErr ? '（网络不通）' : err === 'username_taken' ? '（用户名已被占用）' : err === 'bad_username' ? '（用户名3-16位，字母/数字/下划线/中文）' : err === 'bad_password' ? '（密码至少6位）' : err === 'x_handle_required' ? '（必须填写 X 用户名）' : err === 'x_taken' ? '（该 X 已被其他账号绑定，换一个）' : err === 'bad_birthday' ? '（生日不对）' : '：' + escH(err)));
  }
}
// v1082 忘记密码：密保找回
async function doRecover(){
  var u = val('mhxyU');
  if (!u){ glog('bad', '🌐 先在用户名框填要找回的账号'); return; }
  var q = await api('/api/recover/question', { method:'POST', noAuth:true, body:{ username:u } });
  if (!q.ok || !q.json || !q.json.ok){
    var e = (q.json||{}).error || q.status;
    glog('bad', '🌐 ' + (e === 'no_security' ? '该账号没设密保，无法找回' : e === 'no_account' ? '账号不存在' : '取密保问题失败：' + escH(e)));
    return;
  }
  openSheet(`<h2>🔐 密保找回</h2><div class="hint">账号：<b class="y">${escH(u)}</b></div>`
    + `<div class="row"><div class="lab">密保问题<small>${escH(q.json.question)}</small></div></div>`
    + `<div class="row"><input id="mhxyRecA" maxlength="100" placeholder="密保答案" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>`
    + `<div class="row"><input id="mhxyRecP" type="password" maxlength="128" placeholder="新密码（≥6位）" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"></div>`
    + `<div class="row"><button class="btn gold full" id="mhxyRecGo">重置密码</button></div>`
    + `<div class="row"><button class="btn full" data-close>关闭</button></div>`);
  var go = document.getElementById('mhxyRecGo');
  if (go) go.onclick = async function(){
    var a = val('mhxyRecA'), np = val('mhxyRecP');
    if (!a || !np){ glog('bad', '🌐 请填答案和新密码'); return; }
    var r = await api('/api/recover/reset', { method:'POST', noAuth:true, body:{ username:u, answer:a, new_password:np } });
    if (r.ok && r.json && r.json.ok){ glog('good', '🌐 密码已重置，请用新密码登录'); panel(); }
    else {
      var er = (r.json||{}).error || r.status;
      glog('bad', '🌐 ' + (er === 'wrong_answer' ? '答案不对（剩余' + ((r.json||{}).fails_left ?? '?') + '次）' : er === 'locked' ? '答错太多次，15分钟后再试' : er === 'bad_password' ? '新密码至少6位' : '重置失败：' + escH(er)));
    }
  };
}
async function doUpgrade(){
  var u = val('mhxyU'), p = val('mhxyP');
  if (!u || !p){ glog('bad', '🌐 请填写新用户名和密码'); return; }
  var sqQ = val('mhxySqQ'), sqA = val('mhxySqA');
  var body = { username:u, password:p };
  if (sqQ && sqA) { body.sq_q = sqQ; body.sq_a = sqA; }
  var r = await api('/api/upgrade', { method:'POST', body:body });
  if (r.ok && r.json && r.json.ok){
    ls(LK.name, r.json.username); ls(LK.guest, '0');
    glog('good', '🌐 已转为正式账号：<b class="y">' + escH(r.json.username) + '</b>（编号不变）');
    panel();
  } else {
    glog('bad', '🌐 转正失败：' + escH((r.json||{}).error || r.status));
  }
}
async function doLogout(){
  try { if (!confirm('退出当前账号？退出后回到登录界面，可以用其他账号的用户名密码登录。')) return; } catch(_){}
  try { M.dirty = true; await syncNow(false); } catch(_){} // v1196 切换账号前先把本号进度同步上云，回来不丢
  try{ await api('/api/logout', { method:'POST' }); }catch(_){}
  try{ await api('/api/world/logout', { method:'POST' }); }catch(_){}
  clearAuth(false);
  glog('sys', '🌐 已退出当前账号，请在登录界面输入用户名密码登录另一个账号。');
  showLoginGate(); // v970 登出后弹门禁，不再回单机
}
// v1165 百世书服务端登记同步：拉服务端登记表对齐本地 reg 标记，并补登本地未登记的前世记录
async function baishiSync(){
  try {
    if (!loggedIn()) return;
    const r = await api('/api/baishi/mine');
    if (!(r.ok && r.json && r.json.ok)) return;
    const regTs = {};
    (r.json.list || []).forEach(m => { const t = m.entry && m.entry.detail && m.entry.detail.ts; if (t) regTs[t] = 1; });
    window._baishiMineTs = regTs;
    let sv = null;
    try { sv = window.S || null; } catch(_) {}
    if (sv && Array.isArray(sv.pastLives)) {
      let dirty = false;
      for (const e of sv.pastLives) {
        if (e && e.detail && e.detail.ts && regTs[e.detail.ts] && !e.detail.reg) { e.detail.reg = 1; dirty = true; }
      }
      for (const e of sv.pastLives) {
        if (e && e.detail && e.detail.ts && !regTs[e.detail.ts]) {
          try {
            const rr = await api('/api/baishi/register', { method: 'POST', body: { entry: e } });
            if (rr.ok && rr.json && rr.json.ok) { e.detail.reg = 1; regTs[e.detail.ts] = 1; dirty = true; }
          } catch(_) {}
        }
      }
      if (dirty) markDirty();
    }
  } catch(_) {}
}
async function afterLogin(){
  await ensurePresence();
  pkWsConnect();
  await checkCloud();
  // v978 缓存 X 验证状态
  try {
    var _pr = await api('/api/profile/me');
    if (_pr.ok && _pr.json && _pr.json.ok) {
      try { localStorage.setItem('mhxy_xv', _pr.json.x_verified ? '1' : '0'); var _xh2 = _pr.json.x_handle || _pr.json.xHandle || ''; if (_xh2) localStorage.setItem('mhxy_xh', _xh2); } catch(_) {}
    }
  } catch(_) {}
  try { baishiSync(); } catch(_) {}
  panel();
}
function isXVerified(){ try { return localStorage.getItem('mhxy_xv') === '1'; } catch(_) { return false; } }

/* ---------- 云存档同步 ---------- */
function markDirty(saveKey){
  if (saveKey) M.saveKey = saveKey; // 游戏内 S 非全局，存档经 localStorage 读写
  if (!loggedIn()) return;
  M.dirty = true;
  if (M.syncTimer) return;
  M.syncTimer = setTimeout(function(){ M.syncTimer = null; syncNow(false); }, 60000);
}
// 游戏内 S 非全局：realm 从 localStorage 存档里读
function curRealm(){
  try{
    var raw = localStorage.getItem(M.saveKey);
    if (raw) return (JSON.parse(raw).realm | 0) || 0;
  }catch(_){}
  return 0;
}
async function syncNow(manual){
  if (!loggedIn()){ if (manual){ glog('bad', '🌐 请先登录再同步存档'); try{ panel(); }catch(_){} } return; }
  if (M.syncing){ if (manual){ glog('bad', '🌐 正在同步中，请稍候'); try{ panel(); }catch(_){} } return; }
  if (!manual && !M.dirty) return;
  M.dirty = false;
  var sj = null;
  try{ sj = localStorage.getItem(M.saveKey); }catch(_){}
  if (!sj){ if (manual){ glog('bad', '🌐 本地还没有存档'); try{ panel(); }catch(_){} } return; }
  if (sj.length > 1000000){ if (manual){ glog('bad', '🌐 存档过大，跳过同步'); try{ panel(); }catch(_){} } return; }
  var _owA = ''; try { _owA = localStorage.getItem('mhxy_sowner_aid') || ''; } catch(_){}
  if (_owA && _owA !== (ls(LK.aid) || '')){
    if (!M._owWarned){ M._owWarned = true; glog('bad', '🌐 本地存档属于另一个账号，已暂停同步（切回对应账号即可）'); }
    return;
  }
  M.syncing = true;
  try{
    var r = await api('/api/save', { method:'PUT', body:{ base_rev:M.baseRev, save_json:sj, client_ts:Date.now() } });
    if (r.ok && r.json && r.json.ok){
      M.baseRev = r.json.rev; ls(revKey(), String(M.baseRev));
      try{ localStorage.setItem('mhxy_sowner', ls(LK.name) || ''); localStorage.setItem('mhxy_sowner_aid', ls(LK.aid) || ''); }catch(_){} // v1042 上传成功即绑定归属
      if (manual) glog('good', '🌐 存档已同步到云端（rev ' + M.baseRev + '）');
    } else if (r.status === 409){
      M.dirty = true; // 留着，下次手动处理
      glog('bad', '🌐 云存档冲突：云端有更新的版本。请在联机面板点"下载云档"覆盖本地，或等下次同步。');
    } else if (manual){
      glog('bad', '🌐 同步失败' + (r.netErr ? '（网络不通）' : '：' + escH((r.json||{}).error || r.status)));
    }
  }finally{ M.syncing = false; }
  if (manual){ try{ panel(); }catch(_){} } // 刷新面板，rev 数字即反馈
}
async function checkCloud(){
  // v1042 账号为准：登录后自动对齐该账号的云存档，不再弹窗、不需手动读档
  var r = await api('/api/save/meta');
  if (!r.ok || !r.json || !r.json.ok) return;
  var _rescued = false;
  try { _rescued = !!ls(LK.aid) && (localStorage.getItem('mhxy_rescued_aid') || '') === ls(LK.aid); } catch(_){}
  if (_rescued){
    try { localStorage.removeItem('mhxy_rescued_aid'); } catch(_){}
    if (r.json.exists){ var _srv0 = r.json.rev | 0; if (_srv0 !== M.baseRev){ M.baseRev = _srv0; ls(revKey(), String(_srv0)); } }
    glog('good', '🌐 已捞回本机寄存的存档，将以这份为准同步云端');
    try { markDirty(); } catch(_){}
    return;
  }
  // v1197 捞回补漏：若本账号还有旧版按用户名寄存的档没被认领（登录时槽位已归本号、换档分支没触发的情形），在此直接捞回成本号准档
  var _legacyStash = null, _myNm = '';
  try { _myNm = ls(LK.name) || ''; if (_myNm) _legacyStash = localStorage.getItem('mhxy_save_acct_name_' + _myNm); } catch(_){}
  if (_legacyStash){
    try {
      var _curSlot = localStorage.getItem(M.saveKey); if (_curSlot) localStorage.setItem('mhxy_save_backup', _curSlot);
      localStorage.setItem(M.saveKey, _legacyStash);
      localStorage.removeItem('mhxy_save_acct_name_' + _myNm);
      localStorage.setItem('mhxy_sowner', _myNm);
      localStorage.setItem('mhxy_sowner_aid', ls(LK.aid) || '');
    } catch(_){}
    if (r.json.exists){ var _srv1 = r.json.rev | 0; M.baseRev = _srv1; try { ls(revKey(), String(_srv1)); } catch(_){} }
    glog('good', '🌐 已捞回本机寄存的存档，将以这份为准同步云端');
    try { markDirty(); } catch(_){}
    setTimeout(function(){ try { location.reload(); } catch(_){} }, 400);
    return;
  }
  if (!r.json.exists) return;
  var srv = r.json.rev | 0;
  var mine = false;
  try{ var _aid2 = ls(LK.aid) || ''; var _soa = localStorage.getItem('mhxy_sowner_aid') || ''; if (_aid2 && _soa) mine = (_soa === _aid2); else { var _nm = ls(LK.name) || ''; mine = !!_nm && (localStorage.getItem('mhxy_sowner') || '') === _nm; } }catch(_){}
  if (mine && srv <= M.baseRev){ if (srv < M.baseRev){ M.baseRev = srv; ls(revKey(), String(srv)); } return; } // 本地就是本账号的档且不旧于云端
  try{ var _sj = localStorage.getItem(M.saveKey); if (_sj) localStorage.setItem('mhxy_save_backup', _sj); }catch(_){} // 覆盖前备份本地档，可恢复
  await downloadSave(true);
}
async function downloadSave(quiet){
  var r = await api('/api/save');
  if (r.ok && r.json && r.json.ok){
    try{
      JSON.parse(r.json.save_json); // 仅校验
      // 游戏内 S 非全局：写 localStorage 后重载页面，游戏启动时自然载入
      try{ localStorage.setItem(M.saveKey, r.json.save_json); }
      catch(_){ glog('bad', '🌐 本地写入失败'); return; }
      M.baseRev = r.json.rev; ls(revKey(), String(M.baseRev));
      try{ localStorage.setItem('mhxy_sowner', ls(LK.name) || ''); localStorage.setItem('mhxy_sowner_aid', ls(LK.aid) || ''); }catch(_){} // v1042 标记本地档归属账号
      M.dirty = false;
      glog('good', '🌐 已从云端下载存档（rev ' + M.baseRev + '），正在重载…');
      setTimeout(function(){ try{ location.reload(); }catch(_){} }, 800);
    }catch(e){ glog('bad', '🌐 云存档解析失败'); }
  } else if (r.status === 404){
    if (!quiet) glog('sys', '🌐 云端还没有存档，先点"同步存档"上传。');
  } else {
    glog('bad', '🌐 下载失败' + (r.netErr ? '（网络不通）' : '：' + escH((r.json||{}).error || r.status)));
  }
}
try{
  document.addEventListener('visibilitychange', function(){ if (document.visibilityState === 'hidden') syncNow(false); });
  window.addEventListener('pagehide', function(){ syncNow(false); });
}catch(_){}

/* ---------- 在线状态 ---------- */
function myPos(){ try { var w = (typeof S !== 'undefined' && S && S.worldMap) || { px: 2, py: 3 }; return { x: w.px|0, y: w.py|0 }; } catch(_) { return { x: 0, y: 0 }; } }
async function ensurePresence(){
  if (!loggedIn()) return;
  var realm = curRealm();
  var _p0 = myPos();
  var _gdr = 'm'; try { _gdr = (typeof S !== 'undefined' && S && S.gender) ? S.gender : ((window.M && M.saveKey ? JSON.parse(localStorage.getItem(M.saveKey) || '{}').gender : '') || 'm'); } catch(_) {}
  await api('/api/world/register', { method:'POST', body:{ realm:realm, x:_p0.x, y:_p0.y, gender:_gdr, avatar:(typeof S !== 'undefined' && S ? (S.avatar|0) : 0), avatar_set:((typeof S !== 'undefined' && S && S.avatarGalleryId) || '') } });
  if (M.hbTimer) clearInterval(M.hbTimer);
  M.hbTimer = setInterval(function(){
    if (!loggedIn()){ stopPresence(); return; }
    var _p = myPos();
    api('/api/world/heartbeat', { method:'POST', body:{ x:_p.x, y:_p.y, gender:((typeof S !== 'undefined' && S && S.gender) || ''), avatar:(typeof S !== 'undefined' && S ? (S.avatar|0) : 0), avatar_set:((typeof S !== 'undefined' && S && S.avatarGalleryId) || '') } });
  }, 30000);
  // v1009 每15秒拉一次在线玩家位置，变了才重绘地图
  var pollPlayers = function(){
    if (!loggedIn()) return;
    api('/api/world/state').then(function(r){
      if (!r.ok || !r.json) return;
      var me = myAid();
      if (r.json.scans && r.json.scans.length) { // v1171 神识扫描提示送达（服务端送达即清，只报一次）
        r.json.scans.forEach(function(sc){ var _sm = '👁️ ' + (sc.from || '有人') + ' 神识扫描了你'; if (typeof toastLog === 'function') toastLog('sys', _sm); else if (typeof glog === 'function') glog('sys', _sm); });
      }
      if (r.json.teamNotices && r.json.teamNotices.length) { // v1188 组队变动通知送达（被踢/解散/入队/离队/队长变更，不再全程静默）
        r.json.teamNotices.forEach(function(n){ if (typeof toastLog === 'function') toastLog('sys', n.text); else if (typeof glog === 'function') glog('sys', n.text); });
        if (typeof window.teamRefresh === 'function') { try { window.teamRefresh(); } catch(_) {} }
      }
      if (r.json.myTb && typeof window.tbNoteMyTb === 'function') { try { window.tbNoteMyTb(r.json.myTb); } catch(_) {} } // v1189 组队战重入：被拉入/断线重连后自动接入战斗面板
      var ps = (r.json.players || []).filter(function(p){ return p.online && p.accountId !== me && typeof p.x === 'number' && typeof p.y === 'number'; });
      var sig = ps.map(function(p){ return p.accountId + ':' + p.x + ',' + p.y; }).join('|');
      if (sig !== M._plSig) { M._plSig = sig; window._worldPlayers = ps; try { if (typeof renderWorldMap === 'function') renderWorldMap(); } catch(_) {} }
    }).catch(function(){});
  };
  if (M.plTimer) clearInterval(M.plTimer);
  M.plTimer = setInterval(pollPlayers, 15000);
  pollPlayers();
}
function stopPresence(){ if (M.hbTimer){ clearInterval(M.hbTimer); M.hbTimer = null; } }
async function onlinePlayers(){
  var r = await api('/api/world/state');
  if (!r.ok || !r.json) return null;
  var ps = r.json.players || [];
  var me = myAid();
  return ps.filter(function(p){ return p.online && p.accountId !== me; });
}

/* ---------- 真人聊天 ---------- */
function chatDispName(m){ if (!m) return '?'; if (m.rname) return m.rname; if (m.roleName) return m.roleName; try { var ps = window._worldPlayers || []; for (var i = 0; i < ps.length; i++){ var p = ps[i]; if (p && p.player_no != null && m.playerNo != null && String(p.player_no) === String(m.playerNo) && p.username) return p.username; } } catch(_) {} return m.username || m.n || '?'; } // v1010 道号优先
function chatName(m){ var _hid = m.xHidden || m.x_hide; var xh = (m.xHandle && !_hid) ? '<span style="color:#1d9bf0">@' + escH(m.xHandle) + '</span>' + (m.xVerified ? '<span style="color:#1d9bf0">✓</span>' : '') + ' ' : ((_hid && m.xVerified) ? '<span style="color:#1d9bf0">✓</span> ' : ''); return xh + escH(chatDispName(m)) + '<span style="color:#666">[' + (m.playerNo || '?') + ']</span>'; } // v1010 隐藏时只显 ✓
function chatMsgHtml(m){
  var extra = '';
  var mt = /【观礼#([0-9a-z]+)\|([^|]*)\|([^|]*)\|([^】]*)】/.exec(m.text || '');
  if (mt) extra = ' <button class="btn sm" data-spectate="' + mt[1] + '" data-specmeta="' + escH(mt[2]) + '|' + escH(mt[3]) + '|' + escH(mt[4]) + '">👀 观礼</button>';
  var rp2 = /【红包#([0-9a-z]+)/.exec(m.text || '');
  if (rp2) extra += ' <button class="btn sm" data-redpacket="' + rp2[1] + '">🧧 抢红包</button>';
  return '<div class="chat-msg"><b style="color:#7ec8ff">' + chatName(m) + '</b>：' + escH(m.text) + extra + '</div>';
}
/* ---------- GM 管理面板（v974） ---------- */
async function gmCheck(){
  try {
    var r = await api('/api/gm/check');
    return r.ok && r.json && r.json.ok && r.json.is_gm;
  } catch(_) { return false; }
}
function gmPanel(){
  openSheet('<h2>🛠️ GM 管理</h2><div class="hint">直接修改服务端存档（绕过防作弊限制）。仅服主可见。</div>'
    + '<div class="hint">设数值：</div>'
    + '<div class="row" style="display:flex;gap:6px">'
    + '<select id="gmField" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
    + '<option value="gold">金元</option><option value="xianyu">仙玉</option><option value="petEggs">宠物蛋</option>'
    + '<option value="level">等级</option><option value="realm">境界</option><option value="mana">法力</option>'
    + '<option value="xp">经验</option><option value="lifespan">寿元</option>'
    + '</select>'
    + '<input id="gmValue" type="number" placeholder="数值" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
    + '<button class="btn gold" data-mhxygmset>设置</button></div>'
    + '<div class="hint" style="margin-top:8px">发物品：</div>'
    + '<div class="row" style="display:flex;gap:6px">'
    + '<select id="gmStore" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
    + '<option value="ores">矿石</option><option value="mats">材料</option><option value="meds">药品</option>'
    + '<option value="elixirs">丹药</option><option value="inv">杂物</option><option value="eggs">蛋</option><option value="maiPages">脉络残页</option>'
    + '</select>'
    + '<input id="gmKey" placeholder="物品key" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
    + '<input id="gmN" type="number" value="99" style="width:70px;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
    + '<button class="btn gold" data-mhxygmgive>发放</button></div>'
    + '<div class="hint" style="margin-top:8px">按名发物（输物品名 + 数量）：</div>'
    + '<div class="row" style="display:flex;gap:6px">'
    + '<input id="gmName" placeholder="物品名，如 开脉丹" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
    + '<input id="gmNameN" type="number" value="1" style="width:70px;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
    + '<button class="btn gold" data-mhxygmgivebyname>发放</button></div>'
    + '<div class="hint" style="margin-top:8px">X 验证（人工）：</div>'
    + '<div class="row" style="display:flex;gap:6px">'
    + '<input id="gmXUser" placeholder="游戏用户名" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff">'
    + '<button class="btn gold" data-mhxygmxverify>通过验证</button></div>'
    + '<div class="hint" style="margin-top:8px">玩家创作审核：</div>'
    + '<div class="row"><button class="btn gold full" data-mhxygmcrev>🏰🌀❓ 待审秘境·奇遇·问心</button></div>'
    + '<div id="gmMsg" class="hint" style="margin-top:8px"></div>'
    + '<div class="row"><button class="btn full" data-close>关闭</button></div>');
}
function gmCreatorPanel() {
  openSheet('<h2>🛠️ 创作审核</h2><div class="hint">加载中…</div>');
  Promise.all([MHXY.api('/api/creator/dungeon/pending'), MHXY.api('/api/creator/encounter/pending'), MHXY.api('/api/creator/wenxin/pending')]).then(function(rs) {
    try {
      const dgs = (rs[0].ok && rs[0].json && rs[0].json.ok) ? (rs[0].json.list || []) : [];
      const encs = (rs[1].ok && rs[1].json && rs[1].json.ok) ? (rs[1].json.list || []) : [];
      const wxs = (rs[2] && rs[2].ok && rs[2].json && rs[2].json.ok) ? (rs[2].json.list || []) : [];
      let h = '<h2>🛠️ 创作审核</h2>';
      h += '<h3 style="margin:6px 0 2px">🏰 待审秘境（' + dgs.length + '）</h3>';
      if (!dgs.length) h += '<div class="hint">没有待审秘境。</div>';
      dgs.forEach(function(dg) {
        let tiles = ''; try { const t = JSON.parse(dg.grid).tiles; tiles = t.map(row => row.map(c => ({ start: '🚶', exit: '🚪', empty: '⬜', fight: '⚔️', gchest: '🎁', gherb: '🌿', event: '📜', rest: '⛺' })[c.t] || '⬜').join('')).join('<br>'); } catch(_) {}
        h += `<div class="row"><div class="lab">🏰 ${escH(dg.title)}<small>作者 ${escH(dg.author_name)} · 费 ${dg.fee}<br><span style="font-size:14px;line-height:1.2">${tiles}</span></small></div><button class="btn gold" data-mhxygmrev="dungeon:${dg.id}:1">通过</button><button class="btn" data-mhxygmrev="dungeon:${dg.id}:0">驳回</button></div>`;
      });
      h += '<h3 style="margin:8px 0 2px">🌀 待审奇遇（' + encs.length + '）</h3>';
      if (!encs.length) h += '<div class="hint">没有待审奇遇。</div>';
      encs.forEach(function(e) {
        let a = {}, b = {}; try { a = JSON.parse(e.opt_a); b = JSON.parse(e.opt_b); } catch(_) {}
        h += `<div class="row"><div class="lab">🌀 ${escH(e.text)}<small>作者 ${escH(e.author_name)}<br>① ${escH(a.t || '')}（${escH(a.fx || '')}）② ${escH(b.t || '')}（${escH(b.fx || '')}）</small></div><button class="btn gold" data-mhxygmrev="encounter:${e.id}:1">通过</button><button class="btn" data-mhxygmrev="encounter:${e.id}:0">驳回</button></div>`;
      });
      h += '<h3 style="margin:8px 0 2px">❓ 待审问心题（' + wxs.length + '）</h3>';
      if (!wxs.length) h += '<div class="hint">没有待审问心题。</div>';
      wxs.forEach(function(w) {
        let opts = []; try { opts = JSON.parse(w.opts); } catch(_) {}
        const bk = w.bank === 'dao' ? '问道' : '机制';
        h += `<div class="row"><div class="lab">❓ ${escH(w.q)}<small>作者 ${escH(w.author_name)} · ${bk}题<br>` + opts.map((o, i) => (i === (w.ans | 0) ? '✅' : '·') + ' ' + escH(o)).join('<br>') + `</small></div><button class="btn gold" data-mhxygmrev="wenxin:${w.id}:1">通过</button><button class="btn" data-mhxygmrev="wenxin:${w.id}:0">驳回</button></div>`;
      });
      h += '<div class="row"><button class="btn full" data-close>关闭</button></div>';
      openSheet(h);
    } catch(_) {}
  });
}
async function gmDoSet(){
  var f = val('gmField'), v = val('gmValue');
  var msg = document.getElementById('gmMsg');
  if (!v) { if (msg) msg.textContent = '请输入数值'; return; }
  var r = await api('/api/gm/set', { method:'POST', body:{ field:f, value:parseInt(v,10) } });
  if (msg) {
    if (r.ok && r.json && r.json.ok) msg.textContent = '✅ 已设置 ' + f + ' = ' + r.json.value;
    else msg.textContent = '❌ 失败：' + ((r.json||{}).error || r.status);
  }
  if (r.ok && r.json && r.json.ok) { try { syncNow(false); } catch(_) {} }
}
async function gmDoGive(){
  var s = val('gmStore'), k = val('gmKey'), n = val('gmN'); if (s === 'maiPages' && !k) k = '*'; // v1012 脉络残页无 key
  var msg = document.getElementById('gmMsg');
  if (!k) { if (msg) msg.textContent = '请输入物品key'; return; }
  var r = await api('/api/gm/give', { method:'POST', body:{ store:s, key:k, n:parseInt(n,10)||1 } });
  if (msg) {
    if (r.ok && r.json && r.json.ok) msg.textContent = '✅ 已发放 ' + k + ' ×' + r.json.n + '（现有 ' + r.json.total + '）';
    else msg.textContent = '❌ 失败：' + ((r.json||{}).error || r.status);
  }
}
function gmNameMatches(name){
  const q = String(name || '').trim();
  const CC = (typeof window !== 'undefined' && window.Core) ? window.Core : (typeof C !== 'undefined' ? C : null);
  if (!q || !CC) return [];
  const out = [];
  const push = (store, key, disp) => out.push({ store, key, disp });
  [['ores', CC.ORES], ['mats', CC.MATS], ['meds', CC.MEDS], ['eggs', CC.EGGS]].forEach(([store, tab]) => {
    if (!tab) return;
    Object.keys(tab).forEach(k => { const n = tab[k] && tab[k].name; if (n) push(store, k, n); });
  });
  ['hp', 'mp'].forEach(t => { [1, 2, 3].forEach(qq => { const P = CC.potOf ? CC.potOf(t + qq) : null; if (P) push('elixirs', t + qq, (CC.QNAME ? CC.QNAME[qq] : '') + P.name); }); });
  push('inv', 'mai', '开脉丹');
  push('inv', 'detox', '化无丹');
  push('inv', 'sha', '煞气');
  if (CC.MUT_PILLS) Object.keys(CC.MUT_PILLS).forEach(id => { if (CC.MUT_PILLS[id].name) push('inv', 'mut_' + id, CC.MUT_PILLS[id].name); });
  ['str', 'agi', 'def', 'vit', 'int'].forEach(a => { [1, 2, 3, 4, 5].forEach(g => { if (CC.GRADES && CC.AN) push('inv', a + '_' + g, CC.GRADES[g] + CC.AN[a] + '丹'); }); });
  push('maiPages', '*', '脉络残页');
  const _cc = '胎气基丹婴神乘劫余散合尊';
  for (let i = 0; i < 12; i++) push('inv', 'repair' + i, '修' + _cc[i] + '灵物');
  const strip = s => String(s).replace(/^[^\u4e00-\u9fa5a-zA-Z0-9]+/, '');
  const matchOne = qq => { const ex = out.filter(o => strip(o.disp) === qq || o.disp === qq); if (ex.length) return ex; return out.filter(o => strip(o.disp).indexOf(qq) >= 0); };
  const seen = new Set(), res = [];
  [q, q.replace(/灵药/g, '灵物')].forEach(qq => matchOne(qq).forEach(o => { const k = o.store + ':' + o.key; if (!seen.has(k)) { seen.add(k); res.push(o); } }));
  return res;
}
async function gmDoGiveByName(){
  var name = val('gmName'), msg = document.getElementById('gmMsg');
  if (!name) { if (msg) msg.textContent = '请输入物品名'; return; }
  const list = gmNameMatches(name);
  if (!list.length) { if (msg) msg.textContent = '❌ 没找到叫“' + name + '”的物品'; return; }
  if (list.length > 1) { if (msg) msg.textContent = '有多个匹配，请写全名：' + list.map(o => o.disp).join('、'); return; }
  const o = list[0];
  const n = Math.max(1, parseInt(val('gmNameN'), 10) || 1);
  var r = await api('/api/gm/give', { method: 'POST', body: { store: o.store, key: o.key, n: n } });
  if (msg) {
    if (r.ok && r.json && r.json.ok) msg.textContent = '✅ 已发放 ' + o.disp + ' ×' + n + '（现有 ' + r.json.total + '）';
    else msg.textContent = '❌ 失败：' + ((r.json || {}).error || r.status);
  }
}
function chatPanel(){
  M.chatOpen = true;
  openSheet('<h2>💬 真人世界</h2><div class="hint">与真人道友聊天（3秒1条，500条历史）。关闭面板后不再接收实时消息。</div>'
    + '<div class="row"><div class="lab">🏦 天道池<small id="poolChatTxt">读取中…</small></div><button class="btn sm" data-poolview>看池子</button></div>'
    + '<div id="mhxyChatBox" style="max-height:300px;overflow-y:auto;border:1px solid #444;border-radius:8px;padding:8px;margin-bottom:8px;background:#111"><div class="hint">连接中…</div></div>'
    + '<div class="row" style="display:flex;gap:6px"><input id="mhxyChatInp" maxlength="200" placeholder="说点什么…" style="flex:1;padding:8px;border-radius:6px;border:1px solid #555;background:#222;color:#fff"><button class="btn gold" data-mhxychatsend>发送</button></div>'
    + '<div class="row"><button class="btn full" data-close>关闭</button></div>');
  chatHistory();
  poolChatTxt();
  chatWsConnect();
  var inp = document.getElementById('mhxyChatInp');
  if (inp) inp.onkeydown = function(e){ if (e.key === 'Enter') chatSend(); };
}
async function chatHistory(){
  var box = document.getElementById('mhxyChatBox'); if (!box) return;
  var r = await api('/api/chat/history');
  if (r.ok && r.json && r.json.ok){
    var ms = r.json.messages || [];
    box.innerHTML = ms.map(chatMsgHtml).join('') || '<div class="hint">暂无消息，道友先开个头吧。</div>';
    box.scrollTop = box.scrollHeight;
    try { window._srvChat = ms; } catch(_) {}
  } else {
    box.innerHTML = '<div class="hint">历史加载失败' + (r.netErr ? '（网络不通）' : '') + '</div>';
  }
}
// v973 悬浮窗世界频道：拉取真人聊天历史到缓存
async function chatHistoryToCache(){
  try {
    var r = await api('/api/chat/history');
    if (r.ok && r.json && r.json.ok){
      window._srvChat = r.json.messages || [];
      // 如果悬浮窗在世界频道，刷新显示
      try {
        if (window._chatTab === 'world' && document.getElementById('chatFloat') && document.getElementById('chatFloat').classList.contains('on') && typeof window.renderChatFloat === 'function') window.renderChatFloat();
      } catch(_) {}
    }
  } catch(_){}
}
try { window.chatHistoryToCache = chatHistoryToCache; } catch(_){}
function chatWsConnect(){
  if (!loggedIn() || M.chatWs) return;
  var tok = ls(LK.tok); if (!tok) return;
  try{
    var ws = new WebSocket(API.replace(/^http/, 'ws') + '/api/chat/ws?token=' + encodeURIComponent(tok));
    M.chatWs = ws;
    ws.onmessage = function(ev){
      var m = null; try{ m = JSON.parse(ev.data); }catch(_){ return; }
      if (!m) return;
      var box = document.getElementById('mhxyChatBox');
      if (m.type === 'history' && box && Array.isArray(m.messages)){
        box.innerHTML = m.messages.map(chatMsgHtml).join('') || '<div class="hint">暂无消息</div>';
        box.scrollTop = box.scrollHeight;
        try { window._srvChat = m.messages; } catch(_) {}
      } else if (m.type === 'chat' && m.message && box){
        var tmp = document.createElement('div'); tmp.innerHTML = chatMsgHtml(m.message);
        while (tmp.firstChild) box.appendChild(tmp.firstChild);
        while (box.children.length > 60) box.removeChild(box.firstChild);
        box.scrollTop = box.scrollHeight;
        // v973 同步到悬浮窗缓存并刷新
        try {
          if (!Array.isArray(window._srvChat)) window._srvChat = [];
          window._srvChat.push(m.message);
          if (window._srvChat.length > 50) window._srvChat = window._srvChat.slice(-50);
          if (window._chatTab === 'world' && document.getElementById('chatFloat') && document.getElementById('chatFloat').classList.contains('on') && typeof window.renderChatFloat === 'function') window.renderChatFloat();
        } catch(_) {}
      }
    };
    ws.onclose = function(){ if (M.chatWs === ws) M.chatWs = null; };
    ws.onerror = function(){ try{ ws.close(); }catch(_){} };
  }catch(_){ M.chatWs = null; }
}
function closeChatWs(){ M.chatOpen = false; if (M.chatWs){ try{ M.chatWs.close(); }catch(_){} M.chatWs = null; } }
async function chatSend(){
  var inp = document.getElementById('mhxyChatInp');
  var v = inp ? (inp.value || '').trim().slice(0, 200) : '';
  if (!v) return;
  var realm = curRealm();
  var r = await api('/api/chat/send', { method:'POST', body:{ text:v, realm:realm } });
  if (r.ok && r.json && r.json.ok){
    if (inp) inp.value = '';
    // WS 会广播回来；若 WS 没连，手动补一条
    if (!M.chatWs){
      var box = document.getElementById('mhxyChatBox');
      if (box && r.json.message){ var tmp = document.createElement('div'); tmp.innerHTML = chatMsgHtml(r.json.message); while (tmp.firstChild) box.appendChild(tmp.firstChild); box.scrollTop = box.scrollHeight; }
    }
  } else if (r.status === 429){
    glog('bad', '🌐 发言太快，3秒后再试');
  } else if (r.status === 401){
    glog('bad', '🌐 登录已过期，请到真人联机重新登录后再发言');
  } else {
    glog('bad', '🌐 发送失败' + (r.netErr ? '（网络不通）' : ''));
  }
}

/* ---------- 真人PK ---------- */
function pkPanel(){
  openSheet('<h2>⚔️ 在线约战</h2><div class="hint">切磋须对方接受，不抢不掉；攻击按你的模式即时开打（服务端结算）。主城不能杀人，灭口只在野外（冒险图）与生死局生效。</div>'
    + '<div id="pkModeBox"><div class="hint">加载模式…</div></div>'
    + '<div class="row"><button class="btn full" data-mhxybounty>📜 通缉令</button></div>'
    + '<div id="mhxyPkList"><div class="hint">加载在线道友…</div></div>'
    + '<div class="row"><button class="btn gold full" data-mhxyraid>⛰️ 匹配灵脉闭关者（真人PK）</button></div>'
    + '<div class="hint">灵脉闭关满 1 小时者会进匹配池：自动应战、输赢照常结算、不打断其闭关；优先匹配还没被打过的。</div>'
    + '<div class="row"><button class="btn full" data-mhxypkrefresh>刷新</button></div>'
    + '<div class="row"><button class="btn full" data-close>关闭</button></div>');
  pkRefresh();
  pkModeRefresh();
}
async function pkRefresh(){
  var box = document.getElementById('mhxyPkList'); if (!box) return;
  var ps = await onlinePlayers();
  if (ps === null){ box.innerHTML = '<div class="hint">在线列表加载失败（网络不通）</div>'; return; }
  if (!ps.length){ box.innerHTML = '<div class="hint">暂无其他道友在线</div>'; return; }
  box.innerHTML = ps.slice(0, 30).map(function(p){
    return '<div class="row" style="display:flex;align-items:center;gap:8px"><span style="flex:1"><b style="color:#7ec8ff">' + escH(p.username) + '</b><span style="color:#666">[' + (p.playerNo || '?') + ']</span> ' + window.pkModeTag(p.mode) + '</span>'
      + '<button class="btn" data-mhxypkgo="' + escH(p.accountId) + '">切磋</button>'
      + '<button class="btn gold" data-mhxypkatk="' + escH(p.accountId) + '">攻击</button></div>';
  }).join('');
}
async function pkChallenge(targetId){
  var r = await api('/api/pk/challenge', { method:'POST', body:{ target_account_id:targetId, arena:false, spar:true, take_attr:'str' } });
  if (r.ok && r.json && r.json.ok){
    M.challenging = r.json.challenge_id;
    glog('sys', '🤝 已向对方发出切磋邀请，等待接受（60秒）。可在"在线约战"面板等结果。');
    pkPollResult(r.json.challenge_id, 0);
  } else {
    var err = (r.json||{}).error || r.status;
    glog('bad', '⚔️ 挑战失败' + (r.netErr ? '（网络不通）' : err === 'target_offline' ? '（对方已离线）' : err === 'already_challenging' ? '（你已有一场待应战的挑战）' : '：' + escH(err)));
  }
}
/* ---------- 组队（v1051） ---------- */
// v1051 组队：5人小队（人和宠物共用位置），队长带移动，组队战斗
async function teamRefresh(){
  var r = await api('/api/world/team/state');
  if (!r.ok || !r.json || !r.json.ok){
    var _box = document.getElementById('mhxyTeamInfo');
    if (_box) _box.innerHTML = '<div class="hint">队伍状态加载失败（网络不通）</div>';
    return;
  }
  var team = r.json.team || null;
  var invites = r.json.invites || [];
  if (r.json.notices && r.json.notices.length) r.json.notices.forEach(function(n){ try { glog('sys', n.text); } catch(_){} }); // v1188 组队通知（与 /state 送达二选一，服务端取走即清）
  // v1051 存全局队伍状态
  window._myTeam = team;
  try { window._isTeamLeader = team ? (team.leaderId === myAid()) : false; } catch(_){ window._isTeamLeader = false; }
  // 我的队伍
  var infoBox = document.getElementById('mhxyTeamInfo');
  if (infoBox){
    if (!team){
      infoBox.innerHTML = '<div class="hint">你还没有队伍</div>'
        + '<div class="row"><button class="btn gold full" data-mhxyteamcreate>创建队伍</button></div>';
    } else {
      var h = '<div class="hint">我的队伍（' + (team.slotsUsed || 0) + '/5）' + (window._isTeamLeader ? '　<b class="y">你是队长</b>' : '') + '</div>';
      h += (team.members || []).map(function(m){
        var isL = m.isLeader ? ' <b class="y">队长</b>' : '';
        var kickBtn = (window._isTeamLeader && !m.isLeader) ? ' <button class="btn sm red" data-mhxyteamkick="' + escH(m.accountId) + '">踢出</button>' : '';
        return '<div class="row" style="display:flex;align-items:center;gap:8px"><span style="flex:1"><b style="color:#7ec8ff">' + escH(m.username) + '</b><span style="color:#666">[' + (m.playerNo || '?') + ']</span>' + isL + '</span>' + kickBtn + '</div>';
      }).join('');
      var _meAid = ''; try { _meAid = myAid(); } catch(_){}
      h += (team.pets || []).map(function(p){
        var _owner = (team.members || []).find(function(m){ return m.accountId === p.ownerId; });
        var _rm = (p.ownerId === _meAid) ? ' <button class="btn sm" data-mhxyteampetremove="' + escH(p.petKey) + '">撤下</button>' : '';
        return '<div class="row" style="display:flex;align-items:center;gap:8px"><span style="flex:1">🐾 ' + escH(p.name) + '<span style="color:#666">（' + escH(_owner ? _owner.username : '队友') + '的宠物）</span></span>' + _rm + '</div>';
      }).join('');
      // v1188 宠物入队入口（Ye 定：人和宠物共用位置；后端计数与文案早已就绪，此前独缺面板按钮，出战宠物无从入队）
      try {
        var _inTeam = {}; (team.pets || []).forEach(function(p){ _inTeam[p.petKey] = 1; });
        var _deployed = (window.Core && typeof window.Core.activePets === 'function' && typeof S !== 'undefined' && S) ? (window.Core.activePets(S) || []) : [];
        _deployed.forEach(function(pt){
          var _key = 'pet_' + pt.id;
          if (_inTeam[_key]) return;
          var _def = (window.Core.PETS && window.Core.PETS[pt.k]) || {};
          var _nm = (_def.icon || '🐾') + (_def.name || '灵宠') + '#' + pt.id;
          if ((team.slotsUsed || 0) < 5) {
            h += '<div class="row" style="display:flex;align-items:center;gap:8px"><span style="flex:1">🐾 ' + escH(_nm) + '<span style="color:#666"> 出战中</span></span> <button class="btn gold sm" data-mhxyteampetadd="' + _key + '" data-petname="' + escH(_nm) + '">带入队</button></div>';
          } else {
            h += '<div class="row"><span>🐾 ' + escH(_nm) + '<span style="color:#666"> 出战中（队伍已满，无法入队）</span></span></div>';
          }
        });
      } catch(_){}
      if (window._isTeamLeader){
        h += '<div class="row"><button class="btn red full" data-mhxyteamdisband>解散队伍</button></div>';
      } else {
        h += '<div class="row"><button class="btn full" data-mhxyteamleave>离开队伍</button></div>';
      }
      infoBox.innerHTML = h;
    }
  }
  // 待处理的邀请
  var invBox = document.getElementById('mhxyTeamInvites');
  if (invBox){
    if (invites.length){
      invBox.innerHTML = '<div class="hint">待处理的邀请：</div>' + invites.map(function(iv){
        return '<div class="row" style="display:flex;align-items:center;gap:8px"><span style="flex:1"><b style="color:#7ec8ff">' + escH(iv.leaderName || '?') + '</b> 邀请你组队（' + (iv.slotsUsed || 0) + '/5）</span>'
          + '<button class="btn gold sm" data-mhxyteamaccept="' + escH(iv.teamId) + '">接受</button>'
          + '<button class="btn sm" data-mhxyteamdecline="' + escH(iv.teamId) + '">拒绝</button></div>';
      }).join('');
    } else {
      invBox.innerHTML = '';
    }
  }
  // 在线玩家（邀请）
  var onlineBox = document.getElementById('mhxyTeamOnline');
  if (onlineBox){
    var ps = await onlinePlayers();
    if (ps === null){
      onlineBox.innerHTML = '<div class="hint">在线列表加载失败（网络不通）</div>';
    } else if (!ps.length){
      onlineBox.innerHTML = '<div class="hint">暂无其他道友在线</div>';
    } else {
      var canInvite = team && window._isTeamLeader && (team.slotsUsed || 0) < 5;
      var _memberIds = {}; ((team && team.members) || []).forEach(function(m){ _memberIds[m.accountId] = 1; });
      onlineBox.innerHTML = '<div class="hint">在线道友：</div>' + ps.slice(0, 100).map(function(p){
        var _no = (p.player_no != null ? p.player_no : (p.playerNo != null ? p.playerNo : '?')); // v1188 后端字段是 player_no，旧版读 playerNo 恒为 ?，编号从不显示
        var btn = _memberIds[p.accountId] ? ' <span class="hint" style="color:#7eff9e">已在队中</span>' : (canInvite ? ' <button class="btn gold sm" data-mhxyteaminvite="' + escH(p.accountId) + '">邀请</button>' : ''); // v1188 已入队不再挂邀请按钮；上限 30→100 防人多刷不到
        return '<div class="row" style="display:flex;align-items:center;gap:8px"><span style="flex:1"><b style="color:#7ec8ff">' + escH(p.username) + '</b><span style="color:#666">[' + _no + ']</span></span>' + btn + '</div>';
      }).join('');
    }
  }
}
async function teamCreate(){
  var r = await api('/api/world/team/create', { method:'POST', body:{} });
  if (r.ok && r.json && r.json.ok){ glog('good', '👥 队伍创建成功'); teamRefresh(); }
  else glog('bad', '👥 创建队伍失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
// v1187 后端失败原因在 err 字段（前端旧版只读 error，读不到就只剩状态码数字）
function teamErrText(r){
  var e = (r.json || {}).error || (r.json || {}).err || '';
  var map = { 'not in team': '你还没有队伍', 'only leader can invite': '只有队长能邀请', 'bad target': '目标不对', 'target already in team': '对方已经有队伍了', 'team full': '队伍满了', 'already invited': '已经邀请过对方了', 'target not online': '对方在闭关状态', 'missing identity': '登录状态失效，请重新登录', 'already in team': '你已经在队伍里了', 'team not found': '队伍不存在（可能已解散）', 'no invite': '没有这份邀请（可能已过期）', 'only leader can kick': '只有队长能踢人', 'cannot kick self': '不能踢自己', 'not a member': '对方不在队伍里', 'only leader can disband': '只有队长能解散队伍', 'only leader can transfer': '只有队长能转让队长', 'pet already in team': '这只灵宠已在队中', 'pet not in team': '这只灵宠不在队中', 'bad pet_key': '灵宠不对' };
  return map[e] || e || r.status;
}
async function teamInvite(targetId){
  var r = await api('/api/world/team/invite', { method:'POST', body:{ target_account_id: targetId } });
  if (r.ok && r.json && r.json.ok){ glog('good', '👥 邀请已发出'); }
  else glog('bad', '👥 邀请失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
async function teamAccept(teamId){
  var r = await api('/api/world/team/accept', { method:'POST', body:{ team_id: teamId } });
  if (r.ok && r.json && r.json.ok){ glog('good', '👥 已加入队伍'); teamRefresh(); }
  else glog('bad', '👥 加入失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
async function teamDecline(teamId){
  var r = await api('/api/world/team/decline', { method:'POST', body:{ team_id: teamId } });
  if (r.ok && r.json && r.json.ok){ teamRefresh(); }
  else glog('bad', '👥 操作失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
async function teamLeave(){
  var r = await api('/api/world/team/leave', { method:'POST', body:{} });
  if (r.ok && r.json && r.json.ok){ window._myTeam = null; window._isTeamLeader = false; glog('sys', '👥 已离开队伍'); teamRefresh(); }
  else glog('bad', '👥 离开失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
async function teamDisband(){
  var r = await api('/api/world/team/disband', { method:'POST', body:{} });
  if (r.ok && r.json && r.json.ok){ window._myTeam = null; window._isTeamLeader = false; glog('sys', '👥 队伍已解散'); teamRefresh(); }
  else glog('bad', '👥 解散失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
async function teamKick(targetId){
  var r = await api('/api/world/team/kick', { method:'POST', body:{ target_account_id: targetId } });
  if (r.ok && r.json && r.json.ok){ glog('sys', '👥 已踢出队员'); teamRefresh(); }
  else glog('bad', '👥 踢出失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
// v1188 宠物入队/撤下（Ye 定占位；后端 /team/pet/add|remove 早已就绪，此前没有前端入口）
async function teamPetAdd(petKey, petName){
  var r = await api('/api/world/team/pet/add', { method:'POST', body:{ pet_key: petKey, pet_name: petName } });
  if (r.ok && r.json && r.json.ok){ glog('good', '🐾 灵宠已入队'); teamRefresh(); }
  else glog('bad', '🐾 灵宠入队失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
async function teamPetRemove(petKey){
  var r = await api('/api/world/team/pet/remove', { method:'POST', body:{ pet_key: petKey } });
  if (r.ok && r.json && r.json.ok){ glog('sys', '🐾 灵宠已撤下'); teamRefresh(); }
  else glog('bad', '🐾 撤下失败' + (r.netErr ? '（网络不通）' : '：' + escH(teamErrText(r))));
}
// v1051 组队：队长移动后同步全队位置
function teamLeaderMoveSync(x, y){
  try {
    if (!window._myTeam || !window._isTeamLeader) return;
    api('/api/world/team/move', { method:'POST', body:{ x:x, y:y } }).catch(function(){});
  } catch(_){}
}
// ===== v1189 联机组队战斗（服务端权威：/api/world/tb/*；本块只负责开战钩子/面板/轮询/结果应用）=====
function tbErrText(err) {
  return { not_in_team: '你不在队伍里', no_monster_here: '这格的怪已经被清掉了', already_in_battle: '你已在一场组队战斗中', member_in_battle: '有队友正在另一场战斗中', no_save: '读取存档失败，无法开战', bad_params: '开战参数不对', no_battle: '战斗已结束', battle_over: '战斗已结束', not_participant: '你不在这场战斗里', you_are_down: '你已倒下' }[err] || '联机战斗开启失败';
}
window.tbStartFromAdv = async function (q) {
  var r = await api('/api/world/tb/start', { method: 'POST', body: q });
  if (!r.ok || !r.json || !r.json.ok) {
    if (typeof toastLog === 'function') toastLog('bad', '⚔️ ' + tbErrText(r.json && r.json.err));
    return false;
  }
  window._tbBattle = r.json.battle;
  window._tbAppliedFor = null;
  tbOpenPanel();
  return true;
};
window.tbNoteMyTb = function (mt) {
  if (!mt || !mt.id) return;
  if (window._tbBattle && window._tbBattle.id === mt.id) return;
  if (window._tbAppliedFor === mt.id) return;
  var inLocal = false;
  try { inLocal = (typeof pk !== 'undefined' && !!pk) || !!window.pk; } catch (_) { inLocal = !!window.pk; }
  if (inLocal) { window._tbPendingId = mt.id; return; } // 正在单人战斗：先不抢界面，战后自动接入
  tbJoinPanel();
};
async function tbJoinPanel() {
  var r = await api('/api/world/tb/state');
  if (r.ok && r.json && r.json.battle) {
    window._tbBattle = r.json.battle;
    window._tbPendingId = null;
    tbOpenPanel();
    if (window._tbBattle.phase === 'over') tbApplyResult(window._tbBattle);
  }
}
setInterval(function () { // 单人战斗结束后的组队战接入（3 秒探一次待接入标记）
  try {
    if (!window._tbPendingId) return;
    var inLocal = false;
    try { inLocal = (typeof pk !== 'undefined' && !!pk) || !!window.pk; } catch (_) { inLocal = !!window.pk; }
    if (!inLocal && loggedIn()) tbJoinPanel();
  } catch (_) {}
}, 3000);
function tbOpenPanel() {
  var el = document.getElementById('tbPanel');
  if (!el) {
    el = document.createElement('div');
    el.id = 'tbPanel';
    el.style.cssText = 'display:none;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,430px);max-height:88vh;overflow-y:auto;background:#141a26;border:1px solid #35507a;border-radius:12px;padding:14px;z-index:9999;color:#dbe6f5;font-size:13px;box-shadow:0 8px 40px rgba(0,0,0,.6)';
    el.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-tb]');
      if (!t) return;
      var v = t.getAttribute('data-tb');
      if (v === 'close') { tbClosePanel(); return; }
      if (v === 'auto') { tbPostAuto(); return; }
      tbPostAct(v);
    });
    document.body.appendChild(el);
  }
  el.style.display = 'block';
  tbRender();
  tbPollStart();
}
function tbClosePanel() {
  var el = document.getElementById('tbPanel');
  if (el) el.style.display = 'none';
  tbPollStop();
  if (window._tbDefeatEnd) { // 组队战战败：走正常冒险战败收尾（与单人 finishAdvBattle 同口径）
    window._tbDefeatEnd = false;
    try {
      if (typeof S !== 'undefined' && S && S.run) {
        var _end = C.advEnd(S, S.dead ? 'dead' : 'defeat');
        if (_end && typeof showAdvEnd === 'function') showAdvEnd({ lines: [], end: _end });
      }
    } catch (_) {}
  }
}
function tbPollStart() {
  tbPollStop();
  window._tbPoll = setInterval(tbPollOnce, 2000);
  window._tbTick = setInterval(function () {
    var b = window._tbBattle;
    if (!b || b.phase === 'over') return;
    var cd = document.getElementById('tbCd');
    if (cd && b.deadline) cd.textContent = Math.max(0, Math.ceil((b.deadline - Date.now()) / 1000));
    if (b.deadline && Date.now() > b.deadline + 1200 && !window._tbBusy) tbPollOnce(); // 到点立刻拉一次，不等 2 秒轮询
  }, 500);
}
function tbPollStop() {
  if (window._tbPoll) { clearInterval(window._tbPoll); window._tbPoll = null; }
  if (window._tbTick) { clearInterval(window._tbTick); window._tbTick = null; }
}
async function tbPollOnce() {
  if (!window._tbBattle) return;
  var r = await api('/api/world/tb/state');
  if (!r.ok || !r.json) return;
  if (!r.json.battle) { window._tbBattle = null; tbClosePanel(); return; }
  window._tbBattle = r.json.battle;
  if (window._tbBattle.phase === 'over') { tbApplyResult(window._tbBattle); tbPollStop(); }
  if (!window._tbBusy) tbRender();
}
async function tbPostAct(act) {
  if (window._tbBusy) return;
  window._tbBusy = true;
  try {
    var r = await api('/api/world/tb/act', { method: 'POST', body: { action: act } });
    if (r.ok && r.json && r.json.battle) { window._tbBattle = r.json.battle; if (window._tbBattle.phase === 'over') { tbApplyResult(window._tbBattle); tbPollStop(); } }
    else if (r.json && r.json.err && typeof toastLog === 'function') toastLog('bad', '⚔️ ' + tbErrText(r.json.err));
  } catch (_) {}
  window._tbBusy = false;
  tbRender();
}
async function tbPostAuto() {
  var b = window._tbBattle;
  if (!b || !b.me) return;
  var r = await api('/api/world/tb/auto', { method: 'POST', body: { on: !b.me.auto } });
  if (r.ok && r.json && r.json.battle) { window._tbBattle = r.json.battle; tbRender(); }
}
function tbBar(v, max, color) {
  var pct = max > 0 ? Math.max(0, Math.min(100, Math.round(v / max * 100))) : 0;
  return '<div style="background:#232c3d;border-radius:4px;height:8px;overflow:hidden;flex:1"><div style="width:' + pct + '%;height:100%;background:' + color + '"></div></div>';
}
function tbRender() {
  var el = document.getElementById('tbPanel');
  var b = window._tbBattle;
  if (!el || !b) return;
  var myU = (b.units || []).find(function (u) { return u.isMe; }) || {};
  var over = b.phase === 'over';
  var rankName = '';
  try { rankName = (typeof RANKS !== 'undefined' && RANKS[b.mon.rank]) ? RANKS[b.mon.rank].name : ''; } catch (_) {}
  var h = '<div style="display:flex;align-items:center;gap:8px"><b style="font-size:15px">⚔️ 联机组队战</b>'
    + '<span style="color:var(--dim,#8fa3bf);font-size:12px">第 ' + b.round + ' 回合</span>'
    + (over ? '<span style="color:#ffd76a">已结束</span>' : '<span style="color:#8fa3bf;font-size:12px">⏳ <span id="tbCd">' + (b.deadline ? Math.max(0, Math.ceil((b.deadline - Date.now()) / 1000)) : 30) + '</span> 秒</span>')
    + '<button class="btn" data-tb="close" style="margin-left:auto;padding:2px 10px">✕</button></div>';
  h += '<div style="margin-top:10px;padding:8px;background:#1a2233;border-radius:8px"><div style="display:flex;gap:6px;align-items:center"><b style="color:#ff9d7a">' + escH(b.mon.name) + '</b>' + (rankName ? '<span style="font-size:11px;color:#c9a959">【' + escH(rankName) + '】</span>' : '') + (b.mon.alive ? '' : '<span style="color:#7ee787">已击杀</span>') + '</div>'
    + '<div style="display:flex;gap:6px;align-items:center;margin-top:4px">' + tbBar(b.mon.hp, b.mon.maxHp, '#e5534b') + '<span style="font-size:11px">' + b.mon.hp + '/' + b.mon.maxHp + '</span></div></div>';
  h += '<div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">';
  (b.units || []).forEach(function (u) {
    var badges = '';
    if (u.isMe) badges += ' <span style="color:#7ec8ff">（你）</span>';
    if (u.meditating) badges += ' <span style="color:#c9a959">🧘闭关托管</span>';
    else if (u.hosted && !u.auto) badges += ' <span style="color:#8fa3bf">💤托管</span>';
    if (u.auto) badges += ' <span style="color:#7ee787">🤖自动</span>';
    if (!u.alive) badges += ' <span style="color:#e5534b">倒下</span>';
    if (!over && u.alive && u.acted) badges += ' <span style="color:#8fa3bf">✔已出招</span>';
    h += '<div style="padding:6px 8px;background:#1a2233;border-radius:8px"><div style="display:flex;gap:6px;align-items:center"><b>' + escH(u.username) + '</b>' + badges + '</div>'
      + '<div style="display:flex;gap:6px;align-items:center;margin-top:3px">' + tbBar(u.hp, u.maxHp, '#3fb950') + '<span style="font-size:11px">' + u.hp + '/' + u.maxHp + '</span></div>'
      + '<div style="display:flex;gap:6px;align-items:center;margin-top:2px">' + tbBar(u.mp, u.maxMp, '#58a6ff') + '<span style="font-size:11px">法力 ' + u.mp + '/' + u.maxMp + '</span></div>'
      + (u.pets || []).map(function (p) { return '<div style="font-size:11px;color:#a8bdd6;margin-top:2px">🐾 ' + escH(p.name) + ' ' + Math.max(0, p.hp) + '/' + p.maxHp + (p.alive ? '' : '（倒下）') + '</div>'; }).join('')
      + '</div>';
  });
  h += '</div>';
  if (over && b.result) {
    var r = b.result;
    var parts = [];
    if (r.winner === 'players') {
      parts.push('🏆 胜利！金元 <b class="y">+' + (r.gold | 0) + '</b>');
      var g = Object.keys(r.gains || {}).map(function (a) { return a + '+' + r.gains[a]; }).join(' ');
      if (g) parts.push('属性 ' + g);
      if (r.drops && r.drops.length) {
        if (b.initiator === myU.accountId) { try { parts.push('掉落：' + r.drops.map(function (d) { return d.skip ? '装备（本地生成）' : lootLabel(d.st, d.k) + '×' + d.n; }).join('、')); } catch (_) { parts.push('掉落已入包'); } }
        else parts.push('掉落归发起者');
      }
      if (r.sha) parts.push('👹 煞气 ×1');
      if (r.wxFrag) parts.push('五行残物 ×1');
    } else if (r.winner === 'monster') {
      if (r.defeat && r.defeat.protected) parts.push('💀 战败：🛡️新人保护免除惩罚，经验 +' + (r.defeat.xp | 0));
      else if (r.defeat) parts.push('💀 战败：金元 -' + (r.defeat.lostGold | 0) + '、体力清零、寿元 -1，经验 +' + (r.defeat.xp | 0));
      else parts.push('💀 战败');
    } else parts.push('同归于尽');
    h += '<div style="margin-top:10px;padding:8px;background:#22331f;border-radius:8px">' + parts.join('<br>') + '</div>';
  } else if (!over) {
    if (!myU.alive) h += '<div style="margin-top:10px;color:#e5534b">你已倒下，等待战斗结束…</div>';
    else if (b.me && b.me.hosted && !b.me.auto) h += '<div style="margin-top:10px;color:#c9a959">托管中（按你的战斗预设出招）</div>';
    else if (b.me && b.me.acted) h += '<div style="margin-top:10px;color:#8fa3bf">已出招，等待队友…</div>';
    else {
      var skBtns = '';
      try {
        var mySkills = (typeof S !== 'undefined' && S && Array.isArray(S.skills)) ? S.skills : [];
        mySkills.forEach(function (k) {
          var sk = (typeof SKILLS !== 'undefined' && SKILLS[k]) ? SKILLS[k] : null;
          if (!sk || sk.passive) return;
          var dis = (myU.mp || 0) < sk.mp ? ' disabled' : '';
          skBtns += '<button class="btn" data-tb="' + k + '"' + dis + '>' + escH(sk.name) + '<small> ' + sk.mp + '法力</small></button>';
        });
      } catch (_) {}
      h += '<div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px">'
        + '<button class="btn gold" data-tb="attack">⚔️ 普通攻击</button>'
        + '<button class="btn" data-tb="defend">🛡️ 防御</button>'
        + skBtns
        + '<button class="btn' + (b.me && b.me.auto ? ' gold' : '') + '" data-tb="auto" style="grid-column:1/-1">🤖 自动 ' + (b.me && b.me.auto ? '开（按预设出招）' : '关') + '</button>'
        + '</div>';
    }
  }
  h += '<div id="tbLog" style="margin-top:10px;max-height:180px;overflow-y:auto;font-size:11px;line-height:1.7;color:#a8bdd6;border-top:1px solid #2a364d;padding-top:6px">'
    + (b.log || []).map(function (l) { return '<div>' + escH(l && typeof l === 'object' ? (l.text || '') : l) + '</div>'; }).join('') + '</div>';
  el.innerHTML = h;
  var lg = document.getElementById('tbLog');
  if (lg) lg.scrollTop = lg.scrollHeight;
}
function tbApplyResult(b) { // 结算应用（只应用一次）：服务端已写 D1，这里镜像到本地存档并对齐 rev（与 adv_loot 同口径）
  if (!b || !b.result || window._tbAppliedFor === b.id) return;
  window._tbAppliedFor = b.id;
  var r = b.result;
  try {
    if (typeof MHXY !== 'undefined' && MHXY.setBaseRev && r.rev) MHXY.setBaseRev(r.rev);
    if (typeof S === 'undefined' || !S) return;
    if (r.winner === 'players') {
      S.gold = (S.gold | 0) + (r.gold | 0);
      for (var a in (r.gains || {})) S.attrs[a] = (S.attrs[a] | 0) + r.gains[a];
      (r.drops || []).forEach(function (d) {
        if (d.skip) { // 装备走本地 roll（镜像 adv_loot 客户端口径）
          try {
            var tIdx = Object.keys(DIFFS).indexOf(b.dk);
            var gr = rollGear(S, tIdx + ((b.mon.rank | 0) >= 3 ? 1 : 0));
            if (gr) { if (S.gearBag.length < bagCap(S)) S.gearBag.push(gr); else S.gold += gearPrice(gr); }
          } catch (_) {}
        } else if (d.st === 'petEggs') S.petEggs = (S.petEggs | 0) + d.n;
        else if (d.st === 'maiPages') S.maiPages = (S.maiPages | 0) + d.n;
        else { S[d.st] = S[d.st] || {}; S[d.st][d.k] = (S[d.st][d.k] | 0) + d.n; }
      });
      if (r.sha) { S.inv = S.inv || {}; S.inv.sha = (S.inv.sha | 0) + 1; }
      if (r.wxFrag) { S.wxFrag = S.wxFrag || {}; S.wxFrag[r.wxFrag] = (S.wxFrag[r.wxFrag] | 0) + 1; }
      if (S.run && b.initiator === myAid()) { S.run.rew = S.run.rew || { wins: 0 }; S.run.rew.wins = (S.run.rew.wins | 0) + 1; }
      if (typeof toastLog === 'function') toastLog('good', '🏆 组队战胜利，奖励已到账');
    } else if (r.winner === 'monster' && r.defeat) {
      var df = r.defeat;
      if (df.protected) { S.protect = Math.max(0, (S.protect | 0) - 1); }
      else {
        for (var a2 in (df.lost || {})) { S.attrs[a2] = (S.attrs[a2] | 0) - df.lost[a2]; if (a2 === 'vit' && S.vitPeak) S.vitPeak = Math.max(0, S.vitPeak - df.lost[a2]); }
        S.gold = Math.max(0, (S.gold | 0) - (df.lostGold | 0));
        S.stamina = 0;
        S.lifespan = Math.max(0, (S.lifespan | 0) - 1);
        if (df.statusAdded) { S.status = S.status || {}; if (df.statusAdded === 'depress') S.status.depress = 12; else S.status[df.statusAdded] = true; }
      }
      S.xp = (S.xp | 0) + (df.xp | 0);
      if (S.run) { S.run.defeat = true; window._tbDefeatEnd = true; }
      if (typeof toastLog === 'function') toastLog('bad', '💀 组队战战败');
    }
    if (r.post) {
      S.hpCur = r.post.hpCur;
      if ((S.realm | 0) >= 1) S.mana = r.post.mana;
    }
    save();
    if (typeof commit === 'function') commit();
    if (typeof render === 'function') render();
  } catch (_) {}
}

// v1051 组队：队员位置跟随轮询（3秒）——服务端已同步全队位置，队员拉取自己的更新本地
// v1188 升级：旧版只有本页开过组队面板（_myTeam 已赋值）才跟随，进队后不打开面板就永远不同步（实测 60 秒不动、整页刷新才好）；
// 改为先自举对账队伍状态（未查过立刻查、之后每 15 秒对一次），被移出队伍也会自己收敛并留一行日志，不再全程静默。
setInterval(function(){
  try {
    if (typeof loggedIn !== 'function' || !loggedIn()) return;
    window._teamTick = (window._teamTick || 0) + 1;
    if (typeof window._myTeam === 'undefined' || window._teamTick % 5 === 0) {
      api('/api/world/team/state').then(function(r){
        if (!r.ok || !r.json || !r.json.ok) return;
        var had = window._myTeam || null;
        var now = r.json.team || null;
        var gotNotice = false;
        if (r.json.notices && r.json.notices.length) { gotNotice = true; r.json.notices.forEach(function(n){ try { glog('sys', n.text); } catch(_){} }); }
        window._myTeam = now;
        try { window._isTeamLeader = now ? (now.leaderId === myAid()) : false; } catch(_){ window._isTeamLeader = false; }
        if (had && !now && !gotNotice) { try { glog('sys', '👥 你已不在队伍中'); } catch(_){} }
        if (document.getElementById('mhxyTeamInfo') && typeof window.teamRefresh === 'function') { try { window.teamRefresh(); } catch(_){} }
      }).catch(function(){});
    }
    if (!window._myTeam || window._isTeamLeader) return;
    api('/api/world/state').then(function(r){
      if (!r.ok || !r.json) return;
      var ps = r.json.players || [];
      var me = (typeof myAid === 'function') ? myAid() : '';
      if (!me) return;
      for (var i = 0; i < ps.length; i++){
        if (ps[i] && ps[i].accountId === me){
          var sx = ps[i].x, sy = ps[i].y;
          if (sx != null && sy != null && typeof S !== 'undefined' && S && S.worldMap && (S.worldMap.px !== sx || S.worldMap.py !== sy)){
            S.worldMap.px = sx; S.worldMap.py = sy;
            if (typeof save === 'function') save();
            if (typeof renderWorldMap === 'function') renderWorldMap();
            try { glog('sys', '👥 队长带队移动，你已跟随'); } catch(_){}
          }
          break;
        }
      }
    }).catch(function(){});
  } catch(_){}
}, 3000);
window.teamInvite = teamInvite; // v1171 导出：人物卡按钮在封装之外，typeof 够不着封装内函数——组队/切磋按钮一直是死的（Ye 报点不了）
window.teamRefresh = teamRefresh; // v1187 导出：人物卡组队先刷新队伍状态，再决定要不要先建队
window.pkChallenge = pkChallenge;
window.pkAttack = pkAttack; // v1176 补导出攻击（外层 pkAttackPlayer 改调 window.*，v1171 只导出名字、调用方仍用裸名所以一直没通）
async function pkPollResult(cid, n){
  // WS 推送为主，轮询兜底（最多约65秒）
  if (n > 13) return;
  if (M.challenging !== cid) return;
  setTimeout(async function(){
    if (M.challenging !== cid) return;
    var r = await api('/api/pk/result/' + encodeURIComponent(cid));
    if (r.ok && r.json && r.json.ok && r.json.result){
      M.challenging = null;
      pkShowResult(r.json.result, null);
    } else {
      pkPollResult(cid, n + 1);
    }
  }, 5000);
}
function pkWsConnect(){
  if (!loggedIn() || M.pkWs) return;
  var tok = ls(LK.tok); if (!tok) return;
  try{
    var ws = new WebSocket(API.replace(/^http/, 'ws') + '/api/pk/ws?token=' + encodeURIComponent(tok));
    M.pkWs = ws;
    ws.onmessage = function(ev){
      var m = null; try{ m = JSON.parse(ev.data); }catch(_){ return; }
      if (!m) return;
      if (m.type === 'challenge' && m.challenge){
        pkOnChallenge(m.challenge);
      } else if (m.type === 'result' && m.result){
        if (M.challenging){ M.challenging = null; }
        pkShowResult(m.result.public || m.result, null);
      } else if (m.type === 'declined'){
        if (M.challenging === m.challenge_id){ M.challenging = null; glog('sys', '⚔️ 对方拒绝了你的挑战'); }
      } else if (m.type === 'accepted'){
        glog('sys', '⚔️ 对方接受了挑战，服务端正在结算…');
      }
    };
    ws.onclose = function(){ if (M.pkWs === ws) M.pkWs = null; };
    ws.onerror = function(){ try{ ws.close(); }catch(_){} };
  }catch(_){ M.pkWs = null; }
}
function closePkWs(){ if (M.pkWs){ try{ M.pkWs.close(); }catch(_){} M.pkWs = null; } }
function pkOnChallenge(ch){
  var from = ch.challenger || {};
  var msg = ch.spar
    ? '🤝 ' + (from.username || '?') + '[' + (from.playerNo || '?') + '] 邀你比试切磋（不抢不掉不结仇），60秒内有效，是否接受？'
    : '⚔️ ' + (from.username || '?') + '[' + (from.playerNo || '?') + '] 向你发起真人PK！60秒内有效，是否接受？（服务端结算）';
  var ok = false;
  try{ ok = confirm(msg); }catch(_){}
  if (ok) pkAccept(ch.id); else pkDecline(ch.id);
}
async function pkDecline(cid){
  await api('/api/pk/decline', { method:'POST', body:{ challenge_id:cid } });
  glog('sys', '⚔️ 已拒绝挑战');
}
async function pkAccept(cid){
  glog('sys', '⚔️ 已接受挑战，服务端结算中…');
  var r = await api('/api/pk/accept', { method:'POST', body:{ challenge_id:cid } });
  if (r.ok && r.json && r.json.ok){
    if (M.challenging === cid) M.challenging = null;
    pkShowResult(r.json.result, r.json.consequences);
    // 服务端已改 D1 存档 → 本地从云端同步回来，保证一致
    await downloadSave(true);
  } else {
    glog('bad', '⚔️ 结算失败：' + escH((r.json||{}).error || r.status));
  }
}
async function pkRaidVein(){
  glog('sys', '⛰️ 正在匹配灵脉闭关者…');
  var r = await api('/api/pk/raid-vein', { method:'POST', body:{ take_attr:'str' } });
  if (r.ok && r.json && r.json.ok){
    pkShowResult(r.json.result, r.json.consequences);
    await downloadSave(true); // 服务端已改双方存档 → 同步回本地
  } else if (r.json && r.json.error === 'no_target'){
    glog('bad', '⛰️ 暂无可匹配的灵脉闭关者（入关满 1 小时才进池，且要有人正在灵脉闭关）');
  } else {
    glog('bad', '⛰️ 匹配失败：' + escH((r.json||{}).error || r.status));
  }
}

/* ---------- v1159 二期：PK 模式 / 即时攻击 / 通缉令 / 战利品 ---------- */
const PK_MODE_TXT = { duobao: '⚔️ 夺宝', mieko: '💀 灭口' }; // v1181 Ye 令取消和平模式（和平=切磋）
const PK_KIND_TXT = { gold: '金元', sp2: '下品灵石', sp3: '中品灵石', sp4: '上品灵石', sp5: '极品灵石', xy: '仙玉' };
function pkPoolText(pool){
  if (!pool) return '无';
  var parts = [];
  ['gold', 'sp2', 'sp3', 'sp4', 'sp5', 'xy'].forEach(function(k){ if ((pool[k] | 0) > 0) parts.push(PK_KIND_TXT[k] + ' ' + pool[k]); });
  return parts.length ? parts.join(' · ') : '空池';
}
async function pkFetchMe(){
  var r = await api('/api/pk2/me');
  if (r.ok && r.json && r.json.ok){ window._pkMe = r.json; window._pkMode = r.json.mode; return r.json; }
  return null;
}
async function pkModeRefresh(){
  var box = document.getElementById('pkModeBox'); if (!box) return;
  var me = await pkFetchMe();
  if (!me){ box.innerHTML = '<div class="hint">模式加载失败（网络不通）</div>'; return; }
  var modes = ['duobao', 'mieko'].map(function(m){
    return '<button class="btn' + (me.mode === m ? ' gold' : '') + '" style="flex:1" data-mhxymode="' + m + '">' + PK_MODE_TXT[m] + '</button>';
  }).join('');
  var h = '<div class="row" style="display:flex;gap:8px">' + modes + '</div>'
    + '<div class="hint">我的编码：<b class="y">' + escH(me.code || '?') + '</b> · 生死局 ' + ((me.stats && me.stats.dmLife) | 0) + '/' + ((me.stats && me.stats.dmTotal) | 0) + '（本世/累计） · 通缉击杀 ' + ((me.stats && me.stats.bkLife) | 0) + '/' + ((me.stats && me.stats.bkTotal) | 0)
    + '<br>夺宝胜方抢属性+物品 1 件；灭口同夺宝，野外战死直接轮回。友好比试用「切磋」，不抢不掉不结仇。</div>';
  if (me.myBounty) h += '<div class="hint" style="color:var(--red,#e55)">📜 你正被通缉中！悬赏池：' + pkPoolText(me.myBounty.pool) + '</div>';
  box.innerHTML = h;
}
async function pkSetMode(m){
  var r = await api('/api/pk2/mode', { method: 'POST', body: { mode: m } });
  if (r.ok && r.json && r.json.ok){
    window._pkMode = m;
    glog('good', '⚔️ 已切换为' + (PK_MODE_TXT[m] || m) + '模式');
  } else {
    var e = (r.json || {}).error;
    glog('bad', '⚔️ 切换失败：' + escH(e || r.status));
  }
  pkModeRefresh();
  if (document.getElementById('bountyBox')) bountyPanel(window._bountyPrefill || '');
}
async function pkAttack(targetId){
  var mode = window._pkMode;
  if (!mode){ var me = await pkFetchMe(); mode = me && me.mode; }
  var dk = null;
  try { if (typeof S !== 'undefined' && S && S.run && S.run.shared) dk = S.run.shared.dk || S.run.dk || null; } catch(_){}
  glog('sys', '⚔️ 正在出击…');
  var r = await api('/api/pk/attack', { method: 'POST', body: { target_account_id: targetId, take_attr: 'str', dk: dk } });
  if (r.ok && r.json && r.json.ok){
    pkShowResult(r.json.result, r.json.consequences);
    await downloadSave(true);
  } else {
    var e = (r.json || {}).error;
    var msg = e === 'target_offline' ? '对方已离线' : e === 'target_dead' ? '对方已死亡' : e === 'realm_protected' ? '境界保护：凡人/练气只能被同境界 PK' : e === 'missing_save' ? '对方尚无云端存档' : escH(e || r.status);
    glog('bad', '⚔️ 攻击失败：' + msg);
  }
}
window.pkAttackPlayer = function(accountId){
  try { if (typeof window.pkAttack === 'function') window.pkAttack(accountId); } catch(e) {}
};
async function pkStealPick(token){
  var r = await api('/api/pk2/steal-options?token=' + encodeURIComponent(token));
  if (!r.ok || !r.json || !r.json.ok){ glog('bad', '🎁 战利品已失效'); return; }
  var opts = r.json.options || [];
  var nameOf = function(bag, kind){
    try {
      if (typeof consignName === 'function') return consignName(bag === 'meds' ? 'med' : bag === 'elixirs' ? 'elixir' : 'inv', kind);
    } catch(_){}
    return kind;
  };
  var h = '<h2>🎁 挑选战利品</h2><div class="hint">胜方夺 1 件（30 分钟内有效）：</div>';
  if (!opts.length) h += '<div class="empty">对方身上没有可夺的物品</div>';
  else h += opts.map(function(o){
    return '<div class="row"><div class="lab">' + escH(nameOf(o.bag, o.kind)) + '<small>持有 ×' + o.n + '</small></div><button class="btn gold sm" data-mhxystealpick="' + escH(token) + ':' + escH(o.bag) + ':' + escH(o.kind) + '">夺取</button></div>';
  }).join('');
  h += '<div class="row"><button class="btn full" data-close>关闭</button></div>';
  openSheet(h);
}
window.pkStealPick = pkStealPick;
async function pkStealDo(token, bag, kind){
  var r = await api('/api/pk2/steal', { method: 'POST', body: { token: token, bag: bag, kind: kind } });
  if (r.ok && r.json && r.json.ok){
    glog('good', '🎁 已夺得 1 件战利品');
    await downloadSave(true);
    try { closeSheet(); } catch(_){}
  } else {
    glog('bad', '🎁 夺取失败：' + escH((r.json || {}).error || r.status));
  }
}
async function bountyPanel(prefill){
  window._bountyPrefill = prefill || '';
  openSheet('<h2>📜 通缉令</h2><div id="bountyBox"><div class="hint">加载中…</div></div><div class="row"><button class="btn full" data-close>关闭</button></div>');
  var me = await pkFetchMe();
  var lr = await api('/api/bounty/list');
  var box = document.getElementById('bountyBox'); if (!box) return;
  var list = (lr.ok && lr.json && lr.json.list) || [];
  var h = '';
  if (me){
    h += '<div class="hint">我的编码：<b class="y">' + escH(me.code || '?') + '</b> · 当前模式：' + (PK_MODE_TXT[me.mode] || me.mode) + '</div>';
    if ((me.suffixAllow | 0) > 0){
      h += '<div class="row"><div class="lab">✏️ 编码改尾<small>通缉结案奖励：可给编码末尾加 ' + (me.suffixAllow | 0) + ' 个字（数字/字母），旧编码立即失效</small></div></div>'
        + '<div class="row" style="display:flex;gap:8px"><input id="bdChars" maxlength="' + (me.suffixAllow | 0) + '" placeholder="如 X 或 7" style="flex:1;padding:8px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff"><button class="btn gold" data-mhxycodeappend>改尾</button></div>';
    }
    if (me.myBounty) h += '<div class="hint" style="color:var(--red,#e55)">📜 你正被通缉中！悬赏池：' + pkPoolText(me.myBounty.pool) + '</div>';
    if (me.rights && me.rights.length) h += '<div class="hint">你持有发布权（被灭口战死的仇家）：' + me.rights.map(escH).join('、') + '</div>';
  }
  h += '<h3>发布 / 追加悬赏</h3>'
    + '<div class="row" style="display:flex;gap:8px"><input id="bdCode" placeholder="目标编码" value="' + escH(window._bountyPrefill || '') + '" style="flex:1;padding:8px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;min-width:0">'
    + '<select id="bdKind" style="padding:8px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff"><option value="gold">金元</option><option value="sp2">下品灵石</option><option value="sp3">中品灵石</option><option value="sp4">上品灵石</option><option value="sp5">极品灵石</option><option value="xy">仙玉</option></select>'
    + '<input id="bdAmt" type="number" min="1" placeholder="数量" style="width:76px;padding:8px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff"></div>'
    + '<div class="row"><button class="btn gold full" data-mhxybountypost>📜 发布 / 追加</button></div>'
    + '<div class="hint">首发须有发布权（被灭口或猎杀战死后，凶手编码会随死亡邮件送达）；任何人都能往已有悬赏池加钱。通缉无时限，直到目标被击杀结案。</div>'
    + '<h3>通缉中</h3>';
  if (!list.length) h += '<div class="empty">暂无通缉令</div>';
  else h += list.map(function(b){
    var act = '';
    if (b.isMe) act = '<small>这是你</small>';
    else if (b.hunting) act = '<button class="btn sm" data-mhxyhunt="' + escH(b.code) + ':0">取消猎杀</button><button class="btn gold sm" data-mhxypkatk="' + escH(b.targetId) + '">猎杀</button>';
    else act = '<button class="btn gold sm" data-mhxyhunt="' + escH(b.code) + ':1">领猎</button>';
    return '<div class="row"><div class="lab">📜 ' + escH(b.targetName || '?') + '<small>编码 ' + escH(b.code) + ' · ' + ((['凡人','练气','筑基','金丹','元婴','化神','大乘','渡劫','仙人','金仙','合体','尊者','主宰'][b.realm|0]) || '') + ' Lv.' + (b.level|0) + ' · 悬赏池：' + pkPoolText(b.pool) + '</small></div>' + act + '</div>';
  }).join('');
  box.innerHTML = h;
}
window.openBountyPanel = bountyPanel;
window.pkMailBounty = function(code){ bountyPanel(code || ''); };
async function bountyPost(){
  var code = (val('bdCode') || '').trim();
  var kind = val('bdKind') || 'gold';
  var amt = parseInt(val('bdAmt') || '0', 10) || 0;
  if (!code){ glog('bad', '📜 请填目标编码'); return; }
  if (!(amt >= 1)){ glog('bad', '📜 请填悬赏数量'); return; }
  var r = await api('/api/bounty/post', { method: 'POST', body: { code: code, kind: kind, amount: amt } });
  if (r.ok && r.json && r.json.ok){
    glog('good', '📜 悬赏已挂上，池内：' + pkPoolText(r.json.pool));
    await downloadSave(true);
    bountyPanel(code);
  } else {
    var e = (r.json || {}).error;
    var msg = e === 'bad_code' ? '编码不存在（可能已改尾）' : e === 'no_right' ? '你没有对此编码的发布权（须先被其灭口战死）' : e === 'insufficient' ? '余额不足' : e === 'cannot_bounty_self' ? '不能通缉自己' : escH(e || r.status);
    glog('bad', '📜 发布失败：' + msg);
  }
}
async function bountyHunt(code, on){
  var r = await api('/api/bounty/hunt', { method: 'POST', body: { code: code, on: !!on } });
  if (r.ok && r.json && r.json.ok){
    glog(on ? 'good' : 'sys', on ? '📜 已领猎：遇到被通缉者即可开打（生死局，无视主城）' : '📜 已取消猎杀');
  } else {
    glog('bad', '📜 操作失败：' + escH((r.json || {}).error || r.status));
  }
  bountyPanel(window._bountyPrefill || '');
}
async function bountyAppend(){
  var chars = (val('bdChars') || '').trim();
  if (!/^[0-9A-Za-z]{1,2}$/.test(chars)){ glog('bad', '✏️ 只能加 1-2 个数字/字母'); return; }
  var r = await api('/api/bounty/append-code', { method: 'POST', body: { chars: chars } });
  if (r.ok && r.json && r.json.ok){
    glog('good', '✏️ 你的新编码：' + r.json.code + '（旧编码已失效）');
    bountyPanel('');
  } else {
    var e = (r.json || {}).error;
    glog('bad', '✏️ 改尾失败：' + (e === 'no_allowance' ? '改尾额度不足（须通缉结案后获得）' : escH(e || r.status)));
  }
}

function pkShowResult(res, cons){
  if (!res) return;
  var me = myAid();
  var iWon = (res.winner === 'A' && res.challenger && res.challenger.accountId === me)
          || (res.winner === 'B' && res.challenged && res.challenged.accountId === me);
  // winner 字段是 'A'（挑战者）/'B'（被挑战者）；若结构不同，兜底按 accountId 判断
  if (res.winner_account_id) iWon = (res.winner_account_id === me);
  var wName = res.winner === 'A' ? ((res.challenger||{}).username) : ((res.challenged||{}).username);
  var html = '<h2>⚔️ 真人PK结算</h2>'
    + '<div class="e ' + (iWon ? 'good' : 'bad') + '">' + (res.draw ? '双方同归于尽！' : (iWon ? '🎉 你赢了！' : '你输了，对方是 <b class="y">' + escH(wName || '?') + '</b>')) + '</div>'
    + '<div class="hint">回合数：' + (res.rounds || '?') + '　剩余生命：' + escH(JSON.stringify(res.hpLeft || {})) + '</div>';
  if (cons){
    var cs = [];
    if (cons.spar) cs.push('🤝 切磋：不抢不掉不结仇');
    if (cons.meritLost) cs.push('功德 -' + cons.meritLost);
    if (cons.attrTake) cs.push('夺取 ' + escH(cons.attrTake.attr) + ' +' + cons.attrTake.n);
    if (cons.revengeGranted) cs.push('对方获得对你的复仇');
    if (cons.arena) cs.push('擂台：无复仇无功德惩罚');
    if (cons.lethal) cs.push('☠️ 生死局');
    if (cons.death) cs.push(cons.death.victim === me ? '☠️ 你已坠入轮回（同步存档后生效）' : '☠️ 对方已坠入轮回');
    if (cons.bountyClaimed) cs.push('📜 领得悬赏：' + pkPoolText(cons.bountyClaimed));
    if (cons.codeRevealed) cs.push('对方编码：' + escH(cons.codeRevealed));
    if (cs.length) html += '<div class="hint">结算：' + cs.join('、') + '</div>';
    if (cons.stealToken) html += '<div class="row"><button class="btn gold full" data-mhxysteal="' + escH(cons.stealToken) + '">🎁 挑选战利品（胜方夺 1 件）</button></div>';
  }
  var logHtml = '';
  try{
    var lg = res.log || [];
    logHtml = '<details><summary>战斗日志（' + lg.length + '条）</summary><div style="max-height:240px;overflow-y:auto;font-size:12px">' + lg.slice(0, 200).map(function(l){ return '<div>' + escH(typeof l === 'string' ? l : JSON.stringify(l)) + '</div>'; }).join('') + '</div></details>';
  }catch(_){}
  html += logHtml + '<div class="row"><button class="btn full" data-close>关闭</button></div>';
  try{ openSheet(html); }catch(_){}
  glog(iWon ? 'good' : 'bad', '⚔️ 真人PK' + (res.draw ? '平局' : (iWon ? '胜利' : '战败')) + '（' + (res.rounds || '?') + '回合，服务端结算）');
}

/* ---------- 点击分发 ---------- */
function onClick(d, t, e){
  if (!d) return false;
  if ('mhxy' in d){ panel(); return true; }
  if ('mhxyguest' in d){ doGuest(); return true; }
  if ('mhxylogin' in d){ doLogin(); return true; }
  if ('mhxyreg' in d){ doRegister(); return true; }
  if ('mhxyrecover' in d){ doRecover(); return true; }
  if ('mhxyupgrade' in d){ doUpgrade(); return true; }
  if ('mhxylogout' in d){ doLogout(); return true; }
  if ('mhxysync' in d){ syncNow(true); return true; }
  if ('mhxydown' in d){ downloadSave(false).then(function(){ panel(); }); return true; }
  if ('mhxygm' in d){ gmPanel(); return true; }
  if ('mhxydungeon' in d){ window.sheetDungeonList(); return true; }
  if ('mhxyencsub' in d){ window.sheetEncSubmit(); return true; }
  if ('mhxywenxin' in d){ window.sheetWenxinSubmit(); return true; }
  if ('mhxygmcrev' in d){ gmCreatorPanel(); return true; }
  if ('mhxygmrev' in d){
    const _p = String(d.mhxygmrev).split(':'); const _kind = _p[0], _id = _p[1], _ok = _p[2] === '1';
    MHXY.api('/api/creator/' + (['dungeon', 'encounter', 'wenxin'].indexOf(_kind) >= 0 ? _kind : 'encounter') + '/review', { method: 'POST', body: { id: _id, approve: _ok } }).then(function(r) {
      toastLog('sys', r.ok && r.json && r.json.ok ? '已处理' : '处理失败：' + ((r.json && r.json.error) || '网络不通')); gmCreatorPanel();
    });
    return true;
  }
  if ('mhxygmset' in d){ gmDoSet(); return true; }
  if ('mhxygmgive' in d){ gmDoGive(); return true; }
  if ('mhxygmgivebyname' in d){ gmDoGiveByName(); return true; }
  if ('mhxygmxverify' in d){
    var _u = val('gmXUser');
    var _msg = document.getElementById('gmMsg');
    if (!_u){ if (_msg) _msg.textContent = '请输入用户名'; return true; }
    api('/api/gm/x_verify', { method:'POST', body:{ username:_u } }).then(function(r){
      if (_msg) {
        if (r.ok && r.json && r.json.ok) _msg.textContent = '✅ 已验证 ' + _u + ' 的 X 号';
        else _msg.textContent = '❌ 失败：' + ((r.json||{}).error || r.status);
      }
    });
    return true;
  }
  if ('mhxyxhide' in d){ var _cur = ''; try { _cur = localStorage.getItem('mhxy_xhide') || ''; } catch(_) {} var _to = _cur === '1' ? 0 : 1; api('/api/profile/x_hide', { method:'POST', body:{ x_hide: _to } }).then(function(r){ if (r.ok && r.json && r.json.ok){ try { localStorage.setItem('mhxy_xhide', _to ? '1' : '0'); } catch(_) {} var _hr = document.getElementById('mhxyXHideRow'); if (_hr) _hr.innerHTML = xHideRowHtml(); glog('good', _to ? '🌐 X 账号已隐藏（聊天中只显示 ✓）' : '🌐 X 账号已改为公开显示'); } else { glog('bad', '🌐 X 显示设置失败：' + ((r.json && r.json.error) || ('HTTP ' + r.status))); } }).catch(function(){ glog('bad', '🌐 X 显示设置失败：网络异常'); }); return true; } // v1010
  if ('mhxyxrebind' in d){ var _xr = document.getElementById('mhxyXRow'); if (_xr) _xr.innerHTML = xRowInputHtml(); return true; }
  if ('mhxyxset' in d){
    var _xh = val('mhxyXSet');
    if (!_xh){ glog('bad', '🌐 请填写 X 用户名'); return true; }
    api('/api/profile/x_handle', { method:'POST', body:{ x_handle:_xh } }).then(function(r){
      if (r.ok && r.json && r.json.ok) {
        glog('good', '🌐 已绑定 X：@' + escH(r.json.x_handle));
        try { localStorage.setItem('mhxy_xh', r.json.x_handle || _xh); var _xr2 = document.getElementById('mhxyXRow'); if (_xr2) _xr2.innerHTML = xRowHtml(); } catch(_) {}
        // 显示验证码（点黄色字复制）
        var code = r.json.verify_code;
        if (code) {
          var row = document.getElementById('mhxyXVerifyRow');
          var span = document.getElementById('mhxyXCode');
          if (row && span) {
            span.innerHTML = '发一条推文包含 <b class="y" id="mhxyXCodeText" data-mhxyxcopy style="cursor:pointer;text-decoration:underline" title="点我复制">' + escH(code) + '</b>（至少附 2 张游戏截图），把推文链接粘贴到下面点验证';
            row.style.display = 'flex';
          }
        }
      }
      else { var _xe = (r.json||{}).error; glog('bad', '🌐 绑定失败' + (_xe === 'x_taken' ? '（该 X 已被其他账号绑定，换一个）' : _xe === 'already_bound' ? '（已绑定，不可换绑）' : '：' + escH(_xe || r.status))); }
    });
    return true;
  }
  if ('mhxyxcopy' in d){
    var _ct = document.getElementById('mhxyXCodeText');
    if (_ct) {
      var _txt = _ct.textContent;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(_txt).then(function(){ glog('good', '🌐 已复制验证码'); });
        } else {
          var _ta = document.createElement('textarea');
          _ta.value = _txt; document.body.appendChild(_ta); _ta.select();
          document.execCommand('copy'); document.body.removeChild(_ta);
          glog('good', '🌐 已复制验证码');
        }
      } catch(_) { glog('bad', '🌐 复制失败，请手动复制'); }
    }
    return true;
  }
  if ('mhxyxverify' in d){
    var _url = val('mhxyTweetUrl');
    if (!_url){ glog('bad', '🌐 请粘贴推文链接'); return true; }
    glog('sys', '🌐 正在验证…');
    api('/api/profile/x_verify', { method:'POST', body:{ tweet_url:_url } }).then(function(r){
      if (r.ok && r.json && r.json.ok) {
        if (r.json.verified) {
          glog('good', '🌐 X 验证通过 ✅');
          try { localStorage.setItem('mhxy_xv', '1'); } catch(_) {}
        }
        else glog('bad', '🌐 ' + escH(r.json.hint || '验证失败'));
      } else {
        var _e = (r.json||{}).error;
        var _msg = _e === 'no_tweet_url' ? '请粘贴推文链接' : _e === 'bad_tweet_url' ? '推文链接格式不对' : _e === 'author_mismatch' ? '推文作者与绑定的 X 号不一致' : escH(_e || r.status);
        glog('bad', '🌐 验证失败：' + _msg);
      }
    });
    return true;
  }
  if ('mhxychat' in d){ chatPanel(); return true; }
  if ('mhxychatsend' in d){ chatSend(); return true; }
  if ('mhxypk' in d){ pkPanel(); return true; }
  if ('mhxypkrefresh' in d){ pkRefresh(); return true; }
  if ('mhxyraid' in d){ pkRaidVein(); return true; }
  if (d.mhxypkgo){ pkChallenge(d.mhxypkgo); return true; }
  if (d.mhxypkatk){ pkAttack(d.mhxypkatk); return true; }
  if (d.mhxymode){ pkSetMode(d.mhxymode); return true; }
  if ('mhxybounty' in d){ bountyPanel(); return true; }
  if (d.mhxyhunt){ var _hp = String(d.mhxyhunt).split(':'); bountyHunt(_hp[0], _hp[1] === '1'); return true; }
  if ('mhxybountypost' in d){ bountyPost(); return true; }
  if ('mhxycodeappend' in d){ bountyAppend(); return true; }
  if (d.mhxysteal){ pkStealPick(d.mhxysteal); return true; }
  if (d.mhxystealpick){ var _sp = String(d.mhxystealpick).split(':'); pkStealDo(_sp[0], _sp[1], _sp[2]); return true; }
  if ('mhxyteam' in d){ window.teamPanel(); return true; }
  if ('mhxyteamcreate' in d){ teamCreate(); return true; }
  if ('mhxyteamleave' in d){ teamLeave(); return true; }
  if ('mhxyteamdisband' in d){ teamDisband(); return true; }
  if ('mhxyteamrefresh' in d){ teamRefresh(); return true; }
  if (d.mhxyteaminvite){ teamInvite(d.mhxyteaminvite); return true; }
  if (d.mhxyteamaccept){ teamAccept(d.mhxyteamaccept); return true; }
  if (d.mhxyteamdecline){ teamDecline(d.mhxyteamdecline); return true; }
  if (d.mhxyteamkick){ teamKick(d.mhxyteamkick); return true; }
  if (d.mhxyteampetadd){ teamPetAdd(d.mhxyteampetadd, d.petname || '灵宠'); return true; }
  if (d.mhxyteampetremove){ teamPetRemove(d.mhxyteampetremove); return true; }
  if ('close' in d && M.chatOpen){ closeChatWs(); }
  return false;
}

/* ---------- 启动 ---------- */
function init(){
  // 已有 token → 恢复在线状态（静默，失败就当没登录）
  if (loggedIn()){
    var _healed = false;
    try { _healed = separateOnLogin(ls(LK.aid) || '', ls(LK.name) || ''); } catch(_){}
    if (_healed){ setTimeout(function(){ try { location.reload(); } catch(_){} }, 60); }
    M.baseRev = loadBaseRev();
    ensurePresence().then(function(){ pkWsConnect(); });
    // 轻量自检：token 是否还有效
    api('/api/save/meta').then(function(r){
      if (r.status === 401 && r.json && (r.json.error === 'session_replaced' || r.json.error === 'session_expired' || r.json.error === 'unauthorized')){
        // onReplaced 已在 api() 内处理 replaced；expired/unknown 在此清掉
        if (r.json.error !== 'session_replaced'){ clearAuth(false); showLoginGate(); } // v970 token失效弹门禁
      } else if (r.ok && r.json && r.json.ok){ try{ checkCloud(); }catch(_){} } // v1042 自动登录同样对齐账号存档

    });
  } else {
    // v970 登录门禁：未登录先弹登录页，不进游戏
    showLoginGate();
  }
}
// v970 登录门禁
function showLoginGate(){
  if (document.getElementById('loginGate')) return;
  var g = document.createElement('div');
  g.id = 'loginGate';
  g.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#0f0f1a;display:flex;align-items:center;justify-content:center;padding:20px';
  g.innerHTML = '<div style="width:100%;max-width:340px;text-align:center">'
    + '<div style="font-size:42px;margin-bottom:8px">🌙</div>'
    + '<h2 style="color:#e8c468;margin:0 0 6px;font-size:22px">梦回逍遥</h2>'
    + '<div style="color:#888;font-size:13px;margin-bottom:20px">登录后进入游戏（需要联网）</div>'
    + '<button id="gateGuest" style="width:100%;padding:14px;border:none;border-radius:10px;background:linear-gradient(135deg,#e8c468,#c9962e);color:#1a1a2e;font-size:16px;font-weight:bold;margin-bottom:12px;cursor:pointer">一键游客登录</button>'
    + '<div style="display:flex;gap:8px;margin-bottom:8px">'
    + '<input id="gateU" maxlength="16" placeholder="用户名(3-16位)" style="flex:1;padding:10px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:14px;min-width:0">'
    + '<input id="gateP" type="password" maxlength="128" placeholder="密码(≥6位)" style="flex:1;padding:10px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:14px;min-width:0">'
    + '</div>'
    + '<input id="gateX" maxlength="16" placeholder="X 用户名（注册必填，如 @feyelo）" style="width:100%;padding:10px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:14px;margin-bottom:8px;box-sizing:border-box">'
    + '<select id="gateSqQ" style="width:100%;padding:10px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:14px;margin-bottom:8px;box-sizing:border-box"><option value="">选择密保问题（注册必填，找回密码用）</option><option>我母亲的名字是？</option><option>我出生的城市是？</option><option>我的第一只宠物叫什么？</option><option>我最喜欢的一本书是？</option><option>我的小学叫什么名字？</option></select>'
    + '<input id="gateSqA" maxlength="100" placeholder="密保答案（注册必填）" style="width:100%;padding:10px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:14px;margin-bottom:8px;box-sizing:border-box">'
    + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="color:#999;font-size:13px">生日</span><input id="gateBday" type="date" style="flex:1;padding:10px;border-radius:8px;border:1px solid #444;background:#1a1a2e;color:#fff;font-size:14px;min-width:0"></div>'
    + '<div style="display:flex;gap:8px">'
    + '<button id="gateLogin" style="flex:1;padding:10px;border:1px solid #555;border-radius:8px;background:#222;color:#fff;font-size:14px;cursor:pointer">登录</button>'
    + '<button id="gateReg" style="flex:1;padding:10px;border:1px solid #555;border-radius:8px;background:#222;color:#fff;font-size:14px;cursor:pointer">注册</button>'
    + '</div>'
    + '<div id="gateMsg" style="color:#e88;font-size:13px;margin-top:12px;min-height:18px"></div>'
    + '</div>';
  document.body.appendChild(g);
  document.getElementById('gateGuest').onclick = gateDoGuest;
  document.getElementById('gateLogin').onclick = gateDoLogin;
  document.getElementById('gateReg').onclick = gateDoRegister;
}
function hideLoginGate(){
  var g = document.getElementById('loginGate');
  if (g) g.remove();
}
function gateMsg(t){ var m = document.getElementById('gateMsg'); if (m) m.textContent = t; }
async function gateDoGuest(){
  gateMsg('登录中…');
  var r = await api('/api/guest', { method:'POST', noAuth:true, body:{ did: guestDid() } });
  if (r.ok && r.json && r.json.ok){ await gateAfterAuth(r.json); }
  else gateMsg('登录失败' + (r.netErr ? '（网络不通，连上网再试）' : '：' + ((r.json||{}).error || r.status)));
}
async function gateDoLogin(){
  var u = document.getElementById('gateU').value.trim(), p = document.getElementById('gateP').value;
  if (!u || !p){ gateMsg('请填写用户名和密码'); return; }
  gateMsg('登录中…');
  var r = await api('/api/login', { method:'POST', noAuth:true, body:{ username:u, password:p } });
  if (r.ok && r.json && r.json.ok){ await gateAfterAuth(r.json); }
  else gateMsg('登录失败' + (r.netErr ? '（网络不通）' : r.status === 401 ? '（用户名或密码不对）' : '：' + ((r.json||{}).error || r.status)));
}
async function gateDoRegister(){
  var u = document.getElementById('gateU').value.trim(), p = document.getElementById('gateP').value;
  if (!u || !p){ gateMsg('请填写用户名和密码'); return; }
  if (p.length < 6){ gateMsg('密码至少6位'); return; }
  var gx = document.getElementById('gateX').value.trim().replace(/^@/, '');
  if (!gx){ gateMsg('注册必须填写 X 用户名'); return; }
  var gq = document.getElementById('gateSqQ').value, ga = document.getElementById('gateSqA').value.trim();
  if (!gq || !ga){ gateMsg('请选择密保问题并填写答案（找回密码用）'); return; }
  var gb = document.getElementById('gateBday').value;
  if (!gb){ gateMsg('请选择生日'); return; }
  gateMsg('注册中…');
  var r = await api('/api/register', { method:'POST', noAuth:true, body:{ username:u, password:p, x_handle:gx, sq_q:gq, sq_a:ga, birthday:gb } });
  if (r.ok && r.json && r.json.ok){ await gateAfterAuth(r.json); }
  else {
    var ge = (r.json || {}).error || r.status;
    gateMsg('注册失败' + (r.netErr ? '（网络不通）' : ge === 'username_taken' ? '（用户名已被占用）' : ge === 'bad_username' ? '（用户名3-16位，字母/数字/下划线/中文）' : ge === 'bad_password' ? '（密码至少6位）' : ge === 'x_handle_required' ? '（必须填写 X 用户名）' : ge === 'x_taken' ? '（该 X 已被其他账号绑定，换一个）' : ge === 'bad_birthday' ? '（生日不对）' : '：' + ge));
  }
}
async function gateAfterAuth(d){
  saveAuth(d);
  gateMsg('正在同步存档…');
  // v1042 账号为准：云端已有该账号存档时不先上传本地（防覆盖错档），由 afterLogin→checkCloud 自动下载对齐；云端无档才把本地档绑账号上传
  // v1061：meta 请求失败时视为"不确定"，绝不上传（防网络抖动时本地新档覆盖云端）
  var _hasCloud = true, _metaOk = false;
  try{ var _m = await api('/api/save/meta'); _metaOk = !!(_m.ok && _m.json && _m.json.ok); _hasCloud = !(_metaOk && !_m.json.exists); }catch(_){}
  if (_metaOk && !_hasCloud){ try{ await syncNow(true); }catch(_){} }
  hideLoginGate();
  await afterLogin();
}

window.MHXY = {
  panel: panel, markDirty: markDirty, onClick: onClick,
  loggedIn: loggedIn, syncNow: syncNow, init: init, api: api, myName: myName,
  setBaseRev: function(r){ M.baseRev = r; try{ ls(revKey(), String(r)); }catch(_){} } // v960 交易后更新同步基线（v1196：写本账号的 rev 键）
};

try{ init(); }catch(_){}

})();

window.__ok_tail=1;
