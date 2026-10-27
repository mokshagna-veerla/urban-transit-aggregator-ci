import express from "express";

const router = express.Router();

const transitSchedules = [
  {
    mode: "Bus",
    service: "City Bus",
    icon: "🚌",
    price: 25,
    durationMinutes: 48,
    waitMinutes: 8,
    frequencyMinutes: 15
  },
  {
    mode: "Local Train",
    service: "MMTS Local",
    icon: "🚆",
    price: 30,
    durationMinutes: 36,
    waitMinutes: 10,
    frequencyMinutes: 20
  },
  {
    mode: "Metro",
    service: "Metro Rail",
    icon: "🚇",
    price: 45,
    durationMinutes: 29,
    waitMinutes: 6,
    frequencyMinutes: 8
  }
];

const RIDE_RATES = {
  Car: { icon: "🚗", baseFare: 65, ratePerKm: 18, waitMinutes: 5, speedKmh: 25 },
  Bike: { icon: "🏍️", baseFare: 30, ratePerKm: 9, waitMinutes: 3, speedKmh: 28 },
  Taxi: { icon: "🚕", baseFare: 80, ratePerKm: 22, waitMinutes: 7, speedKmh: 23 }
};

function isCoordinate(value) {
  return Number.isFinite(Number(value));
}

function validateCoordinates(point, name) {
  if (!point || !isCoordinate(point.lat) || !isCoordinate(point.lng)) {
    throw new Error(`${name} must contain numeric lat and lng values.`);
  }

  const lat = Number(point.lat);
  const lng = Number(point.lng);

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    throw new Error(`${name} contains coordinates outside valid geographic bounds.`);
  }

  return { lat, lng };
}

function haversineKm(a, b) {
  const earthRadiusKm = 6371;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLng / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(h));
}

function roundMoney(value) {
  return Math.round(value);
}

function createTransitRoutes(distanceKm) {
  // The schedules are intentionally deterministic for a stable demo/API contract.
  // Distance slightly adjusts travel time so the comparison remains location-aware.
  return transitSchedules.map((route) => {
    const distanceFactor = Math.max(0, distanceKm - 5) * 1.5;
    const duration = Math.round(route.durationMinutes + distanceFactor);

    return {
      id: `${route.mode.toLowerCase().replaceAll(" ", "-")}-fixed`,
      category: "Public Transit",
      mode: route.mode,
      service: route.service,
      icon: route.icon,
      price: route.price,
      currency: "INR",
      distanceKm: Number(distanceKm.toFixed(1)),
      waitMinutes: route.waitMinutes,
      travelMinutes: duration,
      totalMinutes: duration + route.waitMinutes,
      schedule: `Every ${route.frequencyMinutes} min`,
      pricingType: "Fixed fare"
    };
  });
}

function createPrivateRides(distanceKm) {
  return Object.entries(RIDE_RATES).map(([mode, config]) => {
    const travelMinutes = Math.max(
      8,
      Math.round((distanceKm / config.speedKmh) * 60)
    );

    return {
      id: `${mode.toLowerCase()}-dynamic`,
      category: "Cabs/Bikes",
      mode,
      service: `${mode} Ride`,
      icon: config.icon,
      price: roundMoney(config.baseFare + distanceKm * config.ratePerKm),
      currency: "INR",
      distanceKm: Number(distanceKm.toFixed(1)),
      waitMinutes: config.waitMinutes,
      travelMinutes,
      totalMinutes: travelMinutes + config.waitMinutes,
      pricingType: `₹${config.baseFare} base + ₹${config.ratePerKm}/km`
    };
  });
}

function fetchPublicTransit(distanceKm) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(createTransitRoutes(distanceKm)), 60);
  });
}

function fetchPrivateRides(distanceKm) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(createPrivateRides(distanceKm)), 40);
  });
}

router.post("/compare-routes", async (req, res, next) => {
  try {
    const origin = validateCoordinates(req.body?.origin, "origin");
    const destination = validateCoordinates(
      req.body?.destination,
      "destination"
    );

    const distanceKm = haversineKm(origin, destination);

    if (distanceKm < 0.05) {
      return res.status(400).json({
        error: "Origin and destination are too close to compare."
      });
    }

    // These represent independent providers/services and are intentionally
    // fetched in parallel to keep the endpoint latency low.
    const [publicTransit, privateRides] = await Promise.all([
      fetchPublicTransit(distanceKm),
      fetchPrivateRides(distanceKm)
    ]);

    const routes = [...publicTransit, ...privateRides].sort(
      (a, b) => a.price - b.price || a.totalMinutes - b.totalMinutes
    );

    res.json({
      origin,
      destination,
      distanceKm: Number(distanceKm.toFixed(2)),
      routes
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || "Invalid route request."
    });
  }
});

export default router;
// Demo: automated CI workflow triggered successfully.