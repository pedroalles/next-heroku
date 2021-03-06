const axios = require('axios');
const cheerio = require('cheerio');

export async function getEspnNews() {

    const site = 'ESPN';
    const base_url = 'https://www.espn.com.br';
    const search_url = base_url + '/futebol/time/_/id/6273/gr%C3%AAmio';

    const response = await axios.get(search_url);
    const html = await response.data;
    const $ = cheerio.load(html);

    const result = []

    $('div[id="news-feed-content"]').find('a:contains("Grêmio")', html).each(function () {
        const title = $(this).text().trim();
        const url = $(this).attr('href');
        result.push({ site, title, url: base_url + url })
    })

    return result;
}
