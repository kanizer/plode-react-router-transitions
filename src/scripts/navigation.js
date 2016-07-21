"use strict";

// Navigation Class for animations
export default class Navigation {

	constructor(navElements){
		this.navEls = navElements;
		this.init();	
	}

	init() {
		if (document.body.classList.contains('info-page')) {
			this.animate('info');
		}
	}

	animate(currentSection, whenComplete) {

		let self = this;
		let distance = 65;

		if(currentSection == "work") {

			TweenMax.to("#nav_px6", .45, {attr:{x:"-=" + distance, clearProps:"all"}, ease:Power4.easeInOut});
			TweenMax.to("#nav_px5", .6,  {attr:{x:"-=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true});
			TweenMax.to("#nav_px4", .75, {attr:{x:"-=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true});
			TweenMax.to("#nav_px3", .9,  {attr:{x:"-=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true});
			TweenMax.to("#nav_px2", 1.05,{attr:{x:"-=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true});
			TweenMax.to("#nav_px1", 1.2, {attr:{x:"-=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true,
					onComplete: whenComplete});
		} else {

			TweenMax.to("#nav_px1", .65, {attr:{x:"+=" + distance, clearProps:"all"}, ease:Power4.easeInOut});
			TweenMax.to("#nav_px2", .8,  {attr:{x:"+=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true});
			TweenMax.to("#nav_px3", .95, {attr:{x:"+=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true});
			TweenMax.to("#nav_px4", 1.1, {attr:{x:"+=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true});
			TweenMax.to("#nav_px5", 1.25,{attr:{x:"+=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true});
			TweenMax.to("#nav_px6", 1.4, {attr:{x:"+=" + distance, clearProps:"all"}, ease:Power4.easeInOut, overwrite:true,
					onComplete: whenComplete});
		}
	}

}