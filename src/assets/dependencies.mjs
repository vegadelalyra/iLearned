import Book from './saveQueue.mjs'
import readline from 'readline'
import fs from 'fs'

const autocomplete = line => {
  const completions = Object.keys(Book.hashMap)
  const completionsCurated = completions.map(chapter => chapter.replaceAll(' ', '').toLowerCase())
  const lineCurated = new String(line.replaceAll(' ', '').toLowerCase())
  
  // console.log(lineCurated, completionsCurated, '\n', lineCurated.includes(completionsCurated[0]), lineCurated.includes(completionsCurated[1]), lineCurated.includes(completionsCurated[2]))
  const hits = completions.filter( c => c.toLowerCase().startsWith(line.toLowerCase()))
  const rest = completionsCurated.filter( r => !lineCurated.includes(r) )
  const chunkedLine = new String(lineCurated.replace(hits[0]?.toLowerCase(), ''))
  // for (const key of completionsCurated) {
    // lineCurated.includes(key)
  // }
  console.log('chunked line:', chunkedLine, 'lineCurated:', lineCurated);
  return [hits.length ? hits : completions, line]
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