# NightAuth Telegram Bot (Auto-hébergé) — Donnez-nous une étoile sur GitHub ⭐

Bot officiel d'administration Telegram auto-hébergé pour [NightAuth](https://nightauth.org). Conçu avec **TypeScript** et **Telegraf v4**, ce bot s'interface directement avec l'API Business de NightAuth pour fournir une gestion automatisée des licences, l'inscription d'utilisateurs, la réinitialisation HWID, la gestion multi-applications et la prise en charge dynamique de 10 langues.

Portail Officiel : [https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](../README.md) • [Español](es.md) • [Français](fr.md) • [Deutsch](de.md) • [Italiano](it.md) • [Português](pt.md) • [Русский](ru.md) • [Türkçe](tr.md) • [Polski](pl.md) • [中文](zh.md)

---

> [!NOTE]
> ### 📺 Tutoriels Vidéo et Guides de Configuration
> Les tutoriels vidéo officiels et les guides détaillés pas à pas expliquant comment configurer vos applications, plans, abonnements, variables cloud, webhooks et licences sur le tableau de bord NightAuth seront publiés très prochainement sur notre portail et chaîne YouTube.

---

## Fonctionnalités

- 📱 **Gestion Multi-Applications** : Connectez et pilotez plusieurs applications NightAuth depuis un unique bot Telegram.
- 🌐 **Prise en Charge Dynamique de 10 Langues** : Changez de langue à tout moment avec `/language`, `/lang` ou le menu dédié (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). Le bot enregistre la préférence de chaque utilisateur.
- 🎨 **Claviers En Ligne Modernes (Inline Keyboards)** : Menus réactifs dotés d'émojis intuitifs et d'indicateurs d'état en temps réel.
- 📋 **Listes Paginées** : Parcourez les listes de clés et d'utilisateurs avec les commandes de pagination `◀️ Préc`, `Page X/Y` et `Suiv ▶️`.
- ⚡ **Assistants Interactifs** : Génération de clés, ajout de comptes, prolongation de validité et déblocage HWID étape par étape.
- 📊 **Diagnostics en Temps Réel** : Visualisez le nombre total d'utilisateurs, les licences actives et l'état de la maintenance.
- 🔒 **Contrôle d'Accès Sécurisé** : Réservé exclusivement aux identifiants numériques d'utilisateurs Telegram autorisés.
- 🌐 **Architecture TypeScript Épurée** : Compatible Node.js 18+, Docker et PM2.

---

## Prérequis

1. **Node.js** : `v18.0.0` ou version supérieure.
2. **Token du Bot Telegram** :
   - Ouvrez Telegram et écrivez à [@BotFather](https://t.me/BotFather).
   - Envoyez la commande `/newbot` et suivez les instructions pour définir le nom et le pseudo.
   - Conservez le token HTTP API fourni.
3. **Votre ID Utilisateur Telegram** :
   - Envoyez un message à [@userinfobot](https://t.me/userinfobot) ou [@rawdatabot](https://t.me/rawdatabot) pour obtenir votre identifiant numérique (ex. `123456789`).
4. **Clé API Business NightAuth** :
   - Connectez-vous sur votre espace NightAuth.
   - Ouvrez votre application -> Cliquez sur **Business Settings**.
   - Copiez votre `Business API Key` (`biz_...`).

---

## Installation et Démarrage

### 1. Cloner et Installer les Dépendances

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. Configurer les Variables d'Environnement

Copiez le fichier `.env.example` en `.env` :

```bash
cp .env.example .env
```

Éditez `.env` :

```env
# Token du Bot Telegram
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# Point de Terminaison API Business NightAuth
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# Configuration Multi-Apps (paires Nom:CléAPI séparées par des virgules)
NIGHTAUTH_APPS="MainProduct:biz_0123456789abcdef0123456789abcdef,SecondProduct:biz_fedcba9876543210fedcba9876543210"

# Langue par Défaut (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="fr"

# Contrôle d'Accès (IDs numériques Telegram autorisés)
ADMIN_USER_IDS="123456789"
```

### 3. Lancer le Bot

**Mode Développement (Rechargement automatique via tsx) :**
```bash
pnpm dev
```

**Production :**
```bash
pnpm build
pnpm start
```

---

## Commandes et Navigation

### Commandes Disponibles

| Commande | Description |
| :--- | :--- |
| `/start` | Écran de bienvenue avec raccourcis, indicateur de l'application active et menu principal. |
| `/panel` | Affiche le panneau d'administration interactif. |
| `/apps` | Liste les applications avec boutons de sélection directe. |
| `/switchapp` | Sélecteur rapide pour changer d'application active. |
| `/stats` | Statistiques globales (utilisateurs, licences, état de maintenance). |
| `/language` ou `/lang` | Sélecteur de langue (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). |

### Menus Interactifs

- 🔑 **Menu Licences** :
  - `➕ Générer Clé` : Assistant pour choisir la durée, le palier et le volume.
  - `📋 Lister Clés` : Explorateur paginé avec statuts et dates d'expiration.
  - `ℹ️ Info Clé` : Affiche le créateur, l'utilisateur et l'état d'activation.
  - `⏱️ Prolonger Clé` : Ajoute des jours supplémentaires à une licence.
  - `🚫 Bannir / Débannir` : Révoque ou rétablit une clé de licence.
  - `🗑️ Supprimer Clé` : Efface définitivement une licence.
- 👤 **Menu Utilisateurs** :
  - `➕ Ajouter Utilisateur` : Création de compte avec mot de passe et clé facultative.
  - `📋 Lister Utilisateurs` : Navigateur paginé des comptes clients.
  - `ℹ️ Info Utilisateur` : Contrôle de l'identifiant HWID et des abonnements.
  - `🔄 Réinitialiser HWID` : Supprime le verrou matériel pour réinstallation.
  - `🚫 Bannir / Débannir Utilisateur` : Bloque ou réactive l'accès au compte.
  - `⏸️ Mettre en Pause / Reprendre` : Suspend temporairement un utilisateur.
  - `🗑️ Supprimer Utilisateur` : Suppression définitive du compte.
- ⚙️ **Paramètres de l'Application** :
  - `⏸️ Mode Maintenance` : Active ou désactive instantanément les connexions utilisateurs.

---

## Déploiement Docker

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

Construction et démarrage :
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## Licence

Ce logiciel est distribué sous la licence [Elastic License 2.0](../LICENSE).
