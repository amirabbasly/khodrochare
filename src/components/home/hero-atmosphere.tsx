/** Decorative CSS/SVG motion, no maps API, canvas loop or animation dependency. */
export function HeroAtmosphere() {
  return <div className="hero-atmosphere" aria-hidden="true">
    <div className="hero-aurora hero-aurora-one" /><div className="hero-aurora hero-aurora-two" />
    <svg className="hero-route-network" viewBox="0 0 1000 700" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="hero-route-gradient"><stop stopColor="#ff691e" stopOpacity="0" /><stop offset=".5" stopColor="#ffb36b" /><stop offset="1" stopColor="#38bdf8" stopOpacity=".2" /></linearGradient></defs>
      <path className="hero-route-base" d="M-50 580C150 580 120 180 350 240S520 610 700 380 850 150 1080 90" />
      <path className="hero-route-trace" d="M-50 580C150 580 120 180 350 240S520 610 700 380 850 150 1080 90" />
      <g className="hero-beacon"><circle cx="350" cy="240" r="7" /><circle className="hero-beacon-ring" cx="350" cy="240" r="22" /></g>
      <g className="hero-beacon"><circle cx="700" cy="380" r="7" /><circle className="hero-beacon-ring" cx="700" cy="380" r="22" /></g>
    </svg>
    <div className="hero-horizon" />
  </div>;
}
