import * as migration_20250505_194118 from './20250505_194118';
import * as migration_20250509_052715 from './20250509_052715';
import * as migration_20250509_214530 from './20250509_214530';
import * as migration_20250519_020417 from './20250519_020417';

export const migrations = [
  {
    up: migration_20250505_194118.up,
    down: migration_20250505_194118.down,
    name: '20250505_194118',
  },
  {
    up: migration_20250509_052715.up,
    down: migration_20250509_052715.down,
    name: '20250509_052715',
  },
  {
    up: migration_20250509_214530.up,
    down: migration_20250509_214530.down,
    name: '20250509_214530',
  },
  {
    up: migration_20250519_020417.up,
    down: migration_20250519_020417.down,
    name: '20250519_020417'
  },
];
