import Book from './saveQueue.mjs'
import readline from 'readline'
import fs from 'fs'

// Import dependencies to export them
import C from './dependencies/ANSI_COLORS.mjs'
import centerText from './dependencies/centerText.mjs'
import confirm from './dependencies/confirm.mjs'
import date_of_birth from './dependencies/date_of_birth.mjs'

// amazing per-word autocomplete function
const autocomplete = line => {
  // retrieve data and user input, cure both.
  const completions = Object.keys(Book.hashMap)
  const lineCurated = line.trim().toLowerCase().split(' ')

  // get last user word to always trigger autocomplete on user input
  const lastWordInput = lineCurated.at(-1)
  return [completions.filter( key => key.toLowerCase().startsWith(lastWordInput)), lastWordInput]
}

// overwrite rl.write default text with any new key
readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) process.stdin.setRawMode(true)

const rlWrite = (str = 'YEAH') => {
  rl.write(str)
  process.stdin.once('keypress', (str, key) => {
    const regEx = /^[0-9a-zA-Z]*$|^[^0-9a-zA-Z]$/
    if (!regEx.test(key.sequence)) return
    rl.write(null, { ctrl: true, name: 'u' })
    if (key.name?.length > 1 && key.name != undefined) return rl.write('')
    rl.write(key.sequence)
  })
}

// readLine interface
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    historySize: 0,
    completer: autocomplete,
    prompt: ''
}) 

// signal interruption event handler
rl.on('SIGINT', () => {
  console.log("\x1b[90m\nHmmmph... Wanderer... <.<'")
  process.exit()
})

export { rl, fs, date_of_birth, confirm, rlWrite, centerText, C }