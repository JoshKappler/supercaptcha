// Satin anodized band. Fragment shader adapted from Glyphfield's "satin-steel" preset and
// METAL_UTILITIES (MIT, Copyright (c) 2026 Kevin Liu); the steel tone is remapped onto a
// Cosmic Orange ramp. Rendered once per resize; the CSS gradient on .band is the fallback.
(() => {
  const canvas = document.getElementById('metal');
  const gl = canvas && canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) return;

  const vert = 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}';
  const frag = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform float u_scale;

float metalHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float metalNoise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(metalHash(i), metalHash(i + vec2(1.0, 0.0)), f.x),
             mix(metalHash(i + vec2(0.0, 1.0)), metalHash(i + vec2(1.0)), f.x), f.y);
}
float metalLobe(float value, float center, float width) {
  float position = (value - center) / max(width, 0.001);
  return exp(-position * position);
}
float metalEnvironment(float reflection, float polish) {
  float broadSky = metalLobe(reflection, -0.68, 0.42) * 0.32;
  float upperStrip = metalLobe(reflection, -0.28, mix(0.17, 0.055, polish)) * 0.88;
  float darkCard = metalLobe(reflection, -0.02, 0.115) * 0.3;
  float lowerRoom = metalLobe(reflection, 0.25, 0.27) * 0.54;
  float edgeStrip = metalLobe(reflection, 0.61, mix(0.14, 0.038, polish)) * 1.08;
  return clamp(0.022 + broadSky + upperStrip - darkCard + lowerRoom + edgeStrip, 0.0, 1.15);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= min(u_resolution.x / u_resolution.y, 3.0);
  p *= u_scale;
  float time = u_time * 0.035;
  float brush = metalNoise(vec2(p.x * 0.3 + time, gl_FragCoord.y * 0.12));
  float reflection = p.y * 0.67 + (brush - 0.5) * 0.035 + sin(p.x * 0.55 + time) * 0.045;
  float environment = metalEnvironment(reflection, 0.12);
  float grain = (metalHash(vec2(floor(gl_FragCoord.y), floor(gl_FragCoord.x * 0.02))) - 0.5) * 0.04;
  vec3 steel = mix(vec3(0.2, 0.215, 0.225), vec3(0.79, 0.81, 0.82), environment * 0.58 + 0.2);
  steel += grain * 0.25;
  float l = dot(steel, vec3(0.3, 0.59, 0.11));
  vec3 anodized = mix(u_color_a, u_color_b, smoothstep(0.18, 0.78, l));
  anodized += pow(max(l - 0.66, 0.0), 2.0) * vec3(1.4, 1.1, 0.9);
  gl_FragColor = vec4(anodized, 1.0);
}`;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, vert);
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n) => gl.getUniformLocation(prog, n);
  gl.uniform3f(u('u_color_a'), 0.2, 0.055, 0.018);
  gl.uniform3f(u('u_color_b'), 0.97, 0.55, 0.3);
  gl.uniform1f(u('u_scale'), 1.0);
  gl.uniform1f(u('u_time'), 9.0);

  const draw = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u('u_resolution'), w, h);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  draw();
  new ResizeObserver(draw).observe(canvas);
})();
