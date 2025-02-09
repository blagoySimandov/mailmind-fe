import { relations } from "drizzle-orm";
import {
  users,
  accounts,
  sessions,
  authenticators,
  mailbots,
} from "./schema";

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  authenticators: many(authenticators),
  mailbots: many(mailbots),
}));

// Account relations
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// Session relations
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Authenticator relations
export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
  user: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));

// Mailbot relations
export const mailbotsRelations = relations(mailbots, ({ one }) => ({
  user: one(users, {
    fields: [mailbots.userId],
    references: [users.id],
  }),
}));
