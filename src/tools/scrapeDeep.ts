import type { ToolDefinition } from '../config.js';
import { ScraperBaseParams, ScraperResponse } from '../types.js';
import * as prysm from '@pinkpixel/prysm-llm';

// Define the tool
export const scrapeDeep: ToolDefinition = {
  name: 'scrapeDeep',
  description: 'Maximum extraction web scraping (slower but thorough)',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL of the webpage to scrape'
      },
      maxScrolls: {
        type: 'number',
        description: 'Maximum number of scroll attempts (default: 20)'
      },
      scrollDelay: {
        type: 'number',
        description: 'Delay between scrolls in ms (default: 3000)'
      },
      pages: {
        type: 'number',
        description: 'Number of pages to scrape (if pagination is present)'
      },
      scrapeImages: {
        type: 'boolean',
        description: 'Whether to include images in the scrape result'
      },
      downloadImages: {
        type: 'boolean',
        description: 'Whether to download images locally'
      },
      maxImages: {
        type: 'number',
        description: 'Maximum number of images to extract'
      },
      minImageSize: {
        type: 'number',
        description: 'Minimum width/height for images in pixels'
      },
      output: {
        type: 'string',
        description: 'Output directory for downloaded images'
      }
    },
    required: ['url']
  },
  handler: async (params: ScraperBaseParams): Promise<ScraperResponse> => {
    const { url, maxScrolls = 20, scrollDelay = 3000, pages = 1, scrapeImages = false, 
            downloadImages = false, maxImages = 100, minImageSize = 100, output } = params;
    
    try {
      // Create options object for the scraper
      const options = {
        maxScrolls,
        scrollDelay,
        pages,
        focused: false,
        standard: false,
        deep: true, // Use deep mode for thorough extraction
        scrapeImages: scrapeImages || downloadImages,
        downloadImages,
        maxImages,
        minImageSize,
        output
      };
      
      // Call the Prysm scraper
      const result = await prysm.scrape(url, options);
      
      return result;
    } catch (error) {
      throw new Error(`Failed to scrape ${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}; 