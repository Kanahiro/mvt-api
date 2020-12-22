import * as util from 'util';
import { FeatureCollection } from 'geojson';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
const tilebelt = require('@mapbox/tilebelt');
const vt2geojson = require('@mapbox/vt2geojson');
const vt2geojsonAsync = util.promisify(vt2geojson);

type requestDataList = string[];
type LngLat = [number, number];
type Tile = [number, number, number];
type Response = { [key: string]: any };

class MvtApi {
    mvtUrl: string;
    zoomLevel: number;
    constructor(mvtUrl: string, zoomLevel: number) {
        this.mvtUrl = mvtUrl;
        this.zoomLevel = zoomLevel;
    }
    async request(
        sourceLayer: string,
        lngLat: LngLat,
        requestDataList: requestDataList,
    ): Promise<Response> {
        const tile: Tile = tilebelt.pointToTile(
            lngLat[0],
            lngLat[1],
            this.zoomLevel,
        );
        const geojson: FeatureCollection = await vt2geojsonAsync({
            uri: this.mvtUrl
                .replace('{x}', String(tile[0]))
                .replace('{y}', String(tile[1]))
                .replace('{z}', String(tile[2])),
            layer: sourceLayer,
        });

        const featuresByPoint = geojson.features.filter((feature) => {
            if (feature.geometry.type === 'Point' || 'MultiPolygon') {
                return booleanPointInPolygon(point(lngLat), feature as any);
            }
        });
        return featuresByPoint.map((feature) => {
            const props: Response = {};
            requestDataList.map((key) => {
                props[key] = feature.properties![key];
            });
            return props;
        });
    }
}

export { MvtApi };
