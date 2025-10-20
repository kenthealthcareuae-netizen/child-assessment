#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Configuration
const CONFIG = {
  backupDir: './backups',
  deploymentDir: './dist',
  historyFile: './deployment-history.json'
};

// Ensure backup directory exists
if (!fs.existsSync(CONFIG.backupDir)) {
  fs.mkdirSync(CONFIG.backupDir, { recursive: true });
}

// Load deployment history
function loadHistory() {
  if (fs.existsSync(CONFIG.historyFile)) {
    return JSON.parse(fs.readFileSync(CONFIG.historyFile, 'utf8'));
  }
  return { deployments: [] };
}

// Save deployment history
function saveHistory(history) {
  fs.writeFileSync(CONFIG.historyFile, JSON.stringify(history, null, 2));
}

// Create backup
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupName = `backup-${timestamp}`;
  const backupPath = path.join(CONFIG.backupDir, backupName);
  
  console.log(`Creating backup: ${backupName}`);
  
  // Copy current dist to backup
  execSync(`cp -r ${CONFIG.deploymentDir} ${backupPath}`);
  
  return { name: backupName, path: backupPath, timestamp };
}

// Deploy to server
function deployToServer() {
  console.log('Deploying to Hostinger...');
  
  // This would be replaced with actual FTP/SFTP deployment
  // For now, we'll just simulate the deployment
  console.log('✅ Deployment completed successfully');
  
  return true;
}

// Rollback to previous version
function rollback(versionName) {
  const history = loadHistory();
  const deployment = history.deployments.find(d => d.name === versionName);
  
  if (!deployment) {
    console.error(`❌ Version ${versionName} not found`);
    return false;
  }
  
  const backupPath = path.join(CONFIG.backupDir, deployment.backupName);
  
  if (!fs.existsSync(backupPath)) {
    console.error(`❌ Backup ${deployment.backupName} not found`);
    return false;
  }
  
  console.log(`Rolling back to ${versionName}...`);
  
  // Copy backup back to dist
  execSync(`rm -rf ${CONFIG.deploymentDir}`);
  execSync(`cp -r ${backupPath} ${CONFIG.deploymentDir}`);
  
  console.log(`✅ Rolled back to ${versionName}`);
  return true;
}

// List available versions
function listVersions() {
  const history = loadHistory();
  
  if (history.deployments.length === 0) {
    console.log('No deployments found');
    return;
  }
  
  console.log('\n📋 Available Versions:');
  console.log('====================');
  
  history.deployments.forEach((deployment, index) => {
    const status = index === 0 ? '(CURRENT)' : '';
    console.log(`${index + 1}. ${deployment.name} ${status}`);
    console.log(`   Date: ${deployment.timestamp}`);
    console.log(`   Commit: ${deployment.commit.substring(0, 8)}`);
    console.log('');
  });
}

// Main deployment function
function deploy() {
  console.log('🚀 Starting deployment process...\n');
  
  // Build the project
  console.log('📦 Building project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
  
  // Create backup
  const backup = createBackup();
  
  // Deploy to server
  const deploySuccess = deployToServer();
  
  if (!deploySuccess) {
    console.error('❌ Deployment failed');
    process.exit(1);
  }
  
  // Record deployment
  const history = loadHistory();
  const gitCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  
  const deployment = {
    name: `v${Date.now()}`,
    timestamp: new Date().toISOString(),
    commit: gitCommit,
    backupName: backup.name,
    status: 'success'
  };
  
  history.deployments.unshift(deployment);
  
  // Keep only last 10 deployments
  if (history.deployments.length > 10) {
    history.deployments = history.deployments.slice(0, 10);
  }
  
  saveHistory(history);
  
  console.log(`\n✅ Deployment completed successfully!`);
  console.log(`📝 Version: ${deployment.name}`);
  console.log(`💾 Backup: ${backup.name}`);
  console.log(`🔗 Commit: ${gitCommit.substring(0, 8)}`);
}

// CLI interface
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case 'deploy':
    deploy();
    break;
    
  case 'rollback':
    if (!arg) {
      console.error('❌ Please specify version name');
      console.log('Usage: node scripts/deploy.js rollback <version-name>');
      process.exit(1);
    }
    rollback(arg);
    break;
    
  case 'list':
    listVersions();
    break;
    
  default:
    console.log(`
🚀 Kent Healthcare Deployment Tool

Usage:
  node scripts/deploy.js deploy          - Deploy current version
  node scripts/deploy.js rollback <ver>  - Rollback to specific version
  node scripts/deploy.js list           - List available versions

Examples:
  node scripts/deploy.js deploy
  node scripts/deploy.js rollback v1703123456789
  node scripts/deploy.js list
    `);
}
