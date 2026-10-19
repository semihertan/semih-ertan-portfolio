import { clamp, ease, lerp } from './story-math.js';

// Rotation XYZ, position XYZ, scale, camera XYZ, target XYZ, light, fog, drift.
export const spacePoses = [
  // Home faces roughly 35° E / 39° N, keeping Türkiye near the globe's center.
  [.62, -2.38, -.12, 1.5, .1, 0, .91, 0, 0, 7, 0, 0, 0, 1.1, .25, 0],
  [.68, -1.7, .08, 1.5, .1, 0, .91, 0, 0, 7, 0, 0, 0, 1.08, .29, .2],
  [.56, -1.02, -.04, 1.5, .1, 0, .91, 0, 0, 7, 0, 0, 0, 1.12, .32, .45],
  [.68, -.34, .1, 1.5, .1, 0, .91, 0, 0, 7, 0, 0, 0, 1.14, .3, .7],
  [.58, .34, 0, 1.5, .1, 0, .91, 0, 0, 7, 0, 0, 0, 1.08, .26, 1],
];
export function spacePoseAt(index, progress) {
  const i = clamp(index, 0, 3);
  return spacePoses[i].map((v, key) => lerp(v, spacePoses[i + 1][key], ease(clamp(progress))));
}
