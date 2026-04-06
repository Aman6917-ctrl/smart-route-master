import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, X, Play, ArrowLeft, Loader2, Sparkles, Route } from "lucide-react";
import gsap from "gsap";
import MapVisualization from "./MapVisualization";
import ResultsPanel from "./ResultsPanel";
import AlgorithmCards from "./AlgorithmCards";
import { runAlgorithm, availableCities, type AlgorithmResult } from "@/lib/routeAlgorithms";

interface RouteDashboardProps {
  onBack: () => void;
}

const algorithms = [
  { value: "bellman-ford", label: "Bellman-Ford", tag: "DP", color: "hsl(168 80% 48%)" },
  { value: "all-pairs", label: "All-Pairs Shortest", tag: "O(V³)", color: "hsl(195 100% 50%)" },
  { value: "greedy", label: "Greedy Selection", tag: "Fast", color: "hsl(260 70% 60%)" },
  { value: "tsp", label: "TSP Approximation", tag: "NP", color: "hsl(320 70% 55%)" },
];

const RouteDashboard = ({ onBack }: RouteDashboardProps) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [selectedAlgos, setSelectedAlgos] = useState<string[]>(["bellman-ford"]);
  const [results, setResults] = useState<AlgorithmResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const addStop = () => setStops((s) => [...s, ""]);
  const removeStop = (i: number) => setStops((s) => s.filter((_, idx) => idx !== i));
  const updateStop = (i: number, v: string) => setStops((s) => s.map((x, idx) => (idx === i ? v : x)));

  const toggleAlgo = (v: string) => {
    setSelectedAlgos((prev) =>
      prev.includes(v) ? (prev.length > 1 ? prev.filter((a) => a !== v) : prev) : [...prev, v]
    );
  };

  const handleFindRoute = async () => {
    if (!source || !destination) return;
    setIsLoading(true);
    setResults([]);
    await new Promise((r) => setTimeout(r, 1500));
    const res = selectedAlgos.map((algo) => runAlgorithm(algo, source, destination, stops));
    setResults(res);
    setIsLoading(false);
  };

  const selectClass =
    "w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all hover:border-primary/20";

  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header ref={headerRef} className="sticky top-0 z-50 glass-strong border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </motion.button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <Route className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground font-display text-sm">Smart Route Planner</h1>
                <p className="text-[10px] text-muted-foreground">India Edition</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Ready
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Route Config */}
            <div className="glass-card rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground font-display">Route Configuration</h3>
              </div>

              {/* Source */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">📍 Source City</label>
                <select value={source} onChange={(e) => setSource(e.target.value)} className={selectClass}>
                  <option value="">Select source...</option>
                  {availableCities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Stops */}
              <AnimatePresence>
                {stops.map((stop, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-muted-foreground font-medium">📌 Stop {i + 1}</label>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeStop(i)}
                        className="p-1.5 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                      </motion.button>
                    </div>
                    <select value={stop} onChange={(e) => updateStop(i, e.target.value)} className={selectClass}>
                      <option value="">Select stop...</option>
                      {availableCities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={addStop}
                className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground border border-dashed border-border rounded-xl px-4 py-3 hover:border-primary/40 hover:text-primary transition-all"
              >
                <Plus className="w-4 h-4" /> Stop Add Karo
              </motion.button>

              {/* Destination */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">🏁 Destination City</label>
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClass}>
                  <option value="">Select destination...</option>
                  {availableCities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Algorithms */}
              <div className="space-y-3">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">⚙️ Algorithms</label>
                <div className="space-y-2">
                  {algorithms.map((algo) => (
                    <motion.label
                      key={algo.value}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-all group"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          selectedAlgos.includes(algo.value)
                            ? "border-transparent"
                            : "border-border group-hover:border-primary/40"
                        }`}
                        style={selectedAlgos.includes(algo.value) ? { background: algo.color } : {}}
                      >
                        {selectedAlgos.includes(algo.value) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-sm bg-primary-foreground"
                          />
                        )}
                      </div>
                      <span className="text-sm text-foreground flex-1">{algo.label}</span>
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{algo.tag}</span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedAlgos.includes(algo.value)}
                        onChange={() => toggleAlgo(algo.value)}
                      />
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Find Route Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFindRoute}
                disabled={!source || !destination || isLoading}
                className="gradient-btn w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-primary-foreground disabled:opacity-30 disabled:pointer-events-none text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Computing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Find Route
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Algorithm Cards */}
            <AlgorithmCards />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <MapVisualization
              routes={results.map((r) => ({ path: r.path, color: r.color, algorithm: r.algorithm }))}
              isLoading={isLoading}
            />
            <ResultsPanel results={results} />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Route className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-bold font-display text-foreground">Smart Route Planner</span>
            <span className="text-muted-foreground">• India 🇮🇳</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {["React", "Tailwind", "Framer Motion", "GSAP"].map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1.5 hover:text-foreground transition-colors">{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RouteDashboard;
