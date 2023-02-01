import Book from "../saveQueue.js"

// Validates whereas user's inputs exists on hashMap
export default function validateHashMap(values) {
  const hashMap = Object.keys(Book.hashMap)
  return hashMap.filter(book => {
    return values.join(' ')
    .toLowerCase()
    .includes(book.toLowerCase()) 
  })
}