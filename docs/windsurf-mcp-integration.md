# 🔍 Using Prysm MCP Server with Windsurf

This guide explains how to integrate the Prysm MCP Server with Windsurf to enable powerful web scraping capabilities for Cascade AI assistant.

## ✨ Installation

1. First, make sure you have the Prysm MCP Server installed:
   ```bash
   # Recommended: Install the LLM-optimized version
   npm install -g @pinkpixel/prysm-mcp
   
   # Or install without global installation
   # You can use npx directly as shown in the configuration examples
   ```

2. Configure Windsurf to use the Prysm MCP Server:
   - Open Windsurf Settings > Advanced Settings or use Command Palette > Open Windsurf Settings Page
   - Scroll down to the Cascade section
   - Click "Add Server" and choose "Add custom server +"

3. If you prefer to directly edit the configuration file, you can find it at:
   - `~/.codeium/windsurf/mcp_config.json`

## 🛠️ Configuration Options

### Basic Configuration

Add the Prysm MCP Server to your Windsurf configuration by editing the `~/.codeium/windsurf/mcp_config.json` file:

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
    "prysm-scraper-local": {
      "description": "Use this for local development with a cloned repo",
      "command": "node",
      "args": [
        "./dist/index.js"
      ],
      "cwd": "/path/to/prysm-mcp"
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
        "PRYSM_OUTPUT_DIR=\"/custom/output/directory\" npx -y @pinkpixel/prysm-mcp"
      ]
    }
  }
}
```

After updating the configuration, be sure to press the refresh button in the Windsurf settings.

## 🛠️ Custom Configuration

You can create a custom configuration file to add the Prysm MCP Server to Windsurf. Create a file named `mcp.json` in your home directory's `.windsurf` folder:

```json
{
  "mcpServers": {
    "prysm-scraper": {
      "command": "npx",
      "args": ["-y", "@pinkpixel/prysm-mcp"],
      "env": {
        "PRYSM_OUTPUT_DIR": "$HOME/windsurf/scraped-content",
        "PRYSM_IMAGE_OUTPUT_DIR": "$HOME/windsurf/scraped-content/images"
      }
    }
  }
}
```

For a more complex setup with multiple configurations:

```json
{
  "mcpServers": {
    "prysm-scraper-standard": {
      "description": "Standard web scraping with default settings",
      "command": "npx",
      "args": ["-y", "@pinkpixel/prysm-mcp"]
    },
    "prysm-scraper-with-output": {
      "description": "Web scraping with custom output directory",
      "command": "npx",
      "args": ["-y", "@pinkpixel/prysm-mcp"],
      "env": {
        "PRYSM_OUTPUT_DIR": "/custom/output/directory",
        "PRYSM_IMAGE_OUTPUT_DIR": "/custom/output/directory/images"
      }
    }
  }
}
```

After saving this file, restart Windsurf for the changes to take effect.

## ⚙️ Environment Configuration

You can customize where results are saved by setting environment variables before starting Windsurf:

```bash
# Linux/macOS
export PRYSM_OUTPUT_DIR="/path/to/custom/directory"
export PRYSM_IMAGE_OUTPUT_DIR="/path/to/custom/image/directory"
# Then start Windsurf

# Windows (Command Prompt)
set PRYSM_OUTPUT_DIR=C:\path\to\custom\directory
set PRYSM_IMAGE_OUTPUT_DIR=C:\path\to\custom\image\directory
# Then start Windsurf

# Windows (PowerShell)
$env:PRYSM_OUTPUT_DIR="C:\path\to\custom\directory"
$env:PRYSM_IMAGE_OUTPUT_DIR="C:\path\to\custom\image\directory"
# Then start Windsurf
```

By default, general results will be saved to `~/prysm-mcp/output/` and images to `~/prysm-mcp/output/images/`.

## 🚀 Available Tools

The Prysm MCP Server provides the following tools:

| Tool Name | Description | Key Parameters |
|-----------|-------------|----------------|
| scrapeFocused | Fast web scraping (fewer scrolls, main content) | `url`, `maxScrolls` (default: 5) |
| scrapeBalanced | Balanced scraping (good coverage, reasonable speed) | `url`, `maxScrolls` (default: 10), `timeout` |
| scrapeDeep | Maximum extraction (slower but thorough) | `url`, `maxScrolls` (default: 20) |
| formatResult | Format data as markdown, HTML, or JSON | `data`, `format`, `output` |

## 📝 Examples

Here are some examples of how to use the Prysm MCP tools in Windsurf Cascade:

### Simple Scraping

Ask Cascade to scrape a webpage:

```
Please scrape https://example.com using the balanced mode
```

### Content Analysis

Ask Cascade to analyze a URL first:

```
Analyze the structure of https://example.com
```

### Custom Scraping

Ask Cascade to use specific parameters:

```
Scrape https://example.com using deep mode with maximum 15 scrolls and download images
```

### Formatting Results

Ask Cascade to format the results:

```
Format the scraped data as markdown with images included
```

You can also ask Cascade to save the formatted results to a file:

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
- Windsurf will consume credits for MCP tool calls regardless of success or failure
- Currently Windsurf only supports tools, not prompts nor resources

For more information, visit [Pink Pixel](https://pinkpixel.dev) or check the [GitHub repository](https://github.com/pinkpixel-dev/prysm-mcp). 