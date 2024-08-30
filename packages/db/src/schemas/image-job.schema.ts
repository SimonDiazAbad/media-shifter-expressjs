import {
  pgTable,
  text,
  uuid,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { JobStatus } from "@media-shifter/commons";
import { jobStatusArray } from "../enums";
import { relations } from "drizzle-orm";
import { users } from "./user.schema";

export const pgJobStatusEnum = pgEnum("job_status", jobStatusArray);

export const imageJobs = pgTable("image_jobs", {
  id: uuid("id").primaryKey(),
  jobStatus: pgJobStatusEnum("job_status").default(JobStatus.PENDING).notNull(),
  inputImageUri: text("input_image_uri"),
  outputImageUri: text("output_image_uri"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  retries: integer("retries").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const imageJobsRelations = relations(imageJobs, ({ one }) => ({
  userId: one(users, {
    fields: [imageJobs.userId],
    references: [users.id],
  }),
}));
