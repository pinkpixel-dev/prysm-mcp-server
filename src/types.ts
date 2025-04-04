// Common parameters for all scraping tools
export interface ScraperBaseParams {
  url: string;
  maxScrolls?: number;
  scrollDelay?: number;
  pages?: number;
  scrapeImages?: boolean;
  downloadImages?: boolean;
  maxImages?: number;
  minImageSize?: number;
  output?: string;  // Output directory for saving scrape results
}

// Scraper tool response interface
export interface ScraperResponse {
  title: string;
  content: string[];
  metadata: Record<string, any>;
  structureType: string;
  paginationType?: string;
  extractionMethod?: string;
  url: string;
  images?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    localPath?: string;
  }[];
}

// Format options for the formatResult tool
export type FormatType = 'markdown' | 'html' | 'json';

export interface FormatResultParams {
  data: ScraperResponse;
  format: FormatType;
  includeImages?: boolean;
  output?: string;  // File path to save the formatted result
} 