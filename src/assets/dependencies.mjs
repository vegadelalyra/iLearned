import Book from './saveQueue.mjs'
import readline from 'readline'
import fs from 'fs'

const autocomplete = line => {
  // retrieve data and user input, cure both.
  const completions = Object.keys(Book.hashMap)
  const completionsCurated = completions.map(chapter => chapter.replaceAll(' ', '').toLowerCase())
  const lineCurated = new String(line.replaceAll(' ', '').toLowerCase())
  
  // Filtering to trigger autocomplete and recursivity respectively
  const hits = completions.filter( c => c.toLowerCase().startsWith(line.toLowerCase()))
  const rest = completionsCurated.filter( r => !lineCurated.includes(r) )

  // multiple autocompletions handler
  const keys_already_completed = []
  for (const key of completionsCurated) if (lineCurated.includes(key)) keys_already_completed.push(key)
  const chunkedLine = new String(lineCurated.replace('', ''))

  console.log('chunked line:', chunkedLine, 'lineCurated:', lineCurated, completionsCurated);
  return [hits.length ? hits : rest.length ? autocomplete(chunkedLine) : completions, line]
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