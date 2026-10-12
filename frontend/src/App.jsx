import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import WelcomeView from "./components/WelcomeView.jsx";
import SeatTrackerView from "./components/SeatTrackerView.jsx";
import SearchPanel from "./components/SearchPanel.jsx";
import MapView from "./components/MapView.jsx";
import RouteCard from "./components/RouteCard.jsx";
import TelemetryCard from "./components/TelemetryCard.jsx";

const API_URL = "/api/compare-routes";
const FILTERS = ["All", "Public Transit", "Cabs/Bikes"];

export default function App() {
  const [activeTab, setActiveTab] = useState("welcome"); // "welcome" | "map" | "seat"
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [distanceKm, setDistanceKm] = useState(null);

  async function compareRoutes(nextOrigin, nextDestination) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: nextOrigin,
          destination: nextDestination
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to compare routes.");
      }

      setOrigin(nextOrigin);
      setDestination(nextDestination);
      setRoutes(data.routes);
      setSelectedRoute(data.routes[0] || null);
      setDistanceKm(data.distanceKm);
      // Automatically switch to map view when search is submitted
      setActiveTab("map");
    } catch (requestError) {
      setRoutes([]);
      setDistanceKm(null);
      setError(
        requestError.message ||
          "Could not reach the route comparison server."
      );
    } finally {
      setLoading(false);
    }
  }

  const visibleRoutes =
    filter === "All"
      ? routes
      : routes.filter((route) => route.category === filter);

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Screen 1: Welcome & Landing View */}
      {activeTab === "welcome" && (
        <WelcomeView onStartJourney={() => setActiveTab("map")} />
      )}

      {/* Screen 3: Live Seat & Cabin View */}
      {activeTab === "seat" && (
        <SeatTrackerView onBackToMap={() => setActiveTab("map")} />
      )}

      {/* Screen 2: Interactive Map & Journey Aggregator View */}
      {activeTab === "map" && (
        <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1700px] flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_460px]">
          {/* Left Column: Dark Leaflet Map + Floating Overlay Cards */}
          <section className="relative h-[50vh] min-h-[400px] lg:h-[calc(100vh-4rem)]">
            <MapView
              origin={origin}
              destination={destination}
              onMapDestination={(point) => setDestination(point)}
            />

            {/* Floating Top Left Brand Header */}
            <div className="absolute left-4 top-4 z-[1000] rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <p className="text-xs font-black uppercase tracking-wider text-white">
                  Urban Transit Aggregator
                </p>
              </div>
              <p className="text-[11px] font-medium text-cyan-400 mt-0.5">
                Real-Time Route Telemetry
              </p>
            </div>

            {/* Floating Distance Badge */}
            {distanceKm !== null && (
              <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-slate-950/90 px-4 py-2.5 text-xs font-bold text-cyan-300 shadow-2xl backdrop-blur-xl">
                <span>📍</span>
                <span>{distanceKm} km Calculated Distance</span>
              </div>
            )}

            {/* Floating Bottom Telemetry Drawer (Screen 2 inspired) */}
            <div className="absolute bottom-4 inset-x-4 z-[1000] hidden sm:block max-w-lg mx-auto">
              <TelemetryCard
                origin={origin}
                destination={destination}
                distanceKm={distanceKm}
                selectedRoute={selectedRoute}
              />
            </div>
          </section>

          {/* Right Column: Glassmorphism Search Panel & Multimodal Route Comparison Cards */}
          <aside className="flex min-h-[50vh] flex-col overflow-hidden border-l border-white/10 bg-slate-950/90 shadow-2xl lg:min-h-[calc(100vh-4rem)]">
            {/* Search Input Panel */}
            <SearchPanel
              initialOrigin={origin}
              initialDestination={destination}
              onSearch={compareRoutes}
              loading={loading}
            />

            {/* Filter Category Tabs */}
            <div className="border-b border-white/10 px-4 py-3 bg-slate-900/60">
              <div className="flex gap-2 overflow-x-auto">
                {FILTERS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                      filter === item
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-400/30"
                        : "border border-white/10 bg-slate-900 text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Route List */}
            <div className="route-list-scroll flex-1 overflow-y-auto p-4 space-y-3">
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-xs font-medium text-red-300">
                  ⚠️ {error}
                </div>
              )}

              {!loading && routes.length === 0 && !error && (
                <div className="flex min-h-60 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-6 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-white/10 text-3xl shadow-inner">
                    🗺️
                  </div>
                  <h3 className="text-sm font-extrabold text-white">Search Your Journey</h3>
                  <p className="mt-1 text-xs text-slate-400 max-w-xs leading-relaxed">
                    Enter coordinates (e.g., 17.3850,78.4867) or click anywhere on the dark map to compare transit modes.
                  </p>
                </div>
              )}

              {loading && (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-36 animate-pulse rounded-2xl border border-white/5 bg-slate-900/50"
                    />
                  ))}
                </div>
              )}

              {!loading && visibleRoutes.length > 0 && (
                <div className="space-y-3">
                  {visibleRoutes.map((route) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      isSelected={selectedRoute?.id === route.id}
                      onSelect={(r) => setSelectedRoute(r)}
                    />
                  ))}
                </div>
              )}

              {!loading && routes.length > 0 && visibleRoutes.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-center text-xs text-slate-400">
                  No routes match the selected filter.
                </div>
              )}
            </div>
          </aside>
        </main>
      )}
    </div>
  );
}
