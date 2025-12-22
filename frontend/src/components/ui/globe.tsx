"use client";
import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => { },
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [230 / 255, 90 / 255, 90 / 255], // Red color matching wireframe
    glowColor: [1, 1, 1],
    markers: [
        { location: [48.8566, 2.3522], size: 0.08 },     // Paris, France
        { location: [35.6762, 139.6503], size: 0.08 },  // Tokyo, Japan
        { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney, Australia
        { location: [45.4215, -75.6972], size: 0.08 },  // Ottawa, Canada
        { location: [40.7128, -74.006], size: 0.08 },   // New York, USA
        { location: [51.5072, -0.1276], size: 0.08 },   // London, UK
        { location: [52.52, 13.405], size: 0.08 },      // Berlin, Germany
        { location: [41.9028, 12.4964], size: 0.08 },   // Rome, Italy
        { location: [55.7558, 37.6173], size: 0.08 },   // Moscow, Russia
        { location: [-22.9068, -43.1729], size: 0.08 }, // Rio, Brazil
    ],
};

export function Globe({
    className,
    config = GLOBE_CONFIG,
}: {
    className?: string;
    config?: COBEOptions;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phiRef = useRef(0);
    const thetaRef = useRef(0.3);
    const widthRef = useRef(0);
    const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
    const pointerMovement = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let globe: ReturnType<typeof createGlobe>;

        const onResize = () => {
            if (canvasRef.current) {
                widthRef.current = canvasRef.current.offsetWidth;
            }
        };

        const handlePointerDown = (e: PointerEvent) => {
            pointerInteracting.current = {
                x: e.clientX - pointerMovement.current.x,
                y: e.clientY - pointerMovement.current.y
            };
            if (canvasRef.current) {
                canvasRef.current.style.cursor = "grabbing";
            }
        };

        const handlePointerUp = () => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
            }
        };

        const handlePointerOut = () => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (pointerInteracting.current !== null) {
                pointerMovement.current = {
                    x: e.clientX - pointerInteracting.current.x,
                    y: e.clientY - pointerInteracting.current.y
                };
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
                pointerMovement.current = {
                    x: e.touches[0].clientX - pointerInteracting.current.x,
                    y: e.touches[0].clientY - pointerInteracting.current.y
                };
            }
        };

        window.addEventListener("resize", onResize);
        onResize();

        if (canvasRef.current) {
            canvasRef.current.addEventListener("pointerdown", handlePointerDown);
            canvasRef.current.addEventListener("pointerup", handlePointerUp);
            canvasRef.current.addEventListener("pointerout", handlePointerOut);
            canvasRef.current.addEventListener("mousemove", handleMouseMove);
            canvasRef.current.addEventListener("touchmove", handleTouchMove);

            globe = createGlobe(canvasRef.current, {
                ...config,
                width: widthRef.current * 2,
                height: widthRef.current * 2,
                onRender: (state) => {
                    // Auto rotate when not interacting
                    if (pointerInteracting.current === null) {
                        phiRef.current += 0.005;
                    }
                    // Horizontal rotation (phi) - left/right drag
                    state.phi = phiRef.current + pointerMovement.current.x / 200;
                    // Vertical tilt (theta) - up/down drag, clamped to prevent flipping
                    const newTheta = thetaRef.current + pointerMovement.current.y / 200;
                    state.theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, newTheta));
                    state.width = widthRef.current * 2;
                    state.height = widthRef.current * 2;
                },
            });

            setTimeout(() => {
                if (canvasRef.current) {
                    canvasRef.current.style.opacity = "1";
                }
            }, 100);
        }

        return () => {
            window.removeEventListener("resize", onResize);
            if (canvasRef.current) {
                canvasRef.current.removeEventListener("pointerdown", handlePointerDown);
                canvasRef.current.removeEventListener("pointerup", handlePointerUp);
                canvasRef.current.removeEventListener("pointerout", handlePointerOut);
                canvasRef.current.removeEventListener("mousemove", handleMouseMove);
                canvasRef.current.removeEventListener("touchmove", handleTouchMove);
            }
            if (globe) {
                globe.destroy();
            }
        };
    }, [config]);

    return (
        <div
            className={`absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] ${className || ""}`}
        >
            <canvas
                className="h-full w-full opacity-0 transition-opacity duration-500 cursor-grab"
                ref={canvasRef}
            />
        </div>
    );
}
