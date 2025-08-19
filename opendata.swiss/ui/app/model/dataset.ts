import type { dcatApDataset } from '@piveau/sdk-vue'
import type { getKeywords } from '~/piveau/get-keywords';
import type { getOdsFormats } from '~/piveau/get-ods-formats';

export type Dataset = ReturnType<ReturnType<typeof dcatApDataset>['setup']> & {
  getOdsFormats: ReturnType<typeof getOdsFormats>;
  getKeywords: ReturnType<typeof getKeywords>;
};
