import Book from "./saveQueue.mjs"
import { rl } from "./dependencies.mjs"
import userInput from "./userInput.mjs"

export default async function toForget(userInputs, result = false) {
    // declare user's input
    const chapters = arguments[0]?.argv?._.slice(2) || userInputs
    if (result) return finished()

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
            const redLine = '='.repeat(process.stdout.columns)
            console.log(`\n\x1b[31m${redLine}`)
            for (const key of chapters) {
                console.log( `\n ${Book.hashMap[key]}` )
                confirmation.push(key.split(' ')[0])
            } 
            console.log(`\n\x1b[31m${redLine}\n`)
            
            // confirm user's decision
            if (confirmation.length > 1) {
                const pop = confirmation.pop()
                confirmation = `${confirmation.join(', ')} \x1b[33mand\x1b[37m ${pop}`
            }
            const question = `\x1b[33mAre you sure you want to forget \x1b[37m${confirmation}\x1b[33m?\x1b[37m\n`
            await userInput(question, 'YEAH', chapters)
    }
    function finished(inputs = userInput) {
        rl.close()
        console.log('\x1b[37m\n\nForgetting...\n')
        let timer = 300, scale = 2, deletePromises = []
        for (const chapter of chapters) {
            timer = timer * scale, scale = scale * 0.9
            deletePromises.push(
                new Promise(resolve => setTimeout(
                    () => resolve(Book.delete(chapter)), timer)))
        }
        // all deletions handled and a last break line to finish the show.    
        Promise.all(deletePromises)
        .then( () => setTimeout( () => console.log('\n'), 300 ))
        
        import('./dependencies.mjs')
        .then(Module => {
            const path = '../../bin/input.mjs' 
            Module.fs.readFile(path, 'utf8', (err, data) => {
            if (err) throw err
            console.log()
            const lines = data.split('\n')
            const newLines = lines.filter( line => !inputs.some(input => line.includes("`, `" + input + "`)") ) )

            Module.fs.writeFile(path, newLines.join('\n'), err => { if (err) throw err })
        })})
    }
}