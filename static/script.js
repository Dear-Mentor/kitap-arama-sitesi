document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.getElementById("search");
    const kitapListesi = document.querySelector(".kitap-listesi");
    const aramaFormu = document.querySelector(".arama-formu");


    function temizleMetin(metin) {
    if (!metin) return "-";
    let idx = metin.indexOf("http");
    if (idx > 0) return metin.substring(0, idx).trim();
    idx = metin.indexOf(";");
    if (idx > 0) return metin.substring(0, idx).trim();
    if (metin.length > 80) return metin.substring(0, 80) + "...";
    return metin;
    }   

    // Canlı arama için keyup kısmı
    searchInput.addEventListener("keyup", function () {
        const aranan = searchInput.value.trim();
        if (aranan.length === 0){
            kitapListesi.innerHTML = "";
            return;
        }
        kitapAra(aranan);
    });

    // Submit ile arama kısmı
    aramaFormu.addEventListener("submit", function(e){
        e.preventDefault();
        const aranan = searchInput.value.trim();
        if (aranan.length === 0) return;
        kitapAra(aranan);
    });

    // books.db ile kaydettiğim kitaplardan veri alma
    async function kitapAra(query) {
        const apiURL = `/api/books?search=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(apiURL);
            const kitaplar = await response.json();
            kitaplariGoster(kitaplar);
        } catch (err) {
            kitapListesi.innerHTML = "<p>Bir hata oluştu.</p>";
        }
    }

    function kitaplariGoster(kitaplar) {
        kitapListesi.innerHTML = ""; 
        if (!kitaplar || kitaplar.length === 0) {
            kitapListesi.innerHTML = "<p>Sonuç bulunamadı.</p>";
            return;
        }
        kitaplar.forEach(kitap => {
            // Kitap kapakları için URL
            const kapakUrl = kitap["Image-URL-L"] && kitap["Image-URL-L"].startsWith("http")
                ? kitap["Image-URL-L"]
                : "https://via.placeholder.com/128x180?text=No+Image";
            // Kitap kartları için url
            const kitapDiv = document.createElement("div");
            kitapDiv.className = "kitap-karti";
            
            kitapDiv.innerHTML = `
                <img src="${kapakUrl}" alt="Kapak" class="kitap-kapak">
                <h3>${temizleMetin(kitap["Book-Title"])}</h3>
                <p><b>Yazar:</b> ${temizleMetin(kitap["Book-Author"]) || "Bilinmiyor"}</p>
                <p><b>Yıl:</b> ${temizleMetin(kitap["Year-Of-Publication"]?.toString()) || "Bilinmiyor"}</p>
            `;

            // kapağa/karta dokununca detay modal' ı (pop up) açma
            kitapDiv.addEventListener("click", function () {
                kitapDetayiniGoster(kitap, kapakUrl);
            });
            kitapListesi.appendChild(kitapDiv);
        });
    }

    // Modalı kapatmak için
    const modal = document.getElementById("modal");
    // Hem x (çarpıya) hem arka plana tıklayınca modal kapanacak
    modal.addEventListener("click", function(e) {
        if (e.target.classList.contains("modal") || e.target.classList.contains("modal-kapat")) {
            modal.style.display = "none";
        }
    });

    // Modalı kapatma butonu için
    const modalKapat = document.querySelector(".modal-kapat");
    if (modalKapat) {
        modalKapat.onclick = () => { modal.style.display = "none"; }
    }
    window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; }
});

// Kitap detay modalını açma ve description çekme 
function kitapDetayiniGoster(kitap, kapakUrl) {
    const modal = document.getElementById("modal");
    const modalDetay = document.getElementById("modal-detay");

    let html = `
        <img src="${kapakUrl}" alt="Kapak" style="width:120px; height:170px; margin-bottom:12px; border-radius:6px;display:block;margin:auto;">
        <div id="kitap-ozet" style="margin-top:1em; min-height:40px;"><em>Yükleniyor...</em></div>
    `;

    modalDetay.innerHTML = html;
    modal.style.display = "flex";

    // Description kısmını open library API'den ISBN ile çekme
    const isbn = kitap["ISBN"];
    if (isbn && isbn.length > 5) {
        fetch(`https://openlibrary.org/isbn/${isbn}.json`)
            .then(res => res.json())
            .then(data => {
                let ozet = "-";
                if (data.description) {
                    if (typeof data.description === "string") ozet = data.description;
                    else if (typeof data.description === "object" && data.description.value) ozet = data.description.value;
                }
                document.getElementById("kitap-ozet").innerHTML =
                    `<b>Konu:</b><br><span style="font-size: 1rem; color:#444;">${ozet}</span>`;
            })
            .catch(() => {
                document.getElementById("kitap-ozet").innerHTML = "<b>Konu:</b> Bulunamadı";
            });
    } else {
        document.getElementById("kitap-ozet").innerHTML = "<b>Konu:</b> Bulunamadı";
    }
}

