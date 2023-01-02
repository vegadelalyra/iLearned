import Book from "./saveQueue.mjs"
import { rl } from "./dependencies.mjs"

export default async function toForget(userInputs) {
    // declare user's input
    const chapters = arguments[0]?.argv?._.slice(2) || userInputs
    
    switch (chapters.length) {
        case 0:
            // set up message
            const dontForgetMeUnU = ` *:・ﾟ✧ ＼（T ^ T ）／ ミ★ DON'T FORGET ME ★彡 ⊂(ಥ﹏ಥ⊂) ||||`,
            msg = '\x1b[33mPlease enter, on the next line, the name of the concetps\n you may wish to delete from your mind (hopefully none)'
            console.log(`\x1b[33m\n> Your knowledge so far:\n\n\n ${Book.show()}\n\n\n ${dontForgetMeUnU}\n ${msg}\n\x1b[31m`)
            
            // get user input with (or without) entries he wish to delete
            const userInput = await new Promise(resolve => rl.question('', answer => {

                // curate user input and recorded entries
                const InputCurated = answer.replaceAll(' ', '').toLowerCase()
                const keys = Object.keys(Book.hashMap).map(key => key.replaceAll(' ', '').toLowerCase())

                // filter the keys/entries already entered for the user.
                const keysIndex = [], askedKeys = []
                for (const key of keys) if ( InputCurated.includes(key) ) keysIndex.push(keys.indexOf(key))

                // return an array with the entries entered by the user
                for (const index of keysIndex) askedKeys.push(Object.keys(Book.hashMap)[index])
                resolve(askedKeys)
            }))
            // await new Promise(resolve => {
            //     rl.question('Are you sure you want to delete', userInput.trim()), answer => {
            //         if (/^[^yos]/i.test(answer) || answer.length == 0) return 
            //         resolve(answer)
            //     }
            // }); rl.write('YES')

            // recursivity
            toForget(userInput)
            break
    
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
            await new Promise( resolve => {
                rl.question( question, answer => {
                    if (/^[^yos]/i.test(answer) || answer.length == 0) return toForget(new Array(0))
                    resolve(answer)
                })
                rl.write('YEAH')
            })
            rl.close()
            
            console.log('\nForgetting...\n')
            let timer = 300, scale = 2, deletePromises = []
            for (const chapter of chapters) {
                timer = timer * scale, scale = scale * 0.9
                deletePromises.push(
                    new Promise(resolve => setTimeout(
                        () => resolve(Book.delete(chapter)), timer)))
            }

            Promise.all(deletePromises)
            .then( () => setTimeout( () => console.log('\n'), 300 ) )
            break
    }


        // // retrieve keys from Book queue
        // const booKeys = Object.keys(Book.hashMap).map(chapter => chapter.toLowerCase())
      
        // // compare booKeys with victims
        // console.log(victims, booKeys, victims.includes(booKeys[0]), victims.includes(booKeys[1]), victims.includes(booKeys[2]))
    
    // for (const chapter of chapters) {
    //     let book =+ Book.hashMap[chapter] + `\n`
    //     console.log(`\n${book}\n`)
    // }

    // Book.delete(chapter)
    // return process.exit()
}