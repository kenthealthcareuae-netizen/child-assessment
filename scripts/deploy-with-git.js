#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get current git commit hash
function getCurrentCommitHash() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('❌ Error getting git commit hash:', error.message);
    return 'unknown';
  }
}

// Get current branch
function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('❌ Error getting git branch:', error.message);
    return 'unknown';
  }
}

// Get last commit message
function getLastCommitMessage() {
  try {
    return execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('❌ Error getting commit message:', error.message);
    return 'Unknown changes';
  }
}

// Update deployment history with git info
function updateDeploymentHistory(projectName, status, files, size) {
  const historyFile = './deployment-history.json';
  let history = { deployments: [] };
  
  if (fs.existsSync(historyFile)) {
    history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
  }
  
  const deployment = {
    project: projectName,
    timestamp: new Date().toISOString(),
    status: status,
    files: files,
    size: size,
    github_commit: getCurrentCommitHash(),
    github_branch: getCurrentBranch(),
    commit_message: getLastCommitMessage(),
    version: `v${Date.now()}`
  };
  
  history.deployments.push(deployment);
  
  // Keep only last 10 deployments
  if (history.deployments.length > 10) {
    history.deployments = history.deployments.slice(-10);
  }
  
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
  console.log('📝 Updated deployment history with git info');
}

// Main deployment function
function deployWithGitInfo() {
  const projectName = 'child-assessment';
  const commitHash = getCurrentCommitHash();
  const branch = getCurrentBranch();
  const commitMessage = getLastCommitMessage();
  
  console.log('🚀 Deploying with Git Integration');
  console.log(`📋 Project: ${projectName}`);
  console.log(`🌿 Branch: ${branch}`);
  console.log(`📝 Commit: ${commitHash.substring(0, 8)}`);
  console.log(`💬 Message: ${commitMessage}`);
  
  try {
    // Build the project
    console.log('📦 Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Deploy to server
    console.log('📤 Deploying to server...');
    execSync('rsync -avz --delete ./dist/ u195345511@46.28.45.1:domains/kenthealthcare.ae/public_html/landing/child-assessment/ -e "ssh -p 65002 -i ~/.ssh/hostinger_key"', { stdio: 'inherit' });
    
    // Update deployment history
    updateDeploymentHistory(projectName, 'success', 9, '492251 bytes');
    
    console.log('✅ Deployment successful!');
    console.log(`🌐 Live URL: https://landing.kenthealthcare.ae/child-assessment/`);
    console.log(`📊 GitHub: https://github.com/dibolkyae-ops/kent/commit/${commitHash}`);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    updateDeploymentHistory(projectName, 'failed', 0, '0 bytes');
    process.exit(1);
  }
}

// Run deployment
deployWithGitInfo();
