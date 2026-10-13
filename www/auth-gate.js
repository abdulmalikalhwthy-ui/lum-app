(function(){
'use strict';
var DEFAULT_PASSWORD='313';
var REMEMBER_HOURS=0;
var APP_TITLE='الحركة العامة';
var APP_SUBTITLE='المصوفة الـ28 • استخراج الحركة • منهج سبيط النيلي';
var AUTHOR_NAME='عبد الملك علي الحوثي';
var FOUNDATION='مؤسسة القائم الحجة';
var STORAGE_KEY='auth_ts_v1';
var PASSWORD_KEY='app_password_v1';

window.getAppPassword=function(){try{return localStorage.getItem(PASSWORD_KEY)||DEFAULT_PASSWORD;}catch(e){return DEFAULT_PASSWORD;}};
window.setAppPassword=function(p){try{localStorage.setItem(PASSWORD_KEY,p);return true;}catch(e){return false;}};
window.resetAppPassword=function(){try{localStorage.removeItem(PASSWORD_KEY);return true;}catch(e){return false;}};
window.hasCustomPassword=function(){try{var s=localStorage.getItem(PASSWORD_KEY);return !!s&&s!==DEFAULT_PASSWORD;}catch(e){return false;}};

function isAuthenticated(){
  if(REMEMBER_HOURS<=0)return false;
  try{var ts=parseInt(localStorage.getItem(STORAGE_KEY)||'0',10);if(!ts)return false;return(Date.now()-ts)<REMEMBER_HOURS*3600000;}catch(e){return false;}
}

function buildHTML(){
  var stars='';
  for(var i=0;i<60;i++){
    stars+='<div class="ag-star" style="left:'+(Math.random()*100)+'%;top:'+(Math.random()*60)+'%;animation-delay:'+(Math.random()*3)+'s"></div>';
  }
  return '<style id="ag-css">'+
  '#ag-overlay{position:fixed;inset:0;z-index:999999;background:radial-gradient(ellipse at 50% 20%,#1B2A6B 0%,#0F1A47 40%,#060C2B 70%,#000 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;font-family:"Tajawal","Segoe UI",Tahoma,sans-serif;direction:rtl;transition:opacity .4s;overflow-y:auto}'+
  '.ag-star{position:absolute;width:2px;height:2px;background:#FFF;border-radius:50%;opacity:.5;animation:agTw 3s ease-in-out infinite}'+
  '@keyframes agTw{0%,100%{opacity:.2}50%{opacity:.9}}'+
  '.ag-logo{width:100px;height:100px;border-radius:50%;border:3px solid #C9A961;background:radial-gradient(circle at 50% 40%,#1B2A6B 0%,#0A1440 100%);display:flex;align-items:center;justify-content:center;font-size:56px;color:#FFF;font-family:"Amiri",serif;font-weight:bold;margin-bottom:18px;box-shadow:0 0 40px rgba(201,169,97,.3),inset 0 0 30px rgba(0,0,0,.5);position:relative;z-index:1}'+
  '.ag-logo::after{content:"";position:absolute;inset:-8px;border-radius:50%;border:1px solid rgba(201,169,97,.3);animation:agPulse 2.5s ease-in-out infinite}'+
  '@keyframes agPulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.05);opacity:.9}}'+
  '.ag-title{color:#FFF;font-size:24px;font-weight:900;margin-bottom:8px;text-align:center;position:relative;z-index:1;text-shadow:0 2px 20px rgba(0,0,0,.5)}'+
  '.ag-subtitle{color:rgba(255,255,255,.75);font-size:13px;text-align:center;margin-bottom:22px;position:relative;z-index:1;line-height:1.7;max-width:320px}'+
  '.ag-info-card{background:rgba(255,255,255,.04);border:1.5px solid rgba(201,169,97,.5);border-radius:18px;padding:14px 22px;text-align:center;margin-bottom:20px;position:relative;z-index:1;min-width:240px}'+
  '.ag-info-label{color:#C9A961;font-size:12.5px;font-weight:700;margin-bottom:8px;letter-spacing:1px}'+
  '.ag-author-name{color:#FFD54F;font-size:18px;font-weight:800;line-height:1.5;text-shadow:0 0 12px rgba(255,213,79,.4)}'+
  '.ag-foundation{color:rgba(255,255,255,.9);font-size:14px;font-weight:600;margin-top:6px}'+
  '.ag-input{width:100%;max-width:340px;padding:16px 50px 16px 18px;background:rgba(255,255,255,.95);border:2px solid rgba(201,169,97,.5);border-radius:14px;font-size:17px;text-align:center;letter-spacing:6px;color:#1E2A5A;outline:none;font-family:inherit;font-weight:700;position:relative;z-index:1;box-sizing:border-box;margin-bottom:12px}'+
  '.ag-input:focus{border-color:#FFD54F;box-shadow:0 0 0 4px rgba(255,213,79,.25)}'+
  '.ag-input::placeholder{letter-spacing:1px;color:#999;font-weight:400}'+
  '.ag-input-wrap{position:relative;width:100%;max-width:340px;z-index:1}'+
  '.ag-lock-icon{position:absolute;top:50%;right:16px;transform:translateY(-50%);font-size:20px;pointer-events:none}'+
  '.ag-submit{width:100%;max-width:340px;padding:16px;background:linear-gradient(135deg,#FFB300,#FFC107 50%,#FFD54F);color:#1E2A5A;border:none;border-radius:14px;font-size:16px;font-weight:900;cursor:pointer;font-family:inherit;box-shadow:0 6px 20px rgba(255,179,0,.4);transition:all .2s;position:relative;z-index:1}'+
  '.ag-submit:active{transform:scale(.97)}'+
  '.ag-error{color:#FF5252;font-size:13px;font-weight:700;margin-top:12px;min-height:18px;opacity:0;transition:opacity .3s;text-align:center;position:relative;z-index:1}'+
  '.ag-error.show{opacity:1}'+
  '.ag-footer{color:rgba(255,255,255,.5);font-size:11px;margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1);text-align:center;position:relative;z-index:1;width:100%;max-width:340px}'+
  '@media(max-width:400px){.ag-logo{width:85px;height:85px;font-size:48px}.ag-title{font-size:20px}.ag-subtitle{font-size:12px}.ag-info-card{padding:12px 18px;min-width:200px}.ag-author-name{font-size:16px}.ag-foundation{font-size:13px}}'+
  '</style>'+
  '<div id="ag-overlay">'+stars+
  '<div class="ag-logo">ل</div>'+
  '<div class="ag-title">'+APP_TITLE+'</div>'+
  '<div class="ag-subtitle">'+APP_SUBTITLE+'</div>'+
  '<div class="ag-info-card">'+
  '<div class="ag-info-label">إعداد وتطوير</div>'+
  '<div class="ag-author-name">'+AUTHOR_NAME+'</div>'+
  '<div class="ag-foundation">'+FOUNDATION+'</div>'+
  '</div>'+
  '<div class="ag-input-wrap">'+
  '<input type="password" id="ag-password" class="ag-input" placeholder="أدخل كلمة المرور" autocomplete="off">'+
  '<span class="ag-lock-icon">🔒</span>'+
  '</div>'+
  '<button class="ag-submit" id="ag-submit">دخول ←</button>'+
  '<div class="ag-error" id="ag-error"></div>'+
  '<div class="ag-footer">© 2026 — جميع الحقوق محفوظة</div>'+
  '</div>';
}

function submit(){
  var inp=document.getElementById('ag-password');
  var err=document.getElementById('ag-error');
  if(!inp)return;
  var val=inp.value.trim();
  var correct=window.getAppPassword();
  if(val===correct){
    try{localStorage.setItem(STORAGE_KEY,Date.now().toString());}catch(e){}
    var o=document.getElementById('ag-overlay');
    if(o){
      o.style.opacity='0';
      setTimeout(function(){if(o.parentNode)o.parentNode.removeChild(o);},400);
    }
  } else {
    if(err){
      err.textContent='❌ كلمة المرور غير صحيحة';
      err.classList.add('show');
      inp.value='';
      inp.focus();
      setTimeout(function(){err.classList.remove('show');},2500);
    }
  }
}

function inject(){
  if(isAuthenticated())return;
  if(document.getElementById('ag-overlay'))return;
  document.body.insertAdjacentHTML('beforeend',buildHTML());
  setTimeout(function(){
    var inp=document.getElementById('ag-password');
    var btn=document.getElementById('ag-submit');
    if(inp){
      inp.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.keyCode===13){e.preventDefault();submit();}
      });
      try{inp.focus();}catch(e){}
    }
    if(btn)btn.addEventListener('click',submit);
  },100);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);
else inject();
console.log('[auth-gate v3] OK');
})();
