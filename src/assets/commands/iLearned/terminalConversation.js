import { fs, rl, rlWrite, C } from '../../dependencies.js'
import { trollMessages } from './trollMessages.js'
import chapter from './resultFormat.js'
import Book from '../../saveQueue.js'
import '../../../../bin/input.js'

export default async function record(input = '') { 
    
    // when user wants to modify the record
    if (input === '') console.log("\nA'ight, let's fix your record!")
    let modifyValues = Object.assign({}, arguments) 
    if (arguments[3] == '') modifyValues = Object.assign({}, {0:'', 1:arguments})

    let [a, b, c] = [1, 1, 1] // independent counters for trollMessage output correctly on each case.

    switch (input.length) {
        
        case 0:
            do {
                trollMessages(a++)
                arguments[1] = await new Promise( resolve => {
                    rl.question(`\x1b[33m> What CONCEPT or WORD have you learned?\n${C.w}`, resolve)
                    rlWrite(modifyValues[1][1])
                })
            } while (arguments[1].trim() === '')
            
        case 1:
            do {
                trollMessages(b++)
                arguments[2] = await new Promise( resolve => {
                    rl.question(`\n\x1b[33m> Define ${arguments[1].trimEnd()}:\n${C.w}`, resolve)
                    rlWrite(modifyValues[1][2])
                })
            } while (arguments[2].trim() === '')
                
        case 2: 
            do {
                trollMessages(c++)
                arguments[3] = await new Promise( resolve => {
                    rl.question(`\n\x1b[33m> Give me an example [\x1b[34mso we can say you have really got it... e_é\x1b[33m]\n${C.w}`, resolve )
                    rlWrite(modifyValues[1][3])
                })
            } while (arguments[3].trim() === '')

        case 3:
            // showcase
            const aNew = chapter(arguments[1], arguments[2], arguments[3])
            console.log('\n', aNew, '\n')

            // user confirms record.
            rl.question(`\x1b[33mIs this right? ${C.w}`, answer => {
                // if user sigint (signal interrupt) ^C, break the line

                // if negative, user will modify his input
                if (/^[^yos]/i.test(answer) || answer.length == 0) return record('', arguments)
                
                // if positive, user will registry knowledge
                console.log('\nLearning...\n');
                
                // saving process handler
                const h = `Book.enqueue(${ "`" + aNew + "`" }, ${"`" + arguments[1] + "`"})\n`
                fs.appendFile( 'input.js', h, (err) => { if (err) throw err } )            
                Book.enqueue('\x1b[37m\n> ' + aNew, arguments[1])

                // huge guard clause in case it's the first user input 
                fs.readFile( 'input.js', 'utf8', (err, data) => {
                    if (err) throw err
                
                    const lines = data.split('\n')
                    if (lines.length > 2) return

                    const newData = `import Book from "../src/assets/saveQueue.js"\n${h}`
                    fs.writeFile('input.js', newData, err => { if (err) throw err})
                })

                // showcase result
                setTimeout( () => {
                    console.log( `\x1b[33m¡¡¡ New knowledge successfully recorded !!! *:･ﾟ✧＼(^ω^＼)\n\n${Book.show()}\n\n\x1b[33m${'~'.repeat(process.stdout.columns)}\n`)
                    rl.close()
                }, 1369 )
            }); rlWrite('Yes')
            break

        default:
            console.error(`\n\x1b[31mError!\n The iLearned command can only accept 3 arguments.\n It appears that you have provided 4 :(\n\n Please make sure to separate the arguments with\n a forward-slash >${C.w} / \x1b[31m< when using the iLearned command.\n`)
            process.exit()
    }
}