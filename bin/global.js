#!/usr/bin/env node
let global = require('../src/index.js')
//// console.log(global) // { iLearned: [Function: iLearned] }

let beefy = global.iLearned()
beefy.newWord(
    'beefy',
    'muscular or robust',
    'I have a beefy gf and a beefy laptop')
beefy.anthology() 