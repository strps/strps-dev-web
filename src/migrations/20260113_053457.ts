import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v_version_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-01-13T05:34:57.030Z';
  ALTER TABLE "pages_blocks_strps_skills_skill_group" ADD COLUMN "icon" varchar;
  ALTER TABLE "_pages_v_blocks_strps_skills_skill_group" ADD COLUMN "icon" varchar;
  ALTER TABLE "projects" ADD COLUMN "links_github" varchar;
  ALTER TABLE "projects" ADD COLUMN "links_live_site" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_links_github" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_links_live_site" varchar;
  DO $$ BEGIN
   ALTER TABLE "projects_tech_stack" ADD CONSTRAINT "projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_version_tech_stack" ADD CONSTRAINT "_projects_v_version_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "projects_tech_stack_order_idx" ON "projects_tech_stack" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_tech_stack_parent_id_idx" ON "projects_tech_stack" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_tech_stack_order_idx" ON "_projects_v_version_tech_stack" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_tech_stack_parent_id_idx" ON "_projects_v_version_tech_stack" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_tech_stack" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "projects_tech_stack" CASCADE;
  DROP TABLE "_projects_v_version_tech_stack" CASCADE;
  ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-01-13T05:32:08.537Z';
  ALTER TABLE "pages_blocks_strps_skills_skill_group" DROP COLUMN IF EXISTS "icon";
  ALTER TABLE "_pages_v_blocks_strps_skills_skill_group" DROP COLUMN IF EXISTS "icon";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "links_github";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "links_live_site";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_links_github";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_links_live_site";`)
}
