import React, { useRef, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { ShapeSource, SymbolLayer } from '@maplibre/maplibre-react-native';

const DriverMarker = ({ driverLocation, mapRef }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [targetPosition, setTargetPosition] = useState(null);
  const [velocity, setVelocity] = useState({ vLat: 0, vLng: 0 });
  const animationRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());
  const shapeSourceRef = useRef(null);

  // Animation parameters
  const animationFrameRate = 60; // fps
  const frameDuration = 1000 / animationFrameRate; // ms

  useEffect(() => {
    if (!driverLocation || !driverLocation.latitude || !driverLocation.longitude) return;

    const now = Date.now();
    const timeElapsed = now - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = now;

    // If first position, set immediately
    if (!currentPosition) {
      setCurrentPosition(driverLocation);
      setTargetPosition(driverLocation);
      return;
    }

    // Calculate velocity (degrees per second)
    const newVelocity = {
      vLat: (driverLocation.latitude - currentPosition.latitude) / (timeElapsed / 1000),
      vLng: (driverLocation.longitude - currentPosition.longitude) / (timeElapsed / 1000)
    };

    setVelocity(newVelocity);
    setTargetPosition(driverLocation);

    // Start animation loop if not already running
    if (!animationRef.current) {
      animateMarker();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [driverLocation]);

  const animateMarker = () => {
    if (!currentPosition || !targetPosition) return;

    // Calculate progress based on velocity
    const now = Date.now();
    const timeElapsed = now - lastUpdateTimeRef.current;
    const progress = Math.min(timeElapsed / 1000, 1); // Cap at 1 second of prediction

    // Calculate predicted position
    let lat = currentPosition.latitude + velocity.vLat * progress;
    let lng = currentPosition.longitude + velocity.vLng * progress;

    // If we're close to target, use exact position
    const distanceToTarget = calculateDistance(
      lat,
      lng,
      targetPosition.latitude,
      targetPosition.longitude
    );

    if (distanceToTarget < 5) { // 5 meter threshold
      lat = targetPosition.latitude;
      lng = targetPosition.longitude;
    }

    // Update current position for next frame
    const newPosition = {
      latitude: lat,
      longitude: lng,
      bearing: targetPosition.bearing
    };
    setCurrentPosition(newPosition);

    // Update the shape source
    if (shapeSourceRef.current) {
      shapeSourceRef.current.setGeoJSON({
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          properties: {
            bearing: targetPosition.bearing || 0
          }
        }]
      });
    }

    // Continue animation
    animationRef.current = requestAnimationFrame(animateMarker);
  };

  if (!driverLocation || !driverLocation.latitude || !driverLocation.longitude) {
    return null;
  }

  const initialGeoJSON = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          currentPosition?.longitude || driverLocation.longitude,
          currentPosition?.latitude || driverLocation.latitude
        ]
      },
      properties: {
        bearing: currentPosition?.bearing || driverLocation.bearing || 0
      }
    }]
  };

  return (
    <>
      <ShapeSource
        ref={shapeSourceRef}
        id="driverSource"
        shape={initialGeoJSON}
      >
        <SymbolLayer
          id="driverLayer"
          style={{
            iconImage: 'carIcon',
            iconRotate: ['get', 'bearing'],
            iconAllowOverlap: true,
            iconSize: 0.5,
            iconAnchor: 'center'
          }}
        />
      </ShapeSource>
    </>
  );
};

// Helper functions
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default DriverMarker;