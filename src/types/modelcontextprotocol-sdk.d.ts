declare module '@modelcontextprotocol/sdk/dist/esm/server/index.js' {
  export interface ServerConfig {
    name: string;
    description: string;
    version: string;
    model: {
      provider: string;
      name: string;
      version: string;
    };
    tools: any[];
    listenAddr: string;
  }

  export interface Server {
    start(): Promise<void>;
    stop(): Promise<void>;
  }

  export function createServer(config: ServerConfig): Promise<Server>;
}

declare module '@modelcontextprotocol/sdk/server' {
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

  export type ServerConfig = import('@modelcontextprotocol/sdk/dist/esm/server/index.js').ServerConfig;
}

declare module '@modelcontextprotocol/sdk/server/stdio' {
  import { ToolDefinition } from '@modelcontextprotocol/sdk/server';

  export interface ServerConfig {
    name: string;
    description: string;
    version: string;
    model?: {
      provider: string;
      name: string;
      version: string;
    };
    tools: ToolDefinition[];
    listenAddr?: string;
  }

  export interface Server {
    start(): Promise<void>;
    stop(): Promise<void>;
  }

  export function createStdioServer(config: ServerConfig): Server;
} 