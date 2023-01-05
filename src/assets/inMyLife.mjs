import '../../bin/input.mjs'
import Book from "./saveQueue.mjs";

export default function inMyLife() {
    console.log(
        '\n\x1b[33mFrom this life I have learned:\n\n' + Book.show(), 
        `\n\n\n\x1b[97m    *:・ﾟ✧ ＼（＾▽＾）／ ${Book.length == 0 ? 'ミ★ ...nothing xd ★彡' : ''}` 
    ) 
    process.exit()
}