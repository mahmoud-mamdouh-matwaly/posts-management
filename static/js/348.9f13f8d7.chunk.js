"use strict";(self.webpackChunkpost_management=self.webpackChunkpost_management||[]).push([[348],{1079:function(e,i,l){var t=l(1413),n=l(5987),r=l(7309),a=l(2791),s=l(184),d=["text","onClick","isDisabled","type","loading"],o=function(e){var i=e.text,l=void 0===i?"":i,a=e.onClick,o=e.isDisabled,u=void 0!==o&&o,c=e.type,m=void 0===c?"primary":c,f=e.loading,p=void 0!==f&&f,h=(0,n.Z)(e,d);return(0,s.jsx)(r.ZP,(0,t.Z)((0,t.Z)({type:m,loading:p,onClick:a,disabled:u},h),{},{children:l}))};i.Z=(0,a.memo)(o)},348:function(e,i,l){l.r(i),l.d(i,{default:function(){return Z}});var t=l(1413),n=l(9439),r=l(2791),a=l(177),s=l(7846),d=l(3099),o=l(914),u=l(6106),c=l(1079),m=l(5987),f=l(184),p=["placeholder","label","message","isRequired","name","error","prefix","value","disabled","rule","inputType","suffix"],h=function(e){var i=e.placeholder,l=e.label,n=e.message,r=e.isRequired,d=void 0===r||r,o=e.name,u=e.error,c=e.prefix,h=e.value,x=e.disabled,v=void 0!==x&&x,b=e.rule,Z=e.inputType,g=void 0===Z?"text":Z,y=e.suffix,j=(0,m.Z)(e,p);return(0,f.jsx)(s.Z.Item,(0,t.Z)((0,t.Z)({name:o,label:l,rules:[(0,t.Z)({required:d,message:n},b)],validateStatus:u?"error":"",help:u},j),{},{children:(0,f.jsx)(a.Z,{disabled:v,"data-testid":o,value:null!==h&&void 0!==h?h:"",name:o,placeholder:i,prefix:c,type:g,suffix:y,style:{height:"40px"}})}))},x=(0,r.memo)(h),v=a.Z.TextArea,b=function(e){var i=s.Z.useForm(),l=(0,n.Z)(i,1)[0],a=(0,r.useState)(!0),m=(0,n.Z)(a,2),p=m[0],h=m[1],b=e.postItem,Z=e.handleSubmit,g=void 0===Z?function(){}:Z,y=e.isView,j=void 0!==y&&y;(0,r.useEffect)((function(){b&&l.setFieldsValue(b)}),[b]);var k=(0,r.useCallback)((function(){h(!1)}),[]),C=(0,r.useCallback)((function(){l.validateFields().then((function(e){var i=(0,t.Z)({},e);g(i)})).catch((function(e){e.errorFields.filter((function(e){return e.errors.length})).length}))}),[]);return(0,f.jsxs)(s.Z,{form:l,name:"form",layout:"vertical",onFinish:C,onFieldsChange:k,children:[(0,f.jsxs)(d.Z.Compact,{direction:j?"vertical":"horizontal",block:!0,children:[(0,f.jsx)(o.Z,{flex:"0 1 100%",style:{marginInline:5},children:(0,f.jsx)(x,{placeholder:"title",name:"title",label:"Title",message:"Title is required",disabled:j})}),(0,f.jsx)(o.Z,{flex:"0 1 100%",style:{marginInline:5},children:(0,f.jsx)(s.Z.Item,{name:"body",label:"Descriptions",rules:[{required:!0,message:"Descriptions is required"}],children:(0,f.jsx)(v,{rows:4,disabled:j})})})]}),j?null:(0,f.jsx)(u.Z,{gutter:[10,10],align:"end",children:(0,f.jsx)(c.Z,{type:"primary",htmlType:"submit",text:"Submit",isDisabled:p})})]})},Z=(0,r.memo)(b)}}]);
//# sourceMappingURL=348.9f13f8d7.chunk.js.map