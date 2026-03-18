    export const mapLayers = [
      //FILL_LAYER
        {
    id: 'background',
    type: 'background',
    paint: {
      'background-color': '#e2dfda',
    },
  },
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
        '#c4e7d2', // default
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
        ]]], '#9cd3b4',
        ['in', ['get', 'kind'], ['literal', ['wood', 'forest']]], '#a0d9a0',
        ['in', ['get', 'kind'], ['literal', ['scrub', 'grassland', 'grass']]], '#99d2bb',
        '#9cd3b4',
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
          'fill-color': '#9cd3b4',
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
          'fill-color': '#e4dad9',
        },
      },
      {
        id: 'landuse_industrial',
        type: 'fill',
        source: 'rmtiles',
        'source-layer': 'landuse',
        filter: ['==', ['get', 'kind'], 'industrial'],
        paint: {
          'fill-color': '#d1dde1',
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
          'fill-color': '#c6dcdc',
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
          'fill-color': '#dadbdf',
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
          'fill-color': '#e9e9ed',
        },
      },
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
          'fill-color': '#e3e0d4',
        },
      },
      {
        id: 'landuse_pier',
        type: 'fill',
        source: 'rmtiles',
        'source-layer': 'landuse',
        filter: ['==', ['get', 'kind'], 'pier'],
        paint: {
          'fill-color': '#e0e0e0',
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
          'fill-color': '#cccccc',
          'fill-opacity': 0.5,
        },
      },
      {
      id: 'landuse_residential',
      type: 'fill',
      source: 'rmtiles',
      'source-layer': 'landuse',
      filter: ['==', ['get', 'landuse'], 'residential'],
      paint: {
        'fill-color': '#f0f0f0',
        'fill-opacity': 0.4
      }
    },

    {
    id: 'landuse_cemetery',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'landuse'], 'cemetery'],
    paint: {
      'fill-color': '#dcdcdc',
      'fill-opacity': 0.4
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
      'fill-color': '#e8e4d0',
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
      'fill-color': '#e4ded7',
    },
  },
  {
    id: 'landcover_glacier',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landcover',
    filter: ['==', ['get', 'natural'], 'glacier'],
    paint: {
      'fill-color': '#e0f6ff',
      'fill-opacity': 0.5
    }
  },
  {
    id: 'landuse_military',
    type: 'fill',
    source: 'rmtiles',
    'source-layer': 'landuse',
    filter: ['==', ['get', 'landuse'], 'military'],
    paint: {
      'fill-color': '#ffe6e6',
      'fill-opacity': 0.3
    }
  }
  ,
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
    'fill-color': '#cce6cc',
    'fill-opacity': 0.5
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
    'fill-color': '#f6f4e6',
    'fill-opacity': 0.4
  }
}
,
      //LINE_LAYER

      {
        id: 'roads_runway',
        type: 'line',
        source: 'rmtiles',
        'source-layer': 'roads',
        filter: ['==', ['get', 'kind_detail'], 'runway'],
        paint: {
          'line-color': '#e9e9ed',
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
          'line-color': '#e9e9ed',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#d5d5d5',
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
          'line-color': '#d5d5d5',
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
          'line-color': '#d5d5d5',
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
      {
        id: 'roads_pier',
        type: 'line',
        source: 'rmtiles',
        'source-layer': 'roads',
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
        filter: ['has', 'is_link'],
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
      {
        id: 'roads_other',
        type: 'line',
        source: 'rmtiles',
        'source-layer': 'roads',
        filter: ['==', 'kind', 'other'],
        paint: {
          'line-color': '#ebebeb',
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
          'line-color': '#ffffff',
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
          'line-color': '#ebebeb',
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
            '#ebebeb',
            16,
            '#ffffff',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#ffffff',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#ffffff',
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
          'line-color': '#a7b1b3',
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
          'line-color': '#adadad',
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
          'line-color': '#adadad',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#e0e0e0',
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
          'line-color': '#ebebeb',
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
          'line-color': '#ffffff',
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
          'line-color': '#ffffff',
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
          'line-color': '#f5f5f5',
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
          'line-color': '#e0e0e0',
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

//SYMBOL

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
    'text-color': '#91888b',
    'text-halo-color': '#ffffff',
    'text-halo-width': 0
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
    'text-color': '#728dd4',
    'text-halo-color': '#ffffff',
    'text-halo-width': 0,
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
      'text-color': '#777777',
      'text-halo-color': 'rgba(255,255,255,0.7)',
      'text-halo-width': 0.8
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
      'text-color': '#555555',
      'text-halo-color': 'rgba(255,255,255,0.8)',
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
      'text-color': '#888888',
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
        'hospital', '#d63c3c',
        'school', '#8b4a9c',
        'university', '#8b4a9c',
        '#666666'
      ],
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 0
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
    'text-field': ['get', 'name'],  // safest fallback key
    'text-size': 12
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
    ['has', 'name']  // Only show roads that have names
  ],
  layout: {
    'symbol-placement': 'line',
    'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
    'text-field': [
      'coalesce',
      ['get', 'name:en'],
      ['get', 'name'],
      ['get', 'ref'],  // Fallback to reference number if no name
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
    'text-color': '#5a5a5a',
    'text-halo-color': 'rgba(255,255,255,0.8)',
    'text-halo-width': 0,
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
]
,
'text-font': [
  'case',
  ['==', ['get', 'script'], 'Devanagari'],
  ['literal', ['Noto Sans Devanagari Regular v1']],
  ['literal', ['Noto Sans Regular']]
]
,
    'text-size': ['interpolate', ['linear'], ['zoom'], 3, 10, 10, 12],
    'text-letter-spacing': 0.1,
    'text-max-width': 9,
    'text-transform': 'uppercase'
  },
  paint: {
    'text-color': '#728dd4',
    'text-halo-width': 0,
    'text-halo-color': '#80deea'
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
      'beach', '#20834D',
      'forest', '#20834D',
      'marina', '#20834D',
      'park', '#20834D',
      'peak', '#20834D',
      'zoo', '#20834D',
      'garden', '#20834D',
      'bench', '#20834D',
      'aerodrome', '#315BCF',
      'station', '#315BCF',
      'bus_stop', '#315BCF',
      'ferry_terminal', '#315BCF',
      'stadium', '#6A5B8F',
      'university', '#6A5B8F',
      'library', '#6A5B8F',
      'school', '#6A5B8F',
      'animal', '#6A5B8F',
      'toilets', '#6A5B8F',
      'drinking_water', '#6A5B8F',
      '#e2dfda'
    ],
    'text-halo-color': '#e2dfda',
    'text-halo-width': 0
  }
},

{
  id: 'places_subplace',
  type: 'symbols',
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
    'text-color': '#8f8f8f',
    'text-halo-color': '#e0e0e0',
    'text-halo-width': 0
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
      ['coalesce', ['get', 'ref:en'], ['get', 'ref']],  // Show reference at low zooms
      6,
      [  // Show name at higher zooms
        'format',
        ['coalesce', 
          ['get', 'name:en'],  // Try English name first
          ['get', 'pgf:name'], // Then PGF name
          ['get', 'name']      // Then default name
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
    'text-color': '#5c5c5c',
    'text-halo-color': '#e0e0e0',
    'text-halo-width': 0
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
    'text-color': '#a3a3a3',
    'text-halo-color': '#e2dfda',
    'text-halo-width': 0,
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
      'text-color': '#999999',
      'text-halo-color': 'rgba(255,255,255,0.8)',
      'text-halo-width': 0
    }
  }



    ]
