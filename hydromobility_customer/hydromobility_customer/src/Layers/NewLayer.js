export const mapLayers = [
  // Background layer
  {
    id: 'background',
    type: 'background',
    paint: {
      'background-color': '#e2dfda',
    },
  },
  // Earth layer
  {
    id: 'earth',
    type: 'fill',
    filter: ['==', '$type', 'Polygon'],
    source: 'rmtiles',
    'source-layer': 'earth',
    paint: {
      'fill-color': '#e2dfda',
    },
  },
  // Landcover layer
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
        'grassland', '#d2efcf',
        'barren', '#fff3d7',
        'urban_area', '#e6e6e6',
        'farmland', '#d8efd2',
        'glacier', '#ffffff',
        'scrub', '#eaefd2',
        'forest', '#a0d9a0',
        'wood', '#a0d9a0',
        '#c4e7d2',
      ],
      'fill-opacity': ['interpolate', ['linear'], ['zoom'], 4, 0.8, 7, 0.3, 8, 0],
    },
  },
  // Park landuse
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
        ]]], '#9cd3b4',
        ['in', ['get', 'kind'], ['literal', ['wood', 'forest']]], '#a0d9a0',
        ['in', ['get', 'kind'], ['literal', ['scrub', 'grassland', 'grass']]], '#99d2bb',
        '#9cd3b4',
      ],
    },
  },
  // Urban green
  {
    id: 'landuse_urban_green',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 8,
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['allotments', 'village_green', 'playground']],
    ],
    paint: {
      'fill-color': '#9cd3b4',
      'fill-opacity': 0.7,
    },
  },
  // Hospital
  {
    id: 'landuse_hospital',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 10,
    filter: ['==', ['get', 'kind'], 'hospital'],
    paint: {
      'fill-color': '#e4dad9',
    },
  },
  // Industrial
  {
    id: 'landuse_industrial',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 8,
    filter: ['==', ['get', 'kind'], 'industrial'],
    paint: {
      'fill-color': '#d1dde1',
    },
  },
  // Zoo
  {
    id: 'landuse_zoo',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 10,
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['zoo']],
    ],
    paint: {
      'fill-color': '#c6dcdc',
    },
  },
  // Aerodrome
  {
    id: 'landuse_aerodrome',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 8,
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['aerodrome']],
    ],
    paint: {
      'fill-color': '#dadbdf',
    },
  },
  // Runway
  {
    id: 'landuse_runway',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 10,
    filter: [
      'any',
      [
        'in',
        ['get', 'kind'],
        ['literal', ['runway', 'taxiway']]
      ]
    ],
    paint: {
      'fill-color': '#e9e9ed',
    },
  },
  // Water
  {
    id: 'water',
    type: 'fill',
    filter: ['==', '$type', 'Polygon'],
    source: 'rmtiles',
    'source-layer': 'water',
    paint: {
      'fill-color': '#80deea',
    },
  },
  // Pedestrian
  {
    id: 'landuse_pedestrian',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 12,
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['pedestrian', 'dam']]
    ],
    paint: {
      'fill-color': '#e3e0d4',
    },
  },
  // Pier
  {
    id: 'landuse_pier',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 12,
    filter: ['==', ['get', 'kind'], 'pier'],
    paint: {
      'fill-color': '#e0e0e0',
    },
  },
  // Buildings
  {
    id: 'buildings',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'buildings',
    minzoom: 14,
    filter: [
      'in',
      ['get', 'kind'],
      ['literal', ['building', 'building_part']]
    ],
    paint: {
      'fill-color': '#cccccc',
      'fill-opacity': 0.5,
    },
  },
  // Residential
  {
    id: 'landuse_residential',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 10,
    filter: ['==', ['get', 'landuse'], 'residential'],
    paint: {
      'fill-color': '#f0f0f0',
      'fill-opacity': 0.4
    }
  },
  // Cemetery
  {
    id: 'landuse_cemetery',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 10,
    filter: ['==', ['get', 'landuse'], 'cemetery'],
    paint: {
      'fill-color': '#dcdcdc',
      'fill-opacity': 0.4
    }
  },
  // Beach
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
      'fill-color': '#e8e4d0',
    },
  },
  // School
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
      'fill-color': '#e4ded7',
    },
  },
  // Glacier
  {
    id: 'landcover_glacier',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landcover',
    minzoom: 6,
    filter: ['==', ['get', 'natural'], 'glacier'],
    paint: {
      'fill-color': '#e0f6ff',
      'fill-opacity': 0.5
    }
  },
  // Military
  {
    id: 'landuse_military',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 8,
    filter: ['==', ['get', 'landuse'], 'military'],
    paint: {
      'fill-color': '#ffe6e6',
      'fill-opacity': 0.3
    }
  },
  // Sports
  {
    id: 'landuse_sports',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 12,
    filter: [
      'match',
      ['coalesce', ['get', 'leisure'], ''],
      ['recreation_ground', 'sports_centre', 'pitch'],
      true,
      false
    ],
    paint: {
      'fill-color': '#cce6cc',
      'fill-opacity': 0.5
    }
  },
  // Farmland
  {
    id: 'landuse_farmland',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    minzoom: 8,
    filter: [
      'match',
      ['coalesce', ['get', 'landuse'], ''],
      ['farmland', 'farm'],
      true,
      false
    ],
    paint: {
      'fill-color': '#f6f4e6',
      'fill-opacity': 0.4
    }
  },

  // WATERWAYS
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
      'line-color': '#80deea',
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
      'line-color': '#80deea',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        9, 0,
        9.5, 1,
        18, 12,
      ],
    },
  },

  // TRANSPORTATION - RAILS FIRST
  {
    id: 'roads_rail',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 6,
    filter: ['==', 'kind', 'rail'],
    paint: {
      'line-dasharray': [0.3, 0.75],
      'line-opacity': 0.5,
      'line-color': '#a7b1b3',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        6, 0.15,
        18, 9,
      ],
    },
  },

  // RUNWAY AND AIRPORT INFRASTRUCTURE
  {
    id: 'roads_runway',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 10,
    filter: ['==', ['get', 'kind_detail'], 'runway'],
    paint: {
      'line-color': '#e9e9ed',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        10, 0,
        12, 4,
        18, 30,
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
      'line-color': '#e9e9ed',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        13.5, 1,
        15, 6,
      ],
    },
  },

  // TUNNEL CASINGS
  {
    id: 'roads_tunnels_other_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 14,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['in', ['get', 'kind'], ['literal', ['other', 'path']]]
    ],
    paint: {
      'line-color': '#e0e0e0',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        14, 0,
        20, 7,
      ],
    },
  },
  {
    id: 'roads_tunnels_minor_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 11,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'minor_road']
    ],
    paint: {
      'line-color': '#e0e0e0',
      'line-dasharray': [3, 2],
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        11, 0,
        12.5, 0.5,
        15, 2,
        18, 11,
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        12, 0,
        12.5, 1,
      ],
    },
  },
  {
    id: 'roads_tunnels_link_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['has', 'is_link']
    ],
    paint: {
      'line-color': '#e0e0e0',
      'line-dasharray': [3, 2],
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
        12.5, 1
      ]
    }
  },
  {
    id: 'roads_tunnels_major_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 7,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#e0e0e0',
      'line-dasharray': [3, 2],
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7, 0,
        7.5, 0.5,
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
    id: 'roads_tunnels_highway_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 3,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#e0e0e0',
      'line-dasharray': [6, 0.5],
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

  // TUNNEL ROADS
  {
    id: 'roads_tunnels_other',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 14,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['in', ['get', 'kind'], ['literal', ['other', 'path']]]
    ],
    paint: {
      'line-color': '#d5d5d5',
      'line-dasharray': [4.5, 0.5],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        14, 0,
        20, 7
      ]
    }
  },
  {
    id: 'roads_tunnels_minor',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 11,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'minor_road']
    ],
    paint: {
      'line-color': '#d5d5d5',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        11, 0,
        12.5, 0.5,
        15, 2,
        18, 11
      ]
    }
  },
  {
    id: 'roads_tunnels_link',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 13,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['has', 'is_link']
    ],
    paint: {
      'line-color': '#d5d5d5',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        13.5, 1,
        18, 11
      ]
    }
  },
  {
    id: 'roads_tunnels_major',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 6,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#d5d5d5',
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
    minzoom: 3,
    filter: [
      'all',
      ['has', 'is_tunnel'],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#d5d5d5',
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

  // PIER ROADS
  {
    id: 'roads_pier',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: ['==', ['get', 'kind_detail'], 'pier'],
    paint: {
      'line-color': '#e0e0e0',
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

  // ROAD CASINGS - SURFACE ROADS
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
      'line-color': '#e0e0e0',
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
    minzoom: 11,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', ['get', 'kind'], 'minor_road'],
      ['!=', ['get', 'kind_detail'], 'service']
    ],
    paint: {
      'line-color': '#e0e0e0',
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
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['has', 'is_link']
    ],
    paint: {
      'line-color': '#e0e0e0',
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
      'line-color': '#e0e0e0',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7, 0,
        7.5, 0.5,
        18, 13,
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        9, 0,
        9.5, 1,
      ],
    },
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
      'line-color': '#e0e0e0',
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
      'line-color': '#e0e0e0',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3, 0,
        3.5, 0.5,
        18, 15,
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7, 0,
        7.5, 1,
      ],
    },
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
      'line-color': '#e0e0e0',
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

  // SURFACE ROADS
  {
    id: 'roads_other',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 13,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind', 'other']
    ],
    paint: {
      'line-color': '#ebebeb',
      'line-width': 2
    }
  },
  {
    id: 'roads_minor_service',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 13,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind_detail', 'service']
    ],
    paint: {
      'line-color': '#ebebeb',
      'line-width': 3
    }
  },
  {
    id: 'roads_minor',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 11,
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
        11, '#ebebeb',
        16, '#ffffff',
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        11, 0,
        12.5, 0.5,
        15, 2,
        18, 11,
      ],
    },
  },
  {
    id: 'roads_link',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 13,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['has', 'is_link']
    ],
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        13.5, 1,
        18, 11
      ]
    }
  },
  {
    id: 'roads_major',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 6,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind', 'major_road'],
    ],
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        6, 0,
        12, 1.6,
        15, 3,
        18, 13,
      ],
    },
  },
  {
    id: 'roads_highway',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 3,
    filter: [
      'all',
      ['!', ['has', 'is_tunnel']],
      ['!', ['has', 'is_bridge']],
      ['==', 'kind', 'highway'],
      ['!', ['has', 'is_link']],
    ],
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        3, 0,
        6, 1.1,
        12, 1.6,
        15, 5,
        18, 15,
      ],
    },
  },

  // BOUNDARIES
  {
    id: 'boundaries_country',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'boundaries',
    minzoom: 0,
    filter: ['<=', ['get', 'kind_detail'], 2],
    paint: {
      'line-color': '#adadad',
      'line-width': 0.7,
      'line-dasharray': [
        'step',
        ['zoom'],
        [2],
        4,
        [2, 1],
      ],
    },
  },
  {
    id: 'boundaries',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'boundaries',
    minzoom: 4,
    filter: ['>', ['get', 'kind_detail'], 2],
    paint: {
      'line-color': '#adadad',
      'line-width': 0.4,
      'line-dasharray': [
        'step',
        ['zoom'],
        [2],
        4,
        [2, 1],
      ],
    },
  },

  // BRIDGE CASINGS
  {
    id: 'roads_bridges_other_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 12,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['in', ['get', 'kind'], ['literal', ['other', 'path']]]
    ],
    paint: {
      'line-color': '#e0e0e0',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        14, 0,
        20, 7
      ],
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        14, 0,
        14.5, 1
      ]
    }
  },
  {
    id: 'roads_bridges_minor_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 11,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'minor_road']
    ],
    paint: {
      'line-color': '#e0e0e0',
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
    id: 'roads_bridges_link_casing',
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
      'line-color': '#e0e0e0',
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
        13.5, 1
      ]
    }
  },
  {
    id: 'roads_bridges_major_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 7,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#e0e0e0',
      'line-gap-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        7, 0,
        7.5, 0.5,
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
    id: 'roads_bridges_highway_casing',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 3,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#e0e0e0',
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

  // BRIDGE ROADS
  {
    id: 'roads_bridges_other',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 14,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['in', ['get', 'kind'], ['literal', ['other', 'path']]]
    ],
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
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
    minzoom: 11,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'minor_road']
    ],
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
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
    minzoom: 13,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['has', 'is_link']
    ],
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'interpolate',
        ['exponential', 1.6],
        ['zoom'],
        13, 0,
        13.5, 1,
        18, 11
      ]
    }
  },
  {
    id: 'roads_bridges_major',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 6,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'major_road']
    ],
    paint: {
      'line-color': '#ffffff',
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
    id: 'roads_bridges_highway',
    type: 'line',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 3,
    filter: [
      'all',
      ['has', 'is_bridge'],
      ['==', ['get', 'kind'], 'highway'],
      ['!', ['has', 'is_link']]
    ],
    paint: {
      'line-color': '#ffffff',
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

  // WATER LABELS
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
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name'], ''],
      'text-size': 12,
      'text-letter-spacing': 0.2,
    },
    paint: {
      'text-color': '#728dd4',
      'text-halo-color': '#ffffff',
      'text-halo-width': 0,
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
      'text-color': '#6ba3d6',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 0
    }
  },
  {
    id: 'water_label_ocean',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'water',
    minzoom: 0,
    filter: ['in', ['get', 'kind'], ['literal', ['sea', 'ocean', 'bay', 'strait', 'fjord']]],
    layout: {
      'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 3, 10, 10, 12],
      'text-letter-spacing': 0.1,
      'text-max-width': 9,
      'text-transform': 'uppercase'
    },
    paint: {
      'text-color': '#728dd4',
      'text-halo-width': 0,
      'text-halo-color': '#ffffff'
    }
  },

  // ROAD LABELS
  {
    id: 'roads_labels_major',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'roads',
    minzoom: 8,
    filter: [
      'all',
      ['in', ['get', 'kind'], ['literal', ['highway', 'major_road']]],
      ['has', 'name']
    ],
    layout: {
      'symbol-sort-key': ['coalesce', ['get', 'min_zoom'], 99],
      'symbol-placement': 'line',
      'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name'], ['get', 'ref']],
      'text-size': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8, 10,
        12, 11,
        16, 12
      ],
      'text-max-angle': 30,
      'text-letter-spacing': 0.05
    },
    paint: {
      'text-color': '#938a8d',
      'text-halo-color': '#ffffff',
      'text-halo-width': 0
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
        'minor_road', 'other', 'path', 'service', 'track',
        'pedestrian', 'footway', 'cycleway', 'living_street'
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
        13, 9,
        16, 10,
        18, 11
      ],
      'text-max-angle': 30,
      'text-letter-spacing': 0.05,
      'text-max-width': 8,
      'symbol-spacing': 250,
      'text-pitch-alignment': 'viewport'
    },
    paint: {
      'text-color': '#5a5a5a',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 0,
      'text-halo-blur': 0.5,
      'text-opacity': 0.9
    }
  },

  // POI LABELS
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
      'text-color': '#777777',
      'text-halo-color': 'rgba(255,255,255,0.7)',
      'text-halo-width': 0
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
        'park', '#2d5a3d',
        'hospital', 'grey',
        'school', '#8b4a9c',
        'university', '#8b4a9c',
        '#666666'
      ],
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 0
    }
  },
  {
    id: 'pois',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'pois',
    minzoom: 15,
    filter: ['in', ['get', 'kind'], ['literal', [
      'beach', 'forest', 'marina', 'park', 'peak', 'zoo', 'garden', 'bench',
      'aerodrome', 'station', 'bus_stop', 'ferry_terminal',
      'stadium', 'university', 'library', 'school', 'animal', 'toilets', 'drinking_water'
    ]]],
    layout: {
      'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-justify': 'auto',
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 15, 8, 19, 12],
      'text-max-width': 8,
      'text-offset': [1.1, 0],
      'text-variable-anchor': ['left', 'right']
    },
    paint: {
      'text-color': [
        'match',
        ['get', 'kind'],
        ['beach', 'forest', 'marina', 'park', 'peak', 'zoo', 'garden', 'bench'], '#20834D',
        ['aerodrome', 'station', 'bus_stop', 'ferry_terminal'], '#315BCF',
        ['stadium', 'university', 'library', 'school', 'animal', 'toilets', 'drinking_water'], '#6A5B8F',
        '#666666'
      ],
      'text-halo-color': '#ffffff',
      'text-halo-width': 0
    }
  },

  // PLACE LABELS
  {
    id: 'places_country',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    minzoom: 0,
    filter: ['==', ['get', 'kind'], 'country'],
    layout: {
      'symbol-sort-key': [
        'case',
        ['has', 'sort_key'], ['get', 'sort_key'],
        ['coalesce', ['get', 'min_zoom'], 99]
      ],
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-font': ['Noto Sans Regular'],
      'text-size': [
        'interpolate',
        ['linear'],
        ['zoom'],
        2, ['case',
          ['<', ['coalesce', ['get', 'population_rank'], 0], 10], 8,
          ['>=', ['coalesce', ['get', 'population_rank'], 0], 10], 12,
          10
        ],
        6, ['case',
          ['<', ['coalesce', ['get', 'population_rank'], 0], 8], 12,
          ['>=', ['coalesce', ['get', 'population_rank'], 0], 8], 18,
          14
        ],
        8, ['case',
          ['<', ['coalesce', ['get', 'population_rank'], 0], 7], 14,
          ['>=', ['coalesce', ['get', 'population_rank'], 0], 7], 20,
          16
        ]
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
      'text-color': '#a3a3a3',
      'text-halo-color': '#e2dfda',
      'text-halo-width': 0,
      'text-opacity': 0.9
    }
  },
  {
    id: 'places_region',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    minzoom: 3,
    filter: ['in', ['get', 'kind'], ['literal', ['region', 'state', 'province']]],
    layout: {
      'symbol-sort-key': ['coalesce', ['get', 'sort_key'], ['get', 'min_zoom'], 99],
      'text-field': [
        'step',
        ['zoom'],
        ['coalesce', ['get', 'ref:en'], ['get', 'ref'], ['get', 'name:en'], ['get', 'name']],
        6,
        ['coalesce', ['get', 'name:en'], ['get', 'name']]
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
      'text-color': '#b3b3b3',
      'text-halo-color': '#e0e0e0',
      'text-halo-width': 0
    }
  },
  {
    id: 'places_locality',
    type: 'symbol',
    source: 'rmtiles',
    'source-layer': 'places',
    minzoom: 4,
    filter: ['==', ['get', 'kind'], 'locality'],
    layout: {
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-font': ['Noto Sans Regular'],
      'symbol-sort-key': [
        'case',
        ['has', 'sort_key'], ['get', 'sort_key'],
        ['coalesce', ['get', 'min_zoom'], 99]
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
        4, ['case',
          ['<', ['coalesce', ['get', 'population_rank'], 0], 13], 8,
          ['>=', ['coalesce', ['get', 'population_rank'], 0], 13], 13,
          10
        ],
        6, ['case',
          ['<', ['coalesce', ['get', 'population_rank'], 0], 12], 11,
          ['>=', ['coalesce', ['get', 'population_rank'], 0], 12], 17,
          13
        ],
        8, ['case',
          ['<', ['coalesce', ['get', 'population_rank'], 0], 11], 11,
          ['>=', ['coalesce', ['get', 'population_rank'], 0], 11], 18,
          14
        ],
        10, ['case',
          ['<', ['coalesce', ['get', 'population_rank'], 0], 9], 12,
          ['>=', ['coalesce', ['get', 'population_rank'], 0], 9], 20,
          15
        ],
        15, ['case',
          ['<', ['coalesce', ['get', 'population_rank'], 0], 8], 12,
          ['>=', ['coalesce', ['get', 'population_rank'], 0], 8], 22,
          16
        ]
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
      'text-color': '#5c5c5c',
      'text-halo-color': '#e0e0e0',
      'text-halo-width': 0
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
      'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
      'text-font': ['Noto Sans Regular'],
      'text-size': [
        'interpolate',
        ['linear'],
        ['zoom'],
        12, 10,
        16, 12
      ],
      'text-max-width': 6,
      'text-transform': 'uppercase',
      'text-letter-spacing': 0.1
    },
    paint: {
      'text-color': '#888888',
      'text-halo-color': 'rgba(255,255,255,0.7)',
      'text-halo-width': 0
    }
  },

  // ADDRESS LABELS
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
      'text-color': '#999999',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 0
    }
  }



    ]