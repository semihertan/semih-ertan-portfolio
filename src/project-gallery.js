import './project-gallery.css';
import { projectsData } from './content.js';

export function galleryMarkup(t, items, lang) {
  const tr = lang === 'tr';
  return `<div class="gallery" aria-label="${tr ? 'Proje galerisi' : 'Project gallery'}">
    <div class="gallery-overview">
      <div class="gallery-heading">
        <div>
          <p class="eyebrow">03 / ${tr ? 'PROJE SEÇKİSİ' : 'SELECTED WORK'}</p>
          <h2 class="section-title" id="projects-title">${tr ? 'Projelerim.' : 'My projects.'}</h2>
        </div>
        <p class="muted">${tr ? 'Fikirden araştırmaya. Tasarımdan uygulamaya.' : 'From ideas to research. From design to practice.'}</p>
      </div>
      <div class="gallery-stage" role="region" aria-roledescription="carousel" aria-label="${t.projects}" tabindex="0">
        ${items.map(i => {
          const p = projectsData[i.id];
          return `<button class="gallery-card" data-card="${i.id}">
            <div class="gallery-card-top">
              <span>${p.no}</span>
              <span>${p.tag[lang]}</span>
              <span>↗</span>
            </div>
            <div class="gallery-art art-${i.id}" aria-hidden="true">
              ${p.image ? `<img src="${p.image}" alt="${p.imageAlt?.[lang] || p.title[lang]}" class="gallery-card-img" /><span class="gallery-art-overlay"></span>` : art(i.id)}
              <span class="gallery-badge">${p.badge[lang]}</span>
            </div>
            <div class="gallery-card-body">
              <h3>${p.cardTitle?.[lang] || p.title[lang]}</h3>
              <p>${p.shortDesc[lang]}</p>
              <div class="gallery-card-bottom">
                <span>${p.label[lang]}</span>
                <span class="gallery-inspect">${tr ? 'İncele' : 'Explore'} →</span>
              </div>
            </div>
          </button>`;
        }).join('')}
      </div>
      <div class="gallery-footer">
        <span class="gallery-count"></span>
        <div class="gallery-track"><span></span></div>
        <span class="gallery-counter" aria-live="polite" aria-atomic="true"></span>
        <div class="gallery-arrows">
          <button data-direction="-1" aria-label="${tr ? 'Önceki proje' : 'Previous project'}">←</button>
          <button data-direction="1" aria-label="${tr ? 'Sonraki proje' : 'Next project'}">→</button>
        </div>
      </div>
    </div>
    <div class="gallery-detail" hidden>
      <button class="gallery-back">← ${tr ? 'Tüm projeler' : 'All projects'}</button>
      <div class="gallery-detail-layout">
        <div class="gallery-detail-art" aria-hidden="true"></div>
        <div class="gallery-detail-content">
          <p class="eyebrow gallery-detail-badge"></p>
          <h3 class="section-title" tabindex="-1"></h3>
          <p class="gallery-summary"></p>
          <div class="gallery-detail-note gallery-resp-block">
            <h4 class="gallery-resp-title"></h4>
            <ul class="gallery-bullets"></ul>
          </div>
          <div class="gallery-detail-note gallery-tech-block">
            <h4 class="gallery-tech-title"></h4>
            <div class="gallery-tech-tags"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function art(id) {
  if (id === 'rocket') return '<div class="rocket-diagram"><i></i><span></span></div><div class="art-orbit"></div>';
  if (id === 'research') return '<div class="research-orbits"><i></i><i></i><i></i><span></span></div>';
  return '<div class="code-window"><div>● ● ●</div><span>&lt; / &gt;</span><i></i><i></i><i></i></div>';
}

export function mountGallery(root, t, items, lang, onLayout) {
  let filtered = items, index = 0, start = null, swiped = false;
  const tr = lang === 'tr';
  const cards = [...root.querySelectorAll('[data-card]')];
  const stage = root.querySelector('.gallery-stage');
  const overview = root.querySelector('.gallery-overview');
  const detail = root.querySelector('.gallery-detail');

  function update() {
    cards.forEach(card => {
      const i = filtered.findIndex(item => item.id === card.dataset.card);
      const relative = (i - index + filtered.length) % filtered.length;
      card.hidden = i < 0 || (filtered.length > 3 && relative > 1 && relative < filtered.length - 1);
      const slot = i === index ? 'active' : relative === 1 ? 'next' : 'previous';
      card.dataset.slot = slot;
      card.tabIndex = i === index ? 0 : -1;
      const cardTitle = projectsData[card.dataset.card]?.title[lang] || card.dataset.card;
      card.setAttribute('aria-label', `${cardTitle} — ${i === index ? (tr ? 'Projeyi incele' : 'View project') : (tr ? 'Projeyi merkeze al' : 'Center project')}`);
    });
    root.querySelector('.gallery-count').textContent = `${filtered.length} ${tr ? 'çalışma' : 'projects'}`;
    root.querySelector('.gallery-counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`;
    root.querySelector('.gallery-track span').style.transform = `scaleX(${(index + 1) / filtered.length})`;
    root.querySelectorAll('[data-direction]').forEach(b => { b.disabled = filtered.length < 2; });
    onLayout();
  }

  function move(delta) {
    index = (index + delta + filtered.length) % filtered.length;
    update();
    window.scrollTo(0, root.closest('section').offsetTop);
  }

  root.querySelectorAll('[data-direction]').forEach(b => b.addEventListener('click', () => move(Number(b.dataset.direction))));

  cards.forEach(card => card.addEventListener('click', () => {
    if (swiped) { swiped = false; return; }
    const i = filtered.findIndex(item => item.id === card.dataset.card);
    if (i !== index) { index = i; update(); return; }

    const id = filtered[index].id;
    const p = projectsData[id];
    const artContainer = root.querySelector('.gallery-detail-art');

    if (p.galleryImages?.length) {
      artContainer.innerHTML = p.galleryImages.map((image, imageIndex) =>
        `<img src="${image.src}" alt="${image.alt?.[lang] || p.title[lang]}" class="gallery-detail-img${imageIndex ? ' gallery-detail-img-secondary' : ''}" />`
      ).join('');
    } else if (p.image) {
      artContainer.innerHTML = `<img src="${p.image}" alt="${p.imageAlt?.[lang] || p.title[lang]}" class="gallery-detail-img" />`;
      if (p.secondaryImage) artContainer.innerHTML += `<img src="${p.secondaryImage}" alt="${p.secondaryImageAlt?.[lang] || ''}" class="gallery-detail-img gallery-detail-img-secondary" />`;
    } else {
      artContainer.innerHTML = art(id);
    }
    artContainer.className = `gallery-detail-art art-${id}${p.galleryImages?.length ? ' gallery-detail-multi' : ''}`;

    detail.querySelector('.gallery-detail-badge').textContent = `${p.no} / ${p.badge[lang]}`;
    detail.querySelector('h3').textContent = p.title[lang];
    detail.querySelector('h3').classList.toggle('gallery-long-title', p.title[lang].length > 70);
    detail.querySelector('.gallery-summary').textContent = p.summary[lang];

    detail.querySelector('.gallery-resp-title').textContent = p.responsibilitiesTitle[lang];
    detail.querySelector('.gallery-bullets').innerHTML = p.responsibilities[lang].map(r => `<li>${r}</li>`).join('');

    detail.querySelector('.gallery-tech-title').textContent = p.technologiesTitle[lang];
    detail.querySelector('.gallery-tech-tags').innerHTML = p.technologies.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

    overview.hidden = true;
    detail.hidden = false;
    detail.querySelector('h3').id = 'gallery-detail-title';
    root.closest('section').setAttribute('aria-labelledby', 'gallery-detail-title');
    onLayout();
    detail.querySelector('h3').focus({ preventScroll: true });
    const section = root.closest('section');
    section.querySelector('.section-content').scrollTop = 0;
    window.scrollTo(0, section.offsetTop);
  }));

  root.querySelector('.gallery-back').addEventListener('click', () => {
    detail.hidden = true;
    overview.hidden = false;
    root.closest('section').setAttribute('aria-labelledby', 'projects-title');
    update();
    cards.find(c => c.dataset.card === filtered[index].id)?.focus({ preventScroll: true });
  });

  stage.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      move(e.key === 'ArrowRight' ? 1 : -1);
      stage.focus({ preventScroll: true });
    }
  });

  stage.addEventListener('pointerdown', e => {
    start = { x: e.clientX, y: e.clientY };
    swiped = false;
  });

  stage.addEventListener('pointerup', e => {
    if (!start) return;
    const x = e.clientX - start.x, y = e.clientY - start.y;
    start = null;
    if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y) * 1.4) {
      swiped = true;
      move(x < 0 ? 1 : -1);
    }
  });

  stage.addEventListener('pointercancel', () => { start = null; });

  update();
}
