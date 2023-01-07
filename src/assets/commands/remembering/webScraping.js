import axios from 'axios'
import cheerio from 'cheerio'

const URL = "https://books.toscrape.com/catalogue/category/books/mystery_3/index.html"

async function getQuotes() {
    try {
        const res = await axios.get(URL)
        const $ = cheerio.load(res.data)
        const quote = $("h1").text()

        console.log(quote)

    } catch (err) { console.error(err) }
}; getQuotes()