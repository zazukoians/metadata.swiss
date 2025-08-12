import type { dcatApDataset } from '@piveau/sdk-vue'

export type Dataset = ReturnType<ReturnType<typeof dcatApDataset>['setup']>;
