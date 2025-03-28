# Dharitri Explorer Deployment Guide

This document provides instructions for deploying the Dharitri Explorer application to production.

## Prerequisites

- Node.js 16+ and npm
- Access to your production server or hosting environment
- Git for version control

## Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dharitri-explorer.git
   cd dharitri-explorer
   ```

2. Create a `.env` file for production settings:

   ```bash
   cp .env.example .env
   ```

3. Update the environment variables with your production values:
   ```
   VITE_API_BASE_URL=https://production-api.dharitri.org/v1
   VITE_ENABLE_MOCK=false
   ```

## Building for Production

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Build the application:

   ```bash
   npm run build
   ```

   This will create a `dist` folder with optimized production assets.

3. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Deployment Options

### Option 1: Static Hosting (Recommended)

Since this is a single-page application (SPA), it can be deployed to static hosting services:

#### Using AWS S3 + CloudFront

1. Create an S3 bucket:

   ```bash
   aws s3 mb s3://dharitri-explorer-prod
   ```

2. Configure the bucket for static website hosting and set appropriate permissions.

3. Upload the build files:

   ```bash
   aws s3 sync dist/ s3://dharitri-explorer-prod --delete
   ```

4. Create a CloudFront distribution pointing to the S3 bucket.

#### Using Netlify/Vercel

1. Connect your repository to Netlify/Vercel.
2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables in the platform's dashboard.

### Option 2: Traditional Web Server

If using a traditional web server like Nginx or Apache:

1. Upload the contents of the `dist` directory to your server.

2. Configure your web server:

   For Nginx:

   ```nginx
   server {
     listen 80;
     server_name explorer.dharitri.org;
     root /path/to/dist;

     location / {
       try_files $uri $uri/ /index.html;
     }

     # Cache static assets
     location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires max;
       add_header Cache-Control "public, max-age=31536000";
     }
   }
   ```

   For Apache (.htaccess):

   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

## Post-Deployment Tasks

1. Verify the application is working correctly:

   - Check all pages are loading
   - Ensure API connections are working
   - Test search functionality

2. Set up monitoring:

   - Consider using services like Uptime Robot, Pingdom, or New Relic
   - Monitor API response times and availability

3. Configure CDN caching:
   - Set appropriate cache headers for static assets

## Rollback Procedure

If issues are discovered after deployment:

1. Identify the last working version in your version control system.
2. Check out that version:
   ```bash
   git checkout <commit-hash>
   ```
3. Rebuild and redeploy the application.

## Automated Deployment

For more efficient deployments, consider using the included `deploy.sh` script:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script automates the build and deployment process.

## Troubleshooting

- **404 Errors**: Ensure your server is configured to redirect all requests to index.html for client-side routing
- **API Connection Issues**: Check environment variables to make sure API_BASE_URL is correct
- **Blank Screen**: Check browser console for JavaScript errors

## Contact

For deployment support, contact the development team at dev@dharitri.org.
