import Book from './saveQueue.mjs'
import readline from 'readline'
import fs from 'fs'

const autocomplete = line => {
  // retrieve data and user input, cure both.
  const completions = Object.keys(Book.hashMap)
  const lineCurated = line.trim().toLowerCase().split(' ')

  // get last user word to always trigger autocomplete on user input
  const lastWordInput = lineCurated.at(-1)
  return [completions.filter( key => key.toLowerCase().startsWith(lastWordInput)), lastWordInput]
}

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    historySize: 0,
    completer: autocomplete,
}) 
 
const date_of_birth = () => {
    const currentDate = new Date(),
    day = currentDate.getDate().toString(),
    month = String(currentDate.getMonth() + 1),
    year = currentDate.getFullYear().toString()
    return day+month+year
  }

rl.on('SIGINT', () => {
  console.log("\x1b[90m\nHmmmph... Wanderer... <.<'")
  process.exit()
})

export { rl, fs, date_of_birth }