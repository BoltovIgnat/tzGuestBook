
; /* Start:"a:4:{s:4:"full";s:97:"/bitrix/components/bitrix/sale.basket.basket.line/templates/.default/script.min.js?15732843013876";s:6:"source";s:78:"/bitrix/components/bitrix/sale.basket.basket.line/templates/.default/script.js";s:3:"min";s:82:"/bitrix/components/bitrix/sale.basket.basket.line/templates/.default/script.min.js";s:3:"map";s:82:"/bitrix/components/bitrix/sale.basket.basket.line/templates/.default/script.map.js";}"*/
"use strict";function BitrixSmallCart(){}BitrixSmallCart.prototype={activate:function(){this.cartElement=BX(this.cartId);this.fixedPosition=this.arParams.POSITION_FIXED=="Y";if(this.fixedPosition){this.cartClosed=true;this.maxHeight=false;this.itemRemoved=false;this.verticalPosition=this.arParams.POSITION_VERTICAL;this.horizontalPosition=this.arParams.POSITION_HORIZONTAL;this.topPanelElement=BX("bx-panel");this.fixAfterRender();this.fixAfterRenderClosure=this.closure("fixAfterRender");var t=this.closure("fixCart");this.fixCartClosure=t;if(this.topPanelElement&&this.verticalPosition=="top")BX.addCustomEvent(window,"onTopPanelCollapse",t);var e=null;BX.bind(window,"resize",function(){clearTimeout(e);e=setTimeout(t,200)})}this.setCartBodyClosure=this.closure("setCartBody");BX.addCustomEvent(window,"OnBasketChange",this.closure("refreshCart",{}))},fixAfterRender:function(){this.statusElement=BX(this.cartId+"status");if(this.statusElement){if(this.cartClosed)this.statusElement.innerHTML=this.openMessage;else this.statusElement.innerHTML=this.closeMessage}this.productsElement=BX(this.cartId+"products");this.fixCart()},closure:function(t,e){var i=this;return e?function(){i[t](e)}:function(e){i[t](e)}},toggleOpenCloseCart:function(){if(this.cartClosed){BX.removeClass(this.cartElement,"bx-closed");BX.addClass(this.cartElement,"bx-opener");this.statusElement.innerHTML=this.closeMessage;this.cartClosed=false;this.fixCart()}else{BX.addClass(this.cartElement,"bx-closed");BX.removeClass(this.cartElement,"bx-opener");BX.removeClass(this.cartElement,"bx-max-height");this.statusElement.innerHTML=this.openMessage;this.cartClosed=true;var t=this.cartElement.querySelector("[data-role='basket-item-list']");if(t)t.style.top="auto"}setTimeout(this.fixCartClosure,100)},setVerticalCenter:function(t){var e=t/2-this.cartElement.offsetHeight/2;if(e<5)e=5;this.cartElement.style.top=e+"px"},fixCart:function(){if(this.horizontalPosition=="hcenter"){var t="innerWidth"in window?window.innerWidth:document.documentElement.offsetWidth;var e=t/2-this.cartElement.offsetWidth/2;if(e<5)e=5;this.cartElement.style.left=e+"px"}var i="innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight;switch(this.verticalPosition){case"top":if(this.topPanelElement)this.cartElement.style.top=this.topPanelElement.offsetHeight+5+"px";break;case"vcenter":this.setVerticalCenter(i);break}if(this.productsElement){var s=this.cartElement.querySelector("[data-role='basket-item-list']");if(this.cartClosed){if(this.maxHeight){BX.removeClass(this.cartElement,"bx-max-height");if(s)s.style.top="auto";this.maxHeight=false}}else{if(this.maxHeight){if(this.productsElement.scrollHeight==this.productsElement.clientHeight){BX.removeClass(this.cartElement,"bx-max-height");if(s)s.style.top="auto";this.maxHeight=false}}else{if(this.verticalPosition=="top"||this.verticalPosition=="vcenter"){if(this.cartElement.offsetTop+this.cartElement.offsetHeight>=i){BX.addClass(this.cartElement,"bx-max-height");if(s)s.style.top=82+"px";this.maxHeight=true}}else{if(this.cartElement.offsetHeight>=i){BX.addClass(this.cartElement,"bx-max-height");if(s)s.style.top=82+"px";this.maxHeight=true}}}}if(this.verticalPosition=="vcenter")this.setVerticalCenter(i)}},refreshCart:function(t){if(this.itemRemoved){this.itemRemoved=false;return}t.sessid=BX.bitrix_sessid();t.siteId=this.siteId;t.templateName=this.templateName;t.arParams=this.arParams;BX.ajax({url:this.ajaxPath,method:"POST",dataType:"html",data:t,onsuccess:this.setCartBodyClosure})},setCartBody:function(t){if(this.cartElement)this.cartElement.innerHTML=t.replace(/#CURRENT_URL#/g,this.currentUrl);if(this.fixedPosition)setTimeout(this.fixAfterRenderClosure,100)},removeItemFromCart:function(t){this.refreshCart({sbblRemoveItemFromCart:t});this.itemRemoved=true;BX.onCustomEvent("OnBasketChange")}};
/* End */
;
; /* Start:"a:4:{s:4:"full";s:88:"/bitrix/components/bitrix/menu/templates/catalog_horizontal/script.min.js?15732835544016";s:6:"source";s:69:"/bitrix/components/bitrix/menu/templates/catalog_horizontal/script.js";s:3:"min";s:73:"/bitrix/components/bitrix/menu/templates/catalog_horizontal/script.min.js";s:3:"map";s:73:"/bitrix/components/bitrix/menu/templates/catalog_horizontal/script.map.js";}"*/
(function(e){if(!e.BX||BX.CatalogMenu)return;BX.CatalogMenu={items:{},idCnt:1,currentItem:null,overItem:null,outItem:null,timeoutOver:null,timeoutOut:null,getItem:function(e){if(!BX.type.isDomNode(e))return null;var i=!e.id||!BX.type.isNotEmptyString(e.id)?e.id="menu-item-"+this.idCnt++:e.id;if(!this.items[i])this.items[i]=new t(e);return this.items[i]},itemOver:function(e){var t=this.getItem(e);if(!t)return;if(this.outItem==t){clearTimeout(t.timeoutOut)}this.overItem=t;if(t.timeoutOver){clearTimeout(t.timeoutOver)}t.timeoutOver=setTimeout(function(){if(BX.CatalogMenu.overItem==t){t.itemOver()}},100)},itemOut:function(e){var t=this.getItem(e);if(!t)return;this.outItem=t;if(t.timeoutOut){clearTimeout(t.timeoutOut)}t.timeoutOut=setTimeout(function(){if(t!=BX.CatalogMenu.overItem){t.itemOut()}if(t==BX.CatalogMenu.outItem){t.itemOut()}},100)},removeHover:function(e){if(typeof e!=="object")return false;var t=e.parentNode.querySelectorAll('[data-role="bx-menu-item"]');for(var i=0;i<t.length;i++){if(e==t[i])continue;if(BX.hasClass(t[i],"bx-hover"))BX.removeClass(t[i],"bx-hover")}}};var t=function(e){this.element=e;this.popup=BX.findChild(e,{className:"bx_children_container"},false,false);this.isLastItem=BX.lastChild(this.element.parentNode)==this.element};t.prototype.itemOver=function(){if(!BX.hasClass(this.element,"bx-hover")){BX.addClass(this.element,"bx-hover");var e=BX.findChild(this.element,{className:"bx-nav-2-lvl-container"},true,false);if(e){var t=e.getBoundingClientRect().left+e.offsetWidth;if(t>document.body.clientWidth)e.style.right=0}}};t.prototype.itemOut=function(){BX.removeClass(this.element,"bx-hover")}})(window);BX.namespace("BX.Main.Menu");BX.Main.Menu.CatalogHorizontal=function(){var e=function(e,t){this.menuBlockId=e||"";this.itemImgDesc=t||"";this.resizeMenu();BX.bind(window,"resize",BX.proxy(this.resizeMenu,this))};e.prototype.clickInMobile=function(e,t){if(BX.findParent(e,{className:"bx-aside-nav"},true))return;t.preventDefault();e.onclick="";return false};e.prototype.toggleInMobile=function(e){var t=BX.findParent(e,{className:"bx-nav-parent"});var i=e.firstChild;if(BX.hasClass(t,"bx-opened")){BX.removeClass(t,"bx-opened");BX.removeClass(i,"fa-angle-down");BX.addClass(i,"fa-angle-left")}else{BX.addClass(t,"bx-opened");BX.addClass(i,"fa-angle-down");BX.removeClass(i,"fa-angle-left")}};e.prototype.resizeMenu=function(){var e=this.templateWrap;var t=document.body.querySelector("[data-role='bx-menu-mobile']");var i=document.body.querySelector("[data-role='bx-menu-button-mobile']");if(document.body.clientWidth<=767){if(!t){t=BX.create("div",{attrs:{className:"bx-aside-nav","data-role":"bx-menu-mobile"},children:[BX.clone(BX("ul_"+this.menuBlockId))]});document.body.insertBefore(t,document.body.firstChild)}if(!i){i=BX.create("div",{attrs:{className:"bx-aside-nav-control bx-closed","data-role":"bx-menu-button-mobile"},children:[BX.create("i",{attrs:{className:"fa fa-bars"}})],events:{click:function(){if(BX.hasClass(this,"bx-opened")){BX.removeClass(this,"bx-opened");BX.removeClass(t,"bx-opened");BX.addClass(this,"bx-closed");document.body.style.overflow="";BX.removeClass(document.body,"bx-opened")}else{BX.addClass(this,"bx-opened");BX.addClass(t,"bx-opened");BX.removeClass(this,"bx-closed");document.body.style.overflow="hidden";BX.addClass(document.body,"bx-opened")}}}});document.body.insertBefore(i,document.body.firstChild)}}else{BX.removeClass(t,"bx-opened");BX.removeClass(document.body,"bx-opened");document.body.style.overflow="";if(i)BX.removeClass(i,"bx-opened")}};e.prototype.changeSectionPicure=function(e,t){var i=BX.findParent(e,{className:"bx-nav-1-lvl"});if(!i)return;var o=i.querySelector("[data-role='desc-img-block']");if(!o)return;var n=BX.findChild(o,{tagName:"img"},true,false);if(n)n.src=this.itemImgDesc[t]["PICTURE"];var a=BX.findChild(o,{tagName:"a"},true,false);if(a)a.href=e.href;var s=BX.findChild(o,{tagName:"p"},true,false);if(s)s.innerHTML=this.itemImgDesc[t]["DESC"]};return e}();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:67:"/bitrix/components/bitrix/search.title/script.min.js?15732843476443";s:6:"source";s:48:"/bitrix/components/bitrix/search.title/script.js";s:3:"min";s:52:"/bitrix/components/bitrix/search.title/script.min.js";s:3:"map";s:52:"/bitrix/components/bitrix/search.title/script.map.js";}"*/
function JCTitleSearch(t){var e=this;this.arParams={AJAX_PAGE:t.AJAX_PAGE,CONTAINER_ID:t.CONTAINER_ID,INPUT_ID:t.INPUT_ID,MIN_QUERY_LEN:parseInt(t.MIN_QUERY_LEN)};if(t.WAIT_IMAGE)this.arParams.WAIT_IMAGE=t.WAIT_IMAGE;if(t.MIN_QUERY_LEN<=0)t.MIN_QUERY_LEN=1;this.cache=[];this.cache_key=null;this.startText="";this.running=false;this.runningCall=false;this.currentRow=-1;this.RESULT=null;this.CONTAINER=null;this.INPUT=null;this.WAIT=null;this.ShowResult=function(t){if(BX.type.isString(t)){e.RESULT.innerHTML=t}e.RESULT.style.display=e.RESULT.innerHTML!==""?"block":"none";var s=e.adjustResultNode();var i;var n;var l=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(l){n=BX.findChild(l,{tag:"th"},true)}if(n){var r=BX.pos(l);r.width=r.right-r.left;var a=BX.pos(n);a.width=a.right-a.left;n.style.width=a.width+"px";e.RESULT.style.width=s.width+a.width+"px";e.RESULT.style.left=s.left-a.width-1+"px";if(r.width-a.width>s.width)e.RESULT.style.width=s.width+a.width-1+"px";r=BX.pos(l);i=BX.pos(e.RESULT);if(i.right>r.right){e.RESULT.style.width=r.right-r.left+"px"}}var o;if(l)o=BX.findChild(e.RESULT,{class:"title-search-fader"},true);if(o&&n){i=BX.pos(e.RESULT);o.style.left=i.right-i.left-18+"px";o.style.width=18+"px";o.style.top=0+"px";o.style.height=i.bottom-i.top+"px";o.style.display="block"}};this.onKeyPress=function(t){var s=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(!s)return false;var i;var n=s.rows.length;switch(t){case 27:e.RESULT.style.display="none";e.currentRow=-1;e.UnSelectAll();return true;case 40:if(e.RESULT.style.display=="none")e.RESULT.style.display="block";var l=-1;for(i=0;i<n;i++){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){if(l==-1)l=i;if(e.currentRow<i){e.currentRow=i;break}else if(s.rows[i].className=="title-search-selected"){s.rows[i].className=""}}}if(i==n&&e.currentRow!=i)e.currentRow=l;s.rows[e.currentRow].className="title-search-selected";return true;case 38:if(e.RESULT.style.display=="none")e.RESULT.style.display="block";var r=-1;for(i=n-1;i>=0;i--){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){if(r==-1)r=i;if(e.currentRow>i){e.currentRow=i;break}else if(s.rows[i].className=="title-search-selected"){s.rows[i].className=""}}}if(i<0&&e.currentRow!=i)e.currentRow=r;s.rows[e.currentRow].className="title-search-selected";return true;case 13:if(e.RESULT.style.display=="block"){for(i=0;i<n;i++){if(e.currentRow==i){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){var a=BX.findChild(s.rows[i],{tag:"a"},true);if(a){window.location=a.href;return true}}}}}return false}return false};this.onTimeout=function(){e.onChange(function(){setTimeout(e.onTimeout,500)})};this.onChange=function(t){if(e.running){e.runningCall=true;return}e.running=true;if(e.INPUT.value!=e.oldValue&&e.INPUT.value!=e.startText){e.oldValue=e.INPUT.value;if(e.INPUT.value.length>=e.arParams.MIN_QUERY_LEN){e.cache_key=e.arParams.INPUT_ID+"|"+e.INPUT.value;if(e.cache[e.cache_key]==null){if(e.WAIT){var s=BX.pos(e.INPUT);var i=s.bottom-s.top-2;e.WAIT.style.top=s.top+1+"px";e.WAIT.style.height=i+"px";e.WAIT.style.width=i+"px";e.WAIT.style.left=s.right-i+2+"px";e.WAIT.style.display="block"}BX.ajax.post(e.arParams.AJAX_PAGE,{ajax_call:"y",INPUT_ID:e.arParams.INPUT_ID,q:e.INPUT.value,l:e.arParams.MIN_QUERY_LEN},function(s){e.cache[e.cache_key]=s;e.ShowResult(s);e.currentRow=-1;e.EnableMouseEvents();if(e.WAIT)e.WAIT.style.display="none";if(!!t)t();e.running=false;if(e.runningCall){e.runningCall=false;e.onChange()}});return}else{e.ShowResult(e.cache[e.cache_key]);e.currentRow=-1;e.EnableMouseEvents()}}else{e.RESULT.style.display="none";e.currentRow=-1;e.UnSelectAll()}}if(!!t)t();e.running=false};this.onScroll=function(){if(BX.type.isElementNode(e.RESULT)&&e.RESULT.style.display!=="none"&&e.RESULT.innerHTML!==""){e.adjustResultNode()}};this.UnSelectAll=function(){var t=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(t){var s=t.rows.length;for(var i=0;i<s;i++)t.rows[i].className=""}};this.EnableMouseEvents=function(){var t=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(t){var s=t.rows.length;for(var i=0;i<s;i++)if(!BX.findChild(t.rows[i],{class:"title-search-separator"},true)){t.rows[i].id="row_"+i;t.rows[i].onmouseover=function(t){if(e.currentRow!=this.id.substr(4)){e.UnSelectAll();this.className="title-search-selected";e.currentRow=this.id.substr(4)}};t.rows[i].onmouseout=function(t){this.className="";e.currentRow=-1}}}};this.onFocusLost=function(t){setTimeout(function(){e.RESULT.style.display="none"},250)};this.onFocusGain=function(){if(e.RESULT.innerHTML.length)e.ShowResult()};this.onKeyDown=function(t){if(!t)t=window.event;if(e.RESULT.style.display=="block"){if(e.onKeyPress(t.keyCode))return BX.PreventDefault(t)}};this.adjustResultNode=function(){if(!(BX.type.isElementNode(e.RESULT)&&BX.type.isElementNode(e.CONTAINER))){return{top:0,right:0,bottom:0,left:0,width:0,height:0}}var t=BX.pos(e.CONTAINER);e.RESULT.style.position="absolute";e.RESULT.style.top=t.bottom+2+"px";e.RESULT.style.left=t.left+"px";e.RESULT.style.width=t.width+"px";return t};this._onContainerLayoutChange=function(){if(BX.type.isElementNode(e.RESULT)&&e.RESULT.style.display!=="none"&&e.RESULT.innerHTML!==""){e.adjustResultNode()}};this.Init=function(){this.CONTAINER=document.getElementById(this.arParams.CONTAINER_ID);BX.addCustomEvent(this.CONTAINER,"OnNodeLayoutChange",this._onContainerLayoutChange);this.RESULT=document.body.appendChild(document.createElement("DIV"));this.RESULT.className="title-search-result";this.INPUT=document.getElementById(this.arParams.INPUT_ID);this.startText=this.oldValue=this.INPUT.value;BX.bind(this.INPUT,"focus",function(){e.onFocusGain()});BX.bind(this.INPUT,"blur",function(){e.onFocusLost()});this.INPUT.onkeydown=this.onKeyDown;if(this.arParams.WAIT_IMAGE){this.WAIT=document.body.appendChild(document.createElement("DIV"));this.WAIT.style.backgroundImage="url('"+this.arParams.WAIT_IMAGE+"')";if(!BX.browser.IsIE())this.WAIT.style.backgroundRepeat="none";this.WAIT.style.display="none";this.WAIT.style.position="absolute";this.WAIT.style.zIndex="1100"}BX.bind(this.INPUT,"bxchange",function(){e.onChange()});var t=BX.findParent(this.CONTAINER,BX.is_fixed);if(BX.type.isElementNode(t)){BX.bind(window,"scroll",BX.throttle(this.onScroll,100,this))}};BX.ready(function(){e.Init(t)})}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:79:"/bitrix/components/bitrix/news.list/templates/flat/script.min.js?15732838643288";s:6:"source";s:60:"/bitrix/components/bitrix/news.list/templates/flat/script.js";s:3:"min";s:64:"/bitrix/components/bitrix/news.list/templates/flat/script.min.js";s:3:"map";s:64:"/bitrix/components/bitrix/news.list/templates/flat/script.map.js";}"*/
(function(t){if(!!t.JCNewsSlider){return}t.JCNewsSlider=function(t,e){if(t&&e){var i=BX(t);if(i){var s=BX.findChildByClassName(i,e.imagesContainerClassName,true);var a=BX.findChildByClassName(i,e.leftArrowClassName,true);var l=BX.findChildByClassName(i,e.rightArrowClassName,true);var r=BX.findChildByClassName(i,e.controlContainerClassName,true);if(s&&a&&l&&r){var n=new JCNewsSlider;n.Init(s,r,a,l)}}}};t.JCNewsSlider.prototype.Init=function(t,e,i,s){this.time=.5;this.type="accelerated";this.threshold=50;this.allowedTime=500;this.startX=0;this.startY=0;this.startTime=0;this.sliderImages=t;BX.bind(t,"touchstart",BX.delegate(this.touchStart,this));BX.bind(t,"touchend",BX.delegate(this.touchEnd,this));this.sliderControls=BX.findChildren(e,{tagName:"LI"},true);var a=function(t,e){return function(){return e(t)}};for(var l=0;l<this.sliderControls.length;l++){BX.bind(this.sliderControls[l],"click",a(l,BX.delegate(this.slideTo,this)))}this.sliderLeft=i;BX.bind(i,"click",BX.delegate(this.slideLeft,this));this.sliderRight=s;BX.bind(s,"click",BX.delegate(this.slideRight,this))};t.JCNewsSlider.prototype.slideRight=function(){if(this.animation)return;this.animation=true;var t=parseInt(this.sliderImages.style.left,10);if(t<=-100*(this.sliderControls.length-1)){this.animation=false;return}var e=this;new BX.fx({start:t,finish:t-100,time:this.time,type:this.type,callback:function(t){e.sliderImages.style.left=t+"%"},callback_start:function(){e.sliderImages.style.left=t+"%"},callback_complete:function(){e.sliderImages.style.left=t-100+"%";e.adjustSliderControls(-(t-100)/100);e.animation=false}}).start()};t.JCNewsSlider.prototype.slideLeft=function(){if(this.animation)return;this.animation=true;var t=parseInt(this.sliderImages.style.left,10);if(t>=0){this.animation=false;return}var e=this;new BX.fx({start:t,finish:t+100,time:this.time,type:this.type,callback:function(t){e.sliderImages.style.left=t+"%"},callback_start:function(){e.sliderImages.style.left=t+"%"},callback_complete:function(){e.sliderImages.style.left=t+100+"%";e.adjustSliderControls(-(t+100)/100);e.animation=false}}).start()};t.JCNewsSlider.prototype.slideTo=function(t){if(this.animation)return;this.animation=true;var e=parseInt(this.sliderImages.style.left,10);if(e==-t*100){this.animation=false;return}var i=this;new BX.fx({start:e,finish:-t*100,time:this.time,type:this.type,callback:function(t){i.sliderImages.style.left=t+"%"},callback_start:function(){i.sliderImages.style.left=e+"%";i.adjustSliderControls(t)},callback_complete:function(){i.sliderImages.style.left=-t*100+"%";i.animation=false}}).start()};t.JCNewsSlider.prototype.adjustSliderControls=function(t){for(var e=0;e<this.sliderControls.length;e++){if(t==e)BX.addClass(this.sliderControls[e],"current");else BX.removeClass(this.sliderControls[e],"current")}};t.JCNewsSlider.prototype.touchStart=function(t){var e=t.changedTouches[0];this.startX=e.pageX;this.startY=e.pageY;this.startTime=(new Date).getTime();t.preventDefault()};t.JCNewsSlider.prototype.touchEnd=function(t){var e=t.changedTouches[0];var i=e.pageX-this.startX;var s=(new Date).getTime()-this.startTime;if(s<=this.allowedTime){if(i>this.threshold)this.slideLeft();else if(i<-this.threshold)this.slideRight()}t.preventDefault()}})(window);
/* End */
;; /* /bitrix/components/bitrix/sale.basket.basket.line/templates/.default/script.min.js?15732843013876*/
; /* /bitrix/components/bitrix/menu/templates/catalog_horizontal/script.min.js?15732835544016*/
; /* /bitrix/components/bitrix/search.title/script.min.js?15732843476443*/
; /* /bitrix/components/bitrix/news.list/templates/flat/script.min.js?15732838643288*/

//# sourceMappingURL=template_a3517a1ef293a3def3ef8e63e80d5c52.map.js