#!/usr/bin/env node
import yargs from 'yargs'
import terminal_conversation from './terminalConversation.js'
import webScrape from '../../scrapyWeb/words.js'

// my default option 
export default async function iLearned(book = []) {
    // Decoding user's input
    const argvInitialized = yargs(process.argv.slice(2)).argv
    const input = argvInitialized._
    .join(' ')
    .split('/')
    .filter( el => { return el != null && el != '' } )
    .map(item => item.trim()) ?? []

    // User's input arranged in book schema: word / def / exp
    const args = [input[0] ?? '', input[1] ?? '', input[2] ?? '']
    let [word, def, exp] = args
    
    // Prompt for users when running default
    const newConceptLine = '~'.repeat(process.stdout.columns)
    const newBookMsg = 'Seems like somebody here has learned something new today'
    if (input.length < 4) console
    .log(`\x1b[33m${newConceptLine}\n\n\x1b[0m${newBookMsg} \x1b[33m ฅ ={^･ｪ･^}= \᳡ \n`)

    // Web scraping word from Cambridge dictionary
    let userInput = word.split(' ').length == 1 ? word : word.replace(' ', '-'), cambridge
    if (/^[a-zA-Z-]+$/.test(userInput)) cambridge = await webScrape(userInput, true)
    if (!cambridge)
    word = word + ' ' + cambridge.IPA
    

    // LET'S START THE PARTY !!!
    book = [word, def, exp]
    return terminal_conversation(input, ...book)
}

let arg = [3, 2, 3]
let miau = {a:'', b:'', c:''}
miau = arg
miau.a = 1
// let book = [a, b, c]
// a = 1
// book = [a, b, c]
console.log(miau) // [ 3, 2, 3 ]