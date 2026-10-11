(function(){
'use strict';

window.forceExit=function(){
  var ok=confirm('هل تريد الخروج من التطبيق؟');
  if(!ok)return;

  /* تشخيص مفصل */
  console.log('══════ محاولة الخروج ══════');
  console.log('cordova:', typeof window.cordova);
  console.log('navigator.app:', typeof (window.navigator && navigator.app));
  console.log('navigator.app.exitApp:', typeof (window.navigator && navigator.app && navigator.app.exitApp));
  console.log('AppExit:', typeof window.AppExit);
  console.log('cordova.plugins:', typeof (window.cordova && cordova.plugins));

  /* ① navigator.app.exitApp — الأسلوب الرسمي في Cordova 15 */
  try{
    if(window.navigator && navigator.app && typeof navigator.app.exitApp === 'function'){
      console.log('[exit] ✅ navigator.app.exitApp()');
      navigator.app.exitApp();
      return;
    }
  }catch(e){console.error('err1:',e);}

  /* ② window.AppExit.exit */
  try{
    if(window.AppExit && typeof window.AppExit.exit === 'function'){
      console.log('[exit] ✅ AppExit.exit()');
      window.AppExit.exit();
      return;
    }
  }catch(e){console.error('err2:',e);}

  /* ③ cordova.plugins.AppExit */
  try{
    if(window.cordova && cordova.plugins && cordova.plugins.AppExit && typeof cordova.plugins.AppExit.exit === 'function'){
      console.log('[exit] ✅ cordova.plugins.AppExit.exit()');
      cordova.plugins.AppExit.exit();
      return;
    }
  }catch(e){console.error('err3:',e);}

  /* ④ cordova.exec مباشرة */
  try{
    if(window.cordova && typeof cordova.exec === 'function'){
      console.log('[exit] ✅ cordova.exec AppExit');
      cordova.exec(null, null, 'AppExit', 'exit', []);
      return;
    }
  }catch(e){console.error('err4:',e);}

  /* ⑤ Capacitor */
  try{
    if(window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.App){
      Capacitor.Plugins.App.exitApp();
      return;
    }
  }catch(e){}

  /* ⑥ Fallback */
  console.warn('[exit] ❌ كل الطرق فشلت');
  try{window.close();}catch(e){}
  setTimeout(function(){
    if(typeof window.showToast === 'function'){
      window.showToast('لإغلاق التطبيق، اضغط زر الرجوع في الهاتف');
    } else {
      alert('لإغلاق التطبيق، اضغط زر الرجوع في الهاتف');
    }
  },200);
};

/* تشخيص عند deviceready */
document.addEventListener('deviceready',function(){
  console.log('════════════════════════════════════════');
  console.log('[exit-fix] deviceready ✅');
  console.log('  cordova:', typeof window.cordova);
  console.log('  navigator.app:', typeof (window.navigator && navigator.app));
  console.log('  navigator.app.exitApp:', typeof (window.navigator && navigator.app && navigator.app.exitApp));
  console.log('════════════════════════════════════════');
},false);

console.log('[exit-fix v4] OK');
})();
