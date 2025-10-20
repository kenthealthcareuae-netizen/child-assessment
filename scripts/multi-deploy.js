#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Load deployment configuration
const CONFIG = JSON.parse(fs.readFileSync('./deployment-config.json', 'utf8'));

// SSH Configuration
const SSH_CONFIG = {
  host: process.env.HOSTINGER_SSH_HOST || CONFIG.deployment.host,
  port: process.env.HOSTINGER_SSH_PORT || CONFIG.deployment.port,
  username: process.env.HOSTINGER_SSH_USER || CONFIG.deployment.username,
  keyPath: process.env.HOSTINGER_SSH_KEY_PATH || '~/.ssh/hostinger_key'
};

// Load deployment history
function loadHistory() {
  const historyFile = './deployment-history.json';
  if (fs.existsSync(historyFile)) {
    return JSON.parse(fs.readFileSync(historyFile, 'utf8'));
  }
  return { deployments: [] };
}

// Save deployment history
function saveHistory(history) {
  fs.writeFileSync('./deployment-history.json', JSON.stringify(history, null, 2));
}

// Create SSH connection string
function getSSHConnection() {
  return `ssh -p ${SSH_CONFIG.port} -i ${SSH_CONFIG.keyPath} ${SSH_CONFIG.username}@${SSH_CONFIG.host}`;
}

// Create backup on server
function createBackup(projectName, targetPath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupName = `${projectName}-backup-${timestamp}`;
  
  console.log(`📦 Creating backup: ${backupName}`);
  
  const backupCommand = `
    cd ${CONFIG.deployment.basePath}
    if [ -d "${targetPath.split('/').pop()}" ]; then
      cp -r ${targetPath.split('/').pop()} ${backupName}
      echo "Backup created: ${backupName}"
    else
      echo "No existing deployment to backup"
    fi
  `;
  
  try {
    execSync(`${getSSHConnection()} "${backupCommand}"`, { stdio: 'inherit' });
    return backupName;
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    return null;
  }
}

// Deploy project via SSH
function deployProject(projectName, projectConfig) {
  console.log(`🚀 Deploying ${projectName}...`);
  
  // Build the project
  console.log(`📦 Building ${projectName}...`);
  try {
    execSync(`cd ${projectConfig.sourcePath} && ${projectConfig.buildCommand}`, { stdio: 'inherit' });
    console.log('✅ Build completed');
  } catch (error) {
    console.error(`❌ Build failed for ${projectName}:`, error.message);
    return false;
  }
  
  // Create backup on server
  const backupName = createBackup(projectName, projectConfig.targetPath);
  if (!backupName) {
    console.error(`❌ Backup failed for ${projectName}`);
    return false;
  }
  
  // Upload files
  console.log(`📤 Uploading files for ${projectName}...`);
  const uploadCommand = `
    rsync -avz --delete ${projectConfig.sourcePath}${projectConfig.distPath}/ ${SSH_CONFIG.username}@${SSH_CONFIG.host}:${projectConfig.targetPath}
  `;
  
  try {
    execSync(uploadCommand, { stdio: 'inherit' });
    console.log(`✅ ${projectName} deployed successfully`);
  } catch (error) {
    console.error(`❌ Upload failed for ${projectName}:`, error.message);
    return false;
  }
  
  // Set permissions
  console.log(`🔧 Setting permissions for ${projectName}...`);
  const permissionCommand = `
    cd ${projectConfig.targetPath}
    chmod -R 755 .
    chmod 644 *.html
    chmod 644 .htaccess 2>/dev/null || true
  `;
  
  try {
    execSync(`${getSSHConnection()} "${permissionCommand}"`, { stdio: 'inherit' });
    console.log(`✅ Permissions set for ${projectName}`);
  } catch (error) {
    console.warn(`⚠️ Permission setting failed for ${projectName}:`, error.message);
  }
  
  return true;
}

// List available projects
function listProjects() {
  console.log('\n📋 Available Projects:');
  console.log('====================');
  
  Object.entries(CONFIG.projects).forEach(([key, project]) => {
    console.log(`${key}: ${project.name}`);
    console.log(`   Description: ${project.description}`);
    console.log(`   Target: ${project.targetPath}`);
    console.log('');
  });
}

// List deployment history
function listDeployments() {
  const history = loadHistory();
  
  if (history.deployments.length === 0) {
    console.log('No deployments found');
    return;
  }
  
  console.log('\n📋 Deployment History:');
  console.log('====================');
  
  history.deployments.forEach((deployment, index) => {
    const status = index === 0 ? '(LATEST)' : '';
    console.log(`${index + 1}. ${deployment.project} ${status}`);
    console.log(`   Date: ${deployment.timestamp}`);
    console.log(`   Commit: ${deployment.commit.substring(0, 8)}`);
    console.log(`   Target: ${deployment.targetPath}`);
    console.log(`   Backup: ${deployment.backupName}`);
    console.log('');
  });
}

// Rollback to previous version
function rollback(projectName, versionName) {
  const history = loadHistory();
  const deployment = history.deployments.find(d => 
    d.project === projectName && d.name === versionName
  );
  
  if (!deployment) {
    console.error(`❌ Version ${versionName} not found for ${projectName}`);
    return false;
  }
  
  console.log(`🔄 Rolling back ${projectName} to ${versionName}...`);
  
  const rollbackCommand = `
    cd ${CONFIG.deployment.basePath}
    if [ -d "${deployment.backupName}" ]; then
      rm -rf ${projectName}
      cp -r ${deployment.backupName} ${projectName}
      echo "Rollback completed: ${deployment.backupName} -> ${projectName}"
    else
      echo "Backup ${deployment.backupName} not found"
      exit 1
    fi
  `;
  
  try {
    execSync(`${getSSHConnection()} "${rollbackCommand}"`, { stdio: 'inherit' });
    console.log(`✅ Rolled back ${projectName} to ${versionName}`);
    return true;
  } catch (error) {
    console.error(`❌ Rollback failed for ${projectName}:`, error.message);
    return false;
  }
}

// Deploy specific project
function deployProjectByName(projectName) {
  const project = CONFIG.projects[projectName];
  
  if (!project) {
    console.error(`❌ Project ${projectName} not found`);
    console.log('Available projects:', Object.keys(CONFIG.projects).join(', '));
    return false;
  }
  
  console.log(`🚀 Deploying ${project.name}...`);
  
  const success = deployProject(projectName, project);
  
  if (success) {
    // Record deployment
    const history = loadHistory();
    const gitCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    
    const deployment = {
      name: `v${Date.now()}`,
      project: projectName,
      timestamp: new Date().toISOString(),
      commit: gitCommit,
      targetPath: project.targetPath,
      backupName: `${projectName}-backup-${new Date().toISOString().replace(/[:.]/g, '-')}`,
      status: 'success'
    };
    
    history.deployments.unshift(deployment);
    
    // Keep only last N deployments
    if (history.deployments.length > CONFIG.versioning.keepVersions) {
      history.deployments = history.deployments.slice(0, CONFIG.versioning.keepVersions);
    }
    
    saveHistory(history);
    
    console.log(`\n✅ ${project.name} deployed successfully!`);
    console.log(`📝 Version: ${deployment.name}`);
    console.log(`💾 Backup: ${deployment.backupName}`);
    console.log(`🔗 Commit: ${gitCommit.substring(0, 8)}`);
  }
  
  return success;
}

// Deploy all projects
function deployAll() {
  console.log('🚀 Deploying all projects...\n');
  
  const results = {};
  
  Object.keys(CONFIG.projects).forEach(projectName => {
    console.log(`\n--- Deploying ${projectName} ---`);
    results[projectName] = deployProjectByName(projectName);
  });
  
  console.log('\n📊 Deployment Summary:');
  console.log('=====================');
  
  Object.entries(results).forEach(([project, success]) => {
    const status = success ? '✅ Success' : '❌ Failed';
    console.log(`${project}: ${status}`);
  });
  
  return results;
}

// CLI interface
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case 'deploy':
    if (arg) {
      deployProjectByName(arg);
    } else {
      deployAll();
    }
    break;
    
  case 'rollback':
    if (!arg) {
      console.error('❌ Please specify project name');
      console.log('Usage: node scripts/multi-deploy.js rollback <project-name> <version>');
      process.exit(1);
    }
    const version = process.argv[4];
    if (!version) {
      console.error('❌ Please specify version name');
      console.log('Usage: node scripts/multi-deploy.js rollback <project-name> <version>');
      process.exit(1);
    }
    rollback(arg, version);
    break;
    
  case 'list':
    listProjects();
    break;
    
  case 'history':
    listDeployments();
    break;
    
  default:
    console.log(`
🚀 Multi-Project Deployment Tool

Usage:
  node scripts/multi-deploy.js deploy [project]     - Deploy specific project or all
  node scripts/multi-deploy.js rollback <proj> <ver> - Rollback project to version
  node scripts/multi-deploy.js list                  - List available projects
  node scripts/multi-deploy.js history              - Show deployment history

Examples:
  node scripts/multi-deploy.js deploy
  node scripts/multi-deploy.js deploy neuro-arabic
  node scripts/multi-deploy.js rollback neuro-arabic v1703123456789
  node scripts/multi-deploy.js list
  node scripts/multi-deploy.js history
    `);
}
