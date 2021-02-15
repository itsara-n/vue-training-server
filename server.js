const express = require('express')
const bodyParser = require('body-parser')
const tasks = require('./db')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.get('/tasks/:id', (req, res) => {
  res.json(tasks.find(task => task.id === req.params.id))
})

app.post('/tasks', (req, res) => {
  tasks.push(req.body)
  res.status(201).json(req.body)
})

app.put('/tasks/:id', (req, res) => {
  const updateIndex = tasks.findIndex(task => task.id === req.params.id)
  res.json(Object.assign(tasks[updateIndex], req.body))
})

app.delete('/tasks/:id', (req, res) => {
  const deleteIndex = tasks.findIndex(task => task.id === req.params.id)
  tasks.splice(deleteIndex, 1)
  res.status(204).send()
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
