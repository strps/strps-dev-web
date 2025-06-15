import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."section_theme" AS ENUM('auto', 'light', 'dark', 'inverted');
  CREATE TYPE "public"."section_background" AS ENUM('none', 'svgCircles', 'image');
  CREATE TYPE "public"."lucideIcon" AS ENUM('none', 'code', 'circuit-board', 'palette', 'monitor', 'briefcase');
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
  	"section_class_name" varchar,
  	"section_background_container" boolean,
  	"section_theme" "section_theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"heading" varchar,
  	"mission" jsonb,
  	"vision" jsonb,
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
  	"section_class_name" varchar,
  	"section_background_container" boolean,
  	"section_theme" "section_theme" DEFAULT 'auto',
  	"section_background" "section_background" DEFAULT 'none',
  	"section_background_image_id" integer,
  	"heading" varchar,
  	"mission" jsonb,
  	"vision" jsonb,
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
  
  CREATE TABLE IF NOT EXISTS "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_hero_media_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_version_hero_media_idx";
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "pages_blocks_strps_about" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_strps_about" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "pages_blocks_strps_about" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "pages_blocks_strps_about" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_strps_about" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_strps_about" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "pages_blocks_strps_about_adjacent" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_strps_about_adjacent" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "pages_blocks_strps_about_adjacent" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "pages_blocks_strps_about_adjacent" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_strps_about_adjacent" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_strps_about_adjacent" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "pages_blocks_strps_about_story_blocks_story_blocks" ADD COLUMN "lucide_icon" "lucideIcon";
  ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "pages_blocks_strps_skills" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_strps_skills" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "pages_blocks_strps_skills" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "pages_blocks_strps_skills" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_strps_skills" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_strps_skills" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "pages_blocks_strps_contact" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_strps_contact" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "pages_blocks_strps_contact" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "pages_blocks_strps_contact" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_strps_contact" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_strps_contact" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "pages_blocks_projects_archive" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_projects_archive" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "pages_blocks_projects_archive" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "pages_blocks_projects_archive" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_projects_archive" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_projects_archive" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_strps_about" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_about" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "_pages_v_blocks_strps_about" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_about" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_strps_about" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_strps_about" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks_story_blocks" ADD COLUMN "lucide_icon" "lucideIcon";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_strps_skills" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_skills" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "_pages_v_blocks_strps_skills" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_skills" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_strps_skills" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_strps_skills" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_strps_contact" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_contact" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "_pages_v_blocks_strps_contact" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "_pages_v_blocks_strps_contact" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_strps_contact" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_strps_contact" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_projects_archive" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_projects_archive" ADD COLUMN "section_class_name" varchar;
  ALTER TABLE "_pages_v_blocks_projects_archive" ADD COLUMN "section_background_container" boolean;
  ALTER TABLE "_pages_v_blocks_projects_archive" ADD COLUMN "section_theme" "section_theme" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_projects_archive" ADD COLUMN "section_background" "section_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_projects_archive" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tags_id" integer;
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
  CREATE INDEX IF NOT EXISTS "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_hero" ADD CONSTRAINT "pages_blocks_strps_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about" ADD CONSTRAINT "pages_blocks_strps_about_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_adjacent" ADD CONSTRAINT "pages_blocks_strps_about_adjacent_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_about_story_blocks" ADD CONSTRAINT "pages_blocks_strps_about_story_blocks_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_skills" ADD CONSTRAINT "pages_blocks_strps_skills_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_contact" ADD CONSTRAINT "pages_blocks_strps_contact_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_projects_archive" ADD CONSTRAINT "pages_blocks_projects_archive_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_hero" ADD CONSTRAINT "_pages_v_blocks_strps_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about" ADD CONSTRAINT "_pages_v_blocks_strps_about_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_adjacent" ADD CONSTRAINT "_pages_v_blocks_strps_about_adjacent_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" ADD CONSTRAINT "_pages_v_blocks_strps_about_story_blocks_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_skills" ADD CONSTRAINT "_pages_v_blocks_strps_skills_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_contact" ADD CONSTRAINT "_pages_v_blocks_strps_contact_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_projects_archive" ADD CONSTRAINT "_pages_v_blocks_projects_archive_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_section_section_background_image_idx" ON "pages_blocks_archive" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_section_section_background_image_idx" ON "pages_blocks_strps_hero" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_section_section_background_image_idx" ON "pages_blocks_strps_about" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_adjacent_section_section_background_image_idx" ON "pages_blocks_strps_about_adjacent" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_about_story_blocks_section_section_background_image_idx" ON "pages_blocks_strps_about_story_blocks" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_skills_section_section_background_image_idx" ON "pages_blocks_strps_skills" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_contact_section_section_background_image_idx" ON "pages_blocks_strps_contact" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_projects_archive_section_section_background_image_idx" ON "pages_blocks_projects_archive" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_section_section_background_image_idx" ON "_pages_v_blocks_archive" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_section_section_background_image_idx" ON "_pages_v_blocks_strps_hero" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_section_section_background_image_idx" ON "_pages_v_blocks_strps_about" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_adjacent_section_section_background_image_idx" ON "_pages_v_blocks_strps_about_adjacent" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_about_story_blocks_section_section_background_image_idx" ON "_pages_v_blocks_strps_about_story_blocks" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_skills_section_section_background_image_idx" ON "_pages_v_blocks_strps_skills" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_contact_section_section_background_image_idx" ON "_pages_v_blocks_strps_contact" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_projects_archive_section_section_background_image_idx" ON "_pages_v_blocks_projects_archive" USING btree ("section_background_image_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  ALTER TABLE "pages_blocks_strps_about_story_blocks_story_blocks" DROP COLUMN IF EXISTS "icon";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_type";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_media_id";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks_story_blocks" DROP COLUMN IF EXISTS "icon";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_type";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_media_id";
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_strps_about_story_blocks_story_blocks_icon";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_strps_about_story_blocks_story_blocks_icon";
  DROP TYPE "public"."enum__pages_v_version_hero_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_strps_about_story_blocks_story_blocks_icon" AS ENUM('code', 'palette', 'monitor', 'circuitBoard', 'briefcase', 'none');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_about_story_blocks_story_blocks_icon" AS ENUM('code', 'palette', 'monitor', 'circuitBoard', 'briefcase', 'none');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_strps_about_us_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_about_us_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_about_us_leadership" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_about_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_clients_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_careers_filters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_careers_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_careers_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_careers_application_form_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_careers_application_form_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_careers_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_strps_careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_about_us_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_about_us_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_about_us_leadership" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_about_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_stats_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_clients_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_careers_filters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_careers_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_careers_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_careers_application_form_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_careers_application_form_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_careers_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_strps_careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tags" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_strps_about_us_values" CASCADE;
  DROP TABLE "pages_blocks_strps_about_us_timeline" CASCADE;
  DROP TABLE "pages_blocks_strps_about_us_leadership" CASCADE;
  DROP TABLE "pages_blocks_strps_about_us" CASCADE;
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
  DROP TABLE "_pages_v_blocks_strps_about_us_values" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_us_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_us_leadership" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_about_us" CASCADE;
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
  DROP TABLE "tags" CASCADE;
  ALTER TABLE "pages_blocks_archive" DROP CONSTRAINT "pages_blocks_archive_section_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_strps_hero" DROP CONSTRAINT "pages_blocks_strps_hero_section_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_strps_about" DROP CONSTRAINT "pages_blocks_strps_about_section_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_strps_about_adjacent" DROP CONSTRAINT "pages_blocks_strps_about_adjacent_section_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_strps_about_story_blocks" DROP CONSTRAINT "pages_blocks_strps_about_story_blocks_section_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_strps_skills" DROP CONSTRAINT "pages_blocks_strps_skills_section_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_strps_contact" DROP CONSTRAINT "pages_blocks_strps_contact_section_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_projects_archive" DROP CONSTRAINT "pages_blocks_projects_archive_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_archive" DROP CONSTRAINT "_pages_v_blocks_archive_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP CONSTRAINT "_pages_v_blocks_strps_hero_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_strps_about" DROP CONSTRAINT "_pages_v_blocks_strps_about_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" DROP CONSTRAINT "_pages_v_blocks_strps_about_adjacent_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" DROP CONSTRAINT "_pages_v_blocks_strps_about_story_blocks_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_strps_skills" DROP CONSTRAINT "_pages_v_blocks_strps_skills_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_strps_contact" DROP CONSTRAINT "_pages_v_blocks_strps_contact_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_projects_archive" DROP CONSTRAINT "_pages_v_blocks_projects_archive_section_background_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tags_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_archive_section_section_background_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_strps_hero_section_section_background_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_strps_about_section_section_background_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_strps_about_adjacent_section_section_background_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_strps_about_story_blocks_section_section_background_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_strps_skills_section_section_background_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_strps_contact_section_section_background_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_projects_archive_section_section_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_archive_section_section_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_strps_hero_section_section_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_strps_about_section_section_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_strps_about_adjacent_section_section_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_strps_about_story_blocks_section_section_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_strps_skills_section_section_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_strps_contact_section_section_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_projects_archive_section_section_background_image_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_tags_id_idx";
  ALTER TABLE "pages_blocks_strps_about_story_blocks_story_blocks" ADD COLUMN "icon" "enum_pages_blocks_strps_about_story_blocks_story_blocks_icon" DEFAULT 'none';
  ALTER TABLE "pages" ADD COLUMN "hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks_story_blocks" ADD COLUMN "icon" "enum__pages_v_blocks_strps_about_story_blocks_story_blocks_icon" DEFAULT 'none';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "pages_blocks_strps_about" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_strps_about" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "pages_blocks_strps_about" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "pages_blocks_strps_about" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "pages_blocks_strps_about" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "pages_blocks_strps_about" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "pages_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "pages_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "pages_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "pages_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "pages_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "pages_blocks_strps_about_story_blocks_story_blocks" DROP COLUMN IF EXISTS "lucide_icon";
  ALTER TABLE "pages_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "pages_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "pages_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "pages_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "pages_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "pages_blocks_strps_skills" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_strps_skills" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "pages_blocks_strps_skills" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "pages_blocks_strps_skills" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "pages_blocks_strps_skills" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "pages_blocks_strps_skills" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "pages_blocks_strps_contact" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_strps_contact" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "pages_blocks_strps_contact" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "pages_blocks_strps_contact" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "pages_blocks_strps_contact" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "pages_blocks_strps_contact" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "pages_blocks_projects_archive" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_projects_archive" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "pages_blocks_projects_archive" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "pages_blocks_projects_archive" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "pages_blocks_projects_archive" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "pages_blocks_projects_archive" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "_pages_v_blocks_strps_about" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_strps_about" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "_pages_v_blocks_strps_about" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "_pages_v_blocks_strps_about" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "_pages_v_blocks_strps_about" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "_pages_v_blocks_strps_about" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "_pages_v_blocks_strps_about_adjacent" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks_story_blocks" DROP COLUMN IF EXISTS "lucide_icon";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "_pages_v_blocks_strps_about_story_blocks" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "_pages_v_blocks_strps_skills" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_strps_skills" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "_pages_v_blocks_strps_skills" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "_pages_v_blocks_strps_skills" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "_pages_v_blocks_strps_skills" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "_pages_v_blocks_strps_skills" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "_pages_v_blocks_strps_contact" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_strps_contact" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "_pages_v_blocks_strps_contact" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "_pages_v_blocks_strps_contact" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "_pages_v_blocks_strps_contact" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "_pages_v_blocks_strps_contact" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "_pages_v_blocks_projects_archive" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_projects_archive" DROP COLUMN IF EXISTS "section_class_name";
  ALTER TABLE "_pages_v_blocks_projects_archive" DROP COLUMN IF EXISTS "section_background_container";
  ALTER TABLE "_pages_v_blocks_projects_archive" DROP COLUMN IF EXISTS "section_theme";
  ALTER TABLE "_pages_v_blocks_projects_archive" DROP COLUMN IF EXISTS "section_background";
  ALTER TABLE "_pages_v_blocks_projects_archive" DROP COLUMN IF EXISTS "section_background_image_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "tags_id";
  DROP TYPE "public"."section_theme";
  DROP TYPE "public"."section_background";
  DROP TYPE "public"."lucideIcon";
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
  DROP TYPE "public"."enum__pages_v_blocks_strps_careers_default_filters_job_type";`)
}
