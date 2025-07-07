import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2025-07-07T22:09:15.378Z';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "copyright" ALTER COLUMN "start_date" SET DEFAULT '2025-06-26T01:29:46.065Z';`)
}
