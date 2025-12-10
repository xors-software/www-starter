import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://checkpoint.pictures',
      lastModified: new Date(),
    },
  ];
}