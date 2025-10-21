#!/bin/bash

# 🚀 Child Assessment Landing Page - Manual Upload Script
# This script helps upload the updated files to the server

echo "🚀 Child Assessment Landing Page - Manual Upload"
echo "================================================"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist folder not found. Please run 'npm run build' first."
    exit 1
fi

echo "📦 Files ready for upload:"
echo "-------------------------"
ls -la dist/
echo ""

echo "🌐 Target Server:"
echo "   URL: https://landing.kenthealthcare.ae/child-assessment/"
echo "   Path: domains/kenthealthcare.ae/public_html/landing/child-assessment/"
echo ""

echo "📤 Upload Instructions:"
echo "1. Access your hosting control panel or FTP client"
echo "2. Navigate to: domains/kenthealthcare.ae/public_html/landing/child-assessment/"
echo "3. Upload all files from the 'dist' folder"
echo "4. Replace existing files when prompted"
echo ""

echo "✅ Files to upload:"
echo "   - index.html (main page)"
echo "   - admin.html (admin panel)"
echo "   - assets/ folder (all JS, CSS, and font files)"
echo ""

echo "🔍 After upload, verify:"
echo "   - Gallery shows new pediatric images"
echo "   - Videos display with correct aspect ratios"
echo "   - Conditions section shows KENTHEALTHCARE-OCT-04 image"
echo "   - No broken links or missing assets"
echo ""

echo "📞 If issues occur:"
echo "   - Check browser console for errors"
echo "   - Verify all assets uploaded correctly"
echo "   - Clear browser cache and reload"
echo ""

echo "🎉 Deployment package ready!"
echo "   Archive: child-assessment-update-20251021-105808.tar.gz"
echo "   Size: $(du -h child-assessment-update-20251021-105808.tar.gz | cut -f1)"
