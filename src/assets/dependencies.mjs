import Book from './saveQueue.mjs'
import readline from 'readline'
import fs from 'fs'

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    historySize: 0,
    completer: (line) => {
      const completions = Object.keys(Book.hashMap)
      const hits = completions.filter((c) => c.toLowerCase().startsWith(line.toLowerCase()))
      return [hits.length ? hits : completions, line]
    }
}) 

const date_of_birth = () => {
    const currentDate = new Date(),
    day = currentDate.getDate().toString(),
    month = String(currentDate.getMonth() + 1),
    year = currentDate.getFullYear().toString()
    return day+month+year
  }

  process.stdin.on('keypress', (char, key) => {
    if (key.ctrl && key.name === 'c') {
      console.log("\x1b[90m\nHmmmph... Wanderer... <.<'")
      rl.close()
    }
  })

export { rl, fs, date_of_birth }