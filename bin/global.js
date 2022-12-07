#!/usr/bin/env node
let beefy = require('../src/index.js')
//// console.log(beefy) // ? { iLearned: [Function: iLearned] }
const test = beefy.iLearned()
test.newWord(
    'beefy',
    'muscular or robust',
    'I have a beefy gf and a beefy laptop')
test.anthology() // * beefy > muscular or robust > I have a beefy gf and a beefy laptop