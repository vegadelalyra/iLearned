import '../../bin/input.mjs'
import { centerText } from './dependencies.mjs';
import Book from "./saveQueue.mjs";

export default function today() {
    const newConceptLine = '\x1b[34m' + '~'.repeat(process.stdout.columns)
    
    console.log(
        '\n' + newConceptLine + `\n\x1b[33m${centerText("Today I learned:")}\n\n` + Book.today() + 
        `\n\n${newConceptLine}\n\n\n\x1b[37m    *:・ﾟ✧ ＼（^ ▽ ^）／ ${Book.today() == '' ? 'ミ★ ...nothing xd ★彡' : ''}` 
    ) 
    process.exit()
}