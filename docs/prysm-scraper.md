![Prysm Logo](https://res.cloudinary.com/di7ctlowx/image/upload/v1743577195/logo_iu7ob8.png)

# 🔍 Prysm-LLM – Structure-Aware Web Scraper for LLM Integration

[![npm version](https://img.shields.io/npm/v/@pinkpixel/prysm-llm.svg)](https://www.npmjs.com/package/@pinkpixel/prysm-llm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Prysm-LLM is a specialized version of the Prysm scraper designed for integration with Large Language Models (LLMs) through Model Control Protocol (MCP). This version removes all console logging for clean integration with LLM tools and functions.

---

## ⚡ Features

- 🧠 **AI-style Structure Detection**: Recipes, articles, docs, products, blogs — identified and extracted with precision.
- 🕵️‍♂️ **Cloudflare Bypass**: Defeats the orange wall with stealth plugins and anti-bot evasion.
- 🚫 **Resource Blocking**: Faster scrapes with image/script/fonts tracking turned off.
- 🔄 **Smart Pagination**: Scroll, click, or URL pattern — handled automatically or manually.
- 📸 **Image Extraction**: Scrape images with contextual information and optional local downloading.
- 🛠 **Pluggable & Modular**: Add your own extractors, pagination styles, or content processors in seconds.
- 🌐 **REST API**: OpenAPI-powered REST interface for remote control and integration.
- 🔨 **Brute Force Architecture**: Core design applies all extraction techniques to every page without detection logic for maximum content retrieval
- 🤖 **LLM Integration**: Optimized for use with Large Language Models through MCP.

---

## 🚀 Quick Start

```bash
# Install from npm
npm install @pinkpixel/prysm-llm

# Update to the latest version
npm install @pinkpixel/prysm-llm@latest

# Or install dependencies locally
npm install
```

## 🧩 MCP Integration

This package is optimized for use through Model Control Protocol (MCP) with Large Language Models. Unlike the standard Prysm scraper, this version:

- Removes all console output for clean LLM integration
- Returns results as objects rather than logging to console
- Preserves all the powerful scraping capabilities of Prysm
- Allows direct integration with LLM tools and functions

### MCP Function Example

```javascript
const { scrape } = require('@pinkpixel/prysm-llm');

// Example function for MCP integration
async function scrapeFocused(url, options = {}) {
  const result = await scrape(url, {
    maxScrolls: 5,
    scrollDelay: 1000,
    ...options
  });
  
  return result;
}

// Example function for MCP integration
async function scrapeBalanced(url, options = {}) {
  const result = await scrape(url, {
    maxScrolls: 10,
    scrollDelay: 2000,
    ...options
  });
  
  return result;
}

// Example function for MCP integration
async function scrapeDeep(url, options = {}) {
  const result = await scrape(url, {
    maxScrolls: 20,
    scrollDelay: 3000,
    ...options
  });
  
  return result;
}
```

## 🧠 Smart Scan

Prysm includes an intelligent analysis system that examines page structure before scraping to optimize the extraction process. Based on this analysis, Prysm dynamically selects the optimal extraction strategy for maximum efficiency.

Prysm will automatically:

- Detect page structure (article, recipe, product listing, etc.)
- Choose the best extraction strategy
- Handle pagination if present
- Bypass anti-bot protections when needed
- Block unnecessary resources for faster scraping
- Follow links to additional pages when configured

## 🌐 REST API

Prysm includes a full-featured REST API that allows you to:

- Start scraping jobs remotely
- Check job status and progress
- Retrieve scraped content
- Manage jobs (cancel, delete)
- Receive webhook notifications

See the [API-USAGE.md](docs/API-USAGE.md) file for detailed documentation.

---

## 📚 Documentation

- [CLI Usage](docs/CLI-USAGE.md) - Detailed CLI documentation
- [API Usage](docs/API-USAGE.md) - REST API documentation
- [Integration Guide](docs/INTEGRATION_GUIDE.md) - Developer integration guide

---

## 📜 License

MIT License