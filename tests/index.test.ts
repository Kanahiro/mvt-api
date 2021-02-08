import { MvtApi } from '../src/index';
const tileUrl = 'http://kanahiro.github.io/mvt-api/{z}/{x}/{y}.pbf';
const api = new MvtApi(tileUrl, 10);

describe('getFeaturesByPoint', () => {
    test('found a tile and a feature', () => {
        api.getFeaturesByPoint(['pref'], [136.07707, 35.28036])
            .then((response) => {
                expect(response.length).toBe(1);
                expect(response[0].properties!['name']).toBe('滋賀県');
                expect(response[0].properties!['code']).toBe('25');
            })
            .catch((e) => {
                expect(e).toBe(undefined);
            });
    });
    test('found a tile but no feature', () => {
        api.getFeaturesByPoint(['pref'], [135.9021, 35.9397])
            .then((response) => {
                expect(response.length).toBe(0);
            })
            .catch((e) => {
                expect(e).toBe(undefined);
            });
    });
    test("couldn't find a tile", () => {
        api.getFeaturesByPoint(['pref'], [106.07707, 35.28036])
            .then((response) => {
                expect(response).toBe(undefined);
            })
            .catch((e) => {
                expect(e.name).toBe('Error');
                expect(e.message).toBe(
                    `Error retrieving data from "${tileUrl.replace(
                        '{z}/{x}/{y}',
                        '10/813/404',
                    )}". Server responded with code: 404`,
                );
            });
    });
});
