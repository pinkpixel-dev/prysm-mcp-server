import type { ToolDefinition } from '../config.js';
import { ScraperResponse, FormatResultParams } from '../types.js';
import * as prysm from '@pinkpixel/prysm-llm';
import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from '../config.js';

// Helper function to format scraped data as markdown
function formatAsMarkdown(data: ScraperResponse, includeImages: boolean): string {
  let markdown = `# ${data.title}\n\n`;
  
  // Add metadata if available
  if (data.metadata && Object.keys(data.metadata).length > 0) {
    markdown += '## Metadata\n\n';
    for (const [key, value] of Object.entries(data.metadata)) {
      if (typeof value === 'string' || typeof value === 'number') {
        markdown += `- **${key}**: ${value}\n`;
      }
    }
    markdown += '\n';
  }
  
  // Add content
  markdown += '## Content\n\n';
  for (const section of data.content) {
    markdown += `${section}\n\n`;
  }
  
  // Add images if requested and available
  if (includeImages && data.images && data.images.length > 0) {
    markdown += '## Images\n\n';
    for (const image of data.images) {
      const alt = image.alt || 'Image';
      markdown += `![${alt}](${image.url})\n\n`;
    }
  }
  
  return markdown;
}

// Helper function to format scraped data as HTML
function formatAsHTML(data: ScraperResponse, includeImages: boolean): string {
  let html = `<h1>${data.title}</h1>`;
  
  // Add metadata if available
  if (data.metadata && Object.keys(data.metadata).length > 0) {
    html += '<h2>Metadata</h2><ul>';
    for (const [key, value] of Object.entries(data.metadata)) {
      if (typeof value === 'string' || typeof value === 'number') {
        html += `<li><strong>${key}</strong>: ${value}</li>`;
      }
    }
    html += '</ul>';
  }
  
  // Add content
  html += '<h2>Content</h2>';
  for (const section of data.content) {
    html += `<p>${section}</p>`;
  }
  
  // Add images if requested and available
  if (includeImages && data.images && data.images.length > 0) {
    html += '<h2>Images</h2>';
    for (const image of data.images) {
      const alt = image.alt || 'Image';
      html += `<img src="${image.url}" alt="${alt}" />`;
    }
  }
  
  return html;
}

// Generate a default filename based on content and format
function generateDefaultFilename(data: ScraperResponse, format: string): string {
  // Create a filename-safe version of the title
  const safeTitle = data.title
    ? data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 50)
    : 'scrape_result';
    
  // Add timestamp for uniqueness
  const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
  
  // Add appropriate extension
  const extension = format === 'markdown' ? '.md' : 
                   format === 'html' ? '.html' : '.json';
                   
  return `${safeTitle}_${timestamp}${extension}`;
}

// Helper function to save formatted content to file
async function saveToFile(content: string, outputPath: string, format: string, data: ScraperResponse): Promise<string> {
  try {
    // Check if outputPath is absolute or relative
    let resolvedPath = outputPath;
    
    // If the path is not absolute, use the default output directory
    if (!path.isAbsolute(outputPath)) {
      resolvedPath = path.join(config.serverOptions.defaultOutputDir, outputPath);
    }
    
    // If only a directory is provided (no filename), generate a filename
    const stats = await fs.stat(resolvedPath).catch(() => null);
    if (stats && stats.isDirectory()) {
      resolvedPath = path.join(resolvedPath, generateDefaultFilename(data, format));
    } else if (!path.extname(resolvedPath)) {
      // If no extension, add one based on format
      const extension = format === 'markdown' ? '.md' : 
                        format === 'html' ? '.html' : '.json';
      resolvedPath = `${resolvedPath}${extension}`;
    }
    
    // Ensure the directory exists
    const dir = path.dirname(resolvedPath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write the content to the file
    await fs.writeFile(resolvedPath, content, 'utf-8');
    return resolvedPath;
  } catch (error) {
    throw new Error(`Failed to save formatted result: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Define the tool
export const formatResult: ToolDefinition = {
  name: 'formatResult',
  description: 'Format scraped data into different structured formats (markdown, HTML, JSON)',
  parameters: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        description: 'The scraped data to format'
      },
      format: {
        type: 'string',
        enum: ['markdown', 'html', 'json'],
        description: 'The format to convert the data to'
      },
      includeImages: {
        type: 'boolean',
        description: 'Whether to include images in the formatted output (default: true)'
      },
      output: {
        type: 'string',
        description: 'File path to save the formatted result. If not provided, will use the default directory.'
      }
    },
    required: ['data', 'format']
  },
  handler: async (params: FormatResultParams): Promise<{ formatted: string; format: string; savedTo?: string }> => {
    const { data, format, includeImages = true, output } = params;
    
    try {
      let formatted: string;
      
      switch (format) {
        case 'markdown':
          formatted = formatAsMarkdown(data, includeImages);
          break;
        case 'html':
          formatted = formatAsHTML(data, includeImages);
          break;
        case 'json':
          formatted = JSON.stringify(data, null, 2);
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
      
      // Save to file if output path is provided or use default directory
      let savedTo: string | undefined;
      if (output) {
        savedTo = await saveToFile(formatted, output, format, data);
      } else {
        // Save to default location if no output specified but we have a default dir
        const defaultFilename = generateDefaultFilename(data, format);
        savedTo = await saveToFile(formatted, defaultFilename, format, data);
      }
      
      return {
        formatted,
        format,
        ...(savedTo && { savedTo })
      };
    } catch (error) {
      throw new Error(`Failed to format result: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}; 