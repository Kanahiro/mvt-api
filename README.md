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
import { MvtApi } from './index';

// instantiate MvtApi Class, with Tile Url and Zoomlevel.
const api = new MvtApi('http://kanahiro.github.io/mvt-api/{z}/{x}/{y}.pbf', 10);

(async () => {
    // async request
    const response = await api
        .request('pref', [136.07707, 35.28036], ['name', 'code', 'test'])
        .then((res) => res)
        .catch((err) => err);
    console.log(response);
    /*
    [
        {
            name: '滋賀県',
            code: '25',
            test: undefined
        }
    ]
    */
})();

```

## API documents

### MvtApi(mvtUrl: string, zoomLevel: number)

constructor.

### .request(sourceLayer, lngLat, requestDataList): Promise<Response[]>

Fetch to a tile and get attributes of features by inputed coordinates, this is similar to GET request.

#### sourceLayer: string

A layer name of MVT you want to get.

#### lngLat: [number, number]

Longitude and Latitude of Point to search.

#### requestDataList: string[]

Attribute names you want to get.