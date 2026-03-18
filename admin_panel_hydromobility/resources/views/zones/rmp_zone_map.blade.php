<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Create Zone</title>
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">

  <link href="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css" rel="stylesheet">
  <link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.2/mapbox-gl-draw.css" rel="stylesheet" />
  <script src="{{ asset('js/Layers.js') }}"></script>
  <style>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
  </style>
</head>
<body>

<div id="map"></div>

<script src="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.2/mapbox-gl-draw.js"></script>
<script>
  const map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      name: "Route Mappy",
      sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
      glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
      sources: {
        rmtiles: {
          type: "vector",
          tiles: ["https://tiles.routemappy.com/world/{z}/{x}/{y}.mvt"],
          minzoom: 0,
          maxzoom: 15
        }
      },
      layers: mapLayers
    },
    center: [{{ $capital_lng }}, {{ $capital_lat }}],
    zoom: 10
  });

  // Add drawing control
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    },
    defaultMode: 'draw_polygon'
  });
  map.addControl(draw);

  // Save drawn polygon
  map.on('draw.create', savePolygon);
  map.on('draw.update', savePolygon);

  function savePolygon(e) {
    const polygon = draw.getAll();
    if (polygon.features.length === 0) return;

    const coordinates = polygon.features[0].geometry.coordinates[0];
    const coordStr = coordinates.map(coord => `${coord[1].toFixed(6)},${coord[0].toFixed(6)}`).join(";");

    fetch("../../../save_polygon", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': "{{ csrf_token() }}"
      },
      body: JSON.stringify({
        id: {{ $id }},
        polygon: coordStr
      })
    })
    .then(res => res.json())
    .then(data => alert("Zone saved successfully!"))
    .catch(err => console.error("Error saving polygon:", err));
  }
</script>

</body>
</html>
