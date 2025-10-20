#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Setting up automated deployment for Kent Healthcare...\n');

// Check if we're in a git repository
function checkGitRepo() {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    console.log('✅ Git repository detected');
    return true;
  } catch (error) {
    console.log('❌ Not a git repository');
    console.log('Please run: git init');
    return false;
  }
}

// Create necessary directories
function createDirectories() {
  const dirs = ['.github/workflows', 'scripts', 'backups'];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

// Initialize deployment history
function initDeploymentHistory() {
  const historyFile = './deployment-history.json';
  
  if (!fs.existsSync(historyFile)) {
    const initialHistory = {
      deployments: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    fs.writeFileSync(historyFile, JSON.stringify(initialHistory, null, 2));
    console.log('📝 Initialized deployment history');
  }
}

// Check for required files
function checkRequiredFiles() {
  const requiredFiles = [
    '.github/workflows/deploy.yml',
    'scripts/deploy.js',
    'scripts/ftp-deploy.js',
    'package.json'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    console.log('❌ Missing required files:');
    missingFiles.forEach(file => console.log(`   ${file}`));
    return false;
  }
  
  console.log('✅ All required files present');
  return true;
}

// Display next steps
function showNextSteps() {
  console.log('\n🎉 Setup completed successfully!\n');
  
  console.log('📋 Next Steps:');
  console.log('==============');
  console.log('1. Add your Hostinger FTP credentials to GitHub Secrets:');
  console.log('   - Go to your GitHub repository');
  console.log('   - Settings → Secrets and variables → Actions');
  console.log('   - Add these secrets:');
  console.log('     • HOSTINGER_FTP_HOST');
  console.log('     • HOSTINGER_FTP_USER');
  console.log('     • HOSTINGER_FTP_PASS');
  console.log('');
  console.log('2. Push your code to GitHub:');
  console.log('   git add .');
  console.log('   git commit -m "Setup automated deployment"');
  console.log('   git push origin main');
  console.log('');
  console.log('3. Test deployment:');
  console.log('   npm run deploy');
  console.log('');
  console.log('4. View deployment history:');
  console.log('   npm run versions');
  console.log('');
  console.log('📚 For detailed instructions, see: DEPLOYMENT_SETUP.md');
}

// Main setup function
function setup() {
  console.log('🔍 Checking prerequisites...\n');
  
  // Check git repository
  if (!checkGitRepo()) {
    console.log('\n❌ Please initialize git repository first:');
    console.log('   git init');
    console.log('   git add .');
    console.log('   git commit -m "Initial commit"');
    process.exit(1);
  }
  
  // Create directories
  console.log('\n📁 Creating directories...');
  createDirectories();
  
  // Initialize deployment history
  console.log('\n📝 Initializing deployment history...');
  initDeploymentHistory();
  
  // Check required files
  console.log('\n🔍 Checking required files...');
  if (!checkRequiredFiles()) {
    console.log('\n❌ Please ensure all deployment files are present');
    process.exit(1);
  }
  
  // Show next steps
  showNextSteps();
}

// Run setup
setup();
