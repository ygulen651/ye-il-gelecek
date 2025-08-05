# Yeşil Gelecek - Ağaçlandırma Bağış Platformu

Modern ve kullanıcı dostu bir ağaçlandırma bağış web sitesi. Next.js 14, TypeScript, TailwindCSS ve Prisma kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Modern Tasarım**: Yeşil tema ile doğa dostu tasarım
- **Responsive**: Mobil ve masaüstü uyumlu
- **Bağış Sistemi**: Güvenli bağış formu ve IBAN ödemesi
- **E-posta Sertifikası**: Bağış sonrası otomatik sertifika gönderimi
- **İstatistikler**: Gerçek zamanlı bağış ve ağaç istatistikleri
- **STK Yönetimi**: Çoklu STK desteği ve logo slider
- **Filtreleme**: Bağışçılar sayfasında gelişmiş filtreleme
- **İletişim Formu**: Admin'e mesaj gönderme sistemi

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL, Prisma ORM
- **Email**: Nodemailer
- **Icons**: Lucide React
- **Styling**: TailwindCSS

## 📋 Kurulum

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd yesil-gelecek
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın**
```bash
# .env dosyası oluşturun
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yesil_gelecek"

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yesilgelecek.org
```

4. **Veritabanını kurun**
```bash
# Prisma migration'ları çalıştırın
npx prisma migrate dev

# Seed verilerini ekleyin (opsiyonel)
npx prisma db seed
```

5. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── donations/route.ts
│   │   ├── donors/route.ts
│   │   └── ngos/route.ts
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── contributors/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── DonationForm.tsx
│   ├── DonorCard.tsx
│   ├── Header.tsx
│   ├── LogoSlider.tsx
│   └── StatsCard.tsx
└── lib/
    └── prisma.ts
```

## 🗄️ Veritabanı Şeması

### Donor Model
- `id`: Otomatik artan ID
- `fullName`: Bağışçı adı
- `email`: E-posta adresi
- `phone`: Telefon numarası
- `ngoId`: STK ID'si
- `amount`: Bağış miktarı
- `treeCount`: Dikilen ağaç sayısı
- `createdAt`: Bağış tarihi

### NGO Model
- `id`: Otomatik artan ID
- `name`: STK adı
- `logoUrl`: Logo URL'i
- `donors`: Bağışçılar (ilişki)

## 📧 E-posta Konfigürasyonu

Gmail kullanıyorsanız:
1. Gmail hesabınızda 2FA'yı etkinleştirin
2. App Password oluşturun
3. SMTP_PASS olarak app password'ü kullanın

## 🚀 Deployment

### Vercel (Önerilen)
```bash
npm run build
```

### Docker
```bash
docker build -t yesil-gelecek .
docker run -p 3000:3000 yesil-gelecek
```

## 📊 Özellikler Detayı

### Ana Sayfa
- Hero section ile misyon tanıtımı
- Gerçek zamanlı istatistikler
- Bugünün bağışçıları
- Bağış formu
- STK logo slider'ı

### Bağışçılar Sayfası
- Tüm bağışçıların listesi
- Ad, STK ve tarih filtreleme
- Arama özelliği

### Hakkımızda Sayfası
- Misyon ve değerler
- Nasıl çalışıyoruz
- Etki alanları

### İletişim Sayfası
- İletişim formu
- İletişim bilgileri
- SSS bölümü

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **E-posta**: info@yesilgelecek.org
- **Telefon**: +90 212 123 45 67
- **Adres**: Çevre Mahallesi, Ekoloji Sokak No:1, 34000 İstanbul

---

**Yeşil Gelecek** - Gelecek nesillere yaşanabilir bir dünya bırakma misyonumuz
