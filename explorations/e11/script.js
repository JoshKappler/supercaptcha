// Runs the black nickel shader on the slab. Without WebGL the CSS gradient on .slab stays.
const canvas = document.querySelector('.nickel');
const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

function compile(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

if (gl) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}'));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, BLACK_NICKEL));
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const u = (name) => gl.getUniformLocation(program, name);
  gl.uniform1f(u('u_scale'), 0.72);
  gl.uniform1f(u('u_distortion'), 0.45);
  gl.uniform1f(u('u_contour'), 0.55);
  const resolution = u('u_resolution');
  const time = u('u_time');

  function resize() {
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(canvas.clientHeight * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
  }

  function draw(now) {
    gl.uniform1f(time, 4 + now / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (!still) requestAnimationFrame(draw);
  }

  resize();
  addEventListener('resize', () => { resize(); if (still) draw(0); });
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) requestAnimationFrame(draw);
}
