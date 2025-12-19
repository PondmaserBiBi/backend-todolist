const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const todos = require('./routes/todos')

const port = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


// middleware
app.use(morgan('dev'))
app.use(express.json())




app.use('/todo', todos)

app.listen(port, () => console.log(`Server running on port ${port}`));