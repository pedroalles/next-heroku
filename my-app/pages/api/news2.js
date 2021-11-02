import { getUolNews } from '../../infra/getUolNews';
import { getEspnNews } from '../../infra/getEspnNews';

export default async function handler(req, res) {
    const response1 = await getUolNews();
    const response2 = await getEspnNews();
    res.status(200).json([
        ...response2,
        ...response1,
    ])
}
