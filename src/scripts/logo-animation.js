///////////////////////////////////////////////////////////////
//    _____              _     _______                       //
//   |  __ \            (_)   |__   __|                      //
//   | |  | | __ ___   ___ ______| |  ___ ___  _ __ ___      //
//   | |  | |/ _` \ \ / / |______| | / __/ _ \| '_ ` _ \     //
//   | |__| | (_| |\ V /| |      | || (_| (_) | | | | | |    //
//   |_____/ \__,_| \_/ |_|      |_(_)___\___/|_| |_| |_|    //
//                                                           //
//    File Author: David Thompson / Davi@Davi-T.com          //
///////////////////////////////////////////////////////////////

"use strict";

var logo = logo || {};

// logo.init = function() {

// }

	var currentLogo;

	//=============================================================
	// ID and Class Selector
	//=============================================================
	var $  = function(id) { return document.getElementById(id); };
	var $$ = function(classNames) { return document.getElementsByClassName(classNames); };

	//=============================================================
	// GSAP
	//=============================================================
	var tt  = TweenMax.to, 
		tf  = TweenMax.from, 
		tft = TweenMax.fromTo, 
		ts  = TweenMax.set, 
		tdc = TweenMax.delayedCall;

	TweenMax.defaultOverwrite = "none";
	//TweenMax.lagSmoothing(1000, 33);

	//=============================================================
	// Logo letter parts
	//=============================================================
	var logoLetterPartsArray = [$$("d1"), $$("d2_top"), $$("d2_bottom"), 
								$$("a1"), $$("a2_top"), $$("a2_bottom"), 
								$$("v1_top"), $$("v1_bottom"), $$("v2_top"), 
								$$("v2_bottom"), $$("i1"), $$("i2_bottom"), 
								$$("t1_top"), $$("t1_bottom"), $$("t2")];

	//=============================================================
	// Browser measurements
	//=============================================================
	var browser_w = window.innerWidth,
		browser_h = window.innerHeight,
		browser_horizontal_length = Math.ceil(Math.sqrt(browser_w*browser_w + browser_h*browser_h)), 
		browser_diagonal_length = Math.ceil(Math.sqrt(browser_h*browser_h + browser_h*browser_h)); 

	//=============================================================
	// Checks if is the into animation
	//=============================================================
	function isIntroLogo() {
		var isIntroLogo = (currentLogo == $("intro_logo")) ? true:false;
		return isIntroLogo;
	};


	//=============================================================
	// Browser checks
	//=============================================================
		var isOpera   = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		var isChrome  = !!window.chrome && !isOpera;
		var isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		var isSafari  = navigator.vendor && navigator.vendor.indexOf('Apple') > -1;
		var isiOS     = /iPad|iPhone|iPod/.test(navigator.platform);
		var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

		//IE
		var ie = (function(){
		    var undef,rv = -1; // Return value assumes failure.
		    var ua = window.navigator.userAgent;
		    var msie = ua.indexOf('MSIE ');
		    var trident = ua.indexOf('Trident/');

		    if (msie > 0) {
		        // IE 10 or older => return version number
		        rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		    } else if (trident > 0) {
		        // IE 11 (or newer) => return version number
		        var rvNum = ua.indexOf('rv:');
		        rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
		    }

		    return ((rv > -1) ? rv : undef);
		}());
		var isOldIE   = ie < 9;
		var isIE9     = ie === 9;
		var isIE10    = ie === 10;
		var isIE11    = ie === 11;
		var isIE12    = /Edge\/12./i.test(navigator.userAgent);
		var isIE      = /*@cc_on!@*/false || !!document.documentMode || isIE12; //Does not check Microsoft Edge

		//Mobile detection
		function checkIfMobile() {
		  try{ document.createEvent("TouchEvent"); return true; }
		  catch(e){ return false; }
		}
		var isMobile = checkIfMobile();








		//======================================================
		// Utils
		//======================================================
			//=============================================================
			// Hide / Show
			//=============================================================
			function show(e) {ts(e,{visibility:"visible", display:"block"});};
			function hide(e) {ts(e,{visibility:"hidden", display:"none"});};

			//=============================================================
			// Remove element
			//=============================================================
			function removeElement(e) {
				hide(e);
				e.parentNode.removeChild(e);
			};

			//=============================================================
			// Creates an array of child elements
			//=============================================================
			function createAssetsArray(arrName, assetName, numAssets) {
				for (var i = 1; i <= numAssets; i+=1) {
					arrName.push($(assetName + i));
				}
			};

			//=============================================================
			// Gets Z Index of element
			//=============================================================
			window.getZIndex = function (e) {      
			  var z = window.document.defaultView.getComputedStyle(e).getPropertyValue('z-index');
			  if (isNaN(z)) return window.getZIndex(e.parentNode);
			  return z; 
			};








	//======================================================
	// Start
	//======================================================
	logo.start = function() {	
			
		// If on MOBILE, just show site logo animation and skip the intro animation
		if(isMobile) {
			//Create site logo assets
			// this.createSiteLogo();

			//Animate site logo
			// this.setSiteLogo();
			return;
		};
			
		//If on DESKTOP, then show the intro animation
		if(isIntroLogo()) {
			//Create HTML / SVG for intro assets
			createIntroAssets();

			currentLogo = $("intro_logo");

			//Create intro triangle SVG graphic
			createIntroTriangleSVG();

			//Create intro logo letter HTML
			createLogoAssets($("intro_logo"));

			//Create rectangles used for intro logo
			createLogoRecAssets($("intro_recs"));
				//Add additional class to site logo recs
				for (var i = 1; i <= 8; i+=1) {
					$("intro_recs").querySelector("div.rec" + i).className += " " + "rec_intro";
				};

			//Add noise / grain texture
			addGrain();

			//Add diagonal background lines
			addDiagonalBackgroundLines();

			//Animate triangle graphic
			tdc(1.5, animateTriangleGraphic, ["in"]);

			//Microsoft Edge / IE12 adds vertical scrollbars during intro animation
			//hide them, and then allow them on transition out (code way down below)
			if(isIE10 || isIE11 || isIE12) ts(document.getElementsByTagName("body")[0], {msOverflowStyle:"none"});

			//Transition Intro OUT
			tdc(3.6, animateIntroOut);
		};

		//Bring in intro stripes
		animateStripesIn();
	};


		//======================================================
		// Animates the stripes going across then screen
		//======================================================
		function animateStripesIn() {
			if(isIntroLogo()) {
				//Resize rectangles to browser window hypotenuese (diagonal length)
				ts($$("rec_intro"), { height:browser_horizontal_length + "px", top:-(browser_horizontal_length/2), transformOrigin:"50% 50%"});

				show([$("intro_recs"), $("intro_logo")]);

				// Hide logo and time it so that it appears once the recs finish rotating
				ts([$$("d1"), $$("d2"), $$("a1"), $$("a2"), $$("v1"), $$("v2"), $$("i1"), $$("i2"), $$("t1"), $$("t2")], {opacity:0});

				//Stagger delay by .03 after 2 seconds
				ts([$$("d1"), $$("d2")], {opacity:1, delay:2});
				ts([$$("a1"), $$("a2")], {opacity:1, delay:2.03});
				ts([$$("v1"), $$("v2")], {opacity:1, delay:2.06});
				ts([$$("i1"), $$("i2")], {opacity:1, delay:2.09});
				ts([$$("t1"), $$("t2")], {opacity:1, delay:2.06});

				// Firefox has some issues with tops of letters
				// So Hide the entire logo until the recs are almost all the way down
				if(isFireFox) ts($("intro_logo"), {visibility: "hidden"});
			}

			var recY      = -41,
				speed     = 1.2,
				delay1    = 0,
				delay2    = 1,
				delay3    = 1,
				delay4    = 1.3,
				delay5    = 0;
					
			for (var i = 1; i <= 8; i+=1) {

				//======================================================
				// Intro logo
				//======================================================
				if(isIntroLogo()) {
					//Rotate entire logo so lines sit horizontally
					ts($("intro_recs"), {rotation:90});

					//Animate recs going across screen
					tf((".rec" + i), 1.5, {y:"100%", delay:delay1, ease:Power4.easeInOut});

					//Change color from white to teal and fade them in
					tf((".rec" + i), .6, {opacity:0, backgroundColor:"white", delay:delay1 + .65, ease:Power2.easeInOut});
					delay1 += .09;

					//Rotate lines
					tt($("intro_recs"), 1.45, {rotation:0, delay:delay2, ease:Power3.easeInOut});

					//Animate recs down
					tt((".rec" + i), speed, {height:"100%", top:0, delay:delay3, ease:Quart.easeInOut});
					speed -= .06;
					delay3 += .065;

					//Fade recs from teal to white
					tt((".rec" + i), .6, {backgroundColor:"white", delay:delay4, ease:Power4.easeInOut});
					delay4 += .08;

				//======================================================
				// Site logo
				//======================================================
				} else {
					//Animate recs in
					recY = 41;
					tf((".rec" + i), .4, {y:recY, delay:delay5, ease:Power3.easeInOut});
					tt((".rec" + i), .4, {backgroundColor:"white", delay:delay5 + .3, ease:Power3.easeInOut});
					delay5 += .02;
				}
			};

			//======================================================
			// Intro logo
			//======================================================
			if(isIntroLogo()) {
				ts($("intro_logo"), {overflow:"visible", delay:2.4});
				tdc(1.7, function() {
					animateStripesDown();
					animateLogoCornersRounded();
					tdc(.5, animateLogoStar);
				});

			//======================================================
			// Site logo
			//======================================================
			} else {
				ts($("site_logo_light"), {overflow:"hidden"});
				ts($("site_logo_light"), {overflow:"visible", delay:1.15});
				tdc(.5, function() {
					animateStripesDown();
					animateLogoCornersRounded();
					tdc(.5, animateLogoStar);
				});
			};
		};

		//======================================================
		// Animates the logo's star and trademark symbol
		//======================================================
		function animateLogoStar() {
			show($$("star"));
			ts($$("star_mc"), {overflow: "visible", delay:.3});
			tf($$("star"), .9, {x:-20, rotation:"-=180", ease:Back.easeOut});
			tf($$("tm"), .8, {autoAlpha:0, delay:.3, ease:Linear.easeNone});
		};

		//======================================================
		// Animates the logo from rec shapes to actual logo parts
		//======================================================
		function animateStripesDown() {
			var ease = Power3.easeInOut;
			var speed = .4;
			var delay = .15;

			show([$$("d1"), $$("d2"), $$("a1"), $$("a2"), $$("a2_top"), 
				  $$("v1"), $$("v1_top"), $$("v2"), $$("v2_top"), 
				  $$("i1"), $$("i2"), $$("i2_bottom"), $$("t1"), $$("t2")]);

			//////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////
			// Notes:
			// FireFox won't animate the rounded corners with clip rect applied
			// Workaround is to create temp rectangles to fill in missing areas
			// and then animate those and then hide them when complete.
			//////////////////////////////////////////////////////////////////////
			if(isFireFox) {
				var d1_div = document.createElement("d1_div"),
					a1_div = document.createElement("a1_div"),
					a2_div = document.createElement("a2_div"),
					v1_div = document.createElement("v1_div"),
					v2_div = document.createElement("v2_div"),
					i1_div = document.createElement("i1_div");

				function createTempDiv(tempDiv, left, i) {
					ts(tempDiv, {position:"absolute", width:"11px", height:"14px", left:left, top:"0px", backgroundColor:"white"});
					currentLogo.appendChild(tempDiv);
					tt(tempDiv, speed, {height:0, y:18, ease:ease, delay:delay + i,
						onComplete:
							function(){
								currentLogo.removeChild(tempDiv);
								tempDiv = null;
							}
					});
				};

				createTempDiv(d1_div, "0px",    0); //d1
				createTempDiv(a1_div, "26px", .03); //a1
				createTempDiv(a2_div, "39px", .06); //a2
				createTempDiv(v1_div, "52px", .09); //v1
				createTempDiv(v2_div, "65px", .12); //v2
				createTempDiv(i1_div, "78px", .18); //i1

				//i1
				tf($$("i1"), speed, {left:-4, delay:delay + .18, ease:ease});

				//t2
				tf($$("t2"), speed, {left:78, delay:delay + .28, ease:ease});

			//////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////
			} else {
				function down(e, left, height, top, clip, i) {
					tf(e, speed, {left:left, height:height, top:top, clip:clip, ease:ease, delay:delay + i});
				};

				down($$("d1"),     "+=0", 41, 0,     "rect(0px 11px 41px 0px)",   0);  //d1
				down($$("a1"),     "+=0", 41, 0,     "rect(0px 11px 41px 0px)",  .03); //a1
				down($$("a2"),     "+=0", 41, 0,     "rect(0px 11px 41px 0px)",  .06); //a2
				down($$("a2_top"), "+=0", 41, "+=0", "rect(0px 28px 41px 0px)",  .06); //a2_top
				down($$("v1"),     "+=0", 41, 0,     "rect(0px 11px 41px 0px)",  .09); //v1
				down($$("v1_top"), "+=0", 41, "+=0", "rect(0px 28px 41px 0px)",  .09); //v1_top
				down($$("v2"),     "+=0", 41, 0,     "rect(0px 11px 41px 0px)",  .12); //v2
				down($$("v2_top"), "+=0", 41, "+=0", "rect(0px 11px 41px 0px)",  .12); //v2_top
				down($$("i1"),     -30  , 41, 0,     "rect(0px 0px  41px 13px)", .18); //i1
				down($$("i2"),     "+=0", 41, 0,     "rect(0px 11px 41px 0px)",  .15); //i2
				down($$("t2"),     "+=0", 41, 0,     "rect(0px 0px  41px 13px)", .28); //t2
			};
		};

		//======================================================
		// Animates the logo corners from straight to curved
		//======================================================
		function animateLogoCornersRounded() {
			var delayIncr       = 0;
			var recsToHideDelay = 0;
			if(isIntroLogo()) recsToHideDelay = .28;
			var recsToHideArray = [ $$("rec1"), $$("rec2"), $$("rec2"), $$("rec3"), 
									$$("rec4"), $$("rec4"), $$("rec5"), $$("rec5"), 
									$$("rec6"), $$("rec6"), $$("rec7"), $$("rec7"), 
									$$("rec8"), $$("rec8"), $$("rec8") ];

			function setRadius(e, i) {

				//Safari logs invalid tween values for mozBorder
				if(!isSafari) {
					tf(e, .8, {
						mozBorderRadiusTopleft:"0%", webkitBorderTopLeftRadius:"0%", borderTopLeftRadius:"0%",
						mozBorderRadiusTopright:"0%", webkitBorderTopRightRadius:"0%", borderTopRightRadius:"0%",
						mozBorderRadiusBottomleft:"0%", webkitBorderBottomLeftRadius:"0%", borderBottomLeftRadius:"0%",
						mozBorderRadiusBottomright:"0%", webkitBorderBottomRightRadius:"0%", borderBottomRightRadius:"0%",

						ease:Elastic.easeInOut,
						delay:delayIncr + .05,
						onStart:
							function() {
								ts(recsToHideArray[i], {
									visibility: "hidden", 
									delay:recsToHideDelay
								});
							}
					});
				} else {
					tf(e, .8, {
						webkitBorderTopLeftRadius:"0%", borderTopLeftRadius:"0%",
						webkitBorderTopRightRadius:"0%", borderTopRightRadius:"0%",
						webkitBorderBottomLeftRadius:"0%", borderBottomLeftRadius:"0%",
						webkitBorderBottomRightRadius:"0%", borderBottomRightRadius:"0%",

						ease:Elastic.easeInOut,
						delay:delayIncr + .05,
						onStart:
							function() {
								ts(recsToHideArray[i], {
									visibility: "hidden", 
									delay:recsToHideDelay
								});
							}
					});
				}

				if      (e == $$("t2"))         delayIncr =  .26; 
				else if (e == $$("i2_bottom"))  delayIncr =  .08; 
				else                            delayIncr += .01; 
			};

			//Animate letters to have rounded corners
			for (var i = 0; i < logoLetterPartsArray.length; i+=1) {
				setRadius(logoLetterPartsArray[i], i);
				recsToHideDelay -= .003;
			};
		};

		//======================================================
		// Animates the logo corners from curved to straight
		//======================================================
		function animateLogoCornersSquare() {
			var delayIncr = 0; 
		
			function setRadius(e, i) {
				//Safari logs invalid tween values for mozBorder
				if(!isSafari) {
					tt(e, .8, {
						mozBorderRadiusTopleft:"0%", webkitBorderTopLeftRadius:"0%", borderTopLeftRadius:"0%",
						mozBorderRadiusTopright:"0%", webkitBorderTopRightRadius:"0%", borderTopRightRadius:"0%",
						mozBorderRadiusBottomleft:"0%", webkitBorderBottomLeftRadius:"0%", borderBottomLeftRadius:"0%",
						mozBorderRadiusBottomright:"0%", webkitBorderBottomRightRadius:"0%", borderBottomRightRadius:"0%",

						ease:Power3.easeInOut,
						delay:delayIncr + .35
					});
				} else {
					tt(e, .8, {
					webkitBorderTopLeftRadius:"0%", borderTopLeftRadius:"0%",
					webkitBorderTopRightRadius:"0%", borderTopRightRadius:"0%",
					webkitBorderBottomLeftRadius:"0%", borderBottomLeftRadius:"0%",
					webkitBorderBottomRightRadius:"0%", borderBottomRightRadius:"0%",

					ease:Power3.easeInOut,
					delay:delayIncr + .35
				});
				}
			};

			//Animate letters to have rounded corners
			for (var i = 0; i < logoLetterPartsArray.length; i+=1) {
				setRadius(logoLetterPartsArray[i], i);
				delayIncr += .01;
			};
		};

		//======================================================
		// Transitions the intro logo out
		//======================================================
		function animateIntroLogoOut() {
			var delay = .45;
			
			for (var i = 1; i <= 8; i+=1) {
				var recToShow = ".rec" + i + ".rec_intro";

				// IE9 doesn't support 3D transform, so use 2D rotate instead,
				// it also shifts the recs a bit to the left so shift back over to right
				if(!isIE9 && !isIE10) {
					ts(recToShow, {visibility:"visible", transformOrigin:"top left", transform:"rotateX(-180deg)", delay:delay});
				// For IE9
				} else if(isIE9) {
					ts(recToShow, {visibility:"visible", transformOrigin:"top left", transform:"rotate(-180deg)", delay:delay});
					ts($("intro_recs"), {x:11});
				} else if(isIE10) {
					ts(recToShow, {visibility:"visible", transformOrigin:"top left", transform:"rotate(-180deg)", delay:delay});
					ts($("intro_recs"), {x:11.5});
				}

				tt(recToShow, .6, {scaleY:(browser_h / 2) + "px", delay:delay, ease:Power3.easeIn});
				tt(recToShow, .7, {y:-800, delay:delay + .25, ease:Power4.easeInOut});
				tt(recToShow, .6, {backgroundColor:"#19D9E5", delay:delay, ease:Power3.easeInOut});
				tt(recToShow, .5, {opacity: 0, delay:delay + .15, ease:Power3.easeInOut});
				delay += .04;
			};
			ts($("intro_recs"), {y:41});
			ts(logoLetterPartsArray, {visibility:"hidden", delay:.77});
			ts($$("i2_top"), {visibility:"hidden", delay:.7});
			ts($$("star_mc"), {overflow:"hidden"});
			tt($$("star"), .9, {x:-20, rotation:"-=180", ease:Power3.easeInOut});
			tt($$("tm"), .4, {autoAlpha:0, ease:Linear.easeNone});
			tt($$("t2"), .8, {scaleX:0, delay:.1, ease:Power4.easeInOut});
		};

		//======================================================
		// Transition intro out
		//======================================================
		function animateIntroOut() {

			//Create site logo assets
			///////////////////////////////////////////////////////////////
			// logo.createSiteLogo();
			
			//Transition triangle graphic out
			tdc(.2, animateTriangleGraphic, ["out"]);

			//Fade out intro grain and remove it to improve performance
			if (!isSafari) tdc(2, removeElement,[$("intro_grain")]);

			//Make logo corners straight right before stripes move up
			tdc(.55, animateLogoCornersSquare);

			//Make logo turn into vertical stripes that move up
			tdc(.95, animateIntroLogoOut);

			//Animate Site logo in corner into view right before overlay fully collapses
			// tdc(2.35, logo.setSiteLogo);

			//Overlay wipes upwards and hides the intro, revealing the site
			tt([$("overlay"), $("intro_grain_container")], .5, {height:0, delay:2, ease:Power3.easeInOut, 
				onComplete:function() {
					removeElement($("overlay"));
					///////////////////////////////////////////////////////////////
					// logo.setSiteLogoDark();

					window.introComplete = true;

					var event = document.createEvent('Event');
					event.initEvent('introLoaded', true, true); //can bubble, and is cancellable
					document.body.dispatchEvent(event);

				}
			});

			//Allow IE scrollbars
			if(isIE10 || isIE11 || isIE12) {
				ts(document.getElementsByTagName("body")[0], {msOverflowStyle:"auto", delay:2.7});
			}

			//!!!! Temporary, please replace with CSS reveal animation !!!!
			// tf($("temp_header"), 1, {height:0, delay:2.3, ease:Power3.easeInOut });

		};

		//======================================================
		// Creates the site logo assets
		//======================================================
		logo.createSiteLogo = function() {

			console.log('createSiteLogo');

			$("site_logo_dark").innerHTML = '';

			//Create site logo
			createLogoAssets($("site_logo_light"));
			createLogoRecAssets($("site_logo_light"));

				//Add additional class to site logo recs
				for (var i = 1; i <= 8; i+=1) {
					$("site_logo_light").querySelector("div.rec" + i).className += " " + "rec_site";
				};

				//Add rollover state to site logo
				$("site_logo_light").addEventListener("mouseenter", onSiteLogoRollOver);

			//Create darker version of logo that sits under Work area header
			createLogoAssets($("site_logo_dark"));
			createLogoRecAssets($("site_logo_dark"));
				//Add rollover state to site logo
				$("site_logo_dark").addEventListener("mouseenter", onSiteLogoRollOver);

		};

		//======================================================
		// Sets the initial state of site logo
		//======================================================
		logo.setSiteLogo = function() {

			console.log('setSiteLogo');

			currentLogo = $("site_logo_light");

			//querySelectorAll getting errors in IE 
			//and not displaying site logo after clearProps
			var logoAllPartsArray = $("site_logo_light").querySelectorAll("*");
			if(isIE || isIE12) {
				for (var i = 0; i < logoAllPartsArray.length; i+=1) {
					ts(logoAllPartsArray[i],{clearProps:"all"});
				}
			} else {
				ts([$("site_logo_light").querySelectorAll("*")], {clearProps:"all"});
				ts([$("site_logo_dark").querySelectorAll("*")], {clearProps:"all"});
			}

			tdc(.45, show, [$("site_logo_light")]);
			ts($$("rec_site"), {backgroundColor:"#19D9E5"});

			tdc(.45, () => {
				
				animateStripesIn();

				setTimeout(() => {
					logo.setSiteLogoDark();
				}, 1200);
				
			});

		};

		logo.staticSiteLogos = function() {
			changeVisibility($("site_logo_light").querySelectorAll("*"), 'visible');
			changeVisibility($("site_logo_dark").querySelectorAll("*"), 'visible');
			changeVisibility($$('logo-rec'), 'hidden');
			logo.setSiteLogoDark();
		}

		function changeVisibility(theArr, visibility) {
			for(var i = 0; i < theArr.length; i++) {
				// console.log(theArr[i]);
				theArr[i].style.visibility = visibility;
			}
		}

		//======================================================
		// Logo rollover effect
		//======================================================
		function onSiteLogoRollOver() {
			//Make star spin
			tt($$("star"), .6, { directionalRotation:"360_cw", ease:Power2.easeOut, clearProps:"rotation"});
		};

		//======================================================
		// Sets logo to use darker color
		//======================================================
		logo.setSiteLogoDark = function() {

			var letters = $("site_logo_dark").querySelectorAll("*");

			ts([letters[0], letters[2], letters[3], letters[4], letters[6], 
				letters[7], letters[9], letters[10], letters[12], letters[13], 
				letters[14], letters[17], letters[19], letters[20], letters[21]], 
				{backgroundColor:"#342E3A"});
			ts(letters[26], {color:"#342E3A"}); //TM symbol
		};

		//======================================================
		// Animates the triangle in
		//======================================================
		function animateTriangleGraphic(transition) {
			//Front bottom stripes
			var str_fr_b_lines = []; createAssetsArray(str_fr_b_lines, "str_fr_b_line", 12);
			var str_fr_b_fills = []; createAssetsArray(str_fr_b_fills, "str_fr_b_fill", 6);
			//Back stripes
			var str_bk_lines = []; createAssetsArray(str_bk_lines, "str_bk_line", 12);
			var str_bk_fills = []; createAssetsArray(str_bk_fills, "str_bk_fill", 6);
			//Front top stripes
			var str_fr_t_lines = []; createAssetsArray(str_fr_t_lines, "str_fr_t_line", 12);
			var str_fr_t_fills = []; createAssetsArray(str_fr_t_fills, "str_fr_t_fill", 6);

			switch (transition) {
				case "in":
					show($("intro_triangle_mc"));
					
					var triangle_lines_TIMELINE_IN = new TimelineMax();
					triangle_lines_TIMELINE_IN
						//Outer triangle
						.from($("tri_outer_line_l"), .5, {y:-190, ease:Power3.easeInOut})
						.from($("tri_outer_line_l_mc"), .5, {opacity:1, ease:Power3.easeInOut}, "-=.5")
						.from($("tri_outer_line_b"), .6, {x:-530, opacity:.8, ease:Power2.easeInOut}, "-=.4")
						.from($("tri_outer_line_r"), .7, {y:390, ease:Power3.easeInOut}, "-=.4")
						.from($("tri_outer_line_r_mc"), .7, {opacity:1, ease:Power3.easeInOut}, "-=.7")

						//Inner triangle
						.from($("tri_inner_line_l"), .5, {y:-230, ease:Power3.easeInOut}, "-=.5")
						.from($("tri_inner_line_l_mc"), .6, {opacity:1, ease:Power3.easeInOut}, "-=.5")
						.from($("tri_inner_line_b"), .5, {x:-400, opacity:.8, ease:Power2.easeInOut}, "-=.4")
						.from($("tri_inner_line_r"), .6, {y:380, ease:Power3.easeInOut}, "-=.4")
						.from($("tri_inner_line_r_mc"), .7, {opacity:1, ease:Power3.easeInOut}, "-=.6")

						//Highlights
						.from($("tri_outer_line_l_highlight"), 2, {y:-260, ease:Power3.easeInOut}, "-=1.7")
						.from($("tri_outer_line_b_highlight"), 1, {x:-230, ease:Power2.easeOut}, "-=1.3")
						.from($("tri_inner_line_l_highlight"), 2, {y:-260, ease:Power3.easeInOut}, "-=1.3")
						.from($("tri_inner_line_b_highlight"), 1, {x:-230, ease:Power2.easeOut}, "-=.9")

						//Text
						.from($("txt1_line"), 1.4, {scaleX:0, fillOpacity:1, fill:"white", transformOrigin:"50% 50%", ease:Power4.easeInOut}, "-=2")
						.from($("txt1"), 1, {y:"+=18", ease:Expo.easeInOut}, "-=1.7")
						.from($("txt2"), 1.5, {opacity:0, ease:Power4.easeOut}, "-=1.2")
						.from($("txt3"), 1.5, {opacity:0, ease:Power4.easeOut}, "-=1.45")

						//Star
						.from($("star_top_mc"), 1, {scale:1.5, rotation:-180, y:"-=10", opacity:0, transformOrigin:"50% 50%", ease:Power4.easeInOut}, "-=2.2");

						//BUG: Safari shows txt1_line as 1 pixel, so hide it until it's ready to be animated
						tdc(1, show, [$("txt1_line")]);

					//Front bottom stripes
					var stripes_front_bottom_TIMELINE_IN = new TimelineMax({delay:.2, paused:false});
						stripes_front_bottom_TIMELINE_IN
							.staggerFrom(str_fr_b_lines, .5, {y:180, ease:Expo.easeInOut}, .04)
							.staggerFrom(str_fr_b_fills, 2.5, {y:180, ease:Power4.easeInOut}, .1, "-=2.1");

					//Back stripes
					var stripes_back_TIMELINE_IN = new TimelineMax({delay:.3, paused:false});
						stripes_back_TIMELINE_IN
							.staggerFrom(str_bk_lines, .5, {y:180, ease:Expo.easeInOut}, .04)
							.staggerFrom(str_bk_fills, 1, {y:180, ease:Power4.easeInOut}, .1, "-=1.1");

					//Front top stripes
					var stripes_front_top_TIMELINE_IN = new TimelineMax({delay:.6, paused:false});
						stripes_front_top_TIMELINE_IN
							.staggerFrom(str_fr_t_lines, .7, {y:200, ease:Power2.easeInOut}, .04)
							.staggerFrom(str_fr_t_fills, 2.5, {y:220, ease:Power4.easeInOut}, .1, "-=2.5");
					break;

				case "out":
					var triangle_lines_TIMELINE_OUT = new TimelineMax();
						triangle_lines_TIMELINE_OUT
							//Inner triangle highlight
							.to($("tri_inner_line_b_highlight"), 1, {x:-230, ease:Power3.easeIn})

							//Inner triangle
							.to($("tri_inner_line_b"), .8, {x:400, ease:Power2.easeInOut}, "-=.4")
							.to($("tri_inner_line_r"), .6, {y:-395, ease:Power3.easeInOut}, "-=.7")
							.to($("tri_inner_line_l_highlight"), 2, {y:260, ease:Power3.easeInOut}, "-=.8")
							.to($("tri_inner_line_l"), .8, {y:230, ease:Power3.easeInOut}, "-=1.8")

							//Outer line highlights
							.to($("tri_outer_line_l_highlight"), .6, {y:260, ease:Power3.easeInOut}, "-=1.7")
							.to($("tri_outer_line_b_highlight"), .6, {x:320, ease:Power2.easeIn}, "-=1.8")

							//Outer triangle
							.to($("tri_outer_line_l"), .6, {y:190, ease:Power3.easeIn}, "-=1.8")
							.to($("tri_outer_line_b"), .6, {x:530, ease:Power2.easeIn}, "-=1.4")
							.to($("tri_outer_line_r"), .7, {y:-400, ease:Power3.easeInOut}, "-=1.4")

							//Text
							.to($("txt2"), 1, {opacity:0, ease:Power3.easeIn}, "-=2.5")
							.to($("txt3"), 1, {opacity:0, ease:Power3.easeIn}, "-=2.4")
							.to($("txt1"), 1, {y:"+=18", ease:Expo.easeIn}, "-=2.4")
							.to($("txt1_line"), 1, {opacity:0, ease:Power4.easeIn}, "-=2.2")

							//Star
							.to($("star_top_mc"), 1, {scale:0, rotation:220, opacity:0, transformOrigin:"50% 50%", ease:Expo.easeIn}, "-=2.5")

							//Hide
							.call(hide, [[$("txt"), $("star_top_mc"), $("inner_triangle"), $("outer_triangle")]]);

						//Front bottom stripes
						var stripes_front_bottom_TIMELINE_OUT = new TimelineMax({delay:.4, paused:false});
							stripes_front_bottom_TIMELINE_OUT
								.staggerTo(str_fr_b_fills, .8, {y:200, ease:Power4.easeIn}, .06)
								.to($("str_fr_b_line1"), .7, {y:210, ease:Power3.easeInOut}, "-=.9")
								.to($("str_fr_b_line2"), .7, {y:180, ease:Power3.easeIn}, "-=.8")
								.to($("str_fr_b_line3"), .7, {y:200, ease:Power3.easeInOut}, "-=.85")
								.to($("str_fr_b_line4"), .7, {y:170, ease:Power3.easeIn}, "-=.75")
								.to($("str_fr_b_line5"), .7, {y:190, ease:Power3.easeInOut}, "-=.8")
								.to($("str_fr_b_line6"), .7, {y:160, ease:Power3.easeIn}, "-=.7")
								.to($("str_fr_b_line7"), .7, {y:180, ease:Power3.easeInOut}, "-=.75")
								.to($("str_fr_b_line8"), .7, {y:150, ease:Power3.easeIn}, "-=.65")
								.to($("str_fr_b_line9"), .7, {y:170, ease:Power3.easeInOut}, "-=.7")
								.to($("str_fr_b_line10"), .7, {y:140, ease:Power3.easeIn}, "-=.7")
								.to($("str_fr_b_line11"), .7, {y:160, ease:Power3.easeInOut}, "-=.75")
								.to($("str_fr_b_line12"), .7, {y:150, ease:Power3.easeIn}, "-=.65")
								.call(hide, [$("stripes_front_bottom")]);

						//Back stripes
						var stripes_back_TIMELINE_OUT = new TimelineMax({delay:.3, paused:false});
							stripes_back_TIMELINE_OUT
								.staggerTo(str_bk_fills, .7, {y:180, ease:Power3.easeInOut}, .05)
								.staggerTo(str_bk_lines, .6, {y:180, ease:Power4.easeIn}, .04, "-=1.5");

						//Front top stripes
						var stripes_front_top_TIMELINE_OUT = new TimelineMax({delay:1, paused:false});
							stripes_front_top_TIMELINE_OUT
								.staggerTo(str_fr_t_fills, .8, {y:200,ease:Power4.easeIn}, .04, "-=.8")
								.staggerTo(str_fr_t_lines, .7, {y:200, ease:Power3.easeInOut}, .04, "-=.6")
								.call(removeElement, [$("intro_triangle_mc")]);
					break;

				default: break;
			}

		};

		//======================================================
		// Add grain/noise effect
		//======================================================
		function addGrain() {
			// Add grain/noise effect
			// https://github.com/sarathsaleem/grained
			var grain_options = {
	         	animate: true,
	         	patternWidth: 200,
			    patternHeight: 200,
			    grainOpacity: 0.025,
			    grainDensity: 1,
			    grainWidth: 1,
			    grainHeight: 1
	 		};

		 		// FYI, Safari adds a transform which makes logo look funky,
		 		// so add static grain instead of animated grain
		 		if (!isSafari) {
		 			grained("#intro_grain", grain_options); 

		 			//Fade intro grain in since it doesn't appear immediately
					tf($("intro_grain"), 1, {opacity:0, ease:Power2.easeInOut});
		 		} 
		 		else if(isSafari) {
		 			if (window.devicePixelRatio > 1) {
		 				ts($("intro_grain_container"), {
		 					backgroundSize:"200px 200px", 
		 					background:"url(../images/misc/intro_noise@2x.png) repeat"
		 				});
		 			} else {
		 				ts($("intro_grain_container"), {
		 					background:"url(../images/misc/intro_noise.png) repeat"
		 				});
		 			}
		 	
		 			hide($("intro_grain"));
		 		} 

		};

		//======================================================
		// Adds diagonal background lines
		//======================================================
		function addDiagonalBackgroundLines() {
			var diagonalLinesHTML = "";
			var lineSetSpacing = 280;
			var lineSetSpacingIncrement = 0;
			var numberOfDiagonalLineSets = Math.ceil(browser_w / lineSetSpacing) + 4; 
			var linesPerSet = 4;
			var numberOfIndividualDiagonalLines = numberOfDiagonalLineSets * linesPerSet;

					//trace("numberOfDiagonalLineSets = " + numberOfDiagonalLineSets);
					//trace("numberOfIndividualDiagonalLines = " + numberOfIndividualDiagonalLines);

			function createLineSets() {	 	
			 	var j = numberOfIndividualDiagonalLines + 1;

			 	for (var i = 1; i <= numberOfDiagonalLineSets; i+=1) {
			 		var lineSet = 

				 	"<div id='" + "lineSet" + i + "'>" + 
				 		"<svg overflow='visible' " + "height='" + browser_diagonal_length + "'>" +
				 			"<g transform='rotate(45)'>" +
				 				"<use " + "id='diagonal_intro_bg_line" + (j-4) + "' " + 
				 					"xlink:href='#diagonal_background_line' transform='translate(-.1,0)' opacity='.5' />" +
				 				"<use " + "id='diagonal_intro_bg_line" + (j-3) + "' " + 
				 					"xlink:href='#diagonal_background_line' transform='translate(-10,0)' opacity='.2' />" +
				 				"<use " + "id='diagonal_intro_bg_line" + (j-2) + "' " + 
				 					"xlink:href='#diagonal_background_line' transform='translate(-20,0)' opacity='.15' />" +
				 				"<use " + "id='diagonal_intro_bg_line" + (j-1) + "' " + 
				 					"xlink:href='#diagonal_background_line' transform='translate(-30,0)' opacity='.1' />" +
				 			"</g>" +
				 		"</svg>" +
				 	"</div>";

				 	diagonalLinesHTML += lineSet;
				 	j -= 4;
			 	};
			 };

			ts($("diagonal_background_line"), {height:browser_diagonal_length});
			createLineSets();
			$("diagonal_background_lines_container").innerHTML =  diagonalLinesHTML;

			//Reposition line sets
			for (var i = 1; i <= numberOfDiagonalLineSets; i+=1) {
			 	lineSetSpacingIncrement += lineSetSpacing;
			 	ts($("lineSet" + i), {display:"block", position:"absolute", top:0, left:lineSetSpacingIncrement});
			};

			//Animate individual lines coming in
			var delay1 = .4;
			var delay2 = 5.1;
			for (var j = numberOfIndividualDiagonalLines; j >= 1; j-=1) {
				tf($("diagonal_intro_bg_line" + j), 1.4, {x:"-=20.1", y:"-=20.1", opacity:0, rotation:"45deg", transformOrigin:"50% 50%", ease:Power4.easeInOut, delay:delay1});
				delay1 += .03;

				if (window.devicePixelRatio <= 1 || !isSafari) {
					//Animate lines fading out right before overlay wipes up
					tt($("diagonal_intro_bg_line" + j), 1.5, {opacity:0, ease:Power4.easeInOut, delay:delay2});
					delay2 -= .03;
				}
			}

			//Make line sets go from lighter to more transparent, left to right
			var lineSetOpacity = 1;
			for (var k = 1; k <= numberOfDiagonalLineSets; k+=1) {
			 	ts($("lineSet" + k), {opacity:lineSetOpacity});
			 	if(isChrome) { lineSetOpacity -= .115; }
			 	else if(isSafari) { lineSetOpacity -= .06; }

			};

		};

		//=============================================================
		// Creates intro HTML
		//=============================================================
		function createIntroAssets() {
		  	var introHTML =
		  		
		  		// ==================================================== 
		  		// Grain / Noise **************************************
		  		// ====================================================
				'<div id="intro_grain_container" class="fullscreen">\
				    <div id="intro_grain" class="fullscreen"></div>\
				    <div id="diagonal_background_lines_container"></div>\
				</div>'+

				// ==================================================== 
		  		// Intro **********************************************
		  		// ====================================================
				'<div id="overlay" class="fullscreen">'+
					// ================================================
		    		// Intro Triangle *********************************
		    		// ================================================
					'<div id="intro_triangle_mc" class="centered noselect"></div>'+
					// ================================================
		    		// Intro Logo *************************************
		    		// ================================================
				    '<div id="intro_logo" class="intro_logo logo centered"></div>\
				    <div id="intro_recs" class="logo centered"></div>\
				  </div>';

			document.body.innerHTML += introHTML;
		};

		//=============================================================
		// Creates logo letters HTML in both intro and site logo
		//=============================================================
		function createLogoAssets(container) {

			// container.innerHTML = '';

		  	var logoHTML = 
		  		"<div class='d1 letter d1__a1'></div>\
		  		<div class='d2'>\
		  			<div class='d2_top letter d2_top__t1_top'></div>\
		  			<div class='d2_bottom letter d2_bottom__t1_bottom'></div>\
		  		</div>\
		  		<div class='a1 letter d1__a1'></div>\
		  		<div class='a2'>\
		  			<div class='a2_top letter a2_top__v1_top'></div>\
		  			<div class='a2_bottom letter a2_bottom__v1_bottom'></div>\
		  		</div>\
		  		<div class='v1'>\
		  			<div class='v1_top letter a2_top__v1_top'></div>\
		  			<div class='v1_bottom letter a2_bottom__v1_bottom'></div>\
		  		</div>\
		  		<div class='v2'>\
		  			<div class='v2_top letter'></div>\
		  			<div class='v2_bottom letter'></div>\
		  		</div>\
		  		<div class='i1 letter'></div>\
		  		<div class='i2'>\
		  			<div class='i2_top letter'></div>\
		  			<div class='i2_bottom letter'></div>\
		  		</div>\
		  		<div class='t1'>\
		  			<div class='t1_top letter d2_top__t1_top'></div>\
		  			<div class='t1_bottom letter d2_bottom__t1_bottom'></div>\
		  		</div>\
		  		<div class='t2 letter'></div>\
		  		<div class='star_mc'>\
		  			<div class='star'>\
		  				<svg width='25.5px' height='25.6px' viewBox='0 0 25.5 25.6'>\
		  					<use xlink:href='#star_shape'/>\
		  				</svg>\
		  			</div>\
		  		</div>";

			container.innerHTML += logoHTML;
		};

		//=============================================================
		// Creates rectangles used in site and intro logo
		//=============================================================
		function createLogoRecAssets(container) {

			// container.innerHTML = '';

		  	var recHTML = 
		  	   "<div class='logo-rec rec1'></div>\
		  		<div class='logo-rec rec2'></div>\
		  		<div class='logo-rec rec3'></div>\
		  		<div class='logo-rec rec4'></div>\
		  		<div class='logo-rec rec5'></div>\
		  		<div class='logo-rec rec6'></div>\
		  		<div class='logo-rec rec7'></div>\
		  		<div class='logo-rec rec8'></div>";

			container.innerHTML += recHTML;
		};

		//=============================================================
		// Creates Triangle Graphic SVG code
		//=============================================================
		function createIntroTriangleSVG() {
		  	var introTriangleHTML = 
		  	   '<svg \
			        baseProfile="basic" image-rendering="auto" shape-rendering="auto" x="0px" y="0px" width="338" height="342" enable-background="new 0 0 338 342">\
			        <defs>'+
			          // ==================================================
			          // Stripes > Front > Top ****************************
			          // ==================================================
			          '<symbol id="str_fr_t_line"><rect width="1" height="208" style="fill:url(#str_fr_t_line_gradient);"/></symbol>\
			            <linearGradient id="str_fr_t_line_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="115" x2="0" y2="0">\
			              <stop stop-color="#FFF" stop-opacity="1" offset="0"/>\
			              <stop stop-color="#FFF" stop-opacity="0.02" offset="1"/>\
			            </linearGradient>\
			          <symbol id="str_fr_t_fill"><rect width="11" height="208" style="fill:url(#str_fr_t_fill_gradient);"/></symbol>\
			            <linearGradient id="str_fr_t_fill_gradient" gradientUnits="userSpaceOnUse" x1="14" y1="106" x2="14" y2="14">\
			              <stop stop-color="#19D9E5" stop-opacity="0.15" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0.01" offset="1"/>\
			            </linearGradient>'+
			          // ==================================================
			          // Stripes > Front > Bottom *************************
			          // ==================================================
			          '<symbol id="str_fr_b_line"><rect width="1" height="207" style="fill:url(#str_fr_b_line_gradient);"/></symbol>\
			            <linearGradient id="str_fr_b_line_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="114" x2="0" y2="0">\
			              <stop stop-color="#FFF" stop-opacity="1" offset="0"/>\
			              <stop stop-color="#FFF" stop-opacity="0.02" offset="1"/>\
			            </linearGradient>\
			          <symbol id="str_fr_b_fill"><rect width="11" height="207" style="fill:url(#str_fr_b_fill_gradient);"/></symbol>\
			            <linearGradient id="str_fr_b_fill_gradient" gradientUnits="userSpaceOnUse" x1="14" y1="140" x2="14" y2="14">\
			              <stop stop-color="#19D9E5" stop-opacity="0.15" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0.01" offset="1"/>\
			            </linearGradient>'+
			          // ==================================================
			          // Stripes > Back ***********************************
			          // ==================================================
			          '<symbol id="str_bk_line"><rect width="1" height="180" style="fill:url(#str_bk_line_gradient);"/></symbol>\
			            <linearGradient id="str_bk_line_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="188" x2="0" y2="0">\
			              <stop stop-color="#000" stop-opacity="0.23" offset="0"/>\
			              <stop stop-color="#000" stop-opacity="0" offset="1"/>\
			            </linearGradient>\
			          <symbol id="str_bk_fill"><rect width="11" height="180" style="fill:url(#str_bk_fill_gradient);"/></symbol>\
			            <linearGradient id="str_bk_fill_gradient" gradientUnits="userSpaceOnUse" x1="14" y1="175" x2="14" y2="0">\
			              <stop stop-color="#19D9E5" stop-opacity="0.03" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			            </linearGradient>'+
			          // ==================================================
			          // Outer Triangle > Left ****************************
			          // ==================================================
			          '<symbol id="tri_outer_line_l_highlight_shape"><rect width="3" height="250" style="fill:url(#tri_outer_line_l_highlight_gradient);"/></symbol>\
			            <linearGradient id="tri_outer_line_l_highlight_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="250" x2="0" y2="0">\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="1" offset="0.5"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			            </linearGradient>\
			          <linearGradient id="tri_outer_line_l_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="250" x2="0" y2="0">\
			            <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			            <stop stop-color="#19D9E5" stop-opacity="1" offset="0.18"/>\
			            <stop stop-color="#19D9E5" stop-opacity="1" offset="0.8"/>\
			            <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			          </linearGradient>'+
			          // ==================================================
			          // Outer Triangle > Right ***************************
			          // ==================================================
			            '<linearGradient id="tri_outer_line_r_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="500" x2="0" y2="0">\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="1" offset="0.2"/>\
			              <stop stop-color="#19D9E5" stop-opacity="1" offset="0.8"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			            </linearGradient>'+
			          // ==================================================
			          // Outer Triangle > Bottom **************************
			          // ==================================================
			          '<symbol id="tri_outer_line_b_highlight_shape"><path fill="url(#tri_outer_line_b_highlight_gradient)" d="M250,3L250,0 0,0 0,2.95 250,3"/></symbol>\
			            <linearGradient id="tri_outer_line_b_highlight_gradient" gradientUnits="userSpaceOnUse" x1="250" y1="0" x2="0" y2="0">\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="1" offset="0.5"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			            </linearGradient>\
			          <linearGradient id="tri_outer_line_b_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="538" y2="0">\
			            <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			            <stop stop-color="#19D9E5" stop-opacity="1" offset="0.17"/>\
			            <stop stop-color="#19D9E5" stop-opacity="1" offset="0.82"/>\
			            <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			          </linearGradient>'+
			          // ==================================================
			          // Inner Triangle > Left ****************************
			          // ==================================================
			          '<symbol id="tri_inner_line_l_highlight_shape"><rect width="3" height="250" style="fill:url(#tri_outer_line_l_highlight_gradient);"/></symbol>\
			            <linearGradient id="tri_inner_line_l_highlight_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="250" x2="10" y2="0">\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="1" offset="0.5"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			            </linearGradient>\
			          <linearGradient id="tri_inner_line_l_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="0" y2="0">\
			            <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			            <stop stop-color="#19D9E5" stop-opacity="1" offset="0.23"/>\
			            <stop stop-color="#19D9E5" stop-opacity="1" offset="0.79"/>\
			            <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			          </linearGradient>'+
			          // ==================================================
			          // Inner Triangle > Right ***************************
			          // ==================================================
			            '<linearGradient id="tri_inner_line_r_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="500" x2="0" y2="0">\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="1" offset="0.23"/>\
			              <stop stop-color="#19D9E5" stop-opacity="1" offset="0.79"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			            </linearGradient>'+
			          // ==================================================
			          // Inner Triangle > Bottom **************************
			          // ==================================================
			          '<symbol id="tri_inner_line_b_highlight_shape"><path fill="url(#tri_inner_line_b_highlight_gradient)" d="M250,3L250,0 0,0 0,2.95 250,3"/></symbol>\
			            <linearGradient id="tri_inner_line_b_highlight_gradient" gradientUnits="userSpaceOnUse" x1="250" y1="0" x2="0" y2="0">\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			              <stop stop-color="#19D9E5" stop-opacity="1" offset="0.5"/>\
			              <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			            </linearGradient>\
			          <linearGradient id="tri_inner_line_b_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="412" y2="0">\
			            <stop stop-color="#19D9E5" stop-opacity="0" offset="0"/>\
			            <stop stop-color="#19D9E5" stop-opacity="1" offset="0.12"/>\
			            <stop stop-color="#19D9E5" stop-opacity="1" offset="0.86"/>\
			            <stop stop-color="#19D9E5" stop-opacity="0" offset="1"/>\
			          </linearGradient>'+
			          // ==================================================
			          // Star *********************************************
			          // ==================================================
			          '<linearGradient id="star_top_highlight_gradient" gradientUnits="userSpaceOnUse" x1="5" y1="14" x2="14" y2="5">\
			            <stop stop-color="#2CF6F9" stop-opacity="0.4" offset="0"/>\
			            <stop stop-color="#2CF6F9" stop-opacity="0" offset="1"/>\
			          </linearGradient>\
			        </defs>'+
			        
			        '<g id="intro_triangle" overflow="visible">\
			          <g id="inner_triangle">'+
			            // ==================================================
			            // Inner Triangle ***********************************
			            // ==================================================
			                  // Line > Left
			                  '<g mask="url(#tri_inner_line_l_mask)">\
			                    <g id="tri_inner_line_l_mc" transform="translate(48, 116) rotate(26.25, 1.5, 151.5)" opacity="0.12">\
			                      <rect id="tri_inner_line_l" width="3" height="300" style="fill:url(#tri_inner_line_l_gradient);"/>\
			                    </g>\
			                  </g>'+
			                        // Highlight
			                        '<g mask="url(#tri_inner_line_l_mask)">\
			                          <g id="tri_inner_line_l_highlight_mc" transform="translate(15, 207) rotate(26.25, 1.5, 126.5)" opacity="0.3">\
			                            <use id="tri_inner_line_l_highlight" xlink:href="#tri_inner_line_l_highlight_shape"/>\
			                          </g>\
			                        </g>'+
			                              // Mask
			                              '<mask id="tri_inner_line_l_mask">\
			                                <g transform="translate(15.9, 191.8)"><path fill="#FFF" d="M70.1,0L68.15,2 0,140.2 1.45,139.2 70.1,0"/></g>\
			                              </mask>'+
			                  // Line > Right
			                  '<g mask="url(#tri_inner_line_r_mask)">\
			                    <g id="tri_inner_line_r_mc" transform="translate(261, -38) rotate(-26.25, 1.5, 251.5)" opacity="0.1">\
			                      <rect id="tri_inner_line_r" width="3" height="500" style="fill:url(#tri_inner_line_r_gradient);"/>\
			                    </g>\
			                  </g>'+
			                        // Mask
			                        '<mask id="tri_inner_line_r_mask">\
			                          <g transform="translate(197.15, 80.05)">\
			                            <path fill="#FFF" d="M0.65,0L0,0.65 68.85,140.3 69.5,139.6 0.65,0"/>\
			                            <path fill="#FFF" d="M106.35,214.3L105.65,214.95 123.4,250.95 124.85,251.95 124.85,251.9 106.35,214.3"/>\
			                          </g>\
			                        </mask>'+
			                  // Line > Bottom
			                  '<g mask="url(#tri_inner_line_b_mask)">\
			                    <g id="tri_inner_line_b" transform="translate(-37, 330)" opacity="0.08">\
			                      <path fill="url(#tri_inner_line_b_gradient)" d="M412,3L412,0 0,0 0,3 412,3"/>\
			                    </g>\
			                  </g>'+
			                        // Highlight
			                        '<g mask="url(#tri_inner_line_b_mask)">\
			                          <use id="tri_inner_line_b_highlight" xlink:href="#tri_inner_line_b_highlight_shape" transform="translate(-109, 330)" opacity="0.74"/>\
			                        </g>'+
			                              // Mask
			                              '<mask id="tri_inner_line_b_mask">\
			                                <g transform="translate(15.9, 331)">\
			                                  <path fill="#FFF" d="M306.1,1L304.65,0 250.9,0 249.9,1 306.1,1"/>\
			                                  <path fill="#FFF" d="M138.4,1L139.4,0 1.45,0 0,1 138.4,1"/>\
			                                </g>\
			                              </mask>\
			          </g>'+

			          '<g id="outer_triangle">'+
			          // ==================================================
			          // Outer Triangle ***********************************
			          // ==================================================
			                // Line > Left
			                '<g mask="url(#tri_outer_line_l_mask)">\
			                  <g id="tri_outer_line_l_mc" transform="translate(32, 150) rotate(26.25, 1.5, 126.5)" opacity="0.12">\
			                    <rect id="tri_outer_line_l" width="3" height="250" style="fill:url(#tri_outer_line_l_gradient);"/>\
			                  </g>\
			                </g>'+
			                      // Highlight
			                      '<g mask="url(#tri_outer_line_l_mask)">\
			                        <g id="tri_outer_line_l_highlight_mc" transform="translate(0, 215) rotate(26.25, 1.5, 126.5)" opacity="0.74">\
			                          <use id="tri_outer_line_l_highlight" xlink:href="#tri_outer_line_l_highlight_shape"/>\
			                        </g>\
			                      </g>'+
			                            // Mask
			                            '<mask id="tri_outer_line_l_mask">\
			                              <g transform="translate(0, 213.5)">\
			                                <path fill="#FFF" d="M64.3,0L62.35,2 0,128.35 0,128.5 1.45,127.5 64.3,0"/>\
			                              </g>\
			                            </mask>'+
			                //Line > Right
			                '<g mask="url(#tri_outer_line_r_mask)">\
			                  <g id="tri_outer_line_r_mc" transform="translate(272, -38) rotate(-26.25, 1.5, 251.5)" opacity="0.08">\
			                    <rect id="tri_outer_line_r" x="0" y="0" width="3" height="500" style="fill:url(#tri_outer_line_r_gradient);"/>\
			                  </g>\
			                </g>'+
			                      //Mask
			                      '<mask id="tri_outer_line_r_mask">\
			                        <g transform="translate(204.5, 72.65)">\
			                          <path fill="#FFF" d="M0.65,0L0,0.7 68.85,140.35 69.5,139.65 0.65,0"/>\
			                          <path fill="#FFF" d="M106.35,214.35L105.65,215 132,268.35 133.4,269.35 133.5,269.35 106.35,214.35"/>\
			                        </g>\
			                      </mask>'+
			                //Line > Bottom
			                '<g mask="url(#tri_outer_line_b_mask)">\
			                  <g id="tri_outer_line_b" transform="translate(-100, 340)" opacity="0.08">\
			                    <path fill="url(#tri_outer_line_b_gradient)" d="M538,3L538,0 0,0 0,3 538,3"/>\
			                  </g>\
			                </g>'+
			                      //Highlight
			                      '<g mask="url(#tri_outer_line_b_mask)">\
			                        <use id="tri_outer_line_b_highlight" xlink:href="#tri_outer_line_b_highlight_shape" transform="translate(-125, 340)" opacity="0.25"/>\
			                      </g>'+
			                            //Mask
			                            '<mask id="tri_outer_line_b_mask">\
			                              <g transform="translate(0, 341)">\
			                                <path fill="#FFF" d="M337.9,1L336.5,0 256.8,0 255.8,1 337.9,1"/>\
			                                <path fill="#FFF" d="M144.3,1L145.3,0 1.45,0 0,1 144.3,1"/>\
			                              </g>\
			                            </mask>\
			          </g>'+
			          
			          '<g id="stripes_back">'+
			          //==================================================
			          //Stripes > Back ***********************************
			          //==================================================
			                '<g mask="url(#str_bk_mask)">\
			                  <g id="str_bk" transform="translate(142, 113) rotate(-60, 38, 90)">\
			                    <use id="str_bk_fill1" xlink:href="#str_bk_fill" x="65"/>\
			                    <use id="str_bk_fill2" xlink:href="#str_bk_fill" x="52"/>\
			                    <use id="str_bk_fill3" xlink:href="#str_bk_fill" x="39"/>\
			                    <use id="str_bk_fill4" xlink:href="#str_bk_fill" x="26"/>\
			                    <use id="str_bk_fill5" xlink:href="#str_bk_fill" x="13"/>\
			                    <use id="str_bk_fill6" xlink:href="#str_bk_fill" x="0" />\
			                    \
			                    <use id="str_bk_line1"  xlink:href="#str_bk_line" x="75"/>\
			                    <use id="str_bk_line2"  xlink:href="#str_bk_line" x="65"/>\
			                    <use id="str_bk_line3"  xlink:href="#str_bk_line" x="62"/>\
			                    <use id="str_bk_line4"  xlink:href="#str_bk_line" x="52"/>\
			                    <use id="str_bk_line5"  xlink:href="#str_bk_line" x="49"/>\
			                    <use id="str_bk_line6"  xlink:href="#str_bk_line" x="39"/>\
			                    <use id="str_bk_line7"  xlink:href="#str_bk_line" x="36"/>\
			                    <use id="str_bk_line8"  xlink:href="#str_bk_line" x="26"/>\
			                    <use id="str_bk_line9"  xlink:href="#str_bk_line" x="23"/>\
			                    <use id="str_bk_line10" xlink:href="#str_bk_line" x="13"/>\
			                    <use id="str_bk_line11" xlink:href="#str_bk_line" x="10"/>\
			                    <use id="str_bk_line12" xlink:href="#str_bk_line" x="0" />\
			                  </g>\
			                </g>\
			                <mask id="str_bk_mask">\
			                  <g transform="translate(85.35, 136.85)">\
			                    <path fill="#FFF" d="M179.25,84.85L169.95,66 55.6,0 0,55.65 132.2,131.95 179.25,84.85"/>\
			                  </g>\
			                </mask>\
			          </g>'+
			          
			          '<g id="stripes_front_bottom">'+
			          // ==================================================
			          // Stripes > Front > Bottom *************************
			          // ==================================================
			                '<g mask="url(#str_fr_b_mask)">\
			                  <g id="str_fr_b" transform="translate(182, 228) rotate(45, 38.5, 94.5)">\
			                    <use id="str_fr_b_fill6" xlink:href="#str_fr_b_fill" x="65" y="1"/>\
			                    <use id="str_fr_b_fill5" xlink:href="#str_fr_b_fill" x="52" y="-4"/>\
			                    <use id="str_fr_b_fill4" xlink:href="#str_fr_b_fill" x="39" y="-8"/>\
			                    <use id="str_fr_b_fill3" xlink:href="#str_fr_b_fill" x="26" y="-13"/>\
			                    <use id="str_fr_b_fill2" xlink:href="#str_fr_b_fill" x="13" y="-17"/>\
			                    <use id="str_fr_b_fill1" xlink:href="#str_fr_b_fill" x="0"  y="-21"/>\
			                    \
			                    <use id="str_fr_b_line12" xlink:href="#str_fr_b_line" x="75" y="1"   opacity=".1"/>\
			                    <use id="str_fr_b_line11" xlink:href="#str_fr_b_line" x="65" y="1"   opacity=".2"/>\
			                    <use id="str_fr_b_line10" xlink:href="#str_fr_b_line" x="62" y="-4"  opacity=".1"/>\
			                    <use id="str_fr_b_line9"  xlink:href="#str_fr_b_line" x="52" y="-4"  opacity=".2"/>\
			                    <use id="str_fr_b_line8"  xlink:href="#str_fr_b_line" x="49" y="-8"  opacity=".1"/>\
			                    <use id="str_fr_b_line7"  xlink:href="#str_fr_b_line" x="39" y="-8"  opacity=".2"/>\
			                    <use id="str_fr_b_line6"  xlink:href="#str_fr_b_line" x="36" y="-13" opacity=".1"/>\
			                    <use id="str_fr_b_line5"  xlink:href="#str_fr_b_line" x="26" y="-13" opacity=".2"/>\
			                    <use id="str_fr_b_line4"  xlink:href="#str_fr_b_line" x="23" y="-17" opacity=".1"/>\
			                    <use id="str_fr_b_line3"  xlink:href="#str_fr_b_line" x="13" y="-17" opacity=".2"/>\
			                    <use id="str_fr_b_line2"  xlink:href="#str_fr_b_line" x="10" y="-21" opacity=".1"/>\
			                    <use id="str_fr_b_line1"  xlink:href="#str_fr_b_line" x="0"  y="-21" opacity=".2"/>\
			                  </g>\
			                </g>\
			                <mask id="str_fr_b_mask">\
			                  <g transform="translate(144.3, 212.3)">\
			                    <path fill="#FFF" d="M0,129.7L111.5,129.7 166.55,74.7 129.7,0 0,129.7"/>\
			                  </g>\
			                </mask>\
			          </g>'+
			          
			          '<g id="stripes_front_top">'+
			          // ==================================================
			          // Stripes > Front > Top ****************************
			          // ==================================================
			                '<g mask="url(#str_fr_t_mask)">\
			                  <g id="str_fr_t" transform="translate(77, 13) rotate(45, 38, 94)">\
			                    <use id="str_fr_t_fill1" xlink:href="#str_fr_t_fill" x="65" y="1"/>\
			                    <use id="str_fr_t_fill2" xlink:href="#str_fr_t_fill" x="52" y="-4"/>\
			                    <use id="str_fr_t_fill3" xlink:href="#str_fr_t_fill" x="39" y="-8"/>\
			                    <use id="str_fr_t_fill4" xlink:href="#str_fr_t_fill" x="26" y="-13"/>\
			                    <use id="str_fr_t_fill5" xlink:href="#str_fr_t_fill" x="13" y="-17"/>\
			                    <use id="str_fr_t_fill6" xlink:href="#str_fr_t_fill" x="0"  y="-21"/>\
			                    \
			                    <use id="str_fr_t_line1"  xlink:href="#str_fr_t_line" x="75" y="1"   opacity=".1"/>\
			                    <use id="str_fr_t_line2"  xlink:href="#str_fr_t_line" x="65" y="1"   opacity=".2"/>\
			                    <use id="str_fr_t_line3"  xlink:href="#str_fr_t_line" x="62" y="-4"  opacity=".1"/>\
			                    <use id="str_fr_t_line4"  xlink:href="#str_fr_t_line" x="52" y="-4"  opacity=".2"/>\
			                    <use id="str_fr_t_line5"  xlink:href="#str_fr_t_line" x="49" y="-8"  opacity=".1"/>\
			                    <use id="str_fr_t_line6"  xlink:href="#str_fr_t_line" x="39" y="-8"  opacity=".2"/>\
			                    <use id="str_fr_t_line7"  xlink:href="#str_fr_t_line" x="36" y="-13" opacity=".1"/>\
			                    <use id="str_fr_t_line8"  xlink:href="#str_fr_t_line" x="26" y="-13" opacity=".2"/>\
			                    <use id="str_fr_t_line9"  xlink:href="#str_fr_t_line" x="23" y="-17" opacity=".1"/>\
			                    <use id="str_fr_t_line10" xlink:href="#str_fr_t_line" x="13" y="-17" opacity=".2"/>\
			                    <use id="str_fr_t_line11" xlink:href="#str_fr_t_line" x="10" y="-21" opacity=".1"/>\
			                    <use id="str_fr_t_line12" xlink:href="#str_fr_t_line" x="0"  y="-21" opacity=".2"/>\
			                  </g>\
			                </g>\
			                <mask id="str_fr_t_mask">\
			                  <g transform="translate(62.35, -0.699)">\
			                    <path fill="#FFF" d="M142.8,73.4L106.6,0 0,216.25 142.8,73.4"/>\
			                  </g>\
			                </mask>\
			          </g>'+
			          
			          '<g id="txt">'+
			          // ==================================================
			          // Text 3 *******************************************
			          // ==================================================
			                '<g id="txt3" transform="translate(143.05, 298.7)">\
			                  <path fill="#2E7074" \
			                        d="M15.101,3.751Q14.901,3.251 14.601,2.901 14.301,2.601 13.851,2.401 13.451,2.201 13.001,2.201 12.551,2.201 12.101,2.401 11.651,2.601 11.351,2.951 11.051,3.301 10.851,3.801 10.651,4.301 10.651,4.851 10.651,5.451 10.851,5.901 11.001,6.401 11.351,6.751 11.651,7.101 12.051,7.301 12.501,7.501 13.001,7.501 13.451,7.501 13.851,7.301 14.301,7.101 14.601,6.751 14.901,6.451 15.101,5.951 15.251,5.451 15.251,4.851 15.251,4.251 15.101,3.751 M14.351,4.001Q14.451,4.401 14.451,4.851 14.451,5.351 14.351,5.701 14.251,6.051 14.051,6.301 13.851,6.551 13.551,6.651 13.301,6.801 13.001,6.801 12.701,6.801 12.401,6.651 12.101,6.501 11.901,6.251 11.701,6.001 11.601,5.601 11.501,5.251 11.501,4.801 11.501,4.351 11.601,4.001 11.701,3.651 11.901,3.401 12.101,3.151 12.401,3.001 12.651,2.901 12.951,2.901 13.251,2.901 13.551,3.001 13.801,3.151 14.001,3.401 14.201,3.651 14.351,4.001"/>\
			                  <path fill="#2E7074" \
			                        d="M16.301,3.601Q16.218,3.809 16.176,4.051 16.101,4.392 16.101,4.801 16.101,4.955 16.101,5.101 16.137,5.57 16.251,5.951 16.401,6.451 16.701,6.801 17.001,7.151 17.351,7.301 17.701,7.451 18.151,7.451 18.551,7.451 19.001,7.201 19.401,6.951 19.651,6.551L19.651,6.951 19.701,7.351 20.501,7.351 20.451,6.901 20.401,0.351 20.451,0.201 20.551,0.051 19.651,0.051 19.651,3.051Q19.501,2.651 19.101,2.451 18.751,2.201 18.201,2.201 17.801,2.201 17.451,2.351 17.051,2.501 16.751,2.801 16.451,3.101 16.301,3.601 M17.351,3.201Q17.551,3.001 17.801,2.901 18.001,2.851 18.351,2.851L18.651,2.901 19.001,3.051 19.301,3.301Q19.401,3.401 19.451,3.601L19.551,4.101 19.601,4.801Q19.601,5.451 19.501,5.851 19.401,6.051 19.301,6.251L19.001,6.501 18.651,6.701 18.301,6.751Q17.601,6.751 17.251,6.201 16.988,5.75 16.926,5.101 16.901,4.887 16.901,4.651 16.901,4.321 16.951,4.051 17.049,3.503 17.351,3.201"/>\
			                  <path fill="#2E7074" \
			                        d="M9.451,3.501L9.851,2.751Q9.551,2.501 9.251,2.351 8.901,2.201 8.501,2.201 7.901,2.201 7.401,2.501 6.901,2.751 6.701,3.301L6.701,2.301 5.901,2.301 5.901,7.351 6.701,7.351 6.701,4.901Q6.701,4.501 6.801,4.151 6.951,3.801 7.201,3.501 7.451,3.251 7.751,3.051 8.101,2.901 8.451,2.901L8.801,2.951 9.051,3.051 9.451,3.501"/>\
			                  <path fill="#2E7074" \
			                        d="M4.251,3.201Q4.401,2.851 4.401,2.451 4.401,2.051 4.251,1.701 4.151,1.351 3.901,1.051 3.601,0.801 3.201,0.651 2.801,0.501 2.251,0.501L0.051,0.501 0.051,7.351 0.851,7.351 0.851,4.351 2.301,4.351Q2.851,4.351 3.251,4.201 3.651,4.051 3.901,3.751 4.151,3.501 4.251,3.201 M2.851,1.301Q3.101,1.401 3.251,1.601 3.451,1.751 3.501,2.001 3.601,2.201 3.601,2.451 3.601,3.001 3.301,3.301 2.951,3.651 2.201,3.651L0.851,3.651 0.851,1.201 2.251,1.201Q2.601,1.201 2.851,1.301"/>\
			                  <path fill="#2E7074" \
			                        d="M49.901,2.701Q49.701,2.451 49.401,2.301 49.101,2.201 48.801,2.201 48.301,2.201 47.901,2.501 47.451,2.751 47.151,3.201L47.151,2.301 46.351,2.301 46.351,7.351 47.151,7.351 47.151,4.451Q47.151,4.101 47.301,3.801 47.401,3.501 47.651,3.301 47.851,3.101 48.101,3.001 48.401,2.901 48.651,2.901 49.001,2.901 49.301,3.201 49.401,3.401 49.501,3.651 49.551,3.951 49.551,4.351L49.551,7.351 50.351,7.351 50.351,4.301Q50.351,3.751 50.251,3.351 50.101,2.951 49.901,2.701"/>\
			                  <path fill="#2E7074" \
			                        d="M45.101,3.751Q44.901,3.251 44.601,2.901 44.301,2.601 43.851,2.401 43.451,2.201 43.001,2.201 42.551,2.201 42.101,2.401 41.651,2.601 41.351,2.951 41.051,3.301 40.851,3.801 40.651,4.301 40.651,4.851 40.651,5.451 40.851,5.901 41.001,6.401 41.351,6.751 41.651,7.101 42.051,7.301 42.501,7.501 43.001,7.501 43.451,7.501 43.851,7.301 44.301,7.101 44.601,6.751 44.901,6.451 45.101,5.951 45.251,5.451 45.251,4.851 45.251,4.251 45.101,3.751 M42.401,3.001Q42.651,2.901 42.951,2.901 43.251,2.901 43.551,3.001 43.801,3.151 44.001,3.401 44.201,3.651 44.351,4.001 44.451,4.401 44.451,4.851 44.451,5.351 44.351,5.701 44.251,6.051 44.051,6.301 43.851,6.551 43.551,6.651 43.301,6.801 43.001,6.801 42.701,6.801 42.401,6.651 42.101,6.501 41.901,6.251 41.701,6.001 41.601,5.601 41.501,5.251 41.501,4.801 41.501,4.351 41.601,4.001 41.701,3.651 41.901,3.401 42.101,3.151 42.401,3.001"/>\
			                  <path fill="#2E7074" \
			                        d="M39.851,7.351L39.851,6.701 38.701,6.701 38.701,2.301 36.651,2.301 36.651,2.951 37.901,2.951 37.901,6.701 36.601,6.701 36.601,7.351 39.851,7.351"/>\
			                  <path fill="#2E7074" \
			                        d="M37.901,0.301Q37.751,0.451 37.751,0.701 37.751,0.951 37.901,1.101 38.051,1.251 38.301,1.251 38.501,1.251 38.701,1.101 38.851,0.951 38.851,0.701 38.851,0.501 38.701,0.301 38.501,0.151 38.301,0.151 38.051,0.151 37.901,0.301"/>\
			                  <path fill="#2E7074" \
			                        d="M35.501,2.951L35.501,2.301 33.851,2.301 33.951,1.151 34.051,0.851 33.151,1.001 33.101,2.301 31.851,2.301 31.851,2.951 33.051,2.951 32.951,5.401Q32.901,6.501 33.251,6.951 33.651,7.451 34.401,7.451 34.801,7.451 35.201,7.301 35.601,7.151 36.001,6.901L35.751,6.251Q35.101,6.701 34.601,6.701 34.301,6.701 34.151,6.601 33.951,6.501 33.851,6.301 33.751,6.051 33.751,5.701L33.751,4.801Q33.751,3.951 33.851,2.951L35.501,2.951"/>\
			                  <path fill="#2E7074" \
			                        d="M29.401,2.901Q29.751,2.901 30.001,2.951 30.251,3.051 30.451,3.201L30.701,3.451 30.801,3.651 30.801,3.751 30.851,3.801 31.451,3.151Q31.101,2.701 30.651,2.451 30.151,2.251 29.551,2.251 29.001,2.251 28.551,2.401 28.051,2.601 27.751,2.951 27.401,3.301 27.201,3.801 27.001,4.301 27.001,4.851 27.001,5.401 27.201,5.901 27.401,6.351 27.751,6.701 28.051,7.101 28.501,7.251 28.951,7.451 29.501,7.451 30.051,7.451 30.501,7.251 31.001,7.101 31.351,6.701L30.901,6.151Q30.351,6.751 29.551,6.751 29.201,6.751 28.851,6.601 28.551,6.451 28.301,6.201 28.101,5.901 27.951,5.551 27.801,5.201 27.801,4.751 27.801,4.351 27.951,4.001 28.101,3.651 28.301,3.401 28.501,3.151 28.801,3.051 29.101,2.901 29.401,2.901"/>\
			                  <path fill="#2E7074" \
			                        d="M25.801,2.301L25.001,2.301 25.001,5.101Q25.001,5.551 24.901,5.851 24.751,6.201 24.601,6.401 24.401,6.601 24.151,6.701 23.901,6.801 23.651,6.851 23.401,6.851 23.201,6.751 23.001,6.651 22.801,6.451 22.651,6.251 22.551,5.951 22.501,5.601 22.501,5.151L22.501,2.301 21.701,2.301 21.701,5.151Q21.701,5.751 21.801,6.201 21.951,6.601 22.201,6.901 22.451,7.201 22.751,7.351 23.051,7.451 23.451,7.451 23.951,7.451 24.351,7.251 24.751,7.001 25.001,6.601L25.001,7.351 25.851,7.351 25.801,6.901 25.801,2.301"/>\
			                </g>'+
			                
			          // ==================================================
			          // Text 2 *******************************************
			          // ==================================================
			                '<g id="txt2" transform="translate(121.3, 285.7)">\
			                  <path fill="#2E7074" \
			                        d="M92.6,2.15Q91.85,2.15 91.35,2.6 90.85,2.1 90.1,2.1 89.75,2.1 89.4,2.25 89.1,2.4 88.8,2.65 88.55,2.85 88.4,3.2 88.3,3.4 88.3,3.65L89.05,3.65Q89.05,3.55 89.05,3.45 89.15,3.25 89.3,3.05 89.45,2.9 89.65,2.85 89.85,2.75 90.1,2.75 90.3,2.75 90.5,2.85 90.7,2.9 90.85,3.05 91,3.25 91.1,3.45 91.2,3.65 91.2,3.85 91.2,4.05 91.1,4.25 91,4.45 90.85,4.6 90.7,4.75 90.5,4.85 90.3,4.95 90.1,4.95 89.85,4.95 89.65,4.85 89.45,4.75 89.3,4.65 89.15,4.45 89.05,4.25L89.05,4.2 88.3,4.2Q88.35,4.45 88.45,4.65 88.65,5 89,5.25 88.45,5.75 88.45,6.2 88.45,6.7 88.85,6.9 88.45,7.15 88.2,7.45 88,7.7 88,8 88,8.25 88.15,8.45 88.3,8.7 88.55,8.85 88.8,9 89.25,9.1 89.7,9.2 90.3,9.2 90.9,9.2 91.3,9.05 91.75,8.95 92.05,8.7 92.3,8.5 92.45,8.25 92.6,7.95 92.6,7.65 92.6,7.4 92.5,7.15 92.4,6.9 92.15,6.75 91.95,6.6 91.6,6.5 91.25,6.4 90.75,6.4L89.9,6.45Q89.55,6.45 89.3,6.35 89.1,6.2 89.1,6.05 89.1,5.8 89.45,5.45 89.8,5.6 90.1,5.6 90.45,5.6 90.8,5.45 91.15,5.3 91.4,5.05 91.65,4.85 91.75,4.5 91.9,4.2 91.9,3.85 91.9,3.4 91.65,3 92.05,2.8 92.55,2.8L92.85,2.8 92.7,2.15 92.6,2.15 M91.9,7.7Q91.9,7.9 91.75,8.05 91.65,8.25 91.45,8.35 91.2,8.5 90.95,8.55 90.65,8.6 90.35,8.6L89.7,8.55Q89.45,8.5 89.2,8.4 89,8.3 88.85,8.2 88.75,8.05 88.75,7.8 88.75,7.6 88.9,7.4 89.05,7.2 89.35,7.05L90.9,7.1Q91.4,7.1 91.65,7.25 91.85,7.4 91.9,7.7"/>\
			                  <path fill="#2E7074" \
			                        d="M86.85,4.25Q86.85,3.7 86.75,3.3 86.6,2.9 86.4,2.65 86.2,2.4 85.9,2.25 85.6,2.15 85.3,2.15 84.8,2.15 84.4,2.45 83.95,2.7 83.65,3.15L83.65,2.25 82.85,2.25 82.85,7.3 83.65,7.3 83.65,4.4Q83.65,4.05 83.8,3.75 83.9,3.45 84.15,3.25 84.35,3.05 84.6,2.95 84.9,2.85 85.15,2.85 85.5,2.85 85.8,3.15 85.9,3.35 86,3.6 86.05,3.9 86.05,4.3L86.05,7.3 86.85,7.3 86.85,4.25"/>\
			                  <path fill="#2E7074" \
			                        d="M81.95,7.3L81.95,6.65 80.8,6.65 80.8,2.25 78.75,2.25 78.75,2.9 80,2.9 80,6.65 78.7,6.65 78.7,7.3 81.95,7.3"/>\
			                  <path fill="#2E7074" \
			                        d="M80,0.25Q79.85,0.4 79.85,0.65 79.85,0.9 80,1.05 80.15,1.2 80.4,1.2 80.6,1.2 80.8,1.05 80.95,0.9 80.95,0.65 80.95,0.45 80.8,0.25 80.6,0.1 80.4,0.1 80.15,0.1 80,0.25"/>\
			                  <path fill="#2E7074" \
			                        d="M78.05,2.95Q77.7,2.55 77.25,2.35 76.75,2.15 76.2,2.15 75.75,2.15 75.4,2.25 75.05,2.4 74.8,2.55 74.55,2.75 74.4,3 74.25,3.25 74.25,3.5 74.25,3.75 74.35,3.95 74.4,4.15 74.55,4.3L74.9,4.6 75.45,4.85 76.1,5.05Q76.8,5.3 77.1,5.5 77.35,5.7 77.35,5.95 77.35,6.15 77.25,6.3 77.1,6.45 76.95,6.55L76.55,6.7 75.65,6.75 74.75,6.35 74.5,6.1 74.4,5.95 74.4,5.85 73.95,6.6Q74.8,7.4 76.05,7.4 76.55,7.4 76.9,7.3 77.3,7.15 77.6,6.95 77.85,6.7 78,6.4 78.15,6.1 78.15,5.8 78.15,5.55 78.05,5.35 77.95,5.1 77.75,4.95 77.55,4.75 77.2,4.6 76.9,4.45 76.4,4.35L75.7,4.1 75.3,3.9 75.1,3.7Q75.05,3.6 75.05,3.5 75.05,3.3 75.15,3.15 75.2,3.05 75.35,2.95L75.7,2.8 76.1,2.75Q76.6,2.75 76.95,2.95 77.3,3.2 77.5,3.45L77.55,3.55Q77.55,3.65 77.6,3.65L78.05,2.95"/>\
			                  <path fill="#2E7074" \
			                        d="M71.6,0.25Q71.4,0.1 71.2,0.1 70.95,0.1 70.8,0.25 70.65,0.4 70.65,0.65 70.65,0.9 70.8,1.05 70.95,1.2 71.2,1.2 71.4,1.2 71.6,1.05 71.75,0.9 71.75,0.65 71.75,0.45 71.6,0.25"/>\
			                  <path fill="#2E7074" \
			                        d="M72.75,6.65L71.6,6.65 71.6,2.25 69.55,2.25 69.55,2.9 70.8,2.9 70.8,6.65 69.5,6.65 69.5,7.3 72.75,7.3 72.75,6.65"/>\
			                  <path fill="#2E7074" \
			                        d="M66.75,1.1L66.85,0.8 65.95,0.95 65.9,2.25 64.65,2.25 64.65,2.9 65.85,2.9 65.75,5.35Q65.7,6.45 66.05,6.9 66.45,7.4 67.2,7.4 67.6,7.4 68,7.25 68.4,7.1 68.8,6.85L68.55,6.2Q67.9,6.65 67.4,6.65 67.1,6.65 66.95,6.55 66.75,6.45 66.65,6.25 66.55,6 66.55,5.65L66.55,4.75Q66.55,3.9 66.65,2.9L68.3,2.9 68.3,2.25 66.65,2.25 66.75,1.1"/>\
			                  <path fill="#2E7074" \
			                        d="M62.3,2.15Q61.7,2.15 61.2,2.45 60.7,2.7 60.5,3.25L60.5,2.25 59.7,2.25 59.7,7.3 60.5,7.3 60.5,4.85Q60.5,4.45 60.6,4.1 60.75,3.75 61,3.45 61.25,3.2 61.55,3 61.9,2.85 62.25,2.85L62.6,2.9 62.85,3 63.25,3.45 63.65,2.7Q63.35,2.45 63.05,2.3 62.7,2.15 62.3,2.15"/>\
			                  <path fill="#2E7074" \
			                        d="M53.05,2.25L52.3,2.25 52.05,3.25 50.8,6.2 49.35,2.55 49.35,2.4 49.4,2.25 48.45,2.25 50.45,7.35 51.05,7.35 52.25,4.45Q52.8,3.2 53.05,2.25"/>\
			                  <path fill="#2E7074" \
			                        d="M47.85,0.15L47.95,0 47.05,0 47.05,3Q46.9,2.6 46.5,2.4 46.15,2.15 45.6,2.15 45.2,2.15 44.85,2.3 44.45,2.45 44.15,2.75 43.85,3.05 43.7,3.55 43.55,3.9 43.5,4.4L44.3,4.4Q44.35,3.55 44.75,3.15 44.95,2.95 45.2,2.85 45.4,2.8 45.75,2.8L46.05,2.85 46.4,3 46.7,3.25Q46.8,3.35 46.85,3.55L46.95,4.05 47,4.75Q47,5.4 46.9,5.8 46.8,6 46.7,6.2L46.4,6.45 46.05,6.65 45.7,6.7Q45,6.7 44.65,6.15 44.5,5.9 44.4,5.55 44.35,5.3 44.35,5.05L43.5,5.05Q43.55,5.3 43.6,5.55 43.6,5.75 43.65,5.9 43.8,6.4 44.1,6.75 44.4,7.1 44.75,7.25 45.1,7.4 45.55,7.4 45.95,7.4 46.4,7.15 46.8,6.9 47.05,6.5L47.05,6.9 47.1,7.3 47.9,7.3 47.85,6.85 47.8,0.3 47.85,0.15"/>\
			                  <path fill="#2E7074" \
			                        d="M22.8,2.95Q23.1,2.85 23.35,2.85 23.7,2.85 24,3.15 24.1,3.35 24.2,3.6 24.25,3.9 24.25,4.3L24.25,7.3 25.05,7.3 25.05,4.25Q25.05,3.7 24.95,3.3 24.8,2.9 24.6,2.65 24.4,2.4 24.1,2.25 23.8,2.15 23.5,2.15 23,2.15 22.6,2.45 22.15,2.7 21.85,3.15L21.85,2.25 21.05,2.25 21.05,7.3 21.85,7.3 21.85,4.4Q21.85,4.05 22,3.75 22.1,3.45 22.35,3.25 22.55,3.05 22.8,2.95"/>\
			                  <path fill="#2E7074" \
			                        d="M18.1,1.2Q18.3,1.2 18.5,1.05 18.65,0.9 18.65,0.65 18.65,0.45 18.5,0.25 18.3,0.1 18.1,0.1 17.85,0.1 17.7,0.25 17.55,0.4 17.55,0.65 17.55,0.9 17.7,1.05 17.85,1.2 18.1,1.2"/>\
			                  <path fill="#2E7074" \
			                        d="M16.45,2.9L17.7,2.9 17.7,6.65 16.4,6.65 16.4,7.3 19.65,7.3 19.65,6.65 18.5,6.65 18.5,2.25 16.45,2.25 16.45,2.9"/>\
			                  <path fill="#2E7074" \
			                        d="M10.55,4.25Q10.55,3.7 10.45,3.3 10.3,2.9 10.1,2.65 9.9,2.4 9.6,2.25 9.3,2.15 9,2.15 8.5,2.15 8.1,2.45 7.65,2.7 7.35,3.15L7.35,2.25 6.55,2.25 6.55,7.3 7.35,7.3 7.35,4.4Q7.35,4.05 7.5,3.75 7.6,3.45 7.85,3.25 8.05,3.05 8.3,2.95 8.6,2.85 8.85,2.85 9.2,2.85 9.5,3.15 9.6,3.35 9.7,3.6 9.75,3.9 9.75,4.3L9.75,7.3 10.55,7.3 10.55,4.25"/>\
			                  <path fill="#2E7074" \
			                        d="M11.75,0L11.75,0.6 13.15,0.6 13.15,6.65 11.65,6.65 11.65,7.3 15.4,7.3 15.4,6.65 13.95,6.65 13.95,0 11.75,0"/>\
			                  <path fill="#2E7074" \
			                        d="M4.2,1.2Q3.85,0.8 3.4,0.6 3,0.35 2.5,0.35 1.95,0.35 1.5,0.6 1.05,0.85 0.7,1.3 0.4,1.75 0.2,2.4 0,3.35 0,3.85 0,4.65 0.2,5.3 0.35,5.95 0.7,6.4 1,6.9 1.5,7.15 1.7,7.3 1.95,7.35 2.2,7.4 2.5,7.4 2.95,7.4 3.35,7.25 3.8,7.05 4.1,6.65 4.45,6.2 4.65,5.55 4.8,5.1 4.9,3.85 4.9,3.25 4.7,2.3 4.55,1.65 4.2,1.2 M3.55,1.7Q3.8,2 3.95,2.5 4.1,3.05 4.1,3.85 4.1,4.7 3.95,5.2 3.8,5.75 3.6,6.1 3.35,6.4 3.05,6.55 2.8,6.65 2.5,6.65 2.15,6.65 1.9,6.5 1.6,6.35 1.35,6.05 1.1,5.7 0.95,5.15 0.8,4.55 0.8,3.8 0.8,3 0.95,2.45 1.1,1.95 1.35,1.65 1.6,1.35 1.9,1.2 2.15,1.1 2.5,1.1 2.8,1.1 3.05,1.25 3.3,1.35 3.55,1.7"/>\
			                  <path fill="#2E7074" \
			                        d="M56.75,2.2L56.75,2.825Q56.775,2.84 56.8,2.85 57.05,3 57.2,3.15 57.4,3.35 57.5,3.6 57.6,3.8 57.6,4.1L57.6,4.25 54.85,4.25Q54.95,3.5 55.35,3.1 55.55,2.95 55.8,2.85 55.925,2.8 56.05,2.775L56.05,2.175Q55.726,2.212 55.45,2.35 55.05,2.5 54.7,2.85 54.4,3.2 54.2,3.65 54.05,4.15 54.05,4.8 54.05,5.45 54.2,5.9 54.4,6.4 54.7,6.75 55.05,7.05 55.5,7.25 55.95,7.4 56.5,7.4 57.6,7.4 58.25,6.65L57.8,6.2Q57.3,6.75 56.5,6.75 56.2,6.75 55.9,6.7 55.6,6.6 55.4,6.35 55.15,6.15 55,5.8 54.8,5.45 54.8,4.9L58.35,4.9 58.4,4.7 58.4,4.55Q58.4,3.9 58.25,3.45 58.05,3 57.8,2.75 57.5,2.45 57.1,2.3 56.931,2.228 56.75,2.2"/>\
			                  <path fill="#2E7074" \
			                        d="M30.85,4.9L30.9,4.7 30.9,4.55Q30.9,3.9 30.75,3.45 30.55,3 30.3,2.75 30,2.45 29.6,2.3 29.408,2.218 29.2,2.175L29.2,2.825Q29.25,2.83 29.3,2.85 29.55,3 29.7,3.15 29.9,3.35 30,3.6 30.1,3.8 30.1,4.1L30.1,4.25 27.35,4.25Q27.45,3.5 27.85,3.1 28.05,2.95 28.3,2.85 28.425,2.8 28.55,2.775L28.55,2.175Q28.226,2.212 27.95,2.35 27.55,2.5 27.2,2.85 26.9,3.2 26.7,3.65 26.55,4.15 26.55,4.8 26.55,5.45 26.7,5.9 26.9,6.4 27.2,6.75 27.55,7.05 28,7.25 28.45,7.4 29,7.4 30.1,7.4 30.75,6.65L30.3,6.2Q29.8,6.75 29,6.75 28.7,6.75 28.4,6.7 28.1,6.6 27.9,6.35 27.65,6.15 27.5,5.8 27.3,5.45 27.3,4.9L30.85,4.9"/>\
			                  <path fill="#2E7074" \
			                        d="M42.05,7.3L42.8,7.3 40.2,0.35 40.1,0.35 37.65,7.3 38.45,7.3 39.1,5.3 39.95,5.3 39.95,4.7 39.25,4.7 40.1,2.1 41.1,4.7 40.4,4.7 40.4,5.3 41.25,5.3 42.05,7.3"/>\
			                  <path fill="#2E7074" \
			                        d="M44.351,4.601Q44.352,4.524 44.351,4.451L43.551,4.451Q43.555,4.525 43.551,4.601 43.551,4.699 43.551,4.801 43.551,4.955 43.551,5.101L44.376,5.101Q44.351,4.887 44.351,4.651L44.351,4.601"/>\
			                  <path fill="#2E7074" \
			                        d="M88.326,4.251L89.101,4.251Q89.051,4.076 89.051,3.901 89.051,3.801 89.076,3.701L88.326,3.701Q88.301,3.821 88.301,3.951 88.301,4.105 88.326,4.251"/>\
			                  <path fill="#2E7074" \
			                        d="M56.75,2.825L56.75,2.2Q56.557,2.15 56.35,2.15 56.195,2.15 56.05,2.175L56.05,2.775Q56.175,2.75 56.3,2.75 56.525,2.75 56.75,2.825"/>\
			                  <path fill="#2E7074" \
			                        d="M28.55,2.775Q28.675,2.75 28.8,2.75 29,2.75 29.2,2.825L29.2,2.175Q29.03,2.15 28.85,2.15 28.695,2.15 28.55,2.175L28.55,2.775"/>\
			                  <path fill="#2E7074" \
			                        d="M40.4,5.3L40.4,4.7 39.95,4.7 39.95,5.3 40.4,5.3"/>\
			                </g>'+
			                
			          // ==================================================
			          // Text 1 *******************************************
			          // ==================================================
			                '<rect id="txt1_line" \
			                        x="138" y="154" width="61" height="1" style="fill:#19D9E5; fill-opacity:0.059; visibility:hidden"/>\
			                        \
			                <g mask="url(#txt1_mask)">\
			                  <g id="txt1" transform="translate(148.1, 137.7)" opacity="0.4">\
			                    <path fill="#19D9E5" \
			                          d="M42.1,1.45Q42.1,1.15 42,0.9 41.85,0.65 41.65,0.45 41.4,0.2 41.1,0.1 40.8,0 40.45,0 40.1,0 39.8,0.1 39.5,0.25 39.3,0.45 39.05,0.65 38.95,0.95 38.8,1.2 38.8,1.55 38.8,2 39.05,2.35 39.3,2.75 39.75,3 39.45,3.1 39.25,3.3 39,3.5 38.85,3.7 38.65,3.95 38.6,4.2 38.5,4.45 38.5,4.75 38.5,5.1 38.65,5.4 38.8,5.7 39.05,5.9 39.3,6.15 39.65,6.25 40,6.4 40.4,6.4 40.8,6.4 41.15,6.25 41.5,6.15 41.75,5.9 42,5.7 42.15,5.35 42.3,5.05 42.3,4.7 42.3,4.15 42,3.7 41.65,3.2 41.1,2.95 41.55,2.75 41.85,2.35 42.1,1.9 42.1,1.45 M41.15,0.85Q41.25,1 41.35,1.15 41.4,1.3 41.4,1.5 41.4,1.85 41.2,2.2 40.95,2.5 40.55,2.7L40.4,2.65 39.95,2.35Q39.75,2.2 39.65,2 39.45,1.75 39.45,1.45 39.45,1.3 39.55,1.1 39.6,0.95 39.75,0.85 39.85,0.7 40.05,0.65 40.2,0.55 40.45,0.55 40.65,0.55 40.8,0.65 41,0.7 41.15,0.85 M41.6,4.7Q41.6,4.9 41.5,5.1 41.4,5.3 41.25,5.45 41.1,5.6 40.9,5.7 40.65,5.75 40.4,5.75 40.15,5.75 39.95,5.7 39.75,5.6 39.55,5.45 39.4,5.3 39.3,5.1 39.2,4.9 39.2,4.65 39.2,4.2 39.5,3.85 39.8,3.45 40.25,3.25 40.85,3.45 41.25,3.85 41.6,4.25 41.6,4.7"/>\
			                    <path fill="#19D9E5" \
			                          d="M36.8,0.8Q36.55,0.4 36.2,0.2 35.8,0 35.35,0 35,0 34.7,0.15 34.35,0.3 34.1,0.6 33.85,0.85 33.7,1.25 33.6,1.6 33.6,2.05 33.6,2.5 33.7,2.85 33.85,3.25 34.1,3.5 34.3,3.75 34.65,3.9 34.95,4.05 35.3,4.05 35.7,4.05 36,3.85 36.35,3.7 36.6,3.35 36.55,4.65 36.15,5.2 35.8,5.75 35.05,5.75 34.65,5.75 34.35,5.55L34.25,5.4 34.2,5.3 33.7,5.85Q34.25,6.4 35.05,6.4 35.5,6.4 35.9,6.2 36.3,6 36.6,5.65 36.9,5.25 37.1,4.7 37.2,4.3 37.25,3.3 37.25,1.6 36.8,0.8 M36.45,1.65Q36.55,1.95 36.55,2.35L36.55,2.65Q36.35,3 36,3.2 35.7,3.45 35.3,3.45 35.1,3.45 34.9,3.35 34.75,3.25 34.6,3.05 34.45,2.9 34.35,2.6 34.25,2.35 34.25,2.05 34.25,1.7 34.35,1.45 34.4,1.2 34.55,1 34.9,0.65 35.4,0.65 35.6,0.65 35.85,0.75 36.05,0.9 36.2,1.1 36.35,1.35 36.45,1.65"/>\
			                    <path fill="#19D9E5" \
			                          d="M31.8,0.8Q31.55,0.4 31.2,0.2 30.8,0 30.35,0 30,0 29.7,0.15 29.35,0.3 29.1,0.6 28.85,0.85 28.7,1.25 28.6,1.6 28.6,2.05 28.6,2.5 28.7,2.85 28.85,3.25 29.1,3.5 29.3,3.75 29.65,3.9 29.95,4.05 30.3,4.05 30.7,4.05 31,3.85 31.35,3.7 31.6,3.35 31.55,4.65 31.15,5.2 30.8,5.75 30.05,5.75 29.65,5.75 29.35,5.55L29.25,5.4 29.2,5.3 28.7,5.85Q29.25,6.4 30.05,6.4 30.5,6.4 30.9,6.2 31.3,6 31.6,5.65 31.9,5.25 32.1,4.7 32.2,4.3 32.25,3.3 32.25,1.6 31.8,0.8 M31.45,1.65Q31.55,1.95 31.55,2.35L31.55,2.65Q31.35,3 31,3.2 30.7,3.45 30.3,3.45 30.1,3.45 29.9,3.35 29.75,3.25 29.6,3.05 29.45,2.9 29.35,2.6 29.25,2.35 29.25,2.05 29.25,1.7 29.35,1.45 29.4,1.2 29.55,1 29.9,0.65 30.4,0.65 30.6,0.65 30.85,0.75 31.05,0.9 31.2,1.1 31.35,1.35 31.45,1.65"/>\
			                    <path fill="#19D9E5" \
			                          d="M26.9,0.05L26.4,0.05 24.8,0.9 24.95,1.3 26.2,0.95 26.2,6.3 26.9,6.3 26.9,0.05"/>\
			                    <path fill="#19D9E5" \
			                          d="M15.7,5.45Q15.5,5.25 15.3,5.25 15.05,5.25 14.85,5.45 14.7,5.6 14.7,5.85 14.7,6.1 14.85,6.25 15.05,6.4 15.3,6.4 15.55,6.4 15.7,6.25 15.9,6.05 15.9,5.85 15.9,5.6 15.7,5.45"/>\
			                    <path fill="#19D9E5" \
			                          d="M11.25,0.4L10.5,0.5 10.4,1.75 9.3,1.75 9.3,2.3 10.35,2.3 10.25,4.55Q10.25,5.5 10.55,5.95 10.9,6.4 11.6,6.4 12,6.4 12.35,6.25 12.7,6.15 13.05,5.9L12.8,5.3Q12.25,5.75 11.8,5.75 11.5,5.75 11.35,5.65 11.2,5.5 11.1,5.35 11.05,5.15 11,4.8L11,4Q11,3.2 11.1,2.3L12.6,2.3 12.6,1.75 11.1,1.75 11.2,0.65 11.25,0.55 11.25,0.4"/>\
			                    <path fill="#19D9E5" \
			                          d="M7.8,2.95L8.2,2.35Q7.9,2 7.45,1.8 7.05,1.6 6.5,1.6 6.15,1.6 5.8,1.7 5.5,1.85 5.25,2 5,2.15 4.9,2.4 4.75,2.6 4.75,2.85 4.75,3.1 4.85,3.25 4.9,3.45 5.05,3.6L5.35,3.85 5.85,4.1 6.45,4.25Q7.1,4.45 7.35,4.65 7.6,4.85 7.6,5.1 7.6,5.25 7.5,5.4 7.4,5.55 7.2,5.65L6.85,5.75 6.45,5.8 6.05,5.8 5.7,5.7 5.2,5.45 4.9,5.05 4.9,4.95 4.45,5.7Q5.25,6.4 6.4,6.4 6.85,6.4 7.2,6.3 7.55,6.15 7.8,5.95 8.05,5.75 8.15,5.5 8.3,5.25 8.3,4.95 8.3,4.7 8.2,4.5 8.1,4.3 7.95,4.15 7.75,4 7.45,3.85 7.15,3.75 6.7,3.6L5.75,3.25 5.55,3.05Q5.5,2.95 5.5,2.85 5.5,2.65 5.55,2.55 5.65,2.4 5.8,2.35L6.1,2.2 6.45,2.15Q6.9,2.15 7.2,2.35 7.55,2.55 7.75,2.8L7.75,2.9Q7.75,2.95 7.8,2.95"/>\
			                    <path fill="#19D9E5" \
			                          d="M3.4,2.15Q3.15,1.9 2.8,1.75 2.45,1.6 2.1,1.6 1.65,1.6 1.25,1.8 0.9,1.95 0.6,2.25 0.3,2.55 0.15,3 0,3.45 0,4.05 0,4.6 0.15,5.05 0.3,5.5 0.6,5.8 0.9,6.1 1.3,6.25 1.7,6.4 2.2,6.4 3.25,6.4 3.8,5.7L3.4,5.3Q2.95,5.8 2.25,5.8 1.95,5.8 1.7,5.75 1.45,5.65 1.2,5.45 1,5.25 0.85,4.9 0.7,4.6 0.7,4.1L3.95,4.1 3.95,3.8Q3.95,3.25 3.8,2.8 3.65,2.4 3.4,2.15 M3.15,2.9Q3.25,3.15 3.25,3.4L3.25,3.45 3.2,3.55 0.7,3.55Q0.8,2.85 1.2,2.5 1.4,2.35 1.6,2.25 1.8,2.15 2.05,2.15 2.3,2.15 2.5,2.25 2.7,2.35 2.9,2.55 3.05,2.7 3.15,2.9"/>\
			                  </g>\
			                </g>\
			                <mask id="txt1_mask">\
			                  <rect x="138" y="136" width="61" height="18" style="fill:#FFF"/>\
			                </mask>\
			          </g>'+
			          
			          // ==================================================
			          // Star *********************************************
			          // ==================================================
			                '<g id="star_top_mc" \
			                      transform="translate(158.95, 86.95)">\
			                  <path id="star_top" \
			                          fill="#19D9E5" fill-opacity="0.4" d="M19.65,7.05L12.55,7.05 9.85,0 7.15,7.05 0,7.05 5.45,11.5 3.45,18.6 9.85,14.4 16.2,18.6 13.9,11.5 19.65,7.05"/>\
			                  <path id="star_top_highlight" \
			                          fill="url(#star_top_highlight_gradient)" \
			                          d="M13.9,11.5L19.65,7.05 12.55,7.05 9.85,0 7.15,7.05 0,7.05 5.45,11.5 3.45,18.6 9.85,14.4 16.2,18.6 13.9,11.5 M12.75,11.05L14.45,16.2 9.85,13.15 5.15,16.25 6.6,11.05 3,8.05 8.05,8.05 9.85,3.25 11.7,8.05 16.6,8.05 12.75,11.05"/>\
			                </g>\
			        </g>\
			      </svg>';

			document.getElementById("intro_triangle_mc").innerHTML += introTriangleHTML;
		};


export default logo