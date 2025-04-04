# 🔍 Using Prysm MCP Server with Roo Code

This guide explains how to integrate the Prysm MCP Server with Roo Code to enable powerful web scraping capabilities for AI assistants.

## ✨ Installation

1. First, make sure you have the Prysm MCP Server installed:
   ```bash
   # Recommended: Install the LLM-optimized version
   npm install -g @pinkpixel/prysm-mcp
   
   # Or install without global installation
   # You can use npx directly as shown in the configuration examples
   ```

2. Configure Roo Code to use the Prysm MCP Server by adding it to your MCP server configuration.

## 🛠️ Configuration Options

### Basic Configuration

To add the Prysm MCP Server to Roo Code, create or edit your MCP configuration file:

```json
{
  "mcpServers": {
    "prysm-scraper": {
      "command": "npx",
      "args": [
        "-y",
        "@pinkpixel/prysm-mcp"
      ]
    }
  }
}
```

### Advanced Configuration

Here's a more comprehensive configuration with multiple options:

```json
{
  "mcpServers": {
    "prysm-scraper-basic": {
      "description": "Basic web scraper with default settings",
      "command": "npx",
      "args": [
        "-y",
        "@pinkpixel/prysm-mcp"
      ]
    },
    "prysm-scraper-with-output": {
      "description": "Web scraper with custom output directory",
      "command": "sh",
      "args": [
        "-c",
        "PRYSM_OUTPUT_DIR=\"$HOME/roo-scrape-results\" npx -y @pinkpixel/prysm-mcp"
      ]
    },
    "prysm-local-dev": {
      "description": "For local development with cloned repo",
      "command": "node",
      "args": [
        "./dist/index.js"
      ],
      "cwd": "/path/to/local/prysm-mcp"
    }
  }
}
```

After updating the configuration, restart Roo Code for the changes to take effect.

## ⚙️ Environment Configuration

You can customize where formatted results are saved by setting the `PRYSM_OUTPUT_DIR` environment variable before starting Roo Code:

```bash
# Linux/macOS
export PRYSM_OUTPUT_DIR="/path/to/custom/directory"
# Then start Roo Code

# Windows (Command Prompt)
set PRYSM_OUTPUT_DIR=C:\path\to\custom\directory
# Then start Roo Code

# Windows (PowerShell)
$env:PRYSM_OUTPUT_DIR="C:\path\to\custom\directory"
# Then start Roo Code
```

By default, files will be saved to `~/prysm-mcp/output/`.

## 🚀 Available Tools

The Prysm MCP Server provides the following tools:

| Tool Name | Description | Key Parameters |
|-----------|-------------|----------------|
| scrapeFocused | Fast web scraping (fewer scrolls, main content) | `url`, `maxScrolls` (default: 5) |
| scrapeBalanced | Balanced scraping (good coverage, reasonable speed) | `url`, `maxScrolls` (default: 10), `timeout` |
| scrapeDeep | Maximum extraction (slower but thorough) | `url`, `maxScrolls` (default: 20) |
| formatResult | Format data as markdown, HTML, or JSON | `data`, `format`, `output` |

## 📝 Examples

Here are some examples of how to use the Prysm MCP tools in Roo Code:

### Simple Scraping

Ask Roo to scrape a webpage:

```
Please scrape https://example.com using the balanced mode
```

### Content Analysis

Ask Roo to analyze a URL first:

```
Analyze the structure of https://example.com
```

### Custom Scraping

Ask Roo to use specific parameters:

```
Scrape https://example.com using deep mode with maximum 15 scrolls and download images
```

### Formatting Results

Ask Roo to format the results:

```
Format the scraped data as markdown with images included
```

You can also ask Roo to save the formatted results to a file:

```
Format the scraped data as markdown and save it to "my-results/output.md"
```

Or specify an absolute path:

```
Format the scraped data as HTML and save it to "/home/user/documents/webpages/example.html"
```

If you don't specify a file extension, one will be added automatically based on the format.

## 💡 Tips

- For large websites, use `scrapeDeep` for thorough extraction
- For blog articles, use `scrapeFocused` for faster extraction of main content
- For product pages, use `scrapeBalanced` for a good mix of content and images
- Always analyze a URL first if you're unsure which scraping mode to use
- When saving formatted results, specify just a filename to save in the default directory
- Use the environment variable for consistent output locations across projects

## 🔒 Security Notes

- The server runs locally on your machine
- No data is sent to external servers (all processing happens locally)
- Images are only downloaded if specifically requested
- Saved files are stored on your local machine in the configured output directory

For more information, visit [Pink Pixel](https://pinkpixel.dev) or check the [GitHub repository](https://github.com/pinkpixel-dev/prysm-mcp). 