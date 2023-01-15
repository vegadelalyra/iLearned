#!/usr/bin/env node
import yargs from 'yargs'
import iLearned from './assets/commands/iLearned/iLearned.js'
import today from './assets/commands/today/today.js'
import inMyLife from './assets/commands/inMyLife/inMyLife.js'
import toForget from './assets/commands/toForget/toForget.js'
import remembering from './assets/commands/remembering/remembering.js'

// YARGS: CLI flag (options) and commands arguments
const argv = yargs(process.argv.slice(2))
.usage('\nRecord what you learn\n\niLearned [word] / [definition] / [example]')
.usage('"/" forward slash required to record a new entry in one line')
.usage('^^^')
.command('$0', 'Record a new concept: word / def / exp', () => {}, iLearned )
.command('today', 'Show all concepts learned today', today)
.command('in my life', 'Show all concepts learned in life', inMyLife)
.command('to forget', 'Delete concepts [pass its names]', toForget)
.command('remembering', 'Recovers last deleted concept/s', remembering)
.alias('h', 'help')
.example(`\niLearned warm wɔːrm / to become less cold / learn warms your soul`)
.example(`\niLearned scrape skreɪp \n/ to succeed in getting something`)
.example(`/ iLearned scraping things`)
.example(` `)
.help()
.argv

export { argv }