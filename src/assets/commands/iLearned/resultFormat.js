import C from "../../dependencies/ANSI_COLORS.js"; export default function chapter() { return `\x1b[33m{${C.w} ${arguments[0]} \x1b[33m / ${C.w} ${arguments[1]} \x1b[33m / ${C.w} ${arguments[2]} \x1b[33m}${C.w}`}