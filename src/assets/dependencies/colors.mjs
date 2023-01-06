const c = (colorName) => {
    const colors = {
      w: '\x1b[37m',  // white
      g: '\x1b[33m',  // gold
      r: '\x1b[31m',  // red
      gr: '\x1b[30m',  // gray
      b: '\x1b[34m',  // deep blue
      gn: '\x1b[32m',  // green
    }
    return colors[colorName]
}; export default c