"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
    start: number;
    end: number;
    duration: number;
    suffix?: number;
};
export const GrowNumber = ({ start, end, duration, suffix = 2 }: Props) => {
    const [cursor, setCursor] = useState(start);
    const grow = useCallback(() => {
        let startTimestamp: number | null = null;
        const step: FrameRequestCallback = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1,
            );

            setCursor(progress * (end - start) + start);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [start, end, duration]);
    useEffect(() => {
        grow();
    }, [grow]);
    return cursor.toFixed(suffix);
};
