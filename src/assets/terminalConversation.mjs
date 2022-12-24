import { rl, p } from './dependencies.mjs'

export default function record(input = '') { 
    if (input == '') console.log("\nA'ight, let's fix your record!")
    
    switch (input.length) {
        case 0:
            console.log('> What concept or word have you learned?')
            arguments[1] = p()
        case 1:
            console.log(`\n> Define ${arguments[1]}:`)
            arguments[2] = p()
        case 2: 
            console.log('\n> Give me an example <so we can say you have really got it... e_é>')
            arguments[3] = p()
        case 3:
            console.log('\n', arguments[1], ' / ', arguments[2], ' / ', arguments[3] )
            rl.question('Is this right? ', answer => {
                answer
                if (/^[^yos]/i.test(answer) || answer.length == 0) return record()
                console.log('\nLearning...')
                setTimeout(()=>console.log(`> New knowledge successfully recorded !!! ^^\n${arguments[1]} / ${arguments[2]} / ${arguments[3]}`), 1669)
                rl.close()
            })
            rl.write('Yes')
            break
        default:
            console.error(`error! iLearned command can only run 3 arguments. You're running ${input.length} :(`)
            break
    }
}