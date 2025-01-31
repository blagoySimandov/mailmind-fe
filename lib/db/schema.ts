import { pgTable, varchar, timestamp, text, uuid } from "drizzle-orm/pg-core";

export const waitlistEntries = pgTable("waitlist_entries", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 50 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
