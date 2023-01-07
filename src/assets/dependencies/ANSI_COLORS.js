/**
* Returns a string with the escape sequence ANSI color format.
*
* @class                    ANSI_COLORS
* @return {string}          An ANSI color (can run on TTY and browser terminals).
*/ 
class ANSI_COLORS {
  /**
   *  white.
   * @returns {string} The escape sequence for white.
   */get w() { return '\x1b[37m' }

  /**
   *  gold.
   * @returns {string} The escape sequence for gold.
   */get g() { return '\x1b[33m' }

  /**
   *  red.
   * @returns {string} The escape sequence for red.
   */get r() { return '\x1b[31m' }

  /**
   *  gray.
   * @returns {string} The escape sequence for gray.
   */get gr() { return '\x1b[30m' }

  /**
   *  deep blue.
   * @returns {string} The escape sequence for deep blue.
   */get b() { return '\x1b[34m' }

  /**
   *  green.
   * @returns {string} The escape sequence for green.
   */get gn() { return '\x1b[32m' }
}

// Create a new instance of the ANSI_COLORS class
const C = new ANSI_COLORS()

// Export the C instance as the default
export default C