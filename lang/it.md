# NightAuth Telegram Bot (Self-Hosted) — Dacci una stella su GitHub ⭐

Bot ufficiale di amministrazione Telegram self-hosted per [NightAuth](https://nightauth.org). Sviluppato con **TypeScript** e **Telegraf v4**, questo bot dialoga direttamente con l'API Business di NightAuth per consentire generazione di licenze, registrazione utenti, gestione blocchi HWID, amministrazione multi-applicazione e supporto dinamico a 10 lingue.

Portale Ufficiale: [https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](../README.md) • [Español](es.md) • [Français](fr.md) • [Deutsch](de.md) • [Italiano](it.md) • [Português](pt.md) • [Русский](ru.md) • [Türkçe](tr.md) • [Polski](pl.md) • [中文](zh.md)

---

> [!NOTE]
> ### 📺 Tutorial Video e Guide di Configurazione
> I video tutorial ufficiali e le guide dettagliate passo-passo sulla configurazione di applicazioni, piani, abbonamenti, variabili cloud, webhook e licenze nella Dashboard di NightAuth saranno presto disponibili sul nostro portale e canale YouTube.

---

## Caratteristiche

- 📱 **Controllo Multi-Applicazione**: Alterna e gestisci senza interruzioni diverse applicazioni NightAuth dallo stesso bot Telegram.
- 🌐 **Supporto Dinamico a 10 Lingue**: Cambia lingua in ogni momento con `/language`, `/lang` o tramite l'apposito menu (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). Il bot memorizza la preferenza di ogni utente.
- 🎨 **Tastiere In-Line Moderne (Inline Keyboards)**: Layout reattivi con emoji intuitive e indicatori di stato aggiornati in tempo reale.
- 📋 **Navigazione Paginata**: Consulta elenchi di licenze e utenti con comodi pulsanti `◀️ Prec`, `Pagina X/Y` e `Succ ▶️`.
- ⚡ **Procedure Guidate Interattive**: Creazione licenze, aggiunta utenti, estensione scadenze e azzeramento HWID con passaggi semplici e chiari.
- 📊 **Diagnostica in Tempo Reale**: Monitora utenti attivi, codici registrati e modalità di manutenzione istantaneamente.
- 🔒 **Accesso Rigorosamente Protetto**: Funzionalità riservate esclusivamente agli ID numerici Telegram configurati.
- 🌐 **Architettura Pulita in TypeScript**: Applicazione autonoma adatta a Node.js 18+, Docker e PM2.

---

## Prerequisiti

1. **Node.js**: `v18.0.0` o versione superiore.
2. **Token del Bot Telegram**:
   - Avvia Telegram e apri una chat con [@BotFather](https://t.me/BotFather).
   - Invia `/newbot` e segui i passaggi per assegnare nome e username.
   - Copia il token HTTP API fornito da BotFather.
3. **Il tuo ID Utente Telegram**:
   - Scrivi a [@userinfobot](https://t.me/userinfobot) o [@rawdatabot](https://t.me/rawdatabot) per conoscere il tuo ID numerico (es. `123456789`).
4. **Chiave API Business NightAuth**:
   - Accedi al portale NightAuth.
   - Apri la tua applicazione -> Vai su **Business Settings**.
   - Copia la tua `Business API Key` (`biz_...`).

---

## Installazione e Avvio Rapido

### 1. Clona e Installa le Dipendenze

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. Configura le Variabili d'Ambiente

Copia `.env.example` in `.env`:

```bash
cp .env.example .env
```

Modifica `.env`:

```env
# Token del Bot Telegram
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# Endpoint API Business NightAuth
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# Configurazione Multi-App (Coppie Nome:ApiKey separate da virgola)
NIGHTAUTH_APPS="AppUno:biz_0123456789abcdef0123456789abcdef,AppDue:biz_fedcba9876543210fedcba9876543210"

# Lingua Predefinita (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="it"

# Controllo Accessi (ID numerici Telegram autorizzati)
ADMIN_USER_IDS="123456789"
```

### 3. Avvia il Bot

**Modalità Sviluppo (Hot Reload con tsx):**
```bash
pnpm dev
```

**Produzione:**
```bash
pnpm build
pnpm start
```

---

## Comandi e Navigazione

### Comandi Disponibili

| Comando | Descrizione |
| :--- | :--- |
| `/start` | Schermata iniziale con scorciatoie, indicatore app attiva e menu principale. |
| `/panel` | Mostra il pannello interattivo di amministrazione. |
| `/apps` | Elenca le applicazioni configurate con pulsanti di cambio immediato. |
| `/switchapp` | Selettore rapido per impostare l'applicazione attiva. |
| `/stats` | Mostra statistiche in tempo reale (utenti totali, licenze, manutenzione). |
| `/language` o `/lang` | Selettore lingua (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). |

### Menu Interattivi

- 🔑 **Menu Licenze**:
  - `➕ Genera Chiave`: Procedura per durata, livello e quantità.
  - `📋 Elenco Chiavi`: Visualizzatore paginato con stato e scadenza.
  - `ℹ️ Info Chiave`: Verifica creatore, utilizzo e account abbinato.
  - `⏱️ Estendi Chiave`: Aggiunge giorni di validità a una licenza.
  - `🚫 Banna / Sbanna`: Sospende o riabilita una chiave.
  - `🗑️ Elimina Chiave`: Rimuove definitivamente una licenza dal database.
- 👤 **Menu Utenti**:
  - `➕ Aggiungi Utente`: Creazione account con credenziali e licenza opzionale.
  - `📋 Elenco Utenti`: Elenco paginato degli utenti registrati.
  - `ℹ️ Info Utente`: Ispezione hardware ID, livello e scadenza piano.
  - `🔄 Resetta HWID`: Rimuove il vincolo macchina per consentire cambi dispositivo.
  - `🚫 Banna / Sbanna Utente`: Revoca o ripristina l'accesso.
  - `⏸️ Sospendi / Riattiva`: Mette in pausa temporanea un account.
  - `🗑️ Elimina Utente`: Cancella definitivamente un profilo utente.
- ⚙️ **Impostazioni Applicazione**:
  - `⏸️ Alterna Manutenzione`: Sospende o riattiva all'istante l'accesso client.

---

## Distribuzione con Docker

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

Creazione ed esecuzione:
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## Licenza

Questo software è distribuito sotto licenza [Elastic License 2.0](../LICENSE).
