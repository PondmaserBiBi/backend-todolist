const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const todos = require('./routes/todos')

const port = process.env.PORT || 5001;

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/todo', todos)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})