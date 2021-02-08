# MVT-API

This module provide you with Serverless Spatial Search.
You can get attributes of Feature by PointCoordinate, with MapboxVectorTile.

## Usage

### Install

```sh
npm install mvt-api
```

### sample code

```javascript
// src/example.ts
import { MvtApi } from 'mvt-api';

// instantiate MvtApi Class, with Tile Url and Zoomlevel.
const api = new MvtApi(
    'https://tile.openstreetmap.jp/data/japan/{z}/{x}/{y}.pbf',
    14,
);
(async () => {
    const response = await api
        .getFeaturesByPoint(['landcover', 'water'], [141.505495, 43.045269])
        .then((res) => res)
        .catch((err) => err);
    console.log(response);
    /**
        [
            { type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [Array] },
            properties: { class: 'lake', intermittent: 0 } },
            { type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [Array] },
            properties: { class: 'grass', subclass: 'park' } },
            { type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [Array] },
            properties: { class: 'wood', subclass: 'wood' } }
        ]
     */
})();

```

## API documents

### MvtApi(mvtUrl: string, maxzoom: number, minzoom = 0)

constructor.

### .getFeaturesByPoint(sourceLayers, lngLat): Promise<Feature[]>

Fetch to a tile and get features in sourceLayers and by inputed coordinates.

#### sourceLayers: string[]

An array of layer names of MVT you want to get.

#### lngLat: [number, number]

Longitude and Latitude of Point to search.

#### Feature[]

An array of found features.
