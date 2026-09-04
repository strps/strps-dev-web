import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_page_services_process_rows_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_services_process_rows_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_page_services_process_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_services_process_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_process_rows_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_process_rows_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_process_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_process_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_process_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_page_services_process_rows_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_page_services_process_rows_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_process_rows_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_process_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_process_process_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_page_services_process_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_page_services_process_link_appearance" DEFAULT 'default',
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_process_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"process_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_process_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_page_services_process_rows_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_page_services_process_rows_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_process_rows_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_process_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_process_process_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_page_services_process_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_page_services_process_link_appearance" DEFAULT 'default',
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_process_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"process_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_process_rows" ADD CONSTRAINT "pages_blocks_page_services_process_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_process_rows_locales" ADD CONSTRAINT "pages_blocks_page_services_process_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_process_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_process_process_steps" ADD CONSTRAINT "pages_blocks_page_services_process_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_process_process_steps_locales" ADD CONSTRAINT "pages_blocks_page_services_process_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_process_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_process" ADD CONSTRAINT "pages_blocks_page_services_process_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_process" ADD CONSTRAINT "pages_blocks_page_services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_process_locales" ADD CONSTRAINT "pages_blocks_page_services_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_process_rows" ADD CONSTRAINT "_pages_v_blocks_page_services_process_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_process_rows_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_process_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_process_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_process_process_steps" ADD CONSTRAINT "_pages_v_blocks_page_services_process_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_process_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_process_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_process_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_process" ADD CONSTRAINT "_pages_v_blocks_page_services_process_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_process" ADD CONSTRAINT "_pages_v_blocks_page_services_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_process_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_process_rows_order_idx" ON "pages_blocks_page_services_process_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_process_rows_parent_id_idx" ON "pages_blocks_page_services_process_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_process_rows_locales_locale_parent_id_unique" ON "pages_blocks_page_services_process_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_process_process_steps_order_idx" ON "pages_blocks_page_services_process_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_process_process_steps_parent_id_idx" ON "pages_blocks_page_services_process_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_process_process_steps_locales_locale_parent_id_unique" ON "pages_blocks_page_services_process_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_process_order_idx" ON "pages_blocks_page_services_process" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_process_parent_id_idx" ON "pages_blocks_page_services_process" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_process_path_idx" ON "pages_blocks_page_services_process" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_process_section_section_background_image_idx" ON "pages_blocks_page_services_process" USING btree ("section_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_process_locales_locale_parent_id_unique" ON "pages_blocks_page_services_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_rows_order_idx" ON "_pages_v_blocks_page_services_process_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_rows_parent_id_idx" ON "_pages_v_blocks_page_services_process_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_rows_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_process_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_process_steps_order_idx" ON "_pages_v_blocks_page_services_process_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_process_steps_parent_id_idx" ON "_pages_v_blocks_page_services_process_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_process_steps_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_process_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_order_idx" ON "_pages_v_blocks_page_services_process" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_parent_id_idx" ON "_pages_v_blocks_page_services_process" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_path_idx" ON "_pages_v_blocks_page_services_process" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_section_section_background_image_idx" ON "_pages_v_blocks_page_services_process" USING btree ("section_background_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_process_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_process_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "public"."pages_blocks_page_hero" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_hero" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_services_hero" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_services_hero" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_services_teaser" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_services_teaser" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_services_process" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_services_process" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_about" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_about" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_skills" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_skills" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_projects_teaser" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_projects_teaser" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_lab_teaser" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_lab_teaser" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_experience" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_experience" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_services" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_services" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_process" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_process" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_faq" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_faq" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_contact" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_contact" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_page_blog" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_blog" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_form_block" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_form_block" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_hero" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_hero" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_services_hero" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_services_hero" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_services_teaser" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_services_teaser" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_services_process" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_services_process" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_about" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_about" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_skills" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_skills" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_projects_teaser" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_projects_teaser" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_lab_teaser" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_lab_teaser" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_experience" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_experience" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_services" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_services" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_process" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_process" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_faq" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_faq" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_contact" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_contact" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_page_blog" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_blog" ALTER COLUMN "section_background" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_form_block" ALTER COLUMN "section_background" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_form_block" ALTER COLUMN "section_background" SET DATA TYPE text;
  -- Retiring 'svgCircles' (see the section field's comment) rebuilds the enum
  -- without it. The columns are cast back from text below, so any row still
  -- holding the retired value has to be settled first or the cast fails.
  UPDATE "public"."pages_blocks_page_hero" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_services_hero" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_services_teaser" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_services_process" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_about" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_skills" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_projects_teaser" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_lab_teaser" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_experience" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_services" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_process" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_faq" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_contact" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_page_blog" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."pages_blocks_form_block" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_hero" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_services_hero" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_services_teaser" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_services_process" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_about" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_skills" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_projects_teaser" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_lab_teaser" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_experience" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_services" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_process" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_faq" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_contact" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_page_blog" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  UPDATE "public"."_pages_v_blocks_form_block" SET "section_background" = 'none' WHERE "section_background" = 'svgCircles';
  DROP TYPE "public"."section_background";
  CREATE TYPE "public"."section_background" AS ENUM('none', 'image');
  ALTER TABLE "public"."pages_blocks_page_hero" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_hero" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_services_hero" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_services_hero" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_services_teaser" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_services_teaser" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_services_process" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_services_process" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_about" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_about" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_skills" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_skills" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_projects_teaser" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_projects_teaser" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_lab_teaser" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_lab_teaser" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_experience" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_experience" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_services" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_services" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_process" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_process" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_faq" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_faq" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_contact" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_contact" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_page_blog" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_page_blog" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."pages_blocks_form_block" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."pages_blocks_form_block" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_hero" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_hero" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_services_hero" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_services_hero" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_services_teaser" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_services_teaser" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_services_process" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_services_process" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_about" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_about" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_skills" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_skills" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_projects_teaser" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_projects_teaser" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_lab_teaser" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_lab_teaser" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_experience" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_experience" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_services" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_services" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_process" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_process" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_faq" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_faq" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_contact" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_contact" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_page_blog" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_page_blog" ALTER COLUMN "section_background" SET DEFAULT 'none';
  ALTER TABLE "public"."_pages_v_blocks_form_block" ALTER COLUMN "section_background" SET DATA TYPE "public"."section_background" USING "section_background"::"public"."section_background";
  ALTER TABLE "public"."_pages_v_blocks_form_block" ALTER COLUMN "section_background" SET DEFAULT 'none';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."section_background" ADD VALUE 'svgCircles' BEFORE 'image';
  ALTER TABLE "pages_blocks_page_services_process_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_process_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_process_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_process_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_process_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_process_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_process_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_process_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_process_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_process_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_page_services_process_rows" CASCADE;
  DROP TABLE "pages_blocks_page_services_process_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_process_process_steps" CASCADE;
  DROP TABLE "pages_blocks_page_services_process_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_process" CASCADE;
  DROP TABLE "pages_blocks_page_services_process_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_process_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_process_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_process_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_process_process_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_process" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_process_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_page_services_process_rows_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_services_process_rows_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_page_services_process_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_services_process_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_process_rows_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_process_rows_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_process_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_process_link_appearance";`)
}
