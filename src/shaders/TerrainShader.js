export const TerrainVertexShader = `
#include <fog_pars_vertex>

uniform float uTime;
uniform float uSpeed;
uniform float uScrollProgress;

varying float vElevation;

// Simplex noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Ridged noise for sharp peaks
float ridgedNoise(vec2 p) {
  float n = snoise(p);
  n = 1.0 - abs(n);
  return n * n;
}

// High-quality fBm
float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; ++i) {
    v += a * ridgedNoise(x);
    x = rot * x * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Translate uv to massive world coordinates (-500 to +500)
  vec2 pos = (uv - 0.5) * 1000.0;
  
  // Since the plane is vertical, pos.y is height, pos.x is width
  // We want the cliff to be generally flat with large rocky outcroppings
  
  vec2 noiseUv = vec2(uv.x * 4.0, uv.y * 10.0); // stretch noise vertically for cliff strata
  float cliffRocks = fbm(noiseUv) * 30.0;
  cliffRocks += fbm(noiseUv * 3.0) * 10.0;
  
  // We can create a crevasse / crack down the middle for the runner
  float crevasse = exp(-(pos.x*pos.x) / 1000.0) * 40.0;
  
  // Elevation is Z-axis (pointing towards camera because plane is rotated)
  float elevation = cliffRocks - crevasse;
  
  vElevation = elevation;
  
  vec3 newPosition = position;
  newPosition.z += elevation;
  
  // Scroll progress moves the entire cliff face DOWN, simulating vertical climbing
  newPosition.y -= uScrollProgress * 800.0; // massive vertical scroll
  
  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Dynamic dot size based on depth
  gl_PointSize = clamp(40.0 / -mvPosition.z, 0.5, 4.0);
  
  #include <fog_vertex>
}
`;

export const TerrainFragmentShader = `
#include <fog_pars_fragment>

varying float vElevation;

void main() {
  // Soft, rounded dots
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);
  if(ll > 0.5) discard;
  
  // Dark base, slightly brighter ridge, bright peak
  vec3 baseColor = vec3(0.1, 0.1, 0.15); // Deep navy/charcoal
  vec3 midColor = vec3(0.4, 0.4, 0.5);   // Slate gray
  vec3 peakColor = vec3(0.9, 0.9, 0.95); // Frosty white
  
  // Normalize elevation roughly between 0 and 40 (max height of peak)
  float normalizedElev = clamp(vElevation / 40.0, 0.0, 1.0);
  
  vec3 finalColor;
  if(normalizedElev < 0.4) {
    finalColor = mix(baseColor, midColor, normalizedElev / 0.4);
  } else {
    finalColor = mix(midColor, peakColor, (normalizedElev - 0.4) / 0.6);
  }
  
  gl_FragColor = vec4(finalColor, 0.8);
  
  #include <fog_fragment>
}
`;
