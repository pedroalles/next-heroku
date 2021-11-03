import { getUolNews } from '../../infra/getUolNews';
import { getEspnNews } from '../../infra/getEspnNews';
import { getPGNews } from '../../infra/getPGNews';

export default async function handler(req, res) {
    const uol = await getUolNews();
    const espn = await getEspnNews();
    const pg = await getPGNews();

    res.setHeader('content-type', 'application/json');
    res.status(200).json([
        ...pg,
        ...espn,
        ...uol,
    ])

}
