# CHANGELOG

Projeye dair tüm güncellemeler burada bulunmaktadır. [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) baz alınarak hazırlanmıştır.

## 2023.01.13

### Yeni Eklenenler

- Apache için (.htaccess) browser caching konfigürasyonu eklendi.

### Değişenler

- Aspect ratio hesaplamasında paddingden kaynaklı element kaymasını engellemek için wrapper eklendi. Normalde aspect ratio çalışmıyorsa sistem oranı koruyacak şekilde padding top vermekte. Ancak içerideki elementin de absolute olması gerekiyor. Önceki durumlarda absolute olayı olmadığı için muhtemelen görünümlerde sorun olacak. İleride bunun yaşanmaması için `ar-child` classına sahip element için eklemeler yapıldı. `ar-child` elementi direkt olarak absolute halinde `aspect-ratio` alan elementin içinde 100% olacak şekilde yerleşmekte.

## [2.0.0]

### Değişenler

- Lightgallery kaldırıldı
- Lightgallery yerine Photoswipe geldi
