/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 8 17:37
*/
KISSY.add("event/dom/touch/gesture",function(i,g){var f=g.Gesture,d=i.Features,b,a,c;d.isTouchSupported?(b="touchstart",a="touchmove",c="touchend"):d.isMsPointerEnabled&&(b="MSPointerDown",a="MSPointerMove",c="MSPointerUp");b&&(f.start=b,f.move=a,f.end=c,f.tap="tap");return f},{requires:["event/dom/base"]});KISSY.add("event/dom/touch/handle-map",function(){return{}});
KISSY.add("event/dom/touch/handle",function(i,g,f,d,b){function a(e){this.doc=e;this.eventHandle={};this.init()}var c=i.guid("touch-handle"),k=i.Features,j={};j[b.start]="onTouchStart";j[b.move]="onTouchMove";j[b.end]="onTouchEnd";"mousedown"!==b.start&&(j.touchcancel="onTouchEnd");a.prototype={init:function(){var e=this.doc,h,a;this.onTouchMove=i.throttle(this.onTouchMove,30);for(h in j){a=j[h];d.on(e,h,this[a],this)}},normalize:function(e){var h=e.type,a;if(!k.isTouchSupported){if(h.indexOf("mouse")!=
-1&&e.which!=1)return;a=[e];h=!h.match(/up$/i);e.touches=h?a:[];e.targetTouches=h?a:[];e.changedTouches=a}return e},onTouchStart:function(e){var a,c;for(a in this.eventHandle){c=this.eventHandle[a];c.isActive=true}this.callEventHandle("onTouchStart",e)},onTouchMove:function(e){this.callEventHandle("onTouchMove",e)},onTouchEnd:function(e){this.callEventHandle("onTouchEnd",e)},callEventHandle:function(e,a){var c,b;if(a=this.normalize(a))for(c in this.eventHandle){b=this.eventHandle[c];if(b.isActive&&
b[e](a)===false)b.isActive=false}},addEventHandle:function(a){this.eventHandle[a]||(this.eventHandle[a]=new f[a])},removeEventHandle:function(a){delete this.eventHandle[a]},destroy:function(){var a=this.doc,c,b;for(c in j){b=j[c];d.detach(a,c,this[b],this)}}};return{addDocumentHandle:function(e,b){var d=g._getWin(e.ownerDocument||e).document,f=g.data(d,c);f||g.data(d,c,f=new a(d));f.addEventHandle(b)},removeDocumentHandle:function(a,b){var d=g._getWin(a.ownerDocument||a).document,f=g.data(d,c);if(f){f.removeEventHandle(b);
if(i.isEmptyObject(eventHandle)){f.destroy();g.removeData(d,c)}}}}},{requires:"dom,./handle-map,event/dom/base,./gesture,./tap,./swipe".split(",")});
KISSY.add("event/dom/touch/swipe",function(i,g,f){function d(){this.event=b}var b="swipe";d.prototype={onTouchStart:function(a){var c=a.touches;if(1<c.length)return!1;c=c[0];this.startTime=a.timeStamp;this.isVertical=this.isHorizontal=1;this.startX=c.pageX;this.startY=c.pageY;-1!=a.type.indexOf("mouse")&&a.preventDefault()},onTouchMove:function(a){var c=a.changedTouches[0],b=c.pageY,c=Math.abs(c.pageX-this.startX),b=Math.abs(b-this.startY);if(1E3<a.timeStamp-this.startTime)return!1;this.isVertical&&
35<c&&(this.isVertical=0);this.isHorizontal&&35<b&&(this.isHorizontal=0);if(!this.isHorizontal&&!this.isVertical)return!1},onTouchEnd:function(a){if(!1===this.onTouchMove(a))return!1;var b=a.changedTouches[0],d=b.pageX-this.startX,g=b.pageY-this.startY,e=Math.abs(d),h=Math.abs(g);this.isVertical&&50>h&&(this.isVertical=0);this.isHorizontal&&50>e&&(this.isHorizontal=0);if(this.isHorizontal)d=0>d?"left":"right";else if(this.isVertical)d=0>g?"up":"down",e=h;else return!1;f.fire(a.target,this.event,{touch:b,
direction:d,distance:e,duration:a.timeStamp-this.startTime})}};return g[b]=d},{requires:["./handle-map","event/dom/base"]});KISSY.add("event/dom/touch/tap",function(i,g,f){function d(){}d.prototype={onTouchStart:function(b){if(1<b.touches.length)return!1},onTouchMove:function(){return!1},onTouchEnd:function(b){f.fire(b.target,"tap",b)}};return g.tap=d},{requires:["./handle-map","event/dom/base"]});
KISSY.add("event/dom/touch",function(i,g,f,d){var i=g._Special,g={setup:function(a){d.addDocumentHandle(this,a)},tearDown:function(a){d.removeDocumentHandle(this,a)}},b;for(b in f)i[b]=g},{requires:["event/dom/base","./touch/handle-map","./touch/handle"]});