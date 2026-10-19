import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionAt, poseAt, snapTarget, poses } from '../src/story-math.js';

test('progress follows real offsets, including variable-height sections', () => {
  const offsets = [0, 800, 1600, 3000, 3800];
  for (const p of [0, .25, .5, .75]) assert.deepEqual(transitionAt(800 * p, offsets), { index: 0, progress: p });
  assert.deepEqual(transitionAt(2300, offsets), { index: 2, progress: .5 });
  assert.deepEqual(transitionAt(5000, offsets), { index: 3, progress: 1 });
  assert.deepEqual(transitionAt(-100, offsets), { index: 0, progress: 0 });
});
test('poses are continuous at all section boundaries and never overshoot', () => {
  for (let i = 0; i < 4; i++) {
    assert.deepEqual(poseAt(i, 0), poses[i]);
    for (const key of Object.keys(poses[i])) assert.ok(Math.abs(poseAt(i, 1)[key] - poses[i + 1][key]) < 1e-10);
    if (i < 3) assert.ok(Math.abs(poseAt(i, .999999).rotation - poseAt(i + 1, .000001).rotation) < 1e-6);
    for (let p = 0; p <= 1; p += .01) {
      const r = poseAt(i, p).rotation;
      assert.ok(r >= Math.min(poses[i].rotation, poses[i + 1].rotation) && r <= Math.max(poses[i].rotation, poses[i + 1].rotation));
    }
  }
  assert.equal(poseAt(0, .5).rotation, 8);
});
test('soft snap chooses the nearest section in either direction', () => {
  const offsets = [0, 800, 1600, 2400, 3200];
  assert.equal(snapTarget(220, offsets, Array(5).fill(800), 800), 0);
  assert.equal(snapTarget(620, offsets, Array(5).fill(800), 800), 800);
  assert.equal(snapTarget(1420, offsets, Array(5).fill(800), 800), 1600);
});
test('long mobile content can be read without being pulled back to its top', () => {
  assert.equal(snapTarget(1400, [0, 800, 2400, 3200, 4000], [800, 1600, 800, 800, 800], 800), null);
});
