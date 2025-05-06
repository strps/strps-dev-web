import * as migration_20250505_194118 from './20250505_194118';

export const migrations = [
  {
    up: migration_20250505_194118.up,
    down: migration_20250505_194118.down,
    name: '20250505_194118'
  },
];
