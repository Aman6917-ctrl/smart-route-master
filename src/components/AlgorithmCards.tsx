import { motion } from "framer-motion";
import { GitBranch, Network, Timer, Waypoints } from "lucide-react";

const algorithms = [
  {
    name: "Bellman-Ford",
    type: "Dynamic Programming",
    icon: GitBranch,
    complexity: "O(V·E)",
    desc: "Negative weights handle karta hai. V-1 times edges relax karke shortest path dhundhta hai.",
    color: "hsl(168 80% 48%)",
  },
  {
    name: "All-Pairs Shortest",
    type: "Floyd-Warshall",
    icon: Network,
    complexity: "O(V³)",
    desc: "Har pair ke beech shortest path compute karta hai using DP matrix.",
    color: "hsl(195 100% 50%)",
  },
  {
    name: "Greedy Selection",
    type: "Greedy Scheduling",
    icon: Timer,
    complexity: "O(n log n)",
    desc: "Nearest city greedy select karta hai. Fast hai lekin globally optimal nahi.",
    color: "hsl(260 70% 60%)",
  },
  {
    name: "TSP Approximation",
    type: "NP-Hard Problem",
    icon: Waypoints,
    complexity: "O(n²·2ⁿ)",
    desc: "Saari cities visit karke shortest tour dhundhta hai. DP with bitmask for exact solution.",
    color: "hsl(320 70% 55%)",
  },
];

const AlgorithmCards = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display flex items-center gap-2">
        🧠 Algorithm Details
      </h3>
      <div className="grid gap-3">
        {algorithms.map((algo, i) => (
          <motion.div
            key={algo.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            whileHover={{ x: 4, scale: 1.01 }}
            className="glass-card rounded-xl p-4 hover:border-primary/20 transition-all group cursor-default"
          >
            <div className="flex items-start gap-3">
              <div
                className="p-2 rounded-lg shrink-0 transition-transform group-hover:scale-110"
                style={{ background: `${algo.color}15` }}
              >
                <algo.icon className="w-4 h-4" style={{ color: algo.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-foreground text-sm font-display">{algo.name}</h4>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md shrink-0">
                    {algo.complexity}
                  </span>
                </div>
                <p className="text-[11px] text-primary/70 mb-1">{algo.type}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{algo.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmCards;
