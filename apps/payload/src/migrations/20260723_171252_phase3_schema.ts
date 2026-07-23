import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// Generated with `payload migrate:create` against a database that only had the
// two prior migrations applied (not the dev-push-drifted local dev DB). Besides
// the home-page-makeover Phase 3 schema (docs/home-page-makeover.md §7 items 9-15),
// this also picks up PageServicesHero/PageServices/PageProcess/PageFaq, which were
// already live in code and in the dev DB via auto dev-push but had never been
// captured in a migration — a pre-existing gap, not part of this change.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_page_hero_variant" AS ENUM('portrait', 'statement');
  CREATE TYPE "public"."enum_pages_blocks_page_services_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_services_hero_links_link_appearance" AS ENUM('default', 'outline', 'send', 'github', 'linkedin');
  CREATE TYPE "public"."enum_pages_blocks_page_services_teaser_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_services_teaser_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_page_services_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_services_teaser_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_page_about_layout" AS ENUM('single', 'twoColumn');
  CREATE TYPE "public"."enum_pages_blocks_page_about_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_about_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_page_skills_variant" AS ENUM('cards', 'list');
  CREATE TYPE "public"."enum_pages_blocks_page_projects_variant" AS ENUM('cards', 'hairline');
  CREATE TYPE "public"."enum_pages_blocks_page_projects_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_projects_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_page_lab_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_lab_teaser_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_page_process_variant" AS ENUM('full', 'strip');
  CREATE TYPE "public"."enum__pages_v_blocks_page_hero_variant" AS ENUM('portrait', 'statement');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_hero_links_link_appearance" AS ENUM('default', 'outline', 'send', 'github', 'linkedin');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_teaser_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_teaser_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_services_teaser_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_about_layout" AS ENUM('single', 'twoColumn');
  CREATE TYPE "public"."enum__pages_v_blocks_page_about_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_about_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_skills_variant" AS ENUM('cards', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_page_projects_variant" AS ENUM('cards', 'hairline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_projects_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_projects_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_lab_teaser_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_lab_teaser_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_process_variant" AS ENUM('full', 'strip');
  CREATE TYPE "public"."enum_header_nav_items_link_appearance" AS ENUM('default', 'outlineGhost');
  ALTER TYPE "public"."enum_pages_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'solid';
  ALTER TYPE "public"."enum_pages_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'outlineGhost';
  ALTER TYPE "public"."enum__pages_v_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'solid';
  ALTER TYPE "public"."enum__pages_v_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'outlineGhost';
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_page_services_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_page_services_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"status_is_available" boolean DEFAULT false,
  	"status_label" varchar,
  	"status_available_from" varchar,
  	"background_image_id" integer,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_teaser_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"summary" varchar,
  	"link_type" "enum_pages_blocks_page_services_teaser_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_page_services_teaser_items_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_type" "enum_pages_blocks_page_services_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_page_services_teaser_link_appearance" DEFAULT 'default',
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_lab_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"link_type" "enum_pages_blocks_page_lab_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_page_lab_teaser_link_appearance" DEFAULT 'default',
  	"limit" numeric DEFAULT 3,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_services_good_fit_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"for_who" varchar,
  	"timeline" varchar,
  	"pricing" varchar,
  	"proof_label" varchar,
  	"proof_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Services',
  	"intro" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_page_process_variant" DEFAULT 'full',
  	"title" varchar DEFAULT 'How I Work',
  	"intro" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'FAQ',
  	"intro" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_page_services_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_page_services_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"status_is_available" boolean DEFAULT false,
  	"status_label" varchar,
  	"status_available_from" varchar,
  	"background_image_id" integer,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_teaser_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"summary" varchar,
  	"link_type" "enum__pages_v_blocks_page_services_teaser_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_page_services_teaser_items_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_type" "enum__pages_v_blocks_page_services_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_page_services_teaser_link_appearance" DEFAULT 'default',
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_lab_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"link_type" "enum__pages_v_blocks_page_lab_teaser_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_page_lab_teaser_link_appearance" DEFAULT 'default',
  	"limit" numeric DEFAULT 3,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_services_good_fit_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"for_who" varchar,
  	"timeline" varchar,
  	"pricing" varchar,
  	"proof_label" varchar,
  	"proof_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Services',
  	"intro" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_page_process_variant" DEFAULT 'full',
  	"title" varchar DEFAULT 'How I Work',
  	"intro" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'FAQ',
  	"intro" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-07-23T17:12:52.420Z';
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "variant" "enum_pages_blocks_page_hero_variant" DEFAULT 'portrait';
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "show_plot_line" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "status_available_from" varchar;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "layout" "enum_pages_blocks_page_about_layout" DEFAULT 'single';
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "body" jsonb;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "link_type" "enum_pages_blocks_page_about_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "link_appearance" "enum_pages_blocks_page_about_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_page_skills" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_skills" ADD COLUMN "variant" "enum_pages_blocks_page_skills_variant" DEFAULT 'cards';
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "variant" "enum_pages_blocks_page_projects_variant" DEFAULT 'cards';
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "link_type" "enum_pages_blocks_page_projects_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "link_appearance" "enum_pages_blocks_page_projects_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "email_label" varchar;
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "note" varchar;
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "form_id" integer;
  ALTER TABLE "pages_blocks_page_blog" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "variant" "enum__pages_v_blocks_page_hero_variant" DEFAULT 'portrait';
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "headline" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "show_plot_line" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "status_available_from" varchar;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "layout" "enum__pages_v_blocks_page_about_layout" DEFAULT 'single';
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "body" jsonb;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "link_type" "enum__pages_v_blocks_page_about_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "link_appearance" "enum__pages_v_blocks_page_about_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_page_skills" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_skills" ADD COLUMN "variant" "enum__pages_v_blocks_page_skills_variant" DEFAULT 'cards';
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "variant" "enum__pages_v_blocks_page_projects_variant" DEFAULT 'cards';
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "link_type" "enum__pages_v_blocks_page_projects_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "link_appearance" "enum__pages_v_blocks_page_projects_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "email_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "note" varchar;
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "form_id" integer;
  ALTER TABLE "_pages_v_blocks_page_blog" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_tag" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_year" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_problem" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_contribution" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_context" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_decisions" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_outcome" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_tag" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_year" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_problem" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_contribution" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_context" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_decisions" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_outcome" varchar;
  ALTER TABLE "copyright" ADD COLUMN "location" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_appearance" "enum_header_nav_items_link_appearance" DEFAULT 'default';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_hero_links" ADD CONSTRAINT "pages_blocks_page_services_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_hero_highlights" ADD CONSTRAINT "pages_blocks_page_services_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_hero" ADD CONSTRAINT "pages_blocks_page_services_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_hero" ADD CONSTRAINT "pages_blocks_page_services_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_hero" ADD CONSTRAINT "pages_blocks_page_services_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_teaser_items" ADD CONSTRAINT "pages_blocks_page_services_teaser_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_teaser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_teaser" ADD CONSTRAINT "pages_blocks_page_services_teaser_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_teaser" ADD CONSTRAINT "pages_blocks_page_services_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_lab_teaser" ADD CONSTRAINT "pages_blocks_page_lab_teaser_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_lab_teaser" ADD CONSTRAINT "pages_blocks_page_lab_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_services_features" ADD CONSTRAINT "pages_blocks_page_services_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_services_good_fit_points" ADD CONSTRAINT "pages_blocks_page_services_services_good_fit_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_services" ADD CONSTRAINT "pages_blocks_page_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services" ADD CONSTRAINT "pages_blocks_page_services_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services" ADD CONSTRAINT "pages_blocks_page_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_process_steps" ADD CONSTRAINT "pages_blocks_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_process" ADD CONSTRAINT "pages_blocks_page_process_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_process" ADD CONSTRAINT "pages_blocks_page_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_faq_questions" ADD CONSTRAINT "pages_blocks_page_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_faq" ADD CONSTRAINT "pages_blocks_page_faq_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_faq" ADD CONSTRAINT "pages_blocks_page_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_hero_links" ADD CONSTRAINT "_pages_v_blocks_page_services_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_hero_highlights" ADD CONSTRAINT "_pages_v_blocks_page_services_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_hero" ADD CONSTRAINT "_pages_v_blocks_page_services_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_hero" ADD CONSTRAINT "_pages_v_blocks_page_services_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_hero" ADD CONSTRAINT "_pages_v_blocks_page_services_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_teaser_items" ADD CONSTRAINT "_pages_v_blocks_page_services_teaser_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_teaser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_teaser" ADD CONSTRAINT "_pages_v_blocks_page_services_teaser_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_teaser" ADD CONSTRAINT "_pages_v_blocks_page_services_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_lab_teaser" ADD CONSTRAINT "_pages_v_blocks_page_lab_teaser_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_lab_teaser" ADD CONSTRAINT "_pages_v_blocks_page_lab_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_services_features" ADD CONSTRAINT "_pages_v_blocks_page_services_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_services_good_fit_points" ADD CONSTRAINT "_pages_v_blocks_page_services_services_good_fit_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_services" ADD CONSTRAINT "_pages_v_blocks_page_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services" ADD CONSTRAINT "_pages_v_blocks_page_services_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services" ADD CONSTRAINT "_pages_v_blocks_page_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_process_steps" ADD CONSTRAINT "_pages_v_blocks_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_process" ADD CONSTRAINT "_pages_v_blocks_page_process_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_process" ADD CONSTRAINT "_pages_v_blocks_page_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_faq_questions" ADD CONSTRAINT "_pages_v_blocks_page_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_faq" ADD CONSTRAINT "_pages_v_blocks_page_faq_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_faq" ADD CONSTRAINT "_pages_v_blocks_page_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_links_order_idx" ON "pages_blocks_page_services_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_links_parent_id_idx" ON "pages_blocks_page_services_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_highlights_order_idx" ON "pages_blocks_page_services_hero_highlights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_highlights_parent_id_idx" ON "pages_blocks_page_services_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_order_idx" ON "pages_blocks_page_services_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_parent_id_idx" ON "pages_blocks_page_services_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_path_idx" ON "pages_blocks_page_services_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_background_image_idx" ON "pages_blocks_page_services_hero" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_section_section_background_image_idx" ON "pages_blocks_page_services_hero" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_teaser_items_order_idx" ON "pages_blocks_page_services_teaser_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_teaser_items_parent_id_idx" ON "pages_blocks_page_services_teaser_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_teaser_order_idx" ON "pages_blocks_page_services_teaser" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_teaser_parent_id_idx" ON "pages_blocks_page_services_teaser" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_teaser_path_idx" ON "pages_blocks_page_services_teaser" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_teaser_section_section_background_image_idx" ON "pages_blocks_page_services_teaser" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_lab_teaser_order_idx" ON "pages_blocks_page_lab_teaser" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_lab_teaser_parent_id_idx" ON "pages_blocks_page_lab_teaser" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_lab_teaser_path_idx" ON "pages_blocks_page_lab_teaser" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_lab_teaser_section_section_background_image_idx" ON "pages_blocks_page_lab_teaser" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_services_features_order_idx" ON "pages_blocks_page_services_services_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_services_features_parent_id_idx" ON "pages_blocks_page_services_services_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_services_good_fit_points_order_idx" ON "pages_blocks_page_services_services_good_fit_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_services_good_fit_points_parent_id_idx" ON "pages_blocks_page_services_services_good_fit_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_services_order_idx" ON "pages_blocks_page_services_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_services_parent_id_idx" ON "pages_blocks_page_services_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_order_idx" ON "pages_blocks_page_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_parent_id_idx" ON "pages_blocks_page_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_path_idx" ON "pages_blocks_page_services" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_services_section_section_background_image_idx" ON "pages_blocks_page_services" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_process_steps_order_idx" ON "pages_blocks_page_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_process_steps_parent_id_idx" ON "pages_blocks_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_process_order_idx" ON "pages_blocks_page_process" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_process_parent_id_idx" ON "pages_blocks_page_process" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_process_path_idx" ON "pages_blocks_page_process" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_process_section_section_background_image_idx" ON "pages_blocks_page_process" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_faq_questions_order_idx" ON "pages_blocks_page_faq_questions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_faq_questions_parent_id_idx" ON "pages_blocks_page_faq_questions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_faq_order_idx" ON "pages_blocks_page_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_faq_parent_id_idx" ON "pages_blocks_page_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_faq_path_idx" ON "pages_blocks_page_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_faq_section_section_background_image_idx" ON "pages_blocks_page_faq" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_links_order_idx" ON "_pages_v_blocks_page_services_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_links_parent_id_idx" ON "_pages_v_blocks_page_services_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_highlights_order_idx" ON "_pages_v_blocks_page_services_hero_highlights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_highlights_parent_id_idx" ON "_pages_v_blocks_page_services_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_order_idx" ON "_pages_v_blocks_page_services_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_parent_id_idx" ON "_pages_v_blocks_page_services_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_path_idx" ON "_pages_v_blocks_page_services_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_background_image_idx" ON "_pages_v_blocks_page_services_hero" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_section_section_background_image_idx" ON "_pages_v_blocks_page_services_hero" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_teaser_items_order_idx" ON "_pages_v_blocks_page_services_teaser_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_teaser_items_parent_id_idx" ON "_pages_v_blocks_page_services_teaser_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_teaser_order_idx" ON "_pages_v_blocks_page_services_teaser" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_teaser_parent_id_idx" ON "_pages_v_blocks_page_services_teaser" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_teaser_path_idx" ON "_pages_v_blocks_page_services_teaser" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_teaser_section_section_background_image_idx" ON "_pages_v_blocks_page_services_teaser" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_lab_teaser_order_idx" ON "_pages_v_blocks_page_lab_teaser" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_lab_teaser_parent_id_idx" ON "_pages_v_blocks_page_lab_teaser" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_lab_teaser_path_idx" ON "_pages_v_blocks_page_lab_teaser" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_lab_teaser_section_section_background_image_idx" ON "_pages_v_blocks_page_lab_teaser" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_features_order_idx" ON "_pages_v_blocks_page_services_services_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_features_parent_id_idx" ON "_pages_v_blocks_page_services_services_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_good_fit_points_order_idx" ON "_pages_v_blocks_page_services_services_good_fit_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_good_fit_points_parent_id_idx" ON "_pages_v_blocks_page_services_services_good_fit_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_order_idx" ON "_pages_v_blocks_page_services_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_parent_id_idx" ON "_pages_v_blocks_page_services_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_order_idx" ON "_pages_v_blocks_page_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_parent_id_idx" ON "_pages_v_blocks_page_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_path_idx" ON "_pages_v_blocks_page_services" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_section_section_background_image_idx" ON "_pages_v_blocks_page_services" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_process_steps_order_idx" ON "_pages_v_blocks_page_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_process_steps_parent_id_idx" ON "_pages_v_blocks_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_process_order_idx" ON "_pages_v_blocks_page_process" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_process_parent_id_idx" ON "_pages_v_blocks_page_process" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_process_path_idx" ON "_pages_v_blocks_page_process" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_process_section_section_background_image_idx" ON "_pages_v_blocks_page_process" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_faq_questions_order_idx" ON "_pages_v_blocks_page_faq_questions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_faq_questions_parent_id_idx" ON "_pages_v_blocks_page_faq_questions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_faq_order_idx" ON "_pages_v_blocks_page_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_faq_parent_id_idx" ON "_pages_v_blocks_page_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_faq_path_idx" ON "_pages_v_blocks_page_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_faq_section_section_background_image_idx" ON "_pages_v_blocks_page_faq" USING btree ("section_background_image_id");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_contact" ADD CONSTRAINT "pages_blocks_page_contact_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_contact" ADD CONSTRAINT "_pages_v_blocks_page_contact_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_contact_form_idx" ON "pages_blocks_page_contact" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_contact_form_idx" ON "_pages_v_blocks_page_contact" USING btree ("form_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_page_services_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_hero_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_teaser_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_teaser" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_lab_teaser" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_services_good_fit_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_hero_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_teaser_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_teaser" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_services_good_fit_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_faq" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_page_services_hero_links" CASCADE;
  DROP TABLE "pages_blocks_page_services_hero_highlights" CASCADE;
  DROP TABLE "pages_blocks_page_services_hero" CASCADE;
  DROP TABLE "pages_blocks_page_services_teaser_items" CASCADE;
  DROP TABLE "pages_blocks_page_services_teaser" CASCADE;
  DROP TABLE "pages_blocks_page_lab_teaser" CASCADE;
  DROP TABLE "pages_blocks_page_services_services_features" CASCADE;
  DROP TABLE "pages_blocks_page_services_services_good_fit_points" CASCADE;
  DROP TABLE "pages_blocks_page_services_services" CASCADE;
  DROP TABLE "pages_blocks_page_services" CASCADE;
  DROP TABLE "pages_blocks_page_process_steps" CASCADE;
  DROP TABLE "pages_blocks_page_process" CASCADE;
  DROP TABLE "pages_blocks_page_faq_questions" CASCADE;
  DROP TABLE "pages_blocks_page_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_hero_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_teaser_items" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_teaser" CASCADE;
  DROP TABLE "_pages_v_blocks_page_lab_teaser" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_services_features" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_services_good_fit_points" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_services" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services" CASCADE;
  DROP TABLE "_pages_v_blocks_page_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_page_process" CASCADE;
  DROP TABLE "_pages_v_blocks_page_faq_questions" CASCADE;
  DROP TABLE "_pages_v_blocks_page_faq" CASCADE;
  ALTER TABLE "pages_blocks_page_contact" DROP CONSTRAINT "pages_blocks_page_contact_form_id_forms_id_fk";
  
  ALTER TABLE "_pages_v_blocks_page_contact" DROP CONSTRAINT "_pages_v_blocks_page_contact_form_id_forms_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_page_contact_form_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_page_contact_form_idx";
  ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-03-23T14:16:10.770Z';
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "headline";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "show_plot_line";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "status_available_from";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "layout";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "body";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "pages_blocks_page_skills" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_skills" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "email_label";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "note";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "form_id";
  ALTER TABLE "pages_blocks_page_blog" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "headline";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "show_plot_line";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "status_available_from";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "layout";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "body";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_blocks_page_skills" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_skills" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "email_label";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "note";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "form_id";
  ALTER TABLE "_pages_v_blocks_page_blog" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_tag";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_year";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_problem";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_contribution";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_context";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_decisions";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_outcome";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_tag";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_year";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_problem";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_contribution";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_context";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_decisions";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_outcome";
  ALTER TABLE "copyright" DROP COLUMN IF EXISTS "location";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "public"."pages_blocks_page_hero_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "public"."pages_blocks_page_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_page_hero_links_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_page_hero_links_link_appearance" AS ENUM('default', 'outline', 'send', 'github', 'linkedin');
  ALTER TABLE "public"."pages_blocks_page_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_page_hero_links_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_page_hero_links_link_appearance";
  ALTER TABLE "public"."pages_blocks_page_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "public"."_pages_v_blocks_page_hero_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_page_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_page_hero_links_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_page_hero_links_link_appearance" AS ENUM('default', 'outline', 'send', 'github', 'linkedin');
  ALTER TABLE "public"."_pages_v_blocks_page_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_page_hero_links_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_page_hero_links_link_appearance";
  ALTER TABLE "public"."_pages_v_blocks_page_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  DROP TYPE "public"."enum_pages_blocks_page_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_page_services_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_services_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_page_services_teaser_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_services_teaser_items_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_page_services_teaser_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_services_teaser_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_page_about_layout";
  DROP TYPE "public"."enum_pages_blocks_page_about_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_about_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_page_skills_variant";
  DROP TYPE "public"."enum_pages_blocks_page_projects_variant";
  DROP TYPE "public"."enum_pages_blocks_page_projects_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_projects_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_page_lab_teaser_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_lab_teaser_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_page_process_variant";
  DROP TYPE "public"."enum__pages_v_blocks_page_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_teaser_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_teaser_items_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_teaser_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_services_teaser_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_about_layout";
  DROP TYPE "public"."enum__pages_v_blocks_page_about_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_about_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_skills_variant";
  DROP TYPE "public"."enum__pages_v_blocks_page_projects_variant";
  DROP TYPE "public"."enum__pages_v_blocks_page_projects_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_projects_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_lab_teaser_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_lab_teaser_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_process_variant";
  DROP TYPE "public"."enum_header_nav_items_link_appearance";`)
}
