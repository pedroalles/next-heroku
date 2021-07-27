import puppeteer from 'puppeteer'
// import chrome from 'chrome-aws-lambda'

export async function getOptions() {
  // const isDev = !process.env.AWS_REGION
  const isDev = process.env.NODE_ENV == 'development'
  let options;

  const chromeExecPaths = {
    win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }

  const exePath = chromeExecPaths[process.platform]

  const dataDir = '/home/pedro/.config/google-chrome/default';

  if (isDev) {
    options = {
      args: [
        // '--headless',
        // '--no-sandbox',
        // '--disable-gpu',
        // '--start-maximized',
        `--user-data-dir=${dataDir}`,
      ],
      executablePath: exePath,
      headless: true
    }
  } else {
    options = {
      // args: chrome.args,
      args: ["--no-sandbox"],
      // executablePath: await chrome.executablePath,
      // headless: chrome.headless
      headless: true
    }
  }

  return options
}

let _page = null
let _browser = null
async function getPage() {
  if (_page) {
    return _page
  }
  if (_browser) {
    return _browser
  }

  const options = await getOptions()
  _browser = await puppeteer.launch(options)

  _page = await _browser.newPage()

  return _page
}


export async function getMarketInfos({ width, height } = { width: 800, height: 800 }) {
  const page = await getPage();

  await page.setViewport({ width, height });

  await page.goto('https://steamcommunity.com/market/');

  const pageContent = await page.evaluate(() => {

    const getInfos = (el) => ({
      "Sticker Name": el.innerText,
      "Sticker Url": el.getAttribute('href'),
    });

    return {
      userName: document.querySelector('#account_pulldown').innerText,
      walletBalance: document.querySelector('#header_wallet_balance').innerText,
      listings: [...document.querySelectorAll('span[id*="mylisting_"] > a')].map(getInfos),
      orders: [...document.querySelectorAll('span[id*="mbuyorder_"] > a')].map(getInfos),
    }
  })

  await _browser.close()

  console.log(pageContent);

  return pageContent
}