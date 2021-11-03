import { getGeNews } from '../../infra/getGeNews';
import { getUolNews } from '../../infra/getUolNews';
import { getEspnNews } from '../../infra/getEspnNews';
import { getPGNews } from '../../infra/getPGNews';

export default async function handler(req, res) {
    const ge = await getGeNews();
    const uol = await getUolNews();
    const espn = await getEspnNews();
    const pg = await getPGNews();

    res.setHeader('content-type', 'application/json');
    res.status(200).json([
        ...ge,
        ...pg,
        ...espn,
        ...uol,
    ])

}
