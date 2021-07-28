import puppeteer from 'puppeteer'
// import chrome from 'chrome-aws-lambda'
const isDev = process.env.NODE_ENV == 'development'
const width = 1024;
const height = 800;

export async function getOptions() {
  // const isDev = !process.env.AWS_REGION
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
        // `--user-data-dir=${dataDir}`,
      ],
      executablePath: exePath,
      headless: false
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

export async function loginSteam({ login, pass, sg }) {
  const page = await getPage();

  await page.setViewport({ width: width, height: height });
  await page.goto('https://steamcommunity.com/login/home/?goto=market%2F');

  await page.type('#input_username', login);
  await page.type('#input_password', pass);
  await page.click('#login_btn_signin > button');

  await page.waitForSelector('#twofactorcode_entry');
  await page.waitForSelector('#twofactorcode_entry', { visible: true })
  await page.type('#twofactorcode_entry', sg);
  await page.click('#login_twofactorauth_buttonset_entercode > div.auth_button.leftbtn');
};


export async function getMarketInfos() {
  const page = await getPage();

  await page.waitForSelector('#marketWalletBalance', { visible: true })
  // await page.setViewport({ width: width, height: height });
  // await page.waitFor(2000);
  // await page.goto('https://steamcommunity.com/market/');

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
  _page = null
  _browser = null
  console.log(pageContent);
  return pageContent

}