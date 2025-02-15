import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(10),
});

export const VIDEO_TABLE = pgTable("videoRaw", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  videoId: varchar().notNull(),
  videoData: json(), // json() is now properly imported
  type: varchar(),
  createdBt: varchar()
    .notNull()
    .references(() => USER_TABLE.email),
});
