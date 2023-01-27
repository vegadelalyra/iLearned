import { fs, rl, confirm, rlWrite } from '../../dependencies.js'
import C from '../../dependencies/ANSI_COLORS.js'
import getQuotes from '../../scrapyWeb/quotes.js'

export default async function remembering() {
    // Asynchronously load a quote if user decides to not remember
    const REMEMBER_ME = getQuotes()
    rl.removeAllListeners()
    rl.on('SIGINT', async () => await user_says_no(true))

    // Dinamically import forgotten books and its keys.
    const forgotten = (await import('./forgotten.js')).forgotten
    const indexes = Object.keys(forgotten)

    // FIRST OF ALL, A HUGE GUARD CLAUSE Xd so REMEMBERING can only be triggered once.
    if (forgotten instanceof Uint8Array) return user_already_remembered()

    function user_already_remembered() {
        // Close user's input
        rl.close()

        // read inputs file and prepare env to get the remembered keys
        let data = fs.readFileSync('input.js', 'utf8')
        data = data.split('\n')
        let souvenir = [] 

        // with 8bit indexes, ingenuity and regEx (xd) we find the remembered keys names
        forgotten.forEach(binary => {
            const i = data[binary].split(' ').lastIndexOf('\x1B[33m}\x1b[37m`,') + 1
            const book = data[binary].split(' ')[i].replace(/[^\w\s]/gi, '')
            souvenir.push(book)
        })

        // curate souvenir for aprropiate showcase
        souvenir.length == 1 ? null : curate()
        function curate() {
            const pop = souvenir.pop()
            souvenir = `\x1b[33m${souvenir.join(', ')}${C.w} and \x1b[33m${pop}`
        }

        // console log a pretty kitten speaking the souvenirs (already remembered past-deleted books)
        const res = `\n\x1b[32m /\\_/\\\n( ^.^ )${C.w} You already remembered \x1b[33m${souvenir}\n  \x1b[32m>^<` 
        return console.log(res)
    }

    // Modify imported values turning them into Book.hashMap keys
    const splittedBooks = Object.values(forgotten)
    .flatMap( book => book.split(' '))
    .map( (clue, index, arr) => { 
        if (clue == '\x1B[33m}\x1b[37m`,') return arr[index + 1]
    }).filter( hash => hash !== undefined )
    .map(value => value.replace(/[^a-zA-Z0-9]/g, ''))

    // Question user
    const colorLine = '\n\x1b[32m' + '~'.repeat(process.stdout.columns)
    console.log(`${colorLine}\n\n /\\_/\\\n( ^.^ )${C.w} Here's the last stuff you have ${C.g}FORGOTTEN\n  \x1b[32m>^<`)
    const sure = confirm(splittedBooks, forgotten, indexes, 0) 
    console.log(colorLine)
    await new Promise( resolve => {
        rl.question(`\x1b[33mAre you trying to remember ${sure}`, answer => {
            // if negative, user won't remember
            if (/^[^yos]/i.test(answer) || answer.length == 0) return user_says_no()
            resolve(answer)
        }); rlWrite('OOUH YEAH ★彡 ⊂(ಥ﹏ಥ⊂)')
    })

    async function user_says_no(c = false) {
        console.log(c ? '\n' : '', await REMEMBER_ME)
        process.exit()
    }   
    
    // Rewrite the deleted lines on memory
    fs.readFile('input.js', 'utf8', (err, data) => {
        if (err) throw err

        // Split the file into lines
        const lines = data.split('\n')

        // Modify the lines as needed
        indexes.forEach(index => lines.splice( index, 0, forgotten[index] ))

        // Join the lines back into a single string
        const newData = lines.join('\n')

        // Write the modified data back to the file
        fs.writeFile('input.js', newData, err => { if (err) throw err })

        // Save references to remembered items as unsigned 8 bits numbers.
        const retainedAlready = `export const forgotten = new Uint8Array([${indexes}])`
        fs.writeFile('../src/assets/commands/remembering/forgotten.js', retainedAlready, err => {if (err) throw err})
        console.log('\nRemembering...\n')
    })

    // Display recovered books.
    let timer = 200, scale = 2;
    ( async () => {
        for (const chapter of splittedBooks) {
          timer = timer * scale, scale = scale * 0.9
          await new Promise(resolve => setTimeout( 
            () => resolve(console.log(`${C.w}${chapter} \x1b[33mrecovered`)), timer))
        }
        setTimeout( () => {
            const msg = `${C.w} CONCEPT${splittedBooks.length > 1 ? 'S' : ''} REMEMBERED`
            const cat = `\n\x1b[32m /\\_/\\\n( ^.^ )${msg}\n  \x1b[32m>^<`
            console.log(cat)
        }, 300 ) 
      })()
    rl.close()
}