import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_strps_hero_link_type" RENAME TO "enum_pages_blocks_strps_hero_links_link_type";
  ALTER TYPE "public"."enum_pages_blocks_strps_hero_link_appearance" RENAME TO "enum_pages_blocks_strps_hero_links_link_appearance";
  ALTER TYPE "public"."enum__pages_v_blocks_strps_hero_link_type" RENAME TO "enum__pages_v_blocks_strps_hero_links_link_type";
  ALTER TYPE "public"."enum__pages_v_blocks_strps_hero_link_appearance" RENAME TO "enum__pages_v_blocks_strps_hero_links_link_appearance";
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
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_strps_hero_links" ADD CONSTRAINT "pages_blocks_strps_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strps_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_hero_links" ADD CONSTRAINT "_pages_v_blocks_strps_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strps_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_links_order_idx" ON "pages_blocks_strps_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_hero_links_parent_id_idx" ON "pages_blocks_strps_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_links_order_idx" ON "_pages_v_blocks_strps_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_hero_links_parent_id_idx" ON "_pages_v_blocks_strps_hero_links" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_strps_hero" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_strps_hero" DROP COLUMN IF EXISTS "link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_strps_hero_links_link_type" RENAME TO "enum_pages_blocks_strps_hero_link_type";
  ALTER TYPE "public"."enum_pages_blocks_strps_hero_links_link_appearance" RENAME TO "enum_pages_blocks_strps_hero_link_appearance";
  ALTER TYPE "public"."enum__pages_v_blocks_strps_hero_links_link_type" RENAME TO "enum__pages_v_blocks_strps_hero_link_type";
  ALTER TYPE "public"."enum__pages_v_blocks_strps_hero_links_link_appearance" RENAME TO "enum__pages_v_blocks_strps_hero_link_appearance";
  DROP TABLE "pages_blocks_strps_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_hero_links" CASCADE;
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "link_type" "enum_pages_blocks_strps_hero_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_strps_hero" ADD COLUMN "link_appearance" "enum_pages_blocks_strps_hero_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "link_type" "enum__pages_v_blocks_strps_hero_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_strps_hero" ADD COLUMN "link_appearance" "enum__pages_v_blocks_strps_hero_link_appearance" DEFAULT 'default';`)
}
