#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';

console.log('🔐 Setting up SSH deployment for Hostinger...\n');

// SSH Configuration
const SSH_CONFIG = {
  host: '46.28.45.1',
  port: '65002',
  username: 'u195345511',
  keyName: 'hostinger_deploy_key'
};

// Check if SSH key exists
function checkSSHKey() {
  const keyPath = path.join(os.homedir(), '.ssh', SSH_CONFIG.keyName);
  
  if (fs.existsSync(keyPath)) {
    console.log('✅ SSH key already exists');
    return keyPath;
  }
  
  console.log('❌ SSH key not found');
  return null;
}

// Generate SSH key
function generateSSHKey() {
  const keyPath = path.join(os.homedir(), '.ssh', SSH_CONFIG.keyName);
  
  console.log('🔑 Generating SSH key...');
  
  try {
    execSync(`ssh-keygen -t rsa -b 4096 -f ${keyPath} -N "" -C "hostinger-deploy-${Date.now()}"`, { stdio: 'inherit' });
    console.log('✅ SSH key generated successfully');
    return keyPath;
  } catch (error) {
    console.error('❌ Failed to generate SSH key:', error.message);
    return null;
  }
}

// Test SSH connection
function testSSHConnection() {
  console.log('🔍 Testing SSH connection...');
  
  try {
    const testCommand = `ssh -p ${SSH_CONFIG.port} -i ~/.ssh/${SSH_CONFIG.keyName} -o ConnectTimeout=10 -o BatchMode=yes ${SSH_CONFIG.username}@${SSH_CONFIG.host} "echo 'SSH connection successful'"`;
    execSync(testCommand, { stdio: 'inherit' });
    console.log('✅ SSH connection successful');
    return true;
  } catch (error) {
    console.error('❌ SSH connection failed:', error.message);
    return false;
  }
}

// Display public key
function displayPublicKey(keyPath) {
  const publicKeyPath = `${keyPath}.pub`;
  
  if (fs.existsSync(publicKeyPath)) {
    console.log('\n📋 Your SSH Public Key:');
    console.log('========================');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    console.log(publicKey);
    console.log('\n📝 Next Steps:');
    console.log('1. Copy the public key above');
    console.log('2. Go to your Hostinger control panel');
    console.log('3. Navigate to Advanced → SSH Access → SSH Keys');
    console.log('4. Click "Add SSH key"');
    console.log('5. Paste the public key and give it a name (e.g., "github-deploy")');
    console.log('6. Save the key');
    console.log('\n7. Add these secrets to your GitHub repository:');
    console.log('   - HOSTINGER_SSH_HOST: 46.28.45.1');
    console.log('   - HOSTINGER_SSH_PORT: 65002');
    console.log('   - HOSTINGER_SSH_USER: u195345511');
    console.log('   - HOSTINGER_SSH_KEY: (contents of private key)');
    console.log('\n8. Run: npm run test-ssh');
  } else {
    console.error('❌ Public key not found');
  }
}

// Test deployment
function testDeployment() {
  console.log('🧪 Testing deployment...');
  
  try {
    const testCommand = `ssh -p ${SSH_CONFIG.port} -i ~/.ssh/${SSH_CONFIG.keyName} ${SSH_CONFIG.username}@${SSH_CONFIG.host} "ls -la /public_html/landing/"`;
    execSync(testCommand, { stdio: 'inherit' });
    console.log('✅ Deployment test successful');
    return true;
  } catch (error) {
    console.error('❌ Deployment test failed:', error.message);
    return false;
  }
}

// Main setup function
function setup() {
  console.log('🔍 Checking SSH setup...\n');
  
  // Check if SSH key exists
  let keyPath = checkSSHKey();
  
  if (!keyPath) {
    // Generate new SSH key
    keyPath = generateSSHKey();
    if (!keyPath) {
      console.log('\n❌ Setup failed - could not generate SSH key');
      process.exit(1);
    }
  }
  
  // Display public key
  displayPublicKey(keyPath);
  
  console.log('\n⏳ After adding the SSH key to Hostinger, run:');
  console.log('   npm run test-ssh');
}

// Test function
function test() {
  console.log('🧪 Testing SSH setup...\n');
  
  if (!testSSHConnection()) {
    console.log('\n❌ SSH connection failed');
    console.log('Please ensure:');
    console.log('1. SSH key is added to Hostinger');
    console.log('2. SSH service is enabled in Hostinger');
    console.log('3. Firewall allows SSH connections');
    process.exit(1);
  }
  
  if (!testDeployment()) {
    console.log('\n❌ Deployment test failed');
    console.log('Please check:');
    console.log('1. SSH key has proper permissions');
    console.log('2. Target directories exist');
    console.log('3. User has write permissions');
    process.exit(1);
  }
  
  console.log('\n✅ SSH setup is working correctly!');
  console.log('You can now use:');
  console.log('  npm run deploy');
  console.log('  npm run deploy neuro-arabic');
  console.log('  npm run deploy behavioural-english');
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'setup':
    setup();
    break;
    
  case 'test':
    test();
    break;
    
  default:
    console.log(`
🔐 SSH Setup Tool for Hostinger

Usage:
  node scripts/setup-ssh.js setup    - Setup SSH key and display instructions
  node scripts/setup-ssh.js test      - Test SSH connection and deployment

This tool will help you set up SSH deployment to Hostinger shared hosting.
    `);
}
