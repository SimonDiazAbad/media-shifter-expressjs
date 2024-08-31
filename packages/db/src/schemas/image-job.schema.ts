import {
  pgTable,
  text,
  uuid,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { jobStatusArray } from "../enums";
// import { users } from "./user.schema";
import { v4 as uuidv4 } from "uuid";

export const pgJobStatusEnum = pgEnum("job_status", jobStatusArray);

export const imageJobsSchema = pgTable("image_jobs", {
  id: uuid("id").primaryKey(),
  // .$defaultFn(() => uuidv4()),
  jobStatus: pgJobStatusEnum("job_status").notNull(),
  // inputImageUri: text("input_image_uri").notNull().unique(),
  // outputImageUri: text("output_image_uri"),
  imageUri: text("image_uri").notNull().unique(),
  // we could store the original uri
  // originalImageUri: text("original_image_uri"),
  userId: uuid("user_id").notNull(),
  // .references(() => users.id),
  retries: integer("retries").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => {
      return new Date();
    }),
});

// export const imageJobsRelations = relations(imageJobs, ({ one }) => ({
//   userId: one(users, {
//     fields: [imageJobs.userId],
//     references: [users.id],
//   }),
// }));

export type ImageJobDbInsert = typeof imageJobsSchema.$inferInsert;
export type ImageJobDbSelect = typeof imageJobsSchema.$inferSelect;
