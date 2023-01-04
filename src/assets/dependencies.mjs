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

// overwrite rl.write default text with any new key
readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) process.stdin.setRawMode(true)

const rlWrite = (str = 'YEAH') => {
  rl.write(str)
  process.stdin.once('keypress', (str, key) => {
    if (key) rl.write(null, { ctrl: true, name: 'u' })
    rl.write(key.sequence)
  })
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
function confirm(data, remem = false, evil = false, color = '\n\x1b[31m') {
  let confirmation = []
  
  // show off keys entered by the user on screen    
  const colorLine = '='.repeat(process.stdout.columns)
  console.log(`${color}${colorLine}`)
  for (const key of data) {
    evil ? evil.forEach(bad => eval(remem[bad])) : null
    console.log( `\n ${Book.hashMap[key]}` )
    remem ? confirmation.push(key) : confirmation.push(key.split(' ')[0])
  } 
  console.log(`${color}${colorLine}\n`)
  
  // confirm user's decision
  if (confirmation.length == 1) return confirmation
  const pop = confirmation.pop()
  confirmation = `\x1b[37m${confirmation.join(', ')} \x1b[33mand\x1b[37m ${pop}\x1b[33m?\x1b[37m\n`
  return confirmation
}

export { rl, fs, date_of_birth, confirm }