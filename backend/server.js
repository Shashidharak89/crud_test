const express = require('express')
const connectToMongo = require('./db')
const cors=require('cors');


connectToMongo();
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/login',require('./routes/login'))
app.use('/api/delete',require('./routes/delete'))
app.use('/api/items',require('./routes/items'))
app.use('/api/update',require('./routes/update'))

app.listen(port, () => {
    console.log(`example app listening at ${port}`)
})




