#!/bin/bash
# Simple deployment script for dog-park.info

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

echo "✅ Files updated from repository"

# Set proper permissions for .htaccess
chmod 644 .htaccess

# Set proper permissions for PHP files
chmod 644 *.php

echo "🔒 Permissions updated"

# Check if ads.txt exists and remove it (we want the redirect to work)
if [ -f "ads.txt" ]; then
    rm ads.txt
    echo "🗑️  Removed static ads.txt file"
fi

echo "🎉 Deployment complete!"
echo "📋 Next steps:"
echo "   1. Test redirect: https://dog-park.info/test-ads-redirect.php"
echo "   2. Check ads.txt: https://dog-park.info/ads.txt"
echo "   3. Verify Ezoic integration"
