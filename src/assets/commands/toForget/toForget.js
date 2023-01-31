import finished from "./finished.js"
import Book from "../../saveQueue.js"
import { C, hashMap_validation, userInput } from "../../dependencies.js"

export default async function toForget(userInputs, result = false) {
    // declare user's input
    let chapters = arguments[0]?.argv?._?.slice(2) || userInputs
    chapters = hashMap_validation(chapters)
    const redLine = '\x1b[31m' + '='.repeat(process.stdout.columns)
    if (result) return finished(chapters)

    switch (chapters.length) {
        case 0:
            // set up message
            const dontForgetMeUnU = ` *:・ﾟ✧ ＼（T ^ T ）／ ミ★ DON'T FORGET ME ★彡 ⊂(ಥ﹏ಥ⊂) ||||\n`,
            msg = `${C.g}Please enter, on the next line, the name of the concetps\n you may wish to DELETE from your mind (hopefully none)${C.r}\n`
            console.log(`${C.g}\n> Your knowledge so far:\n\n${redLine}\n\n${Book.show()}\n\n${redLine}\n\n ${C.w}${dontForgetMeUnU} ${msg}`)
            
            // get user input with (or without) entries he wish to delete
            return await userInput(toForget)
    
        default:
            let confirmation = []
            
            // show off keys entered by the user on screen    
            console.log(`\n\n${C.g} \t\t\tミ★${C.w}DON'T FORGET ME${C.g}★彡 ⊂(ಥ﹏ಥ⊂) `)
            console.log(redLine)
            for (const key of chapters) {
                console.log( `\n ${Book.hashMap[key]}` )
                confirmation.push(key.split(' ')[0])
            } 
            console.log(`\n${redLine}\n`)
            
            // confirm user's decision
            if (confirmation.length > 1) {
                const pop = confirmation.pop()
                confirmation = `${confirmation.join(`${C.g}, ${C.w}`)} ${C.g}and${C.w} ${pop}`
            }
            console.log(`    ${C.w}*:・ﾟ✧ ＼（T ^ T ）／ ・ﾟ✧*:`)
            const question = `${C.g}Are you sure you want to forget ${C.w}${confirmation}${C.g}?${C.r}\n`
            await userInput(toForget, question, 'YEAH', chapters)
    }
}