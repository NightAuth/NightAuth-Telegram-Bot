# NightAuth Telegram 机器人（自托管）— 在 GitHub 上为我们点亮星标 ⭐

[NightAuth](https://nightauth.org) 官方自托管 Telegram 管理机器人。基于 **TypeScript** 与 **Telegraf v4** 构建，直接对接 NightAuth Business API，提供自动化卡密分发、用户开户、硬件锁 (HWID) 解绑、多应用统一调度及动态 10 种语言国际化支持。

官方网站：[https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](../README.md) • [Español](es.md) • [Français](fr.md) • [Deutsch](de.md) • [Italiano](it.md) • [Português](pt.md) • [Русский](ru.md) • [Türkçe](tr.md) • [Polski](pl.md) • [中文](zh.md)

---

> [!NOTE]
> ### 📺 视频教程与系统配置指南
> 有关在 NightAuth 仪表板中配置应用程序、订阅计划、云变量、Webhook 和许可证的官方视频教程及分步指南将很快在我们的官方门户和 YouTube 频道上发布。

---

## 核心特性

- 📱 **多应用架构统一管理**：单个 Telegram 机器人即可随时无缝切换并管理多个 NightAuth 独立应用。
- 🌐 **动态 10 种语言国际化**：随时通过 `/language`、`/lang` 或点击交互按钮切换语言（`en`、`es`、`fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`）。机器人会自动保存每位管理员的语言偏好。
- 🎨 **现代化 Inline 按钮交互**：自适应按键布局，搭配直观 Emoji 图标与实时状态指示。
- 📋 **分页式列表浏览器**：使用 `◀️ 上一页`、`第 X/Y 页` 和 `下一页 ▶️` 快速翻阅许可证和用户列表。
- ⚡ **向导式交互流程**：生成卡密、开设账户、延长天数和解除 HWID 绑定均支持引导式输入。
- 📊 **实时运行诊断**：即时查询注册用户总数、有效卡密、在线会话及维护状态。
- 🔒 **严格权限隔离**：仅限指定的 Telegram 纯数字用户 ID 执行管理指令。
- 🌐 **纯净 TypeScript 架构**：独立工程，完美适配 Node.js 18+、Docker 与 PM2。

---

## 环境准备

1. **Node.js**：`v18.0.0` 或更高版本。
2. **Telegram 机器人 Token**：
   - 打开 Telegram 并向 [@BotFather](https://t.me/BotFather) 发送消息。
   - 发送 `/newbot` 指令，按照提示设定机器人名称和用户名。
   - 保存 BotFather 返回的 HTTP API Token。
3. **您的 Telegram 用户 ID**：
   - 向 [@userinfobot](https://t.me/userinfobot) 或 [@rawdatabot](https://t.me/rawdatabot) 发送任意消息以获取您的纯数字 ID（例如 `123456789`）。
4. **NightAuth Business API 密钥**：
   - 登录 NightAuth 控制台。
   - 进入您的应用 -> 打开 **Business Settings**。
   - 复制您的商业 API 密钥 `Business API Key` (`biz_...`)。

---

## 安装与快速启动

### 1. 克隆并安装依赖

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

编辑 `.env`：

```env
# Telegram 机器人凭据
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# NightAuth Business API 接口地址
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# 多应用配置（逗号分隔的 名称:ApiKey 键值对）
NIGHTAUTH_APPS="MainProduct:biz_0123456789abcdef0123456789abcdef,SecondProduct:biz_fedcba9876543210fedcba9876543210"

# 默认语言 (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="zh"

# 权限控制（逗号分隔的管理员纯数字 Telegram ID）
ADMIN_USER_IDS="123456789"
```

### 3. 运行机器人

**开发模式（热重载运行）：**
```bash
pnpm dev
```

**生产环境构建运行：**
```bash
pnpm build
pnpm start
```

---

## 指令与交互说明

### 机器人指令

| 指令 | 说明 |
| :--- | :--- |
| `/start` | 欢迎界面，包含快捷操作、当前激活应用状态与主功能菜单。 |
| `/panel` | 打开交互式管理控制面板。 |
| `/apps` | 列出已配置的应用列表并提供即时切换按钮。 |
| `/switchapp` | 快速应用选择器。 |
| `/stats` | 查看应用实时统计指标（注册用户、活跃卡密、维护状态）。 |
| `/language` 或 `/lang` | 界面语言选择（`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`）。 |

### 交互菜单功能

- 🔑 **卡密管理菜单**：
  - `➕ 生成卡密`：引导式输入有效天数、计划等级与生成数量。
  - `📋 查看卡密列表`：分页浏览所有卡密、激活状态及过期时间。
  - `ℹ️ 卡密详情`：查询创建者、使用情况及绑定的账户。
  - `⏱️ 续期卡密`：为指定许可证增加额外使用天数。
  - `🚫 封禁 / 解封卡密`：临时冻结或恢复卡密的使用权。
  - `🗑️ 删除卡密`：从数据库永久移除指定卡密。
- 👤 **用户管理菜单**：
  - `➕ 添加用户`：通过向导创建包含用户名、密码及卡密的新账户。
  - `📋 查看用户列表`：分页查看应用所有已注册客户。
  - `ℹ️ 用户详情`：检查硬件指纹 (HWID)、计划级别与订阅有效期。
  - `🔄 重置 HWID`：清除设备绑定，便于客户更换新电脑或设备。
  - `🚫 封禁 / 解封用户`：阻断或恢复客户对应用的访问。
  - `⏸️ 暂停 / 恢复用户`：临时暂停账户登录权限。
  - `🗑️ 删除用户`：永久注销该用户账户。
- ⚙️ **应用全局设置**：
  - `⏸️ 切换维护模式`：一键暂停或重新放开全服客户端登录。

---

## Docker 容器化部署

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

构建并运行：
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## 许可证

本软件基于 [Elastic License 2.0](../LICENSE) 协议发布。
