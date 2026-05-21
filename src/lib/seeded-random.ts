/** Deterministic 0–1 value from an integer seed (stable on server and client). */
export function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function seededRange(seed: number, min: number, max: number): number {
  return min + seededUnit(seed) * (max - min);
}
