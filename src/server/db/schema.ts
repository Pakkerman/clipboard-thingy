// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import {
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
  int,
} from "drizzle-orm/mysql-core"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `clipbroker_${name}`)

export const texts = mysqlTable("text", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),

  boardId: varchar("boardId", { length: 16 }),
  content: varchar("content", { length: 3000 }),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export const files = mysqlTable("file", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),

  boardId: varchar("boardId", { length: 16 }),
  name: varchar("fileName", { length: 256 }).notNull(),
  key: varchar("key", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }).notNull(),
  size: int("size").notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export const board = mysqlTable("board", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),

  boardId: varchar("boardId", { length: 6 }).unique().notNull(),
  pin: varchar("pin", { length: 4 }),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})
