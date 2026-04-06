import { motion } from "framer-motion";
import { Route, Clock, Cpu, BookOpen, TrendingUp } from "lucide-react";

interface Result {
  algorithm: string;
  distance: number;
  path: string[];
  timeComplexity: string;
  explanation: string;
  color: string;
  computeTime: number;
}

interface ResultsPanelProps {
  results: Result[];
}

const ResultsPanel = ({ results }: ResultsPanelProps) => {
  if (results.length === 0) return null;

  const best = Math.min(...results.map((r) => r.distance));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display">Results</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {results.map((r, i) => (
          <motion.div
            key={r.algorithm}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl p-6 space-y-4 relative group"
          >
            {/* Best badge */}
            {r.distance === best && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                ⚡ BEST
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full ring-4 ring-offset-2 ring-offset-card"
                  style={{ backgroundColor: r.color, ringColor: `${r.color}30`, boxShadow: `0 0 15px ${r.color}40` }}
                />
                <h4 className="font-bold text-foreground font-display">{r.algorithm}</h4>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">{r.timeComplexity}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Route className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Distance</span>
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-bold font-mono text-foreground"
                >
                  {r.distance}
                  <span className="text-xs text-muted-foreground ml-1">km</span>
                </motion.span>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Time</span>
                </div>
                <span className="text-xl font-bold font-mono text-foreground">
                  {r.computeTime}
                  <span className="text-xs text-muted-foreground ml-1">ms</span>
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm glass rounded-xl p-3">
              <Cpu className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div className="overflow-x-auto">
                <span className="text-muted-foreground text-xs">Path: </span>
                <span className="text-foreground text-xs font-medium">{r.path.join(" → ")}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs">
              <BookOpen className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-muted-foreground leading-relaxed">{r.explanation}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison table */}
      {results.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5 font-display flex items-center gap-2">
            📊 Algorithm Comparison
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-left border-b border-border">
                  <th className="pb-3 font-medium text-xs uppercase tracking-wider">Algorithm</th>
                  <th className="pb-3 font-medium text-xs uppercase tracking-wider">Distance</th>
                  <th className="pb-3 font-medium text-xs uppercase tracking-wider">Time</th>
                  <th className="pb-3 font-medium text-xs uppercase tracking-wider">Complexity</th>
                  <th className="pb-3 font-medium text-xs uppercase tracking-wider">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <motion.tr
                    key={r.algorithm}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 font-medium text-foreground">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: r.color, boxShadow: `0 0 8px ${r.color}50` }}
                        />
                        {r.algorithm}
                      </div>
                    </td>
                    <td className="py-4 font-mono font-semibold">{r.distance} km</td>
                    <td className="py-4 font-mono">{r.computeTime} ms</td>
                    <td className="py-4 font-mono text-xs text-muted-foreground">{r.timeComplexity}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(best / r.distance) * 100}%` }}
                            transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                            style={{ backgroundColor: r.color }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          {Math.round((best / r.distance) * 100)}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultsPanel;
