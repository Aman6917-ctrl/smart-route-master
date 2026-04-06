import { motion } from "framer-motion";
import { Route, Clock, Cpu, BookOpen } from "lucide-react";

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

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Results</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((r, i) => (
          <motion.div
            key={r.algorithm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                <h4 className="font-semibold text-foreground">{r.algorithm}</h4>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">{r.timeComplexity}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Route className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Distance:</span>
                <span className="font-mono font-semibold text-foreground">{r.distance} km</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Time:</span>
                <span className="font-mono font-semibold text-foreground">{r.computeTime} ms</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <Cpu className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-muted-foreground">Path: <span className="text-foreground">{r.path.join(" → ")}</span></span>
            </div>

            <div className="flex items-start gap-2 text-xs">
              <BookOpen className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{r.explanation}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {results.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-5"
        >
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Algorithm Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-left border-b border-border">
                  <th className="pb-2 font-medium">Algorithm</th>
                  <th className="pb-2 font-medium">Distance</th>
                  <th className="pb-2 font-medium">Compute Time</th>
                  <th className="pb-2 font-medium">Complexity</th>
                  <th className="pb-2 font-medium">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => {
                  const best = Math.min(...results.map((x) => x.distance));
                  return (
                    <tr key={r.algorithm} className="border-b border-border/50">
                      <td className="py-3 font-medium text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                        {r.algorithm}
                      </td>
                      <td className="py-3 font-mono">{r.distance} km</td>
                      <td className="py-3 font-mono">{r.computeTime} ms</td>
                      <td className="py-3 font-mono text-xs">{r.timeComplexity}</td>
                      <td className="py-3">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(best / r.distance) * 100}%`,
                              backgroundColor: r.color,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResultsPanel;
