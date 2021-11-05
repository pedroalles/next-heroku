import { getUolNews } from '../../infra/getUolNews';
import { getEspnNews } from '../../infra/getEspnNews';
import { getPGNews } from '../../infra/getPGNews';
import { getTorcedoresNews } from '../../infra/getTorcedoresNews';

export default async function handler(req, res) {
    const espn = await getEspnNews();
    const pg = await getPGNews();
    const torcedores = await getTorcedoresNews();
    const uol = await getUolNews();

    res.setHeader('content-type', 'application/json');
    res.status(200).json([
        ...espn,
        ...pg,
        ...torcedores,
        ...uol,
    ])

}
