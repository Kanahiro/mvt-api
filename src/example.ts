import { MvtApi } from './index';

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
})();
