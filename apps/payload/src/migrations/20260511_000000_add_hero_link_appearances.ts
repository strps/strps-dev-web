import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_pages_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'send';
    ALTER TYPE "public"."enum_pages_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'github';
    ALTER TYPE "public"."enum_pages_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'linkedin';
    ALTER TYPE "public"."enum__pages_v_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'send';
    ALTER TYPE "public"."enum__pages_v_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'github';
    ALTER TYPE "public"."enum__pages_v_blocks_page_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'linkedin';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // PostgreSQL does not support removing enum values without recreating the type.
  // Skipping rollback to avoid data loss; remove values manually if needed.
}
