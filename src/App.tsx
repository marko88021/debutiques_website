import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { CookieConsentModal } from '@/components/CookieConsentModal';
import { ScriptLoader } from '@/components/ScriptLoader';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { PageMetadata } from '@/components/PageMetadata';
import './App.css';
import './furniture-refresh.css';

const HomePage = lazy(() => import('@/pages/HomePage'));
const PrivacyPolicy = lazy(() => import('@/components/PrivacyPolicy'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const AdminRoutes = lazy(() => import('@/components/AdminRoutes'));

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: Element }) => void;
    };
  }
}

function AppShell() {
  const {
    showModal,
    acceptAll,
    declineAll,
    savePreferences,
    closeModal,
  } = useCookieConsent();

  return (
    <BrowserRouter>
      
        <div>
          <ScrollToTop />
          <PageMetadata />

          {/* Load marketing/analytics only after consent */}
          <ScriptLoader />



          <Suspense
            fallback={
              <div
                style={{
                  minHeight: '100vh',
                  backgroundColor: '#000',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily:
                    'Outfit, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                }}
              >
                Loading…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="*" element={<main className="standalone-page"><Link to="/">← Debutiques</Link><h1>Page not found</h1><p>Explore our furniture portfolio or tell us about your project.</p><Link className="editorial-button" to="/">Return to the studio</Link></main>} />
            </Routes>
          </Suspense>

          <CookieConsentModal
            isOpen={showModal}
            onAcceptAll={acceptAll}
            onDeclineAll={declineAll}
            onSavePreferences={savePreferences}
            onClose={closeModal}
          />

          <Toaster />
          <Sonner />


        </div>
      
    </BrowserRouter>
  );
}

export default AppShell;

