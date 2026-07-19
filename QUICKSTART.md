# Quick Start Guide - Kader Factory Website

## 🚀 Getting Started in 5 Minutes

### Step 1: Download Files
Download these 3 files:
- `index.html`
- `style.css`
- `script.js`

### Step 2: Create Folder Structure
```
kader-website/
├── index.html
├── style.css
├── script.js
└── images/
    ├── logo-kader.png
    ├── logo-kader-white.png
    ├── about.webp
    ├── b-1.jpg
    ├── b-2.jpg
    ├── b-5.jpg
    ├── b-7.jpg
    ├── news-1.webp
    ├── prd-1.webp to prd-7.webp
    ├── pro-1.jpg to pro-6.jpg
    └── ... (more images)
```

### Step 3: Add Images
Place all your images in the `images` folder. Recommended image dimensions:
- Logo: 100-120px height
- Banner images: 1920×500px
- Product images: 400×300px
- Project images: 400×400px

### Step 4: Open in Browser
Double-click `index.html` or open it with your browser.

## 🎨 Basic Customization

### Change Site Title
In `index.html`, line 4:
```html
<title>Your Site Name - Advanced Industries</title>
```

### Change Primary Color
In `style.css`, find the `:root` section:
```css
--primary: #0091db;  /* Change this */
```

Common colors:
- Blue: `#0091db`
- Green: `#28a745`
- Red: `#dc3545`
- Purple: `#6f42c1`

### Add Your Company Info
In `script.js`, find the footer section and update:
```javascript
// Change phone number
<a href="tel:+201030009248">
// Change email
<a href="mailto:your@email.com">
// Change address
2 El Tayaran St, Nasr City
```

## 📱 Pages Overview

### Home Page
- Auto-scrolling carousel
- About section
- Featured products
- Latest news
- Projects showcase

### About Page
- Company information
- Years of experience
- Contact info
- Statistics

### Products Page
- Product listings
- Category filtering
- Product details

### Contact Page
- Contact form
- Location map
- Business hours
- Phone/Email

### News Page
- News articles
- Latest updates
- Read more functionality

### Videos Page
- YouTube video gallery
- Multiple videos

## 🌍 Language Support

The site supports English and Arabic:
- Click the language toggle (EN/ع) in header
- Automatic text translation
- Right-to-left (RTL) layout for Arabic
- Persistent language selection

Current translations are in `script.js`:
```javascript
getLabel('English Text', 'النص العربي')
```

## 🌓 Dark Mode

Features automatic dark mode:
- Click theme toggle in navigation
- Persists user preference
- Auto-adjusts logo
- All colors adapt automatically

## 📞 Contact Information to Update

Search for these in `script.js` and update:

1. **Phone Number**
   ```
   +2010 3000 9248
   ```

2. **Email**
   ```
   marketing@kader-factory.com
   ```

3. **Address**
   ```
   2 El Tayaran St, Al Golf, Nasr City
   ```

4. **Social Links**
   - Facebook: `https://www.facebook.com/kader.factory.eg/`
   - YouTube: `https://www.youtube.com/@kaderfactory8960`
   - Instagram: `https://www.instagram.com/kader_factory_official/`

## ✏️ Editing Content

### Home Page Sections

#### Slider (Carousel)
Located in `script.js` - `sliderData` object:
```javascript
const sliderData = {
    en: [
        {
            title: 'Your Title',
            subTitle: 'Your Subtitle',
            text: 'Your description',
            url: '/images/your-image.jpg',
        },
    ]
}
```

#### Products Section
Find `loadProductsPage()` function and modify the HTML.

#### News Section
Find `loadNewsPage()` function and add your news items.

### Text Content
Search for the text in `script.js` and replace:
```javascript
${getLabel('English', 'العربية')}
```

## 🔗 Adding External Services

### Google Analytics
Add before closing `</head>` tag in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Google Map
Already included in contact page. Update the embed URL:
```javascript
src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_CODE"
```

## 🎯 Performance Tips

1. **Optimize Images**
   - Use WebP format for faster loading
   - Compress images (use TinyPNG)
   - Use appropriate dimensions

2. **Caching**
   - Browser caches CSS/JS automatically
   - Use versioning for updates: `script.js?v=2`

3. **Lazy Loading**
   - Add `loading="lazy"` to images below fold

## 🐛 Common Issues & Solutions

### Issue: Images Not Loading
**Solution**: 
- Check image paths are correct
- Ensure `/images/` folder exists
- Verify file names match exactly

### Issue: Language Not Switching
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Clear localStorage in DevTools
- Refresh page

### Issue: Mobile Menu Not Working
**Solution**:
- Check Bootstrap 5 CDN is loading
- Open DevTools console for errors
- Clear browser cache

### Issue: Dark Mode Not Persisting
**Solution**:
- Check if localStorage is enabled
- Clear cookies/cache
- Try in incognito mode

## 📈 Deployment

### Local Testing
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

Visit: `http://localhost:8000`

### Web Hosting
1. Upload all three files to your server
2. Create `images` folder on server
3. Upload image files
4. Update image paths if using subdomain

Example structure on server:
```
public_html/
├── index.html
├── style.css
├── script.js
└── images/
    └── (all your images)
```

## 🔐 Security Notes

- No sensitive data stored locally (except user preferences)
- Contact form submission requires backend setup
- Use HTTPS for production
- Validate form inputs server-side

## 📚 File Sizes

- `index.html`: ~6 KB
- `style.css`: ~16 KB
- `script.js`: ~48 KB
- **Total**: ~70 KB (very lightweight!)

## 🎓 Learning Resources

If you want to customize further:
- [HTML5 MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3 MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/)

## ✅ Checklist Before Launch

- [ ] Updated all contact information
- [ ] Added your logo and images
- [ ] Tested on mobile devices
- [ ] Tested in different browsers
- [ ] Checked all links work
- [ ] Verified form functionality
- [ ] Updated social media links
- [ ] Set up analytics (optional)
- [ ] Tested dark mode
- [ ] Tested language switching
- [ ] Verified Google Map location

## 📞 Need Help?

Refer to the full `README.md` for detailed documentation, or contact the original React developers for specific feature requests.

---

**Happy building! 🎉**
