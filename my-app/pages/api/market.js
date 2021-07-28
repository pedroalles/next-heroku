import { getMarketInfos, loginSteam } from '../../infra/getMarket';

const asyncFunc = async (req, res) => {

  const userInfos = {
    login: req.query.login || 'No Login',
    pass: req.query.pass || 'No Pass',
    sg: req.query.sg || 'No Steam Guard',
  };

  console.log(userInfos);

  await loginSteam(userInfos);

  const market_title = await getMarketInfos();

  return res.json(market_title)
}

export default asyncFunc;