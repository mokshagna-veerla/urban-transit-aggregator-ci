const modeDetails = {
  Bus: "Public bus",
  "Local Train": "Rail",
  Metro: "Metro rail",
  Car: "Private car",
  Bike: "Bike taxi",
  Taxi: "Cab"
};

export default function RouteCard({ route, onSelect, isSelected }) {
  return (
    <article
      onClick={() => onSelect && onSelect(route)}
      className={`relative cursor-pointer overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
        isSelected
          ? "border-cyan-400 bg-slate-900/95 ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-950/60"
          : "border-white/10 bg-slate-900/70 hover:border-white/20 hover:bg-slate-900/90"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950 text-2xl shadow-inner">
          {route.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <span>{route.service}</span>
                {route.category === "Public Transit" ? (
                  <span className="rounded bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300">
                    TRANSIT
                  </span>
                ) : (
                  <span className="rounded bg-blue-950/80 border border-blue-500/30 px-1.5 py-0.5 text-[9px] font-bold text-blue-300">
                    CAB / RIDE
                  </span>
                )}
              </h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">
                {modeDetails[route.mode] || route.mode} · {route.distanceKm} km
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-extrabold text-cyan-400 glow-text-cyan">
                ₹{route.price}
              </p>
              <p className="text-[10px] font-semibold text-slate-400">
                {route.pricingType}
              </p>
            </div>
          </div>

          <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-white/5 bg-slate-950/60 px-2 py-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Total
              </p>
              <p className="text-xs font-extrabold text-white mt-0.5">
                {route.totalMinutes} min
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-950/60 px-2 py-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Wait
              </p>
              <p className="text-xs font-extrabold text-white mt-0.5">
                {route.waitMinutes} min
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-950/60 px-2 py-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Travel
              </p>
              <p className="truncate text-xs font-extrabold text-cyan-300 mt-0.5">
                {route.travelMinutes} min
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate">{route.schedule || "On-demand availability"}</span>
            <span className="font-bold text-cyan-400 hover:underline">
              Select Route →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
