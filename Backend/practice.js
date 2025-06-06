const mongoose = require('mongoose')
if(process.argv.length < 3){
    console.log("give the password as third argument")
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://princekumarug25:${password}@cluster0.yggmjxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)
const noteSchema = new mongoose.Schema({
    content:String,
    important:Boolean,
})
const Note = mongoose.model('Note',noteSchema)

const run = async ()=>{
    await mongoose.connect(url)
    const note = new Note({
        content: "Some new content", important: true
    })
    await note.save()
    console.log('note saved!')
    const notes = await Note.find({})
    notes.forEach(element => {
        console.log(element)
    });
    mongoose.connection.close()
}
run()