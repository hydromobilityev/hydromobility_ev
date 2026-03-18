import React, { useEffect, useRef, useState } from 'react';
import {
  ShapeSource,
  LineLayer as BaseLineLayer,
} from '@maplibre/maplibre-react-native';

const RouteLayer = React.memo(({ routeCoordinates, isMapReady }) => {
  const ROUTE_LINE_WIDTH = 3;
 
  if (!isMapReady || !routeCoordinates || routeCoordinates.length < 2) {
    return null;
  }

  const lineStringCoordinates = routeCoordinates.map(coord => [
    coord.longitude ?? coord[0],
    coord.latitude ?? coord[1],
  ]);

  return (
    <ShapeSource
      id="routeSource"
      shape={{
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: lineStringCoordinates,
          },
          properties: {},
        }],
      }}
    >
      <BaseLineLayer
        id="routeLine"
        style={{
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: ROUTE_LINE_WIDTH,
          lineColor:"#2E7D60"
        }}
        minZoomLevel={0}
        maxZoomLevel={22}
        layerIndex={200}
      />
    </ShapeSource>
  );
});

RouteLayer.displayName = 'RouteLayer';

export default RouteLayer;
