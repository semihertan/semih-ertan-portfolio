export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const lerp = (from, to, progress) => from + (to - from) * progress;
export const ease = p => p * p * (3 - 2 * p);
export const poses = [
  { rotation: 0, x: 0, y: 0, scale: 1 },
  { rotation: 16, x: 0, y: 0, scale: 1 },
  { rotation: -12, x: 0, y: 0, scale: 1 },
  { rotation: 20, x: 0, y: 0, scale: 1 },
  { rotation: 0, x: 0, y: 0, scale: 1 },
];
// Actual offsets also support sections taller than the viewport.
export function transitionAt(y, offsets) {
  let index = 0;
  while (index < offsets.length - 2 && y >= offsets[index + 1]) index++;
  const progress = clamp((y - offsets[index]) / Math.max(1, offsets[index + 1] - offsets[index]));
  return { index, progress };
}
export function poseAt(index, progress) {
  const result = {};
  for (const key of Object.keys(poses[0])) result[key] = lerp(poses[index][key], poses[index + 1][key], ease(progress));
  return result;
}
export function snapTarget(y, offsets, heights, viewport) {
  const nearest = offsets.reduce((best, offset, i) => Math.abs(offset - y) < Math.abs(offsets[best] - y) ? i : best, 0);
  // Never pull readers away from the middle of a long mobile section.
  const readingLongSection = offsets.some((offset, i) => heights[i] > viewport + 32 && y > offset + 24 && y < offset + heights[i] - viewport + 24);
  return readingLongSection ? null : offsets[nearest];
}
