#!/usr/bin/env node

/**
 * 🛡️ PROJECT PROTECTION SYSTEM
 * Prevents deployment mistakes and ensures correct project-to-URL mapping
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project configuration with strict URL mapping
const PROJECT_CONFIG = {
  'behavioural-english': {
    name: 'Behavioural English Therapy',
    url: 'https://landing.kenthealthcare.ae/behavioural-english/',
    folder: 'behavioural-english',
    description: 'Behavioral therapy services landing page',
    color: '🔵'
  },
  'home-physiotherapy': {
    name: 'Home Physiotherapy',
    url: 'https://landing.kenthealthcare.ae/home-physiotherapy/',
    folder: 'home-physiotherapy', 
    description: 'Home physiotherapy services landing page',
    color: '🟢'
  },
  'physiotherapy': {
    name: 'Physiotherapy',
    url: 'https://landing.kenthealthcare.ae/physiotherapy/',
    folder: 'physiotherapy',
    description: 'General physiotherapy services landing page',
    color: '🟡'
  }
};

class ProjectProtection {
  constructor() {
    this.currentProject = this.detectCurrentProject();
    this.config = PROJECT_CONFIG[this.currentProject];
  }

  detectCurrentProject() {
    const currentPath = process.cwd();
    const pathParts = currentPath.split('/');
    
    // Find the project folder in the path
    for (const [projectKey, config] of Object.entries(PROJECT_CONFIG)) {
      if (pathParts.includes(config.folder)) {
        return projectKey;
      }
    }
    
    throw new Error('❌ Could not detect current project. Are you in the correct directory?');
  }

  validateDeployment() {
    console.log('🛡️  PROJECT PROTECTION SYSTEM');
    console.log('================================');
    
    if (!this.config) {
      throw new Error(`❌ Unknown project: ${this.currentProject}`);
    }

    console.log(`📁 Current Project: ${this.config.color} ${this.config.name}`);
    console.log(`🌐 Target URL: ${this.config.url}`);
    console.log(`📝 Description: ${this.config.description}`);
    console.log('');

    // Validate project structure
    this.validateProjectStructure();
    
    // Check for critical files
    this.validateCriticalFiles();
    
    // Validate package.json
    this.validatePackageJson();
    
    console.log('✅ Project validation passed');
    return true;
  }

  validateProjectStructure() {
    const requiredFiles = [
      'package.json',
      'index.html',
      'src/App.jsx',
      'src/main.jsx'
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`❌ Missing critical file: ${file}`);
      }
    }
  }

  validateCriticalFiles() {
    // Check if index.html has correct title
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    if (this.currentProject === 'behavioural-english') {
      if (!indexContent.includes('Behavioral Therapy')) {
        throw new Error('❌ index.html does not contain "Behavioral Therapy" - wrong project content!');
      }
    }
    
    if (this.currentProject === 'home-physiotherapy') {
      if (!indexContent.includes('Home Physiotherapy')) {
        throw new Error('❌ index.html does not contain "Home Physiotherapy" - wrong project content!');
      }
    }
  }

  validatePackageJson() {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (!packageJson.scripts || !packageJson.scripts.build) {
      throw new Error('❌ package.json missing build script');
    }
  }

  getDeploymentConfig() {
    return {
      project: this.currentProject,
      name: this.config.name,
      url: this.config.url,
      folder: this.config.folder,
      description: this.config.description,
      color: this.config.color
    };
  }

  createDeploymentSafeguard() {
    const safeguardContent = `
# 🛡️ DEPLOYMENT SAFEGUARD

## Current Project: ${this.config.name}
## Target URL: ${this.config.url}
## Project Folder: ${this.config.folder}

⚠️  **CRITICAL SAFETY CHECK** ⚠️

Before deploying, verify:
1. You are in the correct project directory
2. The content matches the target URL
3. All features are working locally
4. No cross-project contamination

## Deployment Commands:
- \`npm run deploy:safe\` - Safe deployment with validation
- \`npm run deploy:force\` - Force deployment (use with caution)

## Protection Status: ✅ ACTIVE
Generated: ${new Date().toISOString()}
    `;

    fs.writeFileSync('DEPLOYMENT_SAFEGUARD.md', safeguardContent);
    console.log('🛡️  Deployment safeguard created');
  }
}

export default ProjectProtection;
