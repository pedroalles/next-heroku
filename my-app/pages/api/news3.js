import { getPGNews } from '../../infra/getPGNews';

export default async function handler(req, res) {
    const response = await getPGNews();
    res.status(200).json(response)
}
