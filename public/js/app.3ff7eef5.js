(function(e){function n(n){for(var i,s,a=n[0],c=n[1],u=n[2],f=0,d=[];f<a.length;f++)s=a[f],o[s]&&d.push(o[s][0]),o[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);l&&l(n);while(d.length)d.shift()();return r.push.apply(r,u||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],i=!0,a=1;a<t.length;a++){var c=t[a];0!==o[c]&&(i=!1)}i&&(r.splice(n--,1),e=s(s.s=t[0]))}return e}var i={},o={app:0},r=[];function s(n){if(i[n])return i[n].exports;var t=i[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=i,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)s.d(t,i,function(n){return e[n]}.bind(null,i));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=n,a=a.slice();for(var u=0;u<a.length;u++)n(a[u]);var l=c;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("cd49")},"034f":function(e,n,t){"use strict";var i=t("64a9"),o=t.n(i);o.a},"64a9":function(e,n,t){},cd49:function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var i=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("Home")],1)},r=[],s=t("d225"),a=t("308d"),c=t("6bb5"),u=t("4e2b"),l=t("9ab4"),f=t("60a3"),d=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("IsOpenMessage")],1)},p=[],b=(t("34ef"),t("a481"),t("14b9"),t("7f7f"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"vld-parent"},[t("loading",{attrs:{active:e.isLoading,canCancel:e.canCancel,"is-full-page":e.fullPage,height:e.height,width:e.width,color:e.color,loader:e.loader,"background-color":e.bgColor},on:{"update:active":function(n){e.isLoading=n}}}),e.initDone?t("div",[t("button",{staticClass:"btn btn-lg btn-block",class:{"btn-success":e.isopen,"btn-danger":!e.isopen},attrs:{type:"submit"}},[t("div",{staticClass:"container"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-3 align-self-center"}),t("div",{staticClass:"col-6"},[t("div",{staticClass:"container"},[e._v("Der Kiosk im Schwimmbad Ebrach ist gerade "+e._s(e.statusText))])]),t("div",{staticClass:"col-3 align-self-center"})])])])]):e._e(),e.hasError?t("div",[t("button",{staticClass:"btn btn-lg btn-block btn-danger",attrs:{type:"submit"}},[e._v("\n      Der Service ist im Moment nicht verfübar\n      ")])]):e._e()],1)])}),g=[],v=t("9062"),h=t.n(v),m=(t("e40d"),{name:"IsOpenMessage",components:{Loading:h.a},data:function(){return{isopen:!1,initDone:!1,hasError:!1,isLoading:!1,fullPage:!0,canCancel:!1,useSlot:!1,loader:"spinner",color:"#ff7f00",bgColor:"#ffffff",height:128,width:128}},created:function(){var e=this;this.axios.get("/api/isopen").then(function(n){e.isopen=n.data.isopen,e.initDone=!0}).catch(function(n){e.hasError=!0})},computed:{statusText:function(){return this.isopen?"geöffnet":"geschlossen"}}}),w=m,y=(t("4cba"),t("2877")),k=Object(y["a"])(w,b,g,!1,null,"4fbb62d2",null),O=k.exports,S=t("bc3a"),j=t.n(S),_={name:"home",components:{IsOpenMessage:O},data:function(){return{notificationsSupported:!1,notificationsEnabled:!1,serviceWorkerRegistration:null,subscription:null,message:null}},methods:{enableNotifications:function(){var e=this;this.notificationsSupported&&!this.notificationsEnabled&&Notification.requestPermission().then(function(n){"granted"===n?e.createSubscription().then(function(n){return console.log("Home.vue: subscription created on the client",n),e.subscription=n,j.a.post("api/user",{username:localStorage.getItem("username")})}).then(function(n){var t=n.data,i=t.user;return console.log("Home.vue: user created on the server",i),localStorage.setItem("username",i.name),j.a.post("api/subscription",{subscription:e.subscription,userId:i.id})}).then(function(){e.showNotification(),e.notificationsEnabled=!0}):console.log("Home.vue: User did not granted permission")})},createSubscription:function(){var e=this;return null===this.serviceWorkerRegistration?navigator.serviceWorker.ready.then(function(n){return e.serviceWorkerRegistration=n,e.subscribe(e.serviceWorkerRegistration)}):this.subscribe(this.serviceWorkerRegistration)},subscribe:function(e){console.log("Home.vue: create new subscription for this browser on this device");var n="BE4ll+PKxJkg5t8mmH6++lh3P6oD0M3wn8mNoJ5Dd0sMeGhIRpfUF37oCJ2rJXPfh91DnzolgL4SKzMOiIpC8A8=",t=this.urlBase64ToUint8Array(n);return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:t})},showNotification:function(){this.serviceWorkerRegistration.showNotification("Notifications granted",{body:"Here is a first notification",icon:"/img/icons/android-chrome-192x192.png",image:"/img/autumn-forest.png",vibrate:[300,200,300],badge:"/img/icons/plint-badge-96x96.png"})},findSubscription:function(){var e=this;return console.log("Home.vue: get active service worker registration"),navigator.serviceWorker.ready.then(function(n){return console.log("Home.vue: active service worker registration received"),e.serviceWorkerRegistration=n,e.getSubscription(e.serviceWorkerRegistration)})},getSubscription:function(e){return console.log("Home.vue: ask for available subscription"),e.pushManager.getSubscription()},urlBase64ToUint8Array:function(e){for(var n="=".repeat((4-e.length%4)%4),t=(e+n).replace(/\-/g,"+").replace(/_/g,"/"),i=window.atob(t),o=new Uint8Array(i.length),r=0;r<i.length;++r)o[r]=i.charCodeAt(r);return o}},created:function(){"Notification"in window&&"serviceWorker"in navigator&&(this.notificationsSupported=!0)},mounted:function(){var e=this;this.findSubscription().then(function(n){null===n?(console.log("Home.vue: no active subscription found on the client"),e.enableNotifications()):(console.log("Active subscription found",n),e.notificationsEnabled=!0,e.subscription=n)})}},C=_,x=Object(y["a"])(C,d,p,!1,null,null,null),E=x.exports,M=function(e){function n(){return Object(s["a"])(this,n),Object(a["a"])(this,Object(c["a"])(n).apply(this,arguments))}return Object(u["a"])(n,e),n}(f["b"]);M=l["a"]([Object(f["a"])({components:{Home:E}})],M);var H=M,P=H,W=(t("034f"),Object(y["a"])(P,o,r,!1,null,null,null)),N=W.exports,A=t("9483");Object(A["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){},cached:function(){},updatefound:function(){},updated:function(){},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var R=t("a7fe"),D=t.n(R);i["a"].use(D.a,j.a),i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(N)}}).$mount("#app")}});
//# sourceMappingURL=app.3ff7eef5.js.map