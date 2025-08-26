import { CookiePreferences } from "@/types"

export const defaultCookiePreferences: CookiePreferences = {
  accepted: false,
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: new Date().toISOString(),
  version: "1.1",
}
