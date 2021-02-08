import * as util from 'util';
import { Feature, FeatureCollection } from 'geojson';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import booleanPointOnLine from '@turf/boolean-point-on-line';
import { point } from '@turf/helpers';
const tilebelt = require('@mapbox/tilebelt');
const vt2geojsonAsync = util.promisify(require('@mapbox/vt2geojson'));

type LngLat = [number, number];
type Tile = [number, number, number];

class MvtApi {
    mvtUrl: string;
    maxzoom: number;
    minzoom: number;
    constructor(mvtUrl: string, maxzoom: number, minzoom = 0) {
        this.mvtUrl = mvtUrl;
        this.maxzoom = maxzoom;
        this.minzoom = minzoom;
    }
    async getFeaturesByPoint(
        sourceLayer: string,
        lngLat: LngLat,
        zoomLevel = null,
    ): Promise<Feature[]> {
        const tile: Tile = tilebelt.pointToTile(
            lngLat[0],
            lngLat[1],
            zoomLevel ? zoomLevel : this.maxzoom,
        );
        const geojson: FeatureCollection = await vt2geojsonAsync({
            uri: this.mvtUrl
                .replace('{x}', String(tile[0]))
                .replace('{y}', String(tile[1]))
                .replace('{z}', String(tile[2])),
            layer: sourceLayer,
        })
            .then((response: FeatureCollection) => response)
            .catch((err: Error) => {
                throw err;
            });

        return geojson.features.filter((feature) => {
            switch (feature.geometry.type) {
                case 'Polygon':
                case 'MultiPolygon':
                    return booleanPointInPolygon(point(lngLat), feature as any);
                case 'LineString':
                case 'MultiLineString':
                    return booleanPointOnLine(point(lngLat), feature as any);
                default:
                    return false;
            }
        });
    }
}

export { MvtApi };
