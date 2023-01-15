import cheerio from 'cheerio'

const URL = "https://www.brainyquote.com/topics/remember-quotes"
const baseURL = "https://www.brainyquote.com", epistle = []

async function getQuotes(URL, words = 9) {
    // fetch and parse the target website
    const res = await fetch(URL)
    const html = await res.text()
    const $ = cheerio.load(html)

    // CSS-selector and filter of the desired HTML element
    const quotes = $(".oncl_q:nth-child(1) div")
    quotes.each(function() {   
        const quote = $(this).text()
        if (quote.split(' ').length < words) {
            console.log(quote, quote.split(' ').length, 'words')
            epistle.push(quote)
        }
    })

    // pagination (code will scrape until the last page)
    let button = nth => $(`.page-item:nth-child(${nth}) .page-link`)
    let curated = a => button(a).attr('href'), nextPage

    button(8).text() === 'Next' 
    ? nextPage = curated(8)
    : nextPage = curated(9)

    if ($(".disabled").text() !== '..Next') return getQuotes(baseURL + nextPage, words)     
    
    // output
    console.log('\n', epistle.length, 'phrases scraped from web!')
    const chosenOne = epistle[Math.floor(Math.random() * epistle.length)]
    return chosenOne
}; const phrase = await getQuotes(URL, 40)
console.log('...and the chosen one is:\n', phrase)