// Import dependencies to export them
import fs from 'fs'
import C from './dependencies/ANSI_COLORS.js'
import centerText from './dependencies/centerText.js'
import confirm from './dependencies/confirm.js'
import date_of_birth from './dependencies/date_of_birth.js'
import { rl, rlWrite } from './dependencies/readline.js'
import userInput from './dependencies/userInput.js'

export { fs, rl, rlWrite, date_of_birth, confirm, centerText, C, userInput }