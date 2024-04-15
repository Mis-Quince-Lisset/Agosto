(function () {
  const y = document.createElement("link").relList;
  if (y && y.supports && y.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver((e) => {
    for (const i of e)
      if (i.type === "childList")
        for (const r of i.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && s(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function p(e) {
    const i = {};
    return (
      e.integrity && (i.integrity = e.integrity),
      e.referrerPolicy && (i.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const i = p(e);
    fetch(e.href, i);
  }
})();
function H(C) {
  return C && C.__esModule && Object.prototype.hasOwnProperty.call(C, "default")
    ? C.default
    : C;
}
var D = { exports: {} };
(function (C) {
  function y(s) {
    "@babel/helpers - typeof";
    return (
      (y =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                typeof Symbol == "function" &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      y(s)
    );
  }
  var p = function (s, e, i, r) {
    var h = this;
    (this.elementName = s),
      (this.textsInit = []),
      typeof i == "string"
        ? this.textsInit.push({ text: i })
        : y(i) == "object" && (this.textsInit = i),
      (this.texts = this.textsInit),
      (this.properties = r || {}),
      (this.properties.textAlign = this.properties.textAlign || "left"),
      (this.letterSpacing = 0),
      (this.element = document.querySelector(this.elementName)),
      (this.fontSource = e),
      (this.characters = {}),
      (this.drawnCharacters = {}),
      (this.totalPathLength = 0),
      (this.fontSize = 24),
      (this.frameRate = 1e3 / 30),
      (this.prevDuration = 0),
      (this.completed = !1),
      (this.ready = function (n) {
        h.readyF = n;
      }),
      (this.animationEnd = function (n) {
        h.animationEndF = n;
      }),
      (this.svg = this.createNode("svg", { width: "100%" })),
      this.element.appendChild(this.svg),
      (this.font = document.createElement("object")),
      this.getSVGData();
  };
  (p.prototype.createNode = function (s, e) {
    for (var i in ((s = document.createElementNS(
      "http://www.w3.org/2000/svg",
      s
    )),
    e))
      s.setAttributeNS(
        null,
        i.replace(/[A-Z]/g, function (r) {
          return "-" + r.toLowerCase();
        }),
        e[i]
      );
    return s;
  }),
    (p.prototype.getSVGData = function () {
      var s = this,
        e = new XMLHttpRequest();
      e.open("GET", this.fontSource, !0),
        (e.onreadystatechange = function () {
          e.readyState == 4 &&
            e.status == 200 &&
            ((s.contents = JSON.parse(e.responseText)),
            (s.characters = JSON.parse(e.responseText).c),
            s.preCreate(),
            s.createText());
        }),
        e.send(null);
    }),
    (p.prototype.preCreate = function () {
      (function () {
        return (
          typeof NodeList.prototype.forEach != "function" &&
          void (NodeList.prototype.forEach = Array.prototype.forEach)
        );
      })(),
        (this.questionMark =
          this.characters[63] == null
            ? {
                paths: [
                  {
                    w: 8.643798828125,
                    h: 14.231731414794922,
                    my: 22.666500004827977,
                    mx: 0,
                    pw: 28.2464542388916,
                    d: "m 0,0 c -2,-6.01,5,-8.64,8,-3.98,2,4.09,-7,8.57,-7,11.85",
                  },
                  {
                    w: 1.103759765625,
                    h: 1.549820899963379,
                    my: 8.881500004827977,
                    mx: 1,
                    pw: 4.466640472412109,
                    d: "m 0,0 a 0.7592,0.7357,0,0,1,0,0.735,0.7592,0.7357,0,0,1,-1,-0.735,0.7592,0.7357,0,0,1,1,-0.738,0.7592,0.7357,0,0,1,0,0.738 z",
                  },
                ],
                w: 8.643798828125,
              }
            : this.characters[63]),
        (this.space = {
          paths: [
            {
              d: "M0,0 l" + this.contents.p.space + " 0",
              mx: 0,
              my: 0,
              w: this.contents.p.space,
              h: 0,
            },
          ],
          w: this.contents.p.space,
        });
      for (var s = this.analyseWidth(), e = 0; e < this.texts.length; e++) {
        for (
          var i = [],
            r =
              typeof this.texts[e] == "string"
                ? { text: this.texts[e] }
                : this.texts[e],
            h = r.text,
            n = 0;
          n < h.length;
          n++
        ) {
          var o = h[n];
          if (0 < s.breakPoints[e][n].length)
            for (var a, t, d = s.breakPoints[e][n].length, l = 0; l <= d; l++) {
              (t = s.breakPoints[e][n][l]),
                s.breakPoints[e][n][d - 1] != o.length &&
                  s.breakPoints[e][n].push(o.length);
              var b =
                s.breakPoints[e][n][l - 1] == null
                  ? 0
                  : s.breakPoints[e][n][l - 1];
              (a = o.slice(b, t).replace(/^\s+/g, "")), i.push(a);
            }
          else i.push(h[n]);
        }
        this.texts[e].text = i;
      }
    }),
    (p.prototype.createText = function () {
      var s,
        e = this,
        i = this.svg,
        r = 0,
        h = 0,
        n =
          this.properties.lineHeight == null
            ? this.contents.p.lh
            : this.properties.lineHeight;
      this.properties.autoAnimation =
        this.properties.autoAnimation == null || this.properties.autoAnimation;
      for (var o = 0, a = !0, t = 0; t < this.texts.length; t++) {
        var d = [],
          l = 0;
        s = this.texts[t].fontSize;
        var b = this.texts[t].strokeWidth,
          L =
            this.texts[t].color == null
              ? this.properties.color == null
                ? "black"
                : this.properties.color
              : this.texts[t].color,
          m =
            this.texts[t].duration == null
              ? this.properties.duration == null
                ? 2e3
                : this.properties.duration
              : this.texts[t].duration;
        this.texts[t].duration = m;
        var c = this.texts[t].id == null ? t : this.texts[t].id;
        (this.texts[t].delay =
          this.texts[t].delay == null ? 0 : this.texts[t].delay),
          (this.prevDuration += this.texts[t].delay),
          this.texts[t].fromCurrentPosition == null &&
            (this.texts[t].fromCurrentPosition = { x: !0, y: !0 }),
          (a =
            this.texts[t].y == null ||
            !!(
              this.texts[t].fromCurrentPosition.y == null ||
              this.texts[t].fromCurrentPosition.y
            ));
        var M = L,
          N =
            this.texts[t].textAlign == null
              ? this.properties.textAlign
              : this.texts[t].textAlign;
        n = this.texts[t].lineHeight == null ? n : this.texts[t].lineHeight / s;
        var P = this.createNode("g", {
          class: "outer",
          transform: "translate(0,0)",
          "data-text": this.texts[t].text,
        });
        i.appendChild(P), (h = o);
        for (var x = 0, A = 0; A < this.texts[t].text.length; A++) {
          var S = 0,
            E = this.createNode("g");
          P.appendChild(E);
          for (var u = 0, W = 0, f = 0; f < this.texts[t].text[A].length; f++) {
            var g = this.texts[t].text[A][f],
              v = this.createNode("g");
            E.appendChild(v);
            var r = 0,
              R =
                this.characters[g.charCodeAt(0)] != null || g == " "
                  ? g == " "
                    ? this.space.paths
                    : this.characters[g.charCodeAt(0)].paths
                  : this.questionMark.paths;
            (L = g == " " ? "transparent" : M),
              R.forEach(function (T, V) {
                var w = e.createNode("path", {
                  d: T.d,
                  "stroke-width": b,
                  stroke: L,
                  fill: "none",
                  "stroke-linecap": e.contents.p.slc,
                  "stroke-linejoin": e.contents.p.slj,
                });
                v.appendChild(w),
                  w.setAttribute(
                    "transform",
                    "translate(" + T.mx + "," + -T.my + ")"
                  ),
                  (u = u > T.my - w.getBBox().y ? u : T.my - w.getBBox().y),
                  V == 0 && (W = u),
                  (w.style.opacity = 0),
                  (w.style.strokeDasharray =
                    w.getTotalLength() + " " + (w.getTotalLength() + 2)),
                  (w.style.strokeDashoffset = w.getTotalLength() + 1);
              }),
              d.push(v);
            var r = v.getBBox().x * s,
              B = this.texts[t].letterSpacing;
            y(B) === "object" &&
              (B =
                B[g] === void 0 ? (B.global === void 0 ? 0 : B.global) : B[g]),
              v.getBBox().width < this.texts[t].minWidth &&
                (r -= (this.texts[t].minWidth - v.getBBox().width) / 2),
              v.setAttribute(
                "transform",
                "translate(" + (S - r + B) + ",0)  scale(" + s + ")"
              ),
              (S += v.getBBox().width * s + B),
              v.getBBox().width < this.texts[t].minWidth &&
                (S += this.texts[t].minWidth - v.getBBox().width);
          }
          var j = E.getBBox();
          E.setAttribute(
            "transform",
            "translate(" + b * s + "," + (-j.y + b * s) + ")"
          );
          var I = 0;
          N == "center"
            ? (I = (this.svg.getBoundingClientRect().width - j.width) / 2)
            : N == "right" &&
              (I = this.svg.getBoundingClientRect().width - j.width),
            this.setPosition(E, { x: I, y: l + this.contents.p.tf * s - u }),
            (l += n * s),
            (x += this.contents.p.tf * s + (this.contents.p.tf * s - W));
        }
        (this.texts[t].y == null ||
          this.texts[t].fromCurrentPosition.y == !0) &&
          this.setPosition(P, { y: h }),
          this.texts[t].fromCurrentPosition != null &&
            this.texts[t].fromCurrentPosition.y &&
            (o += this.texts[t].y == null ? 0 : this.texts[t].y),
          this.setPosition(
            P,
            { x: this.texts[t].x, y: this.texts[t].y },
            this.texts[t].fromCurrentPosition
          ),
          a && (o += x),
          this.drawnCharacters[c] != null && (c = t),
          (this.drawnCharacters[c] = {
            characters: d,
            queued: this.texts[t].queued,
            container: P,
            index: t,
          }),
          (this.texts[t].autoAnimation == null ||
            this.texts[t].autoAnimation) &&
            this.properties.autoAnimation &&
            (e.draw(c, m),
            (this.texts[t].queued == null || this.texts[t].queued) &&
              (e.prevDuration += m));
      }
      (this.completed = !0),
        this.svg.setAttribute(
          "height",
          this.svg.getBBox().height + this.svg.getBBox().y + 10
        ),
        this.readyF && this.readyF();
    }),
    (p.prototype.playAll = function () {
      this.prevDuration = 0;
      for (var s = 0; s < this.texts.length; s++) {
        var e = this.texts[s].duration,
          i = this.texts[s].id == null ? s : this.texts[s].id;
        (this.prevDuration += this.texts[s].delay),
          this.draw(i, e),
          (this.texts[s].queued == null || this.texts[s].queued) &&
            (this.prevDuration += e);
      }
    }),
    (p.prototype.draw = function (s, e) {
      var i = this;
      if (this.drawnCharacters[s] == null)
        return (
          console.warn("ID:`" + s + "` not found. Animation skipped"),
          void console.trace()
        );
      var r =
          e === void 0 ? this.texts[this.drawnCharacters[s].index].duration : e,
        h = this.getSectionPathLength(s),
        n = 0,
        o =
          this.drawnCharacters[s].queued == null ||
          this.drawnCharacters[s].queued,
        a = o ? this.prevDuration : 1;
      setTimeout(function () {
        i.drawnCharacters[s].characters.forEach(function (t) {
          t.querySelectorAll("path").forEach(function (d) {
            var l = (parseFloat(d.style.strokeDashoffset) / h) * r;
            (d.style.opacity = 1), i.animate(d, l, n, 0), (n += l);
          });
        }),
          setTimeout(function () {
            i.animationEndF && i.animationEndF(s, i.drawnCharacters[s]);
          }, n);
      }, a);
    }),
    (p.prototype.get = function (s) {
      return this.drawnCharacters[s] == null
        ? (console.warn("ID:`" + s + "` not found."), console.trace(), !1)
        : this.drawnCharacters[s];
    }),
    (p.prototype.animate = function (s, e, i, r) {
      var h = this;
      (r = +r || 0),
        setTimeout(function () {
          var n = new Date().getTime(),
            o = parseFloat(s.style.strokeDashoffset),
            a = setInterval(function () {
              var t = Math.min(1, (new Date().getTime() - n) / e);
              (s.style.strokeDashoffset = o + t * (r - o)),
                t == 1 && clearInterval(a);
            }, h.frameRate);
        }, i);
    }),
    (p.prototype.getSectionPathLength = function (s) {
      var e = this;
      return (
        (this.totalPathLength = 0),
        this.drawnCharacters[s].characters.forEach(function (i) {
          i.querySelectorAll("path").forEach(function (r) {
            e.totalPathLength += r.getTotalLength();
          });
        }),
        this.totalPathLength
      );
    }),
    (p.prototype.analyseWidth = function () {
      var s = String.fromCharCode,
        e = Math.round,
        i = 0,
        r = this.svg.getBoundingClientRect().width,
        h = [],
        n =
          this.characters[97] == null
            ? Object.keys(this.characters)[
                e(Math.random() * Object.keys(this.characters).length - 1)
              ]
            : "97",
        o = document.createElement("span");
      this.element.appendChild(o),
        (o.style.opacity = 0),
        (o.style.position = "absolute"),
        (o.innerHTML = s(n));
      var a = document.createElement("span");
      this.element.appendChild(a),
        (a.style.opacity = 0),
        (a.style.position = "absolute"),
        (a.innerHTML = " . ");
      for (var t = 0; t < this.texts.length; t++) {
        var d,
          l = this.texts[t];
        (d = typeof l.text == "string" ? [l.text] : l.text),
          (this.texts[t].text = d),
          (this.texts[t].letterSpacing =
            this.texts[t].letterSpacing == null
              ? this.properties.letterSpacing == null
                ? 0
                : this.properties.letterSpacing
              : this.texts[t].letterSpacing),
          (this.texts[t].strokeWidth =
            this.texts[t].strokeWidth == null
              ? this.properties.strokeWidth == null
                ? this.contents.p.bsw
                : this.properties.strokeWidth
              : this.texts[t].strokeWidth);
        var b =
            this.texts[t].breakWord == null
              ? this.properties.breakWord != null && this.properties.breakWord
              : this.texts[t].breakWord,
          L =
            l.fontSize == null
              ? this.properties.fontSize == null
                ? this.fontSize
                : this.properties.fontSize
              : l.fontSize;
        (o.style.fontSize = L + "px"), (a.style.fontSize = L + "px");
        var m = o.getBoundingClientRect().width / this.characters[n].w;
        this.texts[t].minWidth = a.getBoundingClientRect().width;
        var c,
          M = this.texts[t].width == null ? r : this.texts[t].width,
          N = [],
          P = this.texts[t].x == null ? 0 : this.texts[t].x;
        (this.trueFontSize = L), (this.texts[t].fontSize = m);
        for (var x = this.texts[t].letterSpacing, A = 0; A < d.length; A++) {
          for (var S = P, E = [], u = d[A], W = 0, f = 0; f < u.length; f++)
            if (
              (y(x) === "object" &&
                y(x) === "object" &&
                (x =
                  x[u] === void 0
                    ? x.global === void 0
                      ? 0
                      : x.global
                    : x[u]),
              this.characters[u[f].charCodeAt(0)] == null
                ? u[f] == " "
                  ? ((c = this.space.w * m), (W = S))
                  : (c = this.questionMark.w * m + x)
                : ((c = this.characters[u[f].charCodeAt(0)].w * m),
                  c < this.texts[t].minWidth &&
                    (c +=
                      (m *
                        (this.texts[t].minWidth -
                          this.characters[u[f].charCodeAt(0)].w)) /
                      2),
                  (c += x)),
              (c += this.texts[t].strokeWidth * m),
              S + c >= M)
            ) {
              W == 0 && (b = !0);
              var g = f;
              u[f] == " " || b || (g = u.slice(0, g + 1).search(/\S+$/)),
                E.push(g),
                (S = P + S - W);
            } else (i += c), (S += c);
          N.push(E);
        }
        h.push(N);
      }
      return (
        o.parentNode.removeChild(o),
        a.parentNode.removeChild(a),
        { width: i, breakPoints: h }
      );
    }),
    (p.prototype.setPosition = function (s, e, r) {
      var r = r ?? { x: !1, y: !1 };
      (r.x = r.x != null && r.x), (r.y = r.y != null && r.y);
      var h = s.transform.baseVal.consolidate().matrix,
        n = h.e,
        o = h.f;
      e.x != null && (r.x ? (n += e.x) : (n = e.x)),
        e.y != null && (r.y ? (o += e.y) : (o = e.y - s.getBBox().y));
      var a = this.svg.createSVGTransform();
      a.setTranslate(n, o), s.transform.baseVal.replaceItem(a, 0);
    }),
    (C.exports = p);
})(D);

var _ = D.exports;

const q = H(_);

let O = new q(
  "#container",
  "font.json",
  [
    {
      text: "Lisset Mis XV años",
      textAlign: "center",
      strokeWidth: 2.5,
      color: "#ffffff",
      y: 35,
      duration: 7500,
      id: "sphinx",
    },
  ],
  { fontSize: 52 }
);

O.ready(function () {
  O.draw("sphinx"),
    (document.getElementsByTagName("g")[0].style.filter =
      "drop-shadow(3px 5px 2px  rgba(0, 188, 128, 15))");
});

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

if (!isMobile) {
  window.onresize = function () {
    location.reload();
  };
}

let F = document.getElementById("miAudio");
document.getElementById("startAudio").addEventListener("click", () => {
  F.play();

  // Si es un dispositivo móvil, ejecuta el código de pantalla completa
  if (isMobile) {
    if (!document.fullscreenElement) {
      elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setTimeout(function () {
        location.reload(); // Recarga la página después de salir del modo de pantalla completa
      }, 1000);
    }
  }
});
