const express = require('express')
require('dotenv').config()
const path = require('path');
const Note = require('./models/note')
const app = express()
const cors = require('cors')
app.use(express.static('dist'))
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
  Note.find({}).then(result =>{
    response.json(result)
  })
})
app.get('/api/notes/:id',(request,response,next)=>{
  Note.findById(request.params.id)
  .then((note)=>{
    if(note){
      response.json(note)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error =>{
    next(error)
  })
})
const errorHandler = (error,request,response,next) =>{
  console.log(error.message)
  if(error.name === 'CastError'){
    return response.status(404).send({error:"malformatted id"})
  }
  next(error)
} 

app.delete('/api/notes/:id',(request,response,next)=>{
  Note.findByIdAndDelete(request.params.id)
  .then(result=>{
    response.status(204).end()
  })
  .catch(error=>next(error))
})
app.post('/api/notes',(request,response)=>{
  const body = request.body

  if(!body.content){
    return response.status(400).json({error:'content missing'})
  }
  const note = new Note({
    content:body.content,
    important:body.important || false,
  })
  note.save().then(savedNote =>{
    response.json(savedNote)
  })
})
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`The app is listening on port ${PORT}`)
})
app.put('/api/notes/:id',(request,response,next)=>{
  const {content,important} = request.body
  Note.findById(request.params.id)
  .then(note=>{
    if(!note){
      response.status(404).end()
    }
    note.content = content;
    note.important = important;
    return note.save().then((updatedNote)=>{
      response.json(updatedNote)
    })
  })
  .catch(error=>next(error))
})
app.use(errorHandler)
