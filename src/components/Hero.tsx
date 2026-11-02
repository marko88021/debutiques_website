import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
interface HeroProps {
  heroRef: React.RefObject<HTMLDivElement>;
  scheduleRef: React.RefObject<HTMLDivElement>;
  showcaseRef: React.RefObject<HTMLDivElement>;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
}
export function Hero({ heroRef, scheduleRef, showcaseRef, scrollToSection }: HeroProps) {
  const { t } = useTranslation();
  return (
    <section id="hero" ref={heroRef} className="editorial-hero">
      <div className="hero-layout">
      <div className="hero-copy">
        <p className="eyebrow">DEBUTIQUES / FURNITURE CGI STUDIO</p>
        <h1>{t('hero.title')}</h1>
        <p className="hero-intro">{t('hero.subtitle')}</p>
        <div className="hero-actions">
          <button className="editorial-button" onClick={() => scrollToSection(scheduleRef)}>{t('hero.cta')}<ArrowUpRight size={18} aria-hidden="true" /></button>
          <button className="editorial-link" onClick={() => scrollToSection(showcaseRef)}>{t('hero.viewShowcase')}<span aria-hidden="true">↓</span></button>
        </div>
        <p className="hero-note">Product imagery · Interior CGI · Animation</p>
      </div>
      <figure className="hero-figure">
        <img src="/assets/interiors/A3_cam01_set01_132f.jpg" alt="Debutiques interior CGI: timber dining table and upholstered chairs beneath a globe pendant" width="1500" height="1500" decoding="async" />
        <figcaption><span>Form. Material. Atmosphere.</span><span>Selected interior CGI / 01</span></figcaption>
      </figure>
      </div>
    </section>
  );
}


