#!/usr/bin/env node
import yargs from 'yargs'
import terminal_conversation from './terminalConversation.mjs'

// my default option 
export default function iLearned(book = []) {
    const argvInitialized = yargs(process.argv.slice(2)).argv
    const input = argvInitialized._
    .join(' ')
    .split('/')
    .filter( el => { return el != null && el != '' } )
    .map(item => item.trim()) ?? []

    const args = [input[0] ?? '', input[1] ?? '', input[2] ?? '']
    let [word, def, exp] = args
    book = [word, def, exp]
    const newConceptLine = '~'.repeat(process.stdout.columns)
    if (input.length < 4) console.log(`\n\x1b[33m${newConceptLine}\n\n\x1b[0mSeems like somebody here has learned something new today \x1b[33m ฅ ={^･ｪ･^}= \᳡ \n`)

    return terminal_conversation(input, ...book)
}