(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[75],{GG8e:function(e,t,n){"use strict";n.r(t);n("+L6B");var a=n("2/Rp"),c=(n("sRBo"),n("kaz8")),r=(n("5NDa"),n("5rEg")),o=n("k1fw"),l=(n("y8nQ"),n("Vl3Y")),i=n("tJVT"),u=n("cDcd"),s=n.n(u),d=n("9kvl"),p=n("UpgG"),f=n("icOD"),m=n("FUFs"),b=n("fi9c"),h=(n("Y408"),n("mGA/")),v=n.n(h),k=n("5VlT"),y=n.n(k),x=n("uYtH"),g=n("TSYQ"),E=n.n(g),O=n("jBtN"),C=[{text:"\u4f01\u4e1a\u6ce8\u518c",key:"COMPANY"},{text:"\u4e13\u5bb6\u6ce8\u518c",key:"EXPERT"}],j=function(e){var t=e.dispatch,n=e.loading,d=l["a"].useForm(),h=Object(i["a"])(d,1),k=h[0],g=k.getFieldValue,j=(k.validateFields,k.isFieldValidating,Object(u["useState"])("COMPANY")),N=Object(i["a"])(j,2),w=N[0],P=N[1],F=Object(u["useState"])(!1),K=Object(i["a"])(F,2),V=K[0],S=K[1],I=function(e,t){return t&&t!==g("password")?Promise.reject("\u60a8\u8f93\u5165\u7684\u4e24\u6b21\u5bc6\u7801\u4e0d\u540c!"):Promise.resolve()},Y=function(e){var n=Object(o["a"])(Object(o["a"])({},e),{},{type:w,stepNumber:1,confirmFlag:V?"Y":"N"});t({type:"user/register",payload:n})};return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:y.a.main},s.a.createElement("div",{className:v.a.tabs},C.map((function(e,t){return s.a.createElement("div",{className:E()(v.a.item,e.key===w?v.a.active:""),key:t,onClick:function(){P(e.key)}},e.text)}))),s.a.createElement(l["a"],{form:k,initialValues:{prefix:"86"},onFinish:Y},s.a.createElement(m["a"],{name:"mobile",prefix:s.a.createElement(O["d"],{type:"icon-shouji"})}),s.a.createElement(l["a"].Item,{name:"code",rules:[{required:!0,message:"\u8f93\u5165\u9a8c\u8bc1\u7801"}]},s.a.createElement("div",{className:v.a.sendcon},s.a.createElement(r["a"],{prefix:s.a.createElement(O["d"],{type:"icon-yanzhengma"}),className:"mr-10",placeholder:"\u8f93\u5165\u9a8c\u8bc1\u7801"}),s.a.createElement(p["a"],{form:k,phoneName:"mobile",type:0}))),s.a.createElement(b["a"],{name:"username",prefix:s.a.createElement(O["d"],{type:"icon-zhanghao"})}),s.a.createElement(f["a"],{prefix:s.a.createElement(O["d"],{type:"icon-mima"})}),s.a.createElement(l["a"].Item,{name:"comfirmPassword",rules:[{required:!0,message:"\u786e\u8ba4\u5bc6\u7801"},{validator:I}]},s.a.createElement(r["a"].Password,{prefix:s.a.createElement(O["d"],{type:"icon-mima"}),autoComplete:"off",visibilityToggle:!1,placeholder:"\u786e\u8ba4\u5bc6\u7801"})),s.a.createElement(c["a"],{onChange:function(e){S(e.target.checked)}},s.a.createElement("span",null,"\u6211\u5df2\u9605\u8bfb\u5e76\u540c\u610f",s.a.createElement("a",{target:"_blank",href:"/other/cms?code=".concat("COMPANY"===w?"AGREEMENT_ORGAN":"AGREEMENT_EXPERT")},"\u300a\u5165\u9a7b\u534f\u8bae\u300b"))),s.a.createElement("div",{className:y.a.loginbtn},s.a.createElement(a["a"],{disabled:!V,loading:n,type:"primary",htmlType:"submit",block:!0},"\u6ce8\u518c")),s.a.createElement("div",null,s.a.createElement(x["a"],{to:"/user/login"},s.a.createElement(a["a"],{type:"link",block:!0},"\u5df2\u6709\u8d26\u53f7\uff1f\u524d\u5f80\u767b\u5f55"))))))};t["default"]=Object(d["a"])((function(e){var t=e.loading;return{loading:t.effects["user/register"]}}))(j)},KCY9:function(e,t,n){e.exports={"ant-checkbox":"ant-checkbox","ant-checkbox-wrapper":"ant-checkbox-wrapper","ant-checkbox-inner":"ant-checkbox-inner","ant-checkbox-input":"ant-checkbox-input","ant-checkbox-checked":"ant-checkbox-checked",antCheckboxEffect:"antCheckboxEffect","ant-checkbox-disabled":"ant-checkbox-disabled",none:"none","ant-checkbox-wrapper-disabled":"ant-checkbox-wrapper-disabled","ant-checkbox-group":"ant-checkbox-group","ant-checkbox-group-item":"ant-checkbox-group-item","ant-checkbox-indeterminate":"ant-checkbox-indeterminate","ant-checkbox-rtl":"ant-checkbox-rtl","ant-checkbox-group-rtl":"ant-checkbox-group-rtl"}},kaz8:function(e,t,n){"use strict";var a=n("lSNA"),c=n.n(a),r=n("pVnL"),o=n.n(r),l=n("cDcd"),i=n("TSYQ"),u=n.n(i),s=n("x1Ya"),d=n("RIqP"),p=n.n(d),f=n("J4zp"),m=n.n(f),b=n("6UMo"),h=n("H84U"),v=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},k=l["createContext"](null),y=function(e){var t=e.defaultValue,n=e.children,a=e.options,r=void 0===a?[]:a,i=e.prefixCls,s=e.className,d=e.style,f=e.onChange,y=v(e,["defaultValue","children","options","prefixCls","className","style","onChange"]),x=l["useContext"](h["b"]),g=x.getPrefixCls,E=x.direction,O=l["useState"](y.value||t||[]),C=m()(O,2),N=C[0],w=C[1],P=l["useState"]([]),F=m()(P,2),K=F[0],V=F[1];l["useEffect"]((function(){"value"in y&&w(y.value||[])}),[y.value]);var S=function(){return r.map((function(e){return"string"===typeof e?{label:e,value:e}:e}))},I=function(e){V((function(t){return t.filter((function(t){return t!==e}))}))},Y=function(e){V((function(t){return[].concat(p()(t),[e])}))},M=function(e){var t=N.indexOf(e.value),n=p()(N);if(-1===t?n.push(e.value):n.splice(t,1),"value"in y||w(n),f){var a=S();f(n.filter((function(e){return-1!==K.indexOf(e)})).sort((function(e,t){var n=a.findIndex((function(t){return t.value===e})),c=a.findIndex((function(e){return e.value===t}));return n-c})))}},T=g("checkbox",i),B="".concat(T,"-group"),D=Object(b["a"])(y,["value","disabled"]);r&&r.length>0&&(n=S().map((function(e){return l["createElement"](j,{prefixCls:T,key:e.value.toString(),disabled:"disabled"in e?e.disabled:y.disabled,value:e.value,checked:-1!==N.indexOf(e.value),onChange:e.onChange,className:"".concat(B,"-item"),style:e.style},e.label)})));var R={toggleOption:M,value:N,disabled:y.disabled,name:y.name,registerValue:Y,cancelValue:I},U=u()(B,c()({},"".concat(B,"-rtl"),"rtl"===E),s);return l["createElement"]("div",o()({className:U,style:d},D),l["createElement"](k.Provider,{value:R},n))},x=l["memo"](y),g=n("uaoM"),E=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},O=function(e,t){var n,a=e.prefixCls,r=e.className,i=e.children,d=e.indeterminate,p=void 0!==d&&d,f=e.style,m=e.onMouseEnter,b=e.onMouseLeave,v=E(e,["prefixCls","className","children","indeterminate","style","onMouseEnter","onMouseLeave"]),y=l["useContext"](h["b"]),x=y.getPrefixCls,O=y.direction,C=l["useContext"](k),j=l["useRef"](v.value);l["useEffect"]((function(){null===C||void 0===C||C.registerValue(v.value),Object(g["a"])("checked"in v||!!C||!("value"in v),"Checkbox","`value` is not a valid prop, do you mean `checked`?")}),[]),l["useEffect"]((function(){return v.value!==j.current&&(null===C||void 0===C||C.cancelValue(j.current),null===C||void 0===C||C.registerValue(v.value)),function(){return null===C||void 0===C?void 0:C.cancelValue(v.value)}}),[v.value]);var N=x("checkbox",a),w=o()({},v);C&&(w.onChange=function(){v.onChange&&v.onChange.apply(v,arguments),C.toggleOption&&C.toggleOption({label:i,value:v.value})},w.name=C.name,w.checked=-1!==C.value.indexOf(v.value),w.disabled=v.disabled||C.disabled);var P=u()((n={},c()(n,"".concat(N,"-wrapper"),!0),c()(n,"".concat(N,"-rtl"),"rtl"===O),c()(n,"".concat(N,"-wrapper-checked"),w.checked),c()(n,"".concat(N,"-wrapper-disabled"),w.disabled),n),r),F=u()(c()({},"".concat(N,"-indeterminate"),p));return l["createElement"]("label",{className:P,style:f,onMouseEnter:m,onMouseLeave:b},l["createElement"](s["a"],o()({},w,{prefixCls:N,className:F,ref:t})),void 0!==i&&l["createElement"]("span",null,i))},C=l["forwardRef"](O);C.displayName="Checkbox";var j=C,N=j;N.Group=x,N.__ANT_CHECKBOX=!0;t["a"]=N},sRBo:function(e,t,n){"use strict";n("cIOH"),n("KCY9")},x1Ya:function(e,t,n){"use strict";var a=n("wx14"),c=n("rePB"),r=n("Ff2n"),o=n("VTBJ"),l=n("1OyB"),i=n("vuIU"),u=n("Ji7U"),s=n("LK+K"),d=n("cDcd"),p=n.n(d),f=n("TSYQ"),m=n.n(f),b=function(e){Object(u["a"])(n,e);var t=Object(s["a"])(n);function n(e){var a;Object(l["a"])(this,n),a=t.call(this,e),a.handleChange=function(e){var t=a.props,n=t.disabled,c=t.onChange;n||("checked"in a.props||a.setState({checked:e.target.checked}),c&&c({target:Object(o["a"])(Object(o["a"])({},a.props),{},{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},a.saveInput=function(e){a.input=e};var c="checked"in e?e.checked:e.defaultChecked;return a.state={checked:c},a}return Object(i["a"])(n,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.prefixCls,o=t.className,l=t.style,i=t.name,u=t.id,s=t.type,d=t.disabled,f=t.readOnly,b=t.tabIndex,h=t.onClick,v=t.onFocus,k=t.onBlur,y=t.onKeyDown,x=t.onKeyPress,g=t.onKeyUp,E=t.autoFocus,O=t.value,C=t.required,j=Object(r["a"])(t,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","onKeyDown","onKeyPress","onKeyUp","autoFocus","value","required"]),N=Object.keys(j).reduce((function(e,t){return"aria-"!==t.substr(0,5)&&"data-"!==t.substr(0,5)&&"role"!==t||(e[t]=j[t]),e}),{}),w=this.state.checked,P=m()(n,o,(e={},Object(c["a"])(e,"".concat(n,"-checked"),w),Object(c["a"])(e,"".concat(n,"-disabled"),d),e));return p.a.createElement("span",{className:P,style:l},p.a.createElement("input",Object(a["a"])({name:i,id:u,type:s,required:C,readOnly:f,disabled:d,tabIndex:b,className:"".concat(n,"-input"),checked:!!w,onClick:h,onFocus:v,onBlur:k,onKeyUp:g,onKeyDown:y,onKeyPress:x,onChange:this.handleChange,autoFocus:E,ref:this.saveInput,value:O},N)),p.a.createElement("span",{className:"".concat(n,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"checked"in e?Object(o["a"])(Object(o["a"])({},t),{},{checked:e.checked}):null}}]),n}(d["Component"]);b.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){},onKeyDown:function(){},onKeyPress:function(){},onKeyUp:function(){}},t["a"]=b}}]);