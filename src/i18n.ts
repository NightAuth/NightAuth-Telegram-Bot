export interface TranslationStrings {
  botTitle: string;
  welcome: string;
  unauthorized: string;
  appSwitched: string;
  appNotFound: string;
  appStatsTitle: string;
  noAppsConfigured: string;
  btnLicenses: string;
  btnUsers: string;
  btnStats: string;
  btnSwitchApp: string;
  btnCreateKey: string;
  btnAddUser: string;
  btnResetHwid: string;
  btnLanguage: string;
  btnBack: string;
  chooseLanguage: string;
  langSwitched: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export const translations: Record<string, TranslationStrings> = {
  en: {
    botTitle: "🛡️ NightAuth Telegram Console",
    welcome: "👋 Welcome to your self-hosted **NightAuth Bot**.\nManage licenses, users, and multiple applications directly from Telegram.",
    unauthorized: "⛔ **Access Denied**: You are not authorized to execute administrative commands.",
    appSwitched: "✅ Active application switched to *{app}*.",
    appNotFound: "❌ Application *{app}* not found in your configured applications.",
    appStatsTitle: "📊 Application Overview & Statistics",
    noAppsConfigured: "⚠️ No applications configured. Check `NIGHTAUTH_APPS` in `.env`.",
    btnLicenses: "🔑 Licenses",
    btnUsers: "👥 Users",
    btnStats: "📊 Statistics",
    btnSwitchApp: "📱 Switch App",
    btnCreateKey: "➕ Generate Keys",
    btnAddUser: "➕ Add User",
    btnResetHwid: "🔄 Reset HWID",
    btnLanguage: "🌐 Language",
    btnBack: "◀️ Back to Main Menu",
    chooseLanguage: "🌐 *Choose your preferred language / Elige tu idioma:*",
    langSwitched: "✅ Language updated to *{lang}*.",
  },
  es: {
    botTitle: "🛡️ Consola de Telegram NightAuth",
    welcome: "👋 Bienvenido a tu **Bot NightAuth** autoalojado.\nAdministra licencias, usuarios y múltiples aplicaciones desde Telegram.",
    unauthorized: "⛔ **Acceso Denegado**: No estás autorizado para ejecutar comandos administrativos.",
    appSwitched: "✅ Aplicación activa cambiada a *{app}*.",
    appNotFound: "❌ Aplicación *{app}* no encontrada en tus aplicaciones configuradas.",
    appStatsTitle: "📊 Estadísticas de la Aplicación",
    noAppsConfigured: "⚠️ No hay aplicaciones configuradas. Revisa `NIGHTAUTH_APPS` en `.env`.",
    btnLicenses: "🔑 Licencias",
    btnUsers: "👥 Usuarios",
    btnStats: "📊 Estadísticas",
    btnSwitchApp: "📱 Cambiar App",
    btnCreateKey: "➕ Crear Claves",
    btnAddUser: "➕ Añadir Usuario",
    btnResetHwid: "🔄 Resetear HWID",
    btnLanguage: "🌐 Idioma",
    btnBack: "◀️ Volver al Menú Principal",
    chooseLanguage: "🌐 *Elige tu idioma preferido / Choose your language:*",
    langSwitched: "✅ Idioma actualizado a *{lang}*.",
  },
  de: {
    botTitle: "🛡️ NightAuth Telegram Konsole",
    welcome: "👋 Willkommen bei Ihrem selbst gehosteten **NightAuth Bot**.\nVerwalten Sie Lizenzen, Benutzer und mehrere Anwendungen direkt über Telegram.",
    unauthorized: "⛔ **Zugriff verweigert**: Sie sind nicht berechtigt, administrative Befehle auszuführen.",
    appSwitched: "✅ Aktive Anwendung gewechselt zu *{app}*.",
    appNotFound: "❌ Anwendung *{app}* in der Konfiguration nicht gefunden.",
    appStatsTitle: "📊 Anwendungsstatistiken",
    noAppsConfigured: "⚠️ Keine Anwendungen konfiguriert. Überprüfen Sie `NIGHTAUTH_APPS` in `.env`.",
    btnLicenses: "🔑 Lizenzen",
    btnUsers: "👥 Benutzer",
    btnStats: "📊 Statistiken",
    btnSwitchApp: "📱 App wechseln",
    btnCreateKey: "➕ Schlüssel erstellen",
    btnAddUser: "➕ Benutzer hinzufügen",
    btnResetHwid: "🔄 HWID zurücksetzen",
    btnLanguage: "🌐 Sprache",
    btnBack: "◀️ Zurück zum Hauptmenü",
    chooseLanguage: "🌐 *Wählen Sie Ihre bevorzugte Sprache:*",
    langSwitched: "✅ Sprache geändert zu *{lang}*.",
  },
  fr: {
    botTitle: "🛡️ Console Telegram NightAuth",
    welcome: "👋 Bienvenue sur votre **Bot NightAuth** auto-hébergé.\nGérez licences, utilisateurs et applications directement depuis Telegram.",
    unauthorized: "⛔ **Accès Refusé**: Vous n'êtes pas autorisé à exécuter des commandes administratives.",
    appSwitched: "✅ Application active basculée vers *{app}*.",
    appNotFound: "❌ Application *{app}* introuvable dans la configuration.",
    appStatsTitle: "📊 Statistiques de l'application",
    noAppsConfigured: "⚠️ Aucune application configurée dans `NIGHTAUTH_APPS` dans `.env`.",
    btnLicenses: "🔑 Licences",
    btnUsers: "👥 Utilisateurs",
    btnStats: "📊 Statistiques",
    btnSwitchApp: "📱 Changer d'app",
    btnCreateKey: "➕ Créer clés",
    btnAddUser: "➕ Ajouter utilisateur",
    btnResetHwid: "🔄 Réinitialiser HWID",
    btnLanguage: "🌐 Langue",
    btnBack: "◀️ Retour au menu principal",
    chooseLanguage: "🌐 *Choisissez votre langue préférée :*",
    langSwitched: "✅ Langue mise à jour en *{lang}*.",
  },
  it: {
    botTitle: "🛡️ Console Telegram NightAuth",
    welcome: "👋 Benvenuto nel tuo **Bot NightAuth** self-hosted.\nGestisci licenze, utenti e applicazioni direttamente da Telegram.",
    unauthorized: "⛔ **Accesso Negato**: Non sei autorizzato a eseguire comandi amministrativi.",
    appSwitched: "✅ Applicazione attiva cambiata in *{app}*.",
    appNotFound: "❌ Applicazione *{app}* non trovata nella configurazione.",
    appStatsTitle: "📊 Statistiche dell'Applicazione",
    noAppsConfigured: "⚠️ Nessuna applicazione configurata in `NIGHTAUTH_APPS` nel `.env`.",
    btnLicenses: "🔑 Licenze",
    btnUsers: "👥 Utenti",
    btnStats: "📊 Statistiche",
    btnSwitchApp: "📱 Cambia App",
    btnCreateKey: "➕ Genera Chiavi",
    btnAddUser: "➕ Aggiungi Utente",
    btnResetHwid: "🔄 Reimposta HWID",
    btnLanguage: "🌐 Lingua",
    btnBack: "◀️ Torna al Menu Principale",
    chooseLanguage: "🌐 *Scegli la tua lingua preferita:*",
    langSwitched: "✅ Lingua aggiornata a *{lang}*.",
  },
  pl: {
    botTitle: "🛡️ Konsola Telegram NightAuth",
    welcome: "👋 Witamy w Twoim botcie **NightAuth**.\nZarządzaj licencjami, użytkownikami i aplikacjami bezpośrednio z poziomu Telegrama.",
    unauthorized: "⛔ **Brak dostępu**: Nie masz uprawnień administratora.",
    appSwitched: "✅ Aktywna aplikacja została zmieniona na *{app}*.",
    appNotFound: "❌ Aplikacja *{app}* nie została znaleziona w konfiguracji.",
    appStatsTitle: "📊 Statystyki aplikacji",
    noAppsConfigured: "⚠️ Brak skonfigurowanych aplikacji w `NIGHTAUTH_APPS` w `.env`.",
    btnLicenses: "🔑 Licencje",
    btnUsers: "👥 Użytkownicy",
    btnStats: "📊 Statystyki",
    btnSwitchApp: "📱 Zmień aplikację",
    btnCreateKey: "➕ Generuj klucze",
    btnAddUser: "➕ Dodaj użytkownika",
    btnResetHwid: "🔄 Zresetuj HWID",
    btnLanguage: "🌐 Język",
    btnBack: "◀️ Powrót do menu głównego",
    chooseLanguage: "🌐 *Wybierz swój preferowany język:*",
    langSwitched: "✅ Zaktualizowano język na *{lang}*.",
  },
  pt: {
    botTitle: "🛡️ Console Telegram NightAuth",
    welcome: "👋 Bem-vindo ao seu **Bot NightAuth** auto-hospedado.\nGerencie licenças, usuários e aplicativos diretamente pelo Telegram.",
    unauthorized: "⛔ **Acesso Negado**: Você não tem permissão de administrador.",
    appSwitched: "✅ Aplicativo ativo alterado para *{app}*.",
    appNotFound: "❌ Aplicativo *{app}* não encontrado na configuração.",
    appStatsTitle: "📊 Estatísticas do Aplicativo",
    noAppsConfigured: "⚠️ Nenhum aplicativo configurado em `NIGHTAUTH_APPS` no `.env`.",
    btnLicenses: "🔑 Licenças",
    btnUsers: "👥 Usuários",
    btnStats: "📊 Estatísticas",
    btnSwitchApp: "📱 Trocar App",
    btnCreateKey: "➕ Gerar Chaves",
    btnAddUser: "➕ Adicionar Usuário",
    btnResetHwid: "🔄 Resetar HWID",
    btnLanguage: "🌐 Idioma",
    btnBack: "◀️ Voltar ao Menu Principal",
    chooseLanguage: "🌐 *Escolha seu idioma de preferência:*",
    langSwitched: "✅ Idioma atualizado para *{lang}*.",
  },
  ru: {
    botTitle: "🛡️ Telegram-консоль NightAuth",
    welcome: "👋 Добро пожаловать в автономный бот **NightAuth**.\nУправляйте лицензиями, пользователями и приложениями прямо из Telegram.",
    unauthorized: "⛔ **Доступ запрещен**: У вас нет прав администратора.",
    appSwitched: "✅ Активное приложение переключено на *{app}*.",
    appNotFound: "❌ Приложение *{app}* не найдено в конфигурации.",
    appStatsTitle: "📊 Статистика приложения",
    noAppsConfigured: "⚠️ Приложения не настроены. Проверьте `NIGHTAUTH_APPS` в `.env`.",
    btnLicenses: "🔑 Лицензии",
    btnUsers: "👥 Пользователи",
    btnStats: "📊 Статистика",
    btnSwitchApp: "📱 Сменить приложение",
    btnCreateKey: "➕ Создать ключи",
    btnAddUser: "➕ Добавить пользователя",
    btnResetHwid: "🔄 Сбросить HWID",
    btnLanguage: "🌐 Язык",
    btnBack: "◀️ Назад в главное меню",
    chooseLanguage: "🌐 *Выберите предпочитаемый язык:*",
    langSwitched: "✅ Язык обновлен на *{lang}*.",
  },
  tr: {
    botTitle: "🛡️ NightAuth Telegram Konsolu",
    welcome: "👋 Kendi kendine barındırılan **NightAuth Bot**'a hoş geldiniz.\nLisansları, kullanıcıları ve uygulamaları doğrudan Telegram üzerinden yönetin.",
    unauthorized: "⛔ **Erişim Engellendi**: Yönetici komutlarını çalıştırma izniniz yok.",
    appSwitched: "✅ Aktif uygulama *{app}* olarak değiştirildi.",
    appNotFound: "❌ *{app}* adlı uygulama yapılandırmada bulunamadı.",
    appStatsTitle: "📊 Uygulama İstatistikleri",
    noAppsConfigured: "⚠️ Uygulama yapılandırılmadı. `.env` içindeki `NIGHTAUTH_APPS` kontrol edin.",
    btnLicenses: "🔑 Lisanslar",
    btnUsers: "👥 Kullanıcılar",
    btnStats: "📊 İstatistikler",
    btnSwitchApp: "📱 Uygulamayı Değiştir",
    btnCreateKey: "➕ Anahtar Oluştur",
    btnAddUser: "➕ Kullanıcı Ekle",
    btnResetHwid: "🔄 HWID Sıfırla",
    btnLanguage: "🌐 Dil",
    btnBack: "◀️ Ana Menüye Dön",
    chooseLanguage: "🌐 *Lütfen tercih ettiğiniz dili seçin:*",
    langSwitched: "✅ Dil *{lang}* olarak güncellendi.",
  },
  zh: {
    botTitle: "🛡️ NightAuth Telegram 控制台",
    welcome: "👋 欢迎使用自托管 **NightAuth 机器人**。\n直接在 Telegram 中管理许可证、用户和多个应用程序。",
    unauthorized: "⛔ **访问被拒绝**：您未被授权执行管理命令。",
    appSwitched: "✅ 当前激活的应用已切换为 *{app}*。",
    appNotFound: "❌ 在配置中未找到应用 *{app}*。",
    appStatsTitle: "📊 应用程序统计信息",
    noAppsConfigured: "⚠️ 未配置任何应用，请检查 `.env` 中的 `NIGHTAUTH_APPS`。",
    btnLicenses: "🔑 许可证",
    btnUsers: "👥 用户管理",
    btnStats: "📊 统计信息",
    btnSwitchApp: "📱 切换应用",
    btnCreateKey: "➕ 生成密钥",
    btnAddUser: "➕ 添加用户",
    btnResetHwid: "🔄 重置 HWID",
    btnLanguage: "🌐 语言设置",
    btnBack: "◀️ 返回主菜单",
    chooseLanguage: "🌐 *请选择您的首选语言：*",
    langSwitched: "✅ 语言已更新为 *{lang}*。",
  },
};

export function t(
  key: keyof TranslationStrings,
  lang: string = "en",
  params: Record<string, string> = {},
): string {
  const dict = translations[lang] || translations["en"];
  let str = dict[key] || translations["en"][key] || key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp(`\\{${k}\\}`, "g"), v);
  }
  return str;
}

export function getLanguageName(code: string): string {
  const found = SUPPORTED_LANGUAGES.find((l) => l.code === code.toLowerCase());
  return found ? `${found.flag} ${found.name}` : code;
}
