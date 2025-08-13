import posthog from "posthog-js"

posthog.init(process.env.POSTHOG_API_KEY, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
})
