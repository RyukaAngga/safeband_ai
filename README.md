# SafeBand AI — Smart Wearable Assistant & Safety Companion

🌐 **Live Demo Website:** [https://safebandai.netlify.app](https://safebandai.netlify.app)

---

## 🛠️ Tech Stack & Hardware Specs

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesizer-FF6C37?style=for-the-badge)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![ESP32-C3](https://img.shields.io/badge/ESP32--C3-RISC--V-E7352C?style=for-the-badge&logo=espressif&logoColor=white)
![Bluetooth LE](https://img.shields.io/badge/BLE-5.0_Ultra_Low_Power-0082FC?style=for-the-badge&logo=bluetooth&logoColor=white)

---

## 📖 Deskripsi Proyek

**SafeBand AI** adalah inovasi gelang pintar berbasis **Artificial Intelligence (AI)** dan **Internet of Things (IoT)** yang menghadirkan interaksi tanpa layar (screenless interaction) melalui sentuhan, getaran haptik, dan respons suara cerdas.

Dengan memanfaatkan smartphone sebagai pusat komputasi AI utama via Bluetooth Low Energy (BLE 5.0), mikrokontroler ESP32 pada gelang tetap bekerja secara ultra-hemat daya (deep sleep optimization), ringan, dan responsif tanpa menguras daya baterai.

---

## 🌟 Fitur Utama & Pengalaman Pengguna

### 🤖 1. AI Experience
* **Single Touch AI**: Satu sentuhan pada sensor kapasitif untuk langsung mengaktifkan sesi AI Voice Assistant via mikrofon ponsel tanpa perlu membuka layar smartphone.
* **Double Tap Recording**: Dua kali ketukan cepat (double tap) untuk mencatat percakapan/ide penting. Audio direkam oleh ponsel dan dirangkum otomatis oleh AI menjadi *Meeting Summary*, *Key Points*, dan *Todo List*.
* **AI Conversation**: Bicara secara natural dengan AI yang memahami konteks percakapan untuk menjawab pertanyaan seputar jadwal, cuaca, pengingat, dan catatan.

### 🛡️ 2. Safety Experience
* **SOS Emergency**: Tekan tahan (Hold 1.5 detik) memicu countdown darurat 5 detik dengan getaran konfirmasi. Jika tidak dibatalkan, gelang otomatis mengirimkan lokasi GPS real-time, status baterai, dan ID perangkat ke kontak darurat.
* **Fall Detection**: Sensor IMU BMI160 membaca akselerasi dan giroskop. Ketika terdeteksi benturan keras (*sudden impact*) diikuti perubahan orientasi tanpa gerakan lanjutan, sistem otomatis menyulut prosedur SOS.
* **Fake Call**: Satu kali sentuhan rahasia untuk memicu panggilan telepon masuk palsu di smartphone guna membantu pengguna keluar dari situasi canggung secara alami.

### ⚡ 3. Productivity & Device Experience
* **Smart Reminder**: Pengingat kalender disinkronkan dari smartphone ke gelang melalui getaran haptik unik dan tampilan di layar OLED.
* **Notification Filter**: AI menyaring notifikasi yang masuk — hanya notifikasi berprioritas tinggi yang diteruskan ke gelang.
* **Quick Notes**: Rekam ide cepat dengan 2-Click yang langsung diubah menjadi teks dan disimpan di cloud.
* **Battery & Power Optimization**: ESP32 aktif hanya beberapa ratus milidetik saat interaksi terjadi, kemudian kembali ke *deep sleep* sehingga baterai bertahan lebih dari 24 jam.

---

## 🛒 Daftar Komponen IoT & Estimasi Modal / Budget BOM

Untuk membangun prototipe fisik **SafeBand AI**, berikut adalah daftar komponen perangkat keras (Hardware Bill of Materials) yang dibutuhkan beserta perkiraan modal pembelian di marketplace (Shopee / Tokopedia):

| No | Nama Komponen IoT | Fungsi & Spesifikasi | Estimasi Harga (IDR) |
|---|---|---|---|
| 1 | **ESP32-C3 SuperMini** | Mikrokontroler utama 32-bit RISC-V dengan Wi-Fi + BLE 5.0 built-in, bentuk ultra-small | Rp 35.000 |
| 2 | **Sensor IMU BMI160 / MPU6050** | Accelerometer + Gyroscope 6-axis untuk fitur Fall Detection & gestur gerakan | Rp 18.000 |
| 3 | **Sensor Touch Kapasitif TTP223** | Module touch sensor kapasitif ultra-kecil untuk deteksi Single Touch / Double Tap | Rp 3.500 |
| 4 | **Layar OLED 0.96" I2C SSD1306** | Layar OLED persegi panjang 128x64 piksel hemat energi | Rp 28.000 |
| 5 | **Baterai LiPo 3.7V 300mAh (Kecil)** | Sumber daya isi ulang rechargeable ultra-compact | Rp 22.000 |
| 6 | **Modul Charger TP4056 USB-C** | Modul pengisian daya baterai Lithium dengan proteksi overheat/overcharge | Rp 4.000 |
| 7 | **Haptic Vibration Motor Disc 10mm** | Motor getar koin 3V untuk umpan balik getaran haptik ritmis | Rp 5.000 |
| 8 | **Earphone TWS Bluetooth (Micro/Standard)** | Penerima output suara Text-to-Speech (TTS) dari AI smartphone | Rp 45.000 |
| 9 | **Case 3D Printed & Strap Silicone** | Casing enclosure berbentuk rounded persegi panjang + tali jam tangan TPU | Rp 25.000 |
| 10 | **Kabel Jumper, Resistor, & Saklar SMD** | Komponen pasif pelengkap & saklar daya mikro ON/OFF | Rp 10.000 |
| **TOTAL** | **ESTIMASI MODAL KOMPONEN PROTOTIPE** | **Investasi Hardware Prototipe Fisik** | **± Rp 195.500** |

---

## 🏗️ Arsitektur Sistem & Alur Kerja Teknis

```text
               SafeBand AI Hardware (Wristband)
                            │
                            ▼
              Capacitive Touch / IMU BMI160 Sensor
                            │ (Interrupt signal)
                            ▼
                 ESP32-C3 Microcontroller
                            │
               Bluetooth Low Energy (BLE 5.0)
                            │
                            ▼
                Smartphone Companion App
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
  Speech-to-Text      Device System APIs  Priority AI Filter
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ▼
                 Cloud AI / LLM Service
                            │
                   Context & Reasoning
                            ▼
                   AI Response (Text)
                            │
                  Text-to-Speech (TTS)
                            │
                            ▼
             Earphone Audio + Haptic Feedback
```

---

## 💻 Panduan Jalankan Proyek di Lokal

### Prasyarat
- **Node.js**: v18.0.0 atau lebih baru
- **npm**: v9.0.0 atau lebih baru

### Langkah Instalasi
```bash
# 1. Clone repository
git clone https://github.com/RyukaAngga/safeband_ai.git

# 2. Masuk ke direktori proyek
cd safeband_ai

# 3. Install semua dependencies
npm install

# 4. Jalankan dev server lokal
npm run dev
```

Buka browser di `http://localhost:5173`.

---

## 🚀 Panduan Build & Deploy (Netlify)

### Build untuk Produksi
```bash
npm run build
```
Hasil kompilasi akan berada di direktori `dist/`.

### Konfigurasi Deployment Netlify
Proyek ini sudah dilengkapi file `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi MIT.
