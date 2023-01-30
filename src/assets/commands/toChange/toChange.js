import { C, userInput } from "../../dependencies.js"
import Book from "../../saveQueue.js"
import record from "../iLearned/terminalConversation.js"

export default function toChange(userInputs) {
    // User's input validation
    userInputs = userInputs.filter(chapter => !!Book.hashMap[chapter])
    if (!userInputs.length) return noInputs()
    return modifyInputs()
    
    // In case user didn't indicate which books is going to change
    async function noInputs() {
        // OUTPUT 
        const blueLine = '\n' + C.c + '~'
        .repeat(process.stdout.columns) + C.w + '\n'
        console.log(blueLine + '\n' + Book.show() + '\n' + blueLine)
        
        // INPUT
        const msg = `${C.g} Which concepts you may want to CHANGE?${C.w}\n`
        const miau = `${C.w} /\\_/\\\n( ^.^ )${msg}  >^<${C.c}\n` 
        console.log(miau)
        userInput(toChange)
    }

    // In case user did indicate which books is going to change 
    async function modifyInputs() {
        // await record('', Book.hashMap[userInputs[0]])
        console.log([Book.hashMap])
        process.exit()
    }
}