# 🔔 Panduan Setup Webhook URL

## 📍 Di Mana Set Webhook URL?

**Webhook URL di-set di PAKASIR Dashboard**, bukan di Vercel!

Vercel hanya menyediakan **URL untuk aplikasi** yang sudah di-deploy. URL inilah yang nanti di-set sebagai Webhook URL di Pakasir.

---

## 🔄 Alur Setup Webhook URL

```
1. Deploy App ke Vercel
   ↓
2. Dapatkan URL Vercel (contoh: https://pgpakasir.vercel.app)
   ↓
3. Set Webhook URL di Pakasir Dashboard
   → https://pgpakasir.vercel.app/api/webhook
   ↓
4. Pakasir akan POST ke URL tersebut saat ada payment
```

---

## 📝 Step-by-Step Setup Webhook URL

### Step 1: Deploy ke Vercel

1. **Deploy aplikasi** ke Vercel (lihat panduan di `DEPLOY.md`)
2. **Tunggu build selesai**
3. **Copy URL Vercel** yang diberikan (contoh: `https://pgpakasir.vercel.app`)

**Contoh URL Vercel:**
- `https://pgpakasir.vercel.app`
- `https://pgpakasir-abc123.vercel.app`
- `https://your-custom-domain.com` (jika pakai custom domain)

### Step 2: Buat Webhook URL

Webhook URL = URL Vercel + `/api/webhook`

**Contoh:**
- Jika URL Vercel = `https://pgpakasir.vercel.app`
- Maka Webhook URL = `https://pgpakasir.vercel.app/api/webhook`

### Step 3: Set Webhook URL di Pakasir Dashboard

1. **Login ke Pakasir Dashboard**
   - Buka [https://app.pakasir.com](https://app.pakasir.com)
   - Login dengan akun Anda

2. **Pilih Proyek**
   - Klik proyek yang ingin di-setup webhook

3. **Buka Pengaturan**
   - Klik menu **"Pengaturan"** atau **"Settings"**
   - Atau klik **"Webhook"** di sidebar

4. **Set Webhook URL**
   - Cari field **"Webhook URL"** atau **"Callback URL"**
   - Masukkan: `https://pgpakasir.vercel.app/api/webhook`
   - Ganti `pgpakasir.vercel.app` dengan URL Vercel Anda

5. **Save**
   - Klik **"Simpan"** atau **"Save"**

### Step 4: Test Webhook

1. **Aktifkan Sandbox Mode** di Pakasir (untuk testing)
2. **Lakukan test payment** melalui aplikasi
3. **Cek logs di Vercel** untuk melihat webhook request:
   - Buka Vercel Dashboard → Project → Tab **"Logs"**
   - Cari log dengan keyword "webhook"

---

## 🧪 Test Webhook Lokal (Development)

Untuk test webhook di localhost sebelum deploy:

### Opsi 1: Pakai ngrok (Recommended)

1. **Install ngrok**
   ```bash
   npm install -g ngrok
   # atau download di https://ngrok.com/download
   ```

2. **Jalankan ngrok**
   ```bash
   ngrok http 3000
   ```

3. **Copy URL ngrok** (contoh: `https://abc123.ngrok.io`)

4. **Set Webhook URL di Pakasir**
   - URL: `https://abc123.ngrok.io/api/webhook`

5. **Test!**
   - Setiap request ke localhost:3000 akan di-forward ke ngrok URL
   - Pakasir bisa kirim webhook ke URL ngrok
   - ngrok akan forward ke localhost:3000

### Opsi 2: Pakai Vercel Preview URL

1. **Push code ke GitHub** (branch baru atau PR)
2. **Vercel otomatis buat Preview URL**
3. **Copy Preview URL** (contoh: `https://pgpakasir-git-main-abc123.vercel.app`)
4. **Set Webhook URL di Pakasir** = `https://pgpakasir-git-main-abc123.vercel.app/api/webhook`

---

## 🔍 Cek Webhook Endpoint

Webhook endpoint ada di: **`app/api/webhook/route.ts`**

Endpoint menerima **POST request** dari Pakasir dengan format:

```json
{
  "amount": 75000,
  "order_id": "YSW-1712345678900",
  "project": "your_slug",
  "status": "completed",
  "payment_method": "qris",
  "completed_at": "2024-09-10T08:07:02.819+07:00"
}
```

---

## ✅ Verifikasi Webhook Berfungsi

### Cara 1: Cek Logs di Vercel

1. Buka **Vercel Dashboard** → Project → Tab **"Logs"**
2. Filter dengan keyword **"webhook"** atau **"/api/webhook"**
3. Cek apakah ada request dari Pakasir

### Cara 2: Test via Pakasir Sandbox

1. **Aktifkan Sandbox Mode** di Pakasir
2. **Lakukan test payment** di aplikasi
3. **Gunakan "Simulasi Pembayaran"** di Pakasir dashboard
4. **Cek logs** di Vercel untuk webhook request

### Cara 3: Cek Response Code

Webhook endpoint akan return:
- **200 OK** jika berhasil
- **400 Bad Request** jika payload tidak valid
- **500 Internal Server Error** jika ada error

---

## 🐛 Troubleshooting

### Webhook tidak menerima request

**Kemungkinan masalah:**
1. **Webhook URL salah**
   - Pastikan format: `https://your-domain.vercel.app/api/webhook`
   - Pastikan tidak ada typo

2. **SSL/HTTPS error**
   - Pastikan pakai `https://` bukan `http://`
   - Vercel otomatis pakai SSL certificate

3. **Firewall atau security**
   - Cek apakah Vercel block request dari Pakasir
   - Biasanya tidak ada masalah dengan Vercel

**Solusi:**
- Cek logs di Vercel untuk error
- Test webhook URL dengan curl:
  ```bash
  curl -X POST https://your-domain.vercel.app/api/webhook \
    -H "Content-Type: application/json" \
    -d '{"test": "data"}'
  ```

### Webhook URL berubah setelah redeploy

**Masalah:** URL Vercel berubah setiap kali deploy (jika pakai auto-generated URL)

**Solusi:**
1. **Pakai Custom Domain** (recommended)
   - Set custom domain di Vercel
   - URL tidak akan berubah: `https://your-domain.com/api/webhook`

2. **Atau update Webhook URL** setiap kali URL berubah
   - Copy URL Vercel baru
   - Update di Pakasir dashboard

### Webhook tidak trigger

**Kemungkinan:**
1. **Payment belum completed**
   - Webhook hanya kirim saat status `completed`
   - Cek status payment di Pakasir dashboard

2. **Webhook URL tidak di-set**
   - Pastikan sudah di-set di Pakasir dashboard
   - Save setelah update

**Solusi:**
- Test dengan Pakasir sandbox
- Gunakan "Simulasi Pembayaran" untuk trigger webhook manual

---

## 📊 Monitor Webhook

### View Logs di Vercel

1. Buka **Vercel Dashboard** → Project
2. Klik tab **"Logs"**
3. Filter dengan:
   - Path: `/api/webhook`
   - Method: `POST`
   - Status: `200` (success) atau error codes

### View Logs di Pakasir

1. Buka **Pakasir Dashboard** → Project
2. Klik **"Webhooks"** atau **"Logs"**
3. Lihat history webhook calls
4. Cek status: Success, Failed, atau Pending

---

## 🔒 Security Best Practices

### 1. Webhook Signature Verification (TODO)

Saat ini webhook belum verify signature. Untuk production, disarankan implementasi signature verification:

```typescript
// app/api/webhook/route.ts
const signature = req.headers.get("x-pakasir-signature");
if (!verifySignature(body, signature)) {
  return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
}
```

### 2. Validate Project Slug

Sudah ada validasi project slug di webhook:
```typescript
const expectedSlug = process.env.NEXT_PUBLIC_PAKASIR_SLUG;
if (expectedSlug && project && project !== expectedSlug) {
  console.warn(`Webhook project mismatch`);
}
```

### 3. Rate Limiting

Vercel Functions otomatis ada rate limiting. Untuk rate limit tambahan, bisa pakai middleware.

---

## 📝 Checklist Setup Webhook

- [ ] Deploy aplikasi ke Vercel
- [ ] Copy URL Vercel (contoh: `https://pgpakasir.vercel.app`)
- [ ] Buat Webhook URL: `https://pgpakasir.vercel.app/api/webhook`
- [ ] Login ke Pakasir Dashboard
- [ ] Pilih Proyek
- [ ] Buka Pengaturan → Webhook
- [ ] Set Webhook URL
- [ ] Save
- [ ] Test dengan Pakasir Sandbox
- [ ] Cek logs di Vercel untuk verifikasi
- [ ] Update `NEXT_PUBLIC_REDIRECT_URL` jika perlu

---

## 🎉 Selesai!

Webhook sudah di-setup dan siap menerima notifikasi dari Pakasir! 🚀

**Next Steps:**
1. ✅ Test webhook dengan sandbox mode
2. ✅ Monitor logs untuk memastikan webhook berfungsi
3. ✅ Implementasi database storage (jika perlu)
4. ✅ Implementasi notification system (jika perlu)

---

## 📚 Resources

- **Pakasir Docs**: [https://docs.pakasir.com](https://docs.pakasir.com)
- **Vercel Functions Docs**: [https://vercel.com/docs/functions](https://vercel.com/docs/functions)
- **Next.js API Routes**: [https://nextjs.org/docs/app/building-your-application/routing/route-handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Happy Webhooking!** 🔔

