const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const tasks = require('./db')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/tasks', (req, res) => {
  console.log('GET ALL TASKS')
  res.json(tasks)
})

app.get('/tasks/:id', (req, res) => {
  console.log('GET TASK BY ID ', req.params.id)
  res.json(tasks.find(task => task.id === req.params.id))
})

app.post('/tasks', (req, res) => {
  console.log('CREATE NEW TASK')
  tasks.push(req.body)
  res.status(201).json(req.body)
})

app.put('/tasks/:id', (req, res) => {
  console.log('UPDATE TASK BY ID ', req.params.id)
  const updateIndex = tasks.findIndex(task => task.id === req.params.id)
  res.json(Object.assign(tasks[updateIndex], req.body))
})

app.delete('/tasks/:id', (req, res) => {
  console.log('DELETE TASK BY ID ', req.params.id)
  const deleteIndex = tasks.findIndex(task => task.id === req.params.id)
  tasks.splice(deleteIndex, 1)
  res.status(204).send()
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
