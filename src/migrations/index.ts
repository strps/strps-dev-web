import * as migration_20250311_214555_initial from './20250311_214555_initial';
import * as migration_20250430_221106 from './20250430_221106';

export const migrations = [
  {
    up: migration_20250311_214555_initial.up,
    down: migration_20250311_214555_initial.down,
    name: '20250311_214555_initial',
  },
  {
    up: migration_20250430_221106.up,
    down: migration_20250430_221106.down,
    name: '20250430_221106'
  },
];
