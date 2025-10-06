"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function AnimatedJets() {
  const [positions, setPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  const animate = useCallback((time: number) => {
    if (startTimeRef.current === undefined) startTimeRef.current = time;
    const t = (time - startTimeRef.current) / 1000;

    const r = 180;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    setPositions([
      { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) },
      {
        x: cx + r * 0.7 * Math.cos(t * 0.8 + 2),
        y: cy + r * 0.5 * Math.sin(t * 0.8 + 2.5),
      },
      {
        x: cx + r * 0.9 * Math.cos(t * 1.2 - 1),
        y: cy + r * 0.8 * Math.sin(t * 1.1 - 1.5),
      },
    ]);

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <>
      {positions.map((pos, i) => (
        <span
          key={i}
          className="pointer-events-none z-10"
          style={{
            position: "fixed",
            left: pos.x - 50,
            top: pos.y - 50,
            width: 100,
            height: 100,
            transition: "none",
          }}
        >
          <svg
            fill="#000000"
            width="100"
            height="100"
            viewBox="-7.2 -7.2 38.40 38.40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M14,4H11.89a1,1,0,0,0-.81.42L7.16,10H5a2,2,0,0,0-2,2H3a2,2,0,0,0,2,2H7.16l3.92,5.58a1,1,0,0,0,.81.42H14l-1-6h3l1.71,1.71a1,1,0,0,0,.7.29H21l-2-4,2-4H18.41a1,1,0,0,0-.7.29L16,10H13Z"
                style={{ fill: "#2ca9bc" }}
              ></path>
              <path
                d="M14,4H11.89a1,1,0,0,0-.81.42L7.16,10H5a2,2,0,0,0-2,2H3a2,2,0,0,0,2,2H7.16l3.92,5.58a1,1,0,0,0,.81.42H14l-1-6h3l1.71,1.71a1,1,0,0,0,.7.29H21l-2-4,2-4H18.41a1,1,0,0,0-.7.29L16,10H13Z"
                style={{
                  fill: "none",
                  stroke: "#000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }}
              ></path>
            </g>
          </svg>
        </span>
      ))}
    </>
  );
}
