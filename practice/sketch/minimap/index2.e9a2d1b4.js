var t =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : {},
  e = {},
  i = {},
  n = t.parcelRequire5677;
null == n &&
  (((n = function (t) {
    if (t in e) return e[t].exports;
    if (t in i) {
      var n = i[t];
      delete i[t];
      var r = { id: t, exports: {} };
      return (e[t] = r), n.call(r.exports, r, r.exports), r.exports;
    }
    var s = new Error("Cannot find module '" + t + "'");
    throw ((s.code = "MODULE_NOT_FOUND"), s);
  }).register = function (t, e) {
    i[t] = e;
  }),
  (t.parcelRequire5677 = n)),
  n.register("4hJWI", function (t, e) {
    !(function (e, i) {
      t.exports ? (t.exports = i()) : (e.EvEmitter = i());
    })("undefined" != typeof window ? window : t.exports, function () {
      function t() {}
      let e = t.prototype;
      return (
        (e.on = function (t, e) {
          if (!t || !e) return this;
          let i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return n.includes(e) || n.push(e), this;
        }),
        (e.once = function (t, e) {
          if (!t || !e) return this;
          this.on(t, e);
          let i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }),
        (e.off = function (t, e) {
          let i = this._events && this._events[t];
          if (!i || !i.length) return this;
          let n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }),
        (e.emitEvent = function (t, e) {
          let i = this._events && this._events[t];
          if (!i || !i.length) return this;
          (i = i.slice(0)), (e = e || []);
          let n = this._onceEvents && this._onceEvents[t];
          for (let r of i) {
            n && n[r] && (this.off(t, r), delete n[r]), r.apply(this, e);
          }
          return this;
        }),
        (e.allOff = function () {
          return delete this._events, delete this._onceEvents, this;
        }),
        t
      );
    });
  });
var r = {};
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */ !(function (t, e) {
  r ? (r = e(t, n("4hJWI"))) : (t.imagesLoaded = e(t, t.EvEmitter));
})("undefined" != typeof window ? window : r, function (t, e) {
  let i = t.jQuery,
    n = t.console;
  function r(t, e, s) {
    if (!(this instanceof r)) return new r(t, e, s);
    let o = t;
    var a;
    ("string" == typeof t && (o = document.querySelectorAll(t)), o)
      ? ((this.elements =
          ((a = o),
          Array.isArray(a)
            ? a
            : "object" == typeof a && "number" == typeof a.length
            ? [...a]
            : [a])),
        (this.options = {}),
        "function" == typeof e ? (s = e) : Object.assign(this.options, e),
        s && this.on("always", s),
        this.getImages(),
        i && (this.jqDeferred = new i.Deferred()),
        setTimeout(this.check.bind(this)))
      : n.error(`Bad element for imagesLoaded ${o || t}`);
  }
  (r.prototype = Object.create(e.prototype)),
    (r.prototype.getImages = function () {
      (this.images = []), this.elements.forEach(this.addElementImages, this);
    });
  const s = [1, 9, 11];
  r.prototype.addElementImages = function (t) {
    "IMG" === t.nodeName && this.addImage(t),
      !0 === this.options.background && this.addElementBackgroundImages(t);
    let { nodeType: e } = t;
    if (!e || !s.includes(e)) return;
    let i = t.querySelectorAll("img");
    for (let t of i) this.addImage(t);
    if ("string" == typeof this.options.background) {
      let e = t.querySelectorAll(this.options.background);
      for (let t of e) this.addElementBackgroundImages(t);
    }
  };
  const o = /url\((['"])?(.*?)\1\)/gi;
  function a(t) {
    this.img = t;
  }
  function h(t, e) {
    (this.url = t), (this.element = e), (this.img = new Image());
  }
  return (
    (r.prototype.addElementBackgroundImages = function (t) {
      let e = getComputedStyle(t);
      if (!e) return;
      let i = o.exec(e.backgroundImage);
      for (; null !== i; ) {
        let n = i && i[2];
        n && this.addBackground(n, t), (i = o.exec(e.backgroundImage));
      }
    }),
    (r.prototype.addImage = function (t) {
      let e = new a(t);
      this.images.push(e);
    }),
    (r.prototype.addBackground = function (t, e) {
      let i = new h(t, e);
      this.images.push(i);
    }),
    (r.prototype.check = function () {
      if (
        ((this.progressedCount = 0),
        (this.hasAnyBroken = !1),
        !this.images.length)
      )
        return void this.complete();
      let t = (t, e, i) => {
        setTimeout(() => {
          this.progress(t, e, i);
        });
      };
      this.images.forEach(function (e) {
        e.once("progress", t), e.check();
      });
    }),
    (r.prototype.progress = function (t, e, i) {
      this.progressedCount++,
        (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
        this.emitEvent("progress", [this, t, e]),
        this.jqDeferred &&
          this.jqDeferred.notify &&
          this.jqDeferred.notify(this, t),
        this.progressedCount === this.images.length && this.complete(),
        this.options.debug && n && n.log(`progress: ${i}`, t, e);
    }),
    (r.prototype.complete = function () {
      let t = this.hasAnyBroken ? "fail" : "done";
      if (
        ((this.isComplete = !0),
        this.emitEvent(t, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred)
      ) {
        let t = this.hasAnyBroken ? "reject" : "resolve";
        this.jqDeferred[t](this);
      }
    }),
    (a.prototype = Object.create(e.prototype)),
    (a.prototype.check = function () {
      this.getIsImageComplete()
        ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
        : ((this.proxyImage = new Image()),
          this.img.crossOrigin &&
            (this.proxyImage.crossOrigin = this.img.crossOrigin),
          this.proxyImage.addEventListener("load", this),
          this.proxyImage.addEventListener("error", this),
          this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.proxyImage.src = this.img.currentSrc || this.img.src));
    }),
    (a.prototype.getIsImageComplete = function () {
      return this.img.complete && this.img.naturalWidth;
    }),
    (a.prototype.confirm = function (t, e) {
      this.isLoaded = t;
      let { parentNode: i } = this.img,
        n = "PICTURE" === i.nodeName ? i : this.img;
      this.emitEvent("progress", [this, n, e]);
    }),
    (a.prototype.handleEvent = function (t) {
      let e = "on" + t.type;
      this[e] && this[e](t);
    }),
    (a.prototype.onload = function () {
      this.confirm(!0, "onload"), this.unbindEvents();
    }),
    (a.prototype.onerror = function () {
      this.confirm(!1, "onerror"), this.unbindEvents();
    }),
    (a.prototype.unbindEvents = function () {
      this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this);
    }),
    (h.prototype = Object.create(a.prototype)),
    (h.prototype.check = function () {
      this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        (this.img.src = this.url),
        this.getIsImageComplete() &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
    }),
    (h.prototype.unbindEvents = function () {
      this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this);
    }),
    (h.prototype.confirm = function (t, e) {
      (this.isLoaded = t), this.emitEvent("progress", [this, this.element, e]);
    }),
    (r.makeJQueryPlugin = function (e) {
      (e = e || t.jQuery) &&
        ((i = e),
        (i.fn.imagesLoaded = function (t, e) {
          return new r(this, t, e).jqDeferred.promise(i(this));
        }));
    }),
    r.makeJQueryPlugin(),
    r
  );
});
const s = (t, e, i) => (1 - i) * t + i * e,
  o = (t, e, i, n, r) => ((t - e) * (r - n)) / (i - e) + n,
  a = (t, e, i) => {
    t.forEach((t) => {
      const n = document.createElement(e);
      (n.classList = i), t.parentNode.appendChild(n), n.appendChild(t);
    });
  };
function h(t, e, i) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = i),
    t
  );
}
function u(t) {
  if (void 0 === t)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return t;
}
function l(t, e) {
  (t.prototype = Object.create(e.prototype)),
    (t.prototype.constructor = t),
    (t.__proto__ = e);
}
/*!
 * GSAP 3.9.1
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var c,
  f,
  d,
  p,
  m,
  _,
  g,
  v,
  y,
  w,
  b,
  T,
  x,
  O,
  M,
  D,
  E,
  S,
  k,
  C,
  A,
  I,
  P,
  L,
  R,
  B,
  z,
  F,
  q = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: { lineHeight: "" },
  },
  j = { duration: 0.5, overwrite: !1, delay: 0 },
  N = 2 * Math.PI,
  Y = N / 4,
  U = 0,
  X = Math.sqrt,
  W = Math.cos,
  V = Math.sin,
  H = function (t) {
    return "string" == typeof t;
  },
  Q = function (t) {
    return "function" == typeof t;
  },
  $ = function (t) {
    return "number" == typeof t;
  },
  G = function (t) {
    return void 0 === t;
  },
  J = function (t) {
    return "object" == typeof t;
  },
  Z = function (t) {
    return !1 !== t;
  },
  K = function () {
    return "undefined" != typeof window;
  },
  tt = function (t) {
    return Q(t) || H(t);
  },
  et =
    ("function" == typeof ArrayBuffer && ArrayBuffer.isView) || function () {},
  it = Array.isArray,
  nt = /(?:-?\.?\d|\.)+/gi,
  rt = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  st = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  ot = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  at = /[+-]=-?[.\d]+/,
  ht = /[^,'"\[\]\s]+/gi,
  ut = /[\d.+\-=]+(?:e[-+]\d*)*/i,
  lt = {},
  ct = {},
  ft = function (t) {
    return (ct = zt(t, lt)) && Oi;
  },
  dt = function (t, e) {
    return console.warn(
      "Invalid property",
      t,
      "set to",
      e,
      "Missing plugin? gsap.registerPlugin()"
    );
  },
  pt = function (t, e) {
    return !e && console.warn(t);
  },
  mt = function (t, e) {
    return (t && (lt[t] = e) && ct && (ct[t] = e)) || lt;
  },
  _t = function () {
    return 0;
  },
  gt = {},
  vt = [],
  yt = {},
  wt = {},
  bt = {},
  Tt = 30,
  xt = [],
  Ot = "",
  Mt = function (t) {
    var e,
      i,
      n = t[0];
    if ((J(n) || Q(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
      for (i = xt.length; i-- && !xt[i].targetTest(n); );
      e = xt[i];
    }
    for (i = t.length; i--; )
      (t[i] && (t[i]._gsap || (t[i]._gsap = new Qe(t[i], e)))) ||
        t.splice(i, 1);
    return t;
  },
  Dt = function (t) {
    return t._gsap || Mt(pe(t))[0]._gsap;
  },
  Et = function (t, e, i) {
    return (i = t[e]) && Q(i)
      ? t[e]()
      : (G(i) && t.getAttribute && t.getAttribute(e)) || i;
  },
  St = function (t, e) {
    return (t = t.split(",")).forEach(e) || t;
  },
  kt = function (t) {
    return Math.round(1e5 * t) / 1e5 || 0;
  },
  Ct = function (t) {
    return Math.round(1e7 * t) / 1e7 || 0;
  },
  At = function (t, e) {
    for (var i = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < i; );
    return n < i;
  },
  It = function () {
    var t,
      e,
      i = vt.length,
      n = vt.slice(0);
    for (yt = {}, vt.length = 0, t = 0; t < i; t++)
      (e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
  },
  Pt = function (t, e, i, n) {
    vt.length && It(), t.render(e, i, n), vt.length && It();
  },
  Lt = function (t) {
    var e = parseFloat(t);
    return (e || 0 === e) && (t + "").match(ht).length < 2
      ? e
      : H(t)
      ? t.trim()
      : t;
  },
  Rt = function (t) {
    return t;
  },
  Bt = function (t, e) {
    for (var i in e) i in t || (t[i] = e[i]);
    return t;
  },
  zt = function (t, e) {
    for (var i in e) t[i] = e[i];
    return t;
  },
  Ft = function t(e, i) {
    for (var n in i)
      "__proto__" !== n &&
        "constructor" !== n &&
        "prototype" !== n &&
        (e[n] = J(i[n]) ? t(e[n] || (e[n] = {}), i[n]) : i[n]);
    return e;
  },
  qt = function (t, e) {
    var i,
      n = {};
    for (i in t) i in e || (n[i] = t[i]);
    return n;
  },
  jt = function (t) {
    var e,
      i = t.parent || f,
      n = t.keyframes
        ? ((e = it(t.keyframes)),
          function (t, i) {
            for (var n in i)
              n in t ||
                ("duration" === n && e) ||
                "ease" === n ||
                (t[n] = i[n]);
          })
        : Bt;
    if (Z(t.inherit))
      for (; i; ) n(t, i.vars.defaults), (i = i.parent || i._dp);
    return t;
  },
  Nt = function (t, e, i, n) {
    void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
    var r = e._prev,
      s = e._next;
    r ? (r._next = s) : t[i] === e && (t[i] = s),
      s ? (s._prev = r) : t[n] === e && (t[n] = r),
      (e._next = e._prev = e.parent = null);
  },
  Yt = function (t, e) {
    t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
      (t._act = 0);
  },
  Ut = function (t, e) {
    if (t && (!e || e._end > t._dur || e._start < 0))
      for (var i = t; i; ) (i._dirty = 1), (i = i.parent);
    return t;
  },
  Xt = function (t) {
    for (var e = t.parent; e && e.parent; )
      (e._dirty = 1), e.totalDuration(), (e = e.parent);
    return t;
  },
  Wt = function t(e) {
    return !e || (e._ts && t(e.parent));
  },
  Vt = function (t) {
    return t._repeat ? Ht(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
  },
  Ht = function (t, e) {
    var i = Math.floor((t /= e));
    return t && i === t ? i - 1 : i;
  },
  Qt = function (t, e) {
    return (
      (t - e._start) * e._ts +
      (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    );
  },
  $t = function (t) {
    return (t._end = Ct(
      t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0)
    ));
  },
  Gt = function (t, e) {
    var i = t._dp;
    return (
      i &&
        i.smoothChildTiming &&
        t._ts &&
        ((t._start = Ct(
          i._time -
            (t._ts > 0
              ? e / t._ts
              : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
        )),
        $t(t),
        i._dirty || Ut(i, t)),
      t
    );
  },
  Jt = function (t, e) {
    var i;
    if (
      ((e._time || (e._initted && !e._dur)) &&
        ((i = Qt(t.rawTime(), e)),
        (!e._dur || ue(0, e.totalDuration(), i) - e._tTime > 1e-8) &&
          e.render(i, !0)),
      Ut(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
    ) {
      if (t._dur < t.duration())
        for (i = t; i._dp; )
          i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
      t._zTime = -1e-8;
    }
  },
  Zt = function (t, e, i, n) {
    return (
      e.parent && Yt(e),
      (e._start = Ct(
        ($(i) ? i : i || t !== f ? oe(t, i, e) : t._time) + e._delay
      )),
      (e._end = Ct(
        e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
      )),
      (function (t, e, i, n, r) {
        void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
        var s,
          o = t[n];
        if (r) for (s = e[r]; o && o[r] > s; ) o = o._prev;
        o
          ? ((e._next = o._next), (o._next = e))
          : ((e._next = t[i]), (t[i] = e)),
          e._next ? (e._next._prev = e) : (t[n] = e),
          (e._prev = o),
          (e.parent = e._dp = t);
      })(t, e, "_first", "_last", t._sort ? "_start" : 0),
      ie(e) || (t._recent = e),
      n || Jt(t, e),
      t
    );
  },
  Kt = function (t, e) {
    return (
      (lt.ScrollTrigger || dt("scrollTrigger", e)) &&
      lt.ScrollTrigger.create(e, t)
    );
  },
  te = function (t, e, i, n) {
    return (
      ei(t, e),
      t._initted
        ? !i &&
          t._pt &&
          ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
          g !== Re.frame
          ? (vt.push(t), (t._lazy = [e, n]), 1)
          : void 0
        : 1
    );
  },
  ee = function t(e) {
    var i = e.parent;
    return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || t(i));
  },
  ie = function (t) {
    var e = t.data;
    return "isFromStart" === e || "isStart" === e;
  },
  ne = function (t, e, i, n) {
    var r = t._repeat,
      s = Ct(e) || 0,
      o = t._tTime / t._tDur;
    return (
      o && !n && (t._time *= s / t._dur),
      (t._dur = s),
      (t._tDur = r ? (r < 0 ? 1e10 : Ct(s * (r + 1) + t._rDelay * r)) : s),
      o > 0 && !n ? Gt(t, (t._tTime = t._tDur * o)) : t.parent && $t(t),
      i || Ut(t.parent, t),
      t
    );
  },
  re = function (t) {
    return t instanceof Ge ? Ut(t) : ne(t, t._dur);
  },
  se = { _start: 0, endTime: _t, totalDuration: _t },
  oe = function t(e, i, n) {
    var r,
      s,
      o,
      a = e.labels,
      h = e._recent || se,
      u = e.duration() >= 1e8 ? h.endTime(!1) : e._dur;
    return H(i) && (isNaN(i) || i in a)
      ? ((s = i.charAt(0)),
        (o = "%" === i.substr(-1)),
        (r = i.indexOf("=")),
        "<" === s || ">" === s
          ? (r >= 0 && (i = i.replace(/=/, "")),
            ("<" === s ? h._start : h.endTime(h._repeat >= 0)) +
              (parseFloat(i.substr(1)) || 0) *
                (o ? (r < 0 ? h : n).totalDuration() / 100 : 1))
          : r < 0
          ? (i in a || (a[i] = u), a[i])
          : ((s = parseFloat(i.charAt(r - 1) + i.substr(r + 1))),
            o && n && (s = (s / 100) * (it(n) ? n[0] : n).totalDuration()),
            r > 1 ? t(e, i.substr(0, r - 1), n) + s : u + s))
      : null == i
      ? u
      : +i;
  },
  ae = function (t, e, i) {
    var n,
      r,
      s = $(e[1]),
      o = (s ? 2 : 1) + (t < 2 ? 0 : 1),
      a = e[o];
    if ((s && (a.duration = e[1]), (a.parent = i), t)) {
      for (n = a, r = i; r && !("immediateRender" in n); )
        (n = r.vars.defaults || {}), (r = Z(r.vars.inherit) && r.parent);
      (a.immediateRender = Z(n.immediateRender)),
        t < 2 ? (a.runBackwards = 1) : (a.startAt = e[o - 1]);
    }
    return new oi(e[0], a, e[o + 1]);
  },
  he = function (t, e) {
    return t || 0 === t ? e(t) : e;
  },
  ue = function (t, e, i) {
    return i < t ? t : i > e ? e : i;
  },
  le = function (t, e) {
    return H(t) && (e = ut.exec(t)) ? t.substr(e.index + e[0].length) : "";
  },
  ce = [].slice,
  fe = function (t, e) {
    return (
      t &&
      J(t) &&
      "length" in t &&
      ((!e && !t.length) || (t.length - 1 in t && J(t[0]))) &&
      !t.nodeType &&
      t !== d
    );
  },
  de = function (t, e, i) {
    return (
      void 0 === i && (i = []),
      t.forEach(function (t) {
        var n;
        return (H(t) && !e) || fe(t, 1)
          ? (n = i).push.apply(n, pe(t))
          : i.push(t);
      }) || i
    );
  },
  pe = function (t, e, i) {
    return !H(t) || i || (!p && Be())
      ? it(t)
        ? de(t, i)
        : fe(t)
        ? ce.call(t, 0)
        : t
        ? [t]
        : []
      : ce.call((e || m).querySelectorAll(t), 0);
  },
  me = function (t) {
    return t.sort(function () {
      return 0.5 - Math.random();
    });
  },
  _e = function (t) {
    if (Q(t)) return t;
    var e = J(t) ? t : { each: t },
      i = Ue(e.ease),
      n = e.from || 0,
      r = parseFloat(e.base) || 0,
      s = {},
      o = n > 0 && n < 1,
      a = isNaN(n) || o,
      h = e.axis,
      u = n,
      l = n;
    return (
      H(n)
        ? (u = l = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
        : !o && a && ((u = n[0]), (l = n[1])),
      function (t, o, c) {
        var f,
          d,
          p,
          m,
          _,
          g,
          v,
          y,
          w,
          b = (c || e).length,
          T = s[b];
        if (!T) {
          if (!(w = "auto" === e.grid ? 0 : (e.grid || [1, 1e8])[1])) {
            for (
              v = -1e8;
              v < (v = c[w++].getBoundingClientRect().left) && w < b;

            );
            w--;
          }
          for (
            T = s[b] = [],
              f = a ? Math.min(w, b) * u - 0.5 : n % w,
              d = 1e8 === w ? 0 : a ? (b * l) / w - 0.5 : (n / w) | 0,
              v = 0,
              y = 1e8,
              g = 0;
            g < b;
            g++
          )
            (p = (g % w) - f),
              (m = d - ((g / w) | 0)),
              (T[g] = _ = h ? Math.abs("y" === h ? m : p) : X(p * p + m * m)),
              _ > v && (v = _),
              _ < y && (y = _);
          "random" === n && me(T),
            (T.max = v - y),
            (T.min = y),
            (T.v = b =
              (parseFloat(e.amount) ||
                parseFloat(e.each) *
                  (w > b
                    ? b - 1
                    : h
                    ? "y" === h
                      ? b / w
                      : w
                    : Math.max(w, b / w)) ||
                0) * ("edges" === n ? -1 : 1)),
            (T.b = b < 0 ? r - b : r),
            (T.u = le(e.amount || e.each) || 0),
            (i = i && b < 0 ? Ne(i) : i);
        }
        return (
          (b = (T[t] - T.min) / T.max || 0),
          Ct(T.b + (i ? i(b) : b) * T.v) + T.u
        );
      }
    );
  },
  ge = function (t) {
    var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
    return function (i) {
      var n = Math.round(parseFloat(i) / t) * t * e;
      return (n - (n % 1)) / e + ($(i) ? 0 : le(i));
    };
  },
  ve = function (t, e) {
    var i,
      n,
      r = it(t);
    return (
      !r &&
        J(t) &&
        ((i = r = t.radius || 1e8),
        t.values
          ? ((t = pe(t.values)), (n = !$(t[0])) && (i *= i))
          : (t = ge(t.increment))),
      he(
        e,
        r
          ? Q(t)
            ? function (e) {
                return (n = t(e)), Math.abs(n - e) <= i ? n : e;
              }
            : function (e) {
                for (
                  var r,
                    s,
                    o = parseFloat(n ? e.x : e),
                    a = parseFloat(n ? e.y : 0),
                    h = 1e8,
                    u = 0,
                    l = t.length;
                  l--;

                )
                  (r = n
                    ? (r = t[l].x - o) * r + (s = t[l].y - a) * s
                    : Math.abs(t[l] - o)) < h && ((h = r), (u = l));
                return (
                  (u = !i || h <= i ? t[u] : e),
                  n || u === e || $(e) ? u : u + le(e)
                );
              }
          : ge(t)
      )
    );
  },
  ye = function (t, e, i, n) {
    return he(it(t) ? !e : !0 === i ? ((i = 0), !1) : !n, function () {
      return it(t)
        ? t[~~(Math.random() * t.length)]
        : (n = (i = i || 1e-5) < 1 ? Math.pow(10, (i + "").length - 2) : 1) &&
            Math.floor(
              Math.round((t - i / 2 + Math.random() * (e - t + 0.99 * i)) / i) *
                i *
                n
            ) / n;
    });
  },
  we = function (t, e, i) {
    return he(i, function (i) {
      return t[~~e(i)];
    });
  },
  be = function (t) {
    for (var e, i, n, r, s = 0, o = ""; ~(e = t.indexOf("random(", s)); )
      (n = t.indexOf(")", e)),
        (r = "[" === t.charAt(e + 7)),
        (i = t.substr(e + 7, n - e - 7).match(r ? ht : nt)),
        (o +=
          t.substr(s, e - s) + ye(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5)),
        (s = n + 1);
    return o + t.substr(s, t.length - s);
  },
  Te = function (t, e, i, n, r) {
    var s = e - t,
      o = n - i;
    return he(r, function (e) {
      return i + (((e - t) / s) * o || 0);
    });
  },
  xe = function (t, e, i) {
    var n,
      r,
      s,
      o = t.labels,
      a = 1e8;
    for (n in o)
      (r = o[n] - e) < 0 == !!i &&
        r &&
        a > (r = Math.abs(r)) &&
        ((s = n), (a = r));
    return s;
  },
  Oe = function (t, e, i) {
    var n,
      r,
      s = t.vars,
      o = s[e];
    if (o)
      return (
        (n = s[e + "Params"]),
        (r = s.callbackScope || t),
        i && vt.length && It(),
        n ? o.apply(r, n) : o.call(r)
      );
  },
  Me = function (t) {
    return (
      Yt(t),
      t.scrollTrigger && t.scrollTrigger.kill(!1),
      t.progress() < 1 && Oe(t, "onInterrupt"),
      t
    );
  },
  De = function (t) {
    var e = (t = (!t.name && t.default) || t).name,
      i = Q(t),
      n =
        e && !i && t.init
          ? function () {
              this._props = [];
            }
          : t,
      r = { init: _t, render: mi, add: Ke, kill: gi, modifier: _i, rawVars: 0 },
      s = { targetTest: 0, get: 0, getSetter: ci, aliases: {}, register: 0 };
    if ((Be(), t !== n)) {
      if (wt[e]) return;
      Bt(n, Bt(qt(t, r), s)),
        zt(n.prototype, zt(r, qt(t, s))),
        (wt[(n.prop = e)] = n),
        t.targetTest && (xt.push(n), (gt[e] = 1)),
        (e =
          ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) +
          "Plugin");
    }
    mt(e, n), t.register && t.register(Oi, n, wi);
  },
  Ee = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0],
  },
  Se = function (t, e, i) {
    return (
      (255 *
        (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
          ? e + (i - e) * t * 6
          : t < 0.5
          ? i
          : 3 * t < 2
          ? e + (i - e) * (2 / 3 - t) * 6
          : e) +
        0.5) |
      0
    );
  },
  ke = function (t, e, i) {
    var n,
      r,
      s,
      o,
      a,
      h,
      u,
      l,
      c,
      f,
      d = t ? ($(t) ? [t >> 16, (t >> 8) & 255, 255 & t] : 0) : Ee.black;
    if (!d) {
      if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Ee[t]))
        d = Ee[t];
      else if ("#" === t.charAt(0)) {
        if (
          (t.length < 6 &&
            ((n = t.charAt(1)),
            (r = t.charAt(2)),
            (s = t.charAt(3)),
            (t =
              "#" +
              n +
              n +
              r +
              r +
              s +
              s +
              (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
          9 === t.length)
        )
          return [
            (d = parseInt(t.substr(1, 6), 16)) >> 16,
            (d >> 8) & 255,
            255 & d,
            parseInt(t.substr(7), 16) / 255,
          ];
        d = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & 255, 255 & t];
      } else if ("hsl" === t.substr(0, 3))
        if (((d = f = t.match(nt)), e)) {
          if (~t.indexOf("="))
            return (d = t.match(rt)), i && d.length < 4 && (d[3] = 1), d;
        } else
          (o = (+d[0] % 360) / 360),
            (a = +d[1] / 100),
            (n =
              2 * (h = +d[2] / 100) -
              (r = h <= 0.5 ? h * (a + 1) : h + a - h * a)),
            d.length > 3 && (d[3] *= 1),
            (d[0] = Se(o + 1 / 3, n, r)),
            (d[1] = Se(o, n, r)),
            (d[2] = Se(o - 1 / 3, n, r));
      else d = t.match(nt) || Ee.transparent;
      d = d.map(Number);
    }
    return (
      e &&
        !f &&
        ((n = d[0] / 255),
        (r = d[1] / 255),
        (s = d[2] / 255),
        (h = ((u = Math.max(n, r, s)) + (l = Math.min(n, r, s))) / 2),
        u === l
          ? (o = a = 0)
          : ((c = u - l),
            (a = h > 0.5 ? c / (2 - u - l) : c / (u + l)),
            (o =
              u === n
                ? (r - s) / c + (r < s ? 6 : 0)
                : u === r
                ? (s - n) / c + 2
                : (n - r) / c + 4),
            (o *= 60)),
        (d[0] = ~~(o + 0.5)),
        (d[1] = ~~(100 * a + 0.5)),
        (d[2] = ~~(100 * h + 0.5))),
      i && d.length < 4 && (d[3] = 1),
      d
    );
  },
  Ce = function (t) {
    var e = [],
      i = [],
      n = -1;
    return (
      t.split(Ie).forEach(function (t) {
        var r = t.match(st) || [];
        e.push.apply(e, r), i.push((n += r.length + 1));
      }),
      (e.c = i),
      e
    );
  },
  Ae = function (t, e, i) {
    var n,
      r,
      s,
      o,
      a = "",
      h = (t + a).match(Ie),
      u = e ? "hsla(" : "rgba(",
      l = 0;
    if (!h) return t;
    if (
      ((h = h.map(function (t) {
        return (
          (t = ke(t, e, 1)) &&
          u +
            (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) +
            ")"
        );
      })),
      i && ((s = Ce(t)), (n = i.c).join(a) !== s.c.join(a)))
    )
      for (o = (r = t.replace(Ie, "1").split(st)).length - 1; l < o; l++)
        a +=
          r[l] +
          (~n.indexOf(l)
            ? h.shift() || u + "0,0,0,0)"
            : (s.length ? s : h.length ? h : i).shift());
    if (!r) for (o = (r = t.split(Ie)).length - 1; l < o; l++) a += r[l] + h[l];
    return a + r[o];
  },
  Ie = (function () {
    var t,
      e =
        "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
    for (t in Ee) e += "|" + t + "\\b";
    return new RegExp(e + ")", "gi");
  })(),
  Pe = /hsl[a]?\(/,
  Le = function (t) {
    var e,
      i = t.join(" ");
    if (((Ie.lastIndex = 0), Ie.test(i)))
      return (
        (e = Pe.test(i)),
        (t[1] = Ae(t[1], e)),
        (t[0] = Ae(t[0], e, Ce(t[1]))),
        !0
      );
  },
  Re =
    ((D = Date.now),
    (E = 500),
    (S = 33),
    (k = D()),
    (C = k),
    (I = A = 1e3 / 240),
    (L = function t(e) {
      var i,
        n,
        r,
        s,
        o = D() - C,
        a = !0 === e;
      if (
        (o > E && (k += o - S),
        ((i = (r = (C += o) - k) - I) > 0 || a) &&
          ((s = ++x.frame),
          (O = r - 1e3 * x.time),
          (x.time = r /= 1e3),
          (I += i + (i >= A ? 4 : A - i)),
          (n = 1)),
        a || (w = b(t)),
        n)
      )
        for (M = 0; M < P.length; M++) P[M](r, O, s, e);
    }),
    (x = {
      time: 0,
      frame: 0,
      tick: function () {
        L(!0);
      },
      deltaRatio: function (t) {
        return O / (1e3 / (t || 60));
      },
      wake: function () {
        _ &&
          (!p &&
            K() &&
            ((d = p = window),
            (m = d.document || {}),
            (lt.gsap = Oi),
            (d.gsapVersions || (d.gsapVersions = [])).push(Oi.version),
            ft(ct || d.GreenSockGlobals || (!d.gsap && d) || {}),
            (T = d.requestAnimationFrame)),
          w && x.sleep(),
          (b =
            T ||
            function (t) {
              return setTimeout(t, (I - 1e3 * x.time + 1) | 0);
            }),
          (y = 1),
          L(2));
      },
      sleep: function () {
        (T ? d.cancelAnimationFrame : clearTimeout)(w), (y = 0), (b = _t);
      },
      lagSmoothing: function (t, e) {
        (E = t || 1 / 1e-8), (S = Math.min(e, E, 0));
      },
      fps: function (t) {
        (A = 1e3 / (t || 240)), (I = 1e3 * x.time + A);
      },
      add: function (t) {
        P.indexOf(t) < 0 && P.push(t), Be();
      },
      remove: function (t, e) {
        ~(e = P.indexOf(t)) && P.splice(e, 1) && M >= e && M--;
      },
      _listeners: (P = []),
    })),
  Be = function () {
    return !y && Re.wake();
  },
  ze = {},
  Fe = /^[\d.\-M][\d.\-,\s]/,
  qe = /["']/g,
  je = function (t) {
    for (
      var e,
        i,
        n,
        r = {},
        s = t.substr(1, t.length - 3).split(":"),
        o = s[0],
        a = 1,
        h = s.length;
      a < h;
      a++
    )
      (i = s[a]),
        (e = a !== h - 1 ? i.lastIndexOf(",") : i.length),
        (n = i.substr(0, e)),
        (r[o] = isNaN(n) ? n.replace(qe, "").trim() : +n),
        (o = i.substr(e + 1).trim());
    return r;
  },
  Ne = function (t) {
    return function (e) {
      return 1 - t(1 - e);
    };
  },
  Ye = function t(e, i) {
    for (var n, r = e._first; r; )
      r instanceof Ge
        ? t(r, i)
        : !r.vars.yoyoEase ||
          (r._yoyo && r._repeat) ||
          r._yoyo === i ||
          (r.timeline
            ? t(r.timeline, i)
            : ((n = r._ease),
              (r._ease = r._yEase),
              (r._yEase = n),
              (r._yoyo = i))),
        (r = r._next);
  },
  Ue = function (t, e) {
    return (
      (t &&
        (Q(t)
          ? t
          : ze[t] ||
            (function (t) {
              var e,
                i,
                n,
                r,
                s = (t + "").split("("),
                o = ze[s[0]];
              return o && s.length > 1 && o.config
                ? o.config.apply(
                    null,
                    ~t.indexOf("{")
                      ? [je(s[1])]
                      : ((e = t),
                        (i = e.indexOf("(") + 1),
                        (n = e.indexOf(")")),
                        (r = e.indexOf("(", i)),
                        e.substring(i, ~r && r < n ? e.indexOf(")", n + 1) : n))
                          .split(",")
                          .map(Lt)
                  )
                : ze._CE && Fe.test(t)
                ? ze._CE("", t)
                : o;
            })(t))) ||
      e
    );
  },
  Xe = function (t, e, i, n) {
    void 0 === i &&
      (i = function (t) {
        return 1 - e(1 - t);
      }),
      void 0 === n &&
        (n = function (t) {
          return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
        });
    var r,
      s = { easeIn: e, easeOut: i, easeInOut: n };
    return (
      St(t, function (t) {
        for (var e in ((ze[t] = lt[t] = s), (ze[(r = t.toLowerCase())] = i), s))
          ze[
            r + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
          ] = ze[t + "." + e] = s[e];
      }),
      s
    );
  },
  We = function (t) {
    return function (e) {
      return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
    };
  },
  Ve = function t(e, i, n) {
    var r = i >= 1 ? i : 1,
      s = (n || (e ? 0.3 : 0.45)) / (i < 1 ? i : 1),
      o = (s / N) * (Math.asin(1 / r) || 0),
      a = function (t) {
        return 1 === t ? 1 : r * Math.pow(2, -10 * t) * V((t - o) * s) + 1;
      },
      h =
        "out" === e
          ? a
          : "in" === e
          ? function (t) {
              return 1 - a(1 - t);
            }
          : We(a);
    return (
      (s = N / s),
      (h.config = function (i, n) {
        return t(e, i, n);
      }),
      h
    );
  },
  He = function t(e, i) {
    void 0 === i && (i = 1.70158);
    var n = function (t) {
        return t ? --t * t * ((i + 1) * t + i) + 1 : 0;
      },
      r =
        "out" === e
          ? n
          : "in" === e
          ? function (t) {
              return 1 - n(1 - t);
            }
          : We(n);
    return (
      (r.config = function (i) {
        return t(e, i);
      }),
      r
    );
  };
St("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
  var i = e < 5 ? e + 1 : e;
  Xe(
    t + ",Power" + (i - 1),
    e
      ? function (t) {
          return Math.pow(t, i);
        }
      : function (t) {
          return t;
        },
    function (t) {
      return 1 - Math.pow(1 - t, i);
    },
    function (t) {
      return t < 0.5
        ? Math.pow(2 * t, i) / 2
        : 1 - Math.pow(2 * (1 - t), i) / 2;
    }
  );
}),
  (ze.Linear.easeNone = ze.none = ze.Linear.easeIn),
  Xe("Elastic", Ve("in"), Ve("out"), Ve()),
  (R = 7.5625),
  (z = 1 / (B = 2.75)),
  Xe(
    "Bounce",
    function (t) {
      return 1 - F(1 - t);
    },
    (F = function (t) {
      return t < z
        ? R * t * t
        : t < 0.7272727272727273
        ? R * Math.pow(t - 1.5 / B, 2) + 0.75
        : t < 0.9090909090909092
        ? R * (t -= 2.25 / B) * t + 0.9375
        : R * Math.pow(t - 2.625 / B, 2) + 0.984375;
    })
  ),
  Xe("Expo", function (t) {
    return t ? Math.pow(2, 10 * (t - 1)) : 0;
  }),
  Xe("Circ", function (t) {
    return -(X(1 - t * t) - 1);
  }),
  Xe("Sine", function (t) {
    return 1 === t ? 1 : 1 - W(t * Y);
  }),
  Xe("Back", He("in"), He("out"), He()),
  (ze.SteppedEase =
    ze.steps =
    lt.SteppedEase =
      {
        config: function (t, e) {
          void 0 === t && (t = 1);
          var i = 1 / t,
            n = t + (e ? 0 : 1),
            r = e ? 1 : 0;
          return function (t) {
            return (((n * ue(0, 0.99999999, t)) | 0) + r) * i;
          };
        },
      }),
  (j.ease = ze["quad.out"]),
  St(
    "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
    function (t) {
      return (Ot += t + "," + t + "Params,");
    }
  );
var Qe = function (t, e) {
    (this.id = U++),
      (t._gsap = this),
      (this.target = t),
      (this.harness = e),
      (this.get = e ? e.get : Et),
      (this.set = e ? e.getSetter : ci);
  },
  $e = (function () {
    function t(t) {
      (this.vars = t),
        (this._delay = +t.delay || 0),
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
          ((this._rDelay = t.repeatDelay || 0),
          (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
        (this._ts = 1),
        ne(this, +t.duration, 1, 1),
        (this.data = t.data),
        y || Re.wake();
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
            ne(
              this,
              this._repeat < 0
                ? t
                : (t - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (e.totalTime = function (t, e) {
        if ((Be(), !arguments.length)) return this._tTime;
        var i = this._dp;
        if (i && i.smoothChildTiming && this._ts) {
          for (Gt(this, t), !i._dp || i.parent || Jt(i, this); i && i.parent; )
            i.parent._time !==
              i._start +
                (i._ts >= 0
                  ? i._tTime / i._ts
                  : (i.totalDuration() - i._tTime) / -i._ts) &&
              i.totalTime(i._tTime, !0),
              (i = i.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && t < this._tDur) ||
              (this._ts < 0 && t > 0) ||
              (!this._tDur && !t)) &&
            Zt(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== t ||
            (!this._dur && !e) ||
            (this._initted && 1e-8 === Math.abs(this._zTime)) ||
            (!t && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = t), Pt(this, t, e)),
          this
        );
      }),
      (e.time = function (t, e) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), t + Vt(this)) %
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
                Vt(this),
              e
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.ratio;
      }),
      (e.iteration = function (t, e) {
        var i = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (t - 1) * i, e)
          : this._repeat
          ? Ht(this._tTime, i) + 1
          : 1;
      }),
      (e.timeScale = function (t) {
        if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
        if (this._rts === t) return this;
        var e =
          this.parent && this._ts ? Qt(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +t || 0),
          (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
          Xt(this.totalTime(ue(-this._delay, this._tDur, e), !0)),
          $t(this),
          this
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
                : (Be(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    1 === this.progress() &&
                      1e-8 !== Math.abs(this._zTime) &&
                      (this._tTime -= 1e-8)
                  ))),
            this)
          : this._ps;
      }),
      (e.startTime = function (t) {
        if (arguments.length) {
          this._start = t;
          var e = this.parent || this._dp;
          return (
            e && (e._sort || !this.parent) && Zt(e, this, t - this._delay), this
          );
        }
        return this._start;
      }),
      (e.endTime = function (t) {
        return (
          this._start +
          (Z(t) ? this.totalDuration() : this.duration()) /
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
            ? Qt(e.rawTime(t), this)
            : this._tTime
          : this._tTime;
      }),
      (e.globalTime = function (t) {
        for (var e = this, i = arguments.length ? t : e.rawTime(); e; )
          (i = e._start + i / (e._ts || 1)), (e = e._dp);
        return i;
      }),
      (e.repeat = function (t) {
        return arguments.length
          ? ((this._repeat = t === 1 / 0 ? -2 : t), re(this))
          : -2 === this._repeat
          ? 1 / 0
          : this._repeat;
      }),
      (e.repeatDelay = function (t) {
        if (arguments.length) {
          var e = this._time;
          return (this._rDelay = t), re(this), e ? this.time(e) : this;
        }
        return this._rDelay;
      }),
      (e.yoyo = function (t) {
        return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
      }),
      (e.seek = function (t, e) {
        return this.totalTime(oe(this, t), Z(e));
      }),
      (e.restart = function (t, e) {
        return this.play().totalTime(t ? -this._delay : 0, Z(e));
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
          i = this._start;
        return !(
          e &&
          !(
            this._ts &&
            this._initted &&
            e.isActive() &&
            (t = e.rawTime(!0)) >= i &&
            t < this.endTime(!0) - 1e-8
          )
        );
      }),
      (e.eventCallback = function (t, e, i) {
        var n = this.vars;
        return arguments.length > 1
          ? (e
              ? ((n[t] = e),
                i && (n[t + "Params"] = i),
                "onUpdate" === t && (this._onUpdate = e))
              : delete n[t],
            this)
          : n[t];
      }),
      (e.then = function (t) {
        var e = this;
        return new Promise(function (i) {
          var n = Q(t) ? t : Rt,
            r = function () {
              var t = e.then;
              (e.then = null),
                Q(n) && (n = n(e)) && (n.then || n === e) && (e.then = t),
                i(n),
                (e.then = t);
            };
          (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
          (!e._tTime && e._ts < 0)
            ? r()
            : (e._prom = r);
        });
      }),
      (e.kill = function () {
        Me(this);
      }),
      t
    );
  })();
Bt($e.prototype, {
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
var Ge = (function (t) {
  function e(e, i) {
    var n;
    return (
      void 0 === e && (e = {}),
      ((n = t.call(this, e) || this).labels = {}),
      (n.smoothChildTiming = !!e.smoothChildTiming),
      (n.autoRemoveChildren = !!e.autoRemoveChildren),
      (n._sort = Z(e.sortChildren)),
      f && Zt(e.parent || f, u(n), i),
      e.reversed && n.reverse(),
      e.paused && n.paused(!0),
      e.scrollTrigger && Kt(u(n), e.scrollTrigger),
      n
    );
  }
  l(e, t);
  var i = e.prototype;
  return (
    (i.to = function (t, e, i) {
      return ae(0, arguments, this), this;
    }),
    (i.from = function (t, e, i) {
      return ae(1, arguments, this), this;
    }),
    (i.fromTo = function (t, e, i, n) {
      return ae(2, arguments, this), this;
    }),
    (i.set = function (t, e, i) {
      return (
        (e.duration = 0),
        (e.parent = this),
        jt(e).repeatDelay || (e.repeat = 0),
        (e.immediateRender = !!e.immediateRender),
        new oi(t, e, oe(this, i), 1),
        this
      );
    }),
    (i.call = function (t, e, i) {
      return Zt(this, oi.delayedCall(0, t, e), i);
    }),
    (i.staggerTo = function (t, e, i, n, r, s, o) {
      return (
        (i.duration = e),
        (i.stagger = i.stagger || n),
        (i.onComplete = s),
        (i.onCompleteParams = o),
        (i.parent = this),
        new oi(t, i, oe(this, r)),
        this
      );
    }),
    (i.staggerFrom = function (t, e, i, n, r, s, o) {
      return (
        (i.runBackwards = 1),
        (jt(i).immediateRender = Z(i.immediateRender)),
        this.staggerTo(t, e, i, n, r, s, o)
      );
    }),
    (i.staggerFromTo = function (t, e, i, n, r, s, o, a) {
      return (
        (n.startAt = i),
        (jt(n).immediateRender = Z(n.immediateRender)),
        this.staggerTo(t, e, n, r, s, o, a)
      );
    }),
    (i.render = function (t, e, i) {
      var n,
        r,
        s,
        o,
        a,
        h,
        u,
        l,
        c,
        d,
        p,
        m,
        _ = this._time,
        g = this._dirty ? this.totalDuration() : this._tDur,
        v = this._dur,
        y = t <= 0 ? 0 : Ct(t),
        w = this._zTime < 0 != t < 0 && (this._initted || !v);
      if (
        (this !== f && y > g && t >= 0 && (y = g), y !== this._tTime || i || w)
      ) {
        if (
          (_ !== this._time &&
            v &&
            ((y += this._time - _), (t += this._time - _)),
          (n = y),
          (c = this._start),
          (h = !(l = this._ts)),
          w && (v || (_ = this._zTime), (t || !e) && (this._zTime = t)),
          this._repeat)
        ) {
          if (
            ((p = this._yoyo),
            (a = v + this._rDelay),
            this._repeat < -1 && t < 0)
          )
            return this.totalTime(100 * a + t, e, i);
          if (
            ((n = Ct(y % a)),
            y === g
              ? ((o = this._repeat), (n = v))
              : ((o = ~~(y / a)) && o === y / a && ((n = v), o--),
                n > v && (n = v)),
            (d = Ht(this._tTime, a)),
            !_ && this._tTime && d !== o && (d = o),
            p && 1 & o && ((n = v - n), (m = 1)),
            o !== d && !this._lock)
          ) {
            var b = p && 1 & d,
              T = b === (p && 1 & o);
            if (
              (o < d && (b = !b),
              (_ = b ? 0 : v),
              (this._lock = 1),
              (this.render(_ || (m ? 0 : Ct(o * a)), e, !v)._lock = 0),
              (this._tTime = y),
              !e && this.parent && Oe(this, "onRepeat"),
              this.vars.repeatRefresh && !m && (this.invalidate()._lock = 1),
              (_ && _ !== this._time) ||
                h !== !this._ts ||
                (this.vars.onRepeat && !this.parent && !this._act))
            )
              return this;
            if (
              ((v = this._dur),
              (g = this._tDur),
              T &&
                ((this._lock = 2),
                (_ = b ? v : -1e-4),
                this.render(_, !0),
                this.vars.repeatRefresh && !m && this.invalidate()),
              (this._lock = 0),
              !this._ts && !h)
            )
              return this;
            Ye(this, m);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((u = (function (t, e, i) {
              var n;
              if (i > e)
                for (n = t._first; n && n._start <= i; ) {
                  if ("isPause" === n.data && n._start > e) return n;
                  n = n._next;
                }
              else
                for (n = t._last; n && n._start >= i; ) {
                  if ("isPause" === n.data && n._start < e) return n;
                  n = n._prev;
                }
            })(this, Ct(_), Ct(n))),
            u && (y -= n - (n = u._start))),
          (this._tTime = y),
          (this._time = n),
          (this._act = !l),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = t),
            (_ = 0)),
          !_ && n && !e && (Oe(this, "onStart"), this._tTime !== y))
        )
          return this;
        if (n >= _ && t >= 0)
          for (r = this._first; r; ) {
            if (
              ((s = r._next), (r._act || n >= r._start) && r._ts && u !== r)
            ) {
              if (r.parent !== this) return this.render(t, e, i);
              if (
                (r.render(
                  r._ts > 0
                    ? (n - r._start) * r._ts
                    : (r._dirty ? r.totalDuration() : r._tDur) +
                        (n - r._start) * r._ts,
                  e,
                  i
                ),
                n !== this._time || (!this._ts && !h))
              ) {
                (u = 0), s && (y += this._zTime = -1e-8);
                break;
              }
            }
            r = s;
          }
        else {
          r = this._last;
          for (var x = t < 0 ? t : n; r; ) {
            if (((s = r._prev), (r._act || x <= r._end) && r._ts && u !== r)) {
              if (r.parent !== this) return this.render(t, e, i);
              if (
                (r.render(
                  r._ts > 0
                    ? (x - r._start) * r._ts
                    : (r._dirty ? r.totalDuration() : r._tDur) +
                        (x - r._start) * r._ts,
                  e,
                  i
                ),
                n !== this._time || (!this._ts && !h))
              ) {
                (u = 0), s && (y += this._zTime = x ? -1e-8 : 1e-8);
                break;
              }
            }
            r = s;
          }
        }
        if (
          u &&
          !e &&
          (this.pause(),
          (u.render(n >= _ ? 0 : -1e-8)._zTime = n >= _ ? 1 : -1),
          this._ts)
        )
          return (this._start = c), $t(this), this.render(t, e, i);
        this._onUpdate && !e && Oe(this, "onUpdate", !0),
          ((y === g && g >= this.totalDuration()) || (!y && _)) &&
            ((c !== this._start && Math.abs(l) === Math.abs(this._ts)) ||
              this._lock ||
              ((t || !v) &&
                ((y === g && this._ts > 0) || (!y && this._ts < 0)) &&
                Yt(this, 1),
              e ||
                (t < 0 && !_) ||
                (!y && !_ && g) ||
                (Oe(
                  this,
                  y === g && t >= 0 ? "onComplete" : "onReverseComplete",
                  !0
                ),
                this._prom &&
                  !(y < g && this.timeScale() > 0) &&
                  this._prom())));
      }
      return this;
    }),
    (i.add = function (t, e) {
      var i = this;
      if (($(e) || (e = oe(this, e, t)), !(t instanceof $e))) {
        if (it(t))
          return (
            t.forEach(function (t) {
              return i.add(t, e);
            }),
            this
          );
        if (H(t)) return this.addLabel(t, e);
        if (!Q(t)) return this;
        t = oi.delayedCall(0, t);
      }
      return this !== t ? Zt(this, t, e) : this;
    }),
    (i.getChildren = function (t, e, i, n) {
      void 0 === t && (t = !0),
        void 0 === e && (e = !0),
        void 0 === i && (i = !0),
        void 0 === n && (n = -1e8);
      for (var r = [], s = this._first; s; )
        s._start >= n &&
          (s instanceof oi
            ? e && r.push(s)
            : (i && r.push(s), t && r.push.apply(r, s.getChildren(!0, e, i)))),
          (s = s._next);
      return r;
    }),
    (i.getById = function (t) {
      for (var e = this.getChildren(1, 1, 1), i = e.length; i--; )
        if (e[i].vars.id === t) return e[i];
    }),
    (i.remove = function (t) {
      return H(t)
        ? this.removeLabel(t)
        : Q(t)
        ? this.killTweensOf(t)
        : (Nt(this, t),
          t === this._recent && (this._recent = this._last),
          Ut(this));
    }),
    (i.totalTime = function (e, i) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = Ct(
              Re.time -
                (this._ts > 0
                  ? e / this._ts
                  : (this.totalDuration() - e) / -this._ts)
            )),
          t.prototype.totalTime.call(this, e, i),
          (this._forcing = 0),
          this)
        : this._tTime;
    }),
    (i.addLabel = function (t, e) {
      return (this.labels[t] = oe(this, e)), this;
    }),
    (i.removeLabel = function (t) {
      return delete this.labels[t], this;
    }),
    (i.addPause = function (t, e, i) {
      var n = oi.delayedCall(0, e || _t, i);
      return (
        (n.data = "isPause"), (this._hasPause = 1), Zt(this, n, oe(this, t))
      );
    }),
    (i.removePause = function (t) {
      var e = this._first;
      for (t = oe(this, t); e; )
        e._start === t && "isPause" === e.data && Yt(e), (e = e._next);
    }),
    (i.killTweensOf = function (t, e, i) {
      for (var n = this.getTweensOf(t, i), r = n.length; r--; )
        Je !== n[r] && n[r].kill(t, e);
      return this;
    }),
    (i.getTweensOf = function (t, e) {
      for (var i, n = [], r = pe(t), s = this._first, o = $(e); s; )
        s instanceof oi
          ? At(s._targets, r) &&
            (o
              ? (!Je || (s._initted && s._ts)) &&
                s.globalTime(0) <= e &&
                s.globalTime(s.totalDuration()) > e
              : !e || s.isActive()) &&
            n.push(s)
          : (i = s.getTweensOf(r, e)).length && n.push.apply(n, i),
          (s = s._next);
      return n;
    }),
    (i.tweenTo = function (t, e) {
      e = e || {};
      var i,
        n = this,
        r = oe(n, t),
        s = e,
        o = s.startAt,
        a = s.onStart,
        h = s.onStartParams,
        u = s.immediateRender,
        l = oi.to(
          n,
          Bt(
            {
              ease: e.ease || "none",
              lazy: !1,
              immediateRender: !1,
              time: r,
              overwrite: "auto",
              duration:
                e.duration ||
                Math.abs(
                  (r - (o && "time" in o ? o.time : n._time)) / n.timeScale()
                ) ||
                1e-8,
              onStart: function () {
                if ((n.pause(), !i)) {
                  var t =
                    e.duration ||
                    Math.abs(
                      (r - (o && "time" in o ? o.time : n._time)) /
                        n.timeScale()
                    );
                  l._dur !== t && ne(l, t, 0, 1).render(l._time, !0, !0),
                    (i = 1);
                }
                a && a.apply(l, h || []);
              },
            },
            e
          )
        );
      return u ? l.render(0) : l;
    }),
    (i.tweenFromTo = function (t, e, i) {
      return this.tweenTo(e, Bt({ startAt: { time: oe(this, t) } }, i));
    }),
    (i.recent = function () {
      return this._recent;
    }),
    (i.nextLabel = function (t) {
      return void 0 === t && (t = this._time), xe(this, oe(this, t));
    }),
    (i.previousLabel = function (t) {
      return void 0 === t && (t = this._time), xe(this, oe(this, t), 1);
    }),
    (i.currentLabel = function (t) {
      return arguments.length
        ? this.seek(t, !0)
        : this.previousLabel(this._time + 1e-8);
    }),
    (i.shiftChildren = function (t, e, i) {
      void 0 === i && (i = 0);
      for (var n, r = this._first, s = this.labels; r; )
        r._start >= i && ((r._start += t), (r._end += t)), (r = r._next);
      if (e) for (n in s) s[n] >= i && (s[n] += t);
      return Ut(this);
    }),
    (i.invalidate = function () {
      var e = this._first;
      for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
      return t.prototype.invalidate.call(this);
    }),
    (i.clear = function (t) {
      void 0 === t && (t = !0);
      for (var e, i = this._first; i; ) (e = i._next), this.remove(i), (i = e);
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0),
        t && (this.labels = {}),
        Ut(this)
      );
    }),
    (i.totalDuration = function (t) {
      var e,
        i,
        n,
        r = 0,
        s = this,
        o = s._last,
        a = 1e8;
      if (arguments.length)
        return s.timeScale(
          (s._repeat < 0 ? s.duration() : s.totalDuration()) /
            (s.reversed() ? -t : t)
        );
      if (s._dirty) {
        for (n = s.parent; o; )
          (e = o._prev),
            o._dirty && o.totalDuration(),
            (i = o._start) > a && s._sort && o._ts && !s._lock
              ? ((s._lock = 1), (Zt(s, o, i - o._delay, 1)._lock = 0))
              : (a = i),
            i < 0 &&
              o._ts &&
              ((r -= i),
              ((!n && !s._dp) || (n && n.smoothChildTiming)) &&
                ((s._start += i / s._ts), (s._time -= i), (s._tTime -= i)),
              s.shiftChildren(-i, !1, -1 / 0),
              (a = 0)),
            o._end > r && o._ts && (r = o._end),
            (o = e);
        ne(s, s === f && s._time > r ? s._time : r, 1, 1), (s._dirty = 0);
      }
      return s._tDur;
    }),
    (e.updateRoot = function (t) {
      if ((f._ts && (Pt(f, Qt(t, f)), (g = Re.frame)), Re.frame >= Tt)) {
        Tt += q.autoSleep || 120;
        var e = f._first;
        if ((!e || !e._ts) && q.autoSleep && Re._listeners.length < 2) {
          for (; e && !e._ts; ) e = e._next;
          e || Re.sleep();
        }
      }
    }),
    e
  );
})($e);
Bt(Ge.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var Je,
  Ze = function (t, e, i, n, r, s, o) {
    var a,
      h,
      u,
      l,
      c,
      f,
      d,
      p,
      m = new wi(this._pt, t, e, 0, 1, pi, null, r),
      _ = 0,
      g = 0;
    for (
      m.b = i,
        m.e = n,
        i += "",
        (d = ~(n += "").indexOf("random(")) && (n = be(n)),
        s && (s((p = [i, n]), t, e), (i = p[0]), (n = p[1])),
        h = i.match(ot) || [];
      (a = ot.exec(n));

    )
      (l = a[0]),
        (c = n.substring(_, a.index)),
        u ? (u = (u + 1) % 5) : "rgba(" === c.substr(-5) && (u = 1),
        l !== h[g++] &&
          ((f = parseFloat(h[g - 1]) || 0),
          (m._pt = {
            _next: m._pt,
            p: c || 1 === g ? c : ",",
            s: f,
            c:
              "=" === l.charAt(1)
                ? parseFloat(l.substr(2)) * ("-" === l.charAt(0) ? -1 : 1)
                : parseFloat(l) - f,
            m: u && u < 4 ? Math.round : 0,
          }),
          (_ = ot.lastIndex));
    return (
      (m.c = _ < n.length ? n.substring(_, n.length) : ""),
      (m.fp = o),
      (at.test(n) || d) && (m.e = 0),
      (this._pt = m),
      m
    );
  },
  Ke = function (t, e, i, n, r, s, o, a, h) {
    Q(n) && (n = n(r || 0, t, s));
    var u,
      l = t[e],
      c =
        "get" !== i
          ? i
          : Q(l)
          ? h
            ? t[
                e.indexOf("set") || !Q(t["get" + e.substr(3)])
                  ? e
                  : "get" + e.substr(3)
              ](h)
            : t[e]()
          : l,
      f = Q(l) ? (h ? ui : hi) : ai;
    if (
      (H(n) &&
        (~n.indexOf("random(") && (n = be(n)),
        "=" === n.charAt(1) &&
          ((u =
            parseFloat(c) +
            parseFloat(n.substr(2)) * ("-" === n.charAt(0) ? -1 : 1) +
            (le(c) || 0)) ||
            0 === u) &&
          (n = u)),
      c !== n)
    )
      return isNaN(c * n) || "" === n
        ? (!l && !(e in t) && dt(e, n),
          Ze.call(this, t, e, c, n, f, a || q.stringFilter, h))
        : ((u = new wi(
            this._pt,
            t,
            e,
            +c || 0,
            n - (c || 0),
            "boolean" == typeof l ? di : fi,
            0,
            f
          )),
          h && (u.fp = h),
          o && u.modifier(o, this, t),
          (this._pt = u));
  },
  ti = function (t, e, i, n, r, s) {
    var o, a, h, u;
    if (
      wt[t] &&
      !1 !==
        (o = new wt[t]()).init(
          r,
          o.rawVars
            ? e[t]
            : (function (t, e, i, n, r) {
                if (
                  (Q(t) && (t = ni(t, r, e, i, n)),
                  !J(t) || (t.style && t.nodeType) || it(t) || et(t))
                )
                  return H(t) ? ni(t, r, e, i, n) : t;
                var s,
                  o = {};
                for (s in t) o[s] = ni(t[s], r, e, i, n);
                return o;
              })(e[t], n, r, s, i),
          i,
          n,
          s
        ) &&
      ((i._pt = a = new wi(i._pt, r, t, 0, 1, o.render, o, 0, o.priority)),
      i !== v)
    )
      for (h = i._ptLookup[i._targets.indexOf(r)], u = o._props.length; u--; )
        h[o._props[u]] = a;
    return o;
  },
  ei = function t(e, i) {
    var n,
      r,
      s,
      o,
      a,
      h,
      u,
      l,
      d,
      p,
      m,
      _,
      g,
      v = e.vars,
      y = v.ease,
      w = v.startAt,
      b = v.immediateRender,
      T = v.lazy,
      x = v.onUpdate,
      O = v.onUpdateParams,
      M = v.callbackScope,
      D = v.runBackwards,
      E = v.yoyoEase,
      S = v.keyframes,
      k = v.autoRevert,
      C = e._dur,
      A = e._startAt,
      I = e._targets,
      P = e.parent,
      L = P && "nested" === P.data ? P.parent._targets : I,
      R = "auto" === e._overwrite && !c,
      B = e.timeline;
    if (
      (B && (!S || !y) && (y = "none"),
      (e._ease = Ue(y, j.ease)),
      (e._yEase = E ? Ne(Ue(!0 === E ? y : E, j.ease)) : 0),
      E &&
        e._yoyo &&
        !e._repeat &&
        ((E = e._yEase), (e._yEase = e._ease), (e._ease = E)),
      (e._from = !B && !!v.runBackwards),
      !B || (S && !v.stagger))
    ) {
      if (
        ((_ = (l = I[0] ? Dt(I[0]).harness : 0) && v[l.prop]),
        (n = qt(v, gt)),
        A && Yt(A.render(-1, !0)),
        w)
      )
        if (
          (Yt(
            (e._startAt = oi.set(
              I,
              Bt(
                {
                  data: "isStart",
                  overwrite: !1,
                  parent: P,
                  immediateRender: !0,
                  lazy: Z(T),
                  startAt: null,
                  delay: 0,
                  onUpdate: x,
                  onUpdateParams: O,
                  callbackScope: M,
                  stagger: 0,
                },
                w
              )
            ))
          ),
          i < 0 && !b && !k && e._startAt.render(-1, !0),
          b)
        ) {
          if ((i > 0 && !k && (e._startAt = 0), C && i <= 0))
            return void (i && (e._zTime = i));
        } else !1 === k && (e._startAt = 0);
      else if (D && C)
        if (A) !k && (e._startAt = 0);
        else if (
          (i && (b = !1),
          (s = Bt(
            {
              overwrite: !1,
              data: "isFromStart",
              lazy: b && Z(T),
              immediateRender: b,
              stagger: 0,
              parent: P,
            },
            n
          )),
          _ && (s[l.prop] = _),
          Yt((e._startAt = oi.set(I, s))),
          i < 0 && e._startAt.render(-1, !0),
          (e._zTime = i),
          b)
        ) {
          if (!i) return;
        } else t(e._startAt, 1e-8);
      for (e._pt = 0, T = (C && Z(T)) || (T && !C), r = 0; r < I.length; r++) {
        if (
          ((u = (a = I[r])._gsap || Mt(I)[r]._gsap),
          (e._ptLookup[r] = p = {}),
          yt[u.id] && vt.length && It(),
          (m = L === I ? r : L.indexOf(a)),
          l &&
            !1 !== (d = new l()).init(a, _ || n, e, m, L) &&
            ((e._pt = o =
              new wi(e._pt, a, d.name, 0, 1, d.render, d, 0, d.priority)),
            d._props.forEach(function (t) {
              p[t] = o;
            }),
            d.priority && (h = 1)),
          !l || _)
        )
          for (s in n)
            wt[s] && (d = ti(s, n, e, m, a, L))
              ? d.priority && (h = 1)
              : (p[s] = o =
                  Ke.call(e, a, s, "get", n[s], m, L, 0, v.stringFilter));
        e._op && e._op[r] && e.kill(a, e._op[r]),
          R &&
            e._pt &&
            ((Je = e),
            f.killTweensOf(a, p, e.globalTime(i)),
            (g = !e.parent),
            (Je = 0)),
          e._pt && T && (yt[u.id] = 1);
      }
      h && yi(e), e._onInit && e._onInit(e);
    }
    (e._onUpdate = x),
      (e._initted = (!e._op || e._pt) && !g),
      S && i <= 0 && B.render(1e8, !0, !0);
  },
  ii = function (t, e, i, n) {
    var r,
      s,
      o = e.ease || n || "power1.inOut";
    if (it(e))
      (s = i[t] || (i[t] = [])),
        e.forEach(function (t, i) {
          return s.push({ t: (i / (e.length - 1)) * 100, v: t, e: o });
        });
    else
      for (r in e)
        (s = i[r] || (i[r] = [])),
          "ease" === r || s.push({ t: parseFloat(t), v: e[r], e: o });
  },
  ni = function (t, e, i, n, r) {
    return Q(t)
      ? t.call(e, i, n, r)
      : H(t) && ~t.indexOf("random(")
      ? be(t)
      : t;
  },
  ri = Ot + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
  si = {};
St(ri + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
  return (si[t] = 1);
});
var oi = (function (t) {
  function e(e, i, n, r) {
    var s;
    "number" == typeof i && ((n.duration = i), (i = n), (n = null));
    var o,
      a,
      h,
      l,
      d,
      p,
      m,
      _,
      g = (s = t.call(this, r ? i : jt(i)) || this).vars,
      v = g.duration,
      y = g.delay,
      w = g.immediateRender,
      b = g.stagger,
      T = g.overwrite,
      x = g.keyframes,
      O = g.defaults,
      M = g.scrollTrigger,
      D = g.yoyoEase,
      E = i.parent || f,
      S = (it(e) || et(e) ? $(e[0]) : "length" in i) ? [e] : pe(e);
    if (
      ((s._targets = S.length
        ? Mt(S)
        : pt(
            "GSAP target " + e + " not found. https://greensock.com",
            !q.nullTargetWarn
          ) || []),
      (s._ptLookup = []),
      (s._overwrite = T),
      x || b || tt(v) || tt(y))
    ) {
      if (
        ((i = s.vars),
        (o = s.timeline = new Ge({ data: "nested", defaults: O || {} })).kill(),
        (o.parent = o._dp = u(s)),
        (o._start = 0),
        b || tt(v) || tt(y))
      ) {
        if (((l = S.length), (m = b && _e(b)), J(b)))
          for (d in b) ~ri.indexOf(d) && (_ || (_ = {}), (_[d] = b[d]));
        for (a = 0; a < l; a++)
          ((h = qt(i, si)).stagger = 0),
            D && (h.yoyoEase = D),
            _ && zt(h, _),
            (p = S[a]),
            (h.duration = +ni(v, u(s), a, p, S)),
            (h.delay = (+ni(y, u(s), a, p, S) || 0) - s._delay),
            !b &&
              1 === l &&
              h.delay &&
              ((s._delay = y = h.delay), (s._start += y), (h.delay = 0)),
            o.to(p, h, m ? m(a, p, S) : 0),
            (o._ease = ze.none);
        o.duration() ? (v = y = 0) : (s.timeline = 0);
      } else if (x) {
        jt(Bt(o.vars.defaults, { ease: "none" })),
          (o._ease = Ue(x.ease || i.ease || "none"));
        var k,
          C,
          A,
          I = 0;
        if (it(x))
          x.forEach(function (t) {
            return o.to(S, t, ">");
          });
        else {
          for (d in ((h = {}), x))
            "ease" === d || "easeEach" === d || ii(d, x[d], h, x.easeEach);
          for (d in h)
            for (
              k = h[d].sort(function (t, e) {
                return t.t - e.t;
              }),
                I = 0,
                a = 0;
              a < k.length;
              a++
            )
              ((A = {
                ease: (C = k[a]).e,
                duration: ((C.t - (a ? k[a - 1].t : 0)) / 100) * v,
              })[d] = C.v),
                o.to(S, A, I),
                (I += A.duration);
          o.duration() < v && o.to({}, { duration: v - o.duration() });
        }
      }
      v || s.duration((v = o.duration()));
    } else s.timeline = 0;
    return (
      !0 !== T || c || ((Je = u(s)), f.killTweensOf(S), (Je = 0)),
      Zt(E, u(s), n),
      i.reversed && s.reverse(),
      i.paused && s.paused(!0),
      (w ||
        (!v &&
          !x &&
          s._start === Ct(E._time) &&
          Z(w) &&
          Wt(u(s)) &&
          "nested" !== E.data)) &&
        ((s._tTime = -1e-8), s.render(Math.max(0, -y))),
      M && Kt(u(s), M),
      s
    );
  }
  l(e, t);
  var i = e.prototype;
  return (
    (i.render = function (t, e, i) {
      var n,
        r,
        s,
        o,
        a,
        h,
        u,
        l,
        c,
        f = this._time,
        d = this._tDur,
        p = this._dur,
        m = t > d - 1e-8 && t >= 0 ? d : t < 1e-8 ? 0 : t;
      if (p) {
        if (
          m !== this._tTime ||
          !t ||
          i ||
          (!this._initted && this._tTime) ||
          (this._startAt && this._zTime < 0 != t < 0)
        ) {
          if (((n = m), (l = this.timeline), this._repeat)) {
            if (((o = p + this._rDelay), this._repeat < -1 && t < 0))
              return this.totalTime(100 * o + t, e, i);
            if (
              ((n = Ct(m % o)),
              m === d
                ? ((s = this._repeat), (n = p))
                : ((s = ~~(m / o)) && s === m / o && ((n = p), s--),
                  n > p && (n = p)),
              (h = this._yoyo && 1 & s) && ((c = this._yEase), (n = p - n)),
              (a = Ht(this._tTime, o)),
              n === f && !i && this._initted)
            )
              return this;
            s !== a &&
              (l && this._yEase && Ye(l, h),
              !this.vars.repeatRefresh ||
                h ||
                this._lock ||
                ((this._lock = i = 1),
                (this.render(Ct(o * s), !0).invalidate()._lock = 0)));
          }
          if (!this._initted) {
            if (te(this, t < 0 ? t : n, i, e)) return (this._tTime = 0), this;
            if (p !== this._dur) return this.render(t, e, i);
          }
          if (
            ((this._tTime = m),
            (this._time = n),
            !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
            (this.ratio = u = (c || this._ease)(n / p)),
            this._from && (this.ratio = u = 1 - u),
            n && !f && !e && (Oe(this, "onStart"), this._tTime !== m))
          )
            return this;
          for (r = this._pt; r; ) r.r(u, r.d), (r = r._next);
          (l &&
            l.render(
              t < 0 ? t : !n && h ? -1e-8 : l._dur * l._ease(n / this._dur),
              e,
              i
            )) ||
            (this._startAt && (this._zTime = t)),
            this._onUpdate &&
              !e &&
              (t < 0 && this._startAt && this._startAt.render(t, !0, i),
              Oe(this, "onUpdate")),
            this._repeat &&
              s !== a &&
              this.vars.onRepeat &&
              !e &&
              this.parent &&
              Oe(this, "onRepeat"),
            (m !== this._tDur && m) ||
              this._tTime !== m ||
              (t < 0 &&
                this._startAt &&
                !this._onUpdate &&
                this._startAt.render(t, !0, !0),
              (t || !p) &&
                ((m === this._tDur && this._ts > 0) || (!m && this._ts < 0)) &&
                Yt(this, 1),
              e ||
                (t < 0 && !f) ||
                (!m && !f) ||
                (Oe(this, m === d ? "onComplete" : "onReverseComplete", !0),
                this._prom &&
                  !(m < d && this.timeScale() > 0) &&
                  this._prom()));
        }
      } else
        !(function (t, e, i, n) {
          var r,
            s,
            o,
            a = t.ratio,
            h =
              e < 0 ||
              (!e &&
                ((!t._start && ee(t) && (t._initted || !ie(t))) ||
                  ((t._ts < 0 || t._dp._ts < 0) && !ie(t))))
                ? 0
                : 1,
            u = t._rDelay,
            l = 0;
          if (
            (u &&
              t._repeat &&
              ((l = ue(0, t._tDur, e)),
              (s = Ht(l, u)),
              t._yoyo && 1 & s && (h = 1 - h),
              s !== Ht(t._tTime, u) &&
                ((a = 1 - h),
                t.vars.repeatRefresh && t._initted && t.invalidate())),
            h !== a || n || 1e-8 === t._zTime || (!e && t._zTime))
          ) {
            if (!t._initted && te(t, e, n, i)) return;
            for (
              o = t._zTime,
                t._zTime = e || (i ? 1e-8 : 0),
                i || (i = e && !o),
                t.ratio = h,
                t._from && (h = 1 - h),
                t._time = 0,
                t._tTime = l,
                r = t._pt;
              r;

            )
              r.r(h, r.d), (r = r._next);
            t._startAt && e < 0 && t._startAt.render(e, !0, !0),
              t._onUpdate && !i && Oe(t, "onUpdate"),
              l && t._repeat && !i && t.parent && Oe(t, "onRepeat"),
              (e >= t._tDur || e < 0) &&
                t.ratio === h &&
                (h && Yt(t, 1),
                i ||
                  (Oe(t, h ? "onComplete" : "onReverseComplete", !0),
                  t._prom && t._prom()));
          } else t._zTime || (t._zTime = e);
        })(this, t, e, i);
      return this;
    }),
    (i.targets = function () {
      return this._targets;
    }),
    (i.invalidate = function () {
      return (
        (this._pt =
          this._op =
          this._startAt =
          this._onUpdate =
          this._lazy =
          this.ratio =
            0),
        (this._ptLookup = []),
        this.timeline && this.timeline.invalidate(),
        t.prototype.invalidate.call(this)
      );
    }),
    (i.kill = function (t, e) {
      if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
        return (this._lazy = this._pt = 0), this.parent ? Me(this) : this;
      if (this.timeline) {
        var i = this.timeline.totalDuration();
        return (
          this.timeline.killTweensOf(t, e, Je && !0 !== Je.vars.overwrite)
            ._first || Me(this),
          this.parent &&
            i !== this.timeline.totalDuration() &&
            ne(this, (this._dur * this.timeline._tDur) / i, 0, 1),
          this
        );
      }
      var n,
        r,
        s,
        o,
        a,
        h,
        u,
        l = this._targets,
        c = t ? pe(t) : l,
        f = this._ptLookup,
        d = this._pt;
      if (
        (!e || "all" === e) &&
        (function (t, e) {
          for (
            var i = t.length, n = i === e.length;
            n && i-- && t[i] === e[i];

          );
          return i < 0;
        })(l, c)
      )
        return "all" === e && (this._pt = 0), Me(this);
      for (
        n = this._op = this._op || [],
          "all" !== e &&
            (H(e) &&
              ((a = {}),
              St(e, function (t) {
                return (a[t] = 1);
              }),
              (e = a)),
            (e = (function (t, e) {
              var i,
                n,
                r,
                s,
                o = t[0] ? Dt(t[0]).harness : 0,
                a = o && o.aliases;
              if (!a) return e;
              for (n in ((i = zt({}, e)), a))
                if ((n in i))
                  for (r = (s = a[n].split(",")).length; r--; ) i[s[r]] = i[n];
              return i;
            })(l, e))),
          u = l.length;
        u--;

      )
        if (~c.indexOf(l[u]))
          for (a in ((r = f[u]),
          "all" === e
            ? ((n[u] = e), (o = r), (s = {}))
            : ((s = n[u] = n[u] || {}), (o = e)),
          o))
            (h = r && r[a]) &&
              (("kill" in h.d && !0 !== h.d.kill(a)) || Nt(this, h, "_pt"),
              delete r[a]),
              "all" !== s && (s[a] = 1);
      return this._initted && !this._pt && d && Me(this), this;
    }),
    (e.to = function (t, i) {
      return new e(t, i, arguments[2]);
    }),
    (e.from = function (t, e) {
      return ae(1, arguments);
    }),
    (e.delayedCall = function (t, i, n, r) {
      return new e(i, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: t,
        onComplete: i,
        onReverseComplete: i,
        onCompleteParams: n,
        onReverseCompleteParams: n,
        callbackScope: r,
      });
    }),
    (e.fromTo = function (t, e, i) {
      return ae(2, arguments);
    }),
    (e.set = function (t, i) {
      return (i.duration = 0), i.repeatDelay || (i.repeat = 0), new e(t, i);
    }),
    (e.killTweensOf = function (t, e, i) {
      return f.killTweensOf(t, e, i);
    }),
    e
  );
})($e);
Bt(oi.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
  St("staggerTo,staggerFrom,staggerFromTo", function (t) {
    oi[t] = function () {
      var e = new Ge(),
        i = ce.call(arguments, 0);
      return i.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, i);
    };
  });
var ai = function (t, e, i) {
    return (t[e] = i);
  },
  hi = function (t, e, i) {
    return t[e](i);
  },
  ui = function (t, e, i, n) {
    return t[e](n.fp, i);
  },
  li = function (t, e, i) {
    return t.setAttribute(e, i);
  },
  ci = function (t, e) {
    return Q(t[e]) ? hi : G(t[e]) && t.setAttribute ? li : ai;
  },
  fi = function (t, e) {
    return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
  },
  di = function (t, e) {
    return e.set(e.t, e.p, !!(e.s + e.c * t), e);
  },
  pi = function (t, e) {
    var i = e._pt,
      n = "";
    if (!t && e.b) n = e.b;
    else if (1 === t && e.e) n = e.e;
    else {
      for (; i; )
        (n =
          i.p +
          (i.m ? i.m(i.s + i.c * t) : Math.round(1e4 * (i.s + i.c * t)) / 1e4) +
          n),
          (i = i._next);
      n += e.c;
    }
    e.set(e.t, e.p, n, e);
  },
  mi = function (t, e) {
    for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next);
  },
  _i = function (t, e, i, n) {
    for (var r, s = this._pt; s; )
      (r = s._next), s.p === n && s.modifier(t, e, i), (s = r);
  },
  gi = function (t) {
    for (var e, i, n = this._pt; n; )
      (i = n._next),
        (n.p === t && !n.op) || n.op === t
          ? Nt(this, n, "_pt")
          : n.dep || (e = 1),
        (n = i);
    return !e;
  },
  vi = function (t, e, i, n) {
    n.mSet(t, e, n.m.call(n.tween, i, n.mt), n);
  },
  yi = function (t) {
    for (var e, i, n, r, s = t._pt; s; ) {
      for (e = s._next, i = n; i && i.pr > s.pr; ) i = i._next;
      (s._prev = i ? i._prev : r) ? (s._prev._next = s) : (n = s),
        (s._next = i) ? (i._prev = s) : (r = s),
        (s = e);
    }
    t._pt = n;
  },
  wi = (function () {
    function t(t, e, i, n, r, s, o, a, h) {
      (this.t = e),
        (this.s = n),
        (this.c = r),
        (this.p = i),
        (this.r = s || fi),
        (this.d = o || this),
        (this.set = a || ai),
        (this.pr = h || 0),
        (this._next = t),
        t && (t._prev = this);
    }
    return (
      (t.prototype.modifier = function (t, e, i) {
        (this.mSet = this.mSet || this.set),
          (this.set = vi),
          (this.m = t),
          (this.mt = i),
          (this.tween = e);
      }),
      t
    );
  })();
St(
  Ot +
    "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
  function (t) {
    return (gt[t] = 1);
  }
),
  (lt.TweenMax = lt.TweenLite = oi),
  (lt.TimelineLite = lt.TimelineMax = Ge),
  (f = new Ge({
    sortChildren: !1,
    defaults: j,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0,
  })),
  (q.stringFilter = Le);
var bi = {
  registerPlugin: function () {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function (t) {
      return De(t);
    });
  },
  timeline: function (t) {
    return new Ge(t);
  },
  getTweensOf: function (t, e) {
    return f.getTweensOf(t, e);
  },
  getProperty: function (t, e, i, n) {
    H(t) && (t = pe(t)[0]);
    var r = Dt(t || {}).get,
      s = i ? Rt : Lt;
    return (
      "native" === i && (i = ""),
      t
        ? e
          ? s(((wt[e] && wt[e].get) || r)(t, e, i, n))
          : function (e, i, n) {
              return s(((wt[e] && wt[e].get) || r)(t, e, i, n));
            }
        : t
    );
  },
  quickSetter: function (t, e, i) {
    if ((t = pe(t)).length > 1) {
      var n = t.map(function (t) {
          return Oi.quickSetter(t, e, i);
        }),
        r = n.length;
      return function (t) {
        for (var e = r; e--; ) n[e](t);
      };
    }
    t = t[0] || {};
    var s = wt[e],
      o = Dt(t),
      a = (o.harness && (o.harness.aliases || {})[e]) || e,
      h = s
        ? function (e) {
            var n = new s();
            (v._pt = 0),
              n.init(t, i ? e + i : e, v, 0, [t]),
              n.render(1, n),
              v._pt && mi(1, v);
          }
        : o.set(t, a);
    return s
      ? h
      : function (e) {
          return h(t, a, i ? e + i : e, o, 1);
        };
  },
  isTweening: function (t) {
    return f.getTweensOf(t, !0).length > 0;
  },
  defaults: function (t) {
    return t && t.ease && (t.ease = Ue(t.ease, j.ease)), Ft(j, t || {});
  },
  config: function (t) {
    return Ft(q, t || {});
  },
  registerEffect: function (t) {
    var e = t.name,
      i = t.effect,
      n = t.plugins,
      r = t.defaults,
      s = t.extendTimeline;
    (n || "").split(",").forEach(function (t) {
      return (
        t && !wt[t] && !lt[t] && pt(e + " effect requires " + t + " plugin.")
      );
    }),
      (bt[e] = function (t, e, n) {
        return i(pe(t), Bt(e || {}, r), n);
      }),
      s &&
        (Ge.prototype[e] = function (t, i, n) {
          return this.add(bt[e](t, J(i) ? i : (n = i) && {}, this), n);
        });
  },
  registerEase: function (t, e) {
    ze[t] = Ue(e);
  },
  parseEase: function (t, e) {
    return arguments.length ? Ue(t, e) : ze;
  },
  getById: function (t) {
    return f.getById(t);
  },
  exportRoot: function (t, e) {
    void 0 === t && (t = {});
    var i,
      n,
      r = new Ge(t);
    for (
      r.smoothChildTiming = Z(t.smoothChildTiming),
        f.remove(r),
        r._dp = 0,
        r._time = r._tTime = f._time,
        i = f._first;
      i;

    )
      (n = i._next),
        (!e &&
          !i._dur &&
          i instanceof oi &&
          i.vars.onComplete === i._targets[0]) ||
          Zt(r, i, i._start - i._delay),
        (i = n);
    return Zt(f, r, 0), r;
  },
  utils: {
    wrap: function t(e, i, n) {
      var r = i - e;
      return it(e)
        ? we(e, t(0, e.length), i)
        : he(n, function (t) {
            return ((r + ((t - e) % r)) % r) + e;
          });
    },
    wrapYoyo: function t(e, i, n) {
      var r = i - e,
        s = 2 * r;
      return it(e)
        ? we(e, t(0, e.length - 1), i)
        : he(n, function (t) {
            return e + ((t = (s + ((t - e) % s)) % s || 0) > r ? s - t : t);
          });
    },
    distribute: _e,
    random: ye,
    snap: ve,
    normalize: function (t, e, i) {
      return Te(t, e, 0, 1, i);
    },
    getUnit: le,
    clamp: function (t, e, i) {
      return he(i, function (i) {
        return ue(t, e, i);
      });
    },
    splitColor: ke,
    toArray: pe,
    selector: function (t) {
      return (
        (t = pe(t)[0] || pt("Invalid scope") || {}),
        function (e) {
          var i = t.current || t.nativeElement || t;
          return pe(
            e,
            i.querySelectorAll
              ? i
              : i === t
              ? pt("Invalid scope") || m.createElement("div")
              : t
          );
        }
      );
    },
    mapRange: Te,
    pipe: function () {
      for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
        e[i] = arguments[i];
      return function (t) {
        return e.reduce(function (t, e) {
          return e(t);
        }, t);
      };
    },
    unitize: function (t, e) {
      return function (i) {
        return t(parseFloat(i)) + (e || le(i));
      };
    },
    interpolate: function t(e, i, n, r) {
      var s = isNaN(e + i)
        ? 0
        : function (t) {
            return (1 - t) * e + t * i;
          };
      if (!s) {
        var o,
          a,
          h,
          u,
          l,
          c = H(e),
          f = {};
        if ((!0 === n && (r = 1) && (n = null), c))
          (e = { p: e }), (i = { p: i });
        else if (it(e) && !it(i)) {
          for (h = [], u = e.length, l = u - 2, a = 1; a < u; a++)
            h.push(t(e[a - 1], e[a]));
          u--,
            (s = function (t) {
              t *= u;
              var e = Math.min(l, ~~t);
              return h[e](t - e);
            }),
            (n = i);
        } else r || (e = zt(it(e) ? [] : {}, e));
        if (!h) {
          for (o in i) Ke.call(f, e, o, "get", i[o]);
          s = function (t) {
            return mi(t, f) || (c ? e.p : e);
          };
        }
      }
      return he(n, s);
    },
    shuffle: me,
  },
  install: ft,
  effects: bt,
  ticker: Re,
  updateRoot: Ge.updateRoot,
  plugins: wt,
  globalTimeline: f,
  core: {
    PropTween: wi,
    globals: mt,
    Tween: oi,
    Timeline: Ge,
    Animation: $e,
    getCache: Dt,
    _removeLinkedListItem: Nt,
    suppressOverwrites: function (t) {
      return (c = t);
    },
  },
};
St("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
  return (bi[t] = oi[t]);
}),
  Re.add(Ge.updateRoot),
  (v = bi.to({}, { duration: 0 }));
var Ti = function (t, e) {
    for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
      i = i._next;
    return i;
  },
  xi = function (t, e) {
    return {
      name: t,
      rawVars: 1,
      init: function (t, i, n) {
        n._onInit = function (t) {
          var n, r;
          if (
            (H(i) &&
              ((n = {}),
              St(i, function (t) {
                return (n[t] = 1);
              }),
              (i = n)),
            e)
          ) {
            for (r in ((n = {}), i)) n[r] = e(i[r]);
            i = n;
          }
          !(function (t, e) {
            var i,
              n,
              r,
              s = t._targets;
            for (i in e)
              for (n = s.length; n--; )
                (r = t._ptLookup[n][i]) &&
                  (r = r.d) &&
                  (r._pt && (r = Ti(r, i)),
                  r && r.modifier && r.modifier(e[i], t, s[n], i));
          })(t, i);
        };
      },
    };
  },
  Oi =
    bi.registerPlugin(
      {
        name: "attr",
        init: function (t, e, i, n, r) {
          var s, o;
          for (s in e)
            (o = this.add(
              t,
              "setAttribute",
              (t.getAttribute(s) || 0) + "",
              e[s],
              n,
              r,
              0,
              0,
              s
            )) && (o.op = s),
              this._props.push(s);
        },
      },
      {
        name: "endArray",
        init: function (t, e) {
          for (var i = e.length; i--; ) this.add(t, i, t[i] || 0, e[i]);
        },
      },
      xi("roundProps", ge),
      xi("modifiers"),
      xi("snap", ve)
    ) || bi;
(oi.version = Ge.version = Oi.version = "3.9.1"), (_ = 1), K() && Be();
ze.Power0,
  ze.Power1,
  ze.Power2,
  ze.Power3,
  ze.Power4,
  ze.Linear,
  ze.Quad,
  ze.Cubic,
  ze.Quart,
  ze.Quint,
  ze.Strong,
  ze.Elastic,
  ze.Back,
  ze.SteppedEase,
  ze.Bounce,
  ze.Sine,
  ze.Expo,
  ze.Circ;
var Mi,
  Di,
  Ei,
  Si,
  ki,
  Ci,
  Ai,
  Ii = {},
  Pi = 180 / Math.PI,
  Li = Math.PI / 180,
  Ri = Math.atan2,
  Bi = /([A-Z])/g,
  zi = /(?:left|right|width|margin|padding|x)/i,
  Fi = /[\s,\(]\S/,
  qi = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity",
  },
  ji = function (t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  },
  Ni = function (t, e) {
    return e.set(
      e.t,
      e.p,
      1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
      e
    );
  },
  Yi = function (t, e) {
    return e.set(
      e.t,
      e.p,
      t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
      e
    );
  },
  Ui = function (t, e) {
    var i = e.s + e.c * t;
    e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
  },
  Xi = function (t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e);
  },
  Wi = function (t, e) {
    return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
  },
  Vi = function (t, e, i) {
    return (t.style[e] = i);
  },
  Hi = function (t, e, i) {
    return t.style.setProperty(e, i);
  },
  Qi = function (t, e, i) {
    return (t._gsap[e] = i);
  },
  $i = function (t, e, i) {
    return (t._gsap.scaleX = t._gsap.scaleY = i);
  },
  Gi = function (t, e, i, n, r) {
    var s = t._gsap;
    (s.scaleX = s.scaleY = i), s.renderTransform(r, s);
  },
  Ji = function (t, e, i, n, r) {
    var s = t._gsap;
    (s[e] = i), s.renderTransform(r, s);
  },
  Zi = "transform",
  Ki = Zi + "Origin",
  tn = function (t, e) {
    var i = Di.createElementNS
      ? Di.createElementNS(
          (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          t
        )
      : Di.createElement(t);
    return i.style ? i : Di.createElement(t);
  },
  en = function t(e, i, n) {
    var r = getComputedStyle(e);
    return (
      r[i] ||
      r.getPropertyValue(i.replace(Bi, "-$1").toLowerCase()) ||
      r.getPropertyValue(i) ||
      (!n && t(e, rn(i) || i, 1)) ||
      ""
    );
  },
  nn = "O,Moz,ms,Ms,Webkit".split(","),
  rn = function (t, e, i) {
    var n = (e || ki).style,
      r = 5;
    if (t in n && !i) return t;
    for (
      t = t.charAt(0).toUpperCase() + t.substr(1);
      r-- && !(nn[r] + t in n);

    );
    return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? nn[r] : "") + t;
  },
  sn = function () {
    "undefined" != typeof window &&
      window.document &&
      ((Mi = window),
      (Di = Mi.document),
      (Ei = Di.documentElement),
      (ki = tn("div") || { style: {} }),
      tn("div"),
      (Zi = rn(Zi)),
      (Ki = Zi + "Origin"),
      (ki.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      (Ai = !!rn("perspective")),
      (Si = 1));
  },
  on = function t(e) {
    var i,
      n = tn(
        "svg",
        (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) ||
          "http://www.w3.org/2000/svg"
      ),
      r = this.parentNode,
      s = this.nextSibling,
      o = this.style.cssText;
    if (
      (Ei.appendChild(n),
      n.appendChild(this),
      (this.style.display = "block"),
      e)
    )
      try {
        (i = this.getBBox()),
          (this._gsapBBox = this.getBBox),
          (this.getBBox = t);
      } catch (t) {}
    else this._gsapBBox && (i = this._gsapBBox());
    return (
      r && (s ? r.insertBefore(this, s) : r.appendChild(this)),
      Ei.removeChild(n),
      (this.style.cssText = o),
      i
    );
  },
  an = function (t, e) {
    for (var i = e.length; i--; )
      if (t.hasAttribute(e[i])) return t.getAttribute(e[i]);
  },
  hn = function (t) {
    var e;
    try {
      e = t.getBBox();
    } catch (i) {
      e = on.call(t, !0);
    }
    return (
      (e && (e.width || e.height)) || t.getBBox === on || (e = on.call(t, !0)),
      !e || e.width || e.x || e.y
        ? e
        : {
            x: +an(t, ["x", "cx", "x1"]) || 0,
            y: +an(t, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0,
          }
    );
  },
  un = function (t) {
    return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !hn(t));
  },
  ln = function (t, e) {
    if (e) {
      var i = t.style;
      e in Ii && e !== Ki && (e = Zi),
        i.removeProperty
          ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
              (e = "-" + e),
            i.removeProperty(e.replace(Bi, "-$1").toLowerCase()))
          : i.removeAttribute(e);
    }
  },
  cn = function (t, e, i, n, r, s) {
    var o = new wi(t._pt, e, i, 0, 1, s ? Wi : Xi);
    return (t._pt = o), (o.b = n), (o.e = r), t._props.push(i), o;
  },
  fn = { deg: 1, rad: 1, turn: 1 },
  dn = function t(e, i, n, r) {
    var s,
      o,
      a,
      h,
      u = parseFloat(n) || 0,
      l = (n + "").trim().substr((u + "").length) || "px",
      c = ki.style,
      f = zi.test(i),
      d = "svg" === e.tagName.toLowerCase(),
      p = (d ? "client" : "offset") + (f ? "Width" : "Height"),
      m = 100,
      _ = "px" === r,
      g = "%" === r;
    return r === l || !u || fn[r] || fn[l]
      ? u
      : ("px" !== l && !_ && (u = t(e, i, n, "px")),
        (h = e.getCTM && un(e)),
        (!g && "%" !== l) || (!Ii[i] && !~i.indexOf("adius"))
          ? ((c[f ? "width" : "height"] = m + (_ ? l : r)),
            (o =
              ~i.indexOf("adius") || ("em" === r && e.appendChild && !d)
                ? e
                : e.parentNode),
            h && (o = (e.ownerSVGElement || {}).parentNode),
            (o && o !== Di && o.appendChild) || (o = Di.body),
            (a = o._gsap) && g && a.width && f && a.time === Re.time
              ? kt((u / a.width) * m)
              : ((g || "%" === l) && (c.position = en(e, "position")),
                o === e && (c.position = "static"),
                o.appendChild(ki),
                (s = ki[p]),
                o.removeChild(ki),
                (c.position = "absolute"),
                f && g && (((a = Dt(o)).time = Re.time), (a.width = o[p])),
                kt(_ ? (s * u) / m : s && u ? (m / s) * u : 0)))
          : ((s = h ? e.getBBox()[f ? "width" : "height"] : e[p]),
            kt(g ? (u / s) * m : (u / 100) * s)));
  },
  pn = function (t, e, i, n) {
    var r;
    return (
      Si || sn(),
      e in qi &&
        "transform" !== e &&
        ~(e = qi[e]).indexOf(",") &&
        (e = e.split(",")[0]),
      Ii[e] && "transform" !== e
        ? ((r = Mn(t, n)),
          (r =
            "transformOrigin" !== e
              ? r[e]
              : r.svg
              ? r.origin
              : Dn(en(t, Ki)) + " " + r.zOrigin + "px"))
        : (!(r = t.style[e]) ||
            "auto" === r ||
            n ||
            ~(r + "").indexOf("calc(")) &&
          (r =
            (vn[e] && vn[e](t, e, i)) ||
            en(t, e) ||
            Et(t, e) ||
            ("opacity" === e ? 1 : 0)),
      i && !~(r + "").trim().indexOf(" ") ? dn(t, e, r, i) + i : r
    );
  },
  mn = function (t, e, i, n) {
    if (!i || "none" === i) {
      var r = rn(e, t, 1),
        s = r && en(t, r, 1);
      s && s !== i
        ? ((e = r), (i = s))
        : "borderColor" === e && (i = en(t, "borderTopColor"));
    }
    var o,
      a,
      h,
      u,
      l,
      c,
      f,
      d,
      p,
      m,
      _,
      g,
      v = new wi(this._pt, t.style, e, 0, 1, pi),
      y = 0,
      w = 0;
    if (
      ((v.b = i),
      (v.e = n),
      (i += ""),
      "auto" === (n += "") &&
        ((t.style[e] = n), (n = en(t, e) || n), (t.style[e] = i)),
      Le((o = [i, n])),
      (n = o[1]),
      (h = (i = o[0]).match(st) || []),
      (n.match(st) || []).length)
    ) {
      for (; (a = st.exec(n)); )
        (f = a[0]),
          (p = n.substring(y, a.index)),
          l
            ? (l = (l + 1) % 5)
            : ("rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5)) || (l = 1),
          f !== (c = h[w++] || "") &&
            ((u = parseFloat(c) || 0),
            (_ = c.substr((u + "").length)),
            (g = "=" === f.charAt(1) ? +(f.charAt(0) + "1") : 0) &&
              (f = f.substr(2)),
            (d = parseFloat(f)),
            (m = f.substr((d + "").length)),
            (y = st.lastIndex - m.length),
            m ||
              ((m = m || q.units[e] || _),
              y === n.length && ((n += m), (v.e += m))),
            _ !== m && (u = dn(t, e, c, m) || 0),
            (v._pt = {
              _next: v._pt,
              p: p || 1 === w ? p : ",",
              s: u,
              c: g ? g * d : d - u,
              m: (l && l < 4) || "zIndex" === e ? Math.round : 0,
            }));
      v.c = y < n.length ? n.substring(y, n.length) : "";
    } else v.r = "display" === e && "none" === n ? Wi : Xi;
    return at.test(n) && (v.e = 0), (this._pt = v), v;
  },
  _n = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
  gn = function (t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
      var i,
        n,
        r,
        s = e.t,
        o = s.style,
        a = e.u,
        h = s._gsap;
      if ("all" === a || !0 === a) (o.cssText = ""), (n = 1);
      else
        for (r = (a = a.split(",")).length; --r > -1; )
          (i = a[r]),
            Ii[i] && ((n = 1), (i = "transformOrigin" === i ? Ki : Zi)),
            ln(s, i);
      n &&
        (ln(s, Zi),
        h &&
          (h.svg && s.removeAttribute("transform"), Mn(s, 1), (h.uncache = 1)));
    }
  },
  vn = {
    clearProps: function (t, e, i, n, r) {
      if ("isFromStart" !== r.data) {
        var s = (t._pt = new wi(t._pt, e, i, 0, 0, gn));
        return (s.u = n), (s.pr = -10), (s.tween = r), t._props.push(i), 1;
      }
    },
  },
  yn = [1, 0, 0, 1, 0, 0],
  wn = {},
  bn = function (t) {
    return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
  },
  Tn = function (t) {
    var e = en(t, Zi);
    return bn(e) ? yn : e.substr(7).match(rt).map(kt);
  },
  xn = function (t, e) {
    var i,
      n,
      r,
      s,
      o = t._gsap || Dt(t),
      a = t.style,
      h = Tn(t);
    return o.svg && t.getAttribute("transform")
      ? "1,0,0,1,0,0" ===
        (h = [
          (r = t.transform.baseVal.consolidate().matrix).a,
          r.b,
          r.c,
          r.d,
          r.e,
          r.f,
        ]).join(",")
        ? yn
        : h
      : (h !== yn ||
          t.offsetParent ||
          t === Ei ||
          o.svg ||
          ((r = a.display),
          (a.display = "block"),
          ((i = t.parentNode) && t.offsetParent) ||
            ((s = 1), (n = t.nextSibling), Ei.appendChild(t)),
          (h = Tn(t)),
          r ? (a.display = r) : ln(t, "display"),
          s &&
            (n
              ? i.insertBefore(t, n)
              : i
              ? i.appendChild(t)
              : Ei.removeChild(t))),
        e && h.length > 6 ? [h[0], h[1], h[4], h[5], h[12], h[13]] : h);
  },
  On = function (t, e, i, n, r, s) {
    var o,
      a,
      h,
      u = t._gsap,
      l = r || xn(t, !0),
      c = u.xOrigin || 0,
      f = u.yOrigin || 0,
      d = u.xOffset || 0,
      p = u.yOffset || 0,
      m = l[0],
      _ = l[1],
      g = l[2],
      v = l[3],
      y = l[4],
      w = l[5],
      b = e.split(" "),
      T = parseFloat(b[0]) || 0,
      x = parseFloat(b[1]) || 0;
    i
      ? l !== yn &&
        (a = m * v - _ * g) &&
        ((h = T * (-_ / a) + x * (m / a) - (m * w - _ * y) / a),
        (T = T * (v / a) + x * (-g / a) + (g * w - v * y) / a),
        (x = h))
      : ((T = (o = hn(t)).x + (~b[0].indexOf("%") ? (T / 100) * o.width : T)),
        (x = o.y + (~(b[1] || b[0]).indexOf("%") ? (x / 100) * o.height : x))),
      n || (!1 !== n && u.smooth)
        ? ((y = T - c),
          (w = x - f),
          (u.xOffset = d + (y * m + w * g) - y),
          (u.yOffset = p + (y * _ + w * v) - w))
        : (u.xOffset = u.yOffset = 0),
      (u.xOrigin = T),
      (u.yOrigin = x),
      (u.smooth = !!n),
      (u.origin = e),
      (u.originIsAbsolute = !!i),
      (t.style[Ki] = "0px 0px"),
      s &&
        (cn(s, u, "xOrigin", c, T),
        cn(s, u, "yOrigin", f, x),
        cn(s, u, "xOffset", d, u.xOffset),
        cn(s, u, "yOffset", p, u.yOffset)),
      t.setAttribute("data-svg-origin", T + " " + x);
  },
  Mn = function (t, e) {
    var i = t._gsap || new Qe(t);
    if ("x" in i && !e && !i.uncache) return i;
    var n,
      r,
      s,
      o,
      a,
      h,
      u,
      l,
      c,
      f,
      d,
      p,
      m,
      _,
      g,
      v,
      y,
      w,
      b,
      T,
      x,
      O,
      M,
      D,
      E,
      S,
      k,
      C,
      A,
      I,
      P,
      L,
      R = t.style,
      B = i.scaleX < 0,
      z = "px",
      F = "deg",
      j = en(t, Ki) || "0";
    return (
      (n = r = s = h = u = l = c = f = d = 0),
      (o = a = 1),
      (i.svg = !(!t.getCTM || !un(t))),
      (_ = xn(t, i.svg)),
      i.svg &&
        ((D =
          (!i.uncache || "0px 0px" === j) &&
          !e &&
          t.getAttribute("data-svg-origin")),
        On(t, D || j, !!D || i.originIsAbsolute, !1 !== i.smooth, _)),
      (p = i.xOrigin || 0),
      (m = i.yOrigin || 0),
      _ !== yn &&
        ((w = _[0]),
        (b = _[1]),
        (T = _[2]),
        (x = _[3]),
        (n = O = _[4]),
        (r = M = _[5]),
        6 === _.length
          ? ((o = Math.sqrt(w * w + b * b)),
            (a = Math.sqrt(x * x + T * T)),
            (h = w || b ? Ri(b, w) * Pi : 0),
            (c = T || x ? Ri(T, x) * Pi + h : 0) &&
              (a *= Math.abs(Math.cos(c * Li))),
            i.svg && ((n -= p - (p * w + m * T)), (r -= m - (p * b + m * x))))
          : ((L = _[6]),
            (I = _[7]),
            (k = _[8]),
            (C = _[9]),
            (A = _[10]),
            (P = _[11]),
            (n = _[12]),
            (r = _[13]),
            (s = _[14]),
            (u = (g = Ri(L, A)) * Pi),
            g &&
              ((D = O * (v = Math.cos(-g)) + k * (y = Math.sin(-g))),
              (E = M * v + C * y),
              (S = L * v + A * y),
              (k = O * -y + k * v),
              (C = M * -y + C * v),
              (A = L * -y + A * v),
              (P = I * -y + P * v),
              (O = D),
              (M = E),
              (L = S)),
            (l = (g = Ri(-T, A)) * Pi),
            g &&
              ((v = Math.cos(-g)),
              (P = x * (y = Math.sin(-g)) + P * v),
              (w = D = w * v - k * y),
              (b = E = b * v - C * y),
              (T = S = T * v - A * y)),
            (h = (g = Ri(b, w)) * Pi),
            g &&
              ((D = w * (v = Math.cos(g)) + b * (y = Math.sin(g))),
              (E = O * v + M * y),
              (b = b * v - w * y),
              (M = M * v - O * y),
              (w = D),
              (O = E)),
            u &&
              Math.abs(u) + Math.abs(h) > 359.9 &&
              ((u = h = 0), (l = 180 - l)),
            (o = kt(Math.sqrt(w * w + b * b + T * T))),
            (a = kt(Math.sqrt(M * M + L * L))),
            (g = Ri(O, M)),
            (c = Math.abs(g) > 2e-4 ? g * Pi : 0),
            (d = P ? 1 / (P < 0 ? -P : P) : 0)),
        i.svg &&
          ((D = t.getAttribute("transform")),
          (i.forceCSS = t.setAttribute("transform", "") || !bn(en(t, Zi))),
          D && t.setAttribute("transform", D))),
      Math.abs(c) > 90 &&
        Math.abs(c) < 270 &&
        (B
          ? ((o *= -1), (c += h <= 0 ? 180 : -180), (h += h <= 0 ? 180 : -180))
          : ((a *= -1), (c += c <= 0 ? 180 : -180))),
      (i.x =
        n -
        ((i.xPercent =
          n &&
          (i.xPercent ||
            (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
          ? (t.offsetWidth * i.xPercent) / 100
          : 0) +
        z),
      (i.y =
        r -
        ((i.yPercent =
          r &&
          (i.yPercent ||
            (Math.round(t.offsetHeight / 2) === Math.round(-r) ? -50 : 0)))
          ? (t.offsetHeight * i.yPercent) / 100
          : 0) +
        z),
      (i.z = s + z),
      (i.scaleX = kt(o)),
      (i.scaleY = kt(a)),
      (i.rotation = kt(h) + F),
      (i.rotationX = kt(u) + F),
      (i.rotationY = kt(l) + F),
      (i.skewX = c + F),
      (i.skewY = f + F),
      (i.transformPerspective = d + z),
      (i.zOrigin = parseFloat(j.split(" ")[2]) || 0) && (R[Ki] = Dn(j)),
      (i.xOffset = i.yOffset = 0),
      (i.force3D = q.force3D),
      (i.renderTransform = i.svg ? Cn : Ai ? kn : Sn),
      (i.uncache = 0),
      i
    );
  },
  Dn = function (t) {
    return (t = t.split(" "))[0] + " " + t[1];
  },
  En = function (t, e, i) {
    var n = le(e);
    return kt(parseFloat(e) + parseFloat(dn(t, "x", i + "px", n))) + n;
  },
  Sn = function (t, e) {
    (e.z = "0px"),
      (e.rotationY = e.rotationX = "0deg"),
      (e.force3D = 0),
      kn(t, e);
  },
  kn = function (t, e) {
    var i = e || this,
      n = i.xPercent,
      r = i.yPercent,
      s = i.x,
      o = i.y,
      a = i.z,
      h = i.rotation,
      u = i.rotationY,
      l = i.rotationX,
      c = i.skewX,
      f = i.skewY,
      d = i.scaleX,
      p = i.scaleY,
      m = i.transformPerspective,
      _ = i.force3D,
      g = i.target,
      v = i.zOrigin,
      y = "",
      w = ("auto" === _ && t && 1 !== t) || !0 === _;
    if (v && ("0deg" !== l || "0deg" !== u)) {
      var b,
        T = parseFloat(u) * Li,
        x = Math.sin(T),
        O = Math.cos(T);
      (T = parseFloat(l) * Li),
        (b = Math.cos(T)),
        (s = En(g, s, x * b * -v)),
        (o = En(g, o, -Math.sin(T) * -v)),
        (a = En(g, a, O * b * -v + v));
    }
    "0px" !== m && (y += "perspective(" + m + ") "),
      (n || r) && (y += "translate(" + n + "%, " + r + "%) "),
      (w || "0px" !== s || "0px" !== o || "0px" !== a) &&
        (y +=
          "0px" !== a || w
            ? "translate3d(" + s + ", " + o + ", " + a + ") "
            : "translate(" + s + ", " + o + ") "),
      "0deg" !== h && (y += "rotate(" + h + ") "),
      "0deg" !== u && (y += "rotateY(" + u + ") "),
      "0deg" !== l && (y += "rotateX(" + l + ") "),
      ("0deg" === c && "0deg" === f) || (y += "skew(" + c + ", " + f + ") "),
      (1 === d && 1 === p) || (y += "scale(" + d + ", " + p + ") "),
      (g.style[Zi] = y || "translate(0, 0)");
  },
  Cn = function (t, e) {
    var i,
      n,
      r,
      s,
      o,
      a = e || this,
      h = a.xPercent,
      u = a.yPercent,
      l = a.x,
      c = a.y,
      f = a.rotation,
      d = a.skewX,
      p = a.skewY,
      m = a.scaleX,
      _ = a.scaleY,
      g = a.target,
      v = a.xOrigin,
      y = a.yOrigin,
      w = a.xOffset,
      b = a.yOffset,
      T = a.forceCSS,
      x = parseFloat(l),
      O = parseFloat(c);
    (f = parseFloat(f)),
      (d = parseFloat(d)),
      (p = parseFloat(p)) && ((d += p = parseFloat(p)), (f += p)),
      f || d
        ? ((f *= Li),
          (d *= Li),
          (i = Math.cos(f) * m),
          (n = Math.sin(f) * m),
          (r = Math.sin(f - d) * -_),
          (s = Math.cos(f - d) * _),
          d &&
            ((p *= Li),
            (o = Math.tan(d - p)),
            (r *= o = Math.sqrt(1 + o * o)),
            (s *= o),
            p &&
              ((o = Math.tan(p)), (i *= o = Math.sqrt(1 + o * o)), (n *= o))),
          (i = kt(i)),
          (n = kt(n)),
          (r = kt(r)),
          (s = kt(s)))
        : ((i = m), (s = _), (n = r = 0)),
      ((x && !~(l + "").indexOf("px")) || (O && !~(c + "").indexOf("px"))) &&
        ((x = dn(g, "x", l, "px")), (O = dn(g, "y", c, "px"))),
      (v || y || w || b) &&
        ((x = kt(x + v - (v * i + y * r) + w)),
        (O = kt(O + y - (v * n + y * s) + b))),
      (h || u) &&
        ((o = g.getBBox()),
        (x = kt(x + (h / 100) * o.width)),
        (O = kt(O + (u / 100) * o.height))),
      (o =
        "matrix(" + i + "," + n + "," + r + "," + s + "," + x + "," + O + ")"),
      g.setAttribute("transform", o),
      T && (g.style[Zi] = o);
  },
  An = function (t, e, i, n, r, s) {
    var o,
      a,
      h = 360,
      u = H(r),
      l = parseFloat(r) * (u && ~r.indexOf("rad") ? Pi : 1),
      c = s ? l * s : l - n,
      f = n + c + "deg";
    return (
      u &&
        ("short" === (o = r.split("_")[1]) &&
          (c %= h) !== c % 180 &&
          (c += c < 0 ? h : -360),
        "cw" === o && c < 0
          ? (c = ((c + 36e9) % h) - ~~(c / h) * h)
          : "ccw" === o && c > 0 && (c = ((c - 36e9) % h) - ~~(c / h) * h)),
      (t._pt = a = new wi(t._pt, e, i, n, c, Ni)),
      (a.e = f),
      (a.u = "deg"),
      t._props.push(i),
      a
    );
  },
  In = function (t, e) {
    for (var i in e) t[i] = e[i];
    return t;
  },
  Pn = function (t, e, i) {
    var n,
      r,
      s,
      o,
      a,
      h,
      u,
      l = In({}, i._gsap),
      c = i.style;
    for (r in (l.svg
      ? ((s = i.getAttribute("transform")),
        i.setAttribute("transform", ""),
        (c[Zi] = e),
        (n = Mn(i, 1)),
        ln(i, Zi),
        i.setAttribute("transform", s))
      : ((s = getComputedStyle(i)[Zi]),
        (c[Zi] = e),
        (n = Mn(i, 1)),
        (c[Zi] = s)),
    Ii))
      (s = l[r]) !== (o = n[r]) &&
        "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 &&
        ((a = le(s) !== (u = le(o)) ? dn(i, r, s, u) : parseFloat(s)),
        (h = parseFloat(o)),
        (t._pt = new wi(t._pt, n, r, a, h - a, ji)),
        (t._pt.u = u || 0),
        t._props.push(r));
    In(n, l);
  };
St("padding,margin,Width,Radius", function (t, e) {
  var i = "Top",
    n = "Right",
    r = "Bottom",
    s = "Left",
    o = (e < 3 ? [i, n, r, s] : [i + s, i + n, r + n, r + s]).map(function (i) {
      return e < 2 ? t + i : "border" + i + t;
    });
  vn[e > 1 ? "border" + t : t] = function (t, e, i, n, r) {
    var s, a;
    if (arguments.length < 4)
      return (
        (s = o.map(function (e) {
          return pn(t, e, i);
        })),
        5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a
      );
    (s = (n + "").split(" ")),
      (a = {}),
      o.forEach(function (t, e) {
        return (a[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
      }),
      t.init(e, a, r);
  };
});
var Ln,
  Rn,
  Bn,
  zn = {
    name: "css",
    register: sn,
    targetTest: function (t) {
      return t.style && t.nodeType;
    },
    init: function (t, e, i, n, r) {
      var s,
        o,
        a,
        h,
        u,
        l,
        c,
        f,
        d,
        p,
        m,
        _,
        g,
        v,
        y,
        w,
        b,
        T,
        x,
        O = this._props,
        M = t.style,
        D = i.vars.startAt;
      for (c in (Si || sn(), e))
        if ("autoRound" !== c && ((o = e[c]), !wt[c] || !ti(c, e, i, n, t, r)))
          if (
            ((u = typeof o),
            (l = vn[c]),
            "function" === u && (u = typeof (o = o.call(i, n, t, r))),
            "string" === u && ~o.indexOf("random(") && (o = be(o)),
            l)
          )
            l(this, t, c, o, i) && (y = 1);
          else if ("--" === c.substr(0, 2))
            (s = (getComputedStyle(t).getPropertyValue(c) + "").trim()),
              (o += ""),
              (Ie.lastIndex = 0),
              Ie.test(s) || ((f = le(s)), (d = le(o))),
              d ? f !== d && (s = dn(t, c, s, d) + d) : f && (o += f),
              this.add(M, "setProperty", s, o, n, r, 0, 0, c),
              O.push(c);
          else if ("undefined" !== u) {
            if (
              (D && c in D
                ? ((s =
                    "function" == typeof D[c] ? D[c].call(i, n, t, r) : D[c]),
                  H(s) && ~s.indexOf("random(") && (s = be(s)),
                  le(s + "") || (s += q.units[c] || le(pn(t, c)) || ""),
                  "=" === (s + "").charAt(1) && (s = pn(t, c)))
                : (s = pn(t, c)),
              (h = parseFloat(s)),
              (p =
                "string" === u && "=" === o.charAt(1)
                  ? +(o.charAt(0) + "1")
                  : 0) && (o = o.substr(2)),
              (a = parseFloat(o)),
              c in qi &&
                ("autoAlpha" === c &&
                  (1 === h && "hidden" === pn(t, "visibility") && a && (h = 0),
                  cn(
                    this,
                    M,
                    "visibility",
                    h ? "inherit" : "hidden",
                    a ? "inherit" : "hidden",
                    !a
                  )),
                "scale" !== c &&
                  "transform" !== c &&
                  ~(c = qi[c]).indexOf(",") &&
                  (c = c.split(",")[0])),
              (m = c in Ii))
            )
              if (
                (_ ||
                  (((g = t._gsap).renderTransform && !e.parseTransform) ||
                    Mn(t, e.parseTransform),
                  (v = !1 !== e.smoothOrigin && g.smooth),
                  ((_ = this._pt =
                    new wi(
                      this._pt,
                      M,
                      Zi,
                      0,
                      1,
                      g.renderTransform,
                      g,
                      0,
                      -1
                    )).dep = 1)),
                "scale" === c)
              )
                (this._pt = new wi(
                  this._pt,
                  g,
                  "scaleY",
                  g.scaleY,
                  (p ? p * a : a - g.scaleY) || 0
                )),
                  O.push("scaleY", c),
                  (c += "X");
              else {
                if ("transformOrigin" === c) {
                  (b = void 0),
                    (T = void 0),
                    (x = void 0),
                    (b = (w = o).split(" ")),
                    (T = b[0]),
                    (x = b[1] || "50%"),
                    ("top" !== T &&
                      "bottom" !== T &&
                      "left" !== x &&
                      "right" !== x) ||
                      ((w = T), (T = x), (x = w)),
                    (b[0] = _n[T] || T),
                    (b[1] = _n[x] || x),
                    (o = b.join(" ")),
                    g.svg
                      ? On(t, o, 0, v, 0, this)
                      : ((d = parseFloat(o.split(" ")[2]) || 0) !== g.zOrigin &&
                          cn(this, g, "zOrigin", g.zOrigin, d),
                        cn(this, M, c, Dn(s), Dn(o)));
                  continue;
                }
                if ("svgOrigin" === c) {
                  On(t, o, 1, v, 0, this);
                  continue;
                }
                if (c in wn) {
                  An(this, g, c, h, o, p);
                  continue;
                }
                if ("smoothOrigin" === c) {
                  cn(this, g, "smooth", g.smooth, o);
                  continue;
                }
                if ("force3D" === c) {
                  g[c] = o;
                  continue;
                }
                if ("transform" === c) {
                  Pn(this, o, t);
                  continue;
                }
              }
            else c in M || (c = rn(c) || c);
            if (
              m ||
              ((a || 0 === a) && (h || 0 === h) && !Fi.test(o) && c in M)
            )
              a || (a = 0),
                (f = (s + "").substr((h + "").length)) !==
                  (d = le(o) || (c in q.units ? q.units[c] : f)) &&
                  (h = dn(t, c, s, d)),
                (this._pt = new wi(
                  this._pt,
                  m ? g : M,
                  c,
                  h,
                  p ? p * a : a - h,
                  m || ("px" !== d && "zIndex" !== c) || !1 === e.autoRound
                    ? ji
                    : Ui
                )),
                (this._pt.u = d || 0),
                f !== d && "%" !== d && ((this._pt.b = s), (this._pt.r = Yi));
            else if (c in M) mn.call(this, t, c, s, o);
            else {
              if (!(c in t)) {
                dt(c, o);
                continue;
              }
              this.add(t, c, s || t[c], o, n, r);
            }
            O.push(c);
          }
      y && yi(this);
    },
    get: pn,
    aliases: qi,
    getSetter: function (t, e, i) {
      var n = qi[e];
      return (
        n && n.indexOf(",") < 0 && (e = n),
        e in Ii && e !== Ki && (t._gsap.x || pn(t, "x"))
          ? i && Ci === i
            ? "scale" === e
              ? $i
              : Qi
            : ((Ci = i || {}), "scale" === e ? Gi : Ji)
          : t.style && !G(t.style[e])
          ? Vi
          : ~e.indexOf("-")
          ? Hi
          : ci(t, e)
      );
    },
    core: { _removeProperty: ln, _getMatrix: xn },
  };
(Oi.utils.checkPrefix = rn),
  (Bn = St(
    (Ln = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
      "," +
      (Rn = "rotation,rotationX,rotationY,skewX,skewY") +
      ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
    function (t) {
      Ii[t] = 1;
    }
  )),
  St(Rn, function (t) {
    (q.units[t] = "deg"), (wn[t] = 1);
  }),
  (qi[Bn[13]] = Ln + "," + Rn),
  St(
    "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
    function (t) {
      var e = t.split(":");
      qi[e[1]] = Bn[e[0]];
    }
  ),
  St(
    "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
    function (t) {
      q.units[t] = "px";
    }
  ),
  Oi.registerPlugin(zn);
var Fn = Oi.registerPlugin(zn) || Oi;
Fn.core.Tween;
let qn = { x: 0, y: 0 };
window.addEventListener(
  "mousemove",
  (t) => (qn = ((t) => ({ x: t.clientX, y: t.clientY }))(t))
);
let jn = { duration: 0.7, ease: "expo" };
class Nn {
  show(t = !0) {
    Fn.killTweensOf([this.DOM.imgInner, this.DOM.captionInner]),
      (this.showTimeline = Fn.timeline({ defaults: jn })
        .addLabel("start", 0)
        .set(
          [this.DOM.imgInner, this.DOM.captionInner],
          { y: "105%" },
          "start"
        )),
      t
        ? this.showTimeline.to(
            [this.DOM.imgInner, this.DOM.captionInner],
            { y: "0%" },
            "start"
          )
        : this.showTimeline.set(
            [this.DOM.imgInner, this.DOM.captionInner],
            { y: "0%" },
            "start"
          );
  }
  hide(t = !0) {
    Fn.killTweensOf([this.DOM.imgInner, this.DOM.captionInner]),
      (this.hideTimeline = Fn.timeline({ defaults: jn }).addLabel("start", 0)),
      this.hideTimeline[t ? "to" : "set"](
        [this.DOM.imgInner, this.DOM.captionInner],
        { y: "105%" },
        "start"
      );
  }
  showPreview() {
    this.preview.show();
  }
  hidePreview() {
    this.preview.hide();
  }
  constructor(t, e) {
    h(this, "DOM", {
      el: null,
      img: null,
      imgInner: null,
      caption: null,
      captionInner: null,
    }),
      h(this, "preview", void 0),
      h(this, "hideTimeline", void 0),
      h(this, "showTimeline", void 0),
      (this.DOM = { el: t }),
      (this.DOM.img = this.DOM.el.querySelector(".thumb__img")),
      (this.DOM.imgInner = this.DOM.img.querySelector(".thumb__img-inner")),
      (this.DOM.caption = this.DOM.el.querySelector(".thumb__caption")),
      (this.DOM.captionInner = this.DOM.caption.querySelector(
        ".thumb__caption-inner"
      )),
      (this.preview = e);
  }
}
function Yn(t, e) {
  for (var i = 0; i < e.length; i++) {
    var n = e[i];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(t, n.key, n);
  }
}
function Un(t, e, i) {
  return e && Yn(t.prototype, e), i && Yn(t, i), t;
}
function Xn(t, e) {
  return Object.getOwnPropertyNames(Object(t)).reduce(function (i, n) {
    var r = Object.getOwnPropertyDescriptor(Object(t), n),
      s = Object.getOwnPropertyDescriptor(Object(e), n);
    return Object.defineProperty(i, n, s || r);
  }, {});
}
function Wn(t) {
  var e = Xn(t);
  return (
    (e.types || e.split) && (e.types = e.types || e.split),
    (e.absolute || e.position) &&
      (e.absolute = e.absolute || /absolute/.test(t.position)),
    e
  );
}
function Vn(t) {
  return null !== t && "object" == typeof t;
}
function Hn(t) {
  return Array.isArray(t)
    ? t
    : null == t
    ? []
    : (function (t) {
        return (
          Vn(t) &&
          (function (t) {
            return "number" == typeof t && t > -1 && t % 1 == 0;
          })(t.length)
        );
      })(t)
    ? Array.prototype.slice.call(t)
    : [t];
}
function Qn(t) {
  return Vn(t) && /^(1|3|11)$/.test(t.nodeType);
}
function $n(t) {
  return "string" == typeof t;
}
function Gn(t) {
  var e,
    i = t;
  return (
    $n(t) &&
      (i = /^(#[a-z]\w+)$/.test(t.trim())
        ? document.getElementById(t.trim().slice(1))
        : document.querySelectorAll(t)),
    ((e = i),
    Hn(e).reduce(function (t, e) {
      return t.concat(Hn(e));
    }, [])).filter(Qn)
  );
}
function Jn(t, e, i) {
  var n = {},
    r = null;
  return (
    Vn(t) &&
      ((r = t[Jn.expando] || (t[Jn.expando] = ++Jn.uid)),
      (n = Jn.cache[r] || (Jn.cache[r] = {}))),
    void 0 === i
      ? void 0 === e
        ? n
        : n[e]
      : void 0 !== e
      ? ((n[e] = i), i)
      : void 0
  );
}
function Zn(t) {
  var e = t && t[Jn.expando];
  e && (delete t[e], delete Jn.cache[e]);
}
function Kn(t, e) {
  for (var i = Hn(t), n = i.length, r = 0; r < n; r++) e(i[r], r, i);
}
(Jn.expando = "splitType".concat(1 * new Date())),
  (Jn.cache = {}),
  (Jn.uid = 0);
var tr = "[".concat("\\ud800-\\udfff", "]"),
  er = "["
    .concat("\\u0300-\\u036f\\ufe20-\\ufe23")
    .concat("\\u20d0-\\u20f0", "]"),
  ir = "(?:".concat(er, "|").concat("\\ud83c[\\udffb-\\udfff]", ")"),
  nr = "[^".concat("\\ud800-\\udfff", "]"),
  rr = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  sr = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  or = "".concat(ir, "?"),
  ar = "[".concat("\\ufe0e\\ufe0f", "]?"),
  hr =
    ar + or + ("(?:\\u200d(?:" + [nr, rr, sr].join("|") + ")" + ar + or + ")*"),
  ur = "(?:".concat(
    ["".concat(nr).concat(er, "?"), er, rr, sr, tr].join("|"),
    "\n)"
  ),
  lr = RegExp(
    ""
      .concat("\\ud83c[\\udffb-\\udfff]", "(?=")
      .concat("\\ud83c[\\udffb-\\udfff]", ")|")
      .concat(ur)
      .concat(hr),
    "g"
  ),
  cr = RegExp(
    "[".concat(
      [
        "\\u200d",
        "\\ud800-\\udfff",
        "\\u0300-\\u036f\\ufe20-\\ufe23",
        "\\u20d0-\\u20f0",
        "\\ufe0e\\ufe0f",
      ].join(""),
      "]"
    )
  );
function fr(t) {
  return cr.test(t);
}
function dr(t) {
  return fr(t)
    ? (function (t) {
        return t.match(lr) || [];
      })(t)
    : (function (t) {
        return t.split("");
      })(t);
}
function pr(t) {
  return null == t ? "" : String(t);
}
function mr(t, e) {
  var i = document.createElement(t);
  return e
    ? (Object.keys(e).forEach(function (t) {
        var n = e[t];
        null !== n &&
          ("textContent" === t || "innerHTML" === t
            ? (i[t] = n)
            : "children" === t
            ? Kn(n, function (t) {
                Qn(t) && i.appendChild(t);
              })
            : i.setAttribute(t, String(n).trim()));
      }),
      i)
    : i;
}
var _r = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: "lines, words, chars",
    absolute: !1,
    tagName: "div",
  },
  gr = function () {
    return document.createDocumentFragment();
  },
  vr = function (t) {
    return document.createTextNode(t);
  };
function yr(t, e) {
  var i,
    n,
    r = (function (t) {
      var e = $n(t) || Array.isArray(t) ? String(t) : "";
      return {
        lines: /line/i.test(e),
        words: /word/i.test(e),
        chars: /(char)|(character)/i.test(e),
      };
    })((e = Xn(_r, e)).types),
    s = e.tagName,
    o = "B".concat(1 * new Date(), "R"),
    a = "absolute" === e.position || e.absolute,
    h = [],
    u = [];
  n = r.lines ? mr("div") : gr();
  var l = (function (t, e) {
    var i = t.textContent;
    if (e) {
      var n = t.innerHTML,
        r = document.createElement("div");
      (r.innerHTML = n.replace(/<br\s*\/?>/g, " ".concat(e, " "))),
        (i = r.textContent);
    }
    return i.replace(/\s+/g, " ").trim();
  })(t, o);
  if (
    ((i = (function (t) {
      var e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " ";
      return (t = t ? String(t) : "").split(e);
    })(l).reduce(function (t, i, a, h) {
      var l, c;
      return i === o
        ? (n.appendChild(mr("br")), t)
        : (r.chars &&
            ((c = (function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "";
              return (t = pr(t)) && $n(t) && !e && fr(t) ? dr(t) : t.split(e);
            })(i).map(function (t) {
              return mr(s, {
                class: "".concat(e.splitClass, " ").concat(e.charClass),
                style: "display: inline-block;",
                textContent: t,
              });
            })),
            (u = u.concat(c))),
          r.words || r.lines
            ? ((l = mr(s, {
                class: "".concat(e.wordClass, " ").concat(e.splitClass),
                style: "display: inline-block; position: ".concat(
                  r.words ? "relative" : "static"
                ),
                children: r.chars ? c : null,
                textContent: r.chars ? null : i,
              })),
              n.appendChild(l))
            : Kn(c, function (t) {
                n.appendChild(t);
              }),
          a !== h.length - 1 && n.appendChild(vr(" ")),
          r.words ? t.concat(l) : t);
    }, [])),
    (t.innerHTML = ""),
    t.appendChild(n),
    !a && !r.lines)
  )
    return { chars: u, words: i, lines: [] };
  var c,
    f,
    d,
    p,
    m,
    _ = [],
    g = [],
    v = Jn(t, "nodes", t.getElementsByTagName(s)),
    y = t.parentElement,
    w = t.nextElementSibling,
    b = window.getComputedStyle(t).textAlign;
  return (
    a &&
      ((p = { left: n.offsetLeft, top: n.offsetTop, width: n.offsetWidth }),
      (d = t.offsetWidth),
      (f = t.offsetHeight),
      (Jn(t).cssWidth = t.style.width),
      (Jn(t).cssHeight = t.style.height)),
    Kn(v, function (t) {
      if (t !== n) {
        var e,
          i = t.parentElement === n;
        r.lines &&
          i &&
          ((e = Jn(t, "top", t.offsetTop)) !== m && ((m = e), _.push((g = []))),
          g.push(t)),
          a &&
            ((Jn(t).top = e || t.offsetTop),
            (Jn(t).left = t.offsetLeft),
            (Jn(t).width = t.offsetWidth),
            (Jn(t).height = c || (c = t.offsetHeight)));
      }
    }),
    y && y.removeChild(t),
    r.lines &&
      ((n = gr()),
      (h = _.map(function (t) {
        var i = mr(s, {
          class: "".concat(e.splitClass, " ").concat(e.lineClass),
          style: "display: block; text-align: ".concat(b, "; width: 100%;"),
        });
        return (
          n.appendChild(i),
          a &&
            ((Jn(i).type = "line"),
            (Jn(i).top = Jn(t[0]).top),
            (Jn(i).height = c)),
          Kn(t, function (t, e, n) {
            r.words
              ? i.appendChild(t)
              : r.chars
              ? Kn(t.children, function (t) {
                  i.appendChild(t);
                })
              : i.appendChild(vr(t.textContent)),
              e !== n.length - 1 && i.appendChild(vr(" "));
          }),
          i
        );
      })),
      t.replaceChild(n, t.firstChild)),
    a &&
      ((t.style.width = "".concat(t.style.width || d, "px")),
      (t.style.height = "".concat(f, "px")),
      Kn(v, function (t) {
        var e = "line" === Jn(t).type,
          i = !e && "line" === Jn(t.parentElement).type;
        (t.style.top = "".concat(i ? 0 : Jn(t).top, "px")),
          (t.style.left = "".concat(
            e ? p.left : Jn(t).left - (i ? p.left : 0),
            "px"
          )),
          (t.style.height = "".concat(Jn(t).height, "px")),
          (t.style.width = "".concat(e ? p.width : Jn(t).width, "px")),
          (t.style.position = "absolute");
      })),
    y && (w ? y.insertBefore(t, w) : y.appendChild(t)),
    { lines: h, words: r.words ? i : [], chars: u }
  );
}
var wr = Xn(_r, {}),
  br = (function () {
    function t(e, i) {
      !(function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, t),
        (this.isSplit = !1),
        (this.settings = Xn(wr, Wn(i))),
        (this.elements = Gn(e) || []),
        this.elements.length &&
          ((this.originals = this.elements.map(function (t) {
            return Jn(t, "html", Jn(t).html || t.innerHTML);
          })),
          this.settings.types && this.split());
    }
    return (
      Un(t, null, [
        {
          key: "defaults",
          get: function () {
            return wr;
          },
          set: function (t) {
            wr = Xn(wr, Wn(t));
          },
        },
      ]),
      Un(t, [
        {
          key: "split",
          value: function (t) {
            var e = this;
            this.revert(),
              (this.lines = []),
              (this.words = []),
              (this.chars = []);
            var i = [window.pageXOffset, window.pageYOffset];
            void 0 !== t && (this.settings = Xn(this.settings, Wn(t))),
              this.elements.forEach(function (t) {
                var i = yr(t, e.settings),
                  n = i.lines,
                  r = i.words,
                  s = i.chars;
                (e.lines = e.lines.concat(n)),
                  (e.words = e.words.concat(r)),
                  (e.chars = e.chars.concat(s)),
                  (Jn(t).isSplit = !0);
              }),
              (this.isSplit = !0),
              window.scrollTo(i[0], i[1]),
              this.elements.forEach(function (t) {
                Hn(Jn(t).nodes || []).forEach(Zn);
              });
          },
        },
        {
          key: "revert",
          value: function () {
            var t = this;
            this.isSplit &&
              ((this.lines = null), (this.words = null), (this.chars = null)),
              this.elements.forEach(function (e) {
                Jn(e).isSplit &&
                  Jn(e).html &&
                  ((e.innerHTML = Jn(e).html),
                  (e.style.height = Jn(e).cssHeight || ""),
                  (e.style.width = Jn(e).cssWidth || ""),
                  (t.isSplit = !1));
              });
          },
        },
      ]),
      t
    );
  })();
class Tr {
  in(t = !0) {
    return (
      (this.isVisible = !0),
      Fn.killTweensOf(this.SplitTypeInstance.lines),
      (this.inTimeline = Fn.timeline({ defaults: jn })
        .addLabel("start", 0)
        .set(this.SplitTypeInstance.lines, { y: "150%", rotate: 10 }, "start")),
      t
        ? this.inTimeline.to(
            this.SplitTypeInstance.lines,
            { y: "0%", rotate: 0, stagger: 0.02 },
            "start"
          )
        : this.inTimeline.to(
            this.SplitTypeInstance.lines,
            { y: "0%" },
            "start"
          ),
      this.inTimeline
    );
  }
  out(t = !0) {
    return (
      (this.isVisible = !1),
      Fn.killTweensOf(this.SplitTypeInstance.lines),
      (this.outTimeline = Fn.timeline({ defaults: jn }).addLabel("start", 0)),
      t
        ? this.outTimeline.to(
            this.SplitTypeInstance.lines,
            { y: "-150%", rotate: -5, stagger: 0.02 },
            "start"
          )
        : this.outTimeline.set(
            this.SplitTypeInstance.lines,
            { y: "-150%" },
            "start"
          ),
      this.outTimeline
    );
  }
  initEvents() {
    window.addEventListener("resize", () => {
      this.SplitTypeInstance.split(),
        a(this.SplitTypeInstance.lines, "div", "oh"),
        this.isVisible || Fn.set(this.SplitTypeInstance.lines, { y: "105%" });
    });
  }
  constructor(t) {
    h(this, "DOM", { el: null }),
      h(this, "SplitTypeInstance", void 0),
      h(this, "isVisible", void 0),
      h(this, "inTimeline", void 0),
      h(this, "outTimeline", void 0),
      (this.DOM = { el: t }),
      (this.SplitTypeInstance = new br(this.DOM.el, { types: "lines" })),
      a(this.SplitTypeInstance.lines, "div", "oh"),
      this.initEvents();
  }
}
class xr {
  show() {
    Fn.killTweensOf([this.DOM.cover, this.DOM.imgInner]),
      (this.showTimeline = Fn.timeline({ defaults: jn })
        .addLabel("start", 0)

        .set(this.DOM.el, { zIndex: 100 }, "start")
        .set(this.DOM.texts, { opacity: 1 }, "start")
        .to(this.DOM.cover, { scaleY: 1 }, "start")
        .to(this.DOM.imgInner, { scale: 1.05 }, "start")
        .to(
          this.DOM.img,
          {
            startAt: { filter: "brightness(400%)" },
            filter: "brightness(100%)",
          },
          "start"
        ));
    for (const t of this.arrTextLinesReveal)
      this.showTimeline.add(t.in(), "start");
  }
  hide() {
    this.showTimeline && this.showTimeline.kill(),
      Fn.killTweensOf([this.DOM.cover, this.DOM.imgInner]),
      Fn.set(this.DOM.el, { zIndex: 1 }),
      Fn.set(this.DOM.texts, { opacity: 0 }),
      Fn.set(this.DOM.cover, { scaleY: 2 }),
      Fn.set(this.DOM.imgInner, { scale: 1 });
    for (const t of this.arrTextLinesReveal) t.out(!1);
  }
  constructor(t) {
    h(this, "DOM", {
      el: null,
      img: null,
      imgInner: null,
      cover: null,
      texts: null,
    }),
      h(this, "arrTextLinesReveal", []),
      h(this, "showTimeline", void 0),
      (this.DOM = { el: t }),
      (this.DOM.img = this.DOM.el.querySelector(".preview__img")),
      (this.DOM.imgInner = this.DOM.img.querySelector(".preview__img-inner")),
      (this.DOM.cover = this.DOM.el.querySelector(".preview__item-cover")),
      (this.DOM.texts = this.DOM.el.querySelectorAll(".line-effect")),
      [...this.DOM.texts].forEach((t) => {
        this.arrTextLinesReveal.push(new Tr(t));
      });
  }
}
let Or = [],
  Mr = [];
const Dr = new (class {
    enter() {
      (this.renderedStyles.scale.current = 2),
        (this.renderedStyles.opacity.current = 0.8);
    }
    leave() {
      (this.renderedStyles.scale.current = 1),
        (this.renderedStyles.opacity.current = 1);
    }
    show() {
      this.renderedStyles.opacity.current = 1;
    }
    hide() {
      this.renderedStyles.opacity.current = 0;
    }
    render() {
      (this.renderedStyles.tx.current = qn.x - this.bounds.width / 2),
        (this.renderedStyles.ty.current = qn.y - this.bounds.height / 2);
      for (const t in this.renderedStyles)
        this.renderedStyles[t].previous = s(
          this.renderedStyles[t].previous,
          this.renderedStyles[t].current,
          this.renderedStyles[t].amt
        );
      (this.DOM.el.style.transform = `translateX(${this.renderedStyles.tx.previous}px) translateY(${this.renderedStyles.ty.previous}px) scale(${this.renderedStyles.scale.previous})`),
        (this.DOM.el.style.opacity = this.renderedStyles.opacity.previous),
        requestAnimationFrame(() => this.render());
    }
    constructor(t, e = "a") {
      h(this, "DOM", { el: null }),
        h(this, "renderedStyles", {
          tx: { previous: 0, current: 0, amt: 0.4 },
          ty: { previous: 0, current: 0, amt: 0.4 },
          scale: { previous: 1, current: 1, amt: 0.2 },
          opacity: { previous: 1, current: 1, amt: 0.3 },
        }),
        h(this, "bounds", void 0),
        (this.DOM = { el: t }),
        (this.DOM.el.style.opacity = 0),
        (this.bounds = this.DOM.el.getBoundingClientRect()),
        (this.onMouseMoveEv = () => {
          (this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
            qn.x - this.bounds.width / 2),
            (this.renderedStyles.ty.previous = this.renderedStyles.ty.previous =
              qn.y - this.bounds.height / 2),
            Fn.to(this.DOM.el, {
              duration: 0.9,
              ease: "Power3.easeOut",
              opacity: 1,
            }),
            requestAnimationFrame(() => this.render()),
            window.removeEventListener("mousemove", this.onMouseMoveEv);
        }),
        window.addEventListener("mousemove", this.onMouseMoveEv),
        [...document.querySelectorAll(e)].forEach((t) => {
          t.addEventListener("mouseenter", () => this.enter()),
            t.addEventListener("mouseleave", () => this.leave());
        });
    }
  })(document.querySelector(".cursor"), "a, .thumb"),
  Er = new (class {
    show(t, e) {
      (this.DOM.thumb = t.DOM.img),
        (this.DOM.dotEl = [...this.DOM.mapItems][e].querySelector(".dot")),
        (this.dotBounds = this.DOM.dotEl.getBoundingClientRect()),
        (this.hoverMapItemBounds =
          this.DOM.mapItems[0].getBoundingClientRect()),
        (this.thumbBounds = this.DOM.thumb.getBoundingClientRect()),
        this.DOM.thumb.classList.contains("thumb__img--nocursor") &&
          this.cursor.hide(),
        Fn.killTweensOf([this.DOM.el, this.DOM.dotEl]),
        Fn.to([this.DOM.el, this.DOM.dotEl], {
          duration: 1,
          ease: "expo",
          opacity: 1,
        }),
        (this.onClickDotEv = () => {
          Fn.timeline()
            .to(this.DOM.dotEl, { duration: 0.1, ease: "power1.in", scale: 3 })
            .to(this.DOM.dotEl, { duration: 1, ease: "expo", scale: 1 });
        }),
        this.DOM.thumb.addEventListener("click", this.onClickDotEv),
        this.loopRender();
    }
    hide() {
      this.DOM.thumb.classList.contains("thumb__img--nocursor") &&
        this.cursor.show(),
        Fn.killTweensOf([this.DOM.el, this.DOM.dotEl]),
        Fn.set([this.DOM.el, this.DOM.dotEl], { opacity: 0 }),
        this.DOM.thumb.removeEventListener("click", this.onClickDotEv),
        this.stopRendering();
    }
    loopRender() {
      this.requestId ||
        (this.requestId = requestAnimationFrame(() => this.render()));
    }
    stopRendering() {
      this.requestId &&
        (window.cancelAnimationFrame(this.requestId),
        (this.requestId = void 0));
    }
    render() {
      (this.requestId = void 0),
        Fn.set(this.DOM.dotEl, {
          x:
            o(
              this.cursor.renderedStyles.tx.previous -
                this.thumbBounds.left +
                this.cursor.bounds.width / 2,
              0,
              this.thumbBounds.width,
              0,
              this.hoverMapItemBounds.width
            ) -
            this.dotBounds.width / 2 -
            1,
          y:
            o(
              this.cursor.renderedStyles.ty.previous -
                this.thumbBounds.top +
                this.cursor.bounds.height / 2,
              0,
              this.thumbBounds.height,
              0,
              this.hoverMapItemBounds.height
            ) -
            this.dotBounds.height / 2 -
            1,
        }),
        this.loopRender();
    }
    constructor(t, e) {
      h(this, "DOM", { el: null, mapItems: null, dotEl: null, thumb: null }),
        h(this, "cursor", void 0),
        h(this, "hoverMapItemBounds", void 0),
        h(this, "dotBounds", void 0),
        h(this, "thumbBounds", void 0),
        h(this, "requestId", void 0),
        (this.DOM = { el: t }),
        (this.DOM.mapItems =
          this.DOM.el.querySelectorAll(".preview__map-item")),
        (this.cursor = e);
    }
  })(document.querySelector(".preview__map"), Dr);
[...document.querySelectorAll(".preview__item")].forEach((t) => {
  Mr.push(new xr(t));
}),
  [...document.querySelectorAll(".thumb")].forEach((t, e) => {
    Or.push(new Nn(t, Mr[e]));
  });

// const btn = document.querySelector(".frame__title");
//     btn.addEventListener("click", () => {
//       t.hidePreview(), Sr(), Ar();
//     });

// click fcn
for (const t of Or)
  t.DOM.img.addEventListener("mouseenter", () => {
    kr(), t.showPreview(), Cr(t);
  }),
    t.DOM.img.addEventListener("mouseleave", () => {
      t.hidePreview(), Sr(), Ar();
    });

const Sr = () => {
    for (const t of Or) t.show(!1);
  },
  kr = () => {
    for (const t of Or) t.hide();
  },
  Cr = (t) => {
    Er.show(t, Or.indexOf(t));
  },
  Ar = () => {
    Er.hide();
  };
((t = "img") =>
  new Promise((e) => {
    r(document.querySelectorAll(t), { background: !0 }, e);
  }))(".preview__img-inner, .thumb__img-inner").then(() =>
  document.body.classList.remove("loading")
);
