import '../../bin/input.mjs'
import Book from "./saveQueue.mjs";

export default function today() {
    console.log(
        '\nToday I learned:\n\n', 
        Book.today(), 
        `\n\n\n    *:・ﾟ✧ ＼（^ ▽ ^）／ ${Book.today() == '' ? 'ミ★ ...nothing xd ★彡' : ''}` 
    ) 
    process.exit()
}