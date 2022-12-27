import Book from "./saveQueue.mjs"

export default function toForget() {
    console.log(arguments[0].argv._.slice(2))
    console.log(Book.delete())
    return process.exit()
}