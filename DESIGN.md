---
name: Sushi Burger Experience
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e9bcb5'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#b08781'
  outline-variant: '#5f3f3a'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690000'
  primary-container: '#e60000'
  on-primary-container: '#fff7f5'
  inverse-primary: '#c00000'
  secondary: '#ffecc0'
  on-secondary: '#3d2f00'
  secondary-container: '#fecb00'
  on-secondary-container: '#6e5700'
  tertiary: '#b2c5ff'
  on-tertiary: '#002c72'
  tertiary-container: '#0068f9'
  on-tertiary-container: '#f8f7ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#ffe08b'
  secondary-fixed-dim: '#f1c100'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'
  tertiary-fixed: '#dae2ff'
  tertiary-fixed-dim: '#b2c5ff'
  on-tertiary-fixed: '#001847'
  on-tertiary-fixed-variant: '#0040a0'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style

This design system embodies a fusion of minimalist Japanese precision and the high-energy, bold nature of urban burger culture. It is designed for a premium, tech-savvy audience that appreciates culinary innovation and high-end aesthetics. The personality is confident, nocturnal, and exclusive.

The visual style is **High-Contrast / Bold** with an emphasis on **Minimalism**. It leverages a "refactored e-commerce" approach, stripping away cluttered UI elements to let hyper-realistic food photography take center stage. The use of a deep black canvas combined with vibrant red accents creates a cinematic feel, while subtle neon glows provide a futuristic, "cyber-Tokyo" edge.

## Colors

The palette is rooted in a pure **Deep Black (#000000)** foundation to maximize contrast and focus. **Vibrant Red (#E60000)** serves as the primary action color, used for critical touchpoints, CTAs, and price points, symbolizing both the heat of the kitchen and the traditional red of Japanese lacquer. 

**Crisp White (#FFFFFF)** is reserved for high-readability typography. A secondary **Gold (#FFCC00)** is used sparingly for loyalty tiers, ratings, or premium badges, adding a layer of high-end prestige without distracting from the primary red-and-black narrative.

## Typography

The typography system uses **Space Grotesk** for headlines to echo the technical, geometric, and bold nature of the brand's logo. It provides a modern, slightly futuristic edge that fits the "experience" aspect of the product. Headlines should utilize tight letter spacing to maintain a compact, impactful look.

For body text and functional UI elements, **Plus Jakarta Sans** offers a warm yet clean counter-balance. Its high legibility ensures that ingredient lists and descriptions are easily digestible against the dark background. Labels use an uppercase styling with bold weights to maintain a hierarchy that feels structured and intentional.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop to ensure a curated, editorial feel, while transitioning to a fluid model for mobile devices. The rhythm is based on an 8px base unit to ensure mathematical harmony across all components.

Layouts should favor generous vertical "section-gaps" to create a sense of luxury and breathing room. Horizontal gutters are kept wide at 24px to prevent the UI from feeling cramped. Photography should often break the grid or bleed to the edges to create a more immersive, "full-screen" experience.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Subtle Red Glows** rather than traditional drop shadows. Because the background is absolute black, elevation is indicated by shifting surfaces to a dark charcoal (#1A1A1A).

- **Level 1:** Flat background (#000000).
- **Level 2:** Raised cards or containers (#1A1A1A) with a 1px low-contrast border (#333333).
- **Interactive States:** Primary buttons and featured product cards utilize a soft, outer "neon" glow in the primary red (#E60000) with a high blur radius and low opacity (15-20%) to simulate a light source in a dark environment.

## Shapes

The shape language is defined as **Rounded**, striking a balance between the organic nature of food and the geometric precision of the typography. 

Standard components like buttons and input fields use a 0.5rem (8px) radius. Larger containers, such as product cards or modals, use 1rem (16px) or 1.5rem (24px) to create a softer, more premium feel. This prevents the dark UI from feeling too aggressive or "industrial," keeping it approachable and appetizing.

## Components

### Buttons
Primary buttons are solid Vibrant Red with white text, utilizing a bold weight from the label font. Hover states should trigger a subtle red outer glow. Secondary buttons use a transparent background with a 1.5px white or red border.

### Cards
Product cards feature edge-to-edge photography at the top with a subtle gradient overlay at the bottom to ensure white text readability. The container background is a slightly elevated charcoal to separate it from the main page.

### Chips & Tags
Used for dietary info (e.g., "Gluten Free"). These are small, uppercase labels with a subtle border. For highlight tags, use a black background with a thin red border and red text.

### Input Fields
Inputs are dark with a bottom-only border or a very subtle ghost-border. When focused, the border turns red and gains a faint glow to guide the user's attention.

### Navigation
The navigation bar is persistent and utilizes a heavy backdrop-blur (glassmorphism) when scrolling over content, maintaining a high-end, modern aesthetic. Items are spaced widely to mirror the minimalist Japanese influence.