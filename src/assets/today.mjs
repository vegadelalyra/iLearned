import '../../bin/input.mjs'
import Book from "./saveQueue.mjs";

export default function today() {
    const newConceptLine = '~'.repeat(process.stdout.columns)
    
    console.log(
        newConceptLine + '\nToday I learned:\n\n' + Book.today(), 
        `\n\n\n\x1b[33m    *:・ﾟ✧ ＼（^ ▽ ^）／ ${Book.today() == '' ? 'ミ★ ...nothing xd ★彡' : ''}` 
    ) 
    process.exit()
}