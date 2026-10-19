import test from 'node:test';
import assert from 'node:assert/strict';
import { spacePoseAt, spacePoses } from '../src/space-poses.js';
test('all 3D channels remain continuous across each section boundary', () => {
  for(let i=0;i<4;i++) {
    assert.deepEqual(spacePoseAt(i,0),spacePoses[i]);
    spacePoseAt(i,1).forEach((v,k)=>assert.ok(Math.abs(v-spacePoses[i+1][k])<1e-10));
    if(i<3)spacePoseAt(i,.999999).forEach((v,k)=>assert.ok(Math.abs(v-spacePoseAt(i+1,.000001)[k])<1e-8));
  }
});
test('3D camera and scale never overshoot or become invalid during scrub', () => {
  for(let i=0;i<4;i++)for(let p=0;p<=1;p+=.01){
    const values=spacePoseAt(i,p);
    assert.ok(values.every(Number.isFinite));
    assert.ok(values[6]>=.9 && values[6]<=.92);
    assert.ok(values[9]>=7 && values[9]<=7.1);
  }
});
test('planet remains a similar apparent size through the About to Projects transition', () => {
  const apparentRadius = pose => {
    const distance = Math.hypot(pose[7]-pose[3],pose[8]-pose[4],pose[9]-pose[5]);
    return 1.65*pose[6]/distance;
  };
  const start=apparentRadius(spacePoseAt(1,0));
  for(let p=0;p<=1;p+=.01){
    const radius=apparentRadius(spacePoseAt(1,p));
    assert.ok(Math.abs(radius/start)<1.05 && Math.abs(radius/start)>.95);
  }
});

test('section progress changes only the planet rotation and visual atmosphere', () => {
  const fixedChannels = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const home = spacePoseAt(0, 0);
  for (let section = 0; section < 4; section++) {
    for (const progress of [0, .25, .5, .75, 1]) {
      const pose = spacePoseAt(section, progress);
      fixedChannels.forEach(channel => assert.equal(pose[channel], home[channel]));
    }
  }
});
