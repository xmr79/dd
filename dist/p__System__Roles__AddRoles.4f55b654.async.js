(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[66],{"8FRr":function(e,t,a){e.exports={suffixttextarea:"antd-pro-components-form-items-input-form-item-input-com-index-suffixttextarea"}},JUQb:function(e,t,a){"use strict";a.r(t);var n=a("0Owb"),r=(a("+L6B"),a("2/Rp")),c=a("k1fw"),i=(a("miYZ"),a("tsqr")),l=(a("y8nQ"),a("Vl3Y")),s=a("tJVT"),o=a("cDcd"),u=a.n(o),d=a("9kvl"),m=a("hh7p"),f=a("oBTY"),p=a("rAM+"),b=(a("ozfa"),a("MJZm")),v=a("vtMR"),h=a.n(v),O=(a("TSYQ"),b["a"].TreeNode),E=function(e,t){var a=[];return e.forEach((function(e){t.includes(e)&&a.push(e)})),!a.length},x=function(e,t){var a,n=function t(n){var r,c=Object(p["a"])(n);try{for(c.s();!(r=c.n()).done;){var i=r.value;if(i.key===e)a=i;else if(i.children.length>0&&(a=t(i.children),a))return a}}catch(l){c.e(l)}finally{c.f()}return a};return n(t),a},y=function e(t,a,n,r){E(a,r)&&(a=a.filter((function(e){return![n].includes(e)})));var c=x(n,t);return c&&c.superior&&(a=e(t,a,c.superior,c.sibling)),a},g=Object(o["forwardRef"])((function(e,t){var a=e.value,n=e.onChange,r=e.dataFuncs,c=void 0===r?[]:r,i=function(e,t){var a=t.node,r=e.checked,i=a.key,l=t.event,s=t.checked,o=a.sibling,u=a.parent,d=a.childs,m=a.arrChilds,p=a.superior,b=a.type;if("API"===b){var v=o.filter((function(e){return i!==e}));"check"===l&&s?(r=[].concat(Object(f["a"])(r),[i],Object(f["a"])(u)),r=r.filter((function(e){return!v.includes(e)}))):r=[].concat(Object(f["a"])(r),Object(f["a"])(v),Object(f["a"])(u))}else"check"===l&&s?r=[].concat(Object(f["a"])(r),Object(f["a"])(d),Object(f["a"])(u)):(r=r.filter((function(e){return!m.includes(e)})),"MENU"===b&&(r=y(c,r,p,o)));r=r.filter((function(e,t,a){return a.indexOf(e)==t})).map((function(e){return e})),n(r)},l=function e(t){return t=t.map((function(t,a){return u.a.createElement(O,t,e(t.children))})),t};return u.a.createElement("div",{className:h.a.treeMain},u.a.createElement(b["a"],{defaultExpandAll:!0,checkable:!0,checkStrictly:!0,treeData:c,checkedKeys:a,onCheck:i},l(c)))})),j=function(e){var t=e.name,a=(e.id,e.label),n=e.dataFuncs,r=e.form;return u.a.createElement("div",null,u.a.createElement(l["a"].Item,{form:r,label:a,name:t,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u89d2\u8272\u6743\u9650"}]},u.a.createElement(g,{dataFuncs:n})))},w=j,k=function(e){e.dataFuncs;var t=e.dispatch,a=e.location.query.id,d=e.roleDetail,f=void 0===d?{}:d,p=e.permissList,b=void 0===p?[]:p,v=Object(o["useState"])(!1),h=Object(s["a"])(v,2),O=h[0],E=h[1],x=l["a"].useForm(),y=Object(s["a"])(x,1),g=y[0],j={labelCol:{span:4},wrapperCol:{span:10}},k=f.isDefault;Object(o["useEffect"])((function(){return t({type:"rolesList/getSaveRoleEchoPermissList"}),a&&t({type:"rolesList/roleDetailsGet",payload:{id:a}}),function(){t({type:"rolesList/changeState",payload:{roleDetail:{}}})}}),[]),Object(o["useEffect"])((function(){g.setFieldsValue(f)}),[f]);var L=function(e){if(!O)return i["b"].error("\u672a\u4fee\u6539\u4efb\u4f55\u4fe1\u606f"),!1;t({type:"rolesList/saveOrUpdateRole",payload:Object(c["a"])(Object(c["a"])({},e),{},{id:a})})};return u.a.createElement("div",null,u.a.createElement(l["a"],Object(n["a"])({},j,{form:g,onFinish:L,initialValues:{permissionList:[]},onValuesChange:function(e){E(!0)}}),u.a.createElement(m["a"],{label:"\u89d2\u8272\u540d\u79f0",name:"name",disabled:1===k,placeholder:"\u8bf7\u8f93\u516510\u5b57\u4ee5\u5185\u7684\u540d\u79f0",max:10}),u.a.createElement(m["a"],{label:"\u89d2\u8272\u63cf\u8ff0",required:!1,name:"desc",placeholder:"\u8bf7\u8f93\u516550\u5b57\u4ee5\u5185\u7684\u63cf\u8ff0",max:50,type:"textArea"}),b.length>0&&u.a.createElement(w,{name:"permissionList",id:a,dataFuncs:b,label:"\u529f\u80fd\u6743\u9650"}),1!==a&&u.a.createElement("div",{className:"FormSavebtn"},u.a.createElement(r["a"],{type:"primary",htmlType:"submit"},"\u4fdd\u5b58"))))},L=function(e){e.global;var t=e.rolesList;return{roleDetail:t.roleDetail,permissList:t.permissList}};t["default"]=Object(d["a"])(L)(k)},gsO7:function(e,t,a){"use strict";a("14J3");var n=a("BMrR"),r=(a("jCWc"),a("kPKH")),c=a("0Owb"),i=(a("5NDa"),a("5rEg")),l=a("cDcd"),s=a.n(l),o=a("8FRr"),u=a.n(o),d=i["a"].TextArea,m=Object(l["forwardRef"])((function(e,t){var a=e.value,l=e.onChange,o=e.placeholder,m=e.max,f=e.type,p=void 0===f?"input":f,b=e.style,v=e.disabled,h=e.defaultLen,O=void 0===h?0:h,E=e.prefix,x=e.extraBtn,y=a?a.substring(0,m):a,g=function(e){var t=e.target.value;l&&l(t)},j=s.a.createElement("span",{style:{lineHeight:"20px"}},y?y.length+O:!y&&O?O:0,"/",O?500:m),w={autoComplete:"off",maxLength:m,placeholder:o,value:a,style:b,onChange:g,disabled:v};return s.a.createElement(n["a"],null,s.a.createElement(r["a"],{span:x?20:24},"input"===p&&s.a.createElement(i["a"],Object(c["a"])({prefix:E},w,{value:y,suffix:j})),"textArea"===p&&s.a.createElement("div",{style:{position:"relative"}},s.a.createElement(d,Object(c["a"])({},w,{rows:4})),s.a.createElement("div",{className:u.a.suffixttextarea},j))),s.a.createElement(r["a"],{span:x?4:0},x))}));t["a"]=m},hh7p:function(e,t,a){"use strict";a("y8nQ");var n=a("Vl3Y"),r=a("0Owb"),c=a("oBTY"),i=a("cDcd"),l=a.n(i),s=a("gsO7"),o=function(e){var t=e.label,a=e.name,i=e.placeholder,o=e.max,u=(e.type,e.rules),d=e.required,m=void 0===d||d,f=e.min,p=void 0===f?0:f,b=e.message,v=e.extra,h=e.wrapperCol,O=e.isTestSpace,E=void 0!==O&&O,x=(e.extraBtn,e.form),y=i||"\u8bf7\u8f93\u5165".concat(t),g=b||y,j=function(e,t){var a=/(^\s+)|(\s+$)|\s+/g;return t&&a.test(t)?Promise.reject("\u4e0d\u80fd\u542b\u6709\u7a7a\u683c"):Promise.resolve()},w=E&&{validator:j},k=u||[{required:m,message:g},{min:p,message:"\u6700\u5c11".concat(p,"\u4e2a\u5b57\u7b26")},{max:o,message:"\u6700\u5927".concat(o,"\u4e2a\u5b57\u7b26")}];return l.a.createElement(n["a"].Item,{form:x,label:t,name:a,extra:v,rules:[].concat(Object(c["a"])(k),[w]),wrapperCol:h},l.a.createElement(s["a"],Object(r["a"])({},e,{placeholder:y})))};t["a"]=o},vtMR:function(e,t,a){e.exports={con:"antd-pro-pages-system-roles-add-roles-permissions-tree-index-con"}}}]);