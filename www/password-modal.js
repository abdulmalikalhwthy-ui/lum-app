(function(){
'use strict';
function css(){
  if(document.getElementById('pwd-modal-css'))return;
  var s='<style id="pwd-modal-css">'+
  '.pwd-ov{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:999998;display:none;align-items:center;justify-content:center;padding:20px;font-family:inherit;direction:rtl}'+
  '.pwd-ov.show{display:flex}'+
  '.pwd-card{background:#FFF;border-radius:20px;padding:24px 20px;max-width:400px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.5);max-height:90vh;overflow-y:auto}'+
  '.pwd-title{font-size:19px;font-weight:900;color:#6A1B9A;text-align:center;margin-bottom:6px}'+
  '.pwd-sub{font-size:12.5px;color:#888;text-align:center;margin-bottom:20px;line-height:1.7}'+
  '.pwd-lbl{display:block;font-size:13px;font-weight:700;color:#4A148C;margin:12px 0 6px}'+
  '.pwd-in{width:100%;padding:13px;border:2px solid #E0D0E8;border-radius:12px;font-size:15px;text-align:center;letter-spacing:2px;color:#4A148C;outline:none;font-family:inherit;box-sizing:border-box}'+
  '.pwd-in:focus{border-color:#8E24AA;box-shadow:0 0 0 3px rgba(142,36,170,.15)}'+
  '.pwd-btn{width:100%;padding:14px;background:linear-gradient(135deg,#8E24AA,#6A1B9A);color:#FFF;border:none;border-radius:12px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;margin-top:18px}'+
  '.pwd-btn:active{transform:scale(.97)}'+
  '.pwd-btn.warn{background:linear-gradient(135deg,#E65100,#BF360C);margin-top:10px}'+
  '.pwd-btn.cancel{background:#F4F4EC;color:#333;margin-top:8px}'+
  '.pwd-msg{margin-top:12px;padding:10px;border-radius:10px;font-size:13px;font-weight:700;text-align:center;display:none}'+
  '.pwd-msg.ok{background:#E8F5E9;color:#2E7D32;display:block}'+
  '.pwd-msg.err{background:#FFEBEE;color:#C62828;display:block}'+
  '</style>';
  document.head.insertAdjacentHTML('beforeend',s);
}
function build(){
  if(document.getElementById('pwd-ov'))return;
  var d=document.createElement('div');
  d.className='pwd-ov';d.id='pwd-ov';
  d.innerHTML='<div class="pwd-card">'+
  '<div class="pwd-title">🔒 إدارة كلمة المرور</div>'+
  '<div class="pwd-sub">كلمة المرور المطلوبة عند فتح التطبيق</div>'+
  '<label class="pwd-lbl">كلمة المرور الحالية</label>'+
  '<input type="password" class="pwd-in" id="pwd-cur" placeholder="••••">'+
  '<label class="pwd-lbl">كلمة المرور الجديدة</label>'+
  '<input type="password" class="pwd-in" id="pwd-new" placeholder="••••">'+
  '<label class="pwd-lbl">تأكيد الجديدة</label>'+
  '<input type="password" class="pwd-in" id="pwd-conf" placeholder="••••">'+
  '<button class="pwd-btn" onclick="window.pwdSave()">💾 حفظ</button>'+
  '<button class="pwd-btn warn" onclick="window.pwdReset()">🔄 استعادة 313</button>'+
  '<button class="pwd-btn cancel" onclick="window.pwdClose()">إغلاق</button>'+
  '<div class="pwd-msg" id="pwd-msg"></div>'+
  '</div>';
  d.onclick=function(e){if(e.target===d)window.pwdClose();};
  document.body.appendChild(d);
}
window.pwdShow=function(){build();var o=document.getElementById('pwd-ov');if(o)o.classList.add('show');};
window.pwdClose=function(){var o=document.getElementById('pwd-ov');if(o)o.classList.remove('show');};
window.pwdSave=function(){
  var c=document.getElementById('pwd-cur').value.trim();
  var n=document.getElementById('pwd-new').value.trim();
  var f=document.getElementById('pwd-conf').value.trim();
  var m=document.getElementById('pwd-msg');
  m.className='pwd-msg';
  if(!c||!n||!f){m.className='pwd-msg err';m.textContent='⚠️ املأ كل الحقول';return;}
  if(n.length<3){m.className='pwd-msg err';m.textContent='⚠️ كلمة المرور قصيرة';return;}
  if(n!==f){m.className='pwd-msg err';m.textContent='❌ الكلمتان غير متطابقتين';return;}
  var cur=window.getAppPassword?window.getAppPassword():'313';
  if(c!==cur){m.className='pwd-msg err';m.textContent='❌ كلمة المرور الحالية خطأ';return;}
  if(window.setAppPassword&&window.setAppPassword(n)){
    m.className='pwd-msg ok';m.textContent='✅ تم تغيير كلمة المرور';
    document.getElementById('pwd-cur').value='';
    document.getElementById('pwd-new').value='';
    document.getElementById('pwd-conf').value='';
    setTimeout(window.pwdClose,1200);
  }else{m.className='pwd-msg err';m.textContent='❌ فشل الحفظ';}
};
window.pwdReset=function(){
  if(!confirm('استعادة كلمة المرور الافتراضية (313)؟'))return;
  if(window.resetAppPassword&&window.resetAppPassword()){
    var m=document.getElementById('pwd-msg');
    m.className='pwd-msg ok';m.textContent='✅ تمت الاستعادة إلى 313';
    setTimeout(window.pwdClose,1200);
  }
};
css();
setTimeout(build,500);
console.log('[password-modal] OK');
})();
