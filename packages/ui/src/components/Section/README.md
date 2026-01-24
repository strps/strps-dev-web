# Section Component

The Section component is a flexible layout wrapper that provides consistent styling, spacing, and background options for content blocks throughout the application.

## Features

- **Responsive Container**: Control the width of your content with container options
- **Background Options**: Choose between different background types (none, SVG circles, or image)
- **Nested Backgrounds**: Option to apply backgrounds to the full width or just the content area
- **Custom Class Names**: Add custom CSS classes for additional styling

## Usage

### Basic Implementation

```tsx
import { Section } from '@/components/Section/Section';

const MyComponent = () => (
  <Section
    id="my-section"
    className="custom-class"
    container={true}
    backgroundContainer={false}
    background="none"
  >
    {/* Your content here */}
  </Section>
);
```

### With Background Image

```tsx
<Section
  id="hero"
  background="image"
  backgroundImage={imageData} // Media document or URL
>
  <h1>Hero Section</h1>
  <p>This section has a full-width background image</p>
</Section>
```

## Configuration Options

### Section Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | Unique identifier for the section (used for anchor links) |
| `className` | string | - | Additional CSS classes to apply to the section |
| `container` | boolean | `true` | Whether to constrain content width |
| `backgroundContainer` | boolean | `false` | Apply background to container instead of full width |
| `background` | 'none' \| 'svgCircles' \| 'image' | 'none' | Type of background to apply |
| `backgroundImage` | Media \| string | - | Image to use when background is 'image' |
| `children` | ReactNode | - | Section content |

## Implementation in Payload CMS Blocks

When creating a new block that uses the Section component:

1. Import and use the `SectionConfig` in your block's config:

```tsx
import { SectionConfig } from '@/components/Section/config';

export const MyBlock: Block = {
  slug: 'myBlock',
  fields: [
    // Your block fields
    ...SectionConfig.fields,
  ],
};
```

2. In your block component, destructure the section props and pass them to the Section component:

```tsx
const MyBlockComponent: React.FC<MyBlockProps> = (props) => {
  const { section } = props;
  
  return (
    <Section {...section}>
      {/* Your block content */}
    </Section>
  );
};
```

## Styling

The Section component includes these CSS variables that can be overridden:

```css
:root {
  --section-padding: 2rem; /* Default padding */
  --section-bg-color: transparent; /* Default background color */
  --svg-circle-color: currentColor; /* Color for SVG circle backgrounds */
}
```

## Best Practices

- Always provide a unique `id` for sections that need to be linked to
- Use the `container` prop to control content width
- For full-width backgrounds, set `backgroundContainer={false}`
- When using background images, ensure they're optimized for web
- Keep section nesting to a minimum for better performance
