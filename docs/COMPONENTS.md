# Component Development Documentation

## Overview

This document tracks the development status of all components and blocks in the STRPS website, following the block-based architecture defined in [creating-blocks.md](./creating-blocks.md).

## Block Development Guidelines

### Required Files

Each block must include:
- `schema.ts`: Payload block configuration
- `Component.tsx`: React component
- `types.ts`: TypeScript types
- `index.ts`: Exports

### Naming Conventions
- Use PascalCase for component and type names
- Use camelCase for file names (except for components which should be PascalCase)
- Use kebab-case for CSS classes

## Block Completion Checklist

### Schema
- [ ] Unique `slug` defined
- [ ] Clear labels and descriptions
- [ ] Proper field types and validation
- [ ] Default values where appropriate
- [ ] Proper TypeScript interfaces
- [ ] Proper error handling

### Component
- [ ] Responsive design
- [ ] Accessible markup (ARIA, keyboard nav, etc.)
- [ ] Error boundaries for data loading
- [ ] Loading states
- [ ] Proper TypeScript types
- [ ] Proper error handling
- [ ] Proper documentation

### Styling
- [ ] Uses Tailwind CSS for styling
- [ ] Consistent with design system
- [ ] Responsive design
- [ ] Dark mode support
- [ ] CSS variables for theme-specific values

### Testing
- [ ] Unit tests for component logic
- [ ] Storybook story for visual testing
- [ ] Responsive testing
- [ ] Cross-browser testing
- [ ] Accessibility testing

## Core Components

### Section (`src/components/Section`)
- **Description**: Layout wrapper for consistent section styling
- **Status**: In Progress
- **Implementation**:
  - [x] Basic section layout
  - [ ] Responsive behavior
  - [ ] Theme support
  - [ ] Documentation
- **Testing**:
  - [ ] Unit tests
  - [ ] Visual regression tests

### Header (`src/components/Header`)
- **Description**: Main site header with navigation
- **Status**: In Progress
- **Implementation**:
  - [x] Basic navigation
  - [ ] Mobile menu
  - [ ] Authentication state
  - [ ] Documentation
- **Testing**:
  - [ ] Unit tests
  - [ ] Responsive testing

### Footer (`src/components/Footer`)
- **Description**: Site footer with links and information
- **Status**: Planned
- **Implementation**:
  - [ ] Basic footer layout
  - [ ] Responsive behavior
  - [ ] Theme support
  - [ ] Documentation
- **Testing**:
  - [ ] Unit tests
  - [ ] Visual regression tests

### Media (`src/components/Media`)
- **Description**: Handles display of images and videos
- **Status**: Complete
- **Implementation**:
  - [x] Basic media rendering
  - [x] Responsive behavior
  - [x] Theme support
  - [x] Documentation
- **Testing**:
  - [x] Unit tests
  - [x] Visual regression tests

## Block Components

### StrpsHero (`src/blocks/StrpsHero`)
- **Description**: Hero section with title, text, and CTA
- **Status**: In Progress
- **Features**:
  - [x] Basic rendering with title and description
  - [x] Call-to-action buttons
  - [ ] Background image/video support
  - [ ] Animation options
- **Schema**:
  - [x] Title and description fields
  - [x] CTA configuration
  - [ ] Background media options
  - [ ] Animation settings

### StrpsAbout (`src/blocks/StrpsAbout`)
- **Description**: About section with content and image
- **Status**: In Progress
- **Features**:
  - [x] Basic content with image
  - [x] Multiple layout options
  - [ ] Team member integration
  - [ ] Stats counter
- **Schema**:
  - [x] Content and image fields
  - [x] Layout configuration
  - [ ] Team member references

### StrpsAboutUs (`src/blocks/StrpsAboutUs`)
- **Description**: Comprehensive company information section
- **Status**: In Progress
- **Features**:
  - [x] Mission and vision statements
  - [x] Core values display
  - [x] Company timeline
  - [x] Leadership team section
- **Schema**:
  - [x] Mission/vision fields
  - [x] Timeline entries
  - [x] Team member profiles
  - [x] Core values configuration

### StrpsServices (`src/blocks/StrpsServices`)
- **Description**: Displays services or solutions offered
- **Status**: In Progress
- **Features**:
  - [x] Service cards with icons
  - [x] Service categories
  - [x] Detailed service descriptions
  - [x] CTA to service pages
- **Schema**:
  - [x] Service items array
  - [x] Icon selection
  - [x] Category filtering
  - [x] Link configuration

### StrpsClients (`src/blocks/StrpsClients`)
- **Description**: Showcases client logos and testimonials
- **Status**: In Progress
- **Features**:
  - [x] Client logo grid
  - [x] Testimonial cards
  - [ ] Client categorization
  - [ ] Filtering options
- **Schema**:
  - [x] Client entries
  - [x] Logo uploads
  - [x] Testimonial content

### StrpsBlog (`src/blocks/StrpsBlog`)
- **Description**: Displays blog posts and articles
- **Status**: In Progress
- **Features**:
  - [x] Latest posts grid/list
  - [x] Categories and tags
  - [ ] Featured post highlighting
  - [ ] Read more links
- **Schema**:
  - [x] Post selection
  - [x] Display options
  - [ ] Sorting and filtering

### StrpsStats (`src/blocks/StrpsStats`)
- **Description**: Displays statistics and metrics
- **Status**: In Progress
- **Features**:
  - [x] Animated counters
  - [x] Icon support
  - [x] Customizable layout
  - [ ] Progress bars
- **Schema**:
  - [x] Stat items
  - [x] Animation settings
  - [x] Layout options

### StrpsContact (`src/blocks/StrpsContact`)
- **Description**: Contact information and form
- **Status**: In Progress
- **Features**:
  - [x] Contact form
  - [x] Contact information
  - [ ] Map integration
  - [ ] Business hours
- **Schema**:
  - [x] Form fields
  - [x] Contact details
  - [ ] Map settings

### StrpsForm (`src/blocks/StrpsForm`)
- **Description**: Customizable form builder
- **Status**: In Progress
- **Features**:
  - [x] Multiple field types
  - [x] Form validation
  - [x] reCAPTCHA support
  - [ ] File uploads
- **Schema**:
  - [x] Field configuration
  - [x] Validation rules
  - [x] reCAPTCHA settings

### StrpsMedia (`src/blocks/StrpsMedia`)
- **Description**: Media gallery with lightbox
- **Status**: In Progress
- **Features**:
  - [x] Image gallery
  - [ ] Video support
  - [ ] Lightbox functionality
  - [ ] Grid/masonry layouts
- **Schema**:
  - [x] Media items
  - [ ] Display options
  - [ ] Lightbox settings

### StrpsSkills (`src/blocks/StrpsSkills`)
- **Description**: Skills and expertise visualization
- **Status**: In Progress
- **Features**:
  - [x] Progress bars
  - [x] Icons and labels
  - [ ] Animated transitions
  - [ ] Skill categories
- **Schema**:
  - [x] Skill items
  - [x] Progress values
  - [ ] Category grouping

### StrpsCareers (`src/blocks/StrpsCareers`)
- **Description**: Job listings and career opportunities
- **Status**: In Progress
- **Features**:
  - [x] Job listings
  - [x] Job details
  - [ ] Application form
  - [ ] Department filtering
- **Schema**:
  - [x] Job postings
  - [x] Department structure
  - [ ] Application settings

### StrpsNewsletter (`src/blocks/StrpsNewsletter`)
- **Description**: Email newsletter signup form
- **Status**: Not Started
- **Features**:
  - [ ] Email input
  - [ ] Subscription options
  - [ ] Success/error states
  - [ ] Integration with email service
- **Schema**:
  - [ ] Form fields
  - [ ] List options
  - [ ] Success message

### StrpsForm (`src/blocks/StrpsForm`)
- **Description**: Form component with validation
- **Status**: In Progress
- **Features**:
  - [x] Client-side validation
  - [x] reCAPTCHA integration
  - [ ] Form submission handling
  - [ ] Error states
  - [ ] Success states
- **Fields**:
  - [ ] Text/Textarea
  - [ ] Email
  - [ ] Select
  - [ ] Checkbox
  - [ ] File upload

### StrpsSkills (`src/blocks/StrpsSkills`)
- **Description**: Skills section with progress indicators
- **Status**: In Progress
- **Features**:
  - [x] Skill groups
  - [ ] Progress animations
  - [ ] Interactive elements
  - [ ] Responsive layout

### MediaBlock (`src/blocks/MediaBlock`)
- **Description**: Media display component
- **Status**: Complete
- **Features**:
  - [x] Basic media rendering
  - [x] Responsive behavior
  - [x] Theme support
- **Fields**:
  - [ ] Image
  - [ ] Video

### CodeBlock (`src/blocks/CodeBlock`)
- **Description**: Code display with syntax highlighting
- **Status**: Complete
- **Features**:
  - [x] Basic code rendering
  - [x] Syntax highlighting
  - [x] Responsive behavior
- **Fields**:
  - [ ] Code snippet
  - [ ] Language

### ContentBlock (`src/blocks/ContentBlock`)
- **Description**: Flexible content layout component
- **Status**: In Progress
- **Features**:
  - [x] Basic content rendering
  - [ ] Responsive layout
  - [ ] Image optimization
- **Fields**:
  - [ ] Text/Textarea
  - [ ] Image
  - [ ] Video

### CallToAction (`src/blocks/CallToAction`)
- **Description**: Call to action section
- **Status**: Planned
- **Features**:
  - [ ] Basic call to action rendering
  - [ ] Responsive behavior
  - [ ] Theme support
- **Fields**:
  - [ ] Text/Textarea
  - [ ] Button text
  - [ ] Button link

### ProjectsArchiveBlock (`src/blocks/ProjectsArchiveBlock`)
- **Description**: Displays a grid of projects
- **Status**: In Progress
- **Features**:
  - [x] Basic project grid rendering
  - [ ] Responsive behavior
  - [ ] Theme support
- **Fields**:
  - [ ] Project title
  - [ ] Project description
  - [ ] Project image

## UI Components

### Cards (`src/components/Cards`)
- **ArchiveCard**: Card for displaying archive items
- **ProjectCard**: Card for project thumbnails
- **SkillsCard**: Card for skills display

### Form Elements (`src/blocks/StrpsForm`)
- **Checkbox**: Custom checkbox input
- **Select**: Custom select dropdown
- **Text/Textarea**: Text input fields
- **Email**: Email input with validation
- **Country/State**: Location selectors

## Status Legend
- Complete
- In Progress
- Not Started

## Next Steps
1. Complete component implementations following the block structure
2. Ensure proper TypeScript typing throughout
3. Implement responsive design for all components
4. Add comprehensive accessibility features
5. Write unit and integration tests
6. Create Storybook stories for visual testing
7. Perform cross-browser and device testing
8. Document usage examples and API references
