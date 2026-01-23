# Deployment Guide

This guide covers the deployment process for the STRPS website platform to various environments.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Git](https://git-scm.com/)
- [Vercel CLI](https://vercel.com/docs/cli) (for Vercel deployments)
- [Docker](https://www.docker.com/) (for local development with containers)
- [Neon](https://neon.tech/) account (or another PostgreSQL provider)

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
# Required
NEXT_PUBLIC_SERVER_URL=https://your-production-url.com
PAYLOAD_SECRET=your_secure_random_string
DATABASE_URI=postgresql://user:password@host:port/db_name

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxx
RESEND_DEFAULT_FROM_EMAIL=noreply@yourdomain.com

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Optional
NODE_ENV=production
PAYLOAD_PUBLIC_SERVER_URL=https://your-production-url.com
PAYLOAD_PUBLIC_SITE_NAME=STRPS
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/strps-website.git
   cd strps-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file (see above)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## Production Deployment (Vercel)

### 1. Set Up Vercel Project

1. Install Vercel CLI and log in:
   ```bash
   npm install -g vercel
   vercel login
   ```

2. Link your project:
   ```bash
   vercel link
   ```

### 2. Configure Environment Variables

Set the following environment variables in your Vercel project settings:

```
NEXT_PUBLIC_SERVER_URL=$VERCEL_URL
PAYLOAD_SECRET=your_secure_random_string
DATABASE_URI=your_postgres_connection_string
NODE_ENV=production
```

### 3. Deploy

1. Create a production build:
   ```bash
   npm run build
   ```

2. Deploy to production:
   ```bash
   vercel --prod
   ```

## Database Setup

### 1. Set Up PostgreSQL

The application requires PostgreSQL 12+. You can use:

- [Neon](https://neon.tech/) (Recommended)
- [Supabase](https://supabase.com/)
- Self-hosted PostgreSQL
- Other managed PostgreSQL providers

### 2. Run Migrations

Migrations are automatically handled by Payload CMS on startup.

## Media Storage

By default, media is stored in the local filesystem. For production, configure an S3-compatible storage provider:

1. Set up an S3-compatible storage (AWS S3, DigitalOcean Spaces, etc.)
2. Add the following environment variables:
   ```env
   PAYLOAD_S3_BUCKET=your-bucket-name
   PAYLOAD_S3_PREFIX=uploads
   S3_ACCESS_KEY_ID=your-access-key
   S3_SECRET_ACCESS_KEY=your-secret-key
   S3_REGION=your-region
   S3_ENDPOINT=your-s3-endpoint  # Only needed for non-AWS S3
   ```

## CI/CD (GitHub Actions)

The project includes a GitHub Actions workflow for automated testing and deployment:

1. On push to `main` branch:
   - Run tests
   - Lint and type check
   - Build the application
   - Deploy to Vercel (preview)

2. On tag push (v*):
   - Run all tests
   - Build the application
   - Deploy to production

## Monitoring and Logging

### Error Tracking

Set up [Sentry](https://sentry.io/) by adding:

```env
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

### Logging

- Application logs are sent to `stdout`/`stderr`
- Use a log management service (e.g., LogDNA, Papertrail) to collect and analyze logs

## Maintenance

### Backups

1. **Database**: Set up automated backups through your database provider
2. **Media**: If using S3, enable versioning and lifecycle policies
3. **Environment**: Keep a backup of your `.env` file in a secure password manager

### Updates

To update the application:

1. Pull the latest changes:
   ```bash
   git pull origin main
   ```

2. Update dependencies:
   ```bash
   npm install
   ```

3. Rebuild and restart the application:
   ```bash
   npm run build
   # Restart your server process
   ```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify `DATABASE_URI` is correct
   - Check if the database server is running and accessible
   - Verify network/firewall settings

2. **Build Failures**
   - Clear `node_modules` and reinstall dependencies
   - Check for version conflicts in `package.json`
   - Ensure all required environment variables are set

3. **Media Upload Failures**
   - Verify storage provider credentials
   - Check file permissions
   - Ensure CORS is properly configured for S3 buckets

For additional help, please refer to the [Payload CMS documentation](https://payloadcms.com/docs) or open an issue in the repository.
