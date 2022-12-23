#!/usr/bin/env node
import readline from 'readline'
import yargs from 'yargs'
import prompt from 'prompt-sync'
import historia from 'prompt-sync-history'

// readline node.js module: allows to input options.
const rl = readline.createInterface(process.stdin, process.stdout) 

// YARGS: CLI flag (options) and commands arguments
const argv = yargs(process.argv.slice(2))
.usage('\nRecord what you learn^^\niLearned [word] / [definition] / [example]\n"/" required ^')
.command('$0', 'Record a new concept: word/def/exp')
.example(`hyphen / the "-" symbol / Required to run CLI options`)
.command('today', 'Show all concepts learned today.')
.command('inLife', 'Show all concepts learned historycally.')
.help()
.argv

// my default option 
// Remember to give the modular approach to this project once all functions are done.
const p = prompt({
    sigint: true,
    history: historia()
})

const input = argv._.join(' ').split('/').filter(el => {return el != null && el != ''})
let word = input[0] ?? '', def = input[1] ?? '', exp = input[2] ?? ''

if (input.length < 4) console.log("\nSeems like somebody here has learned something new today :D\n")


switch (input.length) {
    case 0:
        console.log('> What concept or word have you learned?')
        word = p()
    case 1:
        console.log(`\n> Define ${word}:`)
        def = p()
    case 2: 
        console.log('\n> Give me an example <so we can say you have really got it... e_é>')
        exp = p()
    case 3:
        console.log('\n', word, ' / ', def, ' / ', exp )
        rl.question('Is this right? ', answer => {
            answer
            if (answer != 'Yes') return
            console.log('\nLearning...')
            setTimeout(()=>console.log(`> New knowledge successfully recorded !!! ^^\n${word} / ${def} / ${exp}`), 1669)
            rl.close()
        })
        rl.write('Yes')
        break
    default:
        console.error(`iLearned command can only run 3 arguments. You're running ${input.length} :(`)
        break
}

// p.history.save()

export default argv