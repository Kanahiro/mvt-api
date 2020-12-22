import { MvtApi } from './index';

const api = new MvtApi('http://localhost:8000/{z}/{x}/{y}.pbf', 10);

(async () => {
    const geojson = await api.request('pref', [139.8282, 36.6836], {
        name: 'string',
        code: 'number',
        test: 'string',
    });
    console.log(geojson);
})();
