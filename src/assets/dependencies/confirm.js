import Book from "../saveQueue.js"
import C from "./ANSI_COLORS.js"

// user confirmation output
export default function confirm(data, remem = false, evil = false, color = '\n\x1b[31m') {
    let confirmation = []
    
    // show off keys entered by the user on screen    
    const colorLine = '~'.repeat(process.stdout.columns)
    if (color != 0) console.log(`${color}${colorLine}`)
    for (const key of data) {
      evil ? evil.forEach(bad => eval(remem[bad])) : null
      console.log( `\n ${Book.hashMap[key]}` )
      remem ? confirmation.push(key) : confirmation.push(key.split(' ')[0])
    } 
    if (color != 0) console.log(`\n${color}${colorLine}\n`)
    
    // confirm user's decision
    if (confirmation.length == 1) return `${C.w}${confirmation}\x1b[33m?\n${C.w}`
    const pop = confirmation.pop()
    confirmation = `${C.w}${confirmation.join(', ')} \x1b[33mand${C.w} ${pop}\x1b[33m?${C.w}\n`
    return confirmation
  }