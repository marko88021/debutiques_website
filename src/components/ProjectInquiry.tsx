import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Copy, Mail } from 'lucide-react';

export function ProjectInquiry() {
  const [draft, setDraft] = useState<{ body: string; href: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  function prepareInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const value = (key: string) => String(values.get(key) || '').trim();
    const body = `Hello Debutiques,\n\nI'd like to discuss a furniture visualization project.\n\nName: ${value('name')}\nEmail: ${value('email')}\nBrand / company: ${value('company') || 'Not specified'}\nService: ${value('service')}\nTarget timing: ${value('timing') || 'To discuss'}\n\nProject brief:\n${value('brief')}\n\nThank you,\n${value('name')}`;
    setDraft({ body, href: `mailto:info@debutiques.com?subject=${encodeURIComponent('Furniture visualization inquiry')}&body=${encodeURIComponent(body)}` });
    setCopyStatus('');
  }
  async function copyBrief() {
    if (!draft) return;
    try { await navigator.clipboard.writeText(draft.body); setCopyStatus('Brief copied. Paste it into an email to info@debutiques.com.'); }
    catch { setCopyStatus('Select and copy the brief below, then email info@debutiques.com.'); }
  }
  return (
    <div className="inquiry-layout">
      <div className="inquiry-intro">
        <p className="eyebrow">LET’S MAKE YOUR NEXT COLLECTION VISIBLE</p>
        <h2>Tell us what<br />you’re creating.</h2>
        <p>A single product, a new finish, or an entire collection. Share what you have and what you need; we’ll discuss the scope with you.</p>
        <a className="contact-email" href="mailto:info@debutiques.com">info@debutiques.com <ArrowUpRight size={20} aria-hidden="true" /></a>
        <p className="inquiry-note">Prefer a conversation? <a href="https://calendly.com/debutiques/meeting" target="_blank" rel="noopener noreferrer">Book a call on Calendly ↗</a></p>
        <p className="inquiry-note">Your brief stays in this page until you open your email app or copy it. You review and send the email yourself.</p>
      </div>
      <form className="inquiry-form" onSubmit={prepareInquiry} onChange={() => { setDraft(null); setCopyStatus(''); }}>
        <div className="form-row">
          <label htmlFor="inquiry-name">Your name <span>(required)</span><input id="inquiry-name" name="name" autoComplete="name" required maxLength={80} /></label>
          <label htmlFor="inquiry-email">Email <span>(required)</span><input id="inquiry-email" name="email" type="email" autoComplete="email" required maxLength={120} /></label>
        </div>
        <div className="form-row">
          <label htmlFor="inquiry-company">Brand / company<input id="inquiry-company" name="company" autoComplete="organization" maxLength={100} /></label>
          <label htmlFor="inquiry-service">What do you need?<select id="inquiry-service" name="service" defaultValue="Product renders"><option>Product renders</option><option>Interior imagery</option><option>Animation / assembly</option><option>360° product views</option><option>A mix / help defining the scope</option></select></label>
        </div>
        <label htmlFor="inquiry-brief">About the project <span>(required)</span><textarea id="inquiry-brief" name="brief" rows={4} required maxLength={1000} placeholder="Products, finishes, image or animation requirements, and where you’ll use the visuals." /></label>
        <label htmlFor="inquiry-timing">Target timing <span>(optional)</span><input id="inquiry-timing" name="timing" maxLength={80} placeholder="Launch date or an approximate timeframe" /></label>
        <p className="inquiry-note">You can add reference files in your email app. <Link to="/privacy-policy">Privacy policy</Link></p>
        <button type="submit" className="editorial-button">Prepare email inquiry <ArrowUpRight size={18} aria-hidden="true" /></button>
        {draft && <div className="inquiry-draft">
          <p role="status">Your brief is ready. It has not been sent.</p>
          <div className="draft-actions"><a href={draft.href} className="editorial-button"><Mail size={16} aria-hidden="true" />Open email draft</a><button type="button" className="editorial-link" onClick={copyBrief}><Copy size={16} aria-hidden="true" />Copy brief</button></div>
          <label htmlFor="inquiry-preview">Review your brief<textarea id="inquiry-preview" readOnly value={draft.body} rows={7} /></label>
          <p aria-live="polite">{copyStatus}</p>
        </div>}
      </form>
    </div>
  );
}
