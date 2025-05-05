import * as migration_20250505_033943 from './20250505_033943';

export const migrations = [
  {
    up: migration_20250505_033943.up,
    down: migration_20250505_033943.down,
    name: '20250505_033943'
  },
];
