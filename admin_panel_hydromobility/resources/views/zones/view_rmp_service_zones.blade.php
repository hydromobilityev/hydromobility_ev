<meta name="csrf-token" content="{{ Session::token() }}"> 
<script src="{{ asset('js/Layers.js') }}"></script>
<div class="container">
  <div class="col-md-2 col-md-offset-10">
    <a href='/admin/zones' class='btn btn-info pull-right' style='margin-right:20px;'>Back</a>
  </div>

  <style>
    #map {
      height: 500px;
      width: 100%;
      margin-top: 50px;
      padding: 0;
    }
  </style>

  <link href="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css" rel="stylesheet" />
  <script src="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js"></script>

  <div id="map"></div>

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

  // ✅ Correct way to parse JSON polygon passed from Laravel
  const rawCoords = {!! $polygon !!}; // Should be a JSON array like: [{"lat":9.95,"lng":78.08},...]
  const coordinates = rawCoords.map(coord => [coord.lng, coord.lat]);

  map.on('load', () => {
    map.addSource('zone-polygon', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates]  // GeoJSON expects [ [ [lng,lat], [lng,lat], ... ] ]
        }
      }
    });

    map.addLayer({
      id: 'zone-fill',
      type: 'fill',
      source: 'zone-polygon',
      layout: {},
      paint: {
        'fill-color': '#FF0000',
        'fill-opacity': 0.4
      }
    });

    map.addLayer({
      id: 'zone-outline',
      type: 'line',
      source: 'zone-polygon',
      layout: {},
      paint: {
        'line-color': '#FF0000',
        'line-width': 2
      }
    });
  });
</script>

</div>
