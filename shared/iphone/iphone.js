/* Pushary shared iPhone. window.PusharyPhone.mount(el, options) -> { play, pause, setState }. */
(function () {
  'use strict';

  var BASE = new URL('.', (document.currentScript && document.currentScript.src) || location.href);
  var PNG = {
    '17-pro-max/cosmic-orange': 'private/iphone-17-pro-max-cosmic-orange.png',
    '18-pro-max/burgundy': 'private/iphone-18-pro-max-burgundy.png'
  };
  var STATES = ['locked', 'arrived', 'expanded', 'approved', 'next'];
  var DEFAULTS = {
    model: '17-pro-max',
    color: 'cosmic-orange',
    sheen: 'on',
    autoplay: true,
    date: 'Monday, October 5',
    clock: '9:41',
    agent: 'Claude Code',
    repo: 'api-gateway',
    command: 'git push origin main',
    detail: '3 commits ahead of origin/main',
    request: 'Wants to run git push origin main. 3 commits ahead of origin/main.',
    approved: 'Approved. Pushed 3 commits to origin/main.',
    next: 'Wants to run npm run deploy:staging. Tests passed on CI.'
  };
  /* Timeline in ms: arrive, read, long-press, expand, read, tap Approve, update, next lands, reset. */
  var TIMELINE = [
    [150, 'arrived'], [2050, 'press'], [2450, 'expanded'], [3900, 'tap'],
    [4300, 'approved'], [8100, 'next'], [9700, 'locked']
  ];
  var LOOP_MS = 10000;
  var uid = 0;
  var batch = null;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  function glass(cls, inner) {
    return '<div class="pp-glass ' + cls + '"><div class="pp-refract iphone__wp"></div><div class="pp-tint"></div>' +
      inner + '<div class="pp-rim"></div></div>';
  }

  function note(cls, o, msgs, extra) {
    return glass('pp-note ' + cls,
      '<div class="pp-note__content"><div class="pp-app"><img src="' + BASE.href + 'assets/pushary-logo.webp" alt=""></div>' +
      '<div class="pp-note__body"><div class="pp-note__head"><span class="pp-note__title">' + esc(o.agent) + ' &middot; ' + esc(o.repo) +
      '</span><span class="pp-note__time">now</span></div><div class="pp-note__msgs">' + msgs + '</div>' + (extra || '') + '</div></div>');
  }

  function template(o, id) {
    var app = '<div class="pp-app"><img src="' + BASE.href + 'assets/pushary-logo.webp" alt=""></div>';
    return '<div class="iphone__device">' +
      '<div class="iphone__shadow"></div>' +
      '<i class="iphone__btn iphone__btn--action"></i><i class="iphone__btn iphone__btn--vol-up"></i>' +
      '<i class="iphone__btn iphone__btn--vol-down"></i><i class="iphone__btn iphone__btn--side"></i>' +
      '<i class="iphone__btn iphone__btn--camera"></i>' +
      '<div class="iphone__metal"></div><div class="iphone__bezel"></div>' +
      '<div class="iphone__screen" data-state="expanded">' +
      '<div class="pp-wall iphone__wp"></div><div class="pp-shade"></div>' +
      '<div class="pp-status"><span class="pp-cell"><i></i><i></i><i></i><i></i></span>' +
      '<span class="pp-icon pp-i-wifi pp-wifi"></span><span class="pp-battery"></span></div>' +
      '<div class="pp-date">' + esc(o.date) + '</div>' +
      '<svg class="pp-clock" viewBox="0 0 440 260" aria-hidden="true"><defs><filter id="' + id + '-clock" x="-5%" y="-10%" width="110%" height="120%" color-interpolation-filters="sRGB">' +
      '<feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="b"/>' +
      '<feSpecularLighting in="b" surfaceScale="2.6" specularConstant="1.15" specularExponent="18" lighting-color="#fff" result="s"><feDistantLight azimuth="235" elevation="42"/></feSpecularLighting>' +
      '<feComposite in="s" in2="SourceAlpha" operator="in" result="si"/>' +
      '<feComposite in="SourceGraphic" in2="si" operator="arithmetic" k2="1" k3=".75"/></filter></defs>' +
      '<text x="220" y="234" text-anchor="middle" filter="url(#' + id + '-clock)">' + esc(o.clock) + '</text></svg>' +
      glass('pp-ctl pp-ctl--left', '<span class="pp-icon pp-i-flashlight"></span>') +
      glass('pp-ctl pp-ctl--right', '<span class="pp-icon pp-i-camera"></span>') +
      '<div class="pp-home"></div>' +
      note('pp-note--a', o, '<span class="pp-note__msg pp-note__msg--req">' + esc(o.request) +
        '</span><span class="pp-note__msg pp-note__msg--done">' + esc(o.approved) + '</span>',
        '<span class="pp-badge"><span class="pp-icon pp-i-ok"></span></span>') +
      note('pp-note--b', o, '<span class="pp-note__msg">' + esc(o.next) + '</span>') +
      '<div class="pp-dim"></div>' +
      glass('pp-exp', '<div class="pp-exp__inner"><div class="pp-exp__head">' + app + '<div class="pp-exp__meta"><div class="pp-exp__title">' +
        esc(o.agent) + ' &middot; ' + esc(o.repo) + '</div><div class="pp-exp__time">now</div></div></div>' +
        '<div class="pp-exp__body">Wants to run this command:<div class="pp-exp__cmd"><span>$ </span>' + esc(o.command) +
        '</div><div class="pp-exp__meta2">' + esc(o.detail) + '</div></div></div>') +
      glass('pp-menu', '<div class="pp-menu__rows"><div class="pp-row pp-row--approve"><span class="pp-icon pp-i-check"></span>Approve</div>' +
        '<div class="pp-row pp-row--deny"><span class="pp-icon pp-i-x"></span>Deny</div></div>') +
      '<div class="pp-sheen"></div><div class="pp-oled"></div>' +
      '</div>' +
      '<div class="iphone__island"></div><div class="iphone__light"><i></i><i></i><i></i></div>' +
      '</div>';
  }

  /* kube.io refraction: a convex squircle bezel, Snell's law at n = 1.5, encoded as an R/G displacement map. */
  function displacementMap(w, h, r, bezel) {
    var c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h));
    var ctx = c.getContext('2d');
    var img = ctx.createImageData(c.width, c.height);
    var n = 1.5, steps = 64, prof = [], max = 0;
    for (var i = 0; i < steps; i++) {
      var t = (i + 0.5) / steps, u = 1 - t;
      var slope = Math.pow(u, 3) / Math.pow(1 - Math.pow(u, 4), 0.75);
      var th = Math.atan(slope * 0.9), tr = Math.asin(Math.sin(th) / n);
      prof[i] = Math.tan(th - tr) * (1 - t * 0.35);
      if (prof[i] > max) max = prof[i];
    }
    var hw = c.width / 2, hh = c.height / 2;
    for (var y = 0; y < c.height; y++) {
      for (var x = 0; x < c.width; x++) {
        var px = x + 0.5 - hw, py = y + 0.5 - hh;
        var qx = Math.abs(px) - (hw - r), qy = Math.abs(py) - (hh - r), nx, ny, d;
        if (qx > 0 && qy > 0) {
          var len = Math.sqrt(qx * qx + qy * qy) || 1;
          d = r - len; nx = -qx / len * Math.sign(px); ny = -qy / len * Math.sign(py);
        } else if (qx > qy) {
          d = r - qx; nx = -Math.sign(px); ny = 0;
        } else {
          d = r - qy; nx = 0; ny = -Math.sign(py);
        }
        var k = (y * c.width + x) * 4, m = 0;
        if (d >= 0 && d < bezel) m = prof[Math.min(steps - 1, Math.floor(d / bezel * steps))] / max;
        img.data[k] = 128 + Math.round(127 * m * nx);
        img.data[k + 1] = 128 + Math.round(127 * m * ny);
        img.data[k + 2] = 128;
        img.data[k + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL('image/png');
  }

  function Phone(el, opts) {
    this.el = el;
    this.o = opts;
    this.id = 'pp' + (++uid);
    this.timers = [];
    this.playing = false;
    this.cache = {};
    this.screen = el.querySelector('.iphone__screen');
    this.reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.loadFrame();
    this.buildFilters();
    var self = this;
    if (window.ResizeObserver) new ResizeObserver(function () { self.buildFilters(); }).observe(el);
  }

  Phone.prototype.loadFrame = function () {
    var src = PNG[this.o.model + '/' + this.o.color];
    var device = this.el.querySelector('.iphone__device');
    var el = this.el;
    if (!src || !device || el.querySelector('.iphone__png')) return;
    var img = new Image();
    img.className = 'iphone__png';
    img.alt = '';
    img.onload = function () { device.appendChild(img); el.setAttribute('data-frame', 'png'); };
    img.src = new URL(src, BASE).href;
  };

  Phone.prototype.buildFilters = function () {
    var pt = this.el.getBoundingClientRect().width / 490;
    if (!pt || Math.abs(pt - (this.pt || 0)) < 0.002) return;
    this.pt = pt;
    var svg = this.svg;
    if (!svg) {
      svg = this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('aria-hidden', 'true');
      svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
      this.el.appendChild(svg);
    }
    var self = this, defs = '';
    var kinds = { note: [408, 77, 22, 22, 2], exp: [408, 169, 26, 24, 12], menu: [280, 104, 32, 26, 12], ctl: [58, 58, 29, 15, 1.2] };
    Object.keys(kinds).forEach(function (k) {
      var g = kinds[k], m = 8 * pt;
      var w = g[0] * pt, h = g[1] * pt, key = k + Math.round(w) + 'x' + Math.round(h);
      var map = self.cache[key] || (self.cache[key] = displacementMap(w, h, g[2] * pt, g[3] * pt));
      defs += '<filter id="' + self.id + '-' + k + '" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="' + (g[4] * pt).toFixed(2) + '" result="b"/>' +
        '<feImage href="' + map + '" x="' + m.toFixed(2) + '" y="' + m.toFixed(2) + '" width="' + w.toFixed(2) + '" height="' + h.toFixed(2) + '" preserveAspectRatio="none" result="map"/>' +
        '<feDisplacementMap in="b" in2="map" scale="' + (g[3] * pt * 1.8).toFixed(2) + '" xChannelSelector="R" yChannelSelector="G"/></filter>';
    });
    svg.innerHTML = defs;
    [['.pp-note', 'note'], ['.pp-exp', 'exp'], ['.pp-menu', 'menu'], ['.pp-ctl', 'ctl']].forEach(function (p) {
      self.el.querySelectorAll(p[0] + ' > .pp-refract').forEach(function (r) { r.style.filter = 'url(#' + self.id + '-' + p[1] + ')'; });
    });
  };

  Phone.prototype.apply = function (step) {
    var s = this.screen;
    if (step === 'press') { s.setAttribute('data-press', ''); return; }
    if (step === 'tap') { s.setAttribute('data-tap', ''); return; }
    s.removeAttribute('data-press');
    s.removeAttribute('data-tap');
    s.setAttribute('data-state', step);
  };

  Phone.prototype.reset = function () {
    var s = this.screen;
    s.classList.add('is-instant');
    this.apply('locked');
    void s.offsetWidth;
    s.classList.remove('is-instant');
  };

  Phone.prototype.play = function () {
    if (this.reduced) return this;
    this.pause();
    this.playing = true;
    this.reset();
    var self = this;
    TIMELINE.forEach(function (e) { self.timers.push(setTimeout(function () { self.apply(e[1]); }, e[0])); });
    this.timers.push(setTimeout(function () { self.play(); }, LOOP_MS));
    return this;
  };

  Phone.prototype.pause = function () {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.playing = false;
    return this;
  };

  Phone.prototype.setState = function (state) {
    if (STATES.indexOf(state) < 0) throw new Error('PusharyPhone: unknown state ' + state);
    this.pause();
    this.apply(state);
    return this;
  };

  function readOptions(el, options) {
    var o = {}, k;
    for (k in DEFAULTS) o[k] = DEFAULTS[k];
    ['model', 'color', 'sheen'].forEach(function (a) { if (el.dataset[a]) o[a] = el.dataset[a]; });
    if (el.dataset.autoplay === 'false') o.autoplay = false;
    for (k in options || {}) o[k] = options[k];
    return o;
  }

  function mount(el, options) {
    if (el.__pusharyPhone) return el.__pusharyPhone;
    var o = readOptions(el, options);
    el.classList.add('iphone');
    el.setAttribute('data-model', o.model);
    el.setAttribute('data-color', o.color);
    el.setAttribute('data-sheen', o.sheen);
    if (!el.querySelector('.iphone__device') || options) el.innerHTML = template(o, 'pp' + (uid + 1));
    var phone = el.__pusharyPhone = new Phone(el, o);
    if (o.autoplay) {
      if (batch) batch.push(phone);
      else startTogether([phone]);
    }
    return phone;
  }

  function startTogether(phones) {
    var waits = [document.fonts ? document.fonts.ready : 0];
    phones.forEach(function (p) {
      var wp = new Image();
      wp.src = new URL('assets/wallpaper-' + p.o.color + '.webp', BASE).href;
      if (wp.decode) waits.push(wp.decode().catch(function () {}));
    });
    var go = function () { phones.forEach(function (p) { p.play(); }); };
    Promise.all(waits).then(go, go);
  }

  window.PusharyPhone = { mount: mount, template: function (o) { return template(readOptions(document.createElement('div'), o), 'pp0'); } };

  function auto() {
    batch = [];
    document.querySelectorAll('.iphone:not([data-manual])').forEach(function (el) { mount(el); });
    var phones = batch;
    batch = null;
    if (phones.length) startTogether(phones);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto); else auto();
})();
