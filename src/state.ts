import { AppConfig, config } from "./config";
import { NightAuthClient } from "./api/nightauth-client";

// In-memory mapping of chatId/userId -> activeAppName
const chatActiveApp = new Map<number, string>();

// In-memory mapping for pending user prompt inputs
export interface PendingPrompt {
  action: "create_license" | "add_time" | "add_user" | "reset_hwid" | "ban_user" | "ban_license" | "find_license" | "find_user";
  step: number;
  data: Record<string, any>;
  appName: string;
}

const userPendingPrompt = new Map<number, PendingPrompt>();

export function getAvailableApps(): AppConfig[] {
  return config.apps;
}

export function getAppByName(name?: string | null): AppConfig | undefined {
  if (!name) return undefined;
  const lower = name.trim().toLowerCase();
  return config.apps.find((a) => a.name.toLowerCase() === lower);
}

export function getDefaultApp(): AppConfig {
  if (config.apps.length === 0) {
    throw new Error(
      "No NightAuth applications configured! Please check your .env file and set NIGHTAUTH_APPS.",
    );
  }
  return config.apps[0];
}

export function setActiveApp(chatOrUserId: number, appName: string): boolean {
  const app = getAppByName(appName);
  if (!app) return false;
  chatActiveApp.set(chatOrUserId, app.name);
  return true;
}

export function getActiveApp(chatOrUserId: number): AppConfig {
  if (config.apps.length === 0) {
    throw new Error("No NightAuth applications configured in .env!");
  }

  const preferred = chatActiveApp.get(chatOrUserId);
  if (preferred) {
    const found = getAppByName(preferred);
    if (found) return found;
  }

  return getDefaultApp();
}

export function getClientForApp(app: AppConfig): NightAuthClient {
  return new NightAuthClient(config.apiUrl, app.apiKey);
}

export function isUserAdmin(userId?: number): boolean {
  if (!userId) return false;
  // If no admin user IDs specified in .env, allow all for self-hosted default
  if (config.adminUserIds.size === 0) {
    return true;
  }
  return config.adminUserIds.has(userId);
}

export function setPendingPrompt(userId: number, prompt: PendingPrompt | null) {
  if (!prompt) {
    userPendingPrompt.delete(userId);
  } else {
    userPendingPrompt.set(userId, prompt);
  }
}

export function getPendingPrompt(userId: number): PendingPrompt | undefined {
  return userPendingPrompt.get(userId);
}

const userLanguage = new Map<number, string>();

export function getUserLanguage(userId: number): string {
  return userLanguage.get(userId) || config.defaultLanguage || "en";
}

export function setUserLanguage(userId: number, lang: string): boolean {
  const code = lang.trim().toLowerCase();
  userLanguage.set(userId, code);
  return true;
}
