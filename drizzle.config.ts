import { type Config } from "drizzle-kit"

import { env } from "~/env.mjs"

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  // tablesFilter: ["clipboard-*"],
} satisfies Config
