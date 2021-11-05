import { getTorcedoresNews } from '../../infra/getTorcedoresNews';

export default async function handler(req, res) {
    const response = await getTorcedoresNews();
    res.status(200).json(response)
}
