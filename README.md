# Personal Boilerplate

<img src="https://img.shields.io/badge/Bootstrap-5.3.0-brightgreen" alt="Bootstrap"> <img src="https://img.shields.io/badge/Photoswipe-5.3.7-brightgreen" alt="Lightgallery"> <img src="https://img.shields.io/badge/Swiper-9.2.0-brightgreen" alt="Swiper"> <img src="https://img.shields.io/badge/esbuild-0.17.15-blue" alt="esbuild"> <img src="https://img.shields.io/badge/Autoprefixer-10.4.14-blue" alt="Autoprefixer"> <img src="https://img.shields.io/badge/cssnano-6.0.0-blue" alt="cssnano"> <img src="https://img.shields.io/badge/PostCSS-8.4.21-blue" alt="PostCSS"> <img src="https://img.shields.io/badge/Sass-1.60.0-blue" alt="Sass">

Bu reponun amacı sürekli olarak internet sitelerini oluştururken projeyi yeniden başlatma ve kaynakları güncelleme gereksinimini ortadan kaldırmaktır. Bu reponun içindeki dosyaları kendi projelerinize kopyalayarak kullanabilirsiniz.

Tek yapılması gereken repoyu içeri aktarmak.

```bash
git clone https://github.com/furkantaskin/boilerplate.git
```

## Desteklenen Cihazlar

[Browserslist](https://browsersl.ist/) kullanarak desteklenen tarayıcılar için bilgileri ekledim. Desteklenen en düşük sürümler şu şekilde

- Chrome 105
- Chrome for Android 108
- Safari iOS 14
- Edge 105
- Samsung Internet 16
- Safari 15.6
- Firefox 14
- Opera 89
- Opera Mini
- Firefox Android 107
- Opera Mobile 72

## Konfigürasyon

Verimi artırmak için mümkün olduğunca modül yapısı ve sayfaya özel yapı gözetilmektedir. Bu yüzden esbuild ile Sass başta olmak üzere diğer kısımlarda da çeşitli ince noktalar bulunmaktadır.

### JS

JS dosyalarında bunlder olarak esbuild kullanılmakta. Varsayılan olarak ana dizinde bulunan `src/pages` dizinindeki JS dosyalarını baz alarak çıktılarını `theme/assets/js` klasöründe toplayacaktır. Bu kısımda mümkün olan en yüksek özelleştirme imkanını sağlamaya çalıştım.

Giriş ve çıkış dizinleri değiştirilecekse `sourceDir` ve `outDir` değişkenlerindeki dizinlerin güncellenmesi yeterli olacaktır. esbuild kalan kısımları otomatik olarak düzenlemektedir.

Mobil ve otomatik title gibi işlemler ise `src/lib/common.js` içinde gerçekleşmektedir. Bunların kullanılacak alana import edilmesi otomatik olarak mobil menü interaksiyonlarını sağlayacaktır.

#### esbuild

esbuild burada iki mod altında çalışmaktadır. Bunlar development ve production şeklindedir. Eğer sistem ya da site henüz geliştirme aşamasında ise `npm run dev` veya `npm run esbuild` komutu ile esbuild dev modunda etkinleştirilebilir. Bu kısım gerekirse ana dizinde oluşturulacak bir .env dosyası ile değiştirilebilir.

esbuild bu kısımda `theme` klasörü içindeki belirli PHP dosyaları (header ve footer gibi ortak kullanılan dosyalar) dışında sayfa olarak görev gören PHP dosyalarını otomatik olarak algılayıp `src/pages` klasöründe bunlara ait JS dosyalarını oluşturacak ve template içeriğ ekleyecektir. Bu template konfigürasyon dosyasındaki (esbuild.config.js) `jsTemplate` değişkeninden düzenlenebilir. Tek yapılması gereken yeni sayfa oluşturulduktan sonra esbuild'in yeniden çalıştırılmasıdır. Eğer sayfalar belirli ise sayfaların hepsinin açılmasının ardından komutun çalıştırılması da, komutun sürekli çalıştırılmasının önüne geçecektir.  Eğer JS dosyaları zaten mevcutsa herhangi bir düzenleme yapmadan sistem sadece yeni dosyaları baz alarak devam edecek ve mevcut dosyaları es geçecektir.

Modül yapısı korunabilmesi için common.js dosyası, mobil menü ve title ekleme işlemleri için ayrı ayrı fonksiyonlar içermektedir. Bu fonksiyonar `mobileMenu` ve `setTitle` şeklindedir. 

Eğer terminal kısmından çalıştırılacaksa argüman olarak `production` değerinin gönderilmesi durumunda esbuild JS dosyalarının son halini bundle edecek ve JS dosyasını sıkıştıracaktır. Sourcemap ve minify işlemlerinin yanı sıra tree shaking işlemi de production altında etkinleştirilecektir.

esbuild detaylı dokümantasyon için -> [esbuild](https://esbuild.github.io/)

#### Photoswipe

Photoswipe kendi sitesinde de çalıştırma için bazı detaylar istemektedir. Özelleştirme dışında varsayılan temel kullanım için HTML/CSS ve JS içinde düzenleme gerekmektedir.

1. HTML içinde anchor elementlere `data-pswp-width` ve `data-pswp-height` dataları eklenmelidir.
2. JS içinde modül tanımlaması yapılmalıdır
3. CSS dosyaları içeri eklenmelidir.

Birinci ve ikinci madde tek bir dosyada yapılabilir. Kullanılacak görseller farklı olacağı için burada JS ile resimlerin asıl ölçüleri gönderilebilir.

```js
document.querySelectorAll('.prodgallery a img').forEach((e) => {
  e.parentElement.dataset.pswpWidth = e.naturalWidth;
  e.parentElement.dataset.pswpHeight = e.naturalHeight;
});
```

Artık Photoswipe etkinleştirilebilir.

```js
const prodGallery = new PhotoSwipeLightbox({
  gallery: '.prodgallery',
  children: 'a',
  pswpModule: () => import('photoswipe'),
});

prodGallery.init();
```

Photoswipe detaylı dokümantasyon için -> [Photoswipe](https://photoswipe.com/getting-started/)

#### Swiper

Swiper aktif olarak kullanılıyor. Burada temel importları yaptıktan sonra kendi sitesindeki API referansından gerkeli modüller ve parametreler / metodlar kullanılabilir.

```js
const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 100,
});
```

Burada değişken tanımlaması zorunlu değil ancak dilenirse tanımlanabilir. Metodlar ve eventler sık kullanılacaksa değişkene atanması iyi olacaktır.

Swiper detaylı dokümantasyon için -> [Swiper](https://swiperjs.com/)

#### Bootstrap Utilities

Bootstrap kendi sitesinde dokümantasyona her şeyi anlatmış ama bana nedense eksik geldi. Yeni bir element eklemek için dilenirse parent elemente veya her bir farklı elemente tıpkı Swiper'a benzer bir atama yapılabilir. Örneğin bir id'si `abilitiesFaq` olan bir element içinde bulunan birden fazla akordiyonu çalıştırmak için çok kısa bir kod yeterlidir.

```js
const accordionParent = document.getElementById('abilitiesFaq');
new Collapse(accordionParent, {
  toggle: false,
});
```

Bootstrap detaylı dokümantasyon için -> [Bootstrap](https://getbootstrap.com/)

### CSS

Bootstrap SASS dosyası aktarılırken belirli importları kendim yaptım. Bu kısma dikkat edilmesi gerekir. Çünkü hata verebilir. Mümkün olduğunca import ifadesinden kaçmaya çalıştım ancak kontrol bir noktada zorlaşabilir.

#### Sass ile Derleme

Tüm CSS dosyaları SCSS formatındadır ve src klasöründe tutulmaktadır. Kolay bir şekilde işlem yapabilmek için `npm run sass` komutu çalıştırılabilir. Sass bu kısımda src/css/pages klasöründeki scss dosyalarını derleyecektir. Partial dosyalar ise src/css içindeki tüm partial dosyalar olacak şekilde eklenmiştir. En son olarak da sourcemap oluşturacak ve dosyayı sıkıştıracaktır.

Sass işleminden sonra optimizasyon planı varsa bunun için kullanıcılara PostCSS opsiyonu sunulmaktadır.

#### PostCSS ile Optimizasyon

Tüm CSS işlemleri bittikten sonra PostCSS ile optimizasyon yapılabilir. Bu kısımda PostCSS, npm içinde tanımlı olan dizinler arasında işlem yapacak ve son olarak optimize halini çıkaracaktır. Şu an için varsayılan input ve output klasörleri aynı olup `./theme/assets/css` klasörünü baz almaktadır. PostCSS'i çalıştırmak için `npm run postcss` komutu yeterlidir.

> **Warning**
> PurgeCSS, eklentilerin JS dosyalarını formattan dolayı es geçeceği için burada Swiper için özel tanımlama gerekecektir.

```scss
/*! purgecss start ignore */
@import '../../../node_modules/swiper/swiper';
/*! purgecss end ignore */
```

#### Mixin'ler

Sass içindeki mixinler belirli bir çalışma programı içermektedir. Bunlardan en önemlisi `aspect-ratio` denilebilir. Kullanımı çok kafa karıştırıyor gibi hissettirse de mantığı çok basittir. (Gerekli açıklama için bkz: [Changelog](CHANGELOG.md)). Tek yapılması gereken sağlıklı bir işlem için `aspect-ratio` verilecek parent elementin hemen içine yeni bir element oluşturup class adına `ar-child` vermek yeterlidir. Sistem gerisini halledecektir.

##### `calc-ar`

```scss
@mixin calc_ar($w, $h, $has_child: false){}
```

`calc-ar` mixin'i ileri dönemde kaldırmayı planladığım bir mixin. Safari 14 sürümünde `aspect-ratio` çalışmadığı için geleneksel yöntem olan `padding-bottom` işlemi gerekmektedir. Bu yüzden tarayıcılarda bunun desteklenmediği durumda `aspect-ratio` kullanılan alanın buna uygun modifiye edilmesi gerekir.

`calc-ar` mixin'i üç parametre almaktadır. İlk kısımda genişlik ve yükseklik değerleri gönderilebilir. Bu kısımda birimleri otomatik olarak silecektir. Bu yüzden değerin piksel ya da normal gönderilmesi önemli değildir. Eğer en boy oranı verilen element içinde başka elementler varsa üçüncü parametrede true değeri gönderilmelidir. Bu durumda `padding-bottom` değeri hesaplanacak ve `ar-child` elementine absolute position verilerek ana element içinde boydan boya alan kaplaması sağlanacaktır. Zamanla Safari 14 kullanan cihaz oranı azaldığı için bu mixin kaldırılacaktır.


##### `pos_abs`

```scss
@mixin pos_abs($top: 0, $right: 0, $bottom: 0, $left: 0){}
```

`pos_abs` da tıpkı `calc_ar` gibi ileride kaldırılacak olan bir mixin'dir. Bunun amacı da `inset` desteklemeyen tarayıcılarda otomatik olarak `top, right, bottom, left` değerlerini vermektir. Bu değerlerin de gereken birimde (px, rem vb.) gönderilmesi gerekmektedir. Varsayılan olarak tüm kenarlara 0 değeri verilmiştir.

##### `get_font`

```scss
@mixin get_font($font_weight: 500, $font_size: 16px, $line_height: 1){}
```

`get_font` mixin'i, uzun uzun yazılan font değerlerini kısaltmak için kullanılmaktadır. Bu mixin'i kullanmak için `font-weight`, `font-size` ve `line-height` değerleri gönderilmelidir. Bu değerlerin birimleri de gönderilmesi gerekmektedir. Varsayılan olarak `font-weight` değeri 500, `font-size` değeri 16px ve `line-height` değeri 1 olarak tanımlanmıştır. `font-family` özelliği body içinde tanımlanabileceği için bu kısma eklenmedi.

### Favicon

Favicon çok önemli değil ancak şu an için tüm cihazlarla uyumlu olan favicon yapısı var. Dilenirse bu standart forma da dönüştürülebilir.

```html
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
```

### Görseller

Görseller jpg veya png olarak yüklenebilir. Daha yüksek performans için WebP formatı daha avantajlı olacaktır. Bunun için terminalden görsellerin bulunduğu klasöre gidip aşağıdaki kodun çalışıtırlması yeterlidir.

```bash
for file in *.jpg ; do cwebp -q 80 "$file" -o "${file%.jpg}.webp"; rm "$file"; done
```

Ya da recursive işlem için aşağıdaki kod da kullanılabilir

```bash
find . -type f -name "*.jpg" -exec sh -c 'cwebp -q 80 "$0" -o "${0%.jpg}.webp"; rm "$0"' {} \;
```

PNG için aynı işlemin yapılması gerekiyorsa buradaki `.jpg` kısmı `.png` ile değiştirilebilir. Direkt olarak dosyaların üstüne yazacağı için yedekleme yapılması uygun olacaktır.

### SVG

Normalde SVG dosyaları içeriye `<img/>` etiketi ya da direkt olarak CSS içinde maske olarak çağrılabiliyordu. Ancak çok fazla SVG dosyasını içeriye aktarmak istekte artışa sebep olacağı için sprite oluşturuldu.
[SVG Sprites](https://svgsprit.es) üzerinden svg dosyalar bir `<symbol>` haline getirilebilir ve bu şekilde çağırma işlemi yapılabilir.

> **Warning**
> SVG dosyaları bir ViewBox ihtiyacı duyacağı için çağrılan elementin ViewBox ölçülerinin çağrıldığı `<svg>` elementi içine eklenmesi gerekmektedir.

## Ek Kütüphaneler

- Bootstrap
- Photoswipe
- Swiper
- normalize.css

## Kullanılan Yazılımlar

- esbuild
- PostCSS (Autoprefixer)
- Bootstrap
- Swiper
- Photoswipe
- cwebp
