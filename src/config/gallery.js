// Gallery Configuration
// Updated gallery with new media - 3 images in first row, videos in second row

export const galleryConfig = {
  items: [
    // First row - 3 images
    {
      id: 1,
      type: 'image',
      src: 'https://res.cloudinary.com/du2afeuwp/image/upload/v1761027061/KENTHEALTHCARE-AD_Pediatric_-03_p3poch.png'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://res.cloudinary.com/du2afeuwp/image/upload/v1761027061/KENTHEALTHCARE-POST-17_neroy9.png'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://res.cloudinary.com/du2afeuwp/image/upload/v1761027061/KENTHEALTHCARE-AD_Pediatric_-02_zxhojv.png'
    },
    // Second row - vertical videos
    {
      id: 4,
      type: 'video',
      src: 'https://res.cloudinary.com/du2afeuwp/video/upload/v1761026806/Emily-Testimonial_jxv2vk.mp4',
      thumbnail: 'https://res.cloudinary.com/du2afeuwp/video/upload/so_0/v1761026806/Emily-Testimonial_jxv2vk.jpg'
    },
    {
      id: 5,
      type: 'video',
      src: 'https://res.cloudinary.com/du2afeuwp/video/upload/v1761026756/Virtual-Autism_fhjbuo.mp4',
      thumbnail: 'https://res.cloudinary.com/du2afeuwp/video/upload/so_0/v1761026756/Virtual-Autism_fhjbuo.jpg'
    },
    {
      id: 6,
      type: 'video',
      src: 'https://res.cloudinary.com/du2afeuwp/video/upload/v1761026610/Writing-slow_yr9rlh.mp4',
      thumbnail: 'https://res.cloudinary.com/du2afeuwp/video/upload/so_0/v1761026610/Writing-slow_yr9rlh.jpg'
    }
  ]
};

// Instructions for adding your Cloudinary links:
// 1. Replace the placeholder URLs above with your actual Cloudinary links
// 2. For videos: provide both the video URL and a thumbnail image URL
// 3. For images: just provide the image URL
// 4. You can add more items by copying the structure above
// 5. Make sure to update the id numbers if you add more items
