import { motion } from "framer-motion";

interface RouteResult {
  path: string[];
  color: string;
  algorithm: string;
}

interface MapVisualizationProps {
  routes: RouteResult[];
  isLoading: boolean;
}

// Indian cities map positions (approximate lat/long mapped to viewbox)
const cityPositions: Record<string, { x: number; y: number }> = {
  "Delhi": { x: 52, y: 18 },
  "Mumbai": { x: 30, y: 55 },
  "Bangalore": { x: 38, y: 78 },
  "Chennai": { x: 50, y: 80 },
  "Kolkata": { x: 72, y: 38 },
  "Hyderabad": { x: 42, y: 62 },
  "Pune": { x: 32, y: 58 },
  "Jaipur": { x: 42, y: 22 },
  "Lucknow": { x: 58, y: 24 },
  "Ahmedabad": { x: 28, y: 38 },
  "Kochi": { x: 35, y: 90 },
  "Chandigarh": { x: 48, y: 12 },
  "Goa": { x: 30, y: 68 },
  "Varanasi": { x: 62, y: 28 },
  "Agra": { x: 52, y: 23 },
  "Udaipur": { x: 34, y: 30 },
  "Amritsar": { x: 44, y: 8 },
  "Surat": { x: 28, y: 46 },
  "Nagpur": { x: 48, y: 48 },
  "Patna": { x: 66, y: 30 },
  "Bhubaneswar": { x: 66, y: 50 },
  "Visakhapatnam": { x: 58, y: 56 },
  "Madurai": { x: 44, y: 90 },
  "Thiruvananthapuram": { x: 36, y: 95 },
  "Mysore": { x: 36, y: 80 },
  "Shimla": { x: 50, y: 10 },
  "Jodhpur": { x: 34, y: 22 },
};

const MapVisualization = ({ routes, isLoading }: MapVisualizationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display">
          🗺️ Route Visualization — India
        </h3>
        {routes.length > 0 && (
          <span className="text-xs text-primary font-mono">{routes.length} algorithm(s) active</span>
        )}
      </div>

      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-background/50 border border-border/50">
        <div className="absolute inset-0 dot-bg opacity-20" />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="mapGlow">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background city dots */}
          {Object.entries(cityPositions).map(([name, pos]) => (
            <g key={name}>
              <circle cx={pos.x} cy={pos.y} r="0.6" fill="hsl(230 15% 22%)" />
              <text
                x={pos.x}
                y={pos.y - 2}
                textAnchor="middle"
                fill="hsl(215 15% 40%)"
                fontSize="1.6"
                fontFamily="Inter"
                fontWeight="500"
              >
                {name}
              </text>
            </g>
          ))}

          {/* Animated route lines */}
          {routes.map((route, ri) =>
            route.path.slice(0, -1).map((city, i) => {
              const from = cityPositions[city];
              const to = cityPositions[route.path[i + 1]];
              if (!from || !to) return null;
              return (
                <motion.line
                  key={`${ri}-${i}`}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={route.color}
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  filter="url(#mapGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                />
              );
            })
          )}

          {/* Active city highlights */}
          {routes.flatMap((route) =>
            route.path.map((city) => {
              const pos = cityPositions[city];
              if (!pos) return null;
              return (
                <g key={`${route.algorithm}-${city}`}>
                  <motion.circle
                    cx={pos.x} cy={pos.y} r="2.5"
                    fill={`${route.color}20`}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx={pos.x} cy={pos.y} r="1.2"
                    fill={route.color}
                    filter="url(#mapGlow)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  />
                </g>
              );
            })
          )}
        </svg>

        {/* Loading overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-md"
          >
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-accent/30 border-b-accent"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm text-muted-foreground font-medium"
            >
              Computing optimal routes...
            </motion.p>
          </motion.div>
        )}

        {/* Empty state */}
        {routes.length === 0 && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl mb-3"
            >
              🚀
            </motion.div>
            <p className="text-muted-foreground text-sm">Cities select karo aur algorithm chalao</p>
          </div>
        )}
      </div>

      {/* Route legend */}
      {routes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 mt-4"
        >
          {routes.map((r) => (
            <div key={r.algorithm} className="flex items-center gap-2 text-xs text-muted-foreground glass rounded-full px-3 py-1.5">
              <div className="w-4 h-1 rounded-full" style={{ backgroundColor: r.color, boxShadow: `0 0 8px ${r.color}60` }} />
              {r.algorithm}
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MapVisualization;
