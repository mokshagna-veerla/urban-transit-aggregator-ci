# Urban Transit Aggregator

A mobile-first multimodal route comparison demo using:

- Node.js + Express
- React + Vite
- Tailwind CSS
- Leaflet + React Leaflet

## Requirements

- Node.js 18+ recommended
- npm 9+

## Run the backend

```bash
cd backend
npm install
npm run dev
```

API: `http://localhost:5000`

Health check:

```text
GET http://localhost:5000/api/health
```

## Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown by the terminal, normally:

```text
http://localhost:5173
```

## Search format

The UI accepts coordinates in:

```text
latitude,longitude
```

Example:

```text
Origin: 17.3850,78.4867
Destination: 17.4401,78.3489
```

You can also click the Leaflet map to place the destination marker.

The "Current Location" button uses the browser Geolocation API and requires the browser to grant location permission.

## API example

```bash
curl -X POST http://localhost:5000/api/compare-routes \
  -H "Content-Type: application/json" \
  -d "{\"origin\":{\"lat\":17.3850,\"lng\":78.4867},\"destination\":{\"lat\":17.4401,\"lng\":78.3489}}"
```

The backend validates coordinates, calculates Haversine distance, fetches simulated public-transit and ride-hailing data in parallel with `Promise.all`, merges the results, and sorts them by price.
