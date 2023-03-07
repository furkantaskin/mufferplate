# Personal Boilerplate

<img src="https://img.shields.io/badge/Bootstrap-5.2.3-brightgreen" alt="Bootstrap"> <img src="https://img.shields.io/badge/Photoswipe-5.3.3-brightgreen" alt="Lightgallery"> <img src="https://img.shields.io/badge/Swiper-8.4.5-brightgreen" alt="Swiper"> <img src="https://img.shields.io/badge/esbuild-0.17.4-blue" alt="esbuild"> <img src="https://img.shields.io/badge/Autoprefixer-10.4.13-blue" alt="Autoprefixer">

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

JS dosyaları için esbuild kullanılmakta. esbuild başta ana dizindeki src klasörüne bakacaktır. Sayfalara özel js varsa o zaman js dosyalarının pages klasöründe toplanması yeterlidir. Mobil için JS operasyonları common.js içinde gerçekleşmektedir.

#### esbuild

esbuild dosyasında (esbuild-config.js) bundle çıkış ve kaynak klasörlerinin de belirtilmesi gerekecektir. Boilerplate düzeni korunacaksa değerlerin değişmesine gerek yok. Eğer klasörlerin yeri değişiyorsa dosya `mergeFiles` fonksiyonu içindeki `sourceFolder` değişkeni ve context içindeki `outdir` propunun değişmesi gerekmektedir. `npm run esbuild` ile sistem çalıştırılabilir ve otomatik olarak dosya yenilemesi yapıldığında çıktıyı sistem verebilir.

Modül yapısı korunabilmesi için common.js dosyası bir export içinde tüm komutları göndermektedir. Bu kısım dilendiği şekilde düzenlenebilir. İleri dönemlerde bu işlevler, kendilerine has fonksiyonlar altında tek tek toplanabilir.

İleri dönemlerde bootstrap ve diğer kütüphaneler ile frameworkler için de CSS bundle olayı denenerek Sass derlemesinin esbuild içinden yapılması hedeflenmektedir.

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

Burada değişken tanımlaması zorundlu değil ancak dilenirse tanımlanabilir. Metodlar ve eventler sık kullanılacaksa değişkene atanması iyi olacaktır.

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

#### Grid Yapısı

Bootstrap'ın grid yapısına müdahale edilmeyecek durumlarda sadece columnların gerekmesi halinde column generator kullanılabilir. Daha hassas yaklaşımlar için sütun sayısı 36 olarak eklendi. Dilenirse bu sayı azaltılabilir. Generator `src/css/base/_base.scss` içinde bulunmaktadır.

#### Mixin'ler

Sass içindeki mixinler belirli bir çalışma programı içermektedir. Bunlardan en önemlisi `aspect-ratio` denilebilir. Kullanımı çok kafa karıştırıyor gibi hissettirse de mantığı çok basittir. (Gerekli açıklama için bkz: [Changelog](CHANGELOG.md)). Tek yapılması gereken sağlıklı bir işlem için `aspect-ratio` verilecek parent elementin hemen içine yeni bir element oluşturup class adına `ar-child` vermek yeterlidir. Sistem gerisini halledecektir.

### Favicon

Favicon çok önemli değil ancak şu an için tüm cihazlarla uyumlu olan favicon yapısı var. Dilenirse bu standart forma da dönüştürülebilir.

```html
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
```

### PHP

Normalde Lighthouse veya diğer performans ölçütleri görseller için bir `width` ve `height` değeri beklemekte. Bu performans skorlarını etkilediği için PHP içinde ilk anda bunlar hesaplanmakta. SVG dışındaki görsel formatlarını (JPG, PNG, WebP) destekleyen fonksiyonun `img` etiketi içine çağrılması yeterlidir. Görsellerin doğal boyutlarını çekeceği için CLS etiketlenebilir. Test edilmesi sağlıklı olacaktır.

Görsellere otomatik olarak genişlik ve yükseklik ataması yapılması için şu şekilde bir kullanım gerekecektir

```php
<img src='<?=domain?>assets/img/gorseladi.webp' <?=giveAttr(domain."assets/img/gorseladi.webp")?> alt=''>
```

Buradakki `<?=domain?>` kısmı header dosyasında tanımlı olmakla birlikte `giveAttr()` fonksiyonuna da aynı yerden müdahale edilebilir.

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
