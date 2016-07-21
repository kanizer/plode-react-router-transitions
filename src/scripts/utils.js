"use strict";

// Utils

// Libraries
import Skrollr from 'skrollr';

import logo from './logo-animation.js'

// Constants
const headerHeight = 593;
const workPaddingTop = 125;

// Global Variables
let s = {},
	timer = {};


window.test = () => {

	let headerEl = document.querySelector('.work-container');
	let obj = headerEl.dataset;

	for (let property in obj) {
		if (obj.hasOwnProperty(property)) {
			let propInt = parseInt(property);
			if ( propInt % 1 === 0 ) { // Number.isInteger(n) not supported everywhere
				headerEl.removeAttribute(`data-${property}`);
			}
		}
	}
}

module.exports = {

	setupLogo : function() {

		logo.createSiteLogo();

		if (window.introComplete) {
			logo.staticSiteLogos();
		} else {
			document.body.addEventListener('introLoaded', function() {
				logo.setSiteLogo();
			});
		}
		
	},

	adjustSVGForFireFox : function() {

		let isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

		// Offset SVG in FireFox so the edges appear crisp
		// Setting SVG shape-rendering to crispEdges doesn't fix the issue
		if(isFireFox) {
			TweenMax.set("#view_work_arrow_svg",    {attr:{transform:"translate(0, -.6)", width:"+=1", height:"+=1", viewBox:"-1 -1 12 7"}});
			TweenMax.set("#watch_reel_arrow_svg",   {attr:{transform:"translate(0, -.6)", width:"+=1", height:"+=1", viewBox:"-1 -1 5 8"}});
			TweenMax.set("#back_to_top_arrow_svg",  {attr:{transform:"translate(0, -.6)", width:"+=1", height:"+=1", viewBox:"-1 -1 12 7"}});
			TweenMax.set("#contact_info_arrow_svg", {attr:{transform:"translate(0, -.6)", width:"+=1", height:"+=1", viewBox:"-1 -1 4 6"}});
			TweenMax.set("#nav_arrow_svg",          {attr:{transform:"translate(0, -.6)", width:"+=1", height:"+=1", viewBox:"-1 -1 60 4"}});
		}
	},

	mobileCheck : function() {
		let check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		

		if (check) {
			document.body.classList.add('mobile');
		} else {
			document.body.classList.add('not-mobile');
		}

		return check;
	},

	// Adds grain texture to header area
	addWorkGrain : function() {
		// Add grain/noise effect
		// https://github.com/sarathsaleem/grained

		// ANIMATED grain in Header
		var header_grain_options = {
				animate: true,
				patternWidth: 200,
				patternHeight: 200,
				grainOpacity: 0.018,
				grainDensity: 1,
				grainWidth: 1,
				grainHeight: 1
			};

			var test = {
				animate: true,
				patternWidth: 200,
				patternHeight: 200,
				grainOpacity: .5,
				grainDensity: 1,
				grainWidth: 1,
				grainHeight: 1
			};

			var test2 = {
				animate: false,
				patternWidth: 200,
				patternHeight: 200,
				grainOpacity: .5,
				grainDensity: 1,
				grainWidth: 1,
				grainHeight: 1
			};

		// Mobile runs slow, so use static noise instead
		if (!this.mobileCheck()) {
			window.grained("#header_grain", header_grain_options); 
		}

		// STATIC grain on light gray background behind Header
		var grain_options = {
				animate: false,
				patternWidth: 100,
				patternHeight: 100,
				grainOpacity: 0.06,
				grainDensity: 2,
				grainWidth: 1,
				grainHeight: 1
			};
		grained("#work_background_grain", grain_options); 
	},

	onUnLayout : function() {
		if (typeof s.destroy == 'function') {
			s.destroy();
			s = {};
		}
	},

	setWorkToTop : function() {

		const scrollTop = s.getScrollTop();

		if (typeof s.animateTo == 'function') {
			if (scrollTop > headerHeight) {
				s.animateTo(headerHeight, { 'duration' : 200 });
			}
		}
	},

	resetSkrollrAttr : function(element) {

		let el = document.querySelector(element);
		let obj = el.dataset;

		for (let property in obj) {
			if (obj.hasOwnProperty(property)) {
				let propInt = parseInt(property);
				if ( propInt % 1 === 0 ) {
					el.removeAttribute(`data-${property}`);
				}
			}
		}
	},

	onLayout : function() {

		console.log('>>>>>>>>>>>>>>>>>>>>>>>>> onLayout UTILS function CALLED!!!!!');

		let self = this;
		this.adjustSVGForFireFox();

		// clear the timer so we don't set multiple
		clearTimeout(timer);

		// Setting up skrollr after making sure its all loaded
		timer = setTimeout( () => {
			if ( document.body.classList.contains('work-page') ) {
				self.setupWorkLayout();
			} 
		}, 550);

	},

	setupWorkLayout : function() {
		console.log('>>>>>>>> TIMER SETS OFF MOTHERFUCKER');

		// RESET THE ATTRIBUTES ON SKROLLR THAT NEED TO BE RESIZED
		this.resetSkrollrAttr('.grid-container');
		this.resetSkrollrAttr('.grid');

		let gridcontainerEl = document.querySelector('.grid-container');
		let gridEl = document.querySelector('.grid');
		let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		let gridcontainerElheight = h - 204;
		let gridScroll = headerHeight;

		let mainHeaderEl = document.querySelector('.main-header');
		let workContainerEl = document.querySelector('.work-component-container.container');

		if (gridEl.scrollHeight > gridcontainerElheight) {
			gridScroll = gridEl.scrollHeight - gridcontainerElheight;
		}

		// SET HEIGHT FOR GRID CONTAINER
		gridcontainerEl.setAttribute('style',`height:${gridcontainerElheight}px`);

		// SET SKROLLR STUFF FOR GRID
		gridEl.setAttribute(`data-${gridScroll}`,`transform: translateY(-${gridScroll}px);`);
		gridEl.setAttribute(`data-${headerHeight}`, 'transform: translateY(0px);');

		// SET SKROLLR STUFF FOR MAIN HEADER
		mainHeaderEl.setAttribute('data-0', `height: ${headerHeight}px;`);
		mainHeaderEl.setAttribute(`data-${headerHeight}`, 'height: 0px;');

		// SET SKROLLR STUFF FOR WORK CONTAINER
		workContainerEl.setAttribute('data-0', `padding-top: ${headerHeight}px;`);
		workContainerEl.setAttribute(`data-${headerHeight-workPaddingTop}`, `padding-top: ${workPaddingTop}px;`);

		this.addWorkGrain();

		console.log('skrollr', s);

		// if skrollr exists then refresh it, otherwise, init it
		if (typeof s.destroy === 'function') {
			console.log('TRY TO REFRESH SKROLLR');

			// REFRESH skrollr
			s.refresh();

		} else if (true) {} {
			// INIT skrollr
			s = Skrollr.init({
				constants: { headerheight: headerHeight,  },
				render: function(data) {
					//Log the current scroll position.
					// console.log('data.curTop', data.curTop);
				}
			});
		}
	},

	resizePage : function() {

		// console.log('REsixing work page');
		// if (window.innerWidth >= 768) {
		// 	console.log('INSIDE RESIZE IF');
		// 	// GET RID OF SKROLLR
		// 	this.onUnLayout();
		// 	// REDO THE LAYOUT
		// 	this.onLayout();
		// }
	},

	debounce : function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

}