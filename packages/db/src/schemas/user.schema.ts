import { relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { imageJobs } from "./image-job.schema";
import { UserRoles } from "@media-shifter/commons";
import { userRolesArray } from "../enums";

export const pgRoleEnum = pgEnum("role", userRolesArray);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: pgRoleEnum("role").default(UserRoles.User),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  imageJobs: many(imageJobs),
}));
