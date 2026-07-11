export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, rgba(245,158,11,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255,184,0,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 100%, rgba(30,41,59,0.5) 0%, transparent 50%)
          `,
        }}
      />

      <div className="absolute inset-0 grid-bg opacity-40" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="neural"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="60" cy="60" r="1.5" fill="#FFB800" />
            <line x1="60" y1="60" x2="120" y2="30" stroke="#FFB800" strokeWidth="0.5" />
            <line x1="60" y1="60" x2="30" y2="90" stroke="#FFB800" strokeWidth="0.5" />
            <line x1="60" y1="60" x2="90" y2="120" stroke="#FFB800" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural)" />
      </svg>

      <div className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[#F59E0B]/[0.07] blur-[120px] animate-pulse-glow" />
      <div
        className="absolute right-[5%] top-[40%] h-[400px] w-[400px] rounded-full bg-[#FFB800]/[0.05] blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-[10%] left-[40%] h-[350px] w-[350px] rounded-full bg-[#1E293B]/60 blur-[80px] animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />

      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#FFB800]/20 animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${6 + p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 13) % 94) + 3,
  y: ((i * 53 + 7) % 90) + 5,
  size: 2 + (i % 4),
  delay: (i % 4) * 0.75,
}));
