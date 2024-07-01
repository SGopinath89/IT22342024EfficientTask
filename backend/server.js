const express =  require('express')
const cors = require('cors')
const router = require('./routes/routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const auth = require('./middleware/auth')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/todolist')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

require('./models/db')
app.use(express.json())
app.use(cors())
app.use('/api/tasks' , router)
app.use('/api/auth', authRoutes)
app.listen('8000' , err =>{
    if(err) console.log(err)
    console.log('Server is started at PORT number : 8000')
})

