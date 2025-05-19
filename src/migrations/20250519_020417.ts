import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_strps_form_block_intro_type" AS ENUM('richText', 'titleAndText', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_strps_form_block_intro_type" AS ENUM('richText', 'titleAndText', 'none');
  CREATE TABLE IF NOT EXISTS "pages_blocks_strps_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"intro_type" "enum_pages_blocks_strps_form_block_intro_type" DEFAULT 'richText',
  	"intro_content" jsonb,
  	"intro_title" varchar,
  	"intro_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strps_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"intro_type" "enum__pages_v_blocks_strps_form_block_intro_type" DEFAULT 'richText',
  	"intro_content" jsonb,
  	"intro_title" varchar,
  	"intro_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "forms" ADD COLUMN "enable_recaptcha" boolean DEFAULT false;
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
   ALTER TABLE "_pages_v_blocks_strps_form_block" ADD CONSTRAINT "_pages_v_blocks_strps_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_strps_form_block" ADD CONSTRAINT "_pages_v_blocks_strps_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_order_idx" ON "pages_blocks_strps_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_parent_id_idx" ON "pages_blocks_strps_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_path_idx" ON "pages_blocks_strps_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_strps_form_block_form_idx" ON "pages_blocks_strps_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_order_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_parent_id_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_path_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strps_form_block_form_idx" ON "_pages_v_blocks_strps_form_block" USING btree ("form_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_strps_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_strps_form_block" CASCADE;
  ALTER TABLE "forms" DROP COLUMN IF EXISTS "enable_recaptcha";
  DROP TYPE "public"."enum_pages_blocks_strps_form_block_intro_type";
  DROP TYPE "public"."enum__pages_v_blocks_strps_form_block_intro_type";`)
}
