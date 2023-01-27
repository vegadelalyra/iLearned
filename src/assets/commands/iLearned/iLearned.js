#!/usr/bin/env node
import yargs from 'yargs'
import terminal_conversation from './terminalConversation.js'
import webScrape from '../../scrapyWeb/words.js'
import { C } from '../../dependencies.js'

// my default option 
export default async function iLearned(book = []) {
    // Decoding user's input
    const argvInitialized = yargs(process.argv.slice(2)).argv
    let input = argvInitialized._
    .join(' ')
    .split('/')
    .filter( el => { return el != null && el != '' } )
    .map(item => item.trim()) ?? []

    // User's input arranged in book schema: word / def / exp
    const args = [input[0] ?? '', input[1] ?? '', input[2] ?? '']
    let [word, def, exp] = args; book = [word, def, exp]
    
    // Prompt for users when running default
    const newConceptLine = '~'.repeat(process.stdout.columns)
    const ms1 = 'Seems like somebody here has'
    const ms2 = 'learned something new today'
    if (input.length < 4) console
    .log(`\n${C.g} /\\_/\\\n( ^.^ )  ${C.w}${ms1}${C.g}\n  >^<  ${C.w}${ms2}`)

    // Web scraping word from Cambridge dictionary
    let userInput = word.split(' ').length == 1 
    ? word : word.replace(' ', '-'), cambridge
    if (/^[a-zA-Z-]+$/.test(userInput) && input.length < 3
    ) cambridge = await webScrape(userInput)

    // if available in Cambridge, fill book, else, use user's book
    if (!cambridge) return terminal_conversation(input, ...book)
   
    // An english word! filling book for user
    if (input.length < 3) word = word + ' ' + cambridge.IPA    // word 
    if (!def) def = contriveDef()                               // def
    if (!exp) exp = cambridge.exp                               // exp
    
    function contriveDef () {
        const lvlpos = !!cambridge.lvl 
        ? `${cambridge.lvl} ${cambridge.PoS}, ` 
        : `${cambridge.PoS}, `
        return def = lvlpos + cambridge.def                               
    }
    book = [word, def, exp]; input = book
    return terminal_conversation(input, ...book)
}