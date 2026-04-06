import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, X, Play, ArrowLeft, Loader2 } from "lucide-react";
import MapVisualization from "./MapVisualization";
import ResultsPanel from "./ResultsPanel";
import AlgorithmCards from "./AlgorithmCards";
import { runAlgorithm, availableCities, type AlgorithmResult } from "@/lib/routeAlgorithms";

interface RouteDashboardProps {
  onBack: () => void;
}

const algorithms = [
  { value: "bellman-ford", label: "Bellman-Ford (Dynamic Programming)" },
  { value: "all-pairs", label: "All-Pairs Shortest Path" },
  { value: "greedy", label: "Activity Selection (Greedy)" },
  { value: "tsp", label: "Traveling Salesman (NP Problem)" },
];

const RouteDashboard = ({ onBack }: RouteDashboardProps) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [selectedAlgos, setSelectedAlgos] = useState<string[]>(["bellman-ford"]);
  const [results, setResults] = useState<AlgorithmResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addStop = () => setStops((s) => [...s, ""]);
  const removeStop = (i: number) => setStops((s) => s.filter((_, idx) => idx !== i));
  const updateStop = (i: number, v: string) => setStops((s) => s.map((x, idx) => (idx === i ? v : x)));

  const toggleAlgo = (v: string) => {
    setSelectedAlgos((prev) =>
      prev.includes(v) ? prev.filter((a) => a !== v) : [...prev, v]
    );
  };

  const handleFindRoute = async () => {
    if (!source || !destination) return;
    setIsLoading(true);
    setResults([]);
    await new Promise((r) => setTimeout(r, 1200));
    const res = selectedAlgos.map((algo) => runAlgorithm(algo, source, destination, stops));
    setResults(res);
    setIsLoading(false);
  };

  const selectClass =
    "w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-strong border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h1 className="font-bold text-foreground">Smart Route Planner</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 lg:grid-cols-[380px_1fr]"
        >
          {/* Sidebar Controls */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 space-y-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Route Configuration</h3>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Source City</label>
                <select value={source} onChange={(e) => setSource(e.target.value)} className={selectClass}>
                  <option value="">Select source...</option>
                  {availableCities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {stops.map((stop, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-muted-foreground">Stop {i + 1}</label>
                    <button onClick={() => removeStop(i)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                  <select value={stop} onChange={(e) => updateStop(i, e.target.value)} className={selectClass}>
                    <option value="">Select stop...</option>
                    {availableCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              ))}

              <button
                onClick={addStop}
                className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground border border-dashed border-border rounded-xl px-4 py-3 hover:border-primary/50 hover:text-primary transition-all"
              >
                <Plus className="w-4 h-4" /> Add Stop
              </button>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Destination City</label>
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClass}>
                  <option value="">Select destination...</option>
                  {availableCities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs text-muted-foreground">Algorithms</label>
                {algorithms.map((algo) => (
                  <label
                    key={algo.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        selectedAlgos.includes(algo.value)
                          ? "bg-primary border-primary"
                          : "border-border group-hover:border-primary/50"
                      }`}
                    >
                      {selectedAlgos.includes(algo.value) && (
                        <div className="w-1.5 h-1.5 rounded-sm bg-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">{algo.label}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={handleFindRoute}
                disabled={!source || !destination || isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100"
                style={{ background: "var(--gradient-primary)" }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                {isLoading ? "Computing..." : "Find Route"}
              </button>
            </div>

            <AlgorithmCards />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <MapVisualization
              routes={results.map((r) => ({ path: r.path, color: r.color, algorithm: r.algorithm }))}
              isLoading={isLoading}
            />
            <ResultsPanel results={results} />
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>Smart Route Planner</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Built with React · Tailwind CSS · Framer Motion
          </motion.span>
        </div>
      </footer>
    </div>
  );
};

export default RouteDashboard;
