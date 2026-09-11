import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
}

const DEFAULT_DESCRIPTION =
  'Umang Trivedi — Full-Stack Developer & Software Architect based in Ahmedabad, India. Specializing in React, Node.js, MongoDB, TypeScript, and AI-powered web applications.';
const BASE_URL = 'https://umang-trivedi.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/ut-logo.png`;

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
}: SEOProps) => {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title.includes('Umang Trivedi')
      ? title
      : `${title} | Umang Trivedi — Full-Stack Developer`;
    document.title = formattedTitle;

    // Helper to update or create meta tag
    const setMeta = (nameAttr: string, nameValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    setMeta('name', 'description', description);
    setMeta('name', 'title', formattedTitle);

    // 3. Open Graph
    setMeta('property', 'og:title', formattedTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);
    const currentUrl = canonical ? `${BASE_URL}${canonical}` : window.location.href;
    setMeta('property', 'og:url', currentUrl);

    // 4. Twitter Card
    setMeta('name', 'twitter:title', formattedTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 5. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);
  }, [title, description, canonical, ogType, ogImage]);

  return null;
};

export default SEO;
