import type { Dataset, Format } from "@piveau/sdk-core";

export function getOdsFormats(dataset: Dataset) {
  const distributions = (dataset?.distributions ?? [])

  return distributions.reduce((acc, distribution) => {
    const distFormat = distribution.format;
    if (distFormat && distFormat.id && distFormat.label && distFormat.resource) {
      if (acc.some(item => item.id === distFormat.id)) {
        return acc;
      }
      acc.push({
        label: distFormat.label,
        resource: distFormat.resource,
        id: distFormat.id
      });
    }
    return acc;
  }, [] as Format[]);
}


