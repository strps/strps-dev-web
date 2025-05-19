import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_projects_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_projects_archive_relation_to" AS ENUM('projects');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_archive_relation_to" AS ENUM('projects');
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
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_projects_archive" ADD CONSTRAINT "pages_blocks_projects_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_projects_archive" ADD CONSTRAINT "_pages_v_blocks_projects_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_projects_archive_order_idx" ON "pages_blocks_projects_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_projects_archive_parent_id_idx" ON "pages_blocks_projects_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_projects_archive_path_idx" ON "pages_blocks_projects_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_projects_archive_order_idx" ON "_pages_v_blocks_projects_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_projects_archive_parent_id_idx" ON "_pages_v_blocks_projects_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_projects_archive_path_idx" ON "_pages_v_blocks_projects_archive" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_projects_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_archive" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_projects_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_projects_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_projects_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_projects_archive_relation_to";`)
}
