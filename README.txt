WEB TABANLI KİTAP ARAMA SİTESİ (LOOKBOOK)
------------------------------------

Bu proje, temel kitap arama, listeleme ve detay görüntüleme özelliklerine sahip basit bir web uygulamasıdır.

İÇERİK
------
- Python (Flask) tabanlı bir backend
- SQLite veritabanında 10.000+ kitap kaydı
- Modern HTML, CSS ve JavaScript arayüzü
- API üzerinden kitap arama ve kart gösterimi
- Kitap detayında açıklama (Open Library API'den anlık çekilir)

KULLANIM
--------
https://lookbook-8beo.onrender.com/ domain adresinden siteye ulaşabilirsiniz

Dosyalardan açmak için:

1. templates/index.html dosyasına tıklayarak siteyi açın.

2. Arama kutusuna ingilizce kitap/yazar yazıp arama yapabilirsiniz.

3. Kitap kartına tıklayarak açıklama detayını görebilirsiniz.

KISACA DOSYA YAPISI
-------------------
- `app.py`            → Flask backend kodu
- `books.db`          → SQLite kitap veritabanı
- `index.html`        → Ana sayfa HTML dosyası
- `static/`           → CSS, JS ve görseller
- `style.css`, `global.css`  → Stil dosyaları
- `script.js`                → JavaScript kodları

GELİŞTİRİCİ NOTLARI
-------------------
- `books.db` sadece temel kitap bilgilerini içerir. Açıklamalar, ISBN üzerinden canlı API'den alınır.

- Proje tamamen açık kaynak ve geliştirilmeye açıktır.

Sorularınız ve geri bildirimleriniz için: [mentor.the.mentor@gmail.com]

BAŞARILAR VE İYİ KULLANIMLAR!
