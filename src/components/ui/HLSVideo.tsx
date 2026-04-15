"use client";

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSVideoProps {
    src: string;
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    onReady?: () => void;
}

export default function HLSVideo({
    src,
    poster,
    className = "",
    autoPlay = true,
    muted = true,
    controls = false, // Default to false as requested
    onReady
}: HLSVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        const tryPlay = () => {
            if (!autoPlay) return;
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
            }
        };

        video.muted = muted;
        video.playsInline = true;

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.load();
            video.addEventListener('loadedmetadata', tryPlay);
            video.addEventListener('canplay', tryPlay);
        } else if (Hls.isSupported()) {
            hls = new Hls({
                capLevelToPlayerSize: true,
                autoStartLoad: true,
            });
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                tryPlay();
            });
            video.addEventListener('canplay', tryPlay);
        }

        return () => {
            video.pause();
            video.removeEventListener('loadedmetadata', tryPlay);
            video.removeEventListener('canplay', tryPlay);
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, autoPlay, muted]);

    return (
        <video
            ref={videoRef}
            poster={poster}
            className={className}
            autoPlay={autoPlay}
            muted={muted}
            controls={controls}
            playsInline
            loop
            onCanPlay={() => onReady?.()}
        />
    );
}
