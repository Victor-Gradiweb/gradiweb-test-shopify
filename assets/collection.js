(()=>{"use strict";const e=(e,t)=>[...(t||document).querySelectorAll(e)],t=(e,t)=>(t||document).querySelector(e);Shopify.queryParams={};!function(){if(location.search.length){const e=location.search.substring(1).split("&");for(let t=0;t<e.length;t++){const o=e[t].split("=");o.length&&(Shopify.queryParams[decodeURIComponent(o[0])]=decodeURIComponent(o[1]))}}}();const o=(e,o)=>{t(e).addEventListener("click",(()=>{!function(e,o,r){const{dataset:i,id:s}=e,l=a(i);i.active=l?"false":"true";o&&((e,o,{active:a,video:r})=>{const i=`overlay--${e}`,s=o.parentNode;if(a)s.removeChild(t(`#${i}`)),r&&((l=o).innerHTML=t(".video__modal-wrapper",l).outerHTML);else{const t=document.createElement("div");t.setAttribute("id",i),t.classList.add("overlay"),s.insertBefore(t,o),n(`#${i}`,`#${e}`,{overlay:!0,video:r})}var l})(s,e,{active:l,video:r})}(t(o),!0,!0)}))};e(".video__button").forEach((e=>{const{dataset:{section:t}}=e;o(`#play-button-${t}-js`,`#modal-video-${t}-js`)}));const a=({active:e})=>"true"===e;function r(e,o){const{dataset:r,id:i}=e,s=a(r);r.active=s?"false":"true",o&&((e,o,a)=>{const r=`overlay--${e}`,i=a.parentNode;if(o)i.removeChild(t(`#${r}`));else{const t=document.createElement("div");t.setAttribute("id",r),t.classList.add("overlay"),i.insertBefore(t,a),n(`#${r}`,`#${e}`,{overlay:!0})}})(i,s,e)}const n=(e,o,a={})=>{const{overlay:n,closeSelector:i,video:s}=a;t(e).addEventListener("click",(()=>{r(t(o),n)})),i&&t(i).addEventListener("click",(()=>r(t(o),n)))};function i(e,t){const o=Number(e)/100;return t?o.toFixed(2):o}e(".price-in input").forEach((e=>{e.value=i(e.value,!0)})),t("#sort-by").addEventListener("change",(({target:e})=>{Shopify.queryParams.sort_by=e.value,location.search=new URLSearchParams(Shopify.queryParams).toString()})),function(){const o=e(".range-in input"),a=e(".price-in input"),r=t(".slider-filter .pro");o.forEach((e=>{a[0].value&&(r.style.left=a[0].value/o[0].max*1e4+"%",r.style.right=100-a[1].value/o[1].max*1e4+"%"),e.addEventListener("input",(e=>{const t=Number(o[0].value),n=Number(o[1].value);n-t<0?"range-min"===e.target.className?o[0].value=i(n-0):o[1].value=i(t+0):(a[0].value=i(t,!0),a[1].value=i(n,!0),r.style.left=t/o[0].max*100+"%",r.style.right=100-n/o[1].max*100+"%")}))}))}(),n("#filter-open","#filter",{overlay:!0}),n(".filter-form__name svg","#filter",{overlay:!0})})();
//# sourceMappingURL=collection.js.map