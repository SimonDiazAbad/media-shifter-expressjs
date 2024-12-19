import {
  pgTable,
  text,
  uuid,
  timestamp,
  pgEnum,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { imageJobTypeArray, jobStatusArray } from "../enums";

export const pgJobStatusEnum = pgEnum("job_status", jobStatusArray);
export const pgImageJobTypeEnum = pgEnum("image_job_type", imageJobTypeArray);

export const imageJobsSchema = pgTable("image_jobs", {
  id: uuid("id").primaryKey(),
  jobStatus: pgJobStatusEnum("job_status").notNull(),
  jobType: pgImageJobTypeEnum("job_type").notNull(),
  jobParams: jsonb("job_params").notNull(),
  inputUri: text("input_uri").notNull().unique(),
  outputUri: text("output_uri").notNull().default(""),
  userId: uuid("user_id").notNull(),
  retryCount: integer("retry_count").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => {
      return new Date();
    }),
});

export type ImageJobDbInsert = typeof imageJobsSchema.$inferInsert;
export type ImageJobDbSelect = typeof imageJobsSchema.$inferSelect;
