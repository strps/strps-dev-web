import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_hero_locales" (
  	"eyebrow" varchar,
  	"name" varchar,
  	"headline" varchar,
  	"label" varchar,
  	"description" varchar,
  	"location_city" varchar,
  	"location_region" varchar,
  	"status_label" varchar,
  	"status_available_from" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_hero_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_hero_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"status_label" varchar,
  	"status_available_from" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_teaser_items_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_teaser_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_about_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'About Me',
  	"summary" varchar,
  	"body" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_skills_skill_groups_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_skills_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Technical Arsenal',
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_projects_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Featured Projects',
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_lab_teaser_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_experience_positions_highlights_locales" (
  	"highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_experience_positions_locales" (
  	"position" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_experience_locales" (
  	"title" varchar DEFAULT 'Professional History',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_services_features_locales" (
  	"feature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_services_good_fit_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_services_locales" (
  	"name" varchar,
  	"for_who" varchar,
  	"timeline" varchar,
  	"pricing" varchar,
  	"proof_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_services_locales" (
  	"title" varchar DEFAULT 'Services',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_process_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_process_locales" (
  	"title" varchar DEFAULT 'How I Work',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_faq_questions_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_faq_locales" (
  	"title" varchar DEFAULT 'FAQ',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_contact_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_contact_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Ready to build something great?',
  	"description" varchar,
  	"email_label" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_blog_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Latest Articles',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_hero_locales" (
  	"eyebrow" varchar,
  	"name" varchar,
  	"headline" varchar,
  	"label" varchar,
  	"description" varchar,
  	"location_city" varchar,
  	"location_region" varchar,
  	"status_label" varchar,
  	"status_available_from" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_hero_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_hero_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"status_label" varchar,
  	"status_available_from" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_teaser_items_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_teaser_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_about_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'About Me',
  	"summary" varchar,
  	"body" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_skills_skill_groups_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_skills_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Technical Arsenal',
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_projects_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Featured Projects',
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_lab_teaser_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_experience_positions_highlights_locales" (
  	"highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_experience_positions_locales" (
  	"position" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_experience_locales" (
  	"title" varchar DEFAULT 'Professional History',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_services_features_locales" (
  	"feature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_services_good_fit_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_services_locales" (
  	"name" varchar,
  	"for_who" varchar,
  	"timeline" varchar,
  	"pricing" varchar,
  	"proof_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_services_locales" (
  	"title" varchar DEFAULT 'Services',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_process_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_process_locales" (
  	"title" varchar DEFAULT 'How I Work',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_faq_questions_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_faq_locales" (
  	"title" varchar DEFAULT 'FAQ',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_contact_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_contact_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Ready to build something great?',
  	"description" varchar,
  	"email_label" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_page_blog_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Latest Articles',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_tags_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "copyright_locales" (
  	"location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-07-26T15:40:00.348Z';
  ALTER TABLE "pages_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "projects_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "case_study_tag" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "case_study_problem" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "case_study_contribution" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "case_study_context" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "case_study_decisions" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "case_study_outcome" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_case_study_tag" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_case_study_problem" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_case_study_contribution" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_case_study_context" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_case_study_decisions" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_case_study_outcome" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_content" jsonb;
  DO $$ BEGIN
   ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_hero_links_locales" ADD CONSTRAINT "pages_blocks_page_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_hero_locales" ADD CONSTRAINT "pages_blocks_page_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_hero_links_locales" ADD CONSTRAINT "pages_blocks_page_services_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_hero_highlights_locales" ADD CONSTRAINT "pages_blocks_page_services_hero_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_hero_locales" ADD CONSTRAINT "pages_blocks_page_services_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_teaser_items_locales" ADD CONSTRAINT "pages_blocks_page_services_teaser_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_teaser_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_teaser_locales" ADD CONSTRAINT "pages_blocks_page_services_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_teaser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_about_locales" ADD CONSTRAINT "pages_blocks_page_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_skills_skill_groups_locales" ADD CONSTRAINT "pages_blocks_page_skills_skill_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_skills_skill_groups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_skills_locales" ADD CONSTRAINT "pages_blocks_page_skills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_projects_locales" ADD CONSTRAINT "pages_blocks_page_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_lab_teaser_locales" ADD CONSTRAINT "pages_blocks_page_lab_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_lab_teaser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_experience_positions_highlights_locales" ADD CONSTRAINT "pages_blocks_page_experience_positions_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_experience_positions_highlights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_experience_positions_locales" ADD CONSTRAINT "pages_blocks_page_experience_positions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_experience_positions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_experience_locales" ADD CONSTRAINT "pages_blocks_page_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_experience"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_services_features_locales" ADD CONSTRAINT "pages_blocks_page_services_services_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_services_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_services_good_fit_points_locales" ADD CONSTRAINT "pages_blocks_page_services_services_good_fit_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_services_good_fit_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_services_locales" ADD CONSTRAINT "pages_blocks_page_services_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_services_locales" ADD CONSTRAINT "pages_blocks_page_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_process_steps_locales" ADD CONSTRAINT "pages_blocks_page_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_process_locales" ADD CONSTRAINT "pages_blocks_page_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_faq_questions_locales" ADD CONSTRAINT "pages_blocks_page_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_faq_locales" ADD CONSTRAINT "pages_blocks_page_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_contact_links_locales" ADD CONSTRAINT "pages_blocks_page_contact_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_contact_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_contact_locales" ADD CONSTRAINT "pages_blocks_page_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_blog_locales" ADD CONSTRAINT "pages_blocks_page_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_blog"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_hero_links_locales" ADD CONSTRAINT "_pages_v_blocks_page_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_hero_locales" ADD CONSTRAINT "_pages_v_blocks_page_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_hero_links_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_hero_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_hero_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_hero_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_teaser_items_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_teaser_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_teaser_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_teaser_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_teaser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_about_locales" ADD CONSTRAINT "_pages_v_blocks_page_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_skills_skill_groups_locales" ADD CONSTRAINT "_pages_v_blocks_page_skills_skill_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_skills_skill_groups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_skills_locales" ADD CONSTRAINT "_pages_v_blocks_page_skills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_projects_locales" ADD CONSTRAINT "_pages_v_blocks_page_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_lab_teaser_locales" ADD CONSTRAINT "_pages_v_blocks_page_lab_teaser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_lab_teaser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_experience_positions_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_page_experience_positions_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_experience_positions_highlights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_experience_positions_locales" ADD CONSTRAINT "_pages_v_blocks_page_experience_positions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_experience_positions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_experience_locales" ADD CONSTRAINT "_pages_v_blocks_page_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_experience"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_services_features_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_services_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_services_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_services_good_fit_points_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_services_good_fit_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_services_good_fit_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_services_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_services_locales" ADD CONSTRAINT "_pages_v_blocks_page_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_page_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_process_locales" ADD CONSTRAINT "_pages_v_blocks_page_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_process"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_faq_questions_locales" ADD CONSTRAINT "_pages_v_blocks_page_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_faq_locales" ADD CONSTRAINT "_pages_v_blocks_page_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_contact_links_locales" ADD CONSTRAINT "_pages_v_blocks_page_contact_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_contact_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_contact_locales" ADD CONSTRAINT "_pages_v_blocks_page_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_page_blog_locales" ADD CONSTRAINT "_pages_v_blocks_page_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_blog"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_tags_locales" ADD CONSTRAINT "project_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_tags_locales" ADD CONSTRAINT "blog_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "copyright_locales" ADD CONSTRAINT "copyright_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."copyright"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_nav_items_locales" ADD CONSTRAINT "footer_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_hero_links_locales_locale_parent_id_unique" ON "pages_blocks_page_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_hero_locales_locale_parent_id_unique" ON "pages_blocks_page_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_links_locales_locale_parent_id_unique" ON "pages_blocks_page_services_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_highlights_locales_locale_parent_id_unique" ON "pages_blocks_page_services_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_hero_locales_locale_parent_id_unique" ON "pages_blocks_page_services_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_teaser_items_locales_locale_parent_id_unique" ON "pages_blocks_page_services_teaser_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_teaser_locales_locale_parent_id_unique" ON "pages_blocks_page_services_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_about_locales_locale_parent_id_unique" ON "pages_blocks_page_about_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_skills_skill_groups_locales_locale_parent_id_unique" ON "pages_blocks_page_skills_skill_groups_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_skills_locales_locale_parent_id_unique" ON "pages_blocks_page_skills_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_projects_locales_locale_parent_id_unique" ON "pages_blocks_page_projects_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_lab_teaser_locales_locale_parent_id_unique" ON "pages_blocks_page_lab_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_experience_positions_highlights_locales_locale_parent_id_unique" ON "pages_blocks_page_experience_positions_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_experience_positions_locales_locale_parent_id_unique" ON "pages_blocks_page_experience_positions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_experience_locales_locale_parent_id_unique" ON "pages_blocks_page_experience_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_services_features_locales_locale_parent_id_unique" ON "pages_blocks_page_services_services_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_services_good_fit_points_locales_locale_parent_id_unique" ON "pages_blocks_page_services_services_good_fit_points_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_services_locales_locale_parent_id_unique" ON "pages_blocks_page_services_services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_services_locales_locale_parent_id_unique" ON "pages_blocks_page_services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_process_steps_locales_locale_parent_id_unique" ON "pages_blocks_page_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_process_locales_locale_parent_id_unique" ON "pages_blocks_page_process_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_faq_questions_locales_locale_parent_id_unique" ON "pages_blocks_page_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_faq_locales_locale_parent_id_unique" ON "pages_blocks_page_faq_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_contact_links_locales_locale_parent_id_unique" ON "pages_blocks_page_contact_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_contact_locales_locale_parent_id_unique" ON "pages_blocks_page_contact_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_page_blog_locales_locale_parent_id_unique" ON "pages_blocks_page_blog_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_hero_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_highlights_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_teaser_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_teaser_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_teaser_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_about_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_about_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_skills_skill_groups_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_skills_skill_groups_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_skills_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_skills_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_projects_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_projects_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_lab_teaser_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_lab_teaser_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_experience_positions_highlights_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_experience_positions_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_experience_positions_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_experience_positions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_experience_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_experience_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_features_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_services_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_good_fit_points_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_services_good_fit_points_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_services_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_services_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_process_steps_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_process_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_process_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_faq_questions_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_faq_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_contact_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_contact_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_contact_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_contact_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_page_blog_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_blog_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "project_tags_locales_locale_parent_id_unique" ON "project_tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_tags_locales_locale_parent_id_unique" ON "blog_tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "copyright_locales_locale_parent_id_unique" ON "copyright_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "footer_nav_items_locales_locale_parent_id_unique" ON "footer_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "media" DROP COLUMN IF EXISTS "alt";
  ALTER TABLE "pages_blocks_page_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "headline";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "location_city";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "location_region";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "status_label";
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "status_available_from";
  ALTER TABLE "pages_blocks_page_services_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_services_hero_highlights" DROP COLUMN IF EXISTS "text";
  ALTER TABLE "pages_blocks_page_services_hero" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_services_hero" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_services_hero" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_page_services_hero" DROP COLUMN IF EXISTS "status_label";
  ALTER TABLE "pages_blocks_page_services_hero" DROP COLUMN IF EXISTS "status_available_from";
  ALTER TABLE "pages_blocks_page_services_teaser_items" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "pages_blocks_page_services_teaser_items" DROP COLUMN IF EXISTS "summary";
  ALTER TABLE "pages_blocks_page_services_teaser_items" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_services_teaser" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_services_teaser" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_services_teaser" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "summary";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "body";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_skills_skill_groups" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "pages_blocks_page_skills" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_skills" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_skills" DROP COLUMN IF EXISTS "subtitle";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "pages_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_experience_positions_highlights" DROP COLUMN IF EXISTS "highlight";
  ALTER TABLE "pages_blocks_page_experience_positions" DROP COLUMN IF EXISTS "position";
  ALTER TABLE "pages_blocks_page_experience_positions" DROP COLUMN IF EXISTS "summary";
  ALTER TABLE "pages_blocks_page_experience" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_services_services_features" DROP COLUMN IF EXISTS "feature";
  ALTER TABLE "pages_blocks_page_services_services_good_fit_points" DROP COLUMN IF EXISTS "point";
  ALTER TABLE "pages_blocks_page_services_services" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "pages_blocks_page_services_services" DROP COLUMN IF EXISTS "for_who";
  ALTER TABLE "pages_blocks_page_services_services" DROP COLUMN IF EXISTS "timeline";
  ALTER TABLE "pages_blocks_page_services_services" DROP COLUMN IF EXISTS "pricing";
  ALTER TABLE "pages_blocks_page_services_services" DROP COLUMN IF EXISTS "proof_label";
  ALTER TABLE "pages_blocks_page_services" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_services" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "pages_blocks_page_process_steps" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_process_steps" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_page_process" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_process" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "pages_blocks_page_faq_questions" DROP COLUMN IF EXISTS "question";
  ALTER TABLE "pages_blocks_page_faq_questions" DROP COLUMN IF EXISTS "answer";
  ALTER TABLE "pages_blocks_page_faq" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_faq" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "pages_blocks_page_contact_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "email_label";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "note";
  ALTER TABLE "pages_blocks_page_blog" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "pages_blocks_page_blog" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "headline";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "location_city";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "location_region";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "status_label";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "status_available_from";
  ALTER TABLE "_pages_v_blocks_page_services_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_services_hero_highlights" DROP COLUMN IF EXISTS "text";
  ALTER TABLE "_pages_v_blocks_page_services_hero" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_services_hero" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_services_hero" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_page_services_hero" DROP COLUMN IF EXISTS "status_label";
  ALTER TABLE "_pages_v_blocks_page_services_hero" DROP COLUMN IF EXISTS "status_available_from";
  ALTER TABLE "_pages_v_blocks_page_services_teaser_items" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "_pages_v_blocks_page_services_teaser_items" DROP COLUMN IF EXISTS "summary";
  ALTER TABLE "_pages_v_blocks_page_services_teaser_items" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_services_teaser" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_services_teaser" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_services_teaser" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "summary";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "body";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_skills_skill_groups" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "_pages_v_blocks_page_skills" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_skills" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_skills" DROP COLUMN IF EXISTS "subtitle";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_experience_positions_highlights" DROP COLUMN IF EXISTS "highlight";
  ALTER TABLE "_pages_v_blocks_page_experience_positions" DROP COLUMN IF EXISTS "position";
  ALTER TABLE "_pages_v_blocks_page_experience_positions" DROP COLUMN IF EXISTS "summary";
  ALTER TABLE "_pages_v_blocks_page_experience" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_services_services_features" DROP COLUMN IF EXISTS "feature";
  ALTER TABLE "_pages_v_blocks_page_services_services_good_fit_points" DROP COLUMN IF EXISTS "point";
  ALTER TABLE "_pages_v_blocks_page_services_services" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "_pages_v_blocks_page_services_services" DROP COLUMN IF EXISTS "for_who";
  ALTER TABLE "_pages_v_blocks_page_services_services" DROP COLUMN IF EXISTS "timeline";
  ALTER TABLE "_pages_v_blocks_page_services_services" DROP COLUMN IF EXISTS "pricing";
  ALTER TABLE "_pages_v_blocks_page_services_services" DROP COLUMN IF EXISTS "proof_label";
  ALTER TABLE "_pages_v_blocks_page_services" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_services" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "_pages_v_blocks_page_process_steps" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_process_steps" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_page_process" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_process" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "_pages_v_blocks_page_faq_questions" DROP COLUMN IF EXISTS "question";
  ALTER TABLE "_pages_v_blocks_page_faq_questions" DROP COLUMN IF EXISTS "answer";
  ALTER TABLE "_pages_v_blocks_page_faq" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_faq" DROP COLUMN IF EXISTS "intro";
  ALTER TABLE "_pages_v_blocks_page_contact_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "email_label";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "note";
  ALTER TABLE "_pages_v_blocks_page_blog" DROP COLUMN IF EXISTS "eyebrow";
  ALTER TABLE "_pages_v_blocks_page_blog" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_content";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_tag";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_problem";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_contribution";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_context";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_decisions";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "case_study_outcome";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_tag";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_problem";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_contribution";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_context";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_decisions";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_case_study_outcome";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_content";
  ALTER TABLE "project_tags" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "blog_tags" DROP COLUMN IF EXISTS "tag";
  ALTER TABLE "copyright" DROP COLUMN IF EXISTS "location";
  ALTER TABLE "footer_nav_items" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_hero_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_teaser_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_teaser_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_about_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_skills_skill_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_skills_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_lab_teaser_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_experience_positions_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_experience_positions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_experience_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_services_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_services_good_fit_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_process_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_contact_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_contact_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_blog_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_hero_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_teaser_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_teaser_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_about_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_skills_skill_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_skills_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_lab_teaser_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_experience_positions_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_experience_positions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_experience_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_services_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_services_good_fit_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_process_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_contact_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_contact_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_blog_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "project_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "copyright_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_blocks_page_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_page_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_hero_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_teaser_items_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_teaser_locales" CASCADE;
  DROP TABLE "pages_blocks_page_about_locales" CASCADE;
  DROP TABLE "pages_blocks_page_skills_skill_groups_locales" CASCADE;
  DROP TABLE "pages_blocks_page_skills_locales" CASCADE;
  DROP TABLE "pages_blocks_page_projects_locales" CASCADE;
  DROP TABLE "pages_blocks_page_lab_teaser_locales" CASCADE;
  DROP TABLE "pages_blocks_page_experience_positions_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_page_experience_positions_locales" CASCADE;
  DROP TABLE "pages_blocks_page_experience_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_services_features_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_services_good_fit_points_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_services_locales" CASCADE;
  DROP TABLE "pages_blocks_page_services_locales" CASCADE;
  DROP TABLE "pages_blocks_page_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_page_process_locales" CASCADE;
  DROP TABLE "pages_blocks_page_faq_questions_locales" CASCADE;
  DROP TABLE "pages_blocks_page_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_page_contact_links_locales" CASCADE;
  DROP TABLE "pages_blocks_page_contact_locales" CASCADE;
  DROP TABLE "pages_blocks_page_blog_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_hero_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_teaser_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_teaser_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_about_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_skills_skill_groups_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_skills_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_projects_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_lab_teaser_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_experience_positions_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_experience_positions_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_experience_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_services_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_services_good_fit_points_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_services_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_services_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_process_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_process_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_faq_questions_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_contact_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_contact_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_blog_locales" CASCADE;
  DROP TABLE "project_tags_locales" CASCADE;
  DROP TABLE "blog_tags_locales" CASCADE;
  DROP TABLE "copyright_locales" CASCADE;
  DROP TABLE "footer_nav_items_locales" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-07-25T20:08:51.726Z';
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "pages_blocks_page_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "name" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "location_city" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "location_region" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "status_label" varchar;
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "status_available_from" varchar;
  ALTER TABLE "pages_blocks_page_services_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_services_hero_highlights" ADD COLUMN "text" varchar;
  ALTER TABLE "pages_blocks_page_services_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_services_hero" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_page_services_hero" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_page_services_hero" ADD COLUMN "status_label" varchar;
  ALTER TABLE "pages_blocks_page_services_hero" ADD COLUMN "status_available_from" varchar;
  ALTER TABLE "pages_blocks_page_services_teaser_items" ADD COLUMN "name" varchar;
  ALTER TABLE "pages_blocks_page_services_teaser_items" ADD COLUMN "summary" varchar;
  ALTER TABLE "pages_blocks_page_services_teaser_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_services_teaser" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_services_teaser" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_page_services_teaser" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "title" varchar DEFAULT 'About Me';
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "summary" varchar;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "body" jsonb;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_skills_skill_groups" ADD COLUMN "name" varchar;
  ALTER TABLE "pages_blocks_page_skills" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_skills" ADD COLUMN "title" varchar DEFAULT 'Technical Arsenal';
  ALTER TABLE "pages_blocks_page_skills" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "title" varchar DEFAULT 'Featured Projects';
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_lab_teaser" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_lab_teaser" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_page_lab_teaser" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_page_lab_teaser" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_experience_positions_highlights" ADD COLUMN "highlight" varchar;
  ALTER TABLE "pages_blocks_page_experience_positions" ADD COLUMN "position" varchar;
  ALTER TABLE "pages_blocks_page_experience_positions" ADD COLUMN "summary" varchar;
  ALTER TABLE "pages_blocks_page_experience" ADD COLUMN "title" varchar DEFAULT 'Professional History';
  ALTER TABLE "pages_blocks_page_services_services_features" ADD COLUMN "feature" varchar;
  ALTER TABLE "pages_blocks_page_services_services_good_fit_points" ADD COLUMN "point" varchar;
  ALTER TABLE "pages_blocks_page_services_services" ADD COLUMN "name" varchar;
  ALTER TABLE "pages_blocks_page_services_services" ADD COLUMN "for_who" varchar;
  ALTER TABLE "pages_blocks_page_services_services" ADD COLUMN "timeline" varchar;
  ALTER TABLE "pages_blocks_page_services_services" ADD COLUMN "pricing" varchar;
  ALTER TABLE "pages_blocks_page_services_services" ADD COLUMN "proof_label" varchar;
  ALTER TABLE "pages_blocks_page_services" ADD COLUMN "title" varchar DEFAULT 'Services';
  ALTER TABLE "pages_blocks_page_services" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_page_process_steps" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_page_process_steps" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_page_process" ADD COLUMN "title" varchar DEFAULT 'How I Work';
  ALTER TABLE "pages_blocks_page_process" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_page_faq_questions" ADD COLUMN "question" varchar;
  ALTER TABLE "pages_blocks_page_faq_questions" ADD COLUMN "answer" varchar;
  ALTER TABLE "pages_blocks_page_faq" ADD COLUMN "title" varchar DEFAULT 'FAQ';
  ALTER TABLE "pages_blocks_page_faq" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_page_contact_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "title" varchar DEFAULT 'Ready to build something great?';
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "email_label" varchar;
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "note" varchar;
  ALTER TABLE "pages_blocks_page_blog" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_page_blog" ADD COLUMN "title" varchar DEFAULT 'Latest Articles';
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "name" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "headline" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "location_city" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "location_region" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "status_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "status_available_from" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_hero_highlights" ADD COLUMN "text" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_hero" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_hero" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_hero" ADD COLUMN "status_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_hero" ADD COLUMN "status_available_from" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_teaser_items" ADD COLUMN "name" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_teaser_items" ADD COLUMN "summary" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_teaser_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_teaser" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_teaser" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_teaser" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "title" varchar DEFAULT 'About Me';
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "summary" varchar;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "body" jsonb;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_skills_skill_groups" ADD COLUMN "name" varchar;
  ALTER TABLE "_pages_v_blocks_page_skills" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_skills" ADD COLUMN "title" varchar DEFAULT 'Technical Arsenal';
  ALTER TABLE "_pages_v_blocks_page_skills" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "title" varchar DEFAULT 'Featured Projects';
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_experience_positions_highlights" ADD COLUMN "highlight" varchar;
  ALTER TABLE "_pages_v_blocks_page_experience_positions" ADD COLUMN "position" varchar;
  ALTER TABLE "_pages_v_blocks_page_experience_positions" ADD COLUMN "summary" varchar;
  ALTER TABLE "_pages_v_blocks_page_experience" ADD COLUMN "title" varchar DEFAULT 'Professional History';
  ALTER TABLE "_pages_v_blocks_page_services_services_features" ADD COLUMN "feature" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_services_good_fit_points" ADD COLUMN "point" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_services" ADD COLUMN "name" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_services" ADD COLUMN "for_who" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_services" ADD COLUMN "timeline" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_services" ADD COLUMN "pricing" varchar;
  ALTER TABLE "_pages_v_blocks_page_services_services" ADD COLUMN "proof_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_services" ADD COLUMN "title" varchar DEFAULT 'Services';
  ALTER TABLE "_pages_v_blocks_page_services" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_page_process_steps" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_page_process_steps" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_page_process" ADD COLUMN "title" varchar DEFAULT 'How I Work';
  ALTER TABLE "_pages_v_blocks_page_process" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_page_faq_questions" ADD COLUMN "question" varchar;
  ALTER TABLE "_pages_v_blocks_page_faq_questions" ADD COLUMN "answer" varchar;
  ALTER TABLE "_pages_v_blocks_page_faq" ADD COLUMN "title" varchar DEFAULT 'FAQ';
  ALTER TABLE "_pages_v_blocks_page_faq" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_page_contact_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "title" varchar DEFAULT 'Ready to build something great?';
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "email_label" varchar;
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "note" varchar;
  ALTER TABLE "_pages_v_blocks_page_blog" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_page_blog" ADD COLUMN "title" varchar DEFAULT 'Latest Articles';
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "projects" ADD COLUMN "title" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_tag" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_problem" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_contribution" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_context" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_decisions" varchar;
  ALTER TABLE "projects" ADD COLUMN "case_study_outcome" varchar;
  ALTER TABLE "projects" ADD COLUMN "content" jsonb;
  ALTER TABLE "_projects_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_tag" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_problem" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_contribution" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_context" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_decisions" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_case_study_outcome" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "project_tags" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "blog_tags" ADD COLUMN "tag" varchar NOT NULL;
  ALTER TABLE "copyright" ADD COLUMN "location" varchar;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_content";
  ALTER TABLE "projects_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "projects_locales" DROP COLUMN IF EXISTS "case_study_tag";
  ALTER TABLE "projects_locales" DROP COLUMN IF EXISTS "case_study_problem";
  ALTER TABLE "projects_locales" DROP COLUMN IF EXISTS "case_study_contribution";
  ALTER TABLE "projects_locales" DROP COLUMN IF EXISTS "case_study_context";
  ALTER TABLE "projects_locales" DROP COLUMN IF EXISTS "case_study_decisions";
  ALTER TABLE "projects_locales" DROP COLUMN IF EXISTS "case_study_outcome";
  ALTER TABLE "projects_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_projects_v_locales" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "_projects_v_locales" DROP COLUMN IF EXISTS "version_case_study_tag";
  ALTER TABLE "_projects_v_locales" DROP COLUMN IF EXISTS "version_case_study_problem";
  ALTER TABLE "_projects_v_locales" DROP COLUMN IF EXISTS "version_case_study_contribution";
  ALTER TABLE "_projects_v_locales" DROP COLUMN IF EXISTS "version_case_study_context";
  ALTER TABLE "_projects_v_locales" DROP COLUMN IF EXISTS "version_case_study_decisions";
  ALTER TABLE "_projects_v_locales" DROP COLUMN IF EXISTS "version_case_study_outcome";
  ALTER TABLE "_projects_v_locales" DROP COLUMN IF EXISTS "version_content";`)
}
