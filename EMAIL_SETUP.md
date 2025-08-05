# 📧 E-posta Ayarları Kılavuzu

Bu kılavuz, Yeşil Gelecek projesinde bağış yapan kullanıcılara otomatik e-posta gönderme işlemini nasıl yapılandıracağınızı açıklar.

## 🚀 Hızlı Kurulum

### 1. 🎯 Test Ortamı (En Kolay - Hemen Çalışır!)
**Hiçbir ayar gerektirmez!** Proje otomatik olarak test e-postaları gönderir.

```bash
npm run dev
# Bir bağış yapın ve console'da e-posta önizleme linkini görün
```

### 2. Gmail ile E-posta Gönderme (Production)

#### Adım 1: Gmail App Password Oluşturma
1. [Google Hesabınıza](https://myaccount.google.com/) gidin
2. "Güvenlik" sekmesine tıklayın
3. "2 Adımlı Doğrulama"yı etkinleştirin
4. "Uygulama Şifreleri"ne tıklayın
5. "Diğer" seçeneğini seçin ve bir isim verin (örn: "Yeşil Gelecek")
6. Oluşturulan 16 haneli şifreyi kopyalayın

#### Adım 2: Ortam Değişkenlerini Ayarlama
Proje ana dizininde `.env.local` dosyası oluşturun:

```env
# Gmail SMTP Ayarları
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
```

### 2. Alternatif: Resend Kullanma

#### Adım 1: Resend Hesabı Oluşturma
1. [Resend.com](https://resend.com)'a gidin
2. Ücretsiz hesap oluşturun
3. API anahtarınızı alın

#### Adım 2: Ortam Değişkenlerini Ayarlama
```env
RESEND_API_KEY=your-resend-api-key
```

## 🔧 Test Etme

### 🎯 Test Ortamı (Önerilen)
```bash
# Projeyi başlatın
npm run dev

# Bir bağış yapın ve console'da şu mesajları görmelisiniz:
# "Test hesabı oluşturuldu: xxx@ethereal.email"
# "SMTP bağlantısı başarılı"
# "E-posta başarıyla gönderildi: <message-id>"
# "📧 E-posta önizleme linki: https://ethereal.email/message/xxx"

# Önizleme linkine tıklayarak e-postayı görüntüleyebilirsiniz!
```

### Gmail SMTP Test (Production)

### E-posta Şablonu
Gönderilen e-posta şunları içerir:
- 🌱 Güzel bir başlık
- 📋 Bağış detayları
- 🌍 Etki mesajı
- 🎨 Modern tasarım

## 🛠️ Sorun Giderme

### Yaygın Hatalar

1. **"Authentication failed"**
   - Gmail App Password'ün doğru olduğundan emin olun
   - 2 Adımlı Doğrulama'nın etkin olduğunu kontrol edin

2. **"Connection timeout"**
   - Firewall ayarlarınızı kontrol edin
   - SMTP_PORT=587 kullandığınızdan emin olun

3. **"E-posta ayarları eksik"**
   - `.env.local` dosyasının doğru konumda olduğunu kontrol edin
   - Tüm değişkenlerin tanımlandığından emin olun

### Debug Modu
E-posta gönderme işlemini debug etmek için:

```typescript
// src/app/api/donations/route.ts dosyasında
console.log('SMTP Ayarları:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  // pass: '***' (güvenlik için gizli)
})
```

## 📱 E-posta Önizleme

Gönderilen e-posta şu özelliklere sahiptir:
- ✅ Responsive tasarım
- ✅ Modern görünüm
- ✅ Türkçe içerik
- ✅ Emoji desteği
- ✅ Gradient renkler
- ✅ Profesyonel görünüm

## 🔒 Güvenlik

- `.env.local` dosyasını asla git'e commit etmeyin
- App Password'leri güvenli tutun
- Production'da güçlü şifreler kullanın

## 📞 Destek

Sorun yaşarsanız:
1. Console loglarını kontrol edin
2. Gmail ayarlarınızı doğrulayın
3. İnternet bağlantınızı kontrol edin 