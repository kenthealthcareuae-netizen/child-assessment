# 🚀 Deployment Workflow Documentation

## Overview
This document outlines the proper deployment workflow for the home-physiotherapy landing page, ensuring version control, history tracking, and deployment synchronization between GitHub, local development, and live hosting.

## 🔄 Workflow Process

### 1. **Development Phase**
```bash
# Make your changes locally
# Test thoroughly
npm run dev
```

### 2. **Git Version Control**
```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: Add new feature description"

# Push to GitHub
git push origin main
```

### 3. **Deployment Options**

#### Option A: Standard Deployment
```bash
npm run deploy:home-physio
```

#### Option B: Git-Integrated Deployment (Recommended)
```bash
npm run deploy:git
```

### 4. **Verification**
- Check live URL: https://landing.kenthealthcare.ae/home-physiotherapy/
- Verify GitHub commit: https://github.com/dibolkyae-ops/kent/commits/main
- Check deployment history: `cat deployment-history.json`

## 📊 Deployment Tracking

### GitHub Integration
- **Commit Hash**: Automatically captured
- **Branch**: Tracked (main/feature branches)
- **Commit Message**: Stored for reference
- **Timestamp**: ISO format

### Deployment History
Located in: `deployment-history.json`
```json
{
  "deployments": [
    {
      "project": "home-physiotherapy",
      "timestamp": "2025-10-12T08:06:37.000Z",
      "status": "success",
      "files": 9,
      "size": "492251 bytes",
      "github_commit": "252c0131",
      "github_branch": "main",
      "commit_message": "feat: Complete home-physiotherapy implementation",
      "version": "v1.1.0"
    }
  ]
}
```

## 🔗 URL Structure

### Live URLs
- **Home Physiotherapy**: https://landing.kenthealthcare.ae/home-physiotherapy/
- **Physiotherapy**: https://landing.kenthealthcare.ae/physiotherapy/

### GitHub Repository
- **Main Branch**: https://github.com/dibolkyae-ops/kent/tree/main/landing-pages/home-physiotherapy
- **Commits**: https://github.com/dibolkyae-ops/kent/commits/main

## 🛠️ Available Scripts

| Script | Purpose | Command |
|--------|---------|---------|
| `deploy:git` | Deploy with Git integration | `npm run deploy:git` |
| `deploy:home-physio` | Standard deployment | `npm run deploy:home-physio` |
| `build` | Build for production | `npm run build` |
| `dev` | Development server | `npm run dev` |
| `versions` | View deployment history | `npm run versions` |

## 📝 Best Practices

### 1. **Commit Messages**
Use conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### 2. **Pre-Deployment Checklist**
- [ ] Code tested locally
- [ ] All changes committed to Git
- [ ] Pushed to GitHub
- [ ] Build successful
- [ ] No console errors

### 3. **Post-Deployment Verification**
- [ ] Live site loads correctly
- [ ] All features working
- [ ] No JavaScript errors
- [ ] Forms submitting properly
- [ ] Tracking codes active

## 🔍 Troubleshooting

### Common Issues
1. **Build Failures**: Check for syntax errors, missing imports
2. **Deployment Failures**: Verify SSH connection, check server space
3. **Git Issues**: Ensure all changes are committed and pushed

### Rollback Process
```bash
# View deployment history
npm run versions

# Rollback to previous version
npm run rollback
```

## 📈 Monitoring

### Performance Metrics
- **Build Time**: Tracked in deployment logs
- **File Size**: Monitored for optimization
- **Deployment Speed**: Measured for efficiency

### Quality Assurance
- **Error Tracking**: Console errors monitored
- **User Experience**: Form functionality verified
- **Technical SEO**: Meta tags, structured data checked

## 🎯 Success Criteria

A successful deployment should have:
- ✅ **GitHub**: All changes committed and pushed
- ✅ **Local**: Build successful, no errors
- ✅ **Live**: Site accessible, fully functional
- ✅ **Tracking**: All analytics and conversion tracking working
- ✅ **History**: Deployment recorded with Git integration

---

**Last Updated**: October 12, 2025  
**Version**: v1.1.0  
**GitHub Commit**: 252c0131
