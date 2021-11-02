const axios = require('axios');
const cheerio = require('cheerio');

export async function getNewsCheerio() {
    // const url = 'https://www.google.com/search?q=gr%C3%AAmio&hl=pt-BR&biw=1067&bih=649&tbm=nws';
    const url = 'https://www.uol.com.br/esporte/futebol/times/gremio/'
    const response = await axios.get(url);
    const html = await response.data;
    const $ = cheerio.load(html);

    const result = []

    $('div[class="results-items"]').find('a:contains("Grêmio")', html).each(function () {
        const title = $(this).text().trim();
        const url = $(this).attr('href');
        result.push({ title, url })
    })

    return result;
}