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
- **Schema**:
  - [x] Basic fields
  - [ ] Variant support
  - [ ] Validation rules
- **Component**:
  - [x] Basic rendering
  - [ ] Animation support
  - [ ] Accessibility features
- **Variants**:
  - [ ] Classic Centered CTA
  - [ ] Split Layout with Image
  - [ ] Video Background
  - [ ] With Stats or Highlights
  - [ ] With Form

### StrpsAbout (`src/blocks/StrpsAbout`)
- **Description**: About section with content and image
- **Status**: In Progress
- **Variants**:
  - [x] Story blocks
  - [ ] Adjacent Image
- **Schema**:
  - [x] Basic fields
  - [ ] Image configuration
  - [ ] Content validation
- **Component**:
  - [x] Basic rendering
  - [ ] Responsive layout
  - [ ] Image optimization

### StrpsAboutUs (`src/blocks/StrpsAboutUs`)
- **Description**: Company information, mission, vision, and values
- **Status**: In Progress
- **Components**:
  - `Component.tsx` - Main component that composes all subcomponents
  - `MissionAndVision.tsx` - Handles display of mission and vision statements
  - `Values.tsx` - Displays core values in a responsive grid
  - `CompanyInformation.tsx` - Shows company timeline and leadership team
- **Features**:
  - [x] Mission statement
  - [x] Vision statement
  - [x] Core values grid
  - [x] Company history/timeline
  - [x] Leadership team cards
- **Schema**:
  - [x] Mission/vision fields
  - [x] Timeline entries
  - [x] Team member profiles
  - [x] Core values configuration
- **Implementation**:
  - [x] Responsive layout
  - [x] Component separation
  - [ ] Accessibility testing
  - [ ] Unit tests
  - [ ] Storybook stories

### StrpsServices (`src/blocks/StrpsServices`)
- **Description**: Displays services or solutions offered
- **Status**: Not Started
- **Features**:
  - [ ] Service cards with icons
  - [ ] Service categories
  - [ ] Detailed service descriptions
  - [ ] CTA to service pages
- **Schema**:
  - [ ] Service items array
  - [ ] Icon selection
  - [ ] Category filtering

### StrpsClients (`src/blocks/StrpsClients`)
- **Description**: Showcases client logos and testimonials
- **Status**: Not Started
- **Features**:
  - [ ] Client logo grid/carousel
  - [ ] Testimonial cards
  - [ ] Client categorization
  - [ ] Filtering options
- **Schema**:
  - [ ] Client entries
  - [ ] Logo uploads
  - [ ] Testimonial content

### StrpsBlog (`src/blocks/StrpsBlog`)
- **Description**: Displays blog posts and articles
- **Status**: Not Started
- **Features**:
  - [ ] Latest posts grid/list
  - [ ] Categories and tags
  - [ ] Featured post highlighting
  - [ ] Read more links
- **Schema**:
  - [ ] Post selection
  - [ ] Display options
  - [ ] Pagination settings

### StrpsStats (`src/blocks/StrpsStats`)
- **Description**: Animated statistics and metrics
- **Status**: Not Started
- **Features**:
  - [ ] Animated counters
  - [ ] Icon or image support
  - [ ] Responsive layout
  - [ ] Custom animation options
- **Schema**:
  - [ ] Stat items
  - [ ] Animation settings
  - [ ] Display options

### StrpsMedia (`src/blocks/StrpsMedia`)
- **Description**: Media gallery with lightbox
- **Status**: Not Started
- **Features**:
  - [ ] Grid/masonry layout
  - [ ] Lightbox viewer
  - [ ] Image/video support
  - [ ] Filtering by category
- **Schema**:
  - [ ] Media items
  - [ ] Layout options
  - [ ] Category system

### StrpsCareers (`src/blocks/StrpsCareers`)
- **Description**: Job openings and company culture
- **Status**: Not Started
- **Features**:
  - [ ] Job listings
  - [ ] Application form
  - [ ] Company culture highlights
  - [ ] Benefits information
- **Schema**:
  - [ ] Job postings
  - [ ] Application fields
  - [ ] Department filtering

### StrpsContact (`src/blocks/StrpsContact`)
- **Description**: Contact information and form
- **Status**: In Progress
- **Features**:
  - [x] Basic contact form
  - [ ] Interactive map
  - [ ] Business hours
  - [ ] Multiple locations
- **Schema**:
  - [ ] Contact fields
  - [ ] Map settings
  - [ ] Office locations

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
