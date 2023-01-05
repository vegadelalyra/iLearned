import '../../bin/input.mjs'
import Book from "./saveQueue.mjs";

export default function inMyLife() {

    const centerText = (text) => {
        const terminalWidth = process.stdout.columns;
        const textWidth = text.length;
        const paddingWidth = Math.floor((terminalWidth - textWidth) / 2);
        return '\n' + " ".repeat(paddingWidth) +text + " ".repeat(paddingWidth)
      }
      
    const newConceptLine = '\x1b[34m' + '~'.repeat(process.stdout.columns)
    
    console.log(
        newConceptLine + `\n\x1b[33m${centerText("From this life I have learned:")}\n\n\n` + Book.show(), 
        `\n\n${newConceptLine}\n\n\n\x1b[33m    *:・ﾟ✧ ＼（＾▽＾）／ ${Book.length == 0 ? 'ミ★ ...nothing xd ★彡' : ''}` 
    ) 
    process.exit()
}