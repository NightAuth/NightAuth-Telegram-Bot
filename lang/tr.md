# NightAuth Telegram Bot (Self-Hosted) — GitHub'da Bize Yıldız Verin ⭐

[NightAuth](https://nightauth.org) için resmi self-hosted Telegram yönetim botu. **TypeScript** ve **Telegraf v4** ile geliştirilen bu bot, doğrudan NightAuth Business API'sine bağlanarak otomatik lisanslama, kullanıcı oluşturma, HWID sıfırlama, çoklu uygulama yönetimi ve dinamik 10 dil desteği sağlar.

Resmi Portal: [https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](../README.md) • [Español](es.md) • [Français](fr.md) • [Deutsch](de.md) • [Italiano](it.md) • [Português](pt.md) • [Русский](ru.md) • [Türkçe](tr.md) • [Polski](pl.md) • [中文](zh.md)

---

> [!NOTE]
> ### 📺 Video Eğitimleri ve Kurulum Kılavuzları
> NightAuth Kontrol Panelinde uygulamalar, planlar, abonelikler, bulut değişkenleri, webhook'lar ve lisansların nasıl yapılandırılacağını açıklayan resmi video eğitimleri ve adım adım kılavuzlar yakında portalımızda ve YouTube kanalımızda yayınlanacaktır.

---

## Özellikler

- 📱 **Çoklu Uygulama Yönetimi**: Tek bir Telegram botundan birden çok NightAuth uygulamasını kolayca bağlayın ve yönetin.
- 🌐 **Dinamik 10 Dil Desteği**: `/language`, `/lang` veya interaktif butonlar (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`) ile dilediğiniz zaman dil değiştirin. Bot her kullanıcının tercihini kaydeder.
- 🎨 **Modern Inline Klavye Menüleri**: Sezgisel emojiler ve anlık durum bilgileriyle donatılmış yanıt veren klavyeler.
- 📋 **Sayfalandırılmış Listeler**: `◀️ Önceki`, `Sayfa X/Y` ve `Sonraki ▶️` düğmeleri ile lisans ve kullanıcı listeleri arasında gezinin.
- ⚡ **Adım Adım İnteraktif Sihirbaz**: Lisans üretme, kullanıcı ekleme, süre uzatma ve HWID sıfırlama işlemlerini adım adım uygulayın.
- 📊 **Gerçek Zamanlı Tanılama**: Toplam kullanıcı, aktif lisans ve bakım modu durumunu hemen görüntüleyin.
- 🔒 **Güvenli Erişim Kısıtlaması**: Yönetici işlevlerini yalnızca belirtilen sayısal Telegram Kullanıcı ID'lerine açın.
- 🌐 **Temiz TypeScript Mimarisi**: Node.js 18+, Docker ve PM2 için optimize edilmiş bağımsız uygulama.

---

## Ön Koşullar

1. **Node.js**: `v18.0.0` veya daha üst sürüm.
2. **Telegram Bot Token**:
   - Telegram'ı açın ve [@BotFather](https://t.me/BotFather) ile sohbet başlatın.
   - `/newbot` komutunu gönderin ve isim ile kullanıcı adı belirleyin.
   - BotFather tarafından verilen HTTP API token'ını kopyalayın.
3. **Telegram Kullanıcı ID'niz**:
   - Sayısal ID'nizi öğrenmek için [@userinfobot](https://t.me/userinfobot) veya [@rawdatabot](https://t.me/rawdatabot) botuna mesaj atın (ör. `123456789`).
4. **NightAuth Business API Anahtarı**:
   - NightAuth Kontrol Paneline giriş yapın.
   - Uygulamanızı seçin -> **Business Settings** sekmesine gidin.
   - `Business API Key` (`biz_...`) anahtarınızı kopyalayın.

---

## Kurulum ve Hızlı Başlangıç

### 1. Klonlama ve Bağımlılıkları Yükleme

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. Ortam Değişkenlerini Yapılandırma

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# Telegram Bot Token
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# NightAuth Business API Endpoint
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# Çoklu Uygulama Yapılandırması (Virgülle ayrılmış İsim:ApiKey çiftleri)
NIGHTAUTH_APPS="AnaUrun:biz_0123456789abcdef0123456789abcdef,IkinciUrun:biz_fedcba9876543210fedcba9876543210"

# Varsayılan Dil (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="tr"

# Erişim Denetimi (Yetkili sayısal Telegram ID'leri)
ADMIN_USER_IDS="123456789"
```

### 3. Botu Başlatma

**Geliştirme Modu (tsx ile canlı yenileme):**
```bash
pnpm dev
```

**Prodüksiyon Derlemesi:**
```bash
pnpm build
pnpm start
```

---

## Komutlar ve Kullanım

### Bot Komutları

| Komut | Açıklama |
| :--- | :--- |
| `/start` | Kısayollar, aktif uygulama ve ana menü içeren başlangıç ekranı. |
| `/panel` | İnteraktif yönetim kontrol panelini açar. |
| `/apps` | Geçiş butonlarıyla birlikte yapılandırılmış uygulamaları listeler. |
| `/switchapp` | Aktif uygulamayı değiştirmek için hızlı seçim aracı. |
| `/stats` | Gerçek zamanlı istatistikleri (kullanıcılar, lisanslar, durum) görüntüler. |
| `/language` veya `/lang` | Dil seçici (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). |

### İnteraktif Menüler

- 🔑 **Lisans Menüsü**:
  - `➕ Anahtar Oluştur`: Süre, seviye ve adet sihirbazı.
  - `📋 Anahtarları Listele`: Durum ve son kullanma tarihiyle sayfalandırılmış liste.
  - `ℹ️ Anahtar Bilgisi`: Oluşturan, kullanım durumu ve ilişkili hesap bilgisi.
  - `⏱️ Süre Uzat`: Lisansa ek gün ilave edin.
  - `🚫 Yasakla / Yasağı Kaldır`: Lisansın geçerliliğini askıya alın veya açın.
  - `🗑️ Anahtarı Sil`: Lisansı veritabanından kalıcı olarak silin.
- 👤 **Kullanıcı Menüsü**:
  - `➕ Kullanıcı Ekle`: Kullanıcı adı, şifre ve isteğe bağlı lisansla hesap açma.
  - `📋 Kullanıcıları Listele`: Kayıtlı kullanıcıların sayfalandırılmış listesi.
  - `ℹ️ Kullanıcı Bilgisi`: HWID, plan seviyesi ve bitiş tarihi görüntüleme.
  - `🔄 HWID Sıfırla`: Donanım kilidini temizleyerek cihaz transferine izin verin.
  - `🚫 Yasakla / Yasağı Kaldır`: Hesaba erişimi engelleyin veya yeniden açın.
  - `⏸️ Duraklat / Devam Ettir`: Kullanıcı oturumunu geçici olarak durdurun.
  - `🗑️ Kullanıcıyı Sil`: Kullanıcı hesabını tamamen silin.
- ⚙️ **Uygulama Ayarları**:
  - `⏸️ Bakım Modu`: Uygulama girişlerini anında duraklatın veya tekrar açın.

---

## Docker ile Dağıtım

```dockerfile
FROM node:20-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
CMD ["node", "dist/index.js"]
```

Derleme ve çalıştırma:
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## Lisans

Bu yazılım [Elastic License 2.0](../LICENSE) şartları altında lisanslanmıştır.
