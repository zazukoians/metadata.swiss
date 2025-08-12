import type { LinkedDataFormats, PropertyTableEntryNode } from "@piveau/sdk-vue";

export interface Dataset {
  getId: string;
  getTitle: string | undefined;
  getDescription: string | undefined;
  getCategories: {
    label: Record<string, string>;
    resource: string;
    id: string;
  }[];
  getPublisher: {
    type?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    homepage?: string | null | undefined;
  } | null | undefined;
  getFormats: string[];
  getLicenses: string[];
  getIssued: string | undefined;
  getCreated: string | undefined;
  getModified: string | undefined;
  getLinkedData: Record<LinkedDataFormats, string>;
  getDistributions: {
    /**
     * The ID of the distribution
     */
    id: string;
    /** The localized title of the distribution */
    title: string | undefined;
    /**
     * The localized description of the distribution
     */
    description: string | undefined;
    /**
     * The format of the distribution
     * Fallback order: label, id, resource
     */
    format: string;
    /**
     * The modified date of the distribution
     */
    modified: string | undefined;
    /**
     * The license of the distribution
     */
    license: {
      label?: string | null | undefined;
      resource?: string | null | undefined;
      id?: string | null | undefined;
      description?: string | null | undefined;
    } | undefined;
    created: string | undefined;
    issued: string | undefined;
    languages: string[];
    accessUrls: string[];
    downloadUrls: string[];
    getLinkedData: Record<LinkedDataFormats, string>;
    /**
     * Opinionated recursive property table
     */
    getPropertyTable: PropertyTableEntryNode[];
  }[];
  getPropertyTable: PropertyTableEntryNode[];
  getPropertyTable2: PropertyTableEntryNode[];
}
