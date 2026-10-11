import { useState } from "react";

const SEATS = [
  { id: "46B", row: 12, side: "Left", status: "Occupied", type: "Window", price: "$45" },
  { id: "47B", row: 12, side: "Aisle", status: "Selected", type: "Aisle", price: "$50" },
  { id: "45B", row: 11, side: "Right", status: "Available", type: "Window", price: "$45" },
  { id: "48A", row: 13, side: "Left", status: "Available", type: "Executive", price: "$75" },
  { id: "48B", row: 13, side: "Right", status: "Available", type: "Executive", price: "$75" }
];

const CATEGORIES = ["Emergency Exits", "Seat", "Toilets", "Gourmet Bar"];

export default function SeatTrackerView({ onBackToMap }) {
  const [selectedSeat, setSelectedSeat] = useState("47B");
  const [activeCategory, setActiveCategory] = useState("Seat");
  const [seatFilter, setSeatFilter] = useState("All");

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 lg:p-8">
      {/* Container simulating Screen 3 mock */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-[36px] border-2 border-white/10 bg-slate-950 shadow-2xl shadow-cyan-950/40">
        
        {/* Screen Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-6 py-4 backdrop-blur-xl">
          <button
            type="button"
            onClick={onBackToMap}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            ←
          </button>

          <div className="text-center">
            <h3 className="text-sm font-extrabold text-white">FTG454 Ryanair</h3>
            <p className="text-[11px] font-medium text-cyan-400">Bullet Train Executive Carriage 04</p>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            •••
          </button>
        </div>

        {/* Train Interior Perspective Visual & Interactive Seat Markers */}
        <div className="relative h-[420px] w-full overflow-hidden bg-slate-900">
          {/* SVG Interior Cabin Perspective Backdrop */}
          <svg viewBox="0 0 500 400" className="h-full w-full object-cover">
            <defs>
              <linearGradient id="aisleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
              <linearGradient id="seatBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
              <linearGradient id="floorGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Ceiling lights */}
            <path d="M150,0 L200,80 L300,80 L350,0 Z" fill="#00F2FE" opacity="0.3" filter="blur(8px)" />
            <line x1="200" y1="0" x2="220" y2="100" stroke="#00F2FE" strokeWidth="2" opacity="0.7" />
            <line x1="300" y1="0" x2="280" y2="100" stroke="#00F2FE" strokeWidth="2" opacity="0.7" />

            {/* Cabin Walls & Perspective Lines */}
            <polygon points="0,0 150,120 150,400 0,400" fill="#0F172A" />
            <polygon points="500,0 350,120 350,400 500,400" fill="#0F172A" />
            <polygon points="150,120 350,120 350,400 150,400" fill="url(#aisleGrad)" />

            {/* Floor Center Glow Line */}
            <polygon points="210,120 290,120 340,400 160,400" fill="url(#floorGlow)" />
            <line x1="250" y1="120" x2="250" y2="400" stroke="#00F2FE" strokeWidth="2" strokeDasharray="8 8" opacity="0.8" />

            {/* Seat Row Blocks Left */}
            <g transform="translate(40, 150)">
              <rect x="0" y="40" width="80" height="120" rx="16" fill="url(#seatBlueGrad)" opacity="0.9" />
              <rect x="0" y="180" width="90" height="130" rx="16" fill="url(#seatBlueGrad)" opacity="0.9" />
            </g>

            {/* Seat Row Blocks Right */}
            <g transform="translate(380, 150)">
              <rect x="-80" y="40" width="80" height="120" rx="16" fill="url(#seatBlueGrad)" opacity="0.9" />
              <rect x="-90" y="180" width="90" height="130" rx="16" fill="url(#seatBlueGrad)" opacity="0.9" />
            </g>
          </svg>

          {/* Floating Seat Nodes Overlay (Screen 3 style) */}
          <div className="absolute inset-0 p-6 flex flex-col justify-around">
            {/* Row 1 Floating Pill Node 46B */}
            <div className="absolute top-1/3 left-10">
              <button
                type="button"
                onClick={() => setSelectedSeat("46B")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all shadow-lg ${
                  selectedSeat === "46B"
                    ? "bg-cyan-400 text-slate-950 ring-4 ring-cyan-400/40 shadow-cyan-400/60 scale-110"
                    : "bg-slate-900/90 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950"
                }`}
              >
                <span>💺</span>
                <span>46B</span>
              </button>
            </div>

            {/* Row 2 Floating Pill Node 47B Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
              <button
                type="button"
                onClick={() => setSelectedSeat("47B")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold transition-all shadow-lg ${
                  selectedSeat === "47B"
                    ? "bg-cyan-400 text-slate-950 ring-4 ring-cyan-400/40 shadow-cyan-400/60 scale-110"
                    : "bg-slate-900/90 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950"
                }`}
              >
                <span>💺</span>
                <span>47B</span>
                <span className="rounded bg-slate-950/80 px-1 text-[10px] text-cyan-300">Selected</span>
              </button>
            </div>

            {/* Row 3 Floating Pill Node 45B Right */}
            <div className="absolute top-2/5 right-10">
              <button
                type="button"
                onClick={() => setSelectedSeat("45B")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all shadow-lg ${
                  selectedSeat === "45B"
                    ? "bg-cyan-400 text-slate-950 ring-4 ring-cyan-400/40 shadow-cyan-400/60 scale-110"
                    : "bg-slate-900/90 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950"
                }`}
              >
                <span>💺</span>
                <span>45B</span>
              </button>
            </div>
          </div>

          {/* Bottom Category Navigation Pills (Emergency Exits, Seat, Toilets, Gourmet) */}
          <div className="absolute bottom-4 inset-x-4 z-20 flex justify-center">
            <div className="flex gap-2 overflow-x-auto rounded-full bg-slate-950/80 p-1.5 border border-white/10 backdrop-blur-xl">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/40"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Station Detail Footer Card (Screen 3 inspired bottom card) */}
        <div className="bg-slate-950 p-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-extrabold text-white">Illinois Station</h4>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                Executive Class Carriage · Seat {selectedSeat}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950 border border-cyan-500/30 text-2xl shadow-lg shadow-cyan-500/20">
              🚅
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToMap}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:brightness-110 active:scale-[0.98]"
          >
            24.5 km Remaining (Track Route)
          </button>
        </div>
      </div>
    </div>
  );
}
