import axios from 'axios'
import cheerio from 'cheerio'

const URL = "https://www.brainyquote.com/topics/remember-quotes"

async function getQuotes() {
    try {
        const res = await axios.get(URL)
        const $ = cheerio.load(res.data)
        const quote = $("h1").text()

        console.log(quote)

    } catch (err) { console.error(err) }
}; getQuotes()