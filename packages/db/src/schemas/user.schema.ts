import { relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { imageJobs } from "./image-job.schema";
import { UserRoles } from "@media-shifter/commons";
import { userRolesArray } from "../enums";
import { v4 as uuidv4 } from "uuid";

export const pgRoleEnum = pgEnum("role", userRolesArray);

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: pgRoleEnum("role").default(UserRoles.User),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => {
      return new Date();
    }),
});

export const userRelations = relations(users, ({ many }) => ({
  imageJobs: many(imageJobs),
}));

export type UserDbInsert = typeof users.$inferInsert;
export type UserDbSelect = typeof users.$inferSelect;
