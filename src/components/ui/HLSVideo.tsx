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

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
        } else if (Hls.isSupported()) {
            hls = new Hls({
                capLevelToPlayerSize: true,
                autoStartLoad: true,
            });
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlay) video.play().catch(() => { });
            });
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, autoPlay]);

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
