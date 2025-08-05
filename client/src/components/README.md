# Components

This directory contains reusable React components for the Hawassa Youth Mekerbet application.

## Structure

```
components/
├── navbar/
│   ├── Navbar.jsx
│   └── Navbar.css
├── footer/
│   ├── Footer.jsx
│   └── Footer.css
└── index.js
```

## Components

### Navbar
- **File**: `navbar/Navbar.jsx`
- **CSS**: `navbar/Navbar.css`
- **Description**: Navigation bar component with logo and menu links
- **Features**: 
  - Fixed positioning
  - Glassmorphism effect
  - Responsive design
  - Smooth hover animations

### Footer
- **File**: `footer/Footer.jsx`
- **CSS**: `footer/Footer.css`
- **Description**: Footer component with contact information and social links
- **Features**:
  - Gradient background
  - Contact information
  - Quick links
  - Social media links
  - Responsive grid layout

## Usage

```jsx
import { Navbar, Footer } from '../components';

function MyPage() {
  return (
    <div>
      <Navbar />
      {/* Your page content */}
      <Footer />
    </div>
  );
}
```

## Adding New Components

When adding new components:
1. Create a new folder in `components/` with the component name
2. Include both `.jsx` and `.css` files
3. Export the component from `index.js`
4. Update this README with component documentation 