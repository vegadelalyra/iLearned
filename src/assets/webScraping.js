import { load } from 'cheerio'
import axios from 'axios'

webScrape('plead')

// web scrape your word data from Cambridge dictionary
export default async function webScrape(userInput) {
    // URL handler
    userInput = userInput.toLowerCase()
    const URL = `https://dictionary.cambridge.org/dictionary/english/${userInput}`
    
    // fetching and parsing website
    const res = await fetch(URL)
    const html = await res.text()
    const $ = load(html) 

    // Getting word
    const word = $('#cald4-1-1~ .dpos-h .dpos-h_hw').text()
    const c2 = $('#cald4-1-1~ .dsense_b .C2').text()
    return console.log(userInput, word, !!c2, c2)
}