#!/usr/bin/env node
import yargs from 'yargs'
import iLearned from './assets/iLearned.mjs'
import '../bin/input.mjs'
import Book from './assets/saveQueue.mjs'

// YARGS: CLI flag (options) and commands arguments
const argvInitialized = yargs(process.argv.slice(2)).argv
const argv = yargs(process.argv.slice(2))
.usage('\nRecord what you learn^^\niLearned [word] / [definition] / [example]\n"/" required ^')
.command('$0', 'Record a new concept: word/def/exp', iLearned)
.command('Helpa', 'Show all concepts learned today.', () => {console.log('FUCK U HELP')})
.command('today', 'Show all concepts learned today.', ()=> console.log('\nToday I learned...\n', Book.show()) )
.command('inLife', 'Show all concepts learned historycally.')
.example(`hyphen / the "-" symbol / Required to run CLI options`)
.argv

export { argv, argvInitialized }