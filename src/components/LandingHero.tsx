import { motion } from "framer-motion";
import { MapPin, ArrowRight, Zap } from "lucide-react";
import AnimatedGrid from "./AnimatedGrid";

interface LandingHeroProps {
  onStart: () => void;
}

const LandingHero = ({ onStart }: LandingHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedGrid />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by Advanced Algorithms</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Smart</span>{" "}
            <span className="gradient-text">Route Planner</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto text-balance">
            Find optimal routes using advanced algorithms. Compare Bellman-Ford, TSP, and more — all in one place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground overflow-hidden transition-all hover:scale-105 active:scale-95"
            style={{ background: "var(--gradient-primary)" }}
          >
            <MapPin className="w-5 h-5" />
            Start Planning
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 text-muted-foreground text-sm"
        >
          {["Bellman-Ford", "All-Pairs", "Greedy", "TSP"].map((algo) => (
            <span key={algo} className="glass rounded-full px-3 py-1 text-xs">{algo}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LandingHero;
