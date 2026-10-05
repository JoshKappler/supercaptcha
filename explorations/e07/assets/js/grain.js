// Minimal WebGL2 mount for the Paper Shaders grain gradient (shader source in paper-grain-gradient.js).
import { VERT, FRAG } from './paper-grain-gradient.js';

const canvas = document.querySelector('canvas.grain');
const gl = canvas && canvas.getContext('webgl2', { premultipliedAlpha: true, antialias: false });

const hex = (h, a = 1) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).concat(a);
const params = {
  colorBack: hex('#0d0306'),
  colors: ['#2a0610', '#5a1121', '#8a2135', '#b84a5c'].map((c) => hex(c)),
  softness: 0.75,
  intensity: 0.2,
  noise: 0.45,
  shape: 1,
  scale: 1.15,
  rotation: 0,
  offsetY: 0.32,
};

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

function start(noiseImg) {
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const u = (n) => gl.getUniformLocation(prog, n);
  const f = { u_imageAspectRatio: 1, u_originX: 0.5, u_originY: 0.5, u_worldWidth: 0, u_worldHeight: 0, u_fit: 0,
    u_scale: params.scale, u_rotation: params.rotation, u_offsetX: 0, u_offsetY: params.offsetY,
    u_colorsCount: params.colors.length, u_softness: params.softness, u_intensity: params.intensity,
    u_noise: params.noise, u_shape: params.shape };
  for (const [k, v] of Object.entries(f)) gl.uniform1f(u(k), v);
  gl.uniform4fv(u('u_colorBack'), params.colorBack);
  gl.uniform4fv(u('u_colors'), params.colors.flat());

  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  for (const [p, v] of [[gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE], [gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR]]) gl.texParameteri(gl.TEXTURE_2D, p, v);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, noiseImg);
  gl.uniform1i(u('u_noiseTexture'), 0);

  const tLoc = u('u_time');
  const scale = 2;
  const resize = () => {
    canvas.width = Math.round(canvas.clientWidth * scale);
    canvas.height = Math.round(canvas.clientHeight * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u('u_resolution'), canvas.width, canvas.height);
    gl.uniform1f(u('u_pixelRatio'), scale);
  };
  const draw = (ms) => { gl.uniform1f(tLoc, ms * 0.001); gl.drawArrays(gl.TRIANGLES, 0, 6); };

  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  let raf = 0;
  let t = 0;
  let last = 0;
  const tick = (now) => {
    t += Math.min(now - last, 50) * 0.35;
    last = now;
    draw(t);
    raf = visible && !still.matches ? requestAnimationFrame(tick) : 0;
  };
  const run = () => { if (!raf && visible && !still.matches) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  new ResizeObserver(() => { resize(); draw(t); }).observe(canvas);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(canvas);
  still.addEventListener('change', run);
  resize();
  draw(t);
  canvas.classList.add('on');
  run();
}

if (gl) {
  const img = new Image();
  img.onload = () => { try { start(img); } catch (e) { console.warn('grain gradient off:', e.message); } };
  img.src = new URL('../img/paper-noise.png', import.meta.url).href;
}
