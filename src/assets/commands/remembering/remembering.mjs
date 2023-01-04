import { fs, rl } from '../../dependencies.mjs'


export default async function() {
    // Dinamically import forgotten books.
    const forgotten = (await import('./forgotten.mjs')).forgotten
    const keys = Object.keys(forgotten)
    const curatedLines = i => forgotten[i].substring(1, forgotten[i].length - 1)

    // Question user
    await new Promise( resolve => {
        rl.question(`\x1b[33m>Are you trying to remember, `, resolve)
    })

    // Read the file into memory
    return fs.readFile('input.mjs', 'utf8', (err, data) => {
        if (err) throw err

        // Split the file into lines
        const lines = data.split('\n')

        // Modify the lines as needed
        keys.forEach(index => lines.splice( index, 0, curatedLines(index) ))

        // Join the lines back into a single string
        const newData = lines.join('\n')

        // Write the modified data back to the file
        fs.writeFile('input.mjs', newData, err => { if (err) throw err })
    })
    process.exit()
}