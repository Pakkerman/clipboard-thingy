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

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
)

export const texts = mysqlTable("text", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),

  userId: varchar("userId", { length: 256 }),
  content: varchar("content", { length: 256 }),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export const files = mysqlTable("file", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),

  userId: varchar("userId", { length: 256 }),
  name: varchar("fileName", { length: 256 }).notNull(),
  key: varchar("key", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }).notNull(),
  size: int("size").notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

// export const files
// UploadResponse[]:
// key: "fc8f199e-e594-41dc-9aa3-8f9d961078a2-87jbz.png"
// name: "Screen Shot 2023-08-17 at 9.18.07 AM.png"
// size: 137252
// url: "https://utfs.io/f/fc8f199e-e594-41dc-9aa3-8f9d961078a2-87jbz.png"
