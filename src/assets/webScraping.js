import { load } from 'cheerio'
import axios from 'axios'
import { launch } from 'puppeteer'

const start = performance.now()
await webScrape('plead')
const end = performance.now()
const elapsedTime = end - start
console.log('Fetching last:', elapsedTime,'ms')

// web scrape your word data from Cambridge dictionary
export default async function webScrape(userInput) {
    // URL handler
    userInput = userInput.toLowerCase()
    const URL = `https://dictionary.cambridge.org/dictionary/english/${userInput}`
    
    // fetching and parsing website
    // Time testing
    const res = await axios.get(URL)
    const $ = load(res.data) 

    // Getting word
    const word = $('#cald4-1-1~ .dpos-h .dpos-h_hw').text()
    const c2 = $('#cald4-1-1~ .dsense_b .C2').text()
    return console.log(userInput, word, !!c2, c2)
}