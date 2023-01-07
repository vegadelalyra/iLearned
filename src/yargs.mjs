#!/usr/bin/env node
import yargs from 'yargs'
import iLearned from './assets/iLearned.mjs'
import today from './assets/today.mjs'
import inMyLife from './assets/inMyLife.mjs'
import toForget from './assets/toForget.mjs'
import remembering from './assets/commands/remembering/remembering.mjs'

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
.help()
.example(`\niLearned warm wɔːrm / to become less cold / learn warms your soul`)
.example(`\niLearned scrape skreɪp \n/ to succeed in getting something`)
.example(`/ iLearned scraping things`)
.example(` `)
.argv

export { argv }