#!/usr/bin/env node
import yargs from 'yargs'
import iLearned from './assets/iLearned.mjs'

// YARGS: CLI flag (options) and commands arguments
const argvInitialized = yargs(process.argv.slice(2)).argv
const argv = yargs(process.argv.slice(2))
.usage('\nRecord what you learn^^\niLearned [word] / [definition] / [example]\n"/" required ^')
.command('$0', 'Record a new concept: word/def/exp', iLearned)
.command('today', 'Show all concepts learned today.')
.command('inLife', 'Show all concepts learned historycally.')
.example(`hyphen / the "-" symbol / Required to run CLI options`)
.help()
.argv

export { argv, argvInitialized }
// p.history.save()