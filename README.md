# YoSawer 🥤

Personal donation gateway buat kreator Indonesia.  
Pakai **Next.js 15 + ShadCN UI + Pakasir** → bisa terima **QRIS, Virtual Account, Alfamart/Indomaret, bahkan PayPal** dalam satu klik.  
Tanpa ribet, tanpa biaya bulanan, dana langsung masuk rekening lu.

---

🔗 **Demo:** [https://yosawer.vercel.app](https://yosawer.vercel.app)  
⭐ Dapatkan bintang gratis → klik ⭐ di repo ini kalau berguna

---

## 🚀 Deploy 1-Klik

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AhzamyCode/yosawer&env=NEXT_PUBLIC_PAKASIR_SLUG,PAKASIR_API_KEY,NEXT_PUBLIC_REDIRECT_URL)

---

## 📦 Install Lokal

1. **Clone**
   ```bash
   git clone https://github.com/AhzamyCode/yosawer.git
   cd yosawer

    Pasang dependencies
 ```bash
npm install
 ```
Duplikat .env.example → .env.local lalu isi
 ```bash
NEXT_PUBLIC_PAKASIR_SLUG=your_project_slug
PAKASIR_API_KEY=your_api_key
NEXT_PUBLIC_REDIRECT_URL=https://yourdomain.com/thanks
 ```
Jalankan
 ```bash
npm run dev
 ```
Buka

    http://localhost:3000

🗂️ Struktur Folder
 ```bash
yosawer/
├─ app/
│  ├─ api/donate/route.ts     # Buat payment URL ke Pakasir
│  ├─ api/webhook/route.ts    # Terima notifikasi dari Pakasir
│  ├─ page.tsx                # Form donasi
│  └─ thanks/page.tsx         # Halaman terima kasih
├─ components/
│  ├─ DonationForm.tsx
│  └─ ui/...                  # Komponen ShadCN
└─ next.config.js             # Konfigurasi hostname QR (optional)
 ```
🔑 Dapetin Kunci Pakasir

    Login / daftar → https://app.pakasir.com

    Buat Proyek baru

    Copy Slug & API Key → taro di .env.local

    Masukkan Webhook URL (https://yourdomain.com/api/webhook) di pengaturan proyek

🔁 Alur Donasi

    Supporter masukin nominal → klik Donasi

    Dilarikan ke halaman Pakasir (pilih QRIS, VA, Alfamart, dll)

    Selesai bayar → Pakasir kirim webhook → otomatis terverifikasi

    Supporter balik ke /thanks

🧪 Test Mode

    Aktifkan Sandbox di dashboard Pakasir

    Minimal Rp 10.000

    Pakai tombol Simulasi Pembayaran buat trigger webhook instan

🎨 Kustomisasi Cepet
File	Gunanya
```
app/page.tsx	Judul, deskripsi, meta SEO
components/DonationForm.tsx	Placeholder, label, warna tombol
app/thanks/page.tsx	Pesan terima kasih
public/favicon.ico	Ganti logo lu
📊 Contoh Webhook
```
Pakasir akan POST ke /api/webhook:
 ```bash
{
  "amount": 75000,
  "order_id": "YSW-1712345678900",
  "project": "your_slug",
  "status": "completed",
  "payment_method": "qris",
  "completed_at": "2024-09-10T08:07:02.819+07:00"
}
 ```
    Simpan ke DB, kirim notif Telegram, dsb – bebas.

📄 Lisensi

MIT – fork, jual, modifikasi silahkan.
💬 Butuh Bantuan?

Open issue atau mention @AhzamyCode

.
Kalau repo ini membantu, jangan lupa kasih ⭐ ya!
☕ Dukung Proyek Ini

Kalau lu suka proyek ini atau pengen support biar terus berkembang ☕
Silakan donasi lewat QRIS berikut:
👉 https://qris.zone.id/ahzamycode
