# Equilibria - Responsive Design Guide

## Overview
Equilibria is built with a mobile-first responsive design approach using Tailwind CSS breakpoints to ensure optimal user experience across all devices.

## Breakpoints

### Mobile First Approach
- **Base (0px+)**: Mobile phones (portrait)
- **sm (640px+)**: Mobile phones (landscape) and small tablets
- **md (768px+)**: Tablets (portrait)
- **lg (1024px+)**: Tablets (landscape) and small laptops
- **xl (1280px+)**: Desktop and large screens

## Responsive Features Implemented

### Navigation
- **Mobile**: Bottom tab navigation with 5 icons
- **Desktop**: Top horizontal navigation with full labels
- **Tablet**: Hybrid approach with condensed labels

### Layout Grids
- **Mobile**: Single column layouts
- **Tablet**: 2-column grids for most content
- **Desktop**: 3-4 column grids for optimal space usage

### Typography
- **Mobile**: Smaller font sizes (text-2xl for headings)
- **Desktop**: Larger font sizes (text-3xl for headings)
- **Responsive**: `text-2xl sm:text-3xl` pattern throughout

### Spacing
- **Mobile**: Tighter spacing (space-y-4, gap-3)
- **Desktop**: More generous spacing (space-y-6, gap-6)
- **Responsive**: `space-y-4 sm:space-y-6` pattern

### Components

#### Dashboard
- **Stats Grid**: 2 columns on mobile, 4 on desktop
- **Quick Actions**: 2x2 grid on mobile, 1x4 on desktop
- **Header**: Stacked layout on mobile, side-by-side on desktop

#### Forms
- **Input Fields**: Full width on mobile, 2-column on tablet+
- **Buttons**: Full width on mobile, inline on desktop
- **Modals**: Responsive padding and sizing

#### Cards
- **Padding**: `p-4 sm:p-6` for responsive spacing
- **Grids**: Adaptive column counts based on screen size

## CSS Classes Used

### Responsive Utilities
```css
/* Grid Systems */
.grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
.grid-cols-2 lg:grid-cols-4

/* Typography */
.text-2xl sm:text-3xl
.text-lg sm:text-xl
.text-sm sm:text-base

/* Spacing */
.space-y-4 sm:space-y-6
.gap-3 sm:gap-6
.p-4 sm:p-6

/* Layout */
.flex-col sm:flex-row
.hidden sm:block
.sm:hidden
```

### Component Responsiveness

#### Navigation
- Desktop: Full labels with icons
- Mobile: Icon-only bottom navigation
- Responsive text: `hidden sm:inline` for labels

#### Forms
- Mobile: Stacked inputs
- Desktop: Side-by-side inputs
- Responsive grids: `grid-cols-1 sm:grid-cols-2`

#### Buttons
- Mobile: Full width buttons
- Desktop: Inline buttons with proper sizing
- Responsive text: `text-sm sm:text-base`

## Testing Breakpoints

### Mobile (320px - 639px)
- iPhone SE, iPhone 12 Mini
- Single column layouts
- Bottom navigation
- Compact spacing

### Tablet (640px - 1023px)
- iPad, Android tablets
- 2-column layouts
- Hybrid navigation
- Medium spacing

### Desktop (1024px+)
- Laptops, desktops
- Multi-column layouts
- Top navigation
- Generous spacing

## Performance Considerations

### Mobile Optimization
- Smaller images and assets
- Touch-friendly button sizes (min 44px)
- Optimized font loading
- Reduced animations on mobile

### Progressive Enhancement
- Core functionality works on all devices
- Enhanced features for larger screens
- Graceful degradation for older browsers

## Accessibility & Responsive Design

### Touch Targets
- Minimum 44px touch targets on mobile
- Adequate spacing between interactive elements
- Hover states for desktop, focus states for all

### Content Hierarchy
- Clear visual hierarchy across all screen sizes
- Consistent navigation patterns
- Readable font sizes on all devices

### Screen Reader Support
- Responsive design doesn't break screen reader navigation
- Proper heading structure maintained across breakpoints
- ARIA labels work consistently across devices

## Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Browsers
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## Future Enhancements

### Advanced Responsive Features
- Container queries for component-level responsiveness
- Dynamic viewport units (dvh, dvw)
- Advanced grid layouts with CSS Grid
- Responsive images with srcset

### Performance Optimizations
- Critical CSS inlining
- Responsive image loading
- Mobile-specific optimizations
- Progressive web app features