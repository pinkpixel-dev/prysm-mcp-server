import type { ToolDefinition } from '@modelcontextprotocol/sdk/server';
import { scrapeFocused } from './scrapeFocused.js';
import { scrapeBalanced } from './scrapeBalanced.js';
import { scrapeDeep } from './scrapeDeep.js';
// import { analyzeUrl } from './analyzeUrl.js';
import { formatResult } from './formatResult.js';

export const toolDefinitions: ToolDefinition[] = [
  scrapeFocused,
  scrapeBalanced,
  scrapeDeep,
  // analyzeUrl,
  formatResult,
]; 