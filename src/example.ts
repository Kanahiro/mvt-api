import { MvtApi } from './index';

const api = new MvtApi('http://kanahiro.github.io/mvt-api/{z}/{x}/{y}.pbf', 10);
(async () => {
    const response = await api
        .request('pref', [136.07707, 35.28036], ['name', 'code', 'test'])
        .then((res) => res)
        .catch((err) => err);
    console.log(response);
})();
