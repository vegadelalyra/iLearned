import Book from "../saveQueue.js"

export default function validateHashMap(values) {
  const hashMap = Book.hashMap
  const lowerCaseHashMap = {}

  // create a lower case hash map
  Object.keys(hashMap).forEach(key => {
    lowerCaseHashMap[key.toLowerCase()] = hashMap[key]
  })

  // convert input values to lower case and filter out invalid values
  const filteredValues = values
    .map(value => value.toLowerCase())
    .filter(value => lowerCaseHashMap[value])

  // convert filtered values back to the original case and return
  return filteredValues.map(value => 
    Object.keys(hashMap).find(key => 
      key.toLowerCase() === value))
}