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

    if (input.length < 4) console.log("\nSeems like somebody here has learned something new today  ฅ ={^･ｪ･^}= \᳡ \n")

    return terminal_conversation(input, ...book)
}