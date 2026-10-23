# NightAuth Telegram Bot (Self-Hosted) — Zostaw gwiazdkę na GitHubie ⭐

Oficjalny bot administracyjny Telegram self-hosted dla platformy [NightAuth](https://nightauth.org). Zbudowany w oparciu o **TypeScript** oraz **Telegraf v4**, bot łączy się bezpośrednio z API Business platformy NightAuth, zapewniając automatyczne licencjonowanie, rejestrację użytkowników, resetowanie blokad HWID, administrację wieloma aplikacjami oraz dynamiczną obsługę 10 języków.

Oficjalny portal: [https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](../README.md) • [Español](es.md) • [Français](fr.md) • [Deutsch](de.md) • [Italiano](it.md) • [Português](pt.md) • [Русский](ru.md) • [Türkçe](tr.md) • [Polski](pl.md) • [中文](zh.md)

---

> [!NOTE]
> ### 📺 Poradniki wideo i instrukcje konfiguracji
> Oficjalne przewodniki wideo oraz szczegółowe instrukcje krok po kroku dotyczące konfigurowania aplikacji, planów, subskrypcji, zmiennych w chmurze, webhooków i licencji w panelu NightAuth zostaną wkrótce opublikowane na naszym portalu oraz kanale YouTube.

---

## Funkcje

- 📱 **Obsługa wielu aplikacji**: Zarządzaj wieloma aplikacjami NightAuth i przełączaj się między nimi za pośrednictwem pojedynczego bota Telegram.
- 🌐 **Dynamiczna obsługa 10 języków**: Zmień język w dowolnym momencie komendą `/language`, `/lang` lub przez dedykowane menu (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). Bot zapamiętuje wybór każdego użytkownika.
- 🎨 **Nowoczesne klawiatury Inline Keyboards**: Responsywne układy z intuicyjnymi emotikonami i aktualizacją statusu w czasie rzeczywistym.
- 📋 **Paginacja list danych**: Przeglądaj klucze i konta użytkowników za pomocą przycisków `◀️ Poprz`, `Strona X/Y` i `Nast ▶️`.
- ⚡ **Interaktywne kreatory**: Prowadzone krok po kroku generowanie licencji, rejestracja kont, przedłużanie ważności i resetowanie HWID.
- 📊 **Diagnostyka na żywo**: Liczba aktywnych użytkowników, wygenerowanych licencji oraz status trybu konserwacji.
- 🔒 **Bezpieczna kontrola dostępu**: Ograniczenie funkcji administracyjnych wyłącznie do wskazanych numerycznych ID użytkowników Telegram.
- 🌐 **Czysta architektura TypeScript**: Gotowa do wdrożenia na Node.js 18+, Dockerze oraz PM2.

---

## Wymagania wstępne

1. **Node.js**: `v18.0.0` lub nowszy.
2. **Token bota Telegram**:
   - Otwórz aplikację Telegram i napisz do [@BotFather](https://t.me/BotFather).
   - Wyślij `/newbot` i postępuj zgodnie z instrukcjami, aby nadać nazwę i nazwę użytkownika.
   - Skopiuj token HTTP API przekazany przez BotFathera.
3. **Twój numeryczny ID użytkownika Telegram**:
   - Wyślij wiadomość do [@userinfobot](https://t.me/userinfobot) lub [@rawdatabot](https://t.me/rawdatabot), aby poznać swój ID (np. `123456789`).
4. **Klucz API Business NightAuth**:
   - Zaloguj się do panelu NightAuth.
   - Otwórz swoją aplikację -> Przejdź do **Business Settings**.
   - Skopiuj klucz `Business API Key` (`biz_...`).

---

## Instalacja i uruchomienie

### 1. Klonowanie i instalacja zależności

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. Konfiguracja zmiennych środowiskowych

Skopiuj plik `.env.example` do `.env`:

```bash
cp .env.example .env
```

Edytuj `.env`:

```env
# Token bota Telegram
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# Punkt końcowy NightAuth Business API
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# Konfiguracja wielu aplikacji (Pary Nazwa:Klucz rozdzielone przecinkami)
NIGHTAUTH_APPS="ProduktGłówny:biz_0123456789abcdef0123456789abcdef,ProduktDrugi:biz_fedcba9876543210fedcba9876543210"

# Domyślny język (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="pl"

# Kontrola dostępu (Numeryczne identyfikatory Telegram rozdzielone przecinkami)
ADMIN_USER_IDS="123456789"
```

### 3. Uruchomienie bota

**Tryb deweloperski (przeładowywanie tsx w czasie rzeczywistym):**
```bash
pnpm dev
```

**Kompilacja produkcyjna:**
```bash
pnpm build
pnpm start
```

---

## Komendy i obsługa

### Komendy bota

| Komenda | Opis |
| :--- | :--- |
| `/start` | Ekran powitalny z menu głównym i wskaźnikiem aktywnej aplikacji. |
| `/panel` | Otwiera interaktywny panel zarządzania. |
| `/apps` | Wyświetla listę aplikacji z przyciskami szybkiego wyboru. |
| `/switchapp` | Selektor do natychmiastowej zmiany aktywnej aplikacji. |
| `/stats` | Pokazuje statystyki w czasie rzeczywistym (użytkownicy, licencje, stan). |
| `/language` lub `/lang` | Zmiana języka interfejsu (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). |

### Menu interaktywne

- 🔑 **Zarządzanie licencjami**:
  - `➕ Generuj klucz`: Kreator czasu trwania, poziomu i liczby sztuk.
  - `📋 Lista kluczy`: Paginowany przegląd kluczy wraz ze stanem aktywacji i datą wygaśnięcia.
  - `ℹ️ Informacje o kluczu`: Sprawdzenie twórcy, stanu użycia i powiązanego konta.
  - `⏱️ Przedłuż klucz`: Dodanie dodatkowych dni ważności do licencji.
  - `🚫 Zbanuj / Odbanuj`: Zablokowanie lub przywrócenie licencji.
  - `🗑️ Usuń klucz`: Trwałe usunięcie licencji z bazy.
- 👤 **Zarządzanie użytkownikami**:
  - `➕ Dodaj użytkownika`: Rejestracja nowego konta z loginem, hasłem i licencją.
  - `📋 Lista użytkowników`: Paginowany podgląd zarejestrowanych klientów.
  - `ℹ️ Informacje o koncie`: Podgląd HWID, poziomu planu i terminu ważności.
  - `🔄 Resetuj HWID`: Skasowanie powiązania sprzętowego na potrzeby zmiany urządzenia.
  - `🚫 Zbanuj / Odbanuj`: Blokada lub przywrócenie dostępu do konta.
  - `⏸️ Wstrzymaj / Wznów`: Czasowe zablokowanie logowania użytkownika.
  - `🗑️ Usuń użytkownika`: Trwałe usunięcie konta klienta.
- ⚙️ **Ustawienia aplikacji**:
  - `⏸️ Tryb konserwacji`: Natychmiastowe wstrzymanie lub wznowienie logowania do aplikacji.

---

## Wdrożenie w Dockerze

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

Budowa i uruchomienie:
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## Licencja

Oprogramowanie jest udostępniane na warunkach licencji [Elastic License 2.0](../LICENSE).
