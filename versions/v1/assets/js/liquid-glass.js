// Liquid glass refraction, ported to vanilla from shuding/liquid-glass (MIT):
// a canvas-built displacement map fed to an SVG feDisplacementMap used as a backdrop-filter.
// Elements opt in with data-glass="<edge band in px>". Chromium only; others keep the CSS blur.
(() => {
  if (!window.chrome || !CSS.supports('backdrop-filter', 'blur(1px)')) return;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none';
  const defs = document.createElementNS(NS, 'defs');
  svg.appendChild(defs);
  document.body.appendChild(svg);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let count = 0;

  function roundedRectSDF(x, y, hw, hh, r) {
    const qx = Math.abs(x) - hw + r;
    const qy = Math.abs(y) - hh + r;
    return Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r;
  }

  function mapFor(w, h, r, band) {
    canvas.width = w;
    canvas.height = h;
    const img = ctx.createImageData(w, h);
    const d = img.data;
    const hw = w / 2, hh = h / 2;
    const maxD = band * 0.7;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const px = x + 0.5 - hw, py = y + 0.5 - hh;
        const dist = -roundedRectSDF(px, py, hw, hh, r);
        let dx = 0, dy = 0;
        if (dist < band) {
          const t = 1 - Math.max(dist, 0) / band;
          const mag = t * t * maxD;
          const gx = roundedRectSDF(px + 0.5, py, hw, hh, r) - roundedRectSDF(px - 0.5, py, hw, hh, r);
          const gy = roundedRectSDF(px, py + 0.5, hw, hh, r) - roundedRectSDF(px, py - 0.5, hw, hh, r);
          const gl = Math.hypot(gx, gy) || 1;
          dx = -(gx / gl) * mag;
          dy = -(gy / gl) * mag;
        }
        const i = (y * w + x) * 4;
        d[i] = 128 + (dx / maxD) * 127;
        d[i + 1] = 128 + (dy / maxD) * 127;
        d[i + 2] = 0;
        d[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return { url: canvas.toDataURL(), scale: maxD * 2 };
  }

  function apply(el) {
    const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
    if (!w || !h) return;
    const key = w + 'x' + h;
    if (el._glassKey === key) return;
    el._glassKey = key;
    const radius = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
    const band = Math.min(parseFloat(el.dataset.glass) || 16, w / 2, h / 2);
    const { url, scale } = mapFor(w, h, radius, band);

    if (!el._glassId) {
      el._glassId = 'lg' + (++count);
      const f = document.createElementNS(NS, 'filter');
      f.setAttribute('id', el._glassId);
      f.setAttribute('filterUnits', 'userSpaceOnUse');
      f.setAttribute('color-interpolation-filters', 'sRGB');
      f.setAttribute('x', '0');
      f.setAttribute('y', '0');
      const fi = document.createElementNS(NS, 'feImage');
      fi.setAttribute('result', 'map');
      fi.setAttribute('preserveAspectRatio', 'none');
      const fd = document.createElementNS(NS, 'feDisplacementMap');
      fd.setAttribute('in', 'SourceGraphic');
      fd.setAttribute('in2', 'map');
      fd.setAttribute('xChannelSelector', 'R');
      fd.setAttribute('yChannelSelector', 'G');
      f.append(fi, fd);
      defs.appendChild(f);
      el._glassParts = { f, fi, fd };
    }
    const { f, fi, fd } = el._glassParts;
    f.setAttribute('width', w);
    f.setAttribute('height', h);
    fi.setAttribute('width', w);
    fi.setAttribute('height', h);
    fi.setAttribute('href', url);
    fd.setAttribute('scale', scale.toFixed(1));
    const blur = el.dataset.glassBlur || 4;
    el.style.backdropFilter = `url(#${el._glassId}) blur(${blur}px) saturate(180%) brightness(1.08)`;
  }

  const els = document.querySelectorAll('[data-glass]');
  const ro = new ResizeObserver((entries) => entries.forEach((e) => apply(e.target)));
  els.forEach((el) => { apply(el); ro.observe(el); });
})();
