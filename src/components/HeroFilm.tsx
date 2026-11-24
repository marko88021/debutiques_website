import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [source] = useState(() =>
    window.matchMedia('(max-width: 640px)').matches
      ? '/media/hero/symphony-mobile.mp4'
      : '/media/hero/symphony-desktop.mp4'
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      if (motion.matches) video.pause();
      else void video.play().catch(() => { /* Keep the poster and allow manual playback. */ });
    };
    syncMotion();
    motion.addEventListener('change', syncMotion);
    return () => motion.removeEventListener('change', syncMotion);
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  return (
    <figure className="hero-figure" aria-label="Symphony dining table and chairs in a sunlit interior">
      <video
        ref={videoRef}
        className="hero-film"
        src={source}
        poster="/media/hero/symphony-cover.webp"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
      />
      <button className="hero-film-toggle" type="button" onClick={togglePlayback} aria-label={playing ? 'Pause hero video' : 'Play hero video'}>
        {playing ? <Pause size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
      </button>
    </figure>
  );
}
