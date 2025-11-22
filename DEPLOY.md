# 🚀 Panduan Deploy ke Vercel

## Framework yang Digunakan

Web ini menggunakan **Next.js 15** (React Framework) yang sangat cocok dan mudah untuk deploy ke **Vercel**.

### Tech Stack:

- **Next.js 15.5.6** - React Framework
- **React 19.1.0** - JavaScript Library
- **TypeScript 5** - Type Safety
- **Tailwind CSS 4** - Styling
- **ShadCN UI** - UI Components
- **Pakasir** - Payment Gateway

---

## 📋 Persiapan Sebelum Deploy

### 1. Pastikan Code Sudah di GitHub

```bash
# Cek remote repository
git remote -v

# Pastikan code sudah di-push
git push origin main
```

### 2. Siapkan Environment Variables

Siapkan 3 environment variables:

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `NEXT_PUBLIC_PAKASIR_SLUG` | Project Slug dari Pakasir | `my-donation-project` |
| `PAKASIR_API_KEY` | API Key dari Pakasir | `pk_xxxxxxxxxxxxx` |
| `NEXT_PUBLIC_REDIRECT_URL` | URL redirect setelah pembayaran | `https://yourdomain.vercel.app/thanks` |

---

## 🚀 Cara Deploy ke Vercel

### Opsi 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Login ke Vercel

1. Buka [https://vercel.com](https://vercel.com)
2. Klik **"Sign Up"** atau **"Log In"**
3. Login dengan GitHub account

#### Step 2: Import Project

1. Klik **"Add New..."** → **"Project"**
2. Pilih repository **`jundy779/PGPakasir`**
3. Klik **"Import"**

#### Step 3: Konfigurasi Project

1. **Project Name**: Pilih nama (contoh: `pgpakasir` atau `donation-gateway`)
2. **Framework Preset**: Otomatis terdeteksi **Next.js** ✅
3. **Root Directory**: Biarkan kosong (atau `./` jika perlu)
4. **Build Command**: Otomatis `npm run build` ✅
5. **Output Directory**: Otomatis `.next` ✅
6. **Install Command**: Otomatis `npm install` ✅

#### Step 4: Set Environment Variables

Klik **"Environment Variables"** dan tambahkan:

```bash
# Tambahkan satu per satu:
NEXT_PUBLIC_PAKASIR_SLUG = your_project_slug
PAKASIR_API_KEY = your_api_key
NEXT_PUBLIC_REDIRECT_URL = https://your-domain.vercel.app/thanks
```

**Catatan:** 
- Untuk `NEXT_PUBLIC_REDIRECT_URL`, ganti `your-domain` dengan domain Vercel yang akan diberikan (misal: `pgpakasir.vercel.app` atau custom domain)

#### Step 5: Deploy!

1. Klik **"Deploy"**
2. Tunggu proses build selesai (biasanya 1-3 menit)
3. Setelah selesai, klik **"Visit"** untuk melihat website

#### Step 6: Update Redirect URL (Penting!)

Setelah deploy selesai:

1. **Copy URL Vercel** (contoh: `https://pgpakasir.vercel.app`)
2. **Update Environment Variable** di Vercel:
   - Edit `NEXT_PUBLIC_REDIRECT_URL` = `https://pgpakasir.vercel.app/thanks`
3. **Redeploy** (atau tunggu auto-redeploy setelah update env)

---

### Opsi 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
# atau
npm i -g vercel
```

#### Step 2: Login ke Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
# Deploy ke preview
vercel

# Deploy ke production
vercel --prod
```

#### Step 4: Set Environment Variables

```bash
# Set environment variables
vercel env add NEXT_PUBLIC_PAKASIR_SLUG
vercel env add PAKASIR_API_KEY
vercel env add NEXT_PUBLIC_REDIRECT_URL

# Atau via dashboard lebih mudah
```

---

### Opsi 3: Deploy 1-Klik via GitHub

1. Klik tombol **"Deploy to Vercel"** di README.md
2. Connect GitHub account
3. Set Environment Variables
4. Deploy!

---

## ⚙️ Konfigurasi Vercel

### Build Settings (Otomatis)

Vercel otomatis detect Next.js, jadi tidak perlu setting manual:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Environment Variables

Pastikan semua environment variables sudah di-set di **Settings → Environment Variables**:

```bash
NEXT_PUBLIC_PAKASIR_SLUG=your_project_slug
PAKASIR_API_KEY=your_api_key
NEXT_PUBLIC_REDIRECT_URL=https://your-domain.vercel.app/thanks
```

**Untuk Production, Preview, dan Development:**
- Centang semua checkbox: ✅ Production, ✅ Preview, ✅ Development

---

## 🔧 Set Webhook URL di Pakasir

Setelah deploy ke Vercel:

1. **Copy URL Production** (contoh: `https://pgpakasir.vercel.app`)
2. **Login ke Pakasir Dashboard**: [https://app.pakasir.com](https://app.pakasir.com)
3. **Pilih Proyek** → **Pengaturan** → **Webhook URL**
4. **Set Webhook URL**: `https://pgpakasir.vercel.app/api/webhook`
5. **Save**

---

## ✅ Verifikasi Deploy

### 1. Test Website

1. Buka URL Vercel (contoh: `https://pgpakasir.vercel.app`)
2. Pastikan form donasi muncul
3. Test isi form dan klik donasi

### 2. Test API

1. Test `/api/donate` endpoint
2. Test `/api/webhook` endpoint (via Pakasir sandbox)

### 3. Test Webhook

1. Aktifkan **Sandbox Mode** di Pakasir
2. Lakukan test payment
3. Cek logs di Vercel dashboard untuk webhook

---

## 🔄 Update & Redeploy

Setelah push code baru ke GitHub:

### Otomatis (Recommended)

Vercel otomatis **auto-deploy** setiap kali push ke main branch! ✅

### Manual Redeploy

1. Buka Vercel Dashboard
2. Pilih project
3. Klik **"Redeploy"** di deployment terbaru

---

## 🌐 Custom Domain

### Add Custom Domain

1. Buka Vercel Dashboard → Project → **Settings** → **Domains**
2. Klik **"Add Domain"**
3. Masukkan domain (contoh: `donasi.kreator.com`)
4. Follow instruksi untuk set DNS records

### Update Environment Variables

Setelah custom domain aktif:

1. Update `NEXT_PUBLIC_REDIRECT_URL` = `https://donasi.kreator.com/thanks`
2. Redeploy project
3. Update Webhook URL di Pakasir = `https://donasi.kreator.com/api/webhook`

---

## 🐛 Troubleshooting

### Error: Build Failed

**Solusi:**
- Cek logs di Vercel dashboard
- Pastikan semua dependencies ada di `package.json`
- Pastikan Node.js version sesuai (Vercel otomatis pakai 18.x atau 20.x)

### Error: Environment Variables Missing

**Solusi:**
- Pastikan semua env vars sudah di-set di Vercel dashboard
- Redeploy setelah set environment variables

### Error: Webhook tidak menerima request

**Solusi:**
- Pastikan Webhook URL di Pakasir sudah benar
- Cek logs di Vercel dashboard untuk error
- Test webhook dengan Pakasir sandbox

### Error: Redirect URL tidak benar

**Solusi:**
- Update `NEXT_PUBLIC_REDIRECT_URL` dengan URL Vercel yang benar
- Redeploy setelah update

---

## 📊 Monitoring

### Vercel Dashboard Features

- **Analytics** - Track visitors & performance
- **Logs** - Monitor errors & requests
- **Functions** - Monitor API routes
- **Speed Insights** - Performance metrics

### View Logs

1. Buka Vercel Dashboard → Project
2. Klik tab **"Logs"**
3. Pilih deployment untuk melihat logs

---

## 🎉 Selesai!

Website sudah online di Vercel! 🚀

**Next Steps:**
1. ✅ Test semua fitur
2. ✅ Set custom domain (opsional)
3. ✅ Setup monitoring & analytics
4. ✅ Share URL ke user!

---

## 📚 Resources

- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Pakasir Docs**: [https://docs.pakasir.com](https://docs.pakasir.com)

---

**Happy Deploying!** 🎊

