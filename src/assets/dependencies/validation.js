import Book from "../saveQueue.js"

export default function validateHashMap(values) {
  const hashMap = Book.hashMap
  return hashMap.filter(book => {
    values.join(' ')
    .toLowerCase()
    .includes(book.toLowerCase()) 
  })
}