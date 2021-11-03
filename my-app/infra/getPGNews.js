const axios = require('axios');
const cheerio = require('cheerio');

export async function getPGNews() {
    // const url = 'https://www.google.com/search?q=gr%C3%AAmio&hl=pt-BR&biw=1067&bih=649&tbm=nws';
    const site = 'PORTAL GREMISTA'
    const base_url = 'https://portaldogremista.com.br/'
    const search_url = base_url + ''
    const response = await axios.get(search_url);
    const html = await response.data;
    const $ = cheerio.load(html);

    const result = []

    $('div[class="main-wrap content-main-wrap"]').find('a:contains("Grêmio")', html).each(function () {
        const title = $(this).text().trim();
        const url = $(this).attr('href');
        if (title !== 'Últimas Notícias do Grêmio') {
            result.push({ site, title, url: url })
        }
    })

    return result;
}