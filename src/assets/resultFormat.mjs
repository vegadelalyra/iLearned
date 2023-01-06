import C from "./dependencies/ANSI_COLORS.mjs"

function chapter() { return `\x1b[33m{${C.w} ${arguments[0]} \x1b[33m / ${C.w} ${arguments[1]} \x1b[33m / ${C.w} ${arguments[2]} \x1b[33m}${C.w}`}
export default chapter
