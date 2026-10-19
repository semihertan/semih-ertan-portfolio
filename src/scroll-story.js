import { clamp, ease, transitionAt, poseAt } from './story-math.js';

export function createStory({ initialId, onActive }) {
  const sections = [...document.querySelectorAll('.story-section')];
  const reveals = sections.map(section => [...section.querySelectorAll('[data-reveal]')]);
  const scene = document.querySelector('.scene');
  let space, spaceDestroyed = false, latestIndex = 0, latestProgress = 0;
  import('./space-scene.js').then(({ createSpaceScene }) => {
    if (spaceDestroyed) return;
    space = createSpaceScene(document.querySelector('.space-background'));
    space.update(latestIndex, latestProgress);
  }).catch(() => { /* Keep the CSS planet when WebGL or the optional chunk is unavailable. */ });
  const progressFill = document.querySelector('.progress-fill');
  const indexLabel = document.querySelector('.story-index');
  const nav = [...document.querySelectorAll('nav a')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, { ...options, signal: controller.signal });
  const oldRestoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  let offsets = [], heights = [], viewport = innerHeight, maxScroll = 0;
  let frame = 0;
  let tween = null, paused = false, active = -1, destroyed = false;
  let previousOverflow = '';

  function refresh() {
    // Batch layout reads here, never in the animation update.
    viewport = innerHeight;
    offsets = sections.map(s => s.offsetTop);
    heights = sections.map(s => s.offsetHeight);
    maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport);

    requestTick();
  }
  function requestTick() { if (!frame && !destroyed) frame = requestAnimationFrame(tick); }
  function stop() { tween = null; }
  function animateTo(y, focusTarget) {
    stop();
    y = clamp(y, 0, maxScroll);
    if (motion.matches) {
      window.scrollTo(0, y);
      focusTarget?.focus({ preventScroll: true });
      requestTick();
      return;
    }
    tween = { from: scrollY, to: y, start: performance.now(), duration: clamp(Math.abs(y - scrollY) * .45, 560, 1250), focusTarget };
    requestTick();
  }
  function tick(time) {
    frame = 0;

    if (tween) {
      const p = clamp((time - tween.start) / tween.duration);
      window.scrollTo(0, tween.from + (tween.to - tween.from) * ease(p));
      if (p === 1) {
        tween.focusTarget?.focus({ preventScroll: true });
        tween = null;
      }
    }
    const y = scrollY;
    const { index, progress } = transitionAt(y, offsets);
    latestIndex = index; latestProgress = progress;
    space?.update(index, progress);
    const pose = poseAt(index, progress);
    const overall = (index + progress) / (sections.length - 1);
    scene.style.transform = motion.matches ? 'none' : `translate3d(${pose.x}vw, ${pose.y}vh, 0) rotate(${pose.rotation}deg) scale(${pose.scale})`;
    progressFill.style.transform = `scaleY(${overall})`;
    // Current adjacent-section progress, available for inspection/integration.
    document.documentElement.style.setProperty('--section-progress', progress.toFixed(5));
    sections.forEach((section, i) => {
      const incoming = clamp((offsets[i] - y) / (viewport * .85));
      const outgoing = clamp((y - (offsets[i] + Math.max(0, heights[i] - viewport))) / viewport);
      reveals[i].forEach(el => {
        const distance = el.dataset.reveal === 'title' ? 60 : 30;
        const opacity = (1 - ease(incoming)) * (1 - .65 * ease(outgoing));
        el.style.opacity = motion.matches ? '1' : opacity.toFixed(4);
        el.style.transform = motion.matches ? 'none' : `translate3d(0, ${incoming * distance - outgoing * 24}px, 0) scale(${1 - outgoing * .015})`;
      });
    });
    const nearest = progress < .5 ? index : index + 1;
    if (nearest !== active) {
      active = nearest;
      nav.forEach((a, i) => i === active ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'));
      indexLabel.textContent = `0${active + 1} / 05`;
      onActive(sections[active].id);
    }
    if (tween) requestTick();
  }
  let wheelMode = '', lastWheel = 0, touch = null;
  function nearestSection() { return offsets.reduce((best, y, i) => Math.abs(y-scrollY)<Math.abs(offsets[best]-scrollY)?i:best,0); }
  function canRead(element, direction) {
    const panel=element.closest('.section-content');
    return panel && (direction>0 ? panel.scrollTop+panel.clientHeight<panel.scrollHeight-2 : panel.scrollTop>2);
  }
  function step(direction) {
    if(tween || paused)return;
    const index=clamp(nearestSection()+direction,0,sections.length-1);
    animateTo(offsets[index]);
  }
  listen(window,'wheel',event=>{
    if(paused || event.ctrlKey || Math.abs(event.deltaX)>Math.abs(event.deltaY) || !event.cancelable)return;
    if(event.target.closest('dialog,textarea,input,select,[data-native-scroll]'))return;
    const now=performance.now();
    if(now-lastWheel>220 && !tween)wheelMode='';
    lastWheel=now;
    const direction=Math.sign(event.deltaY);
    if(!direction)return;
    if(wheelMode!=='transition' && !tween && canRead(event.target,direction)){wheelMode='content';return;}
    event.preventDefault();
    if(wheelMode || tween)return;
    wheelMode='transition';step(direction);
  },{passive:false});
  listen(window,'scroll',requestTick,{passive:true});
  listen(window,'touchstart',event=>{
    if(event.touches.length!==1){touch=null;return;}
    const point=event.touches[0];
    touch={x:point.clientX,y:point.clientY,element:event.target,reading:false,blocked:!!tween};
  },{passive:true});
  listen(window,'touchmove',event=>{
    if(!touch || event.touches.length!==1 || paused)return;
    const point=event.touches[0],dx=point.clientX-touch.x,dy=touch.y-point.clientY;
    if(Math.abs(dx)>Math.abs(dy))return; // Horizontal gallery swipe remains independent.
    if(!touch.blocked && canRead(touch.element,Math.sign(dy))){touch.reading=true;return;}
    if(event.cancelable)event.preventDefault();
  },{passive:false});
  listen(window,'touchend',event=>{
    if(!touch)return;
    const point=event.changedTouches[0],dx=point.clientX-touch.x,dy=touch.y-point.clientY;
    if(!touch.reading && !touch.blocked && Math.abs(dy)>45 && Math.abs(dy)>Math.abs(dx)*1.3)step(Math.sign(dy));
    touch=null;
  },{passive:true});
  listen(window,'touchcancel',()=>{touch=null;},{passive:true});
  listen(window,'keydown',event=>{
    if(event.target.closest('input,textarea,select,dialog') || event.altKey || event.ctrlKey || event.metaKey)return;
    if(event.key==='Tab'){stop();return;}
    if(event.key===' ' && event.target.closest('button,a'))return;
    const direction=['ArrowDown','PageDown',' '].includes(event.key)?(event.shiftKey?-1:1):['ArrowUp','PageUp'].includes(event.key)?-1:0;
    if(direction){if(canRead(event.target,direction))return;event.preventDefault();if(!event.repeat)step(direction);}
    if(event.key==='Home'||event.key==='End'){event.preventDefault();animateTo(offsets[event.key==='Home'?0:sections.length-1]);}
  });
  listen(document, 'focusin', event => {
    const section = event.target.closest('.story-section');
    if (section && !tween) {
      stop();
      const i = sections.indexOf(section);
      if (scrollY < offsets[i] - 100 || scrollY > offsets[i] + heights[i] - 100) animateTo(offsets[i]);
    }
  });
  function navigate(id, immediate = false) {
    const section = document.getElementById(id === 'main' ? 'home' : id);
    const i = sections.indexOf(section);
    if (i < 0) return;
    section.tabIndex = -1;
    if (immediate) { stop(); window.scrollTo(0, offsets[i]); requestTick(); }
    else animateTo(offsets[i], section);
  }
  listen(document, 'click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const id = link.hash.slice(1);
    if (id !== 'main' && !sections.some(s => s.id === id)) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    navigate(id);
  });
  listen(window, 'hashchange', () => navigate(location.hash.slice(1) || 'home'));
  listen(window, 'resize', () => { const index=nearestSection();stop(); refresh();window.scrollTo(0,offsets[index]); });
  listen(motion, 'change', () => { stop(); requestTick(); });
  const observer = new ResizeObserver(refresh);
  sections.forEach(s => observer.observe(s));
  refresh();
  navigate(initialId || location.hash.slice(1) || 'home', true);
  document.fonts.ready.then(() => { if (!destroyed) refresh(); });
  return {
    get currentId() { return sections[Math.max(active, 0)].id; },
    refresh,
    pause() { stop(); paused = true; previousOverflow = document.documentElement.style.overflow; document.documentElement.style.overflow = 'hidden'; },
    resume() { paused = false; document.documentElement.style.overflow = previousOverflow; refresh(); },
    destroy() { spaceDestroyed = true; space?.destroy(); destroyed = true; stop(); cancelAnimationFrame(frame); controller.abort(); observer.disconnect(); history.scrollRestoration = oldRestoration; if (paused) document.documentElement.style.overflow = previousOverflow; },
  };
}


