!function(e){var n={};function t(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(a,r,function(n){return e[n]}.bind(null,r));return a},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n,t){},function(e,n,t){"use strict";t.r(n);t(0);function a(e,n,t){return(a=r()?Reflect.construct:function(e,n,t){var a=[null];a.push.apply(a,n);var r=new(Function.bind.apply(e,a));return t&&o(r,t.prototype),r}).apply(null,arguments)}function r(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function o(e,n){return(o=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function c(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return l(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return l(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=new Array(n);t<n;t++)a[t]=e[t];return a}var i,u,d,f,s,y,m,h,p=new Date,M={dateMain:{full:p,year:p.getUTCFullYear(),month:p.getUTCMonth()},dateSelected:{},lastDayOff:new Date(2020,7,1),daysToWorkBetweenDayOffs:2,allDayOffYear:[],elements:{calendarContainer:document.querySelector("#calendar"),calendarToday:document.querySelector("#calendarToday"),calendarMonthYearButton:document.querySelector("#calendarMonthYear"),calendarControls:document.querySelector("#calendarControls"),calendarMonthDays:document.querySelector("#calendarMonthDays"),calendarMonthItem:document.querySelectorAll("#calendarControls .month"),calendarMonthPrev:document.querySelector("#calendarMonthPrev"),calendarMonthNext:document.querySelector("#calendarMonthNext"),calendarYears:document.querySelector("#calendarYears")}},v=function(e){return e.toLocaleString("pt-br",{weekday:"long"})},g=function(e,n){var t=[e,n+1,0];return n<0?t=[e-1,12,0]:n>12&&(t=[e+1,1,0]),a(Date,c(t)).getUTCDate()},b=function(e,n){var t,a,r,o,c,l,i=[];for(t=1;t<=g(e,n);t++){var u=new Date(e,n,t);i.push({date:u,number:t,week:u.getUTCDay(),today:(a=u,r=void 0,o=void 0,c=void 0,l=void 0,r=M.dateMain.full,o=a.getUTCFullYear()===r.getUTCFullYear(),c=a.getMonth()===r.getMonth(),l=a.getDate()===r.getDate(),o&&c&&l),name:v(u)})}return i},D=function(e,n,t){M.allDayOffYear=[M.lastDayOff],function e(n,t){var a={year:n.getUTCFullYear(),month:n.getUTCMonth(),date:n.getUTCDate()-M.daysToWorkBetweenDayOffs};if(t<=a.year){var r=new Date(a.year,a.month,a.date);M.allDayOffYear.unshift(r),e(r,t)}}(M.lastDayOff,n),function e(n,t){var a={year:n.getUTCFullYear(),month:n.getUTCMonth(),date:n.getUTCDate()+M.daysToWorkBetweenDayOffs};if(t>=a.year){var r=new Date(a.year,a.month,a.date);M.allDayOffYear.push(r),e(r,t)}}(M.lastDayOff,n);var a=function(e){return M.allDayOffYear.filter((function(n){return n.getUTCMonth()>=e-1&&n.getUTCMonth()<=e+1}))}(t);return e.map((function(e){return a.forEach((function(n){n.getTime()==e.date.getTime()&&(e.dayOff=!0)})),e}))},T=function(e,n){var t=b(e,n),a=b(e,n+1),r=b(e,n-1),o=r.reverse().filter((function(e,n){return n<function(e){var n,t=[];for(n=e-1;n>=0;n--)t.push(n);return t}(t[0].week).length}));0===o.length&&(o=r.slice(0,7));var c=42-(o.length+t.length),l=a.slice(0,c);!function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];[].concat(n).forEach((function(e){e.map((function(e){return e.outOfMonth=!0}))})),[].concat(n)}(l,o);var i=t.reverse().concat(o).reverse().concat(l);return D(i,e,n)},O=function(){M.elements.calendarControls.classList.add("open"),M.elements.calendarContainer.classList.add("months-open")},C=function(){M.elements.calendarControls.classList.remove("open"),M.elements.calendarContainer.classList.remove("months-open")},S=function(e,n){var t=T(e,n),a=function(e){return[e-2,e-1,e,e+1,e+2]}(e),r=M.elements.calendarToday,o=c(M.elements.calendarMonthYearButton.children),l=M.elements.calendarMonthDays,i=M.elements.calendarYears;!function(e){M.elements.calendarMonthItem.forEach((function(e){e.classList.remove("selected")})),M.elements.calendarMonthItem[e].classList.add("selected")}(n),i.innerHTML=a.map((function(n){return'<li class="year '.concat(n==e?"selected":"",'" tabindex="0"> ').concat(n," </li>")})).join(""),o.map((function(t){return t.classList.contains("year")?t.innerHTML=e:t.innerHTML=new Date(e,n+1,0).toLocaleString("pt-br",{month:"long"})})),r.innerHTML=M.dateMain.full.toLocaleString("pt-br",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),l.innerHTML=t.map((function(e){return'\n            <li class="month-day'.concat((n=e,[n.outOfMonth?" out":"",n.dayOff?" day-off":"",n.today?" today":"",0===n.date.getDay()?" sunday":""].join("")),'" tabindex="0">\n                <span class="month-day__number">').concat(e.number,'</span>\n                <span class="month-day__name">').concat(e.name,"</span>\n            </li>\n        ");var n})).join(""),M.dateSelected={full:new Date(e,n,0),year:e,month:n}},L=function(e){M.elements.calendarContainer.classList.add(e),setTimeout((function(){M.elements.calendarContainer.classList.remove(e)}),150)},w=function(e){return e.changedTouches[0].clientX},Y=function(){if(L("to-next"),11===M.dateMain.month)return S(++M.dateMain.year,M.dateMain.month=0);S(M.dateMain.year,++M.dateMain.month)},j=function(){if(L("to-prev"),0===M.dateMain.month)return S(--M.dateMain.year,M.dateMain.month=11);S(M.dateMain.year,--M.dateMain.month)};u=M.elements,d=u.calendarMonthDays,f=u.calendarMonthYearButton,s=u.calendarMonthItem,y=u.calendarYears,m=u.calendarMonthPrev,h=u.calendarMonthNext,S(M.dateMain.year,M.dateMain.month),d.addEventListener("touchstart",(function(e){i=w(e)})),d.addEventListener("touchend",(function(e){var n=w(e),t=1.15*i<n;i>1.15*n&&Y(),t&&j()})),f.addEventListener("click",O),s.forEach((function(e,n){e.addEventListener("click",(function(){M.dateMain.month=n,C(),S(M.dateMain.year,M.dateMain.month)}))})),y.addEventListener("click",(function(e){M.dateMain.year=parseInt(e.target.innerText,10),C(),S(M.dateMain.year,M.dateMain.month)})),m.addEventListener("click",j),h.addEventListener("click",Y)}]);