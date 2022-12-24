import prompt from 'prompt-sync'
import historia from 'prompt-sync-history'
import readline from 'readline'

// readline node.js module: allows to input options.
const rl = readline.createInterface(process.stdin, process.stdout) 

// prompt: read user inputs, sigint: exits code with ^C, history: SAVES INPUTS INSIDE A FILE
const p = prompt({
    sigint: true,
    history: historia()
})

export { rl, p }