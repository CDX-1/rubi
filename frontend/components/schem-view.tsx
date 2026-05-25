"use client";

import { useEffect, useRef } from "react";
import { renderSchematic } from "@enginehub/schematicwebviewer";

const SCHEMATIC =
    "H4sIAAAAAAAA/2WS20oDMRCGp5ta2xVREV/AK8G2VPEAhV4oKl54AkEvqpQ0O+kG041kp4ov4yP4FF76CL6Hd9bZrT2IgcBkJv+fL5OEACFUrlWMfUlGCZi/QZ8alwCAELBwJElOMisfIZTPkWTE2SIUuYgAhde7t88Ndrl13kbHkaHy1GVxv75Tb9S6LKo1tsqwlNVN0ruykrTzfVjGpGcSjAfdppZdb9QClC694VxGMBwOv3i+c1zhE8aqNPyvK0PxQvYRlk7yZe1Sa6OMtDMwa39gNiU29raVZG8IYO7WRBSDCKB0iqYXEwQcnvEpnC1kUFqnSL9Q3zAaIoTSoXXqgYnmr6RFIhSw2mcy5aWmZtcOsPPsnM13w+60YvEJfVtLhS1tnfNVDrkxLZQpVR/dM3qMWlraFO9ZWhBwMNV6fETuvW9HaOVLa+uPNsMZSydG5Ae5TyBgfdYnSskl2CHnVdy2hiYb+SfkD5y1p5QBBKICi/ldjxPiN0S+8mj8AAPkJldEAgAA";

export default function SchemView({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;
        let viewerHandle: Awaited<ReturnType<typeof renderSchematic>> | null = null;

        const resizeObserver = new ResizeObserver(async (entries) => {
            if (!entries || entries.length === 0) return;
            const { width, height } = entries[0].contentRect;
            if (width === 0 || height === 0) return;

            try {
                viewerHandle = await renderSchematic(canvasRef.current!, SCHEMATIC, {
                    size: { width, height },
                    orbit: false,
                    getClientJarUrl: async (_) => {
                        return "/client.jar";
                    },
                });
            } catch (err) {
                console.error("Failed to render schematic", err);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className={`w-full h-full relative ${className}`}>
            <canvas 
                ref={canvasRef} 
                className="w-full h-full block"
            />
        </div>
    );
}