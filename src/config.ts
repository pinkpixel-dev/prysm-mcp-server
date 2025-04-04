// Define tool types directly
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  handler: (params: any) => Promise<any>;
}

// Define ServerConfig interface
interface ServerConfig {
  name: string;
  description: string;
  version: string;
  model: {
    provider: string;
    name: string;
    version: string;
  };
  tools: ToolDefinition[];
  serverOptions: {
    defaultOutputDir: string;
  };
}

// Import all tools
import { scrapeFocused } from './tools/scrapeFocused.js';
import { scrapeBalanced } from './tools/scrapeBalanced.js';
import { scrapeDeep } from './tools/scrapeDeep.js';
// import { analyzeUrl } from './tools/analyzeUrl.js';
import { formatResult } from './tools/formatResult.js';
import path from 'node:path';
import os from 'node:os';

// Get default output directory - priority:
// 1. Environment variable
// 2. User's home directory + prysm-mcp folder
const defaultOutputDir = process.env.PRYSM_OUTPUT_DIR || 
  path.join(os.homedir(), 'prysm-mcp', 'output');

// Log the default output directory for debugging
console.debug(`Setting default output directory to: ${defaultOutputDir}`);

// MCP Server configuration
export const config: ServerConfig = {
  name: 'prysm-mcp-server',
  description: 'Prysm web scraper MCP server for AI assistants',
  version: '1.0.0',
  model: {
    provider: 'Pink Pixel',
    name: 'Prysm',
    version: '1.0.0',
  },
  tools: [
    scrapeFocused,
    scrapeBalanced, 
    scrapeDeep,
    // analyzeUrl,
    formatResult
  ],
  serverOptions: {
    defaultOutputDir
  }
}; 