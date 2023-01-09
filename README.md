# Personal Boilerplate

<img src="https://img.shields.io/badge/Bootstrap-5.2.3-brightgreen" alt="Bootstrap"> <img src="https://img.shields.io/badge/Photoswipe-5.3.3-brightgreen" alt="Lightgallery"> <img src="https://img.shields.io/badge/Swiper-8.4.5-brightgreen" alt="Swiper"> <img src="https://img.shields.io/badge/webpack-5.75.0-blue" alt="Webpack"> <img src="https://img.shields.io/badge/Autoprefixer-10.4.13-blue" alt="Autoprefixer">

Bu reponun amacı sürekli olarak internet sitelerini oluştururken projeyi yeniden başlatma ve kaynakları güncelleme gereksinimini ortadan kaldırmaktır. Bu reponun içindeki dosyaları kendi projelerinize kopyalayarak kullanabilirsiniz.

Şu an için temel klasör yapısı ve include işlemlerini vermektedir ancak ileri dönemlerde SASS yapısını da eklemeyi düşünüyorum. Bunun yanı sıra mobilde kullanılan menünün eksikliği ve JS içinde mobil menüyü çağırırken gereken çeşitli snippetlar da eklenerek burası daha güzel bir konuma getirilebilir. Bunun için bir to-do list oluşturulabilir veya bu kısım issue olarak açılabilir. Şimdilik ikisini de yapacağım.

Tek yapılması gereken repoyu içeri aktarmak.

```bash
gh repo clone furkantaskin/boilerplate
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

Verimi artırmak için mümkün olduğunca modül yapısı ve sayfaya özel yapı gözetilmektedir. Bu yüzden webpack ile Sass başta olmak üzere diğer kısımlarda da çeşitli ince noktalar bulunmaktadır.

### JS

JS dosyaları için Webpack kullanılmakta. Webpack başta ana dizindeki assets içinde bulunan src klasörüne bakacaktır. Sayfalara özel js varsa o zaman js dosyalarının pages klasöründe toplanması yeterlidir. 


#### Webpack

Ana dizinde bulunan `webpack.config.js` içinde sayfaya özel js oluşturmak için

```js

entry: {
        home: {
            import: ['./assets/src/common.js', './assets/src/pages/home.js'],
        },
    },
```

şeklinde sayfalara göre modül oluşturulamsı gerekir. Buradaki `common.js` dosyası tüm sayfalarda görülen ortak kodlar için bulunmaktadır.

Dev ortamındayken hızlı bir şekilde build almak için aşağıdaki kod kullanılabilir.

```bash
npm run watch
```

Bu kısım package.json içinde zaten tanımlı. Son build için `npm run build` kullanılabilir. Burada production modu ile build işlemi yapacaktır.

Webpack detaylı dokümantasyon için -> [Webpack](https://webpack.js.org/)

#### Photoswipe

Photoswipe kendi sitesinde de çalıştırma için bazı detaylar istemektedir. Özelleştirme dışında varsayılan temel kullanım için HTML/CSS ve JS içinde düzenleme gerekmektedir.

1. HTML içinde anchor elementlere `data-pswp-width` ve `data-pswp-height` dataları eklenmelidir. 
2. JS içinde modül tanımlaması yapılmalıdır
3. CSS dosyaları içeri eklenmelidir.

Birinci ve ikinci madde tek bir dosyada yapılabilir. Kullanılacak görseller farklı olacağı için burada JS ile resimlerin asıl ölçüleri gönderilebilir.


```js
document.querySelectorAll(".prodgallery a img").forEach((e) => {
  e.parentElement.dataset.pswpWidth = e.naturalWidth;
  e.parentElement.dataset.pswpHeight = e.naturalHeight;
});
```

Artık Photoswipe etkinleştirilebilir.

```js
const prodGallery = new PhotoSwipeLightbox({
    gallery: ".prodgallery",
    children: "a",
    pswpModule: () => import("photoswipe"),
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


### CSS (Sass ve Postcss)

Bootstrap SASS dosyası aktarılırken belirli importları kendim yaptım. Bu kısma dikkat edilmesi gerekir. Çünkü hata verebilir.

Ayrıca uyumluluk için save sonrası autoprefixer çalışmaktadır. Ben Jetbrains ile çalıştığım için configuration kısmına yeni bir shell script eklenebilir

```bash
npx postcss assets/css/pages/*.css --use=autoprefixer -m -r
```

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

## Kullanılan Teknolojiler

- webpack
- PostCSS (Autoprefixer)
