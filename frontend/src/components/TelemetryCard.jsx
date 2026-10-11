import { useState, useEffect } from "react";

export default function TelemetryCard({ origin, destination, distanceKm, selectedRoute }) {
  const [progress, setProgress] = useState(45);

  // Animate progress slightly for live feel
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? 10 : prev + 0.5));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const originName = origin ? `LOC (${origin.lat.toFixed(2)}, ${origin.lng.toFixed(2)})` : "CPH";
  const originSubtitle = origin ? "Copenhagen Origin" : "Copenhagen Station · UTC+2";

  const destName = destination ? `DEST (${destination.lat.toFixed(2)}, ${destination.lng.toFixed(2)})` : "IAC";
  const destSubtitle = destination ? "Illinois Station" : "Illinois Station · UTC+6";

  const modeName = selectedRoute ? selectedRoute.service : "FTG454 Bullet Train";

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl">
      {/* Station Badges & Progress Header */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
        {/* Origin */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold tracking-wider text-white">
              {originName}
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-400 truncate">
            {originSubtitle}
          </p>
        </div>

        {/* Central Vehicle Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/40">
          <span className="text-lg">🚅</span>
        </div>

        {/* Destination */}
        <div className="text-right min-w-0">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-base font-extrabold tracking-wider text-white">
              {destName}
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-400 truncate">
            {destSubtitle}
          </p>
        </div>
      </div>

      {/* Animated Route Distance & Slider */}
      <div className="my-4">
        <div className="relative flex items-center h-4 w-full rounded-full bg-slate-800 p-0.5 border border-white/5 overflow-hidden">
          {/* Progress Bar Fill */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 transition-all duration-700 shadow-sm shadow-cyan-400/50"
            style={{ width: `${progress}%` }}
          />
          {/* Moving Train Indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300 text-slate-950 text-xs shadow-lg shadow-cyan-400/80 transition-all duration-700"
            style={{ left: `calc(${progress}% - 12px)` }}
          >
            🚅
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-slate-400">
          <span>{distanceKm ? `${distanceKm} km · 3h 24m` : "250 km · 3h 24m"}</span>
          <span>{distanceKm ? `${(distanceKm * 1.2).toFixed(1)} km · 1h 24m left` : "303 km · 1h 24m"}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2 rounded-2xl bg-slate-950/60 p-3 border border-white/5 text-center">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Scheduled</p>
          <p className="text-xs font-extrabold text-white mt-0.5">12:20 PM</p>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Estimated</p>
          <p className="text-xs font-extrabold text-cyan-400 mt-0.5">4:35 PM</p>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Top Speed</p>
          <p className="text-xs font-extrabold text-white mt-0.5">250 km/h</p>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Altitude</p>
          <p className="text-xs font-extrabold text-white mt-0.5">25 meters</p>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:brightness-110 active:scale-[0.98]"
      >
        More Details ({modeName})
      </button>
    </div>
  );
}
