import '../../bin/input.mjs'
import Book from "./saveQueue.mjs";

export default function today() {
    console.log(
        '\nToday I learned:\n\n', 
        Book.show(), 
        `\n\n\n    *:・ﾟ✧ ＼（＾▽＾）／ ${Book.length == 0 ? 'ミ★ ...nothing xd ★彡' : ''}` 
    ) 
    process.exit()
}