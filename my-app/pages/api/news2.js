import { getNewsCheerio } from '../../infra/getNewsCheerio';

export default async function handler(req, res) {
    const response = await getNewsCheerio();
    res.status(200).json(response)
}
