import { getNews } from '../../infra/getNews';

export default async function handler(req, res) {
    const response = await getNews();
    res.status(200).json(response)
}
