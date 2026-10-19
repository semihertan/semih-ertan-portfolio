const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;

export const copy = {
  tr: {
    home: 'Ana Sayfa',
    about: 'Hakkımda',
    projects: 'Projeler',
    experience: 'Deneyim',
    contact: 'İletişim',
    skip: 'İçeriğe atla',
    scroll: 'Aşağı kaydır',
    role: 'BİLGİSAYAR MÜHENDİSİ',
    intro: 'Fikirden tasarıma.\nTasarımdan gerçeğe.',
    description: 'MilSOFT stajı, TEKNOFEST roket yarışması, TÜBİTAK VR simülasyonu ve TinyML gömülü sistem çalışmalarım.',
    cta: 'Projelerimi incele',
    tagline: 'Bilgisayar Mühendisliği',
    note: 'KİŞİSEL PORTFOLYO / 2026',
    aboutTitle: 'Hakkımda.',
    bio: 'İzmir Bakırçay Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Full-stack yazılım geliştirme, gömülü sistemler ve gerçek zamanlı veri işleme alanlarında proje deneyimine sahibim. MilSOFT\'taki yazılım geliştirme stajımın yanı sıra TÜBİTAK destekli proje ve TEKNOFEST Roket Yarışması kapsamında yazılım geliştirme süreçlerinde görev aldım.',
    experienceEduTitle: 'DENEYİM & EĞİTİM',
    experienceTitle: 'Mühendislik deneyimi.',
    inspectProjects: 'Projelerimi incele',
    pending: 'Yazılım mimarisi, yapay zeka ve sistem entegrasyonu odaklı çalışmalar üretmeye devam ediyorum.',
    areas: 'ÇALIŞMA ALANLARI',
    projectTitle: 'Üzerinde çalıştıklarım.',
    all: 'Tümü',
    rocket: 'Roket Yarışması',
    research: 'TÜBİTAK Projesi',
    personal: 'Kişisel Projeler',
    cryptology: 'İHA Sürü Ağları',
    squad: 'Squad',
    f1strategy: 'F1 Pit Stop Stratejisi',
    draft: 'İçerik hazır',
    detail: 'Proje hakkında',
    close: 'Kapat',
    footer: 'Semih Ertan',
    version: '2026 · Güncel Portfolyo',
    projectNote: 'Projelerimin kapsamı, sorumluluklarım ve kullanılan teknolojiler aşağıda detaylandırılmıştır.',
    contactTitle: 'Benimle iletişime geçin.',
    contactBio: 'Full-stack yazılım geliştirme, gömülü sistemler, simülasyon ve yeni mühendislik projeleri üzerine görüşmek için benimle dilediğiniz kanaldan iletişime geçebilirsiniz.',
    contactSub: 'E-posta veya telefon ile doğrudan ulaşabilir, GitHub ve LinkedIn üzerinden projelerimi inceleyebilir ya da güncel CV\'mi indirebilirsiniz.',
    emailLabel: 'E-POSTA',
    phoneLabel: 'TELEFON',
    locationLabel: 'KONUM & ÇALIŞMA',
    educationLabel: 'AKADEMİK GEÇMİŞ',
    sendEmail: 'Mesaj Gönder →',
    callPhone: 'Hemen Ara →',
    downloadCv: 'CV İndir (PDF)',
    viewGithub: 'GitHub Profili',
    viewLinkedin: 'LinkedIn Profili',
    backToTop: 'Başa Dön'
  },
  en: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
    skip: 'Skip to content',
    scroll: 'Scroll down',
    role: 'COMPUTER ENGINEER',
    intro: 'From idea to design.\nFrom design to reality.',
    description: 'MilSOFT internship, TEKNOFEST rocket competition, TÜBİTAK VR simulation, and TinyML embedded systems projects.',
    cta: 'Explore my projects',
    tagline: 'Computer Engineering',
    note: 'PERSONAL PORTFOLIO / 2026',
    aboutTitle: 'About me.',
    bio: 'I am a 4th-year Computer Engineering student at Izmir Bakircay University. I have project experience in full-stack software development, embedded systems, and real-time data processing. Alongside my software engineering internship at MilSOFT, I took part in software development within a TÜBİTAK-supported project and the TEKNOFEST Rocket Competition.',
    experienceEduTitle: 'EXPERIENCE & EDUCATION',
    experienceTitle: 'Engineering experience.',
    inspectProjects: 'Explore my projects',
    pending: 'Continuing to build mission-critical software, machine learning, and system integrations.',
    areas: 'AREAS OF WORK',
    projectTitle: 'Things I’m working on.',
    all: 'All',
    rocket: 'Rocket Competition',
    research: 'TÜBİTAK Project',
    personal: 'Personal Projects',
    cryptology: 'UAV Swarm Networks',
    squad: 'Squad',
    f1strategy: 'F1 Pit Stop Strategy',
    draft: 'Complete',
    detail: 'About the project',
    close: 'Close',
    footer: 'Semih Ertan',
    version: '2026 · Current Portfolio',
    projectNote: 'Details on project scopes, responsibilities, and technologies are outlined below.',
    contactTitle: 'Get in touch with me.',
    contactBio: 'Feel free to reach out to discuss full-stack engineering, embedded systems, simulation, or collaboration opportunities.',
    contactSub: 'You can contact me directly via email or phone, browse my code on GitHub and LinkedIn, or download my current CV.',
    emailLabel: 'EMAIL',
    phoneLabel: 'PHONE',
    locationLabel: 'LOCATION & WORK',
    educationLabel: 'ACADEMIC BACKGROUND',
    sendEmail: 'Send Message →',
    callPhone: 'Call Now →',
    downloadCv: 'Download CV (PDF)',
    viewGithub: 'GitHub Profile',
    viewLinkedin: 'LinkedIn Profile',
    backToTop: 'Back to Top'
  }
};

export const items = [
  { id: 'rocket', no: '01', label: 'AVİYONİK & YAZILIM', art: 'orbit' },
  { id: 'research', no: '02', label: 'VR & SİMÜLASYON', art: 'grid' },
  { id: 'cryptology', no: '03', label: 'KRİPTOLOJİ & AĞ SİMÜLASYONU', art: 'cipher' },
  { id: 'personal', no: '04', label: 'TINYML & GÖMÜLÜ SİSTEM', art: 'code' },
  { id: 'squad', no: '05', label: 'GERÇEK ZAMANLI SES & MESAJLAŞMA', art: 'code' },
  { id: 'f1strategy', no: '06', label: 'MAKİNE ÖĞRENMESİ & VERİ ANALİZİ', art: 'grid' }
];

export const aboutTimeline = [
  {
    title: { tr: 'Bakır Roket Takımı', en: 'Bakir Rocket Team' },
    role: { tr: 'Yazılım Sorumlusu · Ocak — Mayıs 2026', en: 'Software Lead · Jan — May 2026' },
    desc: {
      tr: 'TEKNOFEST Roket Yarışması Yer İstasyonu Yazılımı ve telemetri haberleşmesi.',
      en: 'TEKNOFEST Rocket Competition Ground Station Software & telemetry integration.'
    }
  },
  {
    title: { tr: 'TÜBİTAK 1002-A', en: 'TÜBİTAK 1002-A' },
    role: { tr: 'Bursiyer Öğrenci · Mayıs — Ağustos 2026', en: 'Project Scholar · May — Aug 2026' },
    desc: {
      tr: 'VR tabanlı yangına müdahale simülasyonu; Unity ve C# ile etkileşim mekanikleri.',
      en: 'VR-based fire response simulation, interaction and gameplay mechanics with Unity & C#.'
    }
  },
  {
    title: { tr: 'MilSOFT Yazılım Teknolojileri A.Ş.', en: 'MilSOFT Software Technologies' },
    role: { tr: 'Yazılım Geliştirme Stajyeri · Temmuz — Ağustos 2026', en: 'Software Development Intern · Jul — Aug 2026' },
    desc: {
      tr: 'Ankara · ASP.NET Core, Angular ve PostgreSQL ile full-stack görev yönetim sistemi.',
      en: 'Ankara · Full-stack task management system with ASP.NET Core, Angular & PostgreSQL.'
    }
  },
  {
    title: { tr: 'İzmir Bakırçay Üniversitesi', en: 'Izmir Bakircay University' },
    role: { tr: 'Bilgisayar Mühendisliği · 2023 — Devam ediyor', en: 'Computer Engineering · 2023 — Present' },
    desc: {
      tr: '4. sınıf · Genel not ortalaması: 3,65 / 4,00',
      en: 'Senior student · Cumulative GPA: 3.65 / 4.00'
    }
  }
];

export const skillsList = [
  'C# / .NET',
  'Angular',
  'PostgreSQL',
  'C++',
  'TinyML / ESP32',
  'Python'
];

export const projectsData = {
  cryptology: {
    id: 'cryptology',
    no: '03',
    tag: { tr: 'BİTİRME PROJESİ', en: 'CAPSTONE PROJECT' },
    label: { tr: 'KRİPTOLOJİ & AĞ SİMÜLASYONU', en: 'CRYPTOLOGY & NETWORK SIMULATION' },
    badge: { tr: 'Devam ediyor', en: 'In progress' },
    title: {
      tr: 'Kayıplı ve Bölünmeli İHA Sürü Ağlarında Kuantum Sonrası Güvenli Grup Anahtarı Yenilemenin Tutarlılık ve Toparlanma Analizi',
      en: 'Consistency and Recovery Analysis of Post-Quantum Secure Group Key Renewal in Lossy and Partitioned UAV Swarm Networks'
    },
    cardTitle: { tr: 'İHA Sürü Ağlarında Anahtar Yenileme', en: 'Key Renewal in UAV Swarms' },
    shortDesc: {
      tr: 'Paket kaybı ve ağ bölünmelerinde anahtar sürümü tutarlılığı ile toparlanmayı inceliyoruz.',
      en: 'We study key-version consistency and recovery under packet loss and network partitions.'
    },
    summary: {
      tr: 'Takım arkadaşımla birlikte, İHA sürülerinde paket kaybı veya geçici ağ bölünmesi yüzünden grup anahtarı güncellemelerini kaçıran araçların yeniden bağlantı kurduğunda güncel anahtar sürümüne nasıl ulaşabileceğini inceliyoruz. Mekanizmaları tutarlılık, toparlanma süresi ve haberleşme yükü açısından değerlendiriyoruz. Proje devam ediyor.',
      en: 'Working with a teammate, we study how UAVs that miss group-key updates because of packet loss or temporary network partitions can reach the current key version after reconnecting. We assess consistency, recovery time, and communication overhead. The project is in progress.'
    },
    responsibilitiesTitle: { tr: 'ŞU ANA KADARKİ ÇALIŞMAMIZ', en: 'WORK TO DATE' },
    responsibilities: {
      tr: [
        'WSL2/Ubuntu üzerinde C++ ve ns-3 ile İHA sürüsü ağ senaryolarını simüle ediyoruz.',
        'Anahtar sürümünü epoch ile izliyor; REKEY mesajları, heartbeat ile uyumsuzluk tespiti ve RESYNC ile yeniden senkronizasyon mekanizmaları üzerinde çalışıyoruz.',
        'Paket kaybı ve ağdan kopup yeniden katılma durumlarını zaman aşımı, sınırlı yeniden deneme ve artan bekleme süreleriyle test ediyoruz. Deney sonuçlarını Python ve CSV ile analiz ediyoruz.',
        'Mevcut aşama anahtar yenileme ve toparlanma davranışının simülasyonudur. Gerçek kriptografik anahtar üretimi ve kuantum sonrası algoritma entegrasyonu henüz uygulanmadı.'
      ],
      en: [
        'We simulate UAV swarm network scenarios with C++ and ns-3 on WSL2/Ubuntu.',
        'We track key versions through epochs and work on REKEY messages, heartbeat-based mismatch detection, and RESYNC recovery.',
        'We test packet loss and leave/rejoin cases with timeouts, bounded retries, and increasing backoff, then analyze results using Python and CSV.',
        'The current phase simulates key renewal and recovery behavior. Actual cryptographic key generation and post-quantum algorithm integration have not yet been implemented.'
      ]
    },
    technologiesTitle: { tr: 'ARAÇLAR & MEKANİZMALAR', en: 'TOOLS & MECHANISMS' },
    technologies: ['C++', 'ns-3', 'WSL2 / Ubuntu', 'Python / CSV', 'epoch', 'REKEY', 'heartbeat', 'RESYNC'],
    image: asset('uav-swarm-key-renewal.webp'),
    imageAlt: {
      tr: 'İHA sürüsü ve haberleşme bağlantılarını gösteren kavramsal görsel',
      en: 'Concept illustration of a UAV swarm and its communication links'
    },
    secondaryImage: asset('cryptology-capstone.webp'),
    secondaryImageAlt: {
      tr: 'Anahtar sürümü ve kriptoloji için kavramsal görsel',
      en: 'Concept illustration of key versions and cryptology'
    }
  },
  rocket: {
    id: 'rocket',
    no: '01',
    tag: { tr: 'TEKNOFEST', en: 'TEKNOFEST' },
    label: { tr: 'AVİYONİK & YAZILIM', en: 'AVIONICS & SOFTWARE' },
    badge: { tr: 'Yazılım Sorumlusu', en: 'Software Lead' },
    title: { tr: 'TEKNOFEST Roket Yarışması', en: 'TEKNOFEST Rocket Competition' },
    shortDesc: {
      tr: 'Bakır Roket Takımı Yer İstasyonu Yazılımı, telemetri ve aviyonik entegrasyonu.',
      en: 'Ground Station Software, real-time telemetry communication and avionics integration.'
    },
    summary: {
      tr: 'Yazılım sorumlusu olarak, roket ile yer istasyonu arasındaki haberleşmeyi sağlayan; sensörlerden gelen telemetri verilerini gerçek zamanlı işleyen ve kullanıcı arayüzüne aktaran Yer İstasyonu Yazılımı\'nın geliştirilmesini üstlendim.',
      en: 'As software lead, I undertook the development of the Ground Station Software that establishes telemetry communication between the rocket and ground station, processes real-time sensor data, and visualizes it for the operator.'
    },
    responsibilitiesTitle: { tr: 'PROJEDEKİ SORUMLULUĞUM VE KAZANIMLAR', en: 'MY RESPONSIBILITIES & OUTCOMES' },
    responsibilities: {
      tr: [
        'Roket ile yer istasyonu arasındaki haberleşmeyi sağlayan; sensörlerden gelen telemetri verilerini gerçek zamanlı işleyen ve kullanıcı arayüzüne aktaran Yer İstasyonu Yazılımı\'nın geliştirilmesini üstlendim.',
        'Aviyonik sistemler ve görev odaklı yazılımların geliştirme süreçlerinde görev alarak sistem entegrasyonu konusunda deneyim kazandım.',
        'OpenRocket üzerinde gerçekleştirdiğim simülasyonlarla roketin aerodinamik ve operasyonel kısıtları doğrultusunda gerekli tasarım iyileştirmelerini yürüttüm.'
      ],
      en: [
        'Led the development of the Ground Station Software for real-time telemetry communication between the rocket and the ground station.',
        'Contributed to avionics subsystems and mission software lifecycle, gaining deep hands-on system integration experience.',
        'Conducted aerodynamic and flight stability simulations via OpenRocket, driving iterative airframe and fin design optimizations.'
      ]
    },
    technologiesTitle: { tr: 'KULLANILAN TEKNOLOJİLER & YETKİNLİKLER', en: 'TECHNOLOGIES & SKILLS' },
    technologies: [
      'Yer İstasyonu Yazılımı',
      'Aviyonik Sistem Entegrasyonu',
      'Telemetri & RF Haberleşme',
      'OpenRocket Simülasyonu',
      'Sensör Veri İşleme'
    ],
    image: asset('rocket.jpg')
  },
  research: {
    id: 'research',
    no: '02',
    tag: { tr: 'TÜBİTAK 1002-A', en: 'TÜBİTAK 1002-A' },
    label: { tr: 'VR & SİMÜLASYON', en: 'VR & SIMULATION' },
    badge: { tr: 'Proje Bursiyeri', en: 'Project Scholar' },
    title: { tr: 'TÜBİTAK 1002-A Projesi', en: 'TÜBİTAK 1002-A Project' },
    shortDesc: {
      tr: 'VR tabanlı yangına müdahale simülasyonu ve Unity mekanik geliştirme.',
      en: 'VR-based fire response simulation and Unity gameplay mechanics.'
    },
    summary: {
      tr: 'TÜBİTAK 1002-A destekli projede bursiyer öğrenci olarak, VR tabanlı yangına müdahale simülasyonunun geliştirilmesine katkı sağladım.',
      en: 'Contributed to the development of a VR-based fire response simulation as a funded student scholar in a TÜBİTAK 1002-A project.'
    },
    responsibilitiesTitle: { tr: 'PROJEDEKİ SORUMLULUĞUM', en: 'MY RESPONSIBILITIES' },
    responsibilities: {
      tr: [
        'Unity ve C# ile etkileşim, sahne ve oyun mekaniği bileşenlerinin geliştirilmesinde görev aldım.',
        'Kullanıcının yangına müdahale becerilerini risk içermeyen, gerçekçi bir sanal ortamda deneyimlemesini destekleyen bileşenler üzerinde çalıştım.',
        'Oyun motoru üzerinde simülasyon bileşenlerinin bir araya getirilmesine katkı sağladım.'
      ],
      en: [
        'Developed interactive mechanics, scene hierarchy, and gameplay logic using Unity and C#.',
        'Engineered features that enable users to master fire intervention skills in a safe, immersive VR training environment.',
        'Assembled and integrated multi-part simulation subsystems inside the game engine.'
      ]
    },
    technologiesTitle: { tr: 'KULLANILAN TEKNOLOJİLER & YETKİNLİKLER', en: 'TECHNOLOGIES & SKILLS' },
    technologies: [
      'Unity',
      'C#',
      'Sanal Gerçeklik (VR)',
      'Oyun Mekaniği',
      'Simülasyon Bileşenleri',
      'Sahne Yönetimi'
    ],
    image: asset('tubitak-vr.png')
  },
  personal: {
    id: 'personal',
    no: '04',
    tag: { tr: 'TINYML / GÖMÜLÜ', en: 'TINYML / EMBEDDED' },
    label: { tr: 'SESLİ KOMUT SİSTEMİ', en: 'VOICE RECOGNITION' },
    badge: { tr: 'Gömülü Yapay Zeka', en: 'Embedded AI' },
    title: { tr: 'ESP32 Tabanlı TinyML Sesli Komut Sistemi', en: 'ESP32-Based TinyML Voice Command System' },
    shortDesc: {
      tr: 'ESP32-S3 ve INMP441 I2S mikrofon ile Edge Impulse üzerinde eğitilmiş sesli komut sistemi.',
      en: 'Embedded voice command system using ESP32-S3, INMP441 I2S mic, and Edge Impulse TinyML.'
    },
    summary: {
      tr: 'ESP32-S3 ve INMP441 I2S mikrofon kullanarak sesli komutları gerçek zamanlı algılayan ve sınıflandıran gömülü bir yapay zeka sistemi geliştirdim.',
      en: 'Engineered an embedded intelligent voice processing system on ESP32-S3 with INMP441 I2S microphone for real-time acoustic command classification.'
    },
    responsibilitiesTitle: { tr: 'PROJEDE YAPILANLAR VE KAZANIMLAR', en: 'PROJECT HIGHLIGHTS & OUTCOMES' },
    responsibilities: {
      tr: [
        'ESP32-S3 ve INMP441 I2S mikrofon kullanarak sesli komutları algılayan gömülü bir sistem geliştirdim.',
        'Edge Impulse üzerinde TinyML modeli eğiterek "sesi kapat", "sesi yükselt", "sesi düşür" ve "sonraki müzik" gibi komutların sınıflandırılmasını sağladım.',
        'Gömülü yapay zeka, sensör verisi işleme, gerçek zamanlı karar verme ve donanım-yazılım entegrasyonu konularında deneyim kazandım.'
      ],
      en: [
        'Designed and implemented an embedded voice detection system combining ESP32-S3 with an INMP441 I2S microphone.',
        'Trained a TinyML neural network on Edge Impulse to classify speech keywords like "mute", "volume up", "volume down", and "next track".',
        'Acquired end-to-end expertise in embedded machine learning, acoustic signal processing, and low-latency hardware-software integration.'
      ]
    },
    technologiesTitle: { tr: 'KULLANILAN TEKNOLOJİLER & DONANIMLAR', en: 'TECHNOLOGIES & HARDWARE' },
    technologies: [
      'ESP32-S3',
      'TinyML & Edge Impulse',
      'INMP441 I2S Mikrofon',
      'Gömülü Yapay Zeka',
      'C++ / Arduino IDE',
      'Sensör Sinyal İşleme'
    ],
    image: null
  },
  squad: {
    id: 'squad',
    no: '05',
    tag: { tr: 'MASAÜSTÜ UYGULAMASI', en: 'DESKTOP APPLICATION' },
    label: { tr: 'GERÇEK ZAMANLI SES & MESAJLAŞMA', en: 'REAL-TIME VOICE & MESSAGING' },
    badge: { tr: 'Uçtan Uca Geliştirme', en: 'End-to-End Development' },
    title: { tr: 'Squad', en: 'Squad' },
    shortDesc: {
      tr: 'FPS oynayan küçük ekipler için davet kodlu özel odalar, mesajlaşma ve düşük gecikmeli sesli iletişim.',
      en: 'Invite-only rooms, messaging, and low-latency voice communication for small FPS gaming groups.'
    },
    summary: {
      tr: 'Squad, FPS oynayan küçük arkadaş gruplarının farklı uygulamalara ihtiyaç duymadan aynı özel odada yazışmasını ve düşük gecikmeli sesli iletişim kurmasını sağlıyor. Kullanıcılar davet koduyla oda oluşturabiliyor veya bir odaya katılabiliyor; mesajlaşabiliyor ve sekiz kişiye kadar sesli sohbette buluşabiliyor. Projeyi arayüzden backend ve veritabanına, gerçek zamanlı iletişimden güvenlik ve test süreçlerine kadar uçtan uca geliştirdim.',
      en: 'Squad lets small groups of FPS players message and communicate over low-latency voice in the same private room without switching between apps. Users can create or join rooms with an invite code, exchange messages, and meet in voice chat with up to eight participants. I developed the project end to end, covering the interface, backend, database, real-time communication, security, and testing.'
    },
    responsibilitiesTitle: { tr: 'GELİŞTİRDİĞİM BİLEŞENLER', en: 'WHAT I BUILT' },
    responsibilities: {
      tr: [
        'Electron, React, TypeScript ve Vite ile masaüstü arayüzünü; oda oluşturma, davet koduyla katılma, mesajlaşma ve katılımcı durumlarını geliştirdim.',
        'Node.js ve Fastify ile backend servislerini; PostgreSQL, Prisma ve alternatif bulut altyapısı olarak Supabase ile veri katmanını oluşturdum.',
        'WebSocket ile anlık mesajlaşma ve durum güncellemelerini, WebRTC/Opus ile sekiz kişiye kadar düşük gecikmeli sesli iletişimi ve Coturn ile TURN desteğini uyguladım.',
        'JWT, bcrypt ve güvenli oturum yönetimini kurdum; Vitest ve Playwright testleri ile Docker tabanlı geliştirme ve dağıtım altyapısını hazırladım.'
      ],
      en: [
        'Built the Electron desktop interface with React, TypeScript, and Vite, including room creation, invite-code joining, messaging, and participant presence.',
        'Developed backend services with Node.js and Fastify, plus a PostgreSQL and Prisma data layer with Supabase as an alternative cloud stack.',
        'Implemented real-time messaging and presence with WebSocket, low-latency voice for up to eight participants with WebRTC/Opus, and TURN support through Coturn.',
        'Added JWT, bcrypt, and secure session handling; prepared Vitest and Playwright coverage plus Docker-based development and deployment infrastructure.'
      ]
    },
    technologiesTitle: { tr: 'TEKNOLOJİLER & ALTYAPI', en: 'TECHNOLOGIES & INFRASTRUCTURE' },
    technologies: [
      'Electron', 'React', 'TypeScript', 'Vite', 'Node.js', 'Fastify',
      'WebSocket', 'WebRTC / Opus', 'PostgreSQL / Prisma', 'Supabase',
      'Coturn', 'JWT / bcrypt', 'Vitest / Playwright', 'Docker'
    ],
    image: asset('squad-room.webp'),
    imageAlt: {
      tr: 'Squad uygulamasında aktif bir CS2 odası, yazılı sohbet ve sesli sohbet katılımcıları',
      en: 'An active CS2 room in Squad with text chat and voice participants'
    },
    galleryImages: [
      {
        src: asset('squad-room.webp'),
        alt: { tr: 'Squad uygulamasında aktif CS2 odası', en: 'Active CS2 room in the Squad app' }
      },
      {
        src: asset('squad-home.webp'),
        alt: { tr: 'Squad uygulamasının oda oluşturma ve katılma ekranı', en: 'Create or join room screen in Squad' }
      },
      {
        src: asset('squad-login.webp'),
        alt: { tr: 'Squad uygulamasının giriş ekranı', en: 'Squad sign-in screen' }
      }
    ]
  },
  f1strategy: {
    id: 'f1strategy',
    no: '06',
    tag: { tr: '02/2026 — 03/2026', en: '02/2026 — 03/2026' },
    label: { tr: 'MAKİNE ÖĞRENMESİ & VERİ ANALİZİ', en: 'MACHINE LEARNING & DATA ANALYSIS' },
    badge: { tr: 'Karar Destek Sistemi', en: 'Decision Support System' },
    title: {
      tr: 'Formula 1 Pit Stop Stratejisi için Makine Öğrenmesi Tabanlı Karar Destek Sistemi',
      en: 'Machine Learning Decision Support System for Formula 1 Pit Stop Strategy'
    },
    cardTitle: { tr: 'F1 Pit Stop Strateji Sistemi', en: 'F1 Pit Stop Strategy System' },
    shortDesc: {
      tr: 'Yarış verilerinden undercut fırsatını ve en uygun pit stop turunu tahmin eden karar destek sistemi.',
      en: 'A decision support system that predicts undercut opportunities and the optimal pit-stop lap from race data.'
    },
    summary: {
      tr: '2022–2025 Formula 1 yarış verilerini FastF1 ile analiz ederek undercut stratejisinin başarı olasılığını ve farklı yarış senaryolarındaki en uygun pit stop turunu tahmin eden makine öğrenmesi tabanlı bir karar destek sistemi geliştirdim. Çalışmada lastik ömrü, araçlar arası zaman farkı ve lastik avantajı gibi yarış dinamiklerinden özellikler çıkardım.',
      en: 'I developed a machine-learning decision support system that analyzes 2022–2025 Formula 1 race data with FastF1 to estimate the success probability of an undercut and recommend the optimal pit-stop lap across different race scenarios. I engineered features from race dynamics such as tire age, time gaps between cars, and tire advantage.'
    },
    responsibilitiesTitle: { tr: 'PROJEDE YAPILANLAR', en: 'PROJECT HIGHLIGHTS' },
    responsibilities: {
      tr: [
        '2022–2025 yarış verilerini FastF1 kullanarak topladım, temizledim ve analiz ettim.',
        'Lastik ömrü, araçlar arası zaman farkı ve lastik avantajı gibi yarış değişkenlerinden model girdileri ürettim.',
        'Undercut stratejisinin başarı olasılığını tahmin etmek için Logistic Regression ve Random Forest modellerini karşılaştırdım.',
        'Random Forest modeliyle 0,759 ROC-AUC test performansı elde ederek farklı yarış senaryoları için en uygun pit stop turunu öneren karar mekanizmasını geliştirdim.'
      ],
      en: [
        'Collected, cleaned, and analyzed 2022–2025 race data with FastF1.',
        'Engineered model features from tire age, inter-car time gaps, tire advantage, and other race variables.',
        'Compared Logistic Regression and Random Forest models to estimate the probability of a successful undercut.',
        'Achieved a 0.759 test ROC-AUC with Random Forest and built a decision mechanism that recommends the optimal pit-stop lap for varying race scenarios.'
      ]
    },
    technologiesTitle: { tr: 'TEKNOLOJİLER & YÖNTEMLER', en: 'TECHNOLOGIES & METHODS' },
    technologies: [
      'Python', 'FastF1', 'Pandas', 'Scikit-learn', 'Random Forest',
      'Logistic Regression', 'Feature Engineering', 'ROC-AUC', 'Veri Analizi'
    ],
    image: asset('f1-pit-strategy.webp'),
    imageAlt: {
      tr: 'Pit yolundaki yarış aracı üzerinde lastik aşınması ve pit penceresi analizlerini gösteren veri görselleştirmesi',
      en: 'Data visualization of tire degradation and pit-window analysis over a race car entering the pit lane'
    }
  }
};

export const experiencesData = [
  {
    company: 'MilSOFT Yazılım Teknolojileri A.Ş.',
    role: { tr: 'Yazılım Geliştirme Stajyeri', en: 'Software Development Intern' },
    period: { tr: 'Temmuz 2026 — Ağustos 2026', en: 'July 2026 — August 2026' },
    location: { tr: 'Ankara, Türkiye', en: 'Ankara, Turkey' },
    summary: {
      tr: 'ASP.NET Core Web API, Angular ve PostgreSQL kullanarak full-stack görev yönetim sistemi geliştirdim.',
      en: 'Developed a full-stack task management system using ASP.NET Core Web API, Angular, and PostgreSQL.'
    },
    bullets: {
      tr: [
        'JWT kimlik doğrulama, RESTful API, görev ve kategori CRUD işlemleri, filtreleme, sayfalama, yorum ve dosya eki özelliklerini uyguladım.',
        'Entity Framework Core, DTO, AutoMapper, Fluent API, exception middleware ve Swagger kullanarak katmanlı backend mimarisi oluşturdum.',
        'API endpointleri, frontend-backend veri akışı ve PostgreSQL işlemleri üzerinde entegrasyon testleri gerçekleştirdim; uygulamayı deployment sürecine hazırladım.'
      ],
      en: [
        'Implemented JWT authentication, RESTful APIs, task and category CRUD operations, filtering, pagination, comments, and file attachments.',
        'Architected a layered backend using Entity Framework Core, DTOs, AutoMapper, Fluent API, exception middleware, and Swagger.',
        'Conducted integration tests across API endpoints, frontend-backend data flow, and PostgreSQL queries; prepared the application for deployment.'
      ]
    },
    tags: [
      'ASP.NET Core Web API',
      'Angular',
      'PostgreSQL',
      'Entity Framework Core',
      'JWT',
      'RESTful API',
      'AutoMapper',
      'Swagger'
    ]
  }
];

export const contactInfo = {
  name: 'Semih ERTAN',
  role: { tr: 'Bilgisayar Mühendisliği Öğrencisi', en: 'Computer Engineering Senior Student' },
  university: { tr: 'İzmir Bakırçay Üniversitesi', en: 'Izmir Bakircay University' },
  grade: { tr: '4. Sınıf (GNO: 3,65 / 4,00)', en: 'Senior (GPA: 3.65 / 4.00)' },
  email: 'semihertanceng@outlook.com',
  phone: '+90 541 678 6764',
  phoneClean: '+905416786764',
  location: { tr: 'İzmir, Türkiye', en: 'İzmir, Turkey' },
  locationDetail: { tr: 'Yüz Yüze & Hibrit / Uzaktan (Remote)', en: 'On-site & Hybrid / Remote' },
  github: 'https://github.com/semihertan',
  linkedin: 'https://www.linkedin.com/in/semih-ertan-180940294/',
  cvUrl: asset('Semih_Ertan_CV.pdf')
};

export const scene = `<div class="scene" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="planet"></div><div class="trajectory"></div><span class="coordinate">40° N / EXPLORATION</span><span class="scene-label">IDEA → DESIGN → BUILD</span><div class="cross">+</div></div>`;
