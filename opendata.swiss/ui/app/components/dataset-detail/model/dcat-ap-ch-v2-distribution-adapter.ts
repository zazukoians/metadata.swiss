import type { LinkedDataFormats } from '@piveau/sdk-vue';
import type { Dataset } from '../../../model/dataset'
import type { DcatApChV2DatasetAdapter } from './dcat-ap-ch-v2-dataset-adapter';


type EnhancedDistribution = Dataset['getDistributions'][number]


export class DcatApChV2DistributionAdapter implements EnhancedDistribution {
  #distribution: EnhancedDistribution | undefined;
  #dataset: DcatApChV2DatasetAdapter;

  constructor(d: EnhancedDistribution, dataset: DcatApChV2DatasetAdapter) {
    this.#distribution = d;
    this.#dataset = dataset;
  }

  /**
   * Get the dataset this distribution belongs to
   */
  get dataset() {
    return this.#dataset;
  }

  /**
   * Get the title of the distribution.
   *
   * It return the title of the distribution if available, otherwise it returns the title of the dataset. The title on a distribution is not mandatory if
   * the distribution contains the whole dataset.
   * Language handling is done by peiveau.
   *
   * From dcat-ap-ch:
   * Property	Title
   * Requirement level	Recommended
   * Cardinality	0..n
   * URI	dct:title
   * Range	rdfs:Literal
   * Usage Note
   * - This property contains a name given to the Distribution. This property can be repeated for parallel language versions of the description (see 2.3 Multilingualism).
   * - The title MUST be given if the distribution contains only part of the data offered by the Dataset
   * - The title can be given in several languages. In multilingual data portals, the title in the language selected by a user will usually be shown as title for the distribution.
   */
  get title() {
    return this.#distribution?.title || this.#dataset.title;
  }

  /**
   * Get the description of the distribution.
   *
   * It returns the description of the distribution if available, otherwise it returns an empty string.
   * Language handling is done by peiveau.
   *
   * Property	description
   * Requirement level	Recommended
   * Cardinality	0..n
   * URI	dct:description
   * Range	rdfs:Literal
   * Usage Note
   * - This property contains a free-text account of the Distribution.
   * - The description MUST be provided if the distribution contains only part of the data offered by the Dataset.
   * - This property can be repeated for parallel language versions of the description (see 2.3 Multilingualism).
   *
   */
  get description() {
    return this.#distribution?.description ?? '';
  }

  /**
   * Get the formattedByteSize size of the distribution if available
   *
   * from dcat-ap-ch:
   * Property	byte size
   * Requirement level	Optional
   * Cardinality	0..1
   * URI	dcat:byteSize
   * Range	rdfs:Literal (typed as as xsd:decimal).
   * Usage Note
   * This property contains the size of a Distribution in bytes. If the precise size is not known, an approximate size can be indicated.
   */
  get formattedByteSize() {
    const byteSizeNode = this.#distribution?.getPropertyTable.find(node => node.id === 'byteSize');

    if (!byteSizeNode || !byteSizeNode.data?.length) {
      return '';
    }

    const byteSizeValue = byteSizeNode.data[0]?.data;

    if (!byteSizeValue || typeof byteSizeValue !== 'string') {
      return '';
    }

    // Try to parse the byte size as a number.
    // Piveau returns it as a string with dots as thousands separators which is not valid for Number()
    const byteSizeNumber = Number(byteSizeValue.replace(/\./g, '')); // Remove dots for thousands separators

    if (isNaN(byteSizeNumber)) {
      return byteSizeValue; // Return the raw value if parsing fails
    }

    if (byteSizeNumber === 0) {
      return '0 B';
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = byteSizeNumber;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size % 1 === 0 ? size : size.toFixed(2)} ${units[unitIndex]}`;
  }



  get getPropertyTable() {
    return this.#distribution?.getPropertyTable || [];
  }


  get downloadUrls() {
    return this.#distribution?.downloadUrls || [];
  }

  get accessUrls() {
    return this.#distribution?.accessUrls || [];
  }

  get format() {
    return this.#distribution?.format ?? '';
  }

  get license() {
    return this.#distribution?.license;
  }

  get issued() {
    return this.#distribution?.issued || '';
  }

  get modified() {
    return this.#distribution?.modified || '';
  }

  get id() {
    return this.#distribution?.id || '';
  }

  get created() {
    return this.#distribution?.created;
  }

  get languages() {
    return this.#distribution?.languages || [];
  }

  get getLinkedData(): Record<LinkedDataFormats, string> {
    return this.#distribution?.getLinkedData ?? {
      rdf: '',
      ttl: '',
      n3: '',
      nt: '',
      jsonld: ''
    };
  }
}
