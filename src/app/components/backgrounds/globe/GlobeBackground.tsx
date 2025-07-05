"use client";
import React, { useRef, useEffect } from "react";

export default function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let animationId: number;
    let resizeTimeout: number;

    // Device pixel ratio support
    function setCanvasSize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      if (window.devicePixelRatio > 1) {
        canvas.width = width * 2;
        canvas.height = height * 2;
        ctx?.scale(2, 2);
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    }
    setCanvasSize();

    // Globe variables
    let rotation = 0;
    const dots: Dot[] = [];
    const DOTS_AMOUNT = 3000;
    const DOT_RADIUS = 2.5;
    let GLOBE_RADIUS = width * 0.7;
    let GLOBE_CENTER_Z = -GLOBE_RADIUS;
    let PROJECTION_CENTER_X = width / 2;
    let PROJECTION_CENTER_Y = height / 2;
    let FIELD_OF_VIEW = width * 0.8;

    class Dot {
      x: number;
      y: number;
      z: number;
      color: string;
      xProject: number = 0;
      yProject: number = 0;
      sizeProjection: number = 0;
      constructor(x: number, y: number, z: number, color: string) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
      }
      project(sin: number, cos: number) {
        const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
        const rotZ =
          -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
        this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
        this.xProject = rotX * this.sizeProjection + PROJECTION_CENTER_X;
        this.yProject = this.y * this.sizeProjection + PROJECTION_CENTER_Y;
      }
      draw(sin: number, cos: number) {
        this.project(sin, cos);
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
          this.xProject,
          this.yProject,
          DOT_RADIUS * this.sizeProjection,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }

    function createDots() {
      dots.length = 0;
      for (let i = 0; i < DOTS_AMOUNT; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(Math.random() * 2 - 1);
        const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
        const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
        const z = GLOBE_RADIUS * Math.cos(phi) + GLOBE_CENTER_Z;
        const color = Math.random() < 0.5 ? "#ffffff" : "#1100c7";
        dots.push(new Dot(x, y, z, color));
      }
    }

    function render(a: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
      rotation = a * 0.0004;
      const sineRotation = Math.sin(rotation);
      const cosineRotation = Math.cos(rotation);
      for (let i = 0; i < dots.length; i++) {
        dots[i].draw(sineRotation, cosineRotation);
      }
      animationId = window.requestAnimationFrame(render);
    }

    function afterResize() {
      setCanvasSize();
      GLOBE_RADIUS = width * 0.7;
      GLOBE_CENTER_Z = -GLOBE_RADIUS;
      PROJECTION_CENTER_X = width / 2;
      PROJECTION_CENTER_Y = height / 2;
      FIELD_OF_VIEW = width * 0.8;
      createDots();
    }

    function onResize() {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(afterResize, 500);
    }

    window.addEventListener("resize", onResize);
    createDots();
    animationId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ objectFit: "cover" }}
    />
  );
}
