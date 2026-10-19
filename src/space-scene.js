import * as THREE from 'three';
import { spacePoseAt } from './space-poses.js';

const vertex = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
void main(){ vNormal = normal; vPosition = position; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }
`;
const noise = `
float hash(vec3 p){ p=fract(p*.3183099+vec3(.1,.2,.3)); p*=17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float noise3(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }
float fbm(vec3 p){ float v=0.,a=.5; for(int i=0;i<5;i++){v+=a*noise3(p);p=p*2.03+7.1;a*=.5;} return v; }
`;
const fragment = `
precision highp float;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
uniform vec3 uLight;
uniform float uIntensity;
uniform sampler2D uEarth;
uniform float uHasEarth;
uniform mat4 modelMatrix;
${noise}
void main(){
 vec3 n=normalize(vNormal);
 float terrain=fbm(n*4.5);
 float detail=fbm(n*38.);
 float land=smoothstep(.46,.57,terrain);
 vec3 ocean=mix(vec3(.012,.035,.065),vec3(.045,.13,.19),terrain);
 vec3 rock=mix(vec3(.1,.16,.2),vec3(.28,.32,.32),detail);
 vec3 fallback=mix(ocean,rock,land);
 vec3 surface=texture2D(uEarth,vUv).rgb;
 vec3 color=mix(fallback,surface,uHasEarth);
 float oceanMask=smoothstep(.004,.045,surface.b-max(surface.r,surface.g))*uHasEarth;
 color=mix(color,max(color,vec3(.05,.14,.25)),oceanMask*.9);
 vec3 worldNormal=normalize(mat3(modelMatrix)*n);
 float diffuse=max(0.,dot(worldNormal,normalize(uLight)));
 float daylight=pow(diffuse,1.2)*uIntensity;
 color*=mix(.13+daylight*.62,.26+daylight*1.28,oceanMask);
 float water=smoothstep(.055,.22,color.b-color.r);
 color+=vec3(.17,.31,.4)*pow(max(0.,dot(reflect(-normalize(uLight),worldNormal),normalize(cameraPosition-(modelMatrix*vec4(vPosition,1.)).xyz))),12.)*water*diffuse*.18;
 vec3 viewDir=normalize(cameraPosition-(modelMatrix*vec4(vPosition,1.)).xyz);
 float rim=pow(1.-max(0.,dot(worldNormal,viewDir)),4.);
 color+=vec3(.08,.3,.58)*rim*(.32+diffuse*.55);
 gl_FragColor=vec4(color,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;

export function createSpaceScene(root) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 760px)');
  const finePointer = matchMedia('(pointer: fine)');
  const abort = new AbortController();
  const listen = (target, type, fn, options = {}) => target.addEventListener(type, fn, { ...options, signal: abort.signal });
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' }); }
  catch { root.dataset.quality = 'fallback'; return { update() {}, destroy() {} }; }
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  root.append(canvas);
  renderer.setClearColor(0x03060d, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(43, 1, .1, 80);
  const geometry = new THREE.SphereGeometry(1.65, 64, 48);
  const fallbackTexture = new THREE.DataTexture(new Uint8Array([12, 28, 48, 255]), 1, 1);
  fallbackTexture.needsUpdate = true;
  const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms: {
    uLight: { value: new THREE.Vector3(-1.6, 1.1, 3.4) }, uIntensity: { value: 1.1 },
    uEarth: { value: fallbackTexture }, uHasEarth: { value: 0 },
  } });
  const planet = new THREE.Mesh(geometry, material);
  scene.add(planet);
  const loader = new THREE.TextureLoader();
  let earthTexture;
  loader.load(`${import.meta.env.BASE_URL}assets/earth-blue-marble-july.webp`, texture => {
    if (!alive) { texture.dispose(); return; }
    earthTexture = texture;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    material.uniforms.uEarth.value = texture;
    material.uniforms.uHasEarth.value = 1;
    request();
  });
  const cloudShell = new THREE.Mesh(new THREE.SphereGeometry(1.675, 64, 40), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uLight: { value: material.uniforms.uLight.value } },
    vertexShader: vertex,
    fragmentShader: `precision highp float; varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv; uniform vec3 uLight; uniform mat4 modelMatrix; ${noise}
      void main(){vec3 n=normalize(vNormal);float broad=fbm(n*9.5+vec3(1.3,2.1,.7));float wisps=fbm(n*31.+vec3(2.7));
      float cloud=smoothstep(.6,.78,broad+wisps*.13);float light=max(0.,dot(normalize(mat3(modelMatrix)*n),normalize(uLight)));
      gl_FragColor=vec4(vec3(.72,.81,.85)*(light*.75+.17),cloud*.34);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  }));
  planet.add(cloudShell);
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.71, 48, 32), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending,
    vertexShader: `varying vec3 n; varying vec3 v; void main(){ vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p; }`,
    fragmentShader: `varying vec3 n; varying vec3 v; void main(){float a=pow(max(0.,1.-abs(dot(normalize(n),normalize(v)))),3.2);gl_FragColor=vec4(.14,.38,.75,a*.45);}`,
  }));
  planet.add(atmosphere);
  // Deterministic low-cost geometry, no model/texture downloads.
  let seed = 42;
  const random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
  const positions = new Float32Array(1500 * 3);
  for (let i = 0; i < 1500; i++) { positions[i*3] = (random()-.5)*38; positions[i*3+1] = (random()-.5)*25; positions[i*3+2] = -5-random()*15; }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xaebed8, size: .03, transparent: true, opacity: .68, depthWrite: false, sizeAttenuation: true }));
  scene.add(stars);
  const brightPositions = new Float32Array(90 * 3);
  for(let i=0;i<90;i++){brightPositions[i*3]=(random()-.5)*34;brightPositions[i*3+1]=(random()-.5)*22;brightPositions[i*3+2]=-8-random()*10;}
  const brightGeometry = new THREE.BufferGeometry();
  brightGeometry.setAttribute('position',new THREE.BufferAttribute(brightPositions,3));
  const brightStars = new THREE.Points(brightGeometry,new THREE.PointsMaterial({color:0xf4ead8,size:.085,transparent:true,opacity:.86,depthWrite:false,sizeAttenuation:true}));
  scene.add(brightStars);
  const dustGeometry = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(65*3);
  for(let i=0;i<65;i++){dustPositions[i*3]=(random()-.5)*15;dustPositions[i*3+1]=(random()-.5)*10;dustPositions[i*3+2]=random()*3;}
  dustGeometry.setAttribute('position',new THREE.BufferAttribute(dustPositions,3));
  const dust = new THREE.Points(dustGeometry,new THREE.PointsMaterial({color:0xd8c293,size:.022,transparent:true,opacity:.42,depthWrite:false,sizeAttenuation:true}));
  scene.add(dust);
  const nebula = new THREE.Mesh(new THREE.PlaneGeometry(32, 22), new THREE.ShaderMaterial({
    transparent:true, depthWrite:false,
    uniforms:{uOpacity:{value:.26}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`varying vec2 vUv;uniform float uOpacity;${noise}
    void main(){vec2 p=vUv-.5;float mist=fbm(vec3(p*5.,2.));float a=exp(-dot(p*vec2(1.,2.),p*vec2(1.,2.))*5.)*mist*uOpacity;vec3 c=mix(vec3(.12,.16,.4),vec3(.28,.12,.38),vUv.x);gl_FragColor=vec4(c,a);}`,
  }));
  nebula.position.set(1,2,-12);scene.add(nebula);
  let current = spacePoseAt(0,0), raf=0, last=0, alive=true, lost=false, elapsed=0, lowQuality=false, slowFrames=0;
  let mouseX=0,mouseY=0,smoothX=0,smoothY=0;
  const pointerParallaxBoost=1.5;
  const look = new THREE.Vector3();
  function resize(){
    const mobile=compact.matches;
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile || lowQuality ? 1 : 1.5));
    renderer.setSize(innerWidth,innerHeight);
    camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
    starGeometry.setDrawRange(0,mobile || lowQuality ? 550 : 1500);
    brightGeometry.setDrawRange(0,mobile || lowQuality ? 30 : 90);
    dustGeometry.setDrawRange(0,mobile || lowQuality ? 24 : 65);
    root.dataset.quality=mobile || lowQuality ? 'low' : 'standard';
    request();
  }
  function request(){if(!raf && alive && !lost && !document.hidden)raf=requestAnimationFrame(draw);}
  function draw(time){
    raf=0;
    const dt=last ? Math.min(time-last,100) : 16.7;last=time;
    if(!reduced.matches)elapsed+=dt/1000;
    const p=reduced.matches ? spacePoseAt(0,0) : current;
    const mobile=compact.matches;
    const amount=reduced.matches || mobile ? 0 : 1;
    smoothX+=(mouseX*amount-smoothX)*(1-Math.exp(-dt/180));
    smoothY+=(mouseY*amount-smoothY)*(1-Math.exp(-dt/180));
    planet.rotation.set(p[0],p[1]+elapsed*.008,p[2]);
    cloudShell.rotation.y=elapsed*.004;
    planet.position.set(mobile ? .65+(p[3]-1.5)*.4 : p[3],p[4]*(mobile?.4:1),p[5]);
    planet.scale.setScalar(p[6]*(mobile?.78:1));
    camera.position.set(p[7]*(mobile?.3:1)+smoothX*.12*pointerParallaxBoost,p[8]+smoothY*.08*pointerParallaxBoost,p[9]+(mobile?1:0));
    look.set(p[10],p[11],p[12]);camera.lookAt(look);
    material.uniforms.uIntensity.value=p[13];
    material.uniforms.uLight.value.set(-1.6+p[15]*.3,1.1+p[15]*.15,3.4);
    nebula.material.uniforms.uOpacity.value=p[14];
    // Each space layer moves at a different rate to create depth while the planet
    // keeps its fixed section position. Pointer values are already smoothly damped.
    stars.position.set(-smoothX*.22,-smoothY*.14-p[15]*.05,0);
    stars.rotation.set(smoothY*.008,p[15]*.11+elapsed*.001-smoothX*.012,0);
    brightStars.position.set(-smoothX*.48,-smoothY*.3-p[15]*.12,0);
    brightStars.rotation.y=p[15]*.045-smoothX*.02;
    dust.position.set(smoothX*.85+Math.sin(elapsed*.07)*.08,smoothY*.58+p[15]*.34,0);
    dust.rotation.z=p[15]*.06+smoothX*.03;
    nebula.position.x=1-smoothX*.7;
    nebula.position.y=2-smoothY*.45-p[15]*.22;
    nebula.rotation.z=-smoothX*.012+p[15]*.018;
    renderer.render(scene,camera);
    root.classList.add('space-ready');
    if(dt>27 && dt<90)slowFrames++;else slowFrames=Math.max(0,slowFrames-1);
    if(slowFrames>120 && !lowQuality){lowQuality=true;resize();}
    if(!reduced.matches)request();
  }
  listen(window,'resize',resize);
  listen(window,'pointermove',e=>{if(!finePointer.matches || reduced.matches)return;mouseX=e.clientX/innerWidth-.5;mouseY=.5-e.clientY/innerHeight;request();},{passive:true});
  listen(document,'pointerleave',()=>{mouseX=mouseY=0;});
  listen(reduced,'change',()=>{last=0;elapsed=0;request();});
  listen(document,'visibilitychange',()=>{cancelAnimationFrame(raf);raf=0;last=0;if(!document.hidden)request();});
  listen(canvas,'webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(raf);raf=0;root.classList.remove('space-ready');root.dataset.quality='fallback';});
  listen(canvas,'webglcontextrestored',()=>{lost=false;last=0;resize();});
  resize();
  return {
    update(index,progress){current=spacePoseAt(index,progress);if(!reduced.matches)request();},
    destroy(){alive=false;abort.abort();cancelAnimationFrame(raf);scene.traverse(object=>{object.geometry?.dispose();if(object.material)object.material.dispose();});earthTexture?.dispose();fallbackTexture.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();root.classList.remove('space-ready');},
  };
}
