import { motion } from "framer-motion";

const nodes = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 10 + (i % 4) * 25,
  y: 15 + Math.floor(i / 4) * 30,
}));

const edges = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7],
  [4, 5], [5, 6], [6, 7], [4, 8], [5, 9], [6, 10], [7, 11],
  [8, 9], [9, 10], [10, 11],
];

const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden grid-bg">
      <div className="absolute inset-0 animate-grid-move opacity-30 grid-bg" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
            x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
            stroke="hsl(168 80% 50% / 0.12)"
            strokeWidth="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={`${node.x}%`} cy={`${node.y}%`}
            r="0.5"
            fill="hsl(168 80% 50% / 0.3)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
          />
        ))}
        {/* Animated route pulse */}
        <motion.circle
          r="0.8"
          fill="hsl(168 80% 50%)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            cx: [
              `${nodes[0].x}%`, `${nodes[1].x}%`, `${nodes[5].x}%`,
              `${nodes[9].x}%`, `${nodes[10].x}%`,
            ],
            cy: [
              `${nodes[0].y}%`, `${nodes[1].y}%`, `${nodes[5].y}%`,
              `${nodes[9].y}%`, `${nodes[10].y}%`,
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
      </svg>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-50" />
    </div>
  );
};

export default AnimatedGrid;
