import Book from "./saveQueue.mjs"
import { rl } from "./dependencies.mjs"

export default async function toForget() {
    const dontForgetMeUnU = ` *:・ﾟ✧ ＼（T ^ T ）／ ミ★ DON'T FORGET ME ★彡 ⊂(ಥ﹏ಥ⊂) ||||`,
    msg = '\x1b[33mPlease enter, on the next line, any concepts names\n you may wish to delete from your mind (hopefully none)',
    chapters = arguments[0].argv._.slice(2)
    if (chapters.length == 0) {
        console.log(`\n\n ${Book.show()}\n\n\n ${dontForgetMeUnU}\n ${msg}\n\x1b[31m`)
        const miau = await new Promise(resolve => rl.question('', resolve))
        console.log(miau)
    }
    
    for (const chapter of chapters) {
        let book =+ Book.hashMap[chapter] + `\n`
        console.log(`\n${book}\n`)
    }

    // Book.delete(chapter)
    return process.exit()
}