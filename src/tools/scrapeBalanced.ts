import type { ToolDefinition } from '../config.js';
import { ScraperBaseParams, ScraperResponse } from '../types.js';
import * as prysm from '@pinkpixel/prysm-llm';
import { config } from '../config.js';

// Define the tool
export const scrapeBalanced: ToolDefinition = {
  name: 'scrapeBalanced',
  description: 'Balanced web scraping approach with good coverage and reasonable speed',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL of the webpage to scrape'
      },
      maxScrolls: {
        type: 'number',
        description: 'Maximum number of scroll attempts (default: 10)'
      },
      scrollDelay: {
        type: 'number',
        description: 'Delay between scrolls in ms (default: 2000)'
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
      timeout: {
        type: 'number',
        description: 'Maximum time in ms for the scrape operation (default: 30000)'
      },
      output: {
        type: 'string',
        description: 'Output directory for general results'
      },
      imageOutput: {
        type: 'string',
        description: 'Output directory for downloaded images'
      }
    },
    required: ['url']
  },
  handler: async (params: ScraperBaseParams & { timeout?: number }): Promise<ScraperResponse> => {
    const { url, maxScrolls = 10, scrollDelay = 2000, pages = 1, scrapeImages = false, 
            downloadImages = false, maxImages = 50, minImageSize = 100, timeout = 30000, 
            output, imageOutput } = params;
    
    try {
      // Create options object for the scraper
      const options = {
        maxScrolls,
        scrollDelay,
        pages,
        focused: false,
        standard: true, // Use standard mode for balanced extraction
        deep: false,
        scrapeImages: scrapeImages || downloadImages,
        downloadImages,
        maxImages,
        minImageSize,
        timeout, // Add timeout option
        output: output || config.serverOptions.defaultOutputDir, // Use configured default if not provided
        imageOutput: imageOutput || config.serverOptions.defaultImageOutputDir // Use configured default if not provided
      };
      
      // Create a promise with timeout
      const scrapePromise = prysm.scrape(url, options);
      
      // Add timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Scraping timed out after ${timeout}ms`)), timeout);
      });
      
      // Race the scraping against the timeout
      const result = await Promise.race([scrapePromise, timeoutPromise]) as ScraperResponse;
      
      // Limit content size to prevent overwhelming the MCP client
      if (result.content && result.content.length > 0) {
        // Limit the number of content sections
        if (result.content.length > 20) {
          result.content = result.content.slice(0, 20);
          result.content.push("(Content truncated due to size limitations)");
        }
        
        // Limit the size of each content section
        result.content = result.content.map(section => {
          if (section.length > 5000) {
            return section.substring(0, 5000) + "... (truncated)";
          }
          return section;
        });
      }
      
      // Limit the number of images to return
      if (result.images && result.images.length > 20) {
        result.images = result.images.slice(0, 20);
      }
      
      return result;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
      // Return a proper error format for MCP
      return {
        title: "Scraping Error",
        content: [`Failed to scrape ${url}: ${error instanceof Error ? error.message : String(error)}`],
        images: [],
        metadata: { error: true },
        url: url,
        structureType: "error",
        paginationType: "none",
        extractionMethod: "none"
      };
    }
  }
}; 