import Book from "./saveQueue.mjs"
import { rl } from "./dependencies.mjs"

export default async function toForget() {
    const dontForgetMeUnU = ` *:・ﾟ✧ ＼（T ^ T ）／ ミ★ DON'T FORGET ME ★彡 ⊂(ಥ﹏ಥ⊂) ||||`,
    msg = '\x1b[33mPlease enter, on the next line, the name of the concetps\n you may wish to delete from your mind (hopefully none)',
    chapters = arguments[0].argv._.slice(2)

    if (chapters.length == 0) {
        // set up message
        console.log(`\n\n ${Book.show()}\n\n\n ${dontForgetMeUnU}\n ${msg}\n\x1b[31m`)

        // get user input
        const userInput = await new Promise(resolve => rl.question('', resolve))

        // curate user input 
        const victims = new String(userInput.toLowerCase().replace(' ', ''))

        // retrieve keys from Book queue
        const booKeys = Object.keys(Book.hashMap).map(chapter => chapter.toLowerCase())
      
        // compare booKeys with victims
        console.log(victims, booKeys, victims.includes(booKeys[0]), victims.includes(booKeys[1]), victims.includes(booKeys[2]))
    }
    
    for (const chapter of chapters) {
        let book =+ Book.hashMap[chapter] + `\n`
        console.log(`\n${book}\n`)
    }

    // Book.delete(chapter)
    return process.exit()
}