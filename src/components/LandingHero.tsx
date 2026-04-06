import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { MapPin, ArrowRight, Zap, Route, Sparkles, ChevronDown } from "lucide-react";
import AnimatedGrid from "./AnimatedGrid";

interface LandingHeroProps {
  onStart: () => void;
}

const stats = [
  { label: "Cities", value: "50+", icon: MapPin },
  { label: "Algorithms", value: "4", icon: Route },
  { label: "Real-time", value: "< 1s", icon: Zap },
];

const features = [
  { title: "Bellman-Ford", desc: "Dynamic Programming", color: "hsl(168 80% 48%)" },
  { title: "Floyd-Warshall", desc: "All-Pairs Shortest", color: "hsl(195 100% 50%)" },
  { title: "Greedy", desc: "Activity Scheduling", color: "hsl(260 70% 60%)" },
  { title: "TSP", desc: "NP-Hard Approx", color: "hsl(320 70% 55%)" },
];

const LandingHero = ({ onStart }: LandingHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useTransform(mouseX, (v) => `${v}px`);
  const spotlightY = useTransform(mouseY, (v) => `${v}px`);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(chars,
      { y: 80, opacity: 0, rotationX: -90 },
      {
        y: 0, opacity: 1, rotationX: 0,
        duration: 1, stagger: 0.04,
        ease: "back.out(1.7)",
        delay: 0.3,
      }
    );
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ perspective: "600px" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div ref={heroRef} className="relative" onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGrid />

        {/* Mouse spotlight */}
        <motion.div
          className="pointer-events-none fixed z-10 w-[500px] h-[500px] rounded-full"
          style={{
            left: spotlightX,
            top: spotlightY,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, hsl(168 80% 48% / 0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2.5 animate-border-glow">
              <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm text-muted-foreground font-medium">Advanced Route Optimization for India</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 font-display leading-[0.9]">
            <span className="block text-foreground">{splitText("Smart")}</span>
            <span className="block gradient-text mt-2">{splitText("Route Planner")}</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance mb-12 leading-relaxed"
          >
            Delhi se Mumbai, Bangalore se Kolkata — find the fastest routes across India 
            using <span className="text-foreground font-medium">cutting-edge algorithms</span> in real-time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button onClick={onStart} className="gradient-btn group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-primary-foreground text-lg">
              <MapPin className="w-5 h-5" />
              Start Planning
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-2xl px-8 py-5 font-semibold text-foreground hover:border-primary/40 transition-all"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Algorithms
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center justify-center gap-8 md:gap-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold font-display text-foreground">{stat.value}</span>
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-30" />
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">Algorithms</span>
            <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-foreground mb-6">
              Power of <span className="gradient-text">Multiple Algorithms</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Compare performance across different approaches — from DP to NP-hard approximations.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 cursor-default group"
                style={{ perspective: "800px" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${f.color}20` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: f.color, boxShadow: `0 0 20px ${f.color}40` }} />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-1 font-display">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA after features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-20"
          >
            <button onClick={onStart} className="gradient-btn inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-primary-foreground text-lg">
              <Route className="w-5 h-5" />
              Try It Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-bold font-display text-foreground">Smart Route Planner</span>
            <span className="text-muted-foreground text-sm">— India Edition</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-xs text-muted-foreground"
          >
            {["React", "Tailwind CSS", "Framer Motion", "GSAP"].map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1.5">{t}</span>
            ))}
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingHero;
