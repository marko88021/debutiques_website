import { useEffect, useRef } from 'react';

/** Play muted portfolio previews only while their card is visible. */
export function GalleryVideoPreview({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden) {
        video.muted = true;
        void video.play().catch(() => { /* The card still opens the full player. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, [src]);
  return <video ref={ref} src={src} muted loop playsInline preload="metadata"
    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />;
}
