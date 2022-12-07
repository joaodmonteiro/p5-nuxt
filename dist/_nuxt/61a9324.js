(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{251:function(e,t,n){var content=n(257);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(128).default)("17b291a4",content,!0,{sourceMap:!1})},252:function(e,t,n){"use strict";n.r(t),n.d(t,"main",(function(){return main})),n.d(t,"setText",(function(){return X})),n.d(t,"setOffsetX",(function(){return Y})),n.d(t,"setOffsetY",(function(){return I})),n.d(t,"setTileSize",(function(){return P})),n.d(t,"setSampleSize",(function(){return R})),n.d(t,"setCanvasSize",(function(){return E})),n.d(t,"setColour",(function(){return N})),n.d(t,"downloadImage",(function(){return A})),n.d(t,"drawText",(function(){return j})),n.d(t,"drawTiles",(function(){return M}));n(253);var o,r,text,l,c,canvas,d=25,f=25,v=0,m=0,h=1025,x=768,z=50,S=255,w=100,_=0,y=3,C=8,T=!1,k=!1;function main(e){(o=e).disableFriendlyErrors=!0,o.setup=function(e){(canvas=o.createCanvas(h,x)).parent("container"),r=o.createP(""),l=o.createGraphics(h,x),c=o.createGraphics(h,x),canvas.mouseReleased((function(){o.mouseX<h&&o.mouseY<x&&(k=!k)}))},o.draw=function(e){r.html("FPS: "+o.floor(o.frameRate())),o.clear(),k||(j(),M()),o.image(c,0,0)}}function X(e){text=e,j()}function Y(e){v=e}function I(e){m=e}function P(e){f=parseInt(e)}function R(e){d=parseInt(e)}function E(e,t){console.log(e)}function N(e){T=e}function A(){o.saveCanvas(canvas,"yes","jpg")}var W=function(e,t){return Math.floor(e/t)*t};function j(){l.clear(),l.textSize(100),l.textAlign(o.CENTER,o.CENTER),l.background(0),T?(l.fill(z,S,w),z=255*o.noise(_),S=255*o.noise(y),w=255*o.noise(C)):l.fill(255),_+=.002,y+=.002,C+=.002,l.text(text,0,0,h,x)}function M(){c.clear();o.createImage(h,x);c.background(0);for(var e=0;e<x;e+=f)for(var t=0;t<h;t+=f){var source={x:W(t,d),y:W(e,d)},n={x:o.mouseX,y:o.mouseY};v=(t-512.5)/h*(40*d*-(n.x/512.5-1)),m=(e-384)/x*(40*d*-(n.y/384-1)),c.image(l,t,e,f,f,source.x+v,source.y+m,d,d),d/h*1e-5,d/x*1e-5}}},256:function(e,t,n){"use strict";n(251)},257:function(e,t,n){var o=n(127)(!1);o.push([e.i,"main{display:flex;flex-direction:column;align-items:center}#container{border:1px solid #000;display:flex;justify-content:center;width:1025px}",""]),e.exports=o},258:function(e,t,n){"use strict";n.r(t);n(103),n(58),n(74);var canvas=n(252),o={name:"IndexPage",data:function(){return{text:"",tileSize:25,sampleSize:25,shouldWait:!1,canvasX:0,canvasY:0,colour:!1}},computed:{},mounted:function(){new(n(255))(canvas.main),this.handleResize(),window.addEventListener("resize",this.handleResize)},beforeDestroy:function(){},watch:{text:function(){canvas.setText(this.text)},tileSize:function(){canvas.setTileSize(this.tileSize)},sampleSize:function(){canvas.setSampleSize(this.sampleSize)},canvasX:function(){canvas.setCanvasSize(this.canvasX,this.canvasY)},canvasY:function(){canvas.setCanvasSize(this.canvasX,this.canvasY)},colour:function(){canvas.setColour(this.colour)}},methods:{throttle:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250;return function(){t.shouldWait||(e.apply(void 0,arguments),t.shouldWait=!0,setTimeout((function(){t.shouldWait=!1}),n))}},handleResize:function(){this.canvasX=window.innerWidth,this.canvasY=window.innerHeight-200},download:function(){canvas.downloadImage()}}},r=o,l=(n(256),n(56)),component=Object(l.a)(r,(function(){var e=this,t=e._self._c;return t("main",[t("div",{attrs:{id:"container"}}),e._v(" "),t("div",{staticClass:"controls"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],attrs:{type:"text"},domProps:{value:e.text},on:{input:function(t){t.target.composing||(e.text=t.target.value)}}}),e._v(" "),t("label",{attrs:{for:"tileSize"}},[e._v("Tile Size")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.tileSize,expression:"tileSize"}],attrs:{type:"range",min:"4",max:"50",value:"25"},domProps:{value:e.tileSize},on:{__r:function(t){e.tileSize=t.target.value}}}),e._v(" "),t("label",{attrs:{for:"sampleSize"}},[e._v("Sample Size")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.sampleSize,expression:"sampleSize"}],attrs:{type:"range",min:"25",max:"50",value:"25"},domProps:{value:e.sampleSize},on:{__r:function(t){e.sampleSize=t.target.value}}}),e._v(" "),t("label",{attrs:{for:"colour"}},[e._v("Colour")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.colour,expression:"colour"}],attrs:{type:"checkbox",id:"colour"},domProps:{checked:Array.isArray(e.colour)?e._i(e.colour,null)>-1:e.colour},on:{change:function(t){var n=e.colour,o=t.target,r=!!o.checked;if(Array.isArray(n)){var l=e._i(n,null);o.checked?l<0&&(e.colour=n.concat([null])):l>-1&&(e.colour=n.slice(0,l).concat(n.slice(l+1)))}else e.colour=r}}}),e._v(" "),t("button",{on:{click:e.download}},[e._v("Download Image")])])])}),[],!1,null,null,null);t.default=component.exports}}]);