import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_docs_doc_type" AS ENUM('privacy', 'terms', 'cookies', 'other');
  CREATE TYPE "public"."enum_docs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__docs_v_version_doc_type" AS ENUM('privacy', 'terms', 'cookies', 'other');
  CREATE TYPE "public"."enum__docs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__docs_v_published_locale" AS ENUM('en', 'es');
  CREATE TABLE IF NOT EXISTS "docs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_type" "enum_docs_doc_type" DEFAULT 'other',
  	"effective_date" timestamp(3) with time zone,
  	"version" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_docs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "docs_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_docs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_doc_type" "enum__docs_v_version_doc_type" DEFAULT 'other',
  	"version_effective_date" timestamp(3) with time zone,
  	"version_version" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__docs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__docs_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_docs_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-09-10T01:22:56.032Z';
  ALTER TABLE "pages_rels" ADD COLUMN "docs_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "docs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "docs_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "docs_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "docs_id" integer;
  DO $$ BEGIN
   ALTER TABLE "docs_locales" ADD CONSTRAINT "docs_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "docs_locales" ADD CONSTRAINT "docs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_docs_v" ADD CONSTRAINT "_docs_v_parent_id_docs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."docs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_docs_v_locales" ADD CONSTRAINT "_docs_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_docs_v_locales" ADD CONSTRAINT "_docs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "docs_slug_idx" ON "docs" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "docs_updated_at_idx" ON "docs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "docs_created_at_idx" ON "docs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "docs__status_idx" ON "docs" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "docs_meta_meta_image_idx" ON "docs_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "docs_locales_locale_parent_id_unique" ON "docs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_docs_v_parent_idx" ON "_docs_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_docs_v_version_version_slug_idx" ON "_docs_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_docs_v_version_version_updated_at_idx" ON "_docs_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_docs_v_version_version_created_at_idx" ON "_docs_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_docs_v_version_version__status_idx" ON "_docs_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_docs_v_created_at_idx" ON "_docs_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_docs_v_updated_at_idx" ON "_docs_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_docs_v_snapshot_idx" ON "_docs_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_docs_v_published_locale_idx" ON "_docs_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_docs_v_latest_idx" ON "_docs_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_docs_v_autosave_idx" ON "_docs_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_docs_v_version_meta_version_meta_image_idx" ON "_docs_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_docs_v_locales_locale_parent_id_unique" ON "_docs_v_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_docs_fk" FOREIGN KEY ("docs_id") REFERENCES "public"."docs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_docs_fk" FOREIGN KEY ("docs_id") REFERENCES "public"."docs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_docs_fk" FOREIGN KEY ("docs_id") REFERENCES "public"."docs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_docs_fk" FOREIGN KEY ("docs_id") REFERENCES "public"."docs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_docs_fk" FOREIGN KEY ("docs_id") REFERENCES "public"."docs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_docs_id_idx" ON "pages_rels" USING btree ("docs_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_docs_id_idx" ON "_pages_v_rels" USING btree ("docs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_docs_id_idx" ON "payload_locked_documents_rels" USING btree ("docs_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_docs_id_idx" ON "footer_rels" USING btree ("docs_id");
  CREATE INDEX IF NOT EXISTS "header_rels_docs_id_idx" ON "header_rels" USING btree ("docs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "docs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "docs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_docs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_docs_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "docs" CASCADE;
  DROP TABLE "docs_locales" CASCADE;
  DROP TABLE "_docs_v" CASCADE;
  DROP TABLE "_docs_v_locales" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_docs_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_docs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_docs_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_docs_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_docs_fk";
  
  DROP INDEX IF EXISTS "pages_rels_docs_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_docs_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_docs_id_idx";
  DROP INDEX IF EXISTS "footer_rels_docs_id_idx";
  DROP INDEX IF EXISTS "header_rels_docs_id_idx";
  ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-09-03T17:08:42.366Z';
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "docs_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "docs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "docs_id";
  ALTER TABLE "footer_rels" DROP COLUMN IF EXISTS "docs_id";
  ALTER TABLE "header_rels" DROP COLUMN IF EXISTS "docs_id";
  DROP TYPE "public"."enum_docs_doc_type";
  DROP TYPE "public"."enum_docs_status";
  DROP TYPE "public"."enum__docs_v_version_doc_type";
  DROP TYPE "public"."enum__docs_v_version_status";
  DROP TYPE "public"."enum__docs_v_published_locale";`)
}
