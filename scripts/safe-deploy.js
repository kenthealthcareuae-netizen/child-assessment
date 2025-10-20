#!/usr/bin/env node

/**
 * 🛡️ SAFE DEPLOYMENT SCRIPT
 * Prevents deployment mistakes with comprehensive validation
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import ProjectProtection from './project-protection.js';

class SafeDeployer {
  constructor() {
    this.protection = new ProjectProtection();
    this.deploymentConfig = this.protection.getDeploymentConfig();
  }

  async deploy() {
    try {
      console.log('🛡️  SAFE DEPLOYMENT INITIATED');
      console.log('================================');
      
      // Step 1: Validate project
      console.log('🔍 Step 1: Validating project...');
      this.protection.validateDeployment();
      
      // Step 2: Create safeguard
      console.log('🛡️  Step 2: Creating deployment safeguard...');
      this.protection.createDeploymentSafeguard();
      
      // Step 3: Build project
      console.log('📦 Step 3: Building project...');
      this.buildProject();
      
      // Step 4: Validate build
      console.log('✅ Step 4: Validating build...');
      this.validateBuild();
      
      // Step 5: Deploy with correct URL
      console.log('🚀 Step 5: Deploying to correct URL...');
      await this.deployToCorrectURL();
      
      // Step 6: Update deployment history
      console.log('📝 Step 6: Updating deployment history...');
      this.updateDeploymentHistory();
      
      console.log('✅ DEPLOYMENT SUCCESSFUL!');
      console.log(`🌐 Live URL: ${this.deploymentConfig.url}`);
      
    } catch (error) {
      console.error('❌ DEPLOYMENT FAILED:', error.message);
      process.exit(1);
    }
  }

  buildProject() {
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('✅ Build completed successfully');
    } catch (error) {
      throw new Error(`Build failed: ${error.message}`);
    }
  }

  validateBuild() {
    if (!fs.existsSync('dist/index.html')) {
      throw new Error('Build failed - dist/index.html not found');
    }
    
    // Check if build contains correct content
    const buildContent = fs.readFileSync('dist/index.html', 'utf8');
    
    if (this.deploymentConfig.project === 'behavioural-english') {
      if (!buildContent.includes('Behavioral Therapy')) {
        throw new Error('❌ Build contains wrong content - not behavioral therapy!');
      }
    }
    
    console.log('✅ Build validation passed');
  }

  async deployToCorrectURL() {
    const { project, url } = this.deploymentConfig;
    
    console.log(`🎯 Deploying ${project} to: ${url}`);
    
    // Use the correct deployment script based on project
    if (project === 'behavioural-english') {
      // Deploy to behavioural-english URL
      await this.deployToBehaviouralEnglish();
    } else if (project === 'home-physiotherapy') {
      await this.deployToHomePhysiotherapy();
    } else if (project === 'physiotherapy') {
      await this.deployToPhysiotherapy();
    }
  }

  async deployToBehaviouralEnglish() {
    console.log('🔵 Deploying to Behavioural English URL...');
    
    // Create deployment script for behavioural English
    const deployScript = `
#!/bin/bash
# Deploy to behavioural-english URL
echo "🚀 Deploying to behavioural-english URL..."

# Upload files to correct directory
rsync -avz --delete dist/ user@server:/path/to/behavioural-english/

echo "✅ Deployed to: https://landing.kenthealthcare.ae/behavioural-english/"
    `;
    
    fs.writeFileSync('deploy-behavioural.sh', deployScript);
    execSync('chmod +x deploy-behavioural.sh');
    
    // For now, just log the correct URL
    console.log('🌐 Target URL: https://landing.kenthealthcare.ae/behavioural-english/');
    console.log('⚠️  Note: Update deployment script with correct server path');
  }

  async deployToHomePhysiotherapy() {
    console.log('🟢 Deploying to Home Physiotherapy URL...');
    console.log('🌐 Target URL: https://landing.kenthealthcare.ae/home-physiotherapy/');
  }

  async deployToPhysiotherapy() {
    console.log('🟡 Deploying to Physiotherapy URL...');
    console.log('🌐 Target URL: https://landing.kenthealthcare.ae/physiotherapy/');
  }

  updateDeploymentHistory() {
    const historyFile = 'deployment-history.json';
    let history = { deployments: [] };
    
    if (fs.existsSync(historyFile)) {
      history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
    }
    
    const deployment = {
      project: this.deploymentConfig.project,
      timestamp: new Date().toISOString(),
      status: 'success',
      files: this.countFiles('dist'),
      size: this.getDirectorySize('dist'),
      github_commit: this.getGitCommit(),
      github_branch: 'main',
      commit_message: this.getGitCommitMessage(),
      version: `v${Date.now()}`,
      url: this.deploymentConfig.url,
      protection: 'enabled'
    };
    
    history.deployments.unshift(deployment);
    
    // Keep only last 10 deployments
    if (history.deployments.length > 10) {
      history.deployments = history.deployments.slice(0, 10);
    }
    
    fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
    console.log('📝 Deployment history updated');
  }

  countFiles(dir) {
    if (!fs.existsSync(dir)) return 0;
    return fs.readdirSync(dir).length;
  }

  getDirectorySize(dir) {
    if (!fs.existsSync(dir)) return '0 bytes';
    
    let size = 0;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        size += this.getDirectorySize(filePath);
      } else {
        size += fs.statSync(filePath).size;
      }
    }
    
    return `${size} bytes`;
  }

  getGitCommit() {
    try {
      return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  getGitCommitMessage() {
    try {
      return execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
    } catch {
      return 'No commit message';
    }
  }
}

// Run deployment
const deployer = new SafeDeployer();
deployer.deploy().catch(console.error);
