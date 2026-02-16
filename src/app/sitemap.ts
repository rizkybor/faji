import {MetadataRoute} from 'next';
import {programs} from '@/data/programs';

export default function sitemap(): MetadataRoute.Sitemap {
  const programEntries: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `https://faji.org/program/${program.key}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: 'https://faji.org',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://faji.org/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://faji.org/program',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://faji.org/gallery',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://faji.org/live',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...programEntries,
  ];
}