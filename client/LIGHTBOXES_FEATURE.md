# Lightboxes Feature for News Detail Page

## Overview
The lightboxes feature allows users to view multiple images in a news article by clicking on thumbnail images below the main hero section. When a lightbox is clicked, that image becomes the main image displayed in the hero section.

## Features

### 🖼️ **Interactive Image Gallery**
- **Main Hero Image**: Large featured image at the top
- **Lightboxes Grid**: Thumbnail images below the hero section
- **Click to Switch**: Click any lightbox to make it the main image
- **Active State**: Current main image is highlighted with blue border

### 🎨 **Visual Design**
- **Black Placeholders**: When no real images are uploaded, lightboxes appear as black boxes with numbers
- **Real Images**: When images are available, lightboxes show actual image thumbnails
- **Hover Effects**: Smooth animations and visual feedback
- **Responsive Grid**: Adapts to different screen sizes

### 📱 **Responsive Behavior**
- **Desktop**: 4-column grid with 120px minimum width
- **Tablet**: 3-column grid with 100px minimum width  
- **Mobile**: 2-column grid with 80px minimum width
- **Small Mobile**: Single column with 70px minimum width

## How It Works

### 1. **Image Display Logic**
```javascript
// If real images exist in database, use them
// Otherwise, show dummy images for testing
images: result.data.image_url ? 
  result.data.image_url.split(',').map(url => url.trim()).filter(url => url) : 
  [dummy_image_urls]
```

### 2. **Lightbox Rendering**
```javascript
{image && image.startsWith('http') ? (
  // Show actual image thumbnail
  <img src={image} alt="..." className="lightbox-image" />
) : (
  // Show black placeholder with number
  <div className="lightbox-placeholder">
    <span className="image-number">{index + 1}</span>
  </div>
)}
```

### 3. **Click Handler**
```javascript
onClick={() => setCurrentImageIndex(index)}
// Updates the main hero image when lightbox is clicked
```

## Usage Instructions

### For Users
1. **Navigate** to any news article with multiple images
2. **View** the main image in the hero section
3. **Scroll down** to see the lightboxes section
4. **Click** any lightbox to switch the main image
5. **Navigate** between images using arrow buttons in the hero section

### For Developers
1. **Database**: Store multiple image URLs as comma-separated values
2. **Format**: `"image1.jpg,image2.jpg,image3.jpg"`
3. **Testing**: Dummy images are provided when no real images exist
4. **Removal**: Remove dummy images once real images are uploaded

## CSS Classes

### Main Container
- `.lightboxes-section`: Section wrapper with background
- `.lightboxes-container`: Content container with title
- `.lightboxes-grid`: CSS Grid for thumbnail layout

### Individual Lightboxes
- `.lightbox`: Individual lightbox container
- `.lightbox.active`: Currently selected lightbox
- `.lightbox-placeholder`: Black placeholder box
- `.lightbox-image`: Actual image thumbnail
- `.image-number`: Number displayed in placeholder

## Responsive Breakpoints

```css
/* Desktop */
.lightboxes-grid {
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

/* Tablet (768px) */
@media (max-width: 768px) {
  .lightboxes-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}

/* Mobile (600px) */
@media (max-width: 600px) {
  .lightboxes-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
}

/* Small Mobile (480px) */
@media (max-width: 480px) {
  .lightboxes-grid {
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  }
}
```

## Future Enhancements

- **Image Lazy Loading**: Load thumbnails only when needed
- **Zoom Functionality**: Click to enlarge images
- **Swipe Support**: Touch gestures for mobile
- **Keyboard Navigation**: Arrow key support
- **Fullscreen Mode**: Expand images to full screen

## Testing

### Current State
- **Dummy Images**: 4 test images from Unsplash
- **Functionality**: Click lightboxes to switch main image
- **Responsive**: Test on different screen sizes

### To Test
1. Navigate to `/news`
2. Click "Read More" on any article
3. Scroll down to lightboxes section
4. Click different lightboxes
5. Verify main image changes
6. Test responsive design

## Notes

- **Temporary**: Dummy images are for testing only
- **Production**: Remove dummy images when real images are uploaded
- **Performance**: Images are loaded eagerly (consider lazy loading for production)
- **Accessibility**: Ensure proper alt text for all images

