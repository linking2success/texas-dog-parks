# Git Deployment Guide for dog-park.info (Vercel)

## Vercel Auto-Deployment 🚀

### How it works:
- **Automatic**: Vercel auto-deploys when you push to GitHub
- **Configuration**: Uses `vercel.json` instead of `.htaccess`
- **Instant**: Deployments happen within seconds

## Deployment Process
Every time you want to deploy changes:

1. **Commit and push to GitHub** (already done ✅)
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Vercel automatically deploys** 🎉
   - Check your Vercel dashboard
   - Or visit your site directly

## Important Files for Vercel:
- ✅ `vercel.json` - Contains redirect rules (replaces .htaccess)
- ✅ `test-ads-redirect.php` - Diagnostic file  
- ❌ `.htaccess` - Not used by Vercel (Apache-specific)

## Vercel Configuration:
The `vercel.json` file handles:
- ✅ ads.txt redirect to Ezoic
- ✅ index.html redirects  
- ✅ Legacy URL redirects
- ✅ Security headers

## Testing after deployment:
1. Visit: https://dog-park.info/test-ads-redirect.php
2. Check: https://dog-park.info/ads.txt (should redirect to Ezoic)
3. Verify Ezoic dashboard shows ads.txt integration working
4. Check Vercel dashboard for deployment status

## Vercel Dashboard:
- URL: https://vercel.com/dashboard
- Check deployment logs
- View build status
- Monitor performance
