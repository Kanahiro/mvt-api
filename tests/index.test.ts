import { MvtApi } from '../src/index';
const baseUrl = 'http://kanahiro.github.io/mvt-api';
const api = new MvtApi(`${baseUrl}/{z}/{x}/{y}.pbf`, 10);

describe('getFeaturesByPoint', () => {
    test('found a tile and a feature', () => {
        api.getFeaturesByPoint(
            'pref',
            [136.07707, 35.28036],
            ['name', 'code', 'test'],
        )
            .then((response) => {
                expect(response.length).toBe(1);
                expect(response[0]['name']).toBe('滋賀県');
                expect(response[0]['code']).toBe('25');
                // a attribute requested but don't exist in properties of a feature
                expect(response[0]['test']).toBe(undefined);
            })
            .catch((e) => {
                expect(e).toBe(undefined);
            });
    });
    test('found a tile but no feature', () => {
        api.getFeaturesByPoint(
            'pref',
            [135.9021, 35.9397],
            ['name', 'code', 'test'],
        )
            .then((response) => {
                expect(response.length).toBe(0);
            })
            .catch((e) => {
                expect(e).toBe(undefined);
            });
    });
    test("couldn't find a tile", () => {
        api.getFeaturesByPoint(
            'pref',
            [106.07707, 35.28036],
            ['name', 'code', 'test'],
        )
            .then((response) => {
                expect(response).toBe(undefined);
            })
            .catch((e) => {
                expect(e.name).toBe('Error');
                expect(e.message).toBe(
                    `Error retrieving data from "${baseUrl}/10/813/404.pbf". Server responded with code: 404`,
                );
            });
    });
});
