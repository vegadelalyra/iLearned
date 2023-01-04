import Book from './saveQueue.mjs'
import readline from 'readline'
import fs from 'fs'

// amazing per-word autocomplete function
const autocomplete = line => {
  // retrieve data and user input, cure both.
  const completions = Object.keys(Book.hashMap)
  const lineCurated = line.trim().toLowerCase().split(' ')

  // get last user word to always trigger autocomplete on user input
  const lastWordInput = lineCurated.at(-1)
  return [completions.filter( key => key.toLowerCase().startsWith(lastWordInput)), lastWordInput]
}

// readLine interface
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    historySize: 0,
    completer: autocomplete,
}) 

// date of birth of books/knowledges
const date_of_birth = () => {
    const currentDate = new Date(),
    day = currentDate.getDate().toString(),
    month = String(currentDate.getMonth() + 1),
    year = currentDate.getFullYear().toString()
    return day+month+year
  }

// signal interruption event handler
rl.on('SIGINT', () => {
  console.log("\x1b[90m\nHmmmph... Wanderer... <.<'")
  process.exit()
})


// user confirmation output
let confirmation = []
            
// show off keys entered by the user on screen    
const redLine = '='.repeat(process.stdout.columns)
console.log(`\n\x1b[31m${redLine}`)
for (const key of chapters) {
    console.log( `\n ${Book.hashMap[key]}` )
    confirmation.push(key.split(' ')[0])
} 
console.log(`\n\x1b[31m${redLine}\n`)

// confirm user's decision
if (confirmation.length > 1) {
    const pop = confirmation.pop()
    confirmation = `${confirmation.join(', ')} \x1b[33mand\x1b[37m ${pop}`
}


export { rl, fs, date_of_birth }