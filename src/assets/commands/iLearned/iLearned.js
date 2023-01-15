#!/usr/bin/env node
import yargs from 'yargs'
import terminal_conversation from './terminalConversation.js'

// my default option 
export default function iLearned(book = []) {
    // Decoding user's input
    const argvInitialized = yargs(process.argv.slice(2)).argv
    const input = argvInitialized._
    .join(' ')
    .split('/')
    .filter( el => { return el != null && el != '' } )
    .map(item => item.trim()) ?? []

    // User's input arraged in book schema: word / def / exp
    const args = [input[0] ?? '', input[1] ?? '', input[2] ?? '']
    let [word, def, exp] = args
    book = [word, def, exp]
    
    // Prompt for users when running default
    const newConceptLine = '~'.repeat(process.stdout.columns)
    const newBookMsg = 'Seems like somebody here has learned something new today'
    
    if (input.length < 4) console
    .log(`\n\x1b[33m${newConceptLine}\n\n\x1b[0m${newBookMsg} \x1b[33m ฅ ={^･ｪ･^}= \᳡ \n`)

    return terminal_conversation(input, ...book)
}