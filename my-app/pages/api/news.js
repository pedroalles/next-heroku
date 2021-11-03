import { getGeNews } from '../../infra/getGeNews';
import { getUolNews } from '../../infra/getUolNews';
import { getEspnNews } from '../../infra/getEspnNews';

export default async function handler(req, res) {
    const response1 = await getGeNews();
    const response2 = await getUolNews();
    const response3 = await getEspnNews();
    res.setHeader('content-type', 'application/json');
    res.status(200).json([
        ...response3,
        ...response2,
        ...response1,
    ])

}
