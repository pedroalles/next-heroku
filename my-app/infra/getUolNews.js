const axios = require('axios');
const cheerio = require('cheerio');

export async function getUolNews() {

    const site = 'UOL';
    const base_url = 'https://www.uol.com.br';
    const search_url = base_url + '/esporte/futebol/times/gremio/';

    const response = await axios.get(search_url);
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
