# 🔍 Using Prysm MCP Server with Claude Desktop

This guide explains how to integrate the Prysm MCP Server with Claude Desktop to enable powerful web scraping capabilities for Claude.

## ✨ Installation

1. First, make sure you have the Prysm MCP Server installed:
   ```bash
   # Recommended: Install the LLM-optimized version
   npm install -g @pinkpixel/prysm-mcp
   
   # Or install without global installation
   # You can use npx directly as shown in the configuration examples
   ```

2. Make sure you have Node.js installed. To verify, open your terminal or command prompt and run:
   ```bash
   node --version
   ```
   If you get an error or no output, download Node.js from [nodejs.org](https://nodejs.org/).

3. Configure Claude Desktop to use the Prysm MCP Server:
   - Open Claude Desktop
   - Click on the Claude menu on your computer and select "Settings..."
   - Click on "Developer" in the left-hand bar
   - Click on "Edit Config"

## 🛠️ Configuration Options

### Basic Configuration

This will create a configuration file in one of these locations, depending on your operating system:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Edit this file to add the Prysm MCP Server:

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
        "PRYSM_OUTPUT_DIR=\"$HOME/prysm-results\" npx -y @pinkpixel/prysm-mcp"
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

After updating the configuration, restart Claude Desktop for the changes to take effect.

## ⚙️ Environment Configuration

You can customize where formatted results are saved by setting the `PRYSM_OUTPUT_DIR` environment variable before starting Claude Desktop:

```bash
# Linux/macOS
export PRYSM_OUTPUT_DIR="/path/to/custom/directory"
# Then start Claude Desktop

# Windows (Command Prompt)
set PRYSM_OUTPUT_DIR=C:\path\to\custom\directory
# Then start Claude Desktop

# Windows (PowerShell)
$env:PRYSM_OUTPUT_DIR="C:\path\to\custom\directory"
# Then start Claude Desktop
```

By default, files will be saved to `~/prysm-mcp/output/`.

## 🚀 Available Tools

After restarting Claude Desktop, you should see a hammer icon 🔨 in the bottom right corner of the input box. Clicking on it will show the available tools, including:

| Tool Name | Description | Key Parameters |
|-----------|-------------|----------------|
| scrapeFocused | Fast web scraping (fewer scrolls, main content) | `url`, `maxScrolls` (default: 5) |
| scrapeBalanced | Balanced scraping (good coverage, reasonable speed) | `url`, `maxScrolls` (default: 10), `timeout` |
| scrapeDeep | Maximum extraction (slower but thorough) | `url`, `maxScrolls` (default: 20) |
| formatResult | Format data as markdown, HTML, or JSON | `data`, `format`, `output` |

## 📝 Examples

Here are some examples of how to use the Prysm MCP tools in Claude Desktop:

### Simple Scraping

Ask Claude to scrape a webpage:

```
Please scrape https://example.com using the balanced mode
```

### Content Analysis

Ask Claude to analyze a URL first:

```
Analyze the structure of https://example.com
```

### Custom Scraping

Ask Claude to use specific parameters:

```
Scrape https://example.com using deep mode with maximum 15 scrolls and download images
```

### Formatting Results

Ask Claude to format the results:

```
Format the scraped data as markdown with images included
```

You can also ask Claude to save the formatted results to a file:

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

- The server runs locally on your machine with the permissions of your user account
- No data is sent to external servers (all processing happens locally)
- Images are only downloaded if specifically requested
- Saved files are stored on your local machine in the configured output directory
- Claude will ask for your permission before executing any tool actions

## ❓ Troubleshooting

If you encounter issues:

1. Check that Node.js is properly installed
2. Verify that the configuration file syntax is correct
3. Make sure any file paths in your configuration are valid absolute paths
4. Look for logs at:
   - macOS: `~/Library/Logs/Claude`
   - Windows: `%APPDATA%\Claude\logs`
5. Try manually running the server in your terminal:
   ```bash
   npx -y @pinkpixel/prysm-mcp
   ```

For more information, visit [Pink Pixel](https://pinkpixel.dev) or check the [GitHub repository](https://github.com/pinkpixel-dev/prysm-mcp). 