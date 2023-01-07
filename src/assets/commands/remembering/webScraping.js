import axios from 'axios'
import cheerio from 'cheerio'

const URL = "https://www.brainyquote.com/topics/remember-quotes"
const baseURL = "https://www.brainyquote.com"

async function getQuotes(URL) {
    try {
        const res = await fetch(URL)
        const html = await res.text()
        const $ = cheerio.load(html)
        const quotes = $(".oncl_q:nth-child(1) div")

        quotes.each(function() {
            let quote = $(this).text()
            if (quote.length < 138) console.log(quote, quote.length)
        })

        const onNext = $(".page-item:nth-child(8) .page-link").attr("href")
        if ($(".disabled").text() !== '..Next') return getQuotes(baseURL + onNext)     

    } catch (err) { console.error(err) }
}; getQuotes(URL)