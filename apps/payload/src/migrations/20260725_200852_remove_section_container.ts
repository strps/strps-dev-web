import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-07-25T20:08:51.726Z';
  ALTER TABLE "pages_blocks_page_hero" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_services_hero" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_services_teaser" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_about" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_skills" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_projects" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_experience" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_services" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_process" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_faq" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_contact" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_page_blog" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_hero" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_services_hero" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_services_teaser" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_about" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_skills" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_projects" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_experience" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_services" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_process" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_faq" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_contact" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_page_blog" DROP COLUMN IF EXISTS "section_container";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "section_container";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2026-07-23T17:12:52.420Z';
  ALTER TABLE "pages_blocks_page_hero" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_services_hero" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_services_teaser" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_about" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_skills" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_projects" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_lab_teaser" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_experience" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_services" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_process" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_faq" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_contact" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_page_blog" ADD COLUMN "section_container" boolean;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_services_hero" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_services_teaser" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_about" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_skills" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_projects" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_lab_teaser" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_experience" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_services" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_process" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_faq" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_contact" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_page_blog" ADD COLUMN "section_container" boolean;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "section_container" boolean;`)
}
