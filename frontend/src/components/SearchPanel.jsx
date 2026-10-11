import { useEffect, useState } from "react";

function formatPoint(point) {
  return point ? `${point.lat.toFixed(6)},${point.lng.toFixed(6)}` : "";
}

function parseCoordinateInput(value) {
  const parts = value.split(",").map((part) => Number(part.trim()));

  if (
    parts.length !== 2 ||
    !Number.isFinite(parts[0]) ||
    !Number.isFinite(parts[1]) ||
    parts[0] < -90 ||
    parts[0] > 90 ||
    parts[1] < -180 ||
    parts[1] > 180
  ) {
    return null;
  }

  return { lat: parts[0], lng: parts[1] };
}

export default function SearchPanel({
  initialOrigin,
  initialDestination,
  onSearch,
  loading
}) {
  const [originText, setOriginText] = useState(
    formatPoint(initialOrigin) || ""
  );
  const [destinationText, setDestinationText] = useState(
    formatPoint(initialDestination) || ""
  );
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (initialOrigin) setOriginText(formatPoint(initialOrigin));
  }, [initialOrigin]);

  useEffect(() => {
    if (initialDestination) {
      setDestinationText(formatPoint(initialDestination));
    }
  }, [initialDestination]);

  function useCurrentLocation() {
    setInputError("");

    if (!navigator.geolocation) {
      setInputError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setOriginText(
          `${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`
        );
      },
      () => {
        setInputError(
          "Could not read your location. Enter coordinates manually."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setInputError("");

    const origin = parseCoordinateInput(originText);
    const destination = parseCoordinateInput(destinationText);

    if (!origin || !destination) {
      setInputError(
        "Use valid coordinates in the format latitude,longitude."
      );
      return;
    }

    onSearch(origin, destination);
  }

  return (
    <div className="border-b border-white/10 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Route Search</span>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
          </h2>
          <p className="text-xs font-medium text-slate-400">
            Public transit + ride-hailing options
          </p>
        </div>
        <span className="rounded-full bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 text-[11px] font-bold text-cyan-300">
          MULTIMODAL
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label
            htmlFor="origin"
            className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400"
          >
            <span>Current Location (Origin)</span>
            <span className="text-[10px] text-cyan-400 font-normal">lat,lng</span>
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                id="origin"
                value={originText}
                onChange={(event) => setOriginText(event.target.value)}
                placeholder="17.3850,78.4867"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                autoComplete="off"
              />
            </div>
            <button
              type="button"
              onClick={useCurrentLocation}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-800 text-cyan-400 hover:bg-slate-700 hover:border-cyan-400/50 transition active:scale-95"
              title="Use browser location"
            >
              ◎
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="destination"
            className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400"
          >
            <span>Destination Point</span>
            <span className="text-[10px] text-cyan-400 font-normal">lat,lng</span>
          </label>
          <input
            id="destination"
            value={destinationText}
            onChange={(event) => setDestinationText(event.target.value)}
            placeholder="17.4401,78.3489"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            autoComplete="off"
          />
        </div>

        {inputError && (
          <p className="rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-xs font-medium text-red-400">
            ⚠️ {inputError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
        >
          {loading ? "Comparing routes..." : "⚡ Search Routes"}
        </button>
      </form>
    </div>
  );
}
