import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_strps_hero_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_strps_hero_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_strps_about_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_strps_about_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_strps_about_story_blocks_story_blocks_icon" AS ENUM('code', 'palette', 'monitor', 'circuitBoard', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_hero_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_hero_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_about_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_about_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_about_story_blocks_story_blocks_icon" AS ENUM('code', 'palette', 'monitor', 'circuitBoard', 'none');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_pages_blocks_archive_relation_to" ADD VALUE 'projects';
  ALTER TYPE "public"."enum__pages_v_blocks_archive_relation_to" ADD VALUE 'projects';
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"link_type" "enum_pages_blocks_strps_hero_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_strps_hero_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"link_type" "enum_pages_blocks_strps_about_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_strps_about_link_appearance" DEFAULT 'default',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_adjacent" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_story_blocks_story_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" varchar,
  	"icon" "enum_pages_blocks_strps_about_story_blocks_story_blocks_icon" DEFAULT 'none',
  	"alt" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_story_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_skills_skill_group_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"percentage" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_skills_skill_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"coordinates" geometry(Point),
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"link_type" "enum__pages_v_blocks_strps_hero_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_strps_hero_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"link_type" "enum__pages_v_blocks_strps_about_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_strps_about_link_appearance" DEFAULT 'default',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_story_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" varchar,
  	"icon" "enum__pages_v_blocks_strps_about_story_blocks_story_blocks_icon" DEFAULT 'none',
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"percentage" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"coordinates" geometry(Point),
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_hero" ADD CONSTRAINT "pages_blocks_strps_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about" ADD CONSTRAINT "pages_blocks_strps_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about" ADD CONSTRAINT "pages_blocks_strps_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_adjacent" ADD CONSTRAINT "pages_blocks_strps_about_adjacent_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_adjacent" ADD CONSTRAINT "pages_blocks_strps_about_adjacent_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_story_blocks_story_blocks" ADD CONSTRAINT "pages_blocks_strps_about_story_blocks_story_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_about_story_blocks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD CONSTRAINT "pages_blocks_strps_about_story_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_skills_skill_group_skills" ADD CONSTRAINT "pages_blocks_strps_skills_skill_group_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_skills_skill_group"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_skills_skill_group" ADD CONSTRAINT "pages_blocks_strps_skills_skill_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_skills" ADD CONSTRAINT "pages_blocks_strps_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_contact" ADD CONSTRAINT "pages_blocks_strps_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_hero" ADD CONSTRAINT "_pages_v_blocks_strps_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about" ADD CONSTRAINT "_pages_v_blocks_strps_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about" ADD CONSTRAINT "_pages_v_blocks_strps_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD CONSTRAINT "_pages_v_blocks_strps_about_adjacent_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD CONSTRAINT "_pages_v_blocks_strps_about_adjacent_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_story_blocks_story_blocks" ADD CONSTRAINT "_pages_v_blocks_strps_about_story_blocks_story_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_about_story_blocks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD CONSTRAINT "_pages_v_blocks_strps_about_story_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_skills_skill_group_skills" ADD CONSTRAINT "_pages_v_blocks_strps_skills_skill_group_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_skills_skill_group"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_skills_skill_group" ADD CONSTRAINT "_pages_v_blocks_strps_skills_skill_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_skills" ADD CONSTRAINT "_pages_v_blocks_strps_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_contact" ADD CONSTRAINT "_pages_v_blocks_strps_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_order_idx" ON "pages_blocks_strps_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_parent_id_idx" ON "pages_blocks_strps_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_path_idx" ON "pages_blocks_strps_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_order_idx" ON "pages_blocks_strps_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_parent_id_idx" ON "pages_blocks_strps_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_path_idx" ON "pages_blocks_strps_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_image_idx" ON "pages_blocks_strps_about" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_order_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_parent_id_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_path_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_media_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_story_blocks_order_idx" ON "pages_blocks_strps_about_story_blocks_story_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_story_blocks_parent_id_idx" ON "pages_blocks_strps_about_story_blocks_story_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_order_idx" ON "pages_blocks_strps_about_story_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_parent_id_idx" ON "pages_blocks_strps_about_story_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_path_idx" ON "pages_blocks_strps_about_story_blocks" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_skill_group_skills_order_idx" ON "pages_blocks_strps_skills_skill_group_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_skill_group_skills_parent_id_idx" ON "pages_blocks_strps_skills_skill_group_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_skill_group_order_idx" ON "pages_blocks_strps_skills_skill_group" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_skill_group_parent_id_idx" ON "pages_blocks_strps_skills_skill_group" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_order_idx" ON "pages_blocks_strps_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_parent_id_idx" ON "pages_blocks_strps_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_path_idx" ON "pages_blocks_strps_skills" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_contact_order_idx" ON "pages_blocks_strps_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_contact_parent_id_idx" ON "pages_blocks_strps_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_contact_path_idx" ON "pages_blocks_strps_contact" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_order_idx" ON "_pages_v_blocks_strps_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_parent_id_idx" ON "_pages_v_blocks_strps_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_path_idx" ON "_pages_v_blocks_strps_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_order_idx" ON "_pages_v_blocks_strps_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_parent_id_idx" ON "_pages_v_blocks_strps_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_path_idx" ON "_pages_v_blocks_strps_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_image_idx" ON "_pages_v_blocks_strps_about" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_order_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_parent_id_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_path_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_media_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_story_blocks_order_idx" ON "_pages_v_blocks_strps_about_story_blocks_story_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_story_blocks_parent_id_idx" ON "_pages_v_blocks_strps_about_story_blocks_story_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_order_idx" ON "_pages_v_blocks_strps_about_story_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_parent_id_idx" ON "_pages_v_blocks_strps_about_story_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_path_idx" ON "_pages_v_blocks_strps_about_story_blocks" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_skills_order_idx" ON "_pages_v_blocks_strps_skills_skill_group_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_skills_parent_id_idx" ON "_pages_v_blocks_strps_skills_skill_group_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_order_idx" ON "_pages_v_blocks_strps_skills_skill_group" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_parent_id_idx" ON "_pages_v_blocks_strps_skills_skill_group" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_order_idx" ON "_pages_v_blocks_strps_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_parent_id_idx" ON "_pages_v_blocks_strps_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_path_idx" ON "_pages_v_blocks_strps_skills" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_contact_order_idx" ON "_pages_v_blocks_strps_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_contact_parent_id_idx" ON "_pages_v_blocks_strps_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_contact_path_idx" ON "_pages_v_blocks_strps_contact" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_hero_image_idx" ON "projects" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_hero_image_idx" ON "_projects_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_strps_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_about_adjacent" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_about_story_blocks_story_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_about_story_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_skills_skill_group_skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_skills_skill_group" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks_story_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_skills_skill_group_skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_skills_skill_group" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_strps_hero" CASCADE;
  DROP TABLE "pages_blocks_strps_about" CASCADE;
  DROP TABLE "pages_blocks_strps_about_adjacent" CASCADE;
  DROP TABLE "pages_blocks_strps_about_story_blocks_story_blocks" CASCADE;
  DROP TABLE "pages_blocks_strps_about_story_blocks" CASCADE;
  DROP TABLE "pages_blocks_strps_skills_skill_group_skills" CASCADE;
  DROP TABLE "pages_blocks_strps_skills_skill_group" CASCADE;
  DROP TABLE "pages_blocks_strps_skills" CASCADE;
  DROP TABLE "pages_blocks_strps_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_adjacent" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_story_blocks_story_blocks" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_story_blocks" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_skills_skill_group_skills" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_skills_skill_group" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_skills" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_contact" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_projects_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_projects_fk";
  
  DROP INDEX IF EXISTS "pages_rels_projects_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_projects_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_projects_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "projects_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "projects_id";
  ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "placeholder";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "projects_id";
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_pages_blocks_archive_relation_to" USING "relation_to"::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__pages_v_blocks_archive_relation_to" USING "relation_to"::"public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_strps_hero_link_type";
  DROP TYPE "public"."enum_pages_blocks_strps_hero_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_strps_about_link_type";
  DROP TYPE "public"."enum_pages_blocks_strps_about_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_strps_about_story_blocks_story_blocks_icon";
  DROP TYPE "public"."enum__pages_v_blocks_strps_hero_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_hero_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_strps_about_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_about_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_strps_about_story_blocks_story_blocks_icon";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_status";`)
}
