"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import countries from "@/data/globe.json";
import { programLocations, ProgramLocation } from "@/data/sampleArcs";

// Polyfill for mobile browsers that don't support WebGPU
if (typeof window !== 'undefined' && typeof (window as any).GPUShaderStage === 'undefined') {
    (window as any).GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };
}

declare module "@react-three/fiber" {
    interface ThreeElements {
        threeGlobe: ThreeElements["mesh"] & {
            new(): ThreeGlobe;
        };
    }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
    startName?: string;
    endName?: string;
};

export type GlobeConfig = {
    pointSize?: number;
    globeColor?: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    polygonColor?: string;
    ambientLight?: string;
    directionalLeftLight?: string;
    directionalTopLight?: string;
    pointLight?: string;
    arcTime?: number;
    arcLength?: number;
    rings?: number;
    maxRings?: number;
    initialPosition?: {
        lat: number;
        lng: number;
    };
    autoRotate?: boolean;
    autoRotateSpeed?: number;
};

interface WorldProps {
    globeConfig: GlobeConfig;
    data: Position[];
    onLocationClick?: (location: ProgramLocation) => void;
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data, onLocationClick }: WorldProps) {
    const globeRef = useRef<ThreeGlobe | null>(null);
    const groupRef = useRef<any>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

    const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#ffffff",
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(255,255,255,0.7)",
        globeColor: "#1d072e",
        emissive: "#000000",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ...globeConfig,
    };

    // Initialize globe only once
    useEffect(() => {
        if (!globeRef.current) {
            globeRef.current = new ThreeGlobe();
            setIsInitialized(true);
        }
    }, []);

    // Build material when globe is initialized or when relevant props change
    useEffect(() => {
        if (!globeRef.current || !isInitialized) return;

        const globeMaterial = globeRef.current.globeMaterial() as unknown as {
            color: Color;
            emissive: Color;
            emissiveIntensity: number;
            shininess: number;
        };
        globeMaterial.color = new Color(globeConfig.globeColor);
        globeMaterial.emissive = new Color(globeConfig.emissive);
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
        globeMaterial.shininess = globeConfig.shininess || 0.9;
    }, [
        isInitialized,
        globeConfig.globeColor,
        globeConfig.emissive,
        globeConfig.emissiveIntensity,
        globeConfig.shininess,
    ]);

    // Build data when globe is initialized or when data changes
    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const arcs = data;
        let points: { size: number; order: number; color: string; lat: number; lng: number; name?: string }[] = [];
        for (let i = 0; i < arcs.length; i++) {
            const arc = arcs[i];
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.startLat,
                lng: arc.startLng,
                name: arc.startName,
            });
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.endLat,
                lng: arc.endLng,
                name: arc.endName,
            });
        }

        // remove duplicates for same lat and lng
        const filteredPoints = points.filter(
            (v, i, a) =>
                a.findIndex((v2) =>
                    ["lat", "lng"].every(
                        (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
                    ),
                ) === i,
        );

        globeRef.current
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(defaultProps.showAtmosphere)
            .atmosphereColor(defaultProps.atmosphereColor)
            .atmosphereAltitude(defaultProps.atmosphereAltitude)
            .hexPolygonColor(() => defaultProps.polygonColor);

        globeRef.current
            .arcsData(data)
            .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
            .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
            .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
            .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
            .arcColor((e: any) => (e as { color: string }).color)
            .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
            .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((e) => (e as { order: number }).order * 1)
            .arcDashGap(15)
            .arcDashAnimateTime(() => defaultProps.arcTime);

        globeRef.current
            .pointsData(filteredPoints)
            .pointColor((e) => (e as { color: string }).color)
            .pointsMerge(true)
            .pointAltitude(0.0)
            .pointRadius(2);

        globeRef.current
            .ringsData([])
            .ringColor(() => defaultProps.polygonColor)
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod(
                (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
            );
    }, [
        isInitialized,
        data,
        defaultProps.pointSize,
        defaultProps.showAtmosphere,
        defaultProps.atmosphereColor,
        defaultProps.atmosphereAltitude,
        defaultProps.polygonColor,
        defaultProps.arcLength,
        defaultProps.arcTime,
        defaultProps.rings,
        defaultProps.maxRings,
    ]);

    // Handle rings animation with cleanup
    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const interval = setInterval(() => {
            if (!globeRef.current) return;

            const newNumbersOfRings = genRandomNumbers(
                0,
                data.length,
                Math.floor((data.length * 4) / 5),
            );

            const ringsData = data
                .filter((d, i) => newNumbersOfRings.includes(i))
                .map((d) => ({
                    lat: d.startLat,
                    lng: d.startLng,
                    color: d.color,
                }));

            globeRef.current.ringsData(ringsData);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [isInitialized, data]);

    const handleGlobeHover = (e: any) => {
        if (!globeRef.current) return;

        const point = e.point;
        if (!point) return;

        let closestLocation: ProgramLocation | null = null;
        let minDistance = Infinity;
        const threshold = 10;

        for (const loc of programLocations) {
            const coords = (globeRef.current as any).getCoords(loc.lat, loc.lng, 0);
            const dist = Math.sqrt(
                Math.pow(point.x - coords.x, 2) +
                Math.pow(point.y - coords.y, 2) +
                Math.pow(point.z - coords.z, 2)
            );

            if (dist < minDistance) {
                minDistance = dist;
                closestLocation = loc;
            }
        }

        if (minDistance < threshold && closestLocation) {
            setHoveredPoint(closestLocation);
            document.body.style.cursor = "pointer";
        } else {
            setHoveredPoint(null);
            document.body.style.cursor = "auto";
        }
    };

    const handleGlobeClick = (e: any) => {
        if (!globeRef.current || !onLocationClick) return;

        const point = e.point;
        if (!point) return;

        let closestLocation: ProgramLocation | null = null;
        let minDistance = Infinity;
        const threshold = 10;

        for (const loc of programLocations) {
            const coords = (globeRef.current as any).getCoords(loc.lat, loc.lng, 0);
            const dist = Math.sqrt(
                Math.pow(point.x - coords.x, 2) +
                Math.pow(point.y - coords.y, 2) +
                Math.pow(point.z - coords.z, 2)
            );

            if (dist < minDistance) {
                minDistance = dist;
                closestLocation = loc;
            }
        }

        if (minDistance < threshold && closestLocation) {
            onLocationClick(closestLocation);
        }
    };

    const getTooltipPosition = () => {
        if (!hoveredPoint || !globeRef.current) return [0, 0, 0];
        const coords = (globeRef.current as any).getCoords(hoveredPoint.lat, hoveredPoint.lng, 0.1);
        return [coords.x, coords.y, coords.z];
    };

    return (
        <group ref={groupRef}>
            {globeRef.current && (
                <primitive
                    object={globeRef.current}
                    onPointerMove={handleGlobeHover}
                    onClick={handleGlobeClick}
                    onPointerOut={() => {
                        setHoveredPoint(null);
                        document.body.style.cursor = "auto";
                    }}
                />
            )}
            {hoveredPoint && (
                <Html position={getTooltipPosition() as any} style={{ pointerEvents: 'none' }}>
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-brand-blue/10 transform -translate-x-1/2 -translate-y-[150%] whitespace-nowrap z-50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                            <p className="text-brand-blue font-bold text-sm">{hoveredPoint.city}, {hoveredPoint.country}</p>
                        </div>
                        <p className="text-xs text-brand-gray mt-1">Click to view programs</p>
                    </div>
                </Html>
            )}
        </group>
    );
}

export function WebGLRendererConfig() {
    const { gl, size } = useThree();

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0xffaaff, 0);
    }, [gl, size]);

    return null;
}

export function World(props: WorldProps) {
    const { globeConfig } = props;
    const scene = new Scene();
    scene.fog = new Fog(0xffffff, 400, 2000);
    return (
        <Canvas scene={scene} camera={new PerspectiveCamera(50, 1, 180, 1800)}>
            <WebGLRendererConfig />
            <ambientLight color="#ffffff" intensity={1.5} />
            <directionalLight
                color="#ffffff"
                position={new Vector3(-400, 100, 400)}
                intensity={2}
            />
            <directionalLight
                color="#ffffff"
                position={new Vector3(-200, 500, 200)}
                intensity={1.5}
            />
            <directionalLight
                color="#ffffff"
                position={new Vector3(400, 200, -300)}
                intensity={1}
            />
            <pointLight
                color="#ffffff"
                position={new Vector3(0, 300, 400)}
                intensity={2}
            />
            <Globe {...props} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minDistance={cameraZ}
                maxDistance={cameraZ}
                autoRotateSpeed={globeConfig.autoRotateSpeed || 1}
                autoRotate={globeConfig.autoRotate !== false}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />
        </Canvas>
    );
}

export function hexToRgb(hex: string) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
    const arr: number[] = [];
    while (arr.length < count) {
        const r = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
}