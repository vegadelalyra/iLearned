export default function finished(inputs) {
    rl.close()
    console.log('\x1b[37m\n\nForgetting...\n')
    let timer = 300, scale = 2, deletePromises = []
    for (const chapter of inputs) {
        timer = timer * scale, scale = scale * 0.9
        deletePromises.push(
            new Promise(resolve => setTimeout(
                () => resolve(Book.delete(chapter)), timer)))
    }
    // all deletions handled and a last break line to finish the show.    
    Promise.all(deletePromises)
    .then( () => setTimeout( () => console.log('\n'), 300 ))
    
    // deletes chosen keys from memory
    import('./dependencies.mjs')
    .then(Module => {
        const path = 'input.mjs' 
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
            '../src/assets/commands/remembering/forgotten.mjs', 
            ForgottenObject, 
            err => { if (err) throw err 
        })
    })})
        console.log(`\nHow could you? T-T whatever, you can REMEMBER {keys} as soon as you haven't forgot anything else.`)
}