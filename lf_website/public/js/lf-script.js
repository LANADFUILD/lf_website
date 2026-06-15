function __each(e, t = !1) {
	return e
		? window === this
			? new __each(e, t)
			: ((this.node =
					"string" == typeof e
						? t
							? t.querySelectorAll(e)
							: document.querySelectorAll(e)
						: void 0 === e.length
						? [e]
						: e),
			  this)
		: window === this
		? new __each(e)
		: this;
}
__each.prototype = {
	removeClass: function () {
		for (var e = 0; e < this.node.length; e++)
			for (var t = 0; t < arguments.length; t++) this.node[e].classList.remove(arguments[t]);
		return this;
	},
	addClass: function () {
		for (var e = 0; e < this.node.length; e++)
			for (var t = 0; t < arguments.length; t++) this.node[e].classList.add(arguments[t]);
		return this;
	},
	prop: function (e, t) {
		for (var s = 0; s < this.node.length; s++) this.node[s].setAttribute(e, t);
		return this;
	},
	hasClass: function (e, t) {
		for (var s = 0; s < this.node.length; s++) {
			if (this.node[s].classList.contains(e)) return t(this.node[s], !0), this.node[s];
			t(this.node[s], !1);
		}
	},
	forAll: function (e) {
		for (var t = 0; t < this.node.length; t++) e(this.node[t], t);
	},
	switchClass: function (e) {
		for (var t = 0; t < this.node.length; t++)
			this.node[t].classList.contains(e)
				? this.node[t].classList.remove(e)
				: this.node[t].classList.add(e);
		return this;
	},
	click: function (e = !1) {
		for (var t = 0; t < this.node.length; t++)
			e && e instanceof Function
				? this.node[t].addEventListener("click", function (t) {
						e.call(this, t);
				  })
				: this.node[t].click();
	},
	parent: function () {
		for (var e = 0; e < this.node.length; e++) this.node[e] = this.node[e].parentElement;
		return this;
	},
	next: function () {
		for (var e = 0; e < this.node.length; e++)
			this.node[e].nextElementSibling && (this.node[e] = this.node[e].nextElementSibling);
		return this;
	},
	prev: function () {
		for (var e = 0; e < this.node.length; e++)
			this.node[e].previousElementSibling &&
				(this.node[e] = this.node[e].previousElementSibling);
		return this;
	},
	walk: function (e) {
		for (var t = 0; t < this.node.length; t++) e(this.node[t], t);
		return this;
	},
	whenInViewbox: function (e = !1) {
		if ("IntersectionObserver" in window) {
			let s = { root: null, rootMargin: "500px", threshold: 0 };
			var t;
			if (arguments[1] && "object" == typeof arguments[1])
				for (t in arguments[1]) s.hasOwnProperty(t) && (s[t] = arguments[1][t]);
			let n = new IntersectionObserver((t, s) => {
				t.forEach((t) => {
					t.intersectionRatio > 0 &&
						e &&
						e instanceof Function &&
						(e(t.target), s.unobserve(t.target));
				});
			}, s);
			for (i = 0; i < this.node.length; i++) n.observe(this.node[i]);
		} else e && e instanceof Function && this.node.forEach((t) => e(t));
		return this;
	},
	importModule: function (e = null, t = "script") {
		if ("" !== e && null != e)
			return (
				("stylesheet" != t && "css" != t && "style" != t) ||
					((tagName = "link"),
					(sourceAttrName = "href"),
					(rel = "stylesheet"),
					(t = "text/css")),
				("js" != t && "script" != t) ||
					((tagName = "script"),
					(sourceAttrName = "src"),
					(rel = ""),
					(t = "text/javascript")),
				new Promise((s) => {
					(node = document.createElement(tagName)),
						node.setAttribute(sourceAttrName, e),
						node.setAttribute("rel", rel),
						node.setAttribute("type", t),
						document.getElementsByTagName("head")[0].appendChild(node),
						(node.onload = function () {
							s(!0);
						});
				})
			);
		console.error("ImportModule expects a link to the module.");
	},
	imgLazify: function () {
		var e,
			t = {
				className: "wkio-lazify",
				srcAttr: "data-src",
				altAttr: "data-alt",
				removeClass: "true",
				afterClass: "wk-lazify-loaded",
				bgImg: !1,
			};
		if (arguments[0] && "object" == typeof arguments[0])
			for (e in arguments[0]) t.hasOwnProperty(e) && (t[e] = arguments[0][e]);
		this.node.forEach((e) => {
			(src = ""),
				(allImgs =
					"IMG" == e.nodeName || t.bgImg ? [e] : e.querySelectorAll("." + t.className)),
				allImgs.forEach((e) => {
					var s = new Image();
					e.getAttribute(t.srcAttr) &&
						"" != e.getAttribute(t.srcAttr) &&
						((s.src = e.getAttribute(t.srcAttr)),
						(s.onload = () => {
							"IMG" == e.nodeName && (e.src = e.getAttribute(t.srcAttr)),
								null != e.getAttribute(t.altAttr) &&
									null != e.getAttribute(t.altAttr) &&
									(e.alt = e.getAttribute(t.altAttr)),
								__each(e).addClass(t.afterClass),
								"true" == t.removeClass && __each(e).removeClass(t.className);
						}));
				});
		});
	},
};
var elementExist = (e) => (
	"string" == typeof e && (e = document.querySelector(e)), null != e || null != e
);
function setCookie(e, t, s) {
	var n = new Date();
	n.setTime(n.getTime() + 24 * s * 60 * 60 * 1e3);
	var a = "expires=" + n.toUTCString();
	document.cookie = e + "=" + t + ";" + a + ";path=/";
}
function getCookie(e) {
	for (var t = e + "=", s = document.cookie.split(";"), n = 0; n < s.length; n++) {
		for (var a = s[n]; " " == a.charAt(0); ) a = a.substring(1);
		if (0 == a.indexOf(t)) return a.substring(t.length, a.length);
	}
	return "";
}
function isMobileTablet() {
	var e,
		t = !1;
	return (
		(e = navigator.userAgent || navigator.vendor || window.opera),
		(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
			e
		) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				e.substr(0, 4)
			)) &&
			(t = !0),
		t
	);
}
(Array.prototype.unique = function () {
	return this.filter(function (e, t, s) {
		return s.indexOf(e) === t;
	});
}),
	document.addEventListener("DOMContentLoaded", () => {
		var e = document.body,
			t = document.querySelector(".bs-main-navigation-items"),
			s = document.getElementById("wk-hamburger-toggler"),
			n =
				(document.querySelector(".float-text"),
				document.querySelectorAll(
					".bs-main-navigation .bs-parent-navs>.menu-item-has-children>.menu-block"
				)),
			a = document.querySelectorAll(".navigation-menu .menu-item-has-children .sub-menu"),
			r = document.querySelector(".bs-feature-slider");
		n.length &&
			(n.forEach((e) => {
				e.addEventListener("click", function (e) {
					e.stopPropagation();
					var t = this;
					t.classList.contains("wk-active")
						? (__each(t.nextElementSibling)
								.removeClass("menu-slide-up")
								.addClass("menu-slide-down"),
						  setTimeout(() => {
								__each(t.nextElementSibling).removeClass("menu-on");
						  }, 300),
						  __each(t).removeClass("wk-active"))
						: (__each(n).removeClass("wk-active"),
						  __each(a).hasClass("menu-slide-up", (e, s) => {
								t.nextSibling.classList.add("menu-on"),
									1 == s &&
										(__each(e).removeClass("menu-slide-up", "menu-on"),
										t.nextSibling.classList.remove("menu-slide-down"),
										t.nextSibling.classList.add("menu-on"));
						  }),
						  t.nextElementSibling.classList.remove("menu-slide-down"),
						  t.nextElementSibling.classList.add("menu-slide-up", "menu-on"),
						  t.classList.add("wk-active"));
				});
			}),
			window.addEventListener("click", (e) => {
				__each(n).removeClass("wk-active"),
					__each(a).hasClass("menu-slide-up", (e, t) => {
						1 == t &&
							(__each(e).removeClass("menu-slide-up").addClass("menu-slide-down"),
							setTimeout(() => {
								__each(e).removeClass("menu-on");
							}, 300));
					});
			}),
			__each(a).forAll((e) => {
				e.addEventListener("click", (e) => {
					e.stopPropagation();
				});
			})),
			__each(".wk-lazify").whenInViewbox((e) => {
				__each(e).imgLazify({ className: "wk-lazify" });
			}),
			__each(".wk-bg-lazify").whenInViewbox((e) => {
				(bsBGLazyStatus = !0),
					null != e.getAttribute("responsive") &&
						window.innerWidth < e.getAttribute("responsive") &&
						(bsBGLazyStatus = !1),
					bsBGLazyStatus &&
						__each(e).imgLazify({
							className: "wk-bg-lazify",
							bgImg: !0,
							afterClass: "wk-bg-lazify",
						});
			}),
			__each(".wkdata-loading").whenInViewbox((e) => {
				__each(e).removeClass("wkdata-loading").addClass("wkdata-loaded");
			}),
			__each(".img-loading").whenInViewbox((e) => {
				__each(e).imgLazify({ className: "img-loading", altAttr: "data-alt" });
			}),
			__each(".wk-defer-frame").whenInViewbox((e) => {
				e.setAttribute("src", e.getAttribute("data-src"));
			});
		var o = document.querySelector("header.bs_download_navigation"),
			l = (document.querySelector("header"), document.querySelector(".show-banners"));
		if (
			(elementExist(o) &&
				(null != l &&
					l.classList.contains("notification-visible") &&
					(l.style.visibility = "hidden"),
				window.innerWidth > 768 && elementExist(l) && (l.style.display = "none")),
			elementExist(s) &&
				s.addEventListener("click", () => {
					__each(t).switchClass("mobi-nav-active"),
						e.classList.contains("fixed-header")
							? __each(e).removeClass("fixed-header")
							: __each(e).addClass("fixed-header"),
						__each(e).switchClass("overflow-hide"),
						document.querySelector("#bs-logo").classList.remove("transparent");
				}),
			elementExist(r))
		) {
			var i = document.querySelectorAll("#slide-carousel .slide-tab"),
				c = document.querySelectorAll("#slide-carousel .slide-item"),
				u = document.getElementById("slide-prev"),
				m = document.getElementById("slide-next");
			i.forEach((e) => {
				e.addEventListener("click", () => {
					__each(i).removeClass("sld-active"),
						__each(e).addClass("sld-active"),
						(tabid = e.getAttribute("data-attr")),
						c.forEach((e) => {
							(itemid = e.getAttribute("data-attr")),
								tabid == itemid
									? __each(e).addClass("sld-active")
									: __each(e).removeClass("sld-active");
						});
				});
			}),
				m.addEventListener("click", () => {
					__each(i).hasClass("sld-active", (e, t) => {
						1 == t &&
							e.parentNode.nextElementSibling &&
							(__each(e).removeClass("sld-active"),
							(nextitem = e.parentNode.nextElementSibling.firstChild),
							nextitem.classList.add("sld-active"),
							(nextitemid = nextitem.getAttribute("data-attr")),
							c.forEach((e) => {
								(itemid = e.getAttribute("data-attr")),
									nextitemid == itemid
										? (__each(e).addClass("sld-active"),
										  e.classList.add("trns-left"))
										: (__each(e).removeClass("sld-active"),
										  __each(e).removeClass("trns-left"));
							}));
					});
				}),
				u.addEventListener("click", () => {
					__each(i).hasClass("sld-active", (e, t) => {
						1 == t &&
							e.parentNode.previousElementSibling &&
							(__each(e).removeClass("sld-active"),
							(previtem = e.parentNode.previousElementSibling.firstChild),
							previtem.classList.add("sld-active"),
							(previtemid = previtem.getAttribute("data-attr")),
							c.forEach((e) => {
								(itemid = e.getAttribute("data-attr")),
									previtemid == itemid
										? (__each(e).addClass("sld-active"),
										  e.classList.add("trns-right"))
										: (__each(e).removeClass("sld-active"),
										  __each(e).removeClass("trns-right"));
							}));
					});
				});
		}
		if (elementExist(document.querySelector(".bs-roadmap-page"))) {
			var p = document.querySelectorAll(".filter-wraps");
			p.forEach((e) => {
				e.addEventListener("click", function (e) {
					"LI" == e.target.nodeName ||
						"UL" == e.target.nodeName ||
						"SPAN" == e.target.nodeName ||
						e.target.classList.contains("bs-rm-deadline") ||
						e.target.classList.contains("bs-rm-progress-report") ||
						__each(this).hasClass("active", (e, t) => {
							if (t)
								__each(e).removeClass("active"),
									(e.querySelector(".filter-list").style.height = "0px");
							else {
								__each(p).removeClass("active");
								var s = e.querySelectorAll("li");
								if (s.length) {
									for (var n = 0, a = 0; a < s.length; a++)
										n += s[a].offsetHeight;
									__each(e).addClass("active"),
										(e.querySelector(".filter-list").style.height = n + "px");
								}
							}
						});
				});
			});
			var h = document.querySelectorAll(".filter-wraps .filter-list .bs-rm-in-progress"),
				v = document.getElementById("bs-roadmap-data"),
				g = document.getElementById("bs-roadmap-template"),
				f = document.querySelector(".bs-roadmap-slider"),
				y = document.querySelector(".bs-rm-close"),
				b = document.querySelector(".bs-roadmap-slider-wrap"),
				w = new Date(),
				_ = w.getDate(),
				E = w.getMonth() + 1,
				S = w.getFullYear();
			_ < 10 && (_ = "0" + _), E < 10 && (E = "0" + E), (w = S + "/" + E + "/" + _);
			if (
				elementExist(h) &&
				elementExist(v) &&
				elementExist(g) &&
				elementExist(f) &&
				elementExist(y) &&
				elementExist(b)
			) {
				(roadmapDataList = JSON.parse(v.innerHTML)), (template = g.innerHTML);
				var L = function () {
					f.classList.toggle("bs-slider-active"),
						e.classList.toggle("overflow-hide"),
						b.classList.toggle("slide-in"),
						document.querySelector("header").classList.toggle("wk-filter-blur"),
						document.querySelector("footer").classList.toggle("wk-filter-blur");
					var t = document.querySelectorAll("section");
					elementExist(t) &&
						t.forEach((e) => {
							e.classList.contains("bs-road-map-section") ||
								e.classList.toggle("wk-filter-blur");
						});
				};
				f.addEventListener("click", function (e) {
					e.target == f && L();
				}),
					y.addEventListener("click", function () {
						L();
					}),
					h.forEach((e) => {
						e.addEventListener("click", function () {
							if (
								((id = parseInt(e.getAttribute("data-id"))),
								(data = roadmapDataList.filter((e) => {
									if (e.id == id) return e;
								})),
								(deadlineData = ""),
								(deadline = e.getElementsByClassName("bs-rm-deadline")),
								(rmContent = e.getElementsByClassName("bs-rm-content")),
								elementExist(deadline[0]) &&
									elementExist(rmContent) &&
									((deadlineData = deadline[0].innerHTML),
									(rmContentData = rmContent[0].innerText)),
								null != data[0])
							) {
								var t = "";
								data[0].data.forEach((e) => {
									(d = new Date(e.date)),
										(t += template
											.replace(
												/{{bs_date}}/g,
												(function (e) {
													var t = new Date(w);
													d = new Date(e);
													var s = d.getDate(),
														n = d.getMonth() + 1,
														a = d.getFullYear();
													s < 10 && (s = "0" + s),
														n < 10 && (n = "0" + n),
														(date = a + "/" + n + "/" + s);
													var r = new Date(date),
														o = Math.abs(t.getTime() - r.getTime());
													return (
														(dayDifference = Math.ceil(o / 864e5)),
														dayDifference > 30
															? d.getDate() +
															  " " +
															  [
																	"January",
																	"February",
																	"March",
																	"April",
																	"May",
																	"June",
																	"July",
																	"August",
																	"September",
																	"October",
																	"November",
																	"December",
															  ][d.getMonth()] +
															  ", " +
															  d.getFullYear()
															: 30 == dayDifference
															? "1 month ago"
															: dayDifference > 13
															? Math.floor(dayDifference / 7) +
															  " weeks ago"
															: dayDifference >= 7 &&
															  dayDifference <= 13
															? "1 Week ago"
															: 0 == dayDifference
															? "Today"
															: 1 == dayDifference
															? "1 day ago"
															: dayDifference + " days ago"
													);
												})(e.date)
											)
											.replace(/{{bs_des}}/g, e.desc.replace(/\\/g, "")));
								}),
									t.length > 0 &&
										(L(),
										(bodycontent = document.querySelector(
											".bs-roadmap-slider .bs-roadmap-body"
										)),
										elementExist(bodycontent) &&
											((bodycontent.innerHTML = t),
											elementExist(
												document.querySelector(".bs-slider-deadline")
											) &&
												elementExist(
													document.querySelector(".bs-rm-head-content")
												) &&
												((document.getElementsByClassName(
													"bs-slider-deadline"
												)[0].innerHTML = deadlineData),
												(document.getElementsByClassName(
													"bs-rm-head-content"
												)[0].innerHTML = rmContentData))));
							}
						});
					});
			}
		}
		var C = document.querySelector(".bs-extensions-page");
		if (elementExist(C)) {
			var x,
				q = JSON.parse(document.getElementById("extensionDataObj").innerText),
				A = document.getElementById("extensionViewTmpl").innerHTML,
				k = document.getElementsByClassName("extension-wrapper")[0],
				T = document.getElementById("search-bar"),
				I = document.querySelectorAll(".select-box"),
				M =
					(document.querySelector(".select-box #selected-attr"),
					document.querySelector(".options"),
					document.querySelectorAll(".options li"),
					""),
				B = "all",
				D = function (e) {
					var t,
						s = {};
					t = e;
					(($qvars = new URL(window.location.href).search), "string" == typeof $qvars)
						? $qvars
								.substring(1)
								.split("&")
								.forEach((e) => {
									(pair = e.split("=")),
										(s[pair[0]] = decodeURIComponent(pair[1]).replace(
											/\+/g,
											"-"
										));
								})
						: (s = null);
					return (null == s.group && null == s.type) ||
						("all" == s.type && "all" == s.group)
						? e
						: (Object.keys(s).forEach(function (e) {
								t = t.filter(function (t) {
									return t[e].includes(s[e]);
								});
						  }),
						  t);
				};
			function N(e = null) {
				var t,
					s,
					n,
					a = "",
					r =
						null == e
							? q
							: ((t = new RegExp(M.toLowerCase(), "g")),
							  q.filter((e) => null != e.name.toLowerCase().match(t)));
				(r = D(r)).forEach((e) => {
					s = "0" != e.rating && "" != e.rating ? e.rating + " Rating" : "";
					var t = new Date(),
						r = new Date(e.postDate);
					r.setDate(r.getDate() + 30);
					var o,
						l = t < r ? "new-extension" : "";
					(n =
						"paid" !== e.type_show.toLowerCase()
							? e.type_show
							: !1 === e.pricing
							? "Quotation Based"
							: e.pricing),
						(o = e.icon
							? '<img src = "' + e.icon + '" alt = "' + e.name + '">'
							: '<span class="ext-bricks-text">' + e.name + "</span>"),
						(a += A.replace(/{{url}}/g, e.url)
							.replace(/{{name}}/g, e.name)
							.replace(/{{type}}/g, n)
							.replace(/{{imgTag}}/g, o)
							.replace(/{{rating}}/g, s)
							.replace(/{{newExtClass}}/g, l)
							.replace(/{{excerpt}}/g, e.excerpt));
				}),
					(a = "" != a ? a : '<p class="empty-result">Nothing Found!</p>'),
					(k.innerHTML = a);
			}
			T.value ? ((M = T.value), N({ action: "search" })) : N(),
				__each(I).forAll((e) => {
					var t = e.querySelector(".options");
					e.addEventListener("click", function (s) {
						"LI" !== s.target.nodeName &&
							(__each(t).switchClass("active"),
							(x = e.getAttribute("data-filter_group")));
					});
					var s = t.querySelectorAll(".options li"),
						n = e.querySelector(".select-box #selected-attr");
					__each(s).forAll((e) => {
						e.addEventListener("click", function () {
							this.classList.contains("selected") ||
								(__each(s).removeClass("selected"),
								__each(this).addClass("selected"),
								(B = this.getAttribute("data-option")),
								(n.innerHTML = this.innerText),
								__each(t).removeClass("active"),
								(function (e, t) {
									let s = new URL(window.location.href);
									new URLSearchParams(s.search);
									"all" == t
										? s.searchParams.delete(e)
										: s.searchParams.set(e, t);
									if (void 0 !== history.pushState) {
										var n = { title: "filter", url: s.href };
										history.pushState(n, n.title, n.url);
									} else console.log("Browser does not support HTML5.");
									N({ action: "search" });
								})(x, B));
						});
					});
				}),
				T.addEventListener("keyup", function () {
					(M = this.value), null != this.value && N({ action: "search" });
				}),
				window.addEventListener("click", function (e) {
					document.querySelectorAll(".select-box .options.active").forEach((t) => {
						t.closest(".select-box").contains(e.target) ||
							t.classList.remove("active");
					});
				});
		}
		elementExist(document.querySelector(".bs-editor")) &&
			__each(document.querySelectorAll("table")).forAll((e) => {
				if (!e.classList.contains("crayon-table")) {
					var t = document.createElement("div");
					t.setAttribute("class", "bs-table"),
						e.parentNode.insertBefore(t, e),
						t.append(e);
				}
			});
		var O = document.getElementById("mobile-menu-btn"),
			R = document.getElementById("mobile-menu");
		elementExist(R) &&
			(O.addEventListener("click", function () {
				__each(R).hasClass("bs-blog-active", (e, t) => {
					t
						? __each(R).removeClass("bs-blog-active")
						: __each(R).addClass("bs-blog-active");
				});
			}),
			window.addEventListener("click", function (e) {
				e.target !== O && __each(R).removeClass("bs-blog-active");
			}));
		var P = document.querySelectorAll(".bs-mp-features");
		if (elementExist(P)) {
			var H = document.querySelectorAll(".bs-mp-features .bs-mp-tab a li");
			__each(H).forAll((e) => {
				e.addEventListener("click", function () {
					__each(H).removeClass("active"), __each(this).addClass("active");
					var e = this.getAttribute("data-tab"),
						t = document.querySelectorAll(".bs-mp-features .mp-tablet-wrap");
					__each(t).removeClass("active"),
						__each(t).forAll((t) => {
							t.classList.contains(e) && t.classList.add("active");
						});
				});
			});
		}
		var j = document.querySelector(".bg-partner-page .bg-partner-listing");
		if (elementExist(j)) {
			var X,
				z,
				U,
				$,
				F = j.querySelectorAll(".partner-index-wrap li"),
				W = j.querySelectorAll(".partner-block"),
				V = !0;
			(document.querySelector("html").style.cssText = "scroll-behavior:smooth"),
				__each(F).forAll((e) => {
					e.addEventListener("click", function (t) {
						e.classList.remove("active"),
							__each(this.parentElement.children).removeClass("active"),
							__each(this).addClass("active"),
							(activeFeatIndex = this.getAttribute("id")),
							(X = this.closest(".bg-partner-listing")
								.querySelector(".partner-content-wrap #hook-" + activeFeatIndex)
								.getBoundingClientRect()),
							(z =
								this.getBoundingClientRect().top -
								this.parentElement.getBoundingClientRect().top +
								"px"),
							(this.parentElement.querySelector(".tab-bar").style.visibility =
								"visible"),
							(this.parentElement.querySelector(".tab-bar").style.top = z),
							(document.documentElement.scrollTop = window.pageYOffset + X.top - 70),
							(document.body.scrollTop = window.pageYOffset + X.top - 70),
							(U = window.pageYOffset + X.top - 70),
							(V = !1),
							clearInterval($),
							($ = setInterval(function () {
								V = !0;
							}, 1e3));
					});
				}),
				window.addEventListener("scroll", function (e) {
					V && (U = document.documentElement.scrollTop || document.body.scrollTop),
						U === (document.documentElement.scrollTop || document.body.scrollTop) &&
							((clickFlag = !1),
							(V = !0),
							__each(W).forAll((e) => {
								e.getBoundingClientRect().top < 300 &&
									e.getBoundingClientRect().top > 0 &&
									((vpCurrentItemId = e.getAttribute("id").replace(/hook-/, "")),
									(vpActiveIndex = e
										.closest(".bg-partner-listing")
										.querySelector(".partner-index-wrap #" + vpCurrentItemId)),
									(vpCurrentAllIndex = e
										.closest(".bg-partner-listing")
										.querySelectorAll(".partner-index-wrap li")),
									__each(vpCurrentAllIndex).removeClass("active"),
									vpActiveIndex.classList.add("active"),
									(activeTabBar =
										vpActiveIndex.parentElement.querySelector(".tab-bar")),
									(activeTabBar.style.visibility = "visible"),
									(activeTabBar.style.top =
										vpActiveIndex.getBoundingClientRect().top -
										vpActiveIndex.parentElement.getBoundingClientRect().top +
										"px"));
							}));
				});
		}
		if (elementExist(document.querySelector(".ext-thumb-preview"))) {
			var Y = document.querySelectorAll(".ext-thumb-preview .ext_gallery_item"),
				J = document.querySelectorAll(".ext-thumb-preview .ext_gallery_item img"),
				G = document.getElementById("ext-thumb-gallery-wrap"),
				Z = 0;
			__each(J).forAll((e) => {
				var t = e.getAttribute("src"),
					s = e.parentNode.getAttribute("id"),
					n = document.createElement("span"),
					a = document.createElement("img");
				n.classList.add("thumb-gallery-item"),
					n.classList.add("x-scroll-item"),
					n.setAttribute("data-id", s),
					0 === Z && (n.classList.add("active"), Z++),
					a.setAttribute("src", t),
					G.appendChild(n),
					n.appendChild(a);
			});
			var K = G.querySelectorAll(".thumb-gallery-item");
			function Q(e = "") {
				e &&
					(__each(K).removeClass("active"),
					__each(Y).forAll((t) => {
						t.classList.remove("active"),
							e.getAttribute("data-id") === t.getAttribute("id") &&
								(e.classList.add("active"),
								t.classList.add("active"),
								0 != e.getAttribute("data-id").split("-")[1] &&
									document
										.querySelector(".ext-thumb-prev")
										.classList.remove("disabled"),
								e.getAttribute("data-id").split("-")[1] != window.extTtlCard - 1 &&
									document
										.querySelector(".ext-thumb-next")
										.classList.remove("disabled"));
					}));
			}
			function ee(e, t, s) {
				if ("next" === s) {
					var n = e.getBoundingClientRect().x;
					0 < (n = parseInt(n)) - t && a();
				} else if ("prev" === s) {
					n = e.getBoundingClientRect().x;
					0 > (n = parseInt(n)) - t && a();
				}
				function a() {
					var s,
						a,
						r =
							((s = e.closest(".x-scroll-wrap")),
							(a = window.getComputedStyle(s)),
							new WebKitCSSMatrix(a.webkitTransform).m41);
					(r += t - n),
						(e.closest(".x-scroll-wrap").style.transition = " all 0.25s ease"),
						(e.closest(".x-scroll-wrap").style.transform = "translateX(" + r + "px)"),
						setTimeout(
							function (e) {
								e.style.transition = " all 0.1s ease";
							},
							200,
							e.closest(".x-scroll-wrap")
						);
				}
			}
			__each(K).forAll((e) => {
				e.addEventListener("click", function () {
					Q(this);
				});
			}),
				document.querySelector(".ext-thumb-prev").addEventListener("click", function () {
					var e, t;
					(t = (e = this).parentNode.querySelector(".active")),
						e.classList.contains("disabled") ||
							(elementExist(t.previousSibling) && t.previousElementSibling
								? (Q(t.previousSibling),
								  e.parentNode
										.querySelector(".ext-thumb-next")
										.classList.remove("disabled"),
								  ee(t.previousSibling, window.firstCardxPos, "prev"))
								: e.classList.add("disabled"));
				}),
				document.querySelector(".ext-thumb-next").addEventListener("click", function () {
					var e, t;
					(t = (e = this).parentNode.querySelector(".active")),
						e.classList.contains("disabled") ||
							(elementExist(t.nextSibling)
								? (Q(t.nextSibling),
								  e.parentNode
										.querySelector(".ext-thumb-prev")
										.classList.remove("disabled"),
								  ee(t.nextSibling, window.viewPortLastCardPos, "next"),
								  document.querySelector(".x-scroll-container"))
								: e.classList.add("disabled"));
				}),
				(document.onkeydown = (e) => {
					"37" == (e = e || window.event).keyCode
						? document.querySelector(".ext-thumb-prev").click()
						: "39" == e.keyCode && document.querySelector(".ext-thumb-next").click();
				});
		}
		if (elementExist(document.querySelector(".bs-scroll-slider"))) {
			var te = 10;
			document.querySelectorAll(".bs-scroll-slider").forEach(function (e) {
				(e.curDown = !1), (scrollElem = e.querySelector(".x-scroll-wrap"));
				var t = scrollElem.querySelectorAll(".x-scroll-item"),
					s = t.length;
				window.extTtlCard = s;
				var n = t[0].offsetWidth;
				(e.lastCard = t[t.length - 1]), (e.firstCard = t[0]);
				var a = (n + 2 * te) * s;
				(scrollElem.style.width = a + "px"),
					(scrollElem.style.transform = "translateX(0px)"),
					e.dragStartX,
					e.curDown,
					(e.delta = 0),
					(e.lastDelta = 0),
					(e.boundCoords = e.getBoundingClientRect());
				var r = e.firstCard.getBoundingClientRect().x;
				(e.xStartBound = e.boundCoords.x),
					(e.xEndBound = e.boundCoords.width + e.boundCoords.x),
					(te = r - e.xStartBound);
				var o = e.xStartBound + e.boundCoords.width - n - te;
				function l(t) {
					(e.curDown = !0), (e.dragStartX = t.touches[0].clientX);
				}
				function i(t) {
					if (e.curDown) {
						function s() {
							(e.delta = e.lastDelta + t.touches[0].clientX - e.dragStartX),
								(scrollElem.style.transform = "translateX(" + e.delta + "px)"),
								e.delta > 0 &&
									(scrollElem.style.cssText = "transform:translateX(0px);"),
								(scrollElem.style.width = a + "px");
						}
						e.lastCard.getBoundingClientRect().x +
							e.lastCard.getBoundingClientRect().width <
						e.xEndBound
							? t.touches[0].clientX > e.dragStartX && s()
							: e.firstCard.getBoundingClientRect().x > e.xStartBound
							? t.touches[0].clientX < e.dragStartX && s()
							: s();
					}
				}
				function c(t) {
					e.curDown && ((e.lastDelta = e.delta), (e.curDown = !1));
				}
				function d(t) {
					(e.curDown = !0), (e.dragStartX = t.clientX);
				}
				function u(t) {
					if (e.curDown) {
						function s() {
							(e.delta = e.lastDelta + t.clientX - e.dragStartX),
								(e.finalTrans = e.offsetWidth - a),
								e.finalTrans > e.delta &&
									((e.delta = -e.finalTrans), (e.delta = -e.delta)),
								(scrollElem.style.transform = "translateX(" + e.delta + "px)"),
								(scrollElem.style.transition = " all 0.1s ease"),
								(scrollElem.style.width = a + "px"),
								e.delta > 0 && (scrollElem.style.transform = "translateX(0px)");
						}
						(e.boundCoords = e.getBoundingClientRect()),
							(e.xStartBound = e.boundCoords.x),
							(e.xEndBound = e.boundCoords.width),
							e.lastCard.getBoundingClientRect().x +
								e.lastCard.getBoundingClientRect().width <
							e.xEndBound
								? t.clientX > e.dragStartX && s()
								: e.firstCard.getBoundingClientRect().x > e.xStartBound
								? t.clientX < e.dragStartX && s()
								: s();
					}
				}
				function m(t) {
					e.curDown &&
						((e.lastDelta = e.delta),
						(scrollElem.style.transition = " all 0.25s ease"),
						(e.curDown = !1));
				}
				function p(t) {
					e.curDown && ((e.lastDelta = e.delta), (e.curDown = !1));
				}
				(window.viewPortLastCardPos = parseInt(o)),
					(window.firstCardxPos = parseInt(r)),
					(e.hasEvents = !1),
					(e.curDown = !1),
					e.offsetWidth < a
						? (scrollElem.addEventListener("mousedown", d),
						  scrollElem.addEventListener("mousemove", u),
						  scrollElem.addEventListener("mouseup", m),
						  scrollElem.addEventListener("mouseleave", p),
						  scrollElem.addEventListener("touchstart", l, { passive: !0 }),
						  scrollElem.addEventListener("touchmove", i, { passive: !0 }),
						  scrollElem.addEventListener("touchend", c, { passive: !0 }))
						: (scrollElem.style.width = e.offsetWidth + "px"),
					2 == s &&
						((document.querySelector(".ext-thumb-prev").style.display = "none"),
						(document.querySelector(".ext-thumb-next").style.display = "none"));
			});
		}
		(null != document.querySelector(".podcast-banner") &&
			null != document.querySelector(".podcast-listen") &&
			document.querySelector(".podcast-listen").addEventListener("click", function () {
				var e = document.querySelector(".podcast-banner audio");
				(e._playedPromise = Promise.resolve()),
					__each(this).hasClass("play", (t, s) => {
						e._playedPromise = s
							? e._playedPromise.then(() => {
									e.pause(),
										__each(this).removeClass("play"),
										__each(this).addClass("pause");
							  })
							: e._playedPromise.then(() => {
									e.play(),
										__each(this).removeClass("pause"),
										__each(this).addClass("play");
							  });
					});
			}),
		elementExist(document.querySelector(".wk-podcast-listing"))) &&
			__each(document.querySelectorAll(".wk-podcast-listing .wk-podcast-dur")).forAll(
				(e) => {
					!(function (e, t) {
						var s = new Audio();
						s.addEventListener("loadedmetadata", function () {
							t(s.duration);
						}),
							(s.src = e);
					})(e.getAttribute("data-dur"), function (t) {
						e.innerHTML = parseInt(t / 60) + " Mins";
					});
				}
			);
		(trustpilot = document.querySelector("footer .trustpilot-widget")),
			elementExist(trustpilot) &&
				__each(trustpilot).whenInViewbox(() => {
					(trustpilotUrl =
						"//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"),
						__each().importModule(trustpilotUrl, "script");
				}),
			null != document.querySelector(".bs-ext-form .ext-form") &&
				((modUrl = bsXhrObj.assets_uri + "dist/js/bs-ext-form.min.js?1.3"),
				__each()
					.importModule(modUrl, "script")
					.then((e) => {}));
		var se = document.querySelector(".bs-testimonial-page");
		if (elementExist(se)) {
			var ne = se.querySelectorAll(".img-wrap"),
				ae = se.querySelector(".video-wrapper"),
				re = se.querySelector(".video-frame"),
				oe = ae.querySelector(".close"),
				le = re.querySelector(".loader"),
				ie = () => {
					__each(ae).addClass("display-none"),
						__each(e).removeClass("overflow-hide"),
						re.querySelector("iframe").setAttribute("src", "");
				};
			oe.addEventListener("click", function () {
				ie();
			}),
				(document.onkeydown = (e) => {
					"27" == (e = e || window.event).keyCode && ie();
				}),
				ne.forEach((t) => {
					t.addEventListener("click", function () {
						var t = this.getAttribute("data-video");
						__each(le).removeClass("display-none"),
							__each(ae).removeClass("display-none"),
							__each(e).addClass("overflow-hide");
						var s = re.querySelector("iframe");
						s.setAttribute("src", t),
							(s.onload = function () {
								__each(le).addClass("display-none");
							});
					});
				});
		}
		(bgLangModal = document.querySelector("footer #bgLangWrap")),
			elementExist(bgLangModal) &&
				__each("footer").whenInViewbox(() => {
					(bgLangModalUrl =
						"//bagisto.com/wp-content/themes/bagisto/assets/dist/js/bg-country.min.js"),
						__each().importModule(bgLangModalUrl, "script");
				}),
			null != document.querySelector(".bs-social-respos-gallery") &&
				((modUrl = bsXhrObj.assets_uri + "dist/js/bs-popup-slide.min.js?1.2"),
				__each()
					.importModule(modUrl, "script")
					.then((e) => {}));
		var ce = [
				{
					version: "v1.2.0",
					concurrentUser: [
						{ cUser: "500", link: "bagisto_performance_report_v1_2_0_500.pdf" },
						{ cUser: "100", link: "bagisto_performance_report_v1_2_0_100.pdf" },
					],
				},
				{
					version: "v2.0.0",
					concurrentUser: [
						{ cUser: "500", link: "bagisto_performance_report_v2_0_0_500.pdf" },
					],
				},
			],
			de = document.querySelector(".pfa-version");
		if (elementExist(de)) {
			let Ie = de.querySelector("select.select-version"),
				Me = de.querySelector("select.select-mpm-setting"),
				Be = !0;
			ce.forEach((e) => {
				let t = document.createElement("option");
				(t.value = e.version),
					(t.text = e.version),
					Be && (t.setAttribute("selected", "selected"), (Be = !1)),
					Ie.appendChild(t);
			}),
				Ie.addEventListener("change", (e) => {
					(Me.innerHTML = ""),
						ce.forEach((e) => {
							if (Ie.value == e.version) {
								let t = !0;
								e.concurrentUser.forEach((e) => {
									let s = document.createElement("option");
									(s.value = e.link),
										(s.text = e.cUser),
										t && (s.setAttribute("selected", "selected"), (t = !1)),
										Me.appendChild(s);
								});
							}
						});
				}),
				de
					.querySelectorAll("select.select-version, select.select-mpm-setting")
					.forEach((e) => {
						e.addEventListener("change", () => {
							let e = Me.value,
								t = document
									.getElementById("dwnld-btn-data")
									.getAttribute("dwn-data-href");
							document.querySelector(".pfa-dwn-btn").href = t + "/assets/inc/" + e;
						});
					});
		}
		if ((ne = document.querySelectorAll(".bs-video")).length) {
			let De,
				Ne,
				Oe = null;
			const Re =
					/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|watch\?.+&v=|embed\/|v\/|shorts\/))([^?&"'>]+)/,
				Pe = () => {
					if (Oe) {
						try {
							Oe.stop(), Oe.destroy();
						} catch (e) {
							console.error("Error destroying Plyr:", e);
						}
						Oe = null;
					}
					const e = document.querySelector(".wkyt-video-frame-request");
					e && (e.removeAttribute("data-plyr-embed-id"), (e.innerHTML = "")),
						De && (De.classList.add("display-none"), De.classList.remove("fade-out")),
						document.body.classList.remove("overflow-hide");
				},
				He = () => {
					document.querySelector(".video-wrapper") ||
						document.body.insertAdjacentHTML(
							"beforeend",
							'<div class="video-wrapper">\n                    <div class="video-frame">\n                        <span class="close"></span>\n                        <div class="loader"></div>\n                        <div class="wkyt-video-frame-request"></div>\n                    </div>\n                </div>'
						);
				};
			ne.forEach((e) => {
				e.addEventListener("click", function () {
					He(), (De = document.querySelector(".video-wrapper"));
					const e = De.querySelector(".close");
					Pe();
					const t = () => {
							De.classList.add("fade-out"), setTimeout(Pe, 200);
						},
						s = (e) => {
							"Escape" === e.key && t();
						};
					if (
						(document.addEventListener("keydown", s),
						e.addEventListener("click", t),
						window.Plyr)
					)
						je(this, s);
					else {
						const e = document.createElement("script");
						(e.src = "https://cdn.plyr.io/3.8.3/plyr.js"),
							(e.onload = () => {
								new Xe().load(), je(this, s);
							}),
							document.head.appendChild(e);
					}
				});
			});
			const je = (e, t) => {
				De.classList.remove("display-none"),
					document.body.classList.add("overflow-hide"),
					(Ne = De.querySelector(".loader")),
					Ne.classList.remove("display-none");
				const s = e.querySelector(".video-poster"),
					n = s ? s.getAttribute("data-video") : "",
					a = n.match(Re),
					r = a ? a[1] : n,
					o = n.includes("shorts"),
					l = document.querySelector(".wkyt-video-frame-request"),
					i = document.querySelector(".video-frame");
				if (
					(o
						? (l.classList.add("short-video"), i.classList.add("short-video-frame"))
						: (l.classList.remove("short-video"),
						  i.classList.remove("short-video-frame")),
					a)
				)
					(l.dataset.plyrEmbedId = r),
						(l.dataset.plyrProvider = "youtube"),
						(Oe = new Plyr(l, {
							controls: o
								? [
										"play-large",
										"play",
										"progress",
										"current-time",
										"mute",
										"volume",
										"captions",
										"settings",
										"pip",
										"airplay",
										"fullscreen",
								  ]
								: [
										"play-large",
										"play",
										"progress",
										"current-time",
										"rewind",
										"fast-forward",
										"mute",
										"volume",
										"captions",
										"settings",
										"pip",
										"airplay",
										"fullscreen",
								  ],
							settings: ["captions", "quality", "speed", "loop"],
							ratio: o ? "9:16" : "16:9",
							resetOnEnd: !0,
							hideControls: !1,
						})),
						Oe.on("ended", () => Pe());
				else {
					let t = e.classList.contains("bs-shorts");
					const s = document.createElement("video");
					(s.src = r),
						l.appendChild(s),
						t
							? (l.classList.add("short-video"),
							  i.classList.add("short-video-frame"))
							: (l.classList.remove("short-video"),
							  i.classList.remove("short-video-frame")),
						(Oe = new Plyr(s, {
							controls: t
								? [
										"play-large",
										"play",
										"progress",
										"mute",
										"settings",
										"fullscreen",
								  ]
								: [
										"play-large",
										"play",
										"progress",
										"current-time",
										"rewind",
										"fast-forward",
										"mute",
										"volume",
										"captions",
										"settings",
										"pip",
										"airplay",
										"fullscreen",
								  ],
							settings: ["captions", "quality", "speed", "loop"],
							ratio: t ? "9:16" : "16:9",
							resetOnEnd: !0,
						}));
				}
				Oe.on("ready", () => {
					Ne.classList.add("display-none"), Oe.play();
				}),
					Oe.on("error", (e) => {
						console.error("Player error:", e), Pe();
					});
			};
			class Xe {
				load() {
					if (
						!document.querySelector('link[href="https://cdn.plyr.io/3.8.3/plyr.css"]')
					) {
						const e = document.createElement("link");
						(e.rel = "stylesheet"),
							(e.href = "https://cdn.plyr.io/3.8.3/plyr.css"),
							document.head.appendChild(e);
					}
				}
			}
		}
		const ue = document.querySelectorAll(".bs-feedback-card");
		ue &&
			ue.forEach((e) => {
				const t = e.querySelector("video");
				t.parentElement.addEventListener("mouseenter", () => {
					(t.currentTime = 0), t.play();
				}),
					t.parentElement.addEventListener("mouseleave", () => {
						t.pause(), (t.currentTime = 0);
					});
			});
		let me = document.querySelectorAll(".bpd-testimonial-content");
		me.length &&
			me.forEach((t) => {
				t.addEventListener("click", (s) => {
					var n = t.querySelector(".bs-video");
					if (n) {
						var a = document.querySelector(".video-wrapper"),
							r = document.querySelector(".video-frame"),
							o = a.querySelector(".close"),
							l = r.querySelector(".loader"),
							i = "",
							c = "",
							d = "false";
						const t =
								/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/,
							s = () => {
								__each(a).addClass("display-none"),
									__each(e).removeClass("overflow-hide"),
									($isload = "false"),
									c.plyr_instance.destroy();
							};
						if (
							(document.addEventListener("keydown", (e) => {
								27 == (e = e || window.event).keyCode &&
									(a.classList.add("fade-out"),
									setTimeout(function () {
										a.classList.add("display-none"), s();
									}, 200),
									s());
							}),
							o.addEventListener("click", () => {
								a.classList.add("fade-out"),
									setTimeout(function () {
										a.classList.add("display-none"), s();
									}, 200);
							}),
							"false" == d)
						)
							__each()
								.importModule("https://cdn.plyr.io/3.8.3/plyr.js")
								.then(() => {
									__each()
										.importModule(
											"https://cdn.plyr.io/3.8.3/plyr.css",
											"style"
										)
										.then(() => {
											(d = "true"), a.classList.remove("fade-out");
											var s = n
													.querySelector(".video-poster")
													.getAttribute("data-video"),
												u = s.match(t);
											(i = u ? u[5] : s),
												__each(l).removeClass("display-none"),
												__each(a).removeClass("display-none"),
												__each(e).addClass("overflow-hide"),
												($isload = "true"),
												(c = document.querySelector(
													".wkyt-video-frame-request"
												)).setAttribute("data-plyr-embed-id", i),
												(c.plyr_instance = new Plyr(c, {
													controls: [
														"play-large",
														"play",
														"progress",
														"current-time",
														"rewind",
														"fast-forward",
														"mute",
														"volume",
														"captions",
														"settings",
														"pip",
														"airplay",
														"fullscreen",
													],
													settings: [
														"captions",
														"quality",
														"speed",
														"loop",
													],
													resetOnEnd: !0,
												})),
												(o.style.left =
													r.offsetWidth + r.offsetLeft - 32 + "px"),
												(o.style.top = r.offsetTop - 40 + "px"),
												c.plyr_instance.on("ready", (e) => {
													__each(l).addClass("display-none"),
														"true" == $isload
															? c.plyr_instance.play()
															: c.plyr_instance.destroy();
												});
										});
								});
						else {
							a.classList.remove("fade-out");
							var u = n.querySelector(".video-poster").getAttribute("data-video"),
								m = u.match(t);
							(i = m ? m[5] : u),
								__each(l).removeClass("display-none"),
								__each(a).removeClass("display-none"),
								__each(e).addClass("overflow-hide"),
								($isload = "true"),
								(c = document.querySelector(
									".wkyt-video-frame-request"
								)).setAttribute("data-plyr-embed-id", i),
								(c.plyr_instance = new Plyr(c, {
									controls: [
										"play-large",
										"play",
										"progress",
										"current-time",
										"rewind",
										"fast-forward",
										"mute",
										"volume",
										"captions",
										"settings",
										"pip",
										"airplay",
										"fullscreen",
									],
									settings: ["captions", "quality", "speed", "loop"],
									resetOnEnd: !0,
								})),
								(o.style.left = r.offsetWidth + r.offsetLeft - 32 + "px"),
								(o.style.top = r.offsetTop - 40 + "px"),
								c.plyr_instance.on("ready", (e) => {
									__each(l).addClass("display-none"),
										"true" == $isload
											? c.plyr_instance.play()
											: c.plyr_instance.destroy();
								});
						}
					}
				});
			});
		document.querySelector(".bs-hero-videos-wrapper");
		function pe(e) {
			var t = e % 60,
				s = (e - t) / 60;
			return (
				t < 10 && (t = "0" + t.toString()),
				s.toString().padStart(2, "0") + ":" + Math.floor(t).toString().padStart(2, "0")
			);
		}
		(() => {
			var e = document.getElementById("contact-modal");
			if (elementExist(e)) {
				var t = e.querySelector("#modal-close"),
					s = e.querySelector(".contact-modal-form"),
					n = s.querySelector(".wpcf7-submit"),
					a = s.querySelector(".wpcf7-response-output"),
					r = s.querySelector(".wpcf7"),
					o = "";
				__each(t).click(() => {
					e.setAttribute("modal", "off"),
						__each(document.body).removeClass("overflow-hide"),
						s.setAttribute("view", "form"),
						a && (a.style.display = "none");
				}),
					document.addEventListener("click", (t) => {
						t.target.matches('a[href="#contact"]') &&
							(t.preventDefault(),
							e.setAttribute("modal", "on"),
							s.setAttribute("view", "form"),
							__each(document.body).addClass("overflow-hide")),
							t.target.matches(".wpcf7-submit") &&
								setTimeout(() => {
									let e = s.querySelector(".ajax-loader");
									e &&
										e.classList.contains("is-active") &&
										__each(n).prop("disabled", "disabled");
								}, 10);
					}),
					elementExist(r) &&
						(r.addEventListener(
							"wpcf7submit",
							function (e) {
								n && n.removeAttribute("disabled");
							},
							!1
						),
						r.addEventListener(
							"wpcf7mailsent",
							function (e) {
								(o = e.target.querySelector('[name="_wpcf7"]').value),
									e.detail.contactFormId == o &&
										"mail_sent" == e.detail.status &&
										(s.setAttribute("view", "message"),
										n && n.removeAttribute("disabled"));
							},
							!1
						));
			}
		})();
		document.querySelectorAll(".audio-player").forEach((e) => {
			const t = e.querySelector("audio"),
				s = e.querySelector(".player-button"),
				n = e.querySelector(".timeline"),
				a = e.querySelector(".bs-podcast-start"),
				r = e.querySelector(".bs-podcast-end");
			a.innerHTML = "00:00";
			const o =
				'<svg width="34" height="34" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">\n                            <path d="M16.4939 0.332581C7.47701 0.332581 0.165802 7.64379 0.165802 16.6607C0.165802 25.6776 7.47701 32.9888 16.4939 32.9888C25.5108 32.9888 32.8221 25.6776 32.8221 16.6607C32.8221 7.64379 25.5108 0.332581 16.4939 0.332581ZM21.7459 16.9122L13.7859 22.7036C13.7423 22.7349 13.6909 22.7537 13.6373 22.7577C13.5837 22.7617 13.53 22.7509 13.4822 22.7264C13.4344 22.7019 13.3942 22.6647 13.3661 22.6189C13.338 22.5731 13.3232 22.5204 13.3231 22.4667V10.8912C13.3229 10.8373 13.3376 10.7845 13.3656 10.7385C13.3937 10.6925 13.4339 10.6552 13.4818 10.6307C13.5297 10.6062 13.5835 10.5954 13.6372 10.5995C13.6909 10.6037 13.7424 10.6227 13.7859 10.6543L21.7459 16.442C21.7835 16.4686 21.8142 16.5038 21.8354 16.5448C21.8565 16.5857 21.8676 16.631 21.8676 16.6771C21.8676 16.7232 21.8565 16.7686 21.8354 16.8095C21.8142 16.8504 21.7835 16.8856 21.7459 16.9122Z" fill="white"/>\n                         </svg>';
			s.addEventListener("click", function () {
				t.paused
					? (t.play(),
					  (s.innerHTML =
							'<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">\n                            <path d="M14.0809 23.4214C14.5484 23.4214 14.9406 23.263 15.2574 22.9462C15.5731 22.6305 15.7309 22.2389 15.7309 21.7714V11.8302C15.7309 11.3627 15.5731 10.9777 15.2574 10.6752C14.9406 10.3727 14.5484 10.2214 14.0809 10.2214C13.6134 10.2214 13.2218 10.3793 12.9061 10.695C12.5893 11.0118 12.4309 11.4039 12.4309 11.8714V21.8127C12.4309 22.2802 12.5893 22.6652 12.9061 22.9677C13.2218 23.2702 13.6134 23.4214 14.0809 23.4214ZM20.6809 23.4214C21.1484 23.4214 21.5406 23.263 21.8574 22.9462C22.1731 22.6305 22.3309 22.2389 22.3309 21.7714V11.8302C22.3309 11.3627 22.1731 10.9777 21.8574 10.6752C21.5406 10.3727 21.1484 10.2214 20.6809 10.2214C20.2134 10.2214 19.8218 10.3793 19.5061 10.695C19.1893 11.0118 19.0309 11.4039 19.0309 11.8714V21.8127C19.0309 22.2802 19.1893 22.6652 19.5061 22.9677C19.8218 23.2702 20.2134 23.4214 20.6809 23.4214ZM17.3809 33.3214C15.0984 33.3214 12.9534 32.888 10.9459 32.0212C8.93842 31.1555 7.19217 29.9802 5.70717 28.4952C4.22217 27.0102 3.04682 25.2639 2.18112 23.2564C1.31432 21.2489 0.88092 19.1039 0.88092 16.8214C0.88092 14.5389 1.31432 12.3939 2.18112 10.3864C3.04682 8.37891 4.22217 6.63266 5.70717 5.14766C7.19217 3.66266 8.93842 2.48676 10.9459 1.61996C12.9534 0.754261 15.0984 0.321411 17.3809 0.321411C19.6634 0.321411 21.8084 0.754261 23.8159 1.61996C25.8234 2.48676 27.5697 3.66266 29.0547 5.14766C30.5397 6.63266 31.715 8.37891 32.5807 10.3864C33.4475 12.3939 33.8809 14.5389 33.8809 16.8214C33.8809 19.1039 33.4475 21.2489 32.5807 23.2564C31.715 25.2639 30.5397 27.0102 29.0547 28.4952C27.5697 29.9802 25.8234 31.1555 23.8159 32.0212C21.8084 32.888 19.6634 33.3214 17.3809 33.3214Z" fill="white"/>\n                           </svg>'))
					: (t.pause(), (s.innerHTML = o)),
					clearInterval(l),
					(l = null);
			});
			var l = setInterval(function () {
				r.innerHTML = pe(t.duration);
			}, 10);
			(t.ontimeupdate = function () {
				const e = (100 * t.currentTime) / t.duration;
				(n.style.backgroundSize = `${e}% 100%`),
					(n.value = e),
					(a.innerHTML = pe(t.currentTime)),
					clearInterval(l);
			}),
				(t.onended = function () {
					s.innerHTML = o;
				}),
				n.addEventListener("change", function () {
					const e = (n.value * t.duration) / 100;
					t.currentTime = e;
				});
		});
		var he = document.getElementById("bs-star-repo-btn");
		elementExist(he) &&
			he.addEventListener("click", () => {
				const e = new XMLHttpRequest();
				e.open("POST", bsXhrObj.url, !0),
					e.setRequestHeader(
						"Content-Type",
						"application/x-www-form-urlencoded; charset=UTF-8"
					),
					(e.onload = function () {
						this.status >= 200 && this.status < 400
							? window.open(this.response, "_blank")
							: alert(this.error);
					}),
					(e.onerror = function () {
						alert(this);
					}),
					e.send("action=bs_starring_bagisto");
			});
		var ve = document.querySelectorAll(".bs-star-count-alphabets .number-animate");
		if (ve) {
			let ze = ve[ve.length - 1];
			elementExist(ze) &&
				(function e(t) {
					if (9 == t.firstChild.firstChild.innerHTML) {
						var s = t.querySelector(".animate-transform");
						setTimeout(() => {
							s.classList.add("animate");
						}, 500),
							e(t.previousElementSibling);
					} else {
						s = t.querySelector(".animate-transform");
						setTimeout(() => {
							s.classList.add("animate");
						}, 500);
					}
				})(ze);
		}
		var ge = document.querySelector(".bs-thankyou-content span");
		if (elementExist(ge))
			var fe = ge.innerHTML,
				ye = setInterval(() => {
					(ge.innerHTML = fe--),
						0 == ge.innerHTML &&
							(clearInterval(ye), (window.location.href = bsXhrObj.home_url));
				}, 1e3);
		var be = document.querySelector(".bs-customer-showcase-wrap");
		if (void 0 !== be && null != be) {
			(q = JSON.parse(document.getElementById("bsCustomerShowcaseData").innerText)),
				(A = document.getElementById("bsCustomerShowcaseViewTmpl").innerHTML),
				(k = document.getElementsByClassName("bs-customer-list-container")[0]),
				(I = document.querySelectorAll(".bs-filter-option"));
			var we = be.querySelectorAll(
					'.bs-filter-option[data-filter_group="category"] .bs-filter-label'
				),
				_e = document.querySelector(".bs-clear-filter"),
				Ee = document.querySelector("#loadMoreCustomerData"),
				Se = be.querySelectorAll(".bs-filter-option .bs-filter-label");
			bsFilterChipWrap = be.querySelector(".bs-selected-filters-chip");
			B = "all";
			const Ue = 24;
			var Le = 1;
			function Ce() {
				let e = {};
				return (
					new URLSearchParams(window.location.search).forEach((t, s) => {
						e[s] = decodeURIComponent(t.replace(/\+/g, " "));
					}),
					e
				);
			}
			D = function (e) {
				const t = Ce();
				let s = [...e];
				if (t["customer-search"]) {
					const e = t["customer-search"].toLowerCase();
					(s = s.filter((t) =>
						["category", "region", "useCase", "title", "name"].some((s) =>
							t[s].toLowerCase().includes(e)
						)
					)),
						document
							.querySelector(".bs-customer-search-form")
							.classList.add("customer-search-result");
				} else
					document
						.querySelector(".bs-customer-search-form")
						.classList.remove("customer-search-result");
				["category", "region", "useCase"].forEach((e) => {
					if (t[e]) {
						const n = t[e].split(",").map((e) => e.replace(/ /g, "+"));
						s = s.filter((t) => n.includes(t[e]));
					}
				});
				const n = (e, n) => {
					if (!t[e]) {
						const a = (function (e, t, s) {
							let n = [...s];
							if (t["customer-search"]) {
								const e = t["customer-search"].toLowerCase();
								n = n.filter((t) =>
									["category", "region", "useCase", "title", "name"].some((s) =>
										t[s].toLowerCase().includes(e)
									)
								);
							}
							return (
								Object.keys(t).forEach((s) => {
									if (s !== e && "customer-search" !== s && t[s]) {
										const e = t[s]
											.split(",")
											.map((e) => e.trim().replace(/ /g, "+"));
										n = n.filter((t) => e.includes(t[s]));
									}
								}),
								n
							);
						})(e, t, s);
						n.forEach((t) => {
							const s = t.getAttribute("data-option").replace(/ /g, "+"),
								n = a.filter((t) => t[e] === s).length;
							n > 0
								? t.classList.remove("display-none")
								: t.classList.add("display-none"),
								(t.querySelector(".bs-filter-data-count").textContent = n);
						});
					}
				};
				return (
					n(
						"category",
						document.querySelectorAll(".bs-category-filter li[data-option]")
					),
					n("region", document.querySelectorAll(".bs-region-filter li[data-option]")),
					n("useCase", document.querySelectorAll(".bs-use-case-filter li[data-option]")),
					_e.classList.toggle("display-none", !Object.keys(t).length),
					["category", "region", "useCase"].forEach((e) => {
						const s = document.querySelector(`.bs-${e}-filter`);
						s && s.setAttribute("data-selected", t[e] || "all");
					}),
					s
				);
			};
			function N() {
				let e = "";
				const t = D(q),
					s = t.slice(0, Ue * Le);
				0 === s.length
					? (e = `<div class="bs-noresult-found text-center">\n                    <img src="${bsXhrObj.assets_uri}../images/bs-noresult-found.png"/>\n                    <p class="empty-result">No Results to Show!</p>\n                </div>`)
					: s.forEach((t) => {
							e += A.replace(/{{name}}/g, t.name)
								.replace(/{{logo}}/g, t.logo)
								.replace(/{{desc}}/g, t.desc)
								.replace(/{{title}}/g, t.title.split(" ").join("-"))
								.replace(/{{category}}/g, t.category.replace(/\+/g, " "))
								.replace(/{{region}}/g, t.region.replace(/\+/g, " "))
								.replace(/{{useCase}}/g, t.useCase.replace(/\+/g, " "))
								.replace(/{{shortDesc}}/g, t.shortDesc)
								.replace(/{{link}}/g, t.link);
					  }),
					(k.innerHTML = e),
					Ee.classList.toggle("display-none", t.length <= Ue * Le),
					document.querySelectorAll(".bs-customer-logo img").forEach((e) => {
						e.onload = () => e.parentElement.classList.add("loaded");
					});
			}
			function xe(e, t) {
				const s = new URL(window.location.href);
				if (0 === t.length || (1 === t.length && "all" === t[0])) s.searchParams.delete(e);
				else {
					const n = t.map((e) => encodeURIComponent(e).replace(/%20/g, "+"));
					s.searchParams.set(e, n.join(","));
				}
				history.pushState({}, "", s), (Le = 1), N();
			}
			function qe() {
				bsFilterChipWrap.innerHTML = "";
				const e = Ce();
				Object.entries(e).forEach(([e, t]) => {
					"customer-search" !== e &&
						t.split(",").forEach((e) => {
							const t = document.createElement("span");
							(t.textContent = e.replace(/\+/g, " ")),
								bsFilterChipWrap.appendChild(t);
						});
				});
			}
			I.forEach((e) => {
				const t = e.querySelector(".options"),
					s = e.dataset.filter_group;
				t.querySelectorAll("li").forEach((t) => {
					t.addEventListener("click", function (n) {
						const a = Ce(),
							r = a[s] ? a[s].split(",") : [],
							o = t.dataset.option.replace(/ /g, "+");
						if (
							(I.forEach((t) => {
								if (t !== e) {
									const e = t.querySelector(".bs-filter-label"),
										s = t.querySelector(".options");
									e.classList.contains("active") &&
										(e.classList.remove("active"),
										(s.style.height = "0px"),
										s.classList.remove("active"));
								}
							}),
							this.classList.contains("selected"))
						) {
							const e = r.filter((e) => e !== o);
							xe(s, e),
								t.classList.remove("selected"),
								t.querySelector("input").removeAttribute("checked");
						} else {
							const e = [...r, o];
							xe(s, e),
								t.classList.add("selected"),
								t.querySelector("input").setAttribute("checked", "checked");
						}
						qe();
					});
				});
			}),
				_e.addEventListener("click", () => {
					history.pushState({}, "", window.location.pathname),
						N(),
						qe(),
						document.querySelectorAll(".bs-filter-option li.selected").forEach((e) => {
							e.classList.remove("selected"),
								e.querySelector("input").removeAttribute("checked");
						}),
						I.forEach((e) => {
							const t = e.querySelector(".bs-filter-label"),
								s = e.querySelector(".options");
							t.classList.remove("active"),
								(s.style.height = "0px"),
								s.classList.remove("active");
						}),
						_e.classList.add("display-none");
				}),
				screen.availWidth > 623 &&
					we.forEach(function (e) {
						let t = e.nextElementSibling;
						e.classList.add("active"),
							t.classList.add("active"),
							(t.style.height = "auto");
						var s = t.clientHeight + "px";
						(t.style.height = "0px"),
							setTimeout(function () {
								t.style.height = s;
							}, 0);
					}),
				Ee.addEventListener("click", () => {
					Le++, N();
				}),
				N(),
				qe(),
				(function () {
					let e = Ce();
					null != e &&
						Object.keys(e).forEach(function (t) {
							let s = be.querySelector('[data-filter_group="' + t + '"]');
							s &&
								e[t].split(",").forEach(function (e) {
									let t = s.querySelector(
										'[data-option="' + e.split("+").join(" ") + '"]'
									);
									t &&
										(t.classList.add("selected"),
										t.firstElementChild.firstElementChild.setAttribute(
											"checked",
											"checked"
										));
								});
						});
				})(),
				Se.forEach((e) => {
					e.addEventListener("click", function () {
						this.classList.toggle("active");
						const e = this.nextElementSibling;
						e.classList.contains("active")
							? ((e.style.height = "0px"),
							  e.addEventListener(
									"transitionend",
									() => {
										e.classList.remove("active");
									},
									{ once: !0 }
							  ))
							: (e.classList.add("active"),
							  (e.style.height = `${e.scrollHeight}px`));
					});
				}),
				bsFilterChipWrap.addEventListener("click", (e) => {
					if (e.target.matches("span")) {
						e.target.remove();
						let t = e.target.innerHTML;
						be.querySelector('[data-option="' + t + '"]').click();
					}
				});
		}
		document.querySelector(".gtranslate_btn")?.addEventListener("click", (e) => {
			const t = document.querySelector(".gtranslate_dropdown");
			t?.classList.toggle("toggle"), e.stopPropagation();
		}),
			document.querySelectorAll(".gtranslate_dropdown .option").forEach((e) => {
				e.addEventListener("click", (e) => {
					((e) => {
						const t = document.querySelector("#google_translate_element select"),
							s = document.querySelector(".gtranslate_btn"),
							n = document.querySelector(".gtranslate_dropdown"),
							a = document.querySelector(".bs-spanish-youtube"),
							r = document.querySelector(".bs-turkish-youtube"),
							o = document.getElementById("bs-main-heading");
						if (!t || !s || !n) return;
						(t.value = e.getAttribute("data-lang")),
							a && a.setAttribute("data-lang", e.getAttribute("data-lang")),
							r && r.setAttribute("data-lang", e.getAttribute("data-lang"));
						const l = e.getAttribute("data-lang") || "en";
						o &&
							("es" === l
								? o.setAttribute("translate", "no")
								: o.removeAttribute("translate")),
							t.dispatchEvent(new Event("change")),
							(s.innerText = e.getAttribute("data-lang")),
							s.setAttribute("data-lang", e.getAttribute("data-lang"));
						const i = n.querySelector(".option.selected");
						i && i.classList.remove("selected"),
							e.classList.add("selected"),
							n.classList.remove("toggle"),
							"en" == e.getAttribute("data-lang") &&
								setTimeout(() => {
									t.dispatchEvent(new Event("change"));
								}, 200);
					})(e.target),
						e.stopPropagation();
				});
			}),
			document.addEventListener("click", (e) => {
				e.target.closest(".gtranslate_select_box") ||
					document.querySelector(".gtranslate_dropdown")?.classList.remove("toggle");
			});
		(() => {
			const e = ((t = "googtrans"),
			document.cookie.split("; ").reduce((e, t) => {
				const [s, n] = t.split("=");
				return (e[s] = n), e;
			}, {})[t])?.split("/")?.[2];
			var t;
			if (e) {
				const t = document.querySelector(".gtranslate_btn"),
					s = document.querySelector(`.gtranslate_dropdown .option[data-lang="${e}"]`),
					n = document.querySelector(".bs-spanish-youtube"),
					a = document.querySelector(".bs-turkish-youtube"),
					r = document.getElementById("bs-main-heading");
				if (
					(n && n.setAttribute("data-lang", e),
					a && a.setAttribute("data-lang", e),
					r && "es" === e && r.setAttribute("translate", "no"),
					t && s)
				) {
					(t.innerHTML = e), t.setAttribute("data-lang", e);
					const n = document.querySelector(".gtranslate_dropdown .option.selected");
					n && n.classList.remove("selected"), s.classList.add("selected");
				}
			}
		})();
		let Ae = document.querySelectorAll(".wpcf7-hidden.device-type"),
			ke = document.querySelectorAll(".wpcf7-hidden.page-source");
		if (Ae || ke) {
			let $e = window.location.href;
			Ae.forEach((e) => {
				e.value = isMobileTablet() ? "Mobile" : "Desktop";
			}),
				ke.forEach((e) => {
					e.value = $e;
				});
		}
		(() => {
			let e,
				t = document.querySelector(".bs-story-slider-wrapper");
			if (!elementExist(t)) return;
			let s = 0;
			const n = t.querySelectorAll(".bs-story-cover"),
				a = t.querySelector(".bs-story-content-wrapper"),
				r = t.querySelectorAll(".bs-story-nav"),
				o = t.querySelectorAll(".story-dir-nav"),
				l = r.length - 1;
			let i = !0;
			const c = () => {
					const e = document.documentElement.classList.contains("translated-rtl");
					(a.style.transform = `translateX(${e ? "" : "-"}${100 * s}%)`),
						__each(n).removeClass("active"),
						__each(n[s]).addClass("active"),
						__each(r).removeClass("active"),
						__each(r[s]).addClass("active"),
						n[s].scrollIntoView({
							behavior: "smooth",
							block: "nearest",
							inline: "nearest",
						});
				},
				d = () => {
					s = s < l ? s + 1 : 0;
					const e = document.documentElement.classList.contains("translated-rtl");
					(a.style.transform = `translateX(${e ? "" : "-"}${100 * s}%)`),
						__each(n).removeClass("active"),
						__each(n[s]).addClass("active"),
						__each(r).removeClass("active"),
						__each(r[s]).addClass("active");
				},
				u = () => {
					clearInterval(e), (e = setInterval(d, 1e4));
				};
			r.forEach((e, t) => {
				(e._storyIdx = t),
					e.addEventListener("click", () => {
						(s = e._storyIdx), c(), u();
					});
			}),
				n &&
					n.forEach((t) => {
						let s = t.querySelector(".bs-video");
						s &&
							s.addEventListener("click", () => {
								clearInterval(e), (i = !1);
							});
					});
			let m = document.querySelector(".video-wrapper .close");
			i &&
				m &&
				m.addEventListener("click", () => {
					(i = !0), d(), u();
				}),
				o.forEach((e) => {
					e.addEventListener("click", () => {
						"prev" === e.id &&
							s > 0 &&
							(s--,
							c(),
							__each(o).removeClass("btn-ghost").addClass("btn-moon"),
							s - 1 < 0 && __each(e).removeClass("btn-moon").addClass("btn-ghost")),
							"next" === e.id &&
								s < l &&
								(s++,
								c(),
								__each(o).removeClass("btn-ghost").addClass("btn-moon"),
								s + 1 > l &&
									__each(e).removeClass("btn-moon").addClass("btn-ghost")),
							u();
					});
				});
			new IntersectionObserver(
				(t, s) => {
					t.forEach((t) => {
						t.isIntersecting &&
							(r[0].classList.add("active"),
							(e = setInterval(d, 1e4)),
							s.disconnect());
					});
				},
				{ root: null, threshold: 0.2 }
			).observe(t);
		})();
		function Te(e) {
			const t = e.getBoundingClientRect();
			return t.top < window.innerHeight && t.bottom > 0;
		}
		(() => {
			const e = document.querySelectorAll(".bs-slider-container");
			0 !== e.length &&
				e.forEach((e) => {
					const t = e.querySelector(".bs-slider"),
						s = e.querySelector(".bs-slider-controls .prev-slide"),
						n = e.querySelector(".bs-slider-controls .next-slide"),
						a = t.children.length;
					let r = 0;
					const o = () => {
							let e = document.documentElement.classList.contains("translated-rtl");
							t.style.transform = e
								? `translateX(${100 * r}%)`
								: `translateX(-${100 * r}%)`;
						},
						l = () => {
							(r = (r + 1) % a), o();
						};
					n &&
						n.addEventListener("click", () => {
							c(), l();
						}),
						s &&
							s.addEventListener("click", () => {
								c(), (r = (r - 1 + a) % a), o();
							});
					let i = null;
					const c = () => {
						clearInterval(i);
					};
					i = setInterval(l, 3e3);
				});
		})(),
			(() => {
				function e(e, t) {
					Te(e) && e.classList.add("animate");
				}
				document.querySelectorAll(".section-to-animate").forEach((t) => {
					t.dataset.animationSpeed,
						e(t),
						window.addEventListener("scroll", () => {
							e(t);
						});
				});
			})(),
			(() => {
				let e = document.querySelectorAll(".bs-popover-animate");
				e.length > 0 &&
					e.forEach((e) => {
						let t = e.querySelectorAll(".bs-popover-img-wrapper");
						t.forEach((s, n) => {
							let a = s.querySelector("img");
							a.addEventListener("mouseover", () => {
								t.forEach((e, t) => {
									t < n
										? e.classList.add("popover-prev")
										: t > n && e.classList.add("popover-next"),
										e.classList.remove("popover-active");
								}),
									s.classList.add("popover-active"),
									e.classList.add("animate-active");
							}),
								a.addEventListener("mouseout", () => {
									t.forEach((e, t) => {
										e.classList.remove("popover-next"),
											e.classList.remove("popover-prev");
									}),
										s.classList.remove("popover-active"),
										e.classList.remove("animate-active");
								});
						});
					});
			})(),
			(() => {
				const e = (e) => {
						const t = (e) => {
								const s = document.createDocumentFragment();
								if (e.nodeType === Node.TEXT_NODE) {
									e.textContent
										.split(/(\s+)/)
										.filter((e) => e.length > 0)
										.map((e) => {
											const t = document.createElement("span");
											return (
												(t.textContent = e),
												/^\s+$/.test(e) || t.classList.add("word"),
												t
											);
										})
										.forEach((e) => s.appendChild(e));
								} else if (e.nodeType === Node.ELEMENT_NODE)
									if ("BR" === e.tagName) s.appendChild(e.cloneNode());
									else {
										const n = document.createElement("span");
										(n.className = `${e.className} child-wrapper`.trim()),
											Array.from(e.childNodes).forEach((e) => {
												n.appendChild(t(e));
											}),
											s.appendChild(n);
									}
								return s;
							},
							s = Array.from(e.childNodes);
						(e.textContent = ""),
							s.forEach((s) => {
								e.appendChild(t(s));
							});
						Array.from(e.querySelectorAll(".word")).forEach((e, t) => {
							setTimeout(() => {
								e.classList.add("animate-word");
							}, 100 + 20 * t);
						});
					},
					t = new IntersectionObserver(
						(t, s) => {
							t.forEach((t) => {
								if (t.isIntersecting) {
									const n = t.target;
									n.classList.add("visible"), e(n), s.unobserve(n);
								}
							});
						},
						{ threshold: 0.2 }
					),
					s = document.querySelectorAll(".animated-text");
				setTimeout(() => {
					s.forEach((e) => t.observe(e));
				}, 10);
			})(),
			(function (e = ".animate-card", t = {}) {
				const s = { delay: 200, ...t };
				document.querySelectorAll(e).forEach((e) => {
					const t = Array.from(e.children),
						n = new Set();
					function a(e) {
						const t = e.getBoundingClientRect();
						return { top: t.top, bottom: t.bottom, height: t.height };
					}
					function r(e, t) {
						const s = a(e),
							n = a(t);
						return !(s.bottom <= n.top);
					}
					function o() {
						const e = (function (e) {
							if (0 === e.length) return [];
							const t = [];
							let s = [e[0]];
							for (let n = 1; n < e.length; n++) {
								const a = e[n];
								r(s[s.length - 1], a) ? s.push(a) : (t.push(s), (s = [a]));
							}
							return s.length > 0 && t.push(s), t;
						})(t);
						e.forEach((e, t) => {
							e.forEach((e, t) => {
								Te(e) &&
									!n.has(e) &&
									setTimeout(() => {
										e.classList.add("visible"), n.add(e);
									}, t * s.delay);
							});
						}),
							n.size === t.length && window.removeEventListener("scroll", o);
					}
					o(),
						window.addEventListener("scroll", o),
						window.addEventListener("resize", o);
				});
			})(),
			(() => {
				const e = document.getElementById("releaseCalendar");
				if (e && bsXhrObj.versions) {
					let s = bsXhrObj.versions;
					s = s["release-calendar"] ? s["release-calendar"].items : "";
					const n = Math.min(
							...s.map((e) => new Date(e.maintained_start).getFullYear())
						),
						a = (e) => {
							const t = e.getFullYear(),
								s = e.getMonth();
							return t - n + s / 12;
						};
					let r = [];
					s.forEach((e) => {
						const t = new Date(e.maintained_end),
							s = new Date(e.security_end);
						isNaN(t) || r.push(a(t)), isNaN(s) || r.push(a(s));
					});
					const o = Math.max(...r);
					let l = [],
						i = [],
						c = [];
					function t(e) {
						(l = []),
							(i = []),
							(c = []),
							s.forEach((t) => {
								const s = new Date(t.maintained_start),
									n = new Date(t.maintained_end),
									r = new Date(t.security_start),
									o = new Date(t.security_end);
								let d = a(s),
									u = a(n),
									m = a(r),
									p = a(o);
								p < m && (p = m),
									u < d && (u = d),
									u < m && (u = m),
									m < u && ((m = u), p < u && (p = u));
								const h = (e) =>
									new Date(e).toLocaleString("en-US", {
										month: "long",
										year: "numeric",
									});
								c.push({
									maintainedStart: h(t.maintained_start),
									maintainedEnd: h(t.maintained_end),
									securityStart: h(t.security_start),
									securityEnd: h(t.security_end),
								}),
									l.push([d, u]),
									"0" === t.security_start && "0" === t.security_end
										? i.push(e ? [NaN, NaN] : NaN)
										: i.push(e ? [m, p] : p - m);
							}),
							(p.data.datasets[0].data = l),
							(p.data.datasets[1].data = i);
					}
					const d = e.getContext("2d"),
						u = screen.width < 525 ? 26 : 38,
						m = s.length * u * 1.5 + 94;
					(e.style.height = `${m}px`), (e.parentElement.style.height = `${m}px`);
					const p = new Chart(d, {
						type: "bar",
						data: {
							labels: s.map((e) => e.version),
							datasets: [
								{
									label: "Maintained version",
									data: l,
									backgroundColor: "#C1C7D0",
									stack: "Stack 1",
									barThickness: u,
								},
								{
									label: "Security fixes only",
									data: i,
									backgroundColor: "#0041FF",
									stack: "Stack 1",
									barThickness: u,
								},
							],
						},
						options: {
							indexAxis: "y",
							responsive: !0,
							maintainAspectRatio: !1,
							scales: {
								y: { stacked: !0, categoryPercentage: 0.6, barPercentage: 0.9 },
								x: {
									stacked: !0,
									min: 0,
									grid: { display: !1 },
									max: o,
									ticks: {
										stepSize: 1,
										callback: function (e) {
											return n + Math.floor(e);
										},
									},
								},
							},
							plugins: {
								legend: {
									position: "bottom",
									onClick: function (e, s, n) {
										const a = s.datasetIndex,
											r = this.chart.getDatasetMeta(a);
										(r.hidden =
											null === r.hidden
												? !this.chart.data.datasets[a].hidden
												: null),
											0 === a && t(r.hidden),
											this.chart.update();
									},
								},
								tooltip: {
									callbacks: {
										title: (e) => e[0].label,
										label: (e) => {
											const t = e.dataIndex,
												s = e.datasetIndex,
												n = c[t];
											let a = e.dataset.label;
											return (
												(a +=
													0 === s
														? `: ${n.maintainedStart} - ${n.maintainedEnd}`
														: `: ${n.securityStart} - ${n.securityEnd}`),
												a
											);
										},
									},
								},
							},
						},
					});
					t(!1), p.update();
				}
			})(),
			(() => {
				const e = document.querySelectorAll(".bs-download-composer-command-wrapper");
				e &&
					e.forEach((e) => {
						const t = e.querySelector(".bs-copy-icon"),
							s = e.querySelector("code");
						t &&
							s &&
							t.addEventListener("click", () => {
								const t = s.innerText.trim();
								navigator.clipboard
									.writeText(t)
									.then(() => {
										e.classList.add("is-copied"),
											setTimeout(() => {
												e.classList.remove("is-copied");
											}, 1500);
									})
									.catch((e) => {
										console.error("Clipboard copy failed", e);
									});
							});
					});
			})();
	});
let copyBtn = document.querySelectorAll(".crayon-button.urvanov-syntax-highlighter-copy-button");
if (copyBtn) {
	let e = document.createElement("span");
	(e.className = "mk-copy-div"),
		(e.textContent = "Copied"),
		copyBtn.forEach((t) => {
			t.addEventListener("click", () => {
				t.appendChild(e),
					setTimeout(() => {
						t.removeChild(e);
					}, 1e3);
			});
		});
}
function initEsSwipeSlider() {
	var e = document.querySelectorAll(".es-swipe-container");
	e.length &&
		e.forEach(function (e) {
			var t = e.querySelector(".wk-row-grid");
			if (!t) return;
			var s = e.querySelector(".es-container");
			s ||
				(((s = document.createElement("div")).className = "es-container"),
				(s.innerHTML =
					'<span class="swiper-control-btn left"></span><span class="swiper-control-btn right"></span>'),
				e.appendChild(s));
			let n = t.children;
			if (!n.length) return;
			let a =
					n[0].getBoundingClientRect().width +
					parseInt(window.getComputedStyle(t).gap || 26),
				r = e.querySelector(".swiper-control-btn.left"),
				o = e.querySelector(".swiper-control-btn.right");
			function l() {
				var e = t.scrollLeft <= 5,
					n = Math.ceil(t.scrollLeft + t.clientWidth) >= t.scrollWidth - 5;
				r && r.classList.toggle("es-btn-disabled", e),
					o && o.classList.toggle("es-btn-disabled", n),
					t.scrollWidth <= t.clientWidth
						? s && (s.style.display = "none")
						: s && (s.style.display = "flex");
			}
			setTimeout(l, 100),
				window.addEventListener("resize", () => {
					(a =
						n[0].getBoundingClientRect().width +
						parseInt(window.getComputedStyle(t).gap || 26)),
						l();
				}),
				r &&
					r.addEventListener("click", () => {
						r.classList.contains("es-btn-disabled") ||
							t.scrollTo({ top: 0, left: t.scrollLeft - a, behavior: "smooth" });
					}),
				o &&
					o.addEventListener("click", () => {
						o.classList.contains("es-btn-disabled") ||
							t.scrollTo({ top: 0, left: t.scrollLeft + a, behavior: "smooth" });
					}),
				t.addEventListener("scroll", l);
		});
}
if (
	(document.addEventListener("click", function (e) {
		if (e.target.classList.contains("highlighter-close")) {
			e.preventDefault(), e.stopPropagation();
			const t = e.target.closest(".bs-highlighter-box");
			t && t.remove();
		}
	}),
	initEsSwipeSlider(),
	document.querySelector(".bs-schema-faq"))
) {
	document.querySelectorAll(".bs-schema-faq-section").forEach((e) => {
		e.addEventListener("click", function () {
			const t = e.querySelector(".bs-schema-faq-answer");
			if (e.classList.contains("active"))
				e.classList.remove("active"), (t.style.height = "0px");
			else {
				let s = 0;
				const n = t.children;
				for (let e = 0; e < n.length; e++) {
					const t = window.getComputedStyle(n[e]);
					s += n[e].offsetHeight + parseInt(t.marginTop) + parseInt(t.marginBottom);
				}
				e.classList.add("active"), (t.style.height = s + "px");
			}
		});
	});
}
const initRevealOnScroll = () => {
		const e = document.querySelectorAll(".reveal-on-scroll"),
			t = new IntersectionObserver(
				(e, t) => {
					e.forEach((e) => {
						if (e.isIntersecting) {
							const s = e.target,
								n = parseInt(s.getAttribute("data-index") || 0);
							setTimeout(() => {
								s.classList.add("is-visible");
							}, 100 * n),
								t.unobserve(s);
						}
					});
				},
				{ threshold: 0.1, rootMargin: "0px" }
			);
		e.forEach((e) => t.observe(e));
	},
	initCloudPricing = () => {
		const e = document.getElementById("cd-pricing-bagisto");
		if (!e) return;
		e.classList.add("is-loading");
		let t = !1;
		function s() {
			t || ((t = !0), e.classList.remove("is-loading"));
		}
		window.addEventListener("message", function (e) {
			const t = e.data;
			t && "cd-app-embed" === t.source && "resize" === t.type && s();
		});
		const n = new MutationObserver(function () {
			const t = e.querySelector("iframe");
			t && (n.disconnect(), t.addEventListener("load", s));
		});
		n.observe(e, { childList: !0 }), setTimeout(s, 12e3);
	};
document.addEventListener("DOMContentLoaded", () => {
	initRevealOnScroll(), initCloudPricing();
});
