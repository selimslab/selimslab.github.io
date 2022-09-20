const express = require('express')
const app = express()
const port = 3000

let books = {}
let id = 0 

app.post('/books', (req, res) => {
  const { name, author } = req.body

  if (!name || !author ) {
    return res.status(400).send('missing fields')
  }
  books[id] = { name, author, id }
  
  id++ 

  res.sendStatus(200)
})

app.get('/books', (req, res) => {
  res.json(books)
})

app.get('/books/:id', (req, res) => {
  
  const book = books[req.params.id]

  if (!book) {
    return res.sendStatus(404)
  }

  res.json(book)
})

app.put('/books/:id', (req, res) => {
  const book = books[req.params.id]

  if (!book) {
    return res.sendStatus(404)
  }
  
  const update = req.body
  books[id] = { ...book, ...update }

  res.sendStatus(200)
})


app.delete('/books/:id', (req, res) => {
  const book = employees[req.params.id]

  if (!book) {
    return res.sendStatus(404)
  }

  delete books[req.params.id];

  res.sendStatus(200)
})

app.listen(port, () => console.log(`listening on ${port}!`))