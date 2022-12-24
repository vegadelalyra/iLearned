import rl from './dependencies.mjs'

export default async function record(input = '') { 
    if (input === '') console.log("\nA'ight, let's fix your record!")
    
    switch (input.length) {
        case 0:
            let count = 0
            do {
                count++ ; 
                count >= 12 && count < 24
                ? console.log("\x1b[34mI have all day, human xD") 
                : count >= 24 && count < 69
                    ? console.log("\x1b[35mThat's all you've got? e_é")
                    : count >= 69 ? console.log("\x1b[31mI'm a program, so my time is infinite, human. For you, time is limited.") : ''
                arguments[1] = await new Promise( resolve => rl.question('\x1b[33m> What concept or word have you learned?\n', resolve ))
            } while (arguments[1].trim() === '')
        case 1:
            arguments[2] = await new Promise( resolve => rl.question(`\n> Define ${arguments[1]}:\n`, resolve ))
        case 2: 
            arguments[3] = rl.question('\n\x1b> Give me an example <so we can say you have really got it... e_é>')
        case 3:
            console.log('\n', arguments[1], ' / ', arguments[2], ' / ', arguments[3] )
            rl.question('Is this right? ', answer => {
                if (/^[^yos]/i.test(answer) || answer.length == 0) return record()

                console.log('\nLearning...')
                setTimeout(() => console.log(`> New knowledge successfully recorded !!! ^^\n${arguments[1]} / ${arguments[2]} / ${arguments[3]}`), 1669)
                rl.close()
            }); rl.write('Yes')
            break
        default:
            console.error(`\x1b[31merror! iLearned command can only run 3 arguments. You're running ${input.length} :(`)
            break
    }
    // if (input.length < 3) return record(...arguments)
}