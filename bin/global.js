<<<<<<< HEAD
#!/usr/bin/env node
let beefy = require('../src/index.js')
//// console.log(beefy) // ? { iLearned: [Function: iLearned] }
const test = beefy.iLearned()
test.newWord(
=======
#!sudo /usr/bin env node
let beefy = require('../src/index.js')

beefy.newWord(
>>>>>>> 66f86426a35e9087887e653679dd22fb9296fc23
    'beefy',
    'muscular or robust',
    'I have a beefy gf and a beefy laptop')
test.anthology() // * beefy > muscular or robust > I have a beefy gf and a beefy laptop