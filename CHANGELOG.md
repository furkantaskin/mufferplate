# CHANGELOG

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