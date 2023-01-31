import { date_of_birth, C } from "./dependencies.js"

class Node {
    constructor(value, chapter) {
      this.chapter = chapter
      this.value = value
      this.next = null
      this.birth = date_of_birth()
    }
  }
  
class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
    this.hashMap = {}
  }

  // Add an element to the back of the queue
  enqueue(value, chapter) {
    let newNode = new Node(value, chapter)

    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.hashMap[chapter] = value 
    this.length++
  }

  // Remove an element from the front of the queue
  dequeue() {
    if (this.head === null) return null

    let removed = this.head
    this.head = this.head.next
    this.length--

    if (this.head === null) {
      this.tail = null
    }

    return removed.value
  }

  // Look at the element at the front of the queue without removing it
  peek() {
    return this.head ? this.head.birth : null
  }

  // Check if the queue is empty
  isEmpty() {
    return this.head === null
  }

  // Show the entire queue
  show() {
    let current = this.head
    let values = []

    while (current) {
      values.push(current.value)
      current = current.next
    }
    return values.join('\n\n')
  }

  today() {
    let current = this.head
    let values = []
    
    while (current) {
      if (current.birth != date_of_birth()) continue
      values.push(current.value)
      current = current.next
    }
    return values.join('\n\n')
  }

  // Delete a given chapter of the book
  delete(chapter) {
    if (!this.hashMap[chapter]) return console.error(
    `>>> ${chapter} is not recorded inside your brain!!! ...Yet (e.ó)/`)

    const current = this.hashMap[chapter]

    if (current === this.head.value) this.head = this.head.next
    if (current === this.tail) this.tail = null

    delete this.hashMap[chapter]
    this.length--
    return console.log(chapter, `\x1b[33mdeleted${C.w}`)
  }
}

const Book = new Queue

export default Book