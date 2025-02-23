// 🎵 Varsayılan Kit
let currentKit = "kit_a";

// 🎶 Ses dosyalarını güncelleyen fonksiyon
function updateSounds() {
    document.querySelectorAll("audio").forEach(audio => {
        const key = audio.getAttribute("data-key");
        audio.src = `sounds/${currentKit}/${getSoundName(key)}.wav`;
    });
}

// 🔄 Ses dosyası isimlendirme haritası
function getSoundName(key) {
    const soundMap = {
        "65": "clap",
        "83": "hihat",
        "68": "kick",
        "70": "openhat",
        "71": "boom",
        "72": "ride",
        "74": "snare",
        "75": "tom",
        "76": "tink"
    };
    return soundMap[key] || "clap";
}

// 🎵 Tuşa basınca sesi çal
function playSound(e) {
    const keyCode = e.keyCode || e.target.getAttribute("data-key");
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) return;

    // 🎧 Tarayıcı güvenliği nedeniyle önce kullanıcı etkileşimi gereklidir
    audio.currentTime = 0;
    audio.volume = 1.0;
    audio.play().catch(err => console.log("Ses çalınamadı:", err));

    key.classList.add("playing");
}

// 🛠️ Geçiş animasyonunu kaldır
function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

// 🎚 Kit değişim fonksiyonu
function changeKit(e) {
    currentKit = e.target.getAttribute("data-kit");

    // Aktif butonu belirle
    document.querySelectorAll(".kit-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    updateSounds();
}

// 🖱️ Mouse ile butona tıklayınca da ses çalsın
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", playSound);
    key.addEventListener("transitionend", removeTransition);
});

// 🎧 Klavye ile tuşlara basınca ses çalsın
window.addEventListener("keydown", playSound);

// 🎛 Kit butonlarına event listener ekle
document.querySelectorAll(".kit-btn").forEach(btn => btn.addEventListener("click", changeKit));

// Sayfa yüklendiğinde varsayılan sesleri yükle
updateSounds();
