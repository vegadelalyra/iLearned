import finished from "./commands/toForget/finished.mjs"
import C from "./dependencies/ANSI_COLORS.mjs"
import Book from "./saveQueue.mjs"
import userInput from "./userInput.mjs"

export default async function toForget(userInputs, result = false) {
    // declare user's input
    const chapters = arguments[0]?.argv?._.slice(2) || userInputs
    if (result) return finished(chapters)

    switch (chapters.length) {
        case 0:
            // set up message
            const dontForgetMeUnU = ` *:・ﾟ✧ ＼（T ^ T ）／ ミ★ DON'T FORGET ME ★彡 ⊂(ಥ﹏ಥ⊂) ||||`,
            msg = '\x1b[33mPlease enter, on the next line, the name of the concetps\n you may wish to delete from your mind (hopefully none)'
            console.log(`\x1b[33m\n> Your knowledge so far:\n\n\n ${Book.show()}\n\n\n ${dontForgetMeUnU}\n ${msg}\n\x1b[31m`)
            
            // get user input with (or without) entries he wish to delete
            return await userInput()
    
        default:
            let confirmation = []
            
            // show off keys entered by the user on screen    
            console.log(`\n\n\x1b[33m \t\t\tミ★${C.w}DON'T FORGET ME\x1b[33m★彡 ⊂(ಥ﹏ಥ⊂) `)
            const redLine = '='.repeat(process.stdout.columns)
            console.log(`\x1b[31m${redLine}`)
            for (const key of chapters) {
                console.log( `\n ${Book.hashMap[key]}` )
                confirmation.push(key.split(' ')[0])
            } 
            console.log(`\n\x1b[31m${redLine}\n`)
            
            // confirm user's decision
            if (confirmation.length > 1) {
                const pop = confirmation.pop()
                confirmation = `${confirmation.join(', ')} \x1b[33mand${C.w} ${pop}`
            }
            console.log(`    ${C.w}*:・ﾟ✧ ＼（T ^ T ）／ ・ﾟ✧*:`)
            const question = `\x1b[33mAre you sure you want to forget ${C.w}${confirmation}\x1b[33m?${C.w}\n`
            await userInput(question, 'YEAH', chapters)
    }
}