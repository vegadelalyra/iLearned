import axios from 'axios'
import cheerio from 'cheerio'

const URL = "https://www.brainyquote.com/topics/remember-quotes"

async function getQuotes() {
    try {
        const res = await axios.get(URL)
        const $ = cheerio.load(res.data)
        const quote = $(".oncl_q:nth-child(1) div")

        quote.each(function() {
            let miau = $(this).text()
            if (miau.length < 138) console.log(miau, miau.length)
        })

    } catch (err) { console.error(err) }
}; getQuotes()