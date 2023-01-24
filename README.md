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

JS dosyaları için esbuild kullanılmakta. esbuild başta ana dizindeki src klasörüne bakacaktır. Sayfalara özel js varsa o zaman js dosyalarının pages klasöründe toplanması yeterlidir.

#### esbuild

Derleme ve bundling işlemini hızlandırmak için esbuild kullanıldı. Bu kısımda webpack prod derlemesi için çok vakit kaybettiği için esbuild tercih edildi. Eğer ileri dönemlerde Vanilla PHP entegrasyonunu da başarabilirsem custom bir sistem yerine direkt olarka Vite alt yapısı ile çalışma planım var. Şimdilik esbuild sorunsuz gibi görünüyor. Tabii ki dev mode ve prod mode olarak henüz ayıramadım. Bu kısımda da watch mode bana sistemin başarılı olup olmadığını söyleyemediği için (daha doğrusu ben yapamadığım için) kullanılan IDE üzerinden Action on Save oluşturulması gerekiyor. Bunun için Jetbrains kullandığımdan dolayı Jetbrains üzerinden şu işlemlerin yapılması yeterlidir.

1. File Watcher sayfasından yeni bir wathcer oluştur.
2. File type kısmı Any ya da JS olabilir.
3. Sürekli sürekli çalışmaması için scope kısmından Current File seçilecek.
4. Program kısmı node olacak (node.js için CLI kısmında ne tanımlı ise o olacak).
5. Arguments kısmı `$ContentRoot$/esbuild.config.mjs` olacak. Buradaki `$ContentRoot$` projenin açıldığı ana dizini seçmektedir. Örneğin localhost/boilerplate ise `$ContentRoot$` bu şekilde gelecektir.
6. Kontrol için Show console seçeneği Always olabilir.

esbuild konfigürasyon dosyasında (esbuild.config.mjs) bundle çıkış ve kaynak klasörlerinin de belirtilmesi gerekecektir. Boilerplate düzeni korunacaksa değerlerin değişmesine gerek yok. Eğer klasörlerin yeri değişiyorsa şu satırların değiştirilmesi gerekiyor:

```js
const outdir = new URL(`./theme/assets/js/`, import.meta.url)
  .pathname; // Ana dizin içindeki dist klasöründe arama yapacaktır.

// Tüm dosyalarda uzun uzun tam dizin belirtmek yerine çalışacak dosyaların aynı klasör altında olması (klasör derinliği fark etmez) şartı sağlandığı sürece
// bu fonksiyon direkt olarak o dizine gidecektir.
function mergeFiles(filePath) {
  return new URL(`./src/pages/${filePath}`, import.meta.url).pathname;
}
```

Modül yapısı korunabilmesi için common.js dosyası bir export içinde tüm komutları göndermektedir. Bu kısım dilendiği şekilde düzenlenebilir. İleri dönemlerde bu işlevler fonksiyonlar altında tek tek toplanabilir.

İleri dönemlerde bootstrap ve diğer kütüphaneler ile frameworkler için de CSS bundle olayı denenecek.

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

Bootstrap SASS dosyası aktarılırken belirli importları kendim yaptım. Bu kısma dikkat edilmesi gerekir. Çünkü hata verebilir.

Ayrıca uyumluluk için save sonrası autoprefixer çalışmaktadır. Ben Jetbrains ile çalıştığım için configuration kısmına yeni bir shell script eklenebilir

```bash
npx postcss assets/css/pages/*.css --use=autoprefixer -m -r
```

Ek olarak çıktının theme klasörüne gitmesi için bazı düzenlemeler yapılması gerekiyor. Öncelikle File Watcher kısmında arguments alanı şu şekilde değiştirilmelidir

```
$FileName$:$ContentRoot$/theme/assets/css/$FileNameWithoutExtension$.css --style=compressed
```

Ayrıca Output paths to refresh kısmı da güncellenmelidir

```plain
$ContentRoot$/theme/assets/css/$FileNameWithoutExtension$.css:$ContentRoot$/theme/assets/css/$FileNameWithoutExtension$.css.map
```

#### Mixin'ler

Sass içindeki mixinler belirli bir çalışma programı içermektedir. Bunlardan en önemlisi `aspect-ratio` denilebilir. Kullanımı çok kafa karıştırıyor gibi hissettirse de mantığı çok basittir. (Gerekli açıklama için bkz: [Changelog](CHANGELOG.md)). Tek yapılması gereken sağlıklı bir işlem için `aspect-ratio` verilecek parent elementin hemen içine yeni bir element oluşturup class adına `ar-child` vermek yeterlidir. Sistem gerisini halledecektir.

### Favicon

Favicon çok önemli değil ancak şu an için tüm cihazlarla uyumlu olan favicon yapısı var. Dilenirse bu standart forma da dönüştürülebilir.

```html
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
```

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
