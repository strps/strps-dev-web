import * as migration_20260806_203304 from './20260806_203304';
import * as migration_20260903_170842_add_page_services_process from './20260903_170842_add_page_services_process';

export const migrations = [
  {
    up: migration_20260806_203304.up,
    down: migration_20260806_203304.down,
    name: '20260806_203304',
  },
  {
    up: migration_20260903_170842_add_page_services_process.up,
    down: migration_20260903_170842_add_page_services_process.down,
    name: '20260903_170842_add_page_services_process'
  },
];
