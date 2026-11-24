import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function ProjectInquiry() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const sending = useRef(false);

  async function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form)) body.set(key, String(value).trim());
    if (!body.get('name') || !body.get('brief')) {
      setStatus('error');
      return;
    }

    sending.current = true;
    setStatus('sending');
    try {
      const result = await fetch('/api/inquiry', { method: 'POST', body });
      if (!result.ok || (await result.json()).sent !== true) throw new Error('Form submission failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }
  return (
    <div className="inquiry-layout">
      <div className="inquiry-intro">
        <p className="eyebrow">LET’S MAKE YOUR NEXT COLLECTION VISIBLE</p>
        <h2>Tell us what<br />you’re creating.</h2>
        <p>A single product, a new finish, or an entire collection. Share what you have and what you need; we’ll discuss the scope with you.</p>
        <a className="contact-email" href="mailto:info@debutiques.com">info@debutiques.com <ArrowUpRight size={20} aria-hidden="true" /></a>
        <p className="inquiry-note">Prefer a conversation? <a href="https://calendly.com/debutiques/meeting" target="_blank" rel="noopener noreferrer">Book a call on Calendly ↗</a></p>
      </div>
      <form className="inquiry-form" method="POST" action="/api/inquiry" onSubmit={sendInquiry} onChange={() => { if (!sending.current) setStatus('idle'); }} aria-busy={status === 'sending'}>

        <div hidden><label>Leave this blank<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
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
        <p className="inquiry-note">We’ll use your details to reply to your inquiry. <Link to="/privacy-policy">Privacy policy</Link></p>
        <button type="submit" className="editorial-button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send inquiry'}</button>
        {status === 'sent' && <p role="status">Thanks. We received your inquiry and will reply by email.</p>}
        {status === 'error' && <p role="alert">We couldn’t send your inquiry. Check the required fields and try again, or email <a className="underline" href="mailto:info@debutiques.com">info@debutiques.com</a>.</p>}
      </form>
    </div>
  );
}
