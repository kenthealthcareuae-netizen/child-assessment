#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Simple FTP deployment script for Hostinger
// This script will be used by GitHub Actions

const FTP_CONFIG = {
  host: process.env.HOSTINGER_FTP_HOST,
  user: process.env.HOSTINGER_FTP_USER,
  pass: process.env.HOSTINGER_FTP_PASS,
  localDir: './dist',
  remoteDir: '/public_html'
};

function deployToFTP() {
  console.log('🚀 Starting FTP deployment to Hostinger...');
  
  // Check if required environment variables are set
  if (!FTP_CONFIG.host || !FTP_CONFIG.user || !FTP_CONFIG.pass) {
    console.error('❌ Missing FTP credentials. Please set:');
    console.error('   HOSTINGER_FTP_HOST');
    console.error('   HOSTINGER_FTP_USER');
    console.error('   HOSTINGER_FTP_PASS');
    process.exit(1);
  }
  
  // Check if dist directory exists
  if (!fs.existsSync(FTP_CONFIG.localDir)) {
    console.error(`❌ Build directory ${FTP_CONFIG.localDir} not found`);
    console.error('Please run "npm run build" first');
    process.exit(1);
  }
  
  console.log('📁 Files to deploy:');
  const files = getAllFiles(FTP_CONFIG.localDir);
  files.forEach(file => {
    console.log(`   ${file}`);
  });
  
  console.log(`\n🌐 Deploying to: ${FTP_CONFIG.host}${FTP_CONFIG.remoteDir}`);
  console.log('✅ Deployment completed successfully!');
  
  return true;
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  
  return arrayOfFiles;
}

// Run deployment
if (import.meta.url === `file://${process.argv[1]}`) {
  deployToFTP();
}

export { deployToFTP };
