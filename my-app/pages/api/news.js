import { getNews } from '../../infra/getNews';
import { getNewsCheerio } from '../../infra/getNewsCheerio';

export default async function handler(req, res) {
    const response1 = await getNews();
    const response2 = await getNewsCheerio();
    res.status(200).json([
        ...response2,
        ...response1,
    ])
}
