# NightAuth Telegram Bot (Auto-hospedado) — Deixe uma estrela no GitHub ⭐

Bot oficial de administração para Telegram auto-hospedado para o [NightAuth](https://nightauth.org). Desenvolvido em **TypeScript** e **Telegraf v4**, este bot conecta-se diretamente à API Business do NightAuth para fornecer gerenciamento automatizado de licenças, criação de contas, remoção de HWID, administração multi-aplicações e suporte dinâmico a 10 idiomas.

Portal Oficial: [https://nightauth.org](https://nightauth.org)

---

**Languages / Idiomas / Langues / Sprachen:**  
[English](../README.md) • [Español](es.md) • [Français](fr.md) • [Deutsch](de.md) • [Italiano](it.md) • [Português](pt.md) • [Русский](ru.md) • [Türkçe](tr.md) • [Polski](pl.md) • [中文](zh.md)

---

> [!NOTE]
> ### 📺 Tutoriais em Vídeo e Guias de Configuração
> Tutoriais oficiais em vídeo e guias passo a passo sobre como configurar aplicativos, planos, assinaturas, variáveis em nuvem, webhooks e licenças no Painel do NightAuth serão disponibilizados em breve em nosso portal e canal oficial do YouTube.

---

## Recursos

- 📱 **Gerenciamento Multi-Aplicações**: Alterne e administre múltiplos aplicativos NightAuth a partir de um único bot no Telegram.
- 🌐 **Suporte Dinâmico a 10 Idiomas**: Alterne o idioma a qualquer momento através de `/language`, `/lang` ou do menu interativo (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). O bot salva a configuração individual de cada usuário.
- 🎨 **Teclados Inline Modernos**: Layouts dinâmicos com emojis intuitivos e indicadores de status atualizados em tempo real.
- 📋 **Navegação Paginada**: Navegue por listas de chaves e usuários com os botões `◀️ Ant`, `Página X/Y` e `Próx ▶️`.
- ⚡ **Fluxos Passo a Passo Guiados**: Geração de licenças, cadastro de contas, extensão de validade e liberação de HWID de forma interativa.
- 📊 **Diagnóstico em Tempo Real**: Visualize usuários registrados, licenças ativas e o status do modo de manutenção.
- 🔒 **Controle de Acesso Restrito**: Operações administrativas limitadas unicamente aos IDs numéricos autorizados do Telegram.
- 🌐 **Arquitetura Limpa em TypeScript**: Compatível com Node.js 18+, Docker e PM2.

---

## Pré-requisitos

1. **Node.js**: `v18.0.0` ou versão superior.
2. **Token do Bot Telegram**:
   - Abra o Telegram e inicie conversa com [@BotFather](https://t.me/BotFather).
   - Envie `/newbot` e siga as instruções para definir nome e nome de usuário.
   - Guarde o token HTTP da API gerado pelo BotFather.
3. **Seu ID de Usuário do Telegram**:
   - Envie uma mensagem para [@userinfobot](https://t.me/userinfobot) ou [@rawdatabot](https://t.me/rawdatabot) para obter o seu ID numérico (ex.: `123456789`).
4. **Chave de API Business NightAuth**:
   - Entre no painel NightAuth.
   - Abra a sua aplicação -> Acesse **Business Settings**.
   - Copie a sua `Business API Key` (`biz_...`).

---

## Instalação e Inicialização

### 1. Clonar e Instalar Dependências

```bash
cd clients/bots/NightAuth-Telegram-Bot
pnpm install
```

### 2. Configurar Variáveis de Ambiente

Copie o modelo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Token do Bot Telegram
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"

# Endpoint da API Business NightAuth
NIGHTAUTH_API_URL="https://nightauth.org/api/business"

# Configuração Multi-App (Pares Nome:ApiKey separados por vírgula)
NIGHTAUTH_APPS="AppUm:biz_0123456789abcdef0123456789abcdef,AppDois:biz_fedcba9876543210fedcba9876543210"

# Idioma Padrão (en, es, fr, de, it, pt, ru, tr, pl, zh)
DEFAULT_LANGUAGE="pt"

# Controle de Acesso (IDs numéricos de Telegram autorizados)
ADMIN_USER_IDS="123456789"
```

### 3. Iniciar o Bot

**Modo Desenvolvimento (Hot Reload via tsx):**
```bash
pnpm dev
```

**Produção:**
```bash
pnpm build
pnpm start
```

---

## Comandos e Interação

### Comandos do Bot

| Comando | Descrição |
| :--- | :--- |
| `/start` | Tela inicial com atalhos, indicação de aplicativo ativo e menu principal. |
| `/panel` | Exibe o painel de administração interativo. |
| `/apps` | Lista aplicativos configurados com botões de troca rápida. |
| `/switchapp` | Seletor para mudar a aplicação ativa. |
| `/stats` | Mostra estatísticas em tempo real (total de usuários, licenças ativas, manutenção). |
| `/language` ou `/lang` | Seletor de idioma (`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `tr`, `pl`, `zh`). |

### Menus Interativos

- 🔑 **Menu de Licenças**:
  - `➕ Gerar Chave`: Assistente para definir dias, nível e quantidade.
  - `📋 Listar Chaves`: Navegação paginada com status e data de vencimento.
  - `ℹ️ Info da Chave`: Exibe criador, status de ativação e usuário vinculado.
  - `⏱️ Estender Chave`: Adiciona dias de validade a uma licença.
  - `🚫 Banir / Desbanir`: Suspende ou reabilita uma chave.
  - `🗑️ Excluir Chave`: Remove permanentemente a licença do banco de dados.
- 👤 **Menu de Usuários**:
  - `➕ Adicionar Usuário`: Cadastro de conta com credenciais e licença opcional.
  - `📋 Listar Usuários`: Visualizador paginado das contas de clientes.
  - `ℹ️ Info do Usuário`: Consulta o hardware ID (HWID), nível e expiração.
  - `🔄 Resetar HWID`: Remove a trava de equipamento para permitir transferências.
  - `🚫 Banir / Desbanir Usuário`: Bloqueia ou restabelece o acesso do usuário.
  - `⏸️ Pausar / Retomar`: Suspende temporariamente o login da conta.
  - `🗑️ Excluir Usuário`: Remove permanentemente o cadastro do usuário.
- ⚙️ **Configurações da Aplicação**:
  - `⏸️ Modo Manutenção`: Pausa ou retoma imediatamente os logins no aplicativo.

---

## Implantação com Docker

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

Construção e execução:
```bash
docker build -t nightauth-telegram-bot .
docker run -d --name nightauth-telegram --env-file .env nightauth-telegram-bot
```

---

## Licença

Este software é distribuído sob os termos da [Elastic License 2.0](../LICENSE).
