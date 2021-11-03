import puppeteer from 'puppeteer'

async function getOptions() {
  const isDev = process.env.NODE_ENV == 'development'
  let options;

  const chromeExecPaths = {
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }

  const exePath = chromeExecPaths[process.platform]

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true
    }
  } else {
    options = {
      args: ["--no-sandbox"],
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

export async function getGeNews({ width, height } = { width: 800, height: 800 }) {
  const page = await getPage();
  const url = 'https://ge.globo.com/rs/futebol/times/gremio/';
  await page.setViewport({ width, height });
  await page.goto(url);

  const result = await page.evaluate(() => {
    const site = 'GLOBO ESPORTE'
    const posts = []
    document.querySelectorAll('div.feed-post-body-title.gui-color-primary.gui-color-hover > div > a')
      .forEach((post) => posts.push({
        site,
        title: post.textContent,
        url: post.getAttribute('href')
      }))
    return posts
  })

  await _browser.close()
  _page = null
  _browser = null

  return result;
}
