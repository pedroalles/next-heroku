const axios = require('axios');
const cheerio = require('cheerio');

export async function getTorcedoresNews() {
    const site = 'TORCEDORES.COM'
    const url = 'https://www.torcedores.com/equipes/gremio'
    const response = await axios.get(url);
    const html = await response.data;
    const $ = cheerio.load(html);

    const result = []

    $('h2[class="article-teaser-title"]').find('a', html).each(function () {
        let title = $(this).text().trim();
        title = title.slice(0, title.length - 16)
        const url = $(this).attr('href');
        result.push({ site, title, url })
    })

    return result;
}

