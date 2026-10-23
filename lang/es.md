# NightAuth Telegram Bot (Auto-alojado) — Danos una estrella en GitHub ⭐

Bot oficial de administración para Telegram auto-alojado para [NightAuth](https://nightauth.org). Desarrollado con **TypeScript** y **Telegraf v4**, este bot se comunica directamente con la API Business de NightAuth para brindar licenciamiento automatizado, aprovisionamiento de usuarios, gestión de HWID, administración multi-aplicación e internacionalización dinámica en 10 idiomas.

Portal Oficial: [https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](../README.md) • [Español](es.md) • [Français](fr.md) • [Deutsch](de.md) • [Italiano](it.md) • [Português](pt.md) • [Русский](ru.md) • [Türkçe](tr.md) • [Polski](pl.md) • [中文](zh.md)

> [!TIP]
> ### 🔒 Gestor de Paquetes Recomendado: pnpm
> Recomendamos enfáticamente utilizar **pnpm** (`npm install -g pnpm` o `corepack enable`) en lugar de npm. **pnpm** proporciona mayor seguridad en la cadena de suministro, almacenamiento eficiente basado en contenido, aislamiento estricto de `node_modules` (evitando dependencias fantasma) e integridad determinista en el lockfile.

---

> [!NOTE]
> ### 📺 Tutoriales en Video y Guías de Configuración
> Los video-tutoriales oficiales y las guías paso a paso para configurar aplicaciones, planes, suscripciones, variables en la nube, webhooks y licencias en el Panel de NightAuth serán publicados próximamente en nuestro portal oficial y canal de YouTube.

---

## Características

- 📱 **Soporte Multi-Aplicación**: Conecta y alterna entre múltiples aplicaciones de NightAuth fácilmente desde un único bot de Telegram.
- 🌐 **Soporte Dinámico de 10 Idiomas**: Cambia el idioma en cualquier momento usando `/language`, `/lang` o el menú interactivo (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). El bot guarda las preferencias de cada usuario.
- 🎨 **Teclados en Línea Modernos (Inline Keyboards)**: Teclados adaptativos con emojis intuitivos, indicadores de estado en tiempo real y menús limpios.
- 📋 **Listas Paginadas**: Navega por listas de licencias y usuarios con botones dinámicos `◀️ Ant`, `Página X/Y` y `Sig ▶️`.
- ⚡ **Flujos Interactivos Guiados**: Asistente paso a paso para generar licencias, crear cuentas, extender días y resetear candados de HWID.
- 📊 **Diagnóstico en Tiempo Real**: Consulta usuarios registrados, licencias activas y el estado del modo mantenimiento.
- 🔒 **Control de Acceso Seguro**: Restringe las acciones administrativas exclusivamente a los IDs numéricos de Telegram autorizados.
- 🌐 **Arquitectura TypeScript Limpia**: Aplicación independiente compatible con Node.js 18+, Docker y PM2.

---

## Requisitos Previos

1. **Node.js**: `v18.0.0` o superior.
2. **Token de Bot de Telegram**:
   - Abre Telegram e inicia una conversación con [@BotFather](https://t.me/BotFather).
   - Envía `/newbot` y sigue las instrucciones para asignar nombre y nombre de usuario.
   - Copia el token de API HTTP proporcionado por BotFather.
3. **Tu ID de Usuario de Telegram** (para protección de administrador):
   - Envía un mensaje a [@userinfobot](https://t.me/userinfobot) o [@rawdatabot](https://t.me/rawdatabot) en Telegram para conocer tu ID numérico (ej. `123456789`).
4. **Clave de API Business de NightAuth**:
   - Inicia sesión en tu panel de NightAuth.
   - Selecciona tu aplicación -> Ve a **Business Settings**.
   - Copia tu clave `Business API Key` (`biz_...`).

---

## Instalación y Puesta en Marcha

### 1. Clonar e Instalar Dependencias

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tu editor preferido:

```env
# Token del Bot de Telegram
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# Endpoint de la API Business de NightAuth
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# Configuración Multi-App (Pares Nombre:ApiKey separados por comas)
NIGHTAUTH_APPS="MainProduct:biz_0123456789abcdef0123456789abcdef,SecondProduct:biz_fedcba9876543210fedcba9876543210"

# Idioma Predeterminado (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="es"

# Control de Acceso (IDs numéricos de Telegram separados por comas)
ADMIN_USER_IDS="123456789"
```

### 3. Ejecutar el Bot

**Modo Desarrollo (Recarga en caliente con tsx):**
```bash
pnpm dev
```

**Compilación para Producción:**
```bash
pnpm build
pnpm start
```

---

## Configuración Multi-Aplicación

El bot de Telegram de NightAuth te permite administrar múltiples aplicaciones simultáneamente. Puedes definirlas en `.env` mediante cualquiera de los siguientes formatos:

### Formato A: Pares Separados por Comas (Recomendado)
```env
NIGHTAUTH_APPS="AppOne:biz_key1,AppTwo:biz_key2,AppThree:biz_key3"
```

### Formato B: Cadena JSON
```env
NIGHTAUTH_APPS='[{"name":"AppOne","apiKey":"biz_key1"},{"name":"AppTwo","apiKey":"biz_key2"}]'
```

### Formato C: Aplicación Única
```env
NIGHTAUTH_APP_NAME="MainApp"
NIGHTAUTH_BUSINESS_KEY="biz_key1"
```

---

## Comandos e Interacción

### Comandos del Bot

| Comando | Descripción |
| :--- | :--- |
| `/start` | Pantalla de bienvenida con accesos rápidos, indicador de app activa y menú principal. |
| `/panel` | Muestra el panel interactivo de administración y control. |
| `/apps` | Lista las aplicaciones configuradas con botones interactivos para alternar. |
| `/switchapp` | Selector rápido para cambiar la aplicación activa. |
| `/stats` | Consulta estadísticas en tiempo real (usuarios totales, licencias activas, estado). |
| `/language` o `/lang` | Selector interactivo de idioma (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). |

### Menús Interactivos

- 🔑 **Menú de Licencias**:
  - `➕ Generar Clave`: Asistente interactivo para duración, nivel y cantidad.
  - `📋 Listar Claves`: Explorador paginado de licencias con estados y fechas de vencimiento.
  - `ℹ️ Info de Clave`: Consulta creador, estado de uso y usuario asignado.
  - `⏱️ Extender Clave`: Agrega días adicionales a una licencia.
  - `🚫 Ban / Desban`: Activa o suspende el uso de una licencia.
  - `🗑️ Eliminar Clave`: Borra permanentemente una licencia.
- 👤 **Menú de Usuarios**:
  - `➕ Crear Usuario`: Registra una cuenta con credenciales y licencia opcional.
  - `📋 Listar Usuarios`: Explorador paginado de cuentas registradas.
  - `ℹ️ Info de Usuario`: Inspecciona HWID, nivel de plan y fecha de caducidad.
  - `🔄 Resetear HWID`: Borra la asociación de hardware para permitir transferencias de equipo.
  - `🚫 Ban / Desban Usuario`: Suspende o restablece el acceso a la cuenta.
  - `⏸️ Pausar / Reanudar`: Suspende temporalmente el inicio de sesión.
  - `🗑️ Eliminar Usuario`: Borra permanentemente la cuenta.
- ⚙️ **Ajustes de App**:
  - `⏸️ Alternar Mantenimiento`: Pausa o reanuda de forma inmediata los inicios de sesión en la aplicación.

---

## Despliegue con Docker

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

Compilar y ejecutar:
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## Licencia

Este software está licenciado bajo los términos de la [Elastic License 2.0](../LICENSE).
