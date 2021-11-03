const axios = require('axios');
const cheerio = require('cheerio');

export async function getUolNews() {
    // const url = 'https://www.google.com/search?q=gr%C3%AAmio&hl=pt-BR&biw=1067&bih=649&tbm=nws';
    const site = 'uol'
    const url = 'https://www.uol.com.br/esporte/futebol/times/gremio/'
    const response = await axios.get(url);
    const html = await response.data;
    const $ = cheerio.load(html);

    const result = []

    $('div[class="results-items"]').find('a:contains("Grêmio")', html).each(function () {
        let title = $(this).text().trim();
        title = title.slice(0, title.length - 16)
        const url = $(this).attr('href');
        result.push({ site, title, url })
    })

    return result;
}