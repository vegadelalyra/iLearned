import '../../bin/input.mjs'
import Book from "./saveQueue.mjs";

export default function inMyLife() {
    console.log(
        '\nFrom this life I have learned:\n\n' + Book.show(), 
        `\n\n\n    *:・ﾟ✧ ＼（＾▽＾）／ ${Book.length == 0 ? 'ミ★ ...nothing xd ★彡' : ''}` 
    ) 
    process.exit()
}