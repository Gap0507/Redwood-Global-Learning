"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";

interface Marker {
    location: [number, number];
    size: number;
    city: string;
    country: string;
}

const markers: Marker[] = [
    // North America
    { location: [37.7595, -122.4367], size: 0.1, city: "San Francisco", country: "United States" },
    { location: [40.7128, -74.006], size: 0.1, city: "New York", country: "United States" },
    { location: [45.4215, -75.6972], size: 0.1, city: "Ottawa", country: "Canada" },
    // Europe
    { location: [51.5074, -0.1278], size: 0.1, city: "London", country: "United Kingdom" },
    { location: [48.8566, 2.3522], size: 0.1, city: "Paris", country: "France" },
    { location: [52.52, 13.405], size: 0.1, city: "Berlin", country: "Germany" },
    { location: [37.9838, 23.7275], size: 0.1, city: "Athens", country: "Greece" },
    // Asia
    { location: [35.6762, 139.6503], size: 0.1, city: "Tokyo", country: "Japan" },
    { location: [28.6139, 77.209], size: 0.1, city: "New Delhi", country: "India" },
    { location: [1.3521, 103.8198], size: 0.1, city: "Singapore", country: "Singapore" },
    // Australia
    { location: [-33.8688, 151.2093], size: 0.1, city: "Sydney", country: "Australia" },
];

export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const phiRef = useRef(0); // Track current globe rotation for hover detection
    const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null);
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

    const [{ r }, api] = useSpring(() => ({
        r: 0,
        config: {
            mass: 1,
            tension: 280,
            friction: 40,
            precision: 0.001,
        },
    }));

    // Convert lat/lng to screen coordinates
    const projectToScreen = (lat: number, lng: number, phi: number, theta: number, width: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const phiRad = phi;
        const thetaRad = theta;
        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180;

        const x = Math.cos(latRad) * Math.sin(lngRad - phiRad);
        const y = Math.sin(latRad) * Math.cos(thetaRad) - Math.cos(latRad) * Math.cos(lngRad - phiRad) * Math.sin(thetaRad);
        const z = Math.sin(latRad) * Math.sin(thetaRad) + Math.cos(latRad) * Math.cos(lngRad - phiRad) * Math.cos(thetaRad);

        if (z < 0) return null; // Behind the globe

        const scale = width / 2;
        const screenX = x * scale + width / 2;
        const screenY = -y * scale + width / 2;

        return { x: screenX, y: screenY }; // No division - already in CSS pixel space
    };

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        // Only check for hover if not dragging
        if (pointerInteracting.current !== null) {
            setHoveredMarker(null);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let foundMarker: Marker | null = null;
        const phi = phiRef.current; // Use the actual globe rotation
        const width = canvas.offsetWidth;

        for (const marker of markers) {
            const projected = projectToScreen(marker.location[0], marker.location[1], phi, 0.3, width);
            if (projected) {
                const distance = Math.sqrt(
                    Math.pow(mouseX - projected.x, 2) + Math.pow(mouseY - projected.y, 2)
                );

                if (distance < 20) { // Larger hover radius for easier detection
                    foundMarker = marker;
                    setCardPosition({ x: e.clientX, y: e.clientY });
                    break;
                }
            }
        }

        setHoveredMarker(foundMarker);
    };

    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener("resize", onResize);
        onResize();
        const globe = createGlobe(canvasRef.current!, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [1, 1, 1],
            markerColor: [255 / 255, 59 / 255, 48 / 255], // Bright Radiant Red (iOS style)
            glowColor: [1, 1, 1], // White to remove blue glow
            markers: markers.map(m => ({ location: m.location, size: m.size })),
            onRender: (state) => {
                // This prevents rotation while dragging
                if (!pointerInteracting.current) {
                    // Called on every animation frame.
                    // `state` will be an empty object, return updated options.
                    phi += 0.005;
                }
                const totalPhi = phi + r.get();
                phiRef.current = totalPhi; // Store for hover detection
                state.phi = totalPhi;
                state.width = width * 2;
                state.height = width * 2;
            },
        });
        setTimeout(() => (canvasRef.current!.style.opacity = "1"));
        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div
            style={{
                width: "100%",
                maxWidth: 600,
                aspectRatio: 1,
                margin: "auto",
                position: "relative",
            }}
            className={className}
        >
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current =
                        e.clientX - pointerInteractionMovement.current;
                    canvasRef.current!.style.cursor = "grabbing";
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current!.style.cursor = "grab";
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasRef.current!.style.cursor = "grab";
                    setHoveredMarker(null);
                }}
                onMouseMove={(e) => {
                    handleCanvasMouseMove(e);

                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 200,
                        });
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 100,
                        });
                    }
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    contain: "layout paint size",
                    opacity: 0,
                    transition: "opacity 1s ease",
                }}
            />

            {/* Hover Card */}
            {hoveredMarker && (
                <div
                    style={{
                        position: "fixed",
                        left: cardPosition.x + 15,
                        top: cardPosition.y - 30,
                        pointerEvents: "none",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            background: "linear-gradient(135deg, rgba(255, 59, 48, 0.95) 0%, rgba(255, 89, 78, 0.95) 100%)",
                            backdropFilter: "blur(12px)",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            boxShadow: "0 8px 32px rgba(255, 59, 48, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            minWidth: "180px",
                        }}
                    >
                        <div style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.85)", marginBottom: "4px", fontWeight: 500 }}>
                            Programs in
                        </div>
                        <div style={{ fontSize: "16px", color: "#ffffff", fontWeight: 600, marginBottom: "2px" }}>
                            {hoveredMarker.country}
                        </div>
                        <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.75)" }}>
                            {hoveredMarker.city}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}