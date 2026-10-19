# Semih Ertan — Portfolyo geliştirme planı

## Referans incelemesi
Kaynak: https://mfaikduman.com/?lang=tr

Ana Sayfa, Hakkımda ve Projeler ayrı görünümler. Koyu tema, altın vurgu, büyük serif başlık ve görsel ağırlıklı giriş kullanılıyor. Hakkımda bölümünde teknolojiler ve deneyim/eğitim yer alıyor. Projeler kategori filtreleri ve gezinilebilir galeri içeriyor. TR/EN dil seçimi ve sosyal bağlantılar mevcut.

Kendi tasarımımızda bu görsel yaklaşım temel alınacak; referans kişinin metinleri, logosu ve proje görselleri kopyalanmayacak.

## Aşamalar
1. **Başlangıç:** Vite kurulumu, responsive tasarım, Ana Sayfa/Hakkımda/Projeler görünümü, TR/EN, temel filtreleme. İlk yerel taslak.
2. **Kişiselleştirme:** Biyografi, eğitim/deneyim, yetenekler, sosyal bağlantılar ve tercihe göre CV. Ana görselin seçimi.
3. **Projeler:** Roket yarışması, TÜBİTAK ve kişisel projelerin isimleri, tarihleri, kişinin rolü, kullanılan teknolojiler, doğrulanmış sonuçlar, görseller ve bağlantılar. Gerçek içerikle detay sayfaları/galeri.
4. **Son düzenlemeler:** Mobil/masaüstü kontrolleri, klavye erişimi, görsel optimizasyon, metadata ve paylaşım görseli.
5. **Yayın:** İçerik tamamlandıktan sonra hosting ve alan adı bağlantısı.

## Doğrulanan kişisel bilgiler
- Ad: Semih ERTAN
- Unvan: Bilgisayar Mühendisi
- Çalışmalar: Roket Yarışması, TÜBİTAK projesi, kişisel projeler

Bu bilgiler dışında deneyim, başarı, kurum, teknoloji veya bağlantı varsayılmadı. Proje kartları açıkça içerik hazırlama aşamasında gösteriliyor.

## Teknik karar
Vite + modüler JavaScript + CSS. Bu kapsam için sunucu/veritabanı gerekmiyor. Görseller ilk aşamada CSS ile özgün üretildi. Yazı tipleri Google Fonts üzerinden geliyor, çevrimdışı durumda sistem yazı tiplerine düşüyor. Site yerel olarak adım adım geliştirilecek.

## Çalıştırma
```sh
npm install
npm run dev
npm run build
npm run preview
```

İçerikler: `src/main.js`. Tasarım: `src/style.css`. Çıktı: `dist/`.

## Scrollytelling güncellemesi
- Beş kalıcı bölüm: Home, About, Projects, Experience, Contact. Mevcut renkler, tipografi ve proje kartları korunur.
- İçerik sözlüğü `src/content.js`, sayfa bileşimi `src/main.js`, scroll kontrolü `src/scroll-story.js`, hareket matematiği `src/story-math.js`, ek yerleşim `src/story.css`.
- Bölümler en az `100svh`; küçük ekranda içerik uzunsa yüksekliği doğal olarak büyür.
- Masaüstü wheel/trackpad delta değerleri zamana bağlı sönümleme ile işlenir. Mobil dokunma ve momentum tarayıcıya bırakılır.
- Kaydırma durduktan 240 ms sonra en yakın bölüme 560–1250 ms yumuşak hizalama uygulanır. Yeni girdi animasyonu keser. Uzun bölümün okunabilir iç alanında snap yapılmaz; klavye gezinmesinde otomatik snap devre dışıdır.
- Her komşu bölüm çifti için gerçek başlangıç konumlarından 0–1 progress hesaplanır. `--section-progress` üzerinden de okunabilir.
- Sabit arka planın rotasyonu: 0, 8, -6, 10, 0 derece. Konum ve ölçek aynı progress ile smoothstep interpolasyonu kullanır. Başlıklar 60 px, alt içerikler 30 px giriş hareketi uygular.
- Reduced motion tercihinde wheel yumuşatma, snap ve içerik/arka plan hareketleri kapatılır. Tüm içerik görünür kalır.
- Proje filtresi sayfayı yeniden oluşturmaz. Dil değişiminde eski scroll dinleyicileri temizlenir. Modal açıkken arka plan kaydırması kilitlenir.
- `npm test`: geçiş progress'i, sınır sürekliliği, snap yönü ve uzun mobil bölüm koruması için testler.
- `npm run build`: üretim derlemesi. Gerçek cihazlarda 60 FPS ölçümü yapılmadı.

## 3D uzay sahnesi
- Mimari: Mevcut DOM ve scroll denetleyicisi korunur. `space-scene.js` ihtiyaç anında ayrı paket olarak yüklenen tek Three.js canvas'ını yönetir. React, GSAP veya Lenis eklenmedi.
- `space-poses.js`: Beş bölüm için gezegen dönüşü/konumu/ölçeği, kamera konumu/hedefi, ışık yoğunluğu, nebula opaklığı ve parçacık sürüklenmesi. Her kanal mevcut section progress üzerinden sürekli interpolate edilir.
- Görsel: Shader ile prosedürel gezegen yüzeyi, atmosfer halkası, yıldızlar, nebula ve altın renkli seyrek toz. Harici model/görsel indirmesi, gölge haritası veya post-processing yok.
- Kontrast: Canvas üzerinde soldan koyulaşan gradient ve vignette. Header saydam kalır.
- Kalite: Masaüstü DPR en fazla 1.5 ve 900 yıldız; mobil DPR en fazla 1 ve 320 yıldız. 65/24 toz parçacığı. Sürekli yavaş kareler algılanırsa düşük kaliteye geçilir.
- Yaşam döngüsü: Görünmeyen sekmede render durur; dil değişiminde kaynaklar ve dinleyiciler temizlenir. WebGL yoksa/esnasında context kaybolursa önceki CSS gezegeni görünür. Context dönerse canvas tekrar çalışır.
- Reduced motion: Sabit Home pozu; idle dönüş ve mouse parallax kapalı. Mobilde mouse parallax kapalı ve kamera hareketleri azaltılmıştır.
- Doğrulama: `npm test` 3D kanalların bölüm sınırlarında sürekliliğini ve kamera/ölçek aralıklarını da test eder.

## Proje galerisi
Referans projeler sayfasındaki merkez kart / yan kart düzeni uygulandı. project-gallery.js ve project-gallery.css; kategori filtreleri, döngüsel oklar, klavye okları, yatay dokunma hareketi, sayaç ve bölüm içi detay görünümünü yönetir. Görseller CSS çizimleridir; gerçek proje görselleri ve detayları bekleniyor. Tarayıcıda sonraki kart, tek sonuçlu filtre, detay açma ve geri dönüş doğrulandı.

## Kriptoloji bitirme projesi
- Projeler galerisine dördüncü kart eklendi. Kartta kısa başlık, detayda kullanıcının verdiği tam proje adı gösterilir; durum "Devam ediyor"dur.
- Metin ekip çalışması olarak yazıldı. ns-3/C++ simülasyonu, epoch, REKEY, heartbeat, RESYNC, kayıp ve yeniden katılım testleri, Python/CSV analizi anlatılır. Gerçek kriptografik anahtar üretimi ile kuantum sonrası algoritmaların henüz uygulanmadığı açıkça belirtilir.
- İki kavramsal görsel imagegen becerisinin yerleşik aracıyla üretildi; `public/assets/uav-swarm-key-renewal.webp` ve `public/assets/cryptology-capstone.webp` içine optimize edilerek kaydedildi. Görseller gerçek proje ekranı veya sonuç göstermez.
