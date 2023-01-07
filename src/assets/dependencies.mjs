// Import dependencies to export them
import fs from 'fs'
import C from './dependencies/ANSI_COLORS.mjs'
import centerText from './dependencies/centerText.mjs'
import confirm from './dependencies/confirm.mjs'
import date_of_birth from './dependencies/date_of_birth.mjs'
import { rl, rlWrite } from './dependencies/readline.mjs'

export { fs, rl, rlWrite, date_of_birth, confirm, centerText, C }