export const DarkModeMapLayer = [
  // BACKGROUND
  {
    id: 'background',
    type: 'background',
    paint: {
      'background-color': '#121212',
    },
  },
  
  // FILL LAYERS
  {
    id: 'earth',
    type: 'fill',
    filter: ['==', '$type', 'Polygon'],
    source: 'rmtiles',
    'source-layer': 'earth',
    paint: {
      'fill-color': '#121212',
    },
  },
  {
    id: 'landcover',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landcover',
    minzoom: 4,
    maxzoom: 8,
    paint: {
      'fill-color': [
        'match',
        ['get', 'kind'],
        'grassland', '#2d3a2d',
        'barren', '#3d3a33',
        'urban_area', '#2a2a2a',
        'farmland', '#343d30',
        'glacier', '#3a4a59',
        'scrub', '#343d30',
        'forest', '#2d3a2d',
        'wood', '#2d3a2d',
        '#2d3a2d',
      ],
      'fill-opacity': ['interpolate', ['linear'], ['zoom'], 4, 0.8, 7, 0.3, 8, 0],
    },
  },
  {
    id: 'landuse_park',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 6,
    filter: [
      'any',
      ['in', ['get', 'kind'], ['literal', [
        'national_park', 'park', 'cemetery', 'protected_area', 'nature_reserve',
        'forest', 'golf_course', 'wood', 'scrub', 'grassland', 'grass'
      ]]],
      ['in', ['get', 'landuse'], ['literal', ['forest', 'recreation_ground']]],
      ['in', ['get', 'leisure'], ['literal', ['park', 'nature_reserve', 'golf_course']]]
    ],
    paint: {
      'fill-opacity': ['interpolate', ['linear'], ['zoom'], 6, 0.3, 11, 0.8],
      'fill-color': [
        'case',
        ['in', ['get', 'kind'], ['literal', [
          'national_park', 'park', 'cemetery', 'protected_area', 'nature_reserve', 'golf_course'
        ]]], '#2d4a3d',
        ['in', ['get', 'kind'], ['literal', ['wood', 'forest']]], '#2d3a2d',
        ['in', ['get', 'kind'], ['literal', ['scrub', 'grassland', 'grass']]], '#2d4a3d',
        '#2d4a3d',
      ],
    },
  },
  {
    id: 'landuse_urban_green',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['allotments', 'village_green', 'playground']],
    ],
    paint: {
      'fill-color': '#2d4a3d',
      'fill-opacity': 0.7,
    },
  },
  {
    id: 'landuse_hospital',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'kind'], 'hospital'],
    paint: {
      'fill-color': '#3d2d2d',
    },
  },
  {
    id: 'landuse_industrial',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'kind'], 'industrial'],
    paint: {
      'fill-color': '#2d3d4a',
    },
  },
  {
    id: 'landuse_zoo',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['zoo']],
    ],
    paint: {
      'fill-color': '#2d4a4a',
    },
  },
  {
    id: 'landuse_aerodrome',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['aerodrome']],
    ],
    paint: {
      'fill-color': '#3d3d4a',
    },
  },
  {
    id: 'landuse_runway',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: [
      'any',
      [
        'in',
        ['get', 'kind'],
        ['literal', ['runway', 'taxiway']]
      ]
    ],
    paint: {
      'fill-color': '#4a4a59',
    },
  },
  {
    id: 'water',
    type: 'fill',
    filter: ['==', '$type', 'Polygon'],
    source: 'rmtiles',
    'source-layer': 'water',
    paint: {
      'fill-color': '#1a3d59',
    },
  },
  {
    id: 'landuse_pedestrian',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['pedestrian', 'dam']]
    ],
    paint: {
      'fill-color': '#3d3a33',
    },
  },
  {
    id: 'landuse_pier',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'kind'], 'pier'],
    paint: {
      'fill-color': '#4a4a4a',
    },
  },
  {
    id: 'buildings',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'buildings',
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['building', 'building_part']]
    ],
    paint: {
      'fill-color': '#3d3d3d',
      'fill-opacity': 0.7,
    },
  },
  {
    id: 'landuse_residential',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'landuse'], 'residential'],
    paint: {
      'fill-color': '#2a2a2a',
      'fill-opacity': 0.6
    }
  },
  {
    id: 'landuse_cemetery',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'landuse'], 'cemetery'],
    paint: {
      'fill-color': '#3d3d3d',
      'fill-opacity': 0.5
    }
  },
  {
    id: 'landuse_beach',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 10,
    filter: [
      'any',
      ['==', ['get', 'kind'], 'beach'],
      ['==', ['get', 'natural'], 'beach']
    ],
    paint: {
      'fill-color': '#3d3a33',
    },
  },
  {
    id: 'landuse_school',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 12,
    filter: [
      'any',
      ['in', ['get', 'kind'], ['literal', ['school', 'university', 'college']]],
      ['in', ['get', 'amenity'], ['literal', ['school', 'university', 'college']]]
    ],
    paint: {
      'fill-color': '#3d3633',
    },
  },
  {
    id: 'landcover_glacier',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landcover',
    filter: ['==', ['get', 'natural'], 'glacier'],
    paint: {
      'fill-color': '#2d4a59',
      'fill-opacity': 0.6
    }
  },
  {
    id: 'landuse_military',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'landuse'], 'military'],
    paint: {
      'fill-color': '#592d2d',
      'fill-opacity': 0.4
    }
  },
  {
    id: 'landuse_sports',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: [
      'match',
      ['coalesce', ['get', 'leisure'], ''],
      ['recreation_ground', 'sports_centre', 'pitch'],
      true,
      false
    ],
    paint: {
      'fill-color': '#2d592d',
      'fill-opacity': 0.6
    }
  },
  {
    id: 'landuse_farmland',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: [
      'match',
      ['coalesce', ['get', 'landuse'], ''],
      ['farmland', 'farm'],
      true,
      false
    ],
    paint: {
      'fill-color': '#3d3d33',
      'fill-opacity': 0.5
    }
  },
  
  // LINE LAYERS
  {
    id: 'roads_runway',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: ['==', ['get', 'kind_detail'], 'runway'],
    paint: {
      'line-color': '#4a4a59',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        10,
        0,
        12,
        4,
        18,
        30,
      ],
    },
  },
  {
    id: 'roads_taxiway',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 13,
    filter: ['==', ['get', 'kind_detail'], 'taxiway'],
    paint: {
      'line-color': '#4a4a59',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13,
        0,
        13.5,
        1,
        15,
        6,
      ],
    },
  },
  {
    id: 'water_stream',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'water',
    minzoom: 14,
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['stream']]
    ],
    paint: {
      'line-color': '#2d597a',
      'line-width': 0.5,
    },
  },
  {
    id: 'water_river',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'water',
    minzoom: 9,
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['river']]
    ],
    paint: {
      'line-color': '#2d597a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        9,
        0,
        9.5,
        1,
        18,
        12,
      ],
    },
  },
  {
    id: 'roads_tunnels_other_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['in', ['get', 'kind'], ['literal', ['other', 'path']]]
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        14,
        0,
        20,
        7,
      ],
    },
  },
  {
    id: 'roads_tunnels_minor_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'minor_road']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-dasharray': ['literal', [3, 2]],
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        11,
        0,
        12.5,
        0.5,
        15,
        2,
        18,
        11,
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        12,
        0,
        12.5,
        1,
      ],
    },
  },
  {
    id: 'roads_tunnels_link_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['has', 'is_link']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-dasharray': ['literal', [3, 2]],
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13,
        0,
        13.5,
        1,
        18,
        11
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        12,
        0,
        12.5,
        1
      ]
    }
  },
  {
    id: 'roads_tunnels_major_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-dasharray': ['literal', [3, 2]],
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7,
        0,
        7.5,
        0.5,
        18,
        13
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        9,
        0,
        9.5,
        1
      ]
    }
  },
  {
    id: 'roads_tunnels_highway_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-dasharray': ['literal', [6, 0.5]],
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3,
        0,
        3.5,
        0.5,
        18,
        15
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7,
        0,
        7.5,
        1,
        20,
        15
      ]
    }
  },
  {
    id: 'roads_tunnels_other',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['in', ['get', 'kind'], ['literal', ['other', 'path']]]
    ],
    paint: {
      'line-color': '#4a4a4a',
      'line-dasharray': ['literal', [4.5, 0.5]],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        14,
        0,
        20,
        7
      ]
    }
  },
  {
    id: 'roads_tunnels_minor',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'minor_road']
    ],
    paint: {
      'line-color': '#4a4a4a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        11,
        0,
        12.5,
        0.5,
        15,
        2,
        18,
        11
      ]
    }
  },
  {
    id: 'roads_tunnels_link',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['has', 'is_link']
    ],
    paint: {
      'line-color': '#4a4a4a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13,
        0,
        13.5,
        1,
        18,
        11
      ]
    }
  },
  {
    id: 'roads_tunnels_major',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#4a4a4a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        6, 0,
        12, 1.6,
        15, 3,
        18, 13
      ]
    }
  },
  {
    id: 'roads_tunnels_highway',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#4a4a4a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3, 0,
        6, 1.1,
        12, 1.6,
        15, 5,
        18, 15
      ]
    }
  },
  {
    id: 'roads_pier',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: ['==', ['get', 'kind_detail'], 'pier'],
    paint: {
      'line-color': '#4a4a4a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        12, 0,
        12.5, 0.5,
        20, 16
      ]
    }
  },
  {
    id: 'roads_minor_service_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 13,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', ['get', 'kind'], 'minor_road'],
      ['==', ['get', 'kind_detail'], 'service']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        18, 8
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        13.5, 0.8
      ]
    }
  },
  {
    id: 'roads_minor_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', ['get', 'kind'], 'minor_road'],
      ['!=', ['get', 'kind_detail'], 'service']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        11, 0,
        12.5, 0.5,
        15, 2,
        18, 11
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        12, 0,
        12.5, 1
      ]
    }
  },
  {
    id: 'roads_link_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 13,
    filter: ['has', 'is_link'],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        13.5, 1,
        18, 11
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        13.5, 1.5
      ]
    }
  },
  {
    id: 'roads_major_casing_late',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        6, 0,
        12, 1.6,
        15, 3,
        18, 13
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        9, 0,
        9.5, 1
      ]
    }
  },
  {
    id: 'roads_highway_casing_late',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3, 0,
        3.5, 0.5,
        18, 15
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7, 0,
        7.5, 1,
        20, 15
      ]
    }
  },
  {
    id: 'roads_other',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: ['==', 'kind', 'other'],
    paint: {
      'line-color': '#4a4a4a',
      'line-width': 2
    }
  },
  {
    id: 'roads_link',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: ['==', 'kind_detail', 'link'],
    paint: {
      'line-color': '#5a5a5a',
      'line-width': 2
    }
  },
  {
    id: 'roads_minor_service',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: ['==', 'kind_detail', 'service'],
    paint: {
      'line-color': '#4a4a4a',
      'line-width': 3
    }
  },
  {
    id: 'roads_minor',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind', 'minor_road'],
      ['!', ['==', ['get', 'kind_detail'], 'service']],
    ],
    paint: {
      'line-color': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        11,
        '#4a4a4a',
        16,
        '#5a5a5a',
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        11,
        0,
        12.5,
        0.5,
        15,
        2,
        18,
        11,
      ],
    },
  },
  {
    id: 'roads_major_casing_early',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    maxzoom: 12,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind', 'major_road'],
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7,
        0,
        7.5,
        0.5,
        18,
        13,
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        9,
        0,
        9.5,
        1,
      ],
    },
  },
  {
    id: 'roads_major',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind', 'major_road'],
    ],
    paint: {
      'line-color': '#5a5a5a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        6,
        0,
        12,
        1.6,
        15,
        3,
        18,
        13,
      ],
    },
  },
  {
    id: 'roads_highway_casing_early',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    maxzoom: 12,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind', 'highway'],
      ['!', ['has', 'is_link']],
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3,
        0,
        3.5,
        0.5,
        18,
        15,
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7,
        0,
        7.5,
        1,
      ],
    },
  },
  {
    id: 'roads_highway',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind', 'highway'],
      ['!', ['has', 'is_link']],
    ],
    paint: {
      'line-color': '#6a6a6a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3,
        0,
        6,
        1.1,
        12,
        1.6,
        15,
        5,
        18,
        15,
      ],
    },
  },
  {
    id: 'roads_rail',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: ['==', 'kind', 'rail'],
    paint: {
      'line-dasharray': [0.3, 0.75],
      'line-opacity': 0.5,
      'line-color': '#5a6366',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3,
        0,
        6,
        0.15,
        18,
        9,
      ],
    },
  },
  {
    id: 'boundaries_country',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'boundaries',
    filter: ['<=', ['get', 'kind_detail'], 2],
    paint: {
      'line-color': '#5a5a5a',
      'line-width': 0.7,
      'line-dasharray': [
        'step',
        ['zoom'],
        ['literal', [2]],
        4,
        ['literal', [2, 1]],
      ],
    },
  },
  {
    id: 'boundaries',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'boundaries',
    filter: ['>', ['get', 'kind_detail'], 2],
    paint: {
      'line-color': '#5a5a5a',
      'line-width': 0.4,
      'line-dasharray': [
        'step',
        ['zoom'],
        ['literal', [2]],
        4,
        ['literal', [2, 1]],
      ],
    },
  },
  {
    id: 'roads_bridges_other_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'other']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        14,
        0,
        20,
        7
      ]
    }
  },
  {
    id: 'roads_bridges_link_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: ['all', ['has', 'is_bridge'], ['has', 'is_link']],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        13.5, 1,
        18, 11
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        12, 0,
        12.5, 1.5,
        18, 4.5
      ]
    }
  },
  {
    id: 'roads_bridges_minor_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'minor_road']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        11, 0, 12.5, 0.5, 15, 2, 18, 11
      ],
      'line-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        13, 0, 13.5, 0.8, 18, 1.2
      ]
    }
  },
  {
    id: 'roads_bridges_major_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        7, 0, 7.5, 0.5, 18, 10
      ],
      'line-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        9, 0, 9.5, 1.5, 18, 2.5
      ]
    }
  },
  {
    id: 'roads_bridges_other',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['any',
        ['==', ['get', 'kind'], 'other'],
        ['==', ['get', 'kind'], 'path']
      ]
    ],
    paint: {
      'line-color': '#5a5a5a',
      'line-dasharray': [2, 1],
      'line-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        14, 0,
        20, 7
      ]
    }
  },
  {
    id: 'roads_bridges_minor',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'minor_road']
    ],
    paint: {
      'line-color': '#6a6a6a',
      'line-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        11, 0,
        12.5, 0.5,
        15, 2,
        18, 11
      ]
    }
  },
  {
    id: 'roads_bridges_link',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['has', 'is_link']
    ],
    paint: {
      'line-color': '#6a6a6a',
      'line-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        13, 0, 13.5, 1, 18, 11
      ]
    }
  },
  {
    id: 'roads_bridges_major',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#7a7a7a',
      'line-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        6, 0, 12, 1.6, 15, 3, 18, 13
      ]
    }
  },
  {
    id: 'roads_bridges_highway_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#3d3d3d',
      'line-gap-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        3, 0, 3.5, 0.5, 18, 15
      ],
      'line-width': [
        'interpolate', ['exponential', 1.6], ['zoom'],
        7, 0, 7.5, 1, 20, 15
      ]
    }
  },
  {
    id: 'roads_bridges_highway',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#8a8a8a',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3, 0,
        6, 1.1,
        12, 1.6,
        15, 5,
        18, 15
      ]
    }
  },
  {
    id: 'railways',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'transport',
    filter: ['any',
      ['==', ['get', 'railway'], 'rail'],
      ['==', ['get', 'railway'], 'tram'],
      ['==', ['get', 'railway'], 'light_rail'],
      ['==', ['get', 'railway'], 'subway']
    ],
    paint: {
      'line-color': '#606060',
      'line-width': [
        'interpolate', ['linear'], ['zoom'],
        10, 1, 14, 2, 18, 4
      ]
    }
  },
  {
    id: 'boundary_country',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'admin',
    filter: ['all',
      ['==', ['get', 'boundary'], 'administrative'],
      ['==', ['get', 'admin_level'], '2']
    ],
    paint: {
      'line-color': '#666666',
      'line-width': 2,
      'line-dasharray': ['literal', [2, 2]]
    }
  },

  // SYMBOL LAYERS
  {
    id: 'address_label',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'buildings',
    minzoom: 12,
    filter: ['==', 'kind', 'address'],
    layout: {
      'symbol-placement': 'point',
      'text-font': ['Noto Sans Regular'],
      'text-field': ['get', 'addr_housenumber'],
      'text-size': 12
    },
    paint: {
      'text-color': '#b8b8b8',
      'text-halo-color': '#121212',
      'text-halo-width': 1
    }
  },
  {
    id: 'water_waterway_label',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'water',
    minzoom: 13,
    filter: ['in', ['get', 'kind'], ['literal', ['river', 'stream']]],
    layout: {
      'symbol-placement': 'line',
      'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-field': ['coalesce', ['get', 'name'], ''],
      'text-size': 12,
      'text-letter-spacing': 0.2,
    },
    paint: {
      'text-color': '#5d8cba',
      'text-halo-color': '#121212',
      'text-halo-width': 1,
    }
  },
  {
    id: 'pois_minor',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'pois',
    minzoom: 14,
    filter: [
      'in', ['get', 'kind'], ['literal', [
        'restaurant', 'cafe', 'bank', 'pharmacy', 'gas_station',
        'hotel', 'shop', 'school', 'library', 'post_office'
      ]]
    ],
    layout: {
      'text-font': ['Noto Sans Regular'],
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-size': [
        'interpolate', ['linear'], ['zoom'],
        14, 8,
        16, 9,
        18, 10
      ],
      'text-max-width': 6,
      'text-offset': [0, 1],
      'text-anchor': 'top'
    },
    paint: {
      'text-color': '#cccccc',
      'text-halo-color': 'rgba(18,18,18,0.8)',
      'text-halo-width': 1
    }
  },
  {
    id: 'places_town',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    minzoom: 8,
    filter: ['==', ['get', 'kind'], 'locality'],
    layout: {
      'text-font': ['Noto Sans Regular'],
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-size': [
        'interpolate', ['linear'], ['zoom'],
        8, 10,
        12, 14,
        16, 16
      ],
      'text-max-width': 8,
      'symbol-sort-key': ['get', 'population_rank']
    },
    paint: {
      'text-color': '#dddddd',
      'text-halo-color': 'rgba(18,18,18,0.8)',
      'text-halo-width': 1
    }
  },
  {
    id: 'places_neighbourhood',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    minzoom: 12,
    filter: ['==', ['get', 'kind'], 'neighbourhood'],
    layout: {
      'text-font': ['Noto Sans Regular'],
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-size': [
        'interpolate', ['linear'], ['zoom'],
        12, 10,
        16, 12
      ],
      'text-max-width': 6,
      'text-transform': 'uppercase',
      'text-letter-spacing': 0.1
    },
    paint: {
      'text-color': '#aaaaaa',
      'text-halo-color': 'rgba(18,18,18,0.7)',
      'text-halo-width': 1
    }
  },
  {
    id: 'pois_major',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'pois',
    minzoom: 10,
    filter: [
      'in', ['get', 'kind'], ['literal', [
        'airport', 'hospital', 'university', 'stadium', 'park',
        'zoo', 'museum', 'shopping_center', 'train_station'
      ]]
    ],
    layout: {
      'text-font': ['Noto Sans Regular'],
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-size': [
        'interpolate', ['linear'], ['zoom'],
        10, 9,
        14, 11,
        18, 13
      ],
      'text-max-width': 8,
      'text-offset': [0, 1.2],
      'text-anchor': 'top'
    },
    paint: {
      'text-color': [
        'match', ['get', 'kind'],
        'park', '#4daa6d',
        'hospital', '#ff6b6b',
        'school', '#b57edc',
        'university', '#b57edc',
        '#cccccc'
      ],
      'text-halo-color': 'rgba(18,18,18,0.8)',
      'text-halo-width': 1
    }
  },
  {
    id: 'water_label_lakes',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'water',
    minzoom: 6,
    filter: ['in', ['get', 'kind'], ['literal', ['lake', 'reservoir', 'pond']]],
    layout: {
      'text-font': ['Noto Sans Regular'],
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-size': [
        'interpolate', ['linear'], ['zoom'],
        6, 10,
        10, 12,
        14, 14
      ],
      'text-letter-spacing': 0.1,
      'text-max-width': 6
    },
    paint: {
      'text-color': '#5d8cba',
      'text-halo-color': 'rgba(18,18,18,0.8)',
      'text-halo-width': 1
    }
  },
  {
    id: 'roads_labels_major',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 8,
    filter: ['in', ['get', 'kind'], ['literal', ['highway', 'major_road']]],
    layout: {
      'symbol-sort-key': ['get', 'min_zoom'],
      'symbol-placement': 'line',
      'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-field': ['get', 'name'],
      'text-size': 12
    },
    paint: {
      'text-color': '#b8b8b8',
      'text-halo-color': '#121212',
      'text-halo-width': 1
    }
  },
  {
    id: 'roads_labels_minor',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 13,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['in', ['get', 'kind'], ['literal', [
        'minor_road',
        'other',
        'path',
        'service',
        'track',
        'pedestrian',
        'footway',
        'cycleway',
        'living_street'
      ]]],
      ['has', 'name']
    ],
    layout: {
      'symbol-placement': 'line',
      'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-field': [
        'coalesce',
        ['get', 'name:en'],
        ['get', 'name'],
        ['get', 'ref'],
        ['get', 'alt_name']
      ],
      'text-size': [
        'interpolate',
        ['linear'],
        ['zoom'],
        13, 10,
        16, 11,
        18, 12
      ],
      'text-max-angle': 30,
      'text-letter-spacing': 0.05,
      'text-max-width': 8,
      'symbol-spacing': 250,
      'text-pitch-alignment': 'viewport'
    },
    paint: {
      'text-color': '#cccccc',
      'text-halo-color': 'rgba(18,18,18,0.8)',
      'text-halo-width': 1,
      'text-halo-blur': 0.5,
      'text-opacity': 0.9
    }
  },
  {
    id: 'water_label_ocean',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'water',
    filter: ['in', ['get', 'kind'], ['literal', ['sea', 'ocean', 'bay', 'strait', 'fjord']]],
    layout: {
      'text-font': ['literal', ['Open Sans Regular', 'Arial Unicode MS Regular']],
      'text-field': [
        'format',
        ['coalesce', ['get', 'name:en'], ['get', 'name']],
        {},
        '\n',
        {},
        ['coalesce', ['get', 'pgf:name'], ['get', 'name']],
        {
          'text-font': ['literal', ['Noto Sans Regular']],
        }
      ],
      'text-font': [
        'case',
        ['==', ['get', 'script'], 'Devanagari'],
        ['literal', ['Noto Sans Devanagari Regular v1']],
        ['literal', ['Noto Sans Regular']]
      ],
      'text-size': ['interpolate', ['linear'], ['zoom'], 3, 10, 10, 12],
      'text-letter-spacing': 0.1,
      'text-max-width': 9,
      'text-transform': 'uppercase'
    },
    paint: {
      'text-color': '#5d8cba',
      'text-halo-width': 1,
      'text-halo-color': '#121212'
    }
  },
  {
    id: 'pois',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'pois',
    filter: ['in', ['get', 'kind'], ['literal', [ 'beach', 'forest', 'marina', 'park', 'peak', 'zoo', 'garden', 'bench',
        'aerodrome', 'station', 'bus_stop', 'ferry_terminal',
        'stadium', 'university', 'library', 'school', 'animal', 'toilets', 'drinking_water']]],
    layout: {
      'icon-image': [
        'match',
        ['get', 'kind'],
        'station', 'train_station',
        ['get', 'kind']
      ],
      'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-justify': 'auto',
      'text-field': ['coalesce', ['get', 'name'], ['get', 'pgf:name'], ['get', 'name:en']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 17, 10, 19, 16],
      'text-max-width': 8,
      'text-offset': [1.1, 0],
      'text-variable-anchor': ['left', 'right']
    },
    paint: {
      'text-color': [
        'match',
        ['get', 'kind'],
        'beach', '#4daa6d',
        'forest', '#4daa6d',
        'marina', '#4daa6d',
        'park', '#4daa6d',
        'peak', '#4daa6d',
        'zoo', '#4daa6d',
        'garden', '#4daa6d',
        'bench', '#4daa6d',
        'aerodrome', '#5d8cba',
        'station', '#5d8cba',
        'bus_stop', '#5d8cba',
        'ferry_terminal', '#5d8cba',
        'stadium', '#9d8ccb',
        'university', '#9d8ccb',
        'library', '#9d8ccb',
        'school', '#9d8ccb',
        'animal', '#9d8ccb',
        'toilets', '#9d8ccb',
        'drinking_water', '#9d8ccb',
        '#cccccc'
      ],
      'text-halo-color': '#121212',
      'text-halo-width': 1
    }
  },
  {
    id: 'places_subplace',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    filter: ['==', ['get', 'kind'], 'neighbourhood'],
    layout: {
      'symbol-sort-key': [
        'case',
        ['has', 'sort_key'], ['get', 'sort_key'],
        ['get', 'min_zoom']
      ],
      'text-field': [
        'case',
        ['!=',
          ['coalesce', ['get', 'pgf:name'], ['get', 'name']],
          ['coalesce', ['get', 'name:en'], ['get', 'name']]
        ],
        [
          'format',
          ['coalesce', ['get', 'name:en'], ['get', 'name']], {},
          '\n', {},
          ['coalesce', ['get', 'pgf:name'], ['get', 'name']], {}
        ],
        ['coalesce', ['get', 'name:en'], ['get', 'name']]
      ],
      'text-font': ['Noto Sans Regular'],
      'text-max-width': 7,
      'text-letter-spacing': 0.1,
      'text-padding': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5, 2,
        8, 4,
        12, 18,
        15, 20
      ],
      'text-size': [
        'interpolate',
        ['exponential', 1.2],
        ['zoom'],
        11, 8,
        14, 14,
        18, 24
      ],
      'text-transform': 'uppercase'
    },
    paint: {
      'text-color': '#aaaaaa',
      'text-halo-color': '#121212',
      'text-halo-width': 1
    }
  },
  {
    id: 'places_region',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    filter: ['in', ['get', 'kind'], ['literal', ['region', 'state', 'province']]],
    layout: {
      'symbol-sort-key': ['get', 'sort_key'],
      'text-field': [
        'step',
        ['zoom'],
        ['coalesce', ['get', 'ref:en'], ['get', 'ref']],
        6,
        [
          'format',
          ['coalesce', 
            ['get', 'name:en'],
            ['get', 'pgf:name'],
            ['get', 'name']
          ],
          {
            'text-font': [
              'case',
              ['==', ['get', 'script'], 'Devanagari'],
              ['literal', ['Noto Sans Devanagari Regular v1']],
              ['literal', ['Noto Sans Regular']]
            ]
          }
        ]
      ],
      'text-font': ['Noto Sans Regular'],
      'text-size': [
        'interpolate',
        ['linear'],
        ['zoom'],
        3, 11,
        7, 16
      ],
      'text-radial-offset': 0.2,
      'text-anchor': 'center',
      'text-transform': 'uppercase'
    },
    paint: {
      'text-color': '#999999',
      'text-halo-color': '#121212',
      'text-halo-width': 1
    }
  },
  {
    id: 'places_locality',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    filter: ['==', ['get', 'kind'], 'locality'],
    layout: {
      'icon-image': ['step', ['zoom'], 'townspot', 8, ''],
      'icon-size': 0.7,
      'text-field': [
        'format',
        ['coalesce', ['get', 'name:en'], ['get', 'name']],
        {
          'text-font': [
            'case',
            ['==', ['get', 'script'], 'Devanagari'],
            ['literal', ['Noto Sans Devanagari Regular v1']],
            ['literal', ['Noto Sans Regular']]
          ]
        }
      ],
      'text-font': ['Noto Sans Regular'],
      'symbol-sort-key': [
        'case',
        ['has', 'sort_key'], ['get', 'sort_key'],
        ['get', 'min_zoom']
      ],
      'text-padding': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5, 3,
        8, 7,
        12, 11
      ],
      'text-size': [
        'interpolate',
        ['linear'],
        ['zoom'],
        2, ['case',
          ['<', ['get', 'population_rank'], 13], 8,
          ['>=', ['get', 'population_rank'], 13], 13,
          0
        ],
        4, ['case',
          ['<', ['get', 'population_rank'], 13], 10,
          ['>=', ['get', 'population_rank'], 13], 15,
          0
        ],
        6, ['case',
          ['<', ['get', 'population_rank'], 12], 11,
          ['>=', ['get', 'population_rank'], 12], 17,
          0
        ],
        8, ['case',
          ['<', ['get', 'population_rank'], 11], 11,
          ['>=', ['get', 'population_rank'], 11], 18,
          0
        ],
        10, ['case',
          ['<', ['get', 'population_rank'], 9], 12,
          ['>=', ['get', 'population_rank'], 9], 20,
          0
        ],
        15, ['case',
          ['<', ['get', 'population_rank'], 8], 12,
          ['>=', ['get', 'population_rank'], 8], 22,
          0
        ]
      ],
      'icon-padding': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 0,
        8, 4,
        10, 8,
        12, 6,
        22, 2
      ],
      'text-justify': 'auto',
      'text-variable-anchor': [
        'step',
        ['zoom'],
        ['literal', ['bottom', 'left', 'right', 'top']],
        8,
        ['literal', ['center']]
      ],
      'text-radial-offset': 0.3
    },
    paint: {
      'text-color': '#dddddd',
      'text-halo-color': '#121212',
      'text-halo-width': 1
    }
  },
  {
    id: 'places_country',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    filter: ['==', ['get', 'kind'], 'country'],
    layout: {
      'symbol-sort-key': [
        'case',
        ['has', 'sort_key'], ['get', 'sort_key'],
        ['get', 'min_zoom']
      ],
      'text-field': [
        'format',
        ['coalesce', ['get', 'name:en'], ['get', 'name']],
        {
          'text-font': [
            'case',
            ['==', ['get', 'script'], 'Devanagari'],
            ['literal', ['Noto Sans Devanagari Regular v1']],
            ['literal', ['Noto Sans Regular']]
          ]
        }
      ],
      'text-font': ['Noto Sans Regular'],
      'text-size': [
        'interpolate',
        ['linear'],
        ['zoom'],
        2, ['case',
          ['<', ['get', 'population_rank'], 10], 8,
          ['>=', ['get', 'population_rank'], 10], 12,
          0
        ],
        6, ['case',
          ['<', ['get', 'population_rank'], 8], 10,
          ['>=', ['get', 'population_rank'], 8], 18,
          0
        ],
        8, ['case',
          ['<', ['get', 'population_rank'], 7], 11,
          ['>=', ['get', 'population_rank'], 7], 20,
          0
        ]
      ],
      'icon-padding': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 2,
        14, 2,
        16, 20,
        17, 2,
        22, 2
      ],
      'text-transform': 'uppercase',
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.1,
      'text-padding': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 2,
        14, 5,
        18, 10
      ]
    },
    paint: {
      'text-color': '#999999',
      'text-halo-color': '#121212',
      'text-halo-width': 1,
      'text-opacity': 0.9
    }
  },
  {
    id: 'address_numbers',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'buildings',
    minzoom: 17,
    filter: [
      'all',
      ['has', 'addr:housenumber'],
      ['!=', ['get', 'addr:housenumber'], '']
    ],
    layout: {
      'text-font': ['Noto Sans Regular'],
      'text-field': ['get', 'addr:housenumber'],
      'text-size': 9,
      'text-allow-overlap': false
    },
    paint: {
      'text-color': '#aaaaaa',
      'text-halo-color': 'rgba(18,18,18,0.8)',
      'text-halo-width': 1
    }
  },
  
  // INNOVATIVE DARK MODE ENHANCEMENTS
  {
    id: 'night_glow',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'landuse'], 'residential'],
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10, 'rgba(50, 50, 70, 0.1)',
        16, 'rgba(70, 70, 100, 0.2)'
      ],
      'fill-opacity': 0.3
    }
  },
  {
    id: 'road_glow',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    filter: ['in', ['get', 'kind'], ['literal', ['highway', 'major_road']]],
    paint: {
      'line-color': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10, 'rgba(100, 140, 255, 0.1)',
        16, 'rgba(100, 140, 255, 0.3)'
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        10, 1,
        18, 20
      ],
      'line-blur': 5,
      'line-opacity': 0.4
    }
  },
  {
    id: 'building_highlight',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'buildings',
    minzoom: 15,
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['building', 'building_part']]
    ],
    paint: {
      'fill-color': '#4a4a4a',
      'fill-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15, 0.3,
        17, 0.7
      ]
    }
  }
];