DO $$ BEGIN
 CREATE TYPE "public"."image_job_type" AS ENUM('OCR', 'REMOVE_BACKGROUND', 'RESIZE', 'UPSCALE', 'CONVERT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."job_status" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image_jobs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"job_status" "job_status" NOT NULL,
	"job_type" "image_job_type" NOT NULL,
	"job_params" jsonb NOT NULL,
	"input_uri" text NOT NULL,
	"output_uri" text DEFAULT '' NOT NULL,
	"user_id" uuid NOT NULL,
	"retry_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "image_jobs_input_uri_unique" UNIQUE("input_uri")
);
