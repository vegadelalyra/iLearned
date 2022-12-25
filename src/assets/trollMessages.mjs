export const trollMessages = count => {
    count >= 12 && count < 24
    ? console.log("\x1b[34mI have all day, human xD") 
    : count >= 24 && count < 69
    ? console.log("\x1b[35mThat's all you've got? e_é")
    : count >= 69 ? console.log("\x1b[31mI'm a program, so my time is infinite, human. For you, time is limited.") : ''
}