#!/usr/bin/env node

// Simple test script to verify the MCP server package
import { spawn } from 'child_process';
import path from 'path';

console.log('🧪 Testing Prysm MCP Server');

// Run using npx (simulates how Cursor will run it)
const npmPackage = '@pinkpixel/prysm-mcp@1.0.2';
console.log(`📦 Running: npx -y ${npmPackage}`);

const ps = spawn('npx', ['-y', npmPackage], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Capture output
let stdout = '';
let stderr = '';

ps.stdout.on('data', (data) => {
  stdout += data.toString();
  console.log(`📤 STDOUT: ${data.toString().trim()}`);
});

ps.stderr.on('data', (data) => {
  stderr += data.toString();
  console.log(`📥 STDERR: ${data.toString().trim()}`);
});

// Handle process completion
ps.on('exit', (code) => {
  if (code === 0) {
    console.log(`✅ Process exited successfully`);
  } else {
    console.log(`❌ Process exited with code ${code}`);
  }
  
  if (!stdout && !stderr) {
    console.log('⚠️ No output captured from the process');
  }
});

// Send a test message after 2 seconds (simulating Cursor's behavior)
setTimeout(() => {
  try {
    // Simple JSON-RPC 2.0 request to list tools
    const request = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    });
    
    console.log(`🔍 Sending test message: ${request}`);
    ps.stdin.write(request + '\n');
  } catch (err) {
    console.error('Error sending test message:', err);
  }
}, 2000);

// Kill the process after 5 seconds if it's still running
setTimeout(() => {
  if (!ps.killed) {
    console.log('⏱️ Timeout reached, killing process');
    ps.kill();
  }
}, 5000); 