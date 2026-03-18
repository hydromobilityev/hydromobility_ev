import React from 'react';
import {
  ShapeSource,
  LineLayer as BaseLineLayer,
} from '@maplibre/maplibre-react-native';

const RouteLayer = React.memo(({routeCoordinates, isMapReady}) => {
  const ROUTE_LINE_WIDTH = 5;
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
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: lineStringCoordinates,
            },
            properties: {},
          },
        ],
      }}>
      <BaseLineLayer
        id="routeLineBg"
        style={{
          lineColor: '#2E7D60',
          lineWidth: ROUTE_LINE_WIDTH,
          lineOpacity: 0,
          lineCap: 'round',
          lineJoin: 'round',
        }}
        minZoomLevel={0}
        maxZoomLevel={22}
        layerIndex={199}
      />
      <BaseLineLayer
        id="routeLine"
        style={{
          lineColor: '#2E7D60',
          lineWidth: ROUTE_LINE_WIDTH,
          lineOpacity: 1,
          lineCap: 'round',
          lineJoin: 'round',
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
