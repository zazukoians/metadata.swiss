

export interface TableEntry {
  id: string;
  label: string;
  help: string;
  value: [
    {
      value: string;
      href?: string;
      type: 'value' | 'href' | 'email';
    }
  ];
  nodeType: 'node' | 'value' | 'href';
}
