# Git Deployment Guide for dog-park.info

## Prerequisites
- SSH access to your web server
- Git installed on your server
- Repository cloned on your server

## Initial Setup (One-time)
1. SSH into your server
2. Navigate to your website directory
3. Clone the repository:
   ```bash
   git clone https://github.com/linking2success/texas-dog-parks.git .
   ```

## Deployment Process
Every time you want to deploy changes:

1. **Local changes are already committed and pushed** ✅
2. SSH into your server:
   ```bash
   ssh username@your-server.com
   ```
3. Navigate to website directory:
   ```bash
   cd /path/to/your/website
   ```
4. Pull latest changes:
   ```bash
   git pull origin main
   ```
5. Run deployment script (optional):
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

## Files to verify after deployment:
- ✅ `.htaccess` - Updated with RewriteRule
- ✅ `test-ads-redirect.php` - New diagnostic file
- ❌ `ads.txt` - Should NOT exist (deleted)

## Testing after deployment:
1. Visit: https://dog-park.info/test-ads-redirect.php
2. Check: https://dog-park.info/ads.txt (should redirect)
3. Verify Ezoic dashboard shows ads.txt integration working

## Troubleshooting:
- If permissions are wrong: `chmod 644 .htaccess *.php *.html`
- If git pull fails: Check repository permissions
- If redirect doesn't work: Check .htaccess syntax and server config
