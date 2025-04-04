# 🔍 Prysm MCP Server

The Prysm MCP (Model Context Protocol) Server enables AI assistants like Claude and others to scrape web content with high accuracy and flexibility.

## ✨ Features

- 🎯 **Multiple Scraping Modes**: Choose from focused (speed), balanced (default), or deep (thorough) modes
- 🧠 **Content Analysis**: Analyze URLs to determine the best scraping approach
- 📄 **Format Flexibility**: Format results as markdown, HTML, or JSON
- 🖼️ **Image Support**: Optionally extract and even download images
- 🔍 **Smart Scrolling**: Configure scroll behavior for single-page applications
- 📱 **Responsive**: Adapts to different website layouts and structures
- 💾 **File Output**: Save formatted results to your preferred directory

## 🚀 Quick Start

### Installation

```bash
# Recommended: Install the LLM-optimized version
npm install -g @pinkpixel/prysm-mcp

# Or install the standard version
npm install -g prysm-mcp

# Or clone and build
git clone https://github.com/pinkpixel-dev/prysm-mcp.git
cd prysm-mcp
npm install
npm run build
```

### Integration Guides

We provide detailed integration guides for popular MCP-compatible applications:

- [Cursor Integration Guide](./docs/cursor-mcp-integration.md)
- [Claude Desktop Integration Guide](./docs/claude-desktop-mcp-integration.md)
- [Windsurf Integration Guide](./docs/windsurf-mcp-integration.md)
- [Cline Integration Guide](./docs/cline-mcp-integration.md)
- [Roo Code Integration Guide](./docs/roo-code-mcp-integration.md)
- [Open WebUI Integration Guide](./docs/openwebui-mcp-integration.md)

### Usage

There are multiple ways to set up Prysm MCP Server:

#### Using mcp.json Configuration

Create a `mcp.json` file in the appropriate location according to the above guides. 

```json
{
  "mcpServers": {
    "prysm-scraper-npx": {
      "description": "Prysm web scraper using npm package",
      "command": "npx",
      "args": [
        "-y",
        "@pinkpixel/prysm-mcp"
      ]
    }
  }
}
```

#### Advanced Configuration Options

Here's a more comprehensive `mcp.json` with multiple configuration options:

```json
{
  "mcpServers": {
    "prysm-scraper-local": {
      "description": "Use this for local development with a cloned repo",
      "command": "node",
      "args": [
        "./dist/index.js"
      ],
      "cwd": "${workspaceFolder}/path/to/prysm-mcp"
    },
    "prysm-scraper-npx": {
      "description": "Use this for the npm published package",
      "command": "npx",
      "args": [
        "-y",
        "@pinkpixel/prysm-mcp"
      ]
    },
    "prysm-scraper-with-output": {
      "description": "Use this to specify a custom output directory",
      "command": "sh",
      "args": [
        "-c",
        "PRYSM_OUTPUT_DIR=\"${workspaceFolder}/scrape-output\" npx -y @pinkpixel/prysm-mcp"
      ]
    }
  }
}
```

## 🛠️ Tools

The server provides the following tools:

### `scrapeFocused`

Fast web scraping optimized for speed (fewer scrolls, main content only).

```
Please scrape https://example.com using the focused mode
```

**Available Parameters:**
- `url` (required): URL to scrape
- `maxScrolls` (optional): Maximum number of scroll attempts (default: 5)
- `scrollDelay` (optional): Delay between scrolls in ms (default: 1000)
- `scrapeImages` (optional): Whether to include images in results
- `downloadImages` (optional): Whether to download images locally
- `maxImages` (optional): Maximum images to extract
- `output` (optional): Output directory for downloaded images

### `scrapeBalanced`

Balanced web scraping approach with good coverage and reasonable speed.

```
Please scrape https://example.com using the balanced mode
```

**Available Parameters:**
- Same as `scrapeFocused` with different defaults
- `maxScrolls` default: 10
- `scrollDelay` default: 2000
- Adds `timeout` parameter to limit total scraping time (default: 30000ms)

### `scrapeDeep`

Maximum extraction web scraping (slower but thorough).

```
Please scrape https://example.com using the deep mode with maximum scrolls
```

**Available Parameters:**
- Same as `scrapeFocused` with different defaults
- `maxScrolls` default: 20
- `scrollDelay` default: 3000
- `maxImages` default: 100

### `formatResult`

Format scraped data into different structured formats (markdown, HTML, JSON).

```
Format the scraped data as markdown
```

**Available Parameters:**
- `data` (required): The scraped data to format
- `format` (required): Output format - "markdown", "html", or "json"
- `includeImages` (optional): Whether to include images in output (default: true)
- `output` (optional): File path to save the formatted result

You can also save formatted results to a file by specifying an output path:

```
Format the scraped data as markdown and save it to "my-results/output.md"
```

## ⚙️ Configuration

### Output Directory

By default, when saving formatted results, files will be saved to `~/prysm-mcp/output/`. You can customize this in two ways:

1. **Environment Variable**: Set `PRYSM_OUTPUT_DIR` to your preferred directory:

```bash
# Linux/macOS
export PRYSM_OUTPUT_DIR="/path/to/custom/directory"

# Windows (Command Prompt)
set PRYSM_OUTPUT_DIR=C:\path\to\custom\directory

# Windows (PowerShell)
$env:PRYSM_OUTPUT_DIR="C:\path\to\custom\directory"
```

2. **Tool Parameter**: Specify an output path directly when calling `formatResult`:

```
Format the scraped data as markdown and save it to "/absolute/path/to/file.md"
```

If you provide only a relative path or filename, it will be saved relative to the configured output directory.

### Path Handling Rules

The `formatResult` tool handles paths in the following ways:

- **Absolute paths**: Used exactly as provided (`/home/user/file.md`)
- **Relative paths**: Saved relative to the configured output directory (`subfolder/file.md`)
- **Filename only**: Saved in the configured output directory (`output.md`)
- **Directory path**: If the path points to a directory, a filename is auto-generated based on content and timestamp

## 🏗️ Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run the server locally
node bin/prysm-mcp

# Debug MCP communication
DEBUG=mcp:* node bin/prysm-mcp

# Set custom output directory
PRYSM_OUTPUT_DIR=./my-output node bin/prysm-mcp
```

### Running via npx

You can run the server directly with npx without installing:

```bash
# Run with default settings
npx @pinkpixel/prysm-mcp

# Run with custom output directory
PRYSM_OUTPUT_DIR=./my-output npx @pinkpixel/prysm-mcp
```

## 📋 License

MIT

## 🙏 Credits

Developed by [Pink Pixel](https://pinkpixel.dev)

Powered by the [Model Context Protocol](https://modelcontextprotocol.io) and [Puppeteer](https://pptr.dev/) 