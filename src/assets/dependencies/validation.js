import Book from "../saveQueue.js"

export default function hashMap_validation(v) {
    let lcObj = {}, obj = Book.hashMap
    for (const key in obj) lcObj[key.toLowerCase()] = obj[key]

    let p = v.map(x => x.toLowerCase())
    p = p.filter( x => !!lcObj[x] )
    v = Object.keys(lcObj)
    p = p.map(x => v.findIndex(z => z === x))
    .map(x => Object.keys(obj)[x])
    return p
  }