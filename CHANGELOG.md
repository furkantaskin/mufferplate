# CHANGELOG

Muffilities = Custom Utilities

## mufferplate@1.8.0

- fix: Purge işleminde `defaultExtractor` için gelen fonksiyonun içerik hatası giderildi. Artık fonksiyonun adı yerine fonksiyonun kendisi gelmekte.
- feat: PurgeCSS için `purgeignore` sınıfı eklendi. Bu sayede `purgeignore` sınıfına sahip elementler ve bunun altında bulunan tüm elementler temizleme işleminde korunacak.

## mufferplate@1.7.3

- fix: Purge işlemi için eksik olan `defaultExtractor` seçeneği eklendi

## mufferplate@1.7.2

- fix: Purge işleminde svg elementleri silme sorunu giderildi

## create-mufferplate@2.10.2

- fix: Margin için eksik olan auto seçicileri eklendi (`ml-auto mx-auto` etc)

## mufferplate@1.7.1

- fix: JavaScript konfigürasyonunun konsolda görünmesi sorunu giderildi.

## mufferplate@1.7.0

- feat: JavaScript içinde dev mode kullanımnda meta görüntüleme özelliği getirildi.

## mufferplate@1.6.3

- fix: JS için konfigürasyonları okumama sorunu giderildi.

## mufferplate@1.6.2

- fix: JS için build modunda özel konfigürasyon input ve output dosyalarını gözardı edip varsayılan konfigürasyondaki dosyalara göre işlem yapması sorunu giderildi.

## mufferplate@1.6.1

- fix: Sass için dev ve build modunda özel konfigürasyondaki input ve ouput dosyalarını gözardı edip varsayılan konfigürasyondaki dosyalara göre işlem yapması sorunu giderildi. Artık özel konfigürasyondaki yolları öncelikli olarak baz alacak.

## mufferplate@1.6.0

- feat: Yeni `init` komutu eklendi. `mufferplate init` komutu ile ana dizinde temel konfigürasyon dosyası oluşturularak projenin yönlendirilmesi kolaylaştırıldı.

## create-mufferplate@2.8.0

- refactor: Bootstrap, Swiper ve Photoswipe için SCSS tanımlamaları yeni Sass package importer ile uyumlu olacak şekilde güncellendi.

## create-mufferplate@2.6.0

- fix: Single Bootstrap template içindeki hatalı deps sorunu giderildi.
- build(deps): mufferplate sürümü 1.5.0'a güncellendi

## mufferplate@1.5.0

- feat: Sass için pkg import özelliği eklendi. Artık Bootstrap gibi aktif kullanılan kütüphane ve frameworkler için node_modules içine relative import yerine `pkg:library` kullanılabilir.

## create-mufferplate@2.5.0

- build(deps): mufferplate sürümü 1.4.0'a güncellendi

## mufferplate@1.4.0

- build(deps): Dependency güncellemesi

## create-mufferplate@2.0.0

### BREAKING CHANGE
- feat: Mufferplate yeniden yapılandırıldı.
    - Artık mufferplate içinde Tailwind, Sass ve JS birlikte çalışmakta
    - Tailwind ile Sass kullanımı artık beraber sorunsuz bir şekilde yapılabilmekte
    - Tüm işlemler için tek bir global konfigürasyon dosyası kullanılabilir
    - Mufferplate için konfigürasyon dosyası artık CLI üzerinden gönderilebilir
    - Dev ve build modları ayrı ayrı çalıştırılabilmekte
    - Artık Mufferplate için özel bir CLI komutu bulunmakta

## create-mufferplate@1.103.0

- feat: Yeni paket eklendi: muffmass... Yeni paket sayesinde sass derlemesi cli üzerinden yapmak yerine artık daha yüksek performans sağlayan `sass-embedded` alt yapısını kullanmakta. Bu sayede Muffilities için gereken hız bir nebze de olsa artırıldı.
- feat: Yeni klasör eklendi. Artık ana dizindeki kalabalığı azaltmak için PostCSS, Mufferplate ve Muffmass için ana dizindeki mf_config klasörü baz alınabilecek.
- refactor: Margin, padding ve gap oluşturmak için ayrı ayrı mixin'ler yerine artık tek bir map üzerinden kontrol etme imkanı sağlayan yeni bir mixin hazırlandı. Bu sayede yeni margin ve padding yönleri gibi durumlar bir noktadan kontrol edilebilecek.
- feat: Muffilities için basamak yapısı eklendi. Artık bu kısımda kullanıcılar 0'dan 100'e kadar olan kısımların kaçar adım gideceğini `$spacing-steps` içinden ayarlayabilecek.

## mufferplate@0.21.0

- feat: Klasör yapısı güncellendi. Artık kullanıcılar dilerse ana dizine mf_config klasörü açarak konfigürasyon dosyasını burada da tutabilir.

## muffmass@0.2.0

- feat: Yeni pakete merhaba



## create-mufferplate@1.102.1
- refactor: Base içindeki gereksiz renk değişkeni oluşturma işlemi kaldırıldı.

## create-mufferplate@1.102.0

- feat: Renklerin çalışma mantığı güncellendi
    - Renklerde artık sınıflar CSS değişkeni yerine tanımlı rengin rgba değerini çağırmakta.
    - Renklerde opacity özelliği eklendi. Şu an için opacity değeri beşin katlarına göre ilerlemekte. (Örn: `text-black/50` değeri `rgba(0,0,0, .5)` olarak çıktı verecek). Tam opaklık için yüzdelik ifade olmadan kullanımı yeterli (Örn: `text-black`).
    - Artık renk değişkenleri `base/_variables.scss` yerine `custom_utilities/_variables.scss` içinde tanımlanmakta.
- refactor: base klasörü içindeki gereksiz fonksiyon ve değişkenler kaldırıldı.
- refactor: Muffilities içindeki gereksiz mixin'ler kaldırıldı.

## create-mufferplate@1.101.0

- feat: Muffilities için yeni seçiciler eklendi.
    - `dvh`, `svh`, ve `lvh` sınıfları `{min- | max- | }-h-{dvh | lvh | svg}` şeklinde kullanılabilir. [Tailwind 3.4](https://tailwindcss.com/blog/tailwindcss-v3-4#dynamic-viewport-units) güncellemesi baz alındı.
    - `sticky` ve `static` seçicileri eklendi.
    - Mobildeki mavi parlama efekti kaldırması için `-webkit-tap-highlight-color: transparent;` eklendi.
- fix: Border kalınlığı verilmesi durumunda tüm kutuya border verilmesi sorunu giderildi.

## create-mufferplate@1.100.0

- fix: `.row` tanımlamasında yaşanan hata giderildi.
- feat: Paketler içindeki `.gitattributes` ve `robots.txt` dosyaları kaldırıldı.

## create-mufferplate@1.99.0

- feat: Muffilities içindeki grid sütunlarında Bootstrap benzeri padding değerleri atandı.

## create-mufferplate@1.98.0 

### SCSS Tailwind

- fix: SCSS Tailwind içindeki container seçme sorunu giderildi. Önceden `md` noktası için sadece `container` ve `container-sm` sınıfları kapsanırken artık Bootstrap'taki gibi `container, container-sm, container-md` sınıfları kapsanmakta.
- fix: Bootstrap sütunlarındaki padding ve width sorunu giderildi. Artık Bootstrap'taki gibi genişlik değeri almayan sütunlar 100% olarak `.row` içini kapsayacak.
- fix: Container içinde padding olmaması ya da olması durumuna göre padding hatası yaşanması durumu giderildi. 
- feat: `.col-0` sınıfı eklendi. Dilenirse sütun genişliği artık 0% olarak ayarlanabilir.
- feat: Spacing için özel fonksiyon eklendi. Artık Tailwind içinde spacing olayına bağlı olarak oluşturulan sınıflar 100'e kadar gidebilir (`m-100` veya `h-100` gibi).
- feat: Varsayılan transition süresi 300ms ve transition fonksiyonu ise ease olarak güncellendi.
- feat: `--gutter-width` ve `--column-width` değişkenleri eklendi. Bu değişkenler `_base.scss` içinden güncellenebilir.
- feat: Mobil header ve mobil menü için Tailwind sınıfları tanımlandı.
- refactor: Kullanılmayan `--gutter-total` CSS değişkeni kaldırıldı.

### Muffilities

- fix: PostCSS işleminde GLightbox için media query seçicilerinin silinmesine sebep olan işlem sıralama hatası giderildi. Artık purge işleminden sonra media query seçicileri sıralanmakta.

## create-mufferplate@1.96.0

- feat: CSS işlemleri için scriptler düzenlendi. PNPM için PostCSS ve Sass'ın beraber kullanılması gereken veya kullanılmaması gereken durumlar için scriptler ayrıldı. 

## create-mufferplate@1.95.1

- style: Tailwind ayrımını netleştirmek için Tailwind opsiyonlarının rengi güncellendi.

## create-mufferplate@1.95.0

- style: SCSS Tailwind için sprite dosyasına data attribute temizlemede kullanılan regex kodları eklendi

## create-mufferplate@1.94.0

- feat: SCSS Tailwind için inline CSS özelliği eklendi.
- feat: Google fontları kaldırıldı. Kullanıcı dilerse inline olarak ekleyebilir.
- chore: Viewport meta için maximum-scale değeri ve minimum-scale değerleri kaldırıldı.

## create-mufferplate@1.93.0

- style: `row` ve `col-*` sınıfları için padding ve margin değerleri RTL ile uyumlu olacak şekilde güncellendi. `row` için margin `0 -12px` yerine RTL olmaddan `margin-left: -12px; margin-right:-12px`, RTL varsa `margin-inline-start: -12px; margin-inline-end:-12px` olarak gelmekte. Aynı durum `col-*` sınıfları için de geçerli 

## create-mufferplate@1.92.0

- feat: Container için CSS değişkenleri eklendi. Örnek olarak `--container-margin` değeri o ekrandaki container değerine göre sağ ve sol boşlukları alacak.

## crate-mufferplate@1.91.0

- feat: Tailwind için rem değerinden px değerine çevirici eklendi. `postcss.config.js` içindeki `'@thedutchcoder/postcss-rem-to-px': {},` satırı bu işlemi yapmaktadır.

## create-mufferplate@1.90.0

- deps: Tailwind SCSS için bağımlı paketler son sürüme güncellendi.

## create-mufferplate@1.89.0

- feat: Artık Tailwind SCSS ile birlikte kullanılabilir. Bu kısımda SCSS kullanan kütüphaneler için SCSS üzerinden bundle alınarak Tailwind içinde oluşturulan CSS içine eklenebilir. Ayrıca Bootstrap içindeki Modal, Tab gibi elementler de kullanılabilir. Bootstrap içindeki container ve col yapısı da mevcuttur. Bu kısımda `col-lg-6` gibi kullanım yerine `bg-lg:col-6` şeklinde kullanım gerekmektedir.

## create-mufferplate@1.87.0

- feat: Yüzdelik hesaplamalardaki ondalık kısmın daha hassas olması için ondalık miktarı artırıldı. Artık ondalık ifade 3 yerine 5 hane içermekte.

## create-mufferplate@1.86.0

- feat: Yeni `hover` sınıfları eklendi. Artık Tailwind benzeri mantıkta `hover` kullanılabilir. Örneğin `mt-10 hover:mt-20` şeklindeki kullanımda hover çalışması durumunda `margin-top` değeri 40px'den 80px'e yükselecek. Aynı mantık responsive yapıda da kullanılabilir.
- feat: Margin ve padding için left ve right bağımlılığını gidermek için `start` ve `end` sınıfları eklendi. Artık `ms-*` ile RTL durumlarında `margin-inline-start` değeri, `me-*` ile de `margin-inline-end` değeri kontrol edilebilir. Aynı mantık padding için de kullanılmakta. RTL içinde `left` ve `right` değerleri yine aynı şekilde kullanılabilir.`
- feat: `sizing` sınıfı eklendi. Genişlik ve yüksekliğin aynı olduğu durumlarda ayrı ayrı `w-*` ve `h-*` tanımlaması yerine direkt olarak `sizing-*` kullanılabilir.

## create-mufferplate@1.85.0

- feat: Inline CSS veya dosyadan çağırma işlemlerini daha rahat kontrol edebilmek için `$inline_css` değişkeni eklendi. Bu değişkenin durumuna bağlı olarak CSS dosyası direkt olarak style etiketi içine yazılacak veya dosya olarak çağrılacak.

## create-mufferplate@1.84.1

- fix: `leading-relaxed` seçicisindeki yazım hatası (`leading-relaxes`) giderildi.