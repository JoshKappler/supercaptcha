// Black nickel material shader by Kevin Liu, from Glyphfield (src/lib/shaderPresets.ts).
// MIT License, Copyright (c) 2026 Kevin Liu. Full notice in CREDITS.md.
const BLACK_NICKEL = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform float u_scale;
uniform float u_distortion;
uniform float u_softness;
uniform float u_repetition;
uniform float u_contour;

float metalHash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float metalNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(metalHash(i), metalHash(i + vec2(1.0, 0.0)), f.x),
    mix(metalHash(i + vec2(0.0, 1.0)), metalHash(i + vec2(1.0)), f.x),
    f.y
  );
}

float metalFbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.54;
  for (int index = 0; index < 5; index++) {
    value += metalNoise(p) * amplitude;
    p = mat2(1.72, 1.11, -1.11, 1.72) * p + 0.19;
    amplitude *= 0.47;
  }
  return value;
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

vec3 metalTone(float reflection, float polish, float fresnel, float grain) {
  float environment = metalEnvironment(reflection, polish);
  vec3 shadow = mix(vec3(0.008), u_color_a * 0.2, 0.5);
  vec3 silver = mix(vec3(0.72), u_color_b, 0.34);
  vec3 color = mix(shadow, silver, clamp(environment, 0.0, 1.0));
  color += max(0.0, environment - 1.0) * vec3(0.92);
  color += fresnel * mix(vec3(0.2), u_color_b, 0.18);
  color += grain;
  return max(color, vec3(0.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;
  p *= u_scale;
  float time = u_time * 0.07;
  float warp = (metalFbm(p * 1.08 + vec2(time, -time * 0.4)) - 0.5) * u_distortion * 0.24;
  float reflection = p.y * 0.94 + p.x * 0.13 + warp;
  float environment = metalEnvironment(reflection, 0.94);
  float edge = pow(smoothstep(0.52, 1.5, length(p)), 4.5) * (0.12 + u_contour * 0.24);
  float grain = (metalHash(vec2(floor(gl_FragCoord.y * 1.9), floor(gl_FragCoord.x * 0.015))) - 0.5) * 0.012;
  vec3 nickel = mix(vec3(0.006, 0.008, 0.011), vec3(0.42, 0.47, 0.5), environment * 0.7);
  nickel += pow(environment, 7.0) * vec3(0.62, 0.67, 0.7);
  nickel += edge + grain;
  gl_FragColor = vec4(max(nickel, vec3(0.0)), 1.0);
}`;
