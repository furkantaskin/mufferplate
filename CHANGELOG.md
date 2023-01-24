# CHANGELOG

Projeye dair tüm güncellemeler burada bulunmaktadır. [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) baz alınarak hazırlanmıştır.

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
