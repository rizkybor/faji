import {MetadataRoute} from 'next';
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Federasi Arung Jeram Indonesia',
    short_name: 'FAJI',
    description: 'Official Website of Federasi Arung Jeram Indonesia (FAJI)',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#005EB8',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
