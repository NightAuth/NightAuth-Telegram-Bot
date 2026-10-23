# NightAuth Telegram Bot (Self-Hosted) — Gib uns einen Stern auf GitHub ⭐

Offizieller selbst gehosteter Telegram-Verwaltungsbot für [NightAuth](https://nightauth.org). Entwickelt mit **TypeScript** und **Telegraf v4**, kommuniziert dieser Bot direkt mit der NightAuth Business-API und ermöglicht automatisierte Lizenzierung, Benutzerkonten-Erstellung, HWID-Verwaltung, Multi-App-Administration und dynamische Mehrsprachigkeit in 10 Sprachen.

Offizielles Portal: [https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](../README.md) • [Español](es.md) • [Français](fr.md) • [Deutsch](de.md) • [Italiano](it.md) • [Português](pt.md) • [Русский](ru.md) • [Türkçe](tr.md) • [Polski](pl.md) • [中文](zh.md)

---

> [!NOTE]
> ### 📺 Video-Tutorials und Einrichtungsleitfäden
> Offizielle Video-Tutorials und Schritt-für-Schritt-Anleitungen zur Konfiguration von Anwendungen, Plänen, Abonnements, Cloud-Variablen, Webhooks und Lizenzen im NightAuth-Dashboard werden in Kürze auf unserem offiziellen Portal und YouTube-Kanal veröffentlicht.

---

## Funktionen

- 📱 **Multi-Anwendungs-Verwaltung**: Wechseln und verwalten Sie mehrere NightAuth-Anwendungen nahtlos von einem einzigen Telegram-Bot aus.
- 🌐 **Dynamische Mehrsprachigkeit (10 Sprachen)**: Wechseln Sie die Sprache jederzeit über `/language`, `/lang` oder das interaktive Menü (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). Der Bot speichert individuelle Benutzereinstellungen.
- 🎨 **Moderne Inline-Tastaturen**: Responsive Tastaturen mit intuitiven Emojis, Echtzeit-Statusindikatoren und übersichtlichen Untermenüs.
- 📋 **Paginierte Listenansichten**: Blättern Sie durch Lizenz- und Benutzerlisten mit `◀️ Zurück`, `Seite X/Y` und `Weiter ▶️`.
- ⚡ **Geführte Interaktive Assistenten**: Schritt-für-Schritt-Abfragen zur Schlüsselerstellung, Kontoanlegung, Verlängerung und Aufhebung von HWID-Sperren.
- 📊 **Echtzeit-Diagnose**: Gesamtzahl der Benutzer, aktive Lizenzen und Wartungsstatus jederzeit einsehbar.
- 🔒 **Sichere Zugriffskontrolle**: Beschränkung der administrativen Aktionen auf autorisierte numerische Telegram-Benutzer-IDs.
- 🌐 **Saubere TypeScript-Architektur**: Kompatibel mit Node.js 18+, Docker und PM2.

---

## Voraussetzungen

1. **Node.js**: Version `v18.0.0` oder höher.
2. **Telegram Bot Token**:
   - Öffnen Sie Telegram und starten Sie einen Chat mit [@BotFather](https://t.me/BotFather).
   - Senden Sie `/newbot` und folgen Sie den Anweisungen zur Vergabe von Name und Benutzername.
   - Kopieren Sie das von BotFather ausgegebene HTTP-API-Token.
3. **Ihre Telegram-Benutzer-ID**:
   - Senden Sie eine Nachricht an [@userinfobot](https://t.me/userinfobot) oder [@rawdatabot](https://t.me/rawdatabot), um Ihre numerische ID abzurufen (z. B. `123456789`).
4. **NightAuth Business-API-Schlüssel**:
   - Melden Sie sich im NightAuth Dashboard an.
   - Wählen Sie Ihre Anwendung -> **Business Settings**.
   - Kopieren Sie Ihren `Business API Key` (`biz_...`).

---

## Installation & Schnellstart

### 1. Klonen & Abhängigkeiten installieren

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. Umgebungsvariablen konfigurieren

Kopieren Sie `.env.example` nach `.env`:

```bash
cp .env.example .env
```

Bearbeiten Sie die Datei `.env`:

```env
# Telegram Bot Token
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# NightAuth Business API Endpoint
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# Multi-App-Konfiguration (Kommagetrennte Name:Schlüssel-Paare)
NIGHTAUTH_APPS="HauptApp:biz_0123456789abcdef0123456789abcdef,ZweitApp:biz_fedcba9876543210fedcba9876543210"

# Standardsprache (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="de"

# Zugriffskontrolle (Numerische Telegram-IDs autorisierter Nutzer)
ADMIN_USER_IDS="123456789"
```

### 3. Bot starten

**Entwicklungsmodus (Hot-Reload mit tsx):**
```bash
pnpm dev
```

**Produktions-Build:**
```bash
pnpm build
pnpm start
```

---

## Befehle & Interaktion

### Bot-Befehle

| Befehl | Beschreibung |
| :--- | :--- |
| `/start` | Startbildschirm mit Schnellaktionen, aktiver App und Hauptmenü. |
| `/panel` | Öffnet das interaktive Administrationszentrum. |
| `/apps` | Zeigt alle konfigurierten Anwendungen mit Direktumschalt-Tasten. |
| `/switchapp` | Schnellauswahl zum Wechseln der aktiven Anwendung. |
| `/stats` | Echtzeit-Statistiken (Benutzer, Lizenzen, Wartungszustand). |
| `/language` oder `/lang` | Sprachauswahl (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). |

### Interaktive Menüs

- 🔑 **Lizenzverwaltung**:
  - `➕ Schlüssel generieren`: Assistent für Laufzeit, Stufe und Menge.
  - `📋 Schlüssel auflisten`: Paginierte Ansicht aller Lizenzen mit Status.
  - `ℹ️ Schlüssel-Info`: Zeigt Ersteller, Ablaufdatum und Benutzer.
  - `⏱️ Schlüssel verlängern`: Zusätzliche Gültigkeitstage hinzufügen.
  - `🚫 Sperren / Entsperren`: Lizenzschlüssel sperren oder reaktivieren.
  - `🗑️ Schlüssel löschen`: Lizenz unwiderruflich aus der Datenbank entfernen.
- 👤 **Benutzerverwaltung**:
  - `➕ Benutzer anlegen`: Neues Konto mit Passwort und optionaler Lizenz.
  - `📋 Benutzer auflisten`: Paginierter Browser durch Kundenkonten.
  - `ℹ️ Benutzer-Info`: HWID, Planstufe und Gültigkeit prüfen.
  - `🔄 HWID zurücksetzen`: Hardware-Bindung aufheben für Gerätetausch.
  - `🚫 Benutzer sperren / entsperren`: Zugriff entziehen oder wiederherstellen.
  - `⏸️ Pausieren / Fortsetzen`: Login vorübergehend stoppen.
  - `🗑️ Benutzer löschen`: Konto dauerhaft entfernen.
- ⚙️ **App-Einstellungen**:
  - `⏸️ Wartungsmodus umschalten`: Logins für alle Kunden sofort anhalten oder freigeben.

---

## Docker-Bereitstellung

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

Erstellen und starten:
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## Lizenz

Diese Software ist unter der [Elastic License 2.0](../LICENSE) lizenziert.
