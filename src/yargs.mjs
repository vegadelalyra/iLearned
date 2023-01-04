#!/usr/bin/env node
import yargs from 'yargs'
import iLearned from './assets/iLearned.mjs'
import today from './assets/today.mjs'
import inMyLife from './assets/inMyLife.mjs'
import toForget from './assets/toForget.mjs'
import remembering from './assets/commands/remembering/remembering.mjs'

// YARGS: CLI flag (options) and commands arguments
const argv = yargs(process.argv.slice(2))
.usage('\nRecord what you learn\niLearned [word] / [definition] / [example]\n/ required^')
.command('$0', 'Record a new concept: word / def / exp', () => {}, iLearned )
.command('today', 'Show all concepts learned today', today)
.command('in my life', 'Show all concepts learned in life', inMyLife)
.command('to forget', 'Delete concepts [pass its names]', toForget)
.command('remembering', 'Recovers last deleted concept/s', remembering)
.example(`iLearned heat hiːt / to make something warm / learn will heat your soul `)
.help()
.argv

export { argv }