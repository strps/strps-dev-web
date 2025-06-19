import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_appearance_header_theme" AS ENUM('auto', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_appearance_header_theme" AS ENUM('auto', 'light', 'dark');
  ALTER TABLE "pages_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "appearance_header_theme" "enum_pages_appearance_header_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v" ADD COLUMN "version_appearance_header_theme" "enum__pages_v_version_appearance_header_theme" DEFAULT 'auto';
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_strps_hero" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_strps_about" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_strps_about_adjacent" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_strps_about_story_blocks" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_strps_skills" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_strps_contact" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_projects_archive" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."pages_blocks_strps_about_us" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_strps_hero" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_strps_about" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_strps_about_adjacent" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_strps_about_story_blocks" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_strps_skills" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_strps_contact" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_projects_archive" ALTER COLUMN "section_theme" SET DATA TYPE text;
  ALTER TABLE "public"."_pages_v_blocks_strps_about_us" ALTER COLUMN "section_theme" SET DATA TYPE text;
  DROP TYPE "public"."section_theme";
  CREATE TYPE "public"."section_theme" AS ENUM('auto', 'light', 'dark');
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."pages_blocks_strps_hero" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."pages_blocks_strps_about" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."pages_blocks_strps_about_adjacent" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."pages_blocks_strps_about_story_blocks" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."pages_blocks_strps_skills" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."pages_blocks_strps_contact" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."pages_blocks_projects_archive" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."pages_blocks_strps_about_us" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_strps_hero" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_strps_about" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_strps_about_adjacent" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_strps_about_story_blocks" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_strps_skills" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_strps_contact" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_projects_archive" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";
  ALTER TABLE "public"."_pages_v_blocks_strps_about_us" ALTER COLUMN "section_theme" SET DATA TYPE "public"."section_theme" USING "section_theme"::"public"."section_theme";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."section_theme" ADD VALUE 'inverted';
  CREATE TABLE IF NOT EXISTS "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "media" ALTER COLUMN "alt" DROP NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "appearance_header_theme";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_appearance_header_theme";
  DROP TYPE "public"."enum_pages_appearance_header_theme";
  DROP TYPE "public"."enum__pages_v_version_appearance_header_theme";`)
}
