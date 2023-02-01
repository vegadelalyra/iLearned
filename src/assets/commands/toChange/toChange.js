import { C, fs, hashMap_validation, userInput } from "../../dependencies.js"
import Book from "../../saveQueue.js"
import record from "../iLearned/terminalConversation.js"
import changes from "./changes.js"

export default async function toChange(userInputs) {
    // User's input validation
    const index_modifiedBook = []
    userInputs = hashMap_validation(userInputs)
    if (!userInputs.length) return noInputs()

    // User proceeds to change
    const ram = Math.round(Math.random() * changes.length)
    let ch = changes[ram]
    ch = ch.split(', ')
    ch[0] = '🎵 ' + ch[0]
    !ch[1] ? ch[0] = ch[0] + ' 🎵' 
    : ch[1] = ch[1] + ' 🎵'
    console.log(`\n${C.c} /\\_/\\\n( ^.^ ) ${C.w}${ch[0]}${C.c}\n  >^<  ${C.w}${ch[1]??''}${C.c}`)
    return await modifyInputs()
    
    // In case user didn't indicate which books is going to change
    async function noInputs() {
        // OUTPUT 
        const blueLine = '\n' + C.c + '~'
        .repeat(process.stdout.columns) + C.w + '\n'
        console.log(blueLine + '\n' + Book.show() + '\n' + blueLine)
        
        // INPUT
        const msg = `${C.w} Which ${C.g}CONCEPTS${C.w} you may want to${C.g} CHANGE?${C.c}\n`
        const miau = `${C.c} /\\_/\\\n( ^.^ )${msg}  >^<\n` 
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
        const newCh = await record('', ['', ...book]) // ('', ['', ...book]) or (book, ...book) 
        const i = Object.keys(Book.hashMap).indexOf(former)

        // // Book changed? Save and pop it!
        index_modifiedBook.push([i, newCh])
        userInputs.pop() // Until empty
        if (userInputs.length) return modifyInputs()
        console.log('\nChanging . . . \n')
        return commitChanges()

        // Commiting changes on each valid user's input
        async function commitChanges(s = false, n = 400) {
            // Dramatic Frontend
            let index = index_modifiedBook.at(-1)[0]
            const data = index_modifiedBook.at(-1)[1]
            const book = data.slice(data.indexOf("`, `") + 4, -3) 
            await new Promise ( resolve => {
                setTimeout(() => resolve(
                    console.log(`${C.w}${book} ${C.g}updated`)
            ), n )})

            // Abortable Backend
            let inputs = fs.readFileSync('input.js')
            .toString().split('\n').filter(l => !!l)
            inputs.splice(++index, 1, data)
            inputs = inputs.join('\n')
            fs.writeFileSync('input.js', inputs, e => { if (e) throw e })
            index_modifiedBook.pop()

            // If concepts remain, continue, else, cat ending.
            if (index_modifiedBook.length) return commitChanges(true, n * 0.9)
            const msg = `${C.w} CONCEPT${!s ? '' : 'S'} CHANGED`
            const cat = `\n${C.c} /\\_/\\\n( ^.^ )${msg}\n  ${C.c}>^<`
            await new Promise ( resolve => ( setTimeout (
                () => resolve(console.log(cat)), 400
            ))); process.exit()
        }
    }
}