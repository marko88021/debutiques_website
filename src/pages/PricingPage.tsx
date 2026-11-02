import { Link } from 'react-router-dom';
import { ProjectInquiry } from '@/components/ProjectInquiry';
export default function PricingPage() {
  return <main className="pricing-page">
    <header className="simple-header"><Link to="/" aria-label="Debutiques home">DEBUTIQUES</Link><Link to="/#showcase">Explore the portfolio ↗</Link></header>
    <section className="pricing-intro">
      <p className="eyebrow">SCOPE & PRICING</p>
      <h1>A considered quote.<br />For your collection.</h1>
      <p>Furniture visualization is quoted around the work your project needs. Tell us about the products, the deliverables and your launch plans so we can discuss an appropriate scope.</p>
      <div className="pricing-factors">
        <div><span>01 / THE PRODUCT</span><h2>Models & materials</h2><p>Existing 3D files or new modelling, product complexity, finish variations and material references.</p></div>
        <div><span>02 / THE IMAGERY</span><h2>Scenes & deliverables</h2><p>Studio renders, styled interiors, animation or 360° views, including the number of angles and output formats.</p></div>
        <div><span>03 / THE LAUNCH</span><h2>Timing & review</h2><p>Your target date, feedback stages and how the visuals will be used across your channels.</p></div>
      </div>
    </section>
    <section id="schedule" className="inquiry-section"><ProjectInquiry /></section>
    <footer className="simple-header"><Link to="/">← Back to the studio</Link><Link to="/privacy-policy">Privacy policy</Link></footer>
  </main>;
}
