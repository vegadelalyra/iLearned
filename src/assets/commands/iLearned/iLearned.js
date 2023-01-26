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
    let [word, def, exp] = args; book = [word, def, exp]
    
    // Prompt for users when running default
    const newConceptLine = '~'.repeat(process.stdout.columns)
    const newBookMsg = 'Seems like somebody here has learned something new today'
    if (input.length < 4) console
    .log(`\x1b[33m${newConceptLine}\n\n\x1b[0m${newBookMsg} \x1b[33m ฅ ={^･ｪ･^}= \᳡ \n`)

    // Web scraping word from Cambridge dictionary
    let userInput = word.split(' ').length == 1 ? word : word.replace(' ', '-'), cambridge
    if (/^[a-zA-Z-]+$/.test(userInput)) cambridge = await webScrape(userInput, true)

    // if available in Cambridge, fill book, else, use user's book
    if (!cambridge) return terminal_conversation(input, ...book)
   
    // An english word! filling book for user
    word = word + ' ' + cambridge.IPA    // word 
    if (!exp) exp = cambridge.exp        // exp
    book = [word, def, exp]
    if (def) return terminal_conversation(input, ...book)
    const lvlpos = !!cambridge.lvl 
    ? `${cambridge.lvl} ${cambridge.PoS} ` 
    : `${cambridge.PoS} `
    def = lvlpos + cambridge.def        // def
    book = [word, def, exp]
    input.push(book[1], book[2])
    return terminal_conversation(input, ...book)
}