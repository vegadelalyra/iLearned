class Node {
    constructor(value) {
      this.value = value
      this.next = null
      this.birth = new Date().getDate()
    }
  }
  
class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  // Add an element to the back of the queue
  enqueue(word, def, exp) {
    let newNode = new Node(word, def, exp)

    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }

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
    return this.head ? this.head.value : null
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

    return values
  }
}

const Book = new Queue

export default Book