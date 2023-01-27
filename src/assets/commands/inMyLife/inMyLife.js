import '../../../../bin/input.js'
import { C, centerText } from '../../dependencies.js'
import Book from "../../saveQueue.js"

export default function inMyLife() {
    const newConceptLine = '\x1b[34m' + '~'.repeat(process.stdout.columns)
    
    console.log(
        '\n' + newConceptLine + `\n\x1b[33m${centerText("From this life I have learned:")}\n\n\n` + Book.show() +
        `\n\n${newConceptLine}\n\n\x1b[33m    *:・ﾟ✧ ＼（^ ▽ ^）／ ${Book.length == 0 ? 'ミ★ ...nothing xd ★彡' : ''}          ${C.g}   ฅ ={^･ｪ･^}= \᳡ ` 
    ) 
    process.exit()
}