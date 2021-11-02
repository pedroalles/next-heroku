import { getGeNews } from '../../infra/getGeNews';

export default async function handler(req, res) {
    const response = await getGeNews();
    res.status(200).json(response)
}
