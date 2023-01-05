import { fs, rl, confirm, rlWrite } from '../../dependencies.mjs'

export default async function() {
    // Dinamically import forgotten books and its keys.
    const forgotten = (await import('./forgotten.mjs')).forgotten
    const keys = Object.keys(forgotten)

    // Modify imported values turning them into Book.hashMap keys
    const splittedBooks = Object.values(forgotten)
    .flatMap( book => book.split(' '))
    .map( (clue, index, arr) => { 
        if (clue == '\x1B[33m}\x1B[37m`,') return arr[index + 1]
    }).filter( hash => hash !== undefined )
    .map(value => value.replace(/[^a-zA-Z0-9]/g, ''))

    // Question user
    const sure = confirm(splittedBooks, forgotten, keys, '\n\x1b[32m')    
    await new Promise( resolve => {
        rl.question(`\x1b[33mAre you trying to remember ${sure}`, answer => {
            // if negative, user won't remember
            if (/^[^yos]/i.test(answer) || answer.length == 0) return process.exit()
            resolve(answer)
        }); rlWrite('OOUH YEAH ★彡 ⊂(ಥ﹏ಥ⊂)')
    })

    // Read the file into memory
    return fs.readFile('input.mjs', 'utf8', (err, data) => {
        if (err) throw err

        // Split the file into lines
        const lines = data.split('\n')

        // Modify the lines as needed
        keys.forEach(index => lines.splice( index, 0, forgotten[index] ))

        // Join the lines back into a single string
        const newData = lines.join('\n')

        // Write the modified data back to the file
        fs.writeFile('input.mjs', newData, err => { if (err) throw err })
        console.log('\nRemembering...\n')

        // Display recovered books.
        let timer = 200, scale = 2, promises = []
        for (const chapter of splittedBooks) {
            timer = timer * scale, scale = scale * 0.9
            promises.push(new Promise( resolve => setTimeout( 
                () => resolve(console.log(`\x1b[37m${chapter} \x1b[33mrecovered`)), timer)))
        }

        Promise.all(promises).then( () => console.log( `\n\x1b[32m /\\_/\\\n( ^.^ )\x1b[37m CONCEPTS REMEMBERED\n  \x1b[32m>^<` ))
        rl.close()
    })
}