import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const pages: Record<string, [string, string]> = {
  '/': ['Debutiques | 3D Furniture Visualization', 'Furniture CGI for Scandinavian and European brands. Explore product renders, interior imagery and animations. Discuss your next collection with Debutiques.'],
  '/pricing': ['Furniture CGI Pricing & Project Quotes | Debutiques', 'Plan your furniture visualization project. Explore the factors behind a tailored quote for product renders, interior CGI and animation.'],
  '/blog': ['Furniture Visualization Journal | Debutiques', 'Ideas and practical guides on furniture CGI, product imagery and visualization from Debutiques.'],
  '/privacy-policy': ['Privacy Policy | Debutiques', 'How Debutiques handles website data, inquiries and cookie preferences.'],
};
export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = pages[pathname] || ['Debutiques | Furniture CGI Studio', pages['/'][1]];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    const url = `https://debutiques.com${pathname}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
  }, [pathname]);
  return null;
}
