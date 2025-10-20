# Gallery Setup Guide

## 📸 How to Add Your Cloudinary Images and Videos

### 1. **Open the Configuration File**
Navigate to: `src/config/gallery.js`

### 2. **Replace Placeholder URLs**
Find the placeholder URLs and replace them with your actual Cloudinary links:

```javascript
// Example for images:
{
  id: 1,
  type: 'image',
  src: 'YOUR_CLOUDINARY_IMAGE_URL_HERE', // Replace this
  alt: 'متخصص العلاج الطبيعي يعمل مع المريض',
  title: 'العلاج الطبيعي المتخصص',
  description: 'جلسة علاج طبيعي متخصصة لاستعادة الحركة والقوة'
}

// Example for videos:
{
  id: 2,
  type: 'video',
  src: 'YOUR_CLOUDINARY_VIDEO_URL_HERE', // Replace this
  thumbnail: 'YOUR_CLOUDINARY_THUMBNAIL_URL_HERE', // Replace this
  title: 'مركز كنت للرعاية الصحية',
  description: 'جولة داخلية في مركزنا المتخصص'
}
```

### 3. **Adding More Items**
To add more gallery items, copy the structure above and:
- Update the `id` number (make it unique)
- Set `type` to either `'image'` or `'video'`
- Add your Cloudinary URLs
- Update the Arabic text for title and description

### 4. **Cloudinary URL Format**
Your Cloudinary URLs should look like:
- **Images**: `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/folder/image-name.jpg`
- **Videos**: `https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1/folder/video-name.mp4`

### 5. **Features Included**
- ✅ **Responsive Design**: Works on all devices
- ✅ **Image Gallery**: Click to view full-size images
- ✅ **Video Player**: Click to play videos with controls
- ✅ **Modal Viewing**: Full-screen viewing experience
- ✅ **Arabic Support**: RTL layout and Arabic text
- ✅ **Hover Effects**: Beautiful animations and transitions

### 6. **Current Placeholder Content**
The gallery currently shows 6 placeholder items:
- 4 Images (physiotherapy sessions, equipment, team, facilities)
- 2 Videos (center tour, treatment session)

### 7. **After Adding Your Content**
Once you've added your Cloudinary links:
1. Test the gallery locally
2. Verify all images and videos load correctly
3. Check the modal functionality
4. Ensure responsive design works on mobile

## 🎨 Gallery Features

- **Grid Layout**: 3 columns on desktop, 2 on tablet, 1 on mobile
- **Hover Effects**: Images scale and show play buttons for videos
- **Modal Viewing**: Click any item to view in full-screen modal
- **Video Controls**: Full video player with controls
- **Arabic Text**: All content in Arabic with RTL support
- **Call to Action**: "Book a free tour" button at the bottom

## 📱 Responsive Design

- **Desktop**: 3-column grid
- **Tablet**: 2-column grid  
- **Mobile**: 1-column stack
- **Modal**: Responsive full-screen viewing

Ready to add your Cloudinary content! 🚀
