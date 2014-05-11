(function(){!function(t){function e(){try{return r in t&&t[r]}catch(e){return!1}}function o(t){return function(){var e=Array.prototype.slice.call(arguments,0);e.unshift(l),c.appendChild(l),l.addBehavior("#default#userData"),l.load(r);var o=t.apply(i,e);return c.removeChild(l),o}}function n(t){return t.replace(/^d/,"___$&").replace(p,"___")}var i={},a=t.document,r="localStorage",s="script",l;if(i.disabled=!1,i.set=function(t,e){},i.get=function(t){},i.remove=function(t){},i.clear=function(){},i.transact=function(t,e,o){var n=i.get(t);null==o&&(o=e,e=null),"undefined"==typeof n&&(n=e||{}),o(n),i.set(t,n)},i.getAll=function(){},i.forEach=function(){},i.serialize=function(t){return JSON.stringify(t)},i.deserialize=function(t){if("string"!=typeof t)return void 0;try{return JSON.parse(t)}catch(e){return t||void 0}},e())l=t[r],i.set=function(t,e){return void 0===e?i.remove(t):(l.setItem(t,i.serialize(e)),e)},i.get=function(t){return i.deserialize(l.getItem(t))},i.remove=function(t){l.removeItem(t)},i.clear=function(){l.clear()},i.getAll=function(){var t={};return i.forEach(function(e,o){t[e]=o}),t},i.forEach=function(t){for(var e=0;e<l.length;e++){var o=l.key(e);t(o,i.get(o))}};else if(a.documentElement.addBehavior){var c,d;try{d=new ActiveXObject("htmlfile"),d.open(),d.write("<"+s+">document.w=window</"+s+'><iframe src="/favicon.ico"></iframe>'),d.close(),c=d.w.frames[0].document,l=c.createElement("div")}catch(u){l=a.createElement("div"),c=a.body}var p=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^{|}~]","g");i.set=o(function(t,e,o){return e=n(e),void 0===o?i.remove(e):(t.setAttribute(e,i.serialize(o)),t.save(r),o)}),i.get=o(function(t,e){return e=n(e),i.deserialize(t.getAttribute(e))}),i.remove=o(function(t,e){e=n(e),t.removeAttribute(e),t.save(r)}),i.clear=o(function(t){var e=t.XMLDocument.documentElement.attributes;t.load(r);for(var o=0,n;n=e[o];o++)t.removeAttribute(n.name);t.save(r)}),i.getAll=function(t){var e={};return i.forEach(function(t,o){e[t]=o}),e},i.forEach=o(function(t,e){for(var o=t.XMLDocument.documentElement.attributes,n=0,a;a=o[n];++n)e(a.name,i.deserialize(t.getAttribute(a.name)))})}try{var h="__storejs__";i.set(h,h),i.get(h)!=h&&(i.disabled=!0),i.remove(h)}catch(u){i.disabled=!0}i.enabled=!i.disabled,"undefined"!=typeof module&&module.exports&&this.module!==module?module.exports=i:"function"==typeof define&&define.amd?define(i):t.store=i}(Function("return this")()),function(t,e){e.Google=e.Class.extend({includes:e.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",opacity:1,continuousWorld:!1,noWrap:!1,mapOptions:{backgroundColor:"#dddddd"}},initialize:function(o,n){e.Util.setOptions(this,n),this._ready=void 0!==t.maps.Map,this._ready||e.Google.asyncWait.push(this),this._type=o||"SATELLITE"},onAdd:function(t,o){this._map=t,this._insertAtTheBottom=o,this._initContainer(),this._initMapObject(),t.on("viewreset",this._resetCallback,this),this._limitedUpdate=e.Util.limitExecByInterval(this._update,150,this),t.on("move",this._update,this),t.on("zoomanim",this._handleZoomAnim,this),t._controlCorners.bottomright.style.marginBottom="20px",this._reset(),this._update()},onRemove:function(t){this._map._container.removeChild(this._container),this._map.off("viewreset",this._resetCallback,this),this._map.off("move",this._update,this),this._map.off("zoomanim",this._handleZoomAnim,this),t._controlCorners.bottomright.style.marginBottom="0em"},getAttribution:function(){return this.options.attribution},setOpacity:function(t){this.options.opacity=t,1>t&&e.DomUtil.setOpacity(this._container,t)},setElementSize:function(t,e){t.style.width=e.x+"px",t.style.height=e.y+"px"},_initContainer:function(){var t=this._map._container,o=t.firstChild;this._container||(this._container=e.DomUtil.create("div","leaflet-google-layer leaflet-top leaflet-left"),this._container.id="_GMapContainer_"+e.Util.stamp(this),this._container.style.zIndex="auto"),t.insertBefore(this._container,o),this.setOpacity(this.options.opacity),this.setElementSize(this._container,this._map.getSize())},_initMapObject:function(){if(this._ready){this._google_center=new t.maps.LatLng(0,0);var e=new t.maps.Map(this._container,{center:this._google_center,zoom:0,tilt:0,mapTypeId:t.maps.MapTypeId[this._type],disableDefaultUI:!0,keyboardShortcuts:!1,draggable:!1,disableDoubleClickZoom:!0,scrollwheel:!1,streetViewControl:!1,styles:this.options.mapOptions.styles,backgroundColor:this.options.mapOptions.backgroundColor}),o=this;this._reposition=t.maps.event.addListenerOnce(e,"center_changed",function(){o.onReposition()}),this._google=e,t.maps.event.addListenerOnce(e,"idle",function(){o._checkZoomLevels()})}},_checkZoomLevels:function(){this._google.getZoom()!==this._map.getZoom()&&this._map.setZoom(this._google.getZoom())},_resetCallback:function(t){this._reset(t.hard)},_reset:function(t){this._initContainer()},_update:function(e){if(this._google){this._resize();var o=e&&e.latlng?e.latlng:this._map.getCenter(),n=new t.maps.LatLng(o.lat,o.lng);this._google.setCenter(n),this._google.setZoom(this._map.getZoom()),this._checkZoomLevels()}},_resize:function(){var t=this._map.getSize();(this._container.style.width!==t.x||this._container.style.height!==t.y)&&(this.setElementSize(this._container,t),this.onReposition())},_handleZoomAnim:function(e){var o=e.center,n=new t.maps.LatLng(o.lat,o.lng);this._google.setCenter(n),this._google.setZoom(e.zoom)},onReposition:function(){this._google&&t.maps.event.trigger(this._google,"resize")}}),e.Google.asyncWait=[],e.Google.asyncInitialize=function(){var t;for(t=0;t<e.Google.asyncWait.length;t++){var o=e.Google.asyncWait[t];o._ready=!0,o._container&&(o._initMapObject(),o._update())}e.Google.asyncWait=[]}}(window.google,L),L.Control.Locate=L.Control.extend({options:{position:"topleft",drawCircle:!0,follow:!1,stopFollowingOnDrag:!1,circleStyle:{color:"#136AEC",fillColor:"#136AEC",fillOpacity:.15,weight:2,opacity:.5},markerStyle:{color:"#136AEC",fillColor:"#2A93EE",fillOpacity:.7,weight:2,opacity:.9,radius:5},followCircleStyle:{},followMarkerStyle:{},icon:"fa fa-location-arrow",iconLoading:"fa fa-spinner animate-spin",circlePadding:[0,0],metric:!0,onLocationError:function(t){alert(t.message)},onLocationOutsideMapBounds:function(t){t.stopLocate(),alert(context.options.strings.outsideMapBoundsMsg)},setView:!0,keepCurrentZoomLevel:!1,strings:{title:"Show me where I am",popup:"You are within {distance} {unit} from this point",outsideMapBoundsMsg:"You seem located outside the boundaries of the map"},locateOptions:{maxZoom:1/0,watch:!0}},onAdd:function(t){var e=L.DomUtil.create("div","leaflet-control-locate leaflet-bar leaflet-control"),o=this;this._layer=new L.LayerGroup,this._layer.addTo(t),this._event=void 0,this._locateOptions=this.options.locateOptions,L.extend(this._locateOptions,this.options.locateOptions),L.extend(this._locateOptions,{setView:!1});var n={};L.extend(n,this.options.markerStyle,this.options.followMarkerStyle),this.options.followMarkerStyle=n,n={},L.extend(n,this.options.circleStyle,this.options.followCircleStyle),this.options.followCircleStyle=n;var i=L.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single",e);this.icon=L.DomUtil.create("i",this.options.icon,i),L.DomEvent.on(e,"click",L.DomEvent.stopPropagation).on(e,"click",L.DomEvent.preventDefault).on(e,"click",function(){o._active&&(void 0===o._event||t.getBounds().contains(o._event.latlng)||!o.options.setView||c())?h():a()}).on(e,"dblclick",L.DomEvent.stopPropagation);var a=function(){o.options.setView&&(o._locateOnNextLocationFound=!0),o._active||t.locate(o._locateOptions),o._active=!0,o.options.follow&&s(),o._event?d():u("requesting")},r=function(t){o._event&&o._event.latlng.lat===t.latlng.lat&&o._event.latlng.lng===t.latlng.lng&&o._event.accuracy===t.accuracy||o._active&&(o._event=t,o.options.follow&&o._following&&(o._locateOnNextLocationFound=!0),d())},s=function(){t.fire("startfollowing",o),o._following=!0,o.options.stopFollowingOnDrag&&t.on("dragstart",l)},l=function(){t.fire("stopfollowing",o),o._following=!1,o.options.stopFollowingOnDrag&&t.off("dragstart",l),d()},c=function(){return void 0===o._event?!1:t.options.maxBounds&&!t.options.maxBounds.contains(o._event.latlng)},d=function(){void 0===o._event.accuracy&&(o._event.accuracy=0);var e=o._event.accuracy;o._locateOnNextLocationFound&&(c()?o.options.onLocationOutsideMapBounds(o):t.fitBounds(o._event.bounds,{padding:o.options.circlePadding,maxZoom:o.options.keepCurrentZoomLevel?t.getZoom():o._locateOptions.maxZoom}),o._locateOnNextLocationFound=!1);var n,i;if(o.options.drawCircle)if(n=o._following?o.options.followCircleStyle:o.options.circleStyle,o._circle){o._circle.setLatLng(o._event.latlng).setRadius(e);for(i in n)o._circle.options[i]=n[i]}else o._circle=L.circle(o._event.latlng,e,n).addTo(o._layer);var a,r;o.options.metric?(a=e.toFixed(0),r="meters"):(a=(3.2808399*e).toFixed(0),r="feet");var s;s=o._following?o.options.followMarkerStyle:o.options.markerStyle;var l=o.options.strings.popup;if(o._circleMarker){o._circleMarker.setLatLng(o._event.latlng).bindPopup(L.Util.template(l,{distance:a,unit:r}))._popup.setLatLng(o._event.latlng);for(i in s)o._circleMarker.options[i]=s[i]}else o._circleMarker=L.circleMarker(o._event.latlng,s).bindPopup(L.Util.template(l,{distance:a,unit:r})).addTo(o._layer);o._container&&u(o._following?"following":"active")},u=function(t){"requesting"==t?(L.DomUtil.removeClasses(o._container,"active following"),L.DomUtil.addClasses(o._container,"requesting"),L.DomUtil.removeClasses(o.icon,o.options.icon),L.DomUtil.addClasses(o.icon,o.options.iconLoading)):"active"==t?(L.DomUtil.removeClasses(o._container,"requesting following"),L.DomUtil.addClasses(o._container,"active"),L.DomUtil.removeClasses(o.icon,o.options.iconLoading),L.DomUtil.addClasses(o.icon,o.options.icon)):"following"==t&&(L.DomUtil.removeClasses(o._container,"requesting"),L.DomUtil.addClasses(o._container,"active following"),L.DomUtil.removeClasses(o.icon,o.options.iconLoading),L.DomUtil.addClasses(o.icon,o.options.icon))},p=function(){o._active=!1,o._locateOnNextLocationFound=o.options.setView,o._following=!1};p();var h=function(){t.stopLocate(),t.off("dragstart",l),o.options.follow&&o._following&&l(),L.DomUtil.removeClass(o._container,"requesting"),L.DomUtil.removeClass(o._container,"active"),L.DomUtil.removeClass(o._container,"following"),p(),o._layer.clearLayers(),o._circleMarker=void 0,o._circle=void 0},f=function(t){3==t.code&&o._locateOptions.watch||(h(),o.options.onLocationError(t))};return t.on("locationfound",r,o),t.on("locationerror",f,o),this.locate=a,this.stopLocate=h,this.stopFollowing=l,e}}),L.Map.addInitHook(function(){this.options.locateControl&&(this.locateControl=L.control.locate(),this.addControl(this.locateControl))}),L.control.locate=function(t){return new L.Control.Locate(t)},function(){var t=function(t,e,o){o=o.split(" "),o.forEach(function(o){L.DomUtil[t].call(this,e,o)})};L.DomUtil.addClasses=function(e,o){t("addClass",e,o)},L.DomUtil.removeClasses=function(e,o){t("removeClass",e,o)}}(),function(t){"use strict";var e=function(e){return null!=e||e!=t},o=function(t,e){for(var o=i._callbacks[t],n=0;n<o.length;n++)o[n].apply(window,e)},n=function(t){for(var e=0,o=t.length-1;o>t.length-6;o--)e+=t[o];return e/5},i=window.Compass={method:t,watch:function(t){var e=++i._lastId;return i.init(function(o){if("phonegap"==o)i._watchers[e]=i._nav.compass.watchHeading(t);else if("webkitOrientation"==o){var n=function(e){t(e.webkitCompassHeading)};i._win.addEventListener("deviceorientation",n),i._watchers[e]=n}else if("orientationAndGPS"==o){var a,n=function(e){a=-e.alpha+i._gpsDiff,0>a?a+=360:a>360&&(a-=360),t(a)};i._win.addEventListener("deviceorientation",n),i._watchers[e]=n}}),e},unwatch:function(t){return i.init(function(e){"phonegap"==e?i._nav.compass.clearWatch(i._watchers[t]):("webkitOrientation"==e||"orientationAndGPS"==e)&&i._win.removeEventListener("deviceorientation",i._watchers[t]),delete i._watchers[t]}),i},needGPS:function(t){return i._callbacks.needGPS.push(t),i},needMove:function(t){return i._callbacks.needMove.push(t),i},noSupport:function(t){return i.method===!1?t():e(i.method)||i._callbacks.noSupport.push(t),i},init:function(t){return e(i.method)?void t(i.method):(i._callbacks.init.push(t),i._initing?void 0:(i._initing=!0,i._nav.compass?i._start("phonegap"):i._win.DeviceOrientationEvent?(i._checking=0,i._win.addEventListener("deviceorientation",i._checkEvent),setTimeout(function(){i._checking!==!1&&i._start(!1)},500)):i._start(!1),i))},_lastId:0,_watchers:{},_win:window,_nav:navigator,_callbacks:{init:[],noSupport:[],needGPS:[],needMove:[]},_initing:!1,_gpsDiff:t,_start:function(t){i.method=t,i._initing=!1,o("init",[t]),i._callbacks.init=[],t===!1&&o("noSupport",[]),i._callbacks.noSupport=[]},_checking:!1,_checkEvent:function(t){i._checking+=1;var o=!1;e(t.webkitCompassHeading)?i._start("webkitOrientation"):e(t.alpha)&&i._nav.geolocation?i._gpsHack():i._checking>1?i._start(!1):o=!0,o||(i._checking=!1,i._win.removeEventListener("deviceorientation",i._checkEvent))},_gpsHack:function(){var t=!0,a=[],r=[];o("needGPS");var s=function(t){a.push(t.alpha)};i._win.addEventListener("deviceorientation",s);var l=function(l){var c=l.coords;e(c.heading)&&(t&&(t=!1,o("needMove")),c.speed>1?(r.push(c.heading),r.length>=5&&a.length>=5&&(i._win.removeEventListener("deviceorientation",s),i._nav.geolocation.clearWatch(d),i._gpsDiff=n(r)+n(a),i._start("orientationAndGPS"))):r=[])},c=function(){i._win.removeEventListener("deviceorientation",s),i._start(!1)},d=i._nav.geolocation.watchPosition(l,c,{enableHighAccuracy:!0})}}}();var t,e,o,n,i,a,r,s,l;i=null,L.Control.Markers=L.Control.extend({options:{position:"topleft",disableIcon:"fa-save",enableIcon:"fa-pencil",locate:null},onAdd:function(t){var e;return i=this,this.markers=[],this.loadMarkers(),e=L.DomUtil.create("div","leaflet-control-markers leaflet-bar leaflet-control"),this.link=L.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single fa fa-pencil",e),L.DomEvent.on(e,"click",L.DomEvent.stop).on(e,"click",function(t){return function(){return t.editing?t.stopEdit():t.startEdit()}}(this)).on(e,"dblclick",L.DomEvent.stop),t.on("click",function(t){return function(e){return t.editing?t.addMarker(e.latlng):void 0}}(this)),e},startEdit:function(){return this.editing=!0,L.DomUtil.removeClass(this.link,this.options.enableIcon),L.DomUtil.addClass(this.link,this.options.disableIcon),this.markers.forEach(function(t){return function(t){return t.dragging.enable()}}(this))},stopEdit:function(){return this.editing=!1,L.DomUtil.addClass(this.link,this.options.enableIcon),L.DomUtil.removeClass(this.link,this.options.disableIcon),this.markers.forEach(function(t){return function(t){return t.dragging.disable()}}(this)),this.saveMarkers()},loadMarkers:function(){var t;return t=store.get("markers")||[],t.forEach(function(t){return function(e){return t.addMarker(e)}}(this))},saveMarkers:function(){return store.set("markers",this.markers.map(function(t){return t.getLatLng()}))},addMarker:function(t){return i.markers.push(L.marker(t,{draggable:this.editing}).addTo(n).on("dblclick",this.removeMarker).on("click",this.showPopup))},removeMarker:function(){return i.editing?(this.closePopup(),n.removeLayer(this),i.markers.splice(i.markers.indexOf(this),1)):void 0},distanceInM:function(t){var e;return this.options.locate._event&&this.options.locate._active?(e=t.distanceTo(this.options.locate._event.latlng),Number(e.toFixed(1)).toLocaleString()+" m"):void 0},showPopup:function(){var t;return this.unbindPopup(),t=i.distanceInM(this.getLatLng()),t?this.bindPopup(t).openPopup():void 0}}),L.control.markers=function(t){return new L.Control.Markers(t)},t=null,L.Control.Compass=L.Control.extend({options:{position:"topleft",element:null,offset:0},onAdd:function(e){return t=this,Compass.needGPS(function(){return alert("Go outside and provide GPS")}).needMove(function(){return alert("Move forward")}).watch(function(t){return function(e){return L.DomUtil.removeClass(t.container,"hidden"),e+=window.orientation,t.colorNeedle(e),t.turnNeedle(e),t.options.element!==t.icon?t.showHeading(e):void 0}}(this)),this.container=L.DomUtil.create("div","leaflet-control-compass leaflet-bar leaflet-control hidden"),this.link=L.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single fa",this.container),this.icon=L.DomUtil.create("i","fa fa-arrow-up",this.link),this.options.element||(this.options.element=this.icon),this.container},colorElement:function(t,e,o){var n;return n=e>=t?"addClass":"removeClass",L.DomUtil[n](this.options.element,o)},colorNeedle:function(t){var e;return e=100*Math.sin(t*(Math.PI/360)),this.colorElement(e,15,"accurate"),this.colorElement(e,3,"very")},turnNeedle:function(t){var e;return e=this.options.offset-t,this.options.element.style.webkitTransform="rotate("+e+"deg)"},showHeading:function(t){return this.link.innerHTML=""+Math.round(t)+"°"}}),L.control.compass=function(t){return new L.Control.Compass(t)},a=function(){return window.scrollTo(0,0)},window.addEventListener("orientationchange",a),a(),e=new L.Google("ROADMAP"),r=new L.Google("SATELLITE"),s=new L.Google("TERRAIN"),l=L.tileLayer("http://s3-eu-west-1.amazonaws.com/topo-slovenia/z{z}/{y}/{x}.png",{minZoom:10,maxNativeZoom:15,detectRetina:!0,attribution:'© <a href="http://www.gu.gov.si/">GURS</a>',unloadInvisibleTiles:!1}),n=L.map("map",{layers:e,minZoom:6}).setView([46,14.7],8),L.control.layers({Google:e,Satellite:r,Terrain:s,Topo:l}).addTo(n),L.control.scale({imperial:!1}).addTo(n),o=L.control.locate({setView:!1}).addTo(n),L.control.markers({locate:o}).addTo(n),L.control.compass({element:o.icon,offset:-45}).addTo(n),o.locate()}).call(this);