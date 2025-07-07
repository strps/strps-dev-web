import * as migration_20250626_012947 from './20250626_012947';
import * as migration_20250707_220915 from './20250707_220915';

export const migrations = [
  {
    up: migration_20250626_012947.up,
    down: migration_20250626_012947.down,
    name: '20250626_012947',
  },
  {
    up: migration_20250707_220915.up,
    down: migration_20250707_220915.down,
    name: '20250707_220915'
  },
];
