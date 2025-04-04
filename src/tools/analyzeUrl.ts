import type { ToolDefinition } from '../config.js';
import * as prysm from '@pinkpixel/prysm-llm';

// Interface for the parameters
interface AnalyzeUrlParams {
  url: string;
}

// Interface for the response
interface AnalyzeUrlResponse {
  type: string;
  contentCategory: string;
  recommendations: {
    mode: string;
    reason: string;
  }[];
}

// Define the tool
export const analyzeUrl: ToolDefinition = {
  name: 'analyzeUrl',
  description: 'Analyzes a URL to determine its content type and recommend scraping modes',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL to analyze'
      }
    },
    required: ['url']
  },
  handler: async (params: AnalyzeUrlParams): Promise<AnalyzeUrlResponse> => {
    const { url } = params;
    
    try {
      // Call the Prysm analyzer function
      const analysis = await prysm.analyze(url);
      
      // Determine content type
      let type = 'general';
      let contentCategory = 'unknown';
      
      // Simple URL pattern detection
      if (url.includes('product') || url.includes('/p/') || url.includes('/item/')) {
        type = 'product';
        contentCategory = 'e-commerce';
      } else if (url.includes('article') || url.includes('blog') || url.includes('/post/')) {
        type = 'article';
        contentCategory = 'content';
      } else if (url.includes('search') || url.includes('category') || url.includes('list')) {
        type = 'listing';
        contentCategory = 'navigation';
      }
      
      // Generate recommendations based on content type
      const recommendations = [];
      
      if (type === 'product') {
        recommendations.push({
          mode: 'standard',
          reason: 'Best for product pages with balanced extraction of details and images'
        });
        recommendations.push({
          mode: 'deep',
          reason: 'Use for complex product pages with many details, specifications, and images'
        });
      } else if (type === 'article') {
        recommendations.push({
          mode: 'focused',
          reason: 'Best for article content where main text is the priority'
        });
        recommendations.push({
          mode: 'standard',
          reason: 'Use if article contains important images or media'
        });
      } else if (type === 'listing') {
        recommendations.push({
          mode: 'standard',
          reason: 'Best for category pages and listings with moderate scrolling'
        });
        recommendations.push({
          mode: 'deep',
          reason: 'Use for infinite scroll pages or when you need to extract many items'
        });
      } else {
        recommendations.push({
          mode: 'standard',
          reason: 'Balanced mode works well for most general webpages'
        });
      }
      
      return {
        type,
        contentCategory,
        recommendations
      };
    } catch (error) {
      throw new Error(`Failed to analyze URL ${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}; 