export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-[2000] w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("welcome")}>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
            <span className="text-xl">🚅</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              Urban<span className="text-cyan-400">Transit</span>
            </h1>
            <p className="text-[11px] font-medium text-slate-400 hidden sm:block">
              Multimodal Travel Intelligence
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Screen 1, Screen 2, Screen 3 inspired) */}
        <nav className="flex items-center rounded-full bg-slate-900/90 p-1 border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("welcome")}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "welcome"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🎫</span>
            <span className="hidden md:inline">Welcome</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("map")}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "map"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🗺️</span>
            <span>Journey & Map</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("seat")}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "seat"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>💺</span>
            <span className="hidden sm:inline">Live Cabin & Seat</span>
          </button>
        </nav>

        {/* Right status badge */}
        <div className="hidden lg:flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>FTG454 Bullet Train Active</span>
        </div>
      </div>
    </header>
  );
}
