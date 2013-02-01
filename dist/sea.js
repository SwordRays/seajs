/*
 SeaJS - A Module Loader for the Web
 v2.0.0-dev | seajs.org | MIT Licensed
*/
'use strict';(function(j,q){function E(a){return"[object Function]"===R.call(a)}function M(a){var c=S,b={};x(a,function(a){b[a]=1});return c(b)}function N(a,c,b){F(a,c);return c[b||S(c)[0]]}function O(a){a=a.match(ea);return(a?a[0]:".")+"/"}function T(a,c){if(!a)return"";var b=a,d=k.alias,e;if(e=d)if(e=y.call(d,b)){e=b;var g=e.charAt(0);e=-1===e.indexOf("://")&&"."!==g&&"/"!==g}e&&(b=d[b]);var f=k.vars;f&&-1<b.indexOf("{")&&(b=b.replace(fa,function(a,b){return y.call(f,b)?f[b]:"{"+b+"}"}));d=c||G;
0<b.indexOf("://")||0===b.indexOf("//")||(0===b.indexOf("./")||0===b.indexOf("../")?(0===b.indexOf("./")&&(b=b.substring(2)),b=O(d)+b):b="/"===b.charAt(0)&&"/"!==b.charAt(1)?d.match(ga)[1]+b:k.base+b);7<b.lastIndexOf("//")&&(b=b.replace(ha,"$1/"));if(-1!==b.indexOf(".")){d=b.split("/");e=[];for(var n=0;n<d.length;n++)if(g=d[n],".."===g){if(0===e.length)throw Error("The path is invalid: "+b);e.pop()}else"."!==g&&e.push(g);b=e.join("/")}"#"===b.charAt(b.length-1)?b=b.slice(0,-1):!ia.test(b)&&-1===b.indexOf("?")&&
(b+=".js");b=b.replace(":80/","/");d=k.map||[];n=b;if(e=d.length)for(g=0;g<e&&!(n=d[g],n=E(n)?n(b)||b:b.replace(n[0],n[1]),n!==b);g++);return n}function U(a,c){var b=a.sheet,d;if(V)b&&(d=!0);else if(b)try{b.cssRules&&(d=!0)}catch(e){"NS_ERROR_DOM_SECURITY_ERR"===e.name&&(d=!0)}setTimeout(function(){d?c():U(a,c)},1)}function ja(){if(H)return H;if(I&&"interactive"===I.readyState)return I;for(var a=z.getElementsByTagName("script"),c=a.length-1;0<=c;c--){var b=a[c];if("interactive"===b.readyState)return I=
b}}function A(a,c){this.uri=a;this.status=c||l.LOADING;this.dependencies=[];this.waitings=[]}function B(a,c){if(C(a)){for(var b=[],d=0,e=a.length;d<e;d++)b[d]=B(a[d],c);return b}return T(a,c)}function W(a,c,b){function d(a){a&&a.status<l.LOADED&&(a.status=l.LOADED);0===--e&&c()}b=b||{};a=b.filtered?a:X(a);if(0===a.length)c();else{F("load",a);for(var e=b=a.length,g=0;g<b;g++)(function(a){function b(){if(c.status<l.SAVED)d();else if(Y(c)){var a=u;a.push(a[0]);J("Found circular dependencies:",a.join(" --\x3e "));
u.length=0;d()}else a=c.waitings=X(c.dependencies),0===a.length?d(c):W(a.slice(),function(){d(c)},{filtered:!0})}var c=s[a];if(c.status<l.SAVED){var e=function(){delete P[g];Q[g]=!0;K&&(Z(a,K),K=null);var b,c=L[g];for(delete L[g];b=c.shift();)b()},g=N("fetch",{uri:a,fetchedList:Q},"uri");if(Q[g])b();else if(P[g])L[g].push(b);else{P[g]=!0;L[g]=[b];var f=k.charset;if(!N("request",{uri:g,callback:e,charset:f},"requested")){var h=g,m=ka.test(h),p=r.createElement(m?"link":"script");if(f&&(f=E(f)?f(h):
f))p.charset=f;if("SCRIPT"===p.nodeName){var t=p;t.onload=t.onerror=t.onreadystatechange=function(){la.test(t.readyState)&&(t.onload=t.onerror=t.onreadystatechange=null,k.debug||z.removeChild(t),t=q,e&&e())}}else{var j=p;V||ma?(J("Start css polling"),setTimeout(function(){U(j,e)},1)):j.onload=j.onerror=function(){j.onload=j.onerror=null;j=q;e&&e()}}m?(p.rel="stylesheet",p.href=h):(p.async="async",p.src=h);H=p;$?z.insertBefore(p,$):z.appendChild(p);H=null}}}else b()})(a[g])}}function na(a,c,b){var d=
arguments.length;1===d?(b=a,a=q):2===d&&(b=c,c=q,C(a)&&(c=a,a=q));if(!C(c)&&E(b)){var d=b.toString(),e=[],g;aa.lastIndex=0;for(d=d.replace(oa,"");g=aa.exec(d);)g[2]&&e.push(g[2]);c=M(e)}var d={id:a,dependencies:c,factory:b},f;!a&&r.attachEvent&&((e=ja())&&e.src?(f=e.hasAttribute?e.src:e.getAttribute("src",4),f=N("derived",{uri:f})):J("Failed to derive script URI: ",b.toString()));(f=a?B(a):f)?Z(f,d):K=d}function Z(a,c){var b=s[a]||(s[a]=new A(a,void 0));b.status<l.SAVED&&(b.id=c.id||a,b.dependencies=
B(c.dependencies||[],a),b.factory=c.factory,b.status=l.SAVED)}function ba(a){function c(b){b=s[c.resolve(b)];if(b===q)return null;b.parent=a;return ba(b)}if(!a)return null;if(a.status>=l.COMPILING)return a.exports;F("compile",a);if(a.status<l.LOADED&&a.exports===q)return null;a.status=l.COMPILING;c.async=function(b,d){a.load(b,d);return c};c.resolve=function(b){return B(b,a.uri)};c.cache=s;var b=a.factory,d=b===q?a.exports:b;E(b)&&(d=b(c,a.exports={},a));a.exports=d===q?a.exports:d;a.status=l.COMPILED;
F("compiled",a);return a.exports}function X(a){var c=[];x(a,function(a){a&&(s[a]||(s[a]=new A(a,void 0))).status<l.LOADED&&c.push(a)});return c}function Y(a){var c=a.waitings;if(0===c.length)return!1;u.push(a.uri);a=c.concat(u);if(M(a).length<a.length){a=u[0];for(var b=c.length-1;0<=b;b--)if(c[b]===a){c.splice(b,1);break}return!0}for(a=0;a<c.length;a++)if(Y(s[c[a]]))return!0;u.pop();return!1}function pa(){var a=[],c=j.location.search,c=c.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),c=c+(" "+r.cookie);c.replace(/seajs-(\w+)=1/g,
function(b,c){a.push("{seajs}/plugin-"+c)});return M(a)}if(!j.seajs){var h=j.seajs={version:"2.0.0-dev"},f=[],m={},R=m.toString,y=m.hasOwnProperty,qa=f.slice,C=Array.isArray||function(a){return"[object Array]"===R.call(a)},x=f.forEach?function(a,c){a.forEach(c)}:function(a,c){for(var b=0,d=a.length;b<d;b++)c(a[b],b,a)},S=Object.keys||function(a){var c=[],b;for(b in a)y.call(a,b)&&c.push(b);return c},D=j.console,J=h.log=function(){if(D!==q){var a=qa.call(arguments),c=D[a[a.length-1]]?a.pop():"log";
if("log"!==c||k.debug)c=D[c],c=c.apply?c:Function.prototype.bind.call(c,D),c.apply(D,a)}},v={};h.on=function(a,c){if(!c)return h;(v[a]||(v[a]=[])).push(c);return h};h.off=function(a,c){if(!a&&!c)return v={},h;var b=v[a];if(b)if(c)for(var d=b.length-1;0<=d;d--)b[d]===c&&b.splice(d,1);else delete v[a];return h};var F=h.emit=function(a){var c=v[a];if(!c)return h;for(var b=[],d=1,e=arguments.length;d<e;d++)b[d-1]=arguments[d];c=c.slice();x(c,function(a){a.apply(j,b)});return h},ea=/[^?]*(?=\/.*$)/,ha=
/([^:\/])\/\/+/g,ia=/\.(?:css|js)|\/$/,ga=/^(.*?:\/\/.*?)(?:\/|$)/,fa=/{([^{}]+)}/g,r=document,G,f=j.location,m=f.pathname;"/"!==m.charAt(0)&&(m="/"+m);f=f.protocol+"//"+f.host+m;-1<f.indexOf("\\")&&(f=f.replace(/\\/g,"/"));G=f;if(!(f=r.getElementById("seajs-node")))f=r.getElementsByTagName("script"),f=f[f.length-1]||r.createElement("script");var m=(f.hasAttribute?f.src:f.getAttribute("src",4))||G,z=r.head||r.getElementsByTagName("head")[0]||r.documentElement,$=z.getElementsByTagName("base")[0],ka=
/\.css(?:\?|$)/i,la=/loaded|complete|undefined/,H,I,w=navigator.userAgent,V=536>Number(w.replace(/.*AppleWebKit\/(\d+)\..*/,"$1")),ma=0<w.indexOf("Firefox")&&!("onload"in r.createElement("link")),aa=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,oa=/\\\\/g,s=h.cache={},l=A.STATUS={LOADING:1,SAVED:2,LOADED:3,COMPILING:4,COMPILED:5};A.prototype.load=function(a,c){var b=B(C(a)?a:[a],this.uri);W(b,function(){var a=
[];x(b,function(b,c){a[c]=ba(s[b])});c&&c.apply(j,a)});return this};var P={},Q={},L={},K=null,u=[],ca=new A(G,l.COMPILED);h.use=function(a,c){var b=function(){ca.load(a,c)},d=k.preload,e=d.length;e?ca.load(d.splice(0,e),b):b();return h};j.define=na;var w=O(m),da=w.match(/^(.+\/)seajs\/\d[^/]+\/$/);da&&(w=da[1]);var k={base:w,charset:"utf-8"};h.config=function(a){for(var c in a)if(y.call(a,c)){var b=k[c],d=a[c];if(b&&("alias"===c||"vars"===c))for(var e in d){if(y.call(d,e)){var f=d[e];if(e in b){var j=
b[e];j!==f&&J("The config of "+c+'["'+e+'"] is changed from "'+j+'" to "'+f+'"',"warn")}b[e]=f}}else b&&("map"===c||"preload"===c)?(C(d)||(d=[d]),x(d,function(a){b.push(a)})):k[c]=d}a&&a.base&&(a=k.base,0<a.indexOf("://")||0===a.indexOf("//")||(k.base=T(("/"===a.charAt(0)&&"/"!==a.charAt(1)?"":"./")+a+("/"===a.charAt(a.length-1)?"":"/"))));return h};h.config.data=k;h.config({vars:{seajs:O(m)},preload:pa()});(f=f.getAttribute("data-main"))&&h.use(f)}})(this);
//@ sourceMappingURL=sea.js.map