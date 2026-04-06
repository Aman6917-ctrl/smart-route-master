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

const cityPositions: Record<string, { x: number; y: number }> = {
  "New York": { x: 80, y: 30 },
  "Los Angeles": { x: 15, y: 55 },
  "Chicago": { x: 60, y: 25 },
  "Houston": { x: 45, y: 70 },
  "Phoenix": { x: 22, y: 60 },
  "Philadelphia": { x: 78, y: 32 },
  "San Antonio": { x: 40, y: 72 },
  "San Diego": { x: 14, y: 60 },
  "Dallas": { x: 48, y: 62 },
  "Denver": { x: 35, y: 38 },
  "Seattle": { x: 13, y: 12 },
  "Boston": { x: 85, y: 22 },
  "Miami": { x: 80, y: 80 },
  "Atlanta": { x: 70, y: 58 },
  "San Francisco": { x: 10, y: 38 },
};

const MapVisualization = ({ routes, isLoading }: MapVisualizationProps) => {
  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Route Visualization</h3>
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-background/50">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Cities */}
          {Object.entries(cityPositions).map(([name, pos]) => (
            <g key={name}>
              <circle cx={pos.x} cy={pos.y} r="1" fill="hsl(230 15% 30%)" />
              <text x={pos.x} y={pos.y - 2} textAnchor="middle" fill="hsl(215 15% 55%)" fontSize="2" fontFamily="Inter">
                {name}
              </text>
            </g>
          ))}

          {/* Routes */}
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
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                />
              );
            })
          )}

          {/* Highlighted route cities */}
          {routes.flatMap((route) =>
            route.path.map((city) => {
              const pos = cityPositions[city];
              if (!pos) return null;
              return (
                <motion.circle
                  key={`${route.algorithm}-${city}`}
                  cx={pos.x} cy={pos.y} r="1.5"
                  fill={route.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })
          )}
        </svg>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {routes.length === 0 && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Select cities and run an algorithm to see routes</p>
          </div>
        )}
      </div>

      {routes.length > 0 && (
        <div className="flex gap-4 mt-4">
          {routes.map((r) => (
            <div key={r.algorithm} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-1 rounded-full" style={{ backgroundColor: r.color }} />
              {r.algorithm}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapVisualization;
