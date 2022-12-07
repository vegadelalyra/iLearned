function iLearned(book = []) {
        return {
            newWord: function(word, def, exa) {
                return book.push([word, def, exa])
            },
            anthology: function() {
                return console.log(book[0].join(' > '))
            }
        }
}

// let miau = iLearned()
// miau.newWord('a','b','c')
// miau.anthology()

module.exports = {
    iLearned
}