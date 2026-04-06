import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Indian cities as graph nodes
const cities = [
  { name: "Delhi", x: 52, y: 18 },
  { name: "Mumbai", x: 30, y: 55 },
  { name: "Bangalore", x: 38, y: 78 },
  { name: "Chennai", x: 50, y: 80 },
  { name: "Kolkata", x: 72, y: 40 },
  { name: "Hyderabad", x: 42, y: 62 },
  { name: "Pune", x: 32, y: 58 },
  { name: "Jaipur", x: 42, y: 22 },
  { name: "Lucknow", x: 58, y: 25 },
  { name: "Ahmedabad", x: 28, y: 38 },
  { name: "Kochi", x: 35, y: 88 },
  { name: "Chandigarh", x: 48, y: 12 },
];

const edges = [
  [0, 7], [0, 8], [0, 4], [7, 9], [8, 4], [9, 1], [1, 6],
  [6, 5], [5, 3], [5, 2], [2, 3], [2, 10], [4, 3], [1, 5],
  [0, 11], [7, 0], [9, 6], [3, 10],
];

const AnimatedGrid = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // GSAP: Animate route pulse along edges
    const lines = svgRef.current.querySelectorAll(".route-line");
    gsap.fromTo(lines, 
      { strokeDashoffset: 200 },
      { 
        strokeDashoffset: 0, 
        duration: 3, 
        stagger: 0.15, 
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    // GSAP: Pulse city dots
    const dots = svgRef.current.querySelectorAll(".city-dot");
    gsap.to(dots, {
      scale: 1.5,
      opacity: 0.8,
      duration: 2,
      stagger: { each: 0.2, repeat: -1, yoyo: true },
      ease: "sine.inOut",
      transformOrigin: "center center",
    });
  }, []);

  useEffect(() => {
    if (!orbsRef.current) return;
    const orbs = orbsRef.current.querySelectorAll(".floating-orb");
    gsap.to(orbs, {
      y: "random(-40, 40)",
      x: "random(-30, 30)",
      duration: "random(4, 8)",
      stagger: { each: 0.5, repeat: -1, yoyo: true },
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 animate-grid-move opacity-10 grid-bg" />

      {/* Floating orbs */}
      <div ref={orbsRef} className="absolute inset-0">
        <div className="floating-orb absolute top-[15%] left-[20%] w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
        <div className="floating-orb absolute top-[50%] right-[15%] w-80 h-80 rounded-full bg-accent/5 blur-[100px]" />
        <div className="floating-orb absolute bottom-[20%] left-[40%] w-48 h-48 rounded-full bg-primary/4 blur-[60px]" />
      </div>

      {/* SVG Graph */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(168 80% 48%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(195 100% 50%)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map(([a, b], i) => (
          <line
            key={i}
            className="route-line"
            x1={cities[a].x} y1={cities[a].y}
            x2={cities[b].x} y2={cities[b].y}
            stroke="url(#lineGrad)"
            strokeWidth="0.15"
            strokeDasharray="2 2"
          />
        ))}

        {cities.map((city, i) => (
          <g key={i}>
            <circle
              className="city-dot"
              cx={city.x} cy={city.y} r="0.6"
              fill="hsl(168 80% 48%)"
              filter="url(#glow)"
            />
            <text
              x={city.x} y={city.y - 2}
              textAnchor="middle"
              fill="hsl(210 40% 96% / 0.3)"
              fontSize="1.5"
              fontFamily="Inter"
            >
              {city.name}
            </text>
          </g>
        ))}

        {/* Animated traveler dot */}
        <motion.circle
          r="1"
          fill="hsl(168 80% 48%)"
          filter="url(#glow)"
          animate={{
            cx: [cities[0].x, cities[7].x, cities[9].x, cities[1].x, cities[5].x, cities[2].x, cities[10].x],
            cy: [cities[0].y, cities[7].y, cities[9].y, cities[1].y, cities[5].y, cities[2].y, cities[10].y],
            opacity: [0, 1, 1, 1, 1, 1, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Edge fades */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default AnimatedGrid;
