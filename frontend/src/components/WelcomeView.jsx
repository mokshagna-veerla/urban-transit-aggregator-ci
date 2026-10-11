export default function WelcomeView({ onStartJourney }) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 lg:p-8">
      {/* Background Graphic & Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        {/* Left Column: Phone Mockup matching Screen 1 in reference image */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[340px] overflow-hidden rounded-[40px] border-4 border-slate-800/80 bg-slate-950 p-2 shadow-2xl shadow-cyan-950/50">
            {/* Notch */}
            <div className="absolute top-4 left-1/2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-between px-3">
              <span className="text-[10px] text-slate-400 font-bold">9:41</span>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-slate-400">📶</span>
                <span className="text-[9px] text-slate-400">🔋</span>
              </div>
            </div>

            {/* Screen Content Container */}
            <div className="relative h-[620px] w-full overflow-hidden rounded-[32px] bg-slate-900 flex flex-col justify-between">
              {/* Bullet Train Visual Background */}
              <div className="absolute inset-0 z-0">
                <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-950 to-slate-950"></div>
                {/* SVG Bullet Train Illustration */}
                <div className="absolute top-10 inset-x-0 h-[340px] flex items-center justify-center opacity-90">
                  <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
                    <defs>
                      <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00F2FE" />
                        <stop offset="50%" stopColor="#4FACFE" />
                        <stop offset="100%" stopColor="#0052D4" />
                      </linearGradient>
                      <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E0F7FA" />
                        <stop offset="100%" stopColor="#80DEEA" />
                      </linearGradient>
                    </defs>

                    {/* Mountain silhouette background */}
                    <path d="M0,200 L60,140 L120,180 L200,110 L280,170 L350,130 L400,190 L400,300 L0,300 Z" fill="#0F172A" opacity="0.6" />
                    <path d="M0,220 L100,160 L180,200 L260,150 L340,190 L400,170 L400,300 L0,300 Z" fill="#1E293B" opacity="0.8" />
                    
                    {/* Track lines */}
                    <line x1="0" y1="240" x2="400" y2="280" stroke="#334155" strokeWidth="4" />
                    <line x1="0" y1="250" x2="400" y2="295" stroke="#00F2FE" strokeWidth="2" strokeDasharray="10 15" opacity="0.6" />

                    {/* Futuristic Bullet Train Front */}
                    <g transform="translate(40, 70)">
                      {/* Train nose */}
                      <path d="M280,120 C220,110 140,90 40,130 C10,140 0,160 0,170 L280,170 Z" fill="url(#trainGrad)" />
                      {/* Cockpit glass */}
                      <path d="M220,118 C170,105 120,100 70,132 C80,128 150,112 210,120 Z" fill="url(#windowGrad)" opacity="0.9" />
                      {/* Train body stripe */}
                      <path d="M0,165 L280,165" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
                      {/* Headlight */}
                      <circle cx="15" cy="155" r="7" fill="#00F2FE" className="animate-pulse" />
                      <circle cx="15" cy="155" r="14" fill="#00F2FE" opacity="0.3" />
                    </g>
                  </svg>
                </div>
                {/* Gradient vignette mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
              </div>

              {/* Bottom Screen Content */}
              <div className="relative z-10 p-6 flex flex-col items-center text-center mt-auto">
                <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
                  Travel Smarter Today,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    Ride Easy Every Time
                  </span>
                </h2>
                <p className="mt-3 text-xs text-slate-300 font-normal leading-relaxed">
                  Plan your trips effortlessly, book tickets in seconds, and track your journey in real time — all from one simple, smart app.
                </p>

                <div className="mt-6 w-full space-y-3">
                  <button
                    type="button"
                    onClick={onStartJourney}
                    className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:brightness-110 active:scale-[0.98]"
                  >
                    Buy Ticket
                  </button>

                  <button
                    type="button"
                    onClick={onStartJourney}
                    className="w-full rounded-full border border-white/20 bg-white/10 py-3 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    Continue
                  </button>
                </div>

                <p className="mt-4 text-[11px] text-slate-400">
                  Already Have An Account?{" "}
                  <button type="button" onClick={onStartJourney} className="font-bold text-cyan-400 underline hover:text-cyan-300">
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Features Overview & Interactive Launch */}
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 text-xs font-bold text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            NEXT-GEN TRANSIT PLATFORM
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Seamless Multimodal Journey Comparison
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Experience real-time transit aggregation across local trains, metro, buses, and ride-hailing options. Search coordinates, view live distance metrics, compare prices, and monitor your bullet train seat status in 3D.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
              <div className="text-2xl mb-1">⚡</div>
              <h4 className="text-sm font-bold text-white">Instant Compare</h4>
              <p className="text-xs text-slate-400 mt-1">
                Parallel route computation across public & private services.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
              <div className="text-2xl mb-1">🎯</div>
              <h4 className="text-sm font-bold text-white">Live Telemetry</h4>
              <p className="text-xs text-slate-400 mt-1">
                Real-time speed (250 km/h), altitude & distance tracking.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
              <div className="text-2xl mb-1">🗺️</div>
              <h4 className="text-sm font-bold text-white">Dark Map Interface</h4>
              <p className="text-xs text-slate-400 mt-1">
                CartoDB Dark tiles with glowing cyan route polyline.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
              <div className="text-2xl mb-1">💺</div>
              <h4 className="text-sm font-bold text-white">Seat Layout View</h4>
              <p className="text-xs text-slate-400 mt-1">
                Inspect train carriage interior with interactive seat nodes.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onStartJourney}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 text-sm font-extrabold text-slate-950 shadow-xl shadow-cyan-500/25 transition hover:scale-105 active:scale-95"
            >
              <span>Explore Interactive Map</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
