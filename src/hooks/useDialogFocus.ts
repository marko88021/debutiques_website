import { useEffect, type RefObject } from 'react';
/** Keep keyboard navigation in the overlay and restore the original trigger. */
export function useDialogFocus(open: boolean, ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!open || !ref.current) return;
    const dialog = ref.current;
    const trigger = document.activeElement as HTMLElement | null;
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]')).filter(el => el.getClientRects().length > 0);
    (focusable()[0] || dialog).focus();
    function handleTab(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', handleTab);
    return () => { document.removeEventListener('keydown', handleTab); if (trigger?.isConnected) trigger.focus({ preventScroll: true }); };
  }, [open, ref]);
}
