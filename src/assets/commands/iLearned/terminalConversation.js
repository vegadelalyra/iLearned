import { fs, rl, rlWrite, C } from '../../dependencies.js'
import { trollMessages } from './trollMessages.js'
import chapter from './resultFormat.js'
import Book from '../../saveQueue.js'
import '../../../../bin/input.js'

export default async function record(input = '') {

    // when user wants to modify the record
    const toChange = process.argv[2] == 'to' && process.argv[3] == 'change'
    if (input === '') console.log("\nA'ight, let's fix your record!")
    let modifyValues = Object.assign({}, arguments)
    if (arguments[3] == '') modifyValues = Object.assign({}, { 0: '', 1: arguments })

    let [a, b, c] = [1, 1, 1] // independent counters for trollMessage output correctly on each case.

    switch (input.length) {

        case 0:
            do {
                trollMessages(a++)
                arguments[1] = await new Promise(resolve => {
                    rl.question(`\x1b[33m> What CONCEPT or WORD have you learned?\n${C.w}`, resolve)
                    rlWrite(modifyValues[1][1])
                })
            } while (arguments[1].trim() === '')

        case 1:
            do {
                trollMessages(b++)
                arguments[2] = await new Promise(resolve => {
                    rl.question(`\n\x1b[33m> Define ${arguments[1].trimEnd()}:\n${C.w}`, resolve)
                    rlWrite(modifyValues[1][2])
                })
            } while (arguments[2].trim() === '')

        case 2:
            do {
                trollMessages(c++)
                arguments[3] = await new Promise(resolve => {
                    // [${C.b}so we can say you have really got it... e_é${C.g}]
                    rl.question(`\n\x1b[33m> Give me an example\n${C.w}`, resolve)
                    rlWrite(modifyValues[1][3])
                })
            } while (arguments[3].trim() === '')

        case 3:
            // showcase
            const aNew = chapter(arguments[1], arguments[2], arguments[3])
            console.log('\n', aNew, '\n')

            // user confirms record.
            const utterBook = await new Promise(resolve => {
                rl.question(`${C.g}Is this right? ${C.w}`, async answer => {
                    // if user sigint (signal interrupt) ^C, break the line

                    // if negative, user will modify his input
                    if (/^[^yos]/i.test(answer) || answer.length == 0) return record('', arguments)

                    // variables required to validate overwritten books whilst learning or changing books
                    let tChIn = process.argv.slice(4).join(' ').trim()
                    tChIn = tChIn.slice(0, tChIn.indexOf('/'))
                    const doesItExist = Book.hashMap[arguments[1]]
                    const h = `Book.enqueue(${"`" + aNew + "`"}, ${"`" + arguments[1] + "`"})\n`

                    // Overwritten ?
                    const overWrite = (doesItExist && !toChange) || 
                    (tChIn.trim() != arguments[1] && doesItExist) 

                    // if user is not changing a book but recording a new one and this already exists or
                    // if user is changing a book and validation script will be triggered.
                    if (overWrite) await new Promise(resolve => {
                        const msg = `${arguments[1] + C.r} already exists\n\n `
                        const existingBook = `${doesItExist + C.r}\n\n`
                        const query = `Do you want to OVERWRITE ${C.w + arguments[1]}`
                        const odd = `${C.g} ?\n${C.r}[${C.g}will lose its position${C.r}]${C.w} `
                        const alert = msg + existingBook + query + odd
                        setImmediate(() => rlWrite('OVERWRITE IT!!!')) 
                        rl.question(alert, answer => {
                            // if user rejects overwriting
                            if (/^[^yos]/i.test(answer) || answer.length == 0) return record('', arguments)
                            
                            // if user accepts overwriting
                            return fs.readFile('input.js', 'utf8', (err, data) => {
                                if (err) throw err

                                // Replace the overwritten line
                                const lines = data.split('\n')
                                const replaced = lines.findIndex(
                                    x => x.includes(', `' + arguments[1] + '`')
                                ); lines.splice(replaced, 1, h)
                                
                                // Write new file
                                const newData = lines.join('\n')
                                fs.writeFileSync('input.js', newData, e => { if (e) throw e })
                                resolve()
                            })
                        }) 
                    })
                    
                    // if positive, user will registry knowledge
                    if (toChange) return resolve(h)

                    // saving process handler
                    console.log('\nLearning...\n'); let BOOK
                    Book.enqueue('\x1b[37m\n> ' + aNew, arguments[1])
                    if (!overWrite) fs.appendFile('input.js', h, err => { if (err) throw err })
                    else BOOK = await import('../../saveQueue.js').then(x => x.default)

                    // huge guard clause in case it's the first user input 
                    fs.readFile('input.js', 'utf8', (err, data) => {
                        if (err) throw err

                        const lines = data.split('\n')
                        if (lines.length > 2) return

                        const newData = `import Book from "../src/assets/saveQueue.js"\n${h}`
                        fs.writeFile('input.js', newData, err => { if (err) throw err })
                    })

                    // showcase result
                    showCase(BOOK)
                    function showCase(fn = Book) {
                        setTimeout(() => {
                            console.log(`\x1b[33m¡¡¡ New knowledge successfully recorded !!! *:･ﾟ✧＼(^ω^＼)\n\n${fn.show()}\n\n\x1b[33m${'~'.repeat(process.stdout.columns)}\n`)
                            rl.close()
                        }, 1369)
                    }
                }); rlWrite('Yes')
            }); if (toChange) return utterBook
            break

        default:
            console.error(`\n\x1b[31mError!\n The iLearned command can only accept 3 arguments.\n It appears that you have provided 4 :(\n\n Please make sure to separate the arguments with\n a forward-slash >${C.w} / \x1b[31m< when using the iLearned command.\n`)
            process.exit()
    }
}