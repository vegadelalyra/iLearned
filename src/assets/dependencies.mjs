import readline from 'readline'
import fs from 'fs'

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    history: [],
    historySize: 0,
}) 

export { rl, fs }