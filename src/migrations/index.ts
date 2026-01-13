import * as migration_20260113_053208 from './20260113_053208';
import * as migration_20260113_053457 from './20260113_053457';

export const migrations = [
  {
    up: migration_20260113_053208.up,
    down: migration_20260113_053208.down,
    name: '20260113_053208',
  },
  {
    up: migration_20260113_053457.up,
    down: migration_20260113_053457.down,
    name: '20260113_053457'
  },
];
