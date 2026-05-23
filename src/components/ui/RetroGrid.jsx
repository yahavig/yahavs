"use client";

import { useEffect, useRef, useState } from "react";

function getThemeColor(darkColor, lightColor) {
  if (typeof document === "undefined") return darkColor;
  return document.documentElement.classList.contains("light") ? lightColor : darkColor;
}

export default function RetroGrid({
  gridColor = "#6366f1",
  darkColor,
  lightColor,
  showScanlines = true,
  glowEffect = true,
  className = "",
}) {
  const canvasRef = useRef(null);
  const [resolvedColor, setResolvedColor] = useState(() =>
    darkColor && lightColor ? getThemeColor(darkColor, lightColor) : gridColor
  );

  // Watch for theme class changes on <html>
  useEffect(() => {
    if (!darkColor || !lightColor) return;
    setResolvedColor(getThemeColor(darkColor, lightColor));
    const observer = new MutationObserver(() => {
      setResolvedColor(getThemeColor(darkColor, lightColor));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [darkColor, lightColor]);

  const activeColor = darkColor && lightColor ? resolvedColor : gridColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const color = activeColor;

    const resizeCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 99, g: 102, b: 241 };
    };
    const rgb = hexToRgb(color);

    const cellWidth    = 120;
    const cellDepth    = 80;
    const numCellsWide = 16;
    const numCellsDeep = 20;
    const cameraX      = 0;
    const cameraY      = 60;
    const cameraZ      = 400;
    const focalLength  = 500;
    let   offset       = 0;
    const speed        = 0.375;

    const project3DTo2D = (x, y, z) => {
      const relX = x - cameraX;
      const relY = y - cameraY;
      const relZ = z - cameraZ;
      if (relZ <= 10) return null;
      const scale   = focalLength / relZ;
      const screenX = canvas.width  / 2 + relX * scale;
      const screenY = canvas.height * 0.5 - relY * scale;
      return { x: screenX, y: screenY, scale, z: relZ };
    };

    const drawCell = (x, z, zOffset) => {
      const actualZ = z - zOffset;
      if (actualZ < -cellDepth || actualZ > numCellsDeep * cellDepth) return;

      const tl = project3DTo2D(x - cellWidth / 2, 0, actualZ);
      const tr = project3DTo2D(x + cellWidth / 2, 0, actualZ);
      const bl = project3DTo2D(x - cellWidth / 2, 0, actualZ + cellDepth);
      const br = project3DTo2D(x + cellWidth / 2, 0, actualZ + cellDepth);

      if (!tl || !tr || !bl || !br || actualZ < 0) return;

      const distFactor = Math.min(1, actualZ / (numCellsDeep * cellDepth));
      const alpha      = Math.max(0.3, 1 - distFactor * 0.7);
      const lineWidth  = Math.max(1, 2.5 * (1 - distFactor * 0.5));

      if (glowEffect) {
        ctx.shadowBlur  = 10 * (1 - distFactor);
        ctx.shadowColor = color;
      }

      ctx.lineWidth   = lineWidth;
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(bl.x, bl.y);
      ctx.lineTo(br.x, br.y);
      ctx.lineTo(tr.x, tr.y);
      ctx.lineTo(tl.x, tl.y);
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur  = 0;
      ctx.globalAlpha = 1;
    };

    const drawScanlines = () => {
      if (!showScanlines) return;
      ctx.globalAlpha = 0.1;
      ctx.fillStyle   = "#000000";
      for (let y = 0; y < canvas.height; y += 4) ctx.fillRect(0, y, canvas.width, 2);
      ctx.globalAlpha = 1;
    };

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.55);
      sky.addColorStop(0,    `rgba(${rgb.r * 0.05}, ${rgb.g * 0.05}, ${rgb.b * 0.15}, 1)`);
      sky.addColorStop(0.3,  `rgba(${rgb.r * 0.1},  ${rgb.g * 0.08}, ${rgb.b * 0.2},  1)`);
      sky.addColorStop(0.5,  `rgba(${rgb.r * 0.2},  ${rgb.g * 0.15}, ${rgb.b * 0.3},  1)`);
      sky.addColorStop(0.7,  `rgba(${rgb.r * 0.35}, ${rgb.g * 0.25}, ${rgb.b * 0.4},  1)`);
      sky.addColorStop(0.85, `rgba(${rgb.r * 0.55}, ${rgb.g * 0.4},  ${rgb.b * 0.6},  1)`);
      sky.addColorStop(1,    `rgba(${rgb.r * 0.7},  ${rgb.g * 0.5},  ${rgb.b * 0.75}, 1)`);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.55);

      // Ground gradient
      const ground = ctx.createLinearGradient(0, canvas.height * 0.55, 0, canvas.height);
      ground.addColorStop(0,   `rgba(${rgb.r * 0.1},  ${rgb.g * 0.08}, ${rgb.b * 0.15}, 1)`);
      ground.addColorStop(0.3, `rgba(${rgb.r * 0.05}, ${rgb.g * 0.03}, ${rgb.b * 0.08}, 1)`);
      ground.addColorStop(1,   "#000000");
      ctx.fillStyle = ground;
      ctx.fillRect(0, canvas.height * 0.55, canvas.width, canvas.height * 0.45);

      offset += speed;
      if (offset >= cellDepth) offset = 0;

      for (let row = -5; row < numCellsDeep + 5; row++) {
        const z = row * cellDepth;
        for (let col = -Math.floor(numCellsWide / 2); col <= Math.floor(numCellsWide / 2); col++) {
          drawCell(col * cellWidth, z, offset);
        }
      }

      drawScanlines();

      // Vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.8
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      raf = requestAnimationFrame(animate);
    };

    const start = () => {
      if (raf) return;
      animate();
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [activeColor, showScanlines, glowEffect]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
