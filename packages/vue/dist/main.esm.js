const t=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,e="[a-zA-Z_][\\-\\.0-9_a-zA-Z]*",n=`((?:${e}\\:)?${e})`,r=new RegExp(`^<${n}`),s=/^\s*(\/?)>/,l=new RegExp(`^<\\/${n}[^>]*>`),i=/\{\{((?:.|\r?\n)+?)\}\}/g,a=t=>{let{children:e}=t||[];return`${e.map((t=>(t=>{if(1===t.type)return p(t);{let e=t.text;if(!i.test(e))return`_v(${JSON.stringify(e)})`;let n,r=i.lastIndex=0,s=[];for(;n=i.exec(e);){let t=n.index;t>r&&s.push(JSON.stringify(e.slice(r,t))),s.push(`_s(${n[1].trim()})`),r=t+n[0].length}return r<e.length&&s.push(JSON.stringify(e.splice(r))),`_v(${s.join("+")})`}})(t))).join(",")}`},p=t=>{let e=a(t);return`_c('${t.tag}'${t.attrs.length>0?(t=>{let e="";return t.map((({key:t,value:n})=>{if("style"===t){let t={};n.split(";").map((e=>{let[n,r]=e.split(":");t[n]=r})),n=t}e+=`${t}:${JSON.stringify(n)},`})),e.slice(0,-1)})(t.attrs):""}${t.children.length>0?`,${e}`:""})`};!function(e){let n=(e=>{const n=[];let i,a;const p=t=>{e=e.substring(t)},c=()=>{const n=e.match(r);if(n){const r={tag:[n[1]],attrs:[]};let l,i;for(p(n[0].length);!(l=e.match(s))&&(i=e.match(t));)p(i[0].length),r.attrs.push({key:i[1],value:i[3]||i[4]||i[5]||!0});return l&&p(l[0].length),r}return!1},h=(t,e)=>{const r=((t,e)=>({tag:t,attrs:e,children:[],parent:null,type:1}))(t,e);a||(a=r),i&&(r.parent=i,i.children.push(r)),n.push(r),i=r},g=t=>{(t=t.replace(/\s/g,""))&&i.children.push({type:3,parent:i,text:t})};for(;e;){let t=e.indexOf("<");if(0===t){const t=e.match(l);if(t){p(t[0].length),t[1],n.pop(),i=n[n.length-1];continue}const r=c();if(r){h(r.tag,r.attrs);continue}}if(t>0){let n=e.substring(0,t);n&&(g(n),p(n.length))}}return a})(e);p(n)}('<div id="root" style="color: red; margin-top: 20px">{{yedi}} <span>秋天的第一个offer</span>{{leyo}}</div>');
//# sourceMappingURL=main.esm.js.map
