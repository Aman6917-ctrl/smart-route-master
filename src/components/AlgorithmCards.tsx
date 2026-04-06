import { motion } from "framer-motion";
import { GitBranch, Network, Timer, Waypoints } from "lucide-react";

const algorithms = [
  {
    name: "Bellman-Ford",
    type: "Dynamic Programming",
    icon: GitBranch,
    complexity: "O(V·E)",
    desc: "Handles negative edge weights. Relaxes all edges V-1 times to find shortest paths.",
    color: "hsl(168 80% 50%)",
  },
  {
    name: "All-Pairs Shortest",
    type: "Floyd-Warshall",
    icon: Network,
    complexity: "O(V³)",
    desc: "Computes shortest paths between every pair of vertices using dynamic programming.",
    color: "hsl(200 90% 55%)",
  },
  {
    name: "Activity Selection",
    type: "Greedy Scheduling",
    icon: Timer,
    complexity: "O(n log n)",
    desc: "Selects maximum non-overlapping activities by greedy finish-time ordering.",
    color: "hsl(260 70% 60%)",
  },
  {
    name: "TSP Approximation",
    type: "NP-Hard Problem",
    icon: Waypoints,
    complexity: "O(n² · 2ⁿ)",
    desc: "Approximates the shortest tour visiting all cities exactly once using DP with bitmask.",
    color: "hsl(300 65% 55%)",
  },
];

const AlgorithmCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {algorithms.map((algo, i) => (
        <motion.div
          key={algo.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-xl bg-muted">
              <algo.icon className="w-5 h-5" style={{ color: algo.color }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">{algo.complexity}</span>
          </div>
          <h4 className="font-semibold text-foreground mb-1">{algo.name}</h4>
          <p className="text-xs text-muted-foreground mb-2">{algo.type}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{algo.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default AlgorithmCards;
