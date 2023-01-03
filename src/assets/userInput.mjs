import Book from "./saveQueue.mjs"
import { rl } from "./dependencies.mjs"
import toForget from "./toForget.mjs"

export default async function(question = '', write = '', accKeys = false) {
    const userInput = await new Promise(resolve => {
      rl.question(question, answer => {
      // curate user input and recorded entries
      const InputCurated = answer.replaceAll(' ', '').toLowerCase()
      const keys = Object.keys(Book.hashMap).map(key => key.replaceAll(' ', '').toLowerCase())
  
      // filter the keys/entries already entered for the user.
      const keysIndex = [], askedKeys = []
      for (const key of keys) if ( InputCurated.includes(key) ) keysIndex.push(keys.indexOf(key))
     
      // return an array with the entries entered by the user
      for (const index of keysIndex) askedKeys.push(Object.keys(Book.hashMap)[index])
      resolve(askedKeys)

      ///^[^yos]/i.test(answer)
      })
        // in any case admon wants to add any default input text.
        rl.write(write)
    })
      // guard clause
    if (accKeys) userInput.push(...accKeys)
    return toForget(userInput)
  }
