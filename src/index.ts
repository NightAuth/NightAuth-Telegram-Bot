import { Telegraf } from "telegraf";
import { config } from "./config";
import {
  getActiveApp,
  getAppByName,
  getAvailableApps,
  getClientForApp,
  getPendingPrompt,
  getUserLanguage,
  isUserAdmin,
  setActiveApp,
  setPendingPrompt,
  setUserLanguage,
} from "./state";
import {
  appControlKeyboard,
  appSwitcherKeyboard,
  languageSelectorKeyboard,
  licensesMenuKeyboard,
  mainMenuKeyboard,
  paginationKeyboard,
  usersMenuKeyboard,
} from "./keyboards";
import { getLanguageName, t } from "./i18n";

if (!config.token) {
  console.error("❌ TELEGRAM_BOT_TOKEN is missing in .env! Please set your bot token.");
  process.exit(1);
}

const bot = new Telegraf(config.token);

// Middleware: Admin Security Check
bot.use(async (ctx, next) => {
  const fromId = ctx.from?.id;
  const userLang = getUserLanguage(fromId || 0);
  if (!isUserAdmin(fromId)) {
    if (ctx.callbackQuery) {
      await ctx.answerCbQuery(t("unauthorized", userLang), { show_alert: true }).catch(() => {});
    } else {
      await ctx.reply(t("unauthorized", userLang), { parse_mode: "Markdown" }).catch(() => {});
    }
    return;
  }
  return next();
});

// Helper: Main Dashboard Message
function getDashboardMessage(userId: number): { text: string; extra: any } {
  const userLang = getUserLanguage(userId);
  const activeApp = getActiveApp(userId);
  const allApps = getAvailableApps();
  const langName = getLanguageName(userLang);

  const text =
    `${t("botTitle", userLang)}\n\n` +
    `📱 *Active Application:* \`${activeApp.name}\`\n` +
    `🌐 *Configured Applications:* ${allApps.length}\n` +
    `🗣️ *Language / Idioma:* ${langName}\n` +
    `🔗 *Business API:* \`${config.apiUrl}\`\n\n` +
    `Select a management category from the menu below:`;

  return {
    text,
    extra: {
      parse_mode: "Markdown",
      ...mainMenuKeyboard(activeApp, allApps, userLang),
    },
  };
}

// -----------------------------------------------------------------------------
// Commands: /start, /panel, /help
// -----------------------------------------------------------------------------
bot.command(["start", "panel", "help"], async (ctx) => {
  setPendingPrompt(ctx.from.id, null);
  const { text, extra } = getDashboardMessage(ctx.from.id);
  await ctx.reply(text, extra);
});

// /apps
bot.command("apps", async (ctx) => {
  const allApps = getAvailableApps();
  const activeApp = getActiveApp(ctx.from.id);

  if (allApps.length === 0) {
    await ctx.reply("⚠️ No applications configured in `.env`.");
    return;
  }

  const list = allApps
    .map((a) => (a.name === activeApp.name ? `• *${a.name}* 🟢 _(Active)_` : `• *${a.name}*`))
    .join("\n");

  await ctx.reply(`📱 *Configured Applications:*\n\n${list}`, {
    parse_mode: "Markdown",
    ...appSwitcherKeyboard(activeApp, allApps),
  });
});

// /switchapp <name>
bot.command("switchapp", async (ctx) => {
  const text = ctx.message.text.split(" ");
  const targetName = text.slice(1).join(" ").trim();

  if (!targetName) {
    await ctx.reply("Usage: `/switchapp <AppName>`", { parse_mode: "Markdown" });
    return;
  }

  const switched = setActiveApp(ctx.from.id, targetName);
  if (!switched) {
    await ctx.reply(`❌ Application *${targetName}* not found.`, { parse_mode: "Markdown" });
    return;
  }

  await ctx.reply(`✅ Active application switched to *${targetName}*.`, {
    parse_mode: "Markdown",
  });
});

// /stats
bot.command("stats", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  const client = getClientForApp(activeApp);

  const res = await client.getStats();
  if (!res.success) {
    await ctx.reply(`❌ Failed to fetch stats: ${res.error || res.message}`);
    return;
  }

  const stats = res.data || res;
  const msg =
    `📊 *Statistics: ${activeApp.name}*\n\n` +
    `👥 *Total Users:* ${stats.usersCount ?? stats.users ?? "0"}\n` +
    `🔑 *Total Licenses:* ${stats.licensesCount ?? stats.licenses ?? "0"}\n` +
    `🟢 *Active Subscriptions:* ${stats.activeLicensesCount ?? stats.active ?? "0"}\n` +
    `⚡ *Active Sessions:* ${stats.sessionsCount ?? stats.sessions ?? "0"}\n` +
    `⏸️ *Maintenance Status:* ${stats.paused ? "🔴 Paused" : "🟢 Active"}`;

  await ctx.reply(msg, { parse_mode: "Markdown" });
});

// /lang & /language
bot.command(["lang", "language"], async (ctx) => {
  const userLang = getUserLanguage(ctx.from.id);
  await ctx.reply(t("chooseLanguage", userLang), {
    parse_mode: "Markdown",
    ...languageSelectorKeyboard(userLang),
  });
});

// -----------------------------------------------------------------------------
// Callback Query Routing
// -----------------------------------------------------------------------------
bot.action("noop", async (ctx) => {
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("nav_menu_main", async (ctx) => {
  setPendingPrompt(ctx.from.id, null);
  const { text, extra } = getDashboardMessage(ctx.from.id);
  await ctx.editMessageText(text, extra).catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("nav_menu_language", async (ctx) => {
  const userLang = getUserLanguage(ctx.from.id);
  await ctx
    .editMessageText(t("chooseLanguage", userLang), {
      parse_mode: "Markdown",
      ...languageSelectorKeyboard(userLang),
    })
    .catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

bot.action(/^act_set_lang:(.+)$/, async (ctx) => {
  const langCode = ctx.match[1];
  setUserLanguage(ctx.from.id, langCode);
  const langName = getLanguageName(langCode);
  await ctx.answerCbQuery(t("langSwitched", langCode, { lang: langName })).catch(() => {});
  const { text, extra } = getDashboardMessage(ctx.from.id);
  await ctx.editMessageText(text, extra).catch(() => {});
});

bot.action("nav_switch_app", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  const allApps = getAvailableApps();
  await ctx
    .editMessageText(
      `📱 *Select an Application to Manage:*\nCurrently Active: *${activeApp.name}*`,
      {
        parse_mode: "Markdown",
        ...appSwitcherKeyboard(activeApp, allApps),
      },
    )
    .catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

bot.action(/^act_switch_app:(.+)$/, async (ctx) => {
  const appName = ctx.match[1];
  const switched = setActiveApp(ctx.from.id, appName);
  if (switched) {
    await ctx.answerCbQuery(`Switched to ${appName}!`).catch(() => {});
  } else {
    await ctx.answerCbQuery("App not found!").catch(() => {});
  }
  const { text, extra } = getDashboardMessage(ctx.from.id);
  await ctx.editMessageText(text, extra).catch(() => {});
});

bot.action("nav_menu_licenses", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  const userLang = getUserLanguage(ctx.from.id);
  await ctx
    .editMessageText(
      `🔑 *License Management — ${activeApp.name}*\nChoose an action from the options below:`,
      {
        parse_mode: "Markdown",
        ...licensesMenuKeyboard(userLang),
      },
    )
    .catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("nav_menu_users", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  const userLang = getUserLanguage(ctx.from.id);
  await ctx
    .editMessageText(
      `👥 *User Management — ${activeApp.name}*\nChoose an action from the options below:`,
      {
        parse_mode: "Markdown",
        ...usersMenuKeyboard(userLang),
      },
    )
    .catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("nav_menu_app_control", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  const userLang = getUserLanguage(ctx.from.id);
  await ctx
    .editMessageText(
      `⚙️ *Application Control — ${activeApp.name}*\nManage client authentication and maintenance status:`,
      {
        parse_mode: "Markdown",
        ...appControlKeyboard(activeApp, userLang),
      },
    )
    .catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("nav_app_stats", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  const client = getClientForApp(activeApp);

  const res = await client.getStats();
  if (!res.success) {
    await ctx.answerCbQuery(`Error: ${res.error || res.message}`, { show_alert: true }).catch(() => {});
    return;
  }

  const stats = res.data || res;
  const msg =
    `📊 *Diagnostics & Statistics — ${activeApp.name}*\n\n` +
    `👥 *Total Users:* \`${stats.usersCount ?? stats.users ?? "0"}\`\n` +
    `🔑 *Total Licenses:* \`${stats.licensesCount ?? stats.licenses ?? "0"}\`\n` +
    `🟢 *Active Subscriptions:* \`${stats.activeLicensesCount ?? stats.active ?? "0"}\`\n` +
    `⚡ *Active Sessions:* \`${stats.sessionsCount ?? stats.sessions ?? "0"}\`\n` +
    `⏸️ *Maintenance Status:* ${stats.paused ? "🔴 Paused" : "🟢 Active"}\n\n` +
    `_Updated in real time via NightAuth Business API._`;

  await ctx
    .editMessageText(msg, {
      parse_mode: "Markdown",
      ...appControlKeyboard(activeApp),
    })
    .catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

// App Pause / Unpause
bot.action("act_pause_app", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  const client = getClientForApp(activeApp);
  const res = await client.pauseApp();
  if (res.success) {
    await ctx.answerCbQuery(`⏸️ Application ${activeApp.name} paused.`, { show_alert: true }).catch(() => {});
  } else {
    await ctx.answerCbQuery(`Error: ${res.error || res.message}`, { show_alert: true }).catch(() => {});
  }
});

bot.action("act_unpause_app", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  const client = getClientForApp(activeApp);
  const res = await client.unpauseApp();
  if (res.success) {
    await ctx.answerCbQuery(`▶️ Application ${activeApp.name} unpaused.`, { show_alert: true }).catch(() => {});
  } else {
    await ctx.answerCbQuery(`Error: ${res.error || res.message}`, { show_alert: true }).catch(() => {});
  }
});

// Paginated Licenses List
bot.action(/^act_list_licenses:(\d+)$/, async (ctx) => {
  const page = parseInt(ctx.match[1], 10) || 0;
  const pageSize = 10;
  const activeApp = getActiveApp(ctx.from.id);
  const client = getClientForApp(activeApp);

  const res = await client.listLicenses();
  if (!res.success) {
    await ctx.answerCbQuery(`Error: ${res.error || res.message}`, { show_alert: true }).catch(() => {});
    return;
  }

  const list = (res.data?.licenses || res.licenses || []) as any[];
  const totalPages = Math.ceil(list.length / pageSize) || 1;
  const slice = list.slice(page * pageSize, (page + 1) * pageSize);

  const formatted = slice
    .map(
      (l) =>
        `• \`${l.key}\`\n  Level ${l.level} | ${l.used ? `👤 Used by *${l.usedBy || "User"}*` : "🟢 *Available*"}`,
    )
    .join("\n\n");

  const text =
    `🔑 *Licenses List — ${activeApp.name}*\n` +
    `Total: *${list.length}* keys (Page ${page + 1}/${totalPages})\n\n` +
    (formatted || "_No licenses found._");

  await ctx
    .editMessageText(text, {
      parse_mode: "Markdown",
      ...paginationKeyboard("act_list_licenses", page, totalPages, "nav_menu_licenses"),
    })
    .catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

// Paginated Users List
bot.action(/^act_list_users:(\d+)$/, async (ctx) => {
  const page = parseInt(ctx.match[1], 10) || 0;
  const pageSize = 10;
  const activeApp = getActiveApp(ctx.from.id);
  const client = getClientForApp(activeApp);

  const res = await client.listUsers();
  if (!res.success) {
    await ctx.answerCbQuery(`Error: ${res.error || res.message}`, { show_alert: true }).catch(() => {});
    return;
  }

  const list = (res.data?.users || res.users || []) as any[];
  const totalPages = Math.ceil(list.length / pageSize) || 1;
  const slice = list.slice(page * pageSize, (page + 1) * pageSize);

  const formatted = slice
    .map(
      (u) =>
        `• *${u.username}*\n  Status: \`${u.status || "active"}\` | HWID: ${u.hwid ? "🔒 Locked" : "🔓 Unlocked"}`,
    )
    .join("\n\n");

  const text =
    `👥 *Users List — ${activeApp.name}*\n` +
    `Total: *${list.length}* users (Page ${page + 1}/${totalPages})\n\n` +
    (formatted || "_No users registered._");

  await ctx
    .editMessageText(text, {
      parse_mode: "Markdown",
      ...paginationKeyboard("act_list_users", page, totalPages, "nav_menu_users"),
    })
    .catch(() => {});
  await ctx.answerCbQuery().catch(() => {});
});

// -----------------------------------------------------------------------------
// Interactive Prompts Triggered by Buttons
// -----------------------------------------------------------------------------
bot.action("prompt_create_license", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  setPendingPrompt(ctx.from.id, {
    action: "create_license",
    step: 1,
    data: {},
    appName: activeApp.name,
  });
  await ctx.reply(
    `🔑 *Generate Licenses — ${activeApp.name}*\n\n` +
      `Please reply with the generation parameters in this format:\n` +
      `\`<amount> <days> [level] [mask]\`\n\n` +
      `*Example:* \`5 30 1 NA-*****-*****-*****\`\n` +
      `Or just enter the amount: \`5\``,
    { parse_mode: "Markdown" },
  );
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("prompt_add_time", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  setPendingPrompt(ctx.from.id, {
    action: "add_time",
    step: 1,
    data: {},
    appName: activeApp.name,
  });
  await ctx.reply(
    `⏱️ *Extend License — ${activeApp.name}*\n\n` +
      `Please reply with the license key and days to add:\n` +
      `\`<LicenseKey> <Days>\`\n\n` +
      `*Example:* \`NA-ABCDE-12345-FGHIJ 30\``,
    { parse_mode: "Markdown" },
  );
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("prompt_find_license", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  setPendingPrompt(ctx.from.id, {
    action: "find_license",
    step: 1,
    data: {},
    appName: activeApp.name,
  });
  await ctx.reply(`🔍 *Inspect License — ${activeApp.name}*\n\nPlease reply with the license key:`, {
    parse_mode: "Markdown",
  });
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("prompt_ban_license", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  setPendingPrompt(ctx.from.id, {
    action: "ban_license",
    step: 1,
    data: {},
    appName: activeApp.name,
  });
  await ctx.reply(
    `🚫 *Ban License — ${activeApp.name}*\n\n` +
      `Reply with the key and optional reason:\n` +
      `\`<LicenseKey> [Reason]\``,
    { parse_mode: "Markdown" },
  );
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("prompt_add_user", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  setPendingPrompt(ctx.from.id, {
    action: "add_user",
    step: 1,
    data: {},
    appName: activeApp.name,
  });
  await ctx.reply(
    `👤 *Add User Account — ${activeApp.name}*\n\n` +
      `Please reply with account details in this format:\n` +
      `\`<username> <password> [email] [licenseKey]\`\n\n` +
      `*Example:* \`johndoe SecurePass123! john@example.com NA-XXXXX\``,
    { parse_mode: "Markdown" },
  );
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("prompt_reset_hwid", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  setPendingPrompt(ctx.from.id, {
    action: "reset_hwid",
    step: 1,
    data: {},
    appName: activeApp.name,
  });
  await ctx.reply(`🔄 *Reset User HWID — ${activeApp.name}*\n\nPlease reply with target username:`, {
    parse_mode: "Markdown",
  });
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("prompt_find_user", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  setPendingPrompt(ctx.from.id, {
    action: "find_user",
    step: 1,
    data: {},
    appName: activeApp.name,
  });
  await ctx.reply(`👤 *User Profile — ${activeApp.name}*\n\nPlease reply with the username:`, {
    parse_mode: "Markdown",
  });
  await ctx.answerCbQuery().catch(() => {});
});

bot.action("prompt_ban_user", async (ctx) => {
  const activeApp = getActiveApp(ctx.from.id);
  setPendingPrompt(ctx.from.id, {
    action: "ban_user",
    step: 1,
    data: {},
    appName: activeApp.name,
  });
  await ctx.reply(
    `🚫 *Ban User Account — ${activeApp.name}*\n\n` +
      `Reply with username and optional reason:\n` +
      `\`<username> [Reason]\``,
    { parse_mode: "Markdown" },
  );
  await ctx.answerCbQuery().catch(() => {});
});

// -----------------------------------------------------------------------------
// Text Input Handler for Interactive Prompts
// -----------------------------------------------------------------------------
bot.on("text", async (ctx) => {
  const prompt = getPendingPrompt(ctx.from.id);
  if (!prompt) return;

  const text = ctx.message.text.trim();
  const targetApp = getAppByName(prompt.appName) || getActiveApp(ctx.from.id);
  const client = getClientForApp(targetApp);

  // Clear prompt
  setPendingPrompt(ctx.from.id, null);

  // 1. Create License
  if (prompt.action === "create_license") {
    const parts = text.split(/\s+/);
    const amount = parseInt(parts[0], 10) || 1;
    const expiry = parts.length > 1 ? parseInt(parts[1], 10) || 30 : 30;
    const level = parts.length > 2 ? parseInt(parts[2], 10) || 1 : 1;
    const mask = parts.length > 3 ? parts[3] : "NA-*****-*****-*****";

    const res = await client.createLicenses({ amount, expiry, level, mask });
    if (!res.success) {
      await ctx.reply(`❌ Failed to create licenses: ${res.error || res.message}`);
      return;
    }

    const keys: string[] = res.keys || (res.key ? [res.key] : []) || [];
    const formattedKeys = keys.map((k) => `\`${k}\``).join("\n");

    await ctx.reply(
      `✅ *${keys.length} License(s) Created Successfully*\n` +
        `App: *${targetApp.name}* | Expiry: *${expiry} days* | Level: *${level}*\n\n` +
        `*Keys:*\n${formattedKeys || "Key generated."}`,
      { parse_mode: "Markdown" },
    );
    return;
  }

  // 2. Add Time
  if (prompt.action === "add_time") {
    const parts = text.split(/\s+/);
    const key = parts[0];
    const days = parts.length > 1 ? parseInt(parts[1], 10) || 30 : 30;

    const res = await client.addLicenseTime(key, days);
    if (!res.success) {
      await ctx.reply(`❌ Failed: ${res.error || res.message}`);
      return;
    }

    await ctx.reply(`⏱️ Added *${days} days* to license \`${key}\` on *${targetApp.name}*.`, {
      parse_mode: "Markdown",
    });
    return;
  }

  // 3. Find License
  if (prompt.action === "find_license") {
    const key = text;
    const res = await client.getLicense(key);
    if (!res.success) {
      await ctx.reply(`❌ License not found: ${res.error || res.message}`);
      return;
    }

    const lic = res.data?.license || res.license || res;
    await ctx.reply(
      `🔍 *License Details — ${targetApp.name}*\n\n` +
        `• *Key:* \`${lic.key || key}\`\n` +
        `• *Status:* \`${lic.status || "active"}\`\n` +
        `• *Level:* ${lic.level ?? 1}\n` +
        `• *Used:* ${lic.used ? `Yes (${lic.usedBy || "User"})` : "🟢 Available"}\n` +
        `• *Duration:* ${lic.durationDays ?? lic.expiry ?? "30"} days\n` +
        `• *Created:* ${lic.createdAt ? new Date(lic.createdAt).toLocaleString() : "N/A"}`,
      { parse_mode: "Markdown" },
    );
    return;
  }

  // 4. Ban License
  if (prompt.action === "ban_license") {
    const parts = text.split(/\s+/);
    const key = parts[0];
    const reason = parts.slice(1).join(" ") || undefined;

    const res = await client.banLicense(key, reason);
    if (!res.success) {
      await ctx.reply(`❌ Failed to ban license: ${res.error || res.message}`);
      return;
    }

    await ctx.reply(`🚫 License \`${key}\` has been banned on *${targetApp.name}*.`, {
      parse_mode: "Markdown",
    });
    return;
  }

  // 5. Add User
  if (prompt.action === "add_user") {
    const parts = text.split(/\s+/);
    const username = parts[0];
    const password = parts[1] || "Pass1234!";
    const email = parts[2] && parts[2].includes("@") ? parts[2] : undefined;
    const key = parts[3] || (!parts[2]?.includes("@") ? parts[2] : undefined);

    const res = await client.createUser({ username, password, email, key });
    if (!res.success) {
      await ctx.reply(`❌ Failed to create user: ${res.error || res.message}`);
      return;
    }

    await ctx.reply(
      `✅ *User Created Successfully*\n\n` +
        `• *App:* ${targetApp.name}\n` +
        `• *Username:* \`${username}\`\n` +
        `• *Email:* ${email || "None"}\n` +
        `• *Bound License:* ${key ? `\`${key}\`` : "None"}`,
      { parse_mode: "Markdown" },
    );
    return;
  }

  // 6. Reset HWID
  if (prompt.action === "reset_hwid") {
    const username = text;
    const res = await client.resetUserHwid(username);
    if (!res.success) {
      await ctx.reply(`❌ Failed to reset HWID: ${res.error || res.message}`);
      return;
    }

    await ctx.reply(`🔄 HWID lock for *${username}* in *${targetApp.name}* has been cleared.`, {
      parse_mode: "Markdown",
    });
    return;
  }

  // 7. Find User
  if (prompt.action === "find_user") {
    const username = text;
    const res = await client.getUser(username);
    if (!res.success) {
      await ctx.reply(`❌ User not found: ${res.error || res.message}`);
      return;
    }

    const u = res.data?.user || res.user || res;
    await ctx.reply(
      `👤 *User Profile — ${targetApp.name}*\n\n` +
        `• *Username:* \`${u.username || username}\`\n` +
        `• *Status:* \`${u.status || "active"}\`\n` +
        `• *Email:* ${u.email || "None"}\n` +
        `• *HWID:* ${u.hwid ? `\`${u.hwid.slice(0, 16)}...\`` : "🔓 *Unlocked*"}\n` +
        `• *Last Login:* ${u.lastLogin || "Never"}\n` +
        `• *IP Address:* \`${u.ip || "None"}\``,
      { parse_mode: "Markdown" },
    );
    return;
  }

  // 8. Ban User
  if (prompt.action === "ban_user") {
    const parts = text.split(/\s+/);
    const username = parts[0];
    const reason = parts.slice(1).join(" ") || undefined;

    const res = await client.banUser(username, reason);
    if (!res.success) {
      await ctx.reply(`❌ Failed to ban user: ${res.error || res.message}`);
      return;
    }

    await ctx.reply(`🚫 User *${username}* has been banned in *${targetApp.name}*.`, {
      parse_mode: "Markdown",
    });
    return;
  }
});

// Launch Bot
bot.launch().then(() => {
  console.log("🤖 NightAuth Telegram Bot is running!");
  console.log(`🔗 Business API Endpoint: ${config.apiUrl}`);
  console.log(`📱 Loaded ${config.apps.length} application(s): ${config.apps.map((a) => a.name).join(", ") || "None"}`);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
