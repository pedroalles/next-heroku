const axios = require('axios');
const cheerio = require('cheerio');

export async function getTorcedoresNews() {

    const site = 'TORCEDORES.COM';
    const base_url = 'https://www.torcedores.com';
    const search_url = base_url + '/equipes/gremio';

    const response = await axios.get(search_url);
    const html = await response.data;
    const $ = cheerio.load(html);

    const result = []

    $('h2[class="article-teaser-title"]').find('a', html).each(function () {
        let title = $(this).text().trim();
        const url = $(this).attr('href');
        result.push({ site, title, url })
    })

    return result;
}
