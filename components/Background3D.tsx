"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

/* ─── Star Field ───────────────────────────────────────────── */
function Stars({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;

  // Generate star positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;     // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60; // z
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();

    // slow cosmic drift
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.03) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={0.12}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.85}
      />
    </Points>
  );
}

/* ─── Scene ───────────────────────────────────────────── */
function Scene({ isDark }: { isDark: boolean }) {
  const starColor = isDark ? "#ffffff" : "#1a1a2e";

  return <Stars color={starColor} />;
}

/* ─── Main Background Component ───────────────────────── */
export default function Background3D() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Scene isDark={isDark} />
      </Canvas>

      {/* gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/40 to-paper dark:via-ink/40 dark:to-ink" />
    </div>
  );
}