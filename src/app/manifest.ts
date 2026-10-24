import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Purple Movement',
    short_name: 'Purple Movement',
    description: 'Beyond Syllabus, Beyond Gatekeepers, Beyond Borders. A global force of purposeful people, changemakers, and visionaries.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#9333ea',
    icons: [
      {
        src: '/logos/logo_pm.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/logos/logo_pm.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  };
}
