import * as migration_20260806_203304 from './20260806_203304';
import * as migration_20260903_170842_add_page_services_process from './20260903_170842_add_page_services_process';
import * as migration_20260910_012256_add_docs from './20260910_012256_add_docs';

export const migrations = [
  {
    up: migration_20260806_203304.up,
    down: migration_20260806_203304.down,
    name: '20260806_203304',
  },
  {
    up: migration_20260903_170842_add_page_services_process.up,
    down: migration_20260903_170842_add_page_services_process.down,
    name: '20260903_170842_add_page_services_process',
  },
  {
    up: migration_20260910_012256_add_docs.up,
    down: migration_20260910_012256_add_docs.down,
    name: '20260910_012256_add_docs'
  },
];
