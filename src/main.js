import './style.css';
import './story.css';
import { copy, items, scene, experiencesData, contactInfo, aboutTimeline, skillsList } from './content.js';
import { createStory } from './scroll-story.js';
import { galleryMarkup, mountGallery } from './project-gallery.js';
import './section-layout.css';

const pages = ['home', 'about', 'projects', 'experience', 'contact'];
let lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'tr';

let story;
function render() {
  const previous = story?.currentId;
  story?.destroy();
  const t = copy[lang];
  document.documentElement.lang = lang;
  document.querySelector('.skip').textContent = t.skip;
  document.querySelector('#app').innerHTML = `
    <div class="space-background" aria-hidden="true">${scene}</div><div class="space-overlay" aria-hidden="true"></div>
    <header><a class="brand" href="#home" aria-label="Semih Ertan"><span class="monogram">se<span>↗</span></span><span>SEMIH ERTAN<small>${t.role}</small></span></a>
      <nav aria-label="${lang === 'tr' ? 'Ana menü' : 'Main navigation'}">${pages.map(p => `<a href="#${p}">${t[p]}</a>`).join('')}</nav>
      <div class="languages" aria-label="${lang === 'tr' ? 'Dil seçimi' : 'Language'}"><button data-lang="tr" aria-pressed="${lang === 'tr'}">TR</button><span>/</span><button data-lang="en" aria-pressed="${lang === 'en'}">EN</button></div>
    </header>
    <main id="main" tabindex="-1">
      <section id="home" class="story-section hero" aria-labelledby="home-title">
        <div class="section-content hero-copy">
          <h1 id="home-title" data-reveal="title">Semih<br>Ertan</h1>
          <p class="hero-tagline" data-reveal="text">${t.tagline}</p>
          <a class="hero-cta" href="#projects" data-reveal="text">${t.cta}<span>→</span></a>
        </div>
        <div class="hero-bottom">
          <div class="hero-socials">
            <a href="${contactInfo.github}" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
            <a href="${contactInfo.linkedin}" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>LinkedIn</span>
            </a>
          </div>
          <span class="hero-copy-right">© 2026 Semih Ertan</span>
        </div>
      </section>
      <section id="about" class="story-section inner" aria-labelledby="about-title">
        <div class="section-content">
          <p class="eyebrow" data-reveal="text">02 / ${t.about}</p>
          <h2 class="section-title" id="about-title" data-reveal="title">${t.aboutTitle}</h2>
          <div class="about-layout" data-reveal="text">
            <div class="about-main-col">
              <h3 class="about-name">Semih Ertan</h3>
              <p class="about-bio">${t.bio}</p>
              <a class="action about-action" href="#projects">${t.inspectProjects}<span>→</span></a>
              <div class="about-skills">
                ${skillsList.map((skill, idx) => `<span>${skill}</span>${idx < skillsList.length - 1 ? '<i>|</i>' : ''}`).join('')}
              </div>
            </div>
            <aside class="about-experience-aside">
              <p class="eyebrow">${t.experienceEduTitle}</p>
              <div class="about-timeline">
                ${aboutTimeline.map(item => `
                  <div class="timeline-item">
                    <div class="timeline-header">
                      <strong class="timeline-title">${item.title[lang]}</strong>
                      <span class="timeline-meta">${item.role[lang]}</span>
                    </div>
                    <p class="timeline-desc">${item.desc[lang]}</p>
                  </div>
                `).join('')}
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section id="projects" class="story-section inner" aria-labelledby="projects-title"><div class="section-content" data-reveal="text">${galleryMarkup(t, items, lang)}</div></section>
      <section id="experience" class="story-section inner" aria-labelledby="experience-title">
        <div class="section-content">
          <p class="eyebrow" data-reveal="text">04 / ${t.experience}</p>
          <h2 class="section-title" id="experience-title" data-reveal="title">${t.experienceTitle}</h2>
          <div class="experience-showcase" data-reveal="text">
            ${experiencesData.map(exp => `
              <div class="experience-highlight-card">
                <div class="experience-card-header">
                  <div>
                    <span class="experience-company">${exp.company}</span>
                    <h3 class="experience-role">${exp.role[lang]}</h3>
                  </div>
                  <div class="experience-meta">
                    <span class="experience-badge">${exp.period[lang]}</span>
                    <span class="experience-loc">📍 ${exp.location[lang]}</span>
                  </div>
                </div>
                <p class="experience-lead">${exp.summary[lang]}</p>
                <ul class="experience-bullets">
                  ${exp.bullets[lang].map(b => `<li>${b}</li>`).join('')}
                </ul>
                <div class="experience-tags">
                  ${exp.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
              </div>
            `).join('')}
            <a class="action" href="#contact" data-reveal="text">${t.contact}<span>↗</span></a>
          </div>
        </div>
      </section>
      <section id="contact" class="story-section inner" aria-labelledby="contact-title">
        <div class="section-content">
          <p class="eyebrow" data-reveal="text">05 / ${t.contact}</p>
          <h2 class="section-title" id="contact-title" data-reveal="title">${t.contactTitle}</h2>
          <div class="contact-layout" data-reveal="text">
            <div class="contact-cards-grid">
              <a class="contact-card" href="mailto:${contactInfo.email}">
                <div class="contact-card-top">
                  <span class="contact-tag">${t.emailLabel}</span>
                  <span class="contact-arrow">↗</span>
                </div>
                <div class="contact-card-body">
                  <strong>${contactInfo.email}</strong>
                  <span class="contact-card-sub">${t.sendEmail}</span>
                </div>
              </a>
              <a class="contact-card" href="${contactInfo.github}" target="_blank" rel="noopener noreferrer">
                <div class="contact-card-top">
                  <span class="contact-tag">GitHub</span>
                  <span class="contact-arrow">↗</span>
                </div>
                <div class="contact-card-body">
                  <strong>semihertan</strong>
                  <span class="contact-card-sub">${t.viewGithub}</span>
                </div>
              </a>
              <a class="contact-card" href="${contactInfo.linkedin}" target="_blank" rel="noopener noreferrer">
                <div class="contact-card-top">
                  <span class="contact-tag">LinkedIn</span>
                  <span class="contact-arrow">↗</span>
                </div>
                <div class="contact-card-body">
                  <strong>Semih Ertan</strong>
                  <span class="contact-card-sub">${t.viewLinkedin}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <footer>
          <span>© 2026 ${t.footer} · ${contactInfo.university[lang]}</span>
          <span>${t.version}</span>
        </footer>
      </section>
    </main>
    <div class="story-progress" aria-hidden="true"><span class="story-index">01 / 05</span><span class="progress-track"><span class="progress-fill"></span></span></div>
    `;
  story = createStory({ initialId: previous, onActive(id) { document.title = `Semih Ertan | ${t[id]}`; } });
  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang;
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
    render();
    document.querySelector(`[data-lang="${lang}"]`).focus({ preventScroll: true });
  }));
  mountGallery(document.querySelector('.gallery'), t, items, lang, () => story.refresh());
}
render();
