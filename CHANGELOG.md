# CHANGELOG

Projeye dair tüm güncellemeler burada bulunmaktadır. [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) baz alınarak hazırlanmıştır.

## 2023.11.18

### Düzeltmeler

- PurgeCSS için Swiper içinde tanımlanan ignore flaglarından kaynaklı GLightbox'ın es geçilmesi hatası giderildi.

## 2023.11.16

### Eklenenler

- Ağdaki diğer cihazlardan erişimi kesmek için PHP koşulu eklendi. Deploy anında bu kodun kaldırılması iyi olacaktır.

### Düzeltmeler

- Container dışında kalan alanın genişliğini hesaplamada yapılan hata giderildi.
- `row` için margin hesaplamasındaki hata giderildi.

## 2023.11.15

### Eklenenler

- Cache busting için local kontrolü getirildi. Yayına alınan sitelerde cache busting durumunun önüne geçebilmek için kontrol yapılmakta. Eğer geliştirme ortamı localhost değilse sistem rastgele sürüm vermeyecek.
- Artık JS çıktısına build alınan tarih ekleniyor.
- Line height için diğer Tailwind classları eklendi
- Border radius genel sınıflar eklendi. `rounded-corner` sınıfı yerine `rounded-full` sınıfı eklendi.
- Column generator varsayılan hale getirildi.
- Yeni sınıflar eklendi. Eklenen sınıflar: `align-content, align-self, place-items, place-content, place-slef, justify-items, justify-self, flex-grow, white-space`
- Mufferplate için TypeScript desteği eklendi. Artık sadece dizin içindeki js dosyalarını değil, ts dosyalarını da işleyebilecek.

### Değişenler

- `offset` sınıfı için boşluk değeri RTL ile uyumlu hale getirildi. Artık RTL mode etkinse `margin-block-start` olarak, değilse `margin-left` olarak değer gelecek.
- Templateler için dependency sürümleri güncellendi.
- Gap oluşturma mixin'i güncellendi.

### Düzeltmeler

- Multiple template için eksik mufferplate konfigürasyon hatası giderildi.
- Multiple template için özel css yapısı kaldırıldı.
- Multiple template için Sass komutundaki hata giderildi.
- `min_responsive` mixin'i içerisindeki uyarı metninde yaşanan `max_responsive` değişkenini çağırma hatası düzenlendi. 

## 2023.11.05

### Düzeltmeler

- Mobil menü açılması durumunda sitede yaşanan kayma sorunu giderildi.

## 2023.11.02

### Eklenenler

- `appearance-none` ve `border-none` sınıfları eklendi.
- Renk değişkenlerini hızlıca ekleyebilmek için `get-color` fonksiyonu eklendi. `get-color(primary)` şeklindeki kullanımda eğer `primary` keyi renk listesinde vars otomatik olarak `var(--color-primary)` değeri döndürülecek.
- Son eklenen sınıflarda yanlış ekleme sonucu oluşan seçici oluşturmama hatası giderildi.

### Düzeltmeler

- PurgeCSS için ana dizindeki inc klasörü ve theme klasörü içindeki template klasöründe bulunan dosyaları es geçmesinden dolayı yaşanan sınıf silme sorunu giderildi. Artık PurgeCSS, theme klasörü, theme klasörünün altındaki templates klasörü ve ana dizindeki inc klasöründe bulunan PHP dosyalarını baz alacak. 

## 2023.11.02

### Eklenenler 

- Mufferplate için metafile oluşturma eklendi. `meta: true` özelliği ile oluşan son JS dosyasında hangi dosyaların kullanıldığı listelenebilir.
- Tailwind sınıflarından bazıları eklendi. Liste şu şekilde
  - `overflow` için hidden, auto, scroll ve visible sınıfları
  - tüm `aspect-ratio` sınıfları
  - tüm `background-position` sınıfları
  - `background-repeat` için bg-repeat ve bg-no-repeat sınıfları
  - `background-size` için bg-auto, bg-cover ve bg-contain sınıfları
  - `cursor-pointer` sınıfı eklendi

### Değişenler

- width ve height hesaplaması artık 100px'e kadar dördün katları şeklinde 100px'e kadar ve sonrasında 1/2'den 11/12'ye kadar olacak şekilde yüzdelik vermekte. w-25, w-50, w-75 ve w-100 sınıfları kaldırıldı. w-100 yerine ve w-full sınıfı eklendi.
- Position için RTL desteği güncellendi. Ayrıca start ve end sınıfları eklendi. Aynı şekilde width ve height'teki gibi 1/2'den 11/12'ye kadar olan değerlere göre yüzdelik alma eklendi.
- Margin ve paddin hesaplamasındaki mixin'ler güncellendi ve kod kalabalığı giderildi.

## 2023.10.30

### Değişenler

- `.h-screen` classı için `dvh` desteği eklendi. Bu özelliği destekleyen tarayıcılarda `100dvh` alırken desteklemeyen tarayıcılarda `100vh` olarak yükseklik alacak.

## 2023.10.29

☾⋆ CUMHURİYETİMİZİN 100. YILI KUTLU OLSUN. BU BAYRAĞIN ALTINDA VE VATAN TOPRAĞINDA BOL COMMITLI GÜNLERİ GÖRMEK UMUDUYLA ☾⋆

### Eklenenler

- `leading-none` sınıfı eklendi. Şu an için en sık kullanılan `line-height: 1` durumu için sınıf eklendi.

### Değişenler

- Margin, padding ve gap sınıf hesaplamaları güncellendi. Artık `$spacer-limit` değeri ve `$spacer` değişkenlerine bağlı olarak Tailwind benzeri sınıflar oluşturmakta. Yani `mx-25` değeri left ve right için 100px değer verirken `-mt-3.5` değeri `margin-top: -14px` değerine karşılık gelmekte. Aynı durumlar padding için de geçerli. Gap için de `row-gap, column-gap` değerlerinde işlem yapılıyor.
- Eski font yüksekliği oluşturma yapısı kaldırıldı. Artık Tailwind içindeki ile aynı sınıflar kullanılmakta. Burada `$font-rem` değerine göre rem veya piksel değeri almakta.
- Pozisyonlar için negatif değerler eklendi. Artık her pozisyonun kendi negatif değeri ve piksel değeri var. Örneğin `top-25-px` değeri `top:100px` olarak gelirken `-bottom-10` değeri `bottom: -40px` olacak şekilde güncellendi. Bunlarda `$spacer` değerine göre güncelleme almakta.

### Düzeltmeler

- Tailwind şablonundaki package.json'da yaşanan syntax hatası giderildi.
- Custom utility için opacity değerleri 0.1'er artmak yerine 0.05'er olarak artacak şekilde güncellendi 

## 2023.10.26

### Eklenenler

- Custom utility üzerinde aşağıdaki değişiklikler yapıldı.
- top, right, bottom ve left değerleri için RTL desteği eklendi. Eğer `left-20` şeklinde değer gönderilirse yazım yönü fark etmeksizin element left kısımında %80 şeklinde konumlanacak. Ancak `ltr:left-20` şeklinde pozisyonlarda LTR modunda left için %80 ve RTL modunda ise right için %80 şeklinde konumlanacak.

### Değişenler

- `.has-absolute` sınıfı `relative` sınıfının varlığından dolayı kaldırıldı.
- `base.scss` içindeki `box-sizing` tanımlaması kaldırıldı.
- `body` elementi için `position` ve `font-family` tanımlamaları kaldırıldı.


## 2023.10.25

### Eklenenler

- Custom utility için boşluk sınıfları eklendi. Tailwind takip edilerk margin, padding değerleri, pozisyon değerleri verilebilir. Ayrıca opacity, flex ve font size için de sınıflar eklendi.
- RTL opsiyonu eklendi.
- Custom utiity içine CSS küçültme için LightningCSS eklendi. `npm run lightningcss` komutu ile çalıştırılabilir.

## 2023.10.24

### Eklenenler

- Custom utility için PostCSS konfigürasyonu güncellendi. Artık Tailwind benzeri responsive seçiciler son durumda silinmiyor.

### Düzeltmeler 

- mufferplate içindeki outdir tanımlama hatası giderildi.
- mufferplate içindeki js içine yorum satırı ekleme konfigürasyonundaki hata giderildi
- signature tanımlamasındaki konfigürasyon hatası giderildi. Kullanıcı signature seçeneğini açması durumunda otomatik olarak sabit yorum eklenecek

## 2023.10.23

### Eklenenler

- Signature fonksiyonu mufferplate içine eklendi.
- Templateler içinden API fonksiyonu kaldırıldı.

## 2023.10.20

- Artık mufferplate bir npm script haline getirildi. Özel config dosyası ile çağrılabilir.
- Create mufferplate içindeki templatelerde script güncellemesi yapıldı.

## v1.28.0

### Eklenenler

- `user-select` ve `pointer-events` özellikleri eklendi

## v1.27.2

### Düzeltmeler

- CSS değişkenlerinde yaşanan isimlendirme hatası giderildi.


## v1.27.1

### Değişenler

- Renkler artık CSS değişkeni olarak oluşturulmakta. Artık renkler tek tek elle `$primary, $secondary` yerine direkt olarak ana kaynağa eklenip `var(--color-primary)` şeklinde çağrılabilir.

## v1.27.0

### Eklenenler

- Utility sınıfları için `isActive` opsiyonu eklendi. Bu sayede istenmeyen sınıflarda `isActive: false` yapılarak CSS üretilmesi engellenecektir.

### Değişenler

- Renkler için SCSS değişkeni oluşturucu sağlandı.
- Utility sınıflarında yanlış dizimden kaynaklı override sorunu giderildi.
- Utility sınıfları için mobile first veya desktop first durumları için breakpoint oluşturma sırası güncellendi.
- Width, z-index ve order için oluşturma kısımları düzenlendi

## v1.26.0

### Eklenenler

- SCSS şemaları için GLightbox kütüphanesi eklendi.

## v1.25.1

### Düzeltmeler

- SCSS yapısı kullanan şablonlarda mobil görünümü sağlıklı çalıştırmak için `responsive` mixin yerine `max_responsive` kullanıldı ve mobil görünüm 991 piksele kadar görünecek şekilde güncellendi.

## v1.25.0

### Eklenenler

- Desktop-first mantığını sağlamak için yeni `max_responsive` mixini eklendi. Bu sayede masaüstünden mobile doğru ilerlenebilir. Buradaki breakpointler \_mixins.scss içindeki `$breakpoints` değişkeninde tanımlı alanları baz almaktadır. Özel genişlik için genişliği piksel yazıdktan sonra `$custom:true` parametresi ile göndermek yeterlidir. (Örnek `@include max_responsive(1999px, $custom:true)`)

### Değişenler

- Responsive mixinlerden piksel ifadeleri kaldırılıp breakpointlere taşındı.
- xxl breakpoint için genişlik 1600 pikselden 1599 piksele güncellendi
- Mobil görünüm için gereken genişlik 991 piksel olacak şekilde güncellendi.

## v1.24.0

### Değişenler

- JS içinde artık origin ne olursa olsun API isteği gitmekte.
- Gereksiz sosyal medya ikonları ve main içinde tanımlamalar kaldırıldı.

## v1.23.0

### Eklenenler

- Özel yapı için `text-align` özelliğine `start` ve `end` değerleri de eklendi.

### Değişenler

- `flex-direction` özelliğindeki `col` ve `col-reverse` değerleri `column` ve `column-reverse` olarak güncellendi.

## v1.22.0

### Değişenler

- Özel yapı klasör haline getirildi. Renkler için arka plan ve metin rengi için sınıf oluşturucular eklendi.

## v1.21.0

### Eklenenler

- Tekli CSS ve JS için yeni yapı eklendi. Yeni yapı içinde Bootstrap'ın grid yapısının yanı sıra Tailwind içinden belirli utility sınıfları kullanılmakta. Breakpoint ve container genişliği Bootstrap temelli hazırlandı. Kullanılan yapılar şu şekilde

#### Bootstrap

- Grid yapısı (container, row, col, offset sınıfları)

#### Tailwind

- display, position, align-items, justify-content, flex-direction, flex-wrap, text-align, font-weight, object-fit, object-position, z-index

#### Özel

- Order (order için bootstrap breakpoint yapısı `order-lg` vb. kullanılmakta)
- Width (w-0 w-25, w-50, w-75, w-100 sınıfları bootstral breakpoint yapısı `w-lg-0` vb. kullanılmakta).
- Mobile first durumu (Mobile first ise sınıflar min width olarak oluşturulacak)

## 2023.09.28

### Eklenenler

- Özel CSS şeması eklendi. Bu şema ile Bootstrap içindeki gereksiz sınıflar ve özellikler yerine grid yapısı (row ve cols) ile container yapısı kullanılmakta. Ayrıca utilities olarak da Tailwind'den bazı seçiciler kullanıldı. Tailwind içinden display, position, align, justify, flex-direction, flex-wrap, text-align, font-weight, object-fit, object-position özellikleri kullanılmakta. Bu seçiciler için bootstrap gibi ara "-lg-" yapısı yerine tailwind içindeki responsive yapısı (sm:class vb.) kullanılmakta.

## 2023.09.17

### Eklenenler

- Mobil menü için JSON yapısı eklendi. Artık sistem JSON dosyasındaki hiyerarşiyi takip ederek mobil menüyü oluşturabilecek.

### Değişenler

- Responsive ve transitionn için kullanılan mixinler güncellendi. Artık transition mixin'i için hangi property'nin ne kadar süreceği map mantığı ile eklenebilir. Responsive için de gerekli akış kontrolleri eklendi.

## 2023.08.17

### Eklenenler

- **Yeni npm komutu!** Artık git reposu clone edilmek yerine npm kullanılarak proje çağrılabilir. Bu kısımda tek çıktılı veya çok çıktılı olma durumlarına göre kullanıcıya seçenekler sunulacaktır. Bootstrap için tek ve çok sayfalı çıktılar sunulurken Tailwind için tek sayfalı çıktıda çalışmakta. `npx create-mufferplate@latest` komutu ile istenilen yapı seçilebilir.

- Bootstrap'ın kendi yapısındaki breakpointlere göre responsive hazırlanması için `bs_responsive()` şeklinde yeni mixin eklendi.
- Mobildeki hover sorununu çözmek için `no_hover()` mixin'i eklendi. Bu mixin içine hover durumundaki özellikler yazılırsa mobilde gösterilmeyecek.
- Transition işleminde eğer kullaıcı `prefer-reduced-motion` altında siteyi geziyorsa transition tanımlanan işlemlerde animasyon oynatılmayacak.

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
- Otomatik SVG çağırma fonksiyonu için class argümanı eklendi. Bu sayede çağırılan svg elemente isteğe göre class eklenebilecek.

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
<a href="#">Deneme içerik</a>
<!-- Bu element için title değeri Deneme içerik olacaktır -->

<a href="#"><img src="https://www.foobar.com" /> </a>
<!-- Bu element için title değeri oluşturulmayacaktır -->
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
- esbuild için cli parametreleri eklendi. Artık `node esbuild.config.js production` şeklinde ikinci ortam durumu gönderilebilir. Eğer yoksa .env dosyası içinde bulunan `NODE_ENV` değişkeni kullanılacaktır. Eğer o da yoksa varsayılan olarak development değeri atanacaktır.

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
