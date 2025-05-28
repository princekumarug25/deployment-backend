// const http = require('http')

// const app = http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type':'text/plain'})
//     response.end('Hello World')
// })
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port${PORT}`)
// const http = require('http')
// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
// const PORT = 3001
// app.listen(PORT)
// console.log(`server listenig at port ${PORT}`)

const express = require('express')
const path = require('path');
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
app.get('/',(request,response)=>{
    response.send('<h1>hello world</h1>')
})
app.get('/api/notes',(request,response)=>{
    response.json(notes)
})
app.get('/api/notes/:id',(request,response)=>{
    const id = request.params.id;
    const note = notes.find(note => note.id === id)
    if(note){
      response.send(note)
    }
    else{
      response.status(404).end()
    }
})
app.delete('/api/notes/:id',(request,response)=>{
  const id = request.params.id;
  notes = notes.filter(note => note.id!== id)
  response.status(204).end()
})
app.post('/api/notes',(request,response)=>{
  const note = request.body;
  console.log(note)
  response.json(note)
})
const PORT = process.env.PORT||3001
app.listen(PORT,()=>{
    console.log(`The app is listening on port ${PORT}`)
})

