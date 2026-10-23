# NightAuth Telegram Bot (Self-Hosted) — Star us on GitHub ⭐

Official self-hosted Telegram administration bot for [NightAuth](https://nightauth.org). Built with **TypeScript** and **Telegraf v4**, this bot communicates directly with the NightAuth Business API to provide automated licensing, user provisioning, HWID management, multi-application administration, and dynamic 10-language internationalization.

Official Portal: [https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](README.md) • [Español](lang/es.md) • [Français](lang/fr.md) • [Deutsch](lang/de.md) • [Italiano](lang/it.md) • [Português](lang/pt.md) • [Русский](lang/ru.md) • [Türkçe](lang/tr.md) • [Polski](lang/pl.md) • [中文](lang/zh.md)

---

> [!TIP]
> ### 🔒 Recommended Package Manager: pnpm
> We strongly recommend using **pnpm** (`pnpm install -g pnpm` or `corepack enable`) instead of npm. **pnpm** provides superior supply-chain security, content-addressable storage, strict non-flat `node_modules` isolation (preventing phantom dependencies), and deterministic lockfile integrity.

---

> [!NOTE]
> ### 📺 Video Tutorials & System Setup Guides
> Official video tutorials and step-by-step guides explaining how to configure applications, plans, subscriptions, cloud variables, webhooks, and licenses in the NightAuth Dashboard will be published soon on our official portal and YouTube channel.

---

## Features

- 📱 **Multi-Application Support**: Connect and switch between multiple NightAuth applications seamlessly from a single Telegram bot.
- 🌐 **Dynamic 10-Language Support**: Switch language anytime using `/language`, `/lang`, or the interactive language menu (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). The bot saves per-user language preferences.
- 🎨 **Modern Inline Keyboards**: Responsive inline keyboards with intuitive emojis, real-time status indicators, and clean navigation menus.
- 📋 **Paginated Lists**: Browse through keys and user accounts with dynamic `◀️ Prev`, `Page X/Y`, and `Next ▶️` navigation buttons.
- ⚡ **Interactive Flows & Prompts**: Generate licenses, add user accounts, extend expiry dates, and clear HWID locks via step-by-step interactive prompts.
- 📊 **Real-time Diagnostics**: Inspect active sessions, license usage, and paused/maintenance status on demand.
- 🔒 **Access Control**: Restrict administrative commands to authorized numeric Telegram user IDs.
- 🌐 **Clean TypeScript Architecture**: Standalone application compatible with Node.js 18+, Docker, and PM2.

---

## Prerequisites

1. **Node.js**: `v18.0.0` or higher.
2. **Package Manager**: **pnpm** is strongly recommended for safety and speed (`npm install -g pnpm` or `corepack enable`).
3. **Telegram Bot Token**:
   - Open Telegram and message [@BotFather](https://t.me/BotFather).
   - Send `/newbot` and follow the instructions to choose a name and username.
   - Copy the HTTP API token provided by BotFather.
4. **Your Telegram User ID** (for admin protection):
   - Message [@userinfobot](https://t.me/userinfobot) or [@rawdatabot](https://t.me/rawdatabot) on Telegram to find your numeric ID (e.g. `123456789`).
5. **NightAuth Business API Key**:
   - Access your NightAuth Dashboard.
   - Open your Application -> Navigate to **Business Settings**.
   - Copy your `Business API Key` (`biz_...`).

---

## Installation & Quick Start

### 1. Clone & Install Dependencies

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your preferred editor:

```env
# Telegram Bot Token
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# NightAuth Business API Endpoint
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# Multi-App Configuration (Comma-separated Name:ApiKey pairs)
NIGHTAUTH_APPS="MainProduct:biz_0123456789abcdef0123456789abcdef,SecondProduct:biz_fedcba9876543210fedcba9876543210"

# Default Language (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="en"

# Access Control (Numeric Telegram User IDs separated by commas)
ADMIN_USER_IDS="123456789"
```

### 3. Run the Bot

**Development Mode (Live Reloading via tsx):**
```bash
pnpm dev
```

**Production Build:**
```bash
pnpm build
pnpm start
```

---

## Multi-Application Setup

NightAuth Telegram Bot allows you to manage multiple applications simultaneously. You can define your applications in `.env` using any of the following formats:

### Format A: Comma-Separated Pairs (Recommended)
```env
NIGHTAUTH_APPS="AppOne:biz_key1,AppTwo:biz_key2,AppThree:biz_key3"
```

### Format B: JSON String
```env
NIGHTAUTH_APPS='[{"name":"AppOne","apiKey":"biz_key1"},{"name":"AppTwo","apiKey":"biz_key2"}]'
```

### Format C: Single Fallback App
```env
NIGHTAUTH_APP_NAME="MainApp"
NIGHTAUTH_BUSINESS_KEY="biz_key1"
```

---

## Commands & Interaction

### Bot Commands

| Command | Description |
| :--- | :--- |
| `/start` | Welcome screen with quick actions, active app indicator, and main menu. |
| `/panel` | Displays the interactive administration control panel. |
| `/apps` | Lists configured applications with interactive switch buttons. |
| `/switchapp` | Quick selector to change the active application. |
| `/stats` | Shows real-time statistics (total users, active licenses, maintenance status). |
| `/language` or `/lang` | Selects your interface language (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). |

### Interactive Menus

- 🔑 **Licenses Menu**:
  - `➕ Generate Key`: Interactive wizard for duration, level, and count.
  - `📋 List Keys`: Paginated key browser with status and expiry details.
  - `ℹ️ Key Info`: Look up creator, used status, and registered user.
  - `⏱️ Extend Key`: Add extra days to a license.
  - `🚫 Ban / Unban Key`: Toggle key revocation.
  - `🗑️ Delete Key`: Permanently delete a license.
- 👤 **Users Menu**:
  - `➕ Add User`: Create an account with credentials and optional license.
  - `📋 List Users`: Paginated user browser with registration dates.
  - `ℹ️ User Info`: Inspect HWID, plan level, and subscription expiry.
  - `🔄 Reset HWID`: Clear the hardware lock for seamless device transfers.
  - `🚫 Ban / Unban User`: Revoke or reinstate account access.
  - `⏸️ Pause / Unpause User`: Temporarily suspend access.
  - `🗑️ Delete User`: Remove user account permanently.
- ⚙️ **App Settings**:
  - `⏸️ Toggle Maintenance`: Instantly pause or resume user logins.

---

## Deployment with Docker

A standard `Dockerfile` can be used to run the bot 24/7 in a lightweight container using **pnpm**:

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

Build and run:
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## License

This software is licensed under the [Elastic License 2.0](LICENSE).
