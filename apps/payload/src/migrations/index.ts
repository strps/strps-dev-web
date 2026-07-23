import * as migration_20260323_141610_first_migration from './20260323_141610_first_migration';
import * as migration_20260511_000000_add_hero_link_appearances from './20260511_000000_add_hero_link_appearances';
import * as migration_20260723_171252_phase3_schema from './20260723_171252_phase3_schema';

export const migrations = [
  {
    up: migration_20260323_141610_first_migration.up,
    down: migration_20260323_141610_first_migration.down,
    name: '20260323_141610_first_migration',
  },
  {
    up: migration_20260511_000000_add_hero_link_appearances.up,
    down: migration_20260511_000000_add_hero_link_appearances.down,
    name: '20260511_000000_add_hero_link_appearances',
  },
  {
    up: migration_20260723_171252_phase3_schema.up,
    down: migration_20260723_171252_phase3_schema.down,
    name: '20260723_171252_phase3_schema',
  },
];
