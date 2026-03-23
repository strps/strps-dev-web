import * as migration_20260323_141610_first_migration from './20260323_141610_first_migration';

export const migrations = [
  {
    up: migration_20260323_141610_first_migration.up,
    down: migration_20260323_141610_first_migration.down,
    name: '20260323_141610_first_migration'
  },
];
