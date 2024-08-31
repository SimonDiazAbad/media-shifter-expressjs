DO $$ BEGIN
 CREATE TYPE "public"."job_status" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image_jobs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"job_status" "job_status" NOT NULL,
	"image_uri" text NOT NULL,
	"user_id" uuid NOT NULL,
	"retries" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "image_jobs_image_uri_unique" UNIQUE("image_uri")
);
