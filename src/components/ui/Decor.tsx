import type { CSSProperties } from "react";

type DecorProps = { className?: string; color?: string; style?: CSSProperties };

/** Декоративные фигуры — всегда aria-hidden и без событий указателя */

export function Star({ className = "", color = "#F5B42A", style }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none ${className}`} style={style} aria-hidden="true">
      <path
        fill={color}
        d="M12 1.8c.5 0 .9.3 1.1.8l2.3 5 5.4.6c1 .1 1.4 1.4.6 2l-4 3.7 1.1 5.4c.2 1-.9 1.7-1.7 1.2L12 17.8l-4.8 2.7c-.9.5-1.9-.2-1.7-1.2l1.1-5.4-4-3.7c-.8-.7-.4-1.9.6-2l5.4-.6 2.3-5c.2-.5.6-.8 1.1-.8Z"
      />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#A78BFA", style }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none ${className}`} style={style} aria-hidden="true">
      <path fill={color} d="M12 0c.6 5.6 3.4 9.4 12 12-8.6 2.6-11.4 6.4-12 12-.6-5.6-3.4-9.4-12-12C8.6 9.4 11.4 5.6 12 0Z" />
    </svg>
  );
}

export function Flower({ className = "", color = "#FF9DBE", style }: DecorProps) {
  return (
    <svg viewBox="0 0 40 40" className={`pointer-events-none ${className}`} style={style} aria-hidden="true">
      <g fill={color}>
        <circle cx="20" cy="9" r="7.5" />
        <circle cx="30.5" cy="16.5" r="7.5" />
        <circle cx="26.5" cy="29" r="7.5" />
        <circle cx="13.5" cy="29" r="7.5" />
        <circle cx="9.5" cy="16.5" r="7.5" />
      </g>
      <circle cx="20" cy="20" r="6" fill="#FFD666" />
    </svg>
  );
}

export function Cloud({ className = "", color = "#FFFFFF", style }: DecorProps) {
  return (
    <svg viewBox="0 0 64 36" className={`pointer-events-none ${className}`} style={style} aria-hidden="true">
      <path
        fill={color}
        d="M17 35C8 35 2 29.6 2 23c0-6 4.8-10.6 11-11C15 5.4 21 1 28 1c7.8 0 14 5 15.4 12C45 12.4 46.6 12 48.4 12 56.4 12 62 17.4 62 23.6 62 30 56.6 35 49 35H17Z"
      />
    </svg>
  );
}

export function Circle({ className = "", color = "#E9D9FF", style }: DecorProps) {
  return <span aria-hidden="true" className={`pointer-events-none block rounded-full ${className}`} style={{ background: color, ...style }} />;
}

export function Squiggle({ className = "", color = "#A78BFA", style }: DecorProps) {
  return (
    <svg viewBox="0 0 120 20" className={`pointer-events-none ${className}`} style={style} aria-hidden="true" fill="none">
      <path d="M2 10c10-9 20-9 29 0s19 9 29 0 19-9 29 0 19 9 29 0" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Волнистая граница между разделами. fill — цвет следующего раздела */
export function Wave({ fill, className = "", flip = false }: { fill: string; className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none block h-8 w-full sm:h-12 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        fill={fill}
        d="M0 38c120-26 240-30 360-12s240 34 360 22 240-42 360-40 240 26 360 30v32H0Z"
      />
    </svg>
  );
}
