import { fs, rl } from './dependencies.mjs'
import { trollMessages } from './trollMessages.mjs'
import chapter from './resultFormat.mjs'
import Book from './saveQueue.mjs'
import '../../bin/input.mjs'

export default async function record(input = '') { 

    if (input === '') console.log("\nA'ight, let's fix your record!")
    
    const modifyValues = Object.assign({}, arguments)
    let [a, b, c] = [1, 1, 1] // independent counters for trollMessage output correctly on each case.

    switch (input.length) {
        
        case 0:
            do {
                trollMessages(a++)
                arguments[1] = await new Promise( resolve => {
                    // what if we try to modify our input bfhand?
                    rl.question('\x1b[33m> What concept or word have you learned?\n\x1b[37m ', input => {
                        resolve(input)
                    })
                    rl.write(modifyValues[1][1])
                })
            } while (arguments[1].trim() === '')
            
        case 1:
            do {
                trollMessages(b++)
                arguments[2] = await new Promise( resolve => {
                    rl.question(`\n\x1b[33m> Define ${arguments[1].trimEnd()}:\n\x1b[37m`, resolve)
                    rl.write(modifyValues[1][2])
                })
            } while (arguments[2].trim() === '')
                
        case 2: 
            do {
                trollMessages(c++)
                arguments[3] = await new Promise( resolve => {
                    rl.question('\n\x1b[33m> Give me an example [\x1b[37mso we can say you have really got it... e_é\x1b[33m]\n\x1b[37m', resolve )
                    rl.write(modifyValues[1][3])
                })
            } while (arguments[3].trim() === '')

        case 3:
            // showcase
            const aNew = chapter(arguments[1], arguments[2], arguments[3])
            console.log('\n\n', aNew, ' '.repeat(69))

            // user confirms record.
            await new Promise ( resolve => {
                
                rl.question('\x1b[33mIs this right? \x1b[37m', answer => {
                    resolve('miau')
                    // if negative, user will modify his input
                    if (/^[^yos]/i.test(answer) || answer.length == 0) return record('', arguments)
                    
                    // if positive, user will registry knowledge
                    console.log('\nLearning...\n')
                    rl.close()
                }); rl.write('Yes')
            })
            
            // saving process handler
            const h = `Book.enqueue(${ "'" + aNew + "'" })\n`
            fs.appendFile( 'input.mjs', h, (err) => { if (err) throw err } )            
            Book.enqueue(aNew)
            setTimeout( () => {
                console.log( `\x1b[33m¡¡¡ New knowledge successfully recorded !!! *:･ﾟ✧＼(^ω^＼)\n\n${Book.show()}\n`, ' '.repeat(200) )
            }, 1669 )
            break
            
        default:
            console.error(`\x1b[31merror! iLearned command can only run 3 arguments. You're running ${input.length} :(`)
            break
    }
}