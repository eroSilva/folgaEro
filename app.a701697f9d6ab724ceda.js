!function(e){var n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(r,a,function(n){return e[n]}.bind(null,a));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n,t){},function(e,n,t){"use strict";t.r(n);t(0);function r(e,n,t){return(r=a()?Reflect.construct:function(e,n,t){var r=[null];r.push.apply(r,n);var a=new(Function.bind.apply(e,r));return t&&o(a,t.prototype),a}).apply(null,arguments)}function a(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function o(e,n){return(o=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function c(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return l(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return l(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var u,i=new Date,f={dateMain:{full:i,year:i.getUTCFullYear(),month:i.getUTCMonth()},dateSelected:{},lastDayOff:new Date(2020,6,31),daysToWorkBetweenDayOffs:2,allDayOffYear:[],elements:{calendarContainer:document.querySelector("#calendar"),calendarToday:document.querySelector("#calendarToday"),calendarMonthYearButton:document.querySelector("#calendarMonthYear"),calendarControls:document.querySelector("#calendarControls"),calendarMonthDays:document.querySelector("#calendarMonthDays"),calendarMonthItem:document.querySelectorAll("#calendarControls .month"),calendarYears:document.querySelector("#calendarYears")}},d=function(e){return e.toLocaleString("pt-br",{weekday:"long"})},s=function(e,n){var t=[e,n+1,0];return n<0?t=[e-1,12,0]:n>12&&(t=[e+1,1,0]),r(Date,c(t)).getUTCDate()},y=function(e,n){var t,r,a,o,c,l,u=[];for(t=1;t<=s(e,n);t++){var i=new Date(e,n,t);u.push({date:i,number:t,week:i.getUTCDay(),today:(r=i,a=void 0,o=void 0,c=void 0,l=void 0,a=f.dateMain.full,o=r.getUTCFullYear()===a.getUTCFullYear(),c=r.getMonth()===a.getMonth(),l=r.getDate()===a.getDate(),o&&c&&l),name:d(i)})}return u},m=function(e,n,t){f.allDayOffYear=[f.lastDayOff],function e(n,t){var r={year:n.getUTCFullYear(),month:n.getUTCMonth(),date:n.getUTCDate()-f.daysToWorkBetweenDayOffs};if(t<=r.year){var a=new Date(r.year,r.month,r.date);f.allDayOffYear.unshift(a),e(a,t)}}(f.lastDayOff,n),function e(n,t){var r={year:n.getUTCFullYear(),month:n.getUTCMonth(),date:n.getUTCDate()+f.daysToWorkBetweenDayOffs};if(t>=r.year){var a=new Date(r.year,r.month,r.date);f.allDayOffYear.push(a),e(a,t)}}(f.lastDayOff,n);var r=function(e){return f.allDayOffYear.filter((function(n){return n.getUTCMonth()>=e-1&&n.getUTCMonth()<=e+1}))}(t);return e.map((function(e){return r.forEach((function(n){n.getTime()==e.date.getTime()&&(e.dayOff=!0)})),e}))},h=function(e,n){var t=y(e,n),r=y(e,n+1),a=y(e,n-1),o=r.filter((function(e,n){return n<function(e){var n,t=[];for(n=e+1;n<=6;n++)t.push(n);return t}(t[t.length-1].week).length})),c=a.reverse().filter((function(e,n){return n<function(e){var n,t=[];for(n=e-1;n>=0;n--)t.push(n);return t}(t[0].week).length}));!function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];[].concat(n).forEach((function(e){e.map((function(e){return e.outOfMonth=!0}))})),[].concat(n)}(o,c);var l=t.reverse().concat(c).reverse().concat(o);return m(l,e,n)},p=function(){f.elements.calendarControls.classList.add("open"),f.elements.calendarContainer.classList.add("months-open")},M=function(){f.elements.calendarControls.classList.remove("open"),f.elements.calendarContainer.classList.remove("months-open")},g=function(e,n){var t=h(e,n),r=function(e){return[e-2,e-1,e,e+1,e+2]}(e),a=f.elements.calendarToday,o=c(f.elements.calendarMonthYearButton.children),l=f.elements.calendarMonthDays,u=f.elements.calendarYears;!function(e){f.elements.calendarMonthItem.forEach((function(e){e.classList.remove("selected")})),f.elements.calendarMonthItem[e].classList.add("selected")}(n),u.innerHTML=r.map((function(n){return'<li class="year '.concat(n==e?"selected":"",'" tabindex="0"> ').concat(n," </li>")})).join(""),o.map((function(t){return t.classList.contains("year")?t.innerHTML=e:t.innerHTML=new Date(e,n+1,0).toLocaleString("pt-br",{month:"long"})})),a.innerHTML=f.dateMain.full.toLocaleString("pt-br",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),l.innerHTML=t.map((function(e){return'\n            <li class="month-day'.concat((n=e,[n.outOfMonth?" out":"",n.dayOff?" day-off":"",n.today?" today":"",0===n.date.getDay()?" sunday":""].join("")),'" tabindex="0">\n                <span class="month-day__number">').concat(e.number,'</span>\n                <span class="month-day__name">').concat(e.name,"</span>\n            </li>\n        ");var n})).join(""),f.dateSelected={full:new Date(e,n,0),year:e,month:n}},v=function(e){return e.changedTouches[0].clientX};g(f.dateMain.year,f.dateMain.month),f.elements.calendarMonthDays.addEventListener("touchstart",(function(e){u=v(e)})),f.elements.calendarMonthDays.addEventListener("touchend",(function(e){var n=v(e);if(u>n)return function(){if(11===f.dateMain.month)return g(++f.dateMain.year,f.dateMain.month=0);g(f.dateMain.year,++f.dateMain.month)}();!function(){if(0===f.dateMain.month)return g(--f.dateMain.year,f.dateMain.month=11);g(f.dateMain.year,--f.dateMain.month)}()})),f.elements.calendarMonthYearButton.addEventListener("click",p),f.elements.calendarMonthItem.forEach((function(e,n){e.addEventListener("click",(function(){f.dateMain.month=n,M(),g(f.dateMain.year,f.dateMain.month)}))})),f.elements.calendarYears.addEventListener("click",(function(e){f.dateMain.year=parseInt(e.target.innerText,10),M(),g(f.dateMain.year,f.dateMain.month)}))}]);