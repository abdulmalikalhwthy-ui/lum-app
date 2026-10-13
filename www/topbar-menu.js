(function(){
'use strict';
function injectStyles(){
  if(document.getElementById('topbar-menu-styles'))return;
  var css='<style id="topbar-menu-styles">'+
    '.topbar-actions{display:flex;gap:6px;align-items:center}'+
    '.topbar-actions .tbm-btn{background:rgba(255,255,255,.15);color:#fff;border:none;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;cursor:pointer;padding:0;font-family:inherit}'+
    '.topbar-actions .tbm-btn:active{background:rgba(255,255,255,.3)}'+
    '.tbm-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99998;display:none}'+
    '.tbm-overlay.show{display:block}'+
    '.tbm-menu{position:fixed;bottom:0;left:0;right:0;background:#FFF;border-radius:20px 20px 0 0;padding:16px;z-index:99999;transform:translateY(100%);transition:transform .3s;max-height:80vh;overflow-y:auto;font-family:inherit;direction:rtl}'+
    '.tbm-menu.show{transform:translateY(0)}'+
    '.tbm-menu-title{font-size:17px;font-weight:900;color:#1E2A5A;text-align:center;padding:8px 0 16px;border-bottom:1px solid #E5E7EB;margin-bottom:8px}'+
    '.tbm-item{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:14px;cursor:pointer;font-size:15px;font-weight:600;color:#1A1A1A;margin-bottom:6px;background:#F4F4EC}'+
    '.tbm-item:active{background:#E5E7EB}'+
    '.tbm-icon{font-size:22px;width:32px;text-align:center}'+
    '.tbm-cancel{background:transparent;border:2px solid #E5E7EB;text-align:center;justify-content:center;margin-top:12px}'+
    '</style>';
  document.head.insertAdjacentHTML('beforeend',css);
}
function buildMenu(){
  if(document.getElementById('tbm-overlay'))return;
  var d=document.createElement('div');
  d.className='tbm-overlay';
  d.id='tbm-overlay';
  d.onclick=function(e){if(e.target===d)closeMenu();};
  d.innerHTML='<div class="tbm-menu" id="tbm-menu" onclick="event.stopPropagation()">'+
    '<div class="tbm-menu-title">الإعدادات</div>'+
    '<div class="tbm-item" onclick="window.tbmOpenPassword()"><span class="tbm-icon">🔒</span><span>كلمة المرور</span></div>'+
    '<div class="tbm-item" onclick="window.tbmToggleTheme()"><span class="tbm-icon">🌙</span><span>تبديل الوضع الليلي</span></div>'+
    '<div class="tbm-item" onclick="window.tbmAbout()"><span class="tbm-icon">ℹ️</span><span>حول التطبيق</span></div>'+
    '<div class="tbm-item" onclick="window.tbmExit()"><span class="tbm-icon">🚪</span><span>خروج من التطبيق</span></div>'+
    '<div class="tbm-item tbm-cancel" onclick="window.tbmClose()"><span>إغلاق</span></div>'+
    '</div>';
  document.body.appendChild(d);
}
function openMenu(){var o=document.getElementById('tbm-overlay');var m=document.getElementById('tbm-menu');if(o)o.classList.add('show');if(m)m.classList.add('show');}
function closeMenu(){var o=document.getElementById('tbm-overlay');var m=document.getElementById('tbm-menu');if(o)o.classList.remove('show');if(m)m.classList.remove('show');}
window.tbmOpenPassword=function(){closeMenu();setTimeout(function(){if(typeof window.pwdShow==='function')window.pwdShow();else alert('غير متاح');},300);};
window.tbmToggleTheme=function(){
  var cur=document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';
  var next=cur==='dark'?'light':'dark';
  try{localStorage.setItem('lum_theme_v3',next);}catch(e){}
  if(typeof window.applyTheme==='function')window.applyTheme(next);
  closeMenu();
};
window.tbmAbout=function(){
  closeMenu();
  setTimeout(function(){
    alert('الحركة العامة v4.3.0\n\nاستخراج الحركة العامة للحروف\nوفق منهج عالم سبيط النيلي\n\nإعداد وتطوير:\nعبد الملك علي الحوثي\n\nمؤسسة القائم الحجة\nصنعاء - اليمن\n\n© 2026 جميع الحقوق محفوظة');
  },300);
};
window.tbmExit=function(){
  closeMenu();
  setTimeout(function(){
    if(typeof window.forceExit==='function')window.forceExit();
    else if(navigator.app&&navigator.app.exitApp)navigator.app.exitApp();
  },300);
};
window.tbmClose=closeMenu;
function addButtons(){
  var actions=document.querySelector('.topbar-actions');
  if(!actions)return;
  if(actions.querySelector('.tbm-settings-btn'))return;
  var s=document.createElement('button');
  s.className='tbm-btn tbm-settings-btn';
  s.innerHTML='⚙️';
  s.title='الإعدادات';
  s.onclick=openMenu;
  var x=document.createElement('button');
  x.className='tbm-btn tbm-exit-btn';
  x.innerHTML='🚪';
  x.title='خروج';
  x.onclick=function(){if(typeof window.forceExit==='function')window.forceExit();};
  actions.appendChild(s);
  actions.appendChild(x);
}
function run(){injectStyles();buildMenu();addButtons();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(run,700);});else setTimeout(run,700);
setInterval(addButtons,2000);
console.log('[topbar-menu] OK');
})();
