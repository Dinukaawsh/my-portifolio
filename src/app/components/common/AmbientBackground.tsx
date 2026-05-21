type AmbientVariant = "default" | "violet" | "emerald" | "cyan";

const VARIANTS: Record<
  AmbientVariant,
  { gradient: string; orbA: string; orbB: string }
> = {
  default: {
    gradient: "from-slate-950 via-slate-900 to-slate-950",
    orbA: "bg-blue-500/15",
    orbB: "bg-violet-500/10",
  },
  violet: {
    gradient: "from-slate-950 via-indigo-950/40 to-slate-950",
    orbA: "bg-violet-500/20",
    orbB: "bg-fuchsia-500/10",
  },
  emerald: {
    gradient: "from-slate-950 via-emerald-950/30 to-slate-950",
    orbA: "bg-emerald-500/15",
    orbB: "bg-teal-500/10",
  },
  cyan: {
    gradient: "from-slate-950 via-cyan-950/30 to-slate-950",
    orbA: "bg-cyan-500/15",
    orbB: "bg-blue-500/10",
  },
};

export default function AmbientBackground({
  variant = "default",
}: {
  variant?: AmbientVariant;
}) {
  const colors = VARIANTS[variant];

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
      <div
        className={`absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl ${colors.orbA}`}
      />
      <div
        className={`absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl ${colors.orbB}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
    </div>
  );
}
