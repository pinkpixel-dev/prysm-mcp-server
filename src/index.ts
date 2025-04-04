#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { config } from './config.js';

// Create MCP server instance
const server = new Server(
  {
    name: config.name,
    version: config.version,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: config.tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.parameters
    })),
  };
});

// Register tool execution handler
server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest) => {
    try {
      if (!request.params.arguments) {
        throw new Error("Arguments are required");
      }

      // Find the requested tool
      const tool = config.tools.find(t => t.name === request.params.name);
      
      if (!tool) {
        throw new Error(`Unknown tool: ${request.params.name}`);
      }
      
      // Execute the tool with the provided arguments
      const result = await tool.handler(request.params.arguments);
      
      // Return the result
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    } catch (error) {
      console.error("Error executing tool:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            }),
          },
        ],
      };
    }
  }
);

// Start the server
async function startServer() {
  try {
    // Create stdio transport
    const transport = new StdioServerTransport();
    
    // Connect the server to the transport
    await server.connect(transport);
    
    console.error(`Prysm MCP Server initialized and ready`);
    console.error(`Available tools: ${config.tools.map(t => t.name).join(', ')}`);
    
    // Handle graceful shutdown
    const signals = ['SIGINT', 'SIGTERM'];
    for (const signal of signals) {
      process.on(signal, async () => {
        console.error(`\n${signal} received, shutting down server...`);
        process.exit(0);
      });
    }
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
    // Log configuration info for debugging
    console.error('Configuration:', JSON.stringify({
      toolCount: config.tools.length,
      toolNames: config.tools.map(t => t.name)
    }, null, 2));
    process.exit(1);
  }
}

// Start the server
startServer(); 