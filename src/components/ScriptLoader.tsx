import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: Array<unknown>;
  }
}

export function ScriptLoader() {
  const { hasConsent } = useCookieConsent();

  useEffect(() => {
    // Load Google Analytics if analytics consent is given
    if (hasConsent('analytics')) {
      loadGoogleAnalytics();
    }

    // Load other marketing scripts if marketing consent is given
    if (hasConsent('marketing')) {
      loadMarketingScripts();
    }
  }, [hasConsent]);

  const loadGoogleAnalytics = () => {
    // Check if already loaded
    if (typeof window.gtag !== 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };

    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-3J4GFD3G8G';
    document.head.appendChild(script1);

    window.gtag('js', new Date());
    window.gtag('config', 'G-3J4GFD3G8G');

    console.log('Google Analytics loaded with consent');
  };

  const loadMarketingScripts = () => {
    // Load Google Tag Manager if not already loaded
    if (!document.querySelector('script[src*="gtm.js"]')) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-T7Q7GQN2';
      document.head.appendChild(gtmScript);

      // Add noscript fallback
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-T7Q7GQN2';
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      document.body.appendChild(noscript);

      console.log('Google Tag Manager loaded with consent');
    }
  };

  return null; // This component doesn't render anything
}
