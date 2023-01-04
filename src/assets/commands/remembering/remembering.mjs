export default async function() {
    const forgotten = (await import('./forgotten.mjs')).forgotten
    console.log(forgotten)
    process.exit()
}