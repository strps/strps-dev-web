# STRPS Website

A modern, performance-optimized website built with Next.js and PayloadCMS. The site features a beautiful design, seamless UI interactions, and robust content management capabilities.

## Features

- **Next.js App Router Architecture** - Built using the latest Next.js App Router for optimal performance and SEO
- **PayloadCMS Backend** - Enterprise-grade headless CMS for content management
- **Design System** - Uses Tailwind CSS and shadcn/ui components for a consistent design language
- **Form Builder** - Advanced form builder with reCAPTCHA integration for spam protection
- **Responsive Design** - Fully responsive across all device sizes
- **Dark Mode Support** - Seamless light/dark mode switching
- **Publication Workflow** - Complete publication workflow for content creation and approval
- **Custom Block-Based Content** - Flexible page building using custom content blocks

## Project Structure

```
├── src/
│   ├── app/             # Next.js App Router files
│   ├── blocks/          # Custom content blocks
│   │   ├── StrpsForm/   # Form block with reCAPTCHA
│   │   ├── StrpsHero/   # Hero section block
│   │   └── StrpsSkills/ # Skills showcase block
│   ├── collections/     # PayloadCMS collections
│   ├── components/      # React components
│   │   └── ui/          # UI component library (shadcn)
│   ├── plugins/         # PayloadCMS plugins
│   ├── utilities/       # Helper functions
│   └── payload.config.ts # PayloadCMS configuration
└── public/              # Static assets
```

## Custom Blocks

### StrpsForm

The form block includes:

- Client-side validation using React Hook Form
- Server-side reCAPTCHA verification to prevent spam
- Customizable confirmation messages and redirects
- Multiple introduction styles (rich text, title/text, or none)
- Form field customization in the admin panel

### StrpsHero

A hero section component with:

- Customizable title and text
- Optional call-to-action links
- SVG background elements
- Responsive design for all screen sizes

### StrpsSkills

A skills showcase component with:

- Grouped skills presentation
- Custom styling options
- Card-based layout for organized display

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Vercel account (for deployment)

### Environment Variables

The following environment variables need to be set:

```
# Database connection string
POSTGRES_URL=postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require

# Used to encrypt JWT tokens
PAYLOAD_SECRET=your_secret_here

# Used to configure CORS, format links and more. No trailing slash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Secret used to authenticate cron jobs
CRON_SECRET=your_cron_secret_here

# Used to validate preview requests
PREVIEW_SECRET=your_preview_secret_here

# Email integration with Resend
RESEND_API_KEY=your_resend_api_key
RESEND_DEFAULT_FROM_ADDRESS=site@example.com
RESEND_DEFAULT_FROM_NAME=SITE_NAME

# reCAPTCHA integration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Security Features

### Form Security

All forms implement server-side reCAPTCHA verification to protect against spam and abuse:

1. Client-side: Token generation when user submits a form
2. Server-side: Token verification before processing form submission
3. Configuration through PayloadCMS admin panel

### Authentication Security

- HTTP-only cookies for secure authentication
- Token-based password reset flow
- Rate limiting on authentication attempts
- Role-based access control

## Deployment

### Prerequisites

- Vercel account
- Neon (PostgreSQL) database
- Vercel Blob Storage for media files
- reCAPTCHA site key and secret key

### Deployment Steps

1. Configure environment variables in Vercel project settings
2. Connect your GitHub repository to Vercel
3. Deploy with the following settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

