import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts', 'projects');
  CREATE TYPE "public"."theme" AS ENUM('auto', 'light', 'dark', 'inverted');
  CREATE TYPE "public"."section_background" AS ENUM('none', 'svgCircles', 'image');
  CREATE TYPE "public"."enum_pages_blocks_strps_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_strps_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_strps_about_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_strps_about_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."lucideIcon" AS ENUM('none', 'code', 'circuit-board', 'palette', 'monitor', 'briefcase');
  CREATE TYPE "public"."enum_pages_blocks_projects_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_projects_archive_relation_to" AS ENUM('projects');
  CREATE TYPE "public"."enum_pages_blocks_strps_form_block_intro_type" AS ENUM('richText', 'titleAndText', 'none');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_stats_color" AS ENUM('primary', 'secondary', 'accent', 'success', 'warning', 'error');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_layout" AS ENUM('grid', 'side-by-side', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_animation_easing" AS ENUM('easeOut', 'easeIn', 'easeInOut', 'linear');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_style_variant" AS ENUM('card', 'minimal', 'bordered', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_style_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_style_value_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_cta_style" AS ENUM('primary', 'secondary', 'outline', 'text');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_container_max_width" AS ENUM('sm', 'md', 'lg', 'xl', 'full', 'none');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_container_padding_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_strps_stats_container_padding_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_strps_services_services_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."5922cf090345ef402d856d9ae59457dcLinkAppearances" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_strps_services_layout" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_strps_clients_display_type" AS ENUM('grid', 'carousel', 'testimonials', 'combined');
  CREATE TYPE "public"."enum_pages_blocks_strps_clients_max_logos_per_row" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_strps_clients_logo_background" AS ENUM('none', 'light', 'gray', 'rounded');
  CREATE TYPE "public"."enum_pages_blocks_strps_clients_testimonial_layout" AS ENUM('grid', 'slider', 'stacked');
  CREATE TYPE "public"."enum_pages_blocks_strps_careers_filters_type" AS ENUM('department', 'location', 'jobType', 'experience');
  CREATE TYPE "public"."enum_pages_blocks_strps_careers_application_form_fields_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'file', 'hidden');
  CREATE TYPE "public"."enum_pages_blocks_strps_careers_social_links_platform" AS ENUM('linkedin', 'twitter', 'facebook', 'instagram', 'github', 'other');
  CREATE TYPE "public"."enum_pages_blocks_strps_careers_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_strps_careers_columns" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_pages_blocks_strps_careers_default_filters_job_type" AS ENUM('', 'full-time', 'part-time', 'contract', 'internship', 'temporary');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts', 'projects');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_about_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_about_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_archive_relation_to" AS ENUM('projects');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_form_block_intro_type" AS ENUM('richText', 'titleAndText', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_stats_color" AS ENUM('primary', 'secondary', 'accent', 'success', 'warning', 'error');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_layout" AS ENUM('grid', 'side-by-side', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_animation_easing" AS ENUM('easeOut', 'easeIn', 'easeInOut', 'linear');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_style_variant" AS ENUM('card', 'minimal', 'bordered', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_style_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_style_value_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_cta_style" AS ENUM('primary', 'secondary', 'outline', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_container_max_width" AS ENUM('sm', 'md', 'lg', 'xl', 'full', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_container_padding_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_stats_container_padding_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_services_services_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."d763300aca11ab86b0d4a59344c843ccLinkAppearances" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_services_layout" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_clients_display_type" AS ENUM('grid', 'carousel', 'testimonials', 'combined');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_clients_max_logos_per_row" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_clients_logo_background" AS ENUM('none', 'light', 'gray', 'rounded');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_clients_testimonial_layout" AS ENUM('grid', 'slider', 'stacked');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_careers_filters_type" AS ENUM('department', 'location', 'jobType', 'experience');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_careers_application_form_fields_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'file', 'hidden');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_careers_social_links_platform" AS ENUM('linkedin', 'twitter', 'facebook', 'instagram', 'github', 'other');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_careers_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_careers_columns" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_careers_default_filters_job_type" AS ENUM('', 'full-time', 'part-time', 'contract', 'internship', 'temporary');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_strps_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_strps_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"link_type" "enum_pages_blocks_strps_about_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_strps_about_link_appearance" DEFAULT 'default',
  	"image_id" integer,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_adjacent" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"content" jsonb,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_story_blocks_story_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" varchar,
  	"lucide_icon" "lucideIcon",
  	"alt" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_story_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"title" varchar,
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
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
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
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_projects_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_projects_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_projects_archive_relation_to" DEFAULT 'projects',
  	"limit" numeric DEFAULT 10,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_us_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_us_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"event" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_us_leadership" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"title" varchar,
  	"bio" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_about_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"heading" varchar,
  	"mission" jsonb,
  	"vision" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"form_id" integer,
  	"intro_type" "enum_pages_blocks_strps_form_block_intro_type" DEFAULT 'richText',
  	"intro_content" jsonb,
  	"intro_title" varchar,
  	"intro_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" varchar,
  	"color" "enum_pages_blocks_strps_stats_stats_color" DEFAULT 'primary'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_pages_blocks_strps_stats_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_strps_stats_columns" DEFAULT '4',
  	"animation_enable" boolean DEFAULT true,
  	"animation_duration" numeric DEFAULT 2000,
  	"animation_easing" "enum_pages_blocks_strps_stats_animation_easing" DEFAULT 'easeOut',
  	"style_variant" "enum_pages_blocks_strps_stats_style_variant" DEFAULT 'card',
  	"style_text_align" "enum_pages_blocks_strps_stats_style_text_align" DEFAULT 'center',
  	"style_value_size" "enum_pages_blocks_strps_stats_style_value_size" DEFAULT 'xl',
  	"cta_enable" boolean DEFAULT false,
  	"cta_text" varchar DEFAULT 'Learn more',
  	"cta_link" varchar,
  	"cta_style" "enum_pages_blocks_strps_stats_cta_style" DEFAULT 'primary',
  	"container_max_width" "enum_pages_blocks_strps_stats_container_max_width" DEFAULT 'xl',
  	"container_padding_top" "enum_pages_blocks_strps_stats_container_padding_top" DEFAULT 'xl',
  	"container_padding_bottom" "enum_pages_blocks_strps_stats_container_padding_bottom" DEFAULT 'xl',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"link_type" "enum_pages_blocks_strps_services_services_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "5922cf090345ef402d856d9ae59457dcLinkAppearances" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_pages_blocks_strps_services_layout" DEFAULT 'grid',
  	"show_featured" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_clients_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"testimonial_content" varchar,
  	"testimonial_author" varchar,
  	"testimonial_position" varchar,
  	"testimonial_company" varchar,
  	"testimonial_author_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"display_type" "enum_pages_blocks_strps_clients_display_type" DEFAULT 'grid',
  	"show_divider" boolean DEFAULT true,
  	"max_logos_per_row" "enum_pages_blocks_strps_clients_max_logos_per_row" DEFAULT '5',
  	"logo_background" "enum_pages_blocks_strps_clients_logo_background" DEFAULT 'none',
  	"testimonial_layout" "enum_pages_blocks_strps_clients_testimonial_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_careers_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_strps_careers_filters_type",
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_careers_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_careers_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_careers_application_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_careers_application_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_strps_careers_application_form_fields_type",
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"accept" varchar,
  	"max_file_size" numeric DEFAULT 5
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_careers_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_strps_careers_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_careers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_pages_blocks_strps_careers_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_strps_careers_columns" DEFAULT '2',
  	"show_filters" boolean DEFAULT true,
  	"default_filters_department" varchar,
  	"default_filters_location" varchar,
  	"default_filters_job_type" "enum_pages_blocks_strps_careers_default_filters_job_type",
  	"show_search" boolean DEFAULT true,
  	"search_placeholder" varchar DEFAULT 'Search jobs...',
  	"show_categories" boolean DEFAULT true,
  	"show_featured" boolean DEFAULT true,
  	"featured_title" varchar DEFAULT 'Featured Positions',
  	"show_benefits" boolean DEFAULT true,
  	"show_application_form" boolean DEFAULT true,
  	"application_form_title" varchar DEFAULT 'Apply for this position',
  	"application_form_description" varchar,
  	"application_form_submit_button_text" varchar DEFAULT 'Submit Application',
  	"application_form_success_message" varchar DEFAULT 'Thank you for your application! We will review your information and get back to you soon.',
  	"show_contact" boolean DEFAULT true,
  	"contact_info_email" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_address" varchar,
  	"show_social" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"appearance_header_overrides_theme" "theme" DEFAULT 'auto',
  	"appearance_header_overrides_background" boolean DEFAULT false,
  	"appearance_header_overrides_overlay" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"blog_tags_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_strps_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_strps_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"link_type" "enum__pages_v_blocks_strps_about_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_strps_about_link_appearance" DEFAULT 'default',
  	"image_id" integer,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"content" jsonb,
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
  	"lucide_icon" "lucideIcon",
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"title" varchar,
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
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
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
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_projects_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_projects_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_projects_archive_relation_to" DEFAULT 'projects',
  	"limit" numeric DEFAULT 10,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_us_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_us_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"event" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_us_leadership" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"title" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_about_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"heading" varchar,
  	"mission" jsonb,
  	"vision" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_container" boolean,
  	"section_section_id" varchar,
  	"section_background_container" boolean,
  	"section_theme" "theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"form_id" integer,
  	"intro_type" "enum__pages_v_blocks_strps_form_block_intro_type" DEFAULT 'richText',
  	"intro_content" jsonb,
  	"intro_title" varchar,
  	"intro_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" varchar,
  	"color" "enum__pages_v_blocks_strps_stats_stats_color" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__pages_v_blocks_strps_stats_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_strps_stats_columns" DEFAULT '4',
  	"animation_enable" boolean DEFAULT true,
  	"animation_duration" numeric DEFAULT 2000,
  	"animation_easing" "enum__pages_v_blocks_strps_stats_animation_easing" DEFAULT 'easeOut',
  	"style_variant" "enum__pages_v_blocks_strps_stats_style_variant" DEFAULT 'card',
  	"style_text_align" "enum__pages_v_blocks_strps_stats_style_text_align" DEFAULT 'center',
  	"style_value_size" "enum__pages_v_blocks_strps_stats_style_value_size" DEFAULT 'xl',
  	"cta_enable" boolean DEFAULT false,
  	"cta_text" varchar DEFAULT 'Learn more',
  	"cta_link" varchar,
  	"cta_style" "enum__pages_v_blocks_strps_stats_cta_style" DEFAULT 'primary',
  	"container_max_width" "enum__pages_v_blocks_strps_stats_container_max_width" DEFAULT 'xl',
  	"container_padding_top" "enum__pages_v_blocks_strps_stats_container_padding_top" DEFAULT 'xl',
  	"container_padding_bottom" "enum__pages_v_blocks_strps_stats_container_padding_bottom" DEFAULT 'xl',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"link_type" "enum__pages_v_blocks_strps_services_services_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "d763300aca11ab86b0d4a59344c843ccLinkAppearances" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__pages_v_blocks_strps_services_layout" DEFAULT 'grid',
  	"show_featured" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_clients_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"testimonial_content" varchar,
  	"testimonial_author" varchar,
  	"testimonial_position" varchar,
  	"testimonial_company" varchar,
  	"testimonial_author_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"display_type" "enum__pages_v_blocks_strps_clients_display_type" DEFAULT 'grid',
  	"show_divider" boolean DEFAULT true,
  	"max_logos_per_row" "enum__pages_v_blocks_strps_clients_max_logos_per_row" DEFAULT '5',
  	"logo_background" "enum__pages_v_blocks_strps_clients_logo_background" DEFAULT 'none',
  	"testimonial_layout" "enum__pages_v_blocks_strps_clients_testimonial_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_careers_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_strps_careers_filters_type",
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_careers_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_careers_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_careers_application_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_careers_application_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_strps_careers_application_form_fields_type",
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"accept" varchar,
  	"max_file_size" numeric DEFAULT 5,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_careers_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__pages_v_blocks_strps_careers_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_careers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__pages_v_blocks_strps_careers_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_strps_careers_columns" DEFAULT '2',
  	"show_filters" boolean DEFAULT true,
  	"default_filters_department" varchar,
  	"default_filters_location" varchar,
  	"default_filters_job_type" "enum__pages_v_blocks_strps_careers_default_filters_job_type",
  	"show_search" boolean DEFAULT true,
  	"search_placeholder" varchar DEFAULT 'Search jobs...',
  	"show_categories" boolean DEFAULT true,
  	"show_featured" boolean DEFAULT true,
  	"featured_title" varchar DEFAULT 'Featured Positions',
  	"show_benefits" boolean DEFAULT true,
  	"show_application_form" boolean DEFAULT true,
  	"application_form_title" varchar DEFAULT 'Apply for this position',
  	"application_form_description" varchar,
  	"application_form_submit_button_text" varchar DEFAULT 'Submit Application',
  	"application_form_success_message" varchar DEFAULT 'Thank you for your application! We will review your information and get back to you soon.',
  	"show_contact" boolean DEFAULT true,
  	"contact_info_email" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_address" varchar,
  	"show_social" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_appearance_header_overrides_theme" "theme" DEFAULT 'auto',
  	"version_appearance_header_overrides_background" boolean DEFAULT false,
  	"version_appearance_header_overrides_overlay" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"blog_tags_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"appearance_header_overrides_theme" "theme" DEFAULT 'dark',
  	"appearance_header_overrides_background" boolean DEFAULT false,
  	"appearance_header_overrides_overlay" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"blog_tags_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_appearance_header_overrides_theme" "theme" DEFAULT 'dark',
  	"version_appearance_header_overrides_background" boolean DEFAULT false,
  	"version_appearance_header_overrides_overlay" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"blog_tags_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"appearance_header_overrides_theme" "theme" DEFAULT 'dark',
  	"appearance_header_overrides_background" boolean DEFAULT false,
  	"appearance_header_overrides_overlay" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "projects_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_appearance_header_overrides_theme" "theme" DEFAULT 'dark',
  	"version_appearance_header_overrides_background" boolean DEFAULT false,
  	"version_appearance_header_overrides_overlay" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_tags_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_tags_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_recaptcha" boolean DEFAULT false,
  	"title" varchar NOT NULL,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"users_id" integer,
  	"projects_id" integer,
  	"project_tags_id" integer,
  	"blog_tags_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "copyright" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"start_date" timestamp(3) with time zone DEFAULT '2025-06-26T01:29:46.065Z' NOT NULL,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"theme" "theme" DEFAULT 'auto',
  	"background" boolean DEFAULT false,
  	"overlay" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_overrides_theme" "theme" DEFAULT 'dark',
  	"header_overrides_background" boolean DEFAULT false,
  	"header_overrides_overlay" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "projects_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_overrides_theme" "theme" DEFAULT 'dark',
  	"header_overrides_background" boolean DEFAULT false,
  	"header_overrides_overlay" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "projects_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_hero_links" ADD CONSTRAINT "pages_blocks_strps_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_hero" ADD CONSTRAINT "pages_blocks_strps_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "pages_blocks_strps_about" ADD CONSTRAINT "pages_blocks_strps_about_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about" ADD CONSTRAINT "pages_blocks_strps_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_adjacent" ADD CONSTRAINT "pages_blocks_strps_about_adjacent_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD CONSTRAINT "pages_blocks_strps_about_story_blocks_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_strps_skills" ADD CONSTRAINT "pages_blocks_strps_skills_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_skills" ADD CONSTRAINT "pages_blocks_strps_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_contact" ADD CONSTRAINT "pages_blocks_strps_contact_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_contact" ADD CONSTRAINT "pages_blocks_strps_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_projects_archive" ADD CONSTRAINT "pages_blocks_projects_archive_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_projects_archive" ADD CONSTRAINT "pages_blocks_projects_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_us_values" ADD CONSTRAINT "pages_blocks_strps_about_us_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_about_us"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_us_timeline" ADD CONSTRAINT "pages_blocks_strps_about_us_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_about_us"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_us_leadership" ADD CONSTRAINT "pages_blocks_strps_about_us_leadership_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_us_leadership" ADD CONSTRAINT "pages_blocks_strps_about_us_leadership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_about_us"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_us" ADD CONSTRAINT "pages_blocks_strps_about_us_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_us" ADD CONSTRAINT "pages_blocks_strps_about_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_form_block" ADD CONSTRAINT "pages_blocks_strps_form_block_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_form_block" ADD CONSTRAINT "pages_blocks_strps_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_form_block" ADD CONSTRAINT "pages_blocks_strps_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_stats_stats" ADD CONSTRAINT "pages_blocks_strps_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_stats" ADD CONSTRAINT "pages_blocks_strps_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_services_services" ADD CONSTRAINT "pages_blocks_strps_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_services" ADD CONSTRAINT "pages_blocks_strps_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_clients_clients" ADD CONSTRAINT "pages_blocks_strps_clients_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_clients_clients" ADD CONSTRAINT "pages_blocks_strps_clients_clients_testimonial_author_image_id_media_id_fk" FOREIGN KEY ("testimonial_author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_clients_clients" ADD CONSTRAINT "pages_blocks_strps_clients_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_clients" ADD CONSTRAINT "pages_blocks_strps_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers_filters" ADD CONSTRAINT "pages_blocks_strps_careers_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers_categories" ADD CONSTRAINT "pages_blocks_strps_careers_categories_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers_categories" ADD CONSTRAINT "pages_blocks_strps_careers_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers_benefits" ADD CONSTRAINT "pages_blocks_strps_careers_benefits_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers_benefits" ADD CONSTRAINT "pages_blocks_strps_careers_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers_application_form_fields_options" ADD CONSTRAINT "pages_blocks_strps_careers_application_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_careers_application_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers_application_form_fields" ADD CONSTRAINT "pages_blocks_strps_careers_application_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers_social_links" ADD CONSTRAINT "pages_blocks_strps_careers_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_careers" ADD CONSTRAINT "pages_blocks_strps_careers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_hero_links" ADD CONSTRAINT "_pages_v_blocks_strps_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_hero" ADD CONSTRAINT "_pages_v_blocks_strps_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_strps_about" ADD CONSTRAINT "_pages_v_blocks_strps_about_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about" ADD CONSTRAINT "_pages_v_blocks_strps_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD CONSTRAINT "_pages_v_blocks_strps_about_adjacent_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD CONSTRAINT "_pages_v_blocks_strps_about_story_blocks_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_strps_skills" ADD CONSTRAINT "_pages_v_blocks_strps_skills_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_skills" ADD CONSTRAINT "_pages_v_blocks_strps_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_contact" ADD CONSTRAINT "_pages_v_blocks_strps_contact_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_contact" ADD CONSTRAINT "_pages_v_blocks_strps_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_projects_archive" ADD CONSTRAINT "_pages_v_blocks_projects_archive_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_projects_archive" ADD CONSTRAINT "_pages_v_blocks_projects_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_us_values" ADD CONSTRAINT "_pages_v_blocks_strps_about_us_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_about_us"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_us_timeline" ADD CONSTRAINT "_pages_v_blocks_strps_about_us_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_about_us"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_us_leadership" ADD CONSTRAINT "_pages_v_blocks_strps_about_us_leadership_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_us_leadership" ADD CONSTRAINT "_pages_v_blocks_strps_about_us_leadership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_about_us"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_us" ADD CONSTRAINT "_pages_v_blocks_strps_about_us_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_us" ADD CONSTRAINT "_pages_v_blocks_strps_about_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_form_block" ADD CONSTRAINT "_pages_v_blocks_strps_form_block_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_form_block" ADD CONSTRAINT "_pages_v_blocks_strps_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_form_block" ADD CONSTRAINT "_pages_v_blocks_strps_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_stats_stats" ADD CONSTRAINT "_pages_v_blocks_strps_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_stats" ADD CONSTRAINT "_pages_v_blocks_strps_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_services_services" ADD CONSTRAINT "_pages_v_blocks_strps_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_services" ADD CONSTRAINT "_pages_v_blocks_strps_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_clients_clients" ADD CONSTRAINT "_pages_v_blocks_strps_clients_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_clients_clients" ADD CONSTRAINT "_pages_v_blocks_strps_clients_clients_testimonial_author_image_id_media_id_fk" FOREIGN KEY ("testimonial_author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_clients_clients" ADD CONSTRAINT "_pages_v_blocks_strps_clients_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_clients" ADD CONSTRAINT "_pages_v_blocks_strps_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers_filters" ADD CONSTRAINT "_pages_v_blocks_strps_careers_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers_categories" ADD CONSTRAINT "_pages_v_blocks_strps_careers_categories_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers_categories" ADD CONSTRAINT "_pages_v_blocks_strps_careers_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers_benefits" ADD CONSTRAINT "_pages_v_blocks_strps_careers_benefits_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers_benefits" ADD CONSTRAINT "_pages_v_blocks_strps_careers_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers_application_form_fields_options" ADD CONSTRAINT "_pages_v_blocks_strps_careers_application_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_careers_application_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers_application_form_fields" ADD CONSTRAINT "_pages_v_blocks_strps_careers_application_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers_social_links" ADD CONSTRAINT "_pages_v_blocks_strps_careers_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_careers" ADD CONSTRAINT "_pages_v_blocks_strps_careers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_tags_breadcrumbs" ADD CONSTRAINT "project_tags_breadcrumbs_doc_id_project_tags_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."project_tags"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_tags_breadcrumbs" ADD CONSTRAINT "project_tags_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_tags" ADD CONSTRAINT "project_tags_parent_id_project_tags_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."project_tags"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_tags_breadcrumbs" ADD CONSTRAINT "blog_tags_breadcrumbs_doc_id_blog_tags_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."blog_tags"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_tags_breadcrumbs" ADD CONSTRAINT "blog_tags_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_parent_id_blog_tags_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_tags"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_tags_fk" FOREIGN KEY ("project_tags_id") REFERENCES "public"."project_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_rels" ADD CONSTRAINT "blog_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_page_rels" ADD CONSTRAINT "blog_page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_page_rels" ADD CONSTRAINT "projects_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_page_rels" ADD CONSTRAINT "projects_page_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_section_section_background_image_idx" ON "pages_blocks_archive" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_links_order_idx" ON "pages_blocks_strps_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_links_parent_id_idx" ON "pages_blocks_strps_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_order_idx" ON "pages_blocks_strps_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_parent_id_idx" ON "pages_blocks_strps_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_path_idx" ON "pages_blocks_strps_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_section_section_background_image_idx" ON "pages_blocks_strps_hero" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_order_idx" ON "pages_blocks_strps_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_parent_id_idx" ON "pages_blocks_strps_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_path_idx" ON "pages_blocks_strps_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_image_idx" ON "pages_blocks_strps_about" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_section_section_background_image_idx" ON "pages_blocks_strps_about" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_order_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_parent_id_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_path_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_section_section_background_image_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_media_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_story_blocks_order_idx" ON "pages_blocks_strps_about_story_blocks_story_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_story_blocks_parent_id_idx" ON "pages_blocks_strps_about_story_blocks_story_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_order_idx" ON "pages_blocks_strps_about_story_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_parent_id_idx" ON "pages_blocks_strps_about_story_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_path_idx" ON "pages_blocks_strps_about_story_blocks" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_section_section_background_image_idx" ON "pages_blocks_strps_about_story_blocks" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_skill_group_skills_order_idx" ON "pages_blocks_strps_skills_skill_group_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_skill_group_skills_parent_id_idx" ON "pages_blocks_strps_skills_skill_group_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_skill_group_order_idx" ON "pages_blocks_strps_skills_skill_group" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_skill_group_parent_id_idx" ON "pages_blocks_strps_skills_skill_group" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_order_idx" ON "pages_blocks_strps_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_parent_id_idx" ON "pages_blocks_strps_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_path_idx" ON "pages_blocks_strps_skills" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_section_section_background_image_idx" ON "pages_blocks_strps_skills" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_contact_order_idx" ON "pages_blocks_strps_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_contact_parent_id_idx" ON "pages_blocks_strps_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_contact_path_idx" ON "pages_blocks_strps_contact" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_contact_section_section_background_image_idx" ON "pages_blocks_strps_contact" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_projects_archive_order_idx" ON "pages_blocks_projects_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_projects_archive_parent_id_idx" ON "pages_blocks_projects_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_projects_archive_path_idx" ON "pages_blocks_projects_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_projects_archive_section_section_background_image_idx" ON "pages_blocks_projects_archive" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_values_order_idx" ON "pages_blocks_strps_about_us_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_values_parent_id_idx" ON "pages_blocks_strps_about_us_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_timeline_order_idx" ON "pages_blocks_strps_about_us_timeline" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_timeline_parent_id_idx" ON "pages_blocks_strps_about_us_timeline" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_leadership_order_idx" ON "pages_blocks_strps_about_us_leadership" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_leadership_parent_id_idx" ON "pages_blocks_strps_about_us_leadership" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_leadership_image_idx" ON "pages_blocks_strps_about_us_leadership" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_order_idx" ON "pages_blocks_strps_about_us" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_parent_id_idx" ON "pages_blocks_strps_about_us" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_path_idx" ON "pages_blocks_strps_about_us" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_us_section_section_background_image_idx" ON "pages_blocks_strps_about_us" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_order_idx" ON "pages_blocks_strps_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_parent_id_idx" ON "pages_blocks_strps_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_path_idx" ON "pages_blocks_strps_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_section_section_background_image_idx" ON "pages_blocks_strps_form_block" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_form_idx" ON "pages_blocks_strps_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_stats_stats_order_idx" ON "pages_blocks_strps_stats_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_stats_stats_parent_id_idx" ON "pages_blocks_strps_stats_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_stats_order_idx" ON "pages_blocks_strps_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_stats_parent_id_idx" ON "pages_blocks_strps_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_stats_path_idx" ON "pages_blocks_strps_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_services_services_order_idx" ON "pages_blocks_strps_services_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_services_services_parent_id_idx" ON "pages_blocks_strps_services_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_services_order_idx" ON "pages_blocks_strps_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_services_parent_id_idx" ON "pages_blocks_strps_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_services_path_idx" ON "pages_blocks_strps_services" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_clients_clients_order_idx" ON "pages_blocks_strps_clients_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_clients_clients_parent_id_idx" ON "pages_blocks_strps_clients_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_clients_clients_logo_idx" ON "pages_blocks_strps_clients_clients" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_clients_clients_testimonial_testimonial_author_image_idx" ON "pages_blocks_strps_clients_clients" USING btree ("testimonial_author_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_clients_order_idx" ON "pages_blocks_strps_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_clients_parent_id_idx" ON "pages_blocks_strps_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_clients_path_idx" ON "pages_blocks_strps_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_filters_order_idx" ON "pages_blocks_strps_careers_filters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_filters_parent_id_idx" ON "pages_blocks_strps_careers_filters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_categories_order_idx" ON "pages_blocks_strps_careers_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_categories_parent_id_idx" ON "pages_blocks_strps_careers_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_categories_icon_idx" ON "pages_blocks_strps_careers_categories" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_benefits_order_idx" ON "pages_blocks_strps_careers_benefits" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_benefits_parent_id_idx" ON "pages_blocks_strps_careers_benefits" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_benefits_icon_idx" ON "pages_blocks_strps_careers_benefits" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_application_form_fields_options_order_idx" ON "pages_blocks_strps_careers_application_form_fields_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_application_form_fields_options_parent_id_idx" ON "pages_blocks_strps_careers_application_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_application_form_fields_order_idx" ON "pages_blocks_strps_careers_application_form_fields" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_application_form_fields_parent_id_idx" ON "pages_blocks_strps_careers_application_form_fields" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_social_links_order_idx" ON "pages_blocks_strps_careers_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_social_links_parent_id_idx" ON "pages_blocks_strps_careers_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_order_idx" ON "pages_blocks_strps_careers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_parent_id_idx" ON "pages_blocks_strps_careers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_careers_path_idx" ON "pages_blocks_strps_careers" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_blog_tags_id_idx" ON "pages_rels" USING btree ("blog_tags_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_section_section_background_image_idx" ON "_pages_v_blocks_archive" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_links_order_idx" ON "_pages_v_blocks_strps_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_links_parent_id_idx" ON "_pages_v_blocks_strps_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_order_idx" ON "_pages_v_blocks_strps_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_parent_id_idx" ON "_pages_v_blocks_strps_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_path_idx" ON "_pages_v_blocks_strps_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_section_section_background_image_idx" ON "_pages_v_blocks_strps_hero" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_order_idx" ON "_pages_v_blocks_strps_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_parent_id_idx" ON "_pages_v_blocks_strps_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_path_idx" ON "_pages_v_blocks_strps_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_image_idx" ON "_pages_v_blocks_strps_about" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_section_section_background_image_idx" ON "_pages_v_blocks_strps_about" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_order_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_parent_id_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_path_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_section_section_background_image_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_media_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_story_blocks_order_idx" ON "_pages_v_blocks_strps_about_story_blocks_story_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_story_blocks_parent_id_idx" ON "_pages_v_blocks_strps_about_story_blocks_story_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_order_idx" ON "_pages_v_blocks_strps_about_story_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_parent_id_idx" ON "_pages_v_blocks_strps_about_story_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_path_idx" ON "_pages_v_blocks_strps_about_story_blocks" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_section_section_background_image_idx" ON "_pages_v_blocks_strps_about_story_blocks" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_skills_order_idx" ON "_pages_v_blocks_strps_skills_skill_group_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_skills_parent_id_idx" ON "_pages_v_blocks_strps_skills_skill_group_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_order_idx" ON "_pages_v_blocks_strps_skills_skill_group" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_skill_group_parent_id_idx" ON "_pages_v_blocks_strps_skills_skill_group" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_order_idx" ON "_pages_v_blocks_strps_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_parent_id_idx" ON "_pages_v_blocks_strps_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_path_idx" ON "_pages_v_blocks_strps_skills" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_section_section_background_image_idx" ON "_pages_v_blocks_strps_skills" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_contact_order_idx" ON "_pages_v_blocks_strps_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_contact_parent_id_idx" ON "_pages_v_blocks_strps_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_contact_path_idx" ON "_pages_v_blocks_strps_contact" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_contact_section_section_background_image_idx" ON "_pages_v_blocks_strps_contact" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_projects_archive_order_idx" ON "_pages_v_blocks_projects_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_projects_archive_parent_id_idx" ON "_pages_v_blocks_projects_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_projects_archive_path_idx" ON "_pages_v_blocks_projects_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_projects_archive_section_section_background_image_idx" ON "_pages_v_blocks_projects_archive" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_values_order_idx" ON "_pages_v_blocks_strps_about_us_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_values_parent_id_idx" ON "_pages_v_blocks_strps_about_us_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_timeline_order_idx" ON "_pages_v_blocks_strps_about_us_timeline" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_timeline_parent_id_idx" ON "_pages_v_blocks_strps_about_us_timeline" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_leadership_order_idx" ON "_pages_v_blocks_strps_about_us_leadership" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_leadership_parent_id_idx" ON "_pages_v_blocks_strps_about_us_leadership" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_leadership_image_idx" ON "_pages_v_blocks_strps_about_us_leadership" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_order_idx" ON "_pages_v_blocks_strps_about_us" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_parent_id_idx" ON "_pages_v_blocks_strps_about_us" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_path_idx" ON "_pages_v_blocks_strps_about_us" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_us_section_section_background_image_idx" ON "_pages_v_blocks_strps_about_us" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_order_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_parent_id_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_path_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_section_section_background_image_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_form_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_stats_stats_order_idx" ON "_pages_v_blocks_strps_stats_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_stats_stats_parent_id_idx" ON "_pages_v_blocks_strps_stats_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_stats_order_idx" ON "_pages_v_blocks_strps_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_stats_parent_id_idx" ON "_pages_v_blocks_strps_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_stats_path_idx" ON "_pages_v_blocks_strps_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_services_services_order_idx" ON "_pages_v_blocks_strps_services_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_services_services_parent_id_idx" ON "_pages_v_blocks_strps_services_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_services_order_idx" ON "_pages_v_blocks_strps_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_services_parent_id_idx" ON "_pages_v_blocks_strps_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_services_path_idx" ON "_pages_v_blocks_strps_services" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_clients_clients_order_idx" ON "_pages_v_blocks_strps_clients_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_clients_clients_parent_id_idx" ON "_pages_v_blocks_strps_clients_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_clients_clients_logo_idx" ON "_pages_v_blocks_strps_clients_clients" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_clients_clients_testimonial_testimonial_author_image_idx" ON "_pages_v_blocks_strps_clients_clients" USING btree ("testimonial_author_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_clients_order_idx" ON "_pages_v_blocks_strps_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_clients_parent_id_idx" ON "_pages_v_blocks_strps_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_clients_path_idx" ON "_pages_v_blocks_strps_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_filters_order_idx" ON "_pages_v_blocks_strps_careers_filters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_filters_parent_id_idx" ON "_pages_v_blocks_strps_careers_filters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_categories_order_idx" ON "_pages_v_blocks_strps_careers_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_categories_parent_id_idx" ON "_pages_v_blocks_strps_careers_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_categories_icon_idx" ON "_pages_v_blocks_strps_careers_categories" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_benefits_order_idx" ON "_pages_v_blocks_strps_careers_benefits" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_benefits_parent_id_idx" ON "_pages_v_blocks_strps_careers_benefits" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_benefits_icon_idx" ON "_pages_v_blocks_strps_careers_benefits" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_application_form_fields_options_order_idx" ON "_pages_v_blocks_strps_careers_application_form_fields_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_application_form_fields_options_parent_id_idx" ON "_pages_v_blocks_strps_careers_application_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_application_form_fields_order_idx" ON "_pages_v_blocks_strps_careers_application_form_fields" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_application_form_fields_parent_id_idx" ON "_pages_v_blocks_strps_careers_application_form_fields" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_social_links_order_idx" ON "_pages_v_blocks_strps_careers_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_social_links_parent_id_idx" ON "_pages_v_blocks_strps_careers_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_order_idx" ON "_pages_v_blocks_strps_careers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_parent_id_idx" ON "_pages_v_blocks_strps_careers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_careers_path_idx" ON "_pages_v_blocks_strps_careers" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_blog_tags_id_idx" ON "_pages_v_rels" USING btree ("blog_tags_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_blog_tags_id_idx" ON "posts_rels" USING btree ("blog_tags_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_blog_tags_id_idx" ON "_posts_v_rels" USING btree ("blog_tags_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "projects_hero_image_idx" ON "projects" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "projects_meta_meta_image_idx" ON "projects_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_hero_image_idx" ON "_projects_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "project_tags_breadcrumbs_order_idx" ON "project_tags_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_tags_breadcrumbs_parent_id_idx" ON "project_tags_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_tags_breadcrumbs_locale_idx" ON "project_tags_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "project_tags_breadcrumbs_doc_idx" ON "project_tags_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "project_tags_slug_idx" ON "project_tags" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "project_tags_parent_idx" ON "project_tags" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "project_tags_updated_at_idx" ON "project_tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "project_tags_created_at_idx" ON "project_tags" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blog_tags_breadcrumbs_order_idx" ON "blog_tags_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_tags_breadcrumbs_parent_id_idx" ON "blog_tags_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_tags_breadcrumbs_locale_idx" ON "blog_tags_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "blog_tags_breadcrumbs_doc_idx" ON "blog_tags_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "blog_tags_slug_idx" ON "blog_tags" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blog_tags_parent_idx" ON "blog_tags" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blog_tags_updated_at_idx" ON "blog_tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_tags_created_at_idx" ON "blog_tags" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX IF NOT EXISTS "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_project_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("project_tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "blog_page_rels_order_idx" ON "blog_page_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blog_page_rels_parent_idx" ON "blog_page_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_rels_path_idx" ON "blog_page_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blog_page_rels_posts_id_idx" ON "blog_page_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "projects_page_rels_order_idx" ON "projects_page_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "projects_page_rels_parent_idx" ON "projects_page_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "projects_page_rels_path_idx" ON "projects_page_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "projects_page_rels_projects_id_idx" ON "projects_page_rels" USING btree ("projects_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_strps_hero_links" CASCADE;
  DROP TABLE "pages_blocks_strps_hero" CASCADE;
  DROP TABLE "pages_blocks_strps_about" CASCADE;
  DROP TABLE "pages_blocks_strps_about_adjacent" CASCADE;
  DROP TABLE "pages_blocks_strps_about_story_blocks_story_blocks" CASCADE;
  DROP TABLE "pages_blocks_strps_about_story_blocks" CASCADE;
  DROP TABLE "pages_blocks_strps_skills_skill_group_skills" CASCADE;
  DROP TABLE "pages_blocks_strps_skills_skill_group" CASCADE;
  DROP TABLE "pages_blocks_strps_skills" CASCADE;
  DROP TABLE "pages_blocks_strps_contact" CASCADE;
  DROP TABLE "pages_blocks_projects_archive" CASCADE;
  DROP TABLE "pages_blocks_strps_about_us_values" CASCADE;
  DROP TABLE "pages_blocks_strps_about_us_timeline" CASCADE;
  DROP TABLE "pages_blocks_strps_about_us_leadership" CASCADE;
  DROP TABLE "pages_blocks_strps_about_us" CASCADE;
  DROP TABLE "pages_blocks_strps_form_block" CASCADE;
  DROP TABLE "pages_blocks_strps_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_strps_stats" CASCADE;
  DROP TABLE "pages_blocks_strps_services_services" CASCADE;
  DROP TABLE "pages_blocks_strps_services" CASCADE;
  DROP TABLE "pages_blocks_strps_clients_clients" CASCADE;
  DROP TABLE "pages_blocks_strps_clients" CASCADE;
  DROP TABLE "pages_blocks_strps_careers_filters" CASCADE;
  DROP TABLE "pages_blocks_strps_careers_categories" CASCADE;
  DROP TABLE "pages_blocks_strps_careers_benefits" CASCADE;
  DROP TABLE "pages_blocks_strps_careers_application_form_fields_options" CASCADE;
  DROP TABLE "pages_blocks_strps_careers_application_form_fields" CASCADE;
  DROP TABLE "pages_blocks_strps_careers_social_links" CASCADE;
  DROP TABLE "pages_blocks_strps_careers" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_adjacent" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_story_blocks_story_blocks" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_story_blocks" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_skills_skill_group_skills" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_skills_skill_group" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_skills" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_us_values" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_us_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_us_leadership" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_us" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_services_services" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_services" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_clients_clients" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_clients" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_careers_filters" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_careers_categories" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_careers_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_careers_application_form_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_careers_application_form_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_careers_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_careers" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "project_tags_breadcrumbs" CASCADE;
  DROP TABLE "project_tags" CASCADE;
  DROP TABLE "blog_tags_breadcrumbs" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "copyright" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "blog_page_rels" CASCADE;
  DROP TABLE "projects_page" CASCADE;
  DROP TABLE "projects_page_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."theme";
  DROP TYPE "public"."section_background";
  DROP TYPE "public"."enum_pages_blocks_strps_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_strps_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_strps_about_link_type";
  DROP TYPE "public"."enum_pages_blocks_strps_about_link_appearance";
  DROP TYPE "public"."lucideIcon";
  DROP TYPE "public"."enum_pages_blocks_projects_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_projects_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_strps_form_block_intro_type";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_stats_color";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_layout";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_columns";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_animation_easing";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_style_variant";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_style_text_align";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_style_value_size";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_cta_style";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_container_max_width";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_container_padding_top";
  DROP TYPE "public"."enum_pages_blocks_strps_stats_container_padding_bottom";
  DROP TYPE "public"."enum_pages_blocks_strps_services_services_link_type";
  DROP TYPE "public"."5922cf090345ef402d856d9ae59457dcLinkAppearances";
  DROP TYPE "public"."enum_pages_blocks_strps_services_layout";
  DROP TYPE "public"."enum_pages_blocks_strps_clients_display_type";
  DROP TYPE "public"."enum_pages_blocks_strps_clients_max_logos_per_row";
  DROP TYPE "public"."enum_pages_blocks_strps_clients_logo_background";
  DROP TYPE "public"."enum_pages_blocks_strps_clients_testimonial_layout";
  DROP TYPE "public"."enum_pages_blocks_strps_careers_filters_type";
  DROP TYPE "public"."enum_pages_blocks_strps_careers_application_form_fields_type";
  DROP TYPE "public"."enum_pages_blocks_strps_careers_social_links_platform";
  DROP TYPE "public"."enum_pages_blocks_strps_careers_layout";
  DROP TYPE "public"."enum_pages_blocks_strps_careers_columns";
  DROP TYPE "public"."enum_pages_blocks_strps_careers_default_filters_job_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_strps_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_strps_about_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_about_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_projects_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_projects_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_strps_form_block_intro_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_stats_color";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_layout";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_columns";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_animation_easing";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_style_variant";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_style_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_style_value_size";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_cta_style";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_container_max_width";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_container_padding_top";
  DROP TYPE "public"."enum__pages_v_blocks_strps_stats_container_padding_bottom";
  DROP TYPE "public"."enum__pages_v_blocks_strps_services_services_link_type";
  DROP TYPE "public"."d763300aca11ab86b0d4a59344c843ccLinkAppearances";
  DROP TYPE "public"."enum__pages_v_blocks_strps_services_layout";
  DROP TYPE "public"."enum__pages_v_blocks_strps_clients_display_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_clients_max_logos_per_row";
  DROP TYPE "public"."enum__pages_v_blocks_strps_clients_logo_background";
  DROP TYPE "public"."enum__pages_v_blocks_strps_clients_testimonial_layout";
  DROP TYPE "public"."enum__pages_v_blocks_strps_careers_filters_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_careers_application_form_fields_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_careers_social_links_platform";
  DROP TYPE "public"."enum__pages_v_blocks_strps_careers_layout";
  DROP TYPE "public"."enum__pages_v_blocks_strps_careers_columns";
  DROP TYPE "public"."enum__pages_v_blocks_strps_careers_default_filters_job_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";`)
}
