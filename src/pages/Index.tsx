import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingHero from "@/components/LandingHero";
import RouteDashboard from "@/components/RouteDashboard";

const Index = () => {
  const [view, setView] = useState<"landing" | "dashboard">("landing");

  return (
    <AnimatePresence mode="wait">
      {view === "landing" ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <LandingHero onStart={() => setView("dashboard")} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <RouteDashboard onBack={() => setView("landing")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
