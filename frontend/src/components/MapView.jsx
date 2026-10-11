import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  useMap,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";

// Custom glowing cyan div icons matching Screen 2 dark map design
const createGlowIcon = (type, emoji) =>
  L.divIcon({
    className: "custom-glow-marker",
    html: `
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 border-2 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.6)]">
        <span className="text-base">${emoji}</span>
        <span className="absolute -bottom-1 rounded bg-cyan-400 px-1 py-0.5 text-[9px] font-extrabold text-slate-950 uppercase">${type}</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

const originIcon = createGlowIcon("Origin", "📍");
const destinationIcon = createGlowIcon("Dest", "🏁");
const transitIcon = createGlowIcon("Transit", "🚅");

function MapUpdater({ origin, destination }) {
  const map = useMap();

  useEffect(() => {
    const points = [origin, destination].filter(Boolean);

    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 13);
    }

    if (points.length === 2) {
      map.fitBounds(
        points.map((point) => [point.lat, point.lng]),
        { padding: [60, 60] }
      );
    }
  }, [map, origin, destination]);

  return null;
}

function ClickHandler({ onDestination }) {
  useMapEvents({
    click(event) {
      onDestination({
        lat: Number(event.latlng.lat.toFixed(6)),
        lng: Number(event.latlng.lng.toFixed(6))
      });
    }
  });

  return null;
}

export default function MapView({ origin, destination, onMapDestination }) {
  const defaultCenter = [17.385, 78.4867];

  const positions = origin && destination ? [
    [origin.lat, origin.lng],
    [destination.lat, destination.lng]
  ] : [];

  // Midpoint for transit vehicle marker
  const midpoint = origin && destination ? [
    (origin.lat + destination.lat) / 2,
    (origin.lng + destination.lng) / 2
  ] : null;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full"
    >
      {/* Dark Matter tiles from CartoDB */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <MapUpdater origin={origin} destination={destination} />
      <ClickHandler onDestination={onMapDestination} />

      {/* Polyline Route Line with Cyan Glow */}
      {positions.length === 2 && (
        <>
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#00F2FE",
              weight: 5,
              opacity: 0.9,
              dashArray: "10, 10"
            }}
          />
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#38BFFE",
              weight: 12,
              opacity: 0.25
            }}
          />
        </>
      )}

      {/* Markers */}
      {origin && (
        <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
          <Popup>
            <div className="p-1 font-sans">
              <p className="text-xs font-bold text-cyan-400">Origin Point</p>
              <p className="text-[11px] text-slate-300">{origin.lat}, {origin.lng}</p>
            </div>
          </Popup>
        </Marker>
      )}

      {destination && (
        <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
          <Popup>
            <div className="p-1 font-sans">
              <p className="text-xs font-bold text-cyan-400">Destination Point</p>
              <p className="text-[11px] text-slate-300">{destination.lat}, {destination.lng}</p>
            </div>
          </Popup>
        </Marker>
      )}

      {midpoint && (
        <Marker position={midpoint} icon={transitIcon}>
          <Popup>
            <div className="p-1 font-sans">
              <p className="text-xs font-bold text-cyan-400">FTG454 Bullet Train En Route</p>
              <p className="text-[11px] text-slate-300">Speed: 250 km/h · Altitude: 25m</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
