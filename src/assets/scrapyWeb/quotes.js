import { load } from 'cheerio'
import axios from 'axios'
import { C } from '../dependencies.js'

export default async function getQuotes(wordsPerPhrase = 16) {
    // the website from where we scrape "remember" topic quotes
    const url = "https://www.brainyquote.com/topics/remember-quotes" 

    // pagination (code will scrape a random page)
    const rP = arr => arr[Math.floor(Math.random() * arr.length)]
    let pages = Array.from({length: 17}, (_, i) => i + 1)
    let randomPage = rP(pages)  
    function pageGen() {
        let chosenPage = randomPage == 1 ? '' : `_${randomPage}` 
        return url + chosenPage
    }; let page = pageGen()

    // Epistle will save quotes
    let epistle = []
    return closure()
    
    // Pursuit of retrieve a short quote.
    async function closure(next) {
        // update fetched link
        let res, $; try {
            res = await axios.get(next || page, {timeout: 1000})
             $ = load(res.data)
        } catch { return }
        
        // get the elements that matches your conditions
        const quotes = $(".oncl_q:nth-child(1) div")
        quotes.each(function() {   
            if ($(this)
                .text()
                .split(' ')
                .length <= wordsPerPhrase
            ) epistle.push($(this).text())
        }) 
        
        // GUARD CLAUSE: Did you catch any? 
        if (!epistle.length) return innerClosure()
        
        // output [strove coloring REMEMBER word]
        let chosenOne = rP(epistle)
        chosenOne = chosenOne.slice(1, -1)
        epistle = chosenOne.toLowerCase().split(' ')
        .findIndex( word => word.includes('remember'))
        chosenOne = chosenOne.split(' ')
        chosenOne[epistle] = `${C.g}${chosenOne[epistle]}${C.w}`
        chosenOne = chosenOne.join(' ')
        return chosenOne

        function innerClosure() {
            // Pagination's Guard Clause: non-matching quote on page
            pages.splice(pages.indexOf(randomPage), 1)
            if (!pages.length) return

            // Callback to next page
            randomPage = rP(pages)
            page = pageGen()
            return closure(page)
        }
    }
}