// centerText
const centerText = (text) => {
    const terminalWidth = process.stdout.columns
    const textWidth = text.length
    const paddingWidth = Math.floor((terminalWidth - textWidth) / 2)
    return '\n' + " ".repeat(paddingWidth) +text + " ".repeat(paddingWidth)
}; export default centerText