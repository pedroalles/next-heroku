import { getMarketInfos } from '../../infra/getMarket';

export default async (req, res) => {

  const market_title = await getMarketInfos({ width: 1024, height: 800 });

  return res.json(market_title)

}