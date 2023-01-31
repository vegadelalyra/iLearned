import { C, fs, hashMap_validation, userInput } from "../../dependencies.js"
import Book from "../../saveQueue.js"
import record from "../iLearned/terminalConversation.js"

export default function toChange(userInputs) {
    // User's input validation
    const index_modifiedBook = []
    userInputs = hashMap_validation(userInputs)
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
        // Gangplank for changing each valid user's input
        const former = userInputs.at(-1)
        const book = Book.hashMap[former]
        .split('/').map(x => x.slice(
            x.indexOf('m ') + 2, 
            x.indexOf(' \x1b[33m')
        ))

        // Getting book changes and index of changed book
        const newCh = await record('', ['', ...book, 'a'])
        const i = Object.keys(Book.hashMap).indexOf(former)

        // // Book changed? Save and pop it!
        index_modifiedBook.push([i, newCh])
        userInputs.pop() // Until empty
        if (userInputs.length) return modifyInputs
        return commitChanges()

        // Commiting changes on each valid user's input
        function commitChanges() {
            console.log('awebooo')
            fs.readFileSync('input.js', 'utf8', (e, data) => {
                if (e) throw e

                
            })
        }
    }
}