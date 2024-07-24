!(function () {
  function t(t) {
    return t && t.__esModule ? t.default : t;
  }
  var e = {};
  function r() {}
  (r.prototype = {
    on: function (t, e, r) {
      var n = this.e || (this.e = {});
      return (n[t] || (n[t] = [])).push({fn: e, ctx: r}), this;
    },
    once: function (t, e, r) {
      var n = this;
      function i() {
        n.off(t, i), e.apply(r, arguments);
      }
      return (i._ = e), this.on(t, i, r);
    },
    emit: function (t) {
      for (
        var e = [].slice.call(arguments, 1),
          r = ((this.e || (this.e = {}))[t] || []).slice(),
          n = 0,
          i = r.length;
        n < i;
        n++
      )
        r[n].fn.apply(r[n].ctx, e);
      return this;
    },
    off: function (t, e) {
      var r = this.e || (this.e = {}),
        n = r[t],
        i = [];
      if (n && e)
        for (var o = 0, s = n.length; o < s; o++)
          n[o].fn !== e && n[o].fn._ !== e && i.push(n[o]);
      return i.length ? (r[t] = i) : delete r[t], this;
    },
  }),
    ((e = r).TinyEmitter = r);
  var n = {};
  function i(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function o(t, e, r) {
    return (
      e && i(t.prototype, e),
      r && i(t, r),
      Object.defineProperty(t, "prototype", {writable: !1}),
      t
    );
  }
  function s() {
    return (
      (s = Object.assign
        ? Object.assign.bind()
        : function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var r = arguments[e];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
            }
            return t;
          }),
      s.apply(this, arguments)
    );
  }
  function a(t, e) {
    return (
      (a = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (t, e) {
            return (t.__proto__ = e), t;
          }),
      a(t, e)
    );
  }
  function l(t, e) {
    var r = t % e;
    return ((e > 0 && r < 0) || (e < 0 && r > 0)) && (r += e), r;
  }
  n = (function () {
    var t = 0;
    function e(e) {
      return "__private_" + t++ + "_" + e;
    }
    function r(t, e) {
      if (!Object.prototype.hasOwnProperty.call(t, e))
        throw new TypeError("attempted to use private field on non-instance");
      return t;
    }
    function n() {}
    n.prototype = {
      on: function (t, e, r) {
        var n = this.e || (this.e = {});
        return (n[t] || (n[t] = [])).push({fn: e, ctx: r}), this;
      },
      once: function (t, e, r) {
        var n = this;
        function i() {
          n.off(t, i), e.apply(r, arguments);
        }
        return (i._ = e), this.on(t, i, r);
      },
      emit: function (t) {
        for (
          var e = [].slice.call(arguments, 1),
            r = ((this.e || (this.e = {}))[t] || []).slice(),
            n = 0,
            i = r.length;
          n < i;
          n++
        )
          r[n].fn.apply(r[n].ctx, e);
        return this;
      },
      off: function (t, e) {
        var r = this.e || (this.e = {}),
          n = r[t],
          i = [];
        if (n && e)
          for (var o = 0, s = n.length; o < s; o++)
            n[o].fn !== e && n[o].fn._ !== e && i.push(n[o]);
        return i.length ? (r[t] = i) : delete r[t], this;
      },
    };
    var i = n;
    i.TinyEmitter = n;
    var o,
      s = "virtualscroll",
      a = e("options"),
      l = e("el"),
      u = e("emitter"),
      c = e("event"),
      h = e("touchStart"),
      f = e("bodyTouchAction");
    return (function () {
      function t(t) {
        var e = this;
        Object.defineProperty(this, a, {writable: !0, value: void 0}),
          Object.defineProperty(this, l, {writable: !0, value: void 0}),
          Object.defineProperty(this, u, {writable: !0, value: void 0}),
          Object.defineProperty(this, c, {writable: !0, value: void 0}),
          Object.defineProperty(this, h, {writable: !0, value: void 0}),
          Object.defineProperty(this, f, {writable: !0, value: void 0}),
          (this._onWheel = function (t) {
            var n = r(e, a)[a],
              i = r(e, c)[c];
            (i.deltaX = t.wheelDeltaX || -1 * t.deltaX),
              (i.deltaY = t.wheelDeltaY || -1 * t.deltaY),
              o.isFirefox &&
                1 === t.deltaMode &&
                ((i.deltaX *= n.firefoxMultiplier),
                (i.deltaY *= n.firefoxMultiplier)),
              (i.deltaX *= n.mouseMultiplier),
              (i.deltaY *= n.mouseMultiplier),
              e._notify(t);
          }),
          (this._onMouseWheel = function (t) {
            var n = r(e, c)[c];
            (n.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0),
              (n.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta),
              e._notify(t);
          }),
          (this._onTouchStart = function (t) {
            var n = t.targetTouches ? t.targetTouches[0] : t;
            (r(e, h)[h].x = n.pageX), (r(e, h)[h].y = n.pageY);
          }),
          (this._onTouchMove = function (t) {
            var n = r(e, a)[a];
            n.preventTouch &&
              !t.target.classList.contains(n.unpreventTouchClass) &&
              t.preventDefault();
            var i = r(e, c)[c],
              o = t.targetTouches ? t.targetTouches[0] : t;
            (i.deltaX = (o.pageX - r(e, h)[h].x) * n.touchMultiplier),
              (i.deltaY = (o.pageY - r(e, h)[h].y) * n.touchMultiplier),
              (r(e, h)[h].x = o.pageX),
              (r(e, h)[h].y = o.pageY),
              e._notify(t);
          }),
          (this._onKeyDown = function (t) {
            var n = r(e, c)[c];
            n.deltaX = n.deltaY = 0;
            var i = window.innerHeight - 40;
            switch (t.keyCode) {
              case 37:
              case 38:
                n.deltaY = r(e, a)[a].keyStep;
                break;
              case 39:
              case 40:
                n.deltaY = -r(e, a)[a].keyStep;
                break;
              case 32:
                n.deltaY = i * (t.shiftKey ? 1 : -1);
                break;
              default:
                return;
            }
            e._notify(t);
          }),
          (r(this, l)[l] = window),
          t && t.el && ((r(this, l)[l] = t.el), delete t.el),
          o ||
            (o = {
              hasWheelEvent: "onwheel" in document,
              hasMouseWheelEvent: "onmousewheel" in document,
              hasTouch: "ontouchstart" in document,
              hasTouchWin:
                navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
              hasPointer: !!window.navigator.msPointerEnabled,
              hasKeyDown: "onkeydown" in document,
              isFirefox: navigator.userAgent.indexOf("Firefox") > -1,
            }),
          (r(this, a)[a] = Object.assign(
            {
              mouseMultiplier: 1,
              touchMultiplier: 2,
              firefoxMultiplier: 15,
              keyStep: 120,
              preventTouch: !1,
              unpreventTouchClass: "vs-touchmove-allowed",
              useKeyboard: !0,
              useTouch: !0,
            },
            t
          )),
          (r(this, u)[u] = new i()),
          (r(this, c)[c] = {y: 0, x: 0, deltaX: 0, deltaY: 0}),
          (r(this, h)[h] = {x: null, y: null}),
          (r(this, f)[f] = null),
          void 0 !== r(this, a)[a].passive &&
            (this.listenerOptions = {passive: r(this, a)[a].passive});
      }
      var e = t.prototype;
      return (
        (e._notify = function (t) {
          var e = r(this, c)[c];
          (e.x += e.deltaX),
            (e.y += e.deltaY),
            r(this, u)[u].emit(s, {
              x: e.x,
              y: e.y,
              deltaX: e.deltaX,
              deltaY: e.deltaY,
              originalEvent: t,
            });
        }),
        (e._bind = function () {
          o.hasWheelEvent &&
            r(this, l)[l].addEventListener(
              "wheel",
              this._onWheel,
              this.listenerOptions
            ),
            o.hasMouseWheelEvent &&
              r(this, l)[l].addEventListener(
                "mousewheel",
                this._onMouseWheel,
                this.listenerOptions
              ),
            o.hasTouch &&
              r(this, a)[a].useTouch &&
              (r(this, l)[l].addEventListener(
                "touchstart",
                this._onTouchStart,
                this.listenerOptions
              ),
              r(this, l)[l].addEventListener(
                "touchmove",
                this._onTouchMove,
                this.listenerOptions
              )),
            o.hasPointer &&
              o.hasTouchWin &&
              ((r(this, f)[f] = document.body.style.msTouchAction),
              (document.body.style.msTouchAction = "none"),
              r(this, l)[l].addEventListener(
                "MSPointerDown",
                this._onTouchStart,
                !0
              ),
              r(this, l)[l].addEventListener(
                "MSPointerMove",
                this._onTouchMove,
                !0
              )),
            o.hasKeyDown &&
              r(this, a)[a].useKeyboard &&
              document.addEventListener("keydown", this._onKeyDown);
        }),
        (e._unbind = function () {
          o.hasWheelEvent &&
            r(this, l)[l].removeEventListener("wheel", this._onWheel),
            o.hasMouseWheelEvent &&
              r(this, l)[l].removeEventListener(
                "mousewheel",
                this._onMouseWheel
              ),
            o.hasTouch &&
              (r(this, l)[l].removeEventListener(
                "touchstart",
                this._onTouchStart
              ),
              r(this, l)[l].removeEventListener(
                "touchmove",
                this._onTouchMove
              )),
            o.hasPointer &&
              o.hasTouchWin &&
              ((document.body.style.msTouchAction = r(this, f)[f]),
              r(this, l)[l].removeEventListener(
                "MSPointerDown",
                this._onTouchStart,
                !0
              ),
              r(this, l)[l].removeEventListener(
                "MSPointerMove",
                this._onTouchMove,
                !0
              )),
            o.hasKeyDown &&
              r(this, a)[a].useKeyboard &&
              document.removeEventListener("keydown", this._onKeyDown);
        }),
        (e.on = function (t, e) {
          r(this, u)[u].on(s, t, e);
          var n = r(this, u)[u].e;
          n && n[s] && 1 === n[s].length && this._bind();
        }),
        (e.off = function (t, e) {
          r(this, u)[u].off(s, t, e);
          var n = r(this, u)[u].e;
          (!n[s] || n[s].length <= 0) && this._unbind();
        }),
        (e.destroy = function () {
          r(this, u)[u].off(), this._unbind();
        }),
        t
      );
    })();
  })();
  var u = ["duration", "easing"],
    c = (function () {
      function t() {}
      var e = t.prototype;
      return (
        (e.to = function (t, e) {
          var r = this,
            n = void 0 === e ? {} : e,
            i = n.duration,
            o = void 0 === i ? 1 : i,
            a = n.easing,
            l =
              void 0 === a
                ? function (t) {
                    return t;
                  }
                : a,
            c = (function (t, e) {
              if (null == t) return {};
              var r,
                n,
                i = {},
                o = Object.keys(t);
              for (n = 0; n < o.length; n++)
                e.indexOf((r = o[n])) >= 0 || (i[r] = t[r]);
              return i;
            })(n, u);
          (this.target = t),
            (this.fromKeys = s({}, c)),
            (this.toKeys = s({}, c)),
            (this.keys = Object.keys(s({}, c))),
            this.keys.forEach(function (e) {
              r.fromKeys[e] = t[e];
            }),
            (this.duration = o),
            (this.easing = l),
            (this.currentTime = 0),
            (this.isRunning = !0);
        }),
        (e.stop = function () {
          this.isRunning = !1;
        }),
        (e.raf = function (t) {
          var e = this;
          if (this.isRunning) {
            this.currentTime = Math.min(this.currentTime + t, this.duration);
            var r = this.progress >= 1 ? 1 : this.easing(this.progress);
            this.keys.forEach(function (t) {
              var n = e.fromKeys[t];
              e.target[t] = n + (e.toKeys[t] - n) * r;
            }),
              1 === r && this.stop();
          }
        }),
        o(t, [
          {
            key: "progress",
            get: function () {
              return this.currentTime / this.duration;
            },
          },
        ]),
        t
      );
    })(),
    h = (function (e) {
      var r, i;
      function s(r) {
        var i,
          o,
          s,
          a,
          l = void 0 === r ? {} : r,
          u = l.duration,
          h = void 0 === u ? 1.2 : u,
          f = l.easing,
          p =
            void 0 === f
              ? function (t) {
                  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
                }
              : f,
          d = l.smooth,
          g = void 0 === d || d,
          m = l.mouseMultiplier,
          v = void 0 === m ? 1 : m,
          _ = l.smoothTouch,
          y = void 0 !== _ && _,
          w = l.touchMultiplier,
          b = void 0 === w ? 2 : w,
          x = l.direction,
          T = void 0 === x ? "vertical" : x,
          S = l.gestureDirection,
          M = void 0 === S ? "vertical" : S,
          O = l.infinite,
          k = void 0 !== O && O,
          E = l.wrapper,
          A = void 0 === E ? window : E,
          P = l.content,
          C = void 0 === P ? document.body : P;
        ((a = e.call(this) || this).onWindowResize = function () {
          (a.wrapperWidth = window.innerWidth),
            (a.wrapperHeight = window.innerHeight);
        }),
          (a.onWrapperResize = function (t) {
            var e = t[0];
            if (e) {
              var r = e.contentRect;
              (a.wrapperWidth = r.width), (a.wrapperHeight = r.height);
            }
          }),
          (a.onContentResize = function (t) {
            var e = t[0];
            if (e) {
              var r = e.contentRect;
              (a.contentWidth = r.width), (a.contentHeight = r.height);
            }
          }),
          (a.onVirtualScroll = function (t) {
            var e = t.deltaY,
              r = t.deltaX,
              n = t.originalEvent;
            if (
              !(
                ("vertical" === a.gestureDirection && 0 === e) ||
                ("horizontal" === a.gestureDirection && 0 === r)
              )
            ) {
              var i = !!n.composedPath().find(function (t) {
                return t.hasAttribute && t.hasAttribute("data-lenis-prevent");
              });
              n.ctrlKey ||
                i ||
                ((a.smooth = n.changedTouches
                  ? a.smoothTouch
                  : a.options.smooth),
                a.stopped
                  ? n.preventDefault()
                  : a.smooth &&
                    4 !== n.buttons &&
                    (a.smooth && n.preventDefault(),
                    (a.targetScroll -=
                      "both" === a.gestureDirection
                        ? r + e
                        : "horizontal" === a.gestureDirection
                        ? r
                        : e),
                    a.scrollTo(a.targetScroll)));
            }
          }),
          (a.onScroll = function (t) {
            (a.isScrolling && a.smooth) ||
              ((a.targetScroll =
                a.scroll =
                a.lastScroll =
                  a.wrapperNode[a.scrollProperty]),
              a.notify());
          }),
          (window.lenisVersion = "0.2.28"),
          (a.options = {
            duration: h,
            easing: p,
            smooth: g,
            mouseMultiplier: v,
            smoothTouch: y,
            touchMultiplier: b,
            direction: T,
            gestureDirection: M,
            infinite: k,
            wrapper: A,
            content: C,
          }),
          (a.duration = h),
          (a.easing = p),
          (a.smooth = g),
          (a.mouseMultiplier = v),
          (a.smoothTouch = y),
          (a.touchMultiplier = b),
          (a.direction = T),
          (a.gestureDirection = M),
          (a.infinite = k),
          (a.wrapperNode = A),
          (a.contentNode = C),
          a.wrapperNode.addEventListener("scroll", a.onScroll),
          a.wrapperNode === window
            ? (a.wrapperNode.addEventListener("resize", a.onWindowResize),
              a.onWindowResize())
            : ((a.wrapperHeight = a.wrapperNode.offsetHeight),
              (a.wrapperWidth = a.wrapperNode.offsetWidth),
              (a.wrapperObserver = new ResizeObserver(a.onWrapperResize)),
              a.wrapperObserver.observe(a.wrapperNode)),
          (a.contentHeight = a.contentNode.offsetHeight),
          (a.contentWidth = a.contentNode.offsetWidth),
          (a.contentObserver = new ResizeObserver(a.onContentResize)),
          a.contentObserver.observe(a.contentNode),
          (a.targetScroll =
            a.scroll =
            a.lastScroll =
              a.wrapperNode[a.scrollProperty]),
          (a.animate = new c());
        var D =
          (null == (i = navigator) || null == (o = i.userAgentData)
            ? void 0
            : o.platform) ||
          (null == (s = navigator) ? void 0 : s.platform) ||
          "unknown";
        return (
          (a.virtualScroll = new (t(n))({
            el: a.wrapperNode,
            firefoxMultiplier: 50,
            mouseMultiplier:
              a.mouseMultiplier *
              (D.includes("Win") || D.includes("Linux") ? 0.84 : 0.4),
            touchMultiplier: a.touchMultiplier,
            passive: !1,
            useKeyboard: !1,
            useTouch: !0,
          })),
          a.virtualScroll.on(a.onVirtualScroll),
          a
        );
      }
      (i = e),
        ((r = s).prototype = Object.create(i.prototype)),
        (r.prototype.constructor = r),
        a(r, i);
      var u = s.prototype;
      return (
        (u.start = function () {
          var t = this.wrapperNode;
          this.wrapperNode === window && (t = document.documentElement),
            t.classList.remove("lenis-stopped"),
            (this.stopped = !1);
        }),
        (u.stop = function () {
          var t = this.wrapperNode;
          this.wrapperNode === window && (t = document.documentElement),
            t.classList.add("lenis-stopped"),
            (this.stopped = !0),
            this.animate.stop();
        }),
        (u.destroy = function () {
          var t;
          this.wrapperNode === window &&
            this.wrapperNode.removeEventListener("resize", this.onWindowResize),
            this.wrapperNode.removeEventListener("scroll", this.onScroll),
            this.virtualScroll.destroy(),
            null == (t = this.wrapperObserver) || t.disconnect(),
            this.contentObserver.disconnect();
        }),
        (u.raf = function (t) {
          var e = t - (this.now || 0);
          (this.now = t),
            !this.stopped &&
              this.smooth &&
              ((this.lastScroll = this.scroll),
              this.animate.raf(0.001 * e),
              this.scroll === this.targetScroll &&
                (this.lastScroll = this.scroll),
              this.isScrolling && (this.setScroll(this.scroll), this.notify()),
              (this.isScrolling = this.scroll !== this.targetScroll));
        }),
        (u.setScroll = function (t) {
          var e = this.infinite ? l(t, this.limit) : t;
          "horizontal" === this.direction
            ? this.wrapperNode.scrollTo(e, 0)
            : this.wrapperNode.scrollTo(0, e);
        }),
        (u.notify = function () {
          var t = this.infinite ? l(this.scroll, this.limit) : this.scroll;
          this.emit("scroll", {
            scroll: t,
            limit: this.limit,
            velocity: this.velocity,
            direction: 0 === this.velocity ? 0 : this.velocity > 0 ? 1 : -1,
            progress: t / this.limit,
          });
        }),
        (u.scrollTo = function (t, e) {
          var r = void 0 === e ? {} : e,
            n = r.offset,
            i = void 0 === n ? 0 : n,
            o = r.immediate,
            s = void 0 !== o && o,
            a = r.duration,
            l = void 0 === a ? this.duration : a,
            u = r.easing,
            c = void 0 === u ? this.easing : u;
          if (null != t && !this.stopped) {
            var h;
            if ("number" == typeof t) h = t;
            else if ("top" === t || "#top" === t) h = 0;
            else if ("bottom" === t) h = this.limit;
            else {
              var f;
              if ("string" == typeof t) f = document.querySelector(t);
              else {
                if (null == t || !t.nodeType) return;
                f = t;
              }
              if (!f) return;
              var p = 0;
              if (this.wrapperNode !== window) {
                var d = this.wrapperNode.getBoundingClientRect();
                p = "horizontal" === this.direction ? d.left : d.top;
              }
              var g = f.getBoundingClientRect();
              h =
                ("horizontal" === this.direction ? g.left : g.top) +
                this.scroll -
                p;
            }
            (h += i),
              (this.targetScroll = this.infinite
                ? h
                : Math.max(0, Math.min(h, this.limit))),
              !this.smooth || s
                ? (this.animate.stop(),
                  (this.scroll = this.lastScroll = this.targetScroll),
                  this.setScroll(this.targetScroll))
                : this.animate.to(this, {
                    duration: l,
                    easing: c,
                    scroll: this.targetScroll,
                  });
          }
        }),
        o(s, [
          {
            key: "scrollProperty",
            get: function () {
              return this.wrapperNode === window
                ? "horizontal" === this.direction
                  ? "scrollX"
                  : "scrollY"
                : "horizontal" === this.direction
                ? "scrollLeft"
                : "scrollTop";
            },
          },
          {
            key: "limit",
            get: function () {
              return "horizontal" === this.direction
                ? this.contentWidth - this.wrapperWidth
                : this.contentHeight - this.wrapperHeight;
            },
          },
          {
            key: "velocity",
            get: function () {
              return this.scroll - this.lastScroll;
            },
          },
        ]),
        s
      );
    })(e.TinyEmitter);
  function f(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function p(t, e) {
    (t.prototype = Object.create(e.prototype)),
      (t.prototype.constructor = t),
      (t.__proto__ = e);
  }
  /*!
   * GSAP 3.11.4
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var d,
    g,
    m,
    v,
    _,
    y,
    w,
    b,
    x,
    T,
    S,
    M,
    O,
    k,
    E,
    A,
    P,
    C,
    D,
    R,
    z,
    L,
    Y,
    N,
    F,
    X,
    q,
    B,
    I,
    W,
    H = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: {lineHeight: ""},
    },
    j = {duration: 0.5, overwrite: !1, delay: 0},
    U = 1e8,
    V = 1e-8,
    K = 2 * Math.PI,
    G = K / 4,
    Z = 0,
    Q = Math.sqrt,
    $ = Math.cos,
    J = Math.sin,
    tt = function (t) {
      return "string" == typeof t;
    },
    et = function (t) {
      return "function" == typeof t;
    },
    rt = function (t) {
      return "number" == typeof t;
    },
    nt = function (t) {
      return void 0 === t;
    },
    it = function (t) {
      return "object" == typeof t;
    },
    ot = function (t) {
      return !1 !== t;
    },
    st = function () {
      return "undefined" != typeof window;
    },
    at = function (t) {
      return et(t) || tt(t);
    },
    lt =
      ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
      function () {},
    ut = Array.isArray,
    ct = /(?:-?\.?\d|\.)+/gi,
    ht = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    ft = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    pt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    dt = /[+-]=-?[.\d]+/,
    gt = /[^,'"\[\]\s]+/gi,
    mt = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    vt = {},
    _t = {},
    yt = function (t) {
      return (_t = Kt(t, vt)) && Vr;
    },
    wt = function (t, e) {
      return console.warn(
        "Invalid property",
        t,
        "set to",
        e,
        "Missing plugin? gsap.registerPlugin()"
      );
    },
    bt = function (t, e) {
      return !e && console.warn(t);
    },
    xt = function (t, e) {
      return (t && (vt[t] = e) && _t && (_t[t] = e)) || vt;
    },
    Tt = function () {
      return 0;
    },
    St = {suppressEvents: !0, isStart: !0, kill: !1},
    Mt = {suppressEvents: !0, kill: !1},
    Ot = {suppressEvents: !0},
    kt = {},
    Et = [],
    At = {},
    Pt = {},
    Ct = {},
    Dt = 30,
    Rt = [],
    zt = "",
    Lt = function (t) {
      var e,
        r,
        n = t[0];
      if ((it(n) || et(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
        for (r = Rt.length; r-- && !Rt[r].targetTest(n); );
        e = Rt[r];
      }
      for (r = t.length; r--; )
        (t[r] && (t[r]._gsap || (t[r]._gsap = new lr(t[r], e)))) ||
          t.splice(r, 1);
      return t;
    },
    Yt = function (t) {
      return t._gsap || Lt(Oe(t))[0]._gsap;
    },
    Nt = function (t, e, r) {
      return (r = t[e]) && et(r)
        ? t[e]()
        : (nt(r) && t.getAttribute && t.getAttribute(e)) || r;
    },
    Ft = function (t, e) {
      return (t = t.split(",")).forEach(e) || t;
    },
    Xt = function (t) {
      return Math.round(1e5 * t) / 1e5 || 0;
    },
    qt = function (t) {
      return Math.round(1e7 * t) / 1e7 || 0;
    },
    Bt = function (t, e) {
      var r = e.charAt(0),
        n = parseFloat(e.substr(2));
      return (
        (t = parseFloat(t)),
        "+" === r ? t + n : "-" === r ? t - n : "*" === r ? t * n : t / n
      );
    },
    It = function (t, e) {
      for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; );
      return n < r;
    },
    Wt = function () {
      var t,
        e,
        r = Et.length,
        n = Et.slice(0);
      for (At = {}, Et.length = 0, t = 0; t < r; t++)
        (e = n[t]) &&
          e._lazy &&
          (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
    },
    Ht = function (t, e, r, n) {
      Et.length && !g && Wt(),
        t.render(e, r, n || (g && e < 0 && (t._initted || t._startAt))),
        Et.length && !g && Wt();
    },
    jt = function (t) {
      var e = parseFloat(t);
      return (e || 0 === e) && (t + "").match(gt).length < 2
        ? e
        : tt(t)
        ? t.trim()
        : t;
    },
    Ut = function (t) {
      return t;
    },
    Vt = function (t, e) {
      for (var r in e) r in t || (t[r] = e[r]);
      return t;
    },
    Kt = function (t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    Gt = function t(e, r) {
      for (var n in r)
        "__proto__" !== n &&
          "constructor" !== n &&
          "prototype" !== n &&
          (e[n] = it(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);
      return e;
    },
    Zt = function (t, e) {
      var r,
        n = {};
      for (r in t) r in e || (n[r] = t[r]);
      return n;
    },
    Qt = function (t) {
      var e,
        r = t.parent || v,
        n = t.keyframes
          ? ((e = ut(t.keyframes)),
            function (t, r) {
              for (var n in r)
                n in t ||
                  ("duration" === n && e) ||
                  "ease" === n ||
                  (t[n] = r[n]);
            })
          : Vt;
      if (ot(t.inherit))
        for (; r; ) n(t, r.vars.defaults), (r = r.parent || r._dp);
      return t;
    },
    $t = function (t, e, r, n, i) {
      void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
      var o,
        s = t[n];
      if (i) for (o = e[i]; s && s[i] > o; ) s = s._prev;
      return (
        s
          ? ((e._next = s._next), (s._next = e))
          : ((e._next = t[r]), (t[r] = e)),
        e._next ? (e._next._prev = e) : (t[n] = e),
        (e._prev = s),
        (e.parent = e._dp = t),
        e
      );
    },
    Jt = function (t, e, r, n) {
      void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
      var i = e._prev,
        o = e._next;
      i ? (i._next = o) : t[r] === e && (t[r] = o),
        o ? (o._prev = i) : t[n] === e && (t[n] = i),
        (e._next = e._prev = e.parent = null);
    },
    te = function (t, e) {
      t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
        (t._act = 0);
    },
    ee = function (t, e) {
      if (t && (!e || e._end > t._dur || e._start < 0))
        for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
      return t;
    },
    re = function (t) {
      for (var e = t.parent; e && e.parent; )
        (e._dirty = 1), e.totalDuration(), (e = e.parent);
      return t;
    },
    ne = function (t, e, r, n) {
      return (
        t._startAt &&
        (g
          ? t._startAt.revert(Mt)
          : (t.vars.immediateRender && !t.vars.autoRevert) ||
            t._startAt.render(e, !0, n))
      );
    },
    ie = function t(e) {
      return !e || (e._ts && t(e.parent));
    },
    oe = function (t) {
      return t._repeat ? se(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
    },
    se = function (t, e) {
      var r = Math.floor((t /= e));
      return t && r === t ? r - 1 : r;
    },
    ae = function (t, e) {
      return (
        (t - e._start) * e._ts +
        (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
      );
    },
    le = function (t) {
      return (t._end = qt(
        t._start + (t._tDur / Math.abs(t._ts || t._rts || V) || 0)
      ));
    },
    ue = function (t, e) {
      var r = t._dp;
      return (
        r &&
          r.smoothChildTiming &&
          t._ts &&
          ((t._start = qt(
            r._time -
              (t._ts > 0
                ? e / t._ts
                : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
          )),
          le(t),
          r._dirty || ee(r, t)),
        t
      );
    },
    ce = function (t, e) {
      var r;
      if (
        ((e._time || (e._initted && !e._dur)) &&
          ((r = ae(t.rawTime(), e)),
          (!e._dur || xe(0, e.totalDuration(), r) - e._tTime > V) &&
            e.render(r, !0)),
        ee(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
      ) {
        if (t._dur < t.duration())
          for (r = t; r._dp; )
            r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
        t._zTime = -1e-8;
      }
    },
    he = function (t, e, r, n) {
      return (
        e.parent && te(e),
        (e._start = qt(
          (rt(r) ? r : r || t !== v ? ye(t, r, e) : t._time) + e._delay
        )),
        (e._end = qt(
          e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
        )),
        $t(t, e, "_first", "_last", t._sort ? "_start" : 0),
        ge(e) || (t._recent = e),
        n || ce(t, e),
        t._ts < 0 && ue(t, t._tTime),
        t
      );
    },
    fe = function (t, e) {
      return (
        (vt.ScrollTrigger || wt("scrollTrigger", e)) &&
        vt.ScrollTrigger.create(e, t)
      );
    },
    pe = function (t, e, r, n, i) {
      return (
        mr(t, e, i),
        t._initted
          ? !r &&
            t._pt &&
            !g &&
            ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
            x !== Ge.frame
            ? (Et.push(t), (t._lazy = [i, n]), 1)
            : void 0
          : 1
      );
    },
    de = function t(e) {
      var r = e.parent;
      return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r));
    },
    ge = function (t) {
      var e = t.data;
      return "isFromStart" === e || "isStart" === e;
    },
    me = function (t, e, r, n) {
      var i = t._repeat,
        o = qt(e) || 0,
        s = t._tTime / t._tDur;
      return (
        s && !n && (t._time *= o / t._dur),
        (t._dur = o),
        (t._tDur = i ? (i < 0 ? 1e10 : qt(o * (i + 1) + t._rDelay * i)) : o),
        s > 0 && !n && ue(t, (t._tTime = t._tDur * s)),
        t.parent && le(t),
        r || ee(t.parent, t),
        t
      );
    },
    ve = function (t) {
      return t instanceof cr ? ee(t) : me(t, t._dur);
    },
    _e = {_start: 0, endTime: Tt, totalDuration: Tt},
    ye = function t(e, r, n) {
      var i,
        o,
        s,
        a = e.labels,
        l = e._recent || _e,
        u = e.duration() >= U ? l.endTime(!1) : e._dur;
      return tt(r) && (isNaN(r) || r in a)
        ? ((o = r.charAt(0)),
          (s = "%" === r.substr(-1)),
          (i = r.indexOf("=")),
          "<" === o || ">" === o
            ? (i >= 0 && (r = r.replace(/=/, "")),
              ("<" === o ? l._start : l.endTime(l._repeat >= 0)) +
                (parseFloat(r.substr(1)) || 0) *
                  (s ? (i < 0 ? l : n).totalDuration() / 100 : 1))
            : i < 0
            ? (r in a || (a[r] = u), a[r])
            : ((o = parseFloat(r.charAt(i - 1) + r.substr(i + 1))),
              s && n && (o = (o / 100) * (ut(n) ? n[0] : n).totalDuration()),
              i > 1 ? t(e, r.substr(0, i - 1), n) + o : u + o))
        : null == r
        ? u
        : +r;
    },
    we = function (t, e, r) {
      var n,
        i,
        o = rt(e[1]),
        s = (o ? 2 : 1) + (t < 2 ? 0 : 1),
        a = e[s];
      if ((o && (a.duration = e[1]), (a.parent = r), t)) {
        for (n = a, i = r; i && !("immediateRender" in n); )
          (n = i.vars.defaults || {}), (i = ot(i.vars.inherit) && i.parent);
        (a.immediateRender = ot(n.immediateRender)),
          t < 2 ? (a.runBackwards = 1) : (a.startAt = e[s - 1]);
      }
      return new br(e[0], a, e[s + 1]);
    },
    be = function (t, e) {
      return t || 0 === t ? e(t) : e;
    },
    xe = function (t, e, r) {
      return r < t ? t : r > e ? e : r;
    },
    Te = function (t, e) {
      return tt(t) && (e = mt.exec(t)) ? e[1] : "";
    },
    Se = [].slice,
    Me = function (t, e) {
      return (
        t &&
        it(t) &&
        "length" in t &&
        ((!e && !t.length) || (t.length - 1 in t && it(t[0]))) &&
        !t.nodeType &&
        t !== _
      );
    },
    Oe = function (t, e, r) {
      return m && !e && m.selector
        ? m.selector(t)
        : !tt(t) || r || (!y && Ze())
        ? ut(t)
          ? (function (t, e, r) {
              return (
                void 0 === r && (r = []),
                t.forEach(function (t) {
                  var n;
                  return (tt(t) && !e) || Me(t, 1)
                    ? (n = r).push.apply(n, Oe(t))
                    : r.push(t);
                }) || r
              );
            })(t, r)
          : Me(t)
          ? Se.call(t, 0)
          : t
          ? [t]
          : []
        : Se.call((e || w).querySelectorAll(t), 0);
    },
    ke = function (t) {
      return (
        (t = Oe(t)[0] || bt("Invalid scope") || {}),
        function (e) {
          var r = t.current || t.nativeElement || t;
          return Oe(
            e,
            r.querySelectorAll
              ? r
              : r === t
              ? bt("Invalid scope") || w.createElement("div")
              : t
          );
        }
      );
    },
    Ee = function (t) {
      return t.sort(function () {
        return 0.5 - Math.random();
      });
    },
    Ae = function (t) {
      if (et(t)) return t;
      var e = it(t) ? t : {each: t},
        r = nr(e.ease),
        n = e.from || 0,
        i = parseFloat(e.base) || 0,
        o = {},
        s = n > 0 && n < 1,
        a = isNaN(n) || s,
        l = e.axis,
        u = n,
        c = n;
      return (
        tt(n)
          ? (u = c = {center: 0.5, edges: 0.5, end: 1}[n] || 0)
          : !s && a && ((u = n[0]), (c = n[1])),
        function (t, s, h) {
          var f,
            p,
            d,
            g,
            m,
            v,
            _,
            y,
            w,
            b = (h || e).length,
            x = o[b];
          if (!x) {
            if (!(w = "auto" === e.grid ? 0 : (e.grid || [1, U])[1])) {
              for (
                _ = -1e8;
                _ < (_ = h[w++].getBoundingClientRect().left) && w < b;

              );
              w--;
            }
            for (
              x = o[b] = [],
                f = a ? Math.min(w, b) * u - 0.5 : n % w,
                p = w === U ? 0 : a ? (b * c) / w - 0.5 : (n / w) | 0,
                _ = 0,
                y = U,
                v = 0;
              v < b;
              v++
            )
              (d = (v % w) - f),
                (g = p - ((v / w) | 0)),
                (x[v] = m = l ? Math.abs("y" === l ? g : d) : Q(d * d + g * g)),
                m > _ && (_ = m),
                m < y && (y = m);
            "random" === n && Ee(x),
              (x.max = _ - y),
              (x.min = y),
              (x.v = b =
                (parseFloat(e.amount) ||
                  parseFloat(e.each) *
                    (w > b
                      ? b - 1
                      : l
                      ? "y" === l
                        ? b / w
                        : w
                      : Math.max(w, b / w)) ||
                  0) * ("edges" === n ? -1 : 1)),
              (x.b = b < 0 ? i - b : i),
              (x.u = Te(e.amount || e.each) || 0),
              (r = r && b < 0 ? er(r) : r);
          }
          return (
            (b = (x[t] - x.min) / x.max || 0),
            qt(x.b + (r ? r(b) : b) * x.v) + x.u
          );
        }
      );
    },
    Pe = function (t) {
      var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
      return function (r) {
        var n = qt(Math.round(parseFloat(r) / t) * t * e);
        return (n - (n % 1)) / e + (rt(r) ? 0 : Te(r));
      };
    },
    Ce = function (t, e) {
      var r,
        n,
        i = ut(t);
      return (
        !i &&
          it(t) &&
          ((r = i = t.radius || U),
          t.values
            ? ((t = Oe(t.values)), (n = !rt(t[0])) && (r *= r))
            : (t = Pe(t.increment))),
        be(
          e,
          i
            ? et(t)
              ? function (e) {
                  return (n = t(e)), Math.abs(n - e) <= r ? n : e;
                }
              : function (e) {
                  for (
                    var i,
                      o,
                      s = parseFloat(n ? e.x : e),
                      a = parseFloat(n ? e.y : 0),
                      l = U,
                      u = 0,
                      c = t.length;
                    c--;

                  )
                    (i = n
                      ? (i = t[c].x - s) * i + (o = t[c].y - a) * o
                      : Math.abs(t[c] - s)) < l && ((l = i), (u = c));
                  return (
                    (u = !r || l <= r ? t[u] : e),
                    n || u === e || rt(e) ? u : u + Te(e)
                  );
                }
            : Pe(t)
        )
      );
    },
    De = function (t, e, r, n) {
      return be(ut(t) ? !e : !0 === r ? ((r = 0), !1) : !n, function () {
        return ut(t)
          ? t[~~(Math.random() * t.length)]
          : (n = (r = r || 1e-5) < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r
                ) *
                  r *
                  n
              ) / n;
      });
    },
    Re = function (t, e, r) {
      return be(r, function (r) {
        return t[~~e(r)];
      });
    },
    ze = function (t) {
      for (var e, r, n, i, o = 0, s = ""; ~(e = t.indexOf("random(", o)); )
        (n = t.indexOf(")", e)),
          (i = "[" === t.charAt(e + 7)),
          (r = t.substr(e + 7, n - e - 7).match(i ? gt : ct)),
          (s +=
            t.substr(o, e - o) +
            De(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5)),
          (o = n + 1);
      return s + t.substr(o, t.length - o);
    },
    Le = function (t, e, r, n, i) {
      var o = e - t,
        s = n - r;
      return be(i, function (e) {
        return r + (((e - t) / o) * s || 0);
      });
    },
    Ye = function (t, e, r) {
      var n,
        i,
        o,
        s = t.labels,
        a = U;
      for (n in s)
        (i = s[n] - e) < 0 == !!r &&
          i &&
          a > (i = Math.abs(i)) &&
          ((o = n), (a = i));
      return o;
    },
    Ne = function (t, e, r) {
      var n,
        i,
        o,
        s = t.vars,
        a = s[e],
        l = m,
        u = t._ctx;
      if (a)
        return (
          (n = s[e + "Params"]),
          (i = s.callbackScope || t),
          r && Et.length && Wt(),
          u && (m = u),
          (o = n ? a.apply(i, n) : a.call(i)),
          (m = l),
          o
        );
    },
    Fe = function (t) {
      return (
        te(t),
        t.scrollTrigger && t.scrollTrigger.kill(!!g),
        t.progress() < 1 && Ne(t, "onInterrupt"),
        t
      );
    },
    Xe = function (t) {
      var e = (t = (!t.name && t.default) || t).name,
        r = et(t),
        n =
          e && !r && t.init
            ? function () {
                this._props = [];
              }
            : t,
        i = {init: Tt, render: Pr, add: dr, kill: Dr, modifier: Cr, rawVars: 0},
        o = {targetTest: 0, get: 0, getSetter: Or, aliases: {}, register: 0};
      if ((Ze(), t !== n)) {
        if (Pt[e]) return;
        Vt(n, Vt(Zt(t, i), o)),
          Kt(n.prototype, Kt(i, Zt(t, o))),
          (Pt[(n.prop = e)] = n),
          t.targetTest && (Rt.push(n), (kt[e] = 1)),
          (e =
            ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) +
            "Plugin");
      }
      xt(e, n), t.register && t.register(Vr, n, Lr);
    },
    qe = 255,
    Be = {
      aqua: [0, qe, qe],
      lime: [0, qe, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, qe],
      navy: [0, 0, 128],
      white: [qe, qe, qe],
      olive: [128, 128, 0],
      yellow: [qe, qe, 0],
      orange: [qe, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [qe, 0, 0],
      pink: [qe, 192, 203],
      cyan: [0, qe, qe],
      transparent: [qe, qe, qe, 0],
    },
    Ie = function (t, e, r) {
      return (
        ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
          ? e + (r - e) * t * 6
          : t < 0.5
          ? r
          : 3 * t < 2
          ? e + (r - e) * (2 / 3 - t) * 6
          : e) *
          qe +
          0.5) |
        0
      );
    },
    We = function (t, e, r) {
      var n,
        i,
        o,
        s,
        a,
        l,
        u,
        c,
        h,
        f,
        p = t ? (rt(t) ? [t >> 16, (t >> 8) & qe, t & qe] : 0) : Be.black;
      if (!p) {
        if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Be[t]))
          p = Be[t];
        else if ("#" === t.charAt(0)) {
          if (
            (t.length < 6 &&
              ((n = t.charAt(1)),
              (i = t.charAt(2)),
              (o = t.charAt(3)),
              (t =
                "#" +
                n +
                n +
                i +
                i +
                o +
                o +
                (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
            9 === t.length)
          )
            return [
              (p = parseInt(t.substr(1, 6), 16)) >> 16,
              (p >> 8) & qe,
              p & qe,
              parseInt(t.substr(7), 16) / 255,
            ];
          p = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & qe, t & qe];
        } else if ("hsl" === t.substr(0, 3))
          if (((p = f = t.match(ct)), e)) {
            if (~t.indexOf("="))
              return (p = t.match(ht)), r && p.length < 4 && (p[3] = 1), p;
          } else
            (s = (+p[0] % 360) / 360),
              (a = +p[1] / 100),
              (n =
                2 * (l = +p[2] / 100) -
                (i = l <= 0.5 ? l * (a + 1) : l + a - l * a)),
              p.length > 3 && (p[3] *= 1),
              (p[0] = Ie(s + 1 / 3, n, i)),
              (p[1] = Ie(s, n, i)),
              (p[2] = Ie(s - 1 / 3, n, i));
        else p = t.match(ct) || Be.transparent;
        p = p.map(Number);
      }
      return (
        e &&
          !f &&
          ((n = p[0] / qe),
          (i = p[1] / qe),
          (o = p[2] / qe),
          (l = ((u = Math.max(n, i, o)) + (c = Math.min(n, i, o))) / 2),
          u === c
            ? (s = a = 0)
            : ((h = u - c),
              (a = l > 0.5 ? h / (2 - u - c) : h / (u + c)),
              (s =
                u === n
                  ? (i - o) / h + (i < o ? 6 : 0)
                  : u === i
                  ? (o - n) / h + 2
                  : (n - i) / h + 4),
              (s *= 60)),
          (p[0] = ~~(s + 0.5)),
          (p[1] = ~~(100 * a + 0.5)),
          (p[2] = ~~(100 * l + 0.5))),
        r && p.length < 4 && (p[3] = 1),
        p
      );
    },
    He = function (t) {
      var e = [],
        r = [],
        n = -1;
      return (
        t.split(Ue).forEach(function (t) {
          var i = t.match(ft) || [];
          e.push.apply(e, i), r.push((n += i.length + 1));
        }),
        (e.c = r),
        e
      );
    },
    je = function (t, e, r) {
      var n,
        i,
        o,
        s,
        a = "",
        l = (t + a).match(Ue),
        u = e ? "hsla(" : "rgba(",
        c = 0;
      if (!l) return t;
      if (
        ((l = l.map(function (t) {
          return (
            (t = We(t, e, 1)) &&
            u +
              (e
                ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                : t.join(",")) +
              ")"
          );
        })),
        r && ((o = He(t)), (n = r.c).join(a) !== o.c.join(a)))
      )
        for (s = (i = t.replace(Ue, "1").split(ft)).length - 1; c < s; c++)
          a +=
            i[c] +
            (~n.indexOf(c)
              ? l.shift() || u + "0,0,0,0)"
              : (o.length ? o : l.length ? l : r).shift());
      if (!i)
        for (s = (i = t.split(Ue)).length - 1; c < s; c++) a += i[c] + l[c];
      return a + i[s];
    },
    Ue = (function () {
      var t,
        e =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (t in Be) e += "|" + t + "\\b";
      return new RegExp(e + ")", "gi");
    })(),
    Ve = /hsl[a]?\(/,
    Ke = function (t) {
      var e,
        r = t.join(" ");
      if (((Ue.lastIndex = 0), Ue.test(r)))
        return (
          (e = Ve.test(r)),
          (t[1] = je(t[1], e)),
          (t[0] = je(t[0], e, He(t[1]))),
          !0
        );
    },
    Ge =
      ((C = Date.now),
      (D = 500),
      (R = 33),
      (z = C()),
      (L = z),
      (N = Y = 1e3 / 240),
      (X = function t(e) {
        var r,
          n,
          i,
          o,
          s = C() - L,
          a = !0 === e;
        if (
          (s > D && (z += s - R),
          ((r = (i = (L += s) - z) - N) > 0 || a) &&
            ((o = ++E.frame),
            (A = i - 1e3 * E.time),
            (E.time = i /= 1e3),
            (N += r + (r >= Y ? 4 : Y - r)),
            (n = 1)),
          a || (M = O(t)),
          n)
        )
          for (P = 0; P < F.length; P++) F[P](i, A, o, e);
      }),
      (E = {
        time: 0,
        frame: 0,
        tick: function () {
          X(!0);
        },
        deltaRatio: function (t) {
          return A / (1e3 / (t || 60));
        },
        wake: function () {
          b &&
            (!y &&
              st() &&
              ((_ = y = window),
              (w = _.document || {}),
              (vt.gsap = Vr),
              (_.gsapVersions || (_.gsapVersions = [])).push(Vr.version),
              yt(_t || _.GreenSockGlobals || (!_.gsap && _) || {}),
              (k = _.requestAnimationFrame)),
            M && E.sleep(),
            (O =
              k ||
              function (t) {
                return setTimeout(t, (N - 1e3 * E.time + 1) | 0);
              }),
            (S = 1),
            X(2));
        },
        sleep: function () {
          (k ? _.cancelAnimationFrame : clearTimeout)(M), (S = 0), (O = Tt);
        },
        lagSmoothing: function (t, e) {
          (D = t || 1 / 0), (R = Math.min(e || 33, D));
        },
        fps: function (t) {
          (Y = 1e3 / (t || 240)), (N = 1e3 * E.time + Y);
        },
        add: function (t, e, r) {
          var n = e
            ? function (e, r, i, o) {
                t(e, r, i, o), E.remove(n);
              }
            : t;
          return E.remove(t), F[r ? "unshift" : "push"](n), Ze(), n;
        },
        remove: function (t, e) {
          ~(e = F.indexOf(t)) && F.splice(e, 1) && P >= e && P--;
        },
        _listeners: (F = []),
      })),
    Ze = function () {
      return !S && Ge.wake();
    },
    Qe = {},
    $e = /^[\d.\-M][\d.\-,\s]/,
    Je = /["']/g,
    tr = function (t) {
      for (
        var e,
          r,
          n,
          i = {},
          o = t.substr(1, t.length - 3).split(":"),
          s = o[0],
          a = 1,
          l = o.length;
        a < l;
        a++
      )
        (r = o[a]),
          (e = a !== l - 1 ? r.lastIndexOf(",") : r.length),
          (n = r.substr(0, e)),
          (i[s] = isNaN(n) ? n.replace(Je, "").trim() : +n),
          (s = r.substr(e + 1).trim());
      return i;
    },
    er = function (t) {
      return function (e) {
        return 1 - t(1 - e);
      };
    },
    rr = function t(e, r) {
      for (var n, i = e._first; i; )
        i instanceof cr
          ? t(i, r)
          : !i.vars.yoyoEase ||
            (i._yoyo && i._repeat) ||
            i._yoyo === r ||
            (i.timeline
              ? t(i.timeline, r)
              : ((n = i._ease),
                (i._ease = i._yEase),
                (i._yEase = n),
                (i._yoyo = r))),
          (i = i._next);
    },
    nr = function (t, e) {
      return (
        (t &&
          (et(t)
            ? t
            : Qe[t] ||
              (function (t) {
                var e,
                  r,
                  n,
                  i,
                  o = (t + "").split("("),
                  s = Qe[o[0]];
                return s && o.length > 1 && s.config
                  ? s.config.apply(
                      null,
                      ~t.indexOf("{")
                        ? [tr(o[1])]
                        : ((e = t),
                          (r = e.indexOf("(") + 1),
                          (n = e.indexOf(")")),
                          (i = e.indexOf("(", r)),
                          e.substring(
                            r,
                            ~i && i < n ? e.indexOf(")", n + 1) : n
                          ))
                            .split(",")
                            .map(jt)
                    )
                  : Qe._CE && $e.test(t)
                  ? Qe._CE("", t)
                  : s;
              })(t))) ||
        e
      );
    },
    ir = function (t, e, r, n) {
      void 0 === r &&
        (r = function (t) {
          return 1 - e(1 - t);
        }),
        void 0 === n &&
          (n = function (t) {
            return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
          });
      var i,
        o = {easeIn: e, easeOut: r, easeInOut: n};
      return (
        Ft(t, function (t) {
          for (var e in ((Qe[t] = vt[t] = o),
          (Qe[(i = t.toLowerCase())] = r),
          o))
            Qe[
              i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
            ] = Qe[t + "." + e] = o[e];
        }),
        o
      );
    },
    or = function (t) {
      return function (e) {
        return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
      };
    },
    sr = function t(e, r, n) {
      var i = r >= 1 ? r : 1,
        o = (n || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
        s = (o / K) * (Math.asin(1 / i) || 0),
        a = function (t) {
          return 1 === t ? 1 : i * Math.pow(2, -10 * t) * J((t - s) * o) + 1;
        },
        l =
          "out" === e
            ? a
            : "in" === e
            ? function (t) {
                return 1 - a(1 - t);
              }
            : or(a);
      return (
        (o = K / o),
        (l.config = function (r, n) {
          return t(e, r, n);
        }),
        l
      );
    },
    ar = function t(e, r) {
      void 0 === r && (r = 1.70158);
      var n = function (t) {
          return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
        },
        i =
          "out" === e
            ? n
            : "in" === e
            ? function (t) {
                return 1 - n(1 - t);
              }
            : or(n);
      return (
        (i.config = function (r) {
          return t(e, r);
        }),
        i
      );
    };
  Ft("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    ir(
      t + ",Power" + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, r);
      },
      function (t) {
        return t < 0.5
          ? Math.pow(2 * t, r) / 2
          : 1 - Math.pow(2 * (1 - t), r) / 2;
      }
    );
  }),
    (Qe.Linear.easeNone = Qe.none = Qe.Linear.easeIn),
    ir("Elastic", sr("in"), sr("out"), sr()),
    (q = 7.5625),
    (I = 1 / (B = 2.75)),
    ir(
      "Bounce",
      function (t) {
        return 1 - W(1 - t);
      },
      (W = function (t) {
        return t < I
          ? q * t * t
          : t < 0.7272727272727273
          ? q * Math.pow(t - 1.5 / B, 2) + 0.75
          : t < 0.9090909090909092
          ? q * (t -= 2.25 / B) * t + 0.9375
          : q * Math.pow(t - 2.625 / B, 2) + 0.984375;
      })
    ),
    ir("Expo", function (t) {
      return t ? Math.pow(2, 10 * (t - 1)) : 0;
    }),
    ir("Circ", function (t) {
      return -(Q(1 - t * t) - 1);
    }),
    ir("Sine", function (t) {
      return 1 === t ? 1 : 1 - $(t * G);
    }),
    ir("Back", ar("in"), ar("out"), ar()),
    (Qe.SteppedEase =
      Qe.steps =
      vt.SteppedEase =
        {
          config: function (t, e) {
            void 0 === t && (t = 1);
            var r = 1 / t,
              n = t + (e ? 0 : 1),
              i = e ? 1 : 0;
            return function (t) {
              return (((n * xe(0, 0.99999999, t)) | 0) + i) * r;
            };
          },
        }),
    (j.ease = Qe["quad.out"]),
    Ft(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (t) {
        return (zt += t + "," + t + "Params,");
      }
    );
  var lr = function (t, e) {
      (this.id = Z++),
        (t._gsap = this),
        (this.target = t),
        (this.harness = e),
        (this.get = e ? e.get : Nt),
        (this.set = e ? e.getSetter : Or);
    },
    ur = (function () {
      function t(t) {
        (this.vars = t),
          (this._delay = +t.delay || 0),
          (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
            ((this._rDelay = t.repeatDelay || 0),
            (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
          (this._ts = 1),
          me(this, +t.duration, 1, 1),
          (this.data = t.data),
          m && ((this._ctx = m), m.data.push(this)),
          S || Ge.wake();
      }
      var e = t.prototype;
      return (
        (e.delay = function (t) {
          return t || 0 === t
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (e.duration = function (t) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
              )
            : this.totalDuration() && this._dur;
        }),
        (e.totalDuration = function (t) {
          return arguments.length
            ? ((this._dirty = 0),
              me(
                this,
                this._repeat < 0
                  ? t
                  : (t - this._repeat * this._rDelay) / (this._repeat + 1)
              ))
            : this._tDur;
        }),
        (e.totalTime = function (t, e) {
          if ((Ze(), !arguments.length)) return this._tTime;
          var r = this._dp;
          if (r && r.smoothChildTiming && this._ts) {
            for (
              ue(this, t), !r._dp || r.parent || ce(r, this);
              r && r.parent;

            )
              r.parent._time !==
                r._start +
                  (r._ts >= 0
                    ? r._tTime / r._ts
                    : (r.totalDuration() - r._tTime) / -r._ts) &&
                r.totalTime(r._tTime, !0),
                (r = r.parent);
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && t < this._tDur) ||
                (this._ts < 0 && t > 0) ||
                (!this._tDur && !t)) &&
              he(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== t ||
              (!this._dur && !e) ||
              (this._initted && Math.abs(this._zTime) === V) ||
              (!t && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = t), Ht(this, t, e)),
            this
          );
        }),
        (e.time = function (t, e) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), t + oe(this)) %
                  (this._dur + this._rDelay) || (t ? this._dur : 0),
                e
              )
            : this._time;
        }),
        (e.totalProgress = function (t, e) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, e)
            : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : this.ratio;
        }),
        (e.progress = function (t, e) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                  oe(this),
                e
              )
            : this.duration()
            ? Math.min(1, this._time / this._dur)
            : this.ratio;
        }),
        (e.iteration = function (t, e) {
          var r = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (t - 1) * r, e)
            : this._repeat
            ? se(this._tTime, r) + 1
            : 1;
        }),
        (e.timeScale = function (t) {
          if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
          if (this._rts === t) return this;
          var e =
            this.parent && this._ts ? ae(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +t || 0),
            (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
            this.totalTime(xe(-this._delay, this._tDur, e), !0),
            le(this),
            re(this)
          );
        }),
        (e.paused = function (t) {
          return arguments.length
            ? (this._ps !== t &&
                ((this._ps = t),
                t
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (Ze(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      1 === this.progress() &&
                        Math.abs(this._zTime) !== V &&
                        (this._tTime -= V)
                    ))),
              this)
            : this._ps;
        }),
        (e.startTime = function (t) {
          if (arguments.length) {
            this._start = t;
            var e = this.parent || this._dp;
            return (
              e && (e._sort || !this.parent) && he(e, this, t - this._delay),
              this
            );
          }
          return this._start;
        }),
        (e.endTime = function (t) {
          return (
            this._start +
            (ot(t) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          );
        }),
        (e.rawTime = function (t) {
          var e = this.parent || this._dp;
          return e
            ? t &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
              ? ae(e.rawTime(t), this)
              : this._tTime
            : this._tTime;
        }),
        (e.revert = function (t) {
          void 0 === t && (t = Ot);
          var e = g;
          return (
            (g = t),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(t),
              this.totalTime(-0.01, t.suppressEvents)),
            "nested" !== this.data && !1 !== t.kill && this.kill(),
            (g = e),
            this
          );
        }),
        (e.globalTime = function (t) {
          for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
            (r = e._start + r / (e._ts || 1)), (e = e._dp);
          return !this.parent && this._sat
            ? this._sat.vars.immediateRender
              ? -1
              : this._sat.globalTime(t)
            : r;
        }),
        (e.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t === 1 / 0 ? -2 : t), ve(this))
            : -2 === this._repeat
            ? 1 / 0
            : this._repeat;
        }),
        (e.repeatDelay = function (t) {
          if (arguments.length) {
            var e = this._time;
            return (this._rDelay = t), ve(this), e ? this.time(e) : this;
          }
          return this._rDelay;
        }),
        (e.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        (e.seek = function (t, e) {
          return this.totalTime(ye(this, t), ot(e));
        }),
        (e.restart = function (t, e) {
          return this.play().totalTime(t ? -this._delay : 0, ot(e));
        }),
        (e.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }),
        (e.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (e.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0);
        }),
        (e.resume = function () {
          return this.paused(!1);
        }),
        (e.reversed = function (t) {
          return arguments.length
            ? (!!t !== this.reversed() &&
                this.timeScale(-this._rts || (t ? -1e-8 : 0)),
              this)
            : this._rts < 0;
        }),
        (e.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
        }),
        (e.isActive = function () {
          var t,
            e = this.parent || this._dp,
            r = this._start;
          return !(
            e &&
            !(
              this._ts &&
              this._initted &&
              e.isActive() &&
              (t = e.rawTime(!0)) >= r &&
              t < this.endTime(!0) - V
            )
          );
        }),
        (e.eventCallback = function (t, e, r) {
          var n = this.vars;
          return arguments.length > 1
            ? (e
                ? ((n[t] = e),
                  r && (n[t + "Params"] = r),
                  "onUpdate" === t && (this._onUpdate = e))
                : delete n[t],
              this)
            : n[t];
        }),
        (e.then = function (t) {
          var e = this;
          return new Promise(function (r) {
            var n = et(t) ? t : Ut,
              i = function () {
                var t = e.then;
                (e.then = null),
                  et(n) && (n = n(e)) && (n.then || n === e) && (e.then = t),
                  r(n),
                  (e.then = t);
              };
            (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
            (!e._tTime && e._ts < 0)
              ? i()
              : (e._prom = i);
          });
        }),
        (e.kill = function () {
          Fe(this);
        }),
        t
      );
    })();
  Vt(ur.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var cr = (function (t) {
    function e(e, r) {
      var n;
      return (
        void 0 === e && (e = {}),
        ((n = t.call(this, e) || this).labels = {}),
        (n.smoothChildTiming = !!e.smoothChildTiming),
        (n.autoRemoveChildren = !!e.autoRemoveChildren),
        (n._sort = ot(e.sortChildren)),
        v && he(e.parent || v, f(n), r),
        e.reversed && n.reverse(),
        e.paused && n.paused(!0),
        e.scrollTrigger && fe(f(n), e.scrollTrigger),
        n
      );
    }
    p(e, t);
    var r = e.prototype;
    return (
      (r.to = function (t, e, r) {
        return we(0, arguments, this), this;
      }),
      (r.from = function (t, e, r) {
        return we(1, arguments, this), this;
      }),
      (r.fromTo = function (t, e, r, n) {
        return we(2, arguments, this), this;
      }),
      (r.set = function (t, e, r) {
        return (
          (e.duration = 0),
          (e.parent = this),
          Qt(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new br(t, e, ye(this, r), 1),
          this
        );
      }),
      (r.call = function (t, e, r) {
        return he(this, br.delayedCall(0, t, e), r);
      }),
      (r.staggerTo = function (t, e, r, n, i, o, s) {
        return (
          (r.duration = e),
          (r.stagger = r.stagger || n),
          (r.onComplete = o),
          (r.onCompleteParams = s),
          (r.parent = this),
          new br(t, r, ye(this, i)),
          this
        );
      }),
      (r.staggerFrom = function (t, e, r, n, i, o, s) {
        return (
          (r.runBackwards = 1),
          (Qt(r).immediateRender = ot(r.immediateRender)),
          this.staggerTo(t, e, r, n, i, o, s)
        );
      }),
      (r.staggerFromTo = function (t, e, r, n, i, o, s, a) {
        return (
          (n.startAt = r),
          (Qt(n).immediateRender = ot(n.immediateRender)),
          this.staggerTo(t, e, n, i, o, s, a)
        );
      }),
      (r.render = function (t, e, r) {
        var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c,
          h,
          f,
          p,
          d,
          m = this._time,
          _ = this._dirty ? this.totalDuration() : this._tDur,
          y = this._dur,
          w = t <= 0 ? 0 : qt(t),
          b = this._zTime < 0 != t < 0 && (this._initted || !y);
        if (
          (this !== v && w > _ && t >= 0 && (w = _),
          w !== this._tTime || r || b)
        ) {
          if (
            (m !== this._time &&
              y &&
              ((w += this._time - m), (t += this._time - m)),
            (n = w),
            (h = this._start),
            (l = !(c = this._ts)),
            b && (y || (m = this._zTime), (t || !e) && (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((p = this._yoyo),
              (a = y + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * a + t, e, r);
            if (
              ((n = qt(w % a)),
              w === _
                ? ((s = this._repeat), (n = y))
                : ((s = ~~(w / a)) && s === w / a && ((n = y), s--),
                  n > y && (n = y)),
              (f = se(this._tTime, a)),
              !m && this._tTime && f !== s && (f = s),
              p && 1 & s && ((n = y - n), (d = 1)),
              s !== f && !this._lock)
            ) {
              var x = p && 1 & f,
                T = x === (p && 1 & s);
              if (
                (s < f && (x = !x),
                (m = x ? 0 : y),
                (this._lock = 1),
                (this.render(m || (d ? 0 : qt(s * a)), e, !y)._lock = 0),
                (this._tTime = w),
                !e && this.parent && Ne(this, "onRepeat"),
                this.vars.repeatRefresh && !d && (this.invalidate()._lock = 1),
                (m && m !== this._time) ||
                  l !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((y = this._dur),
                (_ = this._tDur),
                T &&
                  ((this._lock = 2),
                  (m = x ? y : -1e-4),
                  this.render(m, !0),
                  this.vars.repeatRefresh && !d && this.invalidate()),
                (this._lock = 0),
                !this._ts && !l)
              )
                return this;
              rr(this, d);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((u = (function (t, e, r) {
                var n;
                if (r > e)
                  for (n = t._first; n && n._start <= r; ) {
                    if ("isPause" === n.data && n._start > e) return n;
                    n = n._next;
                  }
                else
                  for (n = t._last; n && n._start >= r; ) {
                    if ("isPause" === n.data && n._start < e) return n;
                    n = n._prev;
                  }
              })(this, qt(m), qt(n))),
              u && (w -= n - (n = u._start))),
            (this._tTime = w),
            (this._time = n),
            (this._act = !c),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (m = 0)),
            !m && n && !e && (Ne(this, "onStart"), this._tTime !== w))
          )
            return this;
          if (n >= m && t >= 0)
            for (i = this._first; i; ) {
              if (
                ((o = i._next), (i._act || n >= i._start) && i._ts && u !== i)
              ) {
                if (i.parent !== this) return this.render(t, e, r);
                if (
                  (i.render(
                    i._ts > 0
                      ? (n - i._start) * i._ts
                      : (i._dirty ? i.totalDuration() : i._tDur) +
                          (n - i._start) * i._ts,
                    e,
                    r
                  ),
                  n !== this._time || (!this._ts && !l))
                ) {
                  (u = 0), o && (w += this._zTime = -1e-8);
                  break;
                }
              }
              i = o;
            }
          else {
            i = this._last;
            for (var S = t < 0 ? t : n; i; ) {
              if (
                ((o = i._prev), (i._act || S <= i._end) && i._ts && u !== i)
              ) {
                if (i.parent !== this) return this.render(t, e, r);
                if (
                  (i.render(
                    i._ts > 0
                      ? (S - i._start) * i._ts
                      : (i._dirty ? i.totalDuration() : i._tDur) +
                          (S - i._start) * i._ts,
                    e,
                    r || (g && (i._initted || i._startAt))
                  ),
                  n !== this._time || (!this._ts && !l))
                ) {
                  (u = 0), o && (w += this._zTime = S ? -1e-8 : V);
                  break;
                }
              }
              i = o;
            }
          }
          if (
            u &&
            !e &&
            (this.pause(),
            (u.render(n >= m ? 0 : -1e-8)._zTime = n >= m ? 1 : -1),
            this._ts)
          )
            return (this._start = h), le(this), this.render(t, e, r);
          this._onUpdate && !e && Ne(this, "onUpdate", !0),
            ((w === _ && this._tTime >= this.totalDuration()) || (!w && m)) &&
              ((h !== this._start && Math.abs(c) === Math.abs(this._ts)) ||
                this._lock ||
                ((t || !y) &&
                  ((w === _ && this._ts > 0) || (!w && this._ts < 0)) &&
                  te(this, 1),
                e ||
                  (t < 0 && !m) ||
                  (!w && !m && _) ||
                  (Ne(
                    this,
                    w === _ && t >= 0 ? "onComplete" : "onReverseComplete",
                    !0
                  ),
                  this._prom &&
                    !(w < _ && this.timeScale() > 0) &&
                    this._prom())));
        }
        return this;
      }),
      (r.add = function (t, e) {
        var r = this;
        if ((rt(e) || (e = ye(this, e, t)), !(t instanceof ur))) {
          if (ut(t))
            return (
              t.forEach(function (t) {
                return r.add(t, e);
              }),
              this
            );
          if (tt(t)) return this.addLabel(t, e);
          if (!et(t)) return this;
          t = br.delayedCall(0, t);
        }
        return this !== t ? he(this, t, e) : this;
      }),
      (r.getChildren = function (t, e, r, n) {
        void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === r && (r = !0),
          void 0 === n && (n = -1e8);
        for (var i = [], o = this._first; o; )
          o._start >= n &&
            (o instanceof br
              ? e && i.push(o)
              : (r && i.push(o),
                t && i.push.apply(i, o.getChildren(!0, e, r)))),
            (o = o._next);
        return i;
      }),
      (r.getById = function (t) {
        for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
          if (e[r].vars.id === t) return e[r];
      }),
      (r.remove = function (t) {
        return tt(t)
          ? this.removeLabel(t)
          : et(t)
          ? this.killTweensOf(t)
          : (Jt(this, t),
            t === this._recent && (this._recent = this._last),
            ee(this));
      }),
      (r.totalTime = function (e, r) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = qt(
                Ge.time -
                  (this._ts > 0
                    ? e / this._ts
                    : (this.totalDuration() - e) / -this._ts)
              )),
            t.prototype.totalTime.call(this, e, r),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (r.addLabel = function (t, e) {
        return (this.labels[t] = ye(this, e)), this;
      }),
      (r.removeLabel = function (t) {
        return delete this.labels[t], this;
      }),
      (r.addPause = function (t, e, r) {
        var n = br.delayedCall(0, e || Tt, r);
        return (
          (n.data = "isPause"), (this._hasPause = 1), he(this, n, ye(this, t))
        );
      }),
      (r.removePause = function (t) {
        var e = this._first;
        for (t = ye(this, t); e; )
          e._start === t && "isPause" === e.data && te(e), (e = e._next);
      }),
      (r.killTweensOf = function (t, e, r) {
        for (var n = this.getTweensOf(t, r), i = n.length; i--; )
          hr !== n[i] && n[i].kill(t, e);
        return this;
      }),
      (r.getTweensOf = function (t, e) {
        for (var r, n = [], i = Oe(t), o = this._first, s = rt(e); o; )
          o instanceof br
            ? It(o._targets, i) &&
              (s
                ? (!hr || (o._initted && o._ts)) &&
                  o.globalTime(0) <= e &&
                  o.globalTime(o.totalDuration()) > e
                : !e || o.isActive()) &&
              n.push(o)
            : (r = o.getTweensOf(i, e)).length && n.push.apply(n, r),
            (o = o._next);
        return n;
      }),
      (r.tweenTo = function (t, e) {
        e = e || {};
        var r,
          n = this,
          i = ye(n, t),
          o = e,
          s = o.startAt,
          a = o.onStart,
          l = o.onStartParams,
          u = o.immediateRender,
          c = br.to(
            n,
            Vt(
              {
                ease: e.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: i,
                overwrite: "auto",
                duration:
                  e.duration ||
                  Math.abs(
                    (i - (s && "time" in s ? s.time : n._time)) / n.timeScale()
                  ) ||
                  V,
                onStart: function () {
                  if ((n.pause(), !r)) {
                    var t =
                      e.duration ||
                      Math.abs(
                        (i - (s && "time" in s ? s.time : n._time)) /
                          n.timeScale()
                      );
                    c._dur !== t && me(c, t, 0, 1).render(c._time, !0, !0),
                      (r = 1);
                  }
                  a && a.apply(c, l || []);
                },
              },
              e
            )
          );
        return u ? c.render(0) : c;
      }),
      (r.tweenFromTo = function (t, e, r) {
        return this.tweenTo(e, Vt({startAt: {time: ye(this, t)}}, r));
      }),
      (r.recent = function () {
        return this._recent;
      }),
      (r.nextLabel = function (t) {
        return void 0 === t && (t = this._time), Ye(this, ye(this, t));
      }),
      (r.previousLabel = function (t) {
        return void 0 === t && (t = this._time), Ye(this, ye(this, t), 1);
      }),
      (r.currentLabel = function (t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + V);
      }),
      (r.shiftChildren = function (t, e, r) {
        void 0 === r && (r = 0);
        for (var n, i = this._first, o = this.labels; i; )
          i._start >= r && ((i._start += t), (i._end += t)), (i = i._next);
        if (e) for (n in o) o[n] >= r && (o[n] += t);
        return ee(this);
      }),
      (r.invalidate = function (e) {
        var r = this._first;
        for (this._lock = 0; r; ) r.invalidate(e), (r = r._next);
        return t.prototype.invalidate.call(this, e);
      }),
      (r.clear = function (t) {
        void 0 === t && (t = !0);
        for (var e, r = this._first; r; )
          (e = r._next), this.remove(r), (r = e);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          ee(this)
        );
      }),
      (r.totalDuration = function (t) {
        var e,
          r,
          n,
          i = 0,
          o = this,
          s = o._last,
          a = U;
        if (arguments.length)
          return o.timeScale(
            (o._repeat < 0 ? o.duration() : o.totalDuration()) /
              (o.reversed() ? -t : t)
          );
        if (o._dirty) {
          for (n = o.parent; s; )
            (e = s._prev),
              s._dirty && s.totalDuration(),
              (r = s._start) > a && o._sort && s._ts && !o._lock
                ? ((o._lock = 1), (he(o, s, r - s._delay, 1)._lock = 0))
                : (a = r),
              r < 0 &&
                s._ts &&
                ((i -= r),
                ((!n && !o._dp) || (n && n.smoothChildTiming)) &&
                  ((o._start += r / o._ts), (o._time -= r), (o._tTime -= r)),
                o.shiftChildren(-r, !1, -1 / 0),
                (a = 0)),
              s._end > i && s._ts && (i = s._end),
              (s = e);
          me(o, o === v && o._time > i ? o._time : i, 1, 1), (o._dirty = 0);
        }
        return o._tDur;
      }),
      (e.updateRoot = function (t) {
        if ((v._ts && (Ht(v, ae(t, v)), (x = Ge.frame)), Ge.frame >= Dt)) {
          Dt += H.autoSleep || 120;
          var e = v._first;
          if ((!e || !e._ts) && H.autoSleep && Ge._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next;
            e || Ge.sleep();
          }
        }
      }),
      e
    );
  })(ur);
  Vt(cr.prototype, {_lock: 0, _hasPause: 0, _forcing: 0});
  var hr,
    fr,
    pr = function (t, e, r, n, i, o, s) {
      var a,
        l,
        u,
        c,
        h,
        f,
        p,
        d,
        g = new Lr(this._pt, t, e, 0, 1, Ar, null, i),
        m = 0,
        v = 0;
      for (
        g.b = r,
          g.e = n,
          r += "",
          (p = ~(n += "").indexOf("random(")) && (n = ze(n)),
          o && (o((d = [r, n]), t, e), (r = d[0]), (n = d[1])),
          l = r.match(pt) || [];
        (a = pt.exec(n));

      )
        (c = a[0]),
          (h = n.substring(m, a.index)),
          u ? (u = (u + 1) % 5) : "rgba(" === h.substr(-5) && (u = 1),
          c !== l[v++] &&
            ((f = parseFloat(l[v - 1]) || 0),
            (g._pt = {
              _next: g._pt,
              p: h || 1 === v ? h : ",",
              s: f,
              c: "=" === c.charAt(1) ? Bt(f, c) - f : parseFloat(c) - f,
              m: u && u < 4 ? Math.round : 0,
            }),
            (m = pt.lastIndex));
      return (
        (g.c = m < n.length ? n.substring(m, n.length) : ""),
        (g.fp = s),
        (dt.test(n) || p) && (g.e = 0),
        (this._pt = g),
        g
      );
    },
    dr = function (t, e, r, n, i, o, s, a, l, u) {
      et(n) && (n = n(i || 0, t, o));
      var c,
        h = t[e],
        f =
          "get" !== r
            ? r
            : et(h)
            ? l
              ? t[
                  e.indexOf("set") || !et(t["get" + e.substr(3)])
                    ? e
                    : "get" + e.substr(3)
                ](l)
              : t[e]()
            : h,
        p = et(h) ? (l ? Sr : Tr) : xr;
      if (
        (tt(n) &&
          (~n.indexOf("random(") && (n = ze(n)),
          "=" === n.charAt(1) &&
            ((c = Bt(f, n) + (Te(f) || 0)) || 0 === c) &&
            (n = c)),
        !u || f !== n || fr)
      )
        return isNaN(f * n) || "" === n
          ? (!h && !(e in t) && wt(e, n),
            pr.call(this, t, e, f, n, p, a || H.stringFilter, l))
          : ((c = new Lr(
              this._pt,
              t,
              e,
              +f || 0,
              n - (f || 0),
              "boolean" == typeof h ? Er : kr,
              0,
              p
            )),
            l && (c.fp = l),
            s && c.modifier(s, this, t),
            (this._pt = c));
    },
    gr = function (t, e, r, n, i, o) {
      var s, a, l, u;
      if (
        Pt[t] &&
        !1 !==
          (s = new Pt[t]()).init(
            i,
            s.rawVars
              ? e[t]
              : (function (t, e, r, n, i) {
                  if (
                    (et(t) && (t = _r(t, i, e, r, n)),
                    !it(t) || (t.style && t.nodeType) || ut(t) || lt(t))
                  )
                    return tt(t) ? _r(t, i, e, r, n) : t;
                  var o,
                    s = {};
                  for (o in t) s[o] = _r(t[o], i, e, r, n);
                  return s;
                })(e[t], n, i, o, r),
            r,
            n,
            o
          ) &&
        ((r._pt = a = new Lr(r._pt, i, t, 0, 1, s.render, s, 0, s.priority)),
        r !== T)
      )
        for (l = r._ptLookup[r._targets.indexOf(i)], u = s._props.length; u--; )
          l[s._props[u]] = a;
      return s;
    },
    mr = function t(e, r, n) {
      var i,
        o,
        s,
        a,
        l,
        u,
        c,
        h,
        f,
        p,
        m,
        _,
        y,
        w = e.vars,
        b = w.ease,
        x = w.startAt,
        T = w.immediateRender,
        S = w.lazy,
        M = w.onUpdate,
        O = w.onUpdateParams,
        k = w.callbackScope,
        E = w.runBackwards,
        A = w.yoyoEase,
        P = w.keyframes,
        C = w.autoRevert,
        D = e._dur,
        R = e._startAt,
        z = e._targets,
        L = e.parent,
        Y = L && "nested" === L.data ? L.vars.targets : z,
        N = "auto" === e._overwrite && !d,
        F = e.timeline;
      if (
        (F && (!P || !b) && (b = "none"),
        (e._ease = nr(b, j.ease)),
        (e._yEase = A ? er(nr(!0 === A ? b : A, j.ease)) : 0),
        A &&
          e._yoyo &&
          !e._repeat &&
          ((A = e._yEase), (e._yEase = e._ease), (e._ease = A)),
        (e._from = !F && !!w.runBackwards),
        !F || (P && !w.stagger))
      ) {
        if (
          ((_ = (h = z[0] ? Yt(z[0]).harness : 0) && w[h.prop]),
          (i = Zt(w, kt)),
          R &&
            (R._zTime < 0 && R.progress(1),
            r < 0 && E && T && !C
              ? R.render(-1, !0)
              : R.revert(E && D ? Mt : St),
            (R._lazy = 0)),
          x)
        ) {
          if (
            (te(
              (e._startAt = br.set(
                z,
                Vt(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: L,
                    immediateRender: !0,
                    lazy: !R && ot(S),
                    startAt: null,
                    delay: 0,
                    onUpdate: M,
                    onUpdateParams: O,
                    callbackScope: k,
                    stagger: 0,
                  },
                  x
                )
              ))
            ),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            r < 0 && (g || (!T && !C)) && e._startAt.revert(Mt),
            T && D && r <= 0 && n <= 0)
          )
            return void (r && (e._zTime = r));
        } else if (E && D && !R)
          if (
            (r && (T = !1),
            (s = Vt(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: T && !R && ot(S),
                immediateRender: T,
                stagger: 0,
                parent: L,
              },
              i
            )),
            _ && (s[h.prop] = _),
            te((e._startAt = br.set(z, s))),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            r < 0 && (g ? e._startAt.revert(Mt) : e._startAt.render(-1, !0)),
            (e._zTime = r),
            T)
          ) {
            if (!r) return;
          } else t(e._startAt, V, V);
        for (
          e._pt = e._ptCache = 0, S = (D && ot(S)) || (S && !D), o = 0;
          o < z.length;
          o++
        ) {
          if (
            ((c = (l = z[o])._gsap || Lt(z)[o]._gsap),
            (e._ptLookup[o] = p = {}),
            At[c.id] && Et.length && Wt(),
            (m = Y === z ? o : Y.indexOf(l)),
            h &&
              !1 !== (f = new h()).init(l, _ || i, e, m, Y) &&
              ((e._pt = a =
                new Lr(e._pt, l, f.name, 0, 1, f.render, f, 0, f.priority)),
              f._props.forEach(function (t) {
                p[t] = a;
              }),
              f.priority && (u = 1)),
            !h || _)
          )
            for (s in i)
              Pt[s] && (f = gr(s, i, e, m, l, Y))
                ? f.priority && (u = 1)
                : (p[s] = a =
                    dr.call(e, l, s, "get", i[s], m, Y, 0, w.stringFilter));
          e._op && e._op[o] && e.kill(l, e._op[o]),
            N &&
              e._pt &&
              ((hr = e),
              v.killTweensOf(l, p, e.globalTime(r)),
              (y = !e.parent),
              (hr = 0)),
            e._pt && S && (At[c.id] = 1);
        }
        u && zr(e), e._onInit && e._onInit(e);
      }
      (e._onUpdate = M),
        (e._initted = (!e._op || e._pt) && !y),
        P && r <= 0 && F.render(U, !0, !0);
    },
    vr = function (t, e, r, n) {
      var i,
        o,
        s = e.ease || n || "power1.inOut";
      if (ut(e))
        (o = r[t] || (r[t] = [])),
          e.forEach(function (t, r) {
            return o.push({t: (r / (e.length - 1)) * 100, v: t, e: s});
          });
      else
        for (i in e)
          (o = r[i] || (r[i] = [])),
            "ease" === i || o.push({t: parseFloat(t), v: e[i], e: s});
    },
    _r = function (t, e, r, n, i) {
      return et(t)
        ? t.call(e, r, n, i)
        : tt(t) && ~t.indexOf("random(")
        ? ze(t)
        : t;
    },
    yr = zt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    wr = {};
  Ft(yr + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
    return (wr[t] = 1);
  });
  var br = (function (t) {
    function e(e, r, n, i) {
      var o;
      "number" == typeof r && ((n.duration = r), (r = n), (n = null));
      var s,
        a,
        l,
        u,
        c,
        h,
        p,
        g,
        m = (o = t.call(this, i ? r : Qt(r)) || this).vars,
        _ = m.duration,
        y = m.delay,
        w = m.immediateRender,
        b = m.stagger,
        x = m.overwrite,
        T = m.keyframes,
        S = m.defaults,
        M = m.scrollTrigger,
        O = m.yoyoEase,
        k = r.parent || v,
        E = (ut(e) || lt(e) ? rt(e[0]) : "length" in r) ? [e] : Oe(e);
      if (
        ((o._targets = E.length
          ? Lt(E)
          : bt(
              "GSAP target " + e + " not found. https://greensock.com",
              !H.nullTargetWarn
            ) || []),
        (o._ptLookup = []),
        (o._overwrite = x),
        T || b || at(_) || at(y))
      ) {
        if (
          ((r = o.vars),
          (s = o.timeline =
            new cr({
              data: "nested",
              defaults: S || {},
              targets: k && "nested" === k.data ? k.vars.targets : E,
            })).kill(),
          (s.parent = s._dp = f(o)),
          (s._start = 0),
          b || at(_) || at(y))
        ) {
          if (((u = E.length), (p = b && Ae(b)), it(b)))
            for (c in b) ~yr.indexOf(c) && (g || (g = {}), (g[c] = b[c]));
          for (a = 0; a < u; a++)
            ((l = Zt(r, wr)).stagger = 0),
              O && (l.yoyoEase = O),
              g && Kt(l, g),
              (h = E[a]),
              (l.duration = +_r(_, f(o), a, h, E)),
              (l.delay = (+_r(y, f(o), a, h, E) || 0) - o._delay),
              !b &&
                1 === u &&
                l.delay &&
                ((o._delay = y = l.delay), (o._start += y), (l.delay = 0)),
              s.to(h, l, p ? p(a, h, E) : 0),
              (s._ease = Qe.none);
          s.duration() ? (_ = y = 0) : (o.timeline = 0);
        } else if (T) {
          Qt(Vt(s.vars.defaults, {ease: "none"})),
            (s._ease = nr(T.ease || r.ease || "none"));
          var A,
            P,
            C,
            D = 0;
          if (ut(T))
            T.forEach(function (t) {
              return s.to(E, t, ">");
            }),
              s.duration();
          else {
            for (c in ((l = {}), T))
              "ease" === c || "easeEach" === c || vr(c, T[c], l, T.easeEach);
            for (c in l)
              for (
                A = l[c].sort(function (t, e) {
                  return t.t - e.t;
                }),
                  D = 0,
                  a = 0;
                a < A.length;
                a++
              )
                ((C = {
                  ease: (P = A[a]).e,
                  duration: ((P.t - (a ? A[a - 1].t : 0)) / 100) * _,
                })[c] = P.v),
                  s.to(E, C, D),
                  (D += C.duration);
            s.duration() < _ && s.to({}, {duration: _ - s.duration()});
          }
        }
        _ || o.duration((_ = s.duration()));
      } else o.timeline = 0;
      return (
        !0 !== x || d || ((hr = f(o)), v.killTweensOf(E), (hr = 0)),
        he(k, f(o), n),
        r.reversed && o.reverse(),
        r.paused && o.paused(!0),
        (w ||
          (!_ &&
            !T &&
            o._start === qt(k._time) &&
            ot(w) &&
            ie(f(o)) &&
            "nested" !== k.data)) &&
          ((o._tTime = -1e-8), o.render(Math.max(0, -y) || 0)),
        M && fe(f(o), M),
        o
      );
    }
    p(e, t);
    var r = e.prototype;
    return (
      (r.render = function (t, e, r) {
        var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c,
          h,
          f = this._time,
          p = this._tDur,
          d = this._dur,
          m = t < 0,
          v = t > p - V && !m ? p : t < V ? 0 : t;
        if (d) {
          if (
            v !== this._tTime ||
            !t ||
            r ||
            (!this._initted && this._tTime) ||
            (this._startAt && this._zTime < 0 !== m)
          ) {
            if (((n = v), (c = this.timeline), this._repeat)) {
              if (((s = d + this._rDelay), this._repeat < -1 && m))
                return this.totalTime(100 * s + t, e, r);
              if (
                ((n = qt(v % s)),
                v === p
                  ? ((o = this._repeat), (n = d))
                  : ((o = ~~(v / s)) && o === v / s && ((n = d), o--),
                    n > d && (n = d)),
                (l = this._yoyo && 1 & o) && ((h = this._yEase), (n = d - n)),
                (a = se(this._tTime, s)),
                n === f && !r && this._initted)
              )
                return (this._tTime = v), this;
              o !== a &&
                (c && this._yEase && rr(c, l),
                !this.vars.repeatRefresh ||
                  l ||
                  this._lock ||
                  ((this._lock = r = 1),
                  (this.render(qt(s * o), !0).invalidate()._lock = 0)));
            }
            if (!this._initted) {
              if (pe(this, m ? t : n, r, e, v)) return (this._tTime = 0), this;
              if (f !== this._time) return this;
              if (d !== this._dur) return this.render(t, e, r);
            }
            if (
              ((this._tTime = v),
              (this._time = n),
              !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
              (this.ratio = u = (h || this._ease)(n / d)),
              this._from && (this.ratio = u = 1 - u),
              n && !f && !e && (Ne(this, "onStart"), this._tTime !== v))
            )
              return this;
            for (i = this._pt; i; ) i.r(u, i.d), (i = i._next);
            (c &&
              c.render(
                t < 0 ? t : !n && l ? -1e-8 : c._dur * c._ease(n / this._dur),
                e,
                r
              )) ||
              (this._startAt && (this._zTime = t)),
              this._onUpdate &&
                !e &&
                (m && ne(this, t, 0, r), Ne(this, "onUpdate")),
              this._repeat &&
                o !== a &&
                this.vars.onRepeat &&
                !e &&
                this.parent &&
                Ne(this, "onRepeat"),
              (v !== this._tDur && v) ||
                this._tTime !== v ||
                (m && !this._onUpdate && ne(this, t, 0, !0),
                (t || !d) &&
                  ((v === this._tDur && this._ts > 0) ||
                    (!v && this._ts < 0)) &&
                  te(this, 1),
                e ||
                  (m && !f) ||
                  !(v || f || l) ||
                  (Ne(this, v === p ? "onComplete" : "onReverseComplete", !0),
                  this._prom &&
                    !(v < p && this.timeScale() > 0) &&
                    this._prom()));
          }
        } else
          !(function (t, e, r, n) {
            var i,
              o,
              s,
              a = t.ratio,
              l =
                e < 0 ||
                (!e &&
                  ((!t._start && de(t) && (t._initted || !ge(t))) ||
                    ((t._ts < 0 || t._dp._ts < 0) && !ge(t))))
                  ? 0
                  : 1,
              u = t._rDelay,
              c = 0;
            if (
              (u &&
                t._repeat &&
                ((c = xe(0, t._tDur, e)),
                (o = se(c, u)),
                t._yoyo && 1 & o && (l = 1 - l),
                o !== se(t._tTime, u) &&
                  ((a = 1 - l),
                  t.vars.repeatRefresh && t._initted && t.invalidate())),
              l !== a || g || n || t._zTime === V || (!e && t._zTime))
            ) {
              if (!t._initted && pe(t, e, n, r, c)) return;
              for (
                s = t._zTime,
                  t._zTime = e || (r ? V : 0),
                  r || (r = e && !s),
                  t.ratio = l,
                  t._from && (l = 1 - l),
                  t._time = 0,
                  t._tTime = c,
                  i = t._pt;
                i;

              )
                i.r(l, i.d), (i = i._next);
              e < 0 && ne(t, e, 0, !0),
                t._onUpdate && !r && Ne(t, "onUpdate"),
                c && t._repeat && !r && t.parent && Ne(t, "onRepeat"),
                (e >= t._tDur || e < 0) &&
                  t.ratio === l &&
                  (l && te(t, 1),
                  r ||
                    g ||
                    (Ne(t, l ? "onComplete" : "onReverseComplete", !0),
                    t._prom && t._prom()));
            } else t._zTime || (t._zTime = e);
          })(this, t, e, r);
        return this;
      }),
      (r.targets = function () {
        return this._targets;
      }),
      (r.invalidate = function (e) {
        return (
          (!e || !this.vars.runBackwards) && (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(e),
          t.prototype.invalidate.call(this, e)
        );
      }),
      (r.resetTo = function (t, e, r, n) {
        S || Ge.wake(), this._ts || this.play();
        var i = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return (
          this._initted || mr(this, i),
          (function (t, e, r, n, i, o, s) {
            var a,
              l,
              u,
              c,
              h = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
            if (!h)
              for (
                h = t._ptCache[e] = [], u = t._ptLookup, c = t._targets.length;
                c--;

              ) {
                if ((a = u[c][e]) && a.d && a.d._pt)
                  for (a = a.d._pt; a && a.p !== e && a.fp !== e; ) a = a._next;
                if (!a)
                  return (fr = 1), (t.vars[e] = "+=0"), mr(t, s), (fr = 0), 1;
                h.push(a);
              }
            for (c = h.length; c--; )
              ((a = (l = h[c])._pt || l).s =
                (!n && 0 !== n) || i ? a.s + (n || 0) + o * a.c : n),
                (a.c = r - a.s),
                l.e && (l.e = Xt(r) + Te(l.e)),
                l.b && (l.b = a.s + Te(l.b));
          })(this, t, e, r, n, this._ease(i / this._dur), i)
            ? this.resetTo(t, e, r, n)
            : (ue(this, 0),
              this.parent ||
                $t(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0
                ),
              this.render(0))
        );
      }),
      (r.kill = function (t, e) {
        if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
          return (this._lazy = this._pt = 0), this.parent ? Fe(this) : this;
        if (this.timeline) {
          var r = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(t, e, hr && !0 !== hr.vars.overwrite)
              ._first || Fe(this),
            this.parent &&
              r !== this.timeline.totalDuration() &&
              me(this, (this._dur * this.timeline._tDur) / r, 0, 1),
            this
          );
        }
        var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c = this._targets,
          h = t ? Oe(t) : c,
          f = this._ptLookup,
          p = this._pt;
        if (
          (!e || "all" === e) &&
          (function (t, e) {
            for (
              var r = t.length, n = r === e.length;
              n && r-- && t[r] === e[r];

            );
            return r < 0;
          })(c, h)
        )
          return "all" === e && (this._pt = 0), Fe(this);
        for (
          n = this._op = this._op || [],
            "all" !== e &&
              (tt(e) &&
                ((a = {}),
                Ft(e, function (t) {
                  return (a[t] = 1);
                }),
                (e = a)),
              (e = (function (t, e) {
                var r,
                  n,
                  i,
                  o,
                  s = t[0] ? Yt(t[0]).harness : 0,
                  a = s && s.aliases;
                if (!a) return e;
                for (n in ((r = Kt({}, e)), a))
                  if ((n in r))
                    for (i = (o = a[n].split(",")).length; i--; )
                      r[o[i]] = r[n];
                return r;
              })(c, e))),
            u = c.length;
          u--;

        )
          if (~h.indexOf(c[u]))
            for (a in ((i = f[u]),
            "all" === e
              ? ((n[u] = e), (s = i), (o = {}))
              : ((o = n[u] = n[u] || {}), (s = e)),
            s))
              (l = i && i[a]) &&
                (("kill" in l.d && !0 !== l.d.kill(a)) || Jt(this, l, "_pt"),
                delete i[a]),
                "all" !== o && (o[a] = 1);
        return this._initted && !this._pt && p && Fe(this), this;
      }),
      (e.to = function (t, r) {
        return new e(t, r, arguments[2]);
      }),
      (e.from = function (t, e) {
        return we(1, arguments);
      }),
      (e.delayedCall = function (t, r, n, i) {
        return new e(r, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: t,
          onComplete: r,
          onReverseComplete: r,
          onCompleteParams: n,
          onReverseCompleteParams: n,
          callbackScope: i,
        });
      }),
      (e.fromTo = function (t, e, r) {
        return we(2, arguments);
      }),
      (e.set = function (t, r) {
        return (r.duration = 0), r.repeatDelay || (r.repeat = 0), new e(t, r);
      }),
      (e.killTweensOf = function (t, e, r) {
        return v.killTweensOf(t, e, r);
      }),
      e
    );
  })(ur);
  Vt(br.prototype, {_targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0}),
    Ft("staggerTo,staggerFrom,staggerFromTo", function (t) {
      br[t] = function () {
        var e = new cr(),
          r = Se.call(arguments, 0);
        return r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r);
      };
    });
  var xr = function (t, e, r) {
      return (t[e] = r);
    },
    Tr = function (t, e, r) {
      return t[e](r);
    },
    Sr = function (t, e, r, n) {
      return t[e](n.fp, r);
    },
    Mr = function (t, e, r) {
      return t.setAttribute(e, r);
    },
    Or = function (t, e) {
      return et(t[e]) ? Tr : nt(t[e]) && t.setAttribute ? Mr : xr;
    },
    kr = function (t, e) {
      return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
    },
    Er = function (t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    Ar = function (t, e) {
      var r = e._pt,
        n = "";
      if (!t && e.b) n = e.b;
      else if (1 === t && e.e) n = e.e;
      else {
        for (; r; )
          (n =
            r.p +
            (r.m
              ? r.m(r.s + r.c * t)
              : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
            n),
            (r = r._next);
        n += e.c;
      }
      e.set(e.t, e.p, n, e);
    },
    Pr = function (t, e) {
      for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
    },
    Cr = function (t, e, r, n) {
      for (var i, o = this._pt; o; )
        (i = o._next), o.p === n && o.modifier(t, e, r), (o = i);
    },
    Dr = function (t) {
      for (var e, r, n = this._pt; n; )
        (r = n._next),
          (n.p === t && !n.op) || n.op === t
            ? Jt(this, n, "_pt")
            : n.dep || (e = 1),
          (n = r);
      return !e;
    },
    Rr = function (t, e, r, n) {
      n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
    },
    zr = function (t) {
      for (var e, r, n, i, o = t._pt; o; ) {
        for (e = o._next, r = n; r && r.pr > o.pr; ) r = r._next;
        (o._prev = r ? r._prev : i) ? (o._prev._next = o) : (n = o),
          (o._next = r) ? (r._prev = o) : (i = o),
          (o = e);
      }
      t._pt = n;
    },
    Lr = (function () {
      function t(t, e, r, n, i, o, s, a, l) {
        (this.t = e),
          (this.s = n),
          (this.c = i),
          (this.p = r),
          (this.r = o || kr),
          (this.d = s || this),
          (this.set = a || xr),
          (this.pr = l || 0),
          (this._next = t),
          t && (t._prev = this);
      }
      return (
        (t.prototype.modifier = function (t, e, r) {
          (this.mSet = this.mSet || this.set),
            (this.set = Rr),
            (this.m = t),
            (this.mt = r),
            (this.tween = e);
        }),
        t
      );
    })();
  Ft(
    zt +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (t) {
      return (kt[t] = 1);
    }
  ),
    (vt.TweenMax = vt.TweenLite = br),
    (vt.TimelineLite = vt.TimelineMax = cr),
    (v = new cr({
      sortChildren: !1,
      defaults: j,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (H.stringFilter = Ke);
  var Yr = [],
    Nr = {},
    Fr = [],
    Xr = 0,
    qr = function (t) {
      return (Nr[t] || Fr).map(function (t) {
        return t();
      });
    },
    Br = function () {
      var t = Date.now(),
        e = [];
      t - Xr > 2 &&
        (qr("matchMediaInit"),
        Yr.forEach(function (t) {
          var r,
            n,
            i,
            o,
            s = t.queries,
            a = t.conditions;
          for (n in s)
            (r = _.matchMedia(s[n]).matches) && (i = 1),
              r !== a[n] && ((a[n] = r), (o = 1));
          o && (t.revert(), i && e.push(t));
        }),
        qr("matchMediaRevert"),
        e.forEach(function (t) {
          return t.onMatch(t);
        }),
        (Xr = t),
        qr("matchMedia"));
    },
    Ir = (function () {
      function t(t, e) {
        (this.selector = e && ke(e)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          t && this.add(t);
      }
      var e = t.prototype;
      return (
        (e.add = function (t, e, r) {
          et(t) && ((r = e), (e = t), (t = et));
          var n = this,
            i = function () {
              var t,
                i = m,
                o = n.selector;
              return (
                i && i !== n && i.data.push(n),
                r && (n.selector = ke(r)),
                (m = n),
                (t = e.apply(n, arguments)),
                et(t) && n._r.push(t),
                (m = i),
                (n.selector = o),
                (n.isReverted = !1),
                t
              );
            };
          return (n.last = i), t === et ? i(n) : t ? (n[t] = i) : i;
        }),
        (e.ignore = function (t) {
          var e = m;
          (m = null), t(this), (m = e);
        }),
        (e.getTweens = function () {
          var e = [];
          return (
            this.data.forEach(function (r) {
              return r instanceof t
                ? e.push.apply(e, r.getTweens())
                : r instanceof br &&
                    !(r.parent && "nested" === r.parent.data) &&
                    e.push(r);
            }),
            e
          );
        }),
        (e.clear = function () {
          this._r.length = this.data.length = 0;
        }),
        (e.kill = function (t, e) {
          var r = this;
          if (t) {
            var n = this.getTweens();
            this.data.forEach(function (t) {
              "isFlip" === t.data &&
                (t.revert(),
                t.getChildren(!0, !0, !1).forEach(function (t) {
                  return n.splice(n.indexOf(t), 1);
                }));
            }),
              n
                .map(function (t) {
                  return {g: t.globalTime(0), t: t};
                })
                .sort(function (t, e) {
                  return e.g - t.g || -1;
                })
                .forEach(function (e) {
                  return e.t.revert(t);
                }),
              this.data.forEach(function (e) {
                return !(e instanceof ur) && e.revert && e.revert(t);
              }),
              this._r.forEach(function (e) {
                return e(t, r);
              }),
              (this.isReverted = !0);
          } else
            this.data.forEach(function (t) {
              return t.kill && t.kill();
            });
          if ((this.clear(), e)) {
            var i = Yr.indexOf(this);
            ~i && Yr.splice(i, 1);
          }
        }),
        (e.revert = function (t) {
          this.kill(t || {});
        }),
        t
      );
    })(),
    Wr = (function () {
      function t(t) {
        (this.contexts = []), (this.scope = t);
      }
      var e = t.prototype;
      return (
        (e.add = function (t, e, r) {
          it(t) || (t = {matches: t});
          var n,
            i,
            o,
            s = new Ir(0, r || this.scope),
            a = (s.conditions = {});
          for (i in (this.contexts.push(s),
          (e = s.add("onMatch", e)),
          (s.queries = t),
          t))
            "all" === i
              ? (o = 1)
              : (n = _.matchMedia(t[i])) &&
                (Yr.indexOf(s) < 0 && Yr.push(s),
                (a[i] = n.matches) && (o = 1),
                n.addListener
                  ? n.addListener(Br)
                  : n.addEventListener("change", Br));
          return o && e(s), this;
        }),
        (e.revert = function (t) {
          this.kill(t || {});
        }),
        (e.kill = function (t) {
          this.contexts.forEach(function (e) {
            return e.kill(t, !0);
          });
        }),
        t
      );
    })(),
    Hr = {
      registerPlugin: function () {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        e.forEach(function (t) {
          return Xe(t);
        });
      },
      timeline: function (t) {
        return new cr(t);
      },
      getTweensOf: function (t, e) {
        return v.getTweensOf(t, e);
      },
      getProperty: function (t, e, r, n) {
        tt(t) && (t = Oe(t)[0]);
        var i = Yt(t || {}).get,
          o = r ? Ut : jt;
        return (
          "native" === r && (r = ""),
          t
            ? e
              ? o(((Pt[e] && Pt[e].get) || i)(t, e, r, n))
              : function (e, r, n) {
                  return o(((Pt[e] && Pt[e].get) || i)(t, e, r, n));
                }
            : t
        );
      },
      quickSetter: function (t, e, r) {
        if ((t = Oe(t)).length > 1) {
          var n = t.map(function (t) {
              return Vr.quickSetter(t, e, r);
            }),
            i = n.length;
          return function (t) {
            for (var e = i; e--; ) n[e](t);
          };
        }
        t = t[0] || {};
        var o = Pt[e],
          s = Yt(t),
          a = (s.harness && (s.harness.aliases || {})[e]) || e,
          l = o
            ? function (e) {
                var n = new o();
                (T._pt = 0),
                  n.init(t, r ? e + r : e, T, 0, [t]),
                  n.render(1, n),
                  T._pt && Pr(1, T);
              }
            : s.set(t, a);
        return o
          ? l
          : function (e) {
              return l(t, a, r ? e + r : e, s, 1);
            };
      },
      quickTo: function (t, e, r) {
        var n,
          i = Vr.to(
            t,
            Kt((((n = {})[e] = "+=0.1"), (n.paused = !0), n), r || {})
          ),
          o = function (t, r, n) {
            return i.resetTo(e, t, r, n);
          };
        return (o.tween = i), o;
      },
      isTweening: function (t) {
        return v.getTweensOf(t, !0).length > 0;
      },
      defaults: function (t) {
        return t && t.ease && (t.ease = nr(t.ease, j.ease)), Gt(j, t || {});
      },
      config: function (t) {
        return Gt(H, t || {});
      },
      registerEffect: function (t) {
        var e = t.name,
          r = t.effect,
          n = t.plugins,
          i = t.defaults,
          o = t.extendTimeline;
        (n || "").split(",").forEach(function (t) {
          return (
            t &&
            !Pt[t] &&
            !vt[t] &&
            bt(e + " effect requires " + t + " plugin.")
          );
        }),
          (Ct[e] = function (t, e, n) {
            return r(Oe(t), Vt(e || {}, i), n);
          }),
          o &&
            (cr.prototype[e] = function (t, r, n) {
              return this.add(Ct[e](t, it(r) ? r : (n = r) && {}, this), n);
            });
      },
      registerEase: function (t, e) {
        Qe[t] = nr(e);
      },
      parseEase: function (t, e) {
        return arguments.length ? nr(t, e) : Qe;
      },
      getById: function (t) {
        return v.getById(t);
      },
      exportRoot: function (t, e) {
        void 0 === t && (t = {});
        var r,
          n,
          i = new cr(t);
        for (
          i.smoothChildTiming = ot(t.smoothChildTiming),
            v.remove(i),
            i._dp = 0,
            i._time = i._tTime = v._time,
            r = v._first;
          r;

        )
          (n = r._next),
            (!e &&
              !r._dur &&
              r instanceof br &&
              r.vars.onComplete === r._targets[0]) ||
              he(i, r, r._start - r._delay),
            (r = n);
        return he(v, i, 0), i;
      },
      context: function (t, e) {
        return t ? new Ir(t, e) : m;
      },
      matchMedia: function (t) {
        return new Wr(t);
      },
      matchMediaRefresh: function () {
        return (
          Yr.forEach(function (t) {
            var e,
              r,
              n = t.conditions;
            for (r in n) n[r] && ((n[r] = !1), (e = 1));
            e && t.revert();
          }) || Br()
        );
      },
      addEventListener: function (t, e) {
        var r = Nr[t] || (Nr[t] = []);
        ~r.indexOf(e) || r.push(e);
      },
      removeEventListener: function (t, e) {
        var r = Nr[t],
          n = r && r.indexOf(e);
        n >= 0 && r.splice(n, 1);
      },
      utils: {
        wrap: function t(e, r, n) {
          var i = r - e;
          return ut(e)
            ? Re(e, t(0, e.length), r)
            : be(n, function (t) {
                return ((i + ((t - e) % i)) % i) + e;
              });
        },
        wrapYoyo: function t(e, r, n) {
          var i = r - e,
            o = 2 * i;
          return ut(e)
            ? Re(e, t(0, e.length - 1), r)
            : be(n, function (t) {
                return e + ((t = (o + ((t - e) % o)) % o || 0) > i ? o - t : t);
              });
        },
        distribute: Ae,
        random: De,
        snap: Ce,
        normalize: function (t, e, r) {
          return Le(t, e, 0, 1, r);
        },
        getUnit: Te,
        clamp: function (t, e, r) {
          return be(r, function (r) {
            return xe(t, e, r);
          });
        },
        splitColor: We,
        toArray: Oe,
        selector: ke,
        mapRange: Le,
        pipe: function () {
          for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
          return function (t) {
            return e.reduce(function (t, e) {
              return e(t);
            }, t);
          };
        },
        unitize: function (t, e) {
          return function (r) {
            return t(parseFloat(r)) + (e || Te(r));
          };
        },
        interpolate: function t(e, r, n, i) {
          var o = isNaN(e + r)
            ? 0
            : function (t) {
                return (1 - t) * e + t * r;
              };
          if (!o) {
            var s,
              a,
              l,
              u,
              c,
              h = tt(e),
              f = {};
            if ((!0 === n && (i = 1) && (n = null), h))
              (e = {p: e}), (r = {p: r});
            else if (ut(e) && !ut(r)) {
              for (l = [], u = e.length, c = u - 2, a = 1; a < u; a++)
                l.push(t(e[a - 1], e[a]));
              u--,
                (o = function (t) {
                  t *= u;
                  var e = Math.min(c, ~~t);
                  return l[e](t - e);
                }),
                (n = r);
            } else i || (e = Kt(ut(e) ? [] : {}, e));
            if (!l) {
              for (s in r) dr.call(f, e, s, "get", r[s]);
              o = function (t) {
                return Pr(t, f) || (h ? e.p : e);
              };
            }
          }
          return be(n, o);
        },
        shuffle: Ee,
      },
      install: yt,
      effects: Ct,
      ticker: Ge,
      updateRoot: cr.updateRoot,
      plugins: Pt,
      globalTimeline: v,
      core: {
        PropTween: Lr,
        globals: xt,
        Tween: br,
        Timeline: cr,
        Animation: ur,
        getCache: Yt,
        _removeLinkedListItem: Jt,
        reverting: function () {
          return g;
        },
        context: function (t) {
          return t && m && (m.data.push(t), (t._ctx = m)), m;
        },
        suppressOverwrites: function (t) {
          return (d = t);
        },
      },
    };
  Ft("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (Hr[t] = br[t]);
  }),
    Ge.add(cr.updateRoot),
    (T = Hr.to({}, {duration: 0}));
  var jr = function (t, e) {
      for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
        r = r._next;
      return r;
    },
    Ur = function (t, e) {
      return {
        name: t,
        rawVars: 1,
        init: function (t, r, n) {
          n._onInit = function (t) {
            var n, i;
            if (
              (tt(r) &&
                ((n = {}),
                Ft(r, function (t) {
                  return (n[t] = 1);
                }),
                (r = n)),
              e)
            ) {
              for (i in ((n = {}), r)) n[i] = e(r[i]);
              r = n;
            }
            !(function (t, e) {
              var r,
                n,
                i,
                o = t._targets;
              for (r in e)
                for (n = o.length; n--; )
                  (i = t._ptLookup[n][r]) &&
                    (i = i.d) &&
                    (i._pt && (i = jr(i, r)),
                    i && i.modifier && i.modifier(e[r], t, o[n], r));
            })(t, r);
          };
        },
      };
    },
    Vr =
      Hr.registerPlugin(
        {
          name: "attr",
          init: function (t, e, r, n, i) {
            var o, s, a;
            for (o in ((this.tween = r), e))
              (a = t.getAttribute(o) || ""),
                ((s = this.add(
                  t,
                  "setAttribute",
                  (a || 0) + "",
                  e[o],
                  n,
                  i,
                  0,
                  0,
                  o
                )).op = o),
                (s.b = a),
                this._props.push(o);
          },
          render: function (t, e) {
            for (var r = e._pt; r; )
              g ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next);
          },
        },
        {
          name: "endArray",
          init: function (t, e) {
            for (var r = e.length; r--; )
              this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
          },
        },
        Ur("roundProps", Pe),
        Ur("modifiers"),
        Ur("snap", Ce)
      ) || Hr;
  (br.version = cr.version = Vr.version = "3.11.4"), (b = 1), st() && Ze();
  Qe.Power0,
    Qe.Power1,
    Qe.Power2,
    Qe.Power3,
    Qe.Power4,
    Qe.Linear,
    Qe.Quad,
    Qe.Cubic,
    Qe.Quart,
    Qe.Quint,
    Qe.Strong,
    Qe.Elastic,
    Qe.Back,
    Qe.SteppedEase,
    Qe.Bounce,
    Qe.Sine,
    Qe.Expo,
    Qe.Circ;
  /*!
   * CSSPlugin 3.11.4
   * https://greensock.com
   *
   * Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */
  var Kr,
    Gr,
    Zr,
    Qr,
    $r,
    Jr,
    tn,
    en,
    rn = {},
    nn = 180 / Math.PI,
    on = Math.PI / 180,
    sn = Math.atan2,
    an = /([A-Z])/g,
    ln = /(left|right|width|margin|padding|x)/i,
    un = /[\s,\(]\S/,
    cn = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    hn = function (t, e) {
      return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
    },
    fn = function (t, e) {
      return e.set(
        e.t,
        e.p,
        1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
        e
      );
    },
    pn = function (t, e) {
      return e.set(
        e.t,
        e.p,
        t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
        e
      );
    },
    dn = function (t, e) {
      var r = e.s + e.c * t;
      e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
    },
    gn = function (t, e) {
      return e.set(e.t, e.p, t ? e.e : e.b, e);
    },
    mn = function (t, e) {
      return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
    },
    vn = function (t, e, r) {
      return (t.style[e] = r);
    },
    _n = function (t, e, r) {
      return t.style.setProperty(e, r);
    },
    yn = function (t, e, r) {
      return (t._gsap[e] = r);
    },
    wn = function (t, e, r) {
      return (t._gsap.scaleX = t._gsap.scaleY = r);
    },
    bn = function (t, e, r, n, i) {
      var o = t._gsap;
      (o.scaleX = o.scaleY = r), o.renderTransform(i, o);
    },
    xn = function (t, e, r, n, i) {
      var o = t._gsap;
      (o[e] = r), o.renderTransform(i, o);
    },
    Tn = "transform",
    Sn = Tn + "Origin",
    Mn = function (t, e) {
      var r = this,
        n = this.target,
        i = n.style;
      if (t in rn) {
        if (
          ((this.tfm = this.tfm || {}),
          "transform" !== t &&
            (~(t = cn[t] || t).indexOf(",")
              ? t.split(",").forEach(function (t) {
                  return (r.tfm[t] = Wn(n, t));
                })
              : (this.tfm[t] = n._gsap.x ? n._gsap[t] : Wn(n, t))),
          this.props.indexOf(Tn) >= 0)
        )
          return;
        n._gsap.svg &&
          ((this.svgo = n.getAttribute("data-svg-origin")),
          this.props.push(Sn, e, "")),
          (t = Tn);
      }
      (i || e) && this.props.push(t, e, i[t]);
    },
    On = function (t) {
      t.translate &&
        (t.removeProperty("translate"),
        t.removeProperty("scale"),
        t.removeProperty("rotate"));
    },
    kn = function () {
      var t,
        e,
        r = this.props,
        n = this.target,
        i = n.style,
        o = n._gsap;
      for (t = 0; t < r.length; t += 3)
        r[t + 1]
          ? (n[r[t]] = r[t + 2])
          : r[t + 2]
          ? (i[r[t]] = r[t + 2])
          : i.removeProperty(r[t].replace(an, "-$1").toLowerCase());
      if (this.tfm) {
        for (e in this.tfm) o[e] = this.tfm[e];
        o.svg &&
          (o.renderTransform(),
          n.setAttribute("data-svg-origin", this.svgo || "")),
          !(t = tn()) || t.isStart || i[Tn] || (On(i), (o.uncache = 1));
      }
    },
    En = function (t, e) {
      var r = {target: t, props: [], revert: kn, save: Mn};
      return (
        e &&
          e.split(",").forEach(function (t) {
            return r.save(t);
          }),
        r
      );
    },
    An = function (t, e) {
      var r = Gr.createElementNS
        ? Gr.createElementNS(
            (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
            t
          )
        : Gr.createElement(t);
      return r.style ? r : Gr.createElement(t);
    },
    Pn = function t(e, r, n) {
      var i = getComputedStyle(e);
      return (
        i[r] ||
        i.getPropertyValue(r.replace(an, "-$1").toLowerCase()) ||
        i.getPropertyValue(r) ||
        (!n && t(e, Dn(r) || r, 1)) ||
        ""
      );
    },
    Cn = "O,Moz,ms,Ms,Webkit".split(","),
    Dn = function (t, e, r) {
      var n = (e || $r).style,
        i = 5;
      if (t in n && !r) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        i-- && !(Cn[i] + t in n);

      );
      return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? Cn[i] : "") + t;
    },
    Rn = function () {
      "undefined" != typeof window &&
        window.document &&
        ((Kr = window),
        (Gr = Kr.document),
        (Zr = Gr.documentElement),
        ($r = An("div") || {style: {}}),
        An("div"),
        (Tn = Dn(Tn)),
        (Sn = Tn + "Origin"),
        ($r.style.cssText =
          "border-width:0;line-height:0;position:absolute;padding:0"),
        (en = !!Dn("perspective")),
        (tn = Vr.core.reverting),
        (Qr = 1));
    },
    zn = function t(e) {
      var r,
        n = An(
          "svg",
          (this.ownerSVGElement &&
            this.ownerSVGElement.getAttribute("xmlns")) ||
            "http://www.w3.org/2000/svg"
        ),
        i = this.parentNode,
        o = this.nextSibling,
        s = this.style.cssText;
      if (
        (Zr.appendChild(n),
        n.appendChild(this),
        (this.style.display = "block"),
        e)
      )
        try {
          (r = this.getBBox()),
            (this._gsapBBox = this.getBBox),
            (this.getBBox = t);
        } catch (t) {}
      else this._gsapBBox && (r = this._gsapBBox());
      return (
        i && (o ? i.insertBefore(this, o) : i.appendChild(this)),
        Zr.removeChild(n),
        (this.style.cssText = s),
        r
      );
    },
    Ln = function (t, e) {
      for (var r = e.length; r--; )
        if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
    },
    Yn = function (t) {
      var e;
      try {
        e = t.getBBox();
      } catch (r) {
        e = zn.call(t, !0);
      }
      return (
        (e && (e.width || e.height)) ||
          t.getBBox === zn ||
          (e = zn.call(t, !0)),
        !e || e.width || e.x || e.y
          ? e
          : {
              x: +Ln(t, ["x", "cx", "x1"]) || 0,
              y: +Ln(t, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
      );
    },
    Nn = function (t) {
      return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !Yn(t));
    },
    Fn = function (t, e) {
      if (e) {
        var r = t.style;
        e in rn && e !== Sn && (e = Tn),
          r.removeProperty
            ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                (e = "-" + e),
              r.removeProperty(e.replace(an, "-$1").toLowerCase()))
            : r.removeAttribute(e);
      }
    },
    Xn = function (t, e, r, n, i, o) {
      var s = new Lr(t._pt, e, r, 0, 1, o ? mn : gn);
      return (t._pt = s), (s.b = n), (s.e = i), t._props.push(r), s;
    },
    qn = {deg: 1, rad: 1, turn: 1},
    Bn = {grid: 1, flex: 1},
    In = function t(e, r, n, i) {
      var o,
        s,
        a,
        l,
        u = parseFloat(n) || 0,
        c = (n + "").trim().substr((u + "").length) || "px",
        h = $r.style,
        f = ln.test(r),
        p = "svg" === e.tagName.toLowerCase(),
        d = (p ? "client" : "offset") + (f ? "Width" : "Height"),
        g = 100,
        m = "px" === i,
        v = "%" === i;
      return i === c || !u || qn[i] || qn[c]
        ? u
        : ("px" !== c && !m && (u = t(e, r, n, "px")),
          (l = e.getCTM && Nn(e)),
          (!v && "%" !== c) || (!rn[r] && !~r.indexOf("adius"))
            ? ((h[f ? "width" : "height"] = g + (m ? c : i)),
              (s =
                ~r.indexOf("adius") || ("em" === i && e.appendChild && !p)
                  ? e
                  : e.parentNode),
              l && (s = (e.ownerSVGElement || {}).parentNode),
              (s && s !== Gr && s.appendChild) || (s = Gr.body),
              (a = s._gsap) &&
              v &&
              a.width &&
              f &&
              a.time === Ge.time &&
              !a.uncache
                ? Xt((u / a.width) * g)
                : ((v || "%" === c) &&
                    !Bn[Pn(s, "display")] &&
                    (h.position = Pn(e, "position")),
                  s === e && (h.position = "static"),
                  s.appendChild($r),
                  (o = $r[d]),
                  s.removeChild($r),
                  (h.position = "absolute"),
                  f && v && (((a = Yt(s)).time = Ge.time), (a.width = s[d])),
                  Xt(m ? (o * u) / g : o && u ? (g / o) * u : 0)))
            : ((o = l ? e.getBBox()[f ? "width" : "height"] : e[d]),
              Xt(v ? (u / o) * g : (u / 100) * o)));
    },
    Wn = function (t, e, r, n) {
      var i;
      return (
        Qr || Rn(),
        e in cn &&
          "transform" !== e &&
          ~(e = cn[e]).indexOf(",") &&
          (e = e.split(",")[0]),
        rn[e] && "transform" !== e
          ? ((i = ti(t, n)),
            (i =
              "transformOrigin" !== e
                ? i[e]
                : i.svg
                ? i.origin
                : ei(Pn(t, Sn)) + " " + i.zOrigin + "px"))
          : (!(i = t.style[e]) ||
              "auto" === i ||
              n ||
              ~(i + "").indexOf("calc(")) &&
            (i =
              (Vn[e] && Vn[e](t, e, r)) ||
              Pn(t, e) ||
              Nt(t, e) ||
              ("opacity" === e ? 1 : 0)),
        r && !~(i + "").trim().indexOf(" ") ? In(t, e, i, r) + r : i
      );
    },
    Hn = function (t, e, r, n) {
      if (!r || "none" === r) {
        var i = Dn(e, t, 1),
          o = i && Pn(t, i, 1);
        o && o !== r
          ? ((e = i), (r = o))
          : "borderColor" === e && (r = Pn(t, "borderTopColor"));
      }
      var s,
        a,
        l,
        u,
        c,
        h,
        f,
        p,
        d,
        g,
        m,
        v = new Lr(this._pt, t.style, e, 0, 1, Ar),
        _ = 0,
        y = 0;
      if (
        ((v.b = r),
        (v.e = n),
        (r += ""),
        "auto" === (n += "") &&
          ((t.style[e] = n), (n = Pn(t, e) || n), (t.style[e] = r)),
        Ke((s = [r, n])),
        (n = s[1]),
        (l = (r = s[0]).match(ft) || []),
        (n.match(ft) || []).length)
      ) {
        for (; (a = ft.exec(n)); )
          (f = a[0]),
            (d = n.substring(_, a.index)),
            c
              ? (c = (c + 1) % 5)
              : ("rgba(" !== d.substr(-5) && "hsla(" !== d.substr(-5)) ||
                (c = 1),
            f !== (h = l[y++] || "") &&
              ((u = parseFloat(h) || 0),
              (m = h.substr((u + "").length)),
              "=" === f.charAt(1) && (f = Bt(u, f) + m),
              (p = parseFloat(f)),
              (g = f.substr((p + "").length)),
              (_ = ft.lastIndex - g.length),
              g ||
                ((g = g || H.units[e] || m),
                _ === n.length && ((n += g), (v.e += g))),
              m !== g && (u = In(t, e, h, g) || 0),
              (v._pt = {
                _next: v._pt,
                p: d || 1 === y ? d : ",",
                s: u,
                c: p - u,
                m: (c && c < 4) || "zIndex" === e ? Math.round : 0,
              }));
        v.c = _ < n.length ? n.substring(_, n.length) : "";
      } else v.r = "display" === e && "none" === n ? mn : gn;
      return dt.test(n) && (v.e = 0), (this._pt = v), v;
    },
    jn = {top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%"},
    Un = function (t, e) {
      if (e.tween && e.tween._time === e.tween._dur) {
        var r,
          n,
          i,
          o = e.t,
          s = o.style,
          a = e.u,
          l = o._gsap;
        if ("all" === a || !0 === a) (s.cssText = ""), (n = 1);
        else
          for (i = (a = a.split(",")).length; --i > -1; )
            (r = a[i]),
              rn[r] && ((n = 1), (r = "transformOrigin" === r ? Sn : Tn)),
              Fn(o, r);
        n &&
          (Fn(o, Tn),
          l &&
            (l.svg && o.removeAttribute("transform"),
            ti(o, 1),
            (l.uncache = 1),
            On(s)));
      }
    },
    Vn = {
      clearProps: function (t, e, r, n, i) {
        if ("isFromStart" !== i.data) {
          var o = (t._pt = new Lr(t._pt, e, r, 0, 0, Un));
          return (o.u = n), (o.pr = -10), (o.tween = i), t._props.push(r), 1;
        }
      },
    },
    Kn = [1, 0, 0, 1, 0, 0],
    Gn = {},
    Zn = function (t) {
      return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
    },
    Qn = function (t) {
      var e = Pn(t, Tn);
      return Zn(e) ? Kn : e.substr(7).match(ht).map(Xt);
    },
    $n = function (t, e) {
      var r,
        n,
        i,
        o,
        s = t._gsap || Yt(t),
        a = t.style,
        l = Qn(t);
      return s.svg && t.getAttribute("transform")
        ? "1,0,0,1,0,0" ===
          (l = [
            (i = t.transform.baseVal.consolidate().matrix).a,
            i.b,
            i.c,
            i.d,
            i.e,
            i.f,
          ]).join(",")
          ? Kn
          : l
        : (l !== Kn ||
            t.offsetParent ||
            t === Zr ||
            s.svg ||
            ((i = a.display),
            (a.display = "block"),
            ((r = t.parentNode) && t.offsetParent) ||
              ((o = 1), (n = t.nextElementSibling), Zr.appendChild(t)),
            (l = Qn(t)),
            i ? (a.display = i) : Fn(t, "display"),
            o &&
              (n
                ? r.insertBefore(t, n)
                : r
                ? r.appendChild(t)
                : Zr.removeChild(t))),
          e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
    },
    Jn = function (t, e, r, n, i, o) {
      var s,
        a,
        l,
        u = t._gsap,
        c = i || $n(t, !0),
        h = u.xOrigin || 0,
        f = u.yOrigin || 0,
        p = u.xOffset || 0,
        d = u.yOffset || 0,
        g = c[0],
        m = c[1],
        v = c[2],
        _ = c[3],
        y = c[4],
        w = c[5],
        b = e.split(" "),
        x = parseFloat(b[0]) || 0,
        T = parseFloat(b[1]) || 0;
      r
        ? c !== Kn &&
          (a = g * _ - m * v) &&
          ((l = x * (-m / a) + T * (g / a) - (g * w - m * y) / a),
          (x = x * (_ / a) + T * (-v / a) + (v * w - _ * y) / a),
          (T = l))
        : ((x = (s = Yn(t)).x + (~b[0].indexOf("%") ? (x / 100) * s.width : x)),
          (T =
            s.y + (~(b[1] || b[0]).indexOf("%") ? (T / 100) * s.height : T))),
        n || (!1 !== n && u.smooth)
          ? ((y = x - h),
            (w = T - f),
            (u.xOffset = p + (y * g + w * v) - y),
            (u.yOffset = d + (y * m + w * _) - w))
          : (u.xOffset = u.yOffset = 0),
        (u.xOrigin = x),
        (u.yOrigin = T),
        (u.smooth = !!n),
        (u.origin = e),
        (u.originIsAbsolute = !!r),
        (t.style[Sn] = "0px 0px"),
        o &&
          (Xn(o, u, "xOrigin", h, x),
          Xn(o, u, "yOrigin", f, T),
          Xn(o, u, "xOffset", p, u.xOffset),
          Xn(o, u, "yOffset", d, u.yOffset)),
        t.setAttribute("data-svg-origin", x + " " + T);
    },
    ti = function (t, e) {
      var r = t._gsap || new lr(t);
      if ("x" in r && !e && !r.uncache) return r;
      var n,
        i,
        o,
        s,
        a,
        l,
        u,
        c,
        h,
        f,
        p,
        d,
        g,
        m,
        v,
        _,
        y,
        w,
        b,
        x,
        T,
        S,
        M,
        O,
        k,
        E,
        A,
        P,
        C,
        D,
        R,
        z,
        L = t.style,
        Y = r.scaleX < 0,
        N = "px",
        F = "deg",
        X = getComputedStyle(t),
        q = Pn(t, Sn) || "0";
      return (
        (n = i = o = l = u = c = h = f = p = 0),
        (s = a = 1),
        (r.svg = !(!t.getCTM || !Nn(t))),
        X.translate &&
          (("none" === X.translate &&
            "none" === X.scale &&
            "none" === X.rotate) ||
            (L[Tn] =
              ("none" !== X.translate
                ? "translate3d(" +
                  (X.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              ("none" !== X.rotate ? "rotate(" + X.rotate + ") " : "") +
              ("none" !== X.scale
                ? "scale(" + X.scale.split(" ").join(",") + ") "
                : "") +
              ("none" !== X[Tn] ? X[Tn] : "")),
          (L.scale = L.rotate = L.translate = "none")),
        (m = $n(t, r.svg)),
        r.svg &&
          (r.uncache
            ? ((k = t.getBBox()),
              (q = r.xOrigin - k.x + "px " + (r.yOrigin - k.y) + "px"),
              (O = ""))
            : (O = !e && t.getAttribute("data-svg-origin")),
          Jn(t, O || q, !!O || r.originIsAbsolute, !1 !== r.smooth, m)),
        (d = r.xOrigin || 0),
        (g = r.yOrigin || 0),
        m !== Kn &&
          ((w = m[0]),
          (b = m[1]),
          (x = m[2]),
          (T = m[3]),
          (n = S = m[4]),
          (i = M = m[5]),
          6 === m.length
            ? ((s = Math.sqrt(w * w + b * b)),
              (a = Math.sqrt(T * T + x * x)),
              (l = w || b ? sn(b, w) * nn : 0),
              (h = x || T ? sn(x, T) * nn + l : 0) &&
                (a *= Math.abs(Math.cos(h * on))),
              r.svg && ((n -= d - (d * w + g * x)), (i -= g - (d * b + g * T))))
            : ((z = m[6]),
              (D = m[7]),
              (A = m[8]),
              (P = m[9]),
              (C = m[10]),
              (R = m[11]),
              (n = m[12]),
              (i = m[13]),
              (o = m[14]),
              (u = (v = sn(z, C)) * nn),
              v &&
                ((O = S * (_ = Math.cos(-v)) + A * (y = Math.sin(-v))),
                (k = M * _ + P * y),
                (E = z * _ + C * y),
                (A = S * -y + A * _),
                (P = M * -y + P * _),
                (C = z * -y + C * _),
                (R = D * -y + R * _),
                (S = O),
                (M = k),
                (z = E)),
              (c = (v = sn(-x, C)) * nn),
              v &&
                ((_ = Math.cos(-v)),
                (R = T * (y = Math.sin(-v)) + R * _),
                (w = O = w * _ - A * y),
                (b = k = b * _ - P * y),
                (x = E = x * _ - C * y)),
              (l = (v = sn(b, w)) * nn),
              v &&
                ((O = w * (_ = Math.cos(v)) + b * (y = Math.sin(v))),
                (k = S * _ + M * y),
                (b = b * _ - w * y),
                (M = M * _ - S * y),
                (w = O),
                (S = k)),
              u &&
                Math.abs(u) + Math.abs(l) > 359.9 &&
                ((u = l = 0), (c = 180 - c)),
              (s = Xt(Math.sqrt(w * w + b * b + x * x))),
              (a = Xt(Math.sqrt(M * M + z * z))),
              (v = sn(S, M)),
              (h = Math.abs(v) > 2e-4 ? v * nn : 0),
              (p = R ? 1 / (R < 0 ? -R : R) : 0)),
          r.svg &&
            ((O = t.getAttribute("transform")),
            (r.forceCSS = t.setAttribute("transform", "") || !Zn(Pn(t, Tn))),
            O && t.setAttribute("transform", O))),
        Math.abs(h) > 90 &&
          Math.abs(h) < 270 &&
          (Y
            ? ((s *= -1),
              (h += l <= 0 ? 180 : -180),
              (l += l <= 0 ? 180 : -180))
            : ((a *= -1), (h += h <= 0 ? 180 : -180))),
        (e = e || r.uncache),
        (r.x =
          n -
          ((r.xPercent =
            n &&
            ((!e && r.xPercent) ||
              (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
            ? (t.offsetWidth * r.xPercent) / 100
            : 0) +
          N),
        (r.y =
          i -
          ((r.yPercent =
            i &&
            ((!e && r.yPercent) ||
              (Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0)))
            ? (t.offsetHeight * r.yPercent) / 100
            : 0) +
          N),
        (r.z = o + N),
        (r.scaleX = Xt(s)),
        (r.scaleY = Xt(a)),
        (r.rotation = Xt(l) + F),
        (r.rotationX = Xt(u) + F),
        (r.rotationY = Xt(c) + F),
        (r.skewX = h + F),
        (r.skewY = f + F),
        (r.transformPerspective = p + N),
        (r.zOrigin = parseFloat(q.split(" ")[2]) || 0) && (L[Sn] = ei(q)),
        (r.xOffset = r.yOffset = 0),
        (r.force3D = H.force3D),
        (r.renderTransform = r.svg ? li : en ? ai : ni),
        (r.uncache = 0),
        r
      );
    },
    ei = function (t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    ri = function (t, e, r) {
      var n = Te(e);
      return Xt(parseFloat(e) + parseFloat(In(t, "x", r + "px", n))) + n;
    },
    ni = function (t, e) {
      (e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        ai(t, e);
    },
    ii = "0deg",
    oi = "0px",
    si = ") ",
    ai = function (t, e) {
      var r = e || this,
        n = r.xPercent,
        i = r.yPercent,
        o = r.x,
        s = r.y,
        a = r.z,
        l = r.rotation,
        u = r.rotationY,
        c = r.rotationX,
        h = r.skewX,
        f = r.skewY,
        p = r.scaleX,
        d = r.scaleY,
        g = r.transformPerspective,
        m = r.force3D,
        v = r.target,
        _ = r.zOrigin,
        y = "",
        w = ("auto" === m && t && 1 !== t) || !0 === m;
      if (_ && (c !== ii || u !== ii)) {
        var b,
          x = parseFloat(u) * on,
          T = Math.sin(x),
          S = Math.cos(x);
        (x = parseFloat(c) * on),
          (b = Math.cos(x)),
          (o = ri(v, o, T * b * -_)),
          (s = ri(v, s, -Math.sin(x) * -_)),
          (a = ri(v, a, S * b * -_ + _));
      }
      g !== oi && (y += "perspective(" + g + si),
        (n || i) && (y += "translate(" + n + "%, " + i + "%) "),
        (w || o !== oi || s !== oi || a !== oi) &&
          (y +=
            a !== oi || w
              ? "translate3d(" + o + ", " + s + ", " + a + ") "
              : "translate(" + o + ", " + s + si),
        l !== ii && (y += "rotate(" + l + si),
        u !== ii && (y += "rotateY(" + u + si),
        c !== ii && (y += "rotateX(" + c + si),
        (h === ii && f === ii) || (y += "skew(" + h + ", " + f + si),
        (1 === p && 1 === d) || (y += "scale(" + p + ", " + d + si),
        (v.style[Tn] = y || "translate(0, 0)");
    },
    li = function (t, e) {
      var r,
        n,
        i,
        o,
        s,
        a = e || this,
        l = a.xPercent,
        u = a.yPercent,
        c = a.x,
        h = a.y,
        f = a.rotation,
        p = a.skewX,
        d = a.skewY,
        g = a.scaleX,
        m = a.scaleY,
        v = a.target,
        _ = a.xOrigin,
        y = a.yOrigin,
        w = a.xOffset,
        b = a.yOffset,
        x = a.forceCSS,
        T = parseFloat(c),
        S = parseFloat(h);
      (f = parseFloat(f)),
        (p = parseFloat(p)),
        (d = parseFloat(d)) && ((p += d = parseFloat(d)), (f += d)),
        f || p
          ? ((f *= on),
            (p *= on),
            (r = Math.cos(f) * g),
            (n = Math.sin(f) * g),
            (i = Math.sin(f - p) * -m),
            (o = Math.cos(f - p) * m),
            p &&
              ((d *= on),
              (s = Math.tan(p - d)),
              (i *= s = Math.sqrt(1 + s * s)),
              (o *= s),
              d &&
                ((s = Math.tan(d)), (r *= s = Math.sqrt(1 + s * s)), (n *= s))),
            (r = Xt(r)),
            (n = Xt(n)),
            (i = Xt(i)),
            (o = Xt(o)))
          : ((r = g), (o = m), (n = i = 0)),
        ((T && !~(c + "").indexOf("px")) || (S && !~(h + "").indexOf("px"))) &&
          ((T = In(v, "x", c, "px")), (S = In(v, "y", h, "px"))),
        (_ || y || w || b) &&
          ((T = Xt(T + _ - (_ * r + y * i) + w)),
          (S = Xt(S + y - (_ * n + y * o) + b))),
        (l || u) &&
          ((s = v.getBBox()),
          (T = Xt(T + (l / 100) * s.width)),
          (S = Xt(S + (u / 100) * s.height))),
        (s =
          "matrix(" +
          r +
          "," +
          n +
          "," +
          i +
          "," +
          o +
          "," +
          T +
          "," +
          S +
          ")"),
        v.setAttribute("transform", s),
        x && (v.style[Tn] = s);
    },
    ui = function (t, e, r, n, i) {
      var o,
        s,
        a = 360,
        l = tt(i),
        u = parseFloat(i) * (l && ~i.indexOf("rad") ? nn : 1) - n,
        c = n + u + "deg";
      return (
        l &&
          ("short" === (o = i.split("_")[1]) &&
            (u %= a) !== u % 180 &&
            (u += u < 0 ? a : -360),
          "cw" === o && u < 0
            ? (u = ((u + 36e9) % a) - ~~(u / a) * a)
            : "ccw" === o && u > 0 && (u = ((u - 36e9) % a) - ~~(u / a) * a)),
        (t._pt = s = new Lr(t._pt, e, r, n, u, fn)),
        (s.e = c),
        (s.u = "deg"),
        t._props.push(r),
        s
      );
    },
    ci = function (t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    hi = function (t, e, r) {
      var n,
        i,
        o,
        s,
        a,
        l,
        u,
        c = ci({}, r._gsap),
        h = r.style;
      for (i in (c.svg
        ? ((o = r.getAttribute("transform")),
          r.setAttribute("transform", ""),
          (h[Tn] = e),
          (n = ti(r, 1)),
          Fn(r, Tn),
          r.setAttribute("transform", o))
        : ((o = getComputedStyle(r)[Tn]),
          (h[Tn] = e),
          (n = ti(r, 1)),
          (h[Tn] = o)),
      rn))
        (o = c[i]) !== (s = n[i]) &&
          "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 &&
          ((a = Te(o) !== (u = Te(s)) ? In(r, i, o, u) : parseFloat(o)),
          (l = parseFloat(s)),
          (t._pt = new Lr(t._pt, n, i, a, l - a, hn)),
          (t._pt.u = u || 0),
          t._props.push(i));
      ci(n, c);
    };
  Ft("padding,margin,Width,Radius", function (t, e) {
    var r = "Top",
      n = "Right",
      i = "Bottom",
      o = "Left",
      s = (e < 3 ? [r, n, i, o] : [r + o, r + n, i + n, i + o]).map(function (
        r
      ) {
        return e < 2 ? t + r : "border" + r + t;
      });
    Vn[e > 1 ? "border" + t : t] = function (t, e, r, n, i) {
      var o, a;
      if (arguments.length < 4)
        return (
          (o = s.map(function (e) {
            return Wn(t, e, r);
          })),
          5 === (a = o.join(" ")).split(o[0]).length ? o[0] : a
        );
      (o = (n + "").split(" ")),
        (a = {}),
        s.forEach(function (t, e) {
          return (a[t] = o[e] = o[e] || o[((e - 1) / 2) | 0]);
        }),
        t.init(e, a, i);
    };
  });
  var fi,
    pi,
    di,
    gi = {
      name: "css",
      register: Rn,
      targetTest: function (t) {
        return t.style && t.nodeType;
      },
      init: function (t, e, r, n, i) {
        var o,
          s,
          a,
          l,
          u,
          c,
          h,
          f,
          p,
          d,
          g,
          m,
          v,
          _,
          y,
          w,
          b,
          x,
          T,
          S,
          M = this._props,
          O = t.style,
          k = r.vars.startAt;
        for (h in (Qr || Rn(),
        (this.styles = this.styles || En(t)),
        (w = this.styles.props),
        (this.tween = r),
        e))
          if (
            "autoRound" !== h &&
            ((s = e[h]), !Pt[h] || !gr(h, e, r, n, t, i))
          )
            if (
              ((u = typeof s),
              (c = Vn[h]),
              "function" === u && (u = typeof (s = s.call(r, n, t, i))),
              "string" === u && ~s.indexOf("random(") && (s = ze(s)),
              c)
            )
              c(this, t, h, s, r) && (y = 1);
            else if ("--" === h.substr(0, 2))
              (o = (getComputedStyle(t).getPropertyValue(h) + "").trim()),
                (s += ""),
                (Ue.lastIndex = 0),
                Ue.test(o) || ((f = Te(o)), (p = Te(s))),
                p ? f !== p && (o = In(t, h, o, p) + p) : f && (s += f),
                this.add(O, "setProperty", o, s, n, i, 0, 0, h),
                M.push(h),
                w.push(h, 0, O[h]);
            else if ("undefined" !== u) {
              if (
                (k && h in k
                  ? ((o =
                      "function" == typeof k[h] ? k[h].call(r, n, t, i) : k[h]),
                    tt(o) && ~o.indexOf("random(") && (o = ze(o)),
                    Te(o + "") || (o += H.units[h] || Te(Wn(t, h)) || ""),
                    "=" === (o + "").charAt(1) && (o = Wn(t, h)))
                  : (o = Wn(t, h)),
                (l = parseFloat(o)),
                (d = "string" === u && "=" === s.charAt(1) && s.substr(0, 2)) &&
                  (s = s.substr(2)),
                (a = parseFloat(s)),
                h in cn &&
                  ("autoAlpha" === h &&
                    (1 === l &&
                      "hidden" === Wn(t, "visibility") &&
                      a &&
                      (l = 0),
                    w.push("visibility", 0, O.visibility),
                    Xn(
                      this,
                      O,
                      "visibility",
                      l ? "inherit" : "hidden",
                      a ? "inherit" : "hidden",
                      !a
                    )),
                  "scale" !== h &&
                    "transform" !== h &&
                    ~(h = cn[h]).indexOf(",") &&
                    (h = h.split(",")[0])),
                (g = h in rn))
              )
                if (
                  (this.styles.save(h),
                  m ||
                    (((v = t._gsap).renderTransform && !e.parseTransform) ||
                      ti(t, e.parseTransform),
                    (_ = !1 !== e.smoothOrigin && v.smooth),
                    ((m = this._pt =
                      new Lr(
                        this._pt,
                        O,
                        Tn,
                        0,
                        1,
                        v.renderTransform,
                        v,
                        0,
                        -1
                      )).dep = 1)),
                  "scale" === h)
                )
                  (this._pt = new Lr(
                    this._pt,
                    v,
                    "scaleY",
                    v.scaleY,
                    (d ? Bt(v.scaleY, d + a) : a) - v.scaleY || 0,
                    hn
                  )),
                    (this._pt.u = 0),
                    M.push("scaleY", h),
                    (h += "X");
                else {
                  if ("transformOrigin" === h) {
                    w.push(Sn, 0, O[Sn]),
                      (x = void 0),
                      (T = void 0),
                      (S = void 0),
                      (x = (b = s).split(" ")),
                      (T = x[0]),
                      (S = x[1] || "50%"),
                      ("top" !== T &&
                        "bottom" !== T &&
                        "left" !== S &&
                        "right" !== S) ||
                        ((b = T), (T = S), (S = b)),
                      (x[0] = jn[T] || T),
                      (x[1] = jn[S] || S),
                      (s = x.join(" ")),
                      v.svg
                        ? Jn(t, s, 0, _, 0, this)
                        : ((p = parseFloat(s.split(" ")[2]) || 0) !==
                            v.zOrigin && Xn(this, v, "zOrigin", v.zOrigin, p),
                          Xn(this, O, h, ei(o), ei(s)));
                    continue;
                  }
                  if ("svgOrigin" === h) {
                    Jn(t, s, 1, _, 0, this);
                    continue;
                  }
                  if (h in Gn) {
                    ui(this, v, h, l, d ? Bt(l, d + s) : s);
                    continue;
                  }
                  if ("smoothOrigin" === h) {
                    Xn(this, v, "smooth", v.smooth, s);
                    continue;
                  }
                  if ("force3D" === h) {
                    v[h] = s;
                    continue;
                  }
                  if ("transform" === h) {
                    hi(this, s, t);
                    continue;
                  }
                }
              else h in O || (h = Dn(h) || h);
              if (
                g ||
                ((a || 0 === a) && (l || 0 === l) && !un.test(s) && h in O)
              )
                a || (a = 0),
                  (f = (o + "").substr((l + "").length)) !==
                    (p = Te(s) || (h in H.units ? H.units[h] : f)) &&
                    (l = In(t, h, o, p)),
                  (this._pt = new Lr(
                    this._pt,
                    g ? v : O,
                    h,
                    l,
                    (d ? Bt(l, d + a) : a) - l,
                    g || ("px" !== p && "zIndex" !== h) || !1 === e.autoRound
                      ? hn
                      : dn
                  )),
                  (this._pt.u = p || 0),
                  f !== p && "%" !== p && ((this._pt.b = o), (this._pt.r = pn));
              else if (h in O) Hn.call(this, t, h, o, d ? d + s : s);
              else if (h in t) this.add(t, h, o || t[h], d ? d + s : s, n, i);
              else if ("parseTransform" !== h) {
                wt(h, s);
                continue;
              }
              g || (h in O ? w.push(h, 0, O[h]) : w.push(h, 1, o || t[h])),
                M.push(h);
            }
        y && zr(this);
      },
      render: function (t, e) {
        if (e.tween._time || !tn())
          for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
        else e.styles.revert();
      },
      get: Wn,
      aliases: cn,
      getSetter: function (t, e, r) {
        var n = cn[e];
        return (
          n && n.indexOf(",") < 0 && (e = n),
          e in rn && e !== Sn && (t._gsap.x || Wn(t, "x"))
            ? r && Jr === r
              ? "scale" === e
                ? wn
                : yn
              : ((Jr = r || {}), "scale" === e ? bn : xn)
            : t.style && !nt(t.style[e])
            ? vn
            : ~e.indexOf("-")
            ? _n
            : Or(t, e)
        );
      },
      core: {_removeProperty: Fn, _getMatrix: $n},
    };
  (Vr.utils.checkPrefix = Dn),
    (Vr.core.getStyleSaver = En),
    (di = Ft(
      (fi = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
        "," +
        (pi = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (t) {
        rn[t] = 1;
      }
    )),
    Ft(pi, function (t) {
      (H.units[t] = "deg"), (Gn[t] = 1);
    }),
    (cn[di[13]] = fi + "," + pi),
    Ft(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (t) {
        var e = t.split(":");
        cn[e[1]] = di[e[0]];
      }
    ),
    Ft(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (t) {
        H.units[t] = "px";
      }
    ),
    Vr.registerPlugin(gi);
  var mi = Vr.registerPlugin(gi) || Vr;
  /*!
   * ScrollTrigger 3.11.4
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ mi.core.Tween;
  function vi(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  /*!
   * Observer 3.11.4
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var _i,
    yi,
    wi,
    bi,
    xi,
    Ti,
    Si,
    Mi,
    Oi,
    ki,
    Ei,
    Ai,
    Pi,
    Ci = function () {
      return (
        _i ||
        ("undefined" != typeof window &&
          (_i = window.gsap) &&
          _i.registerPlugin &&
          _i)
      );
    },
    Di = 1,
    Ri = [],
    zi = [],
    Li = [],
    Yi = Date.now,
    Ni = function (t, e) {
      return e;
    },
    Fi = function (t, e) {
      return ~Li.indexOf(t) && Li[Li.indexOf(t) + 1][e];
    },
    Xi = function (t) {
      return !!~ki.indexOf(t);
    },
    qi = function (t, e, r, n, i) {
      return t.addEventListener(e, r, {passive: !n, capture: !!i});
    },
    Bi = function (t, e, r, n) {
      return t.removeEventListener(e, r, !!n);
    },
    Ii = "scrollLeft",
    Wi = "scrollTop",
    Hi = function () {
      return (Ei && Ei.isPressed) || zi.cache++;
    },
    ji = function (t, e) {
      var r = function r(n) {
        if (n || 0 === n) {
          Di && (wi.history.scrollRestoration = "manual");
          var i = Ei && Ei.isPressed;
          (n = r.v = Math.round(n) || (Ei && Ei.iOS ? 1 : 0)),
            t(n),
            (r.cacheID = zi.cache),
            i && Ni("ss", n);
        } else
          (e || zi.cache !== r.cacheID || Ni("ref")) &&
            ((r.cacheID = zi.cache), (r.v = t()));
        return r.v + r.offset;
      };
      return (r.offset = 0), t && r;
    },
    Ui = {
      s: Ii,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: ji(function (t) {
        return arguments.length
          ? wi.scrollTo(t, Vi.sc())
          : wi.pageXOffset || bi[Ii] || xi[Ii] || Ti[Ii] || 0;
      }),
    },
    Vi = {
      s: Wi,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Ui,
      sc: ji(function (t) {
        return arguments.length
          ? wi.scrollTo(Ui.sc(), t)
          : wi.pageYOffset || bi[Wi] || xi[Wi] || Ti[Wi] || 0;
      }),
    },
    Ki = function (t) {
      return (
        _i.utils.toArray(t)[0] ||
        ("string" == typeof t && !1 !== _i.config().nullTargetWarn
          ? console.warn("Element not found:", t)
          : null)
      );
    },
    Gi = function (t, e) {
      var r = e.s,
        n = e.sc;
      Xi(t) && (t = bi.scrollingElement || xi);
      var i = zi.indexOf(t),
        o = n === Vi.sc ? 1 : 2;
      !~i && (i = zi.push(t) - 1),
        zi[i + o] || t.addEventListener("scroll", Hi);
      var s = zi[i + o],
        a =
          s ||
          (zi[i + o] =
            ji(Fi(t, r), !0) ||
            (Xi(t)
              ? n
              : ji(function (e) {
                  return arguments.length ? (t[r] = e) : t[r];
                })));
      return (
        (a.target = t),
        s || (a.smooth = "smooth" === _i.getProperty(t, "scrollBehavior")),
        a
      );
    },
    Zi = function (t, e, r) {
      var n = t,
        i = t,
        o = Yi(),
        s = o,
        a = e || 50,
        l = Math.max(500, 3 * a),
        u = function (t, e) {
          var l = Yi();
          e || l - o > a
            ? ((i = n), (n = t), (s = o), (o = l))
            : r
            ? (n += t)
            : (n = i + ((t - i) / (l - s)) * (o - s));
        };
      return {
        update: u,
        reset: function () {
          (i = n = r ? 0 : n), (s = o = 0);
        },
        getVelocity: function (t) {
          var e = s,
            a = i,
            c = Yi();
          return (
            (t || 0 === t) && t !== n && u(t),
            o === s || c - s > l
              ? 0
              : ((n + (r ? a : -a)) / ((r ? c : o) - e)) * 1e3
          );
        },
      };
    },
    Qi = function (t, e) {
      return (
        e && !t._gsapAllow && t.preventDefault(),
        t.changedTouches ? t.changedTouches[0] : t
      );
    },
    $i = function (t) {
      var e = Math.max.apply(Math, t),
        r = Math.min.apply(Math, t);
      return Math.abs(e) >= Math.abs(r) ? e : r;
    },
    Ji = function () {
      var t, e, r, n;
      (Oi = _i.core.globals().ScrollTrigger) &&
        Oi.core &&
        ((t = Oi.core),
        (e = t.bridge || {}),
        (r = t._scrollers),
        (n = t._proxies),
        r.push.apply(r, zi),
        n.push.apply(n, Li),
        (zi = r),
        (Li = n),
        (Ni = function (t, r) {
          return e[t](r);
        }));
    },
    to = function (t) {
      return (
        (_i = t || Ci()) &&
          "undefined" != typeof document &&
          document.body &&
          ((wi = window),
          (bi = document),
          (xi = bi.documentElement),
          (Ti = bi.body),
          (ki = [wi, bi, xi, Ti]),
          _i.utils.clamp,
          (Pi = _i.core.context || function () {}),
          (Mi = "onpointerenter" in Ti ? "pointer" : "mouse"),
          (Si = eo.isTouch =
            wi.matchMedia &&
            wi.matchMedia("(hover: none), (pointer: coarse)").matches
              ? 1
              : "ontouchstart" in wi ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
              ? 2
              : 0),
          (Ai = eo.eventTypes =
            (
              "ontouchstart" in xi
                ? "touchstart,touchmove,touchcancel,touchend"
                : "onpointerdown" in xi
                ? "pointerdown,pointermove,pointercancel,pointerup"
                : "mousedown,mousemove,mouseup,mouseup"
            ).split(",")),
          setTimeout(function () {
            return (Di = 0);
          }, 500),
          Ji(),
          (yi = 1)),
        yi
      );
    };
  (Ui.op = Vi), (zi.cache = 0);
  var eo = (function () {
    function t(t) {
      this.init(t);
    }
    var e, r, n;
    return (
      (t.prototype.init = function (t) {
        yi || to(_i) || console.warn("Please gsap.registerPlugin(Observer)"),
          Oi || Ji();
        var e = t.tolerance,
          r = t.dragMinimum,
          n = t.type,
          i = t.target,
          o = t.lineHeight,
          s = t.debounce,
          a = t.preventDefault,
          l = t.onStop,
          u = t.onStopDelay,
          c = t.ignore,
          h = t.wheelSpeed,
          f = t.event,
          p = t.onDragStart,
          d = t.onDragEnd,
          g = t.onDrag,
          m = t.onPress,
          v = t.onRelease,
          _ = t.onRight,
          y = t.onLeft,
          w = t.onUp,
          b = t.onDown,
          x = t.onChangeX,
          T = t.onChangeY,
          S = t.onChange,
          M = t.onToggleX,
          O = t.onToggleY,
          k = t.onHover,
          E = t.onHoverEnd,
          A = t.onMove,
          P = t.ignoreCheck,
          C = t.isNormalizer,
          D = t.onGestureStart,
          R = t.onGestureEnd,
          z = t.onWheel,
          L = t.onEnable,
          Y = t.onDisable,
          N = t.onClick,
          F = t.scrollSpeed,
          X = t.capture,
          q = t.allowClicks,
          B = t.lockAxis,
          I = t.onLockAxis;
        (this.target = i = Ki(i) || xi),
          (this.vars = t),
          c && (c = _i.utils.toArray(c)),
          (e = e || 1e-9),
          (r = r || 0),
          (h = h || 1),
          (F = F || 1),
          (n = n || "wheel,touch,pointer"),
          (s = !1 !== s),
          o || (o = parseFloat(wi.getComputedStyle(Ti).lineHeight) || 22);
        var W,
          H,
          j,
          U,
          V,
          K,
          G,
          Z = this,
          Q = 0,
          $ = 0,
          J = Gi(i, Ui),
          tt = Gi(i, Vi),
          et = J(),
          rt = tt(),
          nt =
            ~n.indexOf("touch") &&
            !~n.indexOf("pointer") &&
            "pointerdown" === Ai[0],
          it = Xi(i),
          ot = i.ownerDocument || bi,
          st = [0, 0, 0],
          at = [0, 0, 0],
          lt = 0,
          ut = function () {
            return (lt = Yi());
          },
          ct = function (t, e) {
            return (
              ((Z.event = t) && c && ~c.indexOf(t.target)) ||
              (e && nt && "touch" !== t.pointerType) ||
              (P && P(t, e))
            );
          },
          ht = function () {
            var t = (Z.deltaX = $i(st)),
              r = (Z.deltaY = $i(at)),
              n = Math.abs(t) >= e,
              i = Math.abs(r) >= e;
            S && (n || i) && S(Z, t, r, st, at),
              n &&
                (_ && Z.deltaX > 0 && _(Z),
                y && Z.deltaX < 0 && y(Z),
                x && x(Z),
                M && Z.deltaX < 0 != Q < 0 && M(Z),
                (Q = Z.deltaX),
                (st[0] = st[1] = st[2] = 0)),
              i &&
                (b && Z.deltaY > 0 && b(Z),
                w && Z.deltaY < 0 && w(Z),
                T && T(Z),
                O && Z.deltaY < 0 != $ < 0 && O(Z),
                ($ = Z.deltaY),
                (at[0] = at[1] = at[2] = 0)),
              (U || j) && (A && A(Z), j && (g(Z), (j = !1)), (U = !1)),
              K && ((K = !1), 1) && I && I(Z),
              V && (z(Z), (V = !1)),
              (W = 0);
          },
          ft = function (t, e, r) {
            (st[r] += t),
              (at[r] += e),
              Z._vx.update(t),
              Z._vy.update(e),
              s ? W || (W = requestAnimationFrame(ht)) : ht();
          },
          pt = function (t, e) {
            B &&
              !G &&
              ((Z.axis = G = Math.abs(t) > Math.abs(e) ? "x" : "y"), (K = !0)),
              "y" !== G && ((st[2] += t), Z._vx.update(t, !0)),
              "x" !== G && ((at[2] += e), Z._vy.update(e, !0)),
              s ? W || (W = requestAnimationFrame(ht)) : ht();
          },
          dt = function (t) {
            if (!ct(t, 1)) {
              var e = (t = Qi(t, a)).clientX,
                n = t.clientY,
                i = e - Z.x,
                o = n - Z.y,
                s = Z.isDragging;
              (Z.x = e),
                (Z.y = n),
                (s ||
                  Math.abs(Z.startX - e) >= r ||
                  Math.abs(Z.startY - n) >= r) &&
                  (g && (j = !0),
                  s || (Z.isDragging = !0),
                  pt(i, o),
                  s || (p && p(Z)));
            }
          },
          gt = (Z.onPress = function (t) {
            ct(t, 1) ||
              ((Z.axis = G = null),
              H.pause(),
              (Z.isPressed = !0),
              (t = Qi(t)),
              (Q = $ = 0),
              (Z.startX = Z.x = t.clientX),
              (Z.startY = Z.y = t.clientY),
              Z._vx.reset(),
              Z._vy.reset(),
              qi(C ? i : ot, Ai[1], dt, a, !0),
              (Z.deltaX = Z.deltaY = 0),
              m && m(Z));
          }),
          mt = function (t) {
            if (!ct(t, 1)) {
              Bi(C ? i : ot, Ai[1], dt, !0);
              var e = !isNaN(Z.y - Z.startY),
                r =
                  Z.isDragging &&
                  (Math.abs(Z.x - Z.startX) > 3 ||
                    Math.abs(Z.y - Z.startY) > 3),
                n = Qi(t);
              !r &&
                e &&
                (Z._vx.reset(),
                Z._vy.reset(),
                a &&
                  q &&
                  _i.delayedCall(0.08, function () {
                    if (Yi() - lt > 300 && !t.defaultPrevented)
                      if (t.target.click) t.target.click();
                      else if (ot.createEvent) {
                        var e = ot.createEvent("MouseEvents");
                        e.initMouseEvent(
                          "click",
                          !0,
                          !0,
                          wi,
                          1,
                          n.screenX,
                          n.screenY,
                          n.clientX,
                          n.clientY,
                          !1,
                          !1,
                          !1,
                          !1,
                          0,
                          null
                        ),
                          t.target.dispatchEvent(e);
                      }
                  })),
                (Z.isDragging = Z.isGesturing = Z.isPressed = !1),
                l && !C && H.restart(!0),
                d && r && d(Z),
                v && v(Z, r);
            }
          },
          vt = function (t) {
            return (
              t.touches &&
              t.touches.length > 1 &&
              (Z.isGesturing = !0) &&
              D(t, Z.isDragging)
            );
          },
          _t = function () {
            return (Z.isGesturing = !1), R(Z);
          },
          yt = function (t) {
            if (!ct(t)) {
              var e = J(),
                r = tt();
              ft((e - et) * F, (r - rt) * F, 1),
                (et = e),
                (rt = r),
                l && H.restart(!0);
            }
          },
          wt = function (t) {
            if (!ct(t)) {
              (t = Qi(t, a)), z && (V = !0);
              var e =
                (1 === t.deltaMode
                  ? o
                  : 2 === t.deltaMode
                  ? wi.innerHeight
                  : 1) * h;
              ft(t.deltaX * e, t.deltaY * e, 0), l && !C && H.restart(!0);
            }
          },
          bt = function (t) {
            if (!ct(t)) {
              var e = t.clientX,
                r = t.clientY,
                n = e - Z.x,
                i = r - Z.y;
              (Z.x = e), (Z.y = r), (U = !0), (n || i) && pt(n, i);
            }
          },
          xt = function (t) {
            (Z.event = t), k(Z);
          },
          Tt = function (t) {
            (Z.event = t), E(Z);
          },
          St = function (t) {
            return ct(t) || (Qi(t, a) && N(Z));
          };
        (H = Z._dc =
          _i
            .delayedCall(u || 0.25, function () {
              Z._vx.reset(), Z._vy.reset(), H.pause(), l && l(Z);
            })
            .pause()),
          (Z.deltaX = Z.deltaY = 0),
          (Z._vx = Zi(0, 50, !0)),
          (Z._vy = Zi(0, 50, !0)),
          (Z.scrollX = J),
          (Z.scrollY = tt),
          (Z.isDragging = Z.isGesturing = Z.isPressed = !1),
          Pi(this),
          (Z.enable = function (t) {
            return (
              Z.isEnabled ||
                (qi(it ? ot : i, "scroll", Hi),
                n.indexOf("scroll") >= 0 && qi(it ? ot : i, "scroll", yt, a, X),
                n.indexOf("wheel") >= 0 && qi(i, "wheel", wt, a, X),
                ((n.indexOf("touch") >= 0 && Si) ||
                  n.indexOf("pointer") >= 0) &&
                  (qi(i, Ai[0], gt, a, X),
                  qi(ot, Ai[2], mt),
                  qi(ot, Ai[3], mt),
                  q && qi(i, "click", ut, !1, !0),
                  N && qi(i, "click", St),
                  D && qi(ot, "gesturestart", vt),
                  R && qi(ot, "gestureend", _t),
                  k && qi(i, Mi + "enter", xt),
                  E && qi(i, Mi + "leave", Tt),
                  A && qi(i, Mi + "move", bt)),
                (Z.isEnabled = !0),
                t && t.type && gt(t),
                L && L(Z)),
              Z
            );
          }),
          (Z.disable = function () {
            Z.isEnabled &&
              (Ri.filter(function (t) {
                return t !== Z && Xi(t.target);
              }).length || Bi(it ? ot : i, "scroll", Hi),
              Z.isPressed &&
                (Z._vx.reset(), Z._vy.reset(), Bi(C ? i : ot, Ai[1], dt, !0)),
              Bi(it ? ot : i, "scroll", yt, X),
              Bi(i, "wheel", wt, X),
              Bi(i, Ai[0], gt, X),
              Bi(ot, Ai[2], mt),
              Bi(ot, Ai[3], mt),
              Bi(i, "click", ut, !0),
              Bi(i, "click", St),
              Bi(ot, "gesturestart", vt),
              Bi(ot, "gestureend", _t),
              Bi(i, Mi + "enter", xt),
              Bi(i, Mi + "leave", Tt),
              Bi(i, Mi + "move", bt),
              (Z.isEnabled = Z.isPressed = Z.isDragging = !1),
              Y && Y(Z));
          }),
          (Z.kill = Z.revert =
            function () {
              Z.disable();
              var t = Ri.indexOf(Z);
              t >= 0 && Ri.splice(t, 1), Ei === Z && (Ei = 0);
            }),
          Ri.push(Z),
          C && Xi(i) && (Ei = Z),
          Z.enable(f);
      }),
      (e = t),
      (r = [
        {
          key: "velocityX",
          get: function () {
            return this._vx.getVelocity();
          },
        },
        {
          key: "velocityY",
          get: function () {
            return this._vy.getVelocity();
          },
        },
      ]) && vi(e.prototype, r),
      n && vi(e, n),
      t
    );
  })();
  (eo.version = "3.11.4"),
    (eo.create = function (t) {
      return new eo(t);
    }),
    (eo.register = to),
    (eo.getAll = function () {
      return Ri.slice();
    }),
    (eo.getById = function (t) {
      return Ri.filter(function (e) {
        return e.vars.id === t;
      })[0];
    }),
    Ci() && _i.registerPlugin(eo);
  var ro,
    no,
    io,
    oo,
    so,
    ao,
    lo,
    uo,
    co,
    ho,
    fo,
    po,
    go,
    mo,
    vo,
    _o,
    yo,
    wo,
    bo,
    xo,
    To,
    So,
    Mo,
    Oo,
    ko,
    Eo,
    Ao,
    Po,
    Co,
    Do,
    Ro,
    zo,
    Lo,
    Yo,
    No = 1,
    Fo = Date.now,
    Xo = Fo(),
    qo = 0,
    Bo = 0,
    Io = function () {
      return (mo = 1);
    },
    Wo = function () {
      return (mo = 0);
    },
    Ho = function (t) {
      return t;
    },
    jo = function (t) {
      return Math.round(1e5 * t) / 1e5 || 0;
    },
    Uo = function () {
      return "undefined" != typeof window;
    },
    Vo = function () {
      return ro || (Uo() && (ro = window.gsap) && ro.registerPlugin && ro);
    },
    Ko = function (t) {
      return !!~lo.indexOf(t);
    },
    Go = function (t) {
      return (
        Fi(t, "getBoundingClientRect") ||
        (Ko(t)
          ? function () {
              return (
                (sa.width = io.innerWidth), (sa.height = io.innerHeight), sa
              );
            }
          : function () {
              return bs(t);
            })
      );
    },
    Zo = function (t, e) {
      var r = e.s,
        n = e.d2,
        i = e.d,
        o = e.a;
      return (o = Fi(t, (r = "scroll" + n)))
        ? o() - Go(t)()[i]
        : Ko(t)
        ? (so[r] || ao[r]) -
          (io["inner" + n] || so["client" + n] || ao["client" + n])
        : t[r] - t["offset" + n];
    },
    Qo = function (t, e) {
      for (var r = 0; r < bo.length; r += 3)
        (!e || ~e.indexOf(bo[r + 1])) && t(bo[r], bo[r + 1], bo[r + 2]);
    },
    $o = function (t) {
      return "string" == typeof t;
    },
    Jo = function (t) {
      return "function" == typeof t;
    },
    ts = function (t) {
      return "number" == typeof t;
    },
    es = function (t) {
      return "object" == typeof t;
    },
    rs = function (t, e, r) {
      return t && t.progress(e ? 0 : 1) && r && t.pause();
    },
    ns = function (t, e) {
      if (t.enabled) {
        var r = e(t);
        r && r.totalTime && (t.callbackAnimation = r);
      }
    },
    is = Math.abs,
    os = "left",
    ss = "right",
    as = "bottom",
    ls = "width",
    us = "height",
    cs = "Right",
    hs = "Left",
    fs = "Top",
    ps = "Bottom",
    ds = "padding",
    gs = "margin",
    ms = "Width",
    vs = "Height",
    _s = "px",
    ys = function (t) {
      return io.getComputedStyle(t);
    },
    ws = function (t, e) {
      for (var r in e) r in t || (t[r] = e[r]);
      return t;
    },
    bs = function (t, e) {
      var r =
          e &&
          "matrix(1, 0, 0, 1, 0, 0)" !== ys(t)[vo] &&
          ro
            .to(t, {
              x: 0,
              y: 0,
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            })
            .progress(1),
        n = t.getBoundingClientRect();
      return r && r.progress(0).kill(), n;
    },
    xs = function (t, e) {
      var r = e.d2;
      return t["offset" + r] || t["client" + r] || 0;
    },
    Ts = function (t) {
      var e,
        r = [],
        n = t.labels,
        i = t.duration();
      for (e in n) r.push(n[e] / i);
      return r;
    },
    Ss = function (t) {
      var e = ro.utils.snap(t),
        r =
          Array.isArray(t) &&
          t.slice(0).sort(function (t, e) {
            return t - e;
          });
      return r
        ? function (t, n, i) {
            var o;
            if ((void 0 === i && (i = 0.001), !n)) return e(t);
            if (n > 0) {
              for (t -= i, o = 0; o < r.length; o++) if (r[o] >= t) return r[o];
              return r[o - 1];
            }
            for (o = r.length, t += i; o--; ) if (r[o] <= t) return r[o];
            return r[0];
          }
        : function (r, n, i) {
            void 0 === i && (i = 0.001);
            var o = e(r);
            return !n || Math.abs(o - r) < i || o - r < 0 == n < 0
              ? o
              : e(n < 0 ? r - t : r + t);
          };
    },
    Ms = function (t, e, r, n) {
      return r.split(",").forEach(function (r) {
        return t(e, r, n);
      });
    },
    Os = function (t, e, r, n, i) {
      return t.addEventListener(e, r, {passive: !n, capture: !!i});
    },
    ks = function (t, e, r, n) {
      return t.removeEventListener(e, r, !!n);
    },
    Es = function (t, e, r) {
      return r && r.wheelHandler && t(e, "wheel", r);
    },
    As = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal",
    },
    Ps = {toggleActions: "play", anticipatePin: 0},
    Cs = {top: 0, left: 0, center: 0.5, bottom: 1, right: 1},
    Ds = function (t, e) {
      if ($o(t)) {
        var r = t.indexOf("="),
          n = ~r ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0;
        ~r && (t.indexOf("%") > r && (n *= e / 100), (t = t.substr(0, r - 1))),
          (t =
            n +
            (t in Cs
              ? Cs[t] * e
              : ~t.indexOf("%")
              ? (parseFloat(t) * e) / 100
              : parseFloat(t) || 0));
      }
      return t;
    },
    Rs = function (t, e, r, n, i, o, s, a) {
      var l = i.startColor,
        u = i.endColor,
        c = i.fontSize,
        h = i.indent,
        f = i.fontWeight,
        p = oo.createElement("div"),
        d = Ko(r) || "fixed" === Fi(r, "pinType"),
        g = -1 !== t.indexOf("scroller"),
        m = d ? ao : r,
        v = -1 !== t.indexOf("start"),
        _ = v ? l : u,
        y =
          "border-color:" +
          _ +
          ";font-size:" +
          c +
          ";color:" +
          _ +
          ";font-weight:" +
          f +
          ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return (
        (y += "position:" + ((g || a) && d ? "fixed;" : "absolute;")),
        (g || a || !d) &&
          (y += (n === Vi ? ss : as) + ":" + (o + parseFloat(h)) + "px;"),
        s &&
          (y +=
            "box-sizing:border-box;text-align:left;width:" +
            s.offsetWidth +
            "px;"),
        (p._isStart = v),
        p.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")),
        (p.style.cssText = y),
        (p.innerText = e || 0 === e ? t + "-" + e : t),
        m.children[0] ? m.insertBefore(p, m.children[0]) : m.appendChild(p),
        (p._offset = p["offset" + n.op.d2]),
        zs(p, 0, n, v),
        p
      );
    },
    zs = function (t, e, r, n) {
      var i = {display: "block"},
        o = r[n ? "os2" : "p2"],
        s = r[n ? "p2" : "os2"];
      (t._isFlipped = n),
        (i[r.a + "Percent"] = n ? -100 : 0),
        (i[r.a] = n ? "1px" : 0),
        (i["border" + o + ms] = 1),
        (i["border" + s + ms] = 0),
        (i[r.p] = e + "px"),
        ro.set(t, i);
    },
    Ls = [],
    Ys = {},
    Ns = function () {
      return Fo() - qo > 34 && (Ro || (Ro = requestAnimationFrame(Js)));
    },
    Fs = function () {
      (!Mo || !Mo.isPressed || Mo.startX > ao.clientWidth) &&
        (zi.cache++,
        Mo ? Ro || (Ro = requestAnimationFrame(Js)) : Js(),
        qo || Hs("scrollStart"),
        (qo = Fo()));
    },
    Xs = function () {
      (Eo = io.innerWidth), (ko = io.innerHeight);
    },
    qs = function () {
      zi.cache++,
        !go &&
          !So &&
          !oo.fullscreenElement &&
          !oo.webkitFullscreenElement &&
          (!Oo ||
            Eo !== io.innerWidth ||
            Math.abs(io.innerHeight - ko) > 0.25 * io.innerHeight) &&
          uo.restart(!0);
    },
    Bs = {},
    Is = [],
    Ws = function t() {
      return ks(ha, "scrollEnd", t) || Zs(!0);
    },
    Hs = function (t) {
      return (
        (Bs[t] &&
          Bs[t].map(function (t) {
            return t();
          })) ||
        Is
      );
    },
    js = [],
    Us = function (t) {
      for (var e = 0; e < js.length; e += 5)
        (!t || (js[e + 4] && js[e + 4].query === t)) &&
          ((js[e].style.cssText = js[e + 1]),
          js[e].getBBox && js[e].setAttribute("transform", js[e + 2] || ""),
          (js[e + 3].uncache = 1));
    },
    Vs = function (t, e) {
      var r;
      for (_o = 0; _o < Ls.length; _o++)
        !(r = Ls[_o]) ||
          (e && r._ctx !== e) ||
          (t ? r.kill(1) : r.revert(!0, !0));
      e && Us(e), e || Hs("revert");
    },
    Ks = function (t, e) {
      zi.cache++,
        (e || !zo) &&
          zi.forEach(function (t) {
            return Jo(t) && t.cacheID++ && (t.rec = 0);
          }),
        $o(t) && (io.history.scrollRestoration = Co = t);
    },
    Gs = 0,
    Zs = function (t, e) {
      if (!qo || t) {
        (zo = ha.isRefreshing = !0),
          zi.forEach(function (t) {
            return Jo(t) && t.cacheID++ && (t.rec = t());
          });
        var r = Hs("refreshInit");
        xo && ha.sort(),
          e || Vs(),
          zi.forEach(function (t) {
            Jo(t) &&
              (t.smooth && (t.target.style.scrollBehavior = "auto"), t(0));
          }),
          Ls.slice(0).forEach(function (t) {
            return t.refresh();
          }),
          Ls.forEach(function (t, e) {
            if (t._subPinOffset && t.pin) {
              var r = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
                n = t.pin[r];
              t.revert(!0, 1),
                t.adjustPinSpacing(t.pin[r] - n),
                t.revert(!1, 1);
            }
          }),
          Ls.forEach(function (t) {
            return (
              "max" === t.vars.end &&
              t.setPositions(
                t.start,
                Math.max(t.start + 1, Zo(t.scroller, t._dir))
              )
            );
          }),
          r.forEach(function (t) {
            return t && t.render && t.render(-1);
          }),
          zi.forEach(function (t) {
            Jo(t) &&
              (t.smooth &&
                requestAnimationFrame(function () {
                  return (t.target.style.scrollBehavior = "smooth");
                }),
              t.rec && t(t.rec));
          }),
          Ks(Co, 1),
          uo.pause(),
          Gs++,
          Js(2),
          Ls.forEach(function (t) {
            return Jo(t.vars.onRefresh) && t.vars.onRefresh(t);
          }),
          (zo = ha.isRefreshing = !1),
          Hs("refresh");
      } else Os(ha, "scrollEnd", Ws);
    },
    Qs = 0,
    $s = 1,
    Js = function (t) {
      if (!zo || 2 === t) {
        (ha.isUpdating = !0), Yo && Yo.update(0);
        var e = Ls.length,
          r = Fo(),
          n = r - Xo >= 50,
          i = e && Ls[0].scroll();
        if (
          (($s = Qs > i ? -1 : 1),
          (Qs = i),
          n &&
            (qo && !mo && r - qo > 200 && ((qo = 0), Hs("scrollEnd")),
            (fo = Xo),
            (Xo = r)),
          $s < 0)
        ) {
          for (_o = e; _o-- > 0; ) Ls[_o] && Ls[_o].update(0, n);
          $s = 1;
        } else for (_o = 0; _o < e; _o++) Ls[_o] && Ls[_o].update(0, n);
        ha.isUpdating = !1;
      }
      Ro = 0;
    },
    ta = [
      os,
      "top",
      as,
      ss,
      gs + ps,
      gs + cs,
      gs + fs,
      gs + hs,
      "display",
      "flexShrink",
      "float",
      "zIndex",
      "gridColumnStart",
      "gridColumnEnd",
      "gridRowStart",
      "gridRowEnd",
      "gridArea",
      "justifySelf",
      "alignSelf",
      "placeSelf",
      "order",
    ],
    ea = ta.concat([
      ls,
      us,
      "boxSizing",
      "max" + ms,
      "max" + vs,
      "position",
      gs,
      ds,
      ds + fs,
      ds + cs,
      ds + ps,
      ds + hs,
    ]),
    ra = function (t, e, r, n) {
      if (!t._gsap.swappedIn) {
        for (var i, o = ta.length, s = e.style, a = t.style; o--; )
          s[(i = ta[o])] = r[i];
        (s.position = "absolute" === r.position ? "absolute" : "relative"),
          "inline" === r.display && (s.display = "inline-block"),
          (a[as] = a[ss] = "auto"),
          (s.flexBasis = r.flexBasis || "auto"),
          (s.overflow = "visible"),
          (s.boxSizing = "border-box"),
          (s[ls] = xs(t, Ui) + _s),
          (s[us] = xs(t, Vi) + _s),
          (s[ds] = a[gs] = a.top = a[os] = "0"),
          ia(n),
          (a[ls] = a["max" + ms] = r[ls]),
          (a[us] = a["max" + vs] = r[us]),
          (a[ds] = r[ds]),
          t.parentNode !== e &&
            (t.parentNode.insertBefore(e, t), e.appendChild(t)),
          (t._gsap.swappedIn = !0);
      }
    },
    na = /([A-Z])/g,
    ia = function (t) {
      if (t) {
        var e,
          r,
          n = t.t.style,
          i = t.length,
          o = 0;
        for ((t.t._gsap || ro.core.getCache(t.t)).uncache = 1; o < i; o += 2)
          (r = t[o + 1]),
            (e = t[o]),
            r
              ? (n[e] = r)
              : n[e] && n.removeProperty(e.replace(na, "-$1").toLowerCase());
      }
    },
    oa = function (t) {
      for (var e = ea.length, r = t.style, n = [], i = 0; i < e; i++)
        n.push(ea[i], r[ea[i]]);
      return (n.t = t), n;
    },
    sa = {left: 0, top: 0},
    aa = function (t, e, r, n, i, o, s, a, l, u, c, h, f) {
      Jo(t) && (t = t(a)),
        $o(t) &&
          "max" === t.substr(0, 3) &&
          (t = h + ("=" === t.charAt(4) ? Ds("0" + t.substr(3), r) : 0));
      var p,
        d,
        g,
        m = f ? f.time() : 0;
      if ((f && f.seek(0), ts(t))) s && zs(s, r, n, !0);
      else {
        Jo(e) && (e = e(a));
        var v,
          _,
          y,
          w,
          b = (t || "0").split(" ");
        (g = Ki(e) || ao),
          ((v = bs(g) || {}) && (v.left || v.top)) ||
            "none" !== ys(g).display ||
            ((w = g.style.display),
            (g.style.display = "block"),
            (v = bs(g)),
            w ? (g.style.display = w) : g.style.removeProperty("display")),
          (_ = Ds(b[0], v[n.d])),
          (y = Ds(b[1] || "0", r)),
          (t = v[n.p] - l[n.p] - u + _ + i - y),
          s && zs(s, y, n, r - y < 20 || (s._isStart && y > 20)),
          (r -= r - y);
      }
      if (o) {
        var x = t + r,
          T = o._isStart;
        (p = "scroll" + n.d2),
          zs(
            o,
            x,
            n,
            (T && x > 20) ||
              (!T && (c ? Math.max(ao[p], so[p]) : o.parentNode[p]) <= x + 1)
          ),
          c &&
            ((l = bs(s)),
            c && (o.style[n.op.p] = l[n.op.p] - n.op.m - o._offset + _s));
      }
      return (
        f &&
          g &&
          ((p = bs(g)),
          f.seek(h),
          (d = bs(g)),
          (f._caScrollDist = p[n.p] - d[n.p]),
          (t = (t / f._caScrollDist) * h)),
        f && f.seek(m),
        f ? t : Math.round(t)
      );
    },
    la = /(webkit|moz|length|cssText|inset)/i,
    ua = function (t, e, r, n) {
      if (t.parentNode !== e) {
        var i,
          o,
          s = t.style;
        if (e === ao) {
          for (i in ((t._stOrig = s.cssText), (o = ys(t))))
            +i ||
              la.test(i) ||
              !o[i] ||
              "string" != typeof s[i] ||
              "0" === i ||
              (s[i] = o[i]);
          (s.top = r), (s.left = n);
        } else s.cssText = t._stOrig;
        (ro.core.getCache(t).uncache = 1), e.appendChild(t);
      }
    },
    ca = function (t, e) {
      var r,
        n,
        i = Gi(t, e),
        o = "_scroll" + e.p2,
        s = function e(s, a, l, u, c) {
          var h = e.tween,
            f = a.onComplete,
            p = {};
          return (
            (l = l || i()),
            (c = (u && c) || 0),
            (u = u || s - l),
            h && h.kill(),
            (r = Math.round(l)),
            (a[o] = s),
            (a.modifiers = p),
            (p[o] = function (t) {
              return (
                (t = Math.round(i())) !== r &&
                t !== n &&
                Math.abs(t - r) > 3 &&
                Math.abs(t - n) > 3
                  ? (h.kill(), (e.tween = 0))
                  : (t = l + u * h.ratio + c * h.ratio * h.ratio),
                (n = r),
                (r = Math.round(t))
              );
            }),
            (a.onUpdate = function () {
              zi.cache++, Js();
            }),
            (a.onComplete = function () {
              (e.tween = 0), f && f.call(h);
            }),
            (h = e.tween = ro.to(t, a))
          );
        };
      return (
        (t[o] = i),
        (i.wheelHandler = function () {
          return s.tween && s.tween.kill() && (s.tween = 0);
        }),
        Os(t, "wheel", i.wheelHandler),
        s
      );
    },
    ha = (function () {
      function t(e, r) {
        no ||
          t.register(ro) ||
          console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
          this.init(e, r);
      }
      return (
        (t.prototype.init = function (e, r) {
          if (
            ((this.progress = this.start = 0),
            this.vars && this.kill(!0, !0),
            Bo)
          ) {
            var n,
              i,
              o,
              s,
              a,
              l,
              u,
              c,
              h,
              f,
              p,
              d,
              g,
              m,
              v,
              _,
              y,
              w,
              b,
              x,
              T,
              S,
              M,
              O,
              k,
              E,
              A,
              P,
              C,
              D,
              R,
              z,
              L,
              Y,
              N,
              F,
              X,
              q,
              B,
              I,
              W,
              H,
              j = (e = ws($o(e) || ts(e) || e.nodeType ? {trigger: e} : e, Ps)),
              U = j.onUpdate,
              V = j.toggleClass,
              K = j.id,
              G = j.onToggle,
              Z = j.onRefresh,
              Q = j.scrub,
              $ = j.trigger,
              J = j.pin,
              tt = j.pinSpacing,
              et = j.invalidateOnRefresh,
              rt = j.anticipatePin,
              nt = j.onScrubComplete,
              it = j.onSnapComplete,
              ot = j.once,
              st = j.snap,
              at = j.pinReparent,
              lt = j.pinSpacer,
              ut = j.containerAnimation,
              ct = j.fastScrollEnd,
              ht = j.preventOverlaps,
              ft =
                e.horizontal || (e.containerAnimation && !1 !== e.horizontal)
                  ? Ui
                  : Vi,
              pt = !Q && 0 !== Q,
              dt = Ki(e.scroller || io),
              gt = ro.core.getCache(dt),
              mt = Ko(dt),
              vt =
                "fixed" ===
                ("pinType" in e
                  ? e.pinType
                  : Fi(dt, "pinType") || (mt && "fixed")),
              _t = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
              yt = pt && e.toggleActions.split(" "),
              wt = "markers" in e ? e.markers : Ps.markers,
              bt = mt ? 0 : parseFloat(ys(dt)["border" + ft.p2 + ms]) || 0,
              xt = this,
              Tt =
                e.onRefreshInit &&
                function () {
                  return e.onRefreshInit(xt);
                },
              St = (function (t, e, r) {
                var n = r.d,
                  i = r.d2,
                  o = r.a;
                return (o = Fi(t, "getBoundingClientRect"))
                  ? function () {
                      return o()[n];
                    }
                  : function () {
                      return (e ? io["inner" + i] : t["client" + i]) || 0;
                    };
              })(dt, mt, ft),
              Mt = (function (t, e) {
                return !e || ~Li.indexOf(t)
                  ? Go(t)
                  : function () {
                      return sa;
                    };
              })(dt, mt),
              Ot = 0,
              kt = 0,
              Et = Gi(dt, ft);
            if (
              (Po(xt),
              (xt._dir = ft),
              (rt *= 45),
              (xt.scroller = dt),
              (xt.scroll = ut ? ut.time.bind(ut) : Et),
              (s = Et()),
              (xt.vars = e),
              (r = r || e.animation),
              "refreshPriority" in e &&
                ((xo = 1), -9999 === e.refreshPriority && (Yo = xt)),
              (gt.tweenScroll = gt.tweenScroll || {
                top: ca(dt, Vi),
                left: ca(dt, Ui),
              }),
              (xt.tweenTo = n = gt.tweenScroll[ft.p]),
              (xt.scrubDuration = function (t) {
                (z = ts(t) && t)
                  ? R
                    ? R.duration(t)
                    : (R = ro.to(r, {
                        ease: "expo",
                        totalProgress: "+=0.001",
                        duration: z,
                        paused: !0,
                        onComplete: function () {
                          return nt && nt(xt);
                        },
                      }))
                  : (R && R.progress(1).kill(), (R = 0));
              }),
              r &&
                ((r.vars.lazy = !1),
                r._initted ||
                  (!1 !== r.vars.immediateRender &&
                    !1 !== e.immediateRender &&
                    r.duration() &&
                    r.render(0, !0, !0)),
                (xt.animation = r.pause()),
                (r.scrollTrigger = xt),
                xt.scrubDuration(Q),
                (C = 0),
                K || (K = r.vars.id)),
              Ls.push(xt),
              st &&
                ((es(st) && !st.push) || (st = {snapTo: st}),
                "scrollBehavior" in ao.style &&
                  ro.set(mt ? [ao, so] : dt, {scrollBehavior: "auto"}),
                zi.forEach(function (t) {
                  return (
                    Jo(t) &&
                    t.target === (mt ? oo.scrollingElement || so : dt) &&
                    (t.smooth = !1)
                  );
                }),
                (o = Jo(st.snapTo)
                  ? st.snapTo
                  : "labels" === st.snapTo
                  ? (function (t) {
                      return function (e) {
                        return ro.utils.snap(Ts(t), e);
                      };
                    })(r)
                  : "labelsDirectional" === st.snapTo
                  ? ((I = r),
                    function (t, e) {
                      return Ss(Ts(I))(t, e.direction);
                    })
                  : !1 !== st.directional
                  ? function (t, e) {
                      return Ss(st.snapTo)(
                        t,
                        Fo() - kt < 500 ? 0 : e.direction
                      );
                    }
                  : ro.utils.snap(st.snapTo)),
                (L = st.duration || {min: 0.1, max: 2}),
                (L = es(L) ? ho(L.min, L.max) : ho(L, L)),
                (Y = ro
                  .delayedCall(st.delay || z / 2 || 0.1, function () {
                    var t = Et(),
                      e = Fo() - kt < 500,
                      i = n.tween;
                    if (
                      !(e || Math.abs(xt.getVelocity()) < 10) ||
                      i ||
                      mo ||
                      Ot === t
                    )
                      xt.isActive && Ot !== t && Y.restart(!0);
                    else {
                      var s = (t - l) / g,
                        a = r && !pt ? r.totalProgress() : s,
                        c = e ? 0 : ((a - D) / (Fo() - fo)) * 1e3 || 0,
                        h = ro.utils.clamp(-s, 1 - s, (is(c / 2) * c) / 0.185),
                        f = s + (!1 === st.inertia ? 0 : h),
                        p = ho(0, 1, o(f, xt)),
                        d = Math.round(l + p * g),
                        m = st,
                        v = m.onStart,
                        _ = m.onInterrupt,
                        y = m.onComplete;
                      if (t <= u && t >= l && d !== t) {
                        if (i && !i._initted && i.data <= is(d - t)) return;
                        !1 === st.inertia && (h = p - s),
                          n(
                            d,
                            {
                              duration: L(
                                is(
                                  (0.185 * Math.max(is(f - a), is(p - a))) /
                                    c /
                                    0.05 || 0
                                )
                              ),
                              ease: st.ease || "power3",
                              data: is(d - t),
                              onInterrupt: function () {
                                return Y.restart(!0) && _ && _(xt);
                              },
                              onComplete: function () {
                                xt.update(),
                                  (Ot = Et()),
                                  (C = D =
                                    r && !pt ? r.totalProgress() : xt.progress),
                                  it && it(xt),
                                  y && y(xt);
                              },
                            },
                            t,
                            h * g,
                            d - t - h * g
                          ),
                          v && v(xt, n.tween);
                      }
                    }
                  })
                  .pause())),
              K && (Ys[K] = xt),
              (B =
                ($ = xt.trigger = Ki($ || J)) && $._gsap && $._gsap.stRevert) &&
                (B = B(xt)),
              (J = !0 === J ? $ : Ki(J)),
              $o(V) && (V = {targets: $, className: V}),
              J &&
                (!1 === tt ||
                  tt === gs ||
                  (tt =
                    !(
                      !tt &&
                      J.parentNode &&
                      J.parentNode.style &&
                      "flex" === ys(J.parentNode).display
                    ) && ds),
                (xt.pin = J),
                (i = ro.core.getCache(J)).spacer
                  ? (m = i.pinState)
                  : (lt &&
                      ((lt = Ki(lt)) &&
                        !lt.nodeType &&
                        (lt = lt.current || lt.nativeElement),
                      (i.spacerIsNative = !!lt),
                      lt && (i.spacerState = oa(lt))),
                    (i.spacer = y = lt || oo.createElement("div")),
                    y.classList.add("pin-spacer"),
                    K && y.classList.add("pin-spacer-" + K),
                    (i.pinState = m = oa(J))),
                !1 !== e.force3D && ro.set(J, {force3D: !0}),
                (xt.spacer = y = i.spacer),
                (P = ys(J)),
                (M = P[tt + ft.os2]),
                (b = ro.getProperty(J)),
                (x = ro.quickSetter(J, ft.a, _s)),
                ra(J, y, P),
                (_ = oa(J))),
              wt)
            ) {
              (d = es(wt) ? ws(wt, As) : As),
                (f = Rs("scroller-start", K, dt, ft, d, 0)),
                (p = Rs("scroller-end", K, dt, ft, d, 0, f)),
                (w = f["offset" + ft.op.d2]);
              var At = Ki(Fi(dt, "content") || dt);
              (c = this.markerStart = Rs("start", K, At, ft, d, w, 0, ut)),
                (h = this.markerEnd = Rs("end", K, At, ft, d, w, 0, ut)),
                ut && (q = ro.quickSetter([c, h], ft.a, _s)),
                vt ||
                  (Li.length && !0 === Fi(dt, "fixedMarkers")) ||
                  ((H = ys((W = mt ? ao : dt)).position),
                  (W.style.position =
                    "absolute" === H || "fixed" === H ? H : "relative"),
                  ro.set([f, p], {force3D: !0}),
                  (k = ro.quickSetter(f, ft.a, _s)),
                  (A = ro.quickSetter(p, ft.a, _s)));
            }
            if (ut) {
              var Pt = ut.vars.onUpdate,
                Ct = ut.vars.onUpdateParams;
              ut.eventCallback("onUpdate", function () {
                xt.update(0, 0, 1), Pt && Pt.apply(Ct || []);
              });
            }
            (xt.previous = function () {
              return Ls[Ls.indexOf(xt) - 1];
            }),
              (xt.next = function () {
                return Ls[Ls.indexOf(xt) + 1];
              }),
              (xt.revert = function (t, e) {
                if (!e) return xt.kill(!0);
                var n = !1 !== t || !xt.enabled,
                  i = go;
                n !== xt.isReverted &&
                  (n &&
                    ((F = Math.max(Et(), xt.scroll.rec || 0)),
                    (N = xt.progress),
                    (X = r && r.progress())),
                  c &&
                    [c, h, f, p].forEach(function (t) {
                      return (t.style.display = n ? "none" : "block");
                    }),
                  n && ((go = 1), xt.update(n)),
                  !J ||
                    (at && xt.isActive) ||
                    (n
                      ? (function (t, e, r) {
                          ia(r);
                          var n = t._gsap;
                          if (n.spacerIsNative) ia(n.spacerState);
                          else if (t._gsap.swappedIn) {
                            var i = e.parentNode;
                            i && (i.insertBefore(t, e), i.removeChild(e));
                          }
                          t._gsap.swappedIn = !1;
                        })(J, y, m)
                      : ra(J, y, ys(J), O)),
                  n || xt.update(n),
                  (go = i),
                  (xt.isReverted = n));
              }),
              (xt.refresh = function (i, o) {
                if ((!go && xt.enabled) || o)
                  if (J && i && qo) Os(t, "scrollEnd", Ws);
                  else {
                    !zo && Tt && Tt(xt),
                      (go = 1),
                      (kt = Fo()),
                      n.tween && (n.tween.kill(), (n.tween = 0)),
                      R && R.pause(),
                      et && r && r.revert({kill: !1}).invalidate(),
                      xt.isReverted || xt.revert(!0, !0),
                      (xt._subPinOffset = !1);
                    for (
                      var d,
                        w,
                        x,
                        M,
                        k,
                        A,
                        P,
                        C,
                        D,
                        z,
                        L,
                        q = St(),
                        B = Mt(),
                        I = ut ? ut.duration() : Zo(dt, ft),
                        W = 0,
                        H = 0,
                        j = e.end,
                        U = e.endTrigger || $,
                        V =
                          e.start ||
                          (0 !== e.start && $ ? (J ? "0 0" : "0 100%") : 0),
                        K = (xt.pinnedContainer =
                          e.pinnedContainer && Ki(e.pinnedContainer)),
                        G = ($ && Math.max(0, Ls.indexOf(xt))) || 0,
                        Q = G;
                      Q--;

                    )
                      (A = Ls[Q]).end || A.refresh(0, 1) || (go = 1),
                        !(P = A.pin) ||
                          (P !== $ && P !== J) ||
                          A.isReverted ||
                          (z || (z = []), z.unshift(A), A.revert(!0, !0)),
                        A !== Ls[Q] && (G--, Q--);
                    for (
                      Jo(V) && (V = V(xt)),
                        l =
                          aa(V, $, q, ft, Et(), c, f, xt, B, bt, vt, I, ut) ||
                          (J ? -0.001 : 0),
                        Jo(j) && (j = j(xt)),
                        $o(j) &&
                          !j.indexOf("+=") &&
                          (~j.indexOf(" ")
                            ? (j = ($o(V) ? V.split(" ")[0] : "") + j)
                            : ((W = Ds(j.substr(2), q)),
                              (j = $o(V) ? V : l + W),
                              (U = $))),
                        u =
                          Math.max(
                            l,
                            aa(
                              j || (U ? "100% 0" : I),
                              U,
                              q,
                              ft,
                              Et() + W,
                              h,
                              p,
                              xt,
                              B,
                              bt,
                              vt,
                              I,
                              ut
                            )
                          ) || -0.001,
                        g = u - l || ((l -= 0.01) && 0.001),
                        W = 0,
                        Q = G;
                      Q--;

                    )
                      (P = (A = Ls[Q]).pin) &&
                        A.start - A._pinPush <= l &&
                        !ut &&
                        A.end > 0 &&
                        ((d = A.end - A.start),
                        ((P === $ && A.start - A._pinPush < l) || P === K) &&
                          !ts(V) &&
                          (W += d * (1 - A.progress)),
                        P === J && (H += d));
                    if (
                      ((l += W),
                      (u += W),
                      (xt._pinPush = H),
                      c &&
                        W &&
                        (((d = {})[ft.a] = "+=" + W),
                        K && (d[ft.p] = "-=" + Et()),
                        ro.set([c, h], d)),
                      J)
                    )
                      (d = ys(J)),
                        (M = ft === Vi),
                        (x = Et()),
                        (T = parseFloat(b(ft.a)) + H),
                        !I &&
                          u > 1 &&
                          ((L = {
                            style: (L = (mt ? oo.scrollingElement || so : dt)
                              .style),
                            value: L["overflow" + ft.a.toUpperCase()],
                          })["overflow" + ft.a.toUpperCase()] = "scroll"),
                        ra(J, y, d),
                        (_ = oa(J)),
                        (w = bs(J, !0)),
                        (C = vt && Gi(dt, M ? Ui : Vi)()),
                        tt &&
                          (((O = [tt + ft.os2, g + H + _s]).t = y),
                          (Q = tt === ds ? xs(J, ft) + g + H : 0) &&
                            O.push(ft.d, Q + _s),
                          ia(O),
                          K &&
                            Ls.forEach(function (t) {
                              t.pin === K &&
                                !1 !== t.vars.pinSpacing &&
                                (t._subPinOffset = !0);
                            }),
                          vt && Et(F)),
                        vt &&
                          (((k = {
                            top: w.top + (M ? x - l : C) + _s,
                            left: w.left + (M ? C : x - l) + _s,
                            boxSizing: "border-box",
                            position: "fixed",
                          })[ls] = k["max" + ms] =
                            Math.ceil(w.width) + _s),
                          (k[us] = k["max" + vs] = Math.ceil(w.height) + _s),
                          (k[gs] =
                            k[gs + fs] =
                            k[gs + cs] =
                            k[gs + ps] =
                            k[gs + hs] =
                              "0"),
                          (k[ds] = d[ds]),
                          (k[ds + fs] = d[ds + fs]),
                          (k[ds + cs] = d[ds + cs]),
                          (k[ds + ps] = d[ds + ps]),
                          (k[ds + hs] = d[ds + hs]),
                          (v = (function (t, e, r) {
                            for (
                              var n, i = [], o = t.length, s = r ? 8 : 0;
                              s < o;
                              s += 2
                            )
                              (n = t[s]), i.push(n, n in e ? e[n] : t[s + 1]);
                            return (i.t = t.t), i;
                          })(m, k, at)),
                          zo && Et(0)),
                        r
                          ? ((D = r._initted),
                            To(1),
                            r.render(r.duration(), !0, !0),
                            (S = b(ft.a) - T + g + H),
                            (E = Math.abs(g - S) > 1),
                            vt && E && v.splice(v.length - 2, 2),
                            r.render(0, !0, !0),
                            D || r.invalidate(!0),
                            r.parent || r.totalTime(r.totalTime()),
                            To(0))
                          : (S = g),
                        L &&
                          (L.value
                            ? (L.style["overflow" + ft.a.toUpperCase()] =
                                L.value)
                            : L.style.removeProperty("overflow-" + ft.a));
                    else if ($ && Et() && !ut)
                      for (w = $.parentNode; w && w !== ao; )
                        w._pinOffset &&
                          ((l -= w._pinOffset), (u -= w._pinOffset)),
                          (w = w.parentNode);
                    z &&
                      z.forEach(function (t) {
                        return t.revert(!1, !0);
                      }),
                      (xt.start = l),
                      (xt.end = u),
                      (s = a = zo ? F : Et()),
                      ut || zo || (s < F && Et(F), (xt.scroll.rec = 0)),
                      xt.revert(!1, !0),
                      Y &&
                        ((Ot = -1),
                        xt.isActive && Et(l + g * N),
                        Y.restart(!0)),
                      (go = 0),
                      r &&
                        pt &&
                        (r._initted || X) &&
                        r.progress() !== X &&
                        r.progress(X, !0).render(r.time(), !0, !0),
                      (N !== xt.progress || ut) &&
                        (r && !pt && r.totalProgress(N, !0),
                        (xt.progress = (s - l) / g === N ? 0 : N)),
                      J && tt && (y._pinOffset = Math.round(xt.progress * S)),
                      Z && !zo && Z(xt);
                  }
              }),
              (xt.getVelocity = function () {
                return ((Et() - a) / (Fo() - fo)) * 1e3 || 0;
              }),
              (xt.endAnimation = function () {
                rs(xt.callbackAnimation),
                  r &&
                    (R
                      ? R.progress(1)
                      : r.paused()
                      ? pt || rs(r, xt.direction < 0, 1)
                      : rs(r, r.reversed()));
              }),
              (xt.labelToScroll = function (t) {
                return (
                  (r &&
                    r.labels &&
                    (l || xt.refresh() || l) +
                      (r.labels[t] / r.duration()) * g) ||
                  0
                );
              }),
              (xt.getTrailing = function (t) {
                var e = Ls.indexOf(xt),
                  r =
                    xt.direction > 0
                      ? Ls.slice(0, e).reverse()
                      : Ls.slice(e + 1);
                return (
                  $o(t)
                    ? r.filter(function (e) {
                        return e.vars.preventOverlaps === t;
                      })
                    : r
                ).filter(function (t) {
                  return xt.direction > 0 ? t.end <= l : t.start >= u;
                });
              }),
              (xt.update = function (t, e, i) {
                if (!ut || i || t) {
                  var o,
                    c,
                    h,
                    p,
                    d,
                    m,
                    w,
                    b = zo ? F : xt.scroll(),
                    O = t ? 0 : (b - l) / g,
                    P = O < 0 ? 0 : O > 1 ? 1 : O || 0,
                    z = xt.progress;
                  if (
                    (e &&
                      ((a = s),
                      (s = ut ? Et() : b),
                      st && ((D = C), (C = r && !pt ? r.totalProgress() : P))),
                    rt &&
                      !P &&
                      J &&
                      !go &&
                      !No &&
                      qo &&
                      l < b + ((b - a) / (Fo() - fo)) * rt &&
                      (P = 1e-4),
                    P !== z && xt.enabled)
                  ) {
                    if (
                      ((p =
                        (d =
                          (o = xt.isActive = !!P && P < 1) !==
                          (!!z && z < 1)) || !!P != !!z),
                      (xt.direction = P > z ? 1 : -1),
                      (xt.progress = P),
                      p &&
                        !go &&
                        ((c = P && !z ? 0 : 1 === P ? 1 : 1 === z ? 2 : 3),
                        pt &&
                          ((h =
                            (!d && "none" !== yt[c + 1] && yt[c + 1]) || yt[c]),
                          (w =
                            r &&
                            ("complete" === h || "reset" === h || h in r)))),
                      ht &&
                        (d || w) &&
                        (w || Q || !r) &&
                        (Jo(ht)
                          ? ht(xt)
                          : xt.getTrailing(ht).forEach(function (t) {
                              return t.endAnimation();
                            })),
                      pt ||
                        (!R || go || No
                          ? r && r.totalProgress(P, !!go)
                          : (R._dp._time - R._start !== R._time &&
                              R.render(R._dp._time - R._start),
                            R.resetTo
                              ? R.resetTo(
                                  "totalProgress",
                                  P,
                                  r._tTime / r._tDur
                                )
                              : ((R.vars.totalProgress = P),
                                R.invalidate().restart()))),
                      J)
                    )
                      if ((t && tt && (y.style[tt + ft.os2] = M), vt)) {
                        if (p) {
                          if (
                            ((m =
                              !t && P > z && u + 1 > b && b + 1 >= Zo(dt, ft)),
                            at)
                          )
                            if (t || (!o && !m)) ua(J, y);
                            else {
                              var L = bs(J, !0),
                                N = b - l;
                              ua(
                                J,
                                ao,
                                L.top + (ft === Vi ? N : 0) + _s,
                                L.left + (ft === Vi ? 0 : N) + _s
                              );
                            }
                          ia(o || m ? v : _),
                            (E && P < 1 && o) || x(T + (1 !== P || m ? 0 : S));
                        }
                      } else x(jo(T + S * P));
                    st && !n.tween && !go && !No && Y.restart(!0),
                      V &&
                        (d || (ot && P && (P < 1 || !Do))) &&
                        co(V.targets).forEach(function (t) {
                          return t.classList[o || ot ? "add" : "remove"](
                            V.className
                          );
                        }),
                      U && !pt && !t && U(xt),
                      p && !go
                        ? (pt &&
                            (w &&
                              ("complete" === h
                                ? r.pause().totalProgress(1)
                                : "reset" === h
                                ? r.restart(!0).pause()
                                : "restart" === h
                                ? r.restart(!0)
                                : r[h]()),
                            U && U(xt)),
                          (!d && Do) ||
                            (G && d && ns(xt, G),
                            _t[c] && ns(xt, _t[c]),
                            ot && (1 === P ? xt.kill(!1, 1) : (_t[c] = 0)),
                            d || (_t[(c = 1 === P ? 1 : 3)] && ns(xt, _t[c]))),
                          ct &&
                            !o &&
                            Math.abs(xt.getVelocity()) > (ts(ct) ? ct : 2500) &&
                            (rs(xt.callbackAnimation),
                            R
                              ? R.progress(1)
                              : rs(r, "reverse" === h ? 1 : !P, 1)))
                        : pt && U && !go && U(xt);
                  }
                  if (A) {
                    var X = ut
                      ? (b / ut.duration()) * (ut._caScrollDist || 0)
                      : b;
                    k(X + (f._isFlipped ? 1 : 0)), A(X);
                  }
                  q && q((-b / ut.duration()) * (ut._caScrollDist || 0));
                }
              }),
              (xt.enable = function (e, r) {
                xt.enabled ||
                  ((xt.enabled = !0),
                  Os(dt, "resize", qs),
                  Os(mt ? oo : dt, "scroll", Fs),
                  Tt && Os(t, "refreshInit", Tt),
                  !1 !== e && ((xt.progress = N = 0), (s = a = Ot = Et())),
                  !1 !== r && xt.refresh());
              }),
              (xt.getTween = function (t) {
                return t && n ? n.tween : R;
              }),
              (xt.setPositions = function (t, e) {
                J &&
                  ((T += t - l),
                  (S += e - t - g),
                  tt === ds && xt.adjustPinSpacing(e - t - g)),
                  (xt.start = l = t),
                  (xt.end = u = e),
                  (g = e - t),
                  xt.update();
              }),
              (xt.adjustPinSpacing = function (t) {
                if (O) {
                  var e = O.indexOf(ft.d) + 1;
                  (O[e] = parseFloat(O[e]) + t + _s),
                    (O[1] = parseFloat(O[1]) + t + _s),
                    ia(O);
                }
              }),
              (xt.disable = function (e, r) {
                if (
                  xt.enabled &&
                  (!1 !== e && xt.revert(!0, !0),
                  (xt.enabled = xt.isActive = !1),
                  r || (R && R.pause()),
                  (F = 0),
                  i && (i.uncache = 1),
                  Tt && ks(t, "refreshInit", Tt),
                  Y && (Y.pause(), n.tween && n.tween.kill() && (n.tween = 0)),
                  !mt)
                ) {
                  for (var o = Ls.length; o--; )
                    if (Ls[o].scroller === dt && Ls[o] !== xt) return;
                  ks(dt, "resize", qs), ks(dt, "scroll", Fs);
                }
              }),
              (xt.kill = function (t, n) {
                xt.disable(t, n), R && !n && R.kill(), K && delete Ys[K];
                var o = Ls.indexOf(xt);
                o >= 0 && Ls.splice(o, 1),
                  o === _o && $s > 0 && _o--,
                  (o = 0),
                  Ls.forEach(function (t) {
                    return t.scroller === xt.scroller && (o = 1);
                  }),
                  o || zo || (xt.scroll.rec = 0),
                  r &&
                    ((r.scrollTrigger = null),
                    t && r.revert({kill: !1}),
                    n || r.kill()),
                  c &&
                    [c, h, f, p].forEach(function (t) {
                      return t.parentNode && t.parentNode.removeChild(t);
                    }),
                  Yo === xt && (Yo = 0),
                  J &&
                    (i && (i.uncache = 1),
                    (o = 0),
                    Ls.forEach(function (t) {
                      return t.pin === J && o++;
                    }),
                    o || (i.spacer = 0)),
                  e.onKill && e.onKill(xt);
              }),
              xt.enable(!1, !1),
              B && B(xt),
              r && r.add && !g
                ? ro.delayedCall(0.01, function () {
                    return l || u || xt.refresh();
                  }) &&
                  (g = 0.01) &&
                  (l = u = 0)
                : xt.refresh(),
              J &&
                (function () {
                  if (Lo !== Gs) {
                    var t = (Lo = Gs);
                    requestAnimationFrame(function () {
                      return t === Gs && Zs(!0);
                    });
                  }
                })();
          } else this.update = this.refresh = this.kill = Ho;
        }),
        (t.register = function (e) {
          return (
            no ||
              ((ro = e || Vo()),
              Uo() && window.document && t.enable(),
              (no = Bo)),
            no
          );
        }),
        (t.defaults = function (t) {
          if (t) for (var e in t) Ps[e] = t[e];
          return Ps;
        }),
        (t.disable = function (t, e) {
          (Bo = 0),
            Ls.forEach(function (r) {
              return r[e ? "kill" : "disable"](t);
            }),
            ks(io, "wheel", Fs),
            ks(oo, "scroll", Fs),
            clearInterval(po),
            ks(oo, "touchcancel", Ho),
            ks(ao, "touchstart", Ho),
            Ms(ks, oo, "pointerdown,touchstart,mousedown", Io),
            Ms(ks, oo, "pointerup,touchend,mouseup", Wo),
            uo.kill(),
            Qo(ks);
          for (var r = 0; r < zi.length; r += 3)
            Es(ks, zi[r], zi[r + 1]), Es(ks, zi[r], zi[r + 2]);
        }),
        (t.enable = function () {
          if (
            ((io = window),
            (oo = document),
            (so = oo.documentElement),
            (ao = oo.body),
            ro &&
              ((co = ro.utils.toArray),
              (ho = ro.utils.clamp),
              (Po = ro.core.context || Ho),
              (To = ro.core.suppressOverwrites || Ho),
              (Co = io.history.scrollRestoration || "auto"),
              ro.core.globals("ScrollTrigger", t),
              ao))
          ) {
            (Bo = 1),
              eo.register(ro),
              (t.isTouch = eo.isTouch),
              (Ao =
                eo.isTouch &&
                /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
              Os(io, "wheel", Fs),
              (lo = [io, oo, so, ao]),
              ro.matchMedia
                ? ((t.matchMedia = function (t) {
                    var e,
                      r = ro.matchMedia();
                    for (e in t) r.add(e, t[e]);
                    return r;
                  }),
                  ro.addEventListener("matchMediaInit", function () {
                    return Vs();
                  }),
                  ro.addEventListener("matchMediaRevert", function () {
                    return Us();
                  }),
                  ro.addEventListener("matchMedia", function () {
                    Zs(0, 1), Hs("matchMedia");
                  }),
                  ro.matchMedia("(orientation: portrait)", function () {
                    return Xs(), Xs;
                  }))
                : console.warn("Requires GSAP 3.11.0 or later"),
              Xs(),
              Os(oo, "scroll", Fs);
            var e,
              r,
              n = ao.style,
              i = n.borderTopStyle,
              o = ro.core.Animation.prototype;
            for (
              o.revert ||
                Object.defineProperty(o, "revert", {
                  value: function () {
                    return this.time(-0.01, !0);
                  },
                }),
                n.borderTopStyle = "solid",
                e = bs(ao),
                Vi.m = Math.round(e.top + Vi.sc()) || 0,
                Ui.m = Math.round(e.left + Ui.sc()) || 0,
                i
                  ? (n.borderTopStyle = i)
                  : n.removeProperty("border-top-style"),
                po = setInterval(Ns, 250),
                ro.delayedCall(0.5, function () {
                  return (No = 0);
                }),
                Os(oo, "touchcancel", Ho),
                Os(ao, "touchstart", Ho),
                Ms(Os, oo, "pointerdown,touchstart,mousedown", Io),
                Ms(Os, oo, "pointerup,touchend,mouseup", Wo),
                vo = ro.utils.checkPrefix("transform"),
                ea.push(vo),
                no = Fo(),
                uo = ro.delayedCall(0.2, Zs).pause(),
                bo = [
                  oo,
                  "visibilitychange",
                  function () {
                    var t = io.innerWidth,
                      e = io.innerHeight;
                    oo.hidden
                      ? ((yo = t), (wo = e))
                      : (yo === t && wo === e) || qs();
                  },
                  oo,
                  "DOMContentLoaded",
                  Zs,
                  io,
                  "load",
                  Zs,
                  io,
                  "resize",
                  qs,
                ],
                Qo(Os),
                Ls.forEach(function (t) {
                  return t.enable(0, 1);
                }),
                r = 0;
              r < zi.length;
              r += 3
            )
              Es(ks, zi[r], zi[r + 1]), Es(ks, zi[r], zi[r + 2]);
          }
        }),
        (t.config = function (e) {
          "limitCallbacks" in e && (Do = !!e.limitCallbacks);
          var r = e.syncInterval;
          (r && clearInterval(po)) || ((po = r) && setInterval(Ns, r)),
            "ignoreMobileResize" in e &&
              (Oo = 1 === t.isTouch && e.ignoreMobileResize),
            "autoRefreshEvents" in e &&
              (Qo(ks) || Qo(Os, e.autoRefreshEvents || "none"),
              (So = -1 === (e.autoRefreshEvents + "").indexOf("resize")));
        }),
        (t.scrollerProxy = function (t, e) {
          var r = Ki(t),
            n = zi.indexOf(r),
            i = Ko(r);
          ~n && zi.splice(n, i ? 6 : 2),
            e && (i ? Li.unshift(io, e, ao, e, so, e) : Li.unshift(r, e));
        }),
        (t.clearMatchMedia = function (t) {
          Ls.forEach(function (e) {
            return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0);
          });
        }),
        (t.isInViewport = function (t, e, r) {
          var n = ($o(t) ? Ki(t) : t).getBoundingClientRect(),
            i = n[r ? ls : us] * e || 0;
          return r
            ? n.right - i > 0 && n.left + i < io.innerWidth
            : n.bottom - i > 0 && n.top + i < io.innerHeight;
        }),
        (t.positionInViewport = function (t, e, r) {
          $o(t) && (t = Ki(t));
          var n = t.getBoundingClientRect(),
            i = n[r ? ls : us],
            o =
              null == e
                ? i / 2
                : e in Cs
                ? Cs[e] * i
                : ~e.indexOf("%")
                ? (parseFloat(e) * i) / 100
                : parseFloat(e) || 0;
          return r
            ? (n.left + o) / io.innerWidth
            : (n.top + o) / io.innerHeight;
        }),
        (t.killAll = function (t) {
          if (
            (Ls.slice(0).forEach(function (t) {
              return "ScrollSmoother" !== t.vars.id && t.kill();
            }),
            !0 !== t)
          ) {
            var e = Bs.killAll || [];
            (Bs = {}),
              e.forEach(function (t) {
                return t();
              });
          }
        }),
        t
      );
    })();
  (ha.version = "3.11.4"),
    (ha.saveStyles = function (t) {
      return t
        ? co(t).forEach(function (t) {
            if (t && t.style) {
              var e = js.indexOf(t);
              e >= 0 && js.splice(e, 5),
                js.push(
                  t,
                  t.style.cssText,
                  t.getBBox && t.getAttribute("transform"),
                  ro.core.getCache(t),
                  Po()
                );
            }
          })
        : js;
    }),
    (ha.revert = function (t, e) {
      return Vs(!t, e);
    }),
    (ha.create = function (t, e) {
      return new ha(t, e);
    }),
    (ha.refresh = function (t) {
      return t ? qs() : (no || ha.register()) && Zs(!0);
    }),
    (ha.update = function (t) {
      return ++zi.cache && Js(!0 === t ? 2 : 0);
    }),
    (ha.clearScrollMemory = Ks),
    (ha.maxScroll = function (t, e) {
      return Zo(t, e ? Ui : Vi);
    }),
    (ha.getScrollFunc = function (t, e) {
      return Gi(Ki(t), e ? Ui : Vi);
    }),
    (ha.getById = function (t) {
      return Ys[t];
    }),
    (ha.getAll = function () {
      return Ls.filter(function (t) {
        return "ScrollSmoother" !== t.vars.id;
      });
    }),
    (ha.isScrolling = function () {
      return !!qo;
    }),
    (ha.snapDirectional = Ss),
    (ha.addEventListener = function (t, e) {
      var r = Bs[t] || (Bs[t] = []);
      ~r.indexOf(e) || r.push(e);
    }),
    (ha.removeEventListener = function (t, e) {
      var r = Bs[t],
        n = r && r.indexOf(e);
      n >= 0 && r.splice(n, 1);
    }),
    (ha.batch = function (t, e) {
      var r,
        n = [],
        i = {},
        o = e.interval || 0.016,
        s = e.batchMax || 1e9,
        a = function (t, e) {
          var r = [],
            n = [],
            i = ro
              .delayedCall(o, function () {
                e(r, n), (r = []), (n = []);
              })
              .pause();
          return function (t) {
            r.length || i.restart(!0),
              r.push(t.trigger),
              n.push(t),
              s <= r.length && i.progress(1);
          };
        };
      for (r in e)
        i[r] =
          "on" === r.substr(0, 2) && Jo(e[r]) && "onRefreshInit" !== r
            ? a(0, e[r])
            : e[r];
      return (
        Jo(s) &&
          ((s = s()),
          Os(ha, "refresh", function () {
            return (s = e.batchMax());
          })),
        co(t).forEach(function (t) {
          var e = {};
          for (r in i) e[r] = i[r];
          (e.trigger = t), n.push(ha.create(e));
        }),
        n
      );
    });
  var fa,
    pa = function (t, e, r, n) {
      return (
        e > n ? t(n) : e < 0 && t(0),
        r > n ? (n - e) / (r - e) : r < 0 ? e / (e - r) : 1
      );
    },
    da = function t(e, r) {
      !0 === r
        ? e.style.removeProperty("touch-action")
        : (e.style.touchAction =
            !0 === r
              ? "auto"
              : r
              ? "pan-" + r + (eo.isTouch ? " pinch-zoom" : "")
              : "none"),
        e === so && t(ao, r);
    },
    ga = {auto: 1, scroll: 1},
    ma = function (t) {
      var e,
        r = t.event,
        n = t.target,
        i = t.axis,
        o = (r.changedTouches ? r.changedTouches[0] : r).target,
        s = o._gsap || ro.core.getCache(o),
        a = Fo();
      if (!s._isScrollT || a - s._isScrollT > 2e3) {
        for (
          ;
          o &&
          o !== ao &&
          ((o.scrollHeight <= o.clientHeight &&
            o.scrollWidth <= o.clientWidth) ||
            (!ga[(e = ys(o)).overflowY] && !ga[e.overflowX]));

        )
          o = o.parentNode;
        (s._isScroll =
          o &&
          o !== n &&
          !Ko(o) &&
          (ga[(e = ys(o)).overflowY] || ga[e.overflowX])),
          (s._isScrollT = a);
      }
      (s._isScroll || "x" === i) && (r.stopPropagation(), (r._gsapAllow = !0));
    },
    va = function (t, e, r, n) {
      return eo.create({
        target: t,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: e,
        onWheel: (n = n && ma),
        onPress: n,
        onDrag: n,
        onScroll: n,
        onEnable: function () {
          return r && Os(oo, eo.eventTypes[0], ya, !1, !0);
        },
        onDisable: function () {
          return ks(oo, eo.eventTypes[0], ya, !0);
        },
      });
    },
    _a = /(input|label|select|textarea)/i,
    ya = function (t) {
      var e = _a.test(t.target.tagName);
      (e || fa) && ((t._gsapAllow = !0), (fa = e));
    },
    wa = function (t) {
      es(t) || (t = {}),
        (t.preventDefault = t.isNormalizer = t.allowClicks = !0),
        t.type || (t.type = "wheel,touch"),
        (t.debounce = !!t.debounce),
        (t.id = t.id || "normalizer");
      var e,
        r,
        n,
        i,
        o,
        s,
        a,
        l,
        u = t,
        c = u.normalizeScrollX,
        h = u.momentum,
        f = u.allowNestedScroll,
        p = Ki(t.target) || so,
        d = ro.core.globals().ScrollSmoother,
        g = d && d.get(),
        m =
          Ao &&
          ((t.content && Ki(t.content)) ||
            (g && !1 !== t.content && !g.smooth() && g.content())),
        v = Gi(p, Vi),
        _ = Gi(p, Ui),
        y = 1,
        w =
          (eo.isTouch && io.visualViewport
            ? io.visualViewport.scale * io.visualViewport.width
            : io.outerWidth) / io.innerWidth,
        b = 0,
        x = Jo(h)
          ? function () {
              return h(e);
            }
          : function () {
              return h || 2.8;
            },
        T = va(p, t.type, !0, f),
        S = function () {
          return (i = !1);
        },
        M = Ho,
        O = Ho,
        k = function () {
          (r = Zo(p, Vi)),
            (O = ho(Ao ? 1 : 0, r)),
            c && (M = ho(0, Zo(p, Ui))),
            (n = Gs);
        },
        E = function () {
          (m._gsap.y = jo(parseFloat(m._gsap.y) + v.offset) + "px"),
            (m.style.transform =
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
              parseFloat(m._gsap.y) +
              ", 0, 1)"),
            (v.offset = v.cacheID = 0);
        },
        A = function () {
          k(),
            o.isActive() &&
              o.vars.scrollY > r &&
              (v() > r ? o.progress(1) && v(r) : o.resetTo("scrollY", r));
        };
      return (
        m && ro.set(m, {y: "+=0"}),
        (t.ignoreCheck = function (t) {
          return (
            (Ao &&
              "touchmove" === t.type &&
              (function () {
                if (i) {
                  requestAnimationFrame(S);
                  var t = jo(e.deltaY / 2),
                    r = O(v.v - t);
                  if (m && r !== v.v + v.offset) {
                    v.offset = r - v.v;
                    var n = jo((parseFloat(m && m._gsap.y) || 0) - v.offset);
                    (m.style.transform =
                      "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                      n +
                      ", 0, 1)"),
                      (m._gsap.y = n + "px"),
                      (v.cacheID = zi.cache),
                      Js();
                  }
                  return !0;
                }
                v.offset && E(), (i = !0);
              })()) ||
            (y > 1.05 && "touchstart" !== t.type) ||
            e.isGesturing ||
            (t.touches && t.touches.length > 1)
          );
        }),
        (t.onPress = function () {
          var t = y;
          (y = jo(((io.visualViewport && io.visualViewport.scale) || 1) / w)),
            o.pause(),
            t !== y && da(p, y > 1.01 || (!c && "x")),
            (s = _()),
            (a = v()),
            k(),
            (n = Gs);
        }),
        (t.onRelease = t.onGestureStart =
          function (t, e) {
            if ((v.offset && E(), e)) {
              zi.cache++;
              var n,
                i,
                s = x();
              c &&
                ((i = (n = _()) + (0.05 * s * -t.velocityX) / 0.227),
                (s *= pa(_, n, i, Zo(p, Ui))),
                (o.vars.scrollX = M(i))),
                (i = (n = v()) + (0.05 * s * -t.velocityY) / 0.227),
                (s *= pa(v, n, i, Zo(p, Vi))),
                (o.vars.scrollY = O(i)),
                o.invalidate().duration(s).play(0.01),
                ((Ao && o.vars.scrollY >= r) || n >= r - 1) &&
                  ro.to({}, {onUpdate: A, duration: s});
            } else l.restart(!0);
          }),
        (t.onWheel = function () {
          o._ts && o.pause(), Fo() - b > 1e3 && ((n = 0), (b = Fo()));
        }),
        (t.onChange = function (t, e, r, i, o) {
          if (
            (Gs !== n && k(),
            e && c && _(M(i[2] === e ? s + (t.startX - t.x) : _() + e - i[1])),
            r)
          ) {
            v.offset && E();
            var l = o[2] === r,
              u = l ? a + t.startY - t.y : v() + r - o[1],
              h = O(u);
            l && u !== h && (a += h - u), v(h);
          }
          (r || e) && Js();
        }),
        (t.onEnable = function () {
          da(p, !c && "x"),
            ha.addEventListener("refresh", A),
            Os(io, "resize", A),
            v.smooth &&
              ((v.target.style.scrollBehavior = "auto"),
              (v.smooth = _.smooth = !1)),
            T.enable();
        }),
        (t.onDisable = function () {
          da(p, !0),
            ks(io, "resize", A),
            ha.removeEventListener("refresh", A),
            T.kill();
        }),
        (t.lockAxis = !1 !== t.lockAxis),
        ((e = new eo(t)).iOS = Ao),
        Ao && !v() && v(1),
        Ao && ro.ticker.add(Ho),
        (l = e._dc),
        (o = ro.to(e, {
          ease: "power4",
          paused: !0,
          scrollX: c ? "+=0.1" : "+=0",
          scrollY: "+=0.1",
          onComplete: l.vars.onComplete,
        })),
        e
      );
    };
  (ha.sort = function (t) {
    return Ls.sort(
      t ||
        function (t, e) {
          return (
            -1e6 * (t.vars.refreshPriority || 0) +
            t.start -
            (e.start + -1e6 * (e.vars.refreshPriority || 0))
          );
        }
    );
  }),
    (ha.observe = function (t) {
      return new eo(t);
    }),
    (ha.normalizeScroll = function (t) {
      if (void 0 === t) return Mo;
      if (!0 === t && Mo) return Mo.enable();
      if (!1 === t) return Mo && Mo.kill();
      var e = t instanceof eo ? t : wa(t);
      return (
        Mo && Mo.target === e.target && Mo.kill(), Ko(e.target) && (Mo = e), e
      );
    }),
    (ha.core = {
      _getVelocityProp: Zi,
      _inputObserver: va,
      _scrollers: zi,
      _proxies: Li,
      bridge: {
        ss: function () {
          qo || Hs("scrollStart"), (qo = Fo());
        },
        ref: function () {
          return go;
        },
      },
    }),
    Vo() && ro.registerPlugin(ha);
  var ba = {};
  (ba = (function () {
    "use strict";
    var t = document,
      e = t.createTextNode.bind(t);
    function r(t, e, r) {
      t.style.setProperty(e, r);
    }
    function n(t, e) {
      return t.appendChild(e);
    }
    function i(e, r, i, o) {
      var s = t.createElement("span");
      return (
        r && (s.className = r),
        i && (!o && s.setAttribute("data-" + r, i), (s.textContent = i)),
        (e && n(e, s)) || s
      );
    }
    function o(t, e) {
      return t.getAttribute("data-" + e);
    }
    function s(e, r) {
      return e && 0 != e.length
        ? e.nodeName
          ? [e]
          : [].slice.call(e[0].nodeName ? e : (r || t).querySelectorAll(e))
        : [];
    }
    function a(t) {
      for (var e = []; t--; ) e[t] = [];
      return e;
    }
    function l(t, e) {
      t && t.some(e);
    }
    function u(t) {
      return function (e) {
        return t[e];
      };
    }
    function c(t, e, n) {
      var i = "--" + e,
        o = i + "-index";
      l(n, function (t, e) {
        Array.isArray(t)
          ? l(t, function (t) {
              r(t, o, e);
            })
          : r(t, o, e);
      }),
        r(t, i + "-total", n.length);
    }
    var h = {};
    function f(t, e, r) {
      var n = r.indexOf(t);
      if (-1 == n)
        r.unshift(t),
          l(h[t].depends, function (e) {
            f(e, t, r);
          });
      else {
        var i = r.indexOf(e);
        r.splice(n, 1), r.splice(i, 0, t);
      }
      return r;
    }
    function p(t, e, r, n) {
      return {by: t, depends: e, key: r, split: n};
    }
    function d(t) {
      return f(t, 0, []).map(u(h));
    }
    function g(t) {
      h[t.by] = t;
    }
    function m(t, r, o, a, u) {
      t.normalize();
      var c = [],
        h = document.createDocumentFragment();
      a && c.push(t.previousSibling);
      var f = [];
      return (
        s(t.childNodes).some(function (t) {
          if (!t.tagName || t.hasChildNodes()) {
            if (t.childNodes && t.childNodes.length)
              return f.push(t), void c.push.apply(c, m(t, r, o, a, u));
            var n = t.wholeText || "",
              s = n.trim();
            s.length &&
              (" " === n[0] && f.push(e(" ")),
              l(s.split(o), function (t, e) {
                e && u && f.push(i(h, "whitespace", " ", u));
                var n = i(h, r, t);
                c.push(n), f.push(n);
              }),
              " " === n[n.length - 1] && f.push(e(" ")));
          } else f.push(t);
        }),
        l(f, function (t) {
          n(h, t);
        }),
        (t.innerHTML = ""),
        n(t, h),
        c
      );
    }
    var v = 0;
    function _(t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    }
    var y = "words",
      w = p(y, v, "word", function (t) {
        return m(t, "word", /\s+/, 0, 1);
      }),
      b = "chars",
      x = p(b, [y], "char", function (t, e, r) {
        var n = [];
        return (
          l(r[y], function (t, r) {
            n.push.apply(n, m(t, "char", "", e.whitespace && r));
          }),
          n
        );
      });
    function T(t) {
      var e = (t = t || {}).key;
      return s(t.target || "[data-splitting]").map(function (r) {
        var n = r["🍌"];
        if (!t.force && n) return n;
        n = r["🍌"] = {el: r};
        var i = d(t.by || o(r, "splitting") || b),
          s = _({}, t);
        return (
          l(i, function (t) {
            if (t.split) {
              var i = t.by,
                o = (e ? "-" + e : "") + t.key,
                a = t.split(r, s, n);
              o && c(r, o, a), (n[i] = a), r.classList.add(i);
            }
          }),
          r.classList.add("splitting"),
          n
        );
      });
    }
    function S(t) {
      var e = ((t = t || {}).target = i());
      return (e.innerHTML = t.content), T(t), e.outerHTML;
    }
    function M(t, e, r) {
      var n = s(e.matching || t.children, t),
        i = {};
      return (
        l(n, function (t) {
          var e = Math.round(t[r]);
          (i[e] || (i[e] = [])).push(t);
        }),
        Object.keys(i).map(Number).sort(O).map(u(i))
      );
    }
    function O(t, e) {
      return t - e;
    }
    (T.html = S), (T.add = g);
    var k = p("lines", [y], "line", function (t, e, r) {
        return M(t, {matching: r[y]}, "offsetTop");
      }),
      E = p("items", v, "item", function (t, e) {
        return s(e.matching || t.children, t);
      }),
      A = p("rows", v, "row", function (t, e) {
        return M(t, e, "offsetTop");
      }),
      P = p("cols", v, "col", function (t, e) {
        return M(t, e, "offsetLeft");
      }),
      C = p("grid", ["rows", "cols"]),
      D = "layout",
      R = p(D, v, v, function (t, e) {
        var a = (e.rows = +(e.rows || o(t, "rows") || 1)),
          l = (e.columns = +(e.columns || o(t, "columns") || 1));
        if (
          ((e.image = e.image || o(t, "image") || t.currentSrc || t.src),
          e.image)
        ) {
          var u = s("img", t)[0];
          e.image = u && (u.currentSrc || u.src);
        }
        e.image && r(t, "background-image", "url(" + e.image + ")");
        for (var c = a * l, h = [], f = i(v, "cell-grid"); c--; ) {
          var p = i(f, "cell");
          i(p, "cell-inner"), h.push(p);
        }
        return n(t, f), h;
      }),
      z = p("cellRows", [D], "row", function (t, e, r) {
        var n = e.rows,
          i = a(n);
        return (
          l(r[D], function (t, e, r) {
            i[Math.floor(e / (r.length / n))].push(t);
          }),
          i
        );
      }),
      L = p("cellColumns", [D], "col", function (t, e, r) {
        var n = e.columns,
          i = a(n);
        return (
          l(r[D], function (t, e) {
            i[e % n].push(t);
          }),
          i
        );
      }),
      Y = p("cells", ["cellRows", "cellColumns"], "cell", function (t, e, r) {
        return r[D];
      });
    return g(w), g(x), g(k), g(E), g(A), g(P), g(C), g(R), g(z), g(L), g(Y), T;
  })()),
    mi.registerPlugin(ha);
  const xa = (t, e, r) => {
    t.forEach(t => {
      const n = document.createElement(e);
      (n.classList = r), t.parentNode.appendChild(n), n.appendChild(t);
    });
  };
  t(ba)();
  const Ta = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect1]"
      ),
    ],
    Sa = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect2]"
      ),
    ],
    Ma = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect3]"
      ),
    ],
    Oa = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect4]"
      ),
    ],
    ka = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect5]"
      ),
    ],
    Ea = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect6]"
      ),
    ],
    Aa = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect7]"
      ),
    ],
    Pa = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect8]"
      ),
    ],
    Ca = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect9]"
      ),
    ],
    Da = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect10]"
      ),
    ],
    Ra = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect11]"
      ),
    ],
    za = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect12]"
      ),
    ],
    La = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect13]"
      ),
    ],
    Ya = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect14]"
      ),
    ],
    Na = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect15]"
      ),
    ];
  let Fa;
  var Xa;
  ((Xa = "cvn8slu"),
  new Promise(t => {
    WebFont.load({typekit: {id: Xa}, active: t});
  })).then(() => {
    document.body.classList.remove("loading"),
      (() => {
        (Fa = new h({lerp: 0.2, smooth: !0})),
          Fa.on("scroll", () => ha.update());
        const t = e => {
          Fa.raf(e), requestAnimationFrame(t);
        };
        requestAnimationFrame(t);
      })(),
      (() => {
        Ta.forEach(t => {
          const e = t.querySelectorAll(".char");
          mi.set(e, {
            "will-change": "opacity, transform",
            opacity: 0,
            scale: 0.6,
            rotationZ: () => mi.utils.random(-20, 20),
          }),
            mi.to(e, {
              ease: "power4",
              opacity: 1,
              scale: 1,
              rotation: 0,
              stagger: 0.4,
              scrollTrigger: {
                trigger: t,
                start: "center+=20% bottom",
                end: "+=50%",
                scrub: !0,
              },
            });
        }),
          Sa.forEach(t => {
            const e = t.querySelectorAll(".char");
            mi.set(e, {
              "will-change": "opacity, transform",
              opacity: 0,
              yPercent: 120,
              scaleY: 2.3,
              scaleX: 0.7,
              transformOrigin: "50% 0%",
            }),
              mi.to(e, {
                duration: 1,
                ease: "back.inOut(2)",
                opacity: 1,
                yPercent: 0,
                scaleY: 1,
                scaleX: 1,
                stagger: 0.03,
                scrollTrigger: {
                  trigger: t,
                  start: "center bottom+=50%",
                  end: "bottom top+=40%",
                  scrub: !0,
                },
              });
          }),
          Ma.forEach(t => {
            const e = t.querySelectorAll(".char");
            mi.set(e, {
              "will-change": "transform",
              transformOrigin: "50% 0%",
              scaleY: 0,
            }),
              mi.to(e, {
                ease: "back",
                opacity: 1,
                scaleY: 1,
                yPercent: 0,
                stagger: 0.03,
                scrollTrigger: {
                  trigger: t,
                  start: "center bottom-=5%",
                  end: "top top-=20%",
                  scrub: !0,
                },
              });
          }),
          Oa.forEach(t => {
            t.querySelectorAll(".word").forEach(t => {
              const e = t.querySelectorAll(".char");
              mi.set(e, {
                "will-change": "opacity, transform",
                x: (t, e, r) => 150 * (t - r.length / 2),
              }),
                mi.to(e, {
                  ease: "power1.inOut",
                  x: 0,
                  stagger: {grid: "auto", from: "center"},
                  scrollTrigger: {
                    trigger: t,
                    start: "center bottom+=30%",
                    end: "top top+=15%",
                    scrub: !0,
                  },
                });
            });
          }),
          ka.forEach(t => {
            const e = t.querySelectorAll(".char");
            mi.set(e, {
              "will-change": "opacity, transform",
              opacity: 0,
              xPercent: () => mi.utils.random(-200, 200),
              yPercent: () => mi.utils.random(-150, 150),
            }),
              mi.to(e, {
                ease: "power1.inOut",
                opacity: 1,
                xPercent: 0,
                yPercent: 0,
                stagger: {each: 0.05, grid: "auto", from: "random"},
                scrollTrigger: {
                  trigger: t,
                  start: "center bottom+=10%",
                  end: "bottom center",
                  scrub: 0.9,
                },
              });
          }),
          Ea.forEach(t => {
            t.querySelectorAll(".word").forEach(t => {
              const e = t.querySelectorAll(".char");
              mi.set(e[0].parentNode, {perspective: 1e3}),
                mi.set(e, {
                  "will-change": "opacity, transform",
                  opacity: 0,
                  rotationX: -90,
                  yPercent: 50,
                }),
                mi.to(e, {
                  ease: "power1.inOut",
                  opacity: 1,
                  rotationX: 0,
                  yPercent: 0,
                  stagger: {each: 0.03, from: 0},
                  scrollTrigger: {
                    trigger: t,
                    start: "center bottom+=40%",
                    end: "bottom center-=30%",
                    scrub: 0.9,
                  },
                });
            });
          }),
          Aa.forEach(t => {
            t.querySelectorAll(".word").forEach(t => {
              const e = t.querySelectorAll(".char");
              mi.set(e[0].parentNode, {perspective: 1e3}),
                mi.set(e, {
                  "will-change": "opacity, transform",
                  transformOrigin: "100% 50%",
                  opacity: 0,
                  rotationY: -90,
                  z: -300,
                }),
                mi.to(e, {
                  ease: "expo",
                  opacity: 1,
                  rotationY: 0,
                  z: 0,
                  stagger: {each: 0.06, from: "end"},
                  scrollTrigger: {
                    trigger: t,
                    start: "bottom bottom+=20%",
                    end: "bottom top",
                    scrub: 1,
                  },
                });
            });
          });
        const t = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "!",
          "@",
          "#",
          "$",
          "%",
          "^",
          "&",
          "*",
          "(",
          ")",
          "-",
          "_",
          "+",
          "=",
          "/",
          "\\",
          "|",
          "[",
          "]",
          "{",
          "}",
          ";",
          ":",
          "'",
          '"',
          "<",
          ">",
          ",",
        ];
        Pa.forEach(e => {
          const r = e.querySelectorAll(".char");
          mi.set(r, {opacity: 0}),
            r.forEach((r, n) => {
              let i = r.innerHTML;
              mi.to(r, {
                duration: 0.03,
                innerHTML: () => t[Math.floor(Math.random() * t.length)],
                repeat: 1,
                repeatRefresh: !0,
                opacity: 1,
                repeatDelay: 0.03,
                delay: 0.18 * (n + 1),
                onComplete: () => mi.set(r, {innerHTML: i, delay: 0.03}),
                scrollTrigger: {
                  trigger: e,
                  start: "top bottom",
                  end: "bottom center",
                  toggleActions: "play resume resume reset",
                  onEnter: () => mi.set(r, {opacity: 0}),
                },
              });
            });
        }),
          Ca.forEach(t => {
            t.querySelectorAll(".word").forEach(t => {
              const e = t.querySelectorAll(".char");
              mi.set(e, {
                "will-change": "transform",
                scaleX: 0,
                x: (t, e) =>
                  window.innerWidth / 2 - e.offsetLeft - e.offsetWidth / 2,
              }),
                mi.to(e, {
                  ease: "power1.inOut",
                  scaleX: 1,
                  x: 0,
                  scrollTrigger: {
                    trigger: t,
                    start: "top bottom",
                    end: "top top",
                    scrub: !0,
                  },
                });
            });
          }),
          Da.forEach(t => {
            const e = t.querySelectorAll(".char");
            mi.set(e, {
              "will-change": "opacity",
              opacity: 0,
              filter: "blur(20px)",
            }),
              mi.to(e, {
                duration: 0.25,
                ease: "power1.inOut",
                opacity: 1,
                filter: "blur(0px)",
                stagger: {each: 0.05, from: "random"},
                scrollTrigger: {
                  trigger: t,
                  start: "top bottom",
                  end: "center center",
                  toggleActions: "play resume resume reset",
                },
              });
          }),
          Ra.forEach(t => {
            const e = t.querySelectorAll(".char");
            xa(e, "span", "char-wrap"),
              mi.set(e, {
                "will-change": "transform",
                transformOrigin: "0% 50%",
                xPercent: 105,
              }),
              mi.to(e, {
                duration: 1,
                ease: "expo",
                xPercent: 0,
                stagger: 0.042,
                scrollTrigger: {
                  trigger: t,
                  start: "top bottom",
                  end: "top top+=10%",
                  toggleActions: "play resume resume reset",
                },
              });
          }),
          za.forEach(t => {
            const e = t.querySelectorAll(".char");
            xa(e, "span", "char-wrap"),
              mi.set(e, {
                "will-change": "transform",
                xPercent: -250,
                rotationZ: 45,
                scaleX: 6,
                transformOrigin: "100% 50%",
              }),
              mi.to(e, {
                duration: 1,
                ease: "power2",
                xPercent: 0,
                rotationZ: 0,
                scaleX: 1,
                stagger: -0.06,
                scrollTrigger: {
                  trigger: t,
                  start: "top bottom+=10%",
                  end: "bottom top+=10%",
                  scrub: !0,
                },
              });
          }),
          La.forEach(t => {
            const e = t.querySelectorAll(".char");
            mi.set(e[0].parentNode, {perspective: 1e3}),
              mi.set(e, {
                "will-change": "opacity, transform",
                opacity: 0,
                rotationY: 180,
                xPercent: -40,
                yPercent: 100,
              }),
              mi.to(e, {
                ease: "power4.inOut()",
                opacity: 1,
                rotationY: 0,
                xPercent: 0,
                yPercent: 0,
                stagger: {each: -0.03, from: 0},
                scrollTrigger: {
                  trigger: t,
                  start: "center bottom",
                  end: "bottom center-=30%",
                  scrub: 0.9,
                },
              });
          }),
          Ya.forEach(t => {
            const e = t.querySelectorAll(".char");
            mi.set(t, {"will-change": "transform", xPercent: 100}),
              mi.set(e, {"will-change": "transform", scale: 3, yPercent: -900}),
              mi.to(e, {
                ease: "back(2)",
                scale: 1,
                yPercent: 0,
                stagger: 0.05,
                scrollTrigger: {
                  trigger: t,
                  start: "center center",
                  end: "+=100%",
                  scrub: 1.9,
                },
              }),
              mi.to(t, {
                ease: "none",
                xPercent: 0,
                scrollTrigger: {
                  trigger: t,
                  scrub: !0,
                  start: "center center",
                  end: "+=100%",
                  pin: t.parentNode,
                },
              });
          }),
          Na.forEach(t => {
            const e = t.querySelectorAll(".char");
            mi.set(e[0].parentNode, {perspective: 1e3}),
              mi.set(t, {"will-change": "transform", xPercent: -80}),
              mi.set(e, {
                "will-change": "opacity, transform",
                transformOrigin: "50% 50% -200px",
                rotationX: 380,
                opacity: 0,
              }),
              mi.to(e, {
                ease: "expo.inOut",
                rotationX: 0,
                z: 0,
                opacity: 1,
                stagger: -0.03,
                scrollTrigger: {
                  trigger: t,
                  start: "center center",
                  end: "+=140%",
                  scrub: 1.2,
                },
              }),
              mi.to(t, {
                ease: "none",
                xPercent: 0,
                scrollTrigger: {
                  trigger: t,
                  scrub: !0,
                  start: "center center",
                  end: "+=100%",
                  pin: t.parentNode,
                },
              });
          });
      })();
  });
})();
