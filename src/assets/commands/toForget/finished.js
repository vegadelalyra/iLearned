import C from '../../dependencies/ANSI_COLORS.js'

export default async function finished(inputs) {
    // Set up everything
    // we owe the functionality of add a listener which cancels the delete process if sigINT during Forgetting (or before last console.log)
    console.log(C.w + '\n\nForgetting...\n')
    let timer = 300, scale = 2, deletePromises = []
    const Book = (await import('../../saveQueue.js')).default

    for (const chapter of inputs) {
        timer = timer * scale, scale = scale * 0.9
        deletePromises.push( new Promise(resolve => setTimeout(() => {
            resolve(Book.delete(chapter))
        }, timer))
    )}

    // all deletions handled and a last break line to finish the show.
    const thisIsTheEndOfEverything = `\x1b[33mCONCEPT${inputs.length > 1 ? 'S ' : ' '}FORGOTTEN \x1b[90mHow could you? (ಥ＿ಥ)\n\n\x1b[31m    *:・ﾟ✧*:・ﾟ✧(╥﹏╥)ฅ✧*`
    Promise.all(deletePromises)
    .then( () => setTimeout( () => console.log(`\n${thisIsTheEndOfEverything}`), 300 ))
    .then( () => setTimeout( () => process.exit(), 400 ))
    
    // deletes chosen keys from memory
    import('../../dependencies.js')
    .then(Module => {
        const path = 'input.js' 
        Module.fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err

        const lines = data.split('\n'),
        newLines = lines.filter(line => !inputs.some(input => line.includes("`, `" + input + "`)"))),
        oldLines = lines.filter(line => inputs.some(input => line.includes("`, `" + input + "`)"))),
        oldLinesIndexes = oldLines.map( oldLine => lines.findIndex(line => line === oldLine) )
        let ForgottenObject = oldLinesIndexes.reduce( (acc, index, i) => {
            acc[index] = oldLines[i]
            return acc
        }, {})
        ForgottenObject = `export const forgotten = {\n${Object.entries(ForgottenObject).map(([key, value]) => `\t${key}: '${value}'`).join(',\n')}\n}`

        // forget books from library
        Module.fs.writeFile(path, newLines.join('\n'), err => { if (err) throw err })

        // saves forgotten books from library on "remembering" command
        Module.fs.writeFile(
            '../src/assets/commands/remembering/forgotten.js', 
            ForgottenObject, 
            err => { if (err) throw err 
        })
    })})
}