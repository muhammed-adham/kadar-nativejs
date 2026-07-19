# Kader Factory Website - Vanilla JavaScript Conversion

## Overview

This is a complete conversion of the React-based Kader Factory website into a vanilla HTML, CSS, and JavaScript implementation. The website maintains all functionality from the original React application while using only standard web technologies.

## Files

### 1. **index.html** (5.9 KB)
The main HTML file containing:
- Navigation header with responsive mobile menu
- Search modal
- Page container for dynamic content
- Footer placeholder
- Modal for images and videos
- Bootstrap 5 and Font Awesome integration

### 2. **style.css** (16 KB)
Comprehensive stylesheet featuring:
- CSS custom properties (variables) for theming
- Dark/Light mode support
- Responsive design with mobile-first approach
- Component-specific styles:
  - Navigation and header
  - Carousel/slider
  - Cards and service items
  - Forms and buttons
  - Counters
  - Footer
- Animations (fadeInUp, fadeInLeft, zoomIn, etc.)
- Print styles

### 3. **script.js** (48 KB)
Complete JavaScript application with:
- Global state management (appState object)
- Navigation system with multilingual support
- Language switching (English/Arabic)
- Theme switching (Light/Dark mode)
- Page routing without external libraries
- Dynamic content generation
- Event listeners and interactions

## Features Implemented

### ✅ Navigation & Routing
- Single-page application (SPA) navigation
- No page reloads
- Active link highlighting
- Dropdown menus

### ✅ Multi-Language Support
- English and Arabic
- Dynamic text switching
- Direction-aware layout (LTR/RTL)
- Language persistence in localStorage

### ✅ Theme System
- Light and Dark modes
- Persistent theme selection
- Logo switching based on theme
- CSS variables for easy customization

### ✅ Responsive Design
- Mobile-first approach
- Tablet breakpoint (768px)
- Desktop optimization
- Hamburger menu on mobile

### ✅ Pages Included
1. **Home** - Main page with slider, products, news, projects
2. **About** - Company information with counters
3. **Products** - Product listing with categories
4. **Projects** - Project showcase
5. **News** - News and updates
6. **Videos** - Video gallery
7. **Contact** - Contact form and information

### ✅ Components
- Header/Navigation with search
- Carousel/Slider with auto-play
- Product/Service cards
- Counter section
- Footer with social links
- Contact form
- Breadcrumb navigation
- Modal dialogs

## How to Use

### Basic Setup
1. Create a project folder
2. Add the three files:
   - `index.html`
   - `style.css`
   - `script.js`

3. Create an `images` folder for your images:
   ```
   /images/
   ├── logo-kader.png
   ├── logo-kader-white.png
   ├── about.webp
   ├── b-1.jpg to b-8.jpg
   ├── prd-1.webp to prd-7.webp
   ├── news-1.webp to news-9.webp
   ├── pro-1.jpg to pro-6.jpg
   └── sprd-1.webp to sprd-5.webp
   ```

4. Open `index.html` in your browser

### Navigation
```javascript
// Change page programmatically
setCurrentPage('about');
setCurrentPage('products');
setCurrentPage('contact');

// Toggle theme
toggleTheme();

// Toggle language
toggleLanguage();
```

### Customization

#### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary: #0091db;
    --secondary: #1e1e2e;
    --light: #f8f9fa;
    --dark: #2c2c3c;
}
```

#### Add New Pages
1. Add page div in HTML:
```html
<div class="page" id="new-page" style="display: none;">
    <div id="newPageContent"></div>
</div>
```

2. Add page loader function in `script.js`:
```javascript
function loadNewPage() {
    const container = document.getElementById('newPageContent');
    container.innerHTML = `<h1>New Page Content</h1>`;
}
```

3. Add to switch case in `loadPageContent()`:
```javascript
case 'new-page':
    loadNewPage();
    break;
```

#### Modify Navigation Links
Edit `navigationLinks` array in `script.js`:
```javascript
const navigationLinks = [
    { 
        id: 'your-page', 
        label_en: 'Your Page', 
        label_ar: 'صفحتك',
        path: '#your-page' 
    },
    // ... more links
];
```

## Architecture

### State Management
Global state object manages:
```javascript
const appState = {
    currentPage: 'home',
    direction: 'ltr',      // or 'rtl'
    language: 'en',        // or 'ar'
    theme: 'light',        // or 'dark'
    currentSlide: 0,
    selectedCategory: '',
};
```

### Function Organization
- **Initialization**: `initializeApp()`, `initializeNavigation()`, etc.
- **Content Loading**: `loadPageContent()`, `loadAboutPage()`, etc.
- **Utilities**: `getText()`, `getLabel()`, `getDirectionClass()`, etc.
- **Event Handlers**: `toggleTheme()`, `toggleLanguage()`, `setCurrentPage()`, etc.

### Data Structure
- **Navigation Data**: `navigationLinks` array
- **Slider Data**: `sliderData` object with language variants
- **Product Data**: `productsData` object with language variants

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- **Minimal Bundle Size**: ~70 KB total (including CSS)
- **No External Dependencies**: Only Bootstrap for grid/utilities
- **Fast Load Time**: Instant page transitions
- **Optimized Images**: Webp format recommended

## Accessibility

- Semantic HTML5 structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Mobile touch-friendly buttons

## SEO Optimization

- Meta tags support ready
- Semantic HTML structure
- Proper heading hierarchy
- Alt text on images (configurable)
- Open Graph meta tags ready

## Troubleshooting

### Images Not Showing
- Ensure image paths are correct
- Check that `/images/` folder exists
- Verify image file names match

### Navigation Not Working
- Clear browser cache
- Check console for JavaScript errors
- Verify Bootstrap 5 is loaded

### Language Not Switching
- Check localStorage permissions
- Verify language codes in data (en/ar)
- Clear browser cache and localStorage

### Styling Issues
- Verify `style.css` is linked correctly
- Check for CSS conflicts
- Inspect element in DevTools

## Dark Mode Notes

The dark mode implementation uses CSS variables for seamless switching. All colors automatically adapt when theme changes.

## Mobile Optimization

- Responsive breakpoints at 576px, 768px
- Touch-friendly navigation (hamburger menu)
- Optimized image sizes
- Readable font sizes on mobile

## Future Enhancements

Consider adding:
- Service Worker for offline support
- Local caching with IndexedDB
- Search functionality
- User authentication
- Shopping cart (if e-commerce)
- Analytics integration
- Progressive Web App (PWA) features

## License

© 2025 Kader Factory. All rights reserved.

## Support

For issues or customization needs:
- Email: marketing@kader-factory.com
- Phone: +2010 3000 9248

---

**Last Updated**: April 2025
**Version**: 1.0
**Framework**: Vanilla JavaScript (No Dependencies)
# kadar-nativejs
