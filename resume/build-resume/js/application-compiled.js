var sandBox=new SandBox;function SandBox(){var c={};this.handlersHash=c;this.addEventListener=function(e,d){c[e]instanceof Array||(c[e]=[]);c[e].push(d)};this.removeEventListener=function(e,d){if(c[e]instanceof Array)for(var b=c[e],a=b.length-1;0<=a;a-=1)b[a]===d&&b.splice(a,1)};this.notify=function(e,d){var b=c[e];if(b instanceof Array)for(var a=b.length-1;0<=a;a-=1)b[a](d)}}sandBox.log=function(c){void 0!==window.console&&console.log(c)};sandBox.ui=sandBox.ui||{};
sandBox.ui.createPictureSlider=function(){function c(d){var b=0,a=0,c=[];this.initializeState=function(f){b=f.count;a=f.position;d.notify("PictureSliderModel-StateChanged",f)};this.addImage=function(a){c.push(a);b+=1;d.notify("PictureSliderModel-NewImageAdded",void 0)};this.getPosition=function(){return a};this.getCount=function(){return b};var e=function(f){f!==a&&(a=f,d.notify("PictureSliderModel-StateChanged",{position:a,count:b}))};this.next=function(){var f;0===b?f=0:(f=0,f=a<b-1?a+1:a);e(f);
return a};this.previous=function(){var f;0===b?f=0:(f=0,f=0<a?a-1:a);e(f);return a};this.getImage=function(){return c[a]};this.isLast=function(){return a===b-1||0===b};this.isFirst=function(){return 0===a}}function e(d,b,a){var a=$("#pictureSliderTmpl").tmpl().appendTo(a),c=a.find(".pictureSlider_imageDisplay"),e=$(".pictureSlider_arrow.pictureSlider_left",a),f=$(".pictureSlider_arrow.pictureSlider_right",a);c.click(function(){b.next()});f.click(function(){b.next()});e.click(function(){b.previous()});
a=function(){c.children().remove();var a=b.getImage();void 0!==a&&$(a).addClass("pictureSlider_image").appendTo(c);c.css("cursor",b.isLast()?"auto":"pointer");b.isFirst()?e.hide():e.show();b.isLast()?f.hide():f.show()};d.addEventListener("PictureSliderModel-StateChanged",a);d.addEventListener("PictureSliderModel-NewImageAdded",a)}return function(d,b){var a=new c(d);new e(d,a,b);return{addImage:a.addImage}}}(sandBox);
function TopJumper(c,e){var d=this,b=$(window),a=$("#TopJumperTmpl").tmpl().appendTo(e);this._getScrollTop=function(){return b.scrollTop()};this.show=function(){a.show()};this.hide=function(){a.hide()};this.updateView=function(){200<=this._getScrollTop()?this.show():this.hide()};$(window).scroll(function(){d.updateView()});a.click(function(){$("html, body").animate({scrollTop:0},500)});this.updateView()}
sandBox.PrintWidget=function(c,e){$("#PrintButtonTmpl").tmpl().appendTo(e).click(function(){void 0!==window.print&&window.print()})};
function Navigator(c,e,d){var b=!0,a={},i=$(".navSectionTitle, .navSubSection",e).each(function(){var b=$(this).attr("href").replace("#","");a[b]={navigation:this}}),g=$(".sectionTitle, .subsection",d).map(function(){a[$(this).attr("id")].section=this;return{top:$(this).offset().top,elem:this}}).get().sort(function(a,b){return a.top-b.top});i.click(function(){i.removeClass("activeSection");$(this).addClass("activeSection");var a=$(this).attr("href"),a=$(a).offset().top;b=!1;$("html, body").animate({scrollTop:a},
500,function(){b=!0});return!1});$(window).scroll(function(){var c=g.length;if(b&&0!==c){var d=$(window).scrollTop(),e=null;if(d<=g[0].top)e=g[0].elem;else if(d>=g[c-1].top)e=g[c-1].elem;else for(var h=0;h<c-1;h+=1)if(d>=g[h].top&&d<g[h+1].top){e=g[h].elem;break}i.removeClass("activeSection");c=a[$(e).attr("id")].navigation;$(c).addClass("activeSection")}})}
$(document).ready(function(){var c=sandBox.ui.createPictureSlider,e=sandBox.PrintWidget,d=$(".topJumperContainer")[0];new TopJumper(sandBox,d);d=$(".navigation")[0];new Navigator(sandBox,d);d=$(".pictureSliderContainer")[0];c=c(sandBox,d);d=$(".rawImages img").get();$(".rawImages").empty();for(var b=0,a=d.length;b<a;b+=1)c.addImage(d[b]);c=$(".printButtonContainer")[0];new e(sandBox,c)});