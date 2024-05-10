// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core"

export const createTable = sqliteTableCreator((name) => name)

export const texts = createTable("text", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  boardId: text("boardId", { length: 16 }),
  content: text("content"),

  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }),
})

export const files = createTable("file", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  boardId: text("boardId", { length: 16 }),
  name: text("fileName", { length: 256 }).notNull(),
  key: text("key", { length: 256 }).notNull(),
  url: text("url", { length: 256 }).notNull(),
  size: int("size").notNull(),

  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }),
})

export const board = createTable("board", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  boardId: text("boardId", { length: 6 }).unique().notNull(),
  pin: text("pin", { length: 4 }),

  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }),
})
