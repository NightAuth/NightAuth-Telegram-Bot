import { Markup } from "telegraf";
import { AppConfig } from "./config";
import { SUPPORTED_LANGUAGES, t } from "./i18n";

export function mainMenuKeyboard(activeApp: AppConfig, allApps: AppConfig[], lang: string = "en") {
  const buttons: any[] = [];

  // If multiple apps configured, top button allows switching
  if (allApps.length > 1) {
    buttons.push([Markup.button.callback(`📱 Active App: ${activeApp.name} 🔄`, "nav_switch_app")]);
  } else {
    buttons.push([Markup.button.callback(`📱 App: ${activeApp.name} 🟢`, "nav_app_stats")]);
  }

  buttons.push([
    Markup.button.callback(t("btnLicenses", lang), "nav_menu_licenses"),
    Markup.button.callback(t("btnUsers", lang), "nav_menu_users"),
  ]);

  buttons.push([
    Markup.button.callback(t("btnStats", lang), "nav_app_stats"),
    Markup.button.callback("⚙️ Control", "nav_menu_app_control"),
  ]);

  buttons.push([
    Markup.button.callback(t("btnLanguage", lang), "nav_menu_language"),
  ]);

  return Markup.inlineKeyboard(buttons);
}

export function appSwitcherKeyboard(activeApp: AppConfig, allApps: AppConfig[]) {
  const rows: any[] = [];

  // Group apps in rows of 2
  for (let i = 0; i < allApps.length; i += 2) {
    const row = [];
    const app1 = allApps[i];
    const isApp1Active = app1.name === activeApp.name;
    row.push(
      Markup.button.callback(
        `${isApp1Active ? "✅" : "📱"} ${app1.name}`,
        `act_switch_app:${app1.name}`,
      ),
    );

    if (i + 1 < allApps.length) {
      const app2 = allApps[i + 1];
      const isApp2Active = app2.name === activeApp.name;
      row.push(
        Markup.button.callback(
          `${isApp2Active ? "✅" : "📱"} ${app2.name}`,
          `act_switch_app:${app2.name}`,
        ),
      );
    }
    rows.push(row);
  }

  rows.push([Markup.button.callback("◀️ Back to Dashboard", "nav_menu_main")]);
  return Markup.inlineKeyboard(rows);
}

export function languageSelectorKeyboard(currentLang: string = "en") {
  const rows: any[] = [];
  const currentLower = currentLang.toLowerCase();

  for (let i = 0; i < SUPPORTED_LANGUAGES.length; i += 2) {
    const row = [];
    const l1 = SUPPORTED_LANGUAGES[i];
    const isL1Active = l1.code === currentLower;
    row.push(
      Markup.button.callback(
        `${isL1Active ? "✅ " : ""}${l1.flag} ${l1.name}`,
        `act_set_lang:${l1.code}`,
      ),
    );

    if (i + 1 < SUPPORTED_LANGUAGES.length) {
      const l2 = SUPPORTED_LANGUAGES[i + 1];
      const isL2Active = l2.code === currentLower;
      row.push(
        Markup.button.callback(
          `${isL2Active ? "✅ " : ""}${l2.flag} ${l2.name}`,
          `act_set_lang:${l2.code}`,
        ),
      );
    }
    rows.push(row);
  }

  rows.push([Markup.button.callback("◀️ Back to Dashboard", "nav_menu_main")]);
  return Markup.inlineKeyboard(rows);
}

export function licensesMenuKeyboard(lang: string = "en") {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("➕ Generate Key", "prompt_create_license"),
      Markup.button.callback("📋 List Keys", "act_list_licenses:0"),
    ],
    [
      Markup.button.callback("⏱️ Add Time", "prompt_add_time"),
      Markup.button.callback("🔍 License Info", "prompt_find_license"),
    ],
    [
      Markup.button.callback("🚫 Ban Key", "prompt_ban_license"),
      Markup.button.callback("🗑️ Delete Key", "prompt_del_license"),
    ],
    [Markup.button.callback(t("btnBack", lang), "nav_menu_main")],
  ]);
}

export function usersMenuKeyboard(lang: string = "en") {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("➕ Add User", "prompt_add_user"),
      Markup.button.callback("📋 List Users", "act_list_users:0"),
    ],
    [
      Markup.button.callback("🔄 Reset HWID", "prompt_reset_hwid"),
      Markup.button.callback("🔍 User Profile", "prompt_find_user"),
    ],
    [
      Markup.button.callback("⏸️ Pause User", "prompt_pause_user"),
      Markup.button.callback("▶️ Unpause User", "prompt_unpause_user"),
    ],
    [
      Markup.button.callback("🚫 Ban User", "prompt_ban_user"),
      Markup.button.callback("🗑️ Delete User", "prompt_del_user"),
    ],
    [Markup.button.callback(t("btnBack", lang), "nav_menu_main")],
  ]);
}

export function appControlKeyboard(activeApp: AppConfig, lang: string = "en") {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("⏸️ Pause App", "act_pause_app"),
      Markup.button.callback("▶️ Unpause App", "act_unpause_app"),
    ],
    [Markup.button.callback("📊 View Diagnostics", "nav_app_stats")],
    [Markup.button.callback(t("btnBack", lang), "nav_menu_main")],
  ]);
}

export function paginationKeyboard(
  prefix: string,
  currentPage: number,
  totalPages: number,
  backAction: string = "nav_menu_main",
) {
  const row: any[] = [];

  if (currentPage > 0) {
    row.push(Markup.button.callback("◀️ Prev", `${prefix}:${currentPage - 1}`));
  }

  row.push(Markup.button.callback(`📄 ${currentPage + 1}/${Math.max(1, totalPages)}`, "noop"));

  if (currentPage + 1 < totalPages) {
    row.push(Markup.button.callback("Next ▶️", `${prefix}:${currentPage + 1}`));
  }

  return Markup.inlineKeyboard([row, [Markup.button.callback("◀️ Back", backAction)]]);
}
