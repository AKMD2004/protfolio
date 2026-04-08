const projeler = [
{
isim:"E Ticaret Sitesi",
kategori:"web",
aciklama:"Online alışveriş sitesi. Kullanıcılar ürünleri görür ve ödeme yapar.",
resim:"eticaret.jpg.jpg"
},
{
isim:"Kişisel Blog Platformu",
kategori:"web",
aciklama:"Blog sitesi. Yazılar yayınlanır ve ziyaretçiler yorum yapar.",
resim:"plog.jpg.jpg"
},
{
isim:"Hava Durumu Uygulaması",
kategori:"mobil",
aciklama:"Hava durumu uygulaması. Konuma göre güncel bilgiler gösterir.",
resim:"hava.jpg.jpg"
},
{
isim:"Portföy Web Sitesi",
kategori:"web",
aciklama:"Portföy sitesi. Projeler ve yetenekler güzelce sergilenir.",
resim:"profile.jpg.jpeg"
},
{
isim:"Restoran Sipariş Uygulaması",
kategori:"mobil",
aciklama:"Restoran uygulaması. Menü incelenir ve sipariş verilir.",
resim:"not.jpg.jpg"
}
];

let aktifFiltre = "hepsi";

function projeleriGoster() {
    const alan = document.getElementById("projeAlani");
    alan.innerHTML = "";

    const filtrelenmisProjeler = aktifFiltre === "hepsi" ? projeler : projeler.filter(p => p.kategori === aktifFiltre);

    filtrelenmisProjeler.forEach(proje => {
        alan.innerHTML += `
        <div class="card">
            <img src="${proje.resim}" alt="${proje.isim}">
            <div class="card-icerik">
                <span class="kategori">${proje.kategori}</span>
                <h3>${proje.isim}</h3>
                <p>${proje.aciklama}</p>
            </div>
        </div>
        `;
    });
}

function bolumDegistir(bolum) {
document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
document.getElementById(bolum).classList.add('active');
document.querySelector(`[data-section="${bolum}"]`).classList.add('active');
}

function filtreDegistir(filtre) {
aktifFiltre = filtre;
document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
document.querySelector(`[data-filter="${filtre}"]`).classList.add('active');
projeleriGoster();
}

// Yazı makinesi efekti
function yaziMakinesiEfekti() {
    const yazi = "Akram Mohamed Saeed — Web geliştirici ve portföy tasarımcısı.";
    const hedefEleman = document.getElementById("typewriter");
    let i = 0;
    function yaz() {
        if (i < yazi.length) {
            hedefEleman.innerHTML += yazi.charAt(i);
            i++;
            setTimeout(yaz, 100);
        }
    }
    yaz();
}

// Yetenek çubuklarını canlandır
function yetenekAnimasyonu() {
const bars = document.querySelectorAll(".bar div");
bars.forEach((bar, index) => {
    const widths = ["90%", "85%", "80%", "70%"];
    bar.style.width = widths[index] || "60%";
});
}

// Özel imleç
function imlecTakibi() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return; // Telefonlarda özel imleç devre dışı bırakılır
    }

    const imlec = document.createElement("div");
    imlec.classList.add("cursor");
    document.body.appendChild(imlec);

    document.addEventListener("mousemove", (e) => {
        imlec.style.left = e.clientX + "px";
        imlec.style.top = e.clientY + "px";
    });

    document.addEventListener("mousedown", () => imlec.classList.add("hover"));
    document.addEventListener("mouseup", () => imlec.classList.remove("hover"));
}

// Form işleme
function formIslemi(e) {
    e.preventDefault();
    const formVerileri = new FormData(e.target);
    const girdi = Object.fromEntries(formVerileri);

    alert(`Teşekkürler ${girdi.ad}. Mesajınız alındı ve en kısa sürede incelenecektir.`);

    // Formu temizle
    e.target.reset();
}

// Navigasyon için yumuşak kaydırma
function yumusakKaydirma(hedef) {
const element = document.getElementById(hedef);
if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
}
}

window.onload = function(){
    bolumDegistir('hakkimda');
    projeleriGoster();
    yaziMakinesiEfekti();
    imlecTakibi();
    setTimeout(yetenekAnimasyonu, 1000); // Sayfa yüklendikten sonra canlandır

    // Form etkinlik dinleyicisi
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', formIslemi);
    }
};

// Navigasyon
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        bolumDegistir(section);
    });
});

// Filtre düğmeleri
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filtreDegistir(filter);
    });
});

// Gece Modu
document.getElementById("temaBtn").onclick = function() {
    document.body.classList.toggle("dark");
    document.querySelector("header").classList.toggle("dark");
    document.querySelector("footer").classList.toggle("dark");
    this.innerHTML = document.body.classList.contains("dark") ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

// Kaydırma animasyonları ekle
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});