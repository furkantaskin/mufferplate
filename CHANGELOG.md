# CHANGELOG

Projeye dair tüm güncellemeler burada bulunmaktadır. [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) baz alınarak hazırlanmıştır.

## 2023.08.17

### Eklenenler

- **Yeni npm komutu!** Artık git reposu clone edilmek yerine npm kullanılarak proje çağrılabilir. Bu kısımda tek çıktılı veya çok çıktılı olma durumlarına göre kullanıcıya seçenekler sunulacaktır. Bootstrap için tek ve çok sayfalı çıktılar sunulurken Tailwind şu an için sadece tek sayfalı çıktıda çalışmakta. Tailwind'in de hazırlanması için çalışmalar devam ediyor. `npx create-mufferplate@latest` komutu ile istenilen yapı seçilebilir.

- Bootstrap'ın kendi yapısındaki breakpointlere göre responsive hazırlanması için `bs_responsive()` şeklinde yeni mixin eklendi. 
- Mobildeki hover sorununu çözmek için `no_hover()` mixin'i eklendi. Bu mixin içine hover durumundaki özellikler yazılırsa mobilde gösterilmeyecek.

### Değişenler
- `call_template()` mixin'indeki transition işlemi artık yeni mixin içinde yapılıyor. `get_transition()` ile Ttransition işlemlerinde `$dur` ve `$prop` parametreleri ile hangi efektin hangi sürede uygulanacağı gösterilebilir. İleri dönemde çoklu prop için çalışmalar ypaılacak.



## 2023.08.01

### Değişenler

- Tüm paketler güncel sürüme yükseltildi (e234de9)
- Swiper kullanımı v10'a göre güncellendi. Artık modüller ek bir import ile gelmekte.

## 2023.07.23

### Değişenler

- JS için kaynak dosyaların yolu güncellendi. Artık src klasörü içinde direkt olarak bulunmak yerine src/js içinde tutulacaklar.

## 2023.07.222

### Değişenler

- Browserslist konfigürasyon dosyası iptal edildi. Desteklenen tarayıcıların listesi package.json içine taşındı
- Eski NPM kalabalığının iptal edilmesi için package-lock.json kaldırıldı.

## 2023.06.24

### Eklenenler

- Site kurulumları sırasında avantaj sağlaması için robots.txt dosyası eklendi.

## 2023.06.21

### Değişenler

- Artık sprite fonksiyonu ve domain tanımlaması header içinde değil, components klasöründen ayrı ayrı yapılmakta. Böylece birden fazla header bulunan projelerde her header için düzenleme yapmaya gerek kalmamakta.

## 2023.06.16

### Eklenenler

- Blaze Slider eklendi. Bazı temel slide işlemleri için Swiper kullanmak kaynak dosyalarda yüke sebep oluyordu. Temel işlemlerde daha yüksek hız için artık Blaze kullanılabilir.
- Otomatik SVG çağırma fonksiyonu için class argümanı eklendi. Bu  sayede çağırılan svg elemente isteğe göre class eklenebilecek.

### Değişenler

- Konfigürasyon dosyasının adı güncellendi. Konfigürasyon dosyası sadece esbuild için değil, projenin birçok kaynak işlemini içerdiği için proje adına uygun şekilde güncellendi.

## 2023.05.12

### Değişenler

- Otomatik olarak anchor elementlere title ekleyen fonksiyon kaldırıldı. İçerik kısmında sorun yaşandığı için elle title atanmasına karar verildi.

## 2023.05.06

### Değişenler

- Sprite içindeki SVG'yi çağırmak için gereken `getViewBox` fonksiyonunun ismi `getSprite` olarak güncellendi.
## 2023.05.05

### Değişenler

- JS dosyası için opsiyonel alan eklendi. Normalde `$call_file` değişkenine atanmış olan değer hem CSS hem de JS için geliyordu ancak bazı sayfaların aynı JS dosyasını kullandığı yerler oluyordu. Boşuna yeni JS dosyaları oluşturmak yerine tek bir JS çağrılabilmesi için bu değişken `$call_css` ve `$call_js` olarak eski haline güncellendi. Eğer `$call_js` içine dosya adı gönderilirse sistem bunu çağıracak, eğer bu değişken boşsa `$call_css` içindeki dosyası JS olarak arayacak.
- `ul` elementi için varsayılan paddin ve margin kaldırıldı.
- `mask_parameters` mixin'i için tüm değerler keyword parameter olacak şekilde güncellendi.

## 2023.04.27

### Eklenenler
- Sprite içinden SVG çağırırken yaşanan karmaşıklık giderildi. Artık sisteme basit bir fonksiyon gönderilerek svg elementi html içinde viewBox değeri ile birlikte otomatik olarak oluşturulabilir. Sistem, argüman olarak gönderilen id değerini sprite içindeki symbol elementlerde arayacak ve bulması durumunda viewbox değeri ile birlikte otomatik olarak svg ile use elementi döndürülecektir. Bunun için tek satırlık bir kod yeterlidir. 

```php 
<?=getViewBox("angle_left")?>
```

### Değişenler
- Projenin adresi çekilirken projenin adını manuel olarak boilerplate yerine proje adı olarak değiştirmek yerine projenin kurulu olduğu dizine yönlenecek şekilde güncellendi. Artık header içinde domain kısmının elle güncellenmesine gerek duyulmuyor.

## 2023.04.16

### Eklenenler

- Otomatik dosya oluşturma modu ekledi. Eğer açılan PHP dosyasına dair js ve css dosyaları ilgili klasörlerde yoksa, sistem otomatik olarak bu dosyaları oluşturup önceden tanımlanan template içerikleri ekleyecektir. Bu sayede dosya oluşturma işleminde manuel çalıştırmaya gerek kalmamaktadır. Eğer esbuild içine derlenecek dosyalar elle gönderilirse bu dosyalar otomatik olarak oluşturulmayacaktır. Ayrıca eğer dosyalar mevcutsa yeni dosya oluşturma işlemi yapmayacaktır.

### Değişenler

- `background` mixin'i içinde görsel opsiyonel hale getirildi. Eğer görsel gönderilmezse `background-repeat`, `background-position` ve `background-size` özellikleri kullanılacaktır. Görselin gönderilmesi durumunda görsel de bu özelliğe dahil olacaktır.

## 2023.04.15

### Eklenenler

- esbuild içinde otomatik dizin okuma eklendi. Eğer `entryPoints` olarak çağırılan `mergeFiles` fonksiyonuna dosyalar dizin formatında gönderilirse, sistem o dosyaları işleyecek. Eğer herhangi bir argüman gönderilmezse bu durumda `src/pages` klasörü içindeki js dosyalarını otomatik olarak okuyup işleme alacak.
- Otomatik olarak anchor elementlere title eklemek için fonksiyonu oluşturuldu. Bu fonksiyon direkt olarak anchor elementin içinde herhangi bir metin varsa bu içeriği title olarak ekleyecektir. Eğer yoksa title oluşturmayacaktır. Örnek olarak

```html
<a href="#">Deneme içerik</a> <!-- Bu element için title değeri Deneme içerik olacaktır -->

<a href="#"><img src="https://www.foobar.com"> </a> <!-- Bu element için title değeri oluşturulmayacaktır -->
```


## 2023.04.14

### Eklenenler

- Tam genişlik ve tam yükseklik için yeni utility sınıfları eklendi. `w-100`, `h-100` sınıfları ile elementlerin genişliği ve yüksekliği tam olarak ayarlanabilir.

## 2023.04.13

### Eklenenler

- Asenksron yükleme işlemi için örnek Google Font içinden Montserrat ailesi eklendi. Render blocking sorununun önlenmesi (asenkron kullanım) için özel attribute kullanıldı. Kaynak: [Page Speed Checklist](https://pagespeedchecklist.com/asynchronous-google-fonts)
- Font tanımlaması için mixin eklendi. Sürekli font tanımlamasında uzun uzun yazmak yerine fontların parameterlerinn gönderilmesi yeterli. Şu an için mixin `font-size`, `font-weight` ve `line-height` desteklemekte. Sırasıyla bu değerler varsayılan olarak 500, 16px ve 1 değerlerini almakta. Örnek bir elementte kullanmak için

```scss
@include get_font(700, 18px, 1.2);
```
şeklinde bir kullanım yapılabilir.

### Değişenler

- esbuild için bilgilendirme renkleri güncellendi. Artık ilk başlangıçta sarı renk ile çalışma ortamını bilgilendirirken her bir derleme aşamasının başlangıcını turkuaz renk ile yazmakta. 
- `ul` elementi için bullet markerlar kaldırıldı.


## 2023.04.12

### Eklenenler

- Artık npm içinde iki ayrı komut çalıştırma yerine tek komut çalıştırma özelliği getirildi. `npm run dev` ve `npm run build` komutları ile esbuild ve sass işlemleri yapılabilir. dev ve build parametreleri ile sass ve esbuild'in sırasıyla dev ve production durumlarındaki çalışma durumları etknileştirilebilir.
- esbuild için cli parametreleri eklendi. Artık `node esbuild.config.js production` şeklinde ikinci ortam durumu gönderilebilir. Eğer yoksa .env dosyası içinde bulunan `NODE_ENV` değişkeni kullanılacaktır.	Eğer o da yoksa varsayılan olarak development değeri atanacaktır. 

### Düzeltmeler

- Mobil menüdeki çift tıklama sorunu giderildi. Sayfaya ilk girişte mobil menü butonu ilk tıklamada çalışmak yerine ikinci tıklamadan sonra normale dönüyor. Değer değişimi fonksiyondan sonra olduğu için sistem bunu fark etmiyor. Fonksiyon ve değer değişiminin sırası güncellendi.

## 2023.04.09

### Eklenenler

- Production için bundle işlemini hızlıca yapabilmek için yeni script eklendi. Artık `npm run build` ile SCSS ve JS dosyaları otomatik olarak sıkıştırılacak. Talebe göre PostCSS de burada kullanılabilir.

### Değişenler

- esbuild için watch modu opsiyonel hale getirildi. Eğer geliştirme ortamı production değilse otomatik olarak watch modu altında çalışacaktır. Production olması durumunda tekseferlik olarak bundle işlemi gerçekleştirilecektir.
- JS dosyaları dev ortamında mangle işlemine uğramadan plain olarak görünecek şekilde yapılandırıldı. Debug ederken JS dosyalarında değişken isimlerinden kaynaklı olarak takibin zorlaşması sorunu ortadan kaldırıldı.
- Akrobat font ailesi ve buna bağlı utility seçicileri (selectors) kaldırıldı.
- Bootstrap içinde grid ve container özelleştirilebildiği için özel grid oluşturucu, wrapper ve container tanımlamaları kaldırıldı. Özel grid için Bootstrap'ın kendi değişkenleri kullanılabilir.

## 2023.04.06

### Eklenenler
- Opsiyon olarak pnpm eklendi.

### Düzeltmeler
- esbuild içinde kapanmayan ANSI code sorunu giderildi. Terminalde yaşanan renk taşma sorunu kaldırıldı.

## 2023.03.16

### Eklenenler

- Bundle için yeni script eklendi. Nihai CSS dosyası oluşturulurken artık `npm run bundlecss` işlemi yeterli olacak.

### Değişenler

- esbuild artık kullanıcının çalıştığı ortam değişkeni hakkında bilgi verebilecek şekilde güncellendi.
- esbuild içindeki kaynak ve çıktı klasörleri ana değişken olarak atandı.
- Kullanılmayan font tanımlamaları kaldırıldı.
- JS ve CSS için çağrılması gereken dosyalar ayrı ayrı değişkenlerden gelmek yerine tek bir değişkenden gelecek şekilde düzenlendi. PHP sayfasında kullanılacak assetlerin `$call_file` değişkeninde tanımlanması ve isimlerinin bu değişken değeri ile aynı olması yeterli.
- `giveAttr` fonksiyonu kaldırıldı. Görsel olarak bozuluma sebep olduğu için yeni alternatif bulunana dek bu fonksiyon iptal edildi.
- `components` partial dosyası kaldırıldı. Artık componentler ayrı ayrı partial içinde oluşturularak sayfalarda ayrı bir şekilde çağrılabilecek.

### Düzeltmeler

- JS içindeki modül yapısındaki hata giderildi. Common dosyası artık lib klasöründen çağrılacak şekilde düzenlendi.
- Normalize içindeki parent selector hatası giderildi.
- `dotenv` paketi eksikliğinden dolayı esbuild içinde yaşanan hata giderildi.
- Header içinde kullanılmayan Bootstrap tanımlaması kaldırıldı

## 2023.03.13

### Eklenenler

- Production mode kontrol etme özelliği getirildi. Kullanıcı artık sourcemap ve minify işlemlerini `NODE_ENV` ortam değişkeni ile kontrol edebilecek. Bu değişkenin production olması durumunda sistem JS dosyasını küçültüp sourcemap çıktısını iptal edebilecek.

### Değişenler

- Common.js gibi sürekli kullanılacak JavaScript dosyaları lib klasöründe toplandı. Artık tek bir dizinde ortak dosyalar tutlabilecek.

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
