import { load } from 'cheerio'
import axios from 'axios'

webScrape('plead')

// web scrape your word data from Cambridge dictionary
export default async function webScrape(userInput) {
    // URL handler
    userInput = userInput.toLowerCase()
    const URL = `https://dictionary.cambridge.org/dictionary/english/${userInput}`
    
    // fetching and parsing website
    // Time testing
    const start = performance.now()
    const res = await axios.get(URL)
    const end = performance.now()
    const elapsedTime = end - start
    console.log(`Fetching last: ${elapsedTime}ms`)
    
    const start2 = performance.now()
    const $ = load(res.data) 
    const end2 = performance.now()
    const elapsedTime2 = end2 - start2
    console.log(`Fetching last: ${elapsedTime2}ms`)

    // Getting word
    const start3 = performance.now()
    const word = $('#cald4-1-1~ .dpos-h .dpos-h_hw').text()
    const c2 = $('#cald4-1-1~ .dsense_b .C2').text()
    const end3 = performance.now()
    const elapsedTime3 = end3 - start3
    console.log(`Fetching last: ${elapsedTime3}ms`)
    return console.log(userInput, word, !!c2, c2)
}