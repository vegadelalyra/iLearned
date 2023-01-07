import cheerio from 'cheerio'

const URL = "https://www.brainyquote.com/topics/remember-quotes"
const baseURL = "https://www.brainyquote.com"
const epistle = []

async function getQuotes(URL) {
    try {
        const res = await fetch(URL)
        const html = await res.text()
        const $ = cheerio.load(html)

        const quotes = $(".oncl_q:nth-child(1) div")

        quotes.each(function(n = 0) {
            let quote = $(this).text()
            if (quote.length < 138) epistle.push(quote)
            console.log(epistle, n++)
        })

        const onNext = $(".page-item:nth-child(8) .page-link").attr("href")
        if ($(".disabled").text() !== '..Next') return getQuotes(baseURL + onNext)     

    } catch (err) { 
        console.error(err) 
    } finally { 

        const miau = epistle[Math.floor(Math.random() * epistle.length)]
        console.log(miau)

    }
}; getQuotes(URL)