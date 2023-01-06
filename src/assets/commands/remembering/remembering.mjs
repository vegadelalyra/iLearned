import { fs, rl, confirm, rlWrite } from '../../dependencies.mjs'

export default async function() {

    // Dinamically import forgotten books and its keys.
    const forgotten = (await import('./forgotten.mjs')).forgotten
    const indexes = Object.keys(forgotten)

    // FIRST OF ALL, A HUGE GUARD CLAUSE Xd so REMEMBERING can only be triggered once.
    if (forgotten instanceof Uint8Array) return user_already_remembered()

    function user_already_remembered() {
        // Close user's input
        rl.close()

        // read inputs file and prepare env to get the remembered keys
        let data = fs.readFileSync('input.mjs', 'utf8')
        data = data.split('\n')
        let souvenir = [] 

        // with 8bit indexes, ingenuity and regEx (xd) we find the remembered keys names
        forgotten.forEach(binary => {
            const i = data[binary].split(' ').lastIndexOf('\x1B[33m}\x1B[37m`,') + 1
            const book = data[binary].split(' ')[i].replace(/[^\w\s]/gi, '')
            souvenir.push(book)
        })

        // curate souvenir for aprropiate showcase
        souvenir.length == 1 ? null : curate()
        function curate() {
            const pop = souvenir.pop()
            souvenir = `\x1b[33m${souvenir.join(', ')}\x1b[37m and \x1b[33m${pop}`
        }

        // console log a pretty kitten speaking the souvenirs (already remembered past-deleted books)
        const res = `\n\x1b[32m /\\_/\\\n( ^.^ )\x1b[37m You already remembered \x1b[33m${souvenir}\n  \x1b[32m>^<\n` 
        return console.log(res)
    }

    // Modify imported values turning them into Book.hashMap keys
    const splittedBooks = Object.values(forgotten)
    .flatMap( book => book.split(' '))
    .map( (clue, index, arr) => { 
        if (clue == '\x1B[33m}\x1B[37m`,') return arr[index + 1]
    }).filter( hash => hash !== undefined )
    .map(value => value.replace(/[^a-zA-Z0-9]/g, ''))

    // Question user
    const sure = confirm(splittedBooks, forgotten, indexes, '\n\x1b[32m') 
    await new Promise( resolve => {
        rl.question(`\x1b[33mAre you trying to remember ${sure}`, answer => {
            // if negative, user won't remember
            if (/^[^yos]/i.test(answer) || answer.length == 0) return user_says_no()
            resolve(answer)
        }); rlWrite('OOUH YEAH ★彡 ⊂(ಥ﹏ಥ⊂)')
    })

    function user_says_no() {
        console.log('')
        process.exit()
    }
    
    // Rewrite the deleted lines on memory
    fs.readFile('input.mjs', 'utf8', (err, data) => {
        if (err) throw err

        // Split the file into lines
        const lines = data.split('\n')

        // Modify the lines as needed
        indexes.forEach(index => lines.splice( index, 0, forgotten[index] ))

        // Join the lines back into a single string
        const newData = lines.join('\n')

        // Write the modified data back to the file
        fs.writeFile('input.mjs', newData, err => { if (err) throw err })

        // Save references to remembered items as unsigned 8 bits numbers.
        const retainedAlready = `export const forgotten = new Uint8Array([${indexes}])`
        fs.writeFile('../src/assets/commands/remembering/forgotten.mjs', retainedAlready, err => {if (err) throw err})
        console.log('\nRemembering...\n')
    })

    // Display recovered books.
    let timer = 200, scale = 2;
    (async () => {
        for (const chapter of splittedBooks) {
          timer = timer * scale, scale = scale * 0.9
          await new Promise(resolve => setTimeout( 
            () => resolve(console.log(`\x1b[37m${chapter} \x1b[33mrecovered`)), timer))
        }
        setTimeout( () => console.log(`\n\x1b[32m /\\_/\\\n( ^.^ )\x1b[37m CONCEPTS REMEMBERED\n  \x1b[32m>^<`), 300 ) 
      })()
    rl.close()
}