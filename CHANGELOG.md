# CHANGELOG

## create-mufferplate@1.86.0

- feat: Yeni `hover` sınıfları eklendi. Artık Tailwind benzeri mantıkta `hover` kullanılabilir. Örneğin `mt-10 hover:mt-20` şeklindeki kullanımda hover çalışması durumunda `margin-top` değeri 40px'den 80px'e yükselecek. Aynı mantık responsive yapıda da kullanılabilir.
- feat: Margin ve padding için left ve right bağımlılığını gidermek için `start` ve `end` sınıfları eklendi. Artık `ms-*` ile RTL durumlarında `margin-inline-start` değeri, `me-*` ile de `margin-inline-end` değeri kontrol edilebilir. Aynı mantık padding için de kullanılmakta. RTL içinde `left` ve `right değerleri yine aynı şekilde kullanılabilir.`
- feat: `sizing` sınıfı eklendi. Genişlik ve yüksekliğin aynı olduğu durumlarda ayrı ayrı `w-*` ve `h-*` tanımlaması yerine direkt olarak `sizing-*` kullanılabilir.

## create-mufferplate@1.85.0

- feat: Inline CSS veya dosyadan çağırma işlemlerini daha rahat kontrol edebilmek için `$inline_css` değişkeni eklendi. Bu değişkenin durumuna bağlı olarak CSS dosyası direkt olarak style etiketi içine yazılacak veya dosya olarak çağrılacak.

## create-mufferplate@1.84.1

- fix: `leading-relaxed` seçicisindeki yazım hatası (`leading-relaxes`) giderildi.