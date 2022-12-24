#!/usr/bin/env node
import { argvInitialized } from '../index.mjs'
import prompt from 'prompt-sync'
import historia from 'prompt-sync-history'
import readline from 'readline'

// my default option 
export default function iLearned(book = []) {

    // readline node.js module: allows to input options.
    const rl = readline.createInterface(process.stdin, process.stdout) 
    
    // prompt: read user inputs, sigint: exits code with ^C, history: SAVES INPUTS INSIDE A FILE
    const p = prompt({
        sigint: true,
        history: historia()
    })

    const input = argvInitialized._.join(' ').split('/').filter(el => {return el != null && el != ''})
    let word = input[0] ?? '', def = input[1] ?? '', exp = input[2] ?? ''

    if (input.length < 4) console.log("\nSeems like somebody here has learned something new today :D\n")

    return (function record() { 
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
                    if (/^[^yos]/i.test(answer)) return record()
                    console.log('\nLearning...')
                    setTimeout(()=>console.log(`> New knowledge successfully recorded !!! ^^\n${word} / ${def} / ${exp}`), 1669)
                    rl.close()
                })
                rl.write('Yes')
                break
            default:
                console.error(`error! iLearned command can only run 3 arguments. You're running ${input.length} :(`)
                break
        }
    })()
}