# CHANGELOG

Projeye dair tüm güncellemeler burada bulunmaktadır. [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) baz alınarak hazırlanmıştır.

## 2023.03.07

### Eklenenler

- CSS optimizasyon işlemi için PostCSS eklendi. Artık nihai işlemi (cssnano, autoprefixer ve PurgeCSS) PostCSS dosyası yapmakta.

### Değişenler

- Gulp iptal edildi. PurgeCSS için dosya adlarına göre işlem yapma aşaması sorun yaşattığı için gulpfile kaldırıldı.

## 2023.03.04

### Yeni Eklenenler

- Selectbox içindeki varsayılan oku gizlemek için opsiyon eklendi. Okun gizlenmesinin istendiği selectbox içine `@include call_template("noarrow")` şeklinde mixinin çağrılması yeterli olacaktır.
- SVG'lerin dosya yerine içerik olarak çağrılabilmesi için sprite eklendi. Artık `<use>` elemeneti ile tek bir dosyadan çağırma işlemi yapılabilir.

## 2023.02.28

### Değişenler

- esbuild konfigürasyonu güncellendi. Artık esbuild çalıştırma işlemi için File Watcher operasyonuna gerek kalmadı. Kullanıcılar `npm run esbuild` komutu ile esbuild'i aktive edebilir ve js dosyalarındaki değişimi takip edebilirler.
- Paket yapısı commonJS'ten module yapısına güncellendi.
- Sass içinden File Watcher operasyonu kaldırıldı. Yerine npm script eklendi. Artık `npm run sass`ile otomatik derleme işlemi yapılabilmekte.
- Componentlerin ayrı ayrı çağrılabilmesi için \_components partial dosyası kaldırıldı.

## 2023.02.27

### Yeni Eklenenler

- Mobil menü ve mobil header alanı eklendi.

### Değişenler

- `mergeFiles` fonksiyonu kaldırıldı. Artık dosyaların bir array içinde gönderilmesi yeterli.
- Bootstrap için değişken tanımlamaları `_variables.scss` dosyasından `_bootstrap.scss` dosyasına taşındı. Bootstrap'ın container veya diğer alanlarına müdahale gerektiği durumlarda kontrolü en iyi şekilde sağlamak için değişkenler `_bootstrap.scss` dosyasına aktarıldı.
- SCSS ve JS dosya isimleri, PurgeCSS operasyonunda kolaylık sağlaması için referans PHP dosyası ile aynı olacak şekilde güncellendi
- Değişken isimleri PHP standartlarına uygun olacak şekilde güncellendi.

### Düzeltmeler

- Sunucunun dosyaları ana dizinde araması yerine theme klasöründe araması için dosya çağırma işlemlerinde `domain` sabiti eklendi
- Header içinde CSS dosyası çağrılırken dosyayı yanlış dizinde arama hatası giderildi.
- Bootstrap için yanlış dizinde arama sorunu giderildi.

## 2023.01.31

### Yeni Eklenenler

- .htaccess içine theme klasörüne yönlendirme için kurallar eklendi (artık görseller, css ve js dosyaları theme/assets klasöründe aranıyor)
- Hata raporlama varsayılan olarak açık hale getirildi
- Swiper içindeki CSS dosyaları için kullanılan scss dosyalarına modül importu eklendi. Artık home.scss içinde Swiper'ın temel stilleri çağrılmakta (dosyaları node_modules içinde aramakta)
- Lighthouse içindeki explicit width height sorununu gidermek için PHP fonksiyonu hazırlandı. Bu fonksiyon ile görsellere ilk anda otomatik olarak width ve height attirbuteleri tanımlanmakta

### Değişenler

- Component stylesheet dosyası artık namespace olmadan aktarılabilir hale getirildi
- Grid sayısı 36'dan 30'a düşürüldü.

### Düzeltmeler

- Aspect-ratio hesaplamasında konumlamadaki hata giderildi. `aspect-ratio` verilen elementin içindeki `ar-child` elementi absolute almasına rağmen ana elementte relative olmadığı için düzende kaymaların yaşanması önlendi
- Header ve footer için SCSS dosyalarında main dosyasının importu esnasında yaşanan namespace hatası giderildi. Artık değişkenler ve mixinler `m.$degisken_adi` veya `@include m.mixin_adi()` şeklinde çağrılabilir

## 2023.01.24

### Yeni Eklenenler

- esbuild yeni bundler olarak eklendi

### Değişenler

- Lisans türü ISC yerine MIT olarak güncellendi
- Paket private hale getirildi
- Ana yapı güncellendi
  - Sitenin son hali theme klasörü içinde toplandı
  - Derlenen CSS ve JS için theme klasörüne klasörler eklendi
  - Footer, index ve header PHP dosyaları theme klasörüne eklendi
  - Ana dizinden theme klasörüne index.php için aktarım yapıldı
  - Ana dizindeki assets klasörü kaldırıldı
  - Görseller ve fontlar theme klasörüne aktarıldı

### Düzeltmeler

- Sass içinde `call_template` mixin'i argümansız çağrılınca yaşanan hata giderildi. Argümansız çağrılan `call_template` mixin'i varsayılan olarak 0.3 saniyelik transition özelliğini çağıracak
- Sass içinde tanımsız olan `$green` değişkeninden kaynaklı olarak yaşanan derleme hatası giderildi. `$green` için varsayılan yeşil rengi atandı.

## 2023.01.13

### Yeni Eklenenler

- Apache için (.htaccess) browser caching konfigürasyonu eklendi.

### Değişenler

- Favicon tanımlamaları tüm cihazlar için tek tek uygulama ikonu olarak tanımlanmak yerine tek bir ikon olarak güncellendi.
- Erişilebilirlik için 5x büyütülecek şekilde güncellendi
- Aspect ratio hesaplamasında paddingden kaynaklı element kaymasını engellemek için wrapper eklendi. Normalde aspect ratio çalışmıyorsa sistem oranı koruyacak şekilde padding top vermekte. Ancak içerideki elementin de absolute olması gerekiyor. Önceki durumlarda absolute olayı olmadığı için muhtemelen görünümlerde sorun olacak. İleride bunun yaşanmaması için `ar-child` classına sahip element için eklemeler yapıldı. `ar-child` elementi direkt olarak absolute halinde `aspect-ratio` alan elementin içinde 100% olacak şekilde yerleşmekte.

## [2.0.0]

### Değişenler

- Lightgallery kaldırıldı
- Lightgallery yerine Photoswipe geldi
