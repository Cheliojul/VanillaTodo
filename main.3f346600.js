parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"KIzB":[function(require,module,exports) {
"use strict";var e=window,t=e.localStorage,o=document.querySelector(".Todo-board"),n=document.querySelectorAll(".plus__container, .button"),r=JSON.parse(t.getItem("todos")),d=document.querySelector(".counter__scope"),c=document.querySelector(".counter__active"),a=document.querySelector(".counter__completed");function i(e){e.addEventListener("click",function(e){var t=e.target.offsetParent.nextElementSibling;t.hasAttribute("disabled")?t.removeAttribute("disabled"):t.setAttribute("disabled","disabled")})}function u(){var e=new Date,t=String(e.getDate()).padStart(2,"0"),o=String(e.getMonth()),n=e.getFullYear();return t+" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][o]+" "+n}function l(e){e.addEventListener("click",function(e){var t=e.target.closest("div[key]").getAttribute("key");r=r.filter(function(e){return e.id!==+t}),document.querySelectorAll(".Todo-board__todo").forEach(function(e){return e.remove()}),f()})}function s(e){e.addEventListener("click",function(e){var t=e.target.closest("div[key]").getAttribute("key"),o=r.find(function(e){return e.id===+t}),n=document.querySelectorAll(".Todo-board__todo");o.isCompleted=!o.isCompleted,n.forEach(function(e){return e.remove()}),f()})}function m(e){e.addEventListener("focusout",function(e){var t=e.target.closest("div[key]").getAttribute("key"),o=r.find(function(e){return e.id===Number(t)}),n=document.querySelectorAll(".Todo-board__todo");o.text=e.target.value,n.forEach(function(e){return e.remove()}),f()})}function _(e){var t=document.createElement("li");t.class="Todo-board__Todo",t.innerHTML='\n  <div key="'.concat(e.id,'" class="Todo-board__todo">\n    \n    <span class="Todo-board__heading">\n      <input\n        type="checkbox"\n        id="status-').concat(e.id,'"\n        name="status"\n        ').concat(e.isCompleted?'checked="'.concat(e.isCompleted,'"'):"",'\n        class="Todo-board__status custom-checkbox"\n      >\n      <label for="status-').concat(e.id,'"></label>\n      <span class="Todo-board__date">').concat(e.date,'</span>\n      <div class="Todo-board__edit"> </div>\n      <div class="Todo-board__delete"> </div>\n    </span>\n    \n    \n    <textarea\n      id="Text"\n      ').concat(e.isCompleted?'style="text-decoration:line-through;"':"",'\n      class="Todo-board__text"\n      placeholder="Please enter task description"\n      required\n      min="1"\n      max="256"\n      disabled\n    >').concat(e.text,"</textarea>\n  </div>"),o.append(t)}function f(){if(null===r&&(r=[]),r.length<1){var e=document.createElement("div");e.className="Todo-board__empty",e.innerHTML="Create new task by clicking the button below",o.append(e)}else document.querySelector(".Todo-board__empty")&&document.querySelector(".Todo-board__empty").remove();r.map(function(e){return _(e)}),a.innerHTML=r.reduce(function(e,t){return t.isCompleted?e+1:e},0),d.innerHTML=r.length,c.innerHTML=r.length-a.innerHTML;var n=document.querySelectorAll(".Todo-board__delete"),u=document.querySelectorAll(".Todo-board__status"),f=document.querySelectorAll(".Todo-board__text"),b=document.querySelectorAll(".Todo-board__edit");n.forEach(function(e){return l(e)}),u.forEach(function(e){return s(e)}),f.forEach(function(e){return m(e)}),b.forEach(function(e){return i(e)}),t.setItem("todos",JSON.stringify(r))}f(),n.forEach(function(e){e.addEventListener("click",function(){var e=document.querySelectorAll(".Todo-board__todo"),t={id:0,date:u(),text:"",isCompleted:!1};r.length?(t.id=r[r.length-1].id+1,r.push(t)):r.push(t),e.forEach(function(e){return e.remove()}),f()})});
},{}]},{},["KIzB"], null)
//# sourceMappingURL=main.3f346600.js.map