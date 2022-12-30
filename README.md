# Personal Boilerplate

<img src="https://img.shields.io/badge/Bootstrap-5.2.3-brightgreen" alt="Bootstrap"> <img src="https://img.shields.io/badge/Lightgallery-2.6.1-brightgreen" alt="Lightgallery"> <img src="https://img.shields.io/badge/Swiper-8.4.5-brightgreen" alt="Swiper"> <img src="https://img.shields.io/badge/webpack-5.75.0-blue" alt="Webpack">

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

JS dosyaları için Webpack kullanılmakta. Webpack başta ana dizindeki assets içinde bulunan src klasörüne bakacaktır. Sayfalara özel js varsa o zaman js dosyalarının pages klasöründe toplanması yeterlidir. 


Dev ortamındayken hızlı bir şekilde build almak için aşağıdaki kod kullanılabilir.
```bash
npm run watch
```

Bu kısım package.json içinde zaten tanımlı. Son build için `npm run build` kullanılabilir. Burada production modu ile build işlemi yapacaktır.


Bootstrap SASS dosyası aktarılırken belirli importları kendim yaptım. Bu kısma dikkat edilmesi gerekir. Çünkü hata verebilir.

Ayrıca uyumluluk için save sonrası autoprefixer çalışmaktadır. Ben Jetbrains ile çalıştığım için configuration kısmına yeni bir shell script eklenebilir

```bash
npx postcss assets/css/pages/*.css --use=autoprefixer -m -r
```

## Ek Kütüphaneler

- Bootstrap
- Lightgallery
- Swiper slider
- normalize.css

## Kullanılan Teknolojiler

- webpack
- PostCSS (Autoprefixer)
