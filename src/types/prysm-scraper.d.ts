declare module '@pinkpixel/prysm-llm' {
  interface ScraperOptions {
    maxScrolls?: number;
    scrollDelay?: number;
    pages?: number;
    focused?: boolean;
    standard?: boolean;
    deep?: boolean;
    article?: boolean;
    product?: boolean;
    listing?: boolean;
    scrapeImages?: boolean;
    downloadImages?: boolean;
    maxImages?: number;
    minImageSize?: number;
    analyze?: boolean;
    skipAnalysis?: boolean;
  }

  interface ScrapedImage {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    localPath?: string;
  }

  interface ScraperResult {
    title: string;
    content: string[];
    metadata: Record<string, any>;
    structureType: string;
    paginationType?: string;
    extractionMethod?: string;
    url: string;
    images?: ScrapedImage[];
  }

  export function scrape(url: string, options?: ScraperOptions): Promise<ScraperResult>;
  export function analyze(url: string): Promise<Record<string, any>>;
} 